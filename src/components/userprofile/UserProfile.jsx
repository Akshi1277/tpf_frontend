"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
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
  X
} from "lucide-react"

export default function ProfilePage() {
  const [darkMode, setDarkMode] = useState(false)
  const [scrolled, setScrolled] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    profilePicture: null,
    fullName: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    mobile: "+91 9876543210",
    address: "123, MG Road, Bangalore, Karnataka - 560001",
    bloodGroup: "O+",
    dob: "1990-05-15",
    userRole: "donor",
    customRole: ""
  })

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode')
    setDarkMode(savedMode === 'true')
  }, [])

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

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
    // Save logic here
    setIsEditing(false)
  }

  const userRoles = [
    { value: "donor", label: "Donor", description: "One-time contributor" },
    { value: "permanent_donor", label: "Permanent Donor", description: "Regular monthly supporter" },
    { value: "volunteer", label: "Volunteer", description: "Active community helper" },
    { value: "beneficiary", label: "Beneficiary", description: "Campaign recipient" },
    { value: "custom", label: "Custom", description: "Define your own role" }
  ]

// Add this inside ProfilePage component, before the InfoField component

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
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
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
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  const selectedDate = value ? new Date(value) : null
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
            ? "bg-zinc-700 border-zinc-600 text-white hover:border-emerald-500"
            : "bg-white border-gray-300 text-gray-900 hover:border-emerald-500"
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

  const InfoField = ({ icon: Icon, label, value, name, type = "text", editable = true }) => (
    <div className={`p-5 rounded-xl border transition-all ${
      darkMode 
        ? "bg-zinc-800/50 border-zinc-700 hover:border-zinc-600" 
        : "bg-gray-50 border-gray-200 hover:border-gray-300"
    }`}>
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
          darkMode ? "bg-emerald-500/20" : "bg-emerald-100"
        }`}>
          <Icon className="w-5 h-5 text-emerald-600" />
        </div>
        <div className="flex-1 min-w-0">
          <label className={`block text-xs font-medium mb-2 ${
            darkMode ? "text-zinc-400" : "text-gray-600"
          }`}>
            {label}
          </label>
          {isEditing && editable ? (
            type === "textarea" ? (
              <textarea
                name={name}
                value={value}
                onChange={handleInputChange}
                rows="2"
                className={`w-full px-3 py-2 rounded-lg border outline-none transition-all resize-none ${
                  darkMode
                    ? "bg-zinc-700 border-zinc-600 text-white focus:border-emerald-500"
                    : "bg-white border-gray-300 text-gray-900 focus:border-emerald-500"
                }`}
              />
            ) : (
              <input
                type={type}
                name={name}
                value={value}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 rounded-lg border outline-none transition-all ${
                  darkMode
                    ? "bg-zinc-700 border-zinc-600 text-white focus:border-emerald-500"
                    : "bg-white border-gray-300 text-gray-900 focus:border-emerald-500"
                }`}
              />
            )
          ) : (
            <p className={`text-sm font-medium break-words ${
              darkMode ? "text-white" : "text-gray-900"
            }`}>
              {value}
            </p>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className={`min-h-screen ${darkMode ? "bg-zinc-900" : "bg-white"}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} scrolled={scrolled} />

      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className={`absolute inset-0 ${
            darkMode 
              ? "bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)]" 
              : "bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)]"
          }`}
          style={{ backgroundSize: '48px 48px' }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className={`text-4xl md:text-5xl font-bold mb-3 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}>
            My Profile
          </h1>
          <p className={`text-lg ${
            darkMode ? "text-zinc-400" : "text-gray-600"
          }`}>
            Manage your account information and preferences
          </p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`rounded-3xl border overflow-hidden ${
            darkMode 
              ? "bg-zinc-800/50 border-zinc-700" 
              : "bg-white border-gray-200 shadow-xl shadow-gray-200/50"
          }`}
        >
          {/* Cover Section with Edit Button */}
          <div className="relative h-32 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer" />
            
            {/* Edit/Save Button */}
            <div className="absolute top-4 right-4">
              {isEditing ? (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-all flex items-center gap-2 shadow-lg"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                      darkMode
                        ? "bg-zinc-700 hover:bg-zinc-600 text-white"
                        : "bg-white hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-lg font-medium transition-all flex items-center gap-2"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* Profile Picture Section */}
          <div className="px-6 sm:px-8 lg:px-10">
            <div className="relative -mt-16 mb-6">
              <div className="relative inline-block">
                <div className={`w-32 h-32 rounded-2xl border-4 overflow-hidden ${
                  darkMode ? "border-zinc-800" : "border-white"
                } shadow-xl`}>
                  {profileData.profilePicture ? (
                    <img 
                      src={profileData.profilePicture} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                      <User className="w-16 h-16 text-white" />
                    </div>
                  )}
                </div>
                
                {/* Upload Button */}
                {isEditing && (
                  <label className="absolute bottom-0 right-0 w-10 h-10 bg-emerald-600 hover:bg-emerald-700 rounded-lg flex items-center justify-center cursor-pointer transition-all shadow-lg">
                    <Camera className="w-5 h-5 text-white" />
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload}
                      className="hidden" 
                    />
                  </label>
                )}
              </div>
            </div>

            {/* User Role Badge */}
            <div className="mb-8">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${
                darkMode 
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                  : "bg-emerald-50 border-emerald-200 text-emerald-700"
              }`}>
                <Shield className="w-4 h-4" />
                <span className="font-semibold text-sm">
                  {userRoles.find(r => r.value === profileData.userRole)?.label || "User"}
                </span>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid md:grid-cols-2 gap-5 pb-8">
              <InfoField
                icon={User}
                label="Full Name"
                value={profileData.fullName}
                name="fullName"
              />
              
              <InfoField
                icon={Mail}
                label="Email Address"
                value={profileData.email}
                name="email"
                type="email"
              />
              
              <InfoField
                icon={Phone}
                label="Mobile Number"
                value={profileData.mobile}
                name="mobile"
                type="tel"
              />
              
           <div className={`p-5 rounded-xl border transition-all ${
  darkMode ? "bg-zinc-800/50 border-zinc-700 hover:border-zinc-600" : "bg-gray-50 border-gray-200 hover:border-gray-300"
}`}>
  <div className="flex items-start gap-4">
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${darkMode ? "bg-emerald-500/20" : "bg-emerald-100"}`}>
      <Calendar className="w-5 h-5 text-emerald-600" />
    </div>
    <div className="flex-1 min-w-0">
      <label className={`block text-xs font-medium mb-2 ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
        Date of Birth
      </label>
      {isEditing ? (
        <CustomDatePicker darkMode={darkMode} value={profileData.dob} onChange={handleInputChange} name="dob" />
      ) : (
        <p className={`text-sm font-medium break-words ${darkMode ? "text-white" : "text-gray-900"}`}>
          {new Date(profileData.dob).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      )}
    </div>
  </div>
</div>
              
              <InfoField
                icon={Droplet}
                label="Blood Group"
                value={profileData.bloodGroup}
                name="bloodGroup"
              />
              
              <InfoField
                icon={MapPin}
                label="Address"
                value={profileData.address}
                name="address"
                type="textarea"
              />
            </div>

            
            {/* User Role Section */}
<div className={`border-t pt-8 pb-8 ${
  darkMode ? "border-zinc-700" : "border-gray-200"
}`}>
  <h3 className={`text-xl font-bold mb-4 ${
    darkMode ? "text-white" : "text-gray-900"
  }`}>
    User Role
  </h3>
  
  <div className={`p-5 rounded-xl border ${
    darkMode 
      ? "bg-zinc-800/50 border-zinc-700" 
      : "bg-gray-50 border-gray-200"
  }`}>
    <div className="flex items-start gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
        darkMode ? "bg-emerald-500/20" : "bg-emerald-100"
      }`}>
        <Shield className="w-6 h-6 text-emerald-600" />
      </div>
      <div>
        <p className={`font-semibold text-lg mb-1 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}>
          {profileData.userRole === "custom" && profileData.customRole 
            ? profileData.customRole
            : userRoles.find(r => r.value === profileData.userRole)?.label}
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
        </motion.div>
      </div>

      <Footer darkMode={darkMode} />
    </div>
  )
}