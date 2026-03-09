'use client'
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, ArrowRight } from 'lucide-react';

const GATEWAY_FEE_PERCENT = 2.3;

export { GATEWAY_FEE_PERCENT };

export default function ZakatFeeModal({ isOpen, onConfirm, darkMode, donationAmount }) {
  const dk = darkMode;
  const feeAmount    = Math.round(donationAmount * (GATEWAY_FEE_PERCENT / 100) * 100) / 100;
  const countedZakat = Math.round((donationAmount - feeAmount) * 100) / 100;
  const totalWithFee = Math.round((donationAmount + feeAmount) * 100) / 100;

  const [selected, setSelected] = useState('pay_more');

  useEffect(() => {
    if (isOpen) setSelected('pay_more');
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="zakat-fee-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[60] bg-black/50"
            style={{ backdropFilter: 'blur(2px)', WebkitBackdropFilter: 'blur(2px)' }}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[61] flex items-center justify-center p-4">
            <motion.div
              key="zakat-fee-modal"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden ${
                dk ? 'bg-zinc-900 border border-zinc-700' : 'bg-white border border-gray-100'
              }`}
            >
              {/* Header */}
              <div className={`px-5 pt-5 pb-4 border-b ${dk ? 'border-zinc-800' : 'border-gray-100'}`}>
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    dk ? 'bg-amber-500/15' : 'bg-amber-50'
                  }`}>
                    <AlertCircle className={`w-5 h-5 ${dk ? 'text-amber-400' : 'text-amber-500'}`} />
                  </div>
                  <div>
                    <h3 className={`text-sm font-bold ${dk ? 'text-white' : 'text-gray-900'}`}>
                      A small processing fee applies
                    </h3>
                    <p className={`text-[11px] mt-0.5 leading-relaxed ${dk ? 'text-zinc-400' : 'text-gray-500'}`}>
                      Help us receive the{' '}
                      <span className={`font-bold ${dk ? 'text-white' : 'text-gray-900'}`}>
                        full ₹{donationAmount.toLocaleString()} donation
                      </span>{' '}
                      by covering the payment processing fee — not us, the payment provider charges it.
                    </p>
                  </div>
                </div>
              </div>

              {/* Info strip */}
              <div className={`mx-4 mt-4 rounded-xl px-4 py-3 ${
                dk ? 'bg-zinc-800/60 border border-zinc-700/50' : 'bg-gray-50 border border-gray-100'
              }`}>
                <p className={`text-[10px] font-bold uppercase tracking-wider mb-2.5 ${dk ? 'text-zinc-500' : 'text-gray-400'}`}>
                  Your Zakat amount
                </p>
                <div className="flex items-center justify-between">
                  <span className={`text-xl font-extrabold tracking-tight ${dk ? 'text-white' : 'text-gray-900'}`}>
                    ₹{donationAmount.toLocaleString()}
                  </span>
                  <div className={`text-right text-[11px] ${dk ? 'text-zinc-400' : 'text-gray-500'}`}>
                    <span>Processing fee = </span>
                    <span className={`font-semibold ${dk ? 'text-amber-400' : 'text-amber-600'}`}>
                      ₹{feeAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Options */}
              <div className="px-4 mt-3 space-y-2.5">

                {/* Option 1: Pay more */}
                <button
                  onClick={() => setSelected('pay_more')}
                  className={`w-full text-left rounded-xl border-2 p-3.5 transition-all ${
                    selected === 'pay_more'
                      ? dk ? 'border-emerald-500 bg-emerald-500/10' : 'border-emerald-500 bg-emerald-50'
                      : dk ? 'border-zinc-700 bg-zinc-800/40 hover:border-zinc-600' : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div className={`mt-0.5 w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      selected === 'pay_more' ? 'border-emerald-500 bg-emerald-500' : dk ? 'border-zinc-600' : 'border-gray-300'
                    }`}>
                      {selected === 'pay_more' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <div>
                      <p className={`text-xs font-bold mb-0.5 ${dk ? 'text-white' : 'text-gray-900'}`}>
                        Add ₹{feeAmount.toLocaleString()} to cover the processing fee
                      </p>
                      <p className={`text-[11px] leading-relaxed ${dk ? 'text-zinc-400' : 'text-gray-500'}`}>
                        100% of your Zakat reaches those in need.{' '}
                        <span className={`font-bold ${dk ? 'text-emerald-400' : 'text-emerald-600'}`}>
                          Total: ₹{totalWithFee.toLocaleString()}
                        </span>
                      </p>
                    </div>
                  </div>
                </button>

                {/* Option 2: Count less */}
                <button
                  onClick={() => setSelected('count_less')}
                  className={`w-full text-left rounded-xl border-2 p-3.5 transition-all ${
                    selected === 'count_less'
                      ? dk ? 'border-emerald-500 bg-emerald-500/10' : 'border-emerald-500 bg-emerald-50'
                      : dk ? 'border-zinc-700 bg-zinc-800/40 hover:border-zinc-600' : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div className={`mt-0.5 w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      selected === 'count_less' ? 'border-emerald-500 bg-emerald-500' : dk ? 'border-zinc-600' : 'border-gray-300'
                    }`}>
                      {selected === 'count_less' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <div>
                      <p className={`text-xs font-bold mb-0.5 ${dk ? 'text-white' : 'text-gray-900'}`}>
                        Pay ₹{donationAmount.toLocaleString()} — deduct fee from Zakat
                      </p>
                      <p className={`text-[11px] leading-relaxed ${dk ? 'text-zinc-400' : 'text-gray-500'}`}>
                        Only{' '}
                        <span className={`font-bold ${dk ? 'text-amber-400' : 'text-amber-600'}`}>
                          ₹{countedZakat.toLocaleString()}
                        </span>{' '}
                        will count as your Zakat after the fee is deducted.
                      </p>
                    </div>
                  </div>
                </button>
              </div>

              {/* CTA */}
              <div className="px-4 pt-3 pb-5">
                <button
                  onClick={() => selected && onConfirm(selected)}
                  disabled={!selected}
                  className={`w-full h-11 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                    selected
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-600/20 active:scale-[0.98]'
                      : dk
                        ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed border border-zinc-700'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Donate Now ₹{selected === 'pay_more' ? totalWithFee.toLocaleString() : donationAmount.toLocaleString()}
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className={`text-center text-[10px] mt-2 ${dk ? 'text-zinc-600' : 'text-gray-400'}`}>
                  We don't keep any fees — this is just for your Zakat records
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}