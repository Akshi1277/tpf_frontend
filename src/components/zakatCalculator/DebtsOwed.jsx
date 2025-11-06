
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InputField, InfoButton, Modal, MultiFieldAdder, YesNoToggle } from './SharedComponents';
// ===== 4. DEBTS OWED =====
const DebtsOwed = ({ formData, updateFormData, onNext, onBack }) => {
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
      key="step2"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className="bg-white rounded-2xl shadow-xl p-5 sm:p-6  md:p-8 border border-gray-100"
    >
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Debts Owed to You
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          Money that others owe you
        </p>
      </div>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label className="block text-sm font-medium mb-3 text-gray-700">
            Does anyone owe money to you?
          </label>
          <YesNoToggle
            value={formData.owedMoney}
            onChange={(val) => updateFormData('owedMoney', val)}
          />
        </motion.div>

        <AnimatePresence>
          {formData.owedMoney && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden space-y-4"
            >
              <div>
                <label className="block text-sm font-medium mb-3 text-gray-700">
                  Do you expect them to pay you back?
                </label>
                <YesNoToggle
                  value={formData.expectPayback}
                  onChange={(val) => updateFormData('expectPayback', val)}
                />
              </div>

              {formData.expectPayback === true && (
                <InputField
                  label="Amount Owed"
                  value={formData.owedAmount}
                  onChange={(val) => updateFormData('owedAmount', val)}
                  helperText="Total amount you expect to receive"
                />
              )}

              {formData.expectPayback === false && (
                <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200">
                  <p className="text-sm text-gray-700">Zakat is not due on debts you don't expect to recover.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {formData.owedMoney === false && (
          <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200">
            <p className="text-sm text-gray-700">No zakat is payable on debts owed to you.</p>
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
          Continue to Other Assets
        </motion.button>
      </div>
    </motion.div>
  );
};

export default DebtsOwed