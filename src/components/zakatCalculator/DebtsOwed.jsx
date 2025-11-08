import { motion, AnimatePresence } from 'framer-motion';
import { InputField, YesNoToggle } from './SharedComponents';
import { HandCoins, ChevronRight, ChevronLeft, AlertCircle, CheckCircle } from 'lucide-react';

// ===== 4. DEBTS OWED =====
const DebtsOwed = ({ formData, updateFormData, onNext, onBack, darkMode = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-4xl mx-auto"
    >
      {/* <div className="mb-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3 mb-4"
        >
          <div className={`h-1 w-12 rounded-full ${
            darkMode ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-emerald-600 to-teal-600'
          }`} />
          <span className={`text-sm font-semibold tracking-wider uppercase ${
            darkMode ? 'text-emerald-400' : 'text-emerald-600'
          }`}>
            Step 2 of 4
          </span>
        </motion.div>
        <h2 className={`text-4xl sm:text-5xl font-bold mb-3 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Debts Owed to You
        </h2>
        <p className={`text-lg ${
          darkMode ? 'text-zinc-400' : 'text-gray-600'
        }`}>
          Money owed to you by others
        </p>
      </div> */}

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
            <div className="flex items-start gap-4 mb-6">
              <div className={`p-3 rounded-xl transition-colors ${
                darkMode ? 'bg-zinc-800 group-hover:bg-teal-950/50' : 'bg-gray-100 group-hover:bg-teal-50'
              }`}>
                <HandCoins className={`w-6 h-6 transition-colors ${
                  darkMode ? 'text-zinc-400 group-hover:text-teal-400' : 'text-gray-600 group-hover:text-teal-600'
                }`} />
              </div>
              <div className="flex-1">
                <h3 className={`text-xl font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Receivable Accounts
                </h3>
                <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                  Personal loans, business receivables, or other debts owed to you
                </p>
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-4 ${
                darkMode ? 'text-zinc-300' : 'text-gray-700'
              }`}>
                Does anyone owe you money?
              </label>
              <YesNoToggle
                value={formData.owedMoney}
                onChange={(val) => updateFormData('owedMoney', val)}
                darkMode={darkMode}
              />
            </div>

            <AnimatePresence>
              {formData.owedMoney && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden space-y-6 mt-6 pt-6 border-t border-gray-200 dark:border-zinc-800"
                >
                  {/* Expectation of Repayment */}
                  <div className={`p-6 rounded-xl border ${
                    darkMode
                      ? 'bg-zinc-800/30 border-zinc-700/50'
                      : 'bg-gray-50/50 border-gray-200/50'
                  }`}>
                    <label className={`block text-sm font-medium mb-4 ${
                      darkMode ? 'text-zinc-300' : 'text-gray-700'
                    }`}>
                      Do you reasonably expect repayment?
                    </label>
                    <YesNoToggle
                      value={formData.expectPayback}
                      onChange={(val) => updateFormData('expectPayback', val)}
                      darkMode={darkMode}
                    />
                  </div>

                  {/* Amount Input - Only if expecting repayment */}
                  <AnimatePresence mode="wait">
                    {formData.expectPayback === true && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className={`p-6 rounded-xl border ${
                          darkMode
                            ? 'bg-emerald-950/10 border-emerald-900/30'
                            : 'bg-emerald-50/30 border-emerald-100'
                        }`}
                      >
                        <InputField
                          label="Total Amount Receivable"
                          value={formData.owedAmount}
                          onChange={(val) => updateFormData('owedAmount', val)}
                          helperText="Total amount you reasonably expect to collect"
                          darkMode={darkMode}
                        />
                      </motion.div>
                    )}

                    {/* Info Box - Not expecting repayment */}
                    {formData.expectPayback === false && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className={`p-5 rounded-xl border flex items-start gap-3 ${
                          darkMode
                            ? 'bg-blue-950/20 border-blue-900/30'
                            : 'bg-blue-50 border-blue-200'
                        }`}
                      >
                        <AlertCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                          darkMode ? 'text-blue-400' : 'text-blue-600'
                        }`} />
                        <div>
                          <p className={`text-sm font-medium mb-1 ${
                            darkMode ? 'text-blue-300' : 'text-blue-900'
                          }`}>
                            No Zakat Due
                          </p>
                          <p className={`text-sm ${
                            darkMode ? 'text-blue-400/80' : 'text-blue-800/80'
                          }`}>
                            Zakat is not payable on debts you don't reasonably expect to recover.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* Info Box - No debts owed */}
              {formData.owedMoney === false && (
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
                      No Outstanding Receivables
                    </p>
                    <p className={`text-sm ${
                      darkMode ? 'text-emerald-400/80' : 'text-emerald-800/80'
                    }`}>
                      You can proceed to the next section.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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

export default DebtsOwed;