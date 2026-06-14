'use client'
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Heart, X, ArrowLeft,
  Building2, CreditCard, FileText, Landmark, Smartphone,
  TrendingDown, Shield, Copy, Check, Hash, Calendar,
  AlertCircle, CheckCircle2, ChevronRight,
  User, Phone, MessageSquare, Sparkles,
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useAppToast } from '@/app/AppToastContext';
import { useCreateOfflineDonationMutation } from '@/utils/slices/offlineDonationSlice';
import { setCredentials } from '@/utils/slices/authSlice';
import LoginModal from '../login/LoginModal/MainModal';

/* ─── Constants ─────────────────────────────────────────────── */
const GATEWAY_FEE_PCT = 2.3;
const DESKTOP_BP = 768;

const BANK_DETAILS = [
  { label: 'Account Name',   value: 'TRUE PATH FOUNDATION'       },
  { label: 'UPI ID',         value: 'foundationtruepath@okicici'  },
  { label: 'Account Number', value: '10090748137'                 },
  { label: 'IFSC Code',      value: 'IDFB0020197'                 },
  { label: 'Bank',           value: 'IDFC FIRST Bank'             },
  { label: 'Branch',         value: 'New Delhi – Jasola Branch'   },
];

const PAYMENT_METHODS = [
  { id: 'rtgs',   name: 'RTGS',   Icon: Building2,  desc: 'Real Time Gross Settlement'         },
  { id: 'imps',   name: 'IMPS',   Icon: CreditCard, desc: 'Immediate Payment Service'          },
  { id: 'neft',   name: 'NEFT',   Icon: Landmark,   desc: 'National Electronic Funds Transfer' },
  { id: 'cheque', name: 'CHEQUE', Icon: FileText,   desc: 'Bank Cheque Payment'                 },
  { id: 'upi',    name: 'UPI',    Icon: Smartphone, desc: 'Unified Payments Interface'          },
];

/*
  View order — offline-form is now split into offline-form-a and offline-form-b.
  Progress bar uses this order; back-map drives the back button.
*/
const VIEW_ORDER = [
  'offline-choice',
  'offline-bank',
  'offline-method',
  'offline-form-a',   // Step 4a: donation type + transaction info
  'offline-form-b',   // Step 4b: sender/bank details + notes + submit
  'offline-success',
];

const BACK_MAP = {
  'offline-bank':   'offline-choice',
  'offline-method': 'offline-bank',
  'offline-form-a': 'offline-method',
  'offline-form-b': 'offline-form-a',
};

const HDR_TITLES = {
  'offline-choice':  { title: 'Save on Fees',             sub: (amt, fee) => `${GATEWAY_FEE_PCT}% gateway fee · ₹${amt}` },
  'offline-bank':    { title: 'Bank Details',             sub: (amt)      => `Transfer ₹${amt} to this account` },
  'offline-method':  { title: 'Transfer Method',          sub: ()         => 'How did you send the money?' },
  'offline-form-a':  { title: (m) => `${m} Transfer`,     sub: ()         => 'Step 1 of 2 · Transaction details' },
  'offline-form-b':  { title: (m) => `${m} Transfer`,     sub: ()         => 'Step 2 of 2 · Sender details & notes' },
  'offline-success': { title: 'Transfer Recorded!',       sub: ()         => 'Pending admin verification' },
};

const TRANS = { duration: 0.15, ease: [0.4, 0, 0.2, 1] };
const slide = {
  enter:  (fwd) => ({ opacity: 0, x: fwd ?  16 : -16 }),
  center: ()    => ({ opacity: 1, x: 0 }),
  exit:   (fwd) => ({ opacity: 0, x: fwd ? -16 :  16 }),
};

/* ═══════════════════════════════════════════════════════════════
   SHARED PRIMITIVES
═══════════════════════════════════════════════════════════════ */

function CopyRow({ label, value, dark }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(value); } catch {}
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl border transition-colors ${
      dark ? 'bg-zinc-800 border-zinc-700 hover:border-emerald-500/50'
           : 'bg-gray-50 border-gray-200 hover:border-emerald-300'
    }`}>
      <div className="min-w-0 flex-1">
        <p className={`text-[9px] font-bold uppercase tracking-[0.14em] leading-none mb-1 ${dark ? 'text-zinc-400' : 'text-gray-500'}`}>{label}</p>
        <p className={`text-sm font-semibold truncate ${dark ? 'text-white' : 'text-gray-900'}`}>{value}</p>
      </div>
      <button onClick={copy} className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95 ${
        copied ? 'bg-emerald-500 text-white'
               : dark ? 'bg-zinc-700 text-zinc-300 hover:bg-emerald-600 hover:text-white'
                      : 'bg-white border border-gray-200 text-gray-600 hover:bg-emerald-600 hover:text-white hover:border-emerald-600'
      }`}>
        {copied ? <><Check className="w-3 h-3" /><span>Copied</span></> : <><Copy className="w-3 h-3" /><span>Copy</span></>}
      </button>
    </div>
  );
}

function Lbl({ children, dark }) {
  return (
    <label className={`block text-[11px] font-bold uppercase tracking-[0.1em] mb-1.5 ${dark ? 'text-zinc-300' : 'text-gray-600'}`}>
      {children}
    </label>
  );
}

function Inp({ dark, icon, ...props }) {
  return (
    <div className="relative">
      {icon && (
        <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${dark ? 'text-zinc-400' : 'text-gray-400'}`}>{icon}</span>
      )}
      <input className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-3 rounded-xl border outline-none transition-colors text-sm font-medium ${
        dark
          ? 'bg-zinc-800/80 border-zinc-600 text-white placeholder-zinc-500 focus:border-emerald-500 focus:bg-zinc-800'
          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-emerald-500'
      }`} {...props} />
    </div>
  );
}

function Sel({ dark, icon, children, ...props }) {
  return (
    <div className="relative">
      {icon && (
        <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10 ${dark ? 'text-zinc-400' : 'text-gray-400'}`}>{icon}</span>
      )}
      <select className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-3 rounded-xl border outline-none transition-colors text-sm font-medium cursor-pointer appearance-none ${
        dark
          ? 'bg-zinc-800/80 border-zinc-600 text-white focus:border-emerald-500'
          : 'bg-white border-gray-300 text-gray-900 focus:border-emerald-500'
      }`} {...props}>{children}</select>
    </div>
  );
}

function SecHead({ children, dark }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <p className={`text-[10px] font-extrabold uppercase tracking-[0.15em] whitespace-nowrap ${dark ? 'text-zinc-500' : 'text-gray-400'}`}>{children}</p>
      <div className={`flex-1 h-px ${dark ? 'bg-zinc-800' : 'bg-gray-100'}`} />
    </div>
  );
}

/* Donor info chips shown at top of form steps */
function DonorChips({ method, baseAmount, rName, rPhone, dk, cardBg, cardBd, muted, strong }) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-5">
      <div className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border flex-shrink-0 ${dk ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200'}`}>
        {method && <method.Icon className={`w-4 h-4 flex-shrink-0 ${dk ? 'text-emerald-400' : 'text-emerald-600'}`} />}
        <div>
          <p className={`text-xs font-bold leading-none ${dk ? 'text-emerald-300' : 'text-emerald-800'}`}>{method?.name}</p>
          <p className={`text-[10px] mt-0.5 ${dk ? 'text-emerald-400/60' : 'text-emerald-600/60'}`}>₹{(baseAmount||0).toLocaleString('en-IN')} transfer</p>
        </div>
      </div>
      {rName && (
        <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${dk ? `${cardBg} ${cardBd}` : 'bg-gray-50 border-gray-200'}`}>
          <User className={`w-3.5 h-3.5 flex-shrink-0 ${dk ? 'text-emerald-400' : 'text-emerald-600'}`} />
          <div>
            <p className={`text-[9px] font-bold uppercase tracking-wider ${muted}`}>Name</p>
            <p className={`text-xs font-bold max-w-[120px] truncate ${strong}`}>{rName}</p>
          </div>
        </div>
      )}
      {rPhone && (
        <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${dk ? `${cardBg} ${cardBd}` : 'bg-gray-50 border-gray-200'}`}>
          <Phone className={`w-3.5 h-3.5 flex-shrink-0 ${dk ? 'text-emerald-400' : 'text-emerald-600'}`} />
          <div>
            <p className={`text-[9px] font-bold uppercase tracking-wider ${muted}`}>Phone</p>
            <p className={`text-xs font-bold max-w-[120px] truncate ${strong}`}>{rPhone}</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN MODAL
═══════════════════════════════════════════════════════════════ */
export default function LargeDonationModal({
  isOpen, onClose, onPayOnline, darkMode,
  baseAmount = 0, campaignId,
  donorName = '', donorPhone = '', donorEmail = '',
}) {
  const [winW, setWinW] = useState(() => typeof window !== 'undefined' ? window.innerWidth : 1200);
  useEffect(() => {
    const handle = () => setWinW(window.innerWidth);
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, []);
  const isDesktop = winW >= DESKTOP_BP;

  const [view,           setView]           = useState('offline-choice');
  const [prevView,       setPrevView]       = useState('offline-choice');
  const [offlineMethod,  setOfflineMethod]  = useState(null);
  const [pendingSubmit,  setPendingSubmit]  = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [form, setForm] = useState({
    donationType: 'SADAQAH', transactionDate: '', referenceNumber: '',
    utrNumber: '', chequeNumber: '', chequeDate: '', upiId: '', paymentApp: '',
    bankName: '', branchName: '', bankAccountName: '', remarks: '',
  });

  const userInfo = useSelector((s) => s.auth.userInfo);
  const dispatch = useDispatch();
  const { showToast } = useAppToast();
  const [createDonation, { isLoading: submitting }] = useCreateOfflineDonationMutation();

  const dk  = darkMode;
  const fee = Math.round((baseAmount || 0) * GATEWAY_FEE_PCT / 100);

  useEffect(() => {
    if (isOpen) {
      setView('offline-choice'); setPrevView('offline-choice');
      setOfflineMethod(null); setPendingSubmit(false);
      setForm({ donationType: 'SADAQAH', transactionDate: '', referenceNumber: '',
        utrNumber: '', chequeNumber: '', chequeDate: '', upiId: '', paymentApp: '',
        bankName: '', branchName: '', bankAccountName: '', remarks: '' });
    }
  }, [isOpen]);

  useEffect(() => { if (userInfo && pendingSubmit) doSubmit(); }, [userInfo]);

  // Body scroll lock is managed by parent DonatePopUpModal

  const nav       = (next) => { setPrevView(view); setView(next); };
  const isForward = VIEW_ORDER.indexOf(view) >= VIEW_ORDER.indexOf(prevView);
  const setF      = (e) => { const { name, value } = e.target; setForm(p => ({ ...p, [name]: value })); };

  const doSubmit = async () => {
    if (!userInfo) { setPendingSubmit(true); setShowLoginModal(true); return; }
    setPendingSubmit(false);
    try {
      const data = await createDonation({
        method: offlineMethod.name, amount: Number(baseAmount),
        donationType: form.donationType, campaignId: campaignId || '',
        donorName:  userInfo?.fullName || donorName  || '',
        email:      userInfo?.email    || donorEmail || '',
        phone:      userInfo?.mobileNo || donorPhone || '',
        transactionDate: form.transactionDate, referenceNumber: form.referenceNumber,
        utrNumber: form.utrNumber, chequeNumber: form.chequeNumber,
        chequeDate: form.chequeDate, upiId: form.upiId, paymentApp: form.paymentApp,
        bankName:        form.bankName        || 'IDFC FIRST Bank',
        branchName:      form.branchName      || 'New Delhi – Jasola Branch',
        bankAccountName: form.bankAccountName,
        remarks:         form.remarks,
      }).unwrap();
      dispatch(setCredentials(data.user));
      nav('offline-success');
    } catch (err) {
      showToast({ title: 'Error', message: err?.data?.message || 'Failed to submit.', type: 'error' });
    }
  };

  const rName  = userInfo?.fullName || donorName  || '';
  const rPhone = userInfo?.mobileNo || donorPhone || '';

  /* ── colour tokens ──────────────────────────────────────── */
  const bg     = dk ? 'bg-zinc-900'     : 'bg-white';
  const border = dk ? 'border-zinc-800' : 'border-gray-200';
  const muted  = dk ? 'text-zinc-400'   : 'text-gray-500';
  const strong = dk ? 'text-white'      : 'text-gray-900';
  const cardBg = dk ? 'bg-zinc-800'     : 'bg-gray-50';
  const cardBd = dk ? 'border-zinc-700' : 'border-gray-200';
  const isRNI  = offlineMethod && ['rtgs','neft','imps'].includes(offlineMethod.id);

  /* ── header text ────────────────────────────────────────── */
  const methodName = offlineMethod?.name || '';
  const amtStr     = (baseAmount||0).toLocaleString('en-IN');
  const hdrMap = {
    'offline-choice':  { title: 'Save on Fees',          sub: `${GATEWAY_FEE_PCT}% gateway fee · ₹${amtStr}` },
    'offline-bank':    { title: 'Bank Details',          sub: `Transfer ₹${amtStr} to this account` },
    'offline-method':  { title: 'Transfer Method',       sub: 'How did you send the money?' },
    'offline-form-a':  { title: `${methodName} Transfer`, sub: 'Step 1 of 2 · Transaction details' },
    'offline-form-b':  { title: `${methodName} Transfer`, sub: 'Step 2 of 2 · Sender details & submit' },
    'offline-success': { title: 'Transfer Recorded!',    sub: 'Pending admin verification' },
  };
  const { title, sub } = hdrMap[view] || {};

  /* ── modal sizing ───────────────────────────────────────── */
  const modalW = isDesktop ? 'w-[90vw] max-w-[780px]' : 'w-full';
  const modalR = isDesktop ? 'rounded-2xl' : 'rounded-t-2xl rounded-b-none';
  const shellA = isDesktop ? 'items-center justify-center p-6' : 'items-end justify-center';

  /* ── progress numerator: count only up to form-b ─────── */
  const progressSteps = VIEW_ORDER.filter(v => v !== 'offline-success');
  const progressIdx   = progressSteps.indexOf(view);
  const progressPct   = view === 'offline-success' ? 100
    : progressIdx < 0 ? 0
    : (progressIdx / (progressSteps.length - 1)) * 100;

  /* ══════════════════════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════════════════════ */
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div key="ldm-bd"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={onClose}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-[3px]"
            />

            {/* Shell */}
            <div className={`fixed inset-0 z-[60] flex ${shellA}`}>
              <motion.div
                key="ldm-modal"
                initial={{ opacity: 0, y: isDesktop ? 12 : 36 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{    opacity: 0, y: isDesktop ? 8  : 28 }}
                transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                onClick={(e) => e.stopPropagation()}
                className={`relative flex flex-col border shadow-2xl overflow-hidden ${modalW} ${modalR} ${bg} ${border}`}
                style={{ height: isDesktop ? 'min(640px, 92dvh)' : '93dvh' }}
              >
                {/* Progress bar */}
                {view !== 'offline-success' && (
                  <div className={`h-[2px] w-full flex-shrink-0 ${dk ? 'bg-zinc-800' : 'bg-gray-100'}`}>
                    <motion.div className="h-full bg-emerald-500"
                      animate={{ width: `${progressPct}%` }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    />
                  </div>
                )}

                {/* ── Header ──────────────────────────────── */}
                <div className={`flex items-center gap-3 px-5 py-4 border-b flex-shrink-0 ${border}`}>
                  <AnimatePresence>
                    {BACK_MAP[view] && (
                      <motion.button key="back"
                        initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}
                        transition={{ duration: 0.12 }}
                        onClick={() => nav(BACK_MAP[view])}
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                          dk ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                        }`}>
                        <ArrowLeft className="w-4 h-4" />
                      </motion.button>
                    )}
                  </AnimatePresence>

                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm ${
                    dk ? 'bg-emerald-500/20' : 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500/30'
                  }`}>
                    <Heart className={`w-[18px] h-[18px] ${dk ? 'text-emerald-400' : 'text-white'}`} fill="currentColor" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <AnimatePresence mode="wait">
                      <motion.div key={view}
                        initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.12 }}>
                        <p className={`text-base font-bold leading-tight ${strong}`}>{title}</p>
                        <p className={`text-xs leading-tight mt-0.5 ${muted}`}>{sub}</p>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <button onClick={onClose}
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                      dk ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                    }`}>
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* ── Body ────────────────────────────────── */}
                <div className="flex-1 overflow-y-auto min-h-0" style={{ WebkitOverflowScrolling: 'touch' }}>
                  <AnimatePresence mode="popLayout" custom={isForward}>
                    <motion.div key={view} custom={isForward}
                      variants={slide} initial="enter" animate="center" exit="exit"
                      transition={TRANS}
                      style={{ willChange: 'transform, opacity' }}>

                      {/* ══════════════════════════════════════
                          STEP 1 · SAVE ON FEES
                      ══════════════════════════════════════ */}
                      {view === 'offline-choice' && (
                        <div className={`p-6 ${isDesktop ? 'grid grid-cols-2 gap-8 items-center h-full' : 'space-y-4'}`}>
                          {/* Savings highlight */}
                          <div className={`relative overflow-hidden rounded-2xl p-6 ${
                            dk ? 'bg-emerald-900/25 border border-emerald-700/30'
                               : 'bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/70'
                          }`}>
                            <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10 ${dk ? 'bg-emerald-500' : 'bg-emerald-400'}`} />
                            <div className="relative">
                              <div className="flex items-center gap-2 mb-3">
                                <TrendingDown className={`w-4 h-4 ${dk ? 'text-emerald-400' : 'text-emerald-600'}`} />
                                <span className={`text-xs font-semibold ${dk ? 'text-emerald-300' : 'text-emerald-700'}`}>Direct bank transfer saves you</span>
                              </div>
                              <div className="flex items-end gap-2 mb-2">
                                <span className={`text-5xl font-extrabold tracking-tight leading-none ${dk ? 'text-emerald-400' : 'text-emerald-600'}`}>
                                  ₹{fee.toLocaleString('en-IN')}
                                </span>
                                <span className={`text-sm font-medium mb-1 ${dk ? 'text-emerald-500/80' : 'text-emerald-600/70'}`}>in fees</span>
                              </div>
                              <p className={`text-xs leading-relaxed ${muted}`}>
                                {GATEWAY_FEE_PCT}% of ₹{(baseAmount||0).toLocaleString('en-IN')} goes to the payment gateway when paying online
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col gap-3 justify-center">
                            <button onClick={() => nav('offline-bank')}
                              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-bold text-sm flex items-center justify-between px-5 py-4 shadow-lg shadow-emerald-600/20 active:scale-[0.98] transition-all group">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
                                  <Building2 className="w-4 h-4" />
                                </div>
                                <div className="text-left">
                                  <p className="text-sm font-bold leading-tight">Pay via Bank Transfer</p>
                                  <p className="text-[11px] font-normal text-emerald-200 leading-tight mt-0.5">Zero platform fees</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <span className="text-[10px] font-bold px-2 py-1 rounded-lg bg-white/20">SAVE ₹{fee.toLocaleString('en-IN')}</span>
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                              </div>
                            </button>
                            <button onClick={onPayOnline}
                              className={`w-full h-12 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] border ${
                                dk ? 'bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700'
                                   : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                              }`}>
                              Continue paying online
                            </button>
                            <p className={`text-[10px] text-center ${dk ? 'text-zinc-600' : 'text-gray-400'}`}>
                              Gateway charges are not received by the campaign
                            </p>
                          </div>
                        </div>
                      )}

                      {/* ══════════════════════════════════════
                          STEP 2 · BANK DETAILS
                      ══════════════════════════════════════ */}
                      {view === 'offline-bank' && (
                        <div className="p-6 space-y-4">
                          <div className={`flex items-center justify-between px-5 py-3.5 rounded-xl border ${
                            dk ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200'
                          }`}>
                            <span className={`text-sm font-semibold ${dk ? 'text-emerald-300' : 'text-emerald-700'}`}>Amount to transfer</span>
                            <span className={`text-2xl font-extrabold ${dk ? 'text-emerald-400' : 'text-emerald-600'}`}>
                              ₹{(baseAmount||0).toLocaleString('en-IN')}
                            </span>
                          </div>
                          <div className={isDesktop ? 'grid grid-cols-2 gap-2' : 'space-y-2'}>
                            {BANK_DETAILS.map(({ label, value }) => (
                              <CopyRow key={label} label={label} value={value} dark={dk} />
                            ))}
                          </div>
                          <div className={`flex items-start gap-3 p-4 rounded-xl text-sm leading-relaxed ${
                            dk ? 'bg-blue-900/20 border border-blue-800/30 text-blue-300' : 'bg-blue-50 border border-blue-200 text-blue-700'
                          }`}>
                            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            After completing the transfer, tap below to record the transaction details. We'll verify within 24 hrs.
                          </div>
                          <button onClick={() => nav('offline-method')}
                            className="w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 shadow-md shadow-emerald-600/20 active:scale-[0.98] transition-all">
                            <CheckCircle2 className="w-4 h-4" />
                            I've Transferred — Record It
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      )}

                      {/* ══════════════════════════════════════
                          STEP 3 · PICK METHOD
                      ══════════════════════════════════════ */}
                      {view === 'offline-method' && (
                        <div className="p-6">
                          <div className={isDesktop ? 'grid grid-cols-2 gap-3' : 'space-y-2'}>
                            {PAYMENT_METHODS.map(({ id, name, Icon, desc }) => (
                              <button key={id}
                                onClick={() => { setOfflineMethod({ id, name, Icon }); nav('offline-form-a'); }}
                                className={`flex items-center gap-4 px-5 py-4 rounded-xl border text-left transition-all active:scale-[0.99] group ${
                                  dk ? 'border-zinc-700 hover:border-emerald-500/60 hover:bg-zinc-800'
                                     : 'bg-white border-gray-200 hover:border-emerald-400 hover:bg-emerald-50/50'
                                }`}>
                                <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                                  dk ? 'bg-zinc-800 group-hover:bg-emerald-500/15' : 'bg-gray-100 group-hover:bg-emerald-100'
                                }`}>
                                  <Icon className={`w-5 h-5 transition-colors ${dk ? 'text-zinc-400 group-hover:text-emerald-400' : 'text-gray-500 group-hover:text-emerald-600'}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className={`text-sm font-bold ${strong}`}>{name}</p>
                                  <p className={`text-xs truncate mt-0.5 ${muted}`}>{desc}</p>
                                </div>
                                <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-all group-hover:translate-x-0.5 ${dk ? 'text-zinc-600 group-hover:text-emerald-400' : 'text-gray-300 group-hover:text-emerald-500'}`} />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* ══════════════════════════════════════
                          STEP 4a · TRANSACTION DETAILS
                          Donation type + method-specific ref/date
                      ══════════════════════════════════════ */}
                      {view === 'offline-form-a' && offlineMethod && (
                        <div className="p-6 flex flex-col gap-5">
                          <DonorChips method={offlineMethod} baseAmount={baseAmount} rName={rName} rPhone={rPhone}
                            dk={dk} cardBg={cardBg} cardBd={cardBd} muted={muted} strong={strong} />

                          {isDesktop ? (
                            /* Desktop: side-by-side — donation type left, transaction right */
                            <div className="flex gap-0 flex-1">
                              {/* Left */}
                              <div className="flex-1 min-w-0 pr-6 space-y-4">
                                <SecHead dark={dk}>Donation Details</SecHead>
                                <div>
                                  <Lbl dark={dk}>Donation Type</Lbl>
                                  <Sel dark={dk} icon={<FileText className="w-4 h-4" />}
                                    name="donationType" value={form.donationType} onChange={setF}>
                                    <option value="SADAQAH">Sadaqah</option>
                                    <option value="ZAKAAT">Zakaat</option>
                                    <option value="LILLAH">Lillah</option>
                                    <option value="IMDAD">Imdad</option>
                                    <option value="RIBA">Riba</option>
                                  </Sel>
                                </div>

                                {/* UPI-specific: UPI ID + App on left side */}
                                {offlineMethod.id === 'upi' && (
                                  <>
                                    <div>
                                      <Lbl dark={dk}>UPI ID *</Lbl>
                                      <Inp dark={dk} icon={<Hash className="w-4 h-4" />}
                                        type="text" name="upiId" value={form.upiId} onChange={setF}
                                        placeholder="yourname@upi" autoComplete="off" />
                                    </div>
                                    <div>
                                      <Lbl dark={dk}>Payment App</Lbl>
                                      <Sel dark={dk} icon={<Smartphone className="w-4 h-4" />}
                                        name="paymentApp" value={form.paymentApp} onChange={setF}>
                                        <option value="">Select (optional)</option>
                                        <option value="GooglePay">Google Pay</option>
                                        <option value="PhonePe">PhonePe</option>
                                        <option value="Paytm">Paytm</option>
                                        <option value="BHIM">BHIM</option>
                                        <option value="Other">Other</option>
                                      </Sel>
                                    </div>
                                  </>
                                )}
                              </div>

                              {/* Divider */}
                              <div className={`w-px self-stretch flex-shrink-0 ${dk ? 'bg-zinc-800' : 'bg-gray-100'}`} />

                              {/* Right */}
                              <div className="flex-1 min-w-0 pl-6 space-y-4">
                                <SecHead dark={dk}>Transaction Info</SecHead>

                                {/* UPI date on right */}
                                {offlineMethod.id === 'upi' && (
                                  <div>
                                    <Lbl dark={dk}>Transaction Date *</Lbl>
                                    <Inp dark={dk} icon={<Calendar className="w-4 h-4" />}
                                      type="date" name="transactionDate" value={form.transactionDate} onChange={setF} />
                                  </div>
                                )}

                                {/* RTGS / IMPS / NEFT */}
                                {isRNI && (
                                  <>
                                    <div>
                                      <Lbl dark={dk}>
                                        {offlineMethod.id === 'rtgs' ? 'UTR Number' : offlineMethod.id === 'imps' ? 'Transaction ID' : 'Reference Number'} *
                                      </Lbl>
                                      <Inp dark={dk} icon={<Hash className="w-4 h-4" />}
                                        type="text"
                                        name={offlineMethod.id === 'rtgs' ? 'utrNumber' : 'referenceNumber'}
                                        value={offlineMethod.id === 'rtgs' ? form.utrNumber : form.referenceNumber}
                                        onChange={setF} placeholder="Enter reference number" autoComplete="off" />
                                    </div>
                                    <div>
                                      <Lbl dark={dk}>Transaction Date *</Lbl>
                                      <Inp dark={dk} icon={<Calendar className="w-4 h-4" />}
                                        type="date" name="transactionDate" value={form.transactionDate} onChange={setF} />
                                    </div>
                                  </>
                                )}

                                {/* CHEQUE */}
                                {offlineMethod.id === 'cheque' && (
                                  <>
                                    <div>
                                      <Lbl dark={dk}>Cheque Number *</Lbl>
                                      <Inp dark={dk} icon={<Hash className="w-4 h-4" />}
                                        type="text" name="chequeNumber" value={form.chequeNumber} onChange={setF}
                                        placeholder="6-digit cheque number" />
                                    </div>
                                    <div>
                                      <Lbl dark={dk}>Cheque Date *</Lbl>
                                      <Inp dark={dk} icon={<Calendar className="w-4 h-4" />}
                                        type="date" name="chequeDate" value={form.chequeDate} onChange={setF} />
                                    </div>
                                  </>
                                )}

                                {/* UPI auto-match notice */}
                                {offlineMethod.id === 'upi' && (
                                  <div className={`flex items-start gap-3 p-3 rounded-xl text-xs leading-relaxed ${
                                    dk ? 'bg-zinc-800 border border-zinc-700 text-zinc-400' : 'bg-gray-50 border border-gray-200 text-gray-500'
                                  }`}>
                                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-emerald-500" />
                                    UPI transfers are matched automatically via the transaction ID you provide.
                                  </div>
                                )}
                              </div>
                            </div>
                          ) : (
                            /* Mobile: single column */
                            <div className="space-y-4">
                              <SecHead dark={dk}>Donation Details</SecHead>
                              <div>
                                <Lbl dark={dk}>Donation Type</Lbl>
                                <Sel dark={dk} icon={<FileText className="w-4 h-4" />}
                                  name="donationType" value={form.donationType} onChange={setF}>
                                  <option value="SADAQAH">Sadaqah</option>
                                  <option value="ZAKAAT">Zakaat</option>
                                  <option value="LILLAH">Lillah</option>
                                  <option value="IMDAD">Imdad</option>
                                  <option value="RIBA">Riba</option>
                                </Sel>
                              </div>
                              <SecHead dark={dk}>Transaction Info</SecHead>
                              {offlineMethod.id === 'upi' && (
                                <>
                                  <div>
                                    <Lbl dark={dk}>UPI ID *</Lbl>
                                    <Inp dark={dk} icon={<Hash className="w-4 h-4" />}
                                      type="text" name="upiId" value={form.upiId} onChange={setF}
                                      placeholder="yourname@upi" autoComplete="off" />
                                  </div>
                                  <div>
                                    <Lbl dark={dk}>Payment App</Lbl>
                                    <Sel dark={dk} icon={<Smartphone className="w-4 h-4" />}
                                      name="paymentApp" value={form.paymentApp} onChange={setF}>
                                      <option value="">Select (optional)</option>
                                      <option value="GooglePay">Google Pay</option>
                                      <option value="PhonePe">PhonePe</option>
                                      <option value="Paytm">Paytm</option>
                                      <option value="BHIM">BHIM</option>
                                      <option value="Other">Other</option>
                                    </Sel>
                                  </div>
                                  <div>
                                    <Lbl dark={dk}>Transaction Date *</Lbl>
                                    <Inp dark={dk} icon={<Calendar className="w-4 h-4" />}
                                      type="date" name="transactionDate" value={form.transactionDate} onChange={setF} />
                                  </div>
                                </>
                              )}
                              {isRNI && (
                                <>
                                  <div>
                                    <Lbl dark={dk}>
                                      {offlineMethod.id === 'rtgs' ? 'UTR Number' : offlineMethod.id === 'imps' ? 'Transaction ID' : 'Reference Number'} *
                                    </Lbl>
                                    <Inp dark={dk} icon={<Hash className="w-4 h-4" />}
                                      type="text"
                                      name={offlineMethod.id === 'rtgs' ? 'utrNumber' : 'referenceNumber'}
                                      value={offlineMethod.id === 'rtgs' ? form.utrNumber : form.referenceNumber}
                                      onChange={setF} placeholder="Enter reference number" autoComplete="off" />
                                  </div>
                                  <div>
                                    <Lbl dark={dk}>Transaction Date *</Lbl>
                                    <Inp dark={dk} icon={<Calendar className="w-4 h-4" />}
                                      type="date" name="transactionDate" value={form.transactionDate} onChange={setF} />
                                  </div>
                                </>
                              )}
                              {offlineMethod.id === 'cheque' && (
                                <>
                                  <div>
                                    <Lbl dark={dk}>Cheque Number *</Lbl>
                                    <Inp dark={dk} icon={<Hash className="w-4 h-4" />}
                                      type="text" name="chequeNumber" value={form.chequeNumber} onChange={setF}
                                      placeholder="6-digit cheque number" />
                                  </div>
                                  <div>
                                    <Lbl dark={dk}>Cheque Date *</Lbl>
                                    <Inp dark={dk} icon={<Calendar className="w-4 h-4" />}
                                      type="date" name="chequeDate" value={form.chequeDate} onChange={setF} />
                                  </div>
                                </>
                              )}
                            </div>
                          )}

                          {/* Next button */}
                          <button
                            onClick={() => {
                              if (!form.transactionDate) {
                                showToast({ title: 'Date Required', message: 'Please enter the transaction date before continuing.', type: 'error' });
                                return;
                              }
                              nav('offline-form-b');
                            }}
                            className="w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 shadow-md shadow-emerald-600/20 active:scale-[0.98] transition-all mt-auto">
                            Next — Sender Details
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      )}

                      {/* ══════════════════════════════════════
                          STEP 4b · SENDER DETAILS + SUBMIT
                          Bank/sender info + notes + CTA
                      ══════════════════════════════════════ */}
                      {view === 'offline-form-b' && offlineMethod && (
                        <div className="p-6 flex flex-col gap-5">
                          <DonorChips method={offlineMethod} baseAmount={baseAmount} rName={rName} rPhone={rPhone}
                            dk={dk} cardBg={cardBg} cardBd={cardBd} muted={muted} strong={strong} />

                          {isDesktop ? (
                            /* Desktop: sender details left, notes right */
                            <div className="flex gap-0 flex-1">
                              {/* Left — sender/bank details */}
                              <div className="flex-1 min-w-0 pr-6 space-y-4">
                                {(isRNI || offlineMethod.id === 'cheque') ? (
                                  <>
                                    <SecHead dark={dk}>
                                      {offlineMethod.id === 'cheque' ? 'Cheque Bank Details' : 'Sender Bank Details'}
                                    </SecHead>
                                    <div>
                                      <Lbl dark={dk}>Bank Name *</Lbl>
                                      <Inp dark={dk} icon={<Building2 className="w-4 h-4" />}
                                        type="text" name="bankName" value={form.bankName} onChange={setF}
                                        placeholder={offlineMethod.id === 'cheque' ? 'Bank name on cheque' : 'Your bank name'} autoComplete="off" />
                                    </div>
                                    <div>
                                      <Lbl dark={dk}>Account Holder Name *</Lbl>
                                      <Inp dark={dk} icon={<User className="w-4 h-4" />}
                                        type="text" name="bankAccountName" value={form.bankAccountName} onChange={setF}
                                        placeholder="Name on bank account" autoComplete="off" />
                                    </div>
                                    <div>
                                      <Lbl dark={dk}>Branch Name</Lbl>
                                      <Inp dark={dk} icon={<Landmark className="w-4 h-4" />}
                                        type="text" name="branchName" value={form.branchName} onChange={setF}
                                        placeholder="Branch (optional)" autoComplete="off" />
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <SecHead dark={dk}>UPI Info</SecHead>
                                    <div className={`flex items-start gap-3 p-4 rounded-xl text-sm leading-relaxed ${
                                      dk ? 'bg-zinc-800 border border-zinc-700 text-zinc-400' : 'bg-gray-50 border border-gray-200 text-gray-500'
                                    }`}>
                                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-500" />
                                      UPI transfers are matched automatically via the transaction ID you provided in the previous step.
                                    </div>
                                  </>
                                )}
                              </div>

                              {/* Divider */}
                              <div className={`w-px self-stretch flex-shrink-0 ${dk ? 'bg-zinc-800' : 'bg-gray-100'}`} />

                              {/* Right — notes + verification notice */}
                              <div className="flex-1 min-w-0 pl-6 space-y-4">
                                <SecHead dark={dk}>Additional Notes</SecHead>
                                <div>
                                  <Lbl dark={dk}>Remarks / Notes</Lbl>
                                  <div className="relative">
                                    <MessageSquare className={`absolute left-3.5 top-3.5 w-4 h-4 pointer-events-none ${dk ? 'text-zinc-400' : 'text-gray-400'}`} />
                                    <textarea name="remarks" value={form.remarks} onChange={setF} rows={5}
                                      placeholder="Any additional information (optional)"
                                      className={`w-full pl-10 pr-4 py-3 rounded-xl border outline-none transition-colors text-sm font-medium resize-none ${
                                        dk ? 'bg-zinc-800/80 border-zinc-600 text-white placeholder-zinc-500 focus:border-emerald-500'
                                           : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-emerald-500'
                                      }`}
                                    />
                                  </div>
                                </div>
                                <div className={`flex items-start gap-3 p-3 rounded-xl text-xs leading-relaxed ${
                                  dk ? 'bg-blue-900/20 border border-blue-800/30 text-blue-300' : 'bg-blue-50 border border-blue-200 text-blue-700'
                                }`}>
                                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                                  We'll verify your transfer within 24 hours and send a confirmation to your email.
                                </div>
                              </div>
                            </div>
                          ) : (
                            /* Mobile: single column */
                            <div className="space-y-4">
                              {(isRNI || offlineMethod.id === 'cheque') ? (
                                <>
                                  <SecHead dark={dk}>
                                    {offlineMethod.id === 'cheque' ? 'Cheque Bank Details' : 'Sender Bank Details'}
                                  </SecHead>
                                  <div>
                                    <Lbl dark={dk}>Bank Name *</Lbl>
                                    <Inp dark={dk} icon={<Building2 className="w-4 h-4" />}
                                      type="text" name="bankName" value={form.bankName} onChange={setF}
                                      placeholder={offlineMethod.id === 'cheque' ? 'Bank name on cheque' : 'Your bank name'} autoComplete="off" />
                                  </div>
                                  <div>
                                    <Lbl dark={dk}>Account Holder Name *</Lbl>
                                    <Inp dark={dk} icon={<User className="w-4 h-4" />}
                                      type="text" name="bankAccountName" value={form.bankAccountName} onChange={setF}
                                      placeholder="Name on bank account" autoComplete="off" />
                                  </div>
                                  <div>
                                    <Lbl dark={dk}>Branch Name</Lbl>
                                    <Inp dark={dk} icon={<Landmark className="w-4 h-4" />}
                                      type="text" name="branchName" value={form.branchName} onChange={setF}
                                      placeholder="Branch (optional)" autoComplete="off" />
                                  </div>
                                </>
                              ) : (
                                <>
                                  <SecHead dark={dk}>UPI Info</SecHead>
                                  <div className={`flex items-start gap-3 p-4 rounded-xl text-sm leading-relaxed ${
                                    dk ? 'bg-zinc-800 border border-zinc-700 text-zinc-400' : 'bg-gray-50 border border-gray-200 text-gray-500'
                                  }`}>
                                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-500" />
                                    UPI transfers are matched automatically via the transaction ID you provided.
                                  </div>
                                </>
                              )}
                              <SecHead dark={dk}>Additional Notes</SecHead>
                              <div>
                                <Lbl dark={dk}>Remarks / Notes</Lbl>
                                <div className="relative">
                                  <MessageSquare className={`absolute left-3.5 top-3.5 w-4 h-4 pointer-events-none ${dk ? 'text-zinc-400' : 'text-gray-400'}`} />
                                  <textarea name="remarks" value={form.remarks} onChange={setF} rows={3}
                                    placeholder="Any additional information (optional)"
                                    className={`w-full pl-10 pr-4 py-3 rounded-xl border outline-none transition-colors text-sm font-medium resize-none ${
                                      dk ? 'bg-zinc-800/80 border-zinc-600 text-white placeholder-zinc-500 focus:border-emerald-500'
                                         : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-emerald-500'
                                    }`}
                                  />
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Submit */}
                          <div className="space-y-3 mt-auto">
                            <div className={`flex items-start gap-3 p-3 rounded-xl text-xs leading-relaxed ${
                              dk ? 'bg-blue-900/20 border border-blue-800/30 text-blue-300' : 'bg-blue-50 border border-blue-200 text-blue-700'
                            } ${isDesktop ? 'hidden' : ''}`}>
                              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                              We'll verify your transfer within 24 hours and send a confirmation to your email.
                            </div>
                            <button onClick={doSubmit} disabled={submitting}
                              className={`w-full h-12 rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] shadow-md ${
                                submitting
                                  ? 'bg-emerald-600/50 cursor-wait text-white'
                                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-600/25'
                              }`}>
                              {submitting ? (
                                <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8C5.373 4 0 8.373 0 12h4z" />
                                </svg>Submitting…</>
                              ) : (
                                <><Sparkles className="w-4 h-4" />Submit Transfer Record</>
                              )}
                            </button>
                          </div>
                        </div>
                      )}

                      {/* ══════════════════════════════════════
                          STEP 5 · SUCCESS
                      ══════════════════════════════════════ */}
                      {view === 'offline-success' && (
                        <div className={`flex flex-col items-center text-center ${isDesktop ? 'py-14 px-12' : 'py-10 px-8'}`}>
                          <motion.div
                            initial={{ scale: 0 }} animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 22, delay: 0.05 }}
                            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/30"
                          >
                            <Check className="w-10 h-10 text-white" strokeWidth={2.5} />
                          </motion.div>
                          <h2 className={`text-2xl font-extrabold mb-2 ${strong}`}>JazakAllah Khair!</h2>
                          <p className={`text-sm leading-relaxed mb-6 max-w-md ${muted}`}>
                            Your donation of{' '}
                            <span className="font-bold text-emerald-500">₹{(baseAmount||0).toLocaleString('en-IN')}</span>
                            {' '}has been recorded and is pending admin verification. You'll be notified once confirmed.
                          </p>
                          <div className={`w-full max-w-md flex items-center gap-3 p-4 rounded-xl mb-6 border ${dk ? `${cardBg} ${cardBd}` : 'bg-gray-50 border-gray-200'}`}>
                            <Shield className={`w-5 h-5 flex-shrink-0 ${dk ? 'text-emerald-400' : 'text-emerald-600'}`} />
                            <p className={`text-xs text-left ${muted}`}>
                              Verification typically takes 24 hours. You'll receive an email once approved.
                            </p>
                          </div>
                          <button onClick={onClose}
                            className="w-full max-w-md h-12 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold text-base active:scale-[0.98] transition-all shadow-md shadow-emerald-600/20">
                            Done
                          </button>
                        </div>
                      )}

                    </motion.div>
                  </AnimatePresence>
                </div>

              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      <LoginModal
        isOpen={showLoginModal}A
        onClose={() => { setShowLoginModal(false); setPendingSubmit(false); }}
        darkMode={darkMode}
        onLoginSuccess={() => setShowLoginModal(false)}
      />
    </>
  );
}