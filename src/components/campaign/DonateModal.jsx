import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Lock, Info, Check, X, Sparkles } from 'lucide-react';
import { useSelector } from 'react-redux';
import PayUForm from '../payments/PayUForm';
import LoginModal from '../login/LoginModal';

export default function DonateModal({ isOpen, onClose, darkMode, campaignId, zakatVerified, taxEligible }) {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [tipAmount, setTipAmount] = useState(0);
  const [tipPercentage, setTipPercentage] = useState(18);
  const [payuData, setPayuData] = useState(null);
  const [donationType, setDonationType] = useState('SADAQAH');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [claim80G, setClaim80G] = useState(false);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingDonate, setPendingDonate] = useState(false);
  const [isDonating, setIsDonating] = useState(false);

  const userInfo = useSelector((state) => state.auth.userInfo);

  const presetAmounts = [500, 1000, 5000, 10000];
  const tipPercentages = [2, 5, 10, 15, 18];

  const donationTypes = [
    { id: 'ZAKAAT', label: 'Zakat', desc: 'Obligatory charity', disabled: !zakatVerified },
    { id: 'SADAQAH', label: 'Sadaqah', desc: 'Voluntary charity' },
    { id: 'LILLAH', label: 'Lillah', desc: 'For sake of Allah' },
    { id: 'IMDAD', label: 'Imdad', desc: 'Emergency relief' },
  ];

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleDonate = async () => {
    if (isDonating) return;

    const amount = selectedAmount || parseInt(customAmount);
    if (!amount) return;

    if (!userInfo) {
      setPendingDonate(true);
      setShowLoginModal(true);
      return;
    }

    setPendingDonate(false);
    setIsDonating(true);

    try {
      if (donationType === 'ZAKAAT' && !zakatVerified) {
        alert("This campaign is not verified for Zakaat.");
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/donations/initiate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            amount,
            tipAmount,
            campaignId,
            donationType,
            isAnonymous,
            isTaxEligible: claim80G,
          }),
        }
      );

      const data = await res.json();
      setPayuData(data.payu);
    } catch (err) {
      console.error("Donation initiate failed", err);
    } finally {
      setIsDonating(false);
    }
  };

  useEffect(() => {
    if (userInfo && pendingDonate) {
      handleDonate();
    }
  }, [userInfo, pendingDonate]);

  useEffect(() => {
    const baseAmount = selectedAmount || (customAmount ? parseInt(customAmount) : 0);
    if (baseAmount > 0) {
      setTipAmount(Math.round(baseAmount * (tipPercentage / 100)));
    } else {
      setTipAmount(0);
    }
  }, [selectedAmount, customAmount, tipPercentage]);

  const handleTipPercentageClick = (percentage) => {
    setTipPercentage(percentage);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Modal Container - Scrollable */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-4 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-5xl my-auto"
              >
                <div className={`${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border-2 rounded-xl md:rounded-2xl shadow-2xl relative max-h-[95vh] overflow-y-auto`}>
                  {/* Close Button */}
                  <button
                    onClick={onClose}
                    className={`sticky top-3 right-3 md:top-4 md:right-4 float-right w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-colors z-10 ${
                      darkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-gray-400 hover:text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <X className="w-4 h-4 md:w-5 md:h-5" />
                  </button>

                  {/* Header */}
                  <div className={`relative overflow-hidden border-b-2 ${darkMode ? 'border-zinc-800' : 'border-gray-100'}`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10" />
                    <div className="relative px-4 py-3 md:px-6 md:py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg flex-shrink-0`}>
                          <Heart className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h2 className={`text-lg md:text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            Make a Difference
                          </h2>
                          <p className={`text-xs md:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Your generosity transforms lives
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Grid */}
                  <div className="grid lg:grid-cols-3 gap-4 md:gap-5 p-4 md:p-5">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-3.5 md:space-y-4">
                      {/* Donation Type */}
                      <div>
                        <label className={`block text-xs md:text-sm font-bold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                          Type of Donation
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {donationTypes.map((type) => (
                            <motion.button
                              key={type.id}
                              whileHover={{ scale: type.disabled ? 1 : 1.02 }}
                              whileTap={{ scale: type.disabled ? 1 : 0.98 }}
                              onClick={() => !type.disabled && setDonationType(type.id)}
                              disabled={type.disabled}
                              className={`
                                p-2 md:p-2.5 rounded-lg border-2 text-left transition-all
                                ${donationType === type.id
                                  ? darkMode
                                    ? 'border-emerald-500 bg-emerald-950/50 shadow-lg shadow-emerald-500/20'
                                    : 'border-emerald-600 bg-emerald-50 shadow-lg shadow-emerald-600/20'
                                  : darkMode
                                    ? 'border-zinc-800 hover:border-zinc-700'
                                    : 'border-gray-200 hover:border-gray-300'}
                                ${type.disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
                              `}
                            >
                              <div className="flex items-start justify-between mb-0.5">
                                <span className={`font-bold text-xs md:text-sm ${donationType === type.id
                                  ? darkMode ? 'text-emerald-400' : 'text-emerald-700'
                                  : darkMode ? 'text-gray-200' : 'text-gray-900'
                                }`}>
                                  {type.label}
                                </span>
                                {type.id === 'ZAKAAT' && !zakatVerified && (
                                  <Lock className="w-3 h-3 text-gray-400 flex-shrink-0" />
                                )}
                              </div>
                              <p className={`text-xs leading-snug ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                                {type.desc}
                              </p>
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Amount Selection */}
                      <div>
                        <label className={`block text-xs md:text-sm font-bold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                          Choose Amount
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {presetAmounts.map((amount) => (
                            <motion.button
                              key={amount}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => {
                                setSelectedAmount(amount);
                                setCustomAmount('');
                              }}
                              className={`
                                h-10 md:h-12 rounded-lg font-bold text-sm md:text-base border-2 transition-all
                                ${selectedAmount === amount
                                  ? darkMode
                                    ? 'border-emerald-500 bg-emerald-950/50 text-emerald-400 shadow-lg shadow-emerald-500/20'
                                    : 'border-emerald-600 bg-emerald-50 text-emerald-700 shadow-lg shadow-emerald-600/20'
                                  : darkMode
                                    ? 'border-zinc-800 text-gray-300 hover:border-zinc-700'
                                    : 'border-gray-200 text-gray-700 hover:border-gray-300'}
                              `}
                            >
                              ₹{amount.toLocaleString()}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Custom Amount */}
                      <div>
                        <label className={`block text-xs md:text-sm font-bold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                          Or Enter Custom Amount
                        </label>
                        <div className="relative">
                          <span className={`absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-base md:text-lg font-bold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            ₹
                          </span>
                          <input
                            type="number"
                            placeholder="Enter any amount"
                            value={customAmount}
                            onChange={(e) => {
                              setCustomAmount(e.target.value);
                              setSelectedAmount(null);
                            }}
                            className={`
                              w-full h-10 md:h-12 pl-9 md:pl-11 pr-4 text-sm md:text-base rounded-lg border-2 transition-all
                              ${customAmount
                                ? darkMode
                                  ? 'border-emerald-500 bg-emerald-950/50 text-white shadow-lg shadow-emerald-500/20'
                                  : 'border-emerald-600 bg-emerald-50 text-gray-900 shadow-lg shadow-emerald-600/20'
                                : darkMode
                                  ? 'border-zinc-800 bg-zinc-900 text-white placeholder-gray-600'
                                  : 'border-gray-200 bg-white text-gray-900 placeholder-gray-400'}
                              focus:outline-none focus:ring-0
                            `}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-3">
                      {/* Tip Section */}
                      <div className={`p-3 rounded-lg border-2 ${darkMode ? 'border-zinc-800 bg-zinc-900/50' : 'border-gray-200 bg-gray-50'}`}>
                        <label className={`block text-xs md:text-sm font-bold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'} flex items-center gap-2`}>
                          Support TPF
                          <div className="group relative">
                            <Info className="w-3.5 h-3.5 text-emerald-500 cursor-help" />
                            <div className={`
                              absolute bottom-full right-0 mb-2 w-56 p-3 rounded-lg text-xs leading-relaxed
                              ${darkMode ? 'bg-zinc-800 text-gray-200 border border-zinc-700' : 'bg-gray-900 text-white'}
                              opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-xl
                            `}>
                              We rely on your generosity to run this platform and connect donors with worthy causes.
                            </div>
                          </div>
                        </label>

                        <div className="grid grid-cols-5 gap-1.5 mb-2">
                          {tipPercentages.map((percentage) => (
                            <motion.button
                              key={percentage}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleTipPercentageClick(percentage)}
                              className={`
                                py-1.5 rounded-md text-xs font-bold border-2 transition-all
                                ${tipPercentage === percentage
                                  ? darkMode
                                    ? 'border-emerald-500 bg-emerald-950/50 text-emerald-400'
                                    : 'border-emerald-600 bg-emerald-50 text-emerald-700'
                                  : darkMode
                                    ? 'border-zinc-700 text-gray-400 hover:border-zinc-600'
                                    : 'border-gray-300 text-gray-700 hover:border-gray-400'}
                              `}
                            >
                              {percentage}%
                            </motion.button>
                          ))}
                        </div>

                        <div className="relative">
                          <span className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            ₹
                          </span>
                          <input
                            type="number"
                            placeholder="0"
                            value={tipAmount}
                            onChange={(e) => {
                              const val = parseInt(e.target.value);
                              setTipAmount(isNaN(val) ? 0 : val);
                              setTipPercentage(null);
                            }}
                            className={`
                              w-full h-10 pl-8 pr-3 text-sm rounded-lg border-2 transition-all
                              ${tipAmount > 0
                                ? darkMode
                                  ? 'border-emerald-500 bg-emerald-950/50 text-white'
                                  : 'border-emerald-600 bg-emerald-50 text-gray-900'
                                : darkMode
                                  ? 'border-zinc-700 bg-zinc-800 text-white placeholder-gray-600'
                                  : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400'}
                              focus:outline-none focus:ring-0
                            `}
                          />
                        </div>
                      </div>

                      {/* Options */}
                      <div className="space-y-2">
                        <label className={`flex items-center gap-2.5 cursor-pointer select-none ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          <div className={`w-4 h-4 md:w-5 md:h-5 rounded border-2 flex items-center justify-center transition-colors flex-shrink-0 ${isAnonymous
                            ? 'bg-emerald-500 border-emerald-500'
                            : darkMode ? 'border-zinc-600' : 'border-gray-300'
                          }`}>
                            {isAnonymous && <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />}
                          </div>
                          <input
                            type="checkbox"
                            checked={isAnonymous}
                            onChange={(e) => setIsAnonymous(e.target.checked)}
                            className="hidden"
                          />
                          <span className={`text-xs md:text-sm font-medium`}>
                            Make my donation anonymous
                          </span>
                        </label>

                        {taxEligible && (
                          <label className={`flex items-center gap-2.5 cursor-pointer select-none ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            <div className={`w-4 h-4 md:w-5 md:h-5 rounded border-2 flex items-center justify-center transition-colors flex-shrink-0 ${claim80G
                              ? 'bg-emerald-500 border-emerald-500'
                              : darkMode ? 'border-zinc-600' : 'border-gray-300'
                            }`}>
                              {claim80G && <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />}
                            </div>
                            <input
                              type="checkbox"
                              checked={claim80G}
                              onChange={(e) => setClaim80G(e.target.checked)}
                              className="hidden"
                            />
                            <span className={`text-xs md:text-sm font-medium`}>
                              Claim 80G tax benefits
                            </span>
                          </label>
                        )}
                      </div>

                      {/* Total Summary */}
                      {(selectedAmount || customAmount) && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`p-3 rounded-lg border-2 ${darkMode ? 'border-emerald-500/30 bg-emerald-950/30' : 'border-emerald-200 bg-emerald-50'}`}
                        >
                          <div className="space-y-1">
                            <div className={`flex justify-between text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              <span>Donation</span>
                              <span className="font-semibold">₹{(selectedAmount || Number(customAmount) || 0).toLocaleString()}</span>
                            </div>
                            {tipAmount > 0 && (
                              <div className={`flex justify-between text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                <span>Platform Tip</span>
                                <span className="font-semibold">₹{tipAmount.toLocaleString()}</span>
                              </div>
                            )}
                            <div className={`pt-1 border-t ${darkMode ? 'border-zinc-700' : 'border-gray-200'}`} />
                            <div className={`flex justify-between text-base font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
                              <span>Total</span>
                              <span>₹{((selectedAmount || Number(customAmount) || 0) + (tipAmount || 0)).toLocaleString()}</span>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Donate Button */}
                      <motion.button
                        whileHover={{ scale: (selectedAmount || customAmount) && !isDonating ? 1.02 : 1 }}
                        whileTap={{ scale: (selectedAmount || customAmount) && !isDonating ? 0.98 : 1 }}
                        onClick={handleDonate}
                        disabled={isDonating || (!selectedAmount && !customAmount)}
                        className={`
                          w-full h-11 md:h-12 rounded-lg font-bold text-sm md:text-base transition-all
                          flex items-center justify-center gap-2
                          ${isDonating
                            ? 'bg-emerald-600 text-white cursor-wait'
                            : selectedAmount || customAmount
                              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-600/30'
                              : darkMode
                                ? 'bg-zinc-800 text-gray-600 cursor-not-allowed'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
                        `}
                      >
                        {isDonating ? (
                          <>
                            <svg
                              className="animate-spin h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v0C5.373 4 0 8.373 0 12h4z"
                              />
                            </svg>
                            <span className="hidden sm:inline">Processing Donation…</span>
                            <span className="sm:hidden">Processing…</span>
                          </>
                        ) : (
                          <>
                            <Heart className="w-4 h-4" fill="currentColor" />
                            {selectedAmount || customAmount
                              ? `Donate ₹${((selectedAmount || Number(customAmount) || 0) + (tipAmount || 0)).toLocaleString()}`
                              : 'Select Amount'}
                          </>
                        )}
                      </motion.button>

                      {/* Terms */}
                      <p className={`text-xs text-center leading-relaxed ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                        By donating, you agree to our terms. {taxEligible ? 'Donations are tax-deductible and a' : 'A'} receipt will be sent to your email.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {payuData && (
              <PayUForm
                action={payuData.action}
                payload={payuData.payload}
              />
            )}
          </>
        )}
      </AnimatePresence>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        darkMode={darkMode}
        onLoginSuccess={() => setShowLoginModal(false)}
      />
    </>
  );
}