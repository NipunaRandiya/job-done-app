import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiLogIn, FiUser, FiLock, FiAlertCircle } from "react-icons/fi";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const LoginPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("workers");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    try {
      const response = await axios.post(`${apiBaseUrl}/${role}/login`, {
        username,
        password,
      });

      localStorage.setItem("token", response.data.token);

      if (role === "workers") navigate("/worker/dashboard");
      else navigate("/customer/dashboard");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Login failed. Check your credentials."
      );
    }
  };

  const roleImages = {
    workers: "/images/pro_login_image.jpg",
    users: "/images/client_login_image.jpg",
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-6xl bg-white rounded-[3rem] shadow-2xl shadow-slate-200 overflow-hidden flex flex-col md:row-reverse md:flex-row-reverse border border-slate-50">
        
        <div className="md:w-1/2 p-10 md:p-20 flex flex-col justify-center bg-white">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-2">
              Authentication
            </h2>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-4">
              Welcome back
            </h1>
            <p className="text-slate-500 font-medium">
              Enter your credentials to access your portal.
            </p>
          </div>

          <div className="flex p-1 bg-slate-100 rounded-2xl mb-8">
            <button
              onClick={() => setRole("workers")}
              className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
                role === "workers"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              Professional
            </button>
            <button
              onClick={() => setRole("users")}
              className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
                role === "users"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              Client
            </button>
          </div>

          {errorMessage && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 animate-in fade-in slide-in-from-top-2">
              <FiAlertCircle className="shrink-0" />
              <p className="text-xs font-bold uppercase tracking-tight">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="relative group">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                required
              />
            </div>

            <div className="relative group">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                required
              />
            </div>

            <div className="flex items-center justify-between py-2">
              <label className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="hidden"
                />
                <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${rememberMe ? 'bg-blue-600 border-blue-600' : 'border-slate-200'}`}>
                    {rememberMe && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <span className="ml-3 text-[11px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-600">Remember me</span>
              </label>
              <Link to="/forgot-password" size="sm" className="text-[11px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-700">
                Forgot?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center py-5 rounded-2xl bg-slate-900 text-white text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-slate-200 hover:bg-blue-600 transition-all active:scale-95 gap-3 mt-4"
            >
              <FiLogIn strokeWidth={3} />
              Sign In
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">
              New to Job Done?{" "}
              <Link to="/register" className="text-blue-600 hover:text-blue-700 ml-1">
                Create Account
              </Link>
            </p>
          </div>
        </div>

        <div className="hidden md:block md:w-1/2 relative bg-slate-900">
          <img
            src={roleImages[role]}
            alt="Login Illustration"
            className="object-cover w-full h-full opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
          
          <div className="absolute bottom-16 left-16 right-16">
            <div className="inline-block p-4 bg-white/10 backdrop-blur-md rounded-[2rem] border border-white/10">
                <p className="text-white text-sm font-medium italic leading-relaxed">
                   "The most efficient way to get our home maintenance handled. Professional and reliable every time."
                </p>
                <div className="mt-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500" />
                    <div>
                        <p className="text-xs font-black text-white uppercase tracking-widest">Sarah Wijesinghe</p>
                        <p className="text-[10px] text-white/50 font-bold uppercase">Platinum Client</p>
                    </div>
                </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;