import { motion, AnimatePresence } from 'framer-motion';
import { InputField, YesNoToggle } from './SharedComponents';
import { HandCoins, ChevronRight, ChevronLeft, AlertCircle, CheckCircle } from 'lucide-react';

const DebtsOwed = ({ formData, updateFormData, onNext, onBack, darkMode = false }) => {
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
        <h2 className={`text-2xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Money Others Owe You</h2>
        <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>Has anyone borrowed money from you?</p>
      </div>

      <div className="space-y-4">
        <div className={cardClass}>
          <div className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg ${darkMode ? 'bg-zinc-800' : 'bg-teal-50'}`}>
                <HandCoins className={`w-4 h-4 ${darkMode ? 'text-teal-400' : 'text-teal-600'}`} />
              </div>
              <div>
                <h3 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Loans You've Given</h3>
                <p className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-gray-500'}`}>Money you lent to a friend, family member, or through your business</p>
              </div>
            </div>

            <label className={`block text-xs font-medium mb-2 ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
              Has anyone borrowed money from you?
            </label>
            <YesNoToggle value={formData.owedMoney} onChange={(val) => updateFormData('owedMoney', val)} darkMode={darkMode} />

            <AnimatePresence>
              {formData.owedMoney && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-4 space-y-3 pt-4 border-t border-gray-100"
                >
                  <div className={`p-4 rounded-lg border ${darkMode ? 'bg-zinc-800/30 border-zinc-700' : 'bg-gray-50 border-gray-100'}`}>
                    <label className={`block text-xs font-medium mb-2 ${darkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
                      Do you think they will pay you back?
                    </label>
                    <YesNoToggle value={formData.expectPayback} onChange={(val) => updateFormData('expectPayback', val)} darkMode={darkMode} />
                  </div>

                  <AnimatePresence mode="wait">
                    {formData.expectPayback === true && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className={`p-4 rounded-lg border ${darkMode ? 'bg-emerald-950/10 border-emerald-900/30' : 'bg-emerald-50/50 border-emerald-100'}`}
                      >
                        <InputField
                          label="How much do they owe you in total?"
                          value={formData.owedAmount}
                          onChange={(val) => updateFormData('owedAmount', val)}
                          helperText="Enter the total you expect to get back"
                          darkMode={darkMode}
                        />
                      </motion.div>
                    )}
                    {formData.expectPayback === false && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className={`p-4 rounded-lg border flex items-start gap-3 ${darkMode ? 'bg-blue-950/20 border-blue-900/30' : 'bg-blue-50 border-blue-200'}`}
                      >
                        <AlertCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                        <div>
                          <p className={`text-sm font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>No Zakat on This</p>
                          <p className={`text-xs mt-0.5 ${darkMode ? 'text-blue-400/80' : 'text-blue-800/70'}`}>
                            If you don't expect to get the money back, you don't need to include it in your Zakat.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {formData.owedMoney === false && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                  className={`p-4 rounded-lg border flex items-start gap-3 mt-4 ${darkMode ? 'bg-emerald-950/20 border-emerald-900/30' : 'bg-emerald-50 border-emerald-200'}`}
                >
                  <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  <p className={`text-sm ${darkMode ? 'text-emerald-300' : 'text-emerald-900'}`}>Nobody owes you money — you can move on to the next step.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            onClick={onBack}
            className={`${navBtn} ${darkMode ? 'bg-zinc-800 text-white border border-zinc-700 hover:bg-zinc-700' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'}`}
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          <button
            onClick={onNext}
            className={`${navBtn} text-white`}
            style={{ background: 'linear-gradient(135deg, #2D7A5C 0%, #1E5A44 100%)' }}
          >
            Continue <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default DebtsOwed;