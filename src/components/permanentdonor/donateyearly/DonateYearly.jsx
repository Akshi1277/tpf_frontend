"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { 
  Award,
  Heart,
  ChevronRight,
  Check,
  ArrowLeft,
  Sparkles,
  Calendar,
  Shield,
  Trophy,
  FileText
} from "lucide-react"

export default function AnnualPatronPage({ darkModeFromParent }) {
  const [darkMode, setDarkMode] = useState(false)
  const router = useRouter()
  const [amount, setAmount] = useState("2000")
  const [customAmount, setCustomAmount] = useState("")
  const [anniversaryDate, setAnniversaryDate] = useState("")
  const [countAsZakat, setCountAsZakat] = useState(false)
  const [TpfAidTip, setTpfAidTip] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (darkModeFromParent !== undefined) {
      setDarkMode(darkModeFromParent)
    }
  }, [darkModeFromParent])

  const presetAmounts = [2000, 5000, 10000]
  const tipPercentages = [0, 5, 10, 15]

  const calculateTip = () => {
    const baseAmount = parseFloat(customAmount || amount)
    return ((baseAmount * TpfAidTip) / 100).toFixed(2)
  }

  const calculateTotal = () => {
    const baseAmount = parseFloat(customAmount || amount)
    const tip = parseFloat(calculateTip())
    return (baseAmount + tip).toFixed(2)
  }

  const handleConfirm = () => {
    setShowSuccess(true)
    setTimeout(() => {
      router.push('/dashboard')
    }, 2000)
  }

  return (
    <div className={`min-h-screen ${darkMode ? "bg-zinc-900" : "bg-neutral-50"} py-8 sm:py-12`}>
      {/* Success Toast */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 
                     bg-gradient-to-r from-emerald-600 to-emerald-400 text-white px-6 py-4 rounded-lg shadow-2xl 
                     flex items-center gap-3 max-w-md w-[90%] sm:w-auto"
        >
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Check className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold">Annual Patron Activated!</p>
            <p className="text-sm text-emerald-100">Taking you to dashboard...</p>
          </div>
        </motion.div>
      )}

      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className={`flex items-center gap-2 mb-6 sm:mb-8 text-sm font-medium transition-colors ${
            darkMode 
              ? "text-zinc-400 hover:text-white" 
              : "text-zinc-600 hover:text-zinc-900"
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to plans
        </motion.button>

        {/* Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`relative rounded-3xl overflow-hidden mb-8 ${
            darkMode ? "bg-zinc-800" : "bg-white"
          } shadow-xl`}
        >
          {/* Decorative Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-cyan-500 to-emerald-500 rounded-full blur-3xl" />
          </div>

          {/* Content */}
          <div className="relative p-6 sm:p-8">
            {/* Icon & Badge */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center shadow-lg">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className={`text-3xl sm:text-4xl font-bold ${
                    darkMode ? "text-white" : "text-zinc-900"
                  }`}>
                    Annual Patron
                  </h1>
                  <p className="text-emerald-500 font-semibold text-sm sm:text-base">
                    Maximum impact
                  </p>
                </div>
              </div>
              <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <span className="text-xs font-bold text-emerald-500">PREMIUM</span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className={`text-5xl sm:text-6xl font-bold bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent`}>
                  ₹{customAmount || amount.toLocaleString()}
                </span>
                <span className={`text-xl ${darkMode ? "text-zinc-500" : "text-zinc-400"}`}>
                  /year
                </span>
              </div>
              <p className={`text-sm mt-2 ${darkMode ? "text-zinc-500" : "text-zinc-500"}`}>
                Yearly contribution
              </p>
            </div>

            {/* Description */}
            <p className={`text-sm sm:text-base leading-relaxed ${
              darkMode ? "text-zinc-400" : "text-zinc-600"
            }`}>
              Make a significant annual commitment. Ideal for those planning larger contributions with premium recognition and benefits.
            </p>

            {/* Action Button - Desktop Only */}
            <button
              onClick={() => document.getElementById('amount-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="hidden sm:flex items-center gap-2 mt-6 text-emerald-500 font-semibold hover:gap-3 transition-all group"
            >
              <span>Click to explore</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* What's Included */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`rounded-2xl p-6 sm:p-8 mb-6 ${
            darkMode ? "bg-zinc-800" : "bg-white"
          } shadow-lg`}
        >
          <h3 className={`text-xl font-bold mb-6 ${
            darkMode ? "text-white" : "text-zinc-900"
          }`}>
            What's Included
          </h3>

          <div className="space-y-4">
            {[
              "Single annual contribution",
              "Choose your donation anniversary",
              "Comprehensive annual impact report",
              "Premium patron recognition"
            ].map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-emerald-500" strokeWidth={3} />
                </div>
                <p className={`text-sm sm:text-base ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                  {feature}
                </p>
              </div>
            ))}
          </div>

          {/* Scroll Indicator - Mobile Only */}
          <div className="flex sm:hidden items-center justify-center gap-2 mt-6 text-sm text-emerald-500">
            <span>Scroll for more</span>
            <ChevronRight className="w-4 h-4 rotate-90" />
          </div>
        </motion.div>

        {/* Amount Selection */}
        <motion.div
          id="amount-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className={`rounded-2xl p-6 sm:p-8 mb-6 ${
            darkMode ? "bg-zinc-800" : "bg-white"
          } shadow-lg`}
        >
          <h3 className={`text-xl font-bold mb-4 ${
            darkMode ? "text-white" : "text-zinc-900"
          }`}>
            Your giving amount
          </h3>

          {/* Custom Amount Input */}
          <div className="mb-4">
            <div className="relative">
              <span className={`absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold ${
                darkMode ? "text-zinc-500" : "text-zinc-400"
              }`}>
                ₹
              </span>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder={amount}
                className={`w-full pl-12 pr-4 py-4 text-2xl font-bold rounded-xl border-2 outline-none transition-all ${
                  darkMode
                    ? "bg-zinc-900 border-zinc-700 text-white placeholder-zinc-600 focus:border-emerald-500"
                    : "bg-white border-zinc-200 text-zinc-900 placeholder-zinc-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                }`}
              />
            </div>
          </div>

          {/* Preset Amounts */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {presetAmounts.map((preset) => (
              <button
                key={preset}
                onClick={() => {
                  setAmount(preset.toString())
                  setCustomAmount("")
                }}
                className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                  (customAmount === "" && amount === preset.toString())
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                    : darkMode
                    ? "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
                    : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                }`}
              >
                {preset.toLocaleString()}
              </button>
            ))}
          </div>

       
        </motion.div>

        {/* Anniversary Date Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`rounded-2xl p-6 sm:p-8 mb-6 ${
            darkMode ? "bg-zinc-800" : "bg-white"
          } shadow-lg`}
        >
          <div className="flex items-start gap-3 mb-4">
            <Calendar className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className={`text-lg font-bold mb-2 ${
                darkMode ? "text-white" : "text-zinc-900"
              }`}>
                Choose your donation anniversary
              </h3>
              <p className={`text-sm mb-4 ${
                darkMode ? "text-zinc-400" : "text-zinc-600"
              }`}>
                Select a date for your annual donation. You'll receive advance reminders 15 and 7 days before the scheduled date.
              </p>
            </div>
          </div>

          {/* Date Input */}
          <input
            type="date"
            value={anniversaryDate}
            onChange={(e) => setAnniversaryDate(e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all font-semibold ${
              darkMode
                ? "bg-zinc-900 border-zinc-700 text-white focus:border-emerald-500"
                : "bg-white border-zinc-200 text-zinc-900 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
            }`}
          />
        </motion.div>

        {/* Platform Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className={`rounded-2xl p-6 sm:p-8 mb-6 ${
            darkMode ? "bg-zinc-800" : "bg-white"
          } shadow-lg`}
        >
          <div className="flex items-start gap-3 mb-4">
            <Heart className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className={`text-lg font-bold mb-2 ${
                darkMode ? "text-white" : "text-zinc-900"
              }`}>
                Help us help the Ummah
              </h3>
              <p className={`text-sm leading-relaxed mb-4 ${
                darkMode ? "text-zinc-400" : "text-zinc-600"
              }`}>
                Because TpfAid doesn't charge a platform fee, we rely on the generosity of donors like you to keep more people giving
              </p>
            </div>
          </div>

          {/* Tip Amount */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className={`text-sm font-medium ${
                darkMode ? "text-zinc-400" : "text-zinc-600"
              }`}>
                Platform support
              </span>
              <span className={`text-lg font-bold ${
                darkMode ? "text-white" : "text-zinc-900"
              }`}>
                ₹{calculateTip()} ({TpfAidTip}%)
              </span>
            </div>

            {/* Tip Percentage Buttons */}
            <div className="grid grid-cols-4 gap-2">
              {tipPercentages.map((percentage) => (
                <button
                  key={percentage}
                  onClick={() => setTpfAidTip(percentage)}
                  className={`py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
                    TpfAidTip === percentage
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg"
                      : darkMode
                      ? "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
                      : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                  }`}
                >
                  {percentage}%
                </button>
              ))}
            </div>

            <a href="#" className={`text-xs underline ${
              darkMode ? "text-zinc-500 hover:text-zinc-400" : "text-zinc-500 hover:text-zinc-600"
            }`}>
              Custom amount
            </a>
          </div>
        </motion.div>

        {/* Payment Method */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`rounded-2xl p-6 sm:p-8 mb-6 ${
            darkMode ? "bg-zinc-800" : "bg-white"
          } shadow-lg`}
        >
          <h3 className={`text-lg font-bold mb-3 ${
            darkMode ? "text-white" : "text-zinc-900"
          }`}>
            Payment method
          </h3>
          <p className={`text-sm mb-4 ${
            darkMode ? "text-zinc-400" : "text-zinc-600"
          }`}>
            To select a payment method you will need to create an account or{' '}
            <a href="#" className="text-emerald-600 font-semibold hover:underline">
              log in
            </a>
          </p>
          <button className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
            darkMode
              ? "bg-zinc-700 text-white hover:bg-zinc-600"
              : "bg-zinc-100 text-zinc-900 hover:bg-zinc-200"
          }`}>
            Create an account
          </button>
        </motion.div>

        {/* Review & Confirm */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className={`rounded-2xl p-6 sm:p-8 mb-6 ${
            darkMode ? "bg-zinc-800" : "bg-white"
          } shadow-lg`}
        >
          <h3 className={`text-lg font-bold mb-4 ${
            darkMode ? "text-white" : "text-zinc-900"
          }`}>
            Review your annual giving
          </h3>

          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between py-2">
              <span className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                Annual donation on {anniversaryDate || "selected date"}
              </span>
              <span className={`font-semibold ${darkMode ? "text-white" : "text-zinc-900"}`}>
                -
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                Giving amount
              </span>
              <span className={`font-semibold ${darkMode ? "text-white" : "text-zinc-900"}`}>
                ₹{customAmount || amount}
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                Platform support
              </span>
              <span className={`font-semibold ${darkMode ? "text-white" : "text-zinc-900"}`}>
                ₹{calculateTip()}
              </span>
            </div>
            <div className={`flex items-center justify-between py-3 border-t ${
              darkMode ? "border-zinc-700" : "border-zinc-200"
            }`}>
              <span className={`font-bold ${darkMode ? "text-white" : "text-zinc-900"}`}>
                Annual total
              </span>
              <span className={`text-lg font-bold ${darkMode ? "text-white" : "text-zinc-900"}`}>
                ₹{calculateTotal()}
              </span>
            </div>
          </div>

          <button
            onClick={handleConfirm}
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-lg hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl"
          >
            Confirm
          </button>

          <p className={`text-center text-xs mt-4 ${
            darkMode ? "text-zinc-500" : "text-zinc-500"
          }`}>
            By continuing, you agree to our{' '}
            <a href="#" className="underline hover:text-emerald-600">
              Policies
            </a>
          </p>
        </motion.div>

        {/* Premium Patron Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className={`rounded-2xl p-6 sm:p-8 ${
            darkMode ? "bg-zinc-800" : "bg-white"
          } shadow-lg`}
        >
          <h3 className={`text-lg font-bold mb-4 ${
            darkMode ? "text-white" : "text-zinc-900"
          }`}>
            Premium Patron Benefits
          </h3>

          <div className="space-y-4">
            {[
              { icon: Trophy, text: "Exclusive premium patron recognition badge" },
              { icon: FileText, text: "Comprehensive annual impact report with detailed analytics" },
              { icon: Sparkles, text: "Advance reminders 15 and 7 days before donation" },
              { icon: Shield, text: "Priority support and full donation management" }
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <p className={`text-sm ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                    {feature.text}
                  </p>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}