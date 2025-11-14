"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { User, Calendar, MapPin, Phone, Mail, CreditCard } from "lucide-react"

export default function MyselfForm({ darkMode }) {
    const router = useRouter()
const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    parentSpouseName: '',
    dateOfBirth: '',
    maritalStatus: '',
    gender:'',
    permanentAddress: '',
    currentAddress: '',
    sameAddress: false,
    contactNumber: '',
    email: '',
    idType:'',
    govIdNumber: '',
    govIdDocument:'null',
     // Financial & Employment Details
  occupation: '',
  monthlyIncome: '',
  bankNameBranch: '',
  accountNumber: '',
  ifscCode: '',
  numberOfDependents: '',

   // Reason for Aid Request
  aidType: '',
  hardshipDescription: '',
  supportingDocuments: [],
  declarationConsent: false,
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }))
  }

 const handleNext = (nextStep) => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  setCurrentStep(nextStep)
}

const handleSubmit = (e) => {
  e.preventDefault()
  
  if (!formData.declarationConsent) {
    return
  }

  console.log('Form submitted:', formData)
  
  setShowSuccessMessage(true)
  
  // Redirect to home after 3 seconds
  setTimeout(() => {
    router.push('/')
  }, 3000)
}


  return (
    <>
    {showSuccessMessage && (
  <motion.div
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    className="fixed top-4 left-1/2 -translate-x-1/2 z-50 
               bg-gradient-to-r from-emerald-600 to-emerald-400 text-white px-6 py-4 rounded-lg shadow-2xl 
               flex items-center gap-3 max-w-md w-[90%] sm:w-auto"
  >
    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <div>
      <p className="font-semibold">Application Submitted Successfully!</p>
      <p className="text-sm text-emerald-100">Redirecting to home page...</p>
    </div>
  </motion.div>
  
)}

    <div className={`min-h-screen ${darkMode ? "bg-zinc-900" : "bg-neutral-50"} py-12 sm:py-20`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-2 pb-12 sm:pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 ${darkMode ? "text-white" : "text-zinc-900"}`}>
            Financial Aid Application
          </h1>
          <p className={`text-sm sm:text-base ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
            Please fill out all required information accurately
          </p>
        </motion.div>

        {/* Progress Indicator */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between sm:justify-center sm:gap-4 md:gap-6 mb-2 overflow-x-auto px-2">
            {[1, 2, 3, 4].map((step, index) => (
              <div key={step} className="flex items-center flex-shrink-0">
                {/* Step Circle + Label */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold text-sm sm:text-base transition-all ${
                      currentStep >= step
                        ? "bg-emerald-600 text-white"
                        : darkMode
                        ? "bg-zinc-700 text-zinc-400"
                        : "bg-zinc-200 text-zinc-500"
                    }`}
                  >
                    {step}
                  </div>
                  <span
                    className={`text-[10px] sm:text-xs mt-1 sm:mt-2 whitespace-nowrap ${
                      darkMode ? "text-zinc-400" : "text-zinc-600"
                    }`}
                  >
                    {step === 1 ? "Personal" : step === 2 ? "Contact" : step === 3 ? "Financial" : "Request"}
                  </span>
                </div>

                {/* Connecting Line */}
                {index < 3 && (
                  <div
                    className={`w-8 sm:w-12 md:w-16 h-1 mx-2 sm:mx-4 rounded transition-all ${
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
          className={`rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg ${darkMode ? "bg-zinc-800" : "bg-white"}`}
        >
          {/* Step 1: Personal Information */}
       {currentStep === 1 && (
  <div className="space-y-4 sm:space-y-6">
    <div className="border-l-4 border-emerald-500 pl-3 sm:pl-4 mb-4 sm:mb-6">
      <h2 className={`text-xl sm:text-2xl font-bold ${darkMode ? "text-white" : "text-zinc-900"}`}>
        Basic Personal Information
      </h2>
      <p className={`text-xs sm:text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
        Please provide your basic personal details
      </p>
    </div>

    {/* Full Name */}
    <div>
      <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
        Full Name <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 ${darkMode ? "text-zinc-500" : "text-zinc-400"}`} />
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          placeholder="Enter your full name"
          className={`w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
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
      <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
        Father/Mother/Husband Name <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <User className={`absolute left-3 top-6 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 ${darkMode ? "text-zinc-500" : "text-zinc-400"}`} />
       {/* Relationship Dropdown */}
<select
  name="relation"
  value={formData.relation}
  onChange={handleInputChange}
  className={`w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
    darkMode
      ? "bg-zinc-700 border-zinc-600 text-white"
      : "bg-white border-zinc-300 text-zinc-900"
  }`}
  required
>
  <option value="" disabled>Select Relation</option>
  <option value="Father">Father</option>
  <option value="Mother">Mother</option>
  <option value="Wife">Wife</option>
  <option value="Husband">Husband</option>
  <option value="Sibling">Sibling</option>
  <option value="Other">Other</option>
</select>

{/* Name Input Field Under Dropdown */}
<input
  type="text"
  name="relationName"
  value={formData.relationName}
  onChange={handleInputChange}
  placeholder="Enter the name"
  className={`mt-3 w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
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
      <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
        Date of Birth <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <Calendar className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 ${darkMode ? "text-zinc-500" : "text-zinc-400"}`} />
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleInputChange}
          className={`w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
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
      <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
        Marital Status <span className="text-red-500">*</span>
        <span className={`text-[10px] sm:text-xs ml-2 ${darkMode ? "text-zinc-500" : "text-zinc-500"}`}>
          (Must specify in case of Female)
        </span>
      </label>
      <select
        name="maritalStatus"
        value={formData.maritalStatus}
        onChange={handleInputChange}
        className={`w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
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

    {/* Gender */}
    <div>
      <label className={`block text-xs sm:text-sm font-medium mb-3 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
        Gender <span className="text-red-500">*</span>
      </label>
      <div className="flex gap-4 sm:gap-6">
        <label className="flex items-center cursor-pointer group">
          <input
            type="radio"
            name="gender"
            value="male"
            checked={formData.gender === 'male'}
            onChange={handleInputChange}
            className="sr-only peer"
            required
          />
          <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center transition-all peer-checked:border-emerald-600 peer-checked:bg-emerald-600 ${
            darkMode ? "border-zinc-500" : "border-zinc-400"
          }`}>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity"></div>
          </div>
          <span className={`ml-2 sm:ml-3 font-medium text-sm sm:text-base ${formData.gender === 'male' ? 'text-emerald-600' : darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
            Male
          </span>
        </label>
        
        <label className="flex items-center cursor-pointer group">
          <input
            type="radio"
            name="gender"
            value="female"
            checked={formData.gender === 'female'}
            onChange={handleInputChange}
            className="sr-only peer"
            required
          />
          <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center transition-all peer-checked:border-emerald-600 peer-checked:bg-emerald-600 ${
            darkMode ? "border-zinc-500" : "border-zinc-400"
          }`}>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity"></div>
          </div>
          <span className={`ml-2 sm:ml-3 font-medium text-sm sm:text-base ${formData.gender === 'female' ? 'text-emerald-600' : darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
            Female
          </span>
        </label>
      </div>
       {/* Declaration & Consent */}
    <div className={`mt-6 sm:mt-8 p-4 sm:p-6 rounded-lg border ${
      darkMode ? "bg-zinc-700/50 border-zinc-600" : "bg-zinc-50 border-zinc-200"
    }`}>
      <h3 className={`font-bold text-base sm:text-lg mb-3 sm:mb-4 ${darkMode ? "text-white" : "text-zinc-900"}`}>
        Declaration & Consent
      </h3>
      <div className={`text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
        <p>
          I hereby declare that I am not getting assistance/provision from any other organization or entity in any form and the information provided above is true. Any misrepresentation may lead to disqualification. I authorize True Path Foundation to visit and contact me to verify the provided details. I understand that video verification, its online solicitation/circulation and an appeal are mandatory for funding campaigns. A copy of a document of identity proof and bank details (if available) must be attached. I/We provide free consent for this process and acknowledge full understanding of this form in vernacular.
        </p>
      </div>
      
      <label className="flex items-start cursor-pointer group">
        <input
          type="checkbox"
          name="declarationConsent"
          checked={formData.declarationConsent}
          onChange={(e) => setFormData(prev => ({ ...prev, declarationConsent: e.target.checked }))}
          className="sr-only peer"
          required
        />
        <div className={`w-4 h-4 sm:w-5 sm:h-5 mt-0.5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all peer-checked:border-emerald-600 peer-checked:bg-emerald-600 ${
          darkMode ? "border-zinc-500 bg-zinc-700" : "border-zinc-400 bg-white"
        }`}>
          <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span className={`ml-2 sm:ml-3 text-xs sm:text-sm font-medium ${
          formData.declarationConsent 
            ? 'text-emerald-600' 
            : darkMode ? "text-zinc-300" : "text-zinc-700"
        }`}>
          I agree to the declaration and consent terms stated above <span className="text-red-500">*</span>
        </span>
      </label>
    </div>

    </div>

    {/* Next Button */}
    <div className="flex justify-end pt-4">
      <button
        onClick={() => handleNext(2)}
        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg transition-all hover:shadow-lg flex items-center gap-2 cursor-pointer"
      >
        Next
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
)}

{/* Step 2: Contact & ID Information */}
{currentStep === 2 && (
  <div className="space-y-4 sm:space-y-6">
    <div className="border-l-4 border-emerald-500 pl-3 sm:pl-4 mb-4 sm:mb-6">
      <h2 className={`text-xl sm:text-2xl font-bold ${darkMode ? "text-white" : "text-zinc-900"}`}>
        Contact & ID Information
      </h2>
      <p className={`text-xs sm:text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
        Please provide your contact details and identification
      </p>
    </div>

   

    {/* Current Address */}
    <div>
      <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
        Current Address <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <MapPin className={`absolute left-3 top-3 w-4 h-4 sm:w-5 sm:h-5 ${darkMode ? "text-zinc-500" : "text-zinc-400"}`} />
        <textarea
          name="currentAddress"
          value={formData.currentAddress}
          onChange={handleInputChange}
          placeholder="Enter your current address"
          rows="3"
          className={`w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none ${
            darkMode
              ? "bg-zinc-700 border-zinc-600 text-white placeholder-zinc-500"
              : "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400"
          }`}
          required
        />
      </div>
    </div>

 {/* Permanent Address */}
 <div>
      <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
        Permanent Address <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <MapPin className={`absolute left-3 top-3 w-4 h-4 sm:w-5 sm:h-5 ${darkMode ? "text-zinc-500" : "text-zinc-400"}`} />
        <textarea
          name="permanentAddress"
          value={formData.permanentAddress}
          onChange={handleInputChange}
          placeholder="Enter your permanent address"
          rows="3"
          className={`w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none ${
            darkMode
              ? "bg-zinc-700 border-zinc-600 text-white placeholder-zinc-500"
              : "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400"
          }`}
          required
        />
      </div>
    </div>

    {/* Checkbox: Same as Current Address */}
<div className="flex items-center gap-2">
  <input
    type="checkbox"
    id="sameAddress"
    checked={formData.sameAddress || false}
    onChange={(e) => {
      const checked = e.target.checked;

      setFormData((prev) => ({
        ...prev,
        sameAddress: checked,
        permanentAddress: checked ? prev.currentAddress : ""  
      }));
    }}
    className="w-4 h-4 cursor-pointer"
  />
  <label
    htmlFor="sameAddress"
    className={`text-xs sm:text-sm cursor-pointer ${
      darkMode ? "text-zinc-300" : "text-zinc-700"
    }`}
  >
    Same as Current Address
  </label>
</div>


    {/* Contact Number */}
    <div>
      <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
        Contact Number <span className="text-red-500">*</span>
        <span className={`text-[10px] sm:text-xs ml-2 ${darkMode ? "text-zinc-500" : "text-zinc-500"}`}>
          (WhatsApp prescribed)
        </span>
      </label>
      <div className="relative">
        <Phone className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 ${darkMode ? "text-zinc-500" : "text-zinc-400"}`} />
        <input
          type="tel"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleInputChange}
          placeholder="+91"
          className={`w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
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
      <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
        Email ID
        <span className={`text-[10px] sm:text-xs ml-2 ${darkMode ? "text-zinc-500" : "text-zinc-500"}`}>
          (if available)
        </span>
      </label>
      <div className="relative">
        <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 ${darkMode ? "text-zinc-500" : "text-zinc-400"}`} />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter your email address"
          className={`w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
            darkMode
              ? "bg-zinc-700 border-zinc-600 text-white placeholder-zinc-500"
              : "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400"
          }`}
        />
      </div>
    </div>

    {/* ID Type Selection */}
    <div>
      <label className={`block text-xs sm:text-sm font-medium mb-3 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
        Select ID Type <span className="text-red-500">*</span>
      </label>
      <div className="space-y-2 sm:space-y-3">
        <label className="cursor-pointer block">
          <input
            type="radio"
            name="idType"
            value="pan"
            checked={formData.idType === 'pan'}
            onChange={handleInputChange}
            className="peer sr-only"
            required
          />
          <div className={`p-3 sm:p-4 rounded-lg border-2 transition-all peer-checked:border-emerald-500 peer-checked:bg-emerald-50 peer-checked:dark:bg-emerald-950/30 ${
            darkMode 
              ? "border-zinc-600 bg-zinc-700 hover:border-zinc-500" 
              : "border-zinc-300 bg-white hover:border-zinc-400"
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <CreditCard className={`w-4 h-4 sm:w-5 sm:h-5 ${formData.idType === 'pan' ? 'text-emerald-600' : darkMode ? 'text-zinc-400' : 'text-zinc-500'}`} />
                <div>
                  <p className={`font-semibold text-sm sm:text-base ${darkMode ? "text-white" : "text-zinc-900"}`}>PAN Card</p>
                  <p className={`text-[10px] sm:text-xs ${darkMode ? "text-zinc-500" : "text-zinc-500"}`}>10 characters</p>
                </div>
              </div>
              {formData.idType === 'pan' && (
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0">
                  <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </label>

        <label className="cursor-pointer block">
          <input
            type="radio"
            name="idType"
            value="aadhar"
            checked={formData.idType === 'aadhar'}
            onChange={handleInputChange}
            className="peer sr-only"
            required
          />
          <div className={`p-3 sm:p-4 rounded-lg border-2 transition-all peer-checked:border-emerald-500 peer-checked:bg-emerald-50 peer-checked:dark:bg-emerald-950/30 ${
            darkMode 
              ? "border-zinc-600 bg-zinc-700 hover:border-zinc-500" 
              : "border-zinc-300 bg-white hover:border-zinc-400"
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <CreditCard className={`w-4 h-4 sm:w-5 sm:h-5 ${formData.idType === 'aadhar' ? 'text-emerald-600' : darkMode ? 'text-zinc-400' : 'text-zinc-500'}`} />
                <div>
                  <p className={`font-semibold text-sm sm:text-base ${darkMode ? "text-white" : "text-zinc-900"}`}>Aadhar Card</p>
                  <p className={`text-[10px] sm:text-xs ${darkMode ? "text-zinc-500" : "text-zinc-500"}`}>12 characters</p>
                </div>
              </div>
              {formData.idType === 'aadhar' && (
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0">
                  <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </label>
      </div>
    </div>

    {/* Government ID Proof Number */}
    <div>
     <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
  {formData.idType === "pan"
    ? "PAN Number"
    : formData.idType === "aadhar"
    ? "Aadhaar Number"
    : "Government ID Proof Number"
  } <span className="text-red-500">*</span>
</label>

      <div className="relative">
        <CreditCard className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 ${darkMode ? "text-zinc-500" : "text-zinc-400"}`} />
        <input
          type="text"
          name="govIdNumber"
          value={formData.govIdNumber}
          onChange={handleInputChange}
          placeholder={
            formData.idType === 'pan' ? 'Enter 10-character PAN number' :
            formData.idType === 'aadhar' ? 'Enter 12-character Aadhaar number' :
            'Select ID type above'
          }
          className={`w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
            darkMode
              ? "bg-zinc-700 border-zinc-600 text-white placeholder-zinc-500"
              : "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400"
          }`}
          required
        />
      </div>
    </div>

    {/* Government ID Document Upload */}
    <div>
      <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
        Upload Government ID Proof <span className="text-red-500">*</span>
      </label>
      <div className={`relative border-2 border-dashed rounded-lg p-4 sm:p-6 transition-all ${
        darkMode 
          ? "border-zinc-600 bg-zinc-700 hover:border-emerald-500" 
          : "border-zinc-300 bg-zinc-50 hover:border-emerald-500"
      }`}>
        <input
          type="file"
          name="govIdDocument"
          onChange={(e) => {
            const file = e.target.files[0]
            setFormData(prev => ({
              ...prev,
              govIdDocument: file
            }))
          }}
          accept=".pdf,.jpg,.jpeg,.png"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          required
        />
        <div className="text-center">
          <div className={`mx-auto w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-2 sm:mb-3 ${
            darkMode ? "bg-zinc-600" : "bg-zinc-200"
          }`}>
            <svg className={`w-5 h-5 sm:w-6 sm:h-6 ${darkMode ? "text-zinc-400" : "text-zinc-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          {formData.govIdDocument && formData.govIdDocument !== 'null' ? (
            <div>
              <p className={`font-medium text-sm sm:text-base ${darkMode ? "text-emerald-400" : "text-emerald-600"}`}>
                {formData.govIdDocument.name}
              </p>
              <p className={`text-[10px] sm:text-xs mt-1 ${darkMode ? "text-zinc-500" : "text-zinc-500"}`}>
                {(formData.govIdDocument.size / 1024).toFixed(2)} KB
              </p>
            </div>
          ) : (
            <div>
              <p className={`font-medium text-sm sm:text-base ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                Click to upload or drag and drop
              </p>
              <p className={`text-xs sm:text-sm mt-1 ${darkMode ? "text-zinc-500" : "text-zinc-500"}`}>
                PDF, JPG, JPEG or PNG (Max 5MB)
              </p>
            </div>
          )}
        </div>
      </div>
      {formData.idType && (
        <p className={`text-[10px] sm:text-xs mt-2 ${darkMode ? "text-zinc-500" : "text-zinc-500"}`}>
          Please upload a clear copy of your {
            formData.idType === 'pan' ? 'PAN Card' :
            formData.idType === 'aadhar' ? 'Aadhar Card' : 'ID'
          }
        </p>
      )}
    </div>

    {/* Navigation Buttons */}
    <div className="flex justify-between pt-4 gap-3">
      <button
        onClick={() => handleNext(1)}
        className={`px-4 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg font-semibold transition-all border ${
          darkMode
            ? "border-zinc-600 text-white hover:bg-zinc-700"
            : "border-zinc-300 text-zinc-900 hover:bg-zinc-100"
        } flex items-center gap-2`}
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="hidden sm:inline">Previous</span>
        <span className="sm:hidden">Back</span>
      </button>
      <button
        onClick={() => handleNext(3)}
        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg transition-all hover:shadow-lg flex items-center gap-2 cursor-pointer"
      >
        Next
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
)}

{/* Step 3: Financial & Employment Details */}
{currentStep === 3 && (
  <div className="space-y-4 sm:space-y-6 ">
    <div className="border-l-4 border-emerald-500 pl-3 sm:pl-4 mb-4 sm:mb-6">
      <h2 className={`text-xl sm:text-2xl font-bold ${darkMode ? "text-white" : "text-zinc-900"}`}>
        Financial & Employment Details
      </h2>
      <p className={`text-xs sm:text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
        Please provide your financial and employment information
      </p>
    </div>

{/* Wrap all fields in a 2-column grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

  {/* Occupation */}
  <div>
    <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
      Occupation <span className="text-red-500">*</span>
    </label>
    <div className="relative">
      <svg className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 ${darkMode ? "text-zinc-500" : "text-zinc-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
      <input
        type="text"
        name="occupation"
        value={formData.occupation}
        onChange={handleInputChange}
        placeholder="Enter your occupation"
        className={`w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 rounded-lg border text-sm sm:text-base transition-all focus:ring-2 focus:ring-emerald-500 ${darkMode ? "bg-zinc-700 border-zinc-600 text-white placeholder-zinc-500" : "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400"}`}
        required
      />
    </div>
  </div>

  {/* Monthly Income */}
  <div>
    <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
      Monthly Income <span className="text-red-500">*</span>
    </label>
    <div className="relative">
      <span className={`absolute left-3 top-1/2 -translate-y-1/2 font-semibold text-sm sm:text-base ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>
        ₹
      </span>
      <input
        type="number"
        name="monthlyIncome"
        value={formData.monthlyIncome}
        onChange={handleInputChange}
        placeholder="Enter monthly income"
        className={`w-full pl-7 sm:pl-8 pr-4 py-2.5 sm:py-3 rounded-lg border text-sm sm:text-base transition-all focus:ring-2 focus:ring-emerald-500 ${darkMode ? "bg-zinc-700 border-zinc-600 text-white placeholder-zinc-500" : "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400"}`}
        required
      />
    </div>
    <p className={`text-[10px] sm:text-xs mt-1 ${darkMode ? "text-zinc-500" : "text-zinc-500"}`}>
      Amount in INR
    </p>
  </div>

  {/* Bank Name & Branch */}
  <div>
    <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
      Bank Name & Branch <span className="text-red-500">*</span>
    </label>
    <div className="relative">
      <svg className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 ${darkMode ? "text-zinc-500" : "text-zinc-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
      <input
        type="text"
        name="bankNameBranch"
        value={formData.bankNameBranch}
        onChange={handleInputChange}
        placeholder="e.g., SBI, CP Branch"
        className={`w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 rounded-lg border text-sm sm:text-base transition-all focus:ring-2 focus:ring-emerald-500 ${darkMode ? "bg-zinc-700 border-zinc-600 text-white placeholder-zinc-500" : "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400"}`}
        required
      />
    </div>
  </div>

  {/* Account Number */}
  <div>
    <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
      Account Number <span className="text-red-500">*</span>
    </label>
    <div className="relative">
      <CreditCard className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 ${darkMode ? "text-zinc-500" : "text-zinc-400"}`} />
      <input
        type="text"
        name="accountNumber"
        value={formData.accountNumber}
        onChange={handleInputChange}
        placeholder="Enter bank account number"
        className={`w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 rounded-lg border text-sm sm:text-base transition-all focus:ring-2 focus:ring-emerald-500 ${darkMode ? "bg-zinc-700 border-zinc-600 text-white placeholder-zinc-500" : "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400"}`}
        required
      />
    </div>
  </div>

  {/* IFSC Code */}
  <div>
    <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
      IFSC Code <span className="text-red-500">*</span>
    </label>
    <div className="relative">
      <svg className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 ${darkMode ? "text-zinc-500" : "text-zinc-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
      </svg>
      <input
        type="text"
        name="ifscCode"
        value={formData.ifscCode}
        onChange={handleInputChange}
        placeholder="Enter IFSC code"
        className={`w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 rounded-lg border text-sm sm:text-base transition-all focus:ring-2 focus:ring-emerald-500 uppercase ${darkMode ? "bg-zinc-700 border-zinc-600 text-white placeholder-zinc-500" : "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400"}`}
        maxLength="11"
        required
      />
    </div>
    <p className={`text-[10px] sm:text-xs mt-1 ${darkMode ? "text-zinc-500" : "text-zinc-500"}`}>
      11-character code (e.g., SBIN0001234)
    </p>
  </div>

  {/* Number of Dependents */}
  <div>
    <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
      Number of Dependents <span className="text-red-500">*</span>
    </label>
    <div className="relative">
      <svg className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 ${darkMode ? "text-zinc-500" : "text-zinc-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      <input
        type="number"
        name="numberOfDependents"
        value={formData.numberOfDependents}
        onChange={handleInputChange}
        placeholder="Enter number of dependents"
        min="0"
        className={`w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 rounded-lg border text-sm sm:text-base transition-all focus:ring-2 focus:ring-emerald-500 ${darkMode ? "bg-zinc-700 border-zinc-600 text-white placeholder-zinc-500" : "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400"}`}
        required
      />
    </div>
    <p className={`text-[10px] sm:text-xs mt-1 ${darkMode ? "text-zinc-500" : "text-zinc-500"}`}>
      Family members dependent on your income
    </p>
  </div>
  {/* Bank Statement Upload */}
<div className="sm:col-span-2">
  <label
    className={`block text-xs sm:text-sm font-medium mb-2 ${
      darkMode ? "text-zinc-300" : "text-zinc-700"
    }`}
  >
    Bank Statement <span className="text-red-500">*</span>
  </label>

  <div
    className={`relative border-2 border-dashed rounded-lg p-4 sm:p-5 cursor-pointer transition-all ${
      darkMode
        ? "border-zinc-600 bg-zinc-700/50 hover:bg-zinc-700"
        : "border-zinc-300 bg-zinc-50 hover:bg-zinc-100"
    }`}
    onClick={() => document.getElementById("bankStatementInput").click()}
  >
    <input
      id="bankStatementInput"
      type="file"
      name="bankStatement"
      accept="image/*,application/pdf"
      onChange={handleInputChange}
      className="hidden"
      required
    />

    <div className="flex items-center space-x-3">
      <svg
        className={`w-8 h-8 ${
          darkMode ? "text-zinc-400" : "text-zinc-500"
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 16V4a1 1 0 011-1h8a1 1 0 011 1v12m-9 4h8m-4-4v4"
        />
      </svg>

      <div>
        <p
          className={`text-sm sm:text-base font-medium ${
            darkMode ? "text-zinc-300" : "text-zinc-700"
          }`}
        >
          Upload Bank Statement
        </p>
        <p
          className={`text-xs ${
            darkMode ? "text-zinc-400" : "text-zinc-500"
          }`}
        >
          JPG, PNG, or PDF — Max 5 MB
        </p>
      </div>
    </div>

    {/* File name preview */}
    {formData.bankStatement && (
      <p
        className={`mt-3 text-xs break-all ${
          darkMode ? "text-zinc-400" : "text-zinc-600"
        }`}
      >
        Selected: {formData.bankStatement.name}
      </p>
    )}
  </div>
</div>


</div>


    {/* Navigation Buttons */}
    <div className="flex justify-between pt-4 gap-3">
      <button
        onClick={() => handleNext(2)}
        className={`px-4 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg font-semibold transition-all border ${
          darkMode
            ? "border-zinc-600 text-white hover:bg-zinc-700"
            : "border-zinc-300 text-zinc-900 hover:bg-zinc-100"
        } flex items-center gap-2`}
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="hidden sm:inline">Previous</span>
        <span className="sm:hidden">Back</span>
      </button>
      <button
        onClick={() => handleNext(4)}
        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg transition-all hover:shadow-lg flex items-center gap-2 cursor-pointer"
      >
        Next
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
)}

{/* Step 4: Reason for Aid Request */}
{currentStep === 4 && (
  <div className="space-y-4 sm:space-y-6">
    <div className="border-l-4 border-emerald-500 pl-3 sm:pl-4 mb-4 sm:mb-6">
      <h2 className={`text-xl sm:text-2xl font-bold ${darkMode ? "text-white" : "text-zinc-900"}`}>
        Reason for Aid Request
      </h2>
      <p className={`text-xs sm:text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
        Please provide details about your aid requirements
      </p>
    </div>

    {/* Type of Aid Required */}
    <div>
      <label className={`block text-xs sm:text-sm font-medium mb-3 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
        Type of Aid Required <span className="text-red-500">*</span>
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
        {['Medical', 'Education', 'Food', 'Shelter', 'Employment', 'Other'].map((aidType) => (
          <label key={aidType} className="cursor-pointer">
            <input
              type="radio"
              name="aidType"
              value={aidType.toLowerCase()}
              checked={formData.aidType === aidType.toLowerCase()}
              onChange={handleInputChange}
              className="peer sr-only"
              required
            />
            <div className={`p-2.5 sm:p-3 rounded-lg border-2 text-center transition-all peer-checked:border-emerald-500 peer-checked:bg-emerald-50 peer-checked:dark:bg-emerald-950/30 ${
              darkMode 
                ? "border-zinc-600 bg-zinc-700 hover:border-zinc-500" 
                : "border-zinc-300 bg-white hover:border-zinc-400"
            }`}>
              <span className={`font-medium text-xs sm:text-sm ${
                formData.aidType === aidType.toLowerCase() 
                  ? 'text-emerald-600' 
                  : darkMode ? "text-white" : "text-zinc-900"
              }`}>
                {aidType}
              </span>
            </div>
          </label>
        ))}
      </div>
    </div>

    {/* Description of Financial Hardship */}
    <div>
      <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
        Description of Financial Hardship <span className="text-red-500">*</span>
      </label>
      <textarea
        name="hardshipDescription"
        value={formData.hardshipDescription}
        onChange={handleInputChange}
        placeholder="Please describe your financial hardship and why you need assistance..."
        rows="5"
        className={`w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none ${
          darkMode
            ? "bg-zinc-700 border-zinc-600 text-white placeholder-zinc-500"
            : "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400"
        }`}
        required
      />
      <p className={`text-[10px] sm:text-xs mt-1 ${darkMode ? "text-zinc-500" : "text-zinc-500"}`}>
        Provide detailed information about your situation
      </p>
    </div>

    {/* Supporting Documents Upload */}
    <div>
      <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
        Supporting Documents <span className="text-red-500">*</span>
      </label>
      <div className={`relative border-2 border-dashed rounded-lg p-4 sm:p-6 transition-all ${
        darkMode 
          ? "border-zinc-600 bg-zinc-700 hover:border-emerald-500" 
          : "border-zinc-300 bg-zinc-50 hover:border-emerald-500"
      }`}>
        <input
          type="file"
          name="supportingDocuments"
          onChange={(e) => {
            const files = Array.from(e.target.files)
            setFormData(prev => ({
              ...prev,
              supportingDocuments: files
            }))
          }}
          accept=".pdf,.jpg,.jpeg,.png"
          multiple
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          required
        />
        <div className="text-center">
          <div className={`mx-auto w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-2 sm:mb-3 ${
            darkMode ? "bg-zinc-600" : "bg-zinc-200"
          }`}>
            <svg className={`w-5 h-5 sm:w-6 sm:h-6 ${darkMode ? "text-zinc-400" : "text-zinc-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          {formData.supportingDocuments && formData.supportingDocuments.length > 0 ? (
            <div>
              <p className={`font-medium text-sm sm:text-base ${darkMode ? "text-emerald-400" : "text-emerald-600"}`}>
                {formData.supportingDocuments.length} file(s) selected
              </p>
              <div className={`text-[10px] sm:text-xs mt-2 ${darkMode ? "text-zinc-400" : "text-zinc-600"} max-h-20 overflow-y-auto`}>
                {formData.supportingDocuments.map((file, idx) => (
                  <div key={idx} className="truncate">{file.name}</div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <p className={`font-medium text-sm sm:text-base ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                Click to upload or drag and drop only one document
              </p>
              <p className={`text-xs sm:text-sm mt-1 ${darkMode ? "text-zinc-500" : "text-zinc-500"}`}>
                Hospital Bills or Medical Reports or Prescriptions, etc.
              </p>
              <p className={`text-[10px] sm:text-xs mt-1 ${darkMode ? "text-zinc-500" : "text-zinc-500"}`}>
                PDF, JPG, JPEG or PNG (Multiple files allowed)
              </p>
            </div>
          )}
        </div>
      </div>
    </div>

   
    {/* Navigation Buttons */}
    <div className="flex justify-between pt-4 gap-3">
      <button
        onClick={() => handleNext(3)}
        className={`px-4 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg font-semibold transition-all border ${
          darkMode
            ? "border-zinc-600 text-white hover:bg-zinc-700"
            : "border-zinc-300 text-zinc-900 hover:bg-zinc-100"
        } flex items-center gap-2`}
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="hidden sm:inline">Previous</span>
        <span className="sm:hidden">Back</span>
      </button>
      <button
        onClick={handleSubmit}
        disabled={!formData.declarationConsent}
        className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-zinc-400 disabled:cursor-not-allowed text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg transition-all hover:shadow-lg flex items-center gap-2 cursor-pointer"
      >
        Submit
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
    </div>
  </div>
)}
        </motion.div>
      </div>
    </div>
    </>
  )
}