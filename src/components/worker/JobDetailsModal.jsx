import { FiX, FiMapPin, FiClock, FiCreditCard, FiCalendar, FiPackage, FiInfo } from "react-icons/fi";

export default function JobDetailsModal({ job, onClose }) {
  if (!job) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl relative max-h-[90vh] flex flex-col overflow-hidden">
        
        <div className="p-8 border-b border-slate-50 flex justify-between items-center shrink-0">
          <div>
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em]">Job Details</span>
            <h2 className="text-2xl font-bold text-slate-900 capitalize mt-1">
              {job.workType.replace("-", " ")}
            </h2>
          </div>
          <button onClick={onClose} className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-slate-900 transition-all">
            <FiX size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
          
          <section>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <FiInfo className="text-blue-500" /> Description
            </h3>
            <p className="text-slate-600 leading-relaxed font-medium">{job.description}</p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem label="Location" value={job.workplaceLocation} icon={<FiMapPin />} />
            <InfoItem label="Status" value={job.status} icon={<FiInfo />} />
            <InfoItem label="Start Date" value={new Date(job.startingDate).toLocaleDateString()} icon={<FiCalendar />} />
            <InfoItem label="Hours" value={`${job.totalWorkingHours} hrs`} icon={<FiClock />} />
            <InfoItem label="Payment" value={job.paymentMethod} icon={<FiCreditCard />} />
          </div>

          <hr className="border-slate-50" />

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Cost Breakdown</h3>
              <div className="space-y-2">
                {job.costBreakdown?.map((item, index) => (
                  <div key={index} className="flex justify-between items-center bg-slate-50 px-4 py-3 rounded-xl border border-slate-100">
                    <span className="text-sm font-bold text-slate-600 capitalize">{item.item}</span>
                    <span className="text-sm font-bold text-blue-600">LKR {item.cost}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Materials</h3>
              <div className="bg-slate-900 rounded-2xl p-5 text-white">
                <ul className="space-y-3">
                  {job.materialList?.map((mat, index) => (
                    <li key={index} className="flex items-center gap-3 text-xs font-medium">
                      <FiPackage className="text-blue-400" size={14} />
                      <span>{mat.name} <span className="text-slate-400">— {mat.quantity} {mat.unit}</span></span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {job.note && (
            <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3">
              <FiInfo className="text-amber-500 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700 font-medium leading-relaxed">
                <span className="font-bold">Admin Note:</span> {job.note}
              </p>
            </div>
          )}
        </div>

        <div className="p-8 bg-slate-50 border-t border-slate-100 shrink-0 flex gap-4">
          <button onClick={onClose} className="flex-1 py-4 font-bold text-slate-400 hover:text-slate-600 transition-all text-xs uppercase tracking-widest">
            Close
          </button>
          <button className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-bold shadow-xl hover:bg-blue-600 transition-all text-sm">
            Action Item
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value, icon }) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-blue-500 shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-[10px] uppercase text-slate-400 font-bold tracking-widest leading-none mb-1">{label}</p>
        <p className="font-bold text-slate-800 text-sm capitalize">{value}</p>
      </div>
    </div>
  );
}