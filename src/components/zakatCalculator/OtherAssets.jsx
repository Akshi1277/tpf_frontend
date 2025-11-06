
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InputField, InfoButton, Modal, MultiFieldAdder, YesNoToggle } from './SharedComponents';
// ===== 5. OTHER ASSETS =====
const OtherAssets = ({ formData, updateFormData, onNext, onBack, setActiveModal }) => {
  const pageVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  const pageTransition = {
    type: "tween",
    ease: [0.22, 1, 0.36, 1],
    duration: 0.5
  };

  return (
    <motion.div
      key="step3"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className="bg-white rounded-2xl shadow-xl p-5 sm:p-6 md:p-8 border border-gray-100"
    >
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Other Assets
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          Any additional wealth not mentioned previously
        </p>
      </div>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              Do you own any other assets not mentioned above?
            </label>
            <InfoButton onClick={() => setActiveModal('otherAssets')} text="See list of other assets" />
          </div>
          
          <YesNoToggle
            value={formData.hasOtherAssets}
            onChange={(val) => updateFormData('hasOtherAssets', val)}
          />
        </motion.div>

        <AnimatePresence>
          {formData.hasOtherAssets && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <MultiFieldAdder
                fields={formData.otherAssets}
                setFields={(val) => updateFormData('otherAssets', val)}
                fieldLabels={['Description', 'Cash Value']}
                placeholder="Describe asset / Enter value"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {formData.hasOtherAssets === false && (
          <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200">
            <p className="text-sm text-gray-700">No additional assets to report.</p>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={onBack}
          className="w-full sm:w-auto px-8 py-4 text-sm sm:text-base bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all"
        >
          Back
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={onNext}
          className="flex-1 py-4 text-sm sm:text-base bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-200 transition-all duration-300"
        >
          Continue to Debts & Expenses
        </motion.button>
      </div>
    </motion.div>
  );
};

export default OtherAssets;