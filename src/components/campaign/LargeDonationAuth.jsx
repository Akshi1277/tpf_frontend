'use client'
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Phone, ArrowRight, ArrowLeft, Check, User, Mail,
    Shield, Loader2,
} from 'lucide-react';
import { useSendOtpMutation, useVerifyOtpMutation, useUpdateProfileMutation } from '@/utils/slices/authApiSlice';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/utils/slices/authSlice';
import { useAppToast } from '@/app/AppToastContext';

/**
 * LargeDonationAuth
 *
 * A self-contained, inline auth widget designed to live inside the
 * LargeDonationModal flow.  No separate modal — everything renders in-place.
 *
 * Props
 *  dark        – boolean (darkMode)
 *  onSuccess   – called with the verified user object once auth is complete
 *  donorName   – pre-fill full name (optional)
 *  donorPhone  – pre-fill mobile (optional)
 *  donorEmail  – pre-fill email (optional)
 */
export default function LargeDonationAuth({
    dark = false,
    onSuccess,
    donorName = '',
    donorPhone = '',
    donorEmail = '',
}) {
    // ── step: 'mobile' | 'otp' | 'details'
    const [step, setStep] = useState('mobile');

    // ── field state
    const [mobile, setMobile] = useState(donorPhone?.replace(/\D/g, '').slice(-10) || '');
    const [otp, setOtp] = useState(['', '', '', '']);
    const [name, setName] = useState(donorName || '');
    const [email, setEmail] = useState(donorEmail || '');

    // ── OTP resend cooldown
    const [cooldown, setCooldown] = useState(0);
    useEffect(() => {
        if (cooldown <= 0) return;
        const t = setTimeout(() => setCooldown(c => c - 1), 1000);
        return () => clearTimeout(t);
    }, [cooldown]);

    // ── whether this is a new user (needs details step)
    const [isNewUser, setIsNewUser] = useState(false);

    const otpRefs = useRef([]);
    const mobileRef = useRef(null);

    const dispatch = useDispatch();
    const { showToast } = useAppToast();

    const [sendOtp, { isLoading: sending }] = useSendOtpMutation();
    const [verifyOtp, { isLoading: verifying }] = useVerifyOtpMutation();
    const [updateProfile, { isLoading: updating }] = useUpdateProfileMutation();

    // ── auto-focus mobile on mount
    useEffect(() => { setTimeout(() => mobileRef.current?.focus(), 150); }, []);

    // ── auto-focus first OTP box when step changes
    useEffect(() => {
        if (step === 'otp') setTimeout(() => otpRefs.current[0]?.focus(), 150);
    }, [step]);

    // ─────────────────────────────────────────────────────────────
    // STEP 1 — send OTP (works for both login & signup)
    // ─────────────────────────────────────────────────────────────
    const handleSendOtp = async () => {
        if (mobile.length !== 10) return;
        try {
            // Try login first; backend will handle new vs existing
            // We use type:"login" — if the number isn't found the backend
            // either auto-creates or returns a flag; we'll detect via verifyOtp
            await sendOtp({ mobileNo: mobile, loginMethod: 'mobile', purpose: 'login', type: 'login' }).unwrap();
            setOtp(['', '', '', '']);
            setStep('otp');
            setCooldown(30);
        } catch (err) {
            // If backend says "user not found", try signup flow
            const msg = err?.data?.message || '';
            if (/not found|not registered|no user/i.test(msg)) {
                try {
                    await sendOtp({ mobileNo: mobile, type: 'signup' }).unwrap();
                    setOtp(['', '', '', '']);
                    setIsNewUser(true);
                    setStep('otp');
                    setCooldown(30);
                } catch (err2) {
                    showToast({ title: 'Error', message: err2?.data?.message || 'Failed to send OTP.', type: 'error' });
                }
            } else {
                showToast({ title: 'Error', message: msg || 'Failed to send OTP.', type: 'error' });
            }
        }
    };

    const handleResend = async () => {
        if (cooldown > 0 || sending) return;
        await handleSendOtp();
    };

    // ─────────────────────────────────────────────────────────────
    // STEP 2 — verify OTP
    // ─────────────────────────────────────────────────────────────
    const handleVerifyOtp = async () => {
        const code = otp.join('');
        if (code.length !== 4) return;
        try {
            const res = await verifyOtp({ mobileNo: mobile, otp: code }).unwrap();
            dispatch(setCredentials(res.user));

            // If user has no profile yet → details step
            if (!res.user.fullName || !res.user.email) {
                setIsNewUser(true);
                setStep('details');
            } else {
                // Existing user — done
                onSuccess?.(res.user);
            }
        } catch (err) {
            showToast({ title: 'Invalid OTP', message: 'Please check the code and try again.', type: 'error' });
        }
    };

    // ─────────────────────────────────────────────────────────────
    // STEP 3 — save profile (new users only)
    // ─────────────────────────────────────────────────────────────
    const handleSaveProfile = async () => {
        if (!name.trim() || !email.trim()) return;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showToast({ title: 'Invalid Email', message: 'Please enter a valid email address.', type: 'error' });
            return;
        }
        try {
            const res = await updateProfile({ fullName: name, email }).unwrap();
            dispatch(setCredentials(res.user));
            onSuccess?.(res.user);
        } catch (err) {
            showToast({ title: 'Error', message: err?.data?.message || 'Failed to save details.', type: 'error' });
        }
    };

    // ─────────────────────────────────────────────────────────────
    // OTP box helpers
    // ─────────────────────────────────────────────────────────────
    const handleOtpChange = (idx, val) => {
        const digit = val.replace(/\D/g, '').slice(-1);
        const next = [...otp];
        next[idx] = digit;
        setOtp(next);
        if (digit && idx < 3) otpRefs.current[idx + 1]?.focus();
    };

    const handleOtpKey = (idx, e) => {
        if (e.key === 'Backspace') {
            if (!otp[idx] && idx > 0) otpRefs.current[idx - 1]?.focus();
            else { const n = [...otp]; n[idx] = ''; setOtp(n); }
        }
        if (e.key === 'ArrowLeft' && idx > 0) otpRefs.current[idx - 1]?.focus();
        if (e.key === 'ArrowRight' && idx < 3) otpRefs.current[idx + 1]?.focus();
    };

    const handleOtpPaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
        const filled = pasted.split('').concat(['', '', '', '']).slice(0, 4);
        setOtp(filled);
        otpRefs.current[Math.min(pasted.length, 3)]?.focus();
    };

    // ── keyboard Enter shortcut
    useEffect(() => {
        const handler = (e) => {
            if (e.key !== 'Enter') return;
            if (step === 'mobile' && mobile.length === 10) handleSendOtp();
            if (step === 'otp' && otp.join('').length === 4) handleVerifyOtp();
            if (step === 'details' && name && email) handleSaveProfile();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [step, mobile, otp, name, email]);

    // ── shared style tokens
    const inputCls = (extra = '') =>
        `w-full px-4 py-3 rounded-xl border-2 text-sm font-medium outline-none transition-all ${dark
            ? 'bg-zinc-800 border-zinc-600 text-white placeholder-zinc-500 focus:border-emerald-500'
            : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500'
        } ${extra}`;

    const primaryBtn = (disabled) =>
        `w-full h-11 rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] shadow-md ${disabled
            ? dark ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed border border-zinc-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-600/20'
        }`;

    const ghostBtn =
        `w-full h-10 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all ${dark ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
        }`;

    const muted = dark ? 'text-zinc-400' : 'text-gray-500';
    const strong = dark ? 'text-white' : 'text-gray-900';

    // ─────────────────────────────────────────────────────────────
    // RENDER
    // ─────────────────────────────────────────────────────────────
    return (
        <div className="p-6 flex flex-col gap-5">

            {/* ── Header badge */}
            <div className={`flex items-center gap-3 p-3.5 rounded-xl border ${dark ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200'
                }`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${dark ? 'bg-emerald-500/20' : 'bg-emerald-100'
                    }`}>
                    <Shield className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                    <p className={`text-xs font-bold leading-none ${dark ? 'text-emerald-300' : 'text-emerald-800'}`}>
                        Sign in to confirm your transfer
                    </p>
                    <p className={`text-[11px] mt-0.5 ${dark ? 'text-emerald-400/70' : 'text-emerald-600/70'}`}>
                        We'll link this donation to your account
                    </p>
                </div>
            </div>

            {/* ── Step progress dots */}
            <div className="flex items-center justify-center gap-2">
                {['mobile', 'otp', ...(isNewUser ? ['details'] : [])].map((s, i) => (
                    <div
                        key={s}
                        className={`h-1.5 rounded-full transition-all duration-300 ${s === step
                                ? 'w-6 bg-emerald-500'
                                : ['mobile', 'otp', 'details'].indexOf(s) < ['mobile', 'otp', 'details'].indexOf(step)
                                    ? 'w-3 bg-emerald-400'
                                    : dark ? 'w-3 bg-zinc-700' : 'w-3 bg-gray-200'
                            }`}
                    />
                ))}
            </div>

            {/* ── Animated step panels */}
            <AnimatePresence mode="wait">

                {/* ════════════ STEP 1 — MOBILE ════════════ */}
                {step === 'mobile' && (
                    <motion.div
                        key="mobile"
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -16 }}
                        transition={{ duration: 0.15 }}
                        className="flex flex-col gap-4"
                    >
                        <div>
                            <p className={`text-base font-bold ${strong}`}>Enter your mobile number</p>
                            <p className={`text-xs mt-0.5 ${muted}`}>We'll send a one-time code to verify your identity</p>
                        </div>

                        {/* Phone input */}
                        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${dark
                                ? 'bg-zinc-800 border-zinc-600 focus-within:border-emerald-500'
                                : 'bg-white border-gray-200 focus-within:border-emerald-500'
                            }`}>
                            {/* India flag */}
                            <div className="flex items-center gap-2 flex-shrink-0">
                                <svg className="w-6 h-4" viewBox="0 0 30 20">
                                    <rect width="30" height="6.67" fill="#FF9933" />
                                    <rect y="6.67" width="30" height="6.67" fill="#FFFFFF" />
                                    <rect y="13.33" width="30" height="6.67" fill="#138808" />
                                    <circle cx="15" cy="10" r="2.5" fill="#000080" />
                                </svg>
                                <span className={`text-sm font-semibold ${dark ? 'text-zinc-300' : 'text-gray-700'}`}>+91</span>
                                <div className={`w-px h-5 ${dark ? 'bg-zinc-600' : 'bg-gray-300'}`} />
                            </div>
                            <input
                                ref={mobileRef}
                                type="tel"
                                inputMode="numeric"
                                maxLength={10}
                                value={mobile}
                                onChange={e => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                placeholder="10-digit number"
                                className={`flex-1 bg-transparent text-sm font-medium outline-none ${dark ? 'text-white placeholder-zinc-500' : 'text-gray-900 placeholder-gray-400'
                                    }`}
                            />
                            {mobile.length === 10 && (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                    <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        <button
                            onClick={handleSendOtp}
                            disabled={mobile.length !== 10 || sending}
                            className={primaryBtn(mobile.length !== 10 || sending)}
                        >
                            {sending
                                ? <><Loader2 className="w-4 h-4 animate-spin" />Sending code…</>
                                : <><span>Send OTP</span><ArrowRight className="w-4 h-4" /></>
                            }
                        </button>
                    </motion.div>
                )}

                {/* ════════════ STEP 2 — OTP ════════════ */}
                {step === 'otp' && (
                    <motion.div
                        key="otp"
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -16 }}
                        transition={{ duration: 0.15 }}
                        className="flex flex-col gap-4"
                    >
                        <div>
                            <p className={`text-base font-bold ${strong}`}>Enter verification code</p>
                            <p className={`text-xs mt-0.5 ${muted}`}>
                                Sent to <span className="font-semibold text-emerald-500">+91 {mobile}</span>
                            </p>
                        </div>

                        {/* OTP boxes */}
                        <div className="flex justify-center gap-2">
                            {otp.map((digit, i) => (
                                <input
                                    key={i}
                                    ref={el => (otpRefs.current[i] = el)}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={e => handleOtpChange(i, e.target.value)}
                                    onKeyDown={e => handleOtpKey(i, e)}
                                    onPaste={handleOtpPaste}
                                    className={`w-10 h-12 text-center text-xl font-medium border-b-2 bg-transparent outline-none ${dark
                                            ? 'text-white border-zinc-600 focus:border-emerald-500'
                                            : 'text-gray-900 border-gray-300 focus:border-emerald-500'
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={handleVerifyOtp}
                            disabled={otp.join('').length !== 4 || verifying}
                            className={primaryBtn(otp.join('').length !== 4 || verifying)}
                        >
                            {verifying
                                ? <><Loader2 className="w-4 h-4 animate-spin" />Verifying…</>
                                : <><span>Verify & Continue</span><ArrowRight className="w-4 h-4" /></>
                            }
                        </button>

                        <div className="flex items-center justify-between">
                            <button onClick={() => setStep('mobile')} className={ghostBtn} style={{ width: 'auto', paddingLeft: 12, paddingRight: 12 }}>
                                <ArrowLeft className="w-3.5 h-3.5" />
                                Change number
                            </button>
                            <button
                                onClick={handleResend}
                                disabled={cooldown > 0 || sending}
                                className={`text-xs font-semibold transition-colors disabled:opacity-40 ${dark ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'
                                    }`}
                            >
                                {sending ? 'Sending…' : cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend code'}
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* ════════════ STEP 3 — DETAILS (new users only) ════════════ */}
                {step === 'details' && (
                    <motion.div
                        key="details"
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -16 }}
                        transition={{ duration: 0.15 }}
                        className="flex flex-col gap-4"
                    >
                        <div>
                            <p className={`text-base font-bold ${strong}`}>Complete your profile</p>
                            <p className={`text-xs mt-0.5 ${muted}`}>We need a few more details to process your donation</p>
                        </div>

                        <div className="flex flex-col gap-3">
                            {/* Full name */}
                            <div className="relative">
                                <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${muted}`} />
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    autoFocus
                                    className={inputCls('pl-10')}
                                />
                            </div>
                            {/* Email */}
                            <div className="relative">
                                <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${muted}`} />
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className={inputCls('pl-10')}
                                />
                            </div>
                        </div>

                        <button
                            onClick={handleSaveProfile}
                            disabled={!name.trim() || !email.trim() || updating}
                            className={primaryBtn(!name.trim() || !email.trim() || updating)}
                        >
                            {updating
                                ? <><Loader2 className="w-4 h-4 animate-spin" />Saving…</>
                                : <><Check className="w-4 h-4" strokeWidth={3} /><span>Complete & Continue</span></>
                            }
                        </button>
                    </motion.div>
                )}

            </AnimatePresence>
        </div>
    );
}