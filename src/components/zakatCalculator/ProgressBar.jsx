
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InputField, InfoButton, Modal, MultiFieldAdder, YesNoToggle } from './SharedComponents';
// ===== 2. PROGRESS BAR =====
const ProgressBar = ({ currentStep, steps }) => {
  const progressPercentage = currentStep === -1 ? 0 : ((currentStep + 1) / steps.length) * 100;

  if (currentStep < 0) return null;

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between mb-3">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-500 ${
                    index <= currentStep
                      ? 'bg-emerald-600 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {index + 1}
                </div>
                <div className="mt-1 text-center hidden sm:block">
                  <p className={`text-xs font-semibold transition-colors ${
                    index <= currentStep ? 'text-emerald-600' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 h-0.5 mx-2 sm:mx-3 bg-gray-200 rounded-full overflow-hidden -mt-4 sm:-mt-6">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: index < currentStep ? '100%' : '0%' }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-emerald-600"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="h-full bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-full"
          />
        </div>
        <div className="flex justify-between mt-1.5">
          <p className="text-xs text-gray-500">Step {currentStep + 1} of {steps.length}</p>
          <p className="text-xs font-medium text-emerald-600">{Math.round(progressPercentage)}% Complete</p>
        </div>
      </div>
    </div>
  );
};


export default ProgressBar;