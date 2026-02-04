"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import { Check, X } from "lucide-react"
import { useSendOtpMutation, useVerifyOtpMutation } from "@/utils/slices/authApiSlice"
import { useDispatch } from "react-redux"
import { setCredentials } from "@/utils/slices/authSlice"
import { useAppToast } from "@/app/AppToastContext"
import SignupModal from "../SignupModal"
import DesktopLoginModal from "./DesktopModal"
import MobileLoginModal from "./MobileModal"

function LoginModal({ isOpen, onClose, darkMode = false, onLoginSuccess }) {
    const dispatch = useDispatch()
    const [loginMethod, setLoginMethod] = useState("mobile") // "email" or "mobile"
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [step, setStep] = useState(1)
    const [otp, setOtp] = useState(['', '', '', ''])
    const { showToast } = useAppToast()
    const [showSuccess, setShowSuccess] = useState(false)
    const [showSignup, setShowSignup] = useState(false)
    const justOpenedRef = useRef(false)
    const [resendCooldown, setResendCooldown] = useState(0)

    const otpInputs = useRef([])
    const mobileInputRef = useRef(null)
    const emailInputRef = useRef(null)

    const [sendOtp, { isLoading: sendingOtp }] = useSendOtpMutation()
    const [verifyOtp, { isLoading: verifyingOtp }] = useVerifyOtpMutation()

    const handleLogin = async () => {
        try {
            if (loginMethod === "email") {
                if (!email || !email.includes("@")) {
                    showToast({
                        type: "error",
                        title: "Invalid Email",
                        message: "Please enter a valid email address",
                        duration: 2000,
                    })
                    return
                }

                await sendOtp({
                    email,
                    loginMethod: "email",
                    purpose: "login",
                    type: "login",
                }).unwrap()
            } else {
                if (mobile.length !== 10) return

                await sendOtp({
                    mobileNo: mobile,
                    loginMethod: "mobile",
                    purpose: "login",
                    type: "login"
                }).unwrap()
            }

            setStep(2)
            setResendCooldown(30)
            setTimeout(() => otpInputs.current[0]?.focus(), 300)
        } catch (error) {
            showToast({
                type: "error",
                title: "Login failed",
                message: error?.data?.message || error?.data?.data?.message || 'Please try again!',
                duration: 2000,
            })
            console.error(error)
        }
    }

    const handleOtpSubmit = async () => {
        const otpString = otp.join('')
        if (otpString.length !== 4) return

        try {
            const payload = loginMethod === "email"
                ? { email, otp: otpString }
                : { mobileNo: mobile, otp: otpString }

            const res = await verifyOtp(payload).unwrap()
            dispatch(setCredentials(res.user))

            showToast({
                type: "success",
                title: "Welcome Back!",
                message: `Salam ${res.user.fullName}!`,
                duration: 2000,
            })
            setShowSuccess(true)

            setTimeout(() => {
                onLoginSuccess?.(res.user)
                handleClose()
            }, 2000)
        } catch (err) {
            console.error("OTP verification failed:", err)
            showToast({
                type: "error",
                title: "Invalid OTP",
                message: 'Please try again!',
                duration: 2000,
            })
        }
    }

    const handleClose = () => {
        if (showSuccess) return

        setLoginMethod("mobile")
        setEmail("")
        setMobile("")
        setOtp(['', '', '', ''])
        setStep(1)
        setShowSuccess(false)
        setResendCooldown(0)
        window.lenis?.start()
        onClose()
    }

    const handleOtpChange = (index, value) => {
        if (!value) {
            const newOtp = [...otp];
            newOtp[index] = '';
            setOtp(newOtp);
            return;
        }

        const digit = value.replace(/\D/g, '').charAt(0);
        if (!digit) return;

        const newOtp = [...otp];
        newOtp[index] = digit;
        setOtp(newOtp);

        // Move to next input
        if (index < otpInputs.current.length - 1) {
            setTimeout(() => {
                otpInputs.current[index + 1]?.focus();
            }, 0);
        }
    };


    const handleOtpKeyDown = (index, e) => {
        if (e.key === 'Backspace') {
            if (otp[index]) {
                const newOtp = [...otp];
                newOtp[index] = '';
                setOtp(newOtp);
            } else if (index > 0) {
                otpInputs.current[index - 1]?.focus();
            }
        }

        if (e.key === 'ArrowLeft' && index > 0) {
            otpInputs.current[index - 1]?.focus();
        }

        if (e.key === 'ArrowRight' && index < otpInputs.current.length - 1) {
            otpInputs.current[index + 1]?.focus();
        }
    };


    const handleOtpPaste = (e) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4)
        const newOtp = pastedData.split('').concat(['', '', '', '']).slice(0, 4)
        setOtp(newOtp)

        const lastIndex = Math.min(pastedData.length, 3)
        otpInputs.current[lastIndex]?.focus()
    }

    const handleResendOtp = async () => {
        if (resendCooldown > 0 || sendingOtp) return

        try {
            if (loginMethod === "email") {
                await sendOtp({
                    email,
                    loginMethod: "email",
                    purpose: "login",
                    type: "login",
                }).unwrap()
            } else {
                await sendOtp({
                    mobileNo: mobile,
                    loginMethod: "mobile",
                    purpose: "login",
                    type: "login"
                }).unwrap()
            }

            showToast({
                type: "success",
                title: "OTP Resent Successfully!",
                message: '',
                duration: 2000,
            })
            setOtp(['', '', '', ''])
            setResendCooldown(30)
            otpInputs.current[0]?.focus()
        } catch (error) {
            console.error(error)
            showToast({
                type: "error",
                title: "Failed to Resend OTP",
                message: 'Please try again!',
                duration: 2000,
            })
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

    // Resend cooldown timer
    useEffect(() => {
        if (resendCooldown > 0) {
            const timer = setTimeout(() => {
                setResendCooldown(prev => prev - 1)
            }, 1000)
            return () => clearTimeout(timer)
        }
    }, [resendCooldown])

    // Scroll lock
    useEffect(() => {
        if (!isOpen) return

        window.lenis?.stop()

        const blockScroll = (e) => {
            e.stopPropagation()
            e.preventDefault()
            return false
        }

        document.addEventListener("wheel", blockScroll, { passive: false, capture: true })
        document.addEventListener("touchmove", blockScroll, { passive: false, capture: true })
        document.addEventListener("scroll", blockScroll, { passive: false, capture: true })

        const original = document.body.style.overflow
        document.body.style.overflow = "hidden"

        return () => {
            document.removeEventListener("wheel", blockScroll, true)
            document.removeEventListener("touchmove", blockScroll, true)
            document.removeEventListener("scroll", blockScroll, true)

            document.body.style.overflow = original
            window.lenis?.start()
        }
    }, [isOpen])

    // Track modal just opened
    useEffect(() => {
        if (isOpen) {
            justOpenedRef.current = true
            setTimeout(() => {
                justOpenedRef.current = false
            }, 200)
        }
    }, [isOpen])

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isOpen) return
            if (justOpenedRef.current) return

            if (e.key === 'Escape' && !showSuccess) {
                handleClose()
            } else if (e.key === 'Enter') {
                if (step === 1) {
                    if (loginMethod === "email" && email.includes("@")) {
                        handleLogin()
                    } else if (loginMethod === "mobile" && mobile.length === 10) {
                        handleLogin()
                    }
                } else if (step === 2 && otp.join('').length === 4) {
                    handleOtpSubmit()
                }
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, step, loginMethod, email, mobile, otp, showSuccess])

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

                        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 pointer-events-none overflow-y-auto">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className={`relative w-full max-w-4xl my-auto rounded-2xl sm:rounded-3xl border-2 shadow-2xl pointer-events-auto ${darkMode ? "bg-zinc-900 border-emerald-500/30" : "bg-white border-emerald-200"
                                    }`}
                            >
                                {/* Close button */}
                                <button
                                    onClick={handleClose}
                                    disabled={showSuccess}
                                    className={`absolute top-3 right-3 sm:top-4 sm:right-4 z-30 p-2 rounded-full transition-all ${darkMode
                                            ? "hover:bg-zinc-800 text-zinc-400 hover:text-white"
                                            : "hover:bg-gray-100 text-gray-400 hover:text-gray-900"
                                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                    <X className="w-5 h-5" strokeWidth={2} />
                                </button>

                                {/* Background decorations */}
                                <div className="absolute inset-0 overflow-hidden rounded-2xl sm:rounded-3xl pointer-events-none">
                                    <div
                                        className={`absolute inset-0 ${darkMode
                                                ? "bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)]"
                                                : "bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)]"
                                            }`}
                                        style={{ backgroundSize: '48px 48px' }}
                                    />
                                    <div className={`absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 rounded-full blur-[80px] sm:blur-[100px] ${darkMode ? "bg-emerald-950/30" : "bg-emerald-50"
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

                                {/* Main content */}
                                <div className="relative z-10">
                                    {/* Desktop Component */}
                                    <DesktopLoginModal
                                        darkMode={darkMode}
                                        loginMethod={loginMethod}
                                        setLoginMethod={setLoginMethod}
                                        step={step}
                                        email={email}
                                        setEmail={setEmail}
                                        mobile={mobile}
                                        setMobile={setMobile}
                                        otp={otp}
                                        handleOtpChange={handleOtpChange}
                                        handleOtpKeyDown={handleOtpKeyDown}
                                        handleOtpPaste={handleOtpPaste}
                                        otpInputs={otpInputs}
                                        mobileInputRef={mobileInputRef}
                                        emailInputRef={emailInputRef}
                                        handleLogin={handleLogin}
                                        handleOtpSubmit={handleOtpSubmit}
                                        setStep={setStep}
                                        setOtp={setOtp}
                                        setResendCooldown={setResendCooldown}
                                        sendingOtp={sendingOtp}
                                        verifyingOtp={verifyingOtp}
                                        resendCooldown={resendCooldown}
                                        handleResendOtp={handleResendOtp}
                                        handleSignupClick={handleSignupClick}
                                    />

                                    {/* Mobile Component */}
                                    <MobileLoginModal
                                        darkMode={darkMode}
                                        loginMethod={loginMethod}
                                        setLoginMethod={setLoginMethod}
                                        step={step}
                                        email={email}
                                        setEmail={setEmail}
                                        mobile={mobile}
                                        setMobile={setMobile}
                                        otp={otp}
                                        handleOtpChange={handleOtpChange}
                                        handleOtpKeyDown={handleOtpKeyDown}
                                        handleOtpPaste={handleOtpPaste}
                                        otpInputs={otpInputs}
                                        mobileInputRef={mobileInputRef}
                                        emailInputRef={emailInputRef}
                                        handleLogin={handleLogin}
                                        handleOtpSubmit={handleOtpSubmit}
                                        setStep={setStep}
                                        setOtp={setOtp}
                                        setResendCooldown={setResendCooldown}
                                        sendingOtp={sendingOtp}
                                        verifyingOtp={verifyingOtp}
                                        resendCooldown={resendCooldown}
                                        handleResendOtp={handleResendOtp}
                                        handleSignupClick={handleSignupClick}
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>

            {/* Signup Modal */}
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