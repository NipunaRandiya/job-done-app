import React, { useState } from "react";
import { 
  FiHeadphones, FiMessageCircle, FiMail, FiFileText, 
  FiChevronRight, FiSearch, FiLifeBuoy, FiX, FiCheckCircle 
} from "react-icons/fi";

export default function SupportPage() {
  const [selectedGuide, setSelectedGuide] = useState(null);

  const supportCategories = [
    { title: "Booking Issues", desc: "Problems with active jobs or cancellations", icon: <FiFileText /> },
    { title: "Payment Support", desc: "Earnings, withdrawals, and escrow queries", icon: <FiSearch /> },
    { title: "Account Security", desc: "Verification and profile management", icon: <FiLifeBuoy /> },
  ];

  const guideDetails = {
    "Terms of Service": [
      "All engagements must be recorded through the JobDone platform.",
      "Professional conduct is required at all times on-site.",
      "Cancellations within 2 hours of booking may incur a fee.",
      "Direct solicitation of clients outside the app is prohibited."
    ],
    "Worker Protection Policy": [
      "Accident insurance coverage during active job hours.",
      "Safety escrow for all high-value equipment used.",
      "Right to refuse work in unsafe or hazardous conditions.",
      "24/7 emergency coordination with local authorities."
    ],
    "Payment Cycles": [
      "Automated payouts every Tuesday at 10:00 AM.",
      "Bank transfer processing takes 1-2 business days.",
      "Cash collection commissions are capped at 10%.",
      "Earnings dashboard updates in real-time after job completion."
    ]
  };

  return (
    <div className="flex-1 p-6 lg:p-10 bg-[#f8fafc] min-h-screen font-sans text-slate-900 relative">
      
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest mb-4">
          <FiHeadphones className="animate-bounce" /> 24/7 Pro Support
        </div>
        <h1 className="text-4xl font-black tracking-tighter text-slate-900 uppercase">
          How can we <span className="text-blue-600">Help you?</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ContactCard icon={<FiMessageCircle />} title="Live Chat" value="Average wait: 2 mins" actionText="Start Chat" primary />
            <ContactCard icon={<FiMail />} title="Email Support" value="pro-support@jobdone.lk" actionText="Send Email" />
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Frequent Categories</h3>
            <div className="space-y-4">
              {supportCategories.map((cat, i) => (
                <button key={i} className="w-full flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-400 hover:bg-white transition-all group">
                  <div className="flex items-center gap-5 text-left">
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm text-blue-600 text-xl group-hover:scale-110 transition-transform">
                      {cat.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{cat.title}</h4>
                      <p className="text-xs text-slate-400 font-medium">{cat.desc}</p>
                    </div>
                  </div>
                  <FiChevronRight className="text-slate-300 group-hover:text-blue-600 transition-colors" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-xl">
            <div className="relative z-10">
              <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4">Urgent Assistance</h3>
              <p className="text-2xl font-bold tracking-tight mb-2">Pro Hotline</p>
              <a href="tel:+94112345678" className="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-900/40 mt-4">
                Call +94 11 234 5678
              </a>
            </div>
            <FiHeadphones className="absolute -right-6 -bottom-6 text-9xl text-white/5 rotate-12" />
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4">Pro Handbook</h4>
            <div className="space-y-3">
              {Object.keys(guideDetails).map((text, i) => (
                <div 
                  key={i} 
                  onClick={() => setSelectedGuide(text)}
                  className="flex items-center justify-between text-xs font-bold text-slate-500 hover:text-blue-600 cursor-pointer transition-colors group p-2 hover:bg-slate-50 rounded-lg"
                >
                  {text}
                  <FiChevronRight className="opacity-0 group-hover:opacity-100" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedGuide && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md transition-all">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-black text-slate-900 leading-none">{selectedGuide}</h3>
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-2">Professional Guidelines</p>
              </div>
              <button 
                onClick={() => setSelectedGuide(null)}
                className="p-3 bg-slate-50 hover:bg-red-50 hover:text-red-500 rounded-2xl transition-all"
              >
                <FiX size={20} />
              </button>
            </div>
            
            <div className="p-8 space-y-6">
              {guideDetails[selectedGuide].map((point, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="mt-1 text-emerald-500 bg-emerald-50 p-1 rounded-md">
                    <FiCheckCircle size={16} />
                  </div>
                  <p className="text-sm font-medium text-slate-600 leading-relaxed">
                    {point}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-8 bg-slate-50">
              <button 
                onClick={() => setSelectedGuide(null)}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-lg"
              >
                Got it, Thanks
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ContactCard({ icon, title, value, actionText, primary = false }) {
  return (
    <div className={`rounded-[2rem] p-8 border transition-all ${
      primary ? "bg-blue-600 border-blue-500 shadow-xl shadow-blue-100" : "bg-white border-slate-100 shadow-sm"
    }`}>
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-6 ${
        primary ? "bg-white/20 text-white" : "bg-blue-50 text-blue-600"
      }`}>
        {icon}
      </div>
      <h3 className={`text-lg font-bold tracking-tight mb-1 ${primary ? "text-white" : "text-slate-900"}`}>{title}</h3>
      <p className={`text-xs font-medium mb-6 ${primary ? "text-blue-100" : "text-slate-400"}`}>{value}</p>
      <button className={`w-full py-3.5 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all ${
        primary ? "bg-white text-blue-600 hover:bg-blue-50" : "bg-slate-900 text-white hover:bg-slate-800 shadow-md"
      }`}>{actionText}</button>
    </div>
  );
}