'use client'
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Lock, X, Sparkles, Moon, Coins, Gift, Star, HandHeart } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import LoginModal from '../login/LoginModal/MainModal';
import { useAppToast } from '@/app/AppToastContext';

export default function DonatePopUpModal({ isOpen, onClose, darkMode, campaignId, ribaEligible, zakatVerified, taxEligible, allowedDonationTypes = [] }) {
  const [selectedAmount, setSelectedAmount] = useState(1000); // Prefilled default
  const [customAmount, setCustomAmount] = useState('');
  const [tipPercentage, setTipPercentage] = useState(10); // Prefilled default
  const [customTip, setCustomTip] = useState(''); // Custom tip amount
  const [cashfreeData, setCashfreeData] = useState(null);
  const [donationType, setDonationType] = useState('SADAQAH'); // Prefilled default
  const [isAnonymous, setIsAnonymous] = useState(false);
  // const [claim80G, setClaim80G] = useState(false); // Commented out

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingDonate, setPendingDonate] = useState(false);
  const [isDonating, setIsDonating] = useState(false);

  const checkoutStartedRef = useRef(false);

  const userInfo = useSelector((state) => state.auth.userInfo);
  const { showToast } = useAppToast();

  const presetAmounts = [
    { value: 500, label: '500' },
    { value: 1000, label: '1k' },
    { value: 5000, label: '5k' },
    { value: 10000, label: '10k' }
  ];
  const tipPercentages = [0, 5, 10, 15]; // Added 0%

  const allDonationTypes = [
    { id: 'ZAKAAT', label: 'Zakat', Icon: Moon, disabled: !zakatVerified },
    { id: 'RIBA', label: 'RIBA', Icon: Coins, disabled: !ribaEligible },
    { id: 'SADAQAH', label: 'Sadaqah', Icon: Gift },
    { id: 'LILLAH', label: 'Lillah', Icon: Star },
    { id: 'IMDAD', label: 'Imdad', Icon: HandHeart },
  ];

  const filteredDonationTypes = allowedDonationTypes?.length > 0
    ? allDonationTypes.filter(t => allowedDonationTypes.some(at => at.toUpperCase() === t.id.toUpperCase() || (at.toUpperCase() === 'ZAKAT' && t.id === 'ZAKAAT')))
    : allDonationTypes;

  // Set default donation type if restricted
  useEffect(() => {
    if (allowedDonationTypes?.length > 0 && !allowedDonationTypes.some(at => at.toUpperCase() === donationType.toUpperCase() || (at.toUpperCase() === 'ZAKAT' && donationType === 'ZAKAAT'))) {
      setDonationType(filteredDonationTypes[0]?.id || 'SADAQAH');
    }
  }, [allowedDonationTypes, filteredDonationTypes]);

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

    if (amount < 50) {
      showToast({
        title: "Minimum Amount",
        message: "The minimum donation amount is ₹50.",
        type: "error"
      });
      return;
    }

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

      // Calculate tip based on custom or percentage
      const calculatedTipAmount = customTip 
        ? parseInt(customTip) 
        : tipPercentage 
          ? Math.round(amount * (tipPercentage / 100)) 
          : 0;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/donations/initiate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            amount,
            tipAmount: calculatedTipAmount,
            campaignId,
            donationType,
            isAnonymous,
            isTaxEligible: false, // claim80G commented out
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data?.cashfree?.paymentSessionId) {
        throw new Error(data?.message || "Unable to initiate payment");
      }

      setCashfreeData(data.cashfree);

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
    if (!cashfreeData?.paymentSessionId) return;
    if (checkoutStartedRef.current) return;

    checkoutStartedRef.current = true;

    const startCheckout = () => {
      const cashfree = new window.Cashfree({
        mode: process.env.NEXT_PUBLIC_CASHFREE_MODE || "sandbox",
      });

      cashfree.checkout({
        paymentSessionId: cashfreeData.paymentSessionId,
        redirectTarget: "_self",
      });
    };

    if (window.Cashfree) {
      startCheckout();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.async = true;
    script.onload = startCheckout;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [cashfreeData]);

  const baseAmount = selectedAmount || (customAmount ? parseInt(customAmount) : 0);
  const tipAmount = customTip 
    ? parseInt(customTip) 
    : tipPercentage 
      ? Math.round(baseAmount * (tipPercentage / 100)) 
      : 0;
  const totalAmount = baseAmount + (tipAmount || 0);

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
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            />

            {/* Modal Container - Fixed center, no scroll */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-4xl"
              >
                <div className={`${darkMode ? 'bg-zinc-900' : 'bg-white'} rounded-2xl shadow-2xl relative overflow-hidden`}>
                  {/* Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 pointer-events-none" />
                  
                  {/* Close Button */}
                  <button
                    onClick={onClose}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors z-10 ${
                      darkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-gray-400 hover:text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Content - Horizontal Layout */}
                  <div className="relative p-4 md:p-5">
                    {/* Header */}
                    <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4 pb-2 md:pb-3 border-b border-emerald-500/20">
                      <div className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 shadow-lg">
                        <Heart className="w-4 h-4 md:w-5 md:h-5 text-white" fill="currentColor" />
                      </div>
                      <div>
                        <h2 className={`text-base md:text-xl font-bold leading-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          Make a Difference
                        </h2>
                        <p className={`text-[10px] md:text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Your generosity transforms lives
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[1fr,auto] gap-3 md:gap-4">
                      {/* Left Section */}
                      <div className="space-y-2.5 md:space-y-3">
                        {/* Donation Type - Horizontal Pills */}
                        <div>
                          <label className={`block text-[10px] md:text-xs font-semibold mb-1 md:mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Donation Type
                          </label>
                          <div className="flex flex-wrap gap-1 md:gap-1.5">
                            {filteredDonationTypes.map((type) => {
                              const IconComponent = type.Icon;
                              return (
                                <motion.button
                                  key={type.id}
                                  whileHover={{ scale: type.disabled ? 1 : 1.03 }}
                                  whileTap={{ scale: type.disabled ? 1 : 0.97 }}
                                  onClick={() => !type.disabled && setDonationType(type.id)}
                                  disabled={type.disabled}
                                  className={`
                                    px-2.5 md:px-3 py-1 md:py-1.5 rounded-lg text-[10px] md:text-xs font-semibold transition-all flex items-center gap-1 md:gap-1.5 whitespace-nowrap
                                    ${donationType === type.id
                                      ? 'bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/30'
                                      : darkMode
                                        ? 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                                    ${type.disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
                                  `}
                                >
                                  <IconComponent className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0" />
                                  <span>{type.label}</span>
                                  {type.disabled && <Lock className="w-2.5 h-2.5 md:w-3 md:h-3 flex-shrink-0" />}
                                </motion.button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Amount Selection */}
                        <div>
                          <label className={`block text-[10px] md:text-xs font-semibold mb-1 md:mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Select Amount
                          </label>
                          <div className="grid grid-cols-5 gap-1.5 md:gap-2">
                            {presetAmounts.map((amount) => (
                              <motion.button
                                key={amount.value}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => {
                                  setSelectedAmount(amount.value);
                                  setCustomAmount('');
                                }}
                                className={`
                                  h-10 md:h-11 rounded-lg font-bold text-xs md:text-sm transition-all
                                  ${selectedAmount === amount.value
                                    ? 'bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/30'
                                    : darkMode
                                      ? 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
                                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                                `}
                              >
                                ₹{amount.label}
                              </motion.button>
                            ))}
                            {/* Custom Amount in Grid */}
                            <div className="relative">
                              <input
                                type="number"
                                placeholder="Custom"
                                value={customAmount}
                                onChange={(e) => {
                                  setCustomAmount(e.target.value);
                                  setSelectedAmount(null);
                                }}
                                className={`
                                  w-full h-10 md:h-11 px-1 text-[10px] md:text-xs text-center rounded-lg font-semibold transition-all
                                  ${customAmount
                                    ? darkMode
                                      ? 'bg-zinc-800 border-2 border-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                                      : 'bg-emerald-50 border-2 border-emerald-500 text-gray-900 shadow-lg shadow-emerald-500/20'
                                    : darkMode
                                      ? 'bg-zinc-800 border-2 border-zinc-700 text-white placeholder-gray-600'
                                      : 'bg-gray-100 border-2 border-gray-200 text-gray-900 placeholder-gray-400'}
                                  focus:outline-none focus:ring-0
                                `}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Tip Selection */}
                        <div>
                          <label className={`flex items-center gap-1.5 text-[10px] md:text-xs font-semibold mb-1 md:mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Platform Tip
                            <div className="group relative">
                              <div className={`w-3.5 h-3.5 md:w-4 md:h-4 rounded-full flex items-center justify-center cursor-help transition-colors ${
                                darkMode ? 'bg-zinc-800 text-gray-400 hover:bg-zinc-700 hover:text-emerald-400' : 'bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-emerald-600'
                              }`}>
                                <span className="text-[8px] md:text-[10px] font-bold">i</span>
                              </div>
                              <div className={`
                                absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-44 sm:w-52 md:w-56 p-2 sm:p-2.5 md:p-3 rounded-lg text-[9px] sm:text-[10px] md:text-xs leading-relaxed z-20
                                ${darkMode ? 'bg-zinc-800 text-gray-200 border border-zinc-700' : 'bg-gray-900 text-white'}
                                opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl
                              `}>
                                We rely on your generosity to run this platform and connect donors with worthy causes.
                                <div className={`absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 rotate-45 ${darkMode ? 'bg-zinc-800 border-r border-b border-zinc-700' : 'bg-gray-900'}`}></div>
                              </div>
                            </div>
                          </label>
                          <div className="grid grid-cols-5 gap-1.5 md:gap-2">
                            {tipPercentages.map((percentage) => (
                              <motion.button
                                key={percentage}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => {
                                  setTipPercentage(percentage);
                                  setCustomTip('');
                                }}
                                className={`
                                  h-8 md:h-9 rounded-lg text-[10px] md:text-xs font-bold transition-all
                                  ${tipPercentage === percentage && !customTip
                                    ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-orange-600 text-white shadow-lg shadow-amber-500/30'
                                    : darkMode
                                      ? 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
                                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                                `}
                              >
                                {percentage}%
                              </motion.button>
                            ))}
                            {/* Custom Tip Input */}
                            <div className="relative">
                              <input
                                type="number"
                                placeholder="Custom"
                                value={customTip}
                                onChange={(e) => {
                                  setCustomTip(e.target.value);
                                  setTipPercentage(null);
                                }}
                                className={`
                                  w-full h-8 md:h-9 px-1 text-[10px] md:text-xs text-center rounded-lg font-semibold transition-all
                                  ${customTip
                                    ? darkMode
                                      ? 'bg-zinc-800 border-2 border-amber-500 text-white shadow-lg shadow-amber-500/20'
                                      : 'bg-amber-50 border-2 border-amber-500 text-gray-900 shadow-lg shadow-amber-500/20'
                                    : darkMode
                                      ? 'bg-zinc-800 border-2 border-zinc-700 text-white placeholder-gray-600'
                                      : 'bg-gray-100 border-2 border-gray-200 text-gray-900 placeholder-gray-400'}
                                  focus:outline-none focus:ring-0
                                `}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Anonymous Toggle */}
                        <label className={`flex items-center gap-2 cursor-pointer select-none ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          <input
                            type="checkbox"
                            checked={isAnonymous}
                            onChange={(e) => setIsAnonymous(e.target.checked)}
                            className="w-3.5 h-3.5 md:w-4 md:h-4 rounded accent-emerald-500"
                          />
                          <span className="text-[10px] md:text-xs font-medium">Make my donation anonymous</span>
                        </label>
                      </div>

                      {/* Right Section - Total & CTA */}
                      <div className="lg:w-64 flex flex-col gap-2 md:gap-3">
                        {/* Total Display */}
                        {baseAmount > 0 && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={`p-3 md:p-4 rounded-xl ${
                              darkMode ? 'bg-gradient-to-br from-emerald-950/40 via-emerald-950/30 to-teal-950/40 border border-emerald-500/30' : 'bg-gradient-to-br from-emerald-50 via-emerald-50/80 to-teal-50 border border-emerald-200'
                            }`}
                          >
                            <div className="space-y-1.5 md:space-y-2">
                              <div className={`text-[10px] md:text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Donation: ₹{baseAmount.toLocaleString()}
                              </div>
                              {tipAmount > 0 && (
                                <div className={`text-[10px] md:text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  Platform Tip: ₹{tipAmount.toLocaleString()}
                                </div>
                              )}
                              <div className={`pt-1.5 md:pt-2 border-t ${darkMode ? 'border-emerald-500/30' : 'border-emerald-200'}`}>
                                <div className={`text-[10px] md:text-xs font-medium mb-0.5 md:mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  Total Amount
                                </div>
                                <div className={`text-xl md:text-2xl font-bold bg-gradient-to-r ${darkMode ? 'from-emerald-400 via-emerald-300 to-teal-400' : 'from-emerald-700 via-emerald-600 to-teal-700'} bg-clip-text text-transparent`}>
                                  ₹{totalAmount.toLocaleString()}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* Donate Button */}
                        <motion.button
                          whileHover={{ scale: baseAmount >= 50 && !isDonating ? 1.02 : 1 }}
                          whileTap={{ scale: baseAmount >= 50 && !isDonating ? 0.98 : 1 }}
                          onClick={handleDonate}
                          disabled={isDonating || baseAmount < 50}
                          className={`
                            w-full h-11 md:h-12 rounded-xl font-bold text-sm md:text-base transition-all
                            flex items-center justify-center gap-2
                            ${isDonating
                              ? 'bg-emerald-600 text-white cursor-wait'
                              : baseAmount >= 50
                                ? 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-700 hover:via-emerald-600 hover:to-teal-700 text-white shadow-lg shadow-emerald-600/40'
                                : darkMode
                                  ? 'bg-zinc-800 text-gray-600 cursor-not-allowed'
                                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
                          `}
                        >
                          {isDonating ? (
                            <>
                              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v0C5.373 4 0 8.373 0 12h4z" />
                              </svg>
                              <span className="hidden sm:inline">Processing...</span>
                              <span className="sm:hidden">Wait...</span>
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-4 h-4" />
                              {baseAmount < 50 ? 'Min. ₹50' : 'Donate Now'}
                            </>
                          )}
                        </motion.button>

                        {/* Footer Note */}
                        <p className={`text-[9px] md:text-xs text-center leading-relaxed ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                          Secure payment • Receipt via email
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
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