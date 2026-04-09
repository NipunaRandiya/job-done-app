import React, { useState, useCallback } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { 
  FaArrowLeft, FaArrowRight, FaCheckCircle, 
  FaEye, FaEyeSlash, FaUser, FaIdCard, 
  FaPhone, FaMapMarkerAlt, FaBriefcase, FaLock, FaEnvelope 
} from "react-icons/fa";
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';

const completeSchema = z.object({
  nic: z.string().min(1, "National ID is required"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  age: z.coerce.number().min(18, "Must be at least 18").max(100),
  telephone: z.string().min(10, "Invalid telephone number"),
  address: z.string().min(10, "Provide a complete address"),
  category: z.string().min(1, "Select a category"),
  preworks: z.string().min(20, "Provide more details"),
  email: z.string().email("Invalid email address"),
  username: z.string().min(3, "Min 3 characters"),
  location: z.object({
    lng: z.number(),
    lat: z.number(),
  }, { required_error: "Please select a location on the map" }),
  bankName: z.string().min(1, "Select a bank"),
  branchName: z.string().min(1, "Branch is required"),
  accountNumber: z.string().min(8, "Invalid account number"),
  password: z.string().min(8, "Min 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});


const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "", type: "" });

  const form = useForm({
    resolver: zodResolver(completeSchema),
    mode: "onChange",
    defaultValues: { nic: "", name: "", category: "", preworks: "", email: "", username: "", password: "", confirmPassword: "" },
  });

  const nextStep = async () => {
    const fieldsByStep = [
      ["nic", "name", "age", "telephone", "address"],
      ["category", "preworks", "bankName", "branchName", "accountNumber"],
      ["email", "username", "password", "confirmPassword"]
    ];
    const isValid = await form.trigger(fieldsByStep[step - 1]);
    if (isValid && step < 3) setStep(step + 1);
  };

  const SRI_LANKAN_BANKS = [
    { id: "BOC", name: "Bank of Ceylon" },
    { id: "SAMPATH", name: "Sampath Bank" },
    { id: "COM", name: "Commercial Bank" },
    { id: "HNB", name: "Hatton National Bank" },
    { id: "SEYLAN", name: "Seylan Bank" },
    { id: "NDB", name: "NDB Bank" },
    { id: "NTB", name: "Nations Trust Bank" },
  ];

  const onSubmit = async (data) => {
    setToast({ visible: true, message: "Processing your application...", type: "loading" });
    try {
      await axios.post("http://localhost:5000/api/workers/register", data);
      setToast({ visible: true, message: "Registration Successful!", type: "success" });
      setTimeout(() => window.location.href = "/login", 2000);
    } catch (error) {
      setToast({ visible: true, message: "Registration failed. Try again.", type: "error" });
    }
  };

  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMapClick = (e) => {
    const lat = e.detail.latLng.lat;
    const lng = e.detail.latLng.lng;
    setSelectedLocation({ lat, lng });
    form.setValue("location", { lat, lng });
  };

  const inputBase = "w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none";
  const labelStyle = "text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1 flex items-center gap-2";

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 font-sans">
      <div className="max-w-3xl mx-auto">
        
        <div className="text-center mb-10">
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-600 mb-3">Work with us</h2>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Professional Application</h1>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8 mb-8">
          <div className="flex justify-between relative">
          
            <div className="absolute top-5 left-0 w-full h-[2px] bg-slate-100 -z-0" />
            <div 
              className="absolute top-5 left-0 h-[2px] bg-blue-600 transition-all duration-500 -z-0" 
              style={{ width: `${(step - 1) * 50}%` }}
            />
            
            {[1, 2, 3].map((s) => (
              <div key={s} className="relative z-10 flex flex-col items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs transition-all duration-500 ${
                  step >= s ? "bg-slate-900 text-white shadow-lg shadow-slate-200" : "bg-white border-2 border-slate-100 text-slate-300"
                }`}>
                  {step > s ? <FaCheckCircle size={16} /> : s}
                </div>
                <span className={`text-[9px] font-black uppercase tracking-widest ${step >= s ? "text-slate-900" : "text-slate-300"}`}>
                  {s === 1 ? "Identity" : s === 2 ? "Specialty" : "Security"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-50 overflow-hidden">
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-10 md:p-16">
              
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-full md:col-span-1">
                      <label className={labelStyle}><FaIdCard /> National ID</label>
                      <div className="relative">
                        <FaIdCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                        <input {...form.register("nic")} placeholder="NIC Number" className={inputBase} />
                      </div>
                    </div>
                    <div className="col-span-full md:col-span-1">
                      <label className={labelStyle}><FaUser /> Full Name</label>
                      <div className="relative">
                        <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                        <input {...form.register("name")} placeholder="John Doe" className={inputBase} />
                      </div>
                    </div>
                    <div>
                      <label className={labelStyle}>Age</label>
                      <input type="number" {...form.register("age")} placeholder="25" className={inputBase} />
                    </div>
                    <div>
                      <label className={labelStyle}><FaPhone /> Phone</label>
                      <div className="relative">
                        <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                        <input {...form.register("telephone")} placeholder="07XXXXXXXX" className={inputBase} />
                      </div>
                    </div>
                    <div className="col-span-full">
                      <label className={labelStyle}><FaMapMarkerAlt /> Pin Your Work Location</label>
                      <div className="rounded-[2rem] overflow-hidden border-2 border-slate-100 h-72 w-full shadow-inner relative">
                        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                          <Map
                            defaultCenter={{ lat: 6.9271, lng: 79.8612 }} // Colombo
                            defaultZoom={12}
                            mapId="YOUR_MAP_ID_OR_DEMO" 
                            onClick={handleMapClick}
                            disableDefaultUI={true}
                            gestureHandling={'greedy'}
                          >
                            {selectedLocation && <AdvancedMarker position={selectedLocation} />}
                          </Map>
                        </APIProvider>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label className={labelStyle}>Written Address</label>
                      <input {...form.register("address")} placeholder="123 Street, City" className={inputBase} />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div>
                    <label className={labelStyle}><FaBriefcase /> Service Category</label>
                    <select {...form.register("category")} className={`${inputBase} appearance-none pl-6`}>
                      <option value="">Select your main skill...</option>
                      <option value="Plumbing">Plumbing & Pipework</option>
                      <option value="Electrical">Electrical Solutions</option>
                      <option value="Carpentry">Woodwork & Carpentry</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelStyle}>Experience Summary</label>
                    <textarea 
                      {...form.register("preworks")} 
                      rows="6" 
                      placeholder="Tell us about your previous projects and expertise..." 
                      className={`${inputBase} pt-4`} 
                    />
                  </div>
                  <div className="mt-10 pt-10 border-t-2 border-slate-50 space-y-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-[10px] font-black uppercase tracking-widest text-blue-600">Settlement Account</h3>
                      <div className="px-3 py-1 bg-blue-50 rounded-full flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
                        <span className="text-[8px] font-black uppercase text-blue-600">Secure Payments</span>
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 mb-6">
                      <p className="text-[10px] leading-relaxed text-slate-500 font-medium">
                        <span className="font-bold text-slate-700">Why we collect this:</span> We require your bank details to facilitate direct payment settlements once you complete a job. Your financial data is encrypted and only used for payouts.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className={labelStyle}><FaBriefcase /> Bank Name</label>
                        <select {...form.register("bankName")} className={`${inputBase} appearance-none pl-6`}>
                          <option value="">Select your bank...</option>
                          {SRI_LANKAN_BANKS.map(bank => (
                            <option key={bank.id} value={bank.name}>{bank.name}</option>
                          ))}
                        </select>
                        {form.formState.errors.bankName && <p className="text-[9px] text-red-500 mt-1 ml-2">{form.formState.errors.bankName.message}</p>}
                      </div>

                      <div>
                        <label className={labelStyle}>Branch Name</label>
                        <input {...form.register("branchName")} placeholder="e.g. Nugegoda" className={inputBase} />
                        {form.formState.errors.branchName && <p className="text-[9px] text-red-500 mt-1 ml-2">{form.formState.errors.branchName.message}</p>}
                      </div>

                      <div className="col-span-full">
                        <label className={labelStyle}>Account Number</label>
                        <input 
                          {...form.register("accountNumber")} 
                          placeholder="0000 0000 0000" 
                          className={inputBase} 
                        />
                        {form.formState.errors.accountNumber && <p className="text-[9px] text-red-500 mt-1 ml-2">{form.formState.errors.accountNumber.message}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="relative">
                    <label className={labelStyle}><FaEnvelope /> Email Address</label>
                    <FaEnvelope className="absolute left-4 top-[46px] text-slate-300" />
                    <input {...form.register("email")} type="email" placeholder="email@example.com" className={inputBase} />
                  </div>
                  <div className="relative">
                    <label className={labelStyle}><FaUser /> Username</label>
                    <FaUser className="absolute left-4 top-[46px] text-slate-300" />
                    <input {...form.register("username")} placeholder="pro_worker_01" className={inputBase} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <label className={labelStyle}><FaLock /> Password</label>
                      <FaLock className="absolute left-4 top-[46px] text-slate-300" />
                      <input {...form.register("password")} type={showPassword ? "text" : "password"} className={inputBase} />
                    </div>
                    <div className="relative">
                      <label className={labelStyle}><FaLock /> Confirm</label>
                      <FaLock className="absolute left-4 top-[46px] text-slate-300" />
                      <input {...form.register("confirmPassword")} type={showPassword ? "text" : "password"} className={inputBase} />
                    </div>
                  </div>
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-[10px] font-black uppercase text-blue-600 tracking-widest hover:underline">
                    {showPassword ? "Hide Passwords" : "Show Passwords"}
                  </button>
                </div>
              )}

              <div className="mt-12 pt-10 border-t border-slate-50 flex items-center justify-between">
                {step > 1 ? (
                  <button type="button" onClick={() => setStep(step - 1)} className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">
                    <FaArrowLeft /> Back
                  </button>
                ) : <div />}

                {step < 3 ? (
                  <button 
                    type="button" 
                    onClick={nextStep} 
                    className="px-10 py-5 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-slate-200 hover:bg-blue-600 transition-all flex items-center gap-3"
                  >
                    Continue <FaArrowRight />
                  </button>
                ) : (
                  <button 
                    type="submit"
                    className="px-10 py-5 bg-blue-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-200 hover:bg-slate-900 transition-all flex items-center gap-3"
                  >
                    Submit Application <FaCheckCircle />
                  </button>
                )}
              </div>
            </form>
          </FormProvider>
        </div>

        {/* Footer Link */}
        <p className="mt-8 text-center text-[11px] font-black uppercase tracking-widest text-slate-400">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline">Sign In</a>
        </p>
      </div>

      {toast.visible && (
        <div className={`fixed bottom-8 right-8 p-6 rounded-[2rem] shadow-2xl border flex items-center gap-4 animate-in slide-in-from-bottom-10 ${
          toast.type === 'success' ? 'bg-white border-green-100' : 'bg-white border-blue-100'
        }`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            toast.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
          }`}>
            <FaCheckCircle />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-slate-900">{toast.message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;