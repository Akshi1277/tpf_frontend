"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Droplet, 
  Calendar, 
  Shield,
  Camera,
  Edit3,
  Save,
  X,
  ChevronLeft,
  ChevronRight,
  Award,
  Heart,
  TrendingUp,
  Check
} from "lucide-react"

export default function ProfilePage({ darkModeFromParent}) {
  const [darkMode, setDarkMode] = useState(false)
  const [scrolled, setScrolled] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [profileData, setProfileData] = useState({
    profilePicture: null,
    fullName: "Ahmed Khan",
    email: "ahmed.khan@example.com",
    mobile: "+91 9876543210",
    address: "123, MG Road, Bangalore, Karnataka - 560001",
    bloodGroup: "O+",
    dob: "1990-05-15",
    userRole: "donor",
    customRole: ""
  })

 // Sync with parent dark mode
useEffect(() => {
  if (darkModeFromParent !== undefined) {
    setDarkMode(darkModeFromParent)
  }
}, [darkModeFromParent])

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileData(prev => ({ ...prev, profilePicture: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    setIsEditing(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const userRoles = [
    { value: "donor", label: "Donor", description: "One-time contributor", icon: Heart },
    { value: "permanent_donor", label: "Permanent Donor", description: "Regular monthly supporter", icon: Award },
    { value: "volunteer", label: "Volunteer", description: "Active community helper", icon: Shield },
    { value: "beneficiary", label: "Beneficiary", description: "Campaign recipient", icon: User }
  ]

  // Custom Date Picker Component
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
      if (!dateString) return "Select date"
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
          <div className={`absolute top-full left-0 mt-2 z-50 rounded-2xl border shadow-2xl overflow-hidden ${
            darkMode ? "bg-zinc-800 border-zinc-700" : "bg-white border-gray-200"
          }`} style={{ width: '320px' }}>
            
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
        )}
      </div>
    )
  }

 return (
  <div className="mt-5">

      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 ${
              darkMode
                ? "bg-zinc-900 border border-emerald-500/20"
                : "bg-white border border-emerald-200"
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
              <Check className="w-5 h-5 text-white" strokeWidth={3} />
            </div>
            <div>
              <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                Profile Updated!
              </p>
              <p className={`text-sm ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                Your changes have been saved
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
    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        
        {/* Hero Section with Profile Picture */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className={`rounded-3xl overflow-hidden ${
            darkMode 
              ? "bg-zinc-900/50 backdrop-blur-xl border border-zinc-800" 
              : "bg-white backdrop-blur-xl border border-gray-200 shadow-xl"
          }`}>
            {/* Gradient Header */}
            <div className="relative h-40 mb-10 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700">
              <div className="absolute inset-0">
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                  }}
                />
              </div>
              
              {/* Edit Button */}
              <div className="absolute top-6 right-6">
                {isEditing ? (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="px-5 py-2.5 bg-white text-emerald-600 rounded-xl font-semibold transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2.5 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-xl font-semibold transition-all"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-5 py-2.5 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-xl font-semibold transition-all flex items-center gap-2"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

            {/* Profile Info Section */}
            <div className="px-6 sm:px-10 pb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 -mt-20 mb-8">
                {/* Profile Picture */}
                <div className="relative">
                  <div className={`w-40 h-40 rounded-3xl border-4 overflow-hidden shadow-2xl ${
                    darkMode ? "border-zinc-900" : "border-white"
                  }`}>
                    {profileData.profilePicture ? (
                      <img 
                        src={profileData.profilePicture} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                        <User className="w-20 h-20 text-white" />
                      </div>
                    )}
                  </div>
                  
                  {isEditing && (
                    <label className="absolute bottom-2 right-2 w-12 h-12 bg-emerald-600 hover:bg-emerald-700 rounded-xl flex items-center justify-center cursor-pointer transition-all shadow-lg">
                      <Camera className="w-6 h-6 text-white" />
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload}
                        className="hidden" 
                      />
                    </label>
                  )}
                </div>

                {/* Name and Role */}
                <div className="flex-1">
                  <h1 className={`text-3xl sm:text-4xl font-bold mb-5 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}>
                    {profileData.fullName}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                      darkMode 
                        ? "bg-emerald-500/10 border border-emerald-500/20" 
                        : "bg-emerald-50 border border-emerald-200"
                    }`}>
                      <Shield className="w-4 h-4 text-emerald-600" />
                      <span className="font-semibold text-sm text-emerald-600">
                        {userRoles.find(r => r.value === profileData.userRole)?.label || "User"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      <span className={darkMode ? "text-zinc-400" : "text-gray-600"}>
                        Active Member
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {/* Email */}
                <div className={`p-4 rounded-2xl border transition-all ${
                  darkMode 
                    ? "bg-zinc-800/30 border-zinc-700/50 hover:border-zinc-600" 
                    : "bg-gray-50 border-gray-100 hover:border-gray-200"
                }`}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      darkMode ? "bg-blue-500/10" : "bg-blue-50"
                    }`}>
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className={`text-xs font-medium ${
                      darkMode ? "text-zinc-400" : "text-gray-600"
                    }`}>
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
                    <p className={`text-sm font-medium truncate ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}>
                      {profileData.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className={`p-4 rounded-2xl border transition-all ${
                  darkMode 
                    ? "bg-zinc-800/30 border-zinc-700/50 hover:border-zinc-600" 
                    : "bg-gray-50 border-gray-100 hover:border-gray-200"
                }`}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      darkMode ? "bg-green-500/10" : "bg-green-50"
                    }`}>
                      <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <span className={`text-xs font-medium ${
                      darkMode ? "text-zinc-400" : "text-gray-600"
                    }`}>
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
                    <p className={`text-sm font-medium ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}>
                      {profileData.mobile}
                    </p>
                  )}
                </div>

                {/* Blood Group */}
                <div className={`p-4 rounded-2xl border transition-all ${
                  darkMode 
                    ? "bg-zinc-800/30 border-zinc-700/50 hover:border-zinc-600" 
                    : "bg-gray-50 border-gray-100 hover:border-gray-200"
                }`}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      darkMode ? "bg-red-500/10" : "bg-red-50"
                    }`}>
                      <Droplet className="w-5 h-5 text-red-600" />
                    </div>
                    <span className={`text-xs font-medium ${
                      darkMode ? "text-zinc-400" : "text-gray-600"
                    }`}>
                      Blood Group
                    </span>
                  </div>
                  {isEditing ? (
                    <select
                      name="bloodGroup"
                      value={profileData.bloodGroup}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 rounded-lg border outline-none transition-all text-sm ${
                        darkMode
                          ? "bg-zinc-800 border-zinc-700 text-white focus:border-red-500"
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
                    <p className={`text-sm font-bold ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}>
                      {profileData.bloodGroup}
                    </p>
                  )}
                </div>
              </div>

              {/* Detailed Information */}
              <div className="grid md:grid-cols-2 gap-1">
                {/* Date of Birth */}
                <div>
                  <label className={`block text-sm font-semibold mb-3 ${
                    darkMode ? "text-zinc-300" : "text-gray-700"
                  }`}>
                    Date of Birth
                  </label>
                  {isEditing ? (
                    <CustomDatePicker
                      darkMode={darkMode}
                      value={profileData.dob}
                      onChange={handleInputChange}
                      name="dob"
                    />
                  ) : (
                    <div className={`p-4 rounded-xl border ${
                      darkMode 
                        ? "bg-zinc-800/30 border-zinc-700/50" 
                        : "bg-gray-50 border-gray-100"
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          darkMode ? "bg-purple-500/10" : "bg-purple-50"
                        }`}>
                          <Calendar className="w-5 h-5 text-purple-600" />
                        </div>
                        <p className={`font-medium ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}>
                          {new Date(profileData.dob + 'T00:00:00').toLocaleDateString('en-IN', { 
                            day: 'numeric', 
                            month: 'long', 
                            year: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label className={`block text-sm font-semibold mb-3 ${
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
                      className={`w-full px-4 py-3 rounded-xl border outline-none transition-all resize-none ${
                        darkMode
                          ? "bg-zinc-800/50 border-zinc-700 text-white focus:border-emerald-500"
                          : "bg-white border-gray-200 text-gray-900 focus:border-emerald-500"
                      }`}
                    />
                  ) : (
                    <div className={`p-4 rounded-xl border ${
                      darkMode 
                        ? "bg-zinc-800/30 border-zinc-700/50" 
                        : "bg-gray-50 border-gray-100"
                    }`}>
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          darkMode ? "bg-orange-500/10" : "bg-orange-50"
                        }`}>
                          <MapPin className="w-5 h-5 text-orange-600" />
                        </div>
                        <p className={`font-medium ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}>
                          {profileData.address}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* User Role Section */}
              <div className={`mt-8 pt-8 border-t ${
                darkMode ? "border-zinc-800" : "border-gray-200"
              }`}>
                <h3 className={`text-lg font-bold mb-4 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}>
                  Account Type
                </h3>
                
                <div className={`p-6 rounded-2xl border ${
                  darkMode 
                    ? "bg-zinc-800/30 border-zinc-700/50" 
                    : "bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100"
                }`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                      darkMode ? "bg-emerald-500/20" : "bg-white shadow-lg"
                    }`}>
                      {(() => {
                        const RoleIcon = userRoles.find(r => r.value === profileData.userRole)?.icon || Shield
                        return <RoleIcon className="w-7 h-7 text-emerald-600" />
                      })()}
                    </div>
                    <div className="flex-1">
                      <p className={`text-xl font-bold mb-1 ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}>
                        {userRoles.find(r => r.value === profileData.userRole)?.label}
                      </p>
                      <p className={`text-sm ${
                        darkMode ? "text-zinc-400" : "text-gray-600"
                      }`}>
                        {userRoles.find(r => r.value === profileData.userRole)?.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  )
}