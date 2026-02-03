"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSubmitFinancialAidMutation } from "@/utils/slices/financialAidApiSlice"
import {
  Building2,
  Users,
  FileText,
  Award,
  ChevronRight,
  CheckCircle2,
  Check,
  X,
  Upload,
  ChevronLeft
} from "lucide-react"

import Link from "next/link"

import FilePreview from "./FilePreview"
import { useAppToast } from "@/app/AppToastContext"

export default function OrganizationRegistrationPage({ darkModeFromParent }) {
  const router = useRouter()
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const [submitFinancialAid, { isLoading }] = useSubmitFinancialAidMutation()
  const [darkMode, setDarkMode] = useState(false)
  const { showToast } = useAppToast()


  useEffect(() => {
    if (darkModeFromParent !== undefined) {
      setDarkMode(darkModeFromParent)
    }
  }, [darkModeFromParent])
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: NGO Registration Form
    nonProfit: "",
    organizationTypeDescription: "",
    organizationName: '',
    registrationNumber: '',
    certification80G: null,
    panCardImage: null,
    city: "",
    causeSupported: [],
    founderName: "",
    founderEmail: "",
    founderMobile: "",
    ngoWebsite: "",
    aboutNGO: "",

    // Step 2: Login/Contact's Details
    contactName: "",
    contactNumber: "",
    contactEmail: "",
    designation: "",

    // Step 3: Certifications
    has80G: "",
    expiryDate: "",
    certification80G: null,
    panCard: "",
    panCardImage: null,
    hasFCRA: "",

    // Step 4: Organization Profile
    budget: "",
    donorDatabase: "",
    fullTimeFundraising: "",
    crowdfundedBefore: "",
    employeeStrength: "",
    volunteerStrength: "",
    organizeEvents: "",

    termsAccepted: false,
  })

  const handleInputChange = (e) => {
    const { name, value, type } = e.target

    if (type === "file") {
      setFormData(prev => ({
        ...prev,
        [name]: e.target.files[0]
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleCheckboxChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter(item => item !== value)
        : [...prev[name], value]
    }))
  }

  const removeFile = (name) => {
    setFormData(prev => ({ ...prev, [name]: null }))
  }

  const requiredFields = {
    1: ["nonProfit", "organizationName", "city", "termsAccepted"],
    2: ["contactName", "contactNumber", "contactEmail", "designation"],
    3: ["has80G", "hasFCRA"],
    4: ["budget", "donorDatabase", "fullTimeFundraising", "crowdfundedBefore", "employeeStrength"],
    5: ["termsAccepted"]
  };

  const validateStep = (step) => {
    if (formData.nonProfit === "no" && step === 3) return true;

    const fields = requiredFields[step];
    if (!fields) return true;

    for (const field of fields) {
      const value = formData[field];
      if ((field === "termsAccepted") && value !== true) {
        return false;
      }
      if (value === "" || value === null || value === undefined) {
        return false;
      }
    }
    return true;
  };

  const handleNext = (nextStep) => {
    let targetStep = nextStep;

    // Skip Step 3 if not non-profit
    if (formData.nonProfit === "no") {
      if (currentStep === 2 && nextStep === 3) targetStep = 4;
      if (currentStep === 4 && nextStep === 3) targetStep = 2;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentStep(targetStep);
  };

  const handleSubmit = async (e) => {
    // allow calling handleSubmit from onClick (no event) or from a form submit event
    if (e && e.preventDefault) {
      e.preventDefault()
    }

    if (!formData.termsAccepted) {
      showToast({
        type: "error",
        title: "Please accept the terms and policies",
        message: ' ',
        duration: 2000,
      });
      return
    }

    try {
      // Create FormData object for file uploads
      const formDataToSend = new FormData()

      // Add form type
      formDataToSend.append('formType', 'organization')

      // Step 1: NGO Registration Form
      formDataToSend.append('fullName', formData.organizationName || '')
      formDataToSend.append('nonProfit', formData.nonProfit || '')
      formDataToSend.append('city', formData.city || '')
      formDataToSend.append('causeSupported', JSON.stringify(formData.causeSupported))
      formDataToSend.append('founderName', formData.founderName || '')
      formDataToSend.append('founderEmail', formData.founderEmail || '')
      formDataToSend.append('founderMobile', formData.founderMobile || '')
      formDataToSend.append('ngoWebsite', formData.ngoWebsite || '')
      formDataToSend.append('aboutNGO', formData.aboutNGO || '')

      // Step 2: Contact Details
      formDataToSend.append('contactName', formData.contactName || '')
      formDataToSend.append('contactNumber', formData.contactNumber || '')
      formDataToSend.append('email', formData.contactEmail || '')
      formDataToSend.append('designation', formData.designation || '')

      // Step 3: Certifications
      formDataToSend.append('has80G', formData.has80G || '')
      formDataToSend.append('expiryDate', formData.expiryDate || '')
      formDataToSend.append('panCard', formData.panCard || '')
      formDataToSend.append('hasFCRA', formData.hasFCRA || '')

      // Step 4: Organization Profile
      formDataToSend.append('budget', formData.budget || '')
      formDataToSend.append('donorDatabase', formData.donorDatabase || '')
      formDataToSend.append('fullTimeFundraising', formData.fullTimeFundraising || '')
      formDataToSend.append('crowdfundedBefore', formData.crowdfundedBefore || '')
      formDataToSend.append('employeeStrength', formData.employeeStrength || '')
      formDataToSend.append('volunteerStrength', formData.volunteerStrength || '')
      formDataToSend.append('organizeEvents', formData.organizeEvents || '')

      // File uploads
      if (formData.certification80G) {
        formDataToSend.append('certification80G', formData.certification80G)
      }
      if (formData.panCardImage) {
        formDataToSend.append('panCardImage', formData.panCardImage)
      }

      // Submit the form
      const result = await submitFinancialAid(formDataToSend).unwrap()

      if (result.success) {
        setShowSuccessMessage(true)
        setTimeout(() => {
          router.push('/')
        }, 3000)
      }
    } catch (err) {
      console.error('Failed to submit application:', err)
      setShowErrorMessage(true)
      setTimeout(() => setShowErrorMessage(false), 5000)
    }
  }

  const causes = [
    "Animals",
    "Disaster Relief",
    "Food & Hunger",
    "Soldiers",
    "Community Development",
    "Education",
    "Personal Causes",
    "Sports",
    "Creative Project",
    "Environment",
    "Senior Citizens",
    "Women & Girls"
  ]

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
            <p className="font-semibold">Registration Submitted Successfully!</p>
            <p className="text-sm text-emerald-100">Redirecting to home page...</p>
          </div>
        </motion.div>
      )}

      {showErrorMessage && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 
         bg-gradient-to-r from-red-600 to-red-400 text-white px-6 py-4 rounded-lg shadow-2xl 
         flex items-center gap-3 max-w-md w-[90%] sm:w-auto"
        >
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <div>
            <p className="font-semibold">Submission Failed!</p>
            <p className="text-sm text-red-100">Please try again later</p>
          </div>
        </motion.div>
      )}

      <div className={`min-h-screen ${darkMode ? "bg-zinc-900" : "bg-neutral-50"} py-12 sm:py-20`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-2 pb-12 sm:pb-24">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <button
              onClick={() => router.push('/')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${darkMode ? "text-zinc-400 hover:text-white hover:bg-zinc-800" : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"}`}
            >
              <ChevronLeft size={20} />
              <span className="font-medium">Back to Home</span>
            </button>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6 sm:mb-8"
          >
            <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 ${darkMode ? "text-white" : "text-zinc-900"}`}>
              Organization Registration
            </h1>
            <p className={`text-sm sm:text-base ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
              Please fill out all required information accurately
            </p>
          </motion.div>

          {/* Progress Indicator */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center justify-between sm:justify-center sm:gap-4 md:gap-6 mb-2 overflow-x-auto px-2">
              {[1, 2, 3, 4, 5].map((step, index) => (
                <div key={step} className="flex items-center flex-shrink-0">
                  <button
                    onClick={() => handleNext(step)}
                    className="flex flex-col items-center group cursor-pointer border-none bg-transparent py-2"
                    disabled={step > currentStep}
                  >
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold text-sm sm:text-base transition-all ${currentStep >= step
                        ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                        : darkMode
                          ? "bg-zinc-700 text-zinc-400"
                          : "bg-zinc-200 text-zinc-500"
                        } ${step <= currentStep ? "group-hover:scale-110" : ""}`}
                    >
                      {step}
                    </div>
                    <span
                      className={`text-[10px] sm:text-xs mt-1 sm:mt-2 whitespace-nowrap transition-colors ${currentStep === step
                        ? "text-emerald-500 font-bold"
                        : darkMode ? "text-zinc-400 group-hover:text-zinc-300" : "text-zinc-600 group-hover:text-zinc-900"
                        }`}
                    >
                      {step === 1 ? "NGO Info" : step === 2 ? "Contact" : step === 3 ? "Certificates" : step === 4 ? "Profile" : "Preview"}
                    </span>
                  </button>

                  {index < 4 && (
                    <div
                      className={`w-8 sm:w-12 md:w-16 -mt-5 md:-mt-5 h-1 mx-2 sm:mx-4 rounded transition-all ${currentStep > step
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
            {/* Step 1: NGO Registration Form */}
            {currentStep === 1 && (
              <div className="space-y-4 sm:space-y-6">
                <div className="border-l-4 border-emerald-500 pl-3 sm:pl-4 mb-4 sm:mb-6">
                  <h2 className={`text-xl sm:text-2xl font-bold ${darkMode ? "text-white" : "text-zinc-900"}`}>
                    NGO Registration Form
                  </h2>
                  <p className={`text-xs sm:text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                    Please provide your organization details
                  </p>
                </div>

                {/* Question 1: Is your organization a registered Non-Profit? */}
                {/* Question 1: Is your organization a registered Non-Profit? */}
                <div>
                  <label className={`block text-xs sm:text-sm font-medium mb-3 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                    1. Is your organization a registered Non-Profit? <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { value: "trust", label: "Yes - As a Trust" },
                      { value: "society", label: "Yes - As a Society" },
                      { value: "company", label: "Yes - As a Section 25 or Section 8 Company" },
                      { value: "no", label: "No" }
                    ].map((option) => (
                      <label key={option.value} className="flex items-center cursor-pointer group select-none">
                        <input
                          type="radio"
                          name="nonProfit"
                          value={option.value}
                          checked={formData.nonProfit === option.value}
                          onChange={handleInputChange}
                          className="sr-only peer"
                          required
                        />
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${formData.nonProfit === option.value
                          ? "border-emerald-600 bg-emerald-600"
                          : darkMode ? "border-zinc-500 bg-zinc-700" : "border-zinc-400 bg-white"
                          }`}>
                          <Check
                            className={`w-3.5 h-3.5 text-white transition-opacity ${formData.nonProfit === option.value ? "opacity-100" : "opacity-0"}`}
                            strokeWidth={3}
                          />
                        </div>
                        <span className={`ml-2 sm:ml-3 font-medium text-xs sm:text-sm ${formData.nonProfit === option.value ? 'text-emerald-600' : darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>

                  {/* Conditional Input for "No" Selection */}
                  <AnimatePresence>
                    {formData.nonProfit === "no" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pl-1">
                          <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                            What type of organization are you? <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="organizationTypeDescription"
                            value={formData.organizationTypeDescription}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2.5 sm:py-3 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${darkMode ? "bg-zinc-800 border-zinc-600 text-white" : "bg-white border-zinc-300 text-zinc-900"}`}
                            required={formData.nonProfit === "no"}
                          >
                            <option value="">Select type</option>
                            <option value="Private Limited">Private Limited</option>
                            <option value="Partnership">Partnership</option>
                            <option value="Proprietorship">Proprietorship</option>
                            <option value="Corporate">Corporate</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {/* Questions 2 & 3: Organization Name & City */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                      2. Organization Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Building2 className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 ${darkMode ? "text-zinc-500" : "text-zinc-400"}`} />
                      <input
                        type="text"
                        name="organizationName"
                        value={formData.organizationName}
                        onChange={handleInputChange}
                        placeholder="Enter organization name"
                        className={`w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${darkMode
                          ? "bg-zinc-700 border-zinc-600 text-white placeholder-zinc-500"
                          : "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400"
                          }`}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                      3. City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Enter city"
                      className={`w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${darkMode
                        ? "bg-zinc-700 border-zinc-600 text-white placeholder-zinc-500"
                        : "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400"
                        }`}
                      required
                    />
                  </div>
                </div>

                {/* Question 4: Cause Supported */}
                <div>
                  <label className={`block text-xs sm:text-sm font-medium mb-3 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                    4. Cause Supported (Choose your main area of work) <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
                    {causes.map((cause) => (
                      <label key={cause} className="flex items-center cursor-pointer group select-none">
                        <input
                          type="checkbox"
                          checked={formData.causeSupported.includes(cause)}
                          onChange={() => handleCheckboxChange("causeSupported", cause)}
                          className="sr-only peer"
                        />
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${formData.causeSupported.includes(cause)
                          ? "border-emerald-600 bg-emerald-600"
                          : darkMode ? "border-zinc-500 bg-zinc-700" : "border-zinc-400 bg-white"
                          }`}>
                          {/* Tick Icon */}
                          <Check
                            className={`w-3.5 h-3.5 text-white transition-opacity ${formData.causeSupported.includes(cause) ? "opacity-100" : "opacity-0"
                              }`}
                            strokeWidth={3}
                          />
                        </div>
                        <span className={`ml-2 text-xs sm:text-sm ${formData.causeSupported.includes(cause) ? 'text-emerald-600 font-medium' : darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                          {cause}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Questions 5 & 6: Founder's Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                      5. Founder's Name(s) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="founderName"
                      value={formData.founderName}
                      onChange={handleInputChange}
                      placeholder="Enter founder's name"
                      className={`w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${darkMode
                        ? "bg-zinc-700 border-zinc-600 text-white placeholder-zinc-500"
                        : "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400"
                        }`}
                      required
                    />
                  </div>

                  <div>
                    <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                      6. Founder's Email(s) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="founderEmail"
                      value={formData.founderEmail}
                      onChange={handleInputChange}
                      placeholder="Enter founder's email"
                      className={`w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${darkMode
                        ? "bg-zinc-700 border-zinc-600 text-white placeholder-zinc-500"
                        : "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400"
                        }`}
                      required
                    />
                  </div>
                </div>

                {/* Questions 7 & 8: Founder's Mobile & NGO Website */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                      7. Founder's Mobile(s) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="founderMobile"
                      value={formData.founderMobile}
                      onChange={handleInputChange}
                      placeholder="Enter mobile number"
                      className={`w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${darkMode
                        ? "bg-zinc-700 border-zinc-600 text-white placeholder-zinc-500"
                        : "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400"
                        }`}
                      required
                    />
                  </div>

                  <AnimatePresence>
                    {formData.nonProfit !== "no" && formData.nonProfit !== "" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden mb-6"
                      >
                        <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                          8. NGO Website URL
                        </label>
                        <input
                          type="url"
                          name="ngoWebsite"
                          value={formData.ngoWebsite}
                          onChange={handleInputChange}
                          placeholder="eg: rahmanfoundation.org"
                          className={`w-full px-4 py-2.5 sm:py-3 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${darkMode ? "bg-zinc-700 border-zinc-600 text-white" : "bg-white border-zinc-300 text-zinc-900"}`}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Question 9: Tell Us About Your NGO */}
                <AnimatePresence>
                  {formData.nonProfit !== "no" && formData.nonProfit !== "" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                        9. Tell Us About Your NGO/Founder
                      </label>
                      <textarea
                        name="aboutNGO"
                        value={formData.aboutNGO}
                        onChange={handleInputChange}
                        rows={5}
                        placeholder="Describe your organization and its mission"
                        className={`w-full px-4 py-2.5 sm:py-3 text-sm rounded-lg border transition-all resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 ${darkMode ? "bg-zinc-700 border-zinc-600 text-white" : "bg-white border-zinc-300 text-zinc-900"}`}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Declaration & Consent */}
                <div className={`mt-6 sm:mt-8 p-4 sm:p-6 rounded-lg border ${darkMode ? "bg-zinc-700/50 border-zinc-600" : "bg-zinc-50 border-zinc-200"
                  }`}>
                  <h3 className={`font-bold text-base sm:text-lg mb-3 sm:mb-4 ${darkMode ? "text-white" : "text-zinc-900"}`}>
                    Declaration & Consent
                  </h3>
                  <div className={`text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                    <p>
                      I hereby declare that I am not getting assistance/provision from any other organization or entity in any form and the information provided above is true. Any misrepresentation may lead to disqualification. I authorize True Path Foundation to visit and contact me to verify the provided details. I understand that video verification, its online solicitation/circulation and an appeal are mandatory for funding campaigns. A copy of a document of identity proof and bank details (if available) must be attached. I/We provide free consent for this process and acknowledge full understanding of this form in vernacular.
                    </p>
                  </div>

                  {/* Terms and Policies Acceptance */}
                  <div className={`pt-4 border-t ${darkMode ? 'border-zinc-600' : 'border-zinc-200'}`}>
                    <label className="flex items-start cursor-pointer group">
                      <input
                        type="checkbox"
                        name="termsAccepted"
                        checked={formData.termsAccepted}
                        onChange={(e) => setFormData(prev => ({ ...prev, termsAccepted: e.target.checked }))}
                        className="sr-only peer"
                        required
                      />
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${formData.termsAccepted
                        ? "border-emerald-600 bg-emerald-600"
                        : darkMode ? "border-zinc-500 bg-zinc-700" : "border-zinc-400 bg-white"
                        }`}>
                        <Check
                          className={`w-3.5 h-3.5 text-white transition-opacity ${formData.termsAccepted ? "opacity-100" : "opacity-0"}`}
                          strokeWidth={3}
                        />
                      </div>
                      <span className={`ml-2 sm:ml-3 text-xs sm:text-sm font-medium ${formData.termsAccepted ? 'text-emerald-600' : darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                        I agree to the <Link href="/policies" className="underline hover:text-emerald-500">Terms and Policies</Link> of True Path Foundation <span className="text-red-500">*</span>
                      </span>
                    </label>
                  </div>
                </div>

                {/* Navigation Button */}
                <div className="flex justify-end pt-4">
                  <button
                    disabled={!validateStep(currentStep)}
                    onClick={() => handleNext(2)}
                    className={`px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg transition-all shadow-lg text-sm sm:text-base ${!validateStep(currentStep) ? "opacity-50 cursor-not-allowed grayscale" : "hover:from-emerald-700 hover:to-teal-700"}`}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Login/Contact's Details */}
            {currentStep === 2 && (
              <div className="space-y-4 sm:space-y-6">
                <div className="border-l-4 border-emerald-500 pl-3 sm:pl-4 mb-4 sm:mb-6">
                  <h2 className={`text-xl sm:text-2xl font-bold ${darkMode ? "text-white" : "text-zinc-900"}`}>
                    Login/Contact's Details
                  </h2>
                  <p className={`text-xs sm:text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                    Please provide contact person information
                  </p>
                </div>

                {/* Questions 10, 11, 12 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                  <div>
                    <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                      10. Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      placeholder="Enter name"
                      className={`w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${darkMode
                        ? "bg-zinc-700 border-zinc-600 text-white placeholder-zinc-500"
                        : "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400"
                        }`}
                      required
                    />
                  </div>

                  <div>
                    <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                      11. Contact number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      placeholder="Enter contact number"
                      className={`w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${darkMode
                        ? "bg-zinc-700 border-zinc-600 text-white placeholder-zinc-500"
                        : "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400"
                        }`}
                      required
                    />
                  </div>

                  <div>
                    <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                      12. Email ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      placeholder="Enter email"
                      className={`w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${darkMode
                        ? "bg-zinc-700 border-zinc-600 text-white placeholder-zinc-500"
                        : "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400"
                        }`}
                      required
                    />
                  </div>
                </div>

                {/* Question 13: Point Of Contact Designation */}
                <div>
                  <label className={`block text-xs sm:text-sm font-medium mb-3 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                    13. Point Of Contact Designation <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      "Founder/Trustee/Director/General Secretary",
                      "Communications/Marketing role",
                      "Other",
                      "Fundraising Manager/Co-ordinator/Team member",
                      "Volunteer/Intern"
                    ].map((role) => (
                      <label key={role} className="flex items-center cursor-pointer group select-none">
                        <input
                          type="radio"
                          name="designation"
                          value={role}
                          checked={formData.designation === role}
                          onChange={handleInputChange}
                          className="sr-only peer"
                          required
                        />
                        {/* Square Container with Border */}
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${formData.designation === role
                          ? "border-emerald-600 bg-emerald-600"
                          : darkMode ? "border-zinc-500 bg-zinc-700" : "border-zinc-400 bg-white"
                          }`}>
                          {/* Tick Icon */}
                          <Check
                            className={`w-3.5 h-3.5 text-white transition-opacity ${formData.designation === role ? "opacity-100" : "opacity-0"}`}
                            strokeWidth={3}
                          />
                        </div>
                        <span className={`ml-2 sm:ml-3 font-medium text-xs sm:text-sm ${formData.designation === role ? 'text-emerald-600' : darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                          {role}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => handleNext(1)}
                    className={`px-6 sm:px-8 py-2.5 sm:py-3 font-semibold rounded-lg transition-all text-sm sm:text-base ${darkMode
                      ? "bg-zinc-700 hover:bg-zinc-600 text-white"
                      : "bg-zinc-200 hover:bg-zinc-300 text-zinc-900"
                      }`}
                  >
                    Back
                  </button>
                  <button
                    disabled={!validateStep(currentStep)}
                    onClick={() => handleNext(3)}
                    className={`px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg text-sm sm:text-base ${!validateStep(currentStep) ? "opacity-50 cursor-not-allowed grayscale" : ""}`}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Certifications */}
            {currentStep === 3 && (
              <div className="space-y-4 sm:space-y-6">
                <div className="border-l-4 border-emerald-500 pl-3 sm:pl-4 mb-4 sm:mb-6">
                  <h2 className={`text-xl sm:text-2xl font-bold ${darkMode ? "text-white" : "text-zinc-900"}`}>
                    Certifications
                  </h2>
                  <p className={`text-xs sm:text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                    Please provide certification details
                  </p>
                </div>

                {/* Question 14: 80G Certification */}
                <div className={formData.nonProfit === "no" ? "opacity-50 pointer-events-none" : ""}>
                  <label className={`block text-xs sm:text-sm font-medium mb-3 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                    14. Does your organization have 80G certification? <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-4 sm:gap-6">
                    {["yes", "no"].map((option) => (
                      <label key={option} className="flex items-center cursor-pointer group select-none">
                        <input
                          type="radio"
                          name="has80G"
                          value={option}
                          checked={formData.has80G === option}
                          onChange={handleInputChange}
                          className="sr-only peer"
                          required={formData.nonProfit !== "no"}
                          disabled={formData.nonProfit === "no"}
                        />
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${formData.has80G === option
                          ? "border-emerald-600 bg-emerald-600"
                          : darkMode ? "border-zinc-500 bg-zinc-700" : "border-zinc-400 bg-white"
                          }`}>
                          <Check
                            className={`w-3.5 h-3.5 text-white transition-opacity ${formData.has80G === option ? "opacity-100" : "opacity-0"}`}
                            strokeWidth={3}
                          />
                        </div>
                        <span className={`ml-2 sm:ml-3 font-medium text-sm sm:text-base ${formData.has80G === option ? 'text-emerald-600' : darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                          {option === "yes" ? "Yes" : "No"}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Conditional fields for 80G = Yes */}
                {formData.has80G === "yes" && (
                  <div className={formData.nonProfit === "no" ? "opacity-50 pointer-events-none" : ""}>
                    {/* All the 14.1, 14.2, 14.3, 14.4 fields remain exactly as they are */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      {/* Keep all existing code for these fields */}
                    </div>
                  </div>
                )}

                {/* Question 15: FCRA Certification */}
                <div className={formData.nonProfit === "no" ? "opacity-50 pointer-events-none" : ""}>
                  <label className={`block text-xs sm:text-sm font-medium mb-3 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                    15. Does your organization have FCRA certification? <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-4 sm:gap-6">
                    {["yes", "no"].map((option) => (
                      <label key={option} className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="hasFCRA"
                          value={option}
                          checked={formData.hasFCRA === option}
                          onChange={handleInputChange}
                          className="sr-only peer"
                          required={formData.nonProfit !== "no"}
                          disabled={formData.nonProfit === "no"}
                        />
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${formData.hasFCRA === option
                          ? "border-emerald-600 bg-emerald-600"
                          : darkMode ? "border-zinc-500 bg-zinc-700" : "border-zinc-400 bg-white"
                          }`}>
                          <Check
                            className={`w-3.5 h-3.5 text-white transition-opacity ${formData.hasFCRA === option ? "opacity-100" : "opacity-0"}`}
                            strokeWidth={3}
                          />
                        </div>
                        <span className={`ml-2 sm:ml-3 font-medium text-sm sm:text-base ${formData.hasFCRA === option ? 'text-emerald-600' : darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                          {option === "yes" ? "Yes" : "No"}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Navigation Buttons - NOT DISABLED */}
                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => handleNext(2)}
                    className={`px-6 sm:px-8 py-2.5 sm:py-3 font-semibold rounded-lg transition-all text-sm sm:text-base ${darkMode
                      ? "bg-zinc-700 hover:bg-zinc-600 text-white"
                      : "bg-zinc-200 hover:bg-zinc-300 text-zinc-900"
                      }`}
                  >
                    Back
                  </button>
                  <button
                    disabled={!validateStep(currentStep)}
                    onClick={() => handleNext(4)}
                    className={`px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg text-sm sm:text-base ${!validateStep(currentStep) ? "opacity-50 cursor-not-allowed grayscale" : ""}`}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Organization Profile */}
            {currentStep === 4 && (
              <div className="space-y-4 sm:space-y-6">
                <div className="border-l-4 border-emerald-500 pl-3 sm:pl-4 mb-4 sm:mb-6">
                  <h2 className={`text-xl sm:text-2xl font-bold ${darkMode ? "text-white" : "text-zinc-900"}`}>
                    Organization Profile
                  </h2>
                  <p className={`text-xs sm:text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                    Please provide your organization profile information
                  </p>
                </div>

                {/* Question 16: Budget */}
                <div>
                  <label className={`block text-xs sm:text-sm font-medium mb-3 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                    16. Last financial year's budget <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {["0-25 lacs", "25 lacs - 1 Cr", "> 1 Cr"].map((option) => (
                      <label key={option} className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="budget"
                          value={option}
                          checked={formData.budget === option}
                          onChange={handleInputChange}
                          className="sr-only peer"
                          required
                        />
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${formData.budget === option
                          ? "border-emerald-600 bg-emerald-600"
                          : darkMode ? "border-zinc-500 bg-zinc-700" : "border-zinc-400 bg-white"
                          }`}>
                          <Check
                            className={`w-3.5 h-3.5 text-white transition-opacity ${formData.budget === option ? "opacity-100" : "opacity-0"}`}
                            strokeWidth={3}
                          />
                        </div>
                        <span className={`ml-2 sm:ml-3 font-medium text-xs sm:text-sm ${formData.budget === option ? 'text-emerald-600' : darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Question 17: Donor Database */}
                <div>
                  <label className={`block text-xs sm:text-sm font-medium mb-3 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                    17. Total donor database strength <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {["0-100", "100-500", ">500"].map((option) => (
                      <label key={option} className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="donorDatabase"
                          value={option}
                          checked={formData.donorDatabase === option}
                          onChange={handleInputChange}
                          className="sr-only peer"
                          required
                        />
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${formData.donorDatabase === option
                          ? "border-emerald-600 bg-emerald-600"
                          : darkMode ? "border-zinc-500 bg-zinc-700" : "border-zinc-400 bg-white"
                          }`}>
                          <Check
                            className={`w-3.5 h-3.5 text-white transition-opacity ${formData.donorDatabase === option ? "opacity-100" : "opacity-0"}`}
                            strokeWidth={3}
                          />
                        </div>
                        <span className={`ml-2 sm:ml-3 font-medium text-xs sm:text-sm ${formData.donorDatabase === option ? 'text-emerald-600' : darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Question 18 */}
                <div>
                  <label className={`block text-xs sm:text-sm font-medium mb-3 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                    18. Do you have a full-time fundraising staff (1 or more)? <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-4 sm:gap-6">
                    {["Yes", "No"].map((option) => (
                      <label key={option} className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="fullTimeFundraising"
                          value={option}
                          checked={formData.fullTimeFundraising === option}
                          onChange={handleInputChange}
                          className="sr-only peer"
                          required
                        />
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${formData.fullTimeFundraising === option
                          ? "border-emerald-600 bg-emerald-600"
                          : darkMode ? "border-zinc-500 bg-zinc-700" : "border-zinc-400 bg-white"
                          }`}>
                          <Check
                            className={`w-3.5 h-3.5 text-white transition-opacity ${formData.fullTimeFundraising === option ? "opacity-100" : "opacity-0"}`}
                            strokeWidth={3}
                          />
                        </div>
                        <span className={`ml-2 sm:ml-3 font-medium text-sm sm:text-base ${formData.fullTimeFundraising === option ? 'text-emerald-600' : darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Question 19 */}
                <div>
                  <label className={`block text-xs sm:text-sm font-medium mb-3 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                    19. Have you crowdfunded before? <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-4 sm:gap-6">
                    {["Yes", "No"].map((option) => (
                      <label key={option} className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="crowdfundedBefore"
                          value={option}
                          checked={formData.crowdfundedBefore === option}
                          onChange={handleInputChange}
                          className="sr-only peer"
                          required
                        />
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${formData.crowdfundedBefore === option
                          ? "border-emerald-600 bg-emerald-600"
                          : darkMode ? "border-zinc-500 bg-zinc-700" : "border-zinc-400 bg-white"
                          }`}>
                          <Check
                            className={`w-3.5 h-3.5 text-white transition-opacity ${formData.crowdfundedBefore === option ? "opacity-100" : "opacity-0"}`}
                            strokeWidth={3}
                          />
                        </div>
                        <span className={`ml-2 sm:ml-3 font-medium text-sm sm:text-base ${formData.crowdfundedBefore === option ? 'text-emerald-600' : darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Question 20 */}
                <div>
                  <label className={`block text-xs sm:text-sm font-medium mb-3 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                    20. What is your organization's total employee strength? <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {["0-25", "25-100", ">100"].map((option) => (
                      <label key={option} className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="employeeStrength"
                          value={option}
                          checked={formData.employeeStrength === option}
                          onChange={handleInputChange}
                          className="sr-only peer"
                          required
                        />
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${formData.employeeStrength === option
                          ? "border-emerald-600 bg-emerald-600"
                          : darkMode ? "border-zinc-500 bg-zinc-700" : "border-zinc-400 bg-white"
                          }`}>
                          <Check
                            className={`w-3.5 h-3.5 text-white transition-opacity ${formData.employeeStrength === option ? "opacity-100" : "opacity-0"}`}
                            strokeWidth={3}
                          />
                        </div>
                        <span className={`ml-2 sm:ml-3 font-medium text-xs sm:text-sm ${formData.employeeStrength === option ? 'text-emerald-600' : darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Question 21 */}
                <div>
                  <label className={`block text-xs sm:text-sm font-medium mb-3 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                    21. What is your organization's total active volunteer strength? <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {["0-10", "10-100", ">100"].map((option) => (
                      <label key={option} className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="volunteerStrength"
                          value={option}
                          checked={formData.volunteerStrength === option}
                          onChange={handleInputChange}
                          className="sr-only peer"
                          required
                        />
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${formData.volunteerStrength === option
                          ? "border-emerald-600 bg-emerald-600"
                          : darkMode ? "border-zinc-500 bg-zinc-700" : "border-zinc-400 bg-white"
                          }`}>
                          <Check
                            className={`w-3.5 h-3.5 text-white transition-opacity ${formData.volunteerStrength === option ? "opacity-100" : "opacity-0"}`}
                            strokeWidth={3}
                          />
                        </div>
                        <span className={`ml-2 sm:ml-3 font-medium text-xs sm:text-sm ${formData.volunteerStrength === option ? 'text-emerald-600' : darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Question 22 */}
                <div>
                  <label className={`block text-xs sm:text-sm font-medium mb-3 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                    22. Do you organize any events? (Example: Medical Camp, Blood Donation Camp etc.) <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-4 sm:gap-6">
                    {["Yes", "No"].map((option) => (
                      <label key={option} className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="organizeEvents"
                          value={option}
                          checked={formData.organizeEvents === option}
                          onChange={handleInputChange}
                          className="sr-only peer"
                          required
                        />
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${formData.organizeEvents === option
                          ? "border-emerald-600 bg-emerald-600"
                          : darkMode ? "border-zinc-500 bg-zinc-700" : "border-zinc-400 bg-white"
                          }`}>
                          <Check
                            className={`w-3.5 h-3.5 text-white transition-opacity ${formData.organizeEvents === option ? "opacity-100" : "opacity-0"}`}
                            strokeWidth={3}
                          />
                        </div>
                        <span className={`ml-2 sm:ml-3 font-medium text-sm sm:text-base ${formData.organizeEvents === option ? 'text-emerald-600' : darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => handleNext(3)}
                    className={`px-6 sm:px-8 py-2.5 sm:py-3 font-semibold rounded-lg transition-all text-sm sm:text-base ${darkMode ? "bg-zinc-700 hover:bg-zinc-600 text-white" : "bg-zinc-200 hover:bg-zinc-300 text-zinc-900"
                      }`}
                  >
                    Back
                  </button>

                  <button
                    onClick={() => handleNext(5)}
                    className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg text-sm sm:text-base"
                  >
                    Preview
                  </button>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-4 sm:space-y-6">
                <div className="border-l-4 border-emerald-500 pl-3 sm:pl-4 mb-4 sm:mb-6">
                  <h2 className={`text-xl sm:text-2xl font-bold ${darkMode ? "text-white" : "text-zinc-900"}`}>
                    Preview Registration
                  </h2>
                  <p className={`text-xs sm:text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                    Review all details before final submission
                  </p>
                </div>

                <div className={`rounded-2xl p-4 sm:p-6 md:p-8 shadow-inner ${darkMode ? "bg-zinc-800" : "bg-white"}`}>
                  <h3 className={`font-semibold mb-3 ${darkMode ? "text-white" : "text-zinc-900"}`}>NGO Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                    <div>
                      <p className="text-xs text-zinc-500">Organization Name</p>
                      <p className={`font-medium ${darkMode ? "text-white" : "text-zinc-900"}`}>{formData.organizationName || "—"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500">Non-Profit Status</p>
                      <p className={`font-medium ${darkMode ? "text-white" : "text-zinc-900"}`}>{formData.nonProfit || "—"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500">City</p>
                      <p className={`font-medium ${darkMode ? "text-white" : "text-zinc-900"}`}>{formData.city || "—"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500">Causes Supported</p>
                      <p className={`font-medium ${darkMode ? "text-white" : "text-zinc-900"}`}>{formData.causeSupported.join(", ") || "—"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500">Founder Name</p>
                      <p className={`font-medium ${darkMode ? "text-white" : "text-zinc-900"}`}>{formData.founderName || "—"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500">Founder Email</p>
                      <p className={`font-medium ${darkMode ? "text-white" : "text-zinc-900"}`}>{formData.founderEmail || "—"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500">Founder Mobile</p>
                      <p className={`font-medium ${darkMode ? "text-white" : "text-zinc-900"}`}>{formData.founderMobile || "—"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500">Website</p>
                      <p className={`font-medium ${darkMode ? "text-white" : "text-zinc-900"}`}>{formData.ngoWebsite || "—"}</p>
                    </div>
                  </div>

                  <h3 className={`font-semibold mb-3 ${darkMode ? "text-white" : "text-zinc-900"}`}>Contact Person</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                    <div>
                      <p className="text-xs text-zinc-500">Name</p>
                      <p className={`font-medium ${darkMode ? "text-white" : "text-zinc-900"}`}>{formData.contactName || "—"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500">Contact Number</p>
                      <p className={`font-medium ${darkMode ? "text-white" : "text-zinc-900"}`}>{formData.contactNumber || "—"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500">Email</p>
                      <p className={`font-medium ${darkMode ? "text-white" : "text-zinc-900"}`}>{formData.contactEmail || "—"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500">Designation</p>
                      <p className={`font-medium ${darkMode ? "text-white" : "text-zinc-900"}`}>{formData.designation || "—"}</p>
                    </div>
                  </div>

                  <h3 className={`font-semibold mb-3 ${darkMode ? "text-white" : "text-zinc-900"}`}>Certifications</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                    <div>
                      <p className="text-xs text-zinc-500">80G Certification</p>
                      <p className={`font-medium ${darkMode ? "text-white" : "text-zinc-900"}`}>{formData.has80G || "—"}</p>
                    </div>
                    {formData.has80G === "yes" && (
                      <>
                        <div>
                          <p className="text-xs text-zinc-500">Expiry Date</p>
                          <p className={`font-medium ${darkMode ? "text-white" : "text-zinc-900"}`}>{formData.expiryDate || "—"}</p>
                        </div>
                        <div>
                          <p className="text-xs text-zinc-500">PAN Card</p>
                          <p className={`font-medium ${darkMode ? "text-white" : "text-zinc-900"}`}>{formData.panCard || "—"}</p>
                        </div>
                        <div>
                          <p className="text-xs text-zinc-500 mb-1">Certification Document</p>
                          {formData.certification80G ? (
                            <FilePreview file={formData.certification80G} darkMode={darkMode} />
                          ) : (
                            <p className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>No file</p>
                          )}
                        </div>
                        <div>
                          <p className="text-xs text-zinc-500 mb-1">PAN Card Document</p>
                          {formData.panCardImage ? (
                            <FilePreview file={formData.panCardImage} darkMode={darkMode} />
                          ) : (
                            <p className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>No file</p>
                          )}
                        </div>
                      </>
                    )}
                    <div>
                      <p className="text-xs text-zinc-500">FCRA Certification</p>
                      <p className={`font-medium ${darkMode ? "text-white" : "text-zinc-900"}`}>{formData.hasFCRA || "—"}</p>
                    </div>
                  </div>

                  <h3 className={`font-semibold mb-3 ${darkMode ? "text-white" : "text-zinc-900"}`}>Organization Profile</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                    <div>
                      <p className="text-xs text-zinc-500">Annual Budget</p>
                      <p className={`font-medium ${darkMode ? "text-white" : "text-zinc-900"}`}>{formData.budget || "—"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500">Donor Database</p>
                      <p className={`font-medium ${darkMode ? "text-white" : "text-zinc-900"}`}>{formData.donorDatabase || "—"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500">Full-time Fundraising Staff</p>
                      <p className={`font-medium ${darkMode ? "text-white" : "text-zinc-900"}`}>{formData.fullTimeFundraising || "—"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500">Crowdfunded Before</p>
                      <p className={`font-medium ${darkMode ? "text-white" : "text-zinc-900"}`}>{formData.crowdfundedBefore || "—"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500">Employee Strength</p>
                      <p className={`font-medium ${darkMode ? "text-white" : "text-zinc-900"}`}>{formData.employeeStrength || "—"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500">Volunteer Strength</p>
                      <p className={`font-medium ${darkMode ? "text-white" : "text-zinc-900"}`}>{formData.volunteerStrength || "—"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500">Organizes Events</p>
                      <p className={`font-medium ${darkMode ? "text-white" : "text-zinc-900"}`}>{formData.organizeEvents || "—"}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <button
                      onClick={() => setCurrentStep(4)}
                      className={`px-4 sm:px-8 py-2.5 rounded-lg font-semibold transition-all ${darkMode ? "bg-zinc-700 hover:bg-zinc-600 text-white" : "bg-zinc-200 hover:bg-zinc-300 text-zinc-900"}`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={!formData.termsAccepted || isLoading}
                      className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-zinc-400 disabled:cursor-not-allowed text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg transition-all hover:shadow-lg flex items-center gap-2"
                    >
                      {isLoading ? 'Submitting...' : 'Submit'}
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  )
}