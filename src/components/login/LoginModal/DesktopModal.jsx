"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ArrowLeft, Mail, Phone } from "lucide-react"

function DesktopLoginModal({
    darkMode,
    loginMethod,
    setLoginMethod,
    step,
    email,
    setEmail,
    mobile,
    setMobile,
    otp,
    handleOtpChange,
    handleOtpKeyDown,
    handleOtpPaste,
    otpInputs,
    mobileInputRef,
    emailInputRef,
    handleLogin,
    handleOtpSubmit,
    setStep,
    setOtp,
    setResendCooldown,
    sendingOtp,
    verifyingOtp,
    resendCooldown,
    handleResendOtp,
    handleSignupClick
}) {
    return (
        <div className="hidden md:grid md:grid-cols-2 gap-8 p-10 lg:p-12">
            {/* Left side - Branding */}
            <div className="flex flex-col justify-center space-y-6 lg:space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <h2 className={`text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight ${darkMode ? "text-white" : "text-gray-900"
                        }`}>
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
                    className={`p-6 rounded-2xl border ${darkMode ? "bg-emerald-500/10 border-emerald-500/20" : "bg-emerald-50 border-emerald-100"
                        }`}
                >
                    <p className={`text-sm leading-relaxed ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                        Empowering communities through transparent, secure, and accessible fundraising. Every contribution creates lasting impact.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-3"
                >
                    {["Secure payment gateway", "Real-time tracking", "Verified causes"].map((text, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${darkMode ? "bg-emerald-500/20" : "bg-emerald-100"
                                }`}>
                                <svg className="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className={`text-sm ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>{text}</span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Right side - Form */}
            <div className="flex flex-col justify-center min-h-[400px]">
                <AnimatePresence mode="wait">
                    {step === 1 ? (
                        <motion.div
                            key="login"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-6"
                        >
                            <div>
                                <h3 className={`text-2xl md:text-3xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"
                                    }`}>
                                    Log in to continue
                                </h3>
                                <p className={`text-base ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                                    {loginMethod === "email" ? "Enter your email" : "Enter your mobile number"}
                                </p>
                            </div>

                            {/* Login Method Toggle */}
                            <div className={`p-1.5 rounded-2xl relative ${darkMode ? "bg-zinc-800/50" : "bg-gray-100"
                                }`}>
                                <div className="grid grid-cols-2 relative">
                                    <motion.div
                                        layoutId="desktopActiveTab"
                                        className={`absolute inset-y-0 w-1/2 rounded-xl ${darkMode ? "bg-zinc-900 shadow-lg" : "bg-white shadow-md"
                                            }`}
                                        initial={false}
                                        animate={{ x: loginMethod === "email" ? "0%" : "100%" }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setLoginMethod("email")}
                                        className={`relative z-10 py-3 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2 ${loginMethod === "email"
                                                ? darkMode ? "text-emerald-400" : "text-emerald-600"
                                                : darkMode ? "text-zinc-500" : "text-gray-500"
                                            }`}
                                    >
                                        <Mail className="w-4 h-4" />
                                        Email
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setLoginMethod("mobile")}
                                        className={`relative z-10 py-3 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2 ${loginMethod === "mobile"
                                                ? darkMode ? "text-emerald-400" : "text-emerald-600"
                                                : darkMode ? "text-zinc-500" : "text-gray-500"
                                            }`}
                                    >
                                        <Phone className="w-4 h-4" />
                                        Mobile
                                    </button>
                                </div>
                            </div>

                            {/* Email Input */}
                            {loginMethod === "email" && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-3"
                                >
                                    <label className={`block text-sm font-medium ${darkMode ? "text-zinc-300" : "text-gray-700"
                                        }`}>
                                        Email Address
                                    </label>
                                    <div className="relative group">
                                        <div className={`absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl opacity-0 group-focus-within:opacity-20 blur transition-opacity duration-300`} />
                                        <input
                                            ref={emailInputRef}
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="you@example.com"
                                            className={`relative w-full px-5 py-4 rounded-2xl border-2 outline-none text-lg transition-all ${darkMode
                                                    ? "bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500"
                                                    : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-emerald-500 focus:shadow-lg"
                                                }`}
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {/* Mobile Input */}
                            {loginMethod === "mobile" && (
                                <motion.div
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-3"
                                >
                                    <label className={`block text-sm font-medium ${darkMode ? "text-zinc-300" : "text-gray-700"
                                        }`}>
                                        Mobile Number
                                    </label>
                                    <div className="relative group">
                                        <div className={`absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl opacity-0 group-focus-within:opacity-20 blur transition-opacity duration-300`} />
                                        <div className={`relative flex items-center gap-3 px-4 py-4 rounded-2xl border-2 transition-all ${darkMode
                                                ? "bg-zinc-800 border-zinc-700 focus-within:border-emerald-500"
                                                : "bg-white border-gray-200 focus-within:border-emerald-500"
                                            }`}>
                                            <div className="flex items-center gap-2 flex-shrink-0">
                                                <svg className="w-6 h-4" viewBox="0 0 30 20">
                                                    <rect width="30" height="6.67" fill="#FF9933" />
                                                    <rect y="6.67" width="30" height="6.67" fill="#FFFFFF" />
                                                    <rect y="13.33" width="30" height="6.67" fill="#138808" />
                                                    <circle cx="15" cy="10" r="2.5" fill="#000080" />
                                                </svg>
                                                <span className={`text-base font-semibold ${darkMode ? "text-zinc-300" : "text-gray-700"
                                                    }`}>+91</span>
                                                <div className={`w-px h-5 ${darkMode ? "bg-zinc-700" : "bg-gray-300"}`} />
                                            </div>
                                            <input
                                                ref={mobileInputRef}
                                                type="tel"
                                                value={mobile}
                                                onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                                                placeholder="10-digit number"
                                                className={`flex-1 text-lg font-medium outline-none bg-transparent ${darkMode ? "text-white placeholder-zinc-600" : "text-gray-900 placeholder-gray-400"
                                                    }`}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            <button
                                type="button"
                                onClick={handleLogin}
                                disabled={
                                    (loginMethod === "email" ? !email.includes("@") : mobile.length !== 10) || sendingOtp
                                }
                                className="w-full group relative overflow-hidden py-4 px-6 rounded-2xl font-semibold text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 transition-transform group-hover:scale-105 group-disabled:scale-100" />
                                <div className="relative flex items-center justify-center gap-2 text-white">
                                    {sendingOtp ? (
                                        <>
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                            />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Continue
                                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                        </>
                                    )}
                                </div>
                            </button>

                            <p className={`text-center text-sm ${darkMode ? "text-zinc-500" : "text-gray-500"}`}>
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
                    ) : (
                        <motion.div
                            key="otp"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-6"
                        >
                            <div>
                                <h3 className={`text-2xl md:text-3xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"
                                    }`}>
                                    Verify your identity
                                </h3>
                                <p className={`text-base ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                                    Code sent to{" "}
                                    <span className="font-semibold text-emerald-600">
                                        {loginMethod === "email" ? email : `+91 ${mobile}`}
                                    </span>
                                </p>
                            </div>

                            <div className="space-y-3">
                                <label className={`block text-sm font-medium ${darkMode ? "text-zinc-300" : "text-gray-700"
                                    }`}>
                                    4-Digit Code
                                </label>
                                <div className="grid grid-cols-4 gap-3">
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            ref={(el) => (otpInputs.current[index] = el)}
                                            type="text"
                                            inputMode="numeric"
                                            maxLength="1"
                                            value={digit}
                                            onChange={(e) => {
                                                const digit = e.target.value.replace(/\D/g, "").slice(0, 1);

                                                const newOtp = [...otp];
                                                newOtp[index] = digit;
                                                setOtp(newOtp);

                                                if (digit && index < 3) {
                                                    e.target.nextElementSibling?.focus();
                                                }
                                            }}

                                            onKeyDown={(e) => {
                                                if (e.key === "Backspace" && !otp[index] && index > 0) {
                                                    e.target.previousElementSibling?.focus();
                                                }
                                            }}

                                            onPaste={handleOtpPaste}
                                            className={`w-full aspect-square text-center text-2xl font-bold rounded-2xl border-2 outline-none transition-all ${darkMode
                                                    ? "bg-zinc-800 border-zinc-700 text-white focus:border-emerald-500"
                                                    : "bg-white border-gray-200 text-gray-900 focus:border-emerald-500 focus:shadow-lg"
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
                                    className="w-full group relative overflow-hidden py-4 px-6 rounded-2xl font-semibold text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 transition-transform group-hover:scale-105 group-disabled:scale-100" />
                                    <div className="relative flex items-center justify-center gap-2 text-white">
                                        {verifyingOtp ? (
                                            <>
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                                />
                                                Verifying...
                                            </>
                                        ) : (
                                            <>
                                                Verify & Log In
                                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                            </>
                                        )}
                                    </div>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setStep(1);
                                        setOtp(['', '', '', '']);
                                        setResendCooldown(0);
                                    }}
                                    className={`py-3 px-6 rounded-2xl font-medium text-sm transition-all flex items-center justify-center gap-2 ${darkMode ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                        }`}
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Change {loginMethod === "email" ? "Email" : "Number"}
                                </button>
                            </div>

                            <p className={`text-center text-sm ${darkMode ? "text-zinc-500" : "text-gray-500"}`}>
                                Didn't receive?{" "}
                                <button
                                    type="button"
                                    onClick={handleResendOtp}
                                    disabled={sendingOtp || resendCooldown > 0}
                                    className="font-semibold text-emerald-600 hover:text-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend code"}
                                </button>
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default DesktopLoginModal