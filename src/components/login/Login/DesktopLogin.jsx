"use client"

import { motion } from "framer-motion"
import { ArrowRight, ArrowLeft, Mail, Phone } from "lucide-react"

export default function DesktopLogin({
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
    <div className="hidden lg:grid lg:grid-cols-5 gap-8 lg:gap-12 xl:gap-16 items-center">
      {/* LEFT SIDE - 2 columns */}
      <div className="lg:col-span-2 space-y-8 xl:space-y-12">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className={`text-5xl lg:text-6xl font-bold leading-tight ${darkMode ? "text-white" : "text-gray-900"}`}>
            Continue your
            <br />
            <span className="relative inline-block mt-2">
              <span className="relative z-10 bg-gradient-to-r from-emerald-600 to-teal-600 text-transparent bg-clip-text">
                journey
              </span>
              <motion.span
                animate={{ x: ["-100%", "100%", "-100%"] }}
                transition={{ repeat: Infinity, duration: 5.5, ease: "linear" }}
                className="absolute bottom-2 left-10 w-1/2 h-3 rounded-full blur-sm"
                style={{ background: "linear-gradient(90deg, transparent, rgba(16,185,129,1), transparent)" }}
              />
            </span>
          </h1>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`p-6 rounded-2xl border ${darkMode ? "bg-emerald-500/10 border-emerald-500/20" : "bg-emerald-50 border-emerald-100"}`}
        >
          <h3 className={`text-lg font-bold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Our Mission
          </h3>
          <p className={`text-sm leading-relaxed ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
            Empowering communities through transparent, secure, and accessible fundraising.
            Every contribution creates lasting impact for those who need it most.
          </p>
        </motion.div>

        {/* Key Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-4"
        >
          {[
            "Secure payment gateway integration",
            "Track campaign progress in real-time",
            "Direct support to verified causes"
          ].map((text, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${darkMode ? "bg-emerald-500/20" : "bg-emerald-100"}`}>
                <svg className="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className={`text-sm ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                {text}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* RIGHT SIDE - Form (3 columns) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="lg:col-span-3"
      >
        <div className={`rounded-3xl p-12 border-2 relative overflow-hidden ${
          darkMode
            ? "bg-zinc-900/50 backdrop-blur-xl border-zinc-800"
            : "bg-white/80 backdrop-blur-xl border-gray-100 shadow-2xl shadow-gray-200/50"
        }`}>
          {/* Subtle background gradient */}
          <div className="absolute inset-0 opacity-30">
            <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl ${
              darkMode ? "bg-emerald-500/10" : "bg-emerald-50"
            }`} />
            <div className={`absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl ${
              darkMode ? "bg-teal-500/10" : "bg-teal-50"
            }`} />
          </div>

          <div className="relative z-10 max-w-md mx-auto space-y-8">
            {step === 1 ? (
              <motion.div
                key="login-step"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                <div>
                  <h2 className={`text-3xl lg:text-4xl font-bold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                    Welcome back
                  </h2>
                  <p className={`text-lg ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                    Sign in to continue your impact
                  </p>
                </div>

                {/* Login Method Toggle */}
                <div className={`p-1.5 rounded-2xl relative ${
                  darkMode ? "bg-zinc-800/50" : "bg-gray-100"
                }`}>
                  <div className="grid grid-cols-2 relative">
                    <motion.div
                      layoutId="activeTab"
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
                    className="space-y-3"
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
                        className={`w-full px-5 py-4 rounded-2xl border-2 outline-none text-lg transition-all ${
                          darkMode
                            ? "bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500 focus:bg-zinc-800/80"
                            : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-emerald-500 focus:shadow-lg focus:shadow-emerald-500/10"
                        }`}
                      />
                      <motion.div
                        className="absolute inset-0 rounded-2xl pointer-events-none"
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
                    className="space-y-3"
                  >
                    <label className={`block text-sm font-medium ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                      Mobile Number
                    </label>
                    <div className={`relative flex items-center gap-4 px-5 py-4 rounded-2xl border-2 transition-all group ${
                      darkMode
                        ? "bg-zinc-800 border-zinc-700 focus-within:border-emerald-500 focus-within:bg-zinc-800/80"
                        : "bg-white border-gray-200 focus-within:border-emerald-500 focus-within:shadow-lg focus-within:shadow-emerald-500/10"
                    }`}>
                      <div className="flex items-center gap-2.5 flex-shrink-0">
                        <svg className="w-7 h-5" viewBox="0 0 30 20">
                          <rect width="30" height="6.67" fill="#FF9933" />
                          <rect y="6.67" width="30" height="6.67" fill="#FFFFFF" />
                          <rect y="13.33" width="30" height="6.67" fill="#138808" />
                          <circle cx="15" cy="10" r="2.5" fill="#000080" />
                        </svg>
                        <span className={`text-lg font-semibold ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>+91</span>
                        <div className={`w-px h-6 ${darkMode ? "bg-zinc-700" : "bg-gray-300"}`} />
                      </div>
                      <input
                        type="tel"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                        placeholder="10-digit number"
                        className={`flex-1 bg-transparent outline-none text-lg ${
                          darkMode ? "text-white placeholder:text-zinc-500" : "text-gray-900 placeholder:text-gray-400"
                        }`}
                      />
                      <motion.div
                        className="absolute inset-0 rounded-2xl pointer-events-none"
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
                  className="w-full group relative overflow-hidden py-4 px-6 rounded-2xl font-semibold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="otp-step"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                <div>
                  <h2 className={`text-3xl lg:text-4xl font-bold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                    Verify your identity
                  </h2>
                  <p className={`text-lg ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                    Code sent to{" "}
                    <span className="font-semibold text-emerald-600">
                      {loginMethod === "email" ? email : `+91 ${mobile}`}
                    </span>
                  </p>
                </div>

                <div className="space-y-3">
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
                  <div className="grid grid-cols-4 gap-3">
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
                        className={`w-full aspect-square text-center text-3xl font-bold rounded-2xl border-2 outline-none transition-all ${
                          darkMode
                            ? "bg-zinc-800 border-zinc-700 text-white focus:border-emerald-500"
                            : "bg-white border-gray-200 text-gray-900 focus:border-emerald-500 focus:shadow-lg"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <motion.button
                    onClick={handleOtpSubmit}
                    disabled={otp.length !== 4}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full group relative overflow-hidden py-4 px-6 rounded-2xl font-semibold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                  </motion.button>

                  <motion.button
                    onClick={() => setStep(1)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`py-3 px-6 rounded-2xl font-medium text-base transition-all flex items-center justify-center gap-2 ${
                      darkMode ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Change {loginMethod === "email" ? "Email" : "Number"}
                  </motion.button>
                </div>

                <p className={`text-center text-sm ${darkMode ? "text-zinc-500" : "text-gray-500"}`}>
                  Didn't receive?{" "}
                  <button className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                    Resend code
                  </button>
                </p>
              </motion.div>
            )}

           <div className="text-center space-y-2">
  <p className={`text-sm ${darkMode ? "text-zinc-500" : "text-gray-500"}`}>
    Don't have an account?{" "}
    <a href="/signup" className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
      Sign up
    </a>
  </p>
  <p className={`text-sm ${darkMode ? "text-zinc-500" : "text-gray-500"}`}>
    Are you an Organization?{" "}
    <a href="/organization/login" className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
      Login Here
    </a>
  </p>
</div>

          </div>
        </div>
      </motion.div>
    </div>
  )
}