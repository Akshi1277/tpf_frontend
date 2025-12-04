"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { 
  User,
  Users,
  Building2,
  Heart,
  CheckCircle2
} from "lucide-react"

export default function FinancialAidPage({ darkModeFromParent }) {
  const [darkMode, setDarkMode] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const router = useRouter()

  // Sync with parent dark mode
  useEffect(() => {
    if (darkModeFromParent !== undefined) {
      setDarkMode(darkModeFromParent)
    }
  }, [darkModeFromParent])

  const aidOptions = [
    {
      id: "myself",
      title: "Myself",
      description: "Request financial assistance for personal needs. Funds will be transferred to your verified bank account.",
      icon: User,
      route: "/financial-aid/myself"
    },
    {
      id: "relative",
      title: "Relative/Friend/Other",
      description: "Raise funds on behalf of a family member, friend, or someone in need. Help those who matter to you.",
      icon: Users,
      route: "/financial-aid/other"
    }
    
  ]

  return (
    <div className="min-h-screen pt-10 md:pt-5">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] ${
          darkMode ? "bg-emerald-950/20" : "bg-emerald-50"
        }`} />
        <div className={`absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[100px] ${
          darkMode ? "bg-teal-950/20" : "bg-teal-50"
        }`} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-2xl">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            {/* Platform Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border ${
              darkMode
                ? "bg-zinc-900/50 border-zinc-800"
                : "bg-white border-gray-200 shadow-sm"
            }`}>
              <Heart className={`w-4 h-4 ${darkMode ? "text-emerald-400" : "text-emerald-600"}`} />
              <span className={`text-sm font-medium ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                TPF Aid Platform
              </span>
            </div>

            {/* Greeting */}
            <h1 className={`text-4xl sm:text-5xl font-bold mb-3 bg-gradient-to-r ${
              darkMode ? 'from-emerald-400 to-teal-400' : 'from-emerald-600 to-teal-600'
            } bg-clip-text text-transparent`}>
              Bismillah.
            </h1>
            <h2 className={`text-2xl sm:text-3xl font-bold mb-6 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Let's get started.
            </h2>

            {/* Question */}
            <p className={`text-lg font-semibold mb-2 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              I'm requesting financial aid for...
              <span className="text-red-500 ml-1">*</span>
            </p>
            <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
              Select the category that best describes your need
            </p>
          </motion.div>

          {/* Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4 mb-8 "
          >
            {aidOptions.map((option, index) => {
              const Icon = option.icon
              const isSelected = selectedOption === option.id

              return (
                <motion.button
                  key={option.id}
                  type="button"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  onClick={() => {
                    setSelectedOption(option.id)
                    router.push(option.route)
                  }}
                  className={`w-full text-left p-6 rounded-2xl border-2 transition-all cursor-pointer ${
                    isSelected
                      ? darkMode
                        ? 'bg-emerald-950/30 border-emerald-600 shadow-lg shadow-emerald-900/20'
                        : 'bg-emerald-50 border-emerald-500 shadow-lg shadow-emerald-200/50'
                      : darkMode
                      ? 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/70'
                      : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`p-3 rounded-xl flex-shrink-0 transition-all ${
                      isSelected
                        ? darkMode
                          ? 'bg-emerald-500/20'
                          : 'bg-emerald-100'
                        : darkMode
                        ? 'bg-zinc-800'
                        : 'bg-gray-100'
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        isSelected
                          ? darkMode ? 'text-emerald-400' : 'text-emerald-600'
                          : darkMode ? 'text-zinc-400' : 'text-gray-600'
                      }`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className={`text-lg font-bold mb-2 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {option.title}
                      </h3>
                      <p className={`text-sm leading-relaxed ${
                        isSelected
                          ? darkMode ? 'text-emerald-300/90' : 'text-emerald-900/80'
                          : darkMode ? 'text-zinc-400' : 'text-gray-600'
                      }`}>
                        {option.description}
                      </p>
                    </div>

                    {/* Check Mark */}
                    {/* <div className="flex-shrink-0 cursor-pointer">
                      {isSelected ? (
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          darkMode ? 'bg-emerald-500' : 'bg-emerald-600'
                        }`}>
                          <CheckCircle2 className="w-4 h-4 text-white" strokeWidth={3} />
                        </div>
                      ) : (
                        <div className={`w-6 h-6 rounded-full border-2 ${
                          darkMode ? 'border-zinc-700' : 'border-gray-300'
                        }`} />
                      )}
                    </div> */}
                  </div>
                </motion.button>
              )
            })}
          </motion.div>

          {/* Terms (navigation happens immediately on option click) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <p className={`text-xs text-center mt-4 ${
              darkMode ? 'text-zinc-500' : 'text-gray-500'
            }`}>
              Are you an organization?{' '}
              <a href="/financial-aid/organization" className={`underline ${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'}`}>
                Register here
              </a>
              
            </p>
          </motion.div>

          {/* Info Banner */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className={`mt-8 p-4 rounded-xl border ${
              darkMode
                ? "bg-blue-950/20 border-blue-900/30"
                : "bg-blue-50 border-blue-200"
            }`}
          >
            <p className={`text-xs text-center ${
              darkMode ? "text-blue-300" : "text-blue-900"
            }`}>
              <strong>Note:</strong> All requests are reviewed by our team within 48 hours. 
              You'll need to provide verification documents and campaign details in the next steps.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}