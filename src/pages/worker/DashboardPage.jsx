import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  AreaChart, Area, ResponsiveContainer, Tooltip,
} from "recharts";
import { 
  FiMessageSquare, FiDollarSign, FiClock, FiTrendingUp, 
  FiMapPin, FiCalendar, FiAlertCircle, FiCheckCircle 
} from "react-icons/fi";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import ChatPopup from "../../components/shared/ChatPopup";
import { getWorkerDashboard, getWorkerProfile, toggleWorkerStatus, getWorkerJobs } from "../../services/workerApi";
import { socket } from "../../socket";
import { useToast } from "../../context/ToastContext"; 

const MOCK_NOTIFICATIONS = [
  { id: 1, type: 'work', title: 'Work Reminder', desc: 'Plumbing at Havelock Rd starts at 10 AM', time: '2h ago', color: 'blue' },
  { id: 2, type: 'message', title: 'Customer Message', desc: 'Kamal sent: "Are you near the location?"', time: '15m ago', color: 'purple' },
  { id: 3, type: 'request', title: 'New Work Request', desc: 'Emergency leak repair in Nugegoda', time: 'Just now', color: 'orange' },
  
];

export default function ProDashboard() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const showToast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashRes, profRes, jobsRes] = await Promise.all([
          getWorkerDashboard(),
          getWorkerProfile(),
          getWorkerJobs()
        ]);
        
        setDashboardData(dashRes.data);
        setCurrentJob(jobsRes.data.find(j => j.status === "inProgress"));
        setProfileData(profRes.data);
      } catch (error) {
        console.error("Session expired or server error");
        localStorage.removeItem("token"); 
        navigate("/login");
      }
    };

    fetchData();
  }, [navigate]);

  useEffect(() => {
    
    if (!socket.connected) {
      socket.connect();
    }

    if (profileData?._id) {
      console.log("Identifying as worker:", profileData._id);
      socket.emit("register_worker", profileData._id); 
    }

    socket.on('new_job_assigned', (data) => {
      console.log("New Job Received:", data);
      
      const newNotification = {
        id: data.orderId, 
        type: 'request',
        title: 'New Work Request',
        desc: `${data.workType}: ${data.description}`,
        time: 'Just now',
        color: 'orange',
        payload: data 
      };

      setNotifications(prev => [newNotification, ...prev]);
    });

    return () => {
      socket.off('new_job_assigned');
    };
  }, [profileData?._id]);

  const handleToggleAvailability = async () => {
    try {
      const res = await toggleWorkerStatus();
      setDashboardData(prev => ({ ...prev, isOnline: res.data.isReady }));
    } catch (error) {
      showToast("Could not update status.", "error");
    }
  };

  const handleJobResponse = async (orderId, status) => {
  try {
    const response = await axios.patch(
      `http://localhost:5000/api/work-orders/${orderId}/respond`, 
      { status }, 
      { 
        headers: { 
          Authorization: `Bearer ${localStorage.getItem('token')}` 
        } 
      }
    );

    if (response.status === 200) {
      setNotifications(prev => prev.filter(note => note.id !== orderId));

      const [dashRes, jobsRes] = await Promise.all([
        getWorkerDashboard(),
        getWorkerJobs()
      ]);
      
      setDashboardData(dashRes.data);
      setCurrentJob(jobsRes.data.find(j => j.status === "accepted" || j.status === "inProgress"));

      showToast("Job Accepted", "success");
    }
  } catch (error) {
    const message = error.response?.data?.message || "Failed to update job.";
    
    if (error.response?.status === 400) {
      showToast(`Expired: ${message}`, "error");
      setNotifications(prev => prev.filter(note => note.id !== orderId));
    } else if (error.response?.status === 403) {
      showToast("Unauthorized: You cannot respond to this job.", "error");
    } else {
      showToast("Server error. Please try again later.", "error");
    }
  }
};


  if (!(dashboardData && profileData)) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
      <div className="animate-pulse font-bold text-slate-400">Loading Dashboard...</div>
    </div>
  );



  const unavailableDates = profileData.availability?.markedAvailableDates?.map(
    d => new Date(d).toISOString().split('T')[0]
  ) || [];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#f8fafc] p-4 lg:p-8 gap-8 font-sans ">
      
      <div className="flex-1 space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Today's Snapshot</h1>
            <p className="text-slate-500 font-medium">Welcome back, {profileData.name}</p>
          </div>

          <div className="bg-white border border-slate-100 p-2 pl-4 rounded-2xl shadow-sm flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Status</span>
              <span className={`text-sm font-bold ${dashboardData?.isOnline ? 'text-green-600' : 'text-slate-500'}`}>
                {dashboardData?.isOnline ? 'Open to Work' : 'Currently Offline'}
              </span>
            </div>
            <button 
              onClick={handleToggleAvailability}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${dashboardData?.isOnline ? 'bg-green-500' : 'bg-slate-200'}`}
            >
              <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${dashboardData?.isOnline ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <StatCard label="Active Jobs" val={dashboardData?.activeJobs} icon={<FiClock />} color="blue" />
          <StatCard label="Earnings" val={`Rs. ${dashboardData?.totalEarnings}`} icon={<FiTrendingUp />} color="green" />
          <StatCard label="Messages" val={dashboardData?.newMessages?.count} icon={<FiMessageSquare />} color="purple" />
          <StatCard label="Due" val={dashboardData?.pendingPayments?.count} icon={<FiDollarSign />} color="orange" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 block mb-1">Ongoing Project</span>
                <h3 className="text-xl font-bold text-slate-800">{currentJob?.workType}</h3>
              </div>
              <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">In Progress</div>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-start gap-4 p-3 bg-slate-50 rounded-xl">
                <FiMapPin className="text-blue-500 mt-1" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Location</p>
                  <p className="text-sm font-semibold text-slate-700">{currentJob?.address}</p>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-end">
                  <p className="text-xs font-bold text-slate-500">Project Completion</p>
                  <p className="text-sm font-black text-slate-800">65%</p>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: '65%' }}></div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => setIsChatOpen(true)}
                  className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-xs"
                >
                  <FiMessageSquare size={16} />
                  Chat Client
                </button>
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-100 text-xs">
                  Job Details
                </button>
              </div>
            </div>
          </div>

          <ChatPopup 
            isOpen={isChatOpen} 
            onClose={() => setIsChatOpen(false)} 
            chatPartnerName={currentJob.customerName}
            chatId={currentJob._id}
            workOrderId={currentJob._id}
            currentUserRole="worker" 
          />

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Earnings Flow</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dashboardData?.monthlyEarnings}>
                  <Area type="monotone" dataKey="earnings" stroke="#3b82f6" fillOpacity={0.1} fill="#3b82f6" strokeWidth={3} />
                  <Tooltip />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-96 space-y-8">
        
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-slate-800">Availability</h2>
            <FiCalendar className="text-slate-400" />
          </div>
          
          <div className="dashboard-calendar-container">
            <Calendar 
              tileClassName={({ date }) => {
                const dateStr = date.toISOString().split('T')[0];
                if (unavailableDates.includes(dateStr)) return 'unavailable-day';
                return 'available-day';
              }}
              className="border-none w-full"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-4 border-t border-slate-50 pt-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Booked/Off</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-slate-100"></div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Available</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Notifications</h2>
          <div className="space-y-6">
            {notifications.map((note) => (
              <div key={note.id} className="flex flex-col gap-2 p-4 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="flex gap-4">
                  <div className={`w-10 h-10 rounded-xl bg-${note.color}-50 flex items-center justify-center shrink-0`}>
                    {note.type === 'request' && <FiAlertCircle className="text-orange-500" />}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-bold text-slate-800">{note.title}</h4>
                      <span className="text-[10px] font-bold text-slate-400">{note.time}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{note.desc}</p>
                  </div>
                </div>

                {note.type === 'request' && (
                  <div className="flex gap-2 mt-2 ml-14">
                    <button 
                      onClick={() => handleJobResponse(note.id, 'scheduled')}
                      className="flex-1 bg-blue-600 text-white text-[10px] font-black py-2 rounded-lg hover:bg-blue-700 transition-all"
                    >
                      ACCEPT JOB
                    </button>
                    <button 
                      onClick={() => handleJobResponse(note.id, 'cancelled')}
                      className="flex-1 bg-slate-100 text-slate-500 text-[10px] font-black py-2 rounded-lg hover:bg-red-50 hover:text-red-500 transition-all"
                    >
                      DECLINE
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .dashboard-calendar-container .react-calendar { border: none; font-family: inherit; width: 100%; }
        .dashboard-calendar-container .react-calendar__navigation { margin-bottom: 1rem; }
        .dashboard-calendar-container .react-calendar__month-view__weekdays { font-size: 0.65rem; font-weight: 900; color: #cbd5e1; text-transform: uppercase; }
        .unavailable-day { background: #fee2e2 !important; color: #ef4444 !important; border-radius: 8px; font-weight: 700; }
        .available-day { background: #f8fafc !important; color: #64748b !important; border-radius: 8px; }
        .react-calendar__tile--now { background: #3b82f6 !important; color: white !important; border-radius: 8px; }
        .react-calendar__tile--active { background: #1e293b !important; color: white !important; border-radius: 8px; }
        .react-calendar__tile { 
            padding: 12px 8px !important; 
            border-radius: 12px;
        }
      `}} />
    </div>
  );
}

function StatCard({ label, val, icon, color }) {
  const colors = {
    blue: "bg-blue-50 text-blue-500",
    green: "bg-green-50 text-green-500",
    purple: "bg-purple-50 text-purple-500",
    orange: "bg-orange-50 text-orange-500"
  };
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:translate-y-[-4px] transition-all">
      <div className={`w-10 h-10 rounded-xl ${colors[color]} flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">{label}</p>
      <h3 className="text-2xl font-black text-slate-800">{val || 0}</h3>
    </div>
  );
}