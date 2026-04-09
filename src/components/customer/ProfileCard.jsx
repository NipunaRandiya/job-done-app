import React, { useState, useEffect } from "react";
import { FiUser, FiPhone, FiMapPin, FiEdit3, FiX, FiShield, FiLock, FiAtSign, FiCheck } from "react-icons/fi";

const Button = ({ children, variant = "primary", className = "", ...props }) => {
  const variants = {
    primary: "bg-slate-900 text-white hover:bg-blue-600 shadow-xl shadow-slate-200",
    secondary: "bg-white text-slate-900 hover:bg-blue-500 hover:text-white shadow-lg",
    outline: "border-2 border-slate-100 text-slate-600 hover:border-blue-500 hover:text-blue-600",
  };
  return (
    <button className={`inline-flex items-center justify-center rounded-2xl px-6 py-4 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] transition-all active:scale-95 ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Input = ({ label, icon: Icon, ...props }) => (
  <div className="space-y-2 w-full">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
    <div className="relative group">
      {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={16} />}
      <input className={`w-full bg-slate-50 border-none rounded-xl ${Icon ? 'pl-12' : 'px-5'} py-4 text-xs font-bold text-slate-700 placeholder:text-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all`} {...props} />
    </div>
  </div>
);

const Dialog = ({ open, onOpenChange, title, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-md p-0 sm:p-4">
      <div className="bg-white rounded-t-[2.5rem] sm:rounded-[3rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in slide-in-from-bottom sm:zoom-in duration-300">
        <div className="flex items-center justify-between p-6 sm:p-8 border-b border-slate-50">
          <h3 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">{title}</h3>
          <button onClick={() => onOpenChange(false)} className="p-2 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-full transition-colors">
            <FiX size={20} />
          </button>
        </div>
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

const ProfileCard = ({ profile }) => {
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [profileForm, setProfileForm] = useState({
    fullName: "",
    username: "",
    telephone: "",
    address: "",
    newPassword: "",
    confirmPassword: ""
  });

  useEffect(() => {
    if (profile) {
      setProfileForm({
        fullName: profile.name || "",
        username: profile.username || "",
        telephone: profile.telephone || "",
        address: profile.address || "",
        newPassword: "",
        confirmPassword: ""
      });
    }
  }, [profile]);

  if (!profile) return null;

  return (
    <>
      <div className="bg-slate-900 rounded-[2.5rem] p-6 sm:p-10 shadow-2xl shadow-slate-300 text-white flex flex-col items-center text-center relative overflow-hidden h-full min-h-[500px]">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none" />
        
        <div className="relative mb-6 sm:mb-8 mt-4">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-[2rem] sm:rounded-[2.5rem] bg-gradient-to-tr from-blue-600 to-cyan-400 p-1 rotate-6 hover:rotate-0 transition-transform duration-500 shadow-xl shadow-blue-500/20">
            <div className="w-full h-full rounded-[1.8rem] sm:rounded-[2.3rem] bg-slate-900 flex items-center justify-center">
              <FiUser size={40} className="text-white sm:text-[48px]" />
            </div>
          </div>
          <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-emerald-500 rounded-full border-4 border-slate-900 flex items-center justify-center shadow-lg">
            <FiShield size={10} className="text-white" />
          </div>
        </div>

        <div className="mb-8 sm:mb-10 px-2">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-2 truncate max-w-[250px] sm:max-w-none">
            {profile.name}
          </h2>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 rounded-full">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-400">Verified Client</span>
          </div>
        </div>

        <div className="w-full space-y-3 sm:space-y-4 mb-8 sm:mb-10">
          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 group hover:bg-white/10 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                <FiPhone size={14} className="text-blue-400" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-slate-300 truncate">{profile.telephone}</span>
          </div>
          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 text-left group hover:bg-white/10 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                <FiMapPin size={14} className="text-blue-400" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-slate-300 leading-tight line-clamp-2">
              {profile.address || 'Colombo, Sri Lanka'}
            </span>
          </div>
        </div>

        <Button
          variant="secondary"
          className="w-full mt-auto py-5 sm:py-4"
          onClick={() => setShowEditProfileModal(true)}
        >
          <FiEdit3 className="mr-3" size={14} /> Account Settings
        </Button>
      </div>

      <Dialog
        open={showEditProfileModal}
        onOpenChange={setShowEditProfileModal}
        title="Account Settings"
      >
        <div className="space-y-5 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              icon={FiUser}
              value={profileForm.fullName}
              onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
            />
            <Input
              label="Username"
              icon={FiAtSign}
              value={profileForm.username}
              onChange={(e) => setProfileForm({ ...profileForm, username: e.target.value })}
            />
          </div>

          <Input
            label="Phone Number"
            icon={FiPhone}
            value={profileForm.phone}
            onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
          />

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Home Address</label>
            <textarea
              className="w-full bg-slate-50 border-none rounded-xl px-5 py-4 text-xs font-bold text-slate-700 placeholder:text-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none min-h-[80px]"
              value={profileForm.address}
              onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
            />
          </div>

          <div className="pt-6 border-t border-slate-100">
            <div className="flex items-center gap-2 mb-4">
              <FiLock className="text-blue-500" />
              <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Security Update</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                type="password"
                label="New Password"
                placeholder="••••••••"
                value={profileForm.newPassword}
                onChange={(e) => setProfileForm({ ...profileForm, newPassword: e.target.value })}
              />
              <Input
                type="password"
                label="Confirm Password"
                placeholder="••••••••"
                value={profileForm.confirmPassword}
                onChange={(e) => setProfileForm({ ...profileForm, confirmPassword: e.target.value })}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button variant="outline" className="w-full sm:flex-1 order-2 sm:order-1" onClick={() => setShowEditProfileModal(false)}>
              Discard
            </Button>
            <Button className="w-full sm:flex-1 order-1 sm:order-2" onClick={() => setShowEditProfileModal(false)}>
              <FiCheck className="mr-2" size={14}/> Save Updates
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ProfileCard;