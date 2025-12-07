"use client"
import { useCreateSubscriptionMutation } from "@/utils/slices/permanentDonorApiSlice"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { 
  BarChart3,
  Heart,
  ChevronRight,
  Check,
  ArrowLeft,
  Sparkles,
  Calendar,
  Shield,
  Users,
  TrendingUp,
  Info,
  Wallet,
  HandHeart
} from "lucide-react"

export default function MonthlyChampionPage({ darkModeFromParent }) {
  const [darkMode, setDarkMode] = useState(false)
  const router = useRouter()
  const [amount, setAmount] = useState("200")
  const [customAmount, setCustomAmount] = useState("")
  const [donationDate, setDonationDate] = useState("1")
  const [countAsZakat, setCountAsZakat] = useState(false)
  const [TpfAidTip, setTpfAidTip] = useState(30)
  const [showSuccess, setShowSuccess] = useState(false)
  const [tipError, setTipError] = useState("")
  const [createSubscription, { isLoading }] = useCreateSubscriptionMutation()

  useEffect(() => {
    if (darkModeFromParent !== undefined) {
      setDarkMode(darkModeFromParent)
    }
  }, [darkModeFromParent])

  // Calculate minimum tip (15% of donation amount)
  const calculateMinimumTip = () => {
    const baseAmount = parseFloat(customAmount || amount)
    return Math.ceil((baseAmount * 15) / 100)
  }

  // Calculate recommended tips
  const getRecommendedTips = () => {
    const baseAmount = parseFloat(customAmount || amount)
    return [
      Math.ceil((baseAmount * 15) / 100),
      Math.ceil((baseAmount * 20) / 100),
      Math.ceil((baseAmount * 25) / 100),
      Math.ceil((baseAmount * 30) / 100)
    ]
  }

  // Update tip when amount changes
  useEffect(() => {
    const minTip = calculateMinimumTip()
    if (TpfAidTip < minTip) {
      setTpfAidTip(minTip)
    }
  }, [amount, customAmount])

  // Handle tip input change
  const handleTipChange = (value) => {
    const tipValue = parseFloat(value) || 0
    const minTip = calculateMinimumTip()
    
    setTpfAidTip(tipValue)
    
  
  }

  const calculateTotal = () => {
    const baseAmount = parseFloat(customAmount || amount)
    const tipAmount = parseFloat(TpfAidTip) || 0
    const total = baseAmount + tipAmount
    return total.toFixed(2)
  }

  const handleConfirm = async () => {
  const baseAmount = parseFloat(customAmount || amount)
  const minTip = calculateMinimumTip()
  
 



  try {
    const result = await createSubscription({
      planType: 'monthly',
      amount: baseAmount,
      dayOfMonth: parseInt(donationDate),
    }).unwrap()

    if (result.message || result.subscription) {
      setShowSuccess(true)
      setTimeout(() => {
        router.push('/')
      }, 2000)
    }
  } catch (err) {
    console.error('Failed to create subscription:', err)
    setTipError(err.data?.message || 'Failed to create subscription. Please try again.')
  }
}

  // Generate date options (1-30)
  const dateOptions = Array.from({ length: 30 }, (_, i) => i + 1)
  const recommendedTips = getRecommendedTips()

  return (
    <div className={`min-h-screen ${darkMode ? "bg-zinc-900" : "bg-gradient-to-br from-purple-50 via-fuchsia-50 to-pink-50"} py-8 sm:py-12`}>
      {/* Success Toast */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 
                     bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-600 text-white px-6 py-4 rounded-lg shadow-2xl 
                     flex items-center gap-3 max-w-md w-[90%] sm:w-auto"
        >
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Check className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold">Monthly Champion Activated!</p>
            <p className="text-sm text-purple-100">Taking you to dashboard...</p>
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
              : "text-purple-700 hover:text-purple-900"
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
            darkMode ? "bg-zinc-800" : "bg-gradient-to-br from-white via-purple-50/30 to-white"
          } shadow-xl border ${darkMode ? "border-zinc-700" : "border-purple-200/50"}`}
        >
          {/* Decorative Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500 to-fuchsia-500 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-pink-500 to-purple-500 rounded-full blur-3xl" />
          </div>

          {/* Content */}
          <div className="relative p-6 sm:p-8">
            {/* Icon & Badge */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 via-fuchsia-500 to-pink-500 flex items-center justify-center shadow-lg">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className={`text-3xl sm:text-4xl font-bold ${
                    darkMode ? "text-white" : "text-zinc-900"
                  }`}>
                    Monthly Champion
                  </h1>
                  <p className="text-purple-600 font-semibold text-sm sm:text-base">
                    Strategic giving
                  </p>
                </div>
              </div>
              <div className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
                <span className="text-xs font-bold text-purple-600">BEST VALUE</span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className={`text-5xl sm:text-6xl font-bold bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent`}>
                  ₹{customAmount || amount}
                </span>
                <span className={`text-xl ${darkMode ? "text-zinc-500" : "text-zinc-400"}`}>
                  /month
                </span>
              </div>
              <p className={`text-sm mt-2 ${darkMode ? "text-zinc-500" : "text-zinc-500"}`}>
                Monthly contribution
              </p>
            </div>

            {/* Description */}
            <p className={`text-sm sm:text-base leading-relaxed ${
              darkMode ? "text-zinc-400" : "text-zinc-600"
            }`}>
              Join our community of monthly champions. Your sustained support enables long-term planning and greater impact in the Ummah.
            </p>
          </div>
        </motion.div>

        {/* Amount Selection */}
        <motion.div
          id="amount-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`rounded-2xl p-6 sm:p-8 mb-6 ${
            darkMode ? "bg-zinc-800" : "bg-white"
          } shadow-lg border ${darkMode ? "border-zinc-700" : "border-purple-100"}`}
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
                darkMode ? "text-zinc-500" : "text-purple-600"
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
                    ? "bg-zinc-900 border-zinc-700 text-white placeholder-zinc-600 focus:border-purple-500"
                    : "bg-purple-50/30 border-purple-200 text-zinc-900 placeholder-zinc-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                }`}
              />
            </div>
          </div>

          {/* Zakat Checkbox */}
          <div className={`mt-4 p-4 rounded-xl border-2 ${
            countAsZakat 
              ? darkMode 
                ? "bg-purple-900/20 border-purple-500/50" 
                : "bg-purple-50 border-purple-300"
              : darkMode
              ? "bg-zinc-900 border-zinc-700"
              : "bg-gray-50 border-gray-200"
          } transition-all`}>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={countAsZakat}
                onChange={(e) => setCountAsZakat(e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-2 border-purple-400 text-purple-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-0 cursor-pointer"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`font-semibold ${
                    darkMode ? "text-white" : "text-zinc-900"
                  }`}>
                    Count this as Zakat
                  </span>
                  <Sparkles className={`w-4 h-4 ${countAsZakat ? "text-purple-500" : "text-zinc-400"}`} />
                </div>
                <p className={`text-xs leading-relaxed ${
                  darkMode ? "text-zinc-400" : "text-zinc-600"
                }`}>
                  Your contribution will be allocated to Zakat-eligible campaigns and beneficiaries only
                </p>
              </div>
            </label>
          </div>
        </motion.div>

        {/* Donation Date Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className={`rounded-2xl p-6 sm:p-8 mb-6 ${
            darkMode ? "bg-zinc-800" : "bg-white"
          } shadow-lg border ${darkMode ? "border-zinc-700" : "border-purple-100"}`}
        >
          <div className="flex items-start gap-3 mb-4">
            <Calendar className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className={`text-lg font-bold mb-2 ${
                darkMode ? "text-white" : "text-zinc-900"
              }`}>
                Choose your monthly donation date
              </h3>
              <p className={`text-sm mb-4 ${
                darkMode ? "text-zinc-400" : "text-zinc-600"
              }`}>
                Select a date between 1st-30th of each month. If the date doesn't exist in a given month, it processes on the last available day.
              </p>
            </div>
          </div>

          {/* Date Selector */}
          <select
            value={donationDate}
            onChange={(e) => setDonationDate(e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all font-semibold ${
              darkMode
                ? "bg-zinc-900 border-zinc-700 text-white focus:border-purple-500"
                : "bg-purple-50/30 border-purple-200 text-zinc-900 focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
            }`}
          >
            {dateOptions.map((date) => (
              <option key={date} value={date}>
                {date}{date === 1 ? 'st' : date === 2 ? 'nd' : date === 3 ? 'rd' : 'th'} of every month
              </option>
            ))}
          </select>
        </motion.div>

        {/* Platform Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`rounded-2xl p-6 sm:p-8 mb-6 ${
            darkMode ? "bg-zinc-800" : "bg-white"
          } shadow-lg border ${darkMode ? "border-zinc-700" : "border-purple-100"}`}
        >
          <div className="flex items-start gap-3 mb-4">
            <Heart className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
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

          {/* Platform Support Input */}
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm font-medium ${
                darkMode ? "text-zinc-400" : "text-zinc-600"
              }`}>
                Platform support amount
              </span>
            </div>

            {/* Custom Tip Input */}
            <div className="relative">
              <span className={`absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold ${
                darkMode ? "text-zinc-500" : "text-purple-600"
              }`}>
                ₹
              </span>
              <input
                type="number"
                value={TpfAidTip}
                onChange={(e) => handleTipChange(e.target.value)}
                className={`w-full pl-12 pr-4 py-3 text-xl font-bold rounded-xl border-2 outline-none transition-all ${
                  tipError
                    ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                    : darkMode
                    ? "bg-zinc-900 border-zinc-700 text-white focus:border-purple-500"
                    : "bg-purple-50/30 border-purple-200 text-zinc-900 focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                }`}
              />
            </div>

            {/* Error Message */}
            {tipError && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-red-500 flex items-center gap-1"
              >
                <Info className="w-3 h-3" />
                {tipError}
              </motion.p>
            )}

            {/* Recommended Amounts */}
            <div>
              <p className={`text-xs mb-2 ${
                darkMode ? "text-zinc-500" : "text-zinc-600"
              }`}>
                Recommended amounts:
              </p>
              <div className="grid grid-cols-4 gap-2">
                {recommendedTips.map((tipAmount, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setTpfAidTip(tipAmount)
                      setTipError("")
                    }}
                    className={`py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
                      TpfAidTip === tipAmount
                        ? "bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-500 text-white shadow-lg"
                        : darkMode
                        ? "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
                        : "bg-purple-50 text-purple-900 hover:bg-purple-100 border border-purple-200"
                    }`}
                  >
                    ₹{tipAmount}
                  </button>
                ))}
              </div>
            </div>

           
          </div>
        </motion.div>

        {/* Baitul Maal Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className={`rounded-2xl p-6 sm:p-8 mb-6 ${
            darkMode ? "bg-gradient-to-br from-zinc-800 to-zinc-800/50" : "bg-gradient-to-br from-purple-50 to-white"
          } shadow-lg border-2 ${darkMode ? "border-purple-500/20" : "border-purple-300/50"}`}
        >
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center flex-shrink-0">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className={`text-lg font-bold mb-2 ${
                darkMode ? "text-white" : "text-zinc-900"
              }`}>
                TPF's Baitul Maal
              </h3>
              <p className={`text-sm leading-relaxed mb-4 ${
                darkMode ? "text-zinc-400" : "text-zinc-600"
              }`}>
                Your platform support contribution will be added to TPF's Baitul Maal and utilized transparently for:
              </p>
            </div>
          </div>

          <div className="space-y-3 ml-13">
            {[
              { icon: Shield, text: "Platform operations & maintenance", color: "from-blue-500 to-blue-600" },
              { icon: HandHeart, text: "Medical aid for those in need", color: "from-red-500 to-pink-600" },
              { icon: Users, text: "Monthly rations for families", color: "from-green-500 to-emerald-600" },
              ...(countAsZakat ? [{ icon: Sparkles, text: "Zakat-eligible campaigns (if marked as Zakat)", color: "from-purple-500 to-fuchsia-600" }] : [])
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index} className="flex items-start gap-3">
                  <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <p className={`text-sm ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                    {item.text}
                  </p>
                </div>
              )
            })}
          </div>

          <div className={`mt-4 p-3 rounded-lg ${
            darkMode ? "bg-purple-900/20" : "bg-purple-100/50"
          } border ${darkMode ? "border-purple-500/30" : "border-purple-200"}`}>
            <p className={`text-xs ${darkMode ? "text-purple-300" : "text-purple-800"}`}>
              <Info className="w-3 h-3 inline mr-1" />
              {countAsZakat 
                ? "As this is marked as Zakat, your contribution will be used exclusively for Zakat-eligible beneficiaries and campaigns." 
                : "All funds are managed with complete transparency and accountability."}
            </p>
          </div>
        </motion.div>

        {/* Review & Confirm */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`rounded-2xl p-6 sm:p-8 mb-6 ${
            darkMode ? "bg-zinc-800" : "bg-white"
          } shadow-lg border ${darkMode ? "border-zinc-700" : "border-purple-100"}`}
        >
          <h3 className={`text-lg font-bold mb-4 ${
            darkMode ? "text-white" : "text-zinc-900"
          }`}>
            Review your monthly giving
          </h3>

          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between py-2">
              <span className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                Monthly on the {donationDate}{donationDate === '1' ? 'st' : donationDate === '2' ? 'nd' : donationDate === '3' ? 'rd' : 'th'}
              </span>
              <span className={`font-semibold ${darkMode ? "text-white" : "text-zinc-900"}`}>
                10:00 AM
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                Donation amount {countAsZakat && <span className="text-purple-600">(Zakat)</span>}
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
                ₹{TpfAidTip}
              </span>
            </div>
            <div className={`flex items-center justify-between py-3 border-t ${
              darkMode ? "border-zinc-700" : "border-purple-200"
            }`}>
              <span className={`font-bold ${darkMode ? "text-white" : "text-zinc-900"}`}>
                Monthly total
              </span>
              <span className={`text-lg font-bold bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent`}>
                ₹{calculateTotal()}
              </span>
            </div>
          </div>

        <button
  onClick={handleConfirm}
  disabled={isLoading}
  className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl ${
    isLoading
      ? "bg-zinc-400 text-zinc-200 cursor-not-allowed"
      : "bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 text-white hover:from-purple-600 hover:via-fuchsia-600 hover:to-pink-600"
  }`}
>
  {isLoading ? "Creating Subscription..." : "Confirm Monthly Giving"}
</button>

          <p className={`text-center text-xs mt-4 ${
            darkMode ? "text-zinc-500" : "text-zinc-500"
          }`}>
            By continuing, you agree to our{' '}
            <a href="#" className="underline hover:text-purple-600">
              Policies
            </a>
          </p>
        </motion.div>

        {/* Key Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className={`rounded-2xl p-6 sm:p-8 ${
            darkMode ? "bg-zinc-800" : "bg-white"
          } shadow-lg border ${darkMode ? "border-zinc-700" : "border-purple-100"}`}
        >
          <h3 className={`text-lg font-bold mb-4 ${
            darkMode ? "text-white" : "text-zinc-900"
          }`}>
            Champion Benefits
          </h3>

          <div className="space-y-4">
            {[
              { icon: Calendar, text: "Flexible monthly donation scheduling", color: "from-purple-500 to-fuchsia-500" },
              { icon: TrendingUp, text: "Detailed impact reports and analytics", color: "from-fuchsia-500 to-pink-500" },
              { icon: Users, text: "Exclusive monthly champion community", color: "from-pink-500 to-purple-500" },
              { icon: Shield, text: "Full control to pause or modify anytime", color: "from-blue-500 to-indigo-500" }
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0`}>
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