import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { FaStar, FaSearch, FaFilter } from 'react-icons/fa';
import { 
  FiTrendingUp, FiClock, FiTarget, FiUsers, 
  FiMoreVertical, FiArrowUpRight, FiX, FiChevronLeft, FiChevronRight 
} from 'react-icons/fi';
import { getWorkerEarningStats, getWorkerTaskHistory } from "../../services/workerApi";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs">
        <p className="font-bold mb-1 opacity-60 uppercase tracking-widest">{label}</p>
        <p className="text-sm font-bold">Rs {payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const StatItem = ({ label, value, icon, color, bg }) => (
  <div className="flex items-center gap-5">
    <div className={`w-12 h-12 rounded-2xl ${bg} ${color} flex items-center justify-center border border-white shadow-sm shrink-0`}>
      {React.cloneElement(icon, { size: 20 })}
    </div>
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-0.5">{label}</p>
      <p className="text-xl font-bold text-slate-800 tracking-tight">{value}</p>
    </div>
  </div>
);

export default function EarningsPage() {
  
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);

  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getWorkerEarningStats();
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoadingStats(false);
      }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoadingTasks(true);
      try {
        const response = await getWorkerTaskHistory(currentPage);
        setTasks(response.data.tasksHistory);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoadingTasks(false);
      }
    };
    fetchTasks();
  }, [currentPage]);

  if (loadingStats) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen bg-[#f8fafc]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const { thisMonth, chartData } = stats || {
    thisMonth: { earnings: 0, hoursCommit: 0, earningsGoalAchieved: 0, clients: 0 },
    chartData: []
  };

  const filteredTasks = tasks.filter(task => 
    task.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 p-6 lg:p-10 bg-[#f8fafc] min-h-screen font-sans text-slate-900">
      
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Financial Overview</h1>
          <p className="text-slate-500 text-sm font-medium mt-1">Real-time tracking of your professional growth.</p>
        </div>
        <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95">
          Withdraw Funds
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm h-full">
            <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">This Month</h2>
            <div className="space-y-8">
              <StatItem label="Earnings" value={`Rs ${thisMonth.earnings.toLocaleString()}`} icon={<FiTrendingUp />} color="text-blue-600" bg="bg-blue-50" />
              <StatItem label="Hours" value={`${thisMonth.hoursCommit}h`} icon={<FiClock />} color="text-emerald-600" bg="bg-emerald-50" />
              <StatItem label="Goal Progress" value={`${thisMonth.earningsGoalAchieved}%`} icon={<FiTarget />} color="text-orange-600" bg="bg-orange-50" />
              <StatItem label="Clients" value={thisMonth.clients} icon={<FiUsers />} color="text-purple-600" bg="bg-purple-50" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 flex flex-col">
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm flex-1">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-lg font-bold tracking-tight">Revenue Analytics</h2>
              <span className="text-[10px] font-black text-slate-400 uppercase bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">Trend View</span>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="8 8" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 600}} tickFormatter={(val) => `${val/1000}k`} />
                  <Tooltip content={<CustomTooltip />} cursor={{fill: '#f8fafc', radius: 10}} />
                  <Bar dataKey="earnings" barSize={32} radius={[10, 10, 10, 10]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill="#3b82f6" className="hover:opacity-80 transition-opacity cursor-pointer" />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="lg:col-span-12 mt-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-6 gap-4 px-2">
            <div>
              <h2 className="text-xl font-bold tracking-tight">Recent Tasks</h2>
              <p className="text-slate-400 text-xs">Page {currentPage} of {totalPages}</p>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-72">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                <input 
                  type="text" 
                  placeholder="Search client..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-4 py-2 text-xs outline-none focus:border-blue-500 transition-all shadow-sm" 
                />
              </div>
              
              <div className="flex bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <button 
                  disabled={currentPage === 1 || loadingTasks}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  className="p-2.5 hover:bg-slate-50 disabled:opacity-30 transition-colors border-r border-slate-100"
                >
                  <FiChevronLeft size={16} />
                </button>
                <button 
                  disabled={currentPage === totalPages || loadingTasks}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className="p-2.5 hover:bg-slate-50 disabled:opacity-30 transition-colors"
                >
                  <FiChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden relative">
            {loadingTasks && (
               <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] flex items-center justify-center z-10">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
               </div>
            )}
            
            <div className="overflow-x-auto min-h-[400px]">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 border-b border-slate-100">
                  <tr>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Client</th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Hours</th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Finished</th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredTasks.length > 0 ? (
                    filteredTasks.map((task, index) => (
                      <tr key={index} className="hover:bg-blue-50/30 transition-colors group">
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-3">
                            <FaStar className={task.starred ? 'text-yellow-400' : 'text-slate-100 group-hover:text-slate-200'} size={14} />
                            <span className="font-bold text-slate-800">{task.clientName}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-center font-bold text-slate-600">{task.hours}h</td>
                        <td className="px-6 py-5 text-sm text-slate-400">{task.finished}</td>
                        <td className="px-6 py-5 text-right">
                          <span className="text-sm font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg">
                            Rs {task.earnings.toLocaleString()}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-20 text-center text-slate-400 font-medium">
                        No tasks found for this period.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}