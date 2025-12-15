"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  Calendar,
  Heart,
  TrendingUp,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Zap,
  Clock,
  BarChart3,
  Award,
  X,
  Info
} from "lucide-react"
import confetti from "canvas-confetti"

export default function PermanentDonorPage({ darkModeFromParent }) {
  const [darkMode, setDarkMode] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [hoveredPlan, setHoveredPlan] = useState(null)
  const router = useRouter()
  const lastConfettiTime = useRef(0)

  useEffect(() => {
    if (darkModeFromParent !== undefined) {
      setDarkMode(darkModeFromParent)
    }
  }, [darkModeFromParent])

  const donationPlans = [
    {
      id: "daily",
      title: "Daily Sadaqah",
      subtitle: "Every day matters",
      frequency: "Daily",
      islamicQuote: "Give charity without delay",
      islamicQuoteTranslation: "The best charity is that given regularly",
      description: "Transform lives with consistent daily contributions. Make giving a daily habit and protect yourself through regular charity.",
      features: [
        "Automated daily donations at 9:00 AM",
        "Flexible amount from ₹10 onwards",
        "Pause or modify anytime",
        "Daily impact notifications"
      ],
      rules: "Your chosen amount will be automatically deducted every day. You maintain full control to pause, adjust, or cancel from your dashboard at any time.",
      badge: "Most Active",
      color: {
        gradient: darkMode => darkMode
          ? "from-blue-500 via-indigo-500 to-violet-500"
          : "from-blue-400 via-indigo-400 to-violet-400",
        solid: darkMode => darkMode ? "bg-blue-500" : "bg-blue-500",
        light: darkMode => darkMode ? "bg-blue-950/20" : "bg-blue-50",
        border: darkMode => darkMode ? "border-blue-500/30" : "border-blue-300",
        text: darkMode => darkMode ? "text-blue-400" : "text-blue-600",
        glow: darkMode => darkMode
          ? "shadow-[0_0_40px_rgba(59,130,246,0.4)]"
          : "shadow-[0_0_40px_rgba(59,130,246,0.3)]"
      },
      icon: Zap,
      rotation: -18,
      zIndex: 1,
      translateX: -80
    },
    {
      id: "weekly",
      title: "Jumu'ah Giving",
      subtitle: "Blessed Friday tradition",
      frequency: "Weekly",
      islamicQuote: "Friday - The Best Day",
      islamicQuoteTranslation: "Give on the most blessed day of the week",
      description: "Honor the blessed day of Jumu'ah with your weekly sadaqah. Every Friday, create lasting change and earn special blessings.",
      features: [
        "Automated donations every Friday",
        "Minimum ₹50 per week contribution",
        "Comprehensive weekly impact reports",
        "Priority campaign updates"
      ],
      rules: "Donations are automatically processed every Friday at 9:00 AM. You can modify the amount or pause the subscription anytime through your account settings.",
      badge: "Most Blessed",
      color: {
        gradient: darkMode => darkMode
          ? "from-yellow-500 via-yellow-400 to-amber-400"
          : "from-yellow-600 via-yellow-500 to-amber-500",
        solid: darkMode => darkMode ? "bg-yellow-500" : "bg-yellow-500",
        light: darkMode => darkMode ? "bg-yellow-900/20" : "bg-yellow-50",
        border: darkMode => darkMode ? "border-yellow-500/50" : "border-yellow-500",
        text: darkMode => darkMode ? "text-yellow-400" : "text-yellow-700",
        glow: darkMode => darkMode
          ? "shadow-[0_0_50px_rgba(234,179,8,0.6)]"
          : "shadow-[0_0_50px_rgba(234,179,8,0.5)]"
      },
      icon: Clock,
      rotation: -6,
      zIndex: 4,
      translateX: -30,
      isSpecial: true
    },
    {
      id: "monthly",
      title: "Monthly Champion",
      subtitle: "Strategic giving",
      frequency: "Monthly",
      islamicQuote: "Consistent Giving",
      islamicQuoteTranslation: "Regular charity brings abundant blessings",
      description: "Join our community of monthly champions. Your sustained support enables long-term planning and brings barakah through consistency.",
      features: [
        "Monthly donations on preferred date",
        "Choose date between 1st-30th",
        "Detailed monthly impact summaries",
        "Exclusive donor community access"
      ],
      rules: "Your contribution is processed on your chosen date each month. If the date doesn't exist in a given month, it processes on the last available day.",
      badge: "Best Value",
      color: {
        gradient: darkMode => darkMode
          ? "from-purple-500 via-fuchsia-500 to-pink-500"
          : "from-purple-400 via-fuchsia-400 to-pink-400",
        solid: darkMode => darkMode ? "bg-purple-500" : "bg-purple-500",
        light: darkMode => darkMode ? "bg-purple-950/20" : "bg-purple-50",
        border: darkMode => darkMode ? "border-purple-500/30" : "border-purple-300",
        text: darkMode => darkMode ? "text-purple-400" : "text-purple-600",
        glow: darkMode => darkMode
          ? "shadow-[0_0_40px_rgba(168,85,247,0.4)]"
          : "shadow-[0_0_40px_rgba(168,85,247,0.3)]"
      },
      icon: BarChart3,
      rotation: 6,
      zIndex: 2,
      translateX: 30
    },
    {
      id: "yearly",
      title: "Annual Sadaqah Jariyah",
      subtitle: "Continuous rewards",
      frequency: "Yearly",
      islamicQuote: "Ongoing Charity",
      islamicQuoteTranslation: "Charity that continues to benefit after you",
      description: "Make a significant annual commitment with continuous rewards. Give once and earn rewards that keep multiplying.",
      features: [
        "Single annual contribution",
        "Choose your donation anniversary",
        "Comprehensive annual impact report",
        "Premium patron recognition"
      ],
      rules: "One annual donation on your selected date. You'll receive advance reminders 15 and 7 days before the scheduled date. Includes all premium donor benefits.",
      badge: "Premium",
      color: {
        gradient: darkMode => darkMode
          ? "from-emerald-500 via-teal-500 to-cyan-500"
          : "from-emerald-400 via-teal-400 to-cyan-400",
        solid: darkMode => darkMode ? "bg-emerald-500" : "bg-emerald-500",
        light: darkMode => darkMode ? "bg-emerald-950/20" : "bg-emerald-50",
        border: darkMode => darkMode ? "border-emerald-500/30" : "border-emerald-300",
        text: darkMode => darkMode ? "text-emerald-400" : "text-emerald-600",
        glow: darkMode => darkMode
          ? "shadow-[0_0_40px_rgba(16,185,129,0.4)]"
          : "shadow-[0_0_40px_rgba(16,185,129,0.3)]"
      },
      icon: Award,
      rotation: 18,
      zIndex: 3,
      translateX: 80
    }
  ]

  const handleMouseEnter = (planId) => {
    if (!selectedPlan) {
      setHoveredPlan(planId);

      if (planId === 'weekly') {
        const now = Date.now();
        if (now - lastConfettiTime.current > 2 * 60 * 1000) { // 2 minutes
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FFD700', '#FFA500', '#FF4500'], // Gold/Orange colors
            disableForReducedMotion: true
          });
          lastConfettiTime.current = now;
        }
      }
    }
  }

  const handlePlanClick = (plan) => {
    setSelectedPlan(plan)
  }

  const handleClose = () => {
    setSelectedPlan(null)
  }

  const handleProceed = (route) => {
    router.push(route)
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] animate-[spin_60s_linear_infinite]"
        >
          <div className={`absolute top-0 left-1/2 w-1 h-full origin-top ${darkMode
              ? 'bg-gradient-to-b from-emerald-500/40 via-emerald-500/10 to-transparent'
              : 'bg-gradient-to-b from-emerald-500/50 via-emerald-500/20 to-transparent'
            }`} style={{ transform: 'rotate(0deg)' }} />
          <div className={`absolute top-0 left-1/2 w-1 h-full origin-top ${darkMode
              ? 'bg-gradient-to-b from-blue-500/40 via-blue-500/10 to-transparent'
              : 'bg-gradient-to-b from-blue-500/50 via-blue-500/20 to-transparent'
            }`} style={{ transform: 'rotate(72deg)' }} />
          <div className={`absolute top-0 left-1/2 w-1 h-full origin-top ${darkMode
              ? 'bg-gradient-to-b from-purple-500/40 via-purple-500/10 to-transparent'
              : 'bg-gradient-to-b from-purple-500/50 via-purple-500/20 to-transparent'
            }`} style={{ transform: 'rotate(144deg)' }} />
          <div className={`absolute top-0 left-1/2 w-1 h-full origin-top ${darkMode
              ? 'bg-gradient-to-b from-teal-500/40 via-teal-500/10 to-transparent'
              : 'bg-gradient-to-b from-teal-500/50 via-teal-500/20 to-transparent'
            }`} style={{ transform: 'rotate(216deg)' }} />
          <div className={`absolute top-0 left-1/2 w-1 h-full origin-top ${darkMode
              ? 'bg-gradient-to-b from-pink-500/40 via-pink-500/10 to-transparent'
              : 'bg-gradient-to-b from-pink-500/50 via-pink-500/20 to-transparent'
            }`} style={{ transform: 'rotate(288deg)' }} />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-8"
        >


          <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'
            }`}>
            Choose Your{' '}
            <span className={`bg-gradient-to-r ${darkMode
                ? 'from-emerald-400 via-teal-400 to-cyan-400'
                : 'from-emerald-600 via-teal-600 to-cyan-600'
              } bg-clip-text text-transparent`}>
              Giving Plan
            </span>
          </h1>

          <p className={`text-base max-w-2xl mx-auto mb-2 ${darkMode ? 'text-zinc-400' : 'text-gray-600'
            }`}>
            Select a plan to explore your continuous charity options
          </p>
        </motion.div>

        <div className="relative mb-16">
          {/* Desktop Fanned Layout */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 lg:gap-6">
            {donationPlans.map((plan, index) => {
              const Icon = plan.icon
              const isSelected = selectedPlan?.id === plan.id
              const isHovered = hoveredPlan === plan.id
              const othersSelected = selectedPlan && selectedPlan.id !== plan.id

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: othersSelected ? 0.3 : 1,
                    y: 0,
                    scale: isHovered ? 1.05 : 1,
                    rotateY: isHovered ? 5 : 0,
                    z: isHovered ? 50 : 0
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: index * 0.05
                  }}
                  onMouseEnter={() => handleMouseEnter(plan.id)}
                  onMouseLeave={() => setHoveredPlan(null)}
                  onClick={() => !selectedPlan && handlePlanClick(plan)}
                  className={`cursor-pointer h-full ${othersSelected ? 'pointer-events-none' : ''}`}
                  style={{
                    transformStyle: 'preserve-3d',
                    perspective: '1000px'
                  }}
                >
                  <div className={`relative rounded-3xl overflow-hidden border-2 transition-all duration-200 h-full flex flex-col ${darkMode
                      ? `bg-gradient-to-br from-zinc-900 via-zinc-900/95 to-zinc-900/90 backdrop-blur-xl ${plan.color.border(darkMode)}`
                      : `bg-gradient-to-br from-white via-gray-50/50 to-white backdrop-blur-xl ${plan.color.border(darkMode)}`
                    } ${isHovered || isSelected ? plan.color.glow(darkMode) : 'shadow-2xl'} ${plan.isSpecial ? 'ring-4 ring-yellow-400/30 scale-105' : ''
                    }`}>

                    {/* Shine Effect on Hover */}
                    {isHovered && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ duration: 0.3 }}
                      />
                    )}

                    <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${plan.color.gradient(darkMode)}`} />

                    <div className="absolute top-4 right-4 z-10">
                      <motion.div
                        animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ repeat: isHovered ? Infinity : 0, duration: 2 }}
                        className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${darkMode
                            ? "bg-zinc-900/80 text-white"
                            : "bg-white/80 text-gray-900"
                          }`}
                      >
                        {plan.badge}
                      </motion.div>
                    </div>

                    <div className="relative p-8 flex flex-col flex-1">
                      <motion.div
                        animate={isHovered ? { rotate: [0, 5, -5, 0] } : {}}
                        transition={{ duration: 0.25 }}
                        className={`inline-flex p-4 rounded-2xl mb-4 bg-gradient-to-br ${plan.color.gradient(darkMode)} self-start`}
                      >
                        <Icon className="w-10 h-10 text-white" strokeWidth={2} />
                      </motion.div>

                      <h3 className={`text-2xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                        {plan.title}
                      </h3>

                      <p className={`text-sm font-semibold mb-3 ${plan.color.text(darkMode)}`}>
                        {plan.subtitle}
                      </p>

                      {/* Islamic Message */}
                      <div className={`mb-4 p-3 rounded-lg ${plan.color.light(darkMode)}`}>
                        <p className={`text-sm font-semibold mb-1 ${plan.color.text(darkMode)}`}>
                          {plan.islamicQuote}
                        </p>
                        <p className={`text-xs italic ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                          {plan.islamicQuoteTranslation}
                        </p>
                      </div>

                      <p className={`text-sm leading-relaxed flex-1 ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                        {plan.description}
                      </p>

                      {!isSelected && (
                        <motion.div
                          animate={isHovered ? { x: [0, 5, 0] } : {}}
                          transition={{ repeat: isHovered ? Infinity : 0, duration: 1.5 }}
                          className={`mt-6 flex items-center justify-center gap-2 text-xs font-semibold ${plan.color.text(darkMode)}`}
                        >
                          <span>Click to explore</span>
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Mobile Stacked Layout */}
          <div className="block md:hidden space-y-6">
            {donationPlans.map((plan, index) => {
              const Icon = plan.icon

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handlePlanClick(plan)}
                  className="cursor-pointer"
                >
                  <div className={`relative rounded-3xl overflow-hidden border-2 transition-all duration-300 ${darkMode
                      ? `bg-gradient-to-br from-zinc-900 via-zinc-900/95 to-zinc-900/90 backdrop-blur-xl ${plan.color.border(darkMode)}`
                      : `bg-gradient-to-br from-white via-gray-50/50 to-white backdrop-blur-xl ${plan.color.border(darkMode)}`
                    } shadow-2xl active:scale-[0.98] ${plan.isSpecial ? 'ring-4 ring-yellow-400/30 scale-105' : ''
                    }`}>
                    <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${plan.color.gradient(darkMode)}`} />
                    <div className="absolute top-4 right-4 z-10">
                      <div className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${darkMode ? "bg-zinc-900/80 text-white" : "bg-white/80 text-gray-900"
                        }`}>
                        {plan.badge}
                      </div>
                    </div>
                    <div className="relative p-8">
                      <div className={`inline-flex p-4 rounded-2xl mb-4 bg-gradient-to-br ${plan.color.gradient(darkMode)}`}>
                        <Icon className="w-10 h-10 text-white" strokeWidth={2} />
                      </div>
                      <h3 className={`text-2xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                        {plan.title}
                      </h3>
                      <p className={`text-sm font-semibold mb-3 ${plan.color.text(darkMode)}`}>
                        {plan.subtitle}
                      </p>

                      {/* Islamic Message */}
                      <div className={`mb-4 p-3 rounded-lg ${plan.color.light(darkMode)}`}>
                        <p className={`text-sm font-semibold mb-1 ${plan.color.text(darkMode)}`}>
                          {plan.islamicQuote}
                        </p>
                        <p className={`text-xs italic ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                          {plan.islamicQuoteTranslation}
                        </p>
                      </div>

                      <p className={`text-sm leading-relaxed ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                        {plan.description}
                      </p>
                      <div className={`mt-6 flex items-center justify-center gap-2 text-xs font-semibold ${plan.color.text(darkMode)}`}>
                        <span>Tap to explore</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Expanded Plan Details Modal */}
        <AnimatePresence>
          {selectedPlan && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4 pt-44 md:pt-20"
              onClick={handleClose}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
                className={`relative max-w-3xl w-full max-h-[85vh] overflow-y-auto rounded-3xl border-2 scrollbar-hide ${darkMode
                    ? `bg-zinc-900 ${selectedPlan.color.border(darkMode)}`
                    : `bg-white ${selectedPlan.color.border(darkMode)}`
                  } ${selectedPlan.color.glow(darkMode)}`}
              >
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className={`absolute top-6 right-6 p-2 rounded-full transition-colors z-10 ${darkMode
                      ? "bg-zinc-800 hover:bg-zinc-700 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                    }`}
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="p-8">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${selectedPlan.color.gradient(darkMode)}`}>
                      {(() => {
                        const Icon = selectedPlan.icon
                        return <Icon className="w-12 h-12 text-white" strokeWidth={2} />
                      })()}
                    </div>
                    <div className="flex-1">
                      <h2 className={`text-4xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                        {selectedPlan.title}
                      </h2>
                      <p className={`text-lg font-semibold ${selectedPlan.color.text(darkMode)}`}>
                        {selectedPlan.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Islamic Message */}
                  <div className={`p-6 rounded-2xl mb-6 ${selectedPlan.color.light(darkMode)} border ${selectedPlan.color.border(darkMode)}`}>
                    <p className={`text-lg font-semibold mb-2 ${selectedPlan.color.text(darkMode)}`}>
                      {selectedPlan.islamicQuote}
                    </p>
                    <p className={`text-center text-sm italic ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                      {selectedPlan.islamicQuoteTranslation}
                    </p>
                  </div>

                  {/* Description */}
                  <p className={`text-base leading-relaxed mb-6 ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                    {selectedPlan.description}
                  </p>

                  {/* Features */}
                  <div className="mb-6">
                    <h3 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                      What's Included
                    </h3>
                    <div className="space-y-3">
                      {selectedPlan.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle2 className={`w-5 h-5 mt-0.5 flex-shrink-0 ${selectedPlan.color.text(darkMode)}`} strokeWidth={2} />
                          <span className={`text-sm ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Rules */}
                  <div className={`p-5 rounded-xl mb-6 border ${darkMode
                      ? "bg-zinc-800/40 border-zinc-700"
                      : "bg-gray-50 border-gray-200"
                    }`}>
                    <h4 className={`text-sm font-bold mb-2 uppercase tracking-wide ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                      How it works
                    </h4>
                    <p className={`text-sm leading-relaxed ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                      {selectedPlan.rules}
                    </p>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex gap-4">
                    <button
                      onClick={handleClose}
                      className={`flex-1 py-4 px-6 rounded-xl font-semibold cursor-pointer transition-all border-2 ${darkMode
                          ? "border-zinc-700 text-white hover:bg-zinc-800"
                          : "border-gray-300 text-gray-900 hover:bg-gray-50"
                        }`}
                    >
                      Back to Plans
                    </button>
                    <button
                      onClick={() => handleProceed(`/permanent-donor/${selectedPlan.id}`)}
                      className={`flex-1 py-4 px-6 rounded-xl font-semibold text-white transition-all shadow-xl hover:shadow-2xl flex items-center justify-center cursor-pointer gap-2 bg-gradient-to-r ${selectedPlan.color.gradient(darkMode)}`}
                    >
                      Continue
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <div className="text-center mb-8">
            <h2 className={`text-2xl sm:text-3xl font-bold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Why Choose Continuous Giving?
            </h2>
            <p className={`text-sm ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
              Charity extinguishes sin as water extinguishes fire
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`p-8 rounded-2xl border-2 text-center transition-all duration-300 ${darkMode
                  ? "bg-gradient-to-br from-zinc-900/80 to-zinc-900/50 border-zinc-800 hover:border-emerald-500/30"
                  : "bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-emerald-300 shadow-lg hover:shadow-xl"
                }`}
            >
              <div className={`inline-flex p-4 rounded-2xl mb-4 ${darkMode ? "bg-emerald-500/10" : "bg-emerald-100"
                }`}>
                <Heart className={`w-10 h-10 ${darkMode ? "text-emerald-400" : "text-emerald-600"}`} strokeWidth={2} />
              </div>
              <h3 className={`text-xl font-bold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Full Flexibility
              </h3>
              <p className={`text-base leading-relaxed mb-3 ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                Pause, modify, or cancel anytime. No commitments, no questions asked.
              </p>
              <p className={`text-xs italic ${darkMode ? "text-zinc-500" : "text-gray-500"}`}>
                There is no compulsion in religion
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`p-8 rounded-2xl border-2 text-center transition-all duration-300 ${darkMode
                  ? "bg-gradient-to-br from-zinc-900/80 to-zinc-900/50 border-zinc-800 hover:border-teal-500/30"
                  : "bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-teal-300 shadow-lg hover:shadow-xl"
                }`}
            >
              <div className={`inline-flex p-4 rounded-2xl mb-4 ${darkMode ? "bg-teal-500/10" : "bg-teal-100"
                }`}>
                <TrendingUp className={`w-10 h-10 ${darkMode ? "text-teal-400" : "text-teal-600"}`} strokeWidth={2} />
              </div>
              <h3 className={`text-xl font-bold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Complete Transparency
              </h3>
              <p className={`text-base leading-relaxed mb-3 ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                Track every rupee. Detailed reports show exactly how your money helps.
              </p>
              <p className={`text-xs italic ${darkMode ? "text-zinc-500" : "text-gray-500"}`}>
                Allah does not waste the reward of the good-doers
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`p-8 rounded-2xl border-2 text-center transition-all duration-300 ${darkMode
                  ? "bg-gradient-to-br from-zinc-900/80 to-zinc-900/50 border-zinc-800 hover:border-cyan-500/30"
                  : "bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-cyan-300 shadow-lg hover:shadow-xl"
                }`}
            >
              <div className={`inline-flex p-4 rounded-2xl mb-4 ${darkMode ? "bg-cyan-500/10" : "bg-cyan-100"
                }`}>
                <Sparkles className={`w-10 h-10 ${darkMode ? "text-cyan-400" : "text-cyan-600"}`} strokeWidth={2} />
              </div>
              <h3 className={`text-xl font-bold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Tax Benefits Included
              </h3>
              <p className={`text-base leading-relaxed mb-3 ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                Automatic 80G receipts for all donations. Maximize your tax savings.
              </p>
              <p className={`text-xs italic ${darkMode ? "text-zinc-500" : "text-gray-500"}`}>
                Whatever you spend of good is for yourselves
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}