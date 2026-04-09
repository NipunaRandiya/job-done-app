import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  FiGrid, FiUser, FiCalendar, FiMessageSquare, 
  FiDollarSign, FiLogOut, FiChevronRight
} from "react-icons/fi";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const menuItems = [
  { id: "overview", label: "Dashboard", icon: <FiGrid />, path: "/worker/dashboard" },
  { id: "profile", label: "Profile", icon: <FiUser />, path: "/worker/profile" },
  { id: "jobs", label: "Jobs & Bookings", icon: <FiCalendar />, path: "/worker/jobs" },
  { id: "chat", label: "Promotion", icon: <FiMessageSquare />, path: "/worker/promotion" },
  { id: "earnings", label: "Earnings", icon: <FiDollarSign />, path: "/worker/earnings" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(`${apiBaseUrl}/workers/profile?fields=name,category,profileImage,rating`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (error) {
        console.error("Sidebar profile fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("worker_token");
    navigate("/login");
  };

  const linkClass =
    "group flex items-center justify-between px-5 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300";

  return (
    <div className="w-72 bg-white border-r border-slate-100 h-screen flex flex-col font-sans sticky top-0 overflow-hidden">
      
      <div className="p-6 pt-8">
        <div className="bg-slate-50 p-4 rounded-[2rem] border border-slate-100 flex items-center gap-4">
          {loading ? (
            <div className="flex items-center gap-3 animate-pulse w-full">
              <div className="w-12 h-12 bg-slate-200 rounded-2xl shrink-0"></div>
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-slate-200 rounded w-3/4"></div>
                <div className="h-2 bg-slate-200 rounded w-1/2"></div>
              </div>
            </div>
          ) : (
            <>
              <div className="relative">
                <img
                  src={profile?.profileImage || `https://ui-avatars.com/api/?name=${profile?.name}&background=1d83f7&color=fff&bold=true`}
                  alt="Worker Profile"
                  className="w-12 h-12 rounded-2xl object-cover shadow-sm border-2 border-white"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div className="overflow-hidden">
                <h1 className="text-sm font-black text-slate-900 truncate">
                  {profile?.name || "Pro Worker"}
                </h1>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[10px] bg-white px-2 py-0.5 rounded-lg border border-slate-200 font-black text-slate-500 flex items-center gap-1">
                    <span className="text-yellow-500 text-xs">★</span> {profile?.rating.average || "0.0"}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate">
                    {profile?.category || "Specialist"}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="px-6 mb-4">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 px-2">Main Menu</p>
      </div>

      <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              `${linkClass} ${
                isActive
                  ? "bg-slate-900 text-white shadow-xl shadow-slate-200"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`
            }
          >
            <div className="flex items-center gap-4">
              <span className="text-xl">
                {item.icon}
              </span>
              <span className="tracking-tight">{item.label}</span>
            </div>
            <FiChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity" size={14} />
          </NavLink>
        ))}
      </nav>

      <NavLink to="/worker/support" className="px-6 mb-6 mt-4">
        <div className="bg-blue-600 rounded-3xl p-5 relative overflow-hidden group cursor-pointer transition-transform hover:scale-[1.02]">
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/10 rounded-full group-hover:scale-110 transition-transform"></div>
            <p className="text-white text-xs font-bold relative z-10">Need help?</p>
            <p className="text-blue-100 text-[10px] mt-1 relative z-10 opacity-80">Contact Pro Support 24/7</p>
        </div>
      </NavLink>
      <div className="p-4 border-t border-slate-50">
        <button
          onClick={logout}
          className="w-full flex items-center gap-4 px-6 py-4 text-slate-400 font-bold text-sm hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all group"
        >
          <FiLogOut className="group-hover:rotate-12 transition-transform" size={20} />
          Logout Account
        </button>
      </div>
    </div>
  );
}