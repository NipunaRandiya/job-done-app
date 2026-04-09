import { useEffect, useState } from "react";
import { FiUsers, FiClock, FiActivity, FiStar, FiArrowUpRight, FiZap } from "react-icons/fi";

export default function DashboardOverview() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    setStats({
      totalWorkers: { value: 284, label: "Registered Experts", growth: "+12%", icon: <FiUsers /> },
      pendingApprovals: { value: 12, label: "Awaiting Vetting", growth: "-2", icon: <FiClock />, alert: true },
      activeJobs: { value: 67, label: "Live Engagements", growth: "+5%", icon: <FiActivity /> },
      avgRating: { value: 4.8, label: "Platform Pulse", growth: "+0.2", icon: <FiStar /> },
    });
  }, []);

  if (!stats) return (
    <div className="p-10 flex items-center justify-center min-h-screen">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="p-10 bg-[#F8FAFC] min-h-screen">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Intelligence</h1>
        <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] mt-2">
          Real-time platform performance metrics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-10">
        {Object.entries(stats).map(([key, data]) => (
          <div key={key} className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-50 group hover:scale-[1.02] transition-transform duration-300">
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-2xl ${data.alert ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-600'} text-xl`}>
                {data.icon}
              </div>
                <span className={`text-[10px] font-black px-3 py-1 rounded-full ${
                  String(data.growth).startsWith('+') 
                    ? 'bg-emerald-50 text-emerald-600' 
                    : 'bg-slate-100 text-slate-500'
                }`}>
                  {data.growth}
                </span>
              </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{data.label}</p>
            <h3 className="text-4xl font-black text-slate-900 tracking-tighter">
              {typeof data.value === 'number' && key === 'avgRating' ? data.value.toFixed(1) : data.value}
            </h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 bg-slate-900 rounded-[3rem] p-10 relative overflow-hidden shadow-2xl shadow-blue-200">
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h4 className="text-white text-xl font-black tracking-tight uppercase">System Velocity</h4>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">Transaction flow vs. Deployment</p>
              </div>
              <FiZap className="text-blue-400 text-3xl animate-pulse" />
            </div>
            
            <div className="h-48 w-full flex items-end gap-2">
              {[40, 70, 45, 90, 65, 80, 95, 70, 85, 100, 80, 90].map((h, i) => (
                <div 
                  key={i} 
                  className="flex-1 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all duration-1000 ease-out hover:from-white hover:to-white"
                  style={{ height: `${h}%`, opacity: (i + 1) / 12 }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-6 text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">
              <span>Mon</span><span>Wed</span><span>Fri</span><span>Sun</span>
            </div>
          </div>
          
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />
        </div>

        <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50">
          <h4 className="text-slate-900 text-sm font-black uppercase tracking-widest mb-8 flex items-center gap-3">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
            Live Logs
          </h4>
          <div className="space-y-8">
            {[
              { time: "12:44", msg: "New worker verified", user: "Kamal P.", color: "text-emerald-500" },
              { time: "12:30", msg: "Job #4421 completed", user: "Alex R.", color: "text-blue-500" },
              { time: "11:15", msg: "Payment failed", user: "Saman W.", color: "text-red-500" },
              { time: "10:02", msg: "New dispute raised", user: "User #99", color: "text-amber-500" },
            ].map((log, i) => (
              <div key={i} className="flex gap-4 items-start">
                <span className="text-[10px] font-black text-slate-300 mt-1">{log.time}</span>
                <div>
                  <p className="text-[11px] font-black text-slate-900 uppercase tracking-tight">{log.msg}</p>
                  <p className={`text-[9px] font-bold ${log.color} uppercase mt-0.5`}>{log.user}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-10 py-4 border-2 border-slate-50 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-colors">
            View All Audit Logs
          </button>
        </div>

      </div>
    </div>
  );
}