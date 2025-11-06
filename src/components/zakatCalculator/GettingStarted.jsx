
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InputField, InfoButton, Modal, MultiFieldAdder, YesNoToggle } from './SharedComponents';
// ===== GETTING STARTED =====
const GettingStarted = ({ onStart, setActiveModal }) => {
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
      key="getting-started"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className="bg-white rounded-2xl shadow-xl p-5 sm:p-6 md:p-8 border border-gray-100"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Before You Get Started
        </h2>
        <p className="text-base text-gray-600">
          Let's make sure you have everything you need
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-5 mb-4 border-2 border-emerald-200"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
          <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Documents to Have Ready
        </h3>
        <button
          onClick={() => setActiveModal('documents')}
          className="text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-2 group text-sm"
        >
          <span>View the full list</span>
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-blue-50 rounded-xl p-5 mb-6 border-2 border-blue-200"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          We Value Your Privacy
        </h3>
        <p className="text-gray-700 mb-2 text-sm">
          Your financial information is completely secure and never stored on our servers.
        </p>
        <a href="#" className="text-blue-700 hover:text-blue-800 font-semibold underline text-sm">
          Read our Privacy Policy
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center mb-6"
      >
        <div className="text-2xl sm:text-3xl mb-3" style={{ color: '#D4AF37' }}>
          بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ
        </div>
        <p className="text-gray-600 italic text-sm">In the name of Allah, the Most Gracious, the Most Merciful</p>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onStart}
        className="w-full py-4 text-base bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 transition-all duration-300"
      >
        Start Calculating Zakat
      </motion.button>
    </motion.div>
  );
};

export default GettingStarted;