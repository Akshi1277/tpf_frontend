'use client'
import { motion, AnimatePresence } from 'framer-motion';
import { HeartCrack, HeartHandshake } from 'lucide-react';

export default function ExitConfirmationModal({ isOpen, onConfirm, onCancel, darkMode, totalAmount }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="exit-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onCancel}
            className="fixed inset-0 bg-black/70 z-[60]"
            style={{ backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              key="exit-modal"
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-[320px] rounded-2xl shadow-2xl overflow-hidden ${
                darkMode ? 'bg-zinc-900 border border-zinc-800' : 'bg-white border border-gray-100'
              }`}
            >
              {/* Top accent bar */}
              <div className="h-0.5 w-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500" />

              <div className="p-5">
                {/* Icon + text */}
                <div className="flex flex-col items-center text-center mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg shadow-rose-500/30 mb-3">
                    <HeartCrack className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                  <h3 className={`text-base font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    You Can Change Lives Today
                  </h3>
                  <p className={`text-xs leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Your donation of{' '}
                    <span className="font-bold text-emerald-500">₹{totalAmount.toLocaleString()}</span>
                    {' '}can make a real difference.
                  </p>
                </div>

                {/* Buttons */}
                <div className="space-y-2">
                  <button
                    onClick={onCancel}
                    className="w-full h-10 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 active:scale-[0.98] text-white rounded-xl font-bold text-sm shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all"
                  >
                    <HeartHandshake className="w-4 h-4 flex-shrink-0" />
                    Complete My Donation
                  </button>

                  <button
                    onClick={onConfirm}
                    className={`w-full h-10 rounded-xl font-medium text-sm transition-colors active:scale-[0.98] ${
                      darkMode
                        ? 'bg-zinc-800 hover:bg-zinc-700 text-gray-400 border border-zinc-700'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-500 border border-gray-200'
                    }`}
                  >
                    Maybe Next Time
                  </button>
                </div>

                <p className={`text-[10px] text-center mt-3 ${darkMode ? 'text-zinc-600' : 'text-gray-400'}`}>
                  Every contribution matters ✨
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}