import React from 'react';
export const ProgressBar = ({ currentStep }) => {
  const steps = ['Define Work', 'Select Worker', 'Confirmation'];
  return (
    <nav aria-label="Progress" className="flex items-center justify-between mb-10">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;
        return (
          <React.Fragment key={stepNumber}>
            <div className="relative z-10 flex flex-col items-center">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 font-semibold text-sm transition-all duration-300 ${isCompleted ? 'border-gray-900 bg-gray-900 text-white' : isActive ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300 bg-white text-gray-500'}`}>
                {stepNumber}
              </div>
              <p className={`mt-2 text-xs font-medium text-center transition-colors duration-300 ${isActive ? 'text-blue-600' : isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                {step}
              </p>
            </div>
            {stepNumber < steps.length && (
              <div className={`h-0.5 flex-auto transition-colors duration-300 ${isCompleted ? 'bg-gray-900' : 'bg-gray-200'}`} />
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};