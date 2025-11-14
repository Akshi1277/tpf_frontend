"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Droplet, 
  Calendar, 
  Shield,
  Edit3,
  Save,
  X,
  ChevronLeft,
  ChevronRight,
  Award,
  Heart,
  Check,
  Briefcase,
  Users,
  Search,
  ChevronDown
} from "lucide-react"

export default function ProfilePage({ darkModeFromParent}) {
  const router = useRouter()
  const [darkMode, setDarkMode] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [professions, setProfessions] = useState([])
  const [professionSearch, setProfessionSearch] = useState("")
  const [showProfessionDropdown, setShowProfessionDropdown] = useState(false)
  const professionRef = useRef(null)
  
  const [profileData, setProfileData] = useState({
    fullName: "Ahmed Khan",
    email: "ahmed.khan@example.com",
    mobile: "+91 9876543210",
    address: "123, MG Road, Bangalore, Karnataka - 560001",
    bloodGroup: "O+",
    gender: "Male",
    dob: "1990-05-15",
    profession: "Software Engineer",
    userRole: "donor",
    zakaatAmount: null,
  })

  useEffect(() => {
    if (darkModeFromParent !== undefined) {
      setDarkMode(darkModeFromParent)
    }
  }, [darkModeFromParent])

  // Fetch professions from API
  useEffect(() => {
    const fetchProfessions = async () => {
      try {
        // Using a free API that provides occupation data
        const response = await axios.get('https://api.api-ninjas.com/v1/occupation', {
          headers: { 'X-Api-Key': 'your_api_key_here' }
        })
        
        // Fallback to common professions if API fails
        const commonProfessions = [
          "Software Engineer", "Doctor", "Teacher", "Nurse", "Accountant",
          "Engineer", "Manager", "Consultant", "Designer", "Architect",
          "Lawyer", "Pharmacist", "Scientist", "Analyst", "Developer",
          "Marketing Manager", "Sales Representative", "Business Owner",
          "Entrepreneur", "Student", "Researcher", "Writer", "Artist",
          "Musician", "Chef", "Photographer", "Pilot", "Driver",
          "Electrician", "Plumber", "Mechanic", "Carpenter", "Farmer"
        ]
        
        setProfessions(commonProfessions.sort())
      } catch (error) {
        // Fallback professions
        const commonProfessions = [
          "Software Engineer", "Doctor", "Teacher", "Nurse", "Accountant",
          "Engineer", "Manager", "Consultant", "Designer", "Architect",
          "Lawyer", "Pharmacist", "Scientist", "Analyst", "Developer",
          "Marketing Manager", "Sales Representative", "Business Owner",
          "Entrepreneur", "Student", "Researcher", "Writer", "Artist",
          "Musician", "Chef", "Photographer", "Pilot", "Driver",
          "Electrician", "Plumber", "Mechanic", "Carpenter", "Farmer"
        ]
        setProfessions(commonProfessions.sort())
      }
    }
    
    fetchProfessions()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (professionRef.current && !professionRef.current.contains(event.target)) {
        setShowProfessionDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileData(prev => ({ ...prev, [name]: value }))
  }

  const handleProfessionSelect = (profession) => {
    setProfileData(prev => ({ ...prev, profession }))
    setShowProfessionDropdown(false)
    setProfessionSearch("")
  }

  const handleSave = () => {
    setIsEditing(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const calculateAge = (dob) => {
    const birthDate = new Date(dob + 'T00:00:00')
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const handleCalculateZakaat = () => {
    alert("Zakaat calculator will be opened here")
  }

  const userRoles = [
    { value: "donor", label: "Donor", description: "One-time contributor", icon: Heart },
    { value: "permanent_donor", label: "Permanent Donor", description: "Regular monthly supporter", icon: Award },
    { value: "volunteer", label: "Volunteer", description: "Active community helper", icon: Shield },
    { value: "beneficiary", label: "Beneficiary", description: "Campaign recipient", icon: User }
  ]

  const filteredProfessions = professions.filter(prof => 
    prof.toLowerCase().includes(professionSearch.toLowerCase())
  )

  // Improved Date Picker Component with Year and Month Dropdowns
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
      if (!dateString) return "Select date"
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
          className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 outline-none transition-all text-left flex items-center justify-between text-sm sm:text-base ${
            darkMode
              ? "bg-zinc-800/50 border-zinc-700 text-white hover:border-emerald-500"
              : "bg-white border-gray-200 text-gray-900 hover:border-emerald-500"
          }`}
        >
          <span className={!value ? (darkMode ? "text-zinc-500" : "text-gray-400") : ""}>
            {formatDisplayDate(value)}
          </span>
          <Calendar className={`w-4 h-4 sm:w-5 sm:h-5 ${darkMode ? "text-zinc-400" : "text-gray-400"}`} />
        </button>

        {showCalendar && (
          <div className={`absolute top-full left-0 mt-2 z-50 rounded-2xl border shadow-2xl overflow-hidden ${
            darkMode ? "bg-zinc-800 border-zinc-700" : "bg-white border-gray-200"
          }`} style={{ width: '320px', maxWidth: '90vw' }}>
            
            {/* Year and Month Selectors */}
            <div className={`p-4 border-b ${darkMode ? "border-zinc-700" : "border-gray-200"}`}>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className={`px-3 py-2 rounded-lg border outline-none text-sm font-semibold ${
                    darkMode 
                      ? "bg-zinc-900 border-zinc-700 text-white" 
                      : "bg-gray-50 border-gray-200 text-gray-900"
                  }`}
                >
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(Number(e.target.value))}
                  className={`px-3 py-2 rounded-lg border outline-none text-sm font-semibold ${
                    darkMode 
                      ? "bg-zinc-900 border-zinc-700 text-white" 
                      : "bg-gray-50 border-gray-200 text-gray-900"
                  }`}
                >
                  {months.map((month, idx) => (
                    <option key={idx} value={idx}>{month}</option>
                  ))}
                </select>
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
        )}
      </div>
    )
  }

  return (
    <div className="mt-5 min-h-screen">

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`fixed top-6 right-4 sm:right-6 z-50 px-4 sm:px-6 py-3 sm:py-4 rounded-2xl shadow-2xl flex items-center gap-3 max-w-sm ${
              darkMode
                ? "bg-zinc-900 border border-emerald-500/20"
                : "bg-white border border-emerald-200"
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
              <Check className="w-5 h-5 text-white" strokeWidth={3} />
            </div>
            <div>
              <p className={`font-semibold text-sm sm:text-base ${darkMode ? "text-white" : "text-gray-900"}`}>
                Profile Updated!
              </p>
              <p className={`text-xs sm:text-sm ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                Your changes have been saved
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 right-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full blur-[100px] sm:blur-[120px] ${
          darkMode ? "bg-emerald-950/20" : "bg-emerald-50"
        }`} />
        <div className={`absolute bottom-0 left-0 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full blur-[80px] sm:blur-[100px] ${
          darkMode ? "bg-teal-950/20" : "bg-teal-50"
        }`} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-12">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 sm:mb-8"
        >
          <div className={`rounded-2xl sm:rounded-3xl overflow-hidden ${
            darkMode 
              ? "bg-zinc-900/50 backdrop-blur-xl border border-zinc-800" 
              : "bg-white backdrop-blur-xl border border-gray-200 shadow-xl"
          }`}>
            {/* Gradient Header with Profile Info */}
            <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 px-4 sm:px-6 lg:px-10 pt-6 pb-24 sm:pb-28">
              <div className="absolute inset-0">
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                  }}
                />
              </div>
              
              {/* Edit Button */}
              <div className="relative z-10 flex justify-end mb-6">
                {isEditing ? (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="px-3 sm:px-5 py-2 sm:py-2.5 bg-white text-emerald-600 rounded-xl font-semibold transition-all flex items-center gap-2 shadow-lg hover:shadow-xl text-xs sm:text-base"
                    >
                      <Save className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-3 sm:px-4 py-2 sm:py-2.5 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-xl font-semibold transition-all"
                    >
                      <X className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-3 sm:px-5 py-2 sm:py-2.5 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-xl font-semibold transition-all flex items-center gap-2 text-xs sm:text-base"
                  >
                    <Edit3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>Edit Profile</span>
                  </button>
                )}
              </div>

              {/* Profile Picture and Name - Centered on Gradient */}
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className={`w-24 h-24 sm:w-32 sm:h-32 rounded-2xl border-4 overflow-hidden shadow-2xl mb-4 ${
                  darkMode ? "border-white/20" : "border-white"
                }`}>
                  <div className="w-full h-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-3xl sm:text-5xl font-bold text-white">
                      {getInitials(profileData.fullName)}
                    </span>
                  </div>
                </div>
                
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white drop-shadow-lg mb-2">
                  {profileData.fullName}
                </h1>
                
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
                  <Shield className="w-4 h-4 text-white" />
                  <span className="font-semibold text-sm text-white">
                    {userRoles.find(r => r.value === profileData.userRole)?.label}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Stats Bar */}
            <div className="relative z-20 -mt-16 mx-4 sm:mx-6 lg:mx-10">
              <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl border backdrop-blur-xl shadow-2xl ${
                darkMode 
                  ? "bg-zinc-800/95 border-zinc-700/50" 
                  : "bg-white border-gray-200"
              }`}>
                <div className="text-center">
                  <Droplet className="w-5 h-5 text-red-500 mx-auto mb-1" />
                  <p className={`text-xs ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>Blood</p>
                  <p className={`text-sm sm:text-base font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {profileData.bloodGroup}
                  </p>
                </div>
                <div className="text-center">
                  <Users className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                  <p className={`text-xs ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>Gender</p>
                  <p className={`text-sm sm:text-base font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {profileData.gender}
                  </p>
                </div>
                <div className="text-center">
                  <Calendar className="w-5 h-5 text-purple-500 mx-auto mb-1" />
                  <p className={`text-xs ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>Age</p>
                  <p className={`text-sm sm:text-base font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {calculateAge(profileData.dob)} years
                  </p>
                </div>
                <div className="text-center">
                  <Briefcase className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                  <p className={`text-xs ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>Work</p>
                  <p className={`text-sm sm:text-base font-bold truncate px-2 ${darkMode ? "text-white" : "text-gray-900"}`} title={profileData.profession}>
                    {profileData.profession}
                  </p>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="px-4 sm:px-6 lg:px-10 pt-8 pb-6 sm:pb-8">
              
              {/* Contact & Zakaat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className={`p-4 rounded-xl border transition-all hover:scale-[1.02] hover:-translate-y-1 ${
                  darkMode 
                    ? "bg-zinc-800/50 border-zinc-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.5)]" 
                    : "bg-white border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
                }`}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      darkMode ? "bg-blue-500/10" : "bg-blue-50"
                    }`}>
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className={`text-xs font-medium ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                      Email
                    </span>
                  </div>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 rounded-lg border outline-none transition-all text-sm ${
                        darkMode
                          ? "bg-zinc-800 border-zinc-700 text-white focus:border-blue-500"
                          : "bg-white border-gray-200 text-gray-900 focus:border-blue-500"
                      }`}
                    />
                  ) : (
                    <p className={`text-sm font-medium break-all ${darkMode ? "text-white" : "text-gray-900"}`}>
                      {profileData.email}
                    </p>
                  )}
                </div>

                <div className={`p-4 rounded-xl border transition-all hover:scale-[1.02] hover:-translate-y-1 ${
                  darkMode 
                    ? "bg-zinc-800/50 border-zinc-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.5)]" 
                    : "bg-white border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
                }`}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      darkMode ? "bg-green-500/10" : "bg-green-50"
                    }`}>
                      <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <span className={`text-xs font-medium ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                      Mobile
                    </span>
                  </div>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="mobile"
                      value={profileData.mobile}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 rounded-lg border outline-none transition-all text-sm ${
                        darkMode
                          ? "bg-zinc-800 border-zinc-700 text-white focus:border-green-500"
                          : "bg-white border-gray-200 text-gray-900 focus:border-green-500"
                      }`}
                    />
                  ) : (
                    <p className={`text-sm font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                      {profileData.mobile}
                    </p>
                  )}
                </div>

                <div className={`p-4 rounded-xl border transition-all hover:scale-[1.02] hover:-translate-y-1 ${
                  darkMode 
                    ? "bg-zinc-800/50 border-zinc-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.5)]" 
                    : "bg-white border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
                }`}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      darkMode ? "bg-emerald-500/10" : "bg-emerald-50"
                    }`}>
                      <Award className="w-5 h-5 text-emerald-600" />
                    </div>
                    <span className={`text-xs font-medium ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                      My Zakaat
                    </span>
                  </div>
                  {profileData.zakaatAmount !== null ? (
                    <p className={`text-sm font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                      ₹{profileData.zakaatAmount.toLocaleString('en-IN')}
                    </p>
                  ) : (
                    <button
                      onClick={()=>router.push('/zakat-calculator')}
                      className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                    >
                      Calculate your zakaat →
                    </button>
                  )}
                </div>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Date of Birth */}
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${
                    darkMode ? "text-zinc-300" : "text-gray-700"
                  }`}>
                    Date of Birth
                  </label>
                  {isEditing ? (
                    <ImprovedDatePicker
                      darkMode={darkMode}
                      value={profileData.dob}
                      onChange={handleInputChange}
                      name="dob"
                    />
                  ) : (
                    <div className={`p-4 rounded-xl border ${
                      darkMode 
                        ? "bg-zinc-800/50 border-zinc-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.4)]" 
                        : "bg-white border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
                    }`}>
                      <p className={`font-medium text-sm ${darkMode ? "text-white" : "text-gray-900"}`}>
                        {new Date(profileData.dob + 'T00:00:00').toLocaleDateString('en-IN', { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                  )}
                </div>

                {/* Gender */}
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${
                    darkMode ? "text-zinc-300" : "text-gray-700"
                  }`}>
                    Gender
                  </label>
                  {isEditing ? (
                    <select
                      name="gender"
                      value={profileData.gender}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all text-base ${
                        darkMode
                          ? "bg-zinc-800/50 border-zinc-700 text-white focus:border-blue-500"
                          : "bg-white border-gray-200 text-gray-900 focus:border-blue-500"
                      }`}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : (
                    <div className={`p-4 rounded-xl border ${
                      darkMode 
                        ? "bg-zinc-800/50 border-zinc-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.4)]" 
                        : "bg-white border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
                    }`}>
                      <p className={`font-medium text-sm ${darkMode ? "text-white" : "text-gray-900"}`}>
                        {profileData.gender}
                      </p>
                    </div>
                  )}
                </div>

                {/* Blood Group */}
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${
                    darkMode ? "text-zinc-300" : "text-gray-700"
                  }`}>
                    Blood Group
                  </label>
                  {isEditing ? (
                    <select
                      name="bloodGroup"
                      value={profileData.bloodGroup}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all text-base ${
                        darkMode
                          ? "bg-zinc-800/50 border-zinc-700 text-white focus:border-red-500"
                          : "bg-white border-gray-200 text-gray-900 focus:border-red-500"
                      }`}
                    >
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  ) : (
                    <div className={`p-4 rounded-xl border ${
                      darkMode 
                        ? "bg-zinc-800/50 border-zinc-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.4)]" 
                        : "bg-white border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
                    }`}>
                      <p className={`font-bold text-sm ${darkMode ? "text-white" : "text-gray-900"}`}>
                        {profileData.bloodGroup}
                      </p>
                    </div>
                  )}
                </div>

                {/* Profession with Search */}
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${
                    darkMode ? "text-zinc-300" : "text-gray-700"
                  }`}>
                    Profession
                  </label>
                  {isEditing ? (
                    <div className="relative" ref={professionRef}>
                      <div className="relative">
                        <input
                          type="text"
                          value={professionSearch || profileData.profession}
                          onChange={(e) => {
                            setProfessionSearch(e.target.value)
                            setShowProfessionDropdown(true)
                          }}
                          onFocus={() => setShowProfessionDropdown(true)}
                          placeholder="Search profession..."
                          className={`w-full px-4 py-3 pr-10 rounded-xl border-2 outline-none transition-all text-base ${
                            darkMode
                              ? "bg-zinc-800/50 border-zinc-700 text-white focus:border-orange-500"
                              : "bg-white border-gray-200 text-gray-900 focus:border-orange-500"
                          }`}
                        />
                        <Search className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                          darkMode ? "text-zinc-400" : "text-gray-400"
                        }`} />
                      </div>
                      
                      {showProfessionDropdown && filteredProfessions.length > 0 && (
                        <div className={`absolute top-full left-0 right-0 mt-2 max-h-60 overflow-y-auto rounded-xl border shadow-xl z-50 ${
                          darkMode 
                            ? "bg-zinc-800 border-zinc-700" 
                            : "bg-white border-gray-200"
                        }`}>
                          {filteredProfessions.map((profession, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => handleProfessionSelect(profession)}
                              className={`w-full px-4 py-3 text-left transition-colors ${
                                darkMode 
                                  ? "hover:bg-zinc-700 text-white" 
                                  : "hover:bg-gray-50 text-gray-900"
                              } ${idx !== 0 ? (darkMode ? "border-t border-zinc-700" : "border-t border-gray-100") : ""}`}
                            >
                              {profession}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className={`p-4 rounded-xl border ${
                      darkMode 
                        ? "bg-zinc-800/50 border-zinc-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.4)]" 
                        : "bg-white border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
                    }`}>
                      <p className={`font-medium text-sm ${darkMode ? "text-white" : "text-gray-900"}`}>
                        {profileData.profession}
                      </p>
                    </div>
                  )}
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label className={`block text-sm font-semibold mb-2 ${
                    darkMode ? "text-zinc-300" : "text-gray-700"
                  }`}>
                    Address
                  </label>
                  {isEditing ? (
                    <textarea
                      name="address"
                      value={profileData.address}
                      onChange={handleInputChange}
                      rows="3"
                      className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all resize-none text-base ${
                        darkMode
                          ? "bg-zinc-800/50 border-zinc-700 text-white focus:border-emerald-500"
                          : "bg-white border-gray-200 text-gray-900 focus:border-emerald-500"
                      }`}
                    />
                  ) : (
                    <div className={`p-4 rounded-xl border ${
                      darkMode 
                        ? "bg-zinc-800/50 border-zinc-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.4)]" 
                        : "bg-white border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
                    }`}>
                      <p className={`font-medium text-sm leading-relaxed ${darkMode ? "text-white" : "text-gray-900"}`}>
                        {profileData.address}
                      </p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>

    </div>
  )
}