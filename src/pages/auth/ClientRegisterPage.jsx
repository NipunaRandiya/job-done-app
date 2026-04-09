import React, { useState } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { 
  FaCheckCircle, FaEye, FaEyeSlash, FaUser, 
  FaIdCard, FaPhone, FaMapMarkerAlt, FaEnvelope, FaLock 
} from "react-icons/fa";

const clientSchema = z.object({
  nic: z.string().min(1, "National ID is required"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  telephone: z.string().min(10, "Invalid telephone number"),
  address: z.string().min(10, "Provide a complete address"),
  email: z.string().email("Invalid email address"),
  username: z.string().min(3, "Min 3 characters"),
  password: z.string().min(8, "Min 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const ClientRegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "", type: "" });

  const form = useForm({
    resolver: zodResolver(clientSchema),
    mode: "onChange",
    defaultValues: { nic: "", name: "", telephone: "", address: "", email: "", username: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (data) => {
    const { confirmPassword, ...clientData } = data;
    setToast({ visible: true, message: "Creating your account...", type: "loading" });

    try {
      const res = await axios.post("http://localhost:5000/api/users/register", clientData);
      setToast({ visible: true, message: "Account created successfully!", type: "success" });
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setToast({ visible: true, message: error.response?.data?.message || "Registration failed.", type: "error" });
      setTimeout(() => setToast({ visible: false }), 4000);
    }
  };

  const inputBase = "w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none";
  const labelStyle = "text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1 flex items-center gap-2";

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6 font-sans">
      
      <div className="text-center mb-10">
        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-600 mb-3">Get Started</h2>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Client Registration</h1>
        <p className="text-slate-500 font-medium mt-2">Create an account to hire top-rated professionals.</p>
      </div>

      <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/60 border border-slate-50 w-full max-w-4xl overflow-hidden">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-8 md:p-14">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              
              <div className="md:col-span-2 border-b border-slate-50 pb-2">
                <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-900">Personal Details</h3>
              </div>

              <div className="relative group">
                <label className={labelStyle}><FaUser size={10} /> Full Name</label>
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                  <input {...form.register("name")} placeholder="Enter your full name" className={inputBase} />
                </div>
              </div>

              <div className="relative group">
                <label className={labelStyle}><FaIdCard size={10} /> National ID</label>
                <div className="relative">
                  <FaIdCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                  <input {...form.register("nic")} placeholder="NIC Number" className={inputBase} />
                </div>
              </div>

              <div className="relative group">
                <label className={labelStyle}><FaPhone size={10} /> Phone Number</label>
                <div className="relative">
                  <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                  <input {...form.register("telephone")} placeholder="+94 XX XXX XXXX" className={inputBase} />
                </div>
              </div>

              <div className="relative group">
                <label className={labelStyle}><FaEnvelope size={10} /> Email</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                  <input {...form.register("email")} type="email" placeholder="name@email.com" className={inputBase} />
                </div>
              </div>

              <div className="md:col-span-2 relative group">
                <label className={labelStyle}><FaMapMarkerAlt size={10} /> Home Address</label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input {...form.register("address")} placeholder="Residential address for service visits" className={inputBase} />
                </div>
              </div>

              <div className="md:col-span-2 border-b border-slate-50 pb-2 mt-4">
                <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-900">Security</h3>
              </div>

              <div className="relative group">
                <label className={labelStyle}>Username</label>
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input {...form.register("username")} placeholder="Choose a username" className={inputBase} />
                </div>
              </div>

              <div className="relative group">
                <label className={labelStyle}>Password</label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input 
                    {...form.register("password")} 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Min. 8 characters" 
                    className={inputBase} 
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-blue-500"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <button 
                type="submit" 
                disabled={!form.formState.isValid}
                className="w-full py-5 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-slate-200 hover:bg-blue-600 transition-all active:scale-[0.98] disabled:opacity-50 disabled:bg-slate-300 flex justify-center items-center gap-3"
              >
                <FaCheckCircle strokeWidth={3} />
                Create Client Account
              </button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:text-blue-700 ml-1">
                  Sign In
                </Link>
              </p>
            </div>

          </form>
        </FormProvider>
      </div>

      {toast.visible && (
        <div className="fixed bottom-10 right-10 bg-white border border-slate-100 p-6 rounded-[2rem] shadow-2xl flex items-center gap-4 animate-in slide-in-from-bottom-5">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${toast.type === 'success' ? 'bg-green-100 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
            <FaCheckCircle size={18} />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-slate-900">{toast.message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientRegisterPage;