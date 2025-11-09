"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
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

export default function PermanentDonorPage({ darkModeFromParent }) {
  const [darkMode, setDarkMode] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [hoveredCard, setHoveredCard] = useState(null)
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (darkModeFromParent !== undefined) {
      setDarkMode(darkModeFromParent)
    }
  }, [darkModeFromParent])
  
  const handleScroll = (e) => {
  const element = e.target
  const isAtBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 50
  setShowScrollIndicator(!isAtBottom)
}

  const donationPlans = [
    {
      id: "daily",
      title: "Daily Impact",
      subtitle: "Every day matters",
      frequency: "Daily",
      minAmount: "₹10",
      period: "/day",
      description: "Transform lives with consistent daily contributions. Perfect for those who want to make giving a daily habit.",
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
          ? "from-amber-500 via-orange-500 to-red-500" 
          : "from-amber-400 via-orange-400 to-red-400",
        solid: darkMode => darkMode ? "bg-amber-500" : "bg-amber-500",
        light: darkMode => darkMode ? "bg-amber-950/20" : "bg-amber-50",
        border: darkMode => darkMode ? "border-amber-500/30" : "border-amber-300",
        text: darkMode => darkMode ? "text-amber-400" : "text-amber-600",
        glow: darkMode => darkMode 
          ? "shadow-[0_0_30px_rgba(251,191,36,0.3)]" 
          : "shadow-[0_0_30px_rgba(251,191,36,0.2)]"
      },
      icon: Zap,
      rotation: -18,
     zIndex: 1,
    translateX: -80
    },
    {
      id: "weekly",
      title: "Weekly Support",
      subtitle: "Consistent & reliable",
      frequency: "Weekly",
      minAmount: "₹50",
      period: "/week",
      description: "Build sustainable impact with weekly contributions. Every Friday, your donation supports ongoing initiatives and creates lasting change.",
      features: [
        "Automated donations every Friday",
        "Minimum ₹50 per week contribution",
        "Comprehensive weekly impact reports",
        "Priority campaign updates"
      ],
      rules: "Donations are automatically processed every Friday at 9:00 AM. You can modify the amount or pause the subscription anytime through your account settings.",
      badge: "Most Popular",
      color: {
        gradient: darkMode => darkMode 
          ? "from-blue-500 via-indigo-500 to-purple-500" 
          : "from-blue-400 via-indigo-400 to-purple-400",
        solid: darkMode => darkMode ? "bg-blue-500" : "bg-blue-500",
        light: darkMode => darkMode ? "bg-blue-950/20" : "bg-blue-50",
        border: darkMode => darkMode ? "border-blue-500/30" : "border-blue-300",
        text: darkMode => darkMode ? "text-blue-400" : "text-blue-600",
        glow: darkMode => darkMode 
          ? "shadow-[0_0_30px_rgba(59,130,246,0.3)]" 
          : "shadow-[0_0_30px_rgba(59,130,246,0.2)]"
      },
      icon: Clock,
    rotation: -6,  // Changed from -4
    zIndex: 2,
    translateX: -30 
    },
    {
      id: "monthly",
      title: "Monthly Champion",
      subtitle: "Strategic giving",
      frequency: "Monthly",
      minAmount: "₹200",
      period: "/month",
      description: "Join our community of monthly champions. Your sustained support enables long-term planning and greater impact.",
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
          ? "shadow-[0_0_30px_rgba(168,85,247,0.3)]" 
          : "shadow-[0_0_30px_rgba(168,85,247,0.2)]"
      },
      icon: BarChart3,
       rotation: 6,  // Changed from 4
    zIndex: 2,
    translateX: 30
    },
    {
      id: "yearly",
      title: "Annual Patron",
      subtitle: "Maximum impact",
      frequency: "Yearly",
      minAmount: "₹2,000",
      period: "/year",
      description: "Make a significant annual commitment. Ideal for those planning larger contributions with premium recognition and benefits.",
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
          ? "shadow-[0_0_30px_rgba(16,185,129,0.3)]" 
          : "shadow-[0_0_30px_rgba(16,185,129,0.2)]"
      },
      icon: Award,
      rotation: 18,  // Changed from 12
    zIndex: 3,
    translateX: 80 
    }
  ]

  const handleCardClick = (plan) => {
    setSelectedCard(plan)
  }

  const handleClose = () => {
    setSelectedCard(null)
  }

  const handleProceed = (route) => {
    router.push(route)
  }

  return (


    
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced Background */}
      {/* Spotlight Beams */}
<div className="absolute inset-0 overflow-hidden pointer-events-none">
  <motion.div
    animate={{
      rotate: [0, 360],
    }}
    transition={{
      duration: 25,
      repeat: Infinity,
      ease: "linear",
    }}
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
  >
    <div className={`absolute top-0 left-1/2 w-1 h-full origin-top ${
      darkMode 
        ? 'bg-gradient-to-b from-emerald-500/40 via-emerald-500/10 to-transparent' 
        : 'bg-gradient-to-b from-emerald-500/50 via-emerald-500/20 to-transparent'
    }`} style={{ transform: 'rotate(0deg)' }} />
    <div className={`absolute top-0 left-1/2 w-1 h-full origin-top ${
      darkMode 
        ? 'bg-gradient-to-b from-blue-500/40 via-blue-500/10 to-transparent' 
        : 'bg-gradient-to-b from-blue-500/50 via-blue-500/20 to-transparent'
    }`} style={{ transform: 'rotate(72deg)' }} />
    <div className={`absolute top-0 left-1/2 w-1 h-full origin-top ${
      darkMode 
        ? 'bg-gradient-to-b from-purple-500/40 via-purple-500/10 to-transparent' 
        : 'bg-gradient-to-b from-purple-500/50 via-purple-500/20 to-transparent'
    }`} style={{ transform: 'rotate(144deg)' }} />
    <div className={`absolute top-0 left-1/2 w-1 h-full origin-top ${
      darkMode 
        ? 'bg-gradient-to-b from-teal-500/40 via-teal-500/10 to-transparent' 
        : 'bg-gradient-to-b from-teal-500/50 via-teal-500/20 to-transparent'
    }`} style={{ transform: 'rotate(216deg)' }} />
    <div className={`absolute top-0 left-1/2 w-1 h-full origin-top ${
      darkMode 
        ? 'bg-gradient-to-b from-pink-500/40 via-pink-500/10 to-transparent' 
        : 'bg-gradient-to-b from-pink-500/50 via-pink-500/20 to-transparent'
    }`} style={{ transform: 'rotate(288deg)' }} />
  </motion.div>
</div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-12">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-6 mt-15 md:mt-0">
            <motion.div 
              animate={{ scaleX: [0, 1] }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`h-1.5 w-16 rounded-full bg-gradient-to-r ${
                darkMode ? 'from-emerald-500 to-teal-400' : 'from-emerald-600 to-teal-500'
              }`} 
            />
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={`text-sm font-bold tracking-wider uppercase px-4 py-1.5 rounded-full ${
                darkMode 
                  ? 'text-emerald-300 bg-emerald-500/10 border border-emerald-500/20' 
                  : 'text-emerald-700 bg-emerald-100 border border-emerald-200'
              }`}
            >
              Sustainable Giving
            </motion.span>
            <motion.div 
              animate={{ scaleX: [0, 1] }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`h-1.5 w-16 rounded-full bg-gradient-to-l ${
                darkMode ? 'from-emerald-500 to-teal-400' : 'from-emerald-600 to-teal-500'
              }`} 
            />
          </div>
          
          <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-5 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Choose Your{' '}
            <span className={`bg-gradient-to-r ${
              darkMode 
                ? 'from-emerald-400 via-teal-400 to-cyan-400' 
                : 'from-emerald-600 via-teal-600 to-cyan-600'
            } bg-clip-text text-transparent`}>
              Giving Plan
            </span>
          </h1>
          
          <p className={`text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed mb-4 ${
            darkMode ? 'text-zinc-300' : 'text-gray-700'
          }`}>
            Select a card to explore your giving options
          </p>
          
          <div className="flex items-center justify-center gap-2 text-sm">
            <Info className={`w-4 h-4 ${darkMode ? 'text-zinc-500' : 'text-gray-500'}`} />
            <span className={darkMode ? 'text-zinc-500' : 'text-gray-500'}>
              Click any card to see details
            </span>
          </div>
        </motion.div>

      {/* Card Deck - Fanned Out (Desktop) / Stacked (Mobile) */}
<div className="relative mb-16">
  {/* Desktop Fanned Layout */}
  <div className="hidden md:flex md:items-center md:justify-center md:h-[600px]">
    <div className="relative w-full max-w-5xl h-[500px]">
      {donationPlans.map((plan, index) => {
        const Icon = plan.icon
        const isSelected = selectedCard?.id === plan.id
        const isHovered = hoveredCard === plan.id
        const othersSelected = selectedCard && selectedCard.id !== plan.id

        return (
          <motion.div
            key={plan.id}
            initial={{ 
              x: plan.translateX,
              y: 0,
              rotate: plan.rotation,
              scale: 0.9,
              opacity: 0
            }}
            animate={{
              x: isSelected ? 0 : othersSelected ? (index < 2 ? -500 : 500) : plan.translateX,
              y: isSelected ? 0 : othersSelected ? 150 : 0,
              rotate: isSelected ? 0 : othersSelected ? plan.rotation * 2 : isHovered ? plan.rotation * 0.5 : plan.rotation,
              scale: isSelected ? 1 : othersSelected ? 0.6 : isHovered ? 0.95 : 0.88,
              opacity: isSelected ? 1 : othersSelected ? 0.2 : 1,
              zIndex: isSelected ? 50 : isHovered ? 40 : plan.zIndex
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              delay: isSelected ? 0 : index * 0.1
            }}
            onMouseEnter={() => !selectedCard && setHoveredCard(plan.id)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => !selectedCard && handleCardClick(plan)}
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] cursor-pointer ${
              othersSelected ? 'pointer-events-none blur-sm' : ''
            }`}
            style={{
              transformOrigin: 'center bottom'
            }}
          >
            {/* Keep all your existing card JSX here - don't change anything */}
            <div className={`relative rounded-3xl overflow-hidden border-2 transition-all duration-300 ${
              darkMode 
                ? `bg-gradient-to-br from-zinc-900 via-zinc-900/95 to-zinc-900/90 backdrop-blur-xl ${plan.color.border(darkMode)}` 
                : `bg-gradient-to-br from-white via-gray-50/50 to-white backdrop-blur-xl ${plan.color.border(darkMode)}`
            } ${isHovered || isSelected ? plan.color.glow(darkMode) : 'shadow-2xl'}`}>
              
              <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${plan.color.gradient(darkMode)}`} />

              <div className="absolute top-4 right-4 z-10">
                <div className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${
                  darkMode
                    ? "bg-zinc-900/80 text-white"
                    : "bg-white/80 text-gray-900"
                }`}>
                  {plan.badge}
                </div>
              </div>

              <div className="relative p-8">
                <div className={`inline-flex p-4 rounded-2xl mb-4 bg-gradient-to-br ${plan.color.gradient(darkMode)}`}>
                  <Icon className="w-10 h-10 text-white" strokeWidth={2} />
                </div>
                
                <h3 className={`text-3xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {plan.title}
                </h3>
                
                <p className={`text-sm font-semibold mb-4 ${plan.color.text(darkMode)}`}>
                  {plan.subtitle}
                </p>

                <div className="flex items-end gap-2 mb-6">
                  <span className={`text-5xl font-bold bg-gradient-to-r ${plan.color.gradient(darkMode)} bg-clip-text text-transparent`}>
                    {plan.minAmount}
                  </span>
                  <span className={`text-lg font-semibold mb-1 ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                    {plan.period}
                  </span>
                </div>

                <p className={`text-sm leading-relaxed ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                  {plan.description}
                </p>

                {!isSelected && (
                  <div className={`mt-6 flex items-center justify-center gap-2 text-xs font-semibold ${plan.color.text(darkMode)}`}>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      Click to explore
                    </motion.div>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
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
          transition={{ delay: index * 0.1 }}
          onClick={() => handleCardClick(plan)}
          className="cursor-pointer"
        >
          <div className={`relative rounded-3xl overflow-hidden border-2 transition-all duration-300 ${
            darkMode 
              ? `bg-gradient-to-br from-zinc-900 via-zinc-900/95 to-zinc-900/90 backdrop-blur-xl ${plan.color.border(darkMode)}` 
              : `bg-gradient-to-br from-white via-gray-50/50 to-white backdrop-blur-xl ${plan.color.border(darkMode)}`
          } shadow-2xl active:scale-[0.98]`}>
            <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${plan.color.gradient(darkMode)}`} />
            <div className="absolute top-4 right-4 z-10">
              <div className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${
                darkMode ? "bg-zinc-900/80 text-white" : "bg-white/80 text-gray-900"
              }`}>
                {plan.badge}
              </div>
            </div>
            <div className="relative p-8">
              <div className={`inline-flex p-4 rounded-2xl mb-4 bg-gradient-to-br ${plan.color.gradient(darkMode)}`}>
                <Icon className="w-10 h-10 text-white" strokeWidth={2} />
              </div>
              <h3 className={`text-3xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                {plan.title}
              </h3>
              <p className={`text-sm font-semibold mb-4 ${plan.color.text(darkMode)}`}>
                {plan.subtitle}
              </p>
              <div className="flex items-end gap-2 mb-6">
                <span className={`text-5xl font-bold bg-gradient-to-r ${plan.color.gradient(darkMode)} bg-clip-text text-transparent`}>
                  {plan.minAmount}
                </span>
                <span className={`text-lg font-semibold mb-1 ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                  {plan.period}
                </span>
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

        {/* Expanded Card Details Modal */}
        <AnimatePresence>
          {selectedCard && (
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
  transition={{ type: "spring", stiffness: 300, damping: 30 }}
  onClick={(e) => e.stopPropagation()}
  onScroll={handleScroll}
  className={`relative max-w-3xl w-full max-h-[85vh] overflow-y-auto rounded-3xl border-2 scrollbar-hide ${
    darkMode 
      ? `bg-zinc-900 ${selectedCard.color.border(darkMode)}` 
      : `bg-white ${selectedCard.color.border(darkMode)}`
  } ${selectedCard.color.glow(darkMode)}`}
>

  {/* Scroll Indicator */}
  {showScrollIndicator && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
    >
    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
      className={`flex flex-col items-center gap-1 px-4 py-2 rounded-full backdrop-blur-sm ${
        darkMode ? 'bg-zinc-900/80' : 'bg-white/80'
      }`}
    >
      <span className={`text-xs font-medium ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
        Scroll for more
      </span>
      <ArrowRight className={`w-4 h-4 rotate-90 ${selectedCard.color.text(darkMode)}`} />
    </motion.div>
  </motion.div>

  )}
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className={`absolute top-6 right-6 p-2 rounded-full transition-colors z-10 ${
                    darkMode 
                      ? "bg-zinc-800 hover:bg-zinc-700 text-white" 
                      : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="p-8">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${selectedCard.color.gradient(darkMode)}`}>
                      {(() => {
                        const Icon = selectedCard.icon
                        return <Icon className="w-12 h-12 text-white" strokeWidth={2} />
                      })()}
                    </div>
                    <div className="flex-1">
                      <h2 className={`text-4xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                        {selectedCard.title}
                      </h2>
                      <p className={`text-lg font-semibold ${selectedCard.color.text(darkMode)}`}>
                        {selectedCard.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className={`p-6 rounded-2xl mb-6 ${selectedCard.color.light(darkMode)}`}>
                    <div className="flex items-end justify-center gap-2">
                      <span className={`text-6xl font-bold bg-gradient-to-r ${selectedCard.color.gradient(darkMode)} bg-clip-text text-transparent`}>
                        {selectedCard.minAmount}
                      </span>
                      <span className={`text-2xl font-semibold mb-2 ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                        {selectedCard.period}
                      </span>
                    </div>
                    <p className={`text-center mt-2 text-sm ${darkMode ? "text-zinc-500" : "text-gray-500"}`}>
                      {selectedCard.frequency} contribution
                    </p>
                  </div>

                  {/* Description */}
                  <p className={`text-base leading-relaxed mb-6 ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                    {selectedCard.description}
                  </p>

                  {/* Features */}
                  <div className="mb-6">
                    <h3 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                      What's Included
                    </h3>
                    <div className="space-y-3">
                      {selectedCard.features.map((feature, idx) => (
                        <motion.div 
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle2 className={`w-5 h-5 mt-0.5 flex-shrink-0 ${selectedCard.color.text(darkMode)}`} strokeWidth={2} />
                          <span className={`text-sm ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Rules */}
                  <div className={`p-5 rounded-xl mb-6 border ${
                    darkMode
                      ? "bg-zinc-800/40 border-zinc-700"
                      : "bg-gray-50 border-gray-200"
                  }`}>
                    <h4 className={`text-sm font-bold mb-2 uppercase tracking-wide ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                      How it works
                    </h4>
                    <p className={`text-sm leading-relaxed ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                      {selectedCard.rules}
                    </p>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex gap-4">
                    <button
                      onClick={handleClose}
                      className={`flex-1 py-4 px-6 rounded-xl font-semibold cursor-pointer transition-all border-2 ${
                        darkMode
                          ? "border-zinc-700 text-white hover:bg-zinc-800"
                          : "border-gray-300 text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      Back to Plans
                    </button>
                    <button
                      onClick={() => handleProceed(`/permanent-donor/${selectedCard.id}`)}
                      className={`flex-1 py-4 px-6 rounded-xl font-semibold text-white transition-all shadow-xl hover:shadow-2xl flex items-center justify-center cursor-pointer gap-2 bg-gradient-to-r ${selectedCard.color.gradient(darkMode)}`}
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
          transition={{ delay: 0.8 }}
          className="mt-16"
        >
          <div className="text-center mb-8">
            <h2 className={`text-2xl sm:text-3xl font-bold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Why Choose Permanent Giving?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              whileHover={{ y: -5 }}
              className={`p-8 rounded-2xl border-2 text-center transition-all duration-300 ${
                darkMode
                  ? "bg-gradient-to-br from-zinc-900/80 to-zinc-900/50 border-zinc-800 hover:border-emerald-500/30"
                  : "bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-emerald-300 shadow-lg hover:shadow-xl"
              }`}
            >
              <div className={`inline-flex p-4 rounded-2xl mb-4 ${
                darkMode ? "bg-emerald-500/10" : "bg-emerald-100"
              }`}>
                <Heart className={`w-10 h-10 ${darkMode ? "text-emerald-400" : "text-emerald-600"}`} strokeWidth={2} />
              </div>
              <h3 className={`text-xl font-bold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Full Flexibility
              </h3>
              <p className={`text-base leading-relaxed ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                Pause, modify, or cancel anytime. No commitments, no questions asked.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className={`p-8 rounded-2xl border-2 text-center transition-all duration-300 ${
                darkMode
                  ? "bg-gradient-to-br from-zinc-900/80 to-zinc-900/50 border-zinc-800 hover:border-teal-500/30"
                  : "bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-teal-300 shadow-lg hover:shadow-xl"
              }`}
            >
              <div className={`inline-flex p-4 rounded-2xl mb-4 ${
                darkMode ? "bg-teal-500/10" : "bg-teal-100"
              }`}>
                <TrendingUp className={`w-10 h-10 ${darkMode ? "text-teal-400" : "text-teal-600"}`} strokeWidth={2} />
              </div>
              <h3 className={`text-xl font-bold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Complete Transparency
              </h3>
              <p className={`text-base leading-relaxed ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                Track every rupee. Detailed reports show exactly how your money helps.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className={`p-8 rounded-2xl border-2 text-center transition-all duration-300 ${
                darkMode
                  ? "bg-gradient-to-br from-zinc-900/80 to-zinc-900/50 border-zinc-800 hover:border-cyan-500/30"
                  : "bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-cyan-300 shadow-lg hover:shadow-xl"
              }`}
            >
              <div className={`inline-flex p-4 rounded-2xl mb-4 ${
                darkMode ? "bg-cyan-500/10" : "bg-cyan-100"
              }`}>
                <Sparkles className={`w-10 h-10 ${darkMode ? "text-cyan-400" : "text-cyan-600"}`} strokeWidth={2} />
              </div>
              <h3 className={`text-xl font-bold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Tax Benefits Included
              </h3>
              <p className={`text-base leading-relaxed ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                Automatic 80G receipts for all donations. Maximize your tax savings.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
   
  )
}