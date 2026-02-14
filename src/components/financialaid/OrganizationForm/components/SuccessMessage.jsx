"use client"

import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"

export default function SuccessMessage({ darkMode }) {
  return (
    <div className={`min-h-screen flex items-center justify-center ${
      darkMode ? "bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900" : "bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50"
    }`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`max-w-md w-full mx-4 p-8 rounded-2xl shadow-2xl text-center ${
          darkMode ? "bg-zinc-800" : "bg-white"
        }`}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 mb-6"
        >
          <CheckCircle2 className="w-12 h-12 text-emerald-500" />
        </motion.div>

        <h2 className={`text-2xl font-bold mb-3 ${darkMode ? "text-white" : "text-zinc-900"}`}>
          Registration Submitted Successfully!
        </h2>
        
        <p className={`mb-6 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
          Thank you for registering your organization. Our team will review your application and get back to you within 2-3 business days.
        </p>

        <div className={`p-4 rounded-lg mb-6 ${
          darkMode ? "bg-emerald-500/10 border border-emerald-500/20" : "bg-emerald-50 border border-emerald-200"
        }`}>
          <p className={`text-sm ${darkMode ? "text-emerald-300" : "text-emerald-800"}`}>
            <strong>What's Next?</strong><br />
            • You'll receive a confirmation email shortly<br />
            • Our team will verify your documents<br />
            • You'll be notified once approved
          </p>
        </div>

        <div className={`text-sm ${darkMode ? "text-zinc-500" : "text-zinc-500"}`}>
          Redirecting to Home...
        </div>
      </motion.div>
    </div>
  )
}