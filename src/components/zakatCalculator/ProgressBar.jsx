import { motion } from 'framer-motion';

const ProgressBar = ({ currentStep, steps, darkMode = false }) => {
  if (currentStep < 0) return null;

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className={`border-b sticky top-0 z-40 transition-colors ${darkMode ? 'bg-[#121212] border-zinc-800' : 'bg-white border-gray-200'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3">
        {/* Step indicators */}
        <div className="flex items-center justify-between mb-2">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-300 ${index < currentStep
                    ? 'bg-emerald-600 text-white'
                    : index === currentStep
                      ? (darkMode ? 'bg-emerald-500 text-white ring-4 ring-emerald-900/50' : 'bg-emerald-600 text-white ring-4 ring-emerald-100')
                      : (darkMode ? 'bg-zinc-800 text-zinc-500' : 'bg-gray-100 text-gray-400')
                  }`}>
                  {index < currentStep ? (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <p className={`hidden sm:block text-xs mt-1 font-medium transition-colors ${index <= currentStep ? (darkMode ? 'text-emerald-400' : 'text-emerald-700') : (darkMode ? 'text-zinc-500' : 'text-gray-400')
                  }`}>
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 mx-2 h-0.5 rounded-full overflow-hidden -mt-4 sm:-mt-5 transition-colors ${darkMode ? 'bg-zinc-800' : 'bg-gray-100'}`}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: index < currentStep ? '100%' : '0%' }}
                    transition={{ duration: 0.4 }}
                    className={`h-full ${darkMode ? 'bg-emerald-400' : 'bg-emerald-500'}`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className={`w-full rounded-full h-1 overflow-hidden transition-colors ${darkMode ? 'bg-zinc-800' : 'bg-gray-100'}`}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`h-full rounded-full ${darkMode ? 'bg-emerald-400' : 'bg-emerald-500'}`}
          />
        </div>
        <div className="flex justify-between mt-1">
          <p className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-gray-400'}`}>Step {currentStep + 1} of {steps.length}</p>
          <p className={`text-xs font-semibold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>{Math.round(progressPercentage)}%</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;