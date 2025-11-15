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
  Award,
  Heart,
  Check,
  Briefcase,
  Users,
  Search,
  TrendingUp,
  Target,
  Sparkles
} from "lucide-react"

export default function ProfilePage({ darkModeFromParent}) {
  const router = useRouter()
  const [darkMode, setDarkMode] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editingField, setEditingField] = useState(null)
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

  const [tempData, setTempData] = useState({})

  useEffect(() => {
    if (darkModeFromParent !== undefined) {
      setDarkMode(darkModeFromParent)
    }
  }, [darkModeFromParent])

  // Fetch professions from API
  useEffect(() => {
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

  const handleFieldEdit = (field, value) => {
    setEditingField(field)
    setTempData({ [field]: value })
  }

  const handleFieldSave = (field) => {
    setProfileData(prev => ({ ...prev, [field]: tempData[field] }))
    setEditingField(null)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
  }

  const handleFieldCancel = () => {
    setEditingField(null)
    setTempData({})
  }

  const handleProfessionSelect = (profession) => {
    setTempData({ profession })
    setShowProfessionDropdown(false)
    setProfessionSearch("")
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

  const userRoles = [
    { value: "donor", label: "Donor", description: "One-time contributor", icon: Heart },
    { value: "permanent_donor", label: "Permanent Donor", description: "Regular monthly supporter", icon: Award },
    { value: "volunteer", label: "Volunteer", description: "Active community helper", icon: Shield },
    { value: "beneficiary", label: "Beneficiary", description: "Campaign recipient", icon: User }
  ]

  const filteredProfessions = professions.filter(prof => 
    prof.toLowerCase().includes(professionSearch.toLowerCase())
  )

  const EditableTag = ({ icon: Icon, label, value, field, color = "blue", type = "text", options = null }) => {
    const isEditing = editingField === field
    const displayValue = isEditing ? tempData[field] : value

    return (
      <div className={`group relative px-4 py-2.5 rounded-xl border transition-all ${
        darkMode 
          ? `bg-${color}-500/10 border-${color}-500/30 hover:border-${color}-500/50` 
          : `bg-${color}-50 border-${color}-200 hover:border-${color}-300`
      }`}>
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 flex-shrink-0 text-${color}-600`} />
          <div className="flex-1 min-w-0">
            <p className={`text-xs font-medium mb-0.5 ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
              {label}
            </p>
            {isEditing ? (
              <div className="flex items-center gap-2">
                {type === "select" && options ? (
                  <select
                    value={displayValue}
                    onChange={(e) => setTempData({ [field]: e.target.value })}
                    className={`text-sm font-semibold px-2 py-1 rounded border outline-none ${
                      darkMode
                        ? "bg-zinc-800 border-zinc-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  >
                    {options.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : type === "profession" ? (
                  <div className="relative w-full" ref={professionRef}>
                    <input
                      type="text"
                      value={professionSearch || displayValue}
                      onChange={(e) => {
                        setProfessionSearch(e.target.value)
                        setTempData({ [field]: e.target.value })
                        setShowProfessionDropdown(true)
                      }}
                      onFocus={() => setShowProfessionDropdown(true)}
                      className={`text-sm font-semibold px-2 py-1 rounded border outline-none w-full ${
                        darkMode
                          ? "bg-zinc-800 border-zinc-600 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                    />
                    {showProfessionDropdown && filteredProfessions.length > 0 && (
                      <div className={`absolute top-full left-0 right-0 mt-1 max-h-48 overflow-y-auto rounded-lg border shadow-xl z-50 ${
                        darkMode ? "bg-zinc-800 border-zinc-700" : "bg-white border-gray-200"
                      }`}>
                        {filteredProfessions.slice(0, 10).map((prof, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              handleProfessionSelect(prof)
                              setTempData({ [field]: prof })
                            }}
                            className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                              darkMode ? "hover:bg-zinc-700 text-white" : "hover:bg-gray-50 text-gray-900"
                            }`}
                          >
                            {prof}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <input
                    type={type}
                    value={displayValue}
                    onChange={(e) => setTempData({ [field]: e.target.value })}
                    className={`text-sm font-semibold px-2 py-1 rounded border outline-none w-full ${
                      darkMode
                        ? "bg-zinc-800 border-zinc-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  />
                )}
                <button
                  onClick={() => handleFieldSave(field)}
                  className="p-1 rounded bg-emerald-500 hover:bg-emerald-600 transition-colors"
                >
                  <Check className="w-3 h-3 text-white" />
                </button>
                <button
                  onClick={handleFieldCancel}
                  className={`p-1 rounded transition-colors ${
                    darkMode ? "bg-zinc-700 hover:bg-zinc-600" : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <p className={`text-sm font-semibold truncate ${darkMode ? "text-white" : "text-gray-900"}`}>
                {value}
              </p>
            )}
          </div>
          {!isEditing && (
            <button
              onClick={() => handleFieldEdit(field, value)}
              className={`opacity-0 group-hover:opacity-100 p-1 rounded transition-all ${
                darkMode ? "hover:bg-zinc-700" : "hover:bg-gray-100"
              }`}
            >
              <Edit3 className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    )
  }

  const stats = [
    { label: "Total Donations", value: "₹1,25,000", icon: Heart, color: "emerald", trend: "+12%" },
    { label: "Campaigns Supported", value: "8", icon: Target, color: "blue", trend: "+3" },
    { label: "Lives Impacted", value: "150+", icon: Users, color: "purple", trend: "+45" },
    { label: "Zakat Pending", value: "₹5,000", icon: Award, color: "amber", trend: "20%" }
  ]

  return (
    <div className="mt-5 min-h-screen">
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`fixed top-6 right-4 sm:right-6 z-50 px-4 sm:px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 ${
              darkMode ? "bg-zinc-900 border border-emerald-500/20" : "bg-white border border-emerald-200"
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
              <Check className="w-5 h-5 text-white" strokeWidth={3} />
            </div>
            <p className={`font-semibold text-sm ${darkMode ? "text-white" : "text-gray-900"}`}>
              Updated Successfully!
            </p>
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

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-8 sm:pb-12">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 sm:mb-8"
        >
          {/* Main Profile Card */}
          <div className={`rounded-2xl sm:rounded-3xl overflow-hidden ${
            darkMode 
              ? "bg-zinc-900/50 backdrop-blur-xl border border-zinc-800" 
              : "bg-white backdrop-blur-xl border border-gray-200 shadow-xl"
          }`}>
            {/* Header with Gradient */}
            <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 px-4 sm:px-6 lg:px-10 pt-8 pb-8 sm:pb-12">
              <div className="absolute inset-0">
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                  }}
                />
              </div>
              
              <div className="relative z-10 flex flex-col items-center text-center">
                {/* Profile Picture */}
                <div className={`w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-2xl border-4 overflow-hidden shadow-2xl mb-4 ${
                  darkMode ? "border-white/20" : "border-white"
                }`}>
                  <div className="w-full h-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                      {getInitials(profileData.fullName)}
                    </span>
                  </div>
                </div>
                
                {/* Name */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white drop-shadow-lg mb-3">
                  {profileData.fullName}
                </h1>
                
                {/* Role Badge */}
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-4">
                  <Shield className="w-4 h-4 text-white" />
                  <span className="font-semibold text-sm text-white">
                    {userRoles.find(r => r.value === profileData.userRole)?.label}
                  </span>
                </div>

                {/* Editable Tags */}
                <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
                  <EditableTag 
                    icon={Droplet} 
                    label="Blood Group" 
                    value={profileData.bloodGroup} 
                    field="bloodGroup"
                    color="red"
                    type="select"
                    options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
                  />
                  <EditableTag 
                    icon={Users} 
                    label="Gender" 
                    value={profileData.gender} 
                    field="gender"
                    color="blue"
                    type="select"
                    options={["Male", "Female", "Other"]}
                  />
                  <EditableTag 
                    icon={Calendar} 
                    label="Age" 
                    value={`${calculateAge(profileData.dob)} years`} 
                    field="dob"
                    color="purple"
                    type="date"
                  />
                  <EditableTag 
                    icon={Briefcase} 
                    label="Profession" 
                    value={profileData.profession} 
                    field="profession"
                    color="orange"
                    type="profession"
                  />
                </div>
              </div>
            </div>

            {/* Contact Cards */}
            <div className="px-4 sm:px-6 lg:px-10 py-6 sm:py-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {/* Email */}
                <div className={`group p-4 sm:p-5 rounded-xl border transition-all hover:scale-[1.02] ${
                  darkMode 
                    ? "bg-zinc-800/50 border-zinc-700/50 hover:border-blue-500/50" 
                    : "bg-gray-50 border-gray-200 hover:border-blue-300"
                }`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      darkMode ? "bg-blue-500/10" : "bg-blue-50"
                    }`}>
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <button
                      onClick={() => handleFieldEdit("email", profileData.email)}
                      className={`opacity-0 group-hover:opacity-100 p-2 rounded-lg transition-all ${
                        darkMode ? "hover:bg-zinc-700" : "hover:bg-white"
                      }`}
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className={`text-xs font-medium mb-1 ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                    Email Address
                  </p>
                  {editingField === "email" ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="email"
                        value={tempData.email}
                        onChange={(e) => setTempData({ email: e.target.value })}
                        className={`flex-1 text-sm font-medium px-2 py-1 rounded border outline-none ${
                          darkMode ? "bg-zinc-800 border-zinc-600 text-white" : "bg-white border-gray-300 text-gray-900"
                        }`}
                      />
                      <button onClick={() => handleFieldSave("email")} className="p-1 rounded bg-emerald-500">
                        <Check className="w-4 h-4 text-white" />
                      </button>
                      <button onClick={handleFieldCancel} className={`p-1 rounded ${darkMode ? "bg-zinc-700" : "bg-gray-200"}`}>
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <p className={`text-sm font-medium break-all ${darkMode ? "text-white" : "text-gray-900"}`}>
                      {profileData.email}
                    </p>
                  )}
                </div>

                {/* Mobile */}
                <div className={`group p-4 sm:p-5 rounded-xl border transition-all hover:scale-[1.02] ${
                  darkMode 
                    ? "bg-zinc-800/50 border-zinc-700/50 hover:border-green-500/50" 
                    : "bg-gray-50 border-gray-200 hover:border-green-300"
                }`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      darkMode ? "bg-green-500/10" : "bg-green-50"
                    }`}>
                      <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <button
                      onClick={() => handleFieldEdit("mobile", profileData.mobile)}
                      className={`opacity-0 group-hover:opacity-100 p-2 rounded-lg transition-all ${
                        darkMode ? "hover:bg-zinc-700" : "hover:bg-white"
                      }`}
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className={`text-xs font-medium mb-1 ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                    Mobile Number
                  </p>
                  {editingField === "mobile" ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="tel"
                        value={tempData.mobile}
                        onChange={(e) => setTempData({ mobile: e.target.value })}
                        className={`flex-1 text-sm font-medium px-2 py-1 rounded border outline-none ${
                          darkMode ? "bg-zinc-800 border-zinc-600 text-white" : "bg-white border-gray-300 text-gray-900"
                        }`}
                      />
                      <button onClick={() => handleFieldSave("mobile")} className="p-1 rounded bg-emerald-500">
                        <Check className="w-4 h-4 text-white" />
                      </button>
                      <button onClick={handleFieldCancel} className={`p-1 rounded ${darkMode ? "bg-zinc-700" : "bg-gray-200"}`}>
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <p className={`text-sm font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                      {profileData.mobile}
                    </p>
                  )}
                </div>

                {/* Zakaat */}
                <div className={`group p-4 sm:p-5 rounded-xl border transition-all hover:scale-[1.02] sm:col-span-2 lg:col-span-1 ${
                  darkMode 
                    ? "bg-gradient-to-br from-emerald-900/30 to-emerald-900/10 border-emerald-700/50" 
                    : "bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-emerald-200"
                }`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      darkMode ? "bg-emerald-500/20" : "bg-emerald-100"
                    }`}>
                      <Award className="w-5 h-5 text-emerald-600" />
                    </div>
                  </div>
                  <p className={`text-xs font-medium mb-1 ${darkMode ? "text-emerald-400" : "text-emerald-700"}`}>
                    My Zakat
                  </p>
                  {profileData.zakaatAmount !== null ? (
                    <p className={`text-lg font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                      ₹{profileData.zakaatAmount.toLocaleString('en-IN')}
                    </p>
                  ) : (
                    <button
                      onClick={() => router.push('/zakat-calculator')}
                      className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-1"
                    >
                      Calculate Now <Sparkles className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Address */}
              <div className={`group p-5 sm:p-6 rounded-xl border transition-all hover:scale-[1.01] mb-8 ${
                darkMode 
                  ? "bg-zinc-800/50 border-zinc-700/50" 
                  : "bg-gray-50 border-gray-200"
              }`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      darkMode ? "bg-purple-500/10" : "bg-purple-50"
                    }`}>
                      <MapPin className="w-5 h-5 text-purple-600" />
                    </div>
                    <p className={`text-sm font-semibold ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                      Address
                    </p>
                  </div>
                  <button
                    onClick={() => handleFieldEdit("address", profileData.address)}
                    className={`opacity-0 group-hover:opacity-100 p-2 rounded-lg transition-all ${
                      darkMode ? "hover:bg-zinc-700" : "hover:bg-white"
                    }`}
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
                {editingField === "address" ? (
                  <div className="space-y-2">
                    <textarea
                      value={tempData.address}
                      onChange={(e) => setTempData({ address: e.target.value })}
                      rows="3"
                      className={`w-full text-sm font-medium px-3 py-2 rounded-lg border outline-none resize-none ${
                        darkMode ? "bg-zinc-800 border-zinc-600 text-white" : "bg-white border-gray-300 text-gray-900"
                      }`}
                    />
                    <div className="flex gap-2">
                      <button onClick={() => handleFieldSave("address")} className="px-4 py-2 rounded-lg bg-emerald-500 text-white font-medium">
                        Save
                      </button>
                      <button onClick={handleFieldCancel} className={`px-4 py-2 rounded-lg font-medium ${darkMode ? "bg-zinc-700 text-white" : "bg-gray-200 text-gray-900"}`}>
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className={`text-sm font-medium leading-relaxed ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {profileData.address}
                  </p>
                )}
              </div>

              {/* Islamic Quote Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative overflow-hidden"
              >
                {/* Decorative Islamic Pattern Background */}
                <div className={`relative rounded-2xl sm:rounded-3xl border overflow-hidden ${
                  darkMode 
                    ? "bg-gradient-to-br from-emerald-900/40 via-teal-900/30 to-emerald-900/40 border-emerald-700/30" 
                    : "bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-50 border-emerald-200"
                }`}>
                  {/* Islamic Geometric Pattern Overlay */}
                  <div 
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0L61.8 38.2L100 50L61.8 61.8L50 100L38.2 61.8L0 50L38.2 38.2z' fill='${darkMode ? '%23059669' : '%23047857'}' fill-opacity='0.4'/%3E%3C/svg%3E")`,
                      backgroundSize: '50px 50px'
                    }}
                  />
                  
                  {/* Corner Ornaments */}
                  <div className={`absolute top-0 left-0 w-32 h-32 ${darkMode ? "opacity-20" : "opacity-30"}`}>
                    <svg viewBox="0 0 100 100" className={darkMode ? "text-emerald-400" : "text-emerald-600"}>
                      <path d="M0,0 Q50,50 0,100 Z" fill="currentColor" opacity="0.3"/>
                    </svg>
                  </div>
                  <div className={`absolute bottom-0 right-0 w-32 h-32 rotate-180 ${darkMode ? "opacity-20" : "opacity-30"}`}>
                    <svg viewBox="0 0 100 100" className={darkMode ? "text-emerald-400" : "text-emerald-600"}>
                      <path d="M0,0 Q50,50 0,100 Z" fill="currentColor" opacity="0.3"/>
                    </svg>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 px-6 sm:px-10 lg:px-16 py-10 sm:py-14 lg:py-16 text-center">
                    {/* Decorative Top Element */}
                    <div className="flex justify-center mb-6">
                      <div className={`flex items-center gap-3 ${darkMode ? "text-emerald-400" : "text-emerald-700"}`}>
                        <div className="w-12 h-0.5 bg-current opacity-50"></div>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="opacity-70">
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                        </svg>
                        <div className="w-12 h-0.5 bg-current opacity-50"></div>
                      </div>
                    </div>

                    {/* Quote */}
                    <div className="max-w-3xl mx-auto mb-6">
                      <p className={`text-xl sm:text-2xl lg:text-3xl font-serif leading-relaxed mb-4 ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`} style={{ fontFamily: "'Merriweather', serif" }}>
                        "The believer's shade on the Day of Resurrection will be their charity"
                      </p>
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                        darkMode 
                          ? "bg-emerald-500/20 border border-emerald-500/30" 
                          : "bg-white/80 border border-emerald-300"
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${darkMode ? "bg-emerald-400" : "bg-emerald-600"}`}></div>
                        <p className={`text-sm font-medium ${darkMode ? "text-emerald-300" : "text-emerald-800"}`}>
                          Sahih al-Tirmidhi
                        </p>
                      </div>
                    </div>

                    {/* Decorative Bottom Element */}
                    <div className="flex justify-center mt-6">
                      <div className={`flex items-center gap-2 ${darkMode ? "text-emerald-400/60" : "text-emerald-600/60"}`}>
                        <div className="w-8 h-px bg-current"></div>
                        <div className="w-2 h-2 rounded-full bg-current"></div>
                        <div className="w-16 h-px bg-current"></div>
                        <div className="w-2 h-2 rounded-full bg-current"></div>
                        <div className="w-8 h-px bg-current"></div>
                      </div>
                    </div>

                    {/* Additional Wisdom */}
                    <p className={`mt-6 text-sm sm:text-base italic max-w-2xl mx-auto ${
                      darkMode ? "text-emerald-300/70" : "text-emerald-800/70"
                    }`}>
                      May your generosity be a means of blessing in this life and the hereafter
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}