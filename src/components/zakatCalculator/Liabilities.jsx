import { motion, AnimatePresence } from 'framer-motion';
import { InfoButton, MultiFieldAdder, YesNoToggle } from './SharedComponents';
import { CreditCard, ChevronLeft, Calculator, AlertCircle, CheckCircle, Info } from 'lucide-react';

// ===== 6. LIABILITIES =====
const Liabilities = ({ formData, updateFormData, onCalculate, onBack, setActiveModal, darkMode = false }) => {
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
          Debts & Expenses
        </h2>
        <p className={`text-lg ${
          darkMode ? 'text-zinc-400' : 'text-gray-600'
        }`}>
          Immediate debts and upcoming expenses to deduct from your wealth
        </p>
      </div>

      <div className="space-y-8">
        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`p-6 rounded-xl border ${
            darkMode
              ? 'bg-amber-950/20 border-amber-900/30'
              : 'bg-amber-50 border-amber-200'
          }`}
        >
          <div className="flex items-start gap-3">
            <AlertCircle className={`w-6 h-6 mt-0.5 flex-shrink-0 ${
              darkMode ? 'text-amber-400' : 'text-amber-600'
            }`} />
            <div>
              <p className={`font-semibold mb-2 ${
                darkMode ? 'text-amber-300' : 'text-amber-900'
              }`}>
                Important: Immediate Obligations Only
              </p>
              <p className={`text-sm mb-3 ${
                darkMode ? 'text-amber-200/80' : 'text-amber-800/80'
              }`}>
                Include only debts and expenses due immediately—not annual totals. For example, this month's rent, not the full year.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setActiveModal('immediatelyPayable')}
                  className={`text-sm font-medium underline flex items-center gap-1 ${
                    darkMode
                      ? 'text-amber-300 hover:text-amber-200'
                      : 'text-amber-900 hover:text-amber-700'
                  }`}
                >
                  <Info className="w-4 h-4" />
                  What does "immediate" mean?
                </button>
                <button
                  onClick={() => setActiveModal('commonExpenses')}
                  className={`text-sm font-medium underline flex items-center gap-1 ${
                    darkMode
                      ? 'text-amber-300 hover:text-amber-200'
                      : 'text-amber-900 hover:text-amber-700'
                  }`}
                >
                  <Info className="w-4 h-4" />
                  See common expenses
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Question Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`group relative overflow-hidden rounded-2xl border transition-all ${
            darkMode 
              ? 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 backdrop-blur-sm' 
              : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg'
          }`}
        >
          <div className="p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className={`p-3 rounded-xl transition-colors ${
                darkMode ? 'bg-zinc-800 group-hover:bg-red-950/50' : 'bg-gray-100 group-hover:bg-red-50'
              }`}>
                <CreditCard className={`w-6 h-6 transition-colors ${
                  darkMode ? 'text-zinc-400 group-hover:text-red-400' : 'text-gray-600 group-hover:text-red-600'
                }`} />
              </div>
              <div className="flex-1">
                <h3 className={`text-xl font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Outstanding Obligations
                </h3>
                <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                  Immediate debts, bills, and expenses due for payment
                </p>
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-4 ${
                darkMode ? 'text-zinc-300' : 'text-gray-700'
              }`}>
                Do you have immediate debts or expenses?
              </label>
              <YesNoToggle
                value={formData.hasDebtsExpenses}
                onChange={(val) => updateFormData('hasDebtsExpenses', val)}
                darkMode={darkMode}
              />
            </div>

            <AnimatePresence>
              {formData.hasDebtsExpenses && (
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
                        List Your Immediate Obligations
                      </p>
                      <p className={`text-sm ${
                        darkMode ? 'text-blue-400/80' : 'text-blue-800/80'
                      }`}>
                        Include upcoming rent, mortgage, bills, loan payments, or other debts due now
                      </p>
                    </div>
                  </div>

                  <MultiFieldAdder
                    fields={formData.debtsExpenses}
                    setFields={(val) => updateFormData('debtsExpenses', val)}
                    fieldLabels={['Expense or debt description', 'Amount due']}
                    placeholder="Enter details"
                    darkMode={darkMode}
                  />
                </motion.div>
              )}

              {/* Info Box - No debts */}
              {formData.hasDebtsExpenses === false && (
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
                      No Immediate Liabilities
                    </p>
                    <p className={`text-sm ${
                      darkMode ? 'text-emerald-400/80' : 'text-emerald-800/80'
                    }`}>
                      Your full wealth will be used in the Zakat calculation.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Common Expenses Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`p-6 rounded-xl border ${
            darkMode
              ? 'bg-zinc-800/30 border-zinc-700'
              : 'bg-gray-50 border-gray-200'
          }`}
        >
          <h4 className={`font-semibold mb-4 flex items-center gap-2 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            <Info className="w-5 h-5" />
            Commonly Deductible Expenses
          </h4>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { title: 'Housing', items: 'Next rent or mortgage payment' },
              { title: 'Utilities', items: 'Upcoming electricity, water, gas bills' },
              { title: 'Insurance', items: 'Next premium for home, auto, health' },
              { title: 'Transportation', items: 'Upcoming car payment or lease' },
              { title: 'Credit Cards', items: 'Minimum payment due this month' },
              { title: 'Personal Loans', items: 'Next installment payment' }
            ].map((expense, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg border ${
                  darkMode
                    ? 'bg-zinc-900/50 border-zinc-700'
                    : 'bg-white border-gray-200'
                }`}
              >
                <p className={`text-sm font-semibold mb-1 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {expense.title}
                </p>
                <p className={`text-xs ${
                  darkMode ? 'text-zinc-400' : 'text-gray-600'
                }`}>
                  {expense.items}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
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
            onClick={onCalculate}
            className={`group relative px-8 py-4 rounded-xl font-semibold text-white overflow-hidden transition-all shadow-xl ${
              darkMode 
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:shadow-emerald-900/50' 
                : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:shadow-emerald-400/50'
            }`}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Calculate My Zakat
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Liabilities;