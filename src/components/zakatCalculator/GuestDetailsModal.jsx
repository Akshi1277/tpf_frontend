'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Phone, Calendar, Download, ShieldCheck, Sparkles } from 'lucide-react';

/**
 * GuestDetailsModal
 *
 * Props:
 *  - isOpen          : boolean
 *  - onClose         : () => void
 *  - darkMode        : boolean
 *  - onConfirm       : (formData) => Promise<void>   ← called when user submits
 *  - isSubmitting    : boolean
 */
export default function GuestDetailsModal({
  isOpen,
  onClose,
  darkMode = false,
  onConfirm,
  isSubmitting = false,
}) {
  const dk = darkMode;

  const [fullName, setFullName]           = useState('');
  const [email, setEmail]                 = useState('');
  const [mobileNo, setMobileNo]           = useState('');
  const [nisaabDate, setNisaabDate]       = useState('');
  const [errors, setErrors]               = useState({});

  const inputBase = `w-full h-10 rounded-lg text-sm font-medium focus:outline-none transition-colors border ${
    dk
      ? 'bg-zinc-800/80 border-zinc-700 text-white placeholder-zinc-500 focus:border-emerald-500'
      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/10'
  }`;

  const validate = () => {
    const e = {};
    if (!fullName.trim())                                          e.fullName = 'Full name is required';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Valid email is required';
    if (!mobileNo.trim() || !/^\d{10}$/.test(mobileNo))           e.mobileNo = 'Valid 10-digit mobile is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    await onConfirm({ fullName, email, mobileNo, nisaabDate: nisaabDate || null });
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="guest-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 z-[60]"
            style={{ backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              key="guest-modal"
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-md rounded-2xl shadow-2xl overflow-hidden ${
                dk ? 'bg-zinc-900 border border-zinc-800' : 'bg-white border border-gray-100'
              }`}
            >
              {/* Header */}
              <div
                className="px-5 py-4 flex items-center gap-3"
                style={{ background: 'linear-gradient(135deg, #0d2b1e 0%, #1a4a35 50%, #112b20 100%)' }}
              >
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Download className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-white font-bold text-sm">Download Zakat Summary</h2>
                  <p className="text-white/50 text-xs mt-0.5">Enter your details to receive your report</p>
                </div>
                <button
                  onClick={handleClose}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <X className="w-3.5 h-3.5 text-white" />
                </button>
              </div>

              {/* Body */}
              <div className="p-5 space-y-4">

                {/* Mandatory fields */}
                <div>
                  <p className={`text-[10px] font-bold tracking-widest uppercase mb-3 ${dk ? 'text-zinc-500' : 'text-gray-400'}`}>
                    Your Details <span className={dk ? 'text-red-400' : 'text-red-500'}>*</span>
                  </p>
                  <div className="space-y-2.5">

                    {/* Full Name */}
                    <div>
                      <div className="relative">
                        <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${dk ? 'text-zinc-500' : 'text-gray-400'}`} />
                        <input
                          type="text"
                          placeholder="Full Name"
                          value={fullName}
                          onChange={(e) => { setFullName(e.target.value); setErrors((p) => ({ ...p, fullName: '' })); }}
                          className={`${inputBase} pl-9 ${errors.fullName ? (dk ? 'border-red-500' : 'border-red-400') : ''}`}
                        />
                      </div>
                      {errors.fullName && <p className="text-[10px] text-red-500 mt-1 pl-1">{errors.fullName}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <div className="relative">
                        <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${dk ? 'text-zinc-500' : 'text-gray-400'}`} />
                        <input
                          type="email"
                          placeholder="Email Address"
                          value={email}
                          onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: '' })); }}
                          className={`${inputBase} pl-9 ${errors.email ? (dk ? 'border-red-500' : 'border-red-400') : ''}`}
                        />
                      </div>
                      {errors.email && <p className="text-[10px] text-red-500 mt-1 pl-1">{errors.email}</p>}
                    </div>

                    {/* Mobile */}
                    <div>
                      <div className="relative">
                        <Phone className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${dk ? 'text-zinc-500' : 'text-gray-400'}`} />
                        <input
                          type="tel"
                          placeholder="Mobile Number (10 digits)"
                          value={mobileNo}
                          onChange={(e) => {
                            setMobileNo(e.target.value.replace(/\D/g, '').slice(0, 10));
                            setErrors((p) => ({ ...p, mobileNo: '' }));
                          }}
                          maxLength={10}
                          className={`${inputBase} pl-9 ${errors.mobileNo ? (dk ? 'border-red-500' : 'border-red-400') : ''}`}
                        />
                      </div>
                      {errors.mobileNo && <p className="text-[10px] text-red-500 mt-1 pl-1">{errors.mobileNo}</p>}
                    </div>
                  </div>
                </div>

                {/* Optional — Nisab date */}
                <div>
                  <p className={`text-[10px] font-bold tracking-widest uppercase mb-1.5 ${dk ? 'text-zinc-500' : 'text-gray-400'}`}>
                    Sahib-e-Nisab Date <span className={`font-normal normal-case tracking-normal ${dk ? 'text-zinc-600' : 'text-gray-400'}`}>(optional)</span>
                  </p>
                  <p className={`text-[10px] leading-relaxed mb-2 ${dk ? 'text-zinc-500' : 'text-gray-400'}`}>
                    The date your wealth first exceeded Nisab. We'll send you a reminder to pay Zakat when your Haul (lunar year) is complete.
                  </p>
                  <div className="relative">
                    <Calendar className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${dk ? 'text-zinc-500' : 'text-gray-400'}`} />
                    <input
                      type="date"
                      value={nisaabDate}
                      onChange={(e) => setNisaabDate(e.target.value)}
                      max={new Date().toISOString().split('T')[0]}
                      className={`${inputBase} pl-9 ${dk ? '[color-scheme:dark]' : ''}`}
                    />
                  </div>
                  {nisaabDate && (
                    <p className={`text-[10px] mt-1.5 pl-1 ${dk ? 'text-emerald-400' : 'text-emerald-600'}`}>
                      ✓ We'll remind you on your Haul anniversary
                    </p>
                  )}
                </div>

                {/* CTA */}
                <div className="space-y-2 pt-1">
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`w-full h-11 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                      isSubmitting
                        ? 'bg-emerald-600 text-white cursor-wait'
                        : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 active:scale-[0.98] text-white shadow-lg shadow-emerald-600/20'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v0C5.373 4 0 8.373 0 12h4z" />
                        </svg>
                        Preparing Download…
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        Download Summary
                      </>
                    )}
                  </button>

                  <div className={`flex items-center justify-center gap-1.5 ${dk ? 'text-zinc-600' : 'text-gray-400'}`}>
                    <ShieldCheck className="w-3 h-3" />
                    <span className="text-[10px] font-medium">Your data is safe · No spam, ever</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}