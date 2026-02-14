"use client"

import { motion } from "framer-motion"
import { Users, ChevronRight, ChevronLeft } from "lucide-react"
import EmailInput from "../components/EmailInput"
import PhoneInput from "../components/PhoneInput"

export default function ContactDetailsStep({ 
  formData, 
  handleInputChange, 
  handleNext, 
  handleBack,
  darkMode 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <Users className={`w-8 h-8 ${darkMode ? "text-emerald-400" : "text-emerald-600"}`} />
        <h2 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-zinc-900"}`}>
          Point of Contact Details
        </h2>
      </div>

      <p className={`mb-6 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
        Provide details of the primary person we should contact regarding this registration
      </p>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
              Contact Person Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="contactName"
              value={formData.contactName}
              onChange={handleInputChange}
              placeholder="Enter full name"
              className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${
                darkMode
                  ? "bg-zinc-700 border-zinc-600 text-white placeholder-zinc-400 focus:border-emerald-500"
                  : "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400 focus:border-emerald-600"
              } focus:outline-none focus:ring-2 focus:ring-emerald-500/20`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
              Contact Number <span className="text-red-500">*</span>
            </label>
            <PhoneInput
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleInputChange}
              darkMode={darkMode}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
              Contact Email <span className="text-red-500">*</span>
            </label>
            <EmailInput
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleInputChange}
              darkMode={darkMode}
              placeholder="contact@example.com"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
              Designation/Role <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleInputChange}
              placeholder="e.g., Program Manager, CEO, Director"
              className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${
                darkMode
                  ? "bg-zinc-700 border-zinc-600 text-white placeholder-zinc-400 focus:border-emerald-500"
                  : "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400 focus:border-emerald-600"
              } focus:outline-none focus:ring-2 focus:ring-emerald-500/20`}
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-6">
          <button
            onClick={handleBack}
            className={`px-8 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
              darkMode
                ? "bg-zinc-700 hover:bg-zinc-600 text-white"
                : "bg-zinc-200 hover:bg-zinc-300 text-zinc-900"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
          <button
            onClick={handleNext}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3 rounded-lg transition-all hover:shadow-lg flex items-center gap-2"
          >
            Next Step
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}