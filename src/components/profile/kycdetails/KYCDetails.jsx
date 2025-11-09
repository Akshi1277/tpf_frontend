"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Shield,
  Camera,
  Upload,
  FileText,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Home,
  AlertCircle,
  CheckCircle2,
  Building
} from "lucide-react"

export default function KYCPage({ darkModeFromParent, onComplete, onSkip }) {
  const [darkMode, setDarkMode] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phoneNumber: "",
    email: "",
    occupation: "",
    identityType: "",
    identityNumber: ""
  })

  const [uploadedDocs, setUploadedDocs] = useState({
    identityProof: null,
    addressProof: null,
    photo: null
  })

  // Sync with parent dark mode
  useEffect(() => {
    if (darkModeFromParent !== undefined) {
      setDarkMode(darkModeFromParent)
    }
  }, [darkModeFromParent])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileUpload = (docType, event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedDocs(prev => ({
          ...prev,
          [docType]: {
            name: file.name,
            size: (file.size / 1024).toFixed(2) + ' KB',
            preview: reader.result
          }
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const removeDocument = (docType) => {
    setUploadedDocs(prev => ({
      ...prev,
      [docType]: null
    }))
  }

  const handleSubmit = () => {
  setShowSuccess(true)
  setTimeout(() => {
    setShowSuccess(false)
    if (onComplete) onComplete({ ...formData, documents: uploadedDocs })
  }, 3000)
}

  // Custom Date Picker Component (Same as Profile Page)
  const CustomDatePicker = ({ darkMode, value, onChange, name }) => {
    const [showCalendar, setShowCalendar] = useState(false)
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const calendarRef = useRef(null)

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (calendarRef.current && !calendarRef.current.contains(event.target)) {
          setShowCalendar(false)
        }
      }
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const getDaysInMonth = (date) => {
      const year = date.getFullYear()
      const month = date.getMonth()
      const firstDay = new Date(year, month, 1)
      const daysInMonth = new Date(year, month + 1, 0).getDate()
      const startingDayOfWeek = firstDay.getDay()
      
      const days = []
      const prevMonthLastDay = new Date(year, month, 0).getDate()
      for (let i = startingDayOfWeek - 1; i >= 0; i--) {
        days.push({ day: prevMonthLastDay - i, isCurrentMonth: false })
      }
      for (let i = 1; i <= daysInMonth; i++) {
        days.push({ day: i, isCurrentMonth: true })
      }
      const remainingDays = 42 - days.length
      for (let i = 1; i <= remainingDays; i++) {
        days.push({ day: i, isCurrentMonth: false })
      }
      return days
    }

    const handleDateSelect = (day) => {
      if (day.isCurrentMonth) {
        const year = currentMonth.getFullYear()
        const month = String(currentMonth.getMonth() + 1).padStart(2, '0')
        const dayStr = String(day.day).padStart(2, '0')
        const formattedDate = `${year}-${month}-${dayStr}`
        onChange({ target: { name, value: formattedDate } })
        setShowCalendar(false)
      }
    }

    const changeMonth = (offset) => {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1))
    }

    const changeYear = (offset) => {
      setCurrentMonth(new Date(currentMonth.getFullYear() + offset, currentMonth.getMonth(), 1))
    }

    const formatDisplayDate = (dateString) => {
      if (!dateString) return "Select date of birth"
      const date = new Date(dateString + 'T00:00:00')
      return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    }

    const selectedDate = value ? new Date(value + 'T00:00:00') : null
    const isSelectedDate = (day) => {
      if (!selectedDate || !day.isCurrentMonth) return false
      return day.day === selectedDate.getDate() && 
             currentMonth.getMonth() === selectedDate.getMonth() && 
             currentMonth.getFullYear() === selectedDate.getFullYear()
    }

return (
  <div className="relative" ref={calendarRef}>
    <button
      type="button"
      onClick={() => setShowCalendar(!showCalendar)}
      className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all text-left flex items-center justify-between ${
        darkMode
          ? "bg-zinc-800/50 border-zinc-700 text-white hover:border-emerald-500"
          : "bg-white border-gray-200 text-gray-900 hover:border-emerald-500"
      }`}
    >
      <span className={!value ? (darkMode ? "text-zinc-500" : "text-gray-400") : ""}>
        {formatDisplayDate(value)}
      </span>
      <Calendar className={`w-5 h-5 ${darkMode ? "text-zinc-400" : "text-gray-400"}`} />
    </button>

   {showCalendar && (
  <>
    {/* Backdrop for mobile */}
    <div 
      className="fixed inset-0 z-[99] sm:hidden bg-black/20"
      onClick={() => setShowCalendar(false)}
    />
    
    <div 
      className={`fixed sm:absolute left-1/2 top-1/2 sm:top-full sm:left-1/2 -translate-x-1/2 -translate-y-1/2 sm:translate-y-0 sm:mt-2 z-[100] rounded-2xl border shadow-2xl ${
        darkMode ? "bg-zinc-800 border-zinc-700" : "bg-white border-gray-200"
      }`} 
      style={{ 
        width: '320px',
        maxWidth: 'calc(100vw - 2rem)'
      }}
    >
      
      <div className={`p-4 border-b ${darkMode ? "border-zinc-700" : "border-gray-200"}`}>
        <div className="flex items-center justify-between mb-3">
          <button type="button" onClick={() => changeYear(-1)} className={`p-2 rounded-lg transition-all ${darkMode ? "hover:bg-zinc-700" : "hover:bg-gray-100"}`}>
            <ChevronLeft className="w-4 h-4" strokeWidth={3} />
          </button>
          <span className={`font-bold text-lg ${darkMode ? "text-white" : "text-gray-900"}`}>
            {currentMonth.getFullYear()}
          </span>
          <button type="button" onClick={() => changeYear(1)} className={`p-2 rounded-lg transition-all ${darkMode ? "hover:bg-zinc-700" : "hover:bg-gray-100"}`}>
            <ChevronRight className="w-4 h-4" strokeWidth={3} />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <button type="button" onClick={() => changeMonth(-1)} className={`p-2 rounded-lg transition-all ${darkMode ? "hover:bg-zinc-700" : "hover:bg-gray-100"}`}>
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
            {months[currentMonth.getMonth()]}
          </span>
          <button type="button" onClick={() => changeMonth(1)} className={`p-2 rounded-lg transition-all ${darkMode ? "hover:bg-zinc-700" : "hover:bg-gray-100"}`}>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {days.map((day) => (
            <div key={day} className={`text-center text-xs font-semibold py-2 ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {getDaysInMonth(currentMonth).map((day, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleDateSelect(day)}
              className={`aspect-square rounded-lg text-sm font-medium transition-all ${
                !day.isCurrentMonth
                  ? darkMode ? "text-zinc-600" : "text-gray-400"
                  : isSelectedDate(day)
                  ? "bg-emerald-600 text-white shadow-lg"
                  : darkMode ? "text-white hover:bg-zinc-700" : "text-gray-900 hover:bg-gray-100"
              }`}
            >
              {day.day}
            </button>
          ))}
        </div>
      </div>

      <div className={`p-4 border-t flex items-center justify-between ${darkMode ? "border-zinc-700" : "border-gray-200"}`}>
        <button type="button" onClick={() => { onChange({ target: { name, value: "" } }); setShowCalendar(false); }} className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">
          Clear
        </button>
        <button type="button" onClick={() => { const today = new Date().toISOString().split('T')[0]; onChange({ target: { name, value: today } }); setShowCalendar(false); }} className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">
          Today
        </button>
      </div>
    </div>
  </>
)}
  </div>
)

  }
  const steps = [
    { number: 1, title: "Personal Info", icon: User },
    { number: 2, title: "Address", icon: MapPin },
    { number: 3, title: "Documents", icon: FileText }
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
      className={`fixed top-4 right-4 sm:top-6 sm:right-6 z-50 px-4 sm:px-6 py-3 sm:py-4 rounded-2xl shadow-2xl max-w-[calc(100vw-2rem)] sm:max-w-sm ${
        darkMode
          ? "bg-zinc-900 border border-emerald-500/20"
          : "bg-white border border-emerald-200"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
          <Check className="w-5 h-5 text-white" strokeWidth={3} />
        </div>
        <div className="flex-1">
          <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
            KYC Submitted Successfully!
          </p>
          <p className={`text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
            Your documents are under review by our admin team. You'll be notified once approved.
          </p>
        </div>
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
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-12 pb-8 sm:pb-12">
        
{/* Progress Steps */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="mb-8 flex justify-center"
>
  <div className="flex items-center max-w-2xl px-4">
    {steps.map((step, index) => {
      const Icon = step.icon
      const isActive = currentStep === step.number
      const isCompleted = currentStep > step.number
      
      return (
        <div key={step.number} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 transition-all ${
              isCompleted
                ? "bg-emerald-600 border-emerald-600"
                : isActive
                ? "bg-emerald-600 border-emerald-600"
                : darkMode
                ? "bg-zinc-800 border-zinc-700"
                : "bg-white border-gray-300"
            }`}>
              {isCompleted ? (
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              ) : (
                <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${
                  isActive ? "text-white" : darkMode ? "text-zinc-400" : "text-gray-400"
                }`} />
              )}
            </div>
            <span className={`mt-2 text-[10px] sm:text-xs font-medium text-center whitespace-nowrap ${
              isActive || isCompleted
                ? darkMode ? "text-emerald-400" : "text-emerald-600"
                : darkMode ? "text-zinc-500" : "text-gray-500"
            }`}>
              {step.title}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className={`h-0.5 w-16 sm:w-20 md:w-24 mx-4 sm:mx-6 ${
              isCompleted
                ? "bg-emerald-600"
                : darkMode ? "bg-zinc-700" : "bg-gray-300"
            }`} />
          )}
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
  className={`rounded-3xl overflow-visible ${
    darkMode 
      ? "bg-zinc-900/50 backdrop-blur-xl border border-zinc-800" 
      : "bg-white backdrop-blur-xl border border-gray-200 shadow-xl"
  }`}
>
         {/* Gradient Header */}
<div className="relative h-24 sm:h-32 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700">
  <div className="absolute inset-0">
    <div 
      className="absolute inset-0 opacity-20"
      style={{
        backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
        backgroundSize: "32px 32px"
      }}
    />
  </div>
  <div className="relative h-full flex items-center justify-center">
    <div className="text-center px-4">
      <Shield className="w-8 h-8 sm:w-12 sm:h-12 text-white mx-auto mb-2" />
      <h1 className="text-xl sm:text-2xl font-bold text-white">KYC Verification</h1>
      <p className="text-emerald-100 text-xs sm:text-sm mt-1">Secure & Encrypted</p>
    </div>
  </div>
</div>

{/* Form Content */}
<div className="p-4 sm:p-6 md:p-8 overflow-visible">
            <AnimatePresence mode="wait">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                   <h3 className={`text-lg sm:text-xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
  Personal Information
</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                          Full Legal Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <User className={`absolute left-4 top-3.5 w-5 h-5 ${darkMode ? "text-zinc-500" : "text-gray-400"}`} />
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="As per government ID"
                            className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 outline-none transition-all ${
                              darkMode
                                ? "bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500 focus:border-emerald-500"
                                : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                            }`}
                          />
                        </div>
                      </div>

                      <div>
                        <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                          Date of Birth <span className="text-red-500">*</span>
                        </label>
                        <CustomDatePicker
                          darkMode={darkMode}
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          name="dateOfBirth"
                        />
                      </div>

                     

                      <div>
                        <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                          Occupation <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Building className={`absolute left-4 top-3.5 w-5 h-5 ${darkMode ? "text-zinc-500" : "text-gray-400"}`} />
                          <input
                            type="text"
                            name="occupation"
                            value={formData.occupation}
                            onChange={handleInputChange}
                            placeholder="Your profession"
                            className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 outline-none transition-all ${
                              darkMode
                                ? "bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500 focus:border-emerald-500"
                                : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                            }`}
                          />
                        </div>
                      </div>

                      <div>
                        <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Phone className={`absolute left-4 top-3.5 w-5 h-5 ${darkMode ? "text-zinc-500" : "text-gray-400"}`} />
                          <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            placeholder="+91 98765 43210"
                            className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 outline-none transition-all ${
                              darkMode
                                ? "bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500 focus:border-emerald-500"
                                : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                            }`}
                          />
                        </div>
                      </div>

                      <div>
                        <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Mail className={`absolute left-4 top-3.5 w-5 h-5 ${darkMode ? "text-zinc-500" : "text-gray-400"}`} />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your.email@example.com"
                            className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 outline-none transition-all ${
                              darkMode
                                ? "bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500 focus:border-emerald-500"
                                : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Address */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className={`text-xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
                      Residential Address
                    </h3>
                    
                    <div className="space-y-6">
                      <div>
                        <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                          Address<span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <MapPin className={`absolute left-4 top-3.5 w-5 h-5 ${darkMode ? "text-zinc-500" : "text-gray-400"}`} />
                          <input
                            type="text"
                            name="addressLine1"
                            value={formData.addressLine1}
                            onChange={handleInputChange}
                            placeholder="Street address, building name"
                            className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 outline-none transition-all ${
                              darkMode
                                ? "bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500 focus:border-emerald-500"
                                : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                            }`}
                          />
                        </div>
                      </div>


                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                            City <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="City name"
                            className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all ${
                              darkMode
                                ? "bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500 focus:border-emerald-500"
                                : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                            }`}
                          />
                        </div>

                        <div>
                          <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                            State/Province <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            placeholder="State or province"
                            className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all ${
                              darkMode
                                ? "bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500 focus:border-emerald-500"
                                : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                            }`}
                          />
                        </div>

                        <div>
                          <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                            Postal Code <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleInputChange}
                            placeholder="PIN / ZIP code"
                            className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all ${
                              darkMode
                                ? "bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500 focus:border-emerald-500"
                                : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                            }`}
                          />
                        </div>

                       
                      </div>

                      {/* Identity Document */}
                      <div className={`p-4 rounded-xl border ${
                        darkMode ? "bg-zinc-800/30 border-zinc-700" : "bg-gray-50 border-gray-200"
                      }`}>
                        <h4 className={`font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                          Identity Document
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                              Document Type <span className="text-red-500">*</span>
                            </label>
                            <select
                              name="identityType"
                              value={formData.identityType}
                              onChange={handleInputChange}
                              className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all ${
                                darkMode
                                  ? "bg-zinc-800/50 border-zinc-700 text-white focus:border-emerald-500"
                                  : "bg-white border-gray-200 text-gray-900 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                              }`}
                            >
                              <option value="">Select document type</option>
                              <option value="aadhaar">Aadhaar Card</option>
                              <option value="pan">PAN Card</option>
                              <option value="passport">Passport</option>
                              <option value="drivers_license">Driver's License</option>
                            </select>
                          </div>

                          <div>
                            <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                              Document Number <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <CreditCard className={`absolute left-4 top-3.5 w-5 h-5 ${darkMode ? "text-zinc-500" : "text-gray-400"}`} />
                              <input
                                type="text"
                                name="identityNumber"
                                value={formData.identityNumber}
                                onChange={handleInputChange}
                                placeholder="Enter document number"
                                className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 outline-none transition-all ${
                                  darkMode
                                    ? "bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500 focus:border-emerald-500"
                                    : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                                }`}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Documents */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className={`text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                      Document Upload
                    </h3>
                    <p className={`text-sm mb-6 ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                      Upload clear, readable images (PDF, JPG, PNG - Max 5MB each)
                    </p>

                    <div className={`p-4 rounded-xl mb-6 border flex items-start gap-3 ${
                      darkMode
                        ? "bg-blue-950/20 border-blue-900/30"
                        : "bg-blue-50 border-blue-200"
                    }`}>
                      <Shield className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                        darkMode ? "text-blue-400" : "text-blue-600"
                      }`} />
                      <div>
                        <p className={`text-sm font-medium ${
                          darkMode ? "text-blue-300" : "text-blue-900"
                        }`}>
                          All documents are encrypted and stored securely
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {/* Identity Proof */}
                      <DocumentUploadCard
                        title="Identity Proof"
                        description="Aadhaar, PAN, Passport, or Driver's License"
                        icon={CreditCard}
                        uploadedDoc={uploadedDocs.identityProof}
                        onUpload={(e) => handleFileUpload('identityProof', e)}
                        onRemove={() => removeDocument('identityProof')}
                        darkMode={darkMode}
                        required
                      />

                      {/* Address Proof */}
                      <DocumentUploadCard
                        title="Address Proof"
                        description="Utility bill or bank statement (within 3 months)"
                        icon={Home}
                        uploadedDoc={uploadedDocs.addressProof}
                        onUpload={(e) => handleFileUpload('addressProof', e)}
                        onRemove={() => removeDocument('addressProof')}
                        darkMode={darkMode}
                        required
                      />

                      {/* Photo */}
                      <DocumentUploadCard
                        title="Recent Photograph"
                        description="Clear photo with visible face (passport size)"
                        icon={Camera}
                        uploadedDoc={uploadedDocs.photo}
                        onUpload={(e) => handleFileUpload('photo', e)}
                        onRemove={() => removeDocument('photo')}
                        darkMode={darkMode}
                        required
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          {/* Navigation Buttons */}
<div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0 mt-8 pt-6 border-t border-gray-200 dark:border-zinc-800">
  {currentStep > 1 ? (
    <button
      onClick={() => setCurrentStep(currentStep - 1)}
      className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
        darkMode
          ? "bg-zinc-800 hover:bg-zinc-700 text-white"
          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
      }`}
    >
      <ChevronLeft className="w-5 h-5" />
      Back
    </button>
  ) : (
    <button
      onClick={onSkip}
      className={`text-sm font-medium underline text-center sm:text-left ${
        darkMode ? "text-zinc-400 hover:text-zinc-300" : "text-gray-600 hover:text-gray-700"
      }`}
    >
    </button>
  )}

  {currentStep < 3 ? (
    <button
      onClick={() => setCurrentStep(currentStep + 1)}
      className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold transition-all shadow-lg"
    >
      Continue
      <ChevronRight className="w-5 h-5" />
    </button>
  ) : (
    <button
      onClick={handleSubmit}
      className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold transition-all shadow-lg"
    >
      <CheckCircle2 className="w-5 h-5" />
      Submit KYC
    </button>
  )}
</div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Document Upload Card Component
const DocumentUploadCard = ({ title, description, icon: Icon, uploadedDoc, onUpload, onRemove, darkMode, required }) => {
  return (
    <div className={`p-4 sm:p-5 rounded-xl border-2 transition-all ${
      uploadedDoc
        ? darkMode
          ? "bg-emerald-950/20 border-emerald-600/50"
          : "bg-emerald-50 border-emerald-300"
        : darkMode
        ? "bg-zinc-800/30 border-zinc-700 border-dashed hover:border-zinc-600"
        : "bg-gray-50 border-gray-300 border-dashed hover:border-gray-400"
    }`}>
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1 w-full">
          <div className={`p-2.5 rounded-xl flex-shrink-0 ${
            uploadedDoc
              ? darkMode ? "bg-emerald-500/20" : "bg-emerald-100"
              : darkMode ? "bg-zinc-700" : "bg-white"
          }`}>
            <Icon className={`w-5 h-5 ${
              uploadedDoc
                ? darkMode ? "text-emerald-400" : "text-emerald-600"
                : darkMode ? "text-zinc-400" : "text-gray-600"
            }`} />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className={`font-semibold mb-1 ${darkMode ? "text-white" : "text-gray-900"}`}>
              {title} {required && <span className="text-red-500">*</span>}
            </h4>
            <p className={`text-xs sm:text-sm ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
              {description}
            </p>
            {uploadedDoc && (
              <div className="mt-3 flex items-center gap-2">
                <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${darkMode ? "text-emerald-400" : "text-emerald-600"}`} />
                <span className={`text-xs sm:text-sm font-medium truncate ${darkMode ? "text-emerald-400" : "text-emerald-600"}`}>
                  {uploadedDoc.name} ({uploadedDoc.size})
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="w-full sm:w-auto flex-shrink-0">
          {uploadedDoc ? (
            <button
              onClick={onRemove}
              className={`w-full sm:w-auto p-2 rounded-lg transition-all ${
                darkMode
                  ? "hover:bg-red-500/20 text-red-400"
                  : "hover:bg-red-50 text-red-600"
              }`}
            >
              <X className="w-5 h-5 mx-auto" />
            </button>
          ) : (
            <label className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold text-sm cursor-pointer transition-all flex items-center justify-center gap-2">
              <Upload className="w-4 h-4" />
              Upload
              <input
                type="file"
                onChange={onUpload}
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>
    </div>
  )
}