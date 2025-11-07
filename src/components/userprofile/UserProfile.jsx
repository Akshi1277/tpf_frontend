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
    X,
    Award,
    Heart,
    Activity
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
      setIsEditing(false)
    }

    const userRoles = [
      { value: "donor", label: "Donor", description: "One-time contributor", icon: Heart },
      { value: "permanent_donor", label: "Permanent Donor", description: "Regular monthly supporter", icon: Award },
      { value: "volunteer", label: "Volunteer", description: "Active community helper", icon: Activity },
      { value: "beneficiary", label: "Beneficiary", description: "Campaign recipient", icon: Shield },
      { value: "custom", label: "Custom", description: "Define your own role", icon: User }
    ]

    

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
            className={`w-full px-4 py-3.5 rounded-xl border-2 outline-none transition-all text-left flex items-center justify-between font-medium ${
              darkMode
                ? "bg-zinc-700/50 border-zinc-600 text-white hover:border-emerald-500 hover:bg-zinc-700"
                : "bg-white border-gray-300 text-gray-900 hover:border-emerald-500 hover:shadow-md"
            }`}
          >
            <span className={!value ? (darkMode ? "text-zinc-500" : "text-gray-400") : ""}>
              {formatDisplayDate(value)}
            </span>
            <Calendar className={`w-5 h-5 ${darkMode ? "text-zinc-400" : "text-gray-400"}`} />
          </button>

          {showCalendar && (
           <motion.div 
    initial={{ opacity: 0, y: -10, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    className={`absolute top-full left-0 mt-2 z-[9999] rounded-2xl border-2 shadow-2xl overflow-hidden backdrop-blur-xl ${
      darkMode ? "bg-zinc-800/95 border-zinc-700/50" : "bg-white/95 border-gray-200"
    }`}style={{ width: '340px' }}>
              
              <div className={`p-4 border-b-2 ${darkMode ? "border-zinc-700" : "border-gray-200"}`}>
                <div className="flex items-center justify-between mb-3">
                 <motion.button 
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  type="button" 
  onClick={() => changeYear(-1)} 
  className={`p-2 rounded-lg transition-all ${darkMode ? "hover:bg-zinc-700" : "hover:bg-gray-100"}`}
>
  <ChevronLeft className="w-4 h-4" strokeWidth={3} />
</motion.button>
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
                          ? "bg-emerald-600 text-white shadow-lg scale-105"
                          : darkMode ? "text-white hover:bg-zinc-700" : "text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      {day.day}
                    </button>
                  ))}
                </div>
              </div>

              <div className={`p-4 border-t-2 flex items-center justify-between ${darkMode ? "border-zinc-700" : "border-gray-200"}`}>
                <button type="button" onClick={() => { onChange({ target: { name, value: "" } }); setShowCalendar(false); }} className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">
                  Clear
                </button>
                <button type="button" onClick={() => { const today = new Date().toISOString().split('T')[0]; onChange({ target: { name, value: today } }); setShowCalendar(false); }} className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">
                  Today
                </button>
                
              </div>
              
            </motion.div>
            
         
         )}
         
        </div>
        
      )
    }

    const FloatingLabelInput = ({ icon: Icon, label, value, name, type = "text" }) => {
  const [isFocused, setIsFocused] = useState(false)
  
  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className={`relative p-6 rounded-2xl border-2 transition-all duration-300 backdrop-blur-sm ${
        darkMode 
          ? "bg-zinc-800/30 border-zinc-700/50 hover:border-emerald-500/50 hover:bg-zinc-800/50" 
          : "bg-white/50 border-gray-200 hover:border-emerald-500/50 hover:bg-white/80 hover:shadow-2xl"
      }`}
    >
      <motion.div 
        animate={{ 
          scale: isFocused ? 1.1 : 1,
          rotate: isFocused ? 5 : 0 
        }}
        className={`absolute top-6 left-6 w-12 h-12 rounded-xl flex items-center justify-center ${
          darkMode 
            ? "bg-gradient-to-br from-emerald-500/20 to-teal-500/20" 
            : "bg-gradient-to-br from-emerald-100 to-teal-100"
        }`}
      >
        <Icon className={`w-6 h-6 transition-colors ${
          isFocused ? "text-emerald-500" : "text-emerald-600"
        }`} />
      </motion.div>
      
      <div className="ml-20">
        {type === "textarea" ? (
          <textarea
            name={name}
            value={value}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder=" "
            rows="2"
            className={`peer w-full px-0 py-3 bg-transparent border-0 border-b-2 outline-none transition-all font-medium resize-none ${
              darkMode
                ? "text-white border-zinc-600 focus:border-emerald-500"
                : "text-gray-900 border-gray-300 focus:border-emerald-500"
            }`}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder=" "
            className={`peer w-full px-0 py-3 bg-transparent border-0 border-b-2 outline-none transition-all font-medium ${
              darkMode
                ? "text-white border-zinc-600 focus:border-emerald-500"
                : "text-gray-900 border-gray-300 focus:border-emerald-500"
            }`}
          />
        )}
        <label className={`absolute left-20 transition-all duration-200 pointer-events-none
          peer-placeholder-shown:top-9 peer-placeholder-shown:text-base
          peer-focus:top-4 peer-focus:text-xs peer-focus:font-semibold
          ${value ? 'top-4 text-xs font-semibold' : 'top-9 text-base'}
          ${isFocused 
            ? 'text-emerald-500' 
            : darkMode ? 'text-zinc-400' : 'text-gray-600'
          }`}
        >
          {label}
        </label>
      </div>
      
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isFocused ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500"
      />
    </motion.div>
  )
}
    const InfoField = ({ icon: Icon, label, value, name, type = "text", editable = true }) => (
      <motion.div 
  whileHover={{ y: -2, scale: 1.01 }}
  className={`group p-6 rounded-2xl border-2 transition-all duration-300 ${
    darkMode 
      ? "bg-zinc-800/30 border-zinc-700/50 hover:border-emerald-500/50 hover:bg-zinc-800/50" 
      : "bg-white/50 border-gray-200 hover:border-emerald-500/50 hover:bg-white/80 hover:shadow-2xl"
  }`}
>
       <div className="flex items-start gap-5">
    <motion.div 
      whileHover={{ rotate: 10, scale: 1.1 }}
      className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
        darkMode 
          ? "bg-gradient-to-br from-emerald-500/20 to-teal-500/20" 
          : "bg-gradient-to-br from-emerald-100 to-teal-100"
      }`}
    >
<User className="w-6 h-6 text-emerald-600" />
          </motion.div>
          <div className="flex-1 min-w-0">
            <label className={`block text-sm font-semibold mb-2.5 ${
              darkMode ? "text-zinc-300" : "text-gray-700"
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
                  className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all resize-none font-medium ${
                    darkMode
                      ? "bg-zinc-700/50 border-zinc-600 text-white focus:border-emerald-500 focus:bg-zinc-700"
                      : "bg-white border-gray-300 text-gray-900 focus:border-emerald-500 focus:shadow-md"
                  }`}
                />
              ) : (
                <input
                  type={type}
                  name={name}
                  value={value}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all font-medium ${
                    darkMode
                      ? "bg-zinc-700/50 border-zinc-600 text-white focus:border-emerald-500 focus:bg-zinc-700"
                      : "bg-white border-gray-300 text-gray-900 focus:border-emerald-500 focus:shadow-md"
                  }`}
                />
              )
            ) : (
              <p className={`text-base font-medium break-words ${
                darkMode ? "text-white" : "text-gray-900"
              }`}>
                {value}
              </p>
            )}
          </div>
        </div>
         <motion.div 
    initial={{ scaleX: 0 }}
    whileHover={{ scaleX: 1 }}
    transition={{ duration: 0.3 }}
    className="mt-4 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500"
  />
      </motion.div>
    )

    const currentRole = userRoles.find(r => r.value === profileData.userRole)
    const RoleIcon = currentRole?.icon || Shield

    return (
      <div className={`min-h-screen ${darkMode ? "bg-zinc-900" : "bg-gray-50"}`}>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} scrolled={scrolled} />

        {/* Enhanced Background Pattern */}
       <div className="absolute inset-0 overflow-hidden pointer-events-none">
  <div 
    className={`absolute inset-0 ${
      darkMode 
        ? "bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)]" 
        : "bg-[linear-gradient(rgba(16,185,129,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.04)_1px,transparent_1px)]"
    }`}
    style={{ backgroundSize: '48px 48px' }}
  />
           <motion.div 
    animate={{ 
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.5, 0.3]
    }}
    transition={{ duration: 8, repeat: Infinity }}
    className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl ${
      darkMode ? "bg-emerald-500" : "bg-emerald-300"
    }`} 
    style={{ transform: 'translate(50%, -50%)' }} 
  />
           <motion.div 
    animate={{ 
      scale: [1, 1.3, 1],
      opacity: [0.3, 0.5, 0.3]
    }}
    transition={{ duration: 10, repeat: Infinity }}
    className={`absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl ${
      darkMode ? "bg-teal-500" : "bg-teal-300"
    }`} 
    style={{ transform: 'translate(-50%, 50%)' }} 
  />
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 lg:pt-40 pb-24">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h1 className={`text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r ${
              darkMode 
                ? "from-white via-emerald-100 to-white" 
                : "from-gray-900 via-emerald-900 to-gray-900"
            } bg-clip-text text-transparent`}>
              My Profile
            </h1>
            <p className={`text-xl ${
              darkMode ? "text-zinc-400" : "text-gray-600"
            }`}>
              Manage your account information and preferences
            </p>
          </motion.div>

          {/* Profile Card */}
          <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.1 }}
  className="relative group"
>

             <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000 animate-gradient-xy"></div>
           <div className={`relative rounded-3xl border-2 overflow-hidden backdrop-blur-sm ${
    darkMode 
      ? "bg-zinc-800/70 border-zinc-700/50 shadow-2xl shadow-emerald-500/5" 
      : "bg-white/80 border-gray-200 shadow-2xl shadow-gray-300/30"
  }`}>
            {/* Enhanced Cover Section */}
            <div className="relative h-40 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.15)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
              
              {/* Edit/Save Button */}
              <div className="absolute top-6 right-6 z-10">
              {isEditing ? (
    <div className="absolute top-6 right-6 z-10 flex gap-3">
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSave}
        className="relative px-6 py-3 rounded-xl font-bold overflow-hidden group"
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 bg-[length:200%_100%] group-hover:bg-[position:100%_0] transition-all duration-500"></div>
        
        {/* Shimmer effect */}
        <motion.div 
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        />
        
        <span className="relative z-10 flex items-center gap-2 text-white">
          <Save className="w-5 h-5" />
          Save Changes
        </span>
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsEditing(false)}
        className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 backdrop-blur-md ${
          darkMode
            ? "bg-zinc-800/90 hover:bg-zinc-700 text-white"
            : "bg-white/90 hover:bg-white text-gray-700"
        } shadow-xl border border-white/20`}
      >
        <X className="w-5 h-5" />
        Cancel
      </motion.button>
    </div>
  ) : (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setIsEditing(true)}
      className="absolute top-6 right-6 z-10 px-6 py-3 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-xl font-bold transition-all flex items-center gap-2 shadow-xl border border-white/30 group"
    >
      <motion.div
        animate={{ rotate: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <Edit3 className="w-5 h-5" />
      </motion.div>
      <span>Edit Profile</span>
      
      {/* Pulse effect */}
      {/* <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute inset-0 rounded-xl bg-white/30"
      /> */}
    </motion.button>
  )}
              </div>
            </div>

            {/* Profile Picture Section */}
            <div className="px-6 sm:px-8 lg:px-12">
              <div className="relative -mt-20 mb-8 group">
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className="relative inline-block"
    >
      {/* Glowing ring effect */}
      <div className="absolute -inset-2 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition duration-500 animate-pulse"></div>
      
      {/* Main profile picture */}
      <div className={`relative w-40 h-40 rounded-3xl border-4 overflow-hidden ${
        darkMode ? "border-zinc-800" : "border-white"
      } shadow-2xl`}>
        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
        
        {profileData.profilePicture ? (
          <img 
            src={profileData.profilePicture} 
            alt="Profile" 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-700 flex items-center justify-center relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.2),transparent)] animate-pulse"></div>
            <User className="w-20 h-20 text-white relative z-10" />
          </div>
        )}
        
        {/* Edit overlay */}
        {isEditing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-20 rounded-2xl"
          >
            <label className="cursor-pointer">
              <Camera className="w-10 h-10 text-white drop-shadow-lg" />
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </motion.div>
        )}
      </div>
      
      {/* Status indicator */}
      {/* <motion.div 
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-2 right-2 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white dark:border-zinc-800 shadow-lg z-30"
      ></motion.div> */}
    </motion.div>
  </div>

              {/* Enhanced User Role Badge */}
            <motion.div 
    className="mb-10"
    whileHover={{ scale: 1.05 }}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.3 }}
  >
    <div className="relative inline-block group">
      {/* Animated glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
      
      {/* Badge content */}
      <div className={`relative flex items-center gap-3 px-6 py-3 rounded-2xl border-2 ${
        darkMode 
          ? "bg-zinc-900/90 border-emerald-500/50 text-emerald-400" 
          : "bg-white/90 border-emerald-500 text-emerald-700"
      } shadow-xl backdrop-blur-sm`}>
        {/* Animated icon container */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="relative"
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            darkMode 
              ? "bg-gradient-to-br from-emerald-500/30 to-teal-500/30" 
              : "bg-gradient-to-br from-emerald-200 to-teal-200"
          }`}>
            <RoleIcon className="w-5 h-5" />
          </div>
        </motion.div>
        
        <div>
          <span className="font-bold text-base block">{currentRole?.label}</span>
          <span className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
            {currentRole?.description}
          </span>
        </div>
        
        {/* Shine effect */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <motion.div 
            animate={{ x: ['100%', '-100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            style={{ transform: 'skewX(-20deg)' }}
          />
        </div>
      </div>
    </div>
  </motion.div>

              {/* Info Grid with stagger animation */}
               {isEditing ? (
    <div className="grid md:grid-cols-2 gap-6 pb-10">
      <FloatingLabelInput
        icon={User}
        label="Full Name"
        value={profileData.fullName}
        name="fullName"
      />
      <FloatingLabelInput
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
                  
                  <motion.div 
                    whileHover={{ y: -2 }}
                    className={`group p-6 rounded-2xl border-2 transition-all duration-300 ${
                      darkMode 
                        ? "bg-gradient-to-br from-zinc-800/80 to-zinc-800/40 border-zinc-700/50 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10" 
                        : "bg-gradient-to-br from-white to-gray-50/50 border-gray-200 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-100/50"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        darkMode 
                          ? "bg-gradient-to-br from-emerald-500/20 to-teal-500/20 group-hover:from-emerald-500/30 group-hover:to-teal-500/30" 
                          : "bg-gradient-to-br from-emerald-100 to-teal-100 group-hover:from-emerald-200 group-hover:to-teal-200"
                      }`}>
                        <Calendar className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <label className={`block text-sm font-semibold mb-2.5 ${
                          darkMode ? "text-zinc-300" : "text-gray-700"
                        }`}>
                          Date of Birth
                        </label>
                        {isEditing ? (
                          <CustomDatePicker darkMode={darkMode} value={profileData.dob} onChange={handleInputChange} name="dob" />
                        ) : (
                          <p className={`text-base font-medium break-words ${darkMode ? "text-white" : "text-gray-900"}`}>
                            {new Date(profileData.dob).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                  
                  <InfoField
                    icon={Droplet}
                    label="Blood Group"
                    value={profileData.bloodGroup}
                    name="bloodGroup"
                  />
                  
                 <motion.div 
  className={`md:col-span-2 group p-6 rounded-2xl border-2 transition-all duration-300 ${
    darkMode 
      ? "bg-zinc-800/30 border-zinc-700/50" 
      : "bg-white/50 border-gray-200"
  }`}
>
  <div className="flex items-start gap-5">
    <motion.div 
      className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
        darkMode 
          ? "bg-gradient-to-br from-emerald-500/20 to-teal-500/20" 
          : "bg-gradient-to-br from-emerald-100 to-teal-100"
      }`}
    >
      <MapPin className="w-6 h-6 text-emerald-600" />
    </motion.div>
    <div className="flex-1 min-w-0">
      <label className={`block text-sm font-semibold mb-2.5 ${
        darkMode ? "text-zinc-300" : "text-gray-700"
      }`}>
        Address
      </label>
      {isEditing ? (
        <textarea
          name="address"
          value={profileData.address}
          onChange={handleInputChange}
          rows="2"
          className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all resize-none font-medium ${
            darkMode
              ? "bg-zinc-700/50 border-zinc-600 text-white focus:border-emerald-500 focus:bg-zinc-700"
              : "bg-white border-gray-300 text-gray-900 focus:border-emerald-500 focus:shadow-md"
          }`}
        />
      ) : (
        <p className={`text-base font-medium break-words ${
          darkMode ? "text-white" : "text-gray-900"
        }`}>
          {profileData.address}
        </p>
      )}
    </div>
  </div>
</motion.div>
                </div>
  
  ) : (
    <div className="grid md:grid-cols-2 gap-6 pb-10">
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
      />
                  
      <InfoField
        icon={Phone}
        label="Mobile Number"
        value={profileData.mobile}
        name="mobile"
        type="tel"
      />
                  
      <motion.div 
        whileHover={{ y: -2 }}
        className={`group p-6 rounded-2xl border-2 transition-all duration-300 ${
          darkMode 
            ? "bg-gradient-to-br from-zinc-800/80 to-zinc-800/40 border-zinc-700/50 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10" 
            : "bg-gradient-to-br from-white to-gray-50/50 border-gray-200 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-100/50"
        }`}
      >
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
            darkMode 
              ? "bg-gradient-to-br from-emerald-500/20 to-teal-500/20 group-hover:from-emerald-500/30 group-hover:to-teal-500/30" 
              : "bg-gradient-to-br from-emerald-100 to-teal-100 group-hover:from-emerald-200 group-hover:to-teal-200"
          }`}>
            <Calendar className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="flex-1 min-w-0">
            <label className={`block text-sm font-semibold mb-2.5 ${
              darkMode ? "text-zinc-300" : "text-gray-700"
            }`}>
              Date of Birth
            </label>
            <p className={`text-base font-medium break-words ${darkMode ? "text-white" : "text-gray-900"}`}>
              {new Date(profileData.dob).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>
      </motion.div>
                  
      <InfoField
        icon={Droplet}
        label="Blood Group"
        value={profileData.bloodGroup}
        name="bloodGroup"
      />
                  
      <div className="md:col-span-2">
        <InfoField
          icon={MapPin}
          label="Address"
          value={profileData.address}
          name="address"
          type="textarea"
        />
      </div>
    </div>
  ) }
  
                {/* Enhanced User Role Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className={`border-t-2 pt-10 pb-10 ${
                  darkMode ? "border-zinc-700/50" : "border-gray-200"
                }`}
              >
                <h3 className={`text-2xl font-bold mb-6 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}>
                  User Role Details
                </h3>
                
                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  className={`p-8 rounded-2xl border-2 ${
                    darkMode 
                      ? "bg-gradient-to-br from-zinc-800/80 to-zinc-800/40 border-zinc-700/50 shadow-lg shadow-emerald-500/5" 
                      : "bg-gradient-to-br from-white to-gray-50/50 border-gray-200 shadow-xl shadow-emerald-100/30"
                  }`}
                >
                  <div className="flex items-start gap-5">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                      darkMode 
                        ? "bg-gradient-to-br from-emerald-500/20 to-teal-500/20" 
                        : "bg-gradient-to-br from-emerald-100 to-teal-100"
                    }`}>
                      <RoleIcon className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className={`font-bold text-xl mb-2 ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}>
                        {profileData.userRole === "custom" && profileData.customRole 
                          ? profileData.customRole
                          : currentRole?.label}
                      </p>
                      <p className={`text-base ${
                        darkMode ? "text-zinc-400" : "text-gray-600"
                      }`}>
                        {currentRole?.description}
                      </p>
                    </div>
                    </div>
                  
                  
                </motion.div>
              </motion.div>
            </div>
            </div>
          </motion.div>
        </div>

        <Footer darkMode={darkMode} />
      </div>
    )
  }