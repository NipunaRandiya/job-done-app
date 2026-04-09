import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { 
  FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, 
  FiCamera, FiEdit3, FiAward, FiX, FiCheck, FiSave,
  FiMessageSquare, FiCornerDownRight 
} from "react-icons/fi";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getWorkerProfilePage, getWorkerReviews, updateWorkerProfile } from "../../services/workerApi";
import { useToast } from "../../context/ToastContext"; 

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function ProfileManagement() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const profileRes = await getWorkerProfilePage();
      setDashboardData(profileRes.data);
      const reviewsRes = await getWorkerReviews(profileRes.data._id);
      setDashboardData(prev => ({ ...prev, reviews: reviewsRes.data }));
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }
    fetchData();
  }, [navigate]);

  if (!dashboardData) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
      <div className="animate-pulse font-bold text-slate-400">Loading Profile...</div>
    </div>
  );

  const {
    name, category, email, telephone, address, createdAt, profileImage,
    rating = { average: 0, count: 0 },
    availability = { markedAvailableDates: [] }
  } = dashboardData;

  return (
    <div className="flex-1 p-6 lg:p-10 bg-[#f8fafc] min-h-screen font-sans text-slate-900">
      
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Profile Management</h1>
          <p className="text-slate-500 text-sm font-medium">Control your professional identity and schedule.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-sm flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Live Profile</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="relative">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-3xl overflow-hidden ring-4 ring-slate-50 shadow-lg">
                    <img
                      src={profileImage || `https://ui-avatars.com/api/?name=${name}&background=f1f5f9&color=94a3b8`}
                      className="w-32 h-32 rounded-3xl object-cover ring-4 ring-slate-50"
                      alt="Worker"
                    />
                  </div>
                  <button className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-2 rounded-xl border-2 border-white shadow-md">
                    <FiCamera size={16} />
                  </button>
                </div>

                <div className="text-center md:text-left flex-1">
                  <h3 className="text-2xl font-bold leading-tight">{name}</h3>
                  <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[11px] font-bold uppercase tracking-wider">
                    <FiAward size={12} /> {category}
                  </div>
                  <p className="text-slate-400 text-xs mt-4 font-medium italic">
                    Member since {new Date(createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                <InfoItem label="Email" value={email} icon={<FiMail />} />
                <InfoItem label="Phone" value={telephone} icon={<FiPhone />} />
                <InfoItem label="Location" value={address} icon={<FiMapPin />} />
                <InfoItem label="Tier" value="Gold Member" icon={<FiAward />} />
              </div>

              <div className="mt-10 pt-8 border-t border-slate-50 flex justify-end">
                <button 
                  onClick={() => setIsEditModalOpen(true)}
                  className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-md"
                >
                  <FiEdit3 size={16} /> Edit Profile Details
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
            <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-6">Performance</h2>
            <div className="flex items-end gap-3 mb-6">
              <span className="text-5xl font-bold tracking-tighter">{rating.average}</span>
              <div className="mb-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={`w-3.5 h-3.5 ${i < Math.floor(rating.average) ? 'text-yellow-400' : 'text-slate-200'}`} />
                  ))}
                </div>
                <p className="text-[10px] font-bold text-slate-400 mt-1">{rating.count} reviews</p>
              </div>
            </div>

            <button 
              onClick={() => setIsReviewsModalOpen(true)}
              className="w-full py-3 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center gap-2"
            >
              <FiMessageSquare size={14} /> See & Reply Reviews
            </button>
          </div>

          <div className="bg-[#1e293b] rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30 shrink-0">
                  <FiCalendar size={24} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold leading-tight">Work Schedule</h3>
                  <p className="text-slate-400 text-[11px] font-medium mt-0.5">Set unavailability for 2 months.</p>
                </div>
              </div>
              <button 
                onClick={() => setIsCalendarOpen(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
              >
                Update Availability
              </button>
            </div>
          </div>

        </div>
      </div>

      <AvailabilityModal isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} />
      <EditProfileModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} initialData={dashboardData} onRefresh={fetchData} />
      
      {/* REVIEW DIALOG POPUP */}
      <ReviewsModal 
        isOpen={isReviewsModalOpen} 
        onClose={() => setIsReviewsModalOpen(false)} 
        reviews={dashboardData.reviews || []} 
      />
    </div>
  );
}


const ReviewsModal = ({ isOpen, onClose, reviews }) => {
  if (!isOpen) return null;

  const displayReviews = reviews.length > 0 ? reviews : [
    { id: 1, user: "Amara Silva", date: "Feb 12, 2026", rating: 5, comment: "Fixed the electrical issue perfectly. Highly professional and cleaned up after the job!", reply: "" },
    { id: 2, user: "Nimal Perera", date: "Feb 05, 2026", rating: 4, comment: "Great work, very friendly. A bit late but did an excellent job.", reply: "Thanks Nimal! Apologies for the delay, traffic was quite bad that day." }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in duration-200">
        
        <div className="p-6 border-b border-slate-50 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-lg">Customer Reviews</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Manage your public feedback</p>
          </div>
          <button onClick={onClose} className="p-2 bg-slate-50 rounded-xl text-slate-400 hover:text-slate-900 transition-colors"><FiX size={20} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-white">
          {displayReviews.map((rev) => (
            <div key={rev.id} className="border-b border-slate-50 pb-6 last:border-0">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-400 text-xs">
                    {rev.user.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{rev.user}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{rev.date}</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={`w-3 h-3 ${i < rev.rating ? 'text-yellow-400' : 'text-slate-100'}`} />
                  ))}
                </div>
              </div>
              
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                "{rev.comment}"
              </p>

              {rev.reply ? (
                <div className="ml-6 p-4 bg-blue-50/50 rounded-2xl border border-blue-100 relative">
                  <FiCornerDownRight className="absolute -left-5 top-4 text-blue-200" size={18} />
                  <p className="text-[9px] font-bold text-blue-600 uppercase tracking-widest mb-1">Your Reply</p>
                  <p className="text-sm text-slate-600 italic">"{rev.reply}"</p>
                </div>
              ) : (
                <div className="ml-6 mt-2">
                  <div className="relative">
                    <textarea 
                      placeholder="Write a professional reply..."
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all pr-12 min-h-[80px]"
                    />
                    <button className="absolute bottom-3 right-3 p-2 bg-slate-900 text-white rounded-xl hover:bg-blue-600 transition-all">
                      <FiSave size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100">
          <button onClick={onClose} className="w-full py-3 bg-white border border-slate-200 rounded-xl font-bold text-sm text-slate-500">Close Window</button>
        </div>
      </div>
    </div>
  );
};


function InfoItem({ label, value, icon }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100 shrink-0">
        {React.cloneElement(icon, { size: 18 })}
      </div>
      <div>
        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">{label}</label>
        <p className="text-slate-700 font-semibold text-sm">{value || 'Not provided'}</p>
      </div>
    </div>
  );
}

const EditProfileModal = ({ isOpen, onClose, initialData, onRefresh }) => {
  
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    category: initialData?.category || "",
    email: initialData?.email || "",
    telephone: initialData?.telephone || "",
    address: initialData?.address || "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        category: initialData.category || "",
        email: initialData.email || "",
        telephone: initialData.telephone || "",
        address: initialData.address || "",
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const showToast = useToast();

  const handleSave = async () => {
    try {
      const res = await updateWorkerProfile(formData);
      
      if (res.status === 200 || res.status === 201) {
        showToast("Profile updated successfully!", "success");
        onRefresh(); 
        onClose();
      }
    } catch (err) {
      showToast("Failed to update profile. Please try again.", "error");
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in duration-200">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center">
          <h3 className="font-bold text-lg">Edit Profile</h3>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 transition-colors"><FiX size={20} /></button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <InputGroup label="Full Name" name="name" value={formData.name} onChange={handleChange} />
            <InputGroup label="Category" name="category" value={formData.category} onChange={handleChange} />
          </div>
          <InputGroup label="Email Address" name="email" value={formData.email} onChange={handleChange} />
          <InputGroup label="Phone Number" name="telephone" value={formData.telephone} onChange={handleChange} />
          <InputGroup label="Address" name="address" value={formData.address} onChange={handleChange} />
        </div>
        <div className="p-6 bg-slate-50 flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 text-sm font-bold text-slate-500">Cancel</button>
          <button onClick={handleSave} className="flex-1 bg-slate-900 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2">
            <FiSave size={16} /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

const InputGroup = ({ label, name, value, onChange}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{label}</label>
    <input 
      type="text" 
      name={name}
      value={value}
      onChange={onChange}
      className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
    />
  </div>
);

const AvailabilityModal = ({ isOpen, onClose }) => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleDateClick = (date) => {
    const dateId = date.toISOString().split('T')[0]; 
    setSelectedDates(prev => 
      prev.includes(dateId) ? prev.filter(id => id !== dateId) : [...prev, dateId]
    );
  };

  const showToast = useToast();

  const handleSave = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`${apiBaseUrl}/workers/availability`, 
        { unavailableDates: selectedDates },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      showToast("Schedule Synced Successfully", "success");
      onClose();
    } catch (error) {
      console.error("Save error", error);
      showToast("Error saving schedule", "error");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col">
        <div className="p-8 flex justify-between items-center border-b border-slate-50">
          <div>
            <h3 className="text-xl font-black tracking-tighter text-slate-900 uppercase">Planner</h3>
            <p className="text-slate-400 font-bold text-[9px] uppercase tracking-widest mt-1">Select Offline Days</p>
          </div>
          <button onClick={onClose} className="p-2 bg-slate-50 rounded-xl text-slate-400"><FiX size={20} /></button>
        </div>

        <div className="p-6 custom-calendar-wrapper">
          <Calendar 
            onClickDay={handleDateClick}
            tileClassName={({ date }) => {
                const dateId = date.toISOString().split('T')[0];
                return selectedDates.includes(dateId) ? 'selected-day' : 'normal-day';
            }}
            className="border-none w-full"
          />
        </div>

        <div className="p-8 bg-slate-50 flex gap-4">
          <button onClick={onClose} className="flex-1 text-[10px] font-black text-slate-400 uppercase tracking-widest">Discard</button>
          <button 
            onClick={handleSave} 
            disabled={loading}
            className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-blue-600 transition-all disabled:opacity-50"
          >
            {loading ? "SAVING..." : "SAVE SCHEDULE"}
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-calendar-wrapper .react-calendar { border: none; font-family: inherit; width: 100%; }
        .react-calendar__navigation button { font-weight: 900; text-transform: uppercase; font-size: 11px; }
        .normal-day { background: #f8fafc !important; border: 4px solid white !important; border-radius: 15px !important; height: 50px !important; color: #64748b; font-weight: 700; }
        .selected-day { background: #ef4444 !important; border: 4px solid white !important; border-radius: 15px !important; height: 50px !important; color: white !important; font-weight: 900; }
      `}} />
    </div>
  );
};

function CalendarMonth({ title, days, monthKey, selectedDates, onDateClick }) {
  return (
    <div className="animate-in slide-in-from-bottom-4 duration-500">
      <h4 className="font-bold text-slate-900 text-lg mb-6 flex items-center gap-3">
        <div className="w-1.5 h-5 bg-blue-500 rounded-full"></div> {title}
      </h4>
      <div className="grid grid-cols-7 gap-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
          <div key={d} className="text-[10px] font-bold text-slate-300 text-center mb-2">{d}</div>
        ))}
        {[...Array(days)].map((_, i) => {
          const dateId = `${monthKey}-${i + 1}`;
          const isSelected = selectedDates.includes(dateId);
          return (
            <button 
              key={i} 
              onClick={() => onDateClick(dateId)}
              className={`aspect-square rounded-xl text-sm font-bold transition-all border flex items-center justify-center
                ${isSelected ? 'bg-red-500 border-red-500 text-white' : 'bg-white border-slate-100 text-slate-600 hover:border-blue-400'}`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}