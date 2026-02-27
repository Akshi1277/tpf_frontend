'use client'
import { motion, AnimatePresence } from 'framer-motion';
import { HeartCrack, HeartHandshake } from 'lucide-react';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 28,
      mass: 0.8,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: { duration: 0.18, ease: 'easeIn' },
  },
};

const iconVariants = {
  hidden: { scale: 0, rotate: -20 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 22,
      delay: 0.1,
    },
  },
};

const contentVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

export default function ExitConfirmationModal({ isOpen, onConfirm, onCancel, darkMode, totalAmount }) {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            key="exit-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onCancel}
            className="fixed inset-0 bg-black/75 z-[60]"
            style={{ backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
          />

          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              key="exit-modal"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xs sm:max-w-sm"
            >
              <div
                className={`relative rounded-2xl shadow-2xl overflow-hidden ${
                  darkMode
                    ? 'bg-zinc-900 border border-zinc-800'
                    : 'bg-white border border-gray-100'
                }`}
              >
                {/* Decorative gradient top bar */}
                <div className="h-1 w-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500" />

                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/8 via-pink-500/5 to-purple-500/8 pointer-events-none" />

                <div className="relative p-5 sm:p-6">
                  <motion.div
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col items-center"
                  >
                    {/* Icon */}
                    <motion.div variants={iconVariants} className="mb-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 via-pink-500 to-purple-500 flex items-center justify-center shadow-lg shadow-rose-500/30">
                        <HeartCrack className="w-8 h-8 text-white" strokeWidth={2} />
                      </div>
                    </motion.div>

                    {/* Text */}
                    <motion.h3
                      variants={itemVariants}
                      className={`text-lg sm:text-xl font-bold mb-2 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}
                    >
                      You Can Change Lives Today
                    </motion.h3>

                    <motion.p
                      variants={itemVariants}
                      className={`text-sm text-center mb-5 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
                    >
                      Your donation of{' '}
                      <span className="font-bold text-emerald-500">
                        ₹{totalAmount.toLocaleString()}
                      </span>{' '}
                      can make a real difference to those who need it most.
                    </motion.p>

                    {/* Buttons */}
                    <motion.div variants={itemVariants} className="w-full space-y-2">
                      <motion.button
                        onClick={onCancel}
                        whileTap={{ scale: 0.97 }}
                        className="w-full h-11 sm:h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all"
                      >
                        <HeartHandshake className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                        Change Lives Now
                      </motion.button>

                      <motion.button
                        onClick={onConfirm}
                        whileTap={{ scale: 0.97 }}
                        className={`w-full h-11 sm:h-12 rounded-xl font-semibold text-sm transition-all ${
                          darkMode
                            ? 'bg-zinc-800 hover:bg-zinc-700 text-gray-300 border border-zinc-700'
                            : 'bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200'
                        }`}
                      >
                        Maybe Next Time
                      </motion.button>
                    </motion.div>

                    <motion.p
                      variants={itemVariants}
                      className={`text-[11px] text-center mt-3 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}
                    >
                      Every contribution matters ✨
                    </motion.p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}