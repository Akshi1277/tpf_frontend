"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { 
  MessageSquare,
  Send,
  Mail,
  Phone,
  MapPin,
  Heart,
  Users,
  BookOpen,
  Search,
  Star,
  Shield,
  ArrowRight,
  HelpCircle
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function ContactPage({ darkModeFromParent }) {
  const [darkMode, setDarkMode] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (darkModeFromParent !== undefined) {
      setDarkMode(darkModeFromParent)
    }
  }, [darkModeFromParent])

  const handleContactRedirect = () => {
    router.push('/contactus')
  }

  const contactCategories = [
    {
      icon: Heart,
      title: "Campaign Support",
      description: "Questions about creating, managing, or donating to campaigns",
      color: "rose"
    },
    {
      icon: Users,
      title: "Community & Collaboration",
      description: "Queries about joining communities or partnership opportunities",
      color: "blue"
    },
    {
      icon: BookOpen,
      title: "Islamic Guidance",
      description: "Questions about Zakat, Sadaqah, or Islamic charitable practices",
      color: "emerald"
    },
    {
      icon: Search,
      title: "Technical Support",
      description: "Help with account, payments, or platform functionality",
      color: "amber"
    },
    {
      icon: Star,
      title: "Share Feedback",
      description: "Your experience and suggestions help us serve the Ummah better",
      color: "purple"
    },
    {
      icon: Shield,
      title: "Report Concerns",
      description: "Help us maintain a trustworthy platform for everyone",
      color: "red"
    }
  ]

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      value: "support@ummahfund.com",
      color: "emerald"
    },
    {
      icon: Phone,
      title: "Call Us",
      value: "+1 (555) 123-4567",
      color: "blue"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      value: "123 Charity Lane, City, State",
      color: "amber"
    }
  ]

  const quickHelpLinks = [
    {
      title: "How to Create a Campaign?",
      description: "Step-by-step guide to launching your campaign"
    },
    {
      title: "Zakat Calculation Guide",
      description: "Understand how to calculate your Zakat correctly"
    },
    {
      title: "Payment & Security",
      description: "Information about secure transactions"
    },
    {
      title: "Account Management",
      description: "Managing your profile and settings"
    }
  ]

  const getColorClasses = (color) => {
    const colors = {
      rose: {
        bg: darkMode ? "bg-rose-500/20" : "bg-rose-100",
        text: darkMode ? "text-rose-400" : "text-rose-600",
        border: darkMode ? "border-rose-500/30" : "border-rose-200"
      },
      blue: {
        bg: darkMode ? "bg-blue-500/20" : "bg-blue-100",
        text: darkMode ? "text-blue-400" : "text-blue-600",
        border: darkMode ? "border-blue-500/30" : "border-blue-200"
      },
      emerald: {
        bg: darkMode ? "bg-emerald-500/20" : "bg-emerald-100",
        text: darkMode ? "text-emerald-400" : "text-emerald-600",
        border: darkMode ? "border-emerald-500/30" : "border-emerald-200"
      },
      amber: {
        bg: darkMode ? "bg-amber-500/20" : "bg-amber-100",
        text: darkMode ? "text-amber-400" : "text-amber-600",
        border: darkMode ? "border-amber-500/30" : "border-amber-200"
      },
      purple: {
        bg: darkMode ? "bg-purple-500/20" : "bg-purple-100",
        text: darkMode ? "text-purple-400" : "text-purple-600",
        border: darkMode ? "border-purple-500/30" : "border-purple-200"
      },
      red: {
        bg: darkMode ? "bg-red-500/20" : "bg-red-100",
        text: darkMode ? "text-red-400" : "text-red-600",
        border: darkMode ? "border-red-500/30" : "border-red-200"
      }
    }
    return colors[color]
  }

  return (
   <div className="relative">

      <div className="absolute inset-y-0 left-0 right-0 overflow-hidden pointer-events-none">

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
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 lg:pb-24">
        
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
            We're here to listen, help, and grow together. Your questions, feedback, and concerns matter to us.
          </p>

          <div className={`inline-block px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl ${
            darkMode 
              ? "bg-emerald-500/20 border border-emerald-500/30" 
              : "bg-emerald-100 border border-emerald-200"
          }`}>
            <p className={`text-xs sm:text-sm ${
              darkMode ? "text-zinc-400" : "text-gray-600"
            }`}>
              "Their affairs are decided through consultation" - Surah Ash-Shura (42:38)
            </p>
          </div>
        </motion.div>

        {/* Contact Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-12 md:mb-16"
        >
          {contactCategories.map((category, index) => {
            const Icon = category.icon
            const colorClasses = getColorClasses(category.color)
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`p-5 sm:p-6 rounded-xl sm:rounded-2xl ${
                  darkMode 
                    ? "bg-zinc-800/50 border border-zinc-700 hover:border-emerald-500/50" 
                    : "bg-white shadow-lg border border-gray-200 hover:border-emerald-400"
                } transition-all`}
              >
                <div className={`inline-flex p-3 sm:p-4 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 ${colorClasses.bg} ${colorClasses.border} border`}>
                  <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${colorClasses.text}`} />
                </div>
                <h3 className={`text-base sm:text-lg font-bold mb-2 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}>
                  {category.title}
                </h3>
                <p className={`text-xs sm:text-sm ${
                  darkMode ? "text-zinc-400" : "text-gray-600"
                }`}>
                  {category.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>

      

        {/* Quick Help Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className={`rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 mb-8 sm:mb-12 md:mb-16 ${
            darkMode 
              ? "bg-zinc-800/50 border border-zinc-700" 
              : "bg-white shadow-xl border border-gray-200"
          }`}
        >
          <div className="text-center mb-6 sm:mb-8">
            <h2 className={`text-2xl sm:text-3xl font-bold mb-2 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}>
              Quick Help Resources
            </h2>
            <p className={`text-sm sm:text-base ${
              darkMode ? "text-zinc-400" : "text-gray-600"
            }`}>
              Find instant answers to common questions
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickHelpLinks.map((link, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className={`p-4 sm:p-5 rounded-xl cursor-pointer transition-all hover:scale-105 ${
                  darkMode
                    ? "bg-zinc-700/30 hover:bg-zinc-700/50"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <HelpCircle className={`w-6 h-6 mb-2 ${
                  darkMode ? "text-emerald-400" : "text-emerald-600"
                }`} />
                <h4 className={`font-semibold mb-1 text-sm ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}>
                  {link.title}
                </h4>
                <p className={`text-xs ${
                  darkMode ? "text-zinc-400" : "text-gray-600"
                }`}>
                  {link.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className={`max-w-4xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden ${
            darkMode 
              ? "bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border border-emerald-700/30" 
              : "bg-gradient-to-br from-emerald-600 to-teal-600 shadow-2xl"
          } relative`}
        >
          <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-white/5 rounded-full -mr-24 sm:-mr-32 -mt-24 sm:-mt-32 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-40 h-40 sm:w-56 sm:h-56 bg-white/5 rounded-full -ml-20 sm:-ml-28 -mb-20 sm:-mb-28 blur-3xl" />
          
          <div className="relative p-6 sm:p-8 md:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              Ready to Share Your Query?
            </h2>
            
            <p className="text-base sm:text-lg text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              Whether you have a question, feedback, or concern - we're here to assist you. Reach out to us and let's work together for the betterment of the Ummah.
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
            May Allah ease your concerns and guide us all to serve the Ummah with sincerity and excellence.
          </p>
        </motion.div>

      </div>
    </div>
  )
}