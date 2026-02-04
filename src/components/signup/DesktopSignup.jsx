"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ArrowLeft, Phone, Check, User, Mail } from "lucide-react"

export default function DesktopSignup({
  darkMode,
  step,
  mobile,
  setMobile,
  otp,
  setOtp,
  email,
  setEmail,
  fullName,
  setFullName,
  handleMobileSubmit,
  handleOtpSubmit,
  handleFinalSubmit,
  setStep,
  sendingOtp,
  verifyingOtp,
  updatingProfile
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
            Start making
            <br />
            <span className="relative inline-block mt-2">
              <span className="relative z-10 bg-gradient-to-r from-emerald-600 to-teal-600 text-transparent bg-clip-text">
                an impact
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
            Join Our Community
          </h3>
          <p className={`text-sm leading-relaxed ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
            Be part of a movement that empowers communities through transparent, secure fundraising.
            Your journey to making a difference starts here.
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
            "Create and manage campaigns effortlessly",
            "Secure transactions with verified recipients",
            "Real-time tracking and transparency"
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
            <AnimatePresence mode="wait">
              {/* STEP 1: Mobile Number */}
              {step === 1 && (
                <motion.div
                  key="mobile-step"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className={`text-3xl lg:text-4xl font-bold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                      Create your account
                    </h2>
                    <p className={`text-lg ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                      Let's get started with your mobile number
                    </p>
                  </div>

                  <div className="space-y-3">
                    <label className={`block text-sm font-medium ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                      Mobile Number
                    </label>
                   <div className="relative group">
  <div className={`absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl opacity-0 group-focus-within:opacity-20 blur transition-opacity duration-300`} />
  
  <div className={`relative flex items-center gap-3 px-4 py-4 rounded-2xl border-2 transition-all ${
    darkMode
      ? "bg-zinc-800 border-zinc-700 focus-within:border-emerald-500"
      : "bg-white border-gray-200 focus-within:border-emerald-500 focus-within:shadow-lg"
  }`}>
    
    {/* Flag + Code */}
    <div className="flex items-center gap-2 flex-shrink-0">
      <svg className="w-6 h-4" viewBox="0 0 30 20">
        <rect width="30" height="6.67" fill="#FF9933" />
        <rect y="6.67" width="30" height="6.67" fill="#FFFFFF" />
        <rect y="13.33" width="30" height="6.67" fill="#138808" />
        <circle cx="15" cy="10" r="2.5" fill="#000080" />
      </svg>
      <span className={`text-base font-semibold ${
        darkMode ? "text-zinc-300" : "text-gray-700"
      }`}>
        +91
      </span>
      <div className={`w-px h-5 ${
        darkMode ? "bg-zinc-700" : "bg-gray-300"
      }`} />
    </div>

    {/* Input */}
    <input
      type="tel"
      inputMode="numeric"
      maxLength="10"
      value={mobile}
      onChange={(e) =>
        setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
      }
      placeholder="10-digit number"
      className={`flex-1 text-lg font-medium outline-none bg-transparent ${
        darkMode
          ? "text-white placeholder-zinc-600"
          : "text-gray-900 placeholder-gray-400"
      }`}
      autoFocus
    />

    {/* Check Icon */}
    {mobile.length === 10 && (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      >
        <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
          <Check className="w-4 h-4 text-white" strokeWidth={3} />
        </div>
      </motion.div>
    )}
  </div>
</div>

                  </div>

                  <motion.button
                    onClick={handleMobileSubmit}
                    disabled={mobile.length !== 10}
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
                          Sending Code...
                        </>
                      ) : (
                        <>
                          Continue
                          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </div>
                  </motion.button>

                  <p className={`text-center text-sm ${darkMode ? "text-zinc-500" : "text-gray-500"}`}>
                    By continuing, you agree to our{" "}
                    <a href="/policies" className="text-emerald-600 hover:text-emerald-700 font-medium">
                      Policies
                    </a>{" "}
                   
                  </p>
                </motion.div>
              )}

              {/* STEP 2: OTP Verification */}
              {step === 2 && (
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
                      Verify your number
                    </h2>
                    <p className={`text-lg ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                      Code sent to{" "}
                      <span className="font-semibold text-emerald-600">
                        +91 {mobile}
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
                            Verify & Continue
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
                      Change Number
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

              {/* STEP 3: Profile Details */}
              {step === 3 && (
                <motion.div
                  key="details-step"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className={`text-3xl lg:text-4xl font-bold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                      Complete your profile
                    </h2>
                    <p className={`text-lg ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                      Help us personalize your experience
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className={`block text-sm font-medium ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                        Full Name
                      </label>
                      <div className="relative">
                        <div className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                          darkMode ? "text-zinc-500" : "text-gray-400"
                        }`}>
                          <User className="w-5 h-5" />
                        </div>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="John Doe"
                          className={`w-full pl-14 pr-5 py-4 text-lg rounded-2xl border-2 outline-none transition-all ${
                            darkMode
                              ? "bg-zinc-800 border-zinc-700 text-white placeholder-zinc-600 focus:border-emerald-500"
                              : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:shadow-lg"
                          }`}
                          autoFocus
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className={`block text-sm font-medium ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                        Email Address
                      </label>
                      <div className="relative">
                        <div className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                          darkMode ? "text-zinc-500" : "text-gray-400"
                        }`}>
                          <Mail className="w-5 h-5" />
                        </div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="john@example.com"
                          className={`w-full pl-14 pr-5 py-4 text-lg rounded-2xl border-2 outline-none transition-all ${
                            darkMode
                              ? "bg-zinc-800 border-zinc-700 text-white placeholder-zinc-600 focus:border-emerald-500"
                              : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:shadow-lg"
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <motion.button
                      onClick={handleFinalSubmit}
                      disabled={!email || !fullName}
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
                        {updatingProfile ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                            />
                            Creating Account...
                          </>
                        ) : (
                          <>
                            <Check className="w-5 h-5" strokeWidth={3} />
                            Complete Sign Up
                          </>
                        )}
                      </div>
                    </motion.button>

                    <motion.button
                      onClick={() => setStep(2)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={`py-3 px-6 rounded-2xl font-medium text-base transition-all flex items-center justify-center gap-2 ${
                        darkMode ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <p className={`text-center text-sm ${darkMode ? "text-zinc-500" : "text-gray-500"}`}>
              Already have an account?{" "}
              <a href="/login" className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}