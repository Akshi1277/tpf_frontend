// ============================================================================
// SignupModal.jsx - Save this as a separate file
// ============================================================================
"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import { X, ArrowRight, ArrowLeft, Check } from "lucide-react"
import { useSendOtpMutation, useVerifyOtpMutation, useUpdateProfileMutation } from "@/utils/slices/authApiSlice"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { setCredentials } from "@/utils/slices/authSlice"
import { useAppToast } from "@/app/AppToastContext"

function SignupModal({ isOpen, onClose, darkMode = false, onSignupSuccess }) {
    const dispatch = useDispatch()
    const [mobile, setMobile] = useState('')
    const [step, setStep] = useState(1)
    const [otp, setOtp] = useState(['', '', '', ''])
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [showSuccess, setShowSuccess] = useState(false)
    const { showToast } = useAppToast()

    const otpInputs = useRef([])
    const mobileInputRef = useRef(null)
    const nameInputRef = useRef(null)

    const [sendOtp, { isLoading: sendingOtp }] = useSendOtpMutation()
    const [verifyOtp, { isLoading: verifyingOtp }] = useVerifyOtpMutation()
    const [updateProfile, { isLoading: updatingProfile }] = useUpdateProfileMutation()

    const handleMobileSubmit = async () => {
        if (mobile.length !== 10) return

        try {
            const res = await sendOtp({ mobileNo: mobile, type: "signup" }).unwrap()
            if (res.otp) {
                toast.info(`Your OTP is ${res.otp}`)
            }
            setStep(2)
            setTimeout(() => otpInputs.current[0]?.focus(), 300)
        } catch (error) {
            showToast({
                type: "error",
                title: "Failed to send otp",
                message: error?.data?.message || error?.data?.data?.message || "Failed to send OTP",
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

            if (!res.user.fullName || !res.user.email) {
                setStep(3)
                setTimeout(() => nameInputRef.current?.focus(), 300)
            } else {
                toast.success("Account verified successfully!")
                setShowSuccess(true)
                setTimeout(() => {
                    onSignupSuccess?.(res.user)
                    handleClose()
                }, 2000)
            }
        } catch (err) {
            console.error("OTP verification failed:", err)
            showToast({
                type: "error",
                title: "OTP verification failed",
                message: err?.data?.message || "Invalid OTP",
                duration: 2000,
            });
        }
    }


    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };



    const handleFinalSubmit = async () => {
        if (!fullName || !email) return

        if (!isValidEmail(email)) {
            showToast({
                type: "error",
                title: "Invalid Email",
                message: "Please enter a valid email address.",
                duration: 2000,
            });
            return;
        }

        try {
            const profileData = { fullName, email }
            const res = await updateProfile(profileData).unwrap()
            dispatch(setCredentials(res.user))



            setShowSuccess(true)

            setTimeout(() => {
                onSignupSuccess?.(res.user)
                handleClose()
            }, 2000)
        } catch (err) {
            console.error("Profile update failed:", err)
            showToast({
                type: "error",
                title: "Failed to save Details",
                message: err?.data?.message || 'Please try again!',
                duration: 2000,
            });
        }
    }

    const handleClose = () => {
        if (showSuccess) return

        setMobile("")
        setOtp(['', '', '', ''])
        setFullName("")
        setEmail("")
        setStep(1)
        setShowSuccess(false)
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
            const res = await sendOtp({ mobileNo: mobile, type: "signup" }).unwrap()
            if (res.otp) {
                toast.info(`Your OTP is ${res.otp}`)
            }
            toast.success("OTP resent successfully")
            setOtp(['', '', '', ''])
            otpInputs.current[0]?.focus()
        } catch (error) {
            showToast({
                type: "error",
                title: "Failed to resend OTP",
                message: error?.data?.message || 'Please try again!',
                duration: 2000,
            });
        }
    }

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget && !showSuccess) {
            handleClose()
        }
    }

    useEffect(() => {
        if (isOpen && step === 1) {
            setTimeout(() => mobileInputRef.current?.focus(), 300)
        }
    }, [isOpen, step])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isOpen) return

            if (e.key === 'Enter') {
                if (step === 1 && mobile.length === 10) {
                    handleMobileSubmit()
                } else if (step === 2 && otp.join('').length === 4) {
                    handleOtpSubmit()
                } else if (step === 3 && fullName && email) {
                    handleFinalSubmit()
                }
            } else if (e.key === 'Escape' && !showSuccess) {
                handleClose()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, step, mobile, otp, fullName, email, showSuccess])

    return (
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

                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className={`relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl border-2 shadow-2xl pointer-events-auto ${darkMode ? "bg-zinc-900 border-emerald-500/30" : "bg-white border-emerald-200"
                                }`}
                        >
                            <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                                <div
                                    className={`absolute inset-0 ${darkMode
                                        ? "bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)]"
                                        : "bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)]"
                                        }`}
                                    style={{ backgroundSize: '48px 48px' }}
                                />
                                <div className={`absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[100px] ${darkMode ? "bg-emerald-950/30" : "bg-emerald-50"
                                    }`} />
                            </div>



                            <AnimatePresence>
                                {showSuccess && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-3xl"
                                    >
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: 0.1 }}
                                            className={`p-8 rounded-2xl ${darkMode ? "bg-zinc-800" : "bg-white"}`}
                                        >
                                            <div className="flex flex-col items-center gap-4">
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                                    className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center"
                                                >
                                                    <Check className="w-8 h-8 text-white" strokeWidth={3} />
                                                </motion.div>
                                                <div className="text-center">
                                                    <h3 className={`text-2xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                                                        Welcome aboard!
                                                    </h3>
                                                    <p className={`text-sm ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                                                        Creating your account...
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="relative z-10 grid md:grid-cols-2 gap-8 p-8 md:p-12 overflow-y-auto max-h-[90vh]">
                                <div className="hidden md:flex flex-col justify-center space-y-8">
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                                        <h2 className={`text-4xl lg:text-5xl font-bold leading-tight ${darkMode ? "text-white" : "text-gray-900"}`}>
                                            Create lasting<br />
                                            <span className="relative inline-block mt-2">
                                                <span className="relative z-10 bg-gradient-to-r from-emerald-600 to-teal-600 text-transparent bg-clip-text">
                                                    impact
                                                </span>
                                            </span>
                                        </h2>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className={`p-6 rounded-2xl border ${darkMode ? "bg-emerald-500/10 border-emerald-500/20" : "bg-emerald-50 border-emerald-100"}`}
                                    >
                                        <p className={`text-sm leading-relaxed ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                                            Join our community and start making a difference today. Every action counts.
                                        </p>
                                    </motion.div>

                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-3">
                                        {["Quick & secure registration", "Direct access to campaigns", "Track your contributions"].map((text, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${darkMode ? "bg-emerald-500/20" : "bg-emerald-100"}`}>
                                                    <svg className="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                                <span className={`text-sm ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>{text}</span>
                                            </div>
                                        ))}
                                    </motion.div>
                                </div>

                                <div className="flex flex-col justify-center min-h-[400px]">
                                    <AnimatePresence mode="wait">
                                        {/* STEP 1 - MOBILE */}
                                        {step === 1 && (
                                            <motion.div key="mobile" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} className="space-y-6">
                                                <div>
                                                    <h3 className={`text-2xl md:text-3xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                                                        Create an account
                                                    </h3>
                                                    <p className={`text-sm md:text-base ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                                                        Enter your mobile number to get started
                                                    </p>
                                                </div>

                                                <div className="space-y-3">
                                                    <label className={`block text-sm font-medium ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                                                        Mobile Number
                                                    </label>
                                                    <div className="relative group">
                                                        <div className={`absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl opacity-0 group-focus-within:opacity-20 blur transition-opacity duration-300`} />
                                                        <div className={`relative flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 transition-all ${darkMode ? "bg-zinc-800 border-zinc-700 group-focus-within:border-emerald-500" : "bg-white border-gray-200 group-focus-within:border-emerald-500"
                                                            }`}>
                                                            <div className="flex items-center gap-2">
                                                                <svg className="w-6 h-4" viewBox="0 0 30 20">
                                                                    <rect width="30" height="6.67" fill="#FF9933" />
                                                                    <rect y="6.67" width="30" height="6.67" fill="#FFFFFF" />
                                                                    <rect y="13.33" width="30" height="6.67" fill="#138808" />
                                                                    <circle cx="15" cy="10" r="2.5" fill="#000080" />
                                                                </svg>
                                                                <span className={`text-base font-semibold ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>+91</span>
                                                                <div className={`w-px h-5 ${darkMode ? "bg-zinc-700" : "bg-gray-300"}`} />
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
                                                    onClick={handleMobileSubmit}
                                                    disabled={mobile.length !== 10 || sendingOtp}
                                                    className="w-full group relative overflow-hidden py-3.5 px-6 rounded-xl font-semibold text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 transition-transform group-hover:scale-105 group-disabled:scale-100" />
                                                    <div className="relative flex items-center justify-center gap-2 text-white">
                                                        {sendingOtp ? "Sending..." : "Continue"}
                                                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                                    </div>
                                                </button>

                                                <p className={`text-center text-sm ${darkMode ? "text-zinc-500" : "text-gray-500"}`}>
                                                    Already have an account?{" "}
                                                    <button type="button" className="font-semibold text-emerald-600 hover:text-emerald-700">
                                                        Log in
                                                    </button>
                                                </p>
                                            </motion.div>
                                        )}

                                        {/* STEP 2 - OTP */}
                                        {step === 2 && (
                                            <motion.div key="otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} className="space-y-6">
                                                <div>
                                                    <h3 className={`text-2xl md:text-3xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
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
                                                                className={`w-14 h-14 sm:w-16 sm:h-16 text-center text-2xl font-bold rounded-xl border-2 outline-none transition-all ${darkMode ? "bg-zinc-800 border-zinc-700 text-white focus:border-emerald-500" : "bg-white border-gray-200 text-gray-900 focus:border-emerald-500 focus:shadow-lg"
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
                                                        className="w-full group relative overflow-hidden py-3.5 px-6 rounded-xl font-semibold text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 transition-transform group-hover:scale-105 group-disabled:scale-100" />
                                                        <div className="relative flex items-center justify-center gap-2 text-white">
                                                            {verifyingOtp ? "Verifying..." : "Verify & Continue"}
                                                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                                        </div>
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => { setStep(1); setOtp(['', '', '', '']) }}
                                                        className={`py-3 px-6 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 ${darkMode ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                                            }`}
                                                    >
                                                        <ArrowLeft className="w-4 h-4" />
                                                        Change Number
                                                    </button>
                                                </div>

                                                <p className={`text-center text-sm ${darkMode ? "text-zinc-500" : "text-gray-500"}`}>
                                                    Didn't receive?{" "}
                                                    <button
                                                        type="button"
                                                        onClick={handleResendOtp}
                                                        disabled={sendingOtp}
                                                        className="font-semibold text-emerald-600 hover:text-emerald-700 disabled:opacity-50"
                                                    >
                                                        Resend code
                                                    </button>
                                                </p>
                                            </motion.div>
                                        )}

                                        {/* STEP 3 - DETAILS */}
                                        {step === 3 && (
                                            <motion.div key="details" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} className="space-y-6">
                                                <div>
                                                    <h3 className={`text-2xl md:text-3xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                                                        Complete your profile
                                                    </h3>
                                                    <p className={`text-sm md:text-base ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                                                        Tell us a bit about yourself
                                                    </p>
                                                </div>

                                                <div className="space-y-4">
                                                    <div className="space-y-3">
                                                        <label className={`block text-sm font-medium ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                                                            Full Name
                                                        </label>
                                                        <input
                                                            ref={nameInputRef}
                                                            type="text"
                                                            value={fullName}
                                                            onChange={(e) => setFullName(e.target.value)}
                                                            placeholder="John Doe"
                                                            className={`w-full px-4 py-3.5 text-base md:text-lg rounded-xl border-2 outline-none transition-all ${darkMode ? "bg-zinc-800 border-zinc-700 text-white placeholder-zinc-600 focus:border-emerald-500" : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500"
                                                                }`}
                                                        />
                                                    </div>

                                                    <div className="space-y-3">
                                                        <label className={`block text-sm font-medium ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                                                            Email Address
                                                        </label>
                                                        <input
                                                            type="email"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            placeholder="john@example.com"
                                                            className={`w-full px-4 py-3.5 text-base md:text-lg rounded-xl border-2 outline-none transition-all ${darkMode ? "bg-zinc-800 border-zinc-700 text-white placeholder-zinc-600 focus:border-emerald-500" : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500"
                                                                }`}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex flex-col gap-3">
                                                    <button
                                                        type="button"
                                                        onClick={handleFinalSubmit}
                                                        disabled={!fullName || !email || updatingProfile}
                                                        className="w-full group relative overflow-hidden py-3.5 px-6 rounded-xl font-semibold text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 transition-transform group-hover:scale-105 group-disabled:scale-100" />
                                                        <div className="relative flex items-center justify-center gap-2 text-white">
                                                            {updatingProfile ? "Creating Account..." : "Complete Registration"}
                                                            <Check className="w-5 h-5" strokeWidth={3} />
                                                        </div>
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => setStep(2)}
                                                        className={`py-3 px-6 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 ${darkMode ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                                            }`}
                                                    >
                                                        <ArrowLeft className="w-4 h-4" />
                                                        Back
                                                    </button>
                                                </div>
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
    )
}

export default SignupModal

// ============================================================================
// Demo to show it works - Remove this in production
// ============================================================================
/*
import SignupModal from './SignupModal'

function YourComponent() {
    const [showSignup, setShowSignup] = useState(false)
    
    return (
        <>
            <button onClick={() => setShowSignup(true)}>Sign Up</button>
            <SignupModal 
                isOpen={showSignup}
                onClose={() => setShowSignup(false)}
                darkMode={
*/