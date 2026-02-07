'use client'
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Lock, X, Sparkles, Moon, Coins, Gift, Star, HandHeart, User, Mail, Phone, HeartCrack, HeartHandshake } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useAppToast } from '@/app/AppToastContext';
import { useDonationIdentifyMutation } from "@/utils/slices/authApiSlice";

export default function DonatePopUpModal({ isOpen, onClose, darkMode, campaignId, ribaEligible, zakatVerified, taxEligible, allowedDonationTypes = [] }) {
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState('');
  const [showCustomAmountInput, setShowCustomAmountInput] = useState(false);
  const [tipPercentage, setTipPercentage] = useState(0);
  const [customTip, setCustomTip] = useState('');
  const [showCustomTipInput, setShowCustomTipInput] = useState(false);
  const [cashfreeData, setCashfreeData] = useState(null);
  const [donationType, setDonationType] = useState('SADAQAH');
  const [isAnonymous, setIsAnonymous] = useState(false);
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [userId, setUserId] = useState(null);
  
  const [isDonating, setIsDonating] = useState(false);
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);

  const checkoutStartedRef = useRef(false);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const { showToast } = useAppToast();
  const [donationIdentify] = useDonationIdentifyMutation();

  const presetAmounts = [
    { value: 50, label: '50' },
    { value: 100, label: '100' },
    { value: 200, label: '200' },
    { value: 500, label: '500' }
  ];
  const tipPercentages = [0, 5, 10, 15];

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

  useEffect(() => {
    if (allowedDonationTypes?.length > 0 && !allowedDonationTypes.some(at => at.toUpperCase() === donationType.toUpperCase() || (at.toUpperCase() === 'ZAKAT' && donationType === 'ZAKAAT'))) {
      setDonationType(filteredDonationTypes[0]?.id || 'SADAQAH');
    }
  }, [allowedDonationTypes, filteredDonationTypes, donationType]);

  useEffect(() => {
    if (userInfo) {
      setFullName(userInfo.fullName || '');
      setEmail(userInfo.email || '');
      setMobileNo(userInfo.mobileNo || '');
      setUserId(userInfo._id || userInfo.userId);
    }
  }, [userInfo]);

  useEffect(() => {
    if (isOpen || showExitConfirmation) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, showExitConfirmation]);

  const handleIdentifyUser = async () => {
    try {
      const result = await donationIdentify({
        fullName,
        email,
        mobileNo,
      }).unwrap();

      if (result?.data?.userId) {
        return result.data.userId;
      }
      throw new Error("Unable to identify user");
    } catch (err) {
      console.error("User identification failed", err);
      throw err;
    }
  };

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

    if (donationType === 'ZAKAAT' && !zakatVerified) {
      showToast({
        title: "Not Verified",
        message: "This campaign is not verified for Zakaat.",
        type: "error"
      });
      return;
    }

    if (!userInfo) {
      if (!fullName.trim()) {
        showToast({
          title: "Name Required",
          message: "Please enter your full name.",
          type: "error"
        });
        return;
      }

      if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast({
          title: "Valid Email Required",
          message: "Please enter a valid email address.",
          type: "error"
        });
        return;
      }

      if (!mobileNo.trim() || !/^\d{10}$/.test(mobileNo)) {
        showToast({
          title: "Valid Mobile Required",
          message: "Please enter a valid 10-digit mobile number.",
          type: "error"
        });
        return;
      }
    }

    setIsDonating(true);

    try {
      let userIdToUse = userId;
      if (!userIdToUse && !userInfo) {
        userIdToUse = await handleIdentifyUser();
        setUserId(userIdToUse);
      }

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
            isTaxEligible: false,
            userId: userIdToUse,
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
      showToast({
        title: "Error",
        message: err.message || "Failed to initiate donation. Please try again.",
        type: "error"
      });
    } finally {
      setIsDonating(false);
    }
  };

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
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [cashfreeData]);

  const handleCloseAttempt = () => {
    const amount = selectedAmount || parseInt(customAmount);
    if (amount >= 50 && !isDonating) {
      setShowExitConfirmation(true);
    } else {
      onClose();
    }
  };

  const handleConfirmClose = () => {
    setShowExitConfirmation(false);
    onClose();
  };

  const handleCancelClose = () => {
    setShowExitConfirmation(false);
  };

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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={handleCloseAttempt}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md md:max-w-2xl max-h-[96vh] overflow-auto"
              >
                <div className={`${darkMode ? 'bg-zinc-900' : 'bg-white'} rounded-2xl shadow-2xl relative`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 pointer-events-none rounded-2xl" />
                  
                  <button
                    onClick={handleCloseAttempt}
                    className={`absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center transition-colors z-10 ${
                      darkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-gray-400 hover:text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="relative p-4">
                    {/* Header */}
                    <div className="flex items-center gap-2.5 mb-3 pb-2.5 border-b border-emerald-500/20">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 shadow-md flex items-center justify-center flex-shrink-0">
                        <Heart className="w-5 h-5 text-white" fill="currentColor" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h2 className={`text-base font-bold leading-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          Make a Difference
                        </h2>
                        <p className={`text-[11px] ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Your generosity transforms lives
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3">
                      {/* Left Column */}
                      <div className="space-y-2.5">
                        {/* Donation Type */}
                        <div>
                          <label className={`block text-xs font-semibold mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Type
                          </label>
                          <div className="flex flex-wrap gap-1.5">
                            {filteredDonationTypes.map((type) => {
                              const IconComponent = type.Icon;
                              return (
                                <button
                                  key={type.id}
                                  onClick={() => !type.disabled && setDonationType(type.id)}
                                  disabled={type.disabled}
                                  className={`
                                    px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all flex items-center gap-1 whitespace-nowrap
                                    ${donationType === type.id
                                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-sm'
                                      : darkMode
                                        ? 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                                    ${type.disabled ? 'opacity-40 cursor-not-allowed' : ''}
                                  `}
                                >
                                  <IconComponent className="w-3 h-3" />
                                  <span>{type.label}</span>
                                  {type.disabled && <Lock className="w-2.5 h-2.5" />}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Amount */}
                        <div>
                          <label className={`block text-xs font-semibold mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Amount
                          </label>
                          <div className="grid grid-cols-5 gap-1.5">
                            {presetAmounts.map((amount) => (
                              <button
                                key={amount.value}
                                onClick={() => {
                                  setSelectedAmount(amount.value);
                                  setCustomAmount('');
                                  setShowCustomAmountInput(false);
                                }}
                                className={`
                                  h-9 rounded-lg font-bold text-xs transition-all
                                  ${selectedAmount === amount.value && !customAmount
                                    ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white'
                                    : darkMode
                                      ? 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
                                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                                `}
                              >
                                ₹{amount.label}
                              </button>
                            ))}
                            {!showCustomAmountInput ? (
                              <button
                                onClick={() => setShowCustomAmountInput(true)}
                                className={`
                                  h-9 rounded-lg font-bold text-xs
                                  ${customAmount
                                    ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white'
                                    : darkMode
                                      ? 'bg-zinc-800 text-gray-300'
                                      : 'bg-gray-100 text-gray-700'}
                                `}
                              >
                                {customAmount ? `₹${customAmount}` : 'Other'}
                              </button>
                            ) : (
                              <input
                                type="number"
                                placeholder="₹"
                                value={customAmount}
                                autoFocus
                                onChange={(e) => {
                                  setCustomAmount(e.target.value);
                                  setSelectedAmount(null);
                                }}
                                onBlur={() => !customAmount && setShowCustomAmountInput(false)}
                                className={`
                                  h-9 px-1 text-xs text-center rounded-lg font-semibold
                                  ${customAmount
                                    ? darkMode ? 'bg-zinc-800 border-2 border-emerald-500 text-white' : 'bg-emerald-50 border-2 border-emerald-500 text-gray-900'
                                    : darkMode ? 'bg-zinc-800 border border-zinc-700 text-white' : 'bg-gray-100 border border-gray-200 text-gray-900'}
                                  focus:outline-none
                                `}
                              />
                            )}
                          </div>
                        </div>

                        {/* Tip */}
                        <div>
                          <label className={`flex items-center gap-1.5 text-xs font-semibold mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Platform Tip
                            <div className="group relative">
                              <div className={`w-4 h-4 rounded-full flex items-center justify-center cursor-help ${darkMode ? 'bg-zinc-800 text-gray-400' : 'bg-gray-200 text-gray-600'}`}>
                                <span className="text-[9px] font-bold">i</span>
                              </div>
                              <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 w-40 p-2 rounded-lg text-[10px] leading-snug z-20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl ${darkMode ? 'bg-zinc-800 text-gray-200 border border-zinc-700' : 'bg-gray-900 text-white'}`}>
                                Helps run platform
                                <div className={`absolute top-full left-1/2 -translate-x-1/2 -mt-0.5 w-1.5 h-1.5 rotate-45 ${darkMode ? 'bg-zinc-800' : 'bg-gray-900'}`}></div>
                              </div>
                            </div>
                          </label>
                          <div className="grid grid-cols-5 gap-1.5">
                            {tipPercentages.map((percentage) => (
                              <button
                                key={percentage}
                                onClick={() => {
                                  setTipPercentage(percentage);
                                  setCustomTip('');
                                  setShowCustomTipInput(false);
                                }}
                                className={`
                                  h-8 rounded-lg text-[11px] font-bold
                                  ${tipPercentage === percentage && !customTip
                                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white'
                                    : darkMode
                                      ? 'bg-zinc-800 text-gray-300'
                                      : 'bg-gray-100 text-gray-700'}
                                `}
                              >
                                {percentage}%
                              </button>
                            ))}
                            {!showCustomTipInput ? (
                              <button
                                onClick={() => setShowCustomTipInput(true)}
                                className={`
                                  h-8 rounded-lg text-[11px] font-bold
                                  ${customTip
                                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white'
                                    : darkMode
                                      ? 'bg-zinc-800 text-gray-300'
                                      : 'bg-gray-100 text-gray-700'}
                                `}
                              >
                                {customTip ? `₹${customTip}` : 'Other'}
                              </button>
                            ) : (
                              <input
                                type="number"
                                placeholder="₹"
                                value={customTip}
                                autoFocus
                                onChange={(e) => {
                                  setCustomTip(e.target.value);
                                  setTipPercentage(null);
                                }}
                                onBlur={() => !customTip && setShowCustomTipInput(false)}
                                className={`
                                  h-8 px-1 text-xs text-center rounded-lg font-semibold focus:outline-none
                                  ${customTip
                                    ? darkMode ? 'bg-zinc-800 border-2 border-amber-500 text-white' : 'bg-amber-50 border-2 border-amber-500 text-gray-900'
                                    : darkMode ? 'bg-zinc-800 border border-zinc-700 text-white' : 'bg-gray-100 border border-gray-200 text-gray-900'}
                                `}
                              />
                            )}
                          </div>
                        </div>

                        {/* Anonymous */}
                        <label className={`flex items-center gap-2 cursor-pointer select-none ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          <input
                            type="checkbox"
                            checked={isAnonymous}
                            onChange={(e) => setIsAnonymous(e.target.checked)}
                            className="w-4 h-4 rounded accent-emerald-500"
                          />
                          <span className="text-xs font-medium">Anonymous</span>
                        </label>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-2.5">
                        {/* User Details */}
                        {!userInfo && (
                          <div className="space-y-2">
                            <label className={`block text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              Your Details
                            </label>
                            
                            <div className="relative">
                              <User className={`absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                              <input
                                type="text"
                                placeholder="Full Name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className={`w-full h-9 pl-9 pr-3 text-xs rounded-lg font-medium focus:outline-none ${darkMode ? 'bg-zinc-800 border border-zinc-700 text-white placeholder-gray-500 focus:border-emerald-500' : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500'}`}
                              />
                            </div>

                            <div className="relative">
                              <Mail className={`absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                              <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full h-9 pl-9 pr-3 text-xs rounded-lg font-medium focus:outline-none ${darkMode ? 'bg-zinc-800 border border-zinc-700 text-white placeholder-gray-500 focus:border-emerald-500' : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500'}`}
                              />
                            </div>

                            <div className="relative">
                              <Phone className={`absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                              <input
                                type="tel"
                                placeholder="Mobile"
                                value={mobileNo}
                                onChange={(e) => setMobileNo(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                maxLength={10}
                                className={`w-full h-9 pl-9 pr-3 text-xs rounded-lg font-medium focus:outline-none ${darkMode ? 'bg-zinc-800 border border-zinc-700 text-white placeholder-gray-500 focus:border-emerald-500' : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500'}`}
                              />
                            </div>
                          </div>
                        )}

                        {/* Total */}
                        {baseAmount > 0 && (
                          <div className={`p-3 rounded-lg ${darkMode ? 'bg-emerald-950/30 border border-emerald-500/30' : 'bg-emerald-50 border border-emerald-200'}`}>
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Donation</span>
                                <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>₹{baseAmount.toLocaleString()}</span>
                              </div>
                              {tipAmount > 0 && (
                                <div className="flex justify-between text-xs">
                                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Tip</span>
                                  <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>₹{tipAmount.toLocaleString()}</span>
                                </div>
                              )}
                              <div className={`flex justify-between pt-1.5 mt-1.5 border-t ${darkMode ? 'border-emerald-500/30' : 'border-emerald-200'}`}>
                                <span className={`text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Total</span>
                                <span className={`text-lg font-bold bg-gradient-to-r ${darkMode ? 'from-emerald-400 to-teal-400' : 'from-emerald-600 to-teal-600'} bg-clip-text text-transparent`}>
                                  ₹{totalAmount.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Donate Button */}
                        <button
                          onClick={handleDonate}
                          disabled={isDonating || baseAmount < 50}
                          className={`w-full h-10 rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${isDonating ? 'bg-emerald-600 text-white' : baseAmount >= 50 ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-600/30' : darkMode ? 'bg-zinc-800 text-gray-600' : 'bg-gray-200 text-gray-400'}`}
                        >
                          {isDonating ? (
                            <>
                              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v0C5.373 4 0 8.373 0 12h4z" />
                              </svg>
                              Processing...
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-4 h-4" />
                              {baseAmount < 50 ? 'Min. ₹50' : 'Donate Now'}
                            </>
                          )}
                        </button>

                        <p className={`text-[10px] text-center ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
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

      {/* Exit Confirmation */}
      <AnimatePresence>
        {showExitConfirmation && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCancelClose}
              className="fixed inset-0 bg-black/80 z-[60]"
              style={{ backdropFilter: 'blur(8px)' }}
            />

            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-sm"
              >
                <div className={`${darkMode ? 'bg-zinc-900 border border-zinc-800' : 'bg-white'} rounded-2xl shadow-2xl relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-pink-500/10 to-purple-500/10" />
                  
                  <div className="relative p-6">
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-500 via-pink-500 to-purple-500 flex items-center justify-center shadow-lg">
                        <HeartCrack className="w-8 h-8 text-white" strokeWidth={2.5} />
                      </div>
                    </div>

                    <div className="text-center mb-6">
                      <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        You Can Change Lives Today
                      </h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Your donation of <span className="font-bold text-emerald-500">₹{totalAmount.toLocaleString()}</span> can make a real difference.
                      </p>
                    </div>

                    <div className="space-y-2.5">
                      <button
                        onClick={handleCancelClose}
                        className="w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2"
                      >
                        <HeartHandshake className="w-5 h-5" />
                        Change Lives Now
                      </button>
                      
                      <button
                        onClick={handleConfirmClose}
                        className={`w-full h-12 rounded-xl font-semibold text-sm ${darkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-gray-300 border border-zinc-700' : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200'}`}
                      >
                        Maybe Next Time
                      </button>
                    </div>

                    <p className={`text-center text-xs mt-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      Every contribution matters
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}