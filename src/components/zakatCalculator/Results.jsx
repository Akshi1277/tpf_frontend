
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InputField, InfoButton, Modal, MultiFieldAdder, YesNoToggle } from './SharedComponents';
// ===== 7. RESULTS =====
const Results = ({ results, onReset, formatCurrency }) => {
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
      key="step5"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-emerald-600 to-emerald-500 p-5 sm:p-6 text-center relative overflow-hidden"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"
        />
        <div className="relative">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Zakat Calculation Complete
          </h2>
          <p className="text-emerald-50 text-sm sm:text-base">Your detailed breakdown</p>
        </div>
      </motion.div>

      <div className="p-5 sm:p-6 md:p-8">
        <div className="space-y-3 mb-6">
          {[
            { label: 'Total Assets', value: results.totalAssets, delay: 0.3 },
            { label: 'Total Liabilities', value: results.totalLiabilities, delay: 0.4, negative: true },
            { label: 'Net Zakatable Wealth', value: results.zakatableWealth, delay: 0.5, highlight: true },
            { label: 'Nisab Threshold', value: results.nisab, delay: 0.6, small: true },
            { label: 'Zakat Due (2.5%)', value: results.zakatDue, delay: 0.7, zakat: true }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: item.delay }}
              className={`flex justify-between items-center py-3 px-4 rounded-xl transition-all ${
                item.highlight ? 'bg-emerald-50 border-2 border-emerald-200' :
                item.zakat ? 'bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-300' :
                'border-b border-gray-100'
              }`}
            >
              <span className={`font-semibold text-sm sm:text-base ${
                item.small ? 'text-gray-600' : 'text-gray-800'
              }`}>
                {item.label}
              </span>
              <span className={`font-bold text-lg sm:text-xl ${
                item.zakat ? 'text-emerald-700' :
                item.highlight ? 'text-emerald-600' :
                item.negative ? 'text-red-600' :
                'text-gray-900'
              }`}>
                {item.negative && '−'}{formatCurrency(Math.abs(item.value))}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className={`rounded-xl p-5 mb-5 text-center ${
            results.isEligible 
              ? 'bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-200'
              : 'bg-blue-50 border-2 border-blue-200'
          }`}
        >
          <p className={`text-sm sm:text-base font-medium leading-relaxed ${
            results.isEligible ? 'text-emerald-900' : 'text-blue-900'
          }`}>
            {results.isEligible 
              ? "Your wealth exceeds the Nisab threshold. Zakat is obligatory if you have held this wealth for one lunar year."
              : "Your wealth is below the Nisab threshold. Zakat is not obligatory at this time, though voluntary charity (Sadaqah) is always encouraged."}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button className="flex-1 py-4 text-sm sm:text-base bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-200 transition-all">
            Save Calculation
          </button>
          <button
            onClick={onReset}
            className="flex-1 py-4 text-sm sm:text-base bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all"
          >
            Start New Calculation
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-sm text-gray-600 italic mt-5 leading-relaxed"
        >
          May your contribution bring blessings to you and those in need.
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Results;