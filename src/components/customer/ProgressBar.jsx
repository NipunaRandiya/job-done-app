import React from 'react';
import { BsCheckCircle } from 'react-icons/bs';

export const ProgressBar = ({ currentStep }) => {
  const steps = ['Define Work', 'Select Worker', 'Confirmation'];
  return (
    <nav className="flex items-center justify-between relative max-w-2xl mx-auto">
      <div className="absolute top-5 left-0 w-full h-0.5 bg-slate-100 z-0" />
      
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;
        return (
          <div key={stepNumber} className="relative z-10 flex flex-col items-center group">
            <div className={`
              flex h-10 w-10 items-center justify-center rounded-2xl border-4 transition-all duration-500
              ${isCompleted ? 'bg-slate-900 border-white text-white shadow-lg' : 
                isActive ? 'bg-blue-600 border-white text-white shadow-xl scale-110' : 
                'bg-white border-slate-100 text-slate-300'}
            `}>
              {isCompleted ? <BsCheckCircle size={18} /> : <span className="text-xs font-black">{stepNumber}</span>}
            </div>
            <p className={`mt-4 text-[9px] font-black uppercase tracking-[0.2em] transition-colors duration-300 ${isActive ? 'text-blue-600' : 'text-slate-400'}`}>
              {step}
            </p>
          </div>
        );
      })}
    </nav>
  );
};