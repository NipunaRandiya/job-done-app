import React from "react";
import { FaShieldAlt, FaUserCheck, FaClock } from "react-icons/fa";

export default function AboutSection() {
  const values = [
    {
      icon: <FaShieldAlt />,
      title: "Secure Payments",
      desc: "Funds are held in escrow and only released when you're 100% satisfied."
    },
    {
      icon: <FaUserCheck />,
      title: "Verified Experts",
      desc: "Every professional undergoes a rigorous multi-step identity and skill check."
    },
    {
      icon: <FaClock />,
      title: "Fast Dispatch",
      desc: "Average response time is under 30 minutes for urgent repair requests."
    }
  ];

  return (
    <section className="py-32 px-6 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="relative">
          <div className="absolute -inset-10 bg-blue-100/50 rounded-full blur-3xl opacity-50" />
          <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-none mb-8 relative">
            We’re Redefining <br />
            <span className="text-blue-600">Home Maintenance.</span>
          </h2>
          <p className="text-slate-500 font-medium text-lg leading-relaxed mb-10">
            Born in Colombo, our platform connects busy homeowners with the most skilled local professionals. We remove the guesswork from repairs by providing transparent pricing and verified reviews.
          </p>
          <div className="space-y-6">
            {values.map((v, i) => (
              <div key={i} className="flex gap-5 items-start">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-blue-600 shrink-0 border border-slate-100">
                  {v.icon}
                </div>
                <div>
                  <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest mb-1">{v.title}</h4>
                  <p className="text-sm text-slate-500 font-medium">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="relative h-[500px] bg-slate-200 rounded-[4rem] overflow-hidden shadow-2xl">
           <img 
            src="/images/about_us.jpg" 
            alt="Handyman working" 
            className="w-full h-full object-cover grayscale-[0.2] hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute bottom-10 left-10 bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-50">
            <p className="text-4xl font-black text-blue-600 tracking-tighter">12k+</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Successful Fixes</p>
          </div>
        </div>
      </div>
    </section>
  );
}