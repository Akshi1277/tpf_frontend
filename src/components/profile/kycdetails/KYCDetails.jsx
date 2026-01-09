"use client"
import { useSelector, useDispatch } from "react-redux"
import { setCredentials } from "@/utils/slices/authSlice"
import { useUpdateProfileMutation } from "@/utils/slices/authApiSlice"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import axios from "axios"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Check,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  CheckCircle2,
  Building,
  Eye,
  Lock,
  AlertCircle,
  Search,
  ChevronDown
} from "lucide-react"

export default function KYCPage({ darkModeFromParent, onComplete, onSkip }) {
  const dispatch = useDispatch()
  const userInfo  = useSelector((state) => state.auth?.userInfo || null);
  const [updateProfile] = useUpdateProfileMutation()
  const [darkMode, setDarkMode] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    addressLine1: "",
    city: "",
    state: "",
    postalCode: "",
    phoneNumber: "",
    email: "",
    profession: "",
    customProfession: "",
    panNumber: "",
    confirmPanNumber: ""
  })

  const [cities, setCities] = useState([])
  const [states, setStates] = useState([])
  const [loadingCities, setLoadingCities] = useState(false)
  const [loadingStates, setLoadingStates] = useState(false)

  // Profession dropdown states
  const [professions, setProfessions] = useState([])
  const [professionSearch, setProfessionSearch] = useState("")
  const [showProfessionDropdown, setShowProfessionDropdown] = useState(false)
  const professionRef = useRef(null)
  const [showCustomProfession, setShowCustomProfession] = useState(false)

  // Sync with parent dark mode
  useEffect(() => {
    if (darkModeFromParent !== undefined) {
      setDarkMode(darkModeFromParent)
    }
  }, [darkModeFromParent])

  // Fetch Indian states on component mount
  useEffect(() => {
    fetchStates()
    fetchProfessions()
  }, [])

  // Handle click outside for profession dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (professionRef.current && !professionRef.current.contains(event.target)) {
        setShowProfessionDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])


useEffect(() => {
  if (!userInfo) return;

  const hasKyc =
    !!userInfo.kycDetails &&
    !!userInfo.kycDetails.submittedAt;

  // 🔒 Case 1: KYC already submitted → ONLY use kycDetails
  if (hasKyc) {
    setFormData(prev => ({
      ...prev,
      fullName: userInfo.kycDetails.fullLegalName || "",
      addressLine1: userInfo.kycDetails.address || "",
      city: userInfo.kycDetails.city || "",
      state: userInfo.kycDetails.state || "",
      postalCode: userInfo.kycDetails.pincode || "",
      panNumber: userInfo.kycDetails.panNumber || "",
      confirmPanNumber: userInfo.kycDetails.panNumber || "",
    }));
    setIsSubmitted(true);
    return;
  }

  // 🟢 Case 2: First-time KYC → prefill from user profile
  setFormData(prev => ({
    ...prev,
    fullName: userInfo.fullName || "",
    dateOfBirth: userInfo.dob ? userInfo.dob.split("T")[0] : "",
    gender: userInfo.gender?.toLowerCase() || "",
    profession: userInfo.profession || "",
    phoneNumber: userInfo.mobileNo || "",
    email: userInfo.email || "",

    addressLine1: userInfo.address?.house || "",
    city: userInfo.address?.city || "",
    state: userInfo.address?.state || "",
    postalCode: userInfo.address?.pincode || "",
  }));
}, [userInfo]);


  const fetchStates = async () => {
    setLoadingStates(true)
    try {
      const response = await fetch('https://api.countrystatecity.in/v1/countries/IN/states', {
        headers: {
          'X-CSCAPI-KEY': 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
        }
      })
      const data = await response.json()
      setStates(data)
    } catch (error) {
      console.error('Error fetching states:', error)
    } finally {
      setLoadingStates(false)
    }
  }

  const fetchCities = async (stateCode) => {
    setLoadingCities(true)
    try {
      const response = await fetch(`https://api.countrystatecity.in/v1/countries/IN/states/${stateCode}/cities`, {
        headers: {
          'X-CSCAPI-KEY': 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
        }
      })
      const data = await response.json()
      setCities(data)
    } catch (error) {
      console.error('Error fetching cities:', error)
    } finally {
      setLoadingCities(false)
    }
  }

  const fetchProfessions = async () => {
    try {
      // Fallback to common professions
      const commonProfessions = [
        "Accountant", "Actor/Actress", "Architect", "Artist", "Banker",
        "Business Owner", "Chef", "Civil Engineer", "Consultant", "Data Analyst",
        "Data Scientist", "Designer", "Developer", "Doctor", "Driver",
        "Electrician", "Engineer", "Entrepreneur", "Farmer", "Fashion Designer",
        "Financial Analyst", "Freelancer", "Government Employee", "Graphic Designer",
        "HR Manager", "IT Professional", "Journalist", "Lawyer", "Manager",
        "Marketing Manager", "Mechanic", "Musician", "Nurse", "Pharmacist",
        "Photographer", "Pilot", "Plumber", "Professor", "Project Manager",
        "Real Estate Agent", "Researcher", "Sales Representative", "Scientist",
        "Self Employed", "Software Engineer", "Student", "Teacher", "Writer", "Other"
      ]
      const sorted = commonProfessions.filter(p => p !== "Other").sort()
      sorted.push("Other")
      setProfessions(sorted)
    } catch (error) {
      console.error('Error fetching professions:', error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleStateChange = (e) => {
    const selectedState = states.find(s => s.name === e.target.value)
    setFormData(prev => ({ ...prev, state: e.target.value, city: "" }))
    if (selectedState) {
      fetchCities(selectedState.iso2)
    }
  }

  const handleProfessionSelect = (profession) => {
    if (profession === "Other") {
      setFormData(prev => ({ ...prev, profession: "Other" }))
      setShowCustomProfession(true)
      setShowProfessionDropdown(false)
      setProfessionSearch("")
    } else {
      setFormData(prev => ({ ...prev, profession }))
      setShowCustomProfession(false)
      setShowProfessionDropdown(false)
      setProfessionSearch("")
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    return false
  }

const handleSubmit = async () => {
  try {
    const payload = {
  fullName: formData.fullName,
  email: formData.email,

  profession:
    formData.ratherNotSayProfession
      ? userInfo.profession || "" // do NOT erase existing profession
      : formData.profession === "Other" && formData.customProfession
        ? formData.customProfession
        : formData.profession,

  // KYC block — optional values allowed, but nothing empty overwrites DB
  kycDetails: {
    fullLegalName: formData.fullName,
    ...(formData.addressLine1 && { address: formData.addressLine1 }),
    ...(formData.city && { city: formData.city }),
    ...(formData.state && { state: formData.state }),
    ...(formData.postalCode && { pincode: formData.postalCode }),
    ...(formData.panNumber && { panNumber: formData.panNumber }),
    status: "pending",
    submittedAt: new Date(),
  },
};

// ⤵️ Optional dob/gender (only save if DB missing)
if (!userInfo.gender && formData.gender) {
  payload.gender = formData.gender;
}
if (!userInfo.dob && formData.dateOfBirth) {
  payload.dob = formData.dateOfBirth;
}

    const res = await updateProfile(payload).unwrap();
    dispatch(setCredentials(res.user));

    setShowSuccess(true);
    setIsSubmitted(true);

    setTimeout(() => {
      setShowSuccess(false);
      if (onComplete) onComplete(formData);
    }, 2000);
  } catch (error) {
    alert(error?.data?.message || "Failed to submit KYC");
  }
};


const handleSaveProfileBeforeNext = () => {
  setCurrentStep(prev => prev + 1);
};




  const filteredProfessions = professions.filter(occ =>
    occ.toLowerCase().includes(professionSearch.toLowerCase())
  )

  // Improved Date Picker Component
  const ImprovedDatePicker = ({ darkMode, value, onChange, name }) => {
    const [showCalendar, setShowCalendar] = useState(false)
    const [selectedYear, setSelectedYear] = useState(value ? new Date(value + 'T00:00:00').getFullYear() : new Date().getFullYear())
    const [selectedMonth, setSelectedMonth] = useState(value ? new Date(value + 'T00:00:00').getMonth() : new Date().getMonth())
    const calendarRef = useRef(null)

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i)

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (calendarRef.current && !calendarRef.current.contains(event.target)) {
          setShowCalendar(false)
        }
      }
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const getDaysInMonth = (year, month) => {
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
        const month = String(selectedMonth + 1).padStart(2, '0')
        const dayStr = String(day.day).padStart(2, '0')
        const formattedDate = `${selectedYear}-${month}-${dayStr}`
        onChange({ target: { name, value: formattedDate } })
        setShowCalendar(false)
      }
    }

    const formatDisplayDate = (dateString) => {
      if (!dateString) return "Select date of birth (Optional)"
      const date = new Date(dateString + 'T00:00:00')
      return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    }

    const selectedDate = value ? new Date(value + 'T00:00:00') : null
    const isSelectedDate = (day) => {
      if (!selectedDate || !day.isCurrentMonth) return false
      return day.day === selectedDate.getDate() &&
        selectedMonth === selectedDate.getMonth() &&
        selectedYear === selectedDate.getFullYear()
    }

    
    return (
      <div className="relative" ref={calendarRef}>
        <button
          type="button"
          onClick={() => setShowCalendar(!showCalendar)}
          className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all text-left flex items-center justify-between ${darkMode
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
            <div
              className="fixed inset-0 z-[99] sm:hidden bg-black/20"
              onClick={() => setShowCalendar(false)}
            />

            <div
              className={`fixed sm:absolute left-1/2 top-1/2 sm:top-full sm:left-0 -translate-x-1/2 -translate-y-1/2 sm:translate-x-0 sm:translate-y-0 sm:mt-2 z-[100] rounded-2xl border shadow-2xl ${darkMode ? "bg-zinc-800 border-zinc-700" : "bg-white border-gray-200"
                }`}
              style={{
                width: '320px',
                maxWidth: 'calc(100vw - 2rem)'
              }}
            >

              {/* Year and Month Selectors */}
              <div className={`p-4 border-b ${darkMode ? "border-zinc-700" : "border-gray-200"}`}>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className={`text-xs font-medium mb-1 block ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                      Year
                    </label>
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(Number(e.target.value))}
                      className={`w-full px-3 py-2 rounded-lg border outline-none text-sm font-semibold ${darkMode
                        ? "bg-zinc-900 border-zinc-700 text-white"
                        : "bg-gray-50 border-gray-200 text-gray-900"
                        }`}
                    >
                      {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={`text-xs font-medium mb-1 block ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                      Month
                    </label>
                    <select
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(Number(e.target.value))}
                      className={`w-full px-3 py-2 rounded-lg border outline-none text-sm font-semibold ${darkMode
                        ? "bg-zinc-900 border-zinc-700 text-white"
                        : "bg-gray-50 border-gray-200 text-gray-900"
                        }`}
                    >
                      {months.map((month, idx) => (
                        <option key={idx} value={idx}>{month.slice(0, 3)}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Calendar Days */}
              <div className="p-4">
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {days.map((day) => (
                    <div key={day} className={`text-center text-xs font-semibold py-2 ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {getDaysInMonth(selectedYear, selectedMonth).map((day, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleDateSelect(day)}
                      className={`aspect-square rounded-lg text-sm font-medium transition-all ${!day.isCurrentMonth
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

  // Custom Dropdown Component
  const CustomDropdown = ({ darkMode, value, onChange, name, options, placeholder, loading }) => {
    const [showDropdown, setShowDropdown] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const dropdownRef = useRef(null)

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setShowDropdown(false)
          setSearchQuery("")
        }
      }
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const filteredOptions = options.filter(option =>
      option.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleSelect = (optionName) => {
      onChange({ target: { name, value: optionName } })
      setShowDropdown(false)
      setSearchQuery("")
    }

    return (
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setShowDropdown(!showDropdown)}
          disabled={loading}
          className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all text-left flex items-center justify-between ${darkMode
            ? "bg-zinc-800/50 border-zinc-700 text-white hover:border-emerald-500 disabled:opacity-50"
            : "bg-white border-gray-200 text-gray-900 hover:border-emerald-500 focus:ring-4 focus:ring-emerald-100 disabled:opacity-50"
            }`}
        >
          <span className={!value ? (darkMode ? "text-zinc-500" : "text-gray-400") : ""}>
            {loading ? "Loading..." : value || placeholder}
          </span>
          <ChevronRight className={`w-5 h-5 transition-transform ${showDropdown ? 'rotate-90' : ''} ${darkMode ? "text-zinc-400" : "text-gray-400"
            }`} />
        </button>

        {showDropdown && !loading && (
          <>
            {/* Mobile backdrop */}
            <div
              className="fixed inset-0 z-[99] sm:hidden bg-black/20"
              onClick={() => setShowDropdown(false)}
            />

            <div
              className={`fixed sm:absolute left-1/2 top-1/2 sm:top-full sm:left-0 -translate-x-1/2 sm:translate-x-0 -translate-y-1/2 sm:translate-y-0 sm:mt-2 z-[100] rounded-2xl border shadow-2xl overflow-hidden ${darkMode ? "bg-zinc-800 border-zinc-700" : "bg-white border-gray-200"
                }`}
              style={{
                width: '320px',
                maxWidth: 'calc(100vw - 2rem)'
              }}
            >
              {/* Search Input */}
              <div className={`p-3 border-b ${darkMode ? "border-zinc-700" : "border-gray-200"}`}>
                <input
                  type="text"
                  placeholder={`Search ${placeholder.toLowerCase()}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border outline-none transition-all text-sm ${darkMode
                    ? "bg-zinc-900/50 border-zinc-700 text-white placeholder-zinc-500 focus:border-emerald-500"
                    : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500"
                    }`}
                  autoFocus
                />
              </div>

              {/* Options List with Hidden Scrollbar */}
              <div
                className="max-h-64 overflow-y-auto scrollbar-hide"
                style={{
                  scrollbarWidth: 'none', /* Firefox */
                  msOverflowStyle: 'none' /* IE and Edge */
                }}
              >
                {/* Placeholder option */}
                <button
                  type="button"
                  onClick={() => handleSelect("")}
                  className={`w-full px-4 py-3 text-left transition-all border-b ${!value
                    ? darkMode
                      ? "bg-emerald-950/30 text-emerald-400 border-zinc-700"
                      : "bg-emerald-50 text-emerald-600 border-gray-200"
                    : darkMode
                      ? "hover:bg-zinc-700 text-zinc-400 border-zinc-700"
                      : "hover:bg-gray-50 text-gray-500 border-gray-200"
                    }`}
                >
                  {placeholder}
                </button>

                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => (
                    <button
                      key={option.iso2 || option.id}
                      type="button"
                      onClick={() => handleSelect(option.name)}
                      className={`w-full px-4 py-3 text-left transition-all border-b last:border-b-0 ${value === option.name
                        ? darkMode
                          ? "bg-emerald-950/30 text-emerald-400 border-zinc-700"
                          : "bg-emerald-50 text-emerald-600 border-gray-200"
                        : darkMode
                          ? "hover:bg-zinc-700 text-white border-zinc-700"
                          : "hover:bg-gray-50 text-gray-900 border-gray-200"
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{option.name}</span>
                        {value === option.name && (
                          <CheckCircle2 className={`w-4 h-4 ${darkMode ? "text-emerald-400" : "text-emerald-600"
                            }`} />
                        )}
                      </div>
                    </button>
                  ))
                ) : (
                  <div className={`px-4 py-8 text-center ${darkMode ? "text-zinc-500" : "text-gray-500"
                    }`}>
                    <p className="text-sm">No results found</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    )
  }

  const steps = [
    { number: 1, title: "Personal Info", icon: User },
    { number: 2, title: "Address & PAN", icon: MapPin },
    { number: 3, title: "Preview", icon: Eye }
  ]
    const isKycApproved = userInfo?.kycDetails?.panVerified === true && 
                        userInfo?.kycDetails?.status === "verified";


if (isKycApproved) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] ${
          darkMode ? "bg-emerald-950/20" : "bg-emerald-50"
        }`} />
        <div className={`absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[100px] ${
          darkMode ? "bg-teal-950/20" : "bg-teal-50"
        }`} />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`relative z-10 max-w-4xl w-full rounded-3xl overflow-hidden ${
          darkMode
            ? "bg-zinc-900/50 backdrop-blur-xl border border-zinc-800"
            : "bg-white backdrop-blur-xl border border-gray-200 shadow-xl"
        }`}
      >
        {/* Header */}
        <div className="relative h-32 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700">
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                backgroundSize: "32px 32px"
              }}
            />
          </div>
        </div>

        <div className="px-6 sm:px-8 pb-10 -mt-16">
          {/* Success Badge */}
          <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 shadow-xl ${
            darkMode ? "bg-emerald-900/50 ring-4 ring-zinc-900/50" : "bg-white ring-8 ring-white shadow-2xl"
          }`}>
          </div>

          <h2 className={`text-3xl sm:text-4xl font-bold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
            KYC Verified Successfully
          </h2>

          <p className={`text-base mb-8 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Your KYC verification is complete and approved
          </p>

          {/* Status Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 ${
            darkMode ? "bg-emerald-950/30 border border-emerald-800" : "bg-emerald-50 border-2 border-emerald-200"
          }`}>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className={`text-sm font-semibold ${darkMode ? "text-emerald-400" : "text-emerald-700"}`}>
              Verified & Approved
            </span>
          </div>

          {/* KYC Details */}
          <div className="space-y-6">
            {/* Personal Information */}
            <div className={`p-6 rounded-2xl border ${
              darkMode ? "bg-zinc-800/30 border-zinc-700" : "bg-gray-50 border-gray-200"
            }`}>
              <h4 className={`font-semibold mb-4 flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                <User className="w-5 h-5" />
                Personal Information
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className={`text-xs font-medium mb-1 ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                    Full Name
                  </p>
                  <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {userInfo.fullName || "—"}
                  </p>
                </div>
                <div>
                  <p className={`text-xs font-medium mb-1 ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                    Date of Birth
                  </p>
                  <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {userInfo.dob ? new Date(userInfo.dob).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    }) : "Not provided"}
                  </p>
                </div>
                <div>
                  <p className={`text-xs font-medium mb-1 ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                    Gender
                  </p>
                  <p className={`font-semibold capitalize ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {userInfo.gender || "—"}
                  </p>
                </div>
                <div>
                  <p className={`text-xs font-medium mb-1 ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                    Profession
                  </p>
                  <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {userInfo.profession || "—"}
                  </p>
                </div>
                <div>
                  <p className={`text-xs font-medium mb-1 ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                    Phone Number
                  </p>
                  <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {userInfo.mobileNo || "—"}
                  </p>
                </div>
                <div>
                  <p className={`text-xs font-medium mb-1 ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                    Email Address
                  </p>
                  <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {userInfo.email || "—"}
                  </p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className={`p-6 rounded-2xl border ${
              darkMode ? "bg-zinc-800/30 border-zinc-700" : "bg-gray-50 border-gray-200"
            }`}>
              <h4 className={`font-semibold mb-4 flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                <MapPin className="w-5 h-5" />
                Residential Address
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <p className={`text-xs font-medium mb-1 ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                    Address
                  </p>
                  <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {userInfo.address?.house || "—"}
                  </p>
                </div>
                <div>
                  <p className={`text-xs font-medium mb-1 ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                    City
                  </p>
                  <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {userInfo.kycDetails?.city || "—"}
                  </p>
                </div>
                <div>
                  <p className={`text-xs font-medium mb-1 ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                    State
                  </p>
                  <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {userInfo.kycDetails?.state || "—"}
                  </p>
                </div>
                <div>
                  <p className={`text-xs font-medium mb-1 ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                    Postal Code
                  </p>
                  <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {userInfo.address?.pincode || "Not provided"}
                  </p>
                </div>
              </div>
            </div>

            {/* PAN Details */}
            <div className={`p-6 rounded-2xl border ${
              darkMode ? "bg-zinc-800/30 border-zinc-700" : "bg-gray-50 border-gray-200"
            }`}>
              <h4 className={`font-semibold mb-4 flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                <CreditCard className="w-5 h-5" />
                PAN Card Details
              </h4>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-xs font-medium mb-1 ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                    PAN Number
                  </p>
                  <p className={`font-bold text-lg ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {userInfo.kycDetails?.panNumber || "—"}
                  </p>
                </div>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                  darkMode ? "bg-emerald-950/30" : "bg-emerald-50"
                }`}>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className={`text-sm font-semibold ${darkMode ? "text-emerald-400" : "text-emerald-700"}`}>
                    Verified
                  </span>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className={`p-5 rounded-xl border ${
              darkMode ? "bg-blue-950/20 border-blue-800/50" : "bg-blue-50 border-2 border-blue-200"
            }`}>
              <div className="flex items-start gap-3">
                <Lock className={`w-5 h-5 flex-shrink-0 mt-0.5 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
                <div>
                  <p className={`font-semibold text-sm mb-1 ${darkMode ? "text-blue-300" : "text-blue-900"}`}>
                    KYC Details Locked
                  </p>
                  <p className={`text-xs ${darkMode ? "text-blue-400" : "text-blue-700"}`}>
                    Your KYC has been verified and approved. These details are now locked and cannot be modified.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] ${darkMode ? "bg-emerald-950/20" : "bg-emerald-50"
            }`} />
          <div className={`absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[100px] ${darkMode ? "bg-teal-950/20" : "bg-teal-50"
            }`} />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`relative z-10 max-w-2xl w-full rounded-3xl overflow-hidden ${darkMode
            ? "bg-zinc-900/50 backdrop-blur-xl border border-zinc-800"
            : "bg-white backdrop-blur-xl border border-gray-200 shadow-xl"
            }`}
        >
          <div className="relative h-40 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700">
            <div className="absolute inset-0 opacity-20">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                  backgroundSize: "32px 32px"
                }}
              />
            </div>
          </div>

          <div className="px-8 pb-10 text-center -mt-20">
            <div className={`inline-flex items-center justify-center w-28 h-28 rounded-full mb-8 shadow-xl ${
              darkMode ? "bg-emerald-900/50 ring-4 ring-zinc-900/50" : "bg-white ring-8 ring-white shadow-2xl"
            }`}>
              
            </div>

            <h2 className={`text-3xl sm:text-4xl font-bold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
              KYC Submitted Successfully
            </h2>

            <p className={`text-base mb-8 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Thank you for submitting your verification documents
            </p>

            <div className={`p-6 rounded-2xl mb-6 shadow-sm ${darkMode ? "bg-zinc-800/50 border border-zinc-700" : "bg-blue-50/80 border-2 border-blue-200"
              }`}>
              <div className="flex items-start gap-4">
                <AlertCircle className={`w-6 h-6 flex-shrink-0 mt-1 ${darkMode ? "text-blue-400" : "text-blue-600"
                  }`} />
                <div className="text-left">
                  <p className={`font-semibold text-base mb-2 ${darkMode ? "text-blue-300" : "text-blue-900"}`}>
                    Your KYC is Under Review
                  </p>
                  <p className={`text-sm leading-relaxed ${darkMode ? "text-blue-400/90" : "text-blue-700"}`}>
                    Our admin team is reviewing your KYC details. You'll be notified once the verification is complete.
                    Your KYC details cannot be changed during the review process.
                  </p>
                </div>
              </div>
            </div>

            <div className={`p-5 rounded-xl shadow-sm ${darkMode ? "bg-yellow-900/20 border border-yellow-800/50" : "bg-yellow-50/90 border-2 border-yellow-300"
              }`}>
              <p className={`text-sm font-semibold flex items-center justify-center gap-2 ${darkMode ? "text-yellow-300" : "text-yellow-900"}`}>
                <Lock className="w-4 h-4 flex-shrink-0" />
                KYC details are locked and cannot be modified
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`fixed top-4 right-4 sm:top-6 sm:right-6 z-50 px-4 sm:px-6 py-3 sm:py-4 rounded-2xl shadow-2xl max-w-[calc(100vw-2rem)] sm:max-w-sm ${darkMode
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
  Your form has been sent for admin approval.
</p>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] ${darkMode ? "bg-emerald-950/20" : "bg-emerald-50"
          }`} />
        <div className={`absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[100px] ${darkMode ? "bg-teal-950/20" : "bg-teal-50"
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
          <div className="flex items-center max-w-3xl px-4">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === step.number
              const isCompleted = currentStep > step.number

              return (
                <div key={step.number} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 transition-all ${isCompleted
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
                        <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? "text-white" : darkMode ? "text-zinc-400" : "text-gray-400"
                          }`} />
                      )}
                    </div>
                    <span className={`mt-2 text-[10px] sm:text-xs font-medium text-center whitespace-nowrap ${isActive || isCompleted
                      ? darkMode ? "text-emerald-400" : "text-emerald-600"
                      : darkMode ? "text-zinc-500" : "text-gray-500"
                      }`}>
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`h-0.5 w-12 sm:w-16 md:w-20 mx-3 sm:mx-4 ${isCompleted
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
          className={`rounded-3xl overflow-visible ${darkMode
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
                            className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 outline-none transition-all ${darkMode
                              ? "bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500 focus:border-emerald-500"
                              : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                              }`}
                          />
                        </div>
                      </div>

                      <div>
                        <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                          Date of Birth <span className="text-gray-400 text-xs">(Optional)</span>
                        </label>
                        <ImprovedDatePicker
                          darkMode={darkMode}
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          name="dateOfBirth"
                        />
                      </div>

                      {/* Gender Field */}
                      <div className="md:col-span-2">
                        <label className={`block text-sm font-semibold mb-3 ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                          Gender <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, gender: "male" }))}
                            className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${formData.gender === "male"
                              ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30"
                              : darkMode
                                ? "border-zinc-700 bg-zinc-800/50 hover:border-zinc-600"
                                : "border-gray-200 bg-white hover:border-gray-300"
                              }`}
                          >
                            <svg className={`w-8 h-8 ${formData.gender === "male" ? "text-emerald-600" : darkMode ? "text-zinc-400" : "text-gray-400"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="10" cy="14" r="6" />
                              <path d="M14 4 L20 4 L20 10 M14 4 L20 10" />
                              <line x1="14" y1="10" x2="19" y2="5" />
                            </svg>
                            <span className={`font-semibold ${formData.gender === "male" ? "text-emerald-600" : darkMode ? "text-white" : "text-gray-900"}`}>
                              Male
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, gender: "female" }))}
                            className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${formData.gender === "female"
                              ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30"
                              : darkMode
                                ? "border-zinc-700 bg-zinc-800/50 hover:border-zinc-600"
                                : "border-gray-200 bg-white hover:border-gray-300"
                              }`}
                          >
                            <svg className={`w-8 h-8 ${formData.gender === "female" ? "text-emerald-600" : darkMode ? "text-zinc-400" : "text-gray-400"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="8" r="6" />
                              <line x1="12" y1="14" x2="12" y2="21" />
                              <line x1="9" y1="18" x2="15" y2="18" />
                            </svg>
                            <span className={`font-semibold ${formData.gender === "female" ? "text-emerald-600" : darkMode ? "text-white" : "text-gray-900"}`}>
                              Female
                            </span>
                          </button>
                        </div>
                      </div>

                      {/* Profession with Search */}
                      <div>
                        <label
                          className={`block text-sm font-semibold mb-2 ${darkMode ? "text-zinc-300" : "text-gray-700"
                            }`}
                        >
                          Profession <span className="text-red-500">*</span>
                        </label>

                        {/* RATHER NOT SAY */}
                        <div className="flex items-center gap-2 mb-2">
                          <input
                            type="checkbox"
                            checked={formData.ratherNotSayProfession || false}
                            onChange={(e) => {
                              setFormData((prev) => ({
                                ...prev,
                                ratherNotSayProfession: e.target.checked,
                                profession: e.target.checked ? "" : prev.profession,
                              }))
                              if (e.target.checked) {
                                setShowProfessionDropdown(false)
                              }
                            }}
                          />
                          <span className={darkMode ? "text-zinc-300" : "text-gray-700"}>
                            Rather not say
                          </span>
                        </div>

                        <div className="relative" ref={professionRef}>
                          <div className="relative">
                            <Building
                              className={`absolute left-4 top-3.5 w-5 h-5 z-10 ${darkMode ? "text-zinc-500" : "text-gray-400"
                                }`}
                            />

                            <input
                              type="text"
                              disabled={formData.ratherNotSayProfession}
                              value={showProfessionDropdown ? professionSearch : formData.profession}
                              onChange={(e) => {
                                const value = e.target.value
                                setProfessionSearch(value)
                                setFormData(prev => ({ ...prev, profession: value }))
                                setShowProfessionDropdown(true)
                              }}
                              onFocus={() => {
                                setProfessionSearch(formData.profession)
                                setShowProfessionDropdown(true)
                              }}
                              placeholder="Search profession..."
                              className={`w-full pl-12 pr-10 py-3 rounded-xl border-2 outline-none transition-all ${darkMode
                                ? "bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500 focus:border-emerald-500"
                                : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                                } ${formData.ratherNotSayProfession ? "opacity-50 cursor-not-allowed" : ""}`}
                            />

                            <Search
                              className={`absolute right-4 top-3.5 w-5 h-5 ${darkMode ? "text-zinc-500" : "text-gray-400"
                                }`}
                            />
                          </div>

                          {/* DROPDOWN */}
                          {showProfessionDropdown &&
                            filteredProfessions.length > 0 &&
                            !formData.ratherNotSayProfession && (
                              <div
                                className={`absolute top-full left-0 right-0 mt-2 max-h-60 overflow-y-auto rounded-xl border shadow-xl z-50 scrollbar-hide ${darkMode ? "bg-zinc-800 border-zinc-700" : "bg-white border-gray-200"
                                  }`}
                              >
                                {filteredProfessions.map((profession, idx) => (
                                  <button
                                    key={idx}
                                    type="button"
                                    onClick={() => handleProfessionSelect(profession)}
                                    className={`w-full px-4 py-3 text-left transition-colors ${darkMode
                                      ? "hover:bg-zinc-700 text-white"
                                      : "hover:bg-gray-50 text-gray-900"
                                      } ${idx !== 0
                                        ? darkMode
                                          ? "border-t border-zinc-700"
                                          : "border-t border-gray-100"
                                        : ""
                                      }`}
                                  >
                                    {profession}
                                  </button>
                                ))}


                              </div>

                            )}

                          {/* Custom Profession Input - Shows when "Other" is selected */}
                          {showCustomProfession && formData.profession === "Other" && (
                            <div className="mt-3">
                              <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                                Enter Your Profession
                              </label>
                              <input
                                type="text"
                                value={formData.customProfession || ""}
                                onChange={(e) => setFormData(prev => ({ ...prev, customProfession: e.target.value }))}
                                placeholder="Type your profession..."
                                className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all ${darkMode
                                  ? "bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500 focus:border-emerald-500"
                                  : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                                  }`}
                              />
                            </div>
                          )}
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
                            className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 outline-none transition-all ${darkMode
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
                            className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 outline-none transition-all ${darkMode
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

              {/* Step 2: Address & PAN */}
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
                      Residential Address & PAN Details
                    </h3>

                    <div className="space-y-6">
                      <div>
                        <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                          Address <span className="text-gray-400 text-xs">(Optional)</span>
                        </label>
                        <div className="relative">
                          <MapPin className={`absolute left-4 top-3.5 w-5 h-5 ${darkMode ? "text-zinc-500" : "text-gray-400"}`} />
                          <input
                            type="text"
                            name="addressLine1"
                            value={formData.addressLine1}
                            onChange={handleInputChange}
                            placeholder="Please enter your address"
                            className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 outline-none transition-all ${darkMode
                              ? "bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500 focus:border-emerald-500"
                              : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                              }`}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* State Dropdown */}
                        <div>
                          <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                            State <span className="text-red-500">*</span>
                          </label>
                          <CustomDropdown
                            darkMode={darkMode}
                            value={formData.state}
                            onChange={handleStateChange}
                            name="state"
                            options={states}
                            placeholder="Select state"
                            loading={loadingStates}
                          />
                        </div>

                        {/* City Dropdown */}
                        <div>
                          <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                            City <span className="text-red-500">*</span>
                          </label>
                          <CustomDropdown
                            darkMode={darkMode}
                            value={formData.city}
                            onChange={handleInputChange}
                            name="city"
                            options={cities}
                            placeholder="Select city"
                            loading={loadingCities}
                          />
                        </div>

                        <div>
                          <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                            Postal Code <span className="text-gray-400">(Optional)</span>
                          </label>
                          <input
                            type="text"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleInputChange}
                            placeholder="PIN / ZIP code"
                            className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all ${darkMode
                              ? "bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500 focus:border-emerald-500"
                              : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                              }`}
                          />
                        </div>
                      </div>

                      {/* PAN Details */}
                      <div className={`p-5 rounded-xl border ${darkMode ? "bg-zinc-800/30 border-zinc-700" : "bg-gray-50 border-gray-200"
                        }`}>
                        <h4 className={`font-semibold mb-4 flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                          <CreditCard className="w-5 h-5" />
                          PAN Card Details
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                              PAN Number <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="panNumber"
                              value={formData.panNumber}
                              onChange={handleInputChange}
                              onPaste={handlePaste}
                              placeholder="ABCDE1234F"
                              maxLength="10"
                              className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all uppercase ${darkMode
                                ? "bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500 focus:border-emerald-500"
                                : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                                }`}
                            />
                          </div>

                          <div>
                            <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                              Confirm PAN Number <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="confirmPanNumber"
                              value={formData.confirmPanNumber}
                              onChange={handleInputChange}
                              onPaste={handlePaste}
                              placeholder="Re-enter PAN"
                              maxLength="10"
                              className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all uppercase ${darkMode
                                ? "bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500 focus:border-emerald-500"
                                : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                                }`}
                            />
                          </div>
                        </div>

                        {formData.panNumber && formData.confirmPanNumber && formData.panNumber !== formData.confirmPanNumber && (
                          <div className={`mt-3 p-3 rounded-lg flex items-center gap-2 ${darkMode ? "bg-red-950/30 border border-red-900/50" : "bg-red-50 border border-red-200"
                            }`}>
                            <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className={`text-sm font-medium ${darkMode ? "text-red-400" : "text-red-600"}`}>
                              PAN numbers do not match
                            </span>
                          </div>
                        )}

                        {formData.panNumber && formData.confirmPanNumber && formData.panNumber === formData.confirmPanNumber && (
                          <div className={`mt-3 p-3 rounded-lg flex items-center gap-2 ${darkMode ? "bg-emerald-950/30 border border-emerald-900/50" : "bg-emerald-50 border border-emerald-200"
                            }`}>
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                            <span className={`text-sm font-medium ${darkMode ? "text-emerald-400" : "text-emerald-600"}`}>
                              PAN numbers match
                            </span>
                          </div>
                        )}

                        <div className={`mt-3 p-3 rounded-lg border ${darkMode ? "bg-blue-950/20 border-blue-900/30" : "bg-blue-50 border-blue-200"
                          }`}>
                          <p className={`text-xs ${darkMode ? "text-blue-300" : "text-blue-700"}`}>
                            <strong>Note:</strong> Copy-paste is disabled for security. Please type your PAN number carefully.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Preview */}
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
                      Review Your KYC Details
                    </h3>
                    <p className={`text-sm mb-6 ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                      Please review all information carefully before submitting
                    </p>

                    {/* Personal Information Preview */}
                    <div className={`p-6 rounded-2xl border mb-6 ${darkMode ? "bg-zinc-800/30 border-zinc-700" : "bg-gray-50 border-gray-200"
                      }`}>
                      <h4 className={`font-semibold mb-4 flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                        <User className="w-5 h-5" />
                        Personal Information
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className={`text-xs font-medium mb-1 ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>Full Name</p>
                          <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>{formData.fullName || "—"}</p>
                        </div>
                        <div>
                          <p className={`text-xs font-medium mb-1 ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>Date of Birth</p>
                          <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                            {formData.dateOfBirth ? new Date(formData.dateOfBirth + 'T00:00:00').toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            }) : "Not provided"}
                          </p>
                        </div>
                        <div>
                          <p className={`text-xs font-medium mb-1 ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>Gender</p>
                          <p className={`font-semibold capitalize ${darkMode ? "text-white" : "text-gray-900"}`}>{formData.gender || "—"}</p>
                        </div>
                        <div>
                          <p className={`text-xs font-medium mb-1 ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>Profession</p>
                          <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                            {formData.profession === "Other" && formData.customProfession
                              ? formData.customProfession
                              : formData.profession || "—"}
                          </p>
                        </div>


                        <div>
                          <p className={`text-xs font-medium mb-1 ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>Phone Number</p>
                          <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>{formData.phoneNumber || "—"}</p>
                        </div>
                        <div>
                          <p className={`text-xs font-medium mb-1 ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>Email Address</p>
                          <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>{formData.email || "—"}</p>
                        </div>
                      </div>
                    </div>

                    {/* Address Preview */}
                    <div className={`p-6 rounded-2xl border mb-6 ${darkMode ? "bg-zinc-800/30 border-zinc-700" : "bg-gray-50 border-gray-200"
                      }`}>
                      <h4 className={`font-semibold mb-4 flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                        <MapPin className="w-5 h-5" />
                        Residential Address
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <p className={`text-xs font-medium mb-1 ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>Address</p>
                          <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>{formData.addressLine1 || "—"}</p>
                        </div>
                        <div>
                          <p className={`text-xs font-medium mb-1 ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>City</p>
                          <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>{formData.city || "—"}</p>
                        </div>
                        <div>
                          <p className={`text-xs font-medium mb-1 ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>State</p>
                          <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>{formData.state || "—"}</p>
                        </div>
                        <div>
                          <p className={`text-xs font-medium mb-1 ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>Postal Code</p>
                          <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>{formData.postalCode || "Not provided"}</p>
                        </div>
                      </div>
                    </div>

                    {/* PAN Preview */}
                    <div className={`p-6 rounded-2xl border ${darkMode ? "bg-zinc-800/30 border-zinc-700" : "bg-gray-50 border-gray-200"
                      }`}>
                      <h4 className={`font-semibold mb-4 flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                        <CreditCard className="w-5 h-5" />
                        PAN Card Details
                      </h4>
                      <div>
                        <p className={`text-xs font-medium mb-1 ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>PAN Number</p>
                        <p className={`font-bold text-lg ${darkMode ? "text-white" : "text-gray-900"}`}>{formData.panNumber || "—"}</p>
                      </div>
                    </div>

                    {/* Important Notice */}
                    <div className={`p-4 rounded-xl border ${darkMode ? "bg-yellow-900/20 border-yellow-800/50" : "bg-yellow-50 border-yellow-200"
                      }`}>
                      <div className="flex items-start gap-3">
                        <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${darkMode ? "text-yellow-400" : "text-yellow-600"
                          }`} />
                        <div>
                          <p className={`font-semibold mb-1 text-sm ${darkMode ? "text-yellow-300" : "text-yellow-800"}`}>
                            Important Notice
                          </p>
                          <p className={`text-xs ${darkMode ? "text-yellow-400" : "text-yellow-700"}`}>
                            Once submitted, your KYC details cannot be modified and will be sent for admin approval.
                            Please ensure all information is accurate.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0 mt-8 pt-6 border-t border-gray-200 dark:border-zinc-800">
              {currentStep > 1 ? (
                <button
                  // back button
onClick={() => setCurrentStep(prev => prev - 1)}

                  className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${darkMode
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
                  className={`text-sm font-medium underline text-center sm:text-left ${darkMode ? "text-zinc-400 hover:text-zinc-300" : "text-gray-600 hover:text-gray-700"
                    }`}
                >
                  Skip for now
                </button>
              )}

              {currentStep < 3 ? (
                <button
                  onClick={handleSaveProfileBeforeNext}
                  className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold transition-all shadow-lg"
                >
                  Continue
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={formData.panNumber !== formData.confirmPanNumber || !formData.panNumber || !formData.confirmPanNumber}
                  className={`flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all shadow-lg ${formData.panNumber !== formData.confirmPanNumber || !formData.panNumber || !formData.confirmPanNumber
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                    }`}
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