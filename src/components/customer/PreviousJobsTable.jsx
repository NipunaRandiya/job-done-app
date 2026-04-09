import React from 'react';
import { FiSearch, FiCalendar, FiFilter, FiHash, FiClock, FiCreditCard, FiMapPin, FiUser } from "react-icons/fi";

const PreviousJobsTable = ({ jobs }) => {
  return (
    <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] p-4 sm:p-10 shadow-xl shadow-slate-100 border border-slate-50">
      
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-8 sm:mb-10">
        <div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter">Project History</h3>
          <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-2">Archive of completed engagements</p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full xl:w-auto">
          
          <div className="flex flex-col sm:flex-row items-center gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-100 w-full md:w-auto">
            <div className="relative w-full sm:w-auto">
              <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input 
                type="text" 
                placeholder="START DATE" 
                onFocus={(e) => (e.target.type = "date")}
                className="bg-transparent text-[10px] font-black uppercase pl-9 pr-3 py-2 w-full sm:w-32 outline-none text-slate-700"
              />
            </div>
            <span className="hidden sm:block text-slate-300 font-black text-[10px]">TO</span>
            <div className="relative w-full sm:w-auto">
              <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input 
                type="text" 
                placeholder="END DATE" 
                onFocus={(e) => (e.target.type = "date")}
                className="bg-transparent text-[10px] font-black uppercase pl-9 pr-3 py-2 w-full sm:w-32 outline-none text-slate-700"
              />
            </div>
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="SEARCH..."
                className="w-full md:w-44 bg-slate-50 border-none rounded-2xl pl-11 pr-4 py-4 text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
            <div className="relative flex-1 md:flex-none">
              <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <select className="w-full bg-slate-50 border-none rounded-2xl pl-11 pr-8 py-4 text-[10px] font-black uppercase tracking-widest appearance-none focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer text-slate-700">
                <option>All Types</option>
                <option>Electrical</option>
                <option>Plumbing</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="block lg:hidden space-y-4">
        {jobs.map((job) => (
          <div key={job._id} className="bg-slate-50 rounded-3xl p-6 border border-slate-100 flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
                #{job._id.slice(-6).toUpperCase()}
              </span>
              <div className="text-right">
                <span className="block text-xs font-black text-slate-900">LKR {job.estimatedCost.toLocaleString()}</span>
                <span className="text-[9px] font-black text-emerald-500 uppercase">Paid Full</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-slate-400 shadow-sm">
                  <FiUser size={14} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Worker</p>
                  <p className="text-xs font-bold text-slate-800">{job.workerName || "Expert Service"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-slate-400 shadow-sm">
                  <FiClock size={14} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Completed</p>
                  <p className="text-xs font-bold text-slate-800">
                    {new Date(job.completionDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-slate-400 shadow-sm">
                  <FiMapPin size={14} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</p>
                  <p className="text-xs font-bold text-slate-800 truncate">{job.address || "Main Site"}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              <th className="px-6 py-4 text-left font-black tracking-widest">
                <span className="flex items-center gap-2"><FiHash /> Reference</span>
              </th>
              <th className="px-6 py-4 text-left font-black tracking-widest">Professional</th>
              <th className="px-6 py-4 text-left font-black tracking-widest">
                <span className="flex items-center gap-2"><FiClock /> Timeline</span>
              </th>
              <th className="px-6 py-4 text-right font-black tracking-widest">
                <span className="flex items-center gap-2 justify-end"><FiCreditCard /> Investment</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job._id} className="group transition-all duration-300">
                <td className="bg-slate-50 group-hover:bg-blue-50/50 rounded-l-[1.5rem] px-6 py-6 text-xs font-black text-slate-900 transition-colors">
                  #{job._id.slice(-6).toUpperCase()}
                </td>
                <td className="bg-slate-50 group-hover:bg-blue-50/50 px-6 py-6 transition-colors">
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-slate-800">{job.workerName || "Expert Service"}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-1">{job.workerPhone}</span>
                  </div>
                </td>
                <td className="bg-slate-50 group-hover:bg-blue-50/50 px-6 py-6 transition-colors">
                   <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-600">
                      {new Date(job.completionDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase truncate max-w-[150px] mt-1">
                      {job.address || "Main Site"}
                    </span>
                  </div>
                </td>
                <td className="bg-slate-50 group-hover:bg-blue-50/50 rounded-r-[1.5rem] px-6 py-6 text-right transition-colors">
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-black text-blue-600">LKR {job.estimatedCost.toLocaleString()}</span>
                    <span className="text-[9px] font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full mt-1 uppercase tracking-tighter">Paid Full</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {jobs.length === 0 && (
        <div className="text-center py-20 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-100">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">No transaction history found</p>
        </div>
      )}
    </div>
  );
};

export default PreviousJobsTable;