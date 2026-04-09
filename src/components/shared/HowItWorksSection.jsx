import React from 'react';
import { FiFileText, FiUsers, FiDollarSign, FiCalendar } from "react-icons/fi";

const steps = [
  {
    icon: <FiFileText />,
    title: 'Describe Project',
    description: 'Tell us what you need help with by describing your issue in detail.'
  },
  {
    icon: <FiUsers />,
    title: 'Get Matched',
    description: "We'll connect you with qualified professionals specializing in your type of task."
  },
  {
    icon: <FiDollarSign />,
    title: 'Review Estimates',
    description: 'Receive personalized cost estimates based on your details and material needs.'
  },
  {
    icon: <FiCalendar />,
    title: 'Schedule Service',
    description: 'Choose a time that works for you and book with your selected professional.'
  }
];

const HowItWorksSection = () => {
  return (
    <section className="py-32 font-sans bg-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-4">The Process</p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">
            Four Simple Steps
          </h2>
          <p className="text-lg text-slate-500 font-medium">
            We've streamlined the way you find and hire home professionals to save you time and stress.
          </p>
        </div>
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-slate-50 z-0"></div>

          {steps.map((step, index) => (
            <div key={index} className="relative z-10 group">
              
              <div className="relative mb-8 inline-block">
                <div className="w-24 h-24 bg-white rounded-[2rem] border border-slate-100 flex items-center justify-center text-3xl text-slate-900 shadow-xl shadow-slate-100 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500">
                  {step.icon}
                </div>
                
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xs font-black shadow-lg border-4 border-white">
                  0{index + 1}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-black text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 w-10 h-1 bg-slate-100 group-hover:w-20 group-hover:bg-blue-600 transition-all duration-500 rounded-full"></div>
            </div>
          ))}
        </div>

        <div className="mt-24 text-center">
            <div className="inline-flex flex-col md:flex-row items-center gap-6 p-4 md:p-2 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                <p className="pl-6 text-sm font-bold text-slate-600">Ready to get started with your first project?</p>
                <button className="bg-slate-900 text-white px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-slate-200">
                    Get an Estimate Now
                </button>
            </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;