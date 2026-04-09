import { BsStarFill, BsTelephone, BsCalendar, BsGeoAlt, BsCheckCircle, BsClipboardCheck, BsPersonBadge } from 'react-icons/bs';

export const ConfirmationTab = ({ data }) => {
  const worker = data.selectedWorker || { 
    id: 1, 
    name: 'John Silva', 
    rating: 4.9, 
    reviews: 127, 
    specialty: 'Plumbing', 
    phone: '+1 234 567 8901', 
    avatar: 'https://placehold.co/100x100/E2E8F0/475569?text=JS&font=sans' 
  };

  const sectionLabel = "text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 flex items-center gap-2";
  const cardStyle = "p-6 rounded-[2rem] border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-300";

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-10">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Review & Confirm</h2>
        <p className="text-sm font-medium text-slate-500 mt-1">Please verify your booking details before finalizing.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="space-y-4">
          <p className={sectionLabel}><BsPersonBadge className="text-blue-600" /> Selected Professional</p>
          <div className={`${cardStyle} flex items-center gap-5`}>
            <img 
                src={worker.avatar} 
                alt={worker.name} 
                className="w-16 h-16 rounded-2xl object-cover shadow-inner" 
            />
            <div>
              <h4 className="text-lg font-black text-slate-900 tracking-tight">{worker.name}</h4>
              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center gap-1 text-[11px] font-black text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-lg">
                  <BsStarFill /> {worker.rating}
                </div>
                <span className="text-xs font-bold text-slate-400">({worker.reviews} reviews)</span>
              </div>
              <p className="text-xs font-bold text-slate-500 mt-2 flex items-center gap-2">
                <BsTelephone className="text-blue-500" /> {worker.phone}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <p className={sectionLabel}><BsCalendar className="text-blue-600" /> Appointment Details</p>
          <div className={cardStyle}>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                    <BsCalendar size={14} />
                </div>
                <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Preferred Start</p>
                    <p className="text-sm font-bold text-slate-700">{data.startDate || "Not set"}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                    <BsGeoAlt size={14} />
                </div>
                <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Work Location</p>
                    <p className="text-sm font-bold text-slate-700 line-clamp-1">{data.location || "No location provided"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-4">
          <p className={sectionLabel}><BsClipboardCheck className="text-blue-600" /> Cost Summary</p>
          <div className={`${cardStyle} bg-slate-50/50 border-dashed border-2`}>
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">Estimated Labour Cost</h4>
                <p className="text-[10px] font-bold text-slate-400">Final price may vary based on actual work hours</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-blue-600">
                  LKR {Number(data.estimated_cost_lkr).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="p-8 rounded-[2rem] bg-blue-600 text-white relative overflow-hidden shadow-xl shadow-blue-100">
            <BsCheckCircle className="absolute -right-8 -bottom-8 text-white/10 w-48 h-48 rotate-12" />
            
            <div className="relative z-10">
                <h3 className="text-sm font-black uppercase tracking-[0.3em] mb-4">Important Notice</h3>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <li className="flex gap-3">
                        <BsCheckCircle className="text-blue-200 mt-1 flex-shrink-0" />
                        <p className="text-[11px] font-bold leading-relaxed">Worker will contact you within 24 hours to confirm.</p>
                    </li>
                    <li className="flex gap-3">
                        <BsCheckCircle className="text-blue-200 mt-1 flex-shrink-0" />
                        <p className="text-[11px] font-bold leading-relaxed">Material costs are not included in initial estimate.</p>
                    </li>
                    <li className="flex gap-3">
                        <BsCheckCircle className="text-blue-200 mt-1 flex-shrink-0" />
                        <p className="text-[11px] font-bold leading-relaxed">Direct payment to the worker after job completion.</p>
                    </li>
                </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};