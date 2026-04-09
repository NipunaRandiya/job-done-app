import { useEffect, useState } from "react";
import { FaStar, FaBookmark, FaCrown, FaCheckCircle } from "react-icons/fa";
import { FiTrendingUp, FiMapPin, FiActivity, FiArrowUpRight, FiSearch } from "react-icons/fi";

export default function MonitorWorkers() {
  const [workers, setWorkers] = useState([]);
  const [sortKey, setSortKey] = useState("rating");
  const [sortAsc, setSortAsc] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    setWorkers([
      { id: 1, name: "Roshan Wickrama", job: "Cleaning - Colombo 3", status: "Offline", rating: 5.0, tier: "Elite" },
      { id: 2, name: "Alex Perera", job: "Electrical Repair - Colombo 7", status: "Online", rating: 4.9, tier: "Standard" },
      { id: 3, name: "Chaminda Rodrigo", job: "House Painting - Galle", status: "Offline", rating: 4.8, tier: "Standard" },
      { id: 4, name: "Nuwan Pradeep", job: "Electrical Wiring - Kurunegala", status: "Online", rating: 4.8, tier: "Elite" },
      { id: 5, name: "Dinesh Kumar", job: "Plumbing Fix - Kandy", status: "Online", rating: 4.5, tier: "Standard" },
      { id: 6, name: "Pradeep Bandara", job: "AC Service - Negombo", status: "Online", rating: 4.2, tier: "Standard" },
      { id: 7, name: "Asanka Jayasuriya", job: "Carpentry - Matara", status: "Online", rating: 3.8, tier: "Standard" },
    ]);
  }, []);

  const promoteWorker = (worker) => {
    setWorkers((prev) =>
      prev.map((w) => (w.id === worker.id ? { ...w, tier: "Elite" } : w))
    );
    setToast(worker.name);
    setTimeout(() => setToast(null), 4000);
  };

  const renderRatingBar = (rating) => (
    <div className="flex flex-col gap-1.5 min-w-[120px]">
      <div className="flex justify-between items-center text-[10px] font-black text-slate-900 uppercase">
        <span>Score</span>
        <span>{rating.toFixed(1)}</span>
      </div>
      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-600 rounded-full transition-all duration-1000" 
          style={{ width: `${(rating / 5) * 100}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="p-10 bg-[#F8FAFC] min-h-screen relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Live Monitor</h1>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] mt-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            Global Workforce Intelligence
          </p>
        </div>

        <div className="flex gap-4">
          <div className="relative">
             <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
             <input 
               placeholder="SEARCH WORKFORCE..." 
               className="bg-white border-none rounded-2xl pl-12 pr-6 py-4 text-[10px] font-black uppercase tracking-widest shadow-sm outline-none w-64 focus:ring-2 focus:ring-blue-600 transition-all"
             />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/60 border border-slate-50">
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-4">
            <thead>
              <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                <th className="px-6 pb-4 text-left">Professional</th>
                <th className="px-6 pb-4 text-left"><FiMapPin className="inline mr-2" />Activity</th>
                <th className="px-6 pb-4 text-left"><FiActivity className="inline mr-2" />Status</th>
                <th className="px-6 pb-4 text-left">Analytics</th>
                <th className="px-6 pb-4 text-right">Access Tier</th>
                <th className="px-6 pb-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {workers.map((w) => (
                <tr key={w.id} className="group">
                  <td className="bg-slate-50 group-hover:bg-blue-50/50 rounded-l-[1.5rem] px-6 py-6 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center font-black text-slate-900 border border-slate-100">
                        {w.name.charAt(0)}
                      </div>
                      <span className="text-sm font-black text-slate-900">{w.name}</span>
                    </div>
                  </td>

                  <td className="bg-slate-50 group-hover:bg-blue-50/50 px-6 py-6 transition-colors">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight leading-relaxed block max-w-[180px]">
                      {w.job}
                    </span>
                  </td>

                  <td className="bg-slate-50 group-hover:bg-blue-50/50 px-6 py-6 transition-colors">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                      w.status === "Online" 
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                        : "bg-slate-100 text-slate-400 border-slate-200"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${w.status === "Online" ? "bg-emerald-500 animate-pulse" : "bg-slate-400"}`} />
                      {w.status}
                    </div>
                  </td>

                  <td className="bg-slate-50 group-hover:bg-blue-50/50 px-6 py-6 transition-colors">
                    {renderRatingBar(w.rating)}
                  </td>

                  <td className="bg-slate-50 group-hover:bg-blue-50/50 px-6 py-6 text-right transition-colors">
                    {w.tier === "Elite" ? (
                      <span className="inline-flex items-center gap-2 bg-slate-900 text-amber-400 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-slate-200">
                        <FaCrown /> Elite
                      </span>
                    ) : (
                      <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest px-4">Standard</span>
                    )}
                  </td>

                  <td className="bg-slate-50 group-hover:bg-blue-50/50 rounded-r-[1.5rem] px-6 py-6 text-right transition-colors">
                    {w.tier !== "Elite" ? (
                      <button
                        onClick={() => promoteWorker(w)}
                        className="p-3 bg-white text-blue-600 rounded-xl shadow-sm border border-slate-100 hover:bg-blue-600 hover:text-white transition-all active:scale-90"
                        title="Promote to Elite"
                      >
                        <FiTrendingUp size={18} strokeWidth={3} />
                      </button>
                    ) : (
                      <div className="p-3 text-emerald-500">
                        <FaCheckCircle size={18} />
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {toast && (
        <div className="fixed bottom-10 right-10 bg-slate-900 text-white shadow-2xl rounded-[2rem] p-8 border border-white/10 w-96 animate-in fade-in slide-in-from-right-10 duration-500 z-[200]">
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
              <FaCrown className="text-white text-xl" />
            </div>
            <div>
              <h4 className="font-black text-sm uppercase tracking-widest mb-1">Worker Promoted</h4>
              <p className="text-slate-400 text-xs font-bold leading-relaxed">{toast} has been granted Elite Status and priority dispatching.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}