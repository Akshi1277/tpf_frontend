"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { 
  CheckCircle2,
  ChevronLeft,
  Upload,
  X
} from "lucide-react"

export default function OrganizationRegistrationPage({ darkModeFromParent }) {
  const [darkMode, setDarkMode] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)
  const router = useRouter()

  const [formData, setFormData] = useState({
    // Step 1
    nonProfit: "",
    organizationName: "",
    city: "",
    causeSupported: [],
    founderName: "",
    founderEmail: "",
    founderMobile: "",
    ngoWebsite: "",
    aboutNGO: "",
    
    // Step 2
    contactName: "",
    contactNumber: "",
    contactEmail: "",
    designation: "",
    
    // Step 3
    has80G: "",
    expiryDate: "",
    certification80G: null,
    panCard: "",
    panCardImage: null,
    hasFCRA: "",
    
    // Step 4
    budget: "",
    donorDatabase: "",
    fullTimeFundraising: "",
    crowdfundedBefore: "",
    employeeStrength: "",
    volunteerStrength: "",
    organizeEvents: ""
  })

  useEffect(() => {
    if (darkModeFromParent !== undefined) {
      setDarkMode(darkModeFromParent)
    }
  }, [darkModeFromParent])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter(item => item !== value)
        : [...prev[name], value]
    }))
  }

  const handleFileUpload = (name, event) => {
    const file = event.target.files[0]
    if (file) {
      setFormData(prev => ({ ...prev, [name]: file }))
    }
  }

  const removeFile = (name) => {
    setFormData(prev => ({ ...prev, [name]: null }))
  }

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      // Handle submission
      console.log('Form submitted:', formData)
    }, 3000)
  }

  const steps = [
    { number: 1, title: "NGO Registration" },
    { number: 2, title: "Contact Details" },
    { number: 3, title: "Certifications" },
    { number: 4, title: "Organization Profile" }
  ]

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
    <div className="min-h-screen">
      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`fixed top-4 right-4 sm:top-6 sm:right-6 z-50 px-4 sm:px-6 py-3 sm:py-4 rounded-2xl shadow-2xl flex items-center gap-3 ${
              darkMode
                ? "bg-zinc-900 border border-emerald-500/20"
                : "bg-white border border-emerald-200"
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={3} />
            </div>
            <div>
              <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                Registration Submitted!
              </p>
              <p className={`text-sm ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                We'll review your application soon
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-12">
        
        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between relative">
            {/* Progress Bar */}
            <div className={`absolute top-6 left-0 right-0 h-1 ${
              darkMode ? "bg-zinc-800" : "bg-gray-200"
            }`}>
              <motion.div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
                initial={{ width: "0%" }}
                animate={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {steps.map((step, index) => {
              const isActive = currentStep === step.number
              const isCompleted = currentStep > step.number

              return (
                <div key={step.number} className="flex flex-col items-center z-10 flex-1">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all font-bold ${
                    isCompleted
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 border-transparent text-white"
                      : isActive
                      ? darkMode
                        ? "bg-gradient-to-r from-amber-500 to-orange-500 border-transparent text-white"
                        : "bg-gradient-to-r from-amber-500 to-orange-500 border-transparent text-white"
                      : darkMode
                      ? "bg-zinc-900 border-zinc-700 text-zinc-500"
                      : "bg-white border-gray-300 text-gray-400"
                  }`}>
                    {step.number}
                  </div>
                  <span className={`mt-2 text-xs font-medium text-center hidden sm:block ${
                    isActive || isCompleted
                      ? "text-amber-600"
                      : darkMode ? "text-zinc-500" : "text-gray-500"
                  }`}>
                    {step.title}
                  </span>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`rounded-3xl overflow-hidden ${
            darkMode 
              ? "bg-zinc-900/50 backdrop-blur-xl border border-zinc-800" 
              : "bg-white backdrop-blur-xl border border-gray-200 shadow-xl"
          }`}
        >
          <div className="p-6 sm:p-8 md:p-10">
            <AnimatePresence mode="wait">
              {/* Step 1: NGO Registration Form */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className={`text-2xl font-bold text-center mb-8 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}>
                    NGO REGISTRATION FORM
                  </h2>

                  {/* Question 1 */}
                  <div>
                    <label className={`block text-sm font-semibold mb-3 ${
                      darkMode ? "text-zinc-300" : "text-gray-700"
                    }`}>
                      1. Is your organisation a registered Non-Profit?<span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        formData.nonProfit === "trust"
                          ? "border-amber-500 bg-amber-50"
                          : darkMode ? "border-zinc-700" : "border-gray-200"
                      }`}>
                        <input
                          type="radio"
                          name="nonProfit"
                          value="trust"
                          checked={formData.nonProfit === "trust"}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-amber-500"
                        />
                        <span className={`text-sm ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                          Yes - As a Trust
                        </span>
                      </label>
                      <label className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        formData.nonProfit === "society"
                          ? "border-amber-500 bg-amber-50"
                          : darkMode ? "border-zinc-700" : "border-gray-200"
                      }`}>
                        <input
                          type="radio"
                          name="nonProfit"
                          value="society"
                          checked={formData.nonProfit === "society"}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-amber-500"
                        />
                        <span className={`text-sm ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                          Yes - As a Society
                        </span>
                      </label>
                      <label className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        formData.nonProfit === "company"
                          ? "border-amber-500 bg-amber-50"
                          : darkMode ? "border-zinc-700" : "border-gray-200"
                      }`}>
                        <input
                          type="radio"
                          name="nonProfit"
                          value="company"
                          checked={formData.nonProfit === "company"}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-amber-500"
                        />
                        <span className={`text-sm ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                          Yes - As a Section 25 or Section 8 Company
                        </span>
                      </label>
                      <label className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        formData.nonProfit === "no"
                          ? "border-amber-500 bg-amber-50"
                          : darkMode ? "border-zinc-700" : "border-gray-200"
                      }`}>
                        <input
                          type="radio"
                          name="nonProfit"
                          value="no"
                          checked={formData.nonProfit === "no"}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-amber-500"
                        />
                        <span className={`text-sm ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                          No
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Question 2 & 3 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${
                        darkMode ? "text-zinc-300" : "text-gray-700"
                      }`}>
                        2. Organisation Name<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="organizationName"
                        value={formData.organizationName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all ${
                          darkMode
                            ? "bg-zinc-800/50 border-zinc-700 text-white focus:border-amber-500"
                            : "bg-white border-gray-200 text-gray-900 focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${
                        darkMode ? "text-zinc-300" : "text-gray-700"
                      }`}>
                        3. City<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all ${
                          darkMode
                            ? "bg-zinc-800/50 border-zinc-700 text-white focus:border-amber-500"
                            : "bg-white border-gray-200 text-gray-900 focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Question 4 */}
                  <div>
                    <label className={`block text-sm font-semibold mb-3 ${
                      darkMode ? "text-zinc-300" : "text-gray-700"
                    }`}>
                      4. Cause Supported (Choose your main area of work)<span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {causes.map((cause) => (
                        <label key={cause} className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          formData.causeSupported.includes(cause)
                            ? "border-amber-500 bg-amber-50"
                            : darkMode ? "border-zinc-700" : "border-gray-200"
                        }`}>
                          <input
                            type="checkbox"
                            checked={formData.causeSupported.includes(cause)}
                            onChange={() => handleCheckboxChange("causeSupported", cause)}
                            className="w-4 h-4 text-amber-500 rounded"
                          />
                          <span className={`text-sm ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                            {cause}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Questions 5 & 6 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${
                        darkMode ? "text-zinc-300" : "text-gray-700"
                      }`}>
                        5. Founder's Name(s)<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="founderName"
                        value={formData.founderName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all ${
                          darkMode
                            ? "bg-zinc-800/50 border-zinc-700 text-white focus:border-amber-500"
                            : "bg-white border-gray-200 text-gray-900 focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${
                        darkMode ? "text-zinc-300" : "text-gray-700"
                      }`}>
                        6. Founder's Email(s)<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="founderEmail"
                        value={formData.founderEmail}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all ${
                          darkMode
                            ? "bg-zinc-800/50 border-zinc-700 text-white focus:border-amber-500"
                            : "bg-white border-gray-200 text-gray-900 focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Questions 7 & 8 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${
                        darkMode ? "text-zinc-300" : "text-gray-700"
                      }`}>
                        7. Founder's Mobile(s)<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="founderMobile"
                        value={formData.founderMobile}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all ${
                          darkMode
                            ? "bg-zinc-800/50 border-zinc-700 text-white focus:border-amber-500"
                            : "bg-white border-gray-200 text-gray-900 focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${
                        darkMode ? "text-zinc-300" : "text-gray-700"
                      }`}>
                        8. NGO Website URL
                      </label>
                      <input
                        type="url"
                        name="ngoWebsite"
                        value={formData.ngoWebsite}
                        onChange={handleInputChange}
                        placeholder="eg: rahmanfoundation.org"
                        className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all ${
                          darkMode
                            ? "bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500 focus:border-amber-500"
                            : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Question 9 */}
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${
                      darkMode ? "text-zinc-300" : "text-gray-700"
                    }`}>
                      9. Tell Us About Your NGO/Founder
                    </label>
                    <textarea
                      name="aboutNGO"
                      value={formData.aboutNGO}
                      onChange={handleInputChange}
                      rows={6}
                      className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all resize-none ${
                        darkMode
                          ? "bg-zinc-800/50 border-zinc-700 text-white focus:border-amber-500"
                          : "bg-white border-gray-200 text-gray-900 focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
                      }`}
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 2: Login/Contact's Details */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className={`text-2xl font-bold text-center mb-8 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}>
                    LOGIN/CONTACT'S DETAILS
                  </h2>

                  {/* Questions 10, 11, 12 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${
                        darkMode ? "text-zinc-300" : "text-gray-700"
                      }`}>
                        10. Name<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all ${
                          darkMode
                            ? "bg-zinc-800/50 border-zinc-700 text-white focus:border-amber-500"
                            : "bg-white border-gray-200 text-gray-900 focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${
                        darkMode ? "text-zinc-300" : "text-gray-700"
                      }`}>
                        11. Contact number<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all ${
                          darkMode
                            ? "bg-zinc-800/50 border-zinc-700 text-white focus:border-amber-500"
                            : "bg-white border-gray-200 text-gray-900 focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${
                        darkMode ? "text-zinc-300" : "text-gray-700"
                      }`}>
                        12. Email ID<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="contactEmail"
                        value={formData.contactEmail}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all ${
                          darkMode
                            ? "bg-zinc-800/50 border-zinc-700 text-white focus:border-amber-500"
                            : "bg-white border-gray-200 text-gray-900 focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Question 13 */}
                  <div>
                    <label className={`block text-sm font-semibold mb-3 ${
                      darkMode ? "text-zinc-300" : "text-gray-700"
                    }`}>
                      13. Point Of Contact Designation<span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        "Founder/Trustee/Director/General Secretary",
                        "Communications/Marketing role",
                        "Other",
                        "Fundraising Manager/Co-ordinator/Team member",
                        "Volunteer/Intern"
                      ].map((role) => (
                        <label key={role} className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          formData.designation === role
                            ? "border-amber-500 bg-amber-50"
                            : darkMode ? "border-zinc-700" : "border-gray-200"
                        }`}>
                          <input
                            type="radio"
                            name="designation"
                            value={role}
                            checked={formData.designation === role}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-amber-500"
                          />
                          <span className={`text-sm ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                            {role}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Certifications */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className={`text-2xl font-bold text-center mb-8 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}>
                    CERTIFICATIONS
                  </h2>

                  {/* Question 14 */}
                  <div>
                    <label className={`block text-sm font-semibold mb-3 ${
                      darkMode ? "text-zinc-300" : "text-gray-700"
                    }`}>
                      14. Does your organization have 80G certification?<span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-4">
                      <label className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        formData.has80G === "yes"
                          ? "border-amber-500 bg-amber-50"
                          : darkMode ? "border-zinc-700" : "border-gray-200"
                      }`}>
                        <input
                          type="radio"
                          name="has80G"
                          value="yes"
                          checked={formData.has80G === "yes"}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-amber-500"
                        />
                        <span className={`text-sm ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                          Yes
                        </span>
                      </label>
                      <label className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        formData.has80G === "no"
                          ? "border-amber-500 bg-amber-50"
                          : darkMode ? "border-zinc-700" : "border-gray-200"
                      }`}>
                        <input
                          type="radio"
                          name="has80G"
                          value="no"
                          checked={formData.has80G === "no"}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-amber-500"
                        />
                        <span className={`text-sm ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                          No
                        </span>
                      </label>
                    </div>
                  </div>

                  {formData.has80G === "yes" && (
                    <>
                      {/* Question 14.1 & 14.2 */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className={`block text-sm font-semibold mb-2 ${
                            darkMode ? "text-zinc-300" : "text-gray-700"
                          }`}>
                            14.1 Expiry Date<span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            placeholder="dd-mm-yyyy"
                            className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all ${
                              darkMode
                                ? "bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500 focus:border-amber-500"
                                : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
                            }`}
                          />
                        </div>

                        <div>
                          <label className={`block text-sm font-semibold mb-2 ${
                            darkMode ? "text-zinc-300" : "text-gray-700"
                          }`}>
                            14.2 Certification (Pdf/Image)<span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="file"
                              id="certification80G"
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={(e) => handleFileUpload("certification80G", e)}
                              className="hidden"
                            />
                            <label
                              htmlFor="certification80G"
                              className={`flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border-2 cursor-pointer transition-all ${
                                darkMode
                                  ? "bg-zinc-800/50 border-zinc-700 text-white hover:border-amber-500"
                                  : "bg-white border-gray-200 text-gray-900 hover:border-amber-500"
                              }`}
                            >
                              <Upload className="w-5 h-5" />
                              <span className="text-sm">
                                {formData.certification80G ? formData.certification80G.name : "Choose File"}
                              </span>
                            </label>
                            {formData.certification80G && (
                              <button
                                type="button"
                                onClick={() => removeFile("certification80G")}
                                className="absolute top-1/2 right-3 -translate-y-1/2 text-red-500"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Question 14.3 & 14.4 */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className={`block text-sm font-semibold mb-2 ${
                            darkMode ? "text-zinc-300" : "text-gray-700"
                          }`}>
                            14.3 PAN Card<span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="panCard"
                            value={formData.panCard}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all ${
                              darkMode
                                ? "bg-zinc-800/50 border-zinc-700 text-white focus:border-amber-500"
                                : "bg-white border-gray-200 text-gray-900 focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
                            }`}
                          />
                        </div>

                        <div>
                          <label className={`block text-sm font-semibold mb-2 ${
                            darkMode ? "text-zinc-300" : "text-gray-700"
                          }`}>
                            14.4 Upload PAN Card (Pdf/Image)<span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="file"
                              id="panCardImage"
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={(e) => handleFileUpload("panCardImage", e)}
                              className="hidden"
                            />
                            <label
                              htmlFor="panCardImage"
                              className={`flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border-2 cursor-pointer transition-all ${
                                darkMode
                                  ? "bg-zinc-800/50 border-zinc-700 text-white hover:border-amber-500"
                                  : "bg-white border-gray-200 text-gray-900 hover:border-amber-500"
                              }`}
                            >
                              <Upload className="w-5 h-5" />
                              <span className="text-sm">
                                {formData.panCardImage ? formData.panCardImage.name : "Choose File"}
                              </span>
                            </label>
                            {formData.panCardImage && (
                              <button
                                type="button"
                                onClick={() => removeFile("panCardImage")}
                                className="absolute top-1/2 right-3 -translate-y-1/2 text-red-500"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Question 15 */}
                  <div>
                    <label className={`block text-sm font-semibold mb-3 ${
                      darkMode ? "text-zinc-300" : "text-gray-700"
                    }`}>
                      15. Does your organization have FCRA certification?<span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-4">
                      <label className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        formData.hasFCRA === "yes"
                          ? "border-amber-500 bg-amber-50"
                          : darkMode ? "border-zinc-700" : "border-gray-200"
                      }`}>
                        <input
                          type="radio"
                          name="hasFCRA"
                          value="yes"
                          checked={formData.hasFCRA === "yes"}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-amber-500"
                        />
                        <span className={`text-sm ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                          Yes
                        </span>
                      </label>
                      <label className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        formData.hasFCRA === "no"
                          ? "border-amber-500 bg-amber-50"
                          : darkMode ? "border-zinc-700" : "border-gray-200"
                      }`}>
                        <input
                          type="radio"
                          name="hasFCRA"
                          value="no"
                          checked={formData.hasFCRA === "no"}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-amber-500"
                        />
                        <span className={`text-sm ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                          No
                        </span>
                      </label>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Organization Profile */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className={`text-2xl font-bold text-center mb-8 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}>
                    ORGANIZATION PROFILE
                  </h2>

                  {/* Question 16 */}
                  <div>
                    <label className={`block text-sm font-semibold mb-3 ${
                      darkMode ? "text-zinc-300" : "text-gray-700"
                    }`}>
                      16. Last financial year's budget<span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {["0-25 lacs", "25 lacs - 1 Cr", "> 1 Cr"].map((option) => (
                        <label key={option} className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          formData.budget === option
                            ? "border-amber-500 bg-amber-50"
                            : darkMode ? "border-zinc-700" : "border-gray-200"
                        }`}>
                          <input
                            type="radio"
                            name="budget"
                            value={option}
                            checked={formData.budget === option}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-amber-500"
                          />
                          <span className={`text-sm ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                            {option}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Question 17 */}
                  <div>
                    <label className={`block text-sm font-semibold mb-3 ${
                      darkMode ? "text-zinc-300" : "text-gray-700"
                    }`}>
                      17. Total donor database strength<span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {["0-100", "100-500", ">500"].map((option) => (
                        <label key={option} className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          formData.donorDatabase === option
                            ? "border-amber-500 bg-amber-50"
                            : darkMode ? "border-zinc-700" : "border-gray-200"
                        }`}>
                          <input
                            type="radio"
                            name="donorDatabase"
                            value={option}
                            checked={formData.donorDatabase === option}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-amber-500"
                          />
                          <span className={`text-sm ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                            {option}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Question 18 */}
                  <div>
                    <label className={`block text-sm font-semibold mb-3 ${
                      darkMode ? "text-zinc-300" : "text-gray-700"
                    }`}>
                      18. Do you have a full-time fundraising staff (1 or more)?<span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-4">
                      {["Yes", "No"].map((option) => (
                        <label key={option} className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          formData.fullTimeFundraising === option
                            ? "border-amber-500 bg-amber-50"
                            : darkMode ? "border-zinc-700" : "border-gray-200"
                        }`}>
                          <input
                            type="radio"
                            name="fullTimeFundraising"
                            value={option}
                            checked={formData.fullTimeFundraising === option}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-amber-500"
                          />
                          <span className={`text-sm ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                            {option}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Question 19 */}
                  <div>
                    <label className={`block text-sm font-semibold mb-3 ${
                      darkMode ? "text-zinc-300" : "text-gray-700"
                    }`}>
                      19. Have you crowdfunded before? <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-4">
                      {["Yes", "No"].map((option) => (
                        <label key={option} className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          formData.crowdfundedBefore === option
                            ? "border-amber-500 bg-amber-50"
                            : darkMode ? "border-zinc-700" : "border-gray-200"
                        }`}>
                          <input
                            type="radio"
                            name="crowdfundedBefore"
                            value={option}
                            checked={formData.crowdfundedBefore === option}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-amber-500"
                          />
                          <span className={`text-sm ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                            {option}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Question 20 */}
                  <div>
                    <label className={`block text-sm font-semibold mb-3 ${
                      darkMode ? "text-zinc-300" : "text-gray-700"
                    }`}>
                      20. What is your organization's total employee strength?<span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {["0-25", "25-100", ">100"].map((option) => (
                        <label key={option} className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          formData.employeeStrength === option
                            ? "border-amber-500 bg-amber-50"
                            : darkMode ? "border-zinc-700" : "border-gray-200"
                        }`}>
                          <input
                            type="radio"
                            name="employeeStrength"
                            value={option}
                            checked={formData.employeeStrength === option}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-amber-500"
                          />
                          <span className={`text-sm ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                            {option}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Question 21 */}
                  <div>
                    <label className={`block text-sm font-semibold mb-3 ${
                      darkMode ? "text-zinc-300" : "text-gray-700"
                    }`}>
                      21. What is your organization's total active volunteer strength?<span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {["0-10", "10-100", ">100"].map((option) => (
                        <label key={option} className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          formData.volunteerStrength === option
                            ? "border-amber-500 bg-amber-50"
                            : darkMode ? "border-zinc-700" : "border-gray-200"
                        }`}>
                          <input
                            type="radio"
                            name="volunteerStrength"
                            value={option}
                            checked={formData.volunteerStrength === option}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-amber-500"
                          />
                          <span className={`text-sm ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                            {option}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Question 22 */}
                  <div>
                    <label className={`block text-sm font-semibold mb-3 ${
                      darkMode ? "text-zinc-300" : "text-gray-700"
                    }`}>
                      22. Do you organize any events? (Example: Medical Camp, Blood Donation Camp etc.)<span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-4">
                      {["Yes", "No"].map((option) => (
                        <label key={option} className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          formData.organizeEvents === option
                            ? "border-amber-500 bg-amber-50"
                            : darkMode ? "border-zinc-700" : "border-gray-200"
                        }`}>
                          <input
                            type="radio"
                            name="organizeEvents"
                            value={option}
                            checked={formData.organizeEvents === option}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-amber-500"
                          />
                          <span className={`text-sm ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                            {option}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t">
              {currentStep > 1 ? (
                <button
                  onClick={handlePrevious}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                    darkMode
                      ? "bg-zinc-800 hover:bg-zinc-700 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                  Previous
                </button>
              ) : <div />}

              {currentStep < 4 ? (
                <button
                  onClick={handleNext}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold transition-all shadow-lg"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold transition-all shadow-lg"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}