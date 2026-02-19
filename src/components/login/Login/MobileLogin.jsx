"use client"

import { motion } from "framer-motion"
import { ArrowRight, ArrowLeft, Mail, Phone, Shield, Zap, Heart } from "lucide-react"

export default function MobileLogin({
  darkMode,
  loginMethod,
  setLoginMethod,
  step,
  email,
  setEmail,
  mobile,
  setMobile,
  otp,
  setOtp,
  handleLogin,
  handleOtpSubmit,
  setStep,
  sendingOtp,
  verifyingOtp
}) {
  return (
    <div className="lg:hidden min-h-screen flex flex-col">
      {/* Top Section - Branding & Visual */}
      <div className="relative px-4 pt-24 pb-8">
        {/* Decorative Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute top-0 left-0 w-72 h-72 rounded-full blur-3xl opacity-20 ${
            darkMode ? "bg-emerald-500/30" : "bg-emerald-400/40"
          }`} />
          <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20 ${
            darkMode ? "bg-teal-500/30" : "bg-teal-400/40"
          }`} />
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 text-center space-y-6"
        >
          {/* Logo/Brand */}
          <div>
            <h1 className={`text-3xl sm:text-4xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Welcome Back
            </h1>
            <p className={`text-sm sm:text-base ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
              Continue making a difference
            </p>
          </div>

          {/* Feature Pills */}
          <div className="flex justify-center gap-2 flex-wrap">
            {[
              { icon: Shield, text: "Secure", color: "emerald" },
              { icon: Zap, text: "Fast", color: "blue" },
              { icon: Heart, text: "Trusted", color: "pink" }
            ].map(({ icon: Icon, text, color }, i) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                  color === "emerald"
                    ? darkMode
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : color === "blue"
                    ? darkMode
                      ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                      : "bg-blue-50 text-blue-700 border border-blue-200"
                    : darkMode
                      ? "bg-pink-500/20 text-pink-300 border border-pink-500/30"
                      : "bg-pink-50 text-pink-700 border border-pink-200"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {text}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Form Section */}
      <div className="flex-1 px-4 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`rounded-3xl p-6 sm:p-8 relative overflow-hidden ${
            darkMode
              ? "bg-zinc-900/80 backdrop-blur-xl border-2 border-zinc-800"
              : "bg-white/90 backdrop-blur-xl border-2 border-gray-100 shadow-xl"
          }`}
        >
          {/* Subtle gradient */}
          <div className="absolute inset-0 opacity-40">
            <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl ${
              darkMode ? "bg-emerald-500/20" : "bg-emerald-100"
            }`} />
            <div className={`absolute -bottom-20 -left-20 w-40 h-40 rounded-full blur-3xl ${
              darkMode ? "bg-teal-500/20" : "bg-teal-100"
            }`} />
          </div>

          <div className="relative z-10 space-y-6">
            {step === 1 ? (
              <motion.div
                key="login-step"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="text-center sm:text-left">
                  <h2 className={`text-2xl sm:text-3xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                    Sign in to continue
                  </h2>
                  <p className={`text-sm sm:text-base ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                    {loginMethod === "email" ? "Enter your email" : "Enter your mobile number"}
                  </p>
                </div>

                {/* Login Method Toggle */}
                <div className={`p-1.5 rounded-2xl relative ${
                  darkMode ? "bg-zinc-800/50" : "bg-gray-100"
                }`}>
                  <div className="grid grid-cols-2 relative">
                    <motion.div
                      layoutId="mobileActiveTab"
                      className={`absolute inset-y-0 w-1/2 rounded-xl ${
                        darkMode ? "bg-zinc-900 shadow-lg" : "bg-white shadow-md"
                      }`}
                      initial={false}
                      animate={{ x: loginMethod === "email" ? "0%" : "100%" }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                    <button
                      onClick={() => setLoginMethod("email")}
                      className={`relative z-10 py-3 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2 ${
                        loginMethod === "email"
                          ? darkMode ? "text-emerald-400" : "text-emerald-600"
                          : darkMode ? "text-zinc-500" : "text-gray-500"
                      }`}
                    >
                      <Mail className="w-4 h-4" />
                      Email
                    </button>
                    <button
                      onClick={() => setLoginMethod("mobile")}
                      className={`relative z-10 py-3 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2 ${
                        loginMethod === "mobile"
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
                    className="space-y-2.5"
                  >
                    <label className={`block text-sm font-medium ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                      Email Address
                    </label>
                    <div className="relative group">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className={`w-full px-4 py-3.5 rounded-xl border-2 outline-none text-base transition-all ${
                          darkMode
                            ? "bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500 focus:bg-zinc-800/80"
                            : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-emerald-500 focus:shadow-lg focus:shadow-emerald-500/10"
                        }`}
                      />
                      <motion.div
                        className="absolute inset-0 rounded-xl pointer-events-none"
                        initial={false}
                        animate={{
                          boxShadow: email.includes("@")
                            ? darkMode
                              ? "0 0 0 2px rgba(16, 185, 129, 0.2)"
                              : "0 0 0 2px rgba(16, 185, 129, 0.1)"
                            : "none"
                        }}
                        transition={{ duration: 0.2 }}
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
                    className="space-y-2.5"
                  >
                    <label className={`block text-sm font-medium ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                      Mobile Number
                    </label>
                    <div className={`relative flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 transition-all group ${
                      darkMode
                        ? "bg-zinc-800 border-zinc-700 focus-within:border-emerald-500 focus-within:bg-zinc-800/80"
                        : "bg-white border-gray-200 focus-within:border-emerald-500 focus-within:shadow-lg focus-within:shadow-emerald-500/10"
                    }`}>
                      <div className="flex items-center gap-2 flex-shrink-0">
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
                        type="tel"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                        placeholder="10-digit number"
                        className={`flex-1 bg-transparent outline-none text-base ${
                          darkMode ? "text-white placeholder:text-zinc-500" : "text-gray-900 placeholder:text-gray-400"
                        }`}
                      />
                      <motion.div
                        className="absolute inset-0 rounded-xl pointer-events-none"
                        initial={false}
                        animate={{
                          boxShadow: mobile.length === 10
                            ? darkMode
                              ? "0 0 0 2px rgba(16, 185, 129, 0.2)"
                              : "0 0 0 2px rgba(16, 185, 129, 0.1)"
                            : "none"
                        }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  </motion.div>
                )}

                <motion.button
                  onClick={handleLogin}
                  disabled={loginMethod === "email" ? !email.includes("@") : mobile.length !== 10}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full group relative overflow-hidden py-3.5 px-6 rounded-xl font-semibold text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="relative flex items-center justify-center gap-2 text-white">
                    {sendingOtp ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        Continue
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </div>
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="otp-step"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="text-center sm:text-left">
                  <h2 className={`text-2xl sm:text-3xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                    Verify your identity
                  </h2>
                  <p className={`text-sm sm:text-base ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                    Code sent to{" "}
                    <span className="font-semibold text-emerald-600">
                      {loginMethod === "email" ? email : `+91 ${mobile}`}
                    </span>
                  </p>
                </div>

                <div className="space-y-2.5">
                  <label className={`block text-sm font-medium ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                    4-Digit Code
                  </label>

                  {/* Hidden autofill input */}
                  <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    pattern="[0-9]*"
                    maxLength={4}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    className="absolute opacity-0 pointer-events-none"
                  />

                  {/* Visible OTP boxes */}
                  <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
                    {[...Array(4)].map((_, index) => (
                      <motion.input
                        key={index}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={otp[index] || ""}
                        onChange={(e) => {
                          const digit = e.target.value.replace(/\D/g, "");
                          const newOtp = otp.split("");
                          newOtp[index] = digit;
                          setOtp(newOtp.join(""));
                          if (digit && index < 3) {
                            e.target.nextElementSibling?.focus();
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Backspace" && !otp[index] && index > 0) {
                            e.target.previousElementSibling?.focus();
                          }
                        }}
                        whileFocus={{ scale: 1.05 }}
                        className={`w-full aspect-square text-center text-2xl sm:text-3xl font-bold rounded-xl border-2 outline-none transition-all ${
                          darkMode
                            ? "bg-zinc-800 border-zinc-700 text-white focus:border-emerald-500"
                            : "bg-white border-gray-200 text-gray-900 focus:border-emerald-500 focus:shadow-lg"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2.5">
                  <motion.button
                    onClick={handleOtpSubmit}
                    disabled={otp.length !== 4}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full group relative overflow-hidden py-3.5 px-6 rounded-xl font-semibold text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="relative flex items-center justify-center gap-2 text-white">
                      {verifyingOtp ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          />
                          Verifying...
                        </>
                      ) : (
                        <>
                          Verify & Log In
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </div>
                  </motion.button>

                  <motion.button
                    onClick={() => setStep(1)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`py-3 px-6 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                      darkMode ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Change {loginMethod === "email" ? "Email" : "Number"}
                  </motion.button>
                </div>

                <p className={`text-center text-xs sm:text-sm ${darkMode ? "text-zinc-500" : "text-gray-500"}`}>
                  Didn't receive?{" "}
                  <button className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                    Resend code
                  </button>
                </p>
              </motion.div>
            )}

            <p className={`text-center text-sm ${darkMode ? "text-zinc-500" : "text-gray-500"}`}>
              Don't have an account?{" "}
              <a href="/signup" className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                Sign up
              </a>
            </p>
            <p className={`text-center text-sm ${darkMode ? "text-zinc-500" : "text-gray-500"}`}>
              Are you an Organization?{" "}
              <a href="/organization/login" className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                Login Here
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}