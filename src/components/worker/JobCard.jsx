import { FiMapPin, FiCalendar, FiArrowRight } from "react-icons/fi";

export default function JobCard({ job, onClick }) {
  const isPending = job.status === 'pending';
  
  return (
    <div
      onClick={onClick}
      className="group p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 cursor-pointer relative overflow-hidden"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800 capitalize leading-tight group-hover:text-blue-600 transition-colors">
            {job.workType.replace("-", " ")}
          </h2>
          <span className={`inline-block mt-2 px-2.5 py-1 text-[10px] font-bold rounded-lg uppercase tracking-wider ${
            isPending ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
          }`}>
            {job.status}
          </span>
        </div>
        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
          <FiArrowRight size={18} />
        </div>
      </div>

      <p className="text-slate-500 text-sm line-clamp-2 mb-6 font-medium leading-relaxed">
        {job.description}
      </p>

      <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-50">
        <div className="flex items-center text-slate-400 text-[11px] font-bold uppercase tracking-wide">
          <FiMapPin className="mr-1.5 text-blue-500" size={14} />
          {job.workplaceLocation}
        </div>
        <div className="flex items-center text-slate-400 text-[11px] font-bold uppercase tracking-wide">
          <FiCalendar className="mr-1.5 text-emerald-500" size={14} />
          {new Date(job.startingDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
        </div>
      </div>
    </div>
  );
}