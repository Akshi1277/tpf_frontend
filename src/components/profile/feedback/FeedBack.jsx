"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { 
  MessageSquare,
  Send,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Star,
  Heart,
  Users,
  CheckCircle2
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function FeedbackPage({ darkModeFromParent }) {
  const [darkMode, setDarkMode] = useState(false)
  const router = useRouter()

  // Sync with parent dark mode
  useEffect(() => {
    if (darkModeFromParent !== undefined) {
      setDarkMode(darkModeFromParent)
    }
  }, [darkModeFromParent])

  const handleContactRedirect = () => {
    router.push('/contactus')
  }

  const feedbackTypes = [
    {
      icon: Star,
      title: "Share Your Experience",
      description: "Help us improve our services to better serve the Muslim community",
      color: "amber"
    },
    {
      icon: Heart,
      title: "Suggest Improvements",
      description: "Share your ideas to enhance our platform's impact on the Ummah",
      color: "rose"
    },
    {
      icon: Users,
      title: "Report Concerns",
      description: "Help us maintain a trustworthy and beneficial platform for all",
      color: "blue"
    }
  ]

  const getColorClasses = (color) => {
    const colors = {
      amber: {
        bg: darkMode ? "bg-amber-500/20" : "bg-amber-100",
        text: darkMode ? "text-amber-400" : "text-amber-600",
        border: darkMode ? "border-amber-500/30" : "border-amber-200"
      },
      rose: {
        bg: darkMode ? "bg-rose-500/20" : "bg-rose-100",
        text: darkMode ? "text-rose-400" : "text-rose-600",
        border: darkMode ? "border-rose-500/30" : "border-rose-200"
      },
      blue: {
        bg: darkMode ? "bg-blue-500/20" : "bg-blue-100",
        text: darkMode ? "text-blue-400" : "text-blue-600",
        border: darkMode ? "border-blue-500/30" : "border-blue-200"
      }
    }
    return colors[color]
  }

  return (
    <div className={`min-h-screen ${darkMode ? "bg-zinc-900" : "bg-gradient-to-br from-emerald-50 via-white to-teal-50"}`}>

      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className={`absolute inset-0 ${
            darkMode 
              ? "bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)]" 
              : "bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)]"
          }`}
          style={{ backgroundSize: '48px 48px' }}
        />
        <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-20 pb-16 sm:pb-20 lg:pb-24">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center justify-center mb-4 sm:mb-6"
          >
            <div className={`p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl ${
              darkMode 
                ? "bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30" 
                : "bg-gradient-to-br from-emerald-500 to-teal-500 shadow-xl"
            }`}>
              <MessageSquare className={`w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 ${
                darkMode ? "text-emerald-400" : "text-white"
              }`} />
            </div>
          </motion.div>

          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}>
            Share Your{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Voice
            </span>
          </h1>
          
          <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-4 mb-4 ${
            darkMode ? "text-zinc-400" : "text-gray-600"
          }`}>
            Your insights help us serve the Ummah better. Share your thoughts, suggestions, or concerns with us.
          </p>

          <div className={`inline-block px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl ${
            darkMode 
              ? "bg-emerald-500/20 border border-emerald-500/30" 
              : "bg-emerald-100 border border-emerald-200"
          }`}>
            
            <p className={`text-xs sm:text-sm mt-1 ${
              darkMode ? "text-zinc-400" : "text-gray-600"
            }`}>
              "Their affairs are decided through consultation" - Surah Ash-Shura (42:38)
            </p>
          </div>
        </motion.div>

        {/* Feedback Types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-12 md:mb-16"
        >
          {feedbackTypes.map((type, index) => {
            const Icon = type.icon
            const colorClasses = getColorClasses(type.color)
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`p-5 sm:p-6 rounded-xl sm:rounded-2xl ${
                  darkMode 
                    ? "bg-zinc-800/50 border border-zinc-700 hover:border-emerald-500/50" 
                    : "bg-white shadow-lg border border-gray-200 hover:border-emerald-400"
                } transition-all cursor-pointer`}
              >
                <div className={`inline-flex p-3 sm:p-4 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 ${colorClasses.bg} ${colorClasses.border} border`}>
                  <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${colorClasses.text}`} />
                </div>
                <h3 className={`text-lg sm:text-xl font-bold mb-2 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}>
                  {type.title}
                </h3>
                <p className={`text-sm sm:text-base ${
                  darkMode ? "text-zinc-400" : "text-gray-600"
                }`}>
                  {type.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Main CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className={`max-w-4xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden ${
            darkMode 
              ? "bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border border-emerald-700/30" 
              : "bg-gradient-to-br from-emerald-600 to-teal-600 shadow-2xl"
          } relative`}
        >
          <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-white/5 rounded-full -mr-24 sm:-mr-32 -mt-24 sm:-mt-32 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-40 h-40 sm:w-56 sm:h-56 bg-white/5 rounded-full -ml-20 sm:-ml-28 -mb-20 sm:-mb-28 blur-3xl" />
          
          <div className="relative p-6 sm:p-8 md:p-12 text-center">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/20 backdrop-blur-sm mb-4 sm:mb-6">
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span className="text-white text-xs sm:text-sm font-semibold">InshaAllah, We'll Respond Within 24 Hours</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              Ready to Share Your Thoughts?
            </h2>
            
            <p className="text-base sm:text-lg text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              Visit our contact page to send us your feedback, questions, or suggestions. We value your input as it helps us serve the community better.
            </p>

            <button
              onClick={handleContactRedirect}
              className={`inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all transform hover:scale-105 ${
                darkMode
                  ? "bg-white text-emerald-600 hover:bg-gray-100"
                  : "bg-white text-emerald-600 hover:bg-gray-50 shadow-xl"
              }`}
            >
              <Send className="w-5 h-5 sm:w-6 sm:h-6" />
              Contact Us Now
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </motion.div>

     

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-8 sm:mt-12"
        >
          <p className={`text-xs sm:text-sm ${
            darkMode ? "text-zinc-500" : "text-gray-500"
          }`}>
            Your feedback is valued and confidential. May Allah reward your efforts in helping us serve the Ummah better.
          </p>
        </motion.div>

      </div>
    </div>
  )
}