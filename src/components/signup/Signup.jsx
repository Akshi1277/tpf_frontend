"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, ArrowLeft, Check } from "lucide-react"

export default function SignUpPage({ darkMode }) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [mobile, setMobile] = useState('')
  const [otp, setOtp] = useState('')
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  const handleMobileSubmit = () => {
    if (mobile.length === 10) {
      setStep(2)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleOtpSubmit = () => {
    if (otp.length === 4) {
      setStep(3)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleFinalSubmit = () => {
    if (email && fullName) {
      setShowSuccess(true)
      setTimeout(() => {
        router.push('/')
      }, 2500)
    }
  }

  return (
    <div className={`min-h-screen relative overflow-hidden ${darkMode
        ? "bg-zinc-950"
        : "bg-white"
      }`}>

      {/* Sophisticated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid Pattern */}
        <div
          className={`absolute inset-0 ${darkMode
              ? "bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)]"
              : "bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)]"
            }`}
          style={{ backgroundSize: '64px 64px' }}
        />

        {/* Gradient Orbs */}
        <div className={`absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[120px] ${darkMode
            ? "bg-emerald-950/20"
            : "bg-emerald-50"
          }`} />
        <div className={`absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[100px] ${darkMode
            ? "bg-teal-950/20"
            : "bg-teal-50"
          }`} />

        {/* Noise Texture Overlay */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* Success Toast */}
   <AnimatePresence>
  {showSuccess && (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`fixed top-4 sm:top-6 left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:max-w-md z-50 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-2xl flex items-center gap-2 sm:gap-3 ${
        darkMode
          ? "bg-zinc-900 border border-emerald-500/20"
          : "bg-white border border-emerald-200"
      }`}
    >
      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={3} />
      </div>
      <div className="flex-1 min-w-0">
        <p className={`font-semibold text-sm sm:text-base ${darkMode ? "text-white" : "text-gray-900"}`}>
          Welcome aboard!
        </p>
        <p className={`text-xs sm:text-sm ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
          Taking you to your dashboard...
        </p>
      </div>
    </motion.div>
  )}
</AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 xl:gap-16 items-center">

            {/* LEFT SIDE - 3 columns */}
            <div className="hidden lg:block lg:col-span-2 space-y-8 xl:space-y-12">

              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className={`text-5xl lg:text-6xl font-bold leading-tight ${darkMode ? "text-white" : "text-gray-900"
                  }`}>
                  Create lasting
                  <br />
                  <span className="relative inline-block mt-2">
                    <span className="relative z-10 bg-gradient-to-r from-emerald-600 to-teal-600 text-transparent bg-clip-text">
                      impact
                    </span>
        <motion.span
  animate={{ 
    x: ["-100%", "100%"]
  }}
  transition={{
    repeat: Infinity,
    duration: 2.5,
    ease: "linear",
  }}
  className="absolute bottom-2 left-10 w-1/2 h-3 rounded-full blur-sm"
  style={{
    background:
      "linear-gradient(90deg, transparent, rgba(16,185,129,1), transparent)",
  }}
/>

                  </span>
                </h1>
              </motion.div>

              {/* Mission Statement */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`p-6 rounded-2xl border ${darkMode
                    ? "bg-emerald-500/10 border-emerald-500/20"
                    : "bg-emerald-50 border-emerald-100"
                  }`}
              >
                <h3 className={`text-lg font-bold mb-3 ${darkMode ? "text-white" : "text-gray-900"
                  }`}>
                  Our Mission
                </h3>
                <p className={`text-sm leading-relaxed ${darkMode ? "text-zinc-300" : "text-gray-700"
                  }`}>
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
                    <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${darkMode ? "bg-emerald-500/20" : "bg-emerald-100"
                      }`}>
                      <svg className="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className={`text-sm ${darkMode ? "text-zinc-400" : "text-gray-600"
                      }`}>
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
              <div className={`rounded-2xl mt-24 sm:mt-5 lg:mt-5 sm:rounded-3xl py-10 px-2 sm:p-8 lg:p-12 border-2 border-emerald-500 ${darkMode
                  ? "bg-zinc-900/50 backdrop-blur-xl border border-zinc-800"
                  : "bg-white/80 backdrop-blur-xl border border-gray-100 shadow-2xl shadow-gray-200/50"
                }`}>

              

                <AnimatePresence mode="wait">
                  {/* STEP 1: Mobile */}
                  {step === 1 && (
                    <motion.div
                      key="mobile"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6 sm:space-y-8"
                    >
                      <div className="max-w-md mx-auto space-y-12 sm:space-y-8">
                        <div>
                          <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 ${darkMode ? "text-white" : "text-gray-900"
                            }`}>
                            Create an account
                          </h2>
                          <p className={`text-base sm:text-lg ${darkMode ? "text-zinc-400" : "text-gray-600"
                            }`}>
                            Enter your mobile number to continue
                          </p>
                        </div>

                        <div className="space-y-3">
                          <label className={`block text-sm font-medium ${darkMode ? "text-zinc-300" : "text-gray-700"
                            }`}>
                            Mobile Number
                          </label>
                          <div className={`relative group`}>
                            <div className={`absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl opacity-0 group-focus-within:opacity-100 blur transition-opacity`} />
                            <div className={`relative flex items-center gap-2 sm:gap-4 px-3 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 transition-all ${darkMode
                                ? "bg-zinc-800 border-zinc-700 group-focus-within:border-emerald-500"
                                : "bg-white border-gray-200 group-focus-within:border-emerald-500"
                              }`}>
                              <div className="flex items-center gap-2 sm:gap-2.5">
                                <svg className="w-6 h-4 sm:w-7 sm:h-5" viewBox="0 0 30 20">
                                  <rect width="30" height="6.67" fill="#FF9933" />
                                  <rect y="6.67" width="30" height="6.67" fill="#FFFFFF" />
                                  <rect y="13.33" width="30" height="6.67" fill="#138808" />
                                  <circle cx="15" cy="10" r="2.5" fill="#000080" />
                                </svg>
                                <span className={`text-base sm:text-lg font-semibold ${darkMode ? "text-zinc-300" : "text-gray-700"
                                  }`}>
                                  +91
                                </span>
                                <div className={`w-px h-5 sm:h-6 ${darkMode ? "bg-zinc-700" : "bg-gray-300"
                                  }`} />
                              </div>
                              <input
                                type="tel"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                                placeholder="10-digit number"
                                className={`flex-1 text-base sm:text-lg md:text-xl font-medium outline-none bg-transparent ${darkMode ? "text-white placeholder-zinc-600" : "text-gray-900 placeholder-gray-400"
                                  }`}
                                autoFocus
                              />
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={handleMobileSubmit}
                          disabled={mobile.length !== 10}
                          className="w-full group relative overflow-hidden py-4 px-6 rounded-2xl font-semibold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 transition-transform group-hover:scale-105 group-disabled:scale-100" />
                          <div className="relative flex items-center justify-center gap-2 text-white">
                            Continue
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                          </div>
                        </button>

                        <p className={`text-center text-sm ${darkMode ? "text-zinc-500" : "text-gray-500"
                          }`}>
                          By continuing, you agree to our{" "}
                          <a href="#" className={`underline ${darkMode ? "text-zinc-400" : "text-gray-700"}`}>
                            Terms of Service
                          </a>
                        </p>
                        </div>
                    </motion.div>
                  )}

                  {/* STEP 2: OTP */}
                  {step === 2 && (
                    <motion.div
                      key="otp"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4 sm:space-y-8"
                    >
                       <div className="max-w-md mx-auto space-y-12 px-2 sm:space-y-8">
                      <div>
                        <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 ${darkMode ? "text-white" : "text-gray-900"
                          }`}>
                          Enter verification code
                        </h2>
                        <p className={`text-base sm:text-lg ${darkMode ? "text-zinc-400" : "text-gray-600"
                          }`}>
                          Sent to{" "}
                          <span className="font-semibold text-emerald-600">
                            +91 {mobile}
                          </span>
                        </p>
                      </div>

                      <div className="space-y-3">
                        <label className={`block text-sm font-medium ${darkMode ? "text-zinc-300" : "text-gray-700"
                          }`}>
                          4-Digit Code
                        </label>
                        <div className="flex gap-2 sm:gap-3 md:gap-4">
                          {[...Array(4)].map((_, index) => (
                            <input
                              key={index}
                              type="text"
                              inputMode="numeric"
                              maxLength="1"
                              value={otp[index] || ""}
                              onChange={(e) => {
                                const newOtp = otp.split("")
                                newOtp[index] = e.target.value
                                setOtp(newOtp.join(""))
                                if (e.target.value && index < 3) {
                                  e.target.nextElementSibling?.focus()
                                }
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Backspace" && !otp[index] && index > 0) {
                                  e.target.previousElementSibling?.focus()
                                }
                              }}
                              className={`flex-1 h-14 sm:h-16 md:h-20 w-14 sm:w-16 md:w-20 text-center text-2xl sm:text-3xl font-bold rounded-xl sm:rounded-2xl border-2 outline-none transition-all ${darkMode
                                  ? "bg-zinc-800 border-zinc-700 text-white focus:border-emerald-500 focus:bg-zinc-800"
                                  : "bg-white border-gray-200 text-gray-900 focus:border-emerald-500 focus:shadow-lg"
                                }`}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col gap-3">
                        <button
                          onClick={handleOtpSubmit}
                          disabled={otp.length !== 4}
                          className="w-full group relative overflow-hidden py-3.5 sm:py-4 px-6 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 transition-transform group-hover:scale-105 group-disabled:scale-100" />
                          <div className="relative flex items-center justify-center gap-2 text-white">
                            Verify & Continue
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                          </div>
                        </button>

                        <button
                          onClick={() => setStep(1)}
                          className={`py-3 px-6 rounded-xl sm:rounded-2xl font-medium text-sm sm:text-base transition-all flex items-center justify-center gap-2 ${darkMode
                              ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                            }`}
                        >
                          <ArrowLeft className="w-4 h-4" />
                          Change Number
                        </button>
                      </div>

                      <p className={`text-center text-xs sm:text-sm ${darkMode ? "text-zinc-500" : "text-gray-500"
                        }`}>
                        Didn't receive?{" "}
                        <button className="font-semibold text-emerald-600 hover:text-emerald-700">
                          Resend code
                        </button>
                      </p>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: Details */}
                 {step === 3 && (
  <motion.div
    key="details"
    initial={{ opacity: 0, x: 10 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -10 }}
    transition={{ duration: 0.3 }}
    className="space-y-6 sm:space-y-8"
  >
    
       <div className="max-w-md mx-auto space-y-3 px-2 sm:space-y-4">
        <div>
      <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 ${
        darkMode ? "text-white" : "text-gray-900"
      }`}>
        Tell us about yourself
      </h2>
      <p className={`text-base sm:text-lg ${
        darkMode ? "text-zinc-400" : "text-gray-600"
      }`}>
        We'll use this to personalize your experience
      </p>
    </div>

    <div className="space-y-6">
      <div className="space-y-3">
        <label className={`block text-sm font-medium ${
          darkMode ? "text-zinc-300" : "text-gray-700"
        }`}>
          Full Name
        </label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="John Doe"
          className={`w-full px-4 sm:px-5 py-3 sm:py-4 text-base sm:text-lg md:text-xl rounded-xl sm:rounded-2xl border-2 outline-none transition-all ${
            darkMode
              ? "bg-zinc-800 border-zinc-700 text-white placeholder-zinc-600 focus:border-emerald-500"
              : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:shadow-lg"
          }`}
          autoFocus
        />
      </div>

      <div className="space-y-3">
        <label className={`block text-sm font-medium ${
          darkMode ? "text-zinc-300" : "text-gray-700"
        }`}>
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="john@example.com"
          className={`w-full px-4 sm:px-5 py-3 sm:py-4 text-base sm:text-lg md:text-xl rounded-xl sm:rounded-2xl border-2 outline-none transition-all ${
            darkMode
              ? "bg-zinc-800 border-zinc-700 text-white placeholder-zinc-600 focus:border-emerald-500"
              : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:shadow-lg"
          }`}
        />
      </div>
    </div>

    <div className="flex flex-col gap-3">
      <button
        onClick={handleFinalSubmit}
        disabled={!email || !fullName}
        className="w-full group relative overflow-hidden py-3.5 sm:py-4 px-6 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 transition-transform group-hover:scale-105 group-disabled:scale-100" />
        <div className="relative flex items-center justify-center gap-2 text-white">
          <Check className="w-5 h-5" strokeWidth={3} />
          Submit
        </div>
      </button>

      <button
        onClick={() => setStep(2)}
        className={`py-3 px-6 rounded-xl sm:rounded-2xl font-medium text-sm sm:text-base transition-all flex items-center justify-center gap-2 ${
          darkMode
            ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
        }`}
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>
    </div>
    </div>
  </motion.div>
)}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}