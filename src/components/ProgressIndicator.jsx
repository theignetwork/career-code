import React from 'react';
import { ChevronLeft } from 'lucide-react';

const ProgressIndicator = ({ currentStep, totalSteps, onBack, canGoBack = true }) => {
  const progress = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        {/* Premium Back Button */}
        <button
          onClick={onBack}
          disabled={!canGoBack || currentStep === 0}
          className={`flex items-center text-sm font-medium transition-all duration-300 ${
            canGoBack && currentStep > 0
              ? 'text-slate-400 hover:text-teal-400 cursor-pointer transform hover:scale-105'
              : 'text-slate-600 cursor-not-allowed opacity-50'
          }`}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </button>

        {/* Premium Step Counter */}
        <span className="text-sm font-medium text-slate-400">
          Question {currentStep} of {totalSteps}
        </span>
      </div>

      {/* Premium Progress Bar */}
      <div className="premium-progress h-2">
        <div
          className="premium-progress-fill transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressIndicator;