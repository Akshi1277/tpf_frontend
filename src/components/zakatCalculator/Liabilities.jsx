import { motion, AnimatePresence } from 'framer-motion';
import { MultiFieldAdder, YesNoToggle } from './SharedComponents';
import { CreditCard, ChevronLeft, Calculator, AlertCircle, CheckCircle, Info } from 'lucide-react';

const Liabilities = ({ formData, updateFormData, onCalculate, onBack, setActiveModal, darkMode = false }) => {
  const cardClass = `rounded-xl border ${darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-gray-200'}`;
  const navBtn = `px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl mx-auto"
    >
      <div className="mb-6">
        <h2 className={`text-2xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Bills & Debts You Owe</h2>
        <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>Money you owe right now — this is subtracted from your wealth</p>
      </div>

      <div className="space-y-4">
        {/* Important notice */}
        <div className={`p-4 rounded-xl border flex items-start gap-3 ${darkMode ? 'bg-amber-950/20 border-amber-900/30' : 'bg-amber-50 border-amber-200'}`}>
          <AlertCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`} />
          <div>
            <p className={`text-sm font-semibold mb-1 ${darkMode ? 'text-amber-300' : 'text-amber-900'}`}>
              Only Include What's Due Right Now
            </p>
            <p className={`text-xs mb-2 ${darkMode ? 'text-amber-200/80' : 'text-amber-800/80'}`}>
              Only add bills or debts you need to pay very soon — not the full year's total. For example, add this month's rent, not the whole year.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setActiveModal('immediatelyPayable')}
                className={`text-xs font-semibold underline flex items-center gap-1 ${darkMode ? 'text-amber-300' : 'text-amber-900'}`}
              >
                <Info className="w-3 h-3" /> What does "immediate" mean?
              </button>
              <button
                onClick={() => setActiveModal('commonExpenses')}
                className={`text-xs font-semibold underline flex items-center gap-1 ${darkMode ? 'text-amber-300' : 'text-amber-900'}`}
              >
                <Info className="w-3 h-3" /> See common expenses
              </button>
            </div>
          </div>
        </div>

        {/* Main card */}
        <div className={cardClass}>
          <div className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg ${darkMode ? 'bg-zinc-800' : 'bg-red-50'}`}>
                <CreditCard className={`w-4 h-4 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
              </div>
              <div>
                <h3 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Money You Owe</h3>
                <p className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-gray-500'}`}>Bills and debts you need to pay soon</p>
              </div>
            </div>

            <label className={`block text-xs font-medium mb-2 ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
              Do you have any bills or debts to pay soon?
            </label>
            <YesNoToggle value={formData.hasDebtsExpenses} onChange={(val) => updateFormData('hasDebtsExpenses', val)} darkMode={darkMode} />

            <AnimatePresence>
              {formData.hasDebtsExpenses && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-4 pt-4 border-t border-gray-100"
                >
                  <div className={`p-3 rounded-lg border flex items-start gap-2 mb-3 ${darkMode ? 'bg-blue-950/20 border-blue-900/30' : 'bg-blue-50 border-blue-100'}`}>
                    <Info className={`w-4 h-4 mt-0.5 flex-shrink-0 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    <p className={`text-xs ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                      Add things like your next rent payment, phone bill, loan instalment, or credit card payment due soon.
                    </p>
                  </div>
                  <MultiFieldAdder
                    fields={formData.debtsExpenses}
                    setFields={(val) => updateFormData('debtsExpenses', val)}
                    fieldLabels={['What is it? (e.g. rent, loan)', 'How much do you owe?']}
                    placeholder="Enter details"
                    darkMode={darkMode}
                  />
                </motion.div>
              )}

              {formData.hasDebtsExpenses === false && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                  className={`p-4 rounded-lg border flex items-start gap-3 mt-4 ${darkMode ? 'bg-emerald-950/20 border-emerald-900/30' : 'bg-emerald-50 border-emerald-200'}`}
                >
                  <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  <p className={`text-sm ${darkMode ? 'text-emerald-300' : 'text-emerald-900'}`}>No bills or debts to deduct — your full wealth will be used in the Zakat calculation.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Common expenses reference */}
        <div className={`p-4 rounded-xl border ${darkMode ? 'bg-zinc-800/30 border-zinc-700' : 'bg-gray-50 border-gray-200'}`}>
          <p className={`text-xs font-semibold mb-2 flex items-center gap-1.5 ${darkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
            <Info className="w-3.5 h-3.5" /> Common Things People Add Here
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              { title: 'Rent / Mortgage', items: 'Your next payment due' },
              { title: 'Utilities', items: 'Electricity, water, gas' },
              { title: 'Insurance', items: 'Next premium due' },
              { title: 'Car Payment', items: 'Monthly car loan or lease' },
              { title: 'Credit Card', items: 'Amount due this month' },
              { title: 'Loans', items: 'Your next repayment due' }
            ].map((expense, idx) => (
              <div key={idx} className={`p-2.5 rounded-lg border ${darkMode ? 'bg-zinc-900/50 border-zinc-700' : 'bg-white border-gray-200'}`}>
                <p className={`text-xs font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{expense.title}</p>
                <p className={`text-xs mt-0.5 ${darkMode ? 'text-zinc-500' : 'text-gray-500'}`}>{expense.items}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={onBack}
            className={`${navBtn} ${darkMode ? 'bg-zinc-800 text-white border border-zinc-700 hover:bg-zinc-700' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'}`}
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          <button
            onClick={onCalculate}
            className={`${navBtn} text-white shadow-sm`}
            style={{ background: 'linear-gradient(135deg, #2D7A5C 0%, #1E5A44 100%)' }}
          >
            <Calculator className="w-4 h-4" /> Calculate My Zakat
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Liabilities;