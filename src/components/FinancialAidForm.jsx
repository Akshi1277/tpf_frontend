"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { User, Calendar, MapPin, Phone, Mail, CreditCard } from "lucide-react"

export default function FinancialAidForm({ darkMode }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    parentSpouseName: '',
    dateOfBirth: '',
    maritalStatus: '',
    permanentAddress: '',
    currentAddress: '',
    contactNumber: '',
    email: '',
    govIdNumber: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleNext = () => {
    // Add validation here if needed
    setCurrentStep(2)
  }

  return (
    <div className={`min-h-screen ${darkMode ? "bg-zinc-900" : "bg-neutral-50"} py-12`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className={`text-3xl md:text-4xl font-bold mb-3 ${darkMode ? "text-white" : "text-zinc-900"}`}>
            Financial Aid Application
          </h1>
          <p className={`text-base ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
            Please fill out all required information accurately
          </p>
        </motion.div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                      currentStep >= step
                        ? "bg-emerald-600 text-white"
                        : darkMode
                        ? "bg-zinc-700 text-zinc-400"
                        : "bg-zinc-200 text-zinc-500"
                    }`}
                  >
                    {step}
                  </div>
                  <span className={`text-xs mt-2 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                    {step === 1 ? "Personal" : step === 2 ? "Part 2" : "Part 3"}
                  </span>
                </div>
                {step < 3 && (
                  <div
                    className={`h-1 flex-1 mx-2 rounded transition-all ${
                      currentStep > step
                        ? "bg-emerald-600"
                        : darkMode
                        ? "bg-zinc-700"
                        : "bg-zinc-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`rounded-2xl p-6 md:p-8 shadow-lg ${darkMode ? "bg-zinc-800" : "bg-white"}`}
        >
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="border-l-4 border-emerald-500 pl-4 mb-6">
                <h2 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-zinc-900"}`}>
                  Personal Information
                </h2>
                <p className={`text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                  Please provide your accurate personal details
                </p>
              </div>

              {/* Full Name */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? "text-zinc-500" : "text-zinc-400"}`} />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className={`w-full pl-11 pr-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      darkMode
                        ? "bg-zinc-700 border-zinc-600 text-white placeholder-zinc-500"
                        : "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400"
                    }`}
                    required
                  />
                </div>
              </div>

              {/* Father/Mother/Husband Name */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                  Father/Mother/Husband Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? "text-zinc-500" : "text-zinc-400"}`} />
                  <input
                    type="text"
                    name="parentSpouseName"
                    value={formData.parentSpouseName}
                    onChange={handleInputChange}
                    placeholder="Enter father/mother/husband name"
                    className={`w-full pl-11 pr-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      darkMode
                        ? "bg-zinc-700 border-zinc-600 text-white placeholder-zinc-500"
                        : "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400"
                    }`}
                    required
                  />
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? "text-zinc-500" : "text-zinc-400"}`} />
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className={`w-full pl-11 pr-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      darkMode
                        ? "bg-zinc-700 border-zinc-600 text-white"
                        : "bg-white border-zinc-300 text-zinc-900"
                    }`}
                    required
                  />
                </div>
              </div>

              {/* Marital Status */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                  Marital Status <span className="text-red-500">*</span>
                  <span className={`text-xs ml-2 ${darkMode ? "text-zinc-500" : "text-zinc-500"}`}>
                    (Must specify in case of Female)
                  </span>
                </label>
                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    darkMode
                      ? "bg-zinc-700 border-zinc-600 text-white"
                      : "bg-white border-zinc-300 text-zinc-900"
                  }`}
                  required
                >
                  <option value="">Select marital status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </select>
              </div>

              {/* Permanent Address */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                  Permanent Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className={`absolute left-3 top-3 w-5 h-5 ${darkMode ? "text-zinc-500" : "text-zinc-400"}`} />
                  <textarea
                    name="permanentAddress"
                    value={formData.permanentAddress}
                    onChange={handleInputChange}
                    placeholder="Enter your permanent address"
                    rows="3"
                    className={`w-full pl-11 pr-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none ${
                      darkMode
                        ? "bg-zinc-700 border-zinc-600 text-white placeholder-zinc-500"
                        : "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400"
                    }`}
                    required
                  />
                </div>
              </div>

              {/* Current Address */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                  Current Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className={`absolute left-3 top-3 w-5 h-5 ${darkMode ? "text-zinc-500" : "text-zinc-400"}`} />
                  <textarea
                    name="currentAddress"
                    value={formData.currentAddress}
                    onChange={handleInputChange}
                    placeholder="Enter your current address"
                    rows="3"
                    className={`w-full pl-11 pr-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none ${
                      darkMode
                        ? "bg-zinc-700 border-zinc-600 text-white placeholder-zinc-500"
                        : "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400"
                    }`}
                    required
                  />
                </div>
              </div>

              {/* Contact Number */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                  Contact Number <span className="text-red-500">*</span>
                  <span className={`text-xs ml-2 ${darkMode ? "text-zinc-500" : "text-zinc-500"}`}>
                    (WhatsApp prescribed)
                  </span>
                </label>
                <div className="relative">
                  <Phone className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? "text-zinc-500" : "text-zinc-400"}`} />
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    placeholder="Enter WhatsApp number"
                    className={`w-full pl-11 pr-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      darkMode
                        ? "bg-zinc-700 border-zinc-600 text-white placeholder-zinc-500"
                        : "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400"
                    }`}
                    required
                  />
                </div>
              </div>

              {/* Email ID */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                  Email ID
                  <span className={`text-xs ml-2 ${darkMode ? "text-zinc-500" : "text-zinc-500"}`}>
                    (if available)
                  </span>
                </label>
                <div className="relative">
                  <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? "text-zinc-500" : "text-zinc-400"}`} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    className={`w-full pl-11 pr-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      darkMode
                        ? "bg-zinc-700 border-zinc-600 text-white placeholder-zinc-500"
                        : "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400"
                    }`}
                  />
                </div>
              </div>

              {/* Government ID Proof Number */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                  Government ID Proof Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <CreditCard className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? "text-zinc-500" : "text-zinc-400"}`} />
                  <input
                    type="text"
                    name="govIdNumber"
                    value={formData.govIdNumber}
                    onChange={handleInputChange}
                    placeholder="Enter Aadhaar/PAN/Voter ID number"
                    className={`w-full pl-11 pr-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      darkMode
                        ? "bg-zinc-700 border-zinc-600 text-white placeholder-zinc-500"
                        : "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400"
                    }`}
                    required
                  />
                </div>
              </div>

              {/* Next Button */}
              <div className="flex justify-end pt-4">
                <button
                  onClick={handleNext}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3 rounded-lg transition-all hover:shadow-lg flex items-center gap-2"
                >
                  Next
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Placeholder for Step 2 and 3 */}
          {currentStep === 2 && (
            <div className="text-center py-12">
              <p className={darkMode ? "text-zinc-400" : "text-zinc-600"}>
                Step 2 content will go here
              </p>
            </div>
          )}

          {currentStep === 3 && (
            <div className="text-center py-12">
              <p className={darkMode ? "text-zinc-400" : "text-zinc-600"}>
                Step 3 content will go here
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}