import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiShield, FiLock, FiUser, FiAlertCircle } from "react-icons/fi";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 800);
    } catch (err) {
      setError("Invalid admin credentials. Access denied.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] font-sans p-6">
      <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-100 w-full max-w-[480px] flex flex-col items-center relative overflow-hidden">
        
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
        
        <div className="w-20 h-20 bg-slate-900 rounded-[2rem] flex items-center justify-center mb-8 shadow-xl shadow-slate-200">
          <FiShield className="w-10 h-10 text-white" />
        </div>

        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Admin Portal</h2>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em]">Secure Access Required</p>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Username</label>
            <div className="relative group">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={18} />
              <input
                type="text"
                required
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold text-slate-800 outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all placeholder:text-slate-300"
                placeholder="Enter admin ID"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Password</label>
            <div className="relative group">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={18} />
              <input
                type="password"
                required
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold text-slate-800 outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all placeholder:text-slate-300"
                placeholder="••••••••"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-500 bg-red-50 p-4 rounded-xl border border-red-100 animate-shake">
              <FiAlertCircle className="shrink-0" />
              <p className="text-xs font-bold uppercase tracking-tight">{error}</p>
            </div>
          )}

          <button 
            disabled={loading}
            className={`w-full py-4 rounded-2xl text-white font-black text-sm uppercase tracking-widest transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-3 ${
              loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-slate-900 hover:bg-slate-800 shadow-slate-200'
            }`}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              "Authorize Access"
            )}
          </button>
        </form>

        <p className="mt-8 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
          Authorized Personnel Only
        </p>
      </div>
    </div>
  );
}