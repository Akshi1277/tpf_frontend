import { motion, AnimatePresence } from 'framer-motion';
import { InfoButton, MultiFieldAdder, YesNoToggle } from './SharedComponents';
import { Package, ChevronRight, ChevronLeft, CheckCircle, Info } from 'lucide-react';

const OtherAssets = ({ formData, updateFormData, onNext, onBack, setActiveModal, darkMode = false }) => {
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
        <h2 className={`text-2xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Anything Else You Own</h2>
        <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>Other valuable things you own that we haven't covered yet</p>
      </div>

      <div className="space-y-4">
        <div className={cardClass}>
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${darkMode ? 'bg-zinc-800' : 'bg-purple-50'}`}>
                  <Package className={`w-4 h-4 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                </div>
                <div>
                  <h3 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Other Valuables</h3>
                  <p className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-gray-500'}`}>Business stock, overseas accounts, and other items of value</p>
                </div>
              </div>
              <InfoButton onClick={() => setActiveModal('otherAssets')} text="Examples" darkMode={darkMode} />
            </div>

            <label className={`block text-xs font-medium mb-2 ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
              Do you own anything valuable that we haven't asked about yet?
            </label>
            <YesNoToggle value={formData.hasOtherAssets} onChange={(val) => updateFormData('hasOtherAssets', val)} darkMode={darkMode} />

            <AnimatePresence>
              {formData.hasOtherAssets && (
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
                      Write what it is and how much it is worth today.
                    </p>
                  </div>
                  <MultiFieldAdder
                    fields={formData.otherAssets}
                    setFields={(val) => updateFormData('otherAssets', val)}
                    fieldLabels={['What is it?', 'How much is it worth today?']}
                    placeholder="Enter details"
                    darkMode={darkMode}
                  />
                </motion.div>
              )}

              {formData.hasOtherAssets === false && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                  className={`p-4 rounded-lg border flex items-start gap-3 mt-4 ${darkMode ? 'bg-emerald-950/20 border-emerald-900/30' : 'bg-emerald-50 border-emerald-200'}`}
                >
                  <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  <p className={`text-sm ${darkMode ? 'text-emerald-300' : 'text-emerald-900'}`}>No other valuables — you can move on to the next step.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Common examples */}
        <div className={`p-4 rounded-xl border ${darkMode ? 'bg-zinc-800/30 border-zinc-700' : 'bg-gray-50 border-gray-200'}`}>
          <p className={`text-xs font-semibold mb-2 flex items-center gap-1.5 ${darkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
            <Info className="w-3.5 h-3.5" /> Common Examples
          </p>
          <div className="grid grid-cols-2 gap-1">
            {['Business stock held for sale', 'Overseas bank accounts', 'Money owed to your business', 'Valuable collections', 'Intellectual property'].map((example, idx) => (
              <p key={idx} className={`text-xs flex items-center gap-1.5 ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
                <span className="text-emerald-500">•</span> {example}
              </p>
            ))}
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

export default OtherAssets;