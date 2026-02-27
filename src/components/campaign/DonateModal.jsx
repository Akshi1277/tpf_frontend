'use client'
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Lock, X, Sparkles, Moon, Coins, Gift, Star, HandHeart, User, Mail, Phone, ShieldCheck } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useAppToast } from '@/app/AppToastContext';
import { useDonationIdentifyMutation } from "@/utils/slices/authApiSlice";

import CampaignAmountSelector, { getCampaignConfig } from './DonatePopUpModal/CampaignAmountSelector';
import DefaultAmountSelector from './DonatePopUpModal/DefaultAmountSelector';
import ExitConfirmationModal from './DonatePopUpModal/ExitConfirmationModal';

const tipPercentages = [0, 5, 10, 15];

const allDonationTypes = [
  { id: 'ZAKAAT',  label: 'Zakat',   Icon: Moon      },
  { id: 'RIBA',    label: 'RIBA',    Icon: Coins     },
  { id: 'SADAQAH', label: 'Sadaqah', Icon: Gift      },
  { id: 'LILLAH',  label: 'Lillah',  Icon: Star      },
  { id: 'IMDAD',   label: 'Imdad',   Icon: HandHeart },
];

/* ── tiny reusable primitives ─────────────────────────────────────────────── */
const SectionLabel = ({ children, dark, className = '' }) => (
  <p className={`text-[10px] font-bold uppercase tracking-widest mb-3 ${dark ? 'text-emerald-400/70' : 'text-emerald-600/70'} ${className}`}>
    {children}
  </p>
);

const Card = ({ dark, children, className = '' }) => (
  <div className={`rounded-xl p-4 ${dark ? 'bg-zinc-800/50 border border-zinc-700/50' : 'bg-gray-50/80 border border-gray-100'} ${className}`}>
    {children}
  </div>
);

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
  const [selectedAmount, setSelectedAmount]               = useState(100);
  const [customAmount, setCustomAmount]                   = useState('');
  const [showCustomAmountInput, setShowCustomAmountInput] = useState(false);
  const [selectedPresetKey, setSelectedPresetKey]         = useState(null);
  const [tipPercentage, setTipPercentage]                 = useState(0);
  const [customTip, setCustomTip]                         = useState('');
  const [showCustomTipInput, setShowCustomTipInput]       = useState(false);
  const [cashfreeData, setCashfreeData]                   = useState(null);
  const [donationType, setDonationType]                   = useState('SADAQAH');
  const [isAnonymous, setIsAnonymous]                     = useState(false);

  const [fullName, setFullName] = useState('');
  const [email, setEmail]       = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [userId, setUserId]     = useState(null);

  const [isDonating, setIsDonating]                     = useState(false);
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);

  const checkoutStartedRef = useRef(false);
  const userInfo           = useSelector((state) => state.auth.userInfo);
  const { showToast }      = useAppToast();
  const [donationIdentify] = useDonationIdentifyMutation();

  const pathname     = usePathname();
  const slugFromUrl  = pathname?.split('/campaign/')?.[1]?.split('/')?.[0] || null;
  const resolvedSlug = campaignSlug || slugFromUrl;
  const campaignConfig = getCampaignConfig(resolvedSlug);

  const dk = darkMode; // shorthand

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

  useEffect(() => {
    if (isOpen) {
      checkoutStartedRef.current = false;
      setCashfreeData(null);
      setSelectedAmount(100);
      setSelectedPresetKey(campaignConfig ? 'flat-1' : null);
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
      showToast({ title: 'Error', message: err.message || 'Failed to initiate donation. Please try again.', type: 'error' });
    } finally {
      setIsDonating(false);
    }
  };

  useEffect(() => {
    if (!cashfreeData?.paymentSessionId) return;
    if (checkoutStartedRef.current) return;
    checkoutStartedRef.current = true;
    const startCheckout = () => {
      const cashfree = new window.Cashfree({ mode: process.env.NEXT_PUBLIC_CASHFREE_MODE || 'sandbox' });
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
    if (amount >= 50 && !isDonating) setShowExitConfirmation(true);
    else onClose();
  };

  const baseAmount  = selectedAmount || (customAmount ? parseInt(customAmount) : 0);
  const tipAmount   = customTip ? parseInt(customTip) : tipPercentage ? Math.round(baseAmount * (tipPercentage / 100)) : 0;
  const totalAmount = baseAmount + (tipAmount || 0);

  /* ── style tokens ────────────────────────────────────────── */
  const inputCls = `w-full h-10 pl-9 pr-3 text-sm rounded-lg font-medium focus:outline-none transition-colors border ${
    dk
      ? 'bg-zinc-800/80 border-zinc-700 text-white placeholder-zinc-500 focus:border-emerald-500'
      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/10'
  }`;

  const typeBtn = (active, disabled) =>
    `flex-1 flex items-center justify-center gap-1.5 h-9 rounded-lg text-xs font-bold transition-colors border ${
      disabled ? 'opacity-40 cursor-not-allowed ' : ''
    }${
      active
        ? dk
          ? 'bg-emerald-500/25 border-emerald-400/70 text-emerald-300'
          : 'bg-emerald-100 border-emerald-400 text-emerald-900'
        : dk
          ? 'bg-zinc-900/60 border-zinc-600 text-zinc-300 hover:border-zinc-500 hover:text-zinc-200'
          : 'bg-white border-gray-300 text-gray-600 hover:border-emerald-300 hover:text-gray-800'
    }`;

  const tipBtn = (active) =>
    `flex-1 h-9 rounded-lg text-xs font-extrabold transition-colors border ${
      active
        ? dk
          ? 'bg-emerald-500/25 border-emerald-400/70 text-emerald-300'
          : 'bg-emerald-100 border-emerald-400 text-emerald-900'
        : dk
          ? 'bg-zinc-900/60 border-zinc-600 text-zinc-300 hover:border-zinc-500'
          : 'bg-white border-gray-300 text-gray-600 hover:border-emerald-300'
    }`;

  const CustomCheckbox = ({ checked, onChange, label }) => (
    <label className="flex items-center gap-2.5 cursor-pointer select-none group">
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`w-4 h-4 rounded flex items-center justify-center border-2 transition-colors flex-shrink-0 ${
          checked
            ? 'bg-emerald-500 border-emerald-500'
            : dk ? 'border-zinc-600 bg-zinc-800 group-hover:border-zinc-500' : 'border-gray-300 bg-white group-hover:border-emerald-300'
        }`}
      >
        {checked && (
          <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="none">
            <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>
      <span className={`text-xs font-medium ${dk ? 'text-zinc-400 group-hover:text-zinc-300' : 'text-gray-500 group-hover:text-gray-700'}`}>
        {label}
      </span>
    </label>
  );

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="donate-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={handleCloseAttempt}
              className="fixed inset-0 bg-black/60 z-50"
              style={{ backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}
            />

            {/* Positioning shell */}
            <div className="fixed inset-x-0 bottom-0 md:inset-0 z-50 flex items-end md:items-center justify-center md:p-6">
              <motion.div
                key="donate-modal"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 14 }}
                transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                onClick={(e) => e.stopPropagation()}
                className="w-full md:max-w-3xl"
                style={{ maxHeight: '93dvh' }}
              >
                <div
                  className={`flex flex-col overflow-hidden rounded-t-2xl md:rounded-2xl shadow-2xl ${
                    dk
                      ? 'bg-zinc-900 border border-zinc-800'
                      : 'bg-white border border-gray-100'
                  }`}
                  style={{ maxHeight: '93dvh' }}
                >
                  {/* Mobile drag pill */}
                  <div className="flex justify-center pt-2.5 md:hidden flex-shrink-0">
                    <div className={`w-8 h-1 rounded-full ${dk ? 'bg-zinc-700' : 'bg-gray-200'}`} />
                  </div>

                  {/* ─── Header ─────────────────────────────────────────── */}
                  <div className={`flex items-center gap-3 px-5 pt-4 pb-4 border-b flex-shrink-0 ${dk ? 'border-zinc-800' : 'border-gray-100'}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md ${
                      dk
                        ? 'bg-emerald-500/20 shadow-emerald-900/40'
                        : 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500/25'
                    }`}>
                      <Heart className={`w-5 h-5 ${dk ? 'text-emerald-400' : 'text-white'}`} fill="currentColor" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className={`text-base font-bold ${dk ? 'text-white' : 'text-gray-900'}`}>Make a Difference</h2>
                      <p className={`text-xs mt-0.5 ${dk ? 'text-zinc-500' : 'text-gray-400'}`}>Your generosity transforms lives</p>
                    </div>

                    {/* Total pill — desktop, lives in header for immediate visibility */}
                    {baseAmount >= 50 && (
                      <div className={`hidden md:flex items-baseline gap-2 px-4 py-2 rounded-xl mr-1 ${
                        dk ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-emerald-50 border border-emerald-100'
                      }`}>
                        <span className={`text-xs font-medium ${dk ? 'text-zinc-400' : 'text-gray-500'}`}>Total</span>
                        <span className={`text-xl font-extrabold tracking-tight ${dk ? 'text-emerald-400' : 'text-emerald-600'}`}>
                          ₹{totalAmount.toLocaleString()}
                        </span>
                        {tipAmount > 0 && (
                          <span className={`text-[10px] ${dk ? 'text-zinc-500' : 'text-gray-400'}`}>incl. ₹{tipAmount} tip</span>
                        )}
                      </div>
                    )}

                    <button
                      onClick={handleCloseAttempt}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${
                        dk
                          ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* ─── Scrollable body ─────────────────────────────────── */}
                  <div className="overflow-y-auto overscroll-contain flex-1 [&::-webkit-scrollbar]:hidden" style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <div className="p-5 md:p-6 grid md:grid-cols-2 gap-5 md:gap-6">

                      {/* ═══════════════════════════════
                          LEFT — Donation Type + Amount
                      ═══════════════════════════════ */}
                      <div className="flex flex-col gap-4">

                        {/* Donation Type */}
                        <Card dark={dk}>
                          <SectionLabel dark={dk}>Donation Type</SectionLabel>
                          {/* Render all types in responsive rows */}
                          <div className="flex flex-col gap-2">
                            <div className="flex gap-2">
                              {filteredDonationTypes.slice(0, 3).map((type) => {
                                const Icon = type.Icon;
                                return (
                                  <button
                                    key={type.id}
                                    onClick={() => !type.disabled && setDonationType(type.id)}
                                    disabled={type.disabled}
                                    className={typeBtn(donationType === type.id, type.disabled)}
                                  >
                                    <Icon className="w-3.5 h-3.5" />
                                    <span>{type.label}</span>
                                    {type.disabled && <Lock className="w-2.5 h-2.5 opacity-70" />}
                                  </button>
                                );
                              })}
                            </div>
                            {filteredDonationTypes.length > 3 && (
                              <div className="flex gap-2">
                                {filteredDonationTypes.slice(3).map((type) => {
                                  const Icon = type.Icon;
                                  return (
                                    <button
                                      key={type.id}
                                      onClick={() => !type.disabled && setDonationType(type.id)}
                                      disabled={type.disabled}
                                      className={`${typeBtn(donationType === type.id, type.disabled)} max-w-[50%]`}
                                    >
                                      <Icon className="w-3.5 h-3.5" />
                                      <span>{type.label}</span>
                                      {type.disabled && <Lock className="w-2.5 h-2.5 opacity-70" />}
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </Card>

                        {/* Amount */}
                        <Card dark={dk}>
                          <SectionLabel dark={dk}>Amount</SectionLabel>
                          {campaignConfig ? (
                            <CampaignAmountSelector
                              slug={resolvedSlug}
                              darkMode={dk}
                              selectedAmount={selectedAmount}
                              setSelectedAmount={setSelectedAmount}
                              customAmount={customAmount}
                              setCustomAmount={setCustomAmount}
                              showCustomAmountInput={showCustomAmountInput}
                              setShowCustomAmountInput={setShowCustomAmountInput}
                              selectedPresetKey={selectedPresetKey}
                              setSelectedPresetKey={setSelectedPresetKey}
                            />
                          ) : (
                            <DefaultAmountSelector
                              darkMode={dk}
                              selectedAmount={selectedAmount}
                              setSelectedAmount={setSelectedAmount}
                              customAmount={customAmount}
                              setCustomAmount={setCustomAmount}
                              showCustomAmountInput={showCustomAmountInput}
                              setShowCustomAmountInput={setShowCustomAmountInput}
                            />
                          )}
                        </Card>

                        {/* Anonymous — desktop */}
                        <div className="hidden md:block px-1">
                          <CustomCheckbox
                            checked={isAnonymous}
                            onChange={setIsAnonymous}
                            label="Donate Anonymously"
                          />
                        </div>
                      </div>

                      {/* ═══════════════════════════════
                          RIGHT — Details + Tip + CTA
                      ═══════════════════════════════ */}
                      <div className="flex flex-col gap-4">

                        {/* Guest details */}
                        {!userInfo && (
                          <Card dark={dk}>
                            <SectionLabel dark={dk}>Your Details</SectionLabel>
                            <div className="space-y-2.5">
                              {[
                                { Icon: User,  type: 'text',  placeholder: 'Full Name', value: fullName, onChange: setFullName },
                                { Icon: Mail,  type: 'email', placeholder: 'Email',     value: email,    onChange: setEmail    },
                              ].map(({ Icon, type, placeholder, value, onChange }) => (
                                <div key={placeholder} className="relative">
                                  <Icon className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${dk ? 'text-zinc-500' : 'text-gray-400'}`} />
                                  <input type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} className={inputCls} />
                                </div>
                              ))}
                              <div className="relative">
                                <Phone className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${dk ? 'text-zinc-500' : 'text-gray-400'}`} />
                                <input
                                  type="tel"
                                  placeholder="Mobile (10 digits)"
                                  value={mobileNo}
                                  onChange={(e) => setMobileNo(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                  maxLength={10}
                                  className={inputCls}
                                />
                              </div>
                            </div>
                          </Card>
                        )}

                        {/* Platform Tip */}
                        <Card dark={dk}>
                          <div className="flex items-center justify-between mb-3">
                            <SectionLabel dark={dk} className="mb-0">Platform Tip</SectionLabel>
                            <div className="group relative">
                              <div className={`w-4 h-4 rounded-full flex items-center justify-center cursor-help text-[9px] font-extrabold border ${
                                dk ? 'border-zinc-400 text-zinc-300 bg-zinc-700' : 'border-gray-400 text-gray-600 bg-gray-100'
                              }`}>i</div>
                              <div className={`absolute bottom-full right-0 mb-2 w-48 p-2.5 rounded-xl text-[11px] leading-relaxed z-20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl ${
                                dk ? 'bg-zinc-800 text-zinc-200 border border-zinc-700' : 'bg-gray-900 text-white'
                              }`}>
                                Helps keep the platform running. 100% goes to operations.
                                <div className={`absolute top-full right-3 -mt-0.5 w-2 h-2 rotate-45 ${dk ? 'bg-zinc-800' : 'bg-gray-900'}`} />
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {tipPercentages.map((pct) => (
                              <button
                                key={pct}
                                onClick={() => { setTipPercentage(pct); setCustomTip(''); setShowCustomTipInput(false); }}
                                className={tipBtn(tipPercentage === pct && !customTip)}
                              >
                                {pct === 0 ? 'None' : `${pct}%`}
                              </button>
                            ))}
                            <button
                              onClick={() => {
                                const next = !showCustomTipInput;
                                setShowCustomTipInput(next);
                                if (!next) { setCustomTip(''); setTipPercentage(0); }
                                else { setTipPercentage(null); setCustomTip(''); }
                              }}
                              className={tipBtn(showCustomTipInput || !!customTip)}
                            >
                              {customTip && !showCustomTipInput ? `₹${customTip}` : 'Other'}
                            </button>
                          </div>
                          {showCustomTipInput && (
                            <div className="mt-2.5 relative">
                              <span className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold pointer-events-none ${dk ? 'text-zinc-400' : 'text-gray-400'}`}>₹</span>
                              <input
                                type="number"
                                placeholder="Custom tip amount"
                                value={customTip}
                                autoFocus
                                min={0}
                                onChange={(e) => { setCustomTip(e.target.value); setTipPercentage(null); }}
                                className={`w-full h-10 pl-7 pr-3 text-sm rounded-lg font-semibold focus:outline-none border transition-colors ${
                                  dk
                                    ? 'bg-zinc-800 border-zinc-600 focus:border-emerald-500 text-white placeholder-zinc-500'
                                    : 'bg-white border-gray-200 focus:border-emerald-400 text-gray-900 placeholder-gray-400'
                                }`}
                              />
                            </div>
                          )}
                        </Card>

                        <div className="flex-1" />

                        {/* Anonymous — mobile */}
                        <div className="md:hidden px-1">
                          <CustomCheckbox
                            checked={isAnonymous}
                            onChange={setIsAnonymous}
                            label="Donate Anonymously"
                          />
                        </div>

                        {/* Total — mobile (desktop shows in header) */}
                        {baseAmount >= 50 && (
                          <div className={`flex md:hidden items-center justify-between px-4 py-3 rounded-xl ${
                            dk ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-emerald-50 border border-emerald-100'
                          }`}>
                            <div>
                              <p className={`text-xs font-medium ${dk ? 'text-zinc-400' : 'text-gray-500'}`}>Total</p>
                              {tipAmount > 0 && (
                                <p className={`text-[10px] ${dk ? 'text-zinc-500' : 'text-gray-400'}`}>incl. ₹{tipAmount} tip</p>
                              )}
                            </div>
                            <span className={`text-2xl font-extrabold tracking-tight ${dk ? 'text-emerald-400' : 'text-emerald-600'}`}>
                              ₹{totalAmount.toLocaleString()}
                            </span>
                          </div>
                        )}

                        {/* CTA */}
                        <div className="space-y-2.5">
                          <button
                            onClick={handleDonate}
                            disabled={isDonating || baseAmount < 50}
                            className={`
                              w-full h-12 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2
                              ${isDonating
                                ? 'bg-emerald-600 text-white cursor-wait'
                                : baseAmount >= 50
                                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 active:scale-[0.98] text-white shadow-lg shadow-emerald-600/20'
                                  : dk
                                    ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed border border-zinc-700'
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
                                {baseAmount < 50 ? 'Minimum ₹50 to donate' : `Donate ₹${totalAmount.toLocaleString()}`}
                              </>
                            )}
                          </button>

                          <div className={`flex items-center justify-center gap-1.5 ${dk ? 'text-zinc-600' : 'text-gray-400'}`}>
                            <ShieldCheck className="w-3 h-3" />
                            <span className="text-[10px] font-medium">Secure payment · Receipt via email</span>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      <ExitConfirmationModal
        isOpen={showExitConfirmation}
        onConfirm={() => { setShowExitConfirmation(false); onClose(); }}
        onCancel={() => setShowExitConfirmation(false)}
        darkMode={dk}
        totalAmount={totalAmount}
      />
    </>
  );
}