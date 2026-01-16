// ============================================================================
// LoginModal.jsx - Fixed responsive version
// ============================================================================
"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import { ArrowRight, ArrowLeft, Check } from "lucide-react"
import { useSendOtpMutation, useVerifyOtpMutation } from "@/utils/slices/authApiSlice"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { setCredentials } from "@/utils/slices/authSlice"
import { useAppToast } from "@/app/AppToastContext"
import SignupModal from "./SignupModal"

function LoginModal({ isOpen, onClose, darkMode = false, onLoginSuccess }) {
    const dispatch = useDispatch()
    const [mobile, setMobile] = useState('')
    const [step, setStep] = useState(1)
    const [otp, setOtp] = useState(['', '', '', ''])
    const { showToast } = useAppToast()
    const [showSuccess, setShowSuccess] = useState(false)
    const [showSignup, setShowSignup] = useState(false)
    const justOpenedRef = useRef(false)

    const otpInputs = useRef([])
    const mobileInputRef = useRef(null)

    const [sendOtp, { isLoading: sendingOtp }] = useSendOtpMutation()
    const [verifyOtp, { isLoading: verifyingOtp }] = useVerifyOtpMutation()

    const handleLogin = async () => {
        if (mobile.length !== 10) return

        try {
            const res = await sendOtp({ mobileNo: mobile, type: "login" }).unwrap()
            if (res.otp) {
                toast.info(`Your OTP is ${res.otp}`)
            }
            setStep(2)
            setTimeout(() => otpInputs.current[0]?.focus(), 300)
        } catch (error) {
            showToast({
                type: "error",
                title: "Login failed",
                message: error?.data?.message || error?.data?.data?.message || 'Please try again!',
                duration: 2000,
            });
            console.error(error)
        }
    }

    const handleOtpSubmit = async () => {
        const otpString = otp.join('')
        if (otpString.length !== 4) return

        try {
            const res = await verifyOtp({ mobileNo: mobile, otp: otpString }).unwrap()
            dispatch(setCredentials(res.user))

            showToast({
                type: "success",
                title: "Welcome Back!",
                message: `Salam ${res.user.fullName} ! from TPF`,
                duration: 2000,
            });
            setShowSuccess(true)

            setTimeout(() => {
                onLoginSuccess?.(res.user)
                handleClose()
            }, 2000)
        } catch (err) {
            console.error("OTP verification failed:", err)
            showToast({
                type: "error",
                title: "Invalid Otp",
                message: 'Please try again!',
                duration: 2000,
            });
        }
    }

    const handleClose = () => {
        if (showSuccess) return

        setMobile("")
        setOtp(['', '', '', ''])
        setStep(1)
        setShowSuccess(false)
        window.lenis?.start();   // safety
        onClose()
    }

    const handleOtpChange = (index, value) => {
        const digit = value.slice(-1).replace(/\D/g, '')
        const newOtp = [...otp]
        newOtp[index] = digit
        setOtp(newOtp)

        if (digit && index < 3) {
            otpInputs.current[index + 1]?.focus()
        }
    }

    const handleOtpKeyDown = (index, e) => {
        if (e.key === 'Backspace') {
            if (!otp[index] && index > 0) {
                otpInputs.current[index - 1]?.focus()
            } else {
                const newOtp = [...otp]
                newOtp[index] = ''
                setOtp(newOtp)
            }
        } else if (e.key === 'ArrowLeft' && index > 0) {
            otpInputs.current[index - 1]?.focus()
        } else if (e.key === 'ArrowRight' && index < 3) {
            otpInputs.current[index + 1]?.focus()
        }
    }

    const handleOtpPaste = (e) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4)
        const newOtp = pastedData.split('').concat(['', '', '', '']).slice(0, 4)
        setOtp(newOtp)

        const lastIndex = Math.min(pastedData.length, 3)
        otpInputs.current[lastIndex]?.focus()
    }

    const handleResendOtp = async () => {
        try {
            const res = await sendOtp({ mobileNo: mobile, type: "login" }).unwrap()
            if (res.otp) {
                toast.info(`Your OTP is ${res.otp}`)
            }
            showToast({
                type: "success",
                title: "Otp Resent Successfully!",
                message: '',
                duration: 2000,
            });
            setOtp(['', '', '', ''])
            otpInputs.current[0]?.focus()
        } catch (error) {
            console.error(error)
            showToast({
                type: "error",
                title: "Failed to Resent Otp",
                message: 'Please try again!',
                duration: 2000,
            });
        }
    }

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget && !showSuccess) {
            handleClose()
        }
    }

    const handleSignupClick = () => {
        handleClose()
        setTimeout(() => {
            setShowSignup(true)
        }, 300)
    }

    const handleSignupSuccess = (user) => {
        setShowSignup(false)
        onLoginSuccess?.(user)
    }

    useEffect(() => {
        if (!isOpen) return;

        // 1) Stop Lenis completely
        window.lenis?.stop();

        // 2) Hard block wheel + touch
        const blockScroll = (e) => {
            e.stopPropagation();
            e.preventDefault();
            return false;
        };

        // 3) Apply listeners at capture phase
        document.addEventListener("wheel", blockScroll, { passive: false, capture: true });
        document.addEventListener("touchmove", blockScroll, { passive: false, capture: true });
        document.addEventListener("scroll", blockScroll, { passive: false, capture: true });

        // 4) Also lock body as fallback
        const original = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("wheel", blockScroll, true);
            document.removeEventListener("touchmove", blockScroll, true);
            document.removeEventListener("scroll", blockScroll, true);

            document.body.style.overflow = original;

            // Restart Lenis
            window.lenis?.start();
        };
    }, [isOpen]);





    useEffect(() => {
        if (isOpen) {
            justOpenedRef.current = true
            setTimeout(() => {
                justOpenedRef.current = false
            }, 200)
        }
    }, [isOpen])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isOpen) return
            if (justOpenedRef.current) return
            if (e.key === 'Enter') {
                if (step === 1 && mobile.length === 10) {
                    handleLogin()
                } else if (step === 2 && otp.join('').length === 4) {
                    handleOtpSubmit()
                }
            } else if (e.key === 'Escape' && !showSuccess) {
                handleClose()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, step, mobile, otp, showSuccess])

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleBackdropClick}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        />

                        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 pointer-events-none">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className={`relative w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden rounded-2xl sm:rounded-3xl border-2 shadow-2xl pointer-events-auto ${darkMode ? "bg-zinc-900 border-emerald-500/30" : "bg-white border-emerald-200"
                                    }`}
                            >
                                {/* Background decorations */}
                                <div className="absolute inset-0 overflow-hidden rounded-2xl sm:rounded-3xl pointer-events-none">
                                    <div
                                        className={`absolute inset-0 ${darkMode
                                            ? "bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)]"
                                            : "bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)]"
                                            }`}
                                        style={{ backgroundSize: '48px 48px' }}
                                    />
                                    <div className={`absolute top-0 right-0 w-64 h-64 sm:w-[400px] sm:h-[400px] rounded-full blur-[100px] ${darkMode ? "bg-emerald-950/30" : "bg-emerald-50"
                                        }`} />
                                </div>

                                {/* Success overlay */}
                                <AnimatePresence>
                                    {showSuccess && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl"
                                        >
                                            <motion.div
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ delay: 0.1 }}
                                                className={`p-6 sm:p-8 rounded-2xl mx-4 ${darkMode ? "bg-zinc-800" : "bg-white"}`}
                                            >
                                                <div className="flex flex-col items-center gap-4">
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500 flex items-center justify-center"
                                                    >
                                                        <Check className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={3} />
                                                    </motion.div>
                                                    <div className="text-center">
                                                        <h3 className={`text-xl sm:text-2xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                                                            Welcome back!
                                                        </h3>
                                                        <p className={`text-sm ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                                                            Logging you in...
                                                        </p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Main content - Hide scrollbar */}
                                <div className="relative z-10 grid md:grid-cols-2 gap-6 sm:gap-8 p-6 sm:p-8 md:p-12 overflow-y-auto max-h-[95vh] sm:max-h-[90vh] scrollbar-hide">
                                    <style jsx>{`
                                        .scrollbar-hide::-webkit-scrollbar {
                                            display: none;
                                        }
                                        .scrollbar-hide {
                                            -ms-overflow-style: none;
                                            scrollbar-width: none;
                                        }
                                    `}</style>

                                    {/* Left side - Hidden on mobile */}
                                    <div className="hidden md:flex flex-col justify-center space-y-6 lg:space-y-8">
                                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                                            <h2 className={`text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight ${darkMode ? "text-white" : "text-gray-900"}`}>
                                                Welcome to<br />
                                                <span className="relative inline-block mt-2">
                                                    <span className="relative z-10 bg-gradient-to-r from-emerald-600 to-teal-600 text-transparent bg-clip-text">
                                                        The People's Fund
                                                    </span>
                                                </span>
                                            </h2>
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className={`p-4 lg:p-6 rounded-2xl border ${darkMode ? "bg-emerald-500/10 border-emerald-500/20" : "bg-emerald-50 border-emerald-100"}`}
                                        >
                                            <p className={`text-xs lg:text-sm leading-relaxed ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                                                Empowering communities through transparent, secure, and accessible fundraising. Every contribution creates lasting impact.
                                            </p>
                                        </motion.div>

                                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-2 lg:space-y-3">
                                            {["Secure payment gateway", "Real-time tracking", "Verified causes"].map((text, i) => (
                                                <div key={i} className="flex items-center gap-3">
                                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${darkMode ? "bg-emerald-500/20" : "bg-emerald-100"}`}>
                                                        <svg className="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                    <span className={`text-xs lg:text-sm ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>{text}</span>
                                                </div>
                                            ))}
                                        </motion.div>
                                    </div>

                                    {/* Right side - Form */}
                                    <div className="flex flex-col justify-center min-h-[350px] sm:min-h-[400px]">
                                        <AnimatePresence mode="wait">
                                            {step === 1 && (
                                                <motion.div key="mobile" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} className="space-y-5 sm:space-y-6">
                                                    <div>
                                                        <h3 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                                                            Log in to continue
                                                        </h3>
                                                        <p className={`text-sm md:text-base ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                                                            Enter your mobile number
                                                        </p>
                                                    </div>

                                                    <div className="space-y-3">
                                                        <label className={`block text-sm font-medium ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                                                            Mobile Number
                                                        </label>
                                                        <div className="relative group">
                                                            <div className={`absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl opacity-0 group-focus-within:opacity-20 blur transition-opacity duration-300`} />
                                                            <div className={`relative flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 sm:py-3.5 rounded-xl border-2 transition-all ${darkMode ? "bg-zinc-800 border-zinc-700 group-focus-within:border-emerald-500" : "bg-white border-gray-200 group-focus-within:border-emerald-500"
                                                                }`}>
                                                                <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                                                                    <svg className="w-5 h-3 sm:w-6 sm:h-4" viewBox="0 0 30 20">
                                                                        <rect width="30" height="6.67" fill="#FF9933" />
                                                                        <rect y="6.67" width="30" height="6.67" fill="#FFFFFF" />
                                                                        <rect y="13.33" width="30" height="6.67" fill="#138808" />
                                                                        <circle cx="15" cy="10" r="2.5" fill="#000080" />
                                                                    </svg>
                                                                    <span className={`text-sm sm:text-base font-semibold ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>+91</span>
                                                                    <div className={`w-px h-4 sm:h-5 ${darkMode ? "bg-zinc-700" : "bg-gray-300"}`} />
                                                                </div>
                                                                <input
                                                                    ref={mobileInputRef}
                                                                    type="tel"
                                                                    value={mobile}
                                                                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                                                                    placeholder="10-digit number"
                                                                    className={`flex-1 text-base md:text-lg font-medium outline-none bg-transparent ${darkMode ? "text-white placeholder-zinc-600" : "text-gray-900 placeholder-gray-400"
                                                                        }`}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={handleLogin}
                                                        disabled={mobile.length !== 10 || sendingOtp}
                                                        className="w-full group relative overflow-hidden py-3 sm:py-3.5 px-6 rounded-xl font-semibold text-sm sm:text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 transition-transform group-hover:scale-105 group-disabled:scale-100" />
                                                        <div className="relative flex items-center justify-center gap-2 text-white">
                                                            {sendingOtp ? "Sending..." : "Continue"}
                                                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                                                        </div>
                                                    </button>

                                                    <p className={`text-center text-xs sm:text-sm ${darkMode ? "text-zinc-500" : "text-gray-500"}`}>
                                                        Don't have an account?{" "}
                                                        <button
                                                            type="button"
                                                            onClick={handleSignupClick}
                                                            className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                                                        >
                                                            Sign up
                                                        </button>
                                                    </p>
                                                </motion.div>
                                            )}

                                            {step === 2 && (
                                                <motion.div key="otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} className="space-y-5 sm:space-y-6">
                                                    <div>
                                                        <h3 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                                                            Enter verification code
                                                        </h3>
                                                        <p className={`text-sm md:text-base ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                                                            Sent to <span className="font-semibold text-emerald-600">+91 {mobile}</span>
                                                        </p>
                                                    </div>

                                                    <div className="space-y-3">
                                                        <label className={`block text-sm font-medium ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                                                            4-Digit Code
                                                        </label>
                                                        <div className="flex gap-2 sm:gap-3 justify-center">
                                                            {otp.map((digit, index) => (
                                                                <input
                                                                    key={index}
                                                                    ref={(el) => (otpInputs.current[index] = el)}
                                                                    type="text"
                                                                    inputMode="numeric"
                                                                    maxLength="1"
                                                                    value={digit}
                                                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                                                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                                                    onPaste={handleOtpPaste}
                                                                    className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-center text-xl sm:text-2xl font-bold rounded-xl border-2 outline-none transition-all ${darkMode ? "bg-zinc-800 border-zinc-700 text-white focus:border-emerald-500" : "bg-white border-gray-200 text-gray-900 focus:border-emerald-500 focus:shadow-lg"
                                                                        } ${digit ? 'border-emerald-500' : ''}`}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col gap-3">
                                                        <button
                                                            type="button"
                                                            onClick={handleOtpSubmit}
                                                            disabled={otp.join('').length !== 4 || verifyingOtp}
                                                            className="w-full group relative overflow-hidden py-3 sm:py-3.5 px-6 rounded-xl font-semibold text-sm sm:text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                                        >
                                                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 transition-transform group-hover:scale-105 group-disabled:scale-100" />
                                                            <div className="relative flex items-center justify-center gap-2 text-white">
                                                                {verifyingOtp ? "Verifying..." : "Verify & Log In"}
                                                                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                                                            </div>
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() => { setStep(1); setOtp(['', '', '', '']) }}
                                                            className={`py-2.5 sm:py-3 px-6 rounded-xl font-medium text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${darkMode ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                                                }`}
                                                        >
                                                            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                                                            Change Number
                                                        </button>
                                                    </div>

                                                    <p className={`text-center text-xs sm:text-sm ${darkMode ? "text-zinc-500" : "text-gray-500"}`}>
                                                        Didn't receive?{" "}
                                                        <button
                                                            type="button"
                                                            onClick={handleResendOtp}
                                                            disabled={sendingOtp}
                                                            className="font-semibold text-emerald-600 hover:text-emerald-700 disabled:opacity-50 transition-colors"
                                                        >
                                                            Resend code
                                                        </button>
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>

            {/* Signup Modal with smooth transition */}
            <SignupModal
                isOpen={showSignup}
                onClose={() => setShowSignup(false)}
                darkMode={darkMode}
                onSignupSuccess={handleSignupSuccess}
            />
        </>
    )
}

export default LoginModal