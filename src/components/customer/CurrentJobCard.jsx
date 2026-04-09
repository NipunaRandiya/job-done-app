import React, { useState, useEffect } from "react";
import { 
  FiMapPin, 
  FiCalendar, 
  FiUser, 
  FiMessageCircle, 
  FiPhone, 
  FiX, 
  FiImage, 
  FiSend 
} from "react-icons/fi";
import ChatPopup from "../shared/ChatPopup";
import { getWorkerPublicProfile } from "../../services/customerApi";

// --- Styled Button Component ---
const Button = ({ children, variant = "primary", className = "", ...props }) => {
  const variants = {
    primary: "bg-slate-900 text-white hover:bg-blue-600 shadow-lg shadow-slate-200",
    blue: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-100",
    outline: "border-2 border-slate-100 text-slate-600 hover:border-blue-500 hover:text-blue-600",
    ghost: "text-slate-500 hover:bg-slate-50",
    input: "bg-slate-50 text-slate-500 hover:bg-slate-100"
  };

  return (
    <button 
      className={`inline-flex items-center justify-center rounded-2xl px-6 py-3 text-[11px] font-black uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const CurrentJobCard = ({ job }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const [workerDetails, setWorkerDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWorkerInfo = async () => {
      // Ensure job.workerId exists before calling
      if (job?.workerId) {
        setLoading(true);
        try {
          const response = await getWorkerPublicProfile(job.workerId);
          // your backend returns the whole worker object minus password
          setWorkerDetails(response.data); 
        } catch (err) {
          console.error("Error fetching worker data:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchWorkerInfo();
  }, [job?.workerId]);

  const displayPhone = workerDetails?.telephone || "Not Available";
  const displayAddress = workerDetails?.address || "Location TBD";
  const displayName = workerDetails?.name || "Assigned Professional";

  if (!job) return (
    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-100 border border-slate-50 flex items-center justify-center h-full min-h-[300px]">
      <p className="text-slate-300 font-black uppercase tracking-[0.2em] text-[10px]">No active projects</p>
    </div>
  );

  const paid = job.paidAmount || 0;
  const total = job.estimatedCost || 1;
  const progress = (paid / total) * 100;

  return (
    <>
      <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-100 border border-slate-50 flex flex-col h-full relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[5rem] -z-0 opacity-40" />
        
        <div className="relative flex flex-col h-full">
          <div className="flex justify-between items-start mb-8">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full">
                Active Engagement
              </span>
              <h3 className="text-3xl font-black text-slate-900 mt-4 tracking-tighter">
                {job.workType}
              </h3>
            </div>
            <div className="text-right">
              <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Est. Completion</p>
              <p className="text-sm font-black text-slate-900">{new Date(job.expectedCompletion).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-slate-100 transition-colors">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-blue-500">
                <FiMapPin size={18} />
              </div>
              <div className="overflow-hidden">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Location</p>
                <p className="text-xs font-bold text-slate-700 truncate">{displayAddress}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-slate-100 transition-colors">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-blue-500">
                <FiUser size={18} />
              </div>
              <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Professional</p>
                <p className="text-xs font-bold text-slate-700">{displayName}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 mb-8 bg-blue-600 rounded-2xl shadow-lg shadow-blue-100 text-white">
            <FiPhone className="shrink-0" size={18} />
            <div>
              <p className="text-[9px] font-black opacity-70 uppercase tracking-widest">Direct Line</p>
              <p className="text-xs font-black tracking-widest">{displayPhone}</p>
            </div>
          </div>

          <div className="mt-auto space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Financial Progress</p>
                <p className="text-xl font-black text-slate-900">
                  LKR {paid.toLocaleString()} 
                  <span className="text-slate-300 font-medium text-sm ml-2">/ {total.toLocaleString()}</span>
                </p>
              </div>
              <p className="text-xs font-black text-blue-600">{Math.round(progress)}%</p>
            </div>
            
            <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden p-1">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all duration-1000 shadow-[0_0_12px_rgba(59,130,246,0.5)]" 
                style={{ width: `${progress}%` }} 
              />
            </div>

            <Button
              className="w-full mt-4 py-5"
              onClick={() => setIsChatOpen(true)}
            >
              <FiMessageCircle className="mr-3" size={16} strokeWidth={3} />
              Open Secure Messenger
            </Button>
          </div>
        </div>
      </div>

      <ChatPopup 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        chatPartnerName={job.workerName} 
        chatId={job._id}
        workOrderId={job._id}
        currentUserRole="user"
      />
    </>
  );
};

export default CurrentJobCard;