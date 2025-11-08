import { motion, AnimatePresence } from 'framer-motion';
import { InfoButton, MultiFieldAdder, YesNoToggle } from './SharedComponents';
import { Package, ChevronRight, ChevronLeft, CheckCircle, Info } from 'lucide-react';

// ===== 5. OTHER ASSETS =====
const OtherAssets = ({ formData, updateFormData, onNext, onBack, setActiveModal, darkMode = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-4xl mx-auto"
    >
      {/* Elegant Header */}
      <div className="mb-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3 mb-4"
        >
         
        </motion.div>
        <h2 className={`text-4xl sm:text-5xl font-bold mb-3 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Other Assets
        </h2>
        <p className={`text-lg ${
          darkMode ? 'text-zinc-400' : 'text-gray-600'
        }`}>
          Miscellaneous wealth and holdings not previously categorized
        </p>
      </div>

      <div className="space-y-8">
        {/* Main Question Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`group relative overflow-hidden rounded-2xl border transition-all ${
            darkMode 
              ? 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 backdrop-blur-sm' 
              : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg'
          }`}
        >
          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-4 flex-1">
                <div className={`p-3 rounded-xl transition-colors ${
                  darkMode ? 'bg-zinc-800 group-hover:bg-purple-950/50' : 'bg-gray-100 group-hover:bg-purple-50'
                }`}>
                  <Package className={`w-6 h-6 transition-colors ${
                    darkMode ? 'text-zinc-400 group-hover:text-purple-400' : 'text-gray-600 group-hover:text-purple-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <h3 className={`text-xl font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Miscellaneous Holdings
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Business inventory, international accounts, agricultural assets, or other wealth
                  </p>
                </div>
              </div>
              <InfoButton 
                onClick={() => setActiveModal('otherAssets')} 
                text="Examples" 
                darkMode={darkMode} 
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-4 ${
                darkMode ? 'text-zinc-300' : 'text-gray-700'
              }`}>
                Do you have additional assets not mentioned previously?
              </label>
              <YesNoToggle
                value={formData.hasOtherAssets}
                onChange={(val) => updateFormData('hasOtherAssets', val)}
                darkMode={darkMode}
              />
            </div>

            <AnimatePresence>
              {formData.hasOtherAssets && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden mt-6 pt-6 border-t border-gray-200 dark:border-zinc-800"
                >
                  <div className={`mb-4 p-4 rounded-xl border flex items-start gap-3 ${
                    darkMode
                      ? 'bg-blue-950/20 border-blue-900/30'
                      : 'bg-blue-50 border-blue-200'
                  }`}>
                    <Info className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                      darkMode ? 'text-blue-400' : 'text-blue-600'
                    }`} />
                    <div>
                      <p className={`text-sm font-medium mb-1 ${
                        darkMode ? 'text-blue-300' : 'text-blue-900'
                      }`}>
                        Provide Details
                      </p>
                      <p className={`text-sm ${
                        darkMode ? 'text-blue-400/80' : 'text-blue-800/80'
                      }`}>
                        Include a clear description and current cash value for each asset
                      </p>
                    </div>
                  </div>

                  <MultiFieldAdder
                    fields={formData.otherAssets}
                    setFields={(val) => updateFormData('otherAssets', val)}
                    fieldLabels={['Asset description', 'Current cash value']}
                    placeholder="Enter details"
                    darkMode={darkMode}
                  />
                </motion.div>
              )}

              {/* Info Box - No other assets */}
              {formData.hasOtherAssets === false && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className={`p-5 rounded-xl border flex items-start gap-3 mt-6 ${
                    darkMode
                      ? 'bg-emerald-950/20 border-emerald-900/30'
                      : 'bg-emerald-50 border-emerald-200'
                  }`}
                >
                  <CheckCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                    darkMode ? 'text-emerald-400' : 'text-emerald-600'
                  }`} />
                  <div>
                    <p className={`text-sm font-medium mb-1 ${
                      darkMode ? 'text-emerald-300' : 'text-emerald-900'
                    }`}>
                      No Additional Assets
                    </p>
                    <p className={`text-sm ${
                      darkMode ? 'text-emerald-400/80' : 'text-emerald-800/80'
                    }`}>
                      You can proceed to the final section on liabilities and expenses.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Helpful Information Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`p-6 rounded-xl border ${
            darkMode
              ? 'bg-zinc-800/30 border-zinc-700'
              : 'bg-gray-50 border-gray-200'
          }`}
        >
          <h4 className={`font-semibold mb-3 flex items-center gap-2 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            <Info className="w-5 h-5" />
            Common Examples
          </h4>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              'Business inventory or stock',
              'International bank accounts',
              'Agricultural produce or livestock',
              'Trade receivables',
              'Valuable collections',
              'Intellectual property'
            ].map((example, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-2 text-sm ${
                  darkMode ? 'text-zinc-400' : 'text-gray-600'
                }`}
              >
                <span className={`mt-1 ${
                  darkMode ? 'text-emerald-400' : 'text-emerald-600'
                }`}>
                  •
                </span>
                <span>{example}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-between gap-4 pt-4"
        >
          <button
            onClick={onBack}
            className={`group flex items-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all ${
              darkMode
                ? 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700'
                : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300'
            }`}
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>

          <button
            onClick={onNext}
            className={`group relative px-8 py-4 rounded-xl font-semibold text-white overflow-hidden transition-all ${
              darkMode 
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:shadow-lg hover:shadow-emerald-900/30' 
                : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:shadow-xl hover:shadow-emerald-300/50'
            }`}
          >
            <span className="relative z-10 flex items-center gap-2">
              Continue
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OtherAssets;