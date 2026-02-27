'use client'
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Lock, X, Sparkles, Moon, Coins, Gift, Star, HandHeart, User, Mail, Phone } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useAppToast } from '@/app/AppToastContext';
import { useDonationIdentifyMutation } from "@/utils/slices/authApiSlice";

import CampaignAmountSelector, { getCampaignConfig } from './DonatePopUpModal/CampaignAmountSelector';
import DefaultAmountSelector from './DonatePopUpModal/DefaultAmountSelector';
import ExitConfirmationModal from './DonatePopUpModal/ExitConfirmationModal';

const tipPercentages = [0, 5, 10, 15];

const allDonationTypes = [
  { id: 'ZAKAAT', label: 'Zakat', Icon: Moon },
  { id: 'RIBA', label: 'RIBA', Icon: Coins },
  { id: 'SADAQAH', label: 'Sadaqah', Icon: Gift },
  { id: 'LILLAH', label: 'Lillah', Icon: Star },
  { id: 'IMDAD', label: 'Imdad', Icon: HandHeart },
];

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.18 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 380, damping: 26, mass: 0.9 },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 8,
    transition: { duration: 0.15, ease: 'easeIn' },
  },
};

export default function DonatePopUpModal({
  isOpen,
  onClose,
  darkMode,
  campaignId,
  campaignSlug,
  ribaEligible,
  zakatVerified,
  taxEligible,
  allowedDonationTypes = [],
}) {
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

  // Auto-read slug from URL (/campaign/[slug]) if prop not passed
  const pathname = usePathname();
  const slugFromUrl = pathname?.split('/campaign/')?.[1]?.split('/')?.[0] || null;
  const resolvedSlug = campaignSlug || slugFromUrl;

  const campaignConfig = getCampaignConfig(resolvedSlug);

  const filteredDonationTypes = (
    allowedDonationTypes?.length > 0
      ? allDonationTypes.filter((t) =>
          allowedDonationTypes.some(
            (at) =>
              at.toUpperCase() === t.id.toUpperCase() ||
              (at.toUpperCase() === 'ZAKAT' && t.id === 'ZAKAAT')
          )
        )
      : allDonationTypes
  ).map((t) => ({
    ...t,
    disabled: (t.id === 'ZAKAAT' && !zakatVerified) || (t.id === 'RIBA' && !ribaEligible),
  }));

  useEffect(() => {
    if (
      allowedDonationTypes?.length > 0 &&
      !allowedDonationTypes.some(
        (at) =>
          at.toUpperCase() === donationType.toUpperCase() ||
          (at.toUpperCase() === 'ZAKAT' && donationType === 'ZAKAAT')
      )
    ) {
      setDonationType(filteredDonationTypes[0]?.id || 'SADAQAH');
    }
  }, [allowedDonationTypes]);

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
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen, showExitConfirmation]);

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      checkoutStartedRef.current = false;
      setCashfreeData(null);
      setSelectedAmount(100);
      setCustomAmount('');
      setShowCustomAmountInput(false);
      setShowCustomTipInput(false);
      setCustomTip('');
      setTipPercentage(0);
    }
  }, [isOpen, resolvedSlug]);

  const handleIdentifyUser = async () => {
    const result = await donationIdentify({ fullName, email, mobileNo }).unwrap();
    if (result?.data?.userId) return result.data.userId;
    throw new Error('Unable to identify user');
  };

  const handleDonate = async () => {
    if (isDonating) return;

    const amount = selectedAmount || parseInt(customAmount);
    if (!amount) return;

    if (amount < 50) {
      showToast({ title: 'Minimum Amount', message: 'The minimum donation amount is ₹50.', type: 'error' });
      return;
    }

    if (donationType === 'ZAKAAT' && !zakatVerified) {
      showToast({ title: 'Not Verified', message: 'This campaign is not verified for Zakaat.', type: 'error' });
      return;
    }

    if (!userInfo) {
      if (!fullName.trim()) {
        showToast({ title: 'Name Required', message: 'Please enter your full name.', type: 'error' });
        return;
      }
      if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast({ title: 'Valid Email Required', message: 'Please enter a valid email address.', type: 'error' });
        return;
      }
      if (!mobileNo.trim() || !/^\d{10}$/.test(mobileNo)) {
        showToast({ title: 'Valid Mobile Required', message: 'Please enter a valid 10-digit mobile number.', type: 'error' });
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

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/donations/initiate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          amount,
          tipAmount: calculatedTipAmount,
          campaignId,
          donationType,
          isAnonymous,
          isTaxEligible: false,
          userId: userIdToUse,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data?.cashfree?.paymentSessionId) {
        throw new Error(data?.message || 'Unable to initiate payment');
      }

      setCashfreeData(data.cashfree);
    } catch (err) {
      console.error('Donation initiate failed', err);
      showToast({
        title: 'Error',
        message: err.message || 'Failed to initiate donation. Please try again.',
        type: 'error',
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
        mode: process.env.NEXT_PUBLIC_CASHFREE_MODE || 'sandbox',
      });
      cashfree.checkout({ paymentSessionId: cashfreeData.paymentSessionId, redirectTarget: '_self' });
    };

    if (window.Cashfree) { startCheckout(); return; }

    const script = document.createElement('script');
    script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
    script.async = true;
    script.onload = startCheckout;
    document.body.appendChild(script);
    return () => { if (document.body.contains(script)) document.body.removeChild(script); };
  }, [cashfreeData]);

  const handleCloseAttempt = () => {
    const amount = selectedAmount || parseInt(customAmount);
    if (amount >= 50 && !isDonating) {
      setShowExitConfirmation(true);
    } else {
      onClose();
    }
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
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            <motion.div
              key="donate-backdrop"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={handleCloseAttempt}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            />

            <div className="fixed inset-x-0 bottom-0 sm:inset-0 z-50 flex items-end sm:items-center justify-center sm:p-3">
              <motion.div
                key="donate-modal"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
                className="w-full sm:max-w-md md:max-w-2xl max-h-[92dvh] sm:max-h-[96vh] overflow-y-auto overscroll-contain"
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                <div
                  className={`${
                    darkMode ? 'bg-zinc-900' : 'bg-white'
                  } rounded-t-2xl sm:rounded-2xl shadow-2xl relative`}
                >
                  {/* Mobile drag handle */}
                  <div className="flex justify-center pt-2.5 sm:hidden">
                    <div className={`w-9 h-1 rounded-full ${darkMode ? 'bg-zinc-700' : 'bg-gray-200'}`} />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 pointer-events-none rounded-t-2xl sm:rounded-2xl" />

                  {/* Close button */}
                  <button
                    onClick={handleCloseAttempt}
                    className={`absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center transition-colors z-10 ${
                      darkMode
                        ? 'bg-zinc-800 hover:bg-zinc-700 text-gray-400 hover:text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  <div className="relative p-4 pt-3 pb-5 sm:p-5">
                    {/* Header */}
                    <div className={`flex items-center gap-2.5 mb-4 pb-3 border-b ${darkMode ? 'border-zinc-800' : 'border-gray-100'}`}>
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-md shadow-emerald-500/30 flex items-center justify-center flex-shrink-0">
                        <Heart className="w-4.5 h-4.5 text-white" fill="currentColor" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h2 className={`text-base font-bold leading-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          Make a Difference
                        </h2>
                        <p className={`text-[11px] ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                          Your generosity transforms lives
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-x-6 gap-y-4">

                      {/* ── LEFT COLUMN: Donation Type + Amount ── */}
                      <div className="space-y-4">

                        {/* Donation Type */}
                        <div>
                          <label className={`block text-[11px] font-semibold uppercase tracking-wide mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Donation Type
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
                                    px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap
                                    ${donationType === type.id
                                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-sm'
                                      : darkMode
                                        ? 'bg-zinc-800 text-gray-300 hover:bg-zinc-700 border border-zinc-700/50'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'}
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
                          <label className={`block text-[11px] font-semibold uppercase tracking-wide mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Amount
                          </label>
                          {campaignConfig ? (
                            <CampaignAmountSelector
                              slug={resolvedSlug}
                              darkMode={darkMode}
                              selectedAmount={selectedAmount}
                              setSelectedAmount={setSelectedAmount}
                              customAmount={customAmount}
                              setCustomAmount={setCustomAmount}
                              showCustomAmountInput={showCustomAmountInput}
                              setShowCustomAmountInput={setShowCustomAmountInput}
                              hideLabel
                            />
                          ) : (
                            <DefaultAmountSelector
                              darkMode={darkMode}
                              selectedAmount={selectedAmount}
                              setSelectedAmount={setSelectedAmount}
                              customAmount={customAmount}
                              setCustomAmount={setCustomAmount}
                              showCustomAmountInput={showCustomAmountInput}
                              setShowCustomAmountInput={setShowCustomAmountInput}
                              hideLabel
                            />
                          )}
                        </div>

                        {/* Anonymous — desktop only, shown inline at bottom of left col */}
                        <label className={`hidden md:flex items-center gap-2 cursor-pointer select-none pt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          <input
                            type="checkbox"
                            checked={isAnonymous}
                            onChange={(e) => setIsAnonymous(e.target.checked)}
                            className="w-3.5 h-3.5 rounded accent-emerald-500"
                          />
                          <span className="text-xs">Donate Anonymously</span>
                        </label>
                      </div>

                      {/* ── RIGHT COLUMN: Details + Tip + CTA ── */}
                      <div className="flex flex-col gap-4">

                        {/* Guest user details */}
                        {!userInfo && (
                          <div>
                            <label className={`block text-[11px] font-semibold uppercase tracking-wide mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              Your Details
                            </label>
                            <div className="space-y-2">
                              {[
                                { Icon: User, type: 'text', placeholder: 'Full Name', value: fullName, onChange: (v) => setFullName(v) },
                                { Icon: Mail, type: 'email', placeholder: 'Email', value: email, onChange: (v) => setEmail(v) },
                              ].map(({ Icon, type, placeholder, value, onChange }) => (
                                <div key={placeholder} className="relative">
                                  <Icon className={`absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                                  <input
                                    type={type}
                                    placeholder={placeholder}
                                    value={value}
                                    onChange={(e) => onChange(e.target.value)}
                                    className={`w-full h-9 pl-8 pr-3 text-xs rounded-lg font-medium focus:outline-none transition-colors ${
                                      darkMode
                                        ? 'bg-zinc-800 border border-zinc-700 text-white placeholder-gray-500 focus:border-emerald-500'
                                        : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-400'
                                    }`}
                                  />
                                </div>
                              ))}
                              <div className="relative">
                                <Phone className={`absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                                <input
                                  type="tel"
                                  placeholder="Mobile (10 digits)"
                                  value={mobileNo}
                                  onChange={(e) => setMobileNo(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                  maxLength={10}
                                  className={`w-full h-9 pl-8 pr-3 text-xs rounded-lg font-medium focus:outline-none transition-colors ${
                                    darkMode
                                      ? 'bg-zinc-800 border border-zinc-700 text-white placeholder-gray-500 focus:border-emerald-500'
                                      : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-400'
                                  }`}
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Platform Tip */}
                        <div>
                          <label className={`flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Platform Tip
                            <div className="group relative">
                              <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center cursor-help ${darkMode ? 'bg-zinc-700 text-gray-400' : 'bg-gray-300 text-gray-600'}`}>
                                <span className="text-[8px] font-bold">i</span>
                              </div>
                              <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 w-40 p-2 rounded-lg text-[10px] leading-snug z-20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl ${darkMode ? 'bg-zinc-800 text-gray-200 border border-zinc-700' : 'bg-gray-900 text-white'}`}>
                                Helps keep the platform running
                                <div className={`absolute top-full left-1/2 -translate-x-1/2 -mt-0.5 w-1.5 h-1.5 rotate-45 ${darkMode ? 'bg-zinc-800' : 'bg-gray-900'}`} />
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
                                  h-8 rounded-lg text-[11px] font-bold transition-all
                                  ${tipPercentage === percentage && !customTip
                                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm'
                                    : darkMode
                                      ? 'bg-zinc-800 text-gray-300 hover:bg-zinc-700 border border-zinc-700/50'
                                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'}
                                `}
                              >
                                {percentage}%
                              </button>
                            ))}
                            <button
                              onClick={() => {
                                const next = !showCustomTipInput;
                                setShowCustomTipInput(next);
                                if (!next) { setCustomTip(''); setTipPercentage(0); }
                                else { setTipPercentage(null); setCustomTip(''); }
                              }}
                              className={`
                                h-8 rounded-lg text-[11px] font-bold transition-all
                                ${showCustomTipInput || customTip
                                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm'
                                  : darkMode
                                    ? 'bg-zinc-800 text-gray-300 hover:bg-zinc-700 border border-zinc-700/50'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'}
                              `}
                            >
                              {customTip && !showCustomTipInput ? `₹${customTip}` : 'Other'}
                            </button>
                          </div>
                          {showCustomTipInput && (
                            <div className="mt-2 relative">
                              <span className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold pointer-events-none ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>₹</span>
                              <input
                                type="number"
                                placeholder="Enter custom tip"
                                value={customTip}
                                autoFocus
                                min={0}
                                onChange={(e) => { setCustomTip(e.target.value); setTipPercentage(null); }}
                                className={`w-full h-10 pl-7 pr-3 text-sm rounded-xl font-semibold focus:outline-none transition-all ${
                                  darkMode
                                    ? 'bg-zinc-800 border-2 border-amber-500 text-white placeholder-gray-600'
                                    : 'bg-amber-50 border-2 border-amber-500 text-gray-900 placeholder-gray-400'
                                }`}
                              />
                            </div>
                          )}
                        </div>

                        {/* Spacer pushes total+CTA to bottom on desktop */}
                        <div className="flex-1" />

                        {/* Anonymous — mobile only */}
                        <label className={`flex md:hidden items-center gap-2 cursor-pointer select-none ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          <input
                            type="checkbox"
                            checked={isAnonymous}
                            onChange={(e) => setIsAnonymous(e.target.checked)}
                            className="w-3.5 h-3.5 rounded accent-emerald-500"
                          />
                          <span className="text-xs">Donate Anonymously</span>
                        </label>

                        {/* Total line */}
                        {baseAmount > 0 && (
                          <div className="flex items-center justify-between px-0.5">
                            <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                              Total
                              {tipAmount > 0 && (
                                <span className={`ml-1 text-[10px] ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                                  (incl. ₹{tipAmount} tip)
                                </span>
                              )}
                            </span>
                            <span className={`text-xl font-extrabold tracking-tight ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                              ₹{totalAmount.toLocaleString()}
                            </span>
                          </div>
                        )}

                        {/* CTA */}
                        <button
                          onClick={handleDonate}
                          disabled={isDonating || baseAmount < 50}
                          className={`
                            w-full h-11 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2
                            ${isDonating
                              ? 'bg-emerald-600 text-white cursor-wait'
                              : baseAmount >= 50
                                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-600/25 active:scale-[0.98]'
                                : darkMode
                                  ? 'bg-zinc-800 text-gray-600 cursor-not-allowed'
                                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
                          `}
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
                              {baseAmount < 50 ? 'Min. ₹50' : `Donate ₹${totalAmount.toLocaleString()}`}
                            </>
                          )}
                        </button>

                        <p className={`text-[10px] text-center flex items-center justify-center gap-1 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                          <span>🔒</span> Secure payment · Receipt via email
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
      <ExitConfirmationModal
        isOpen={showExitConfirmation}
        onConfirm={() => { setShowExitConfirmation(false); onClose(); }}
        onCancel={() => setShowExitConfirmation(false)}
        darkMode={darkMode}
        totalAmount={totalAmount}
      />
    </>
  );
}