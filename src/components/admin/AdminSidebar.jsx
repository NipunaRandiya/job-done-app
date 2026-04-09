import { NavLink, useNavigate } from "react-router-dom";
import {
  HiOutlineSquares2X2, 
  HiOutlineUserPlus,    
  HiOutlineEye,         
  HiOutlineArrowRightOnRectangle,
  HiOutlineBanknotes
} from "react-icons/hi2"; 

export default function AdminSidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin/login");
  };

  const linkClass =
    "flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-300 group";

  return (
    <div className="w-80 bg-white border-r border-slate-50 min-h-screen flex flex-col shadow-[10px_0_30px_rgba(0,0,0,0.02)]">
      
      <div className="p-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
          </div>
          <h1 className="text-xl font-black text-slate-900 tracking-tighter uppercase">
            Admin<span className="text-blue-600">Core</span>
          </h1>
        </div>
        <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] mt-4 ml-1">
          Management Console
        </p>
      </div>

      <div className="px-6 mb-6">
        <hr className="border-slate-50" />
      </div>

      <nav className="flex-1 px-4 space-y-2">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive
                ? "bg-slate-900 text-white shadow-xl shadow-slate-200 translate-x-2"
                : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
            }`
          }
        >
          <HiOutlineSquares2X2 strokeWidth={2.5} size={20} /> 
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/verification"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive
                ? "bg-slate-900 text-white shadow-xl shadow-slate-200 translate-x-2"
                : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
            }`
          }
        >
          <HiOutlineUserPlus strokeWidth={2.5} size={20} /> 
          Verification
        </NavLink>

        <NavLink
          to="/admin/monitor"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive
                ? "bg-slate-900 text-white shadow-xl shadow-slate-200 translate-x-2"
                : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
            }`
          }
        >
          <HiOutlineEye strokeWidth={2.5} size={20} /> 
          Live Monitoring
        </NavLink>

        <NavLink
          to="/admin/finance"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive
                ? "bg-slate-900 text-white shadow-xl shadow-slate-200 translate-x-2"
                : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
            }`
          }
        >
          <HiOutlineBanknotes strokeWidth={2.5} size={20} /> 
          Treasury & Payouts
        </NavLink>
      </nav>

      <div className="p-6 mt-auto">
        <div className="bg-slate-50 rounded-[2rem] p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-900 font-black text-xs">
              AD
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-900 uppercase">Super Admin</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">System Access: Full</p>
            </div>
          </div>
        </div>

        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-slate-100 text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-red-50 hover:border-red-100 hover:text-red-500 transition-all duration-300"
        >
          <HiOutlineArrowRightOnRectangle strokeWidth={3} size={18} /> 
          Terminate Session
        </button>
      </div>
    </div>
  );
}