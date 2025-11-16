"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect} from "react"
import { useRouter } from "next/navigation"
import { 
  Building2,
  Users,
  FileText,
  Award,
  ChevronRight,
  CheckCircle2,
  X,
  Upload
} from "lucide-react"

export default function OrganizationRegistrationPage({ darkModeFromParent }) {
  const router = useRouter()
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [darkMode, setDarkMode]= useState(false)
  
   useEffect(() => {
      if (darkModeFromParent !== undefined) {
        setDarkMode(darkModeFromParent)
      }
    }, [darkModeFromParent])
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: NGO Registration Form
    nonProfit: "",
    organizationName: "",
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
    organizeEvents: ""
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

  const handleNext = (nextStep) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setCurrentStep(nextStep)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    
    setShowSuccessMessage(true)
    
    setTimeout(() => {
      router.push('/')
    }, 3000)
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
              Organization Registration
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
                      {step === 1 ? "NGO Info" : step === 2 ? "Contact" : step === 3 ? "Certificates" : "Profile"}
                    </span>
                  </div>

                  {index < 3 && (
                    <div
                      className={`w-8 sm:w-12 md:w-16 -mt-5 md:-mt-5 h-1 mx-2 sm:mx-4 rounded transition-all ${
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

                {/* Question 1: Is your organisation a registered Non-Profit? */}
                <div>
                  <label className={`block text-xs sm:text-sm font-medium mb-3 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                    1. Is your organisation a registered Non-Profit? <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { value: "trust", label: "Yes - As a Trust" },
                      { value: "society", label: "Yes - As a Society" },
                      { value: "company", label: "Yes - As a Section 25 or Section 8 Company" },
                      { value: "no", label: "No" }
                    ].map((option) => (
                      <label key={option.value} className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="nonProfit"
                          value={option.value}
                          checked={formData.nonProfit === option.value}
                          onChange={handleInputChange}
                          className="sr-only peer"
                          required
                        />
                        <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center transition-all peer-checked:border-emerald-600 peer-checked:bg-emerald-600 ${
                          darkMode ? "border-zinc-500" : "border-zinc-400"
                        }`}>
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                        </div>
                        <span className={`ml-2 sm:ml-3 font-medium text-xs sm:text-sm ${formData.nonProfit === option.value ? 'text-emerald-600' : darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Questions 2 & 3: Organization Name & City */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                      2. Organisation Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Building2 className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 ${darkMode ? "text-zinc-500" : "text-zinc-400"}`} />
                      <input
                        type="text"
                        name="organizationName"
                        value={formData.organizationName}
                        onChange={handleInputChange}
                        placeholder="Enter organization name"
                        className={`w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                          darkMode
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
                      className={`w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        darkMode
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
                      <label key={cause} className="flex items-center cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={formData.causeSupported.includes(cause)}
                          onChange={() => handleCheckboxChange("causeSupported", cause)}
                          className="sr-only peer"
                        />
                        <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded border-2 flex items-center justify-center transition-all peer-checked:border-emerald-600 peer-checked:bg-emerald-600 ${
                          darkMode ? "border-zinc-500" : "border-zinc-400"
                        }`}>
                          <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
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
                      className={`w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        darkMode
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
                      className={`w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        darkMode
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
                      className={`w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        darkMode
                          ? "bg-zinc-700 border-zinc-600 text-white placeholder-zinc-500"
                          : "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400"
                      }`}
                      required
                    />
                  </div>

                  <div>
                    <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                      8. NGO Website URL
                    </label>
                    <input
                      type="url"
                      name="ngoWebsite"
                      value={formData.ngoWebsite}
                      onChange={handleInputChange}
                      placeholder="eg: rahmanfoundation.org"
                      className={`w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        darkMode
                          ? "bg-zinc-700 border-zinc-600 text-white placeholder-zinc-500"
                          : "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400"
                      }`}
                    />
                  </div>
                </div>

                {/* Question 9: Tell Us About Your NGO */}
                <div>
                  <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                    9. Tell Us About Your NGO/Founder
                  </label>
                  <textarea
                    name="aboutNGO"
                    value={formData.aboutNGO}
                    onChange={handleInputChange}
                    rows={5}
                    placeholder="Describe your organization and its mission"
                    className={`w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border transition-all resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      darkMode
                        ? "bg-zinc-700 border-zinc-600 text-white placeholder-zinc-500"
                        : "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400"
                    }`}
                  />
                </div>

                {/* Navigation Button */}
                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => handleNext(2)}
                    className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg text-sm sm:text-base"
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
                      className={`w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        darkMode
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
                      className={`w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        darkMode
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
                      className={`w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        darkMode
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
                      <label key={role} className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="designation"
                          value={role}
                          checked={formData.designation === role}
                          onChange={handleInputChange}
                          className="sr-only peer"
                          required
                        />
                        <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center transition-all peer-checked:border-emerald-600 peer-checked:bg-emerald-600 ${
                          darkMode ? "border-zinc-500" : "border-zinc-400"
                        }`}>
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity"></div>
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
                    className={`px-6 sm:px-8 py-2.5 sm:py-3 font-semibold rounded-lg transition-all text-sm sm:text-base ${
                      darkMode
                        ? "bg-zinc-700 hover:bg-zinc-600 text-white"
                        : "bg-zinc-200 hover:bg-zinc-300 text-zinc-900"
                    }`}
                  >
                    Back
                  </button>
                  <button
                    onClick={() => handleNext(3)}
                    className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg text-sm sm:text-base"
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
                <div>
                  <label className={`block text-xs sm:text-sm font-medium mb-3 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                    14. Does your organization have 80G certification? <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-4 sm:gap-6">
                    {["yes", "no"].map((option) => (
                      <label key={option} className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="has80G"
                          value={option}
                          checked={formData.has80G === option}
                          onChange={handleInputChange}
                          className="sr-only peer"
                          required
                        />
                        <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center transition-all peer-checked:border-emerald-600 peer-checked:bg-emerald-600 ${
                          darkMode ? "border-zinc-500" : "border-zinc-400"
                        }`}>
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity"></div>
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
                  <>
                    {/* 14.1 & 14.2 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                          14.1 Expiry Date <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          placeholder="dd-mm-yyyy"
                          className={`w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                            darkMode
                              ? "bg-zinc-700 border-zinc-600 text-white placeholder-zinc-500"
                              : "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400"
                          }`}
                          required
                        />
                      </div>

                      <div>
                        <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                          14.2 Certification (Pdf/Image) <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="file"
                            id="certification80G"
                            name="certification80G"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleInputChange}
                            className="hidden"
                          />
                          <label
                            htmlFor="certification80G"
                            className={`flex items-center justify-center gap-2 w-full px-4 py-2.5 sm:py-3 rounded-lg border-2 border-dashed cursor-pointer transition-all ${
                              darkMode
                                ? "bg-zinc-700 border-zinc-600 hover:border-emerald-500 text-zinc-400"
                                : "bg-white border-zinc-300 hover:border-emerald-500 text-zinc-600"
                            }`}
                          >
                            <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="text-xs sm:text-sm">
                              {formData.certification80G ? formData.certification80G.name : "Choose File"}
                            </span>
                          </label>
                          {formData.certification80G && (
                            <button
                              type="button"
                              onClick={() => removeFile("certification80G")}
                              className="absolute top-1/2 right-3 -translate-y-1/2 text-red-500 hover:text-red-600"
                            >
                              <X className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* 14.3 & 14.4 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                          14.3 PAN Card <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="panCard"
                          value={formData.panCard}
                          onChange={handleInputChange}
                          placeholder="Enter PAN card number"
                          className={`w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                            darkMode
                              ? "bg-zinc-700 border-zinc-600 text-white placeholder-zinc-500"
                              : "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400"
                          }`}
                          required
                        />
                      </div>

                      <div>
                        <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                          14.4 Upload PAN Card (Pdf/Image) <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="file"
                            id="panCardImage"
                            name="panCardImage"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleInputChange}
                            className="hidden"
                          />
                          <label
                            htmlFor="panCardImage"
                            className={`flex items-center justify-center gap-2 w-full px-4 py-2.5 sm:py-3 rounded-lg border-2 border-dashed cursor-pointer transition-all ${
                              darkMode
                                ? "bg-zinc-700 border-zinc-600 hover:border-emerald-500 text-zinc-400"
                                : "bg-white border-zinc-300 hover:border-emerald-500 text-zinc-600"
                            }`}
                          >
                            <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="text-xs sm:text-sm">
                              {formData.panCardImage ? formData.panCardImage.name : "Choose File"}
                            </span>
                          </label>
                          {formData.panCardImage && (
                            <button
                              type="button"
                              onClick={() => removeFile("panCardImage")}
                              className="absolute top-1/2 right-3 -translate-y-1/2 text-red-500 hover:text-red-600"
                            >
                              <X className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Question 15: FCRA Certification */}
                <div>
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
                          required
                        />
                        <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center transition-all peer-checked:border-emerald-600 peer-checked:bg-emerald-600 ${
                          darkMode ? "border-zinc-500" : "border-zinc-400"
                        }`}>
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                        </div>
                        <span className={`ml-2 sm:ml-3 font-medium text-sm sm:text-base ${formData.hasFCRA === option ? 'text-emerald-600' : darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                          {option === "yes" ? "Yes" : "No"}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => handleNext(2)}
                    className={`px-6 sm:px-8 py-2.5 sm:py-3 font-semibold rounded-lg transition-all text-sm sm:text-base ${
                      darkMode
                        ? "bg-zinc-700 hover:bg-zinc-600 text-white"
                        : "bg-zinc-200 hover:bg-zinc-300 text-zinc-900"
                    }`}
                  >
                    Back
                  </button>
                  <button
                    onClick={() => handleNext(4)}
                    className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg text-sm sm:text-base"
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
                        <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center transition-all peer-checked:border-emerald-600 peer-checked:bg-emerald-600 ${
                          darkMode ? "border-zinc-500" : "border-zinc-400"
                        }`}>
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity"></div>
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
                        <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center transition-all peer-checked:border-emerald-600 peer-checked:bg-emerald-600 ${
                          darkMode ? "border-zinc-500" : "border-zinc-400"
                        }`}>
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity"></div>
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
                        <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center transition-all peer-checked:border-emerald-600 peer-checked:bg-emerald-600 ${
                          darkMode ? "border-zinc-500" : "border-zinc-400"
                        }`}>
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity"></div>
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
                        <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center transition-all peer-checked:border-emerald-600 peer-checked:bg-emerald-600 ${
                          darkMode ? "border-zinc-500" : "border-zinc-400"
                        }`}>
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity"></div>
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
                        <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center transition-all peer-checked:border-emerald-600 peer-checked:bg-emerald-600 ${
                          darkMode ? "border-zinc-500" : "border-zinc-400"
                        }`}>
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity"></div>
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
                        <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center transition-all peer-checked:border-emerald-600 peer-checked:bg-emerald-600 ${
                          darkMode ? "border-zinc-500" : "border-zinc-400"
                        }`}>
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity"></div>
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
                        <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center transition-all peer-checked:border-emerald-600 peer-checked:bg-emerald-600 ${
                          darkMode ? "border-zinc-500" : "border-zinc-400"
                        }`}>
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity"></div>
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
                    className={`px-6 sm:px-8 py-2.5 sm:py-3 font-semibold rounded-lg transition-all text-sm sm:text-base ${
                      darkMode
                        ? "bg-zinc-700 hover:bg-zinc-600 text-white"
                        : "bg-zinc-200 hover:bg-zinc-300 text-zinc-900"
                    }`}
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg text-sm sm:text-base"
                  >
                    Submit
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