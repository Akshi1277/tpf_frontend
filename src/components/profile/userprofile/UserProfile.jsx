"use client"

import { useSelector, useDispatch } from "react-redux"
import { setCredentials } from "@/utils/slices/authSlice"
import { useUpdateProfileMutation } from "@/utils/slices/authApiSlice"
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
  Edit3,
  Save,
  X,
  Award,
  Heart,
  Check,
  Briefcase,
  Users,
  Sparkles,
  ChevronDown
} from "lucide-react"

export default function ProfilePage({ darkModeFromParent }) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.userInfo)
  const [updateProfile] = useUpdateProfileMutation()
  const [profileData, setProfileData] = useState({})
  const [darkMode, setDarkMode] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [professions, setProfessions] = useState([])
  const [professionSearch, setProfessionSearch] = useState("")
  const [showProfessionModal, setShowProfessionModal] = useState(false)
  const [showDobModal, setShowDobModal] = useState(false)
  const [showOtherProfession, setShowOtherProfession] = useState(false)
  const [otherProfession, setOtherProfession] = useState("")


  const [tempData, setTempData] = useState({})
  const [tempDob, setTempDob] = useState({ day: "", month: "", year: "" })
  const [tempProfession, setTempProfession] = useState("")

  // Generate day, month, year options
  const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'))
  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" }
  ]
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 100 }, (_, i) => String(currentYear - i))

  useEffect(() => {
    if (darkModeFromParent !== undefined) {
      setDarkMode(darkModeFromParent)
    }
  }, [darkModeFromParent])

  useEffect(() => {
    const commonProfessions = [
      "Software Engineer", "Doctor", "Teacher", "Nurse", "Accountant",
      "Engineer", "Manager", "Consultant", "Designer", "Architect",
      "Lawyer", "Pharmacist", "Scientist", "Analyst", "Developer",
      "Marketing Manager", "Sales Representative", "Business Owner",
      "Entrepreneur", "Student", "Researcher", "Writer", "Artist",
      "Musician", "Chef", "Photographer", "Pilot", "Driver",
      "Electrician", "Plumber", "Mechanic", "Carpenter", "Farmer",
      "Rather not say", "Other"
    ]
    setProfessions(commonProfessions)
  }, [])

  useEffect(() => {
    if (user) {
      setProfileData({
        fullName: user.fullName || "",
        email: user.email || "",
        mobileNo: user.mobileNo || "",
        bloodGroup: user.bloodGroup || "",
        gender: user.gender || "",
        dobDay: user.dob ? new Date(user.dob).getDate().toString().padStart(2, "0") : "",
        dobMonth: user.dob ? String(new Date(user.dob).getMonth() + 1).padStart(2, "0") : "",
        dobYear: user.dob ? String(new Date(user.dob).getFullYear()) : "",
        profession: user.profession || "",
        address: user?.address?.house || "",
        zakaatAmount: user.zakaatContributor?.amount ?? null
      });
    }
  }, [user]);


  const handleEditToggle = () => {
    if (isEditMode) {
      setTempData({})
      setIsEditMode(false)
      setProfessionSearch("")
    } else {
      setTempData({ ...profileData })
      setIsEditMode(true)
    }
  }

  const handleSaveAll = async () => {
    try {
      const payload = {
        fullName: tempData.fullName,
        email: tempData.email,
        bloodGroup: tempData.bloodGroup,
        gender: tempData.gender || null,
        dob:
          tempData.dobYear && tempData.dobMonth && tempData.dobDay
            ? `${tempData.dobYear}-${tempData.dobMonth}-${tempData.dobDay}`
            : null,

        profession: tempData.profession,
        address: {
          house: tempData.address?.split(",")[0] || "",
          city: tempData.address?.split(",")[1] || "",
          state: tempData.address?.split(",")[2] || "",
          pincode: tempData.address?.split(",")[3]?.replace(/\D/g, "") || "",
        },
      };

      const res = await updateProfile(payload).unwrap();

      // 🔥 update Redux directly — no need to refetch page
      dispatch(setCredentials(res.user));

      // update UI instantly
      setProfileData({
        fullName: res.user.fullName || "",
        email: res.user.email || "",
        mobile: res.user.mobileNo || "",
        bloodGroup: res.user.bloodGroup || "",
        gender: res.user.gender ?? "",

        dobDay: res.user.dob ? new Date(res.user.dob).getDate().toString().padStart(2, "0") : "",
        dobMonth: res.user.dob ? String(new Date(res.user.dob).getMonth() + 1).padStart(2, "0") : "",
        dobYear: res.user.dob ? String(new Date(res.user.dob).getFullYear()) : "",
        profession: res.user.profession || "",
        address: res.user.address?.house
          ? `${res.user.address.house}, ${res.user.address.city}, ${res.user.address.state} - ${res.user.address.pincode}`
          : "",
        zakaatAmount: res.user.zakaatContributor?.amount ?? null
      });


      setIsEditMode(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (err) {
      alert(err?.data?.message || "Failed to update profile");
    }
  };


  const handleOpenProfessionModal = () => {
    setTempProfession(tempData.profession || "")
    setShowOtherProfession(tempData.profession === "Other" ||
      !professions.includes(tempData.profession))
    setOtherProfession(tempData.profession === "Other" ||
      professions.includes(tempData.profession) ? "" : tempData.profession)
    setShowProfessionModal(true)
  }

 const handleSaveProfession = () => {
  if (showOtherProfession && otherProfession?.trim()) {
    setTempData(prev => ({ ...prev, profession: otherProfession.trim() }))
  } else if (tempProfession && tempProfession !== "Other") {
    setTempData(prev => ({ ...prev, profession: tempProfession }))
  }
  setShowProfessionModal(false)
  setShowOtherProfession(false)
  setOtherProfession("")
}

  const handleOpenDobModal = () => {
    setTempDob({
      day: tempData.dobDay,
      month: tempData.dobMonth,
      year: tempData.dobYear
    })
    setShowDobModal(true)
  }

  const handleSaveDob = () => {
    setTempData(prev => ({
      ...prev,
      dobDay: tempDob.day,
      dobMonth: tempDob.month,
      dobYear: tempDob.year
    }))
    setShowDobModal(false)
  }

  const calculateAge = (day, month, year) => {
    const birthDate = new Date(`${year}-${month}-${day}T00:00:00`)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  const getInitials = (name) => {
    if (!name || typeof name !== "string") return "?"
    return name
      .trim()
      .split(' ')
      .filter(Boolean)
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

  const DisplayTag = ({ icon: Icon, label, value, color = "blue" }) => (
    <div className={`group relative px-4 py-3 rounded-xl border transition-all duration-300 ${darkMode
      ? "bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
      : "bg-white border-gray-300 hover:border-gray-400 hover:shadow"
      }`}>

      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 ${darkMode
          ? `bg-${color}-500/20 group-hover:bg-${color}-500/30`
          : `bg-${color}-100 group-hover:bg-${color}-200`
          }`}>
          <Icon className={`w-4 h-4 ${darkMode ? `text-${color}-400` : `text-${color}-600`}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-xs font-semibold mb-1 tracking-wide ${darkMode ? "text-zinc-500" : "text-gray-500"}`}>
            {label}
          </p>
          <p className={`text-sm font-bold truncate ${darkMode ? "text-white" : "text-gray-900"}`}>
            {value}
          </p>
        </div>
      </div>
    </div>
  )

 const EditableTag = ({ icon: Icon, label, value, field, color = "blue", type = "text", options = null, onModalOpen }) => {
  const displayValue = tempData[field]

  return (
    <div className={`px-4 py-3 rounded-xl border transition-all ${
      darkMode
        ? "bg-zinc-800/90 border-zinc-700/70 hover:border-zinc-600"
        : "bg-white/95 border-gray-200 hover:border-gray-300"
    }`}>
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
          darkMode ? `bg-${color}-500/20` : `bg-${color}-100`
        }`}>
          <Icon className={`w-4 h-4 ${darkMode ? `text-${color}-400` : `text-${color}-600`}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-xs font-semibold mb-1.5 tracking-wide uppercase ${
            darkMode ? "text-zinc-400" : "text-gray-600"
          }`}>
            {label}
          </p>
          {type === "select" && options ? (
            <div className="relative">
              <select
                value={displayValue}
                onChange={(e) => setTempData(prev => ({ ...prev, [field]: e.target.value }))}
                className={`w-full text-sm font-bold px-3 py-2 pr-8 rounded-lg border outline-none appearance-none transition-colors ${
                  darkMode
                    ? "bg-zinc-900 border-zinc-600 text-white hover:border-zinc-500 focus:border-emerald-500"
                    : "bg-white border-gray-300 text-gray-900 hover:border-gray-400 focus:border-emerald-500"
                }`}
              >
                {options.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <ChevronDown className={`absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${
                darkMode ? "text-zinc-400" : "text-gray-500"
              }`} />
            </div>
          ) : type === "modal" ? (
            <button
              onClick={onModalOpen}
              className={`w-full text-left text-sm font-bold px-3 py-2 rounded-lg border transition-colors ${
                darkMode
                  ? "bg-zinc-900 border-zinc-600 text-white hover:border-emerald-500"
                  : "bg-white border-gray-300 text-gray-900 hover:border-emerald-500"
              }`}
            >
              {displayValue || value}
            </button>
          ) : (
            <input
              type={type}
              value={displayValue}
              onChange={(e) => setTempData(prev => ({ ...prev, [field]: e.target.value }))}
              className={`w-full text-sm font-bold px-3 py-2 rounded-lg border outline-none transition-colors ${
                darkMode
                  ? "bg-zinc-900 border-zinc-600 text-white hover:border-zinc-500 focus:border-emerald-500"
                  : "bg-white border-gray-300 text-gray-900 hover:border-gray-400 focus:border-emerald-500"
              }`}
            />
          )}
        </div>
      </div>
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
            className={`fixed top-6 right-4 sm:right-6 z-50 px-4 sm:px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 ${darkMode ? "bg-zinc-900 border border-emerald-500/20" : "bg-white border border-emerald-200"
              }`}
          >
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
              <Check className="w-5 h-5 text-white" strokeWidth={3} />
            </div>
            <p className={`font-semibold text-sm ${darkMode ? "text-white" : "text-gray-900"}`}>
              Profile Updated Successfully!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profession Modal */}
      <AnimatePresence>
        {showProfessionModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowProfessionModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-md rounded-2xl shadow-2xl ${darkMode ? "bg-zinc-900 border border-zinc-800" : "bg-white"
                }`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                    Select Profession
                  </h3>
                  <button
                    onClick={() => setShowProfessionModal(false)}
                    className={`p-2 rounded-lg transition-colors ${darkMode ? "hover:bg-zinc-800" : "hover:bg-gray-100"
                      }`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3 mb- max-h-96 overflow-y-auto scrollbar-hide">
                  {professions.map((prof) => (
                    <button
                      key={prof}
                      onClick={() => {
                        setTempProfession(prof)
                        setShowOtherProfession(prof === "Other")
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${tempProfession === prof
                        ? darkMode
                          ? "bg-emerald-500/20 border-emerald-500 text-white"
                          : "bg-emerald-50 border-emerald-500 text-gray-900"
                        : darkMode
                          ? "bg-zinc-800/50 border-zinc-700 text-white hover:border-zinc-600"
                          : "bg-gray-50 border-gray-200 text-gray-900 hover:border-gray-300"
                        }`}
                    >
                      {prof}
                    </button>
                  ))}
                </div>

                {showOtherProfession && (
                  <div className="mb-6">
                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-zinc-400" : "text-gray-600"
                      }`}>
                      Enter Your Profession
                    </label>
                    <input
                      type="text"
                      value={otherProfession}
                      onChange={(e) => setOtherProfession(e.target.value)}
                      placeholder="Type your profession..."
                      className={`w-full px-4 py-3 rounded-xl border outline-none transition-colors ${darkMode
                        ? "bg-zinc-800 border-zinc-600 text-white placeholder-zinc-500 focus:border-emerald-500"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-emerald-500"
                        }`}
                    />
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowProfessionModal(false)}
                    className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-colors ${darkMode
                      ? "bg-zinc-800 text-white hover:bg-zinc-700"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                      }`}
                  >
                    Cancel
                  </button>
                 <button
  onClick={handleSaveProfession}
  disabled={showOtherProfession && !otherProfession?.trim()}
  className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-colors ${
    showOtherProfession && !otherProfession?.trim()
      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
      : "bg-emerald-500 text-white hover:bg-emerald-600"
  }`}
>
  Choose
</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )
  }
      </AnimatePresence >

    {/* DOB Modal */ }
    < AnimatePresence >
    { showDobModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDobModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-md rounded-2xl shadow-2xl ${darkMode ? "bg-zinc-900 border border-zinc-800" : "bg-white"
                }`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                    Select Date of Birth
                  </h3>
                  <button
                    onClick={() => setShowDobModal(false)}
                    className={`p-2 rounded-lg transition-colors ${darkMode ? "hover:bg-zinc-800" : "hover:bg-gray-100"
                      }`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-zinc-400" : "text-gray-600"
                      }`}>
                      Day
                    </label>
                    <div className="relative">
                      <select
                        value={tempDob.day}
                        onChange={(e) => setTempDob(prev => ({ ...prev, day: e.target.value }))}
                        className={`w-full px-4 py-3 pr-10 rounded-xl border outline-none appearance-none transition-colors ${darkMode
                          ? "bg-zinc-800 border-zinc-600 text-white hover:border-zinc-500 focus:border-emerald-500"
                          : "bg-white border-gray-300 text-gray-900 hover:border-gray-400 focus:border-emerald-500"
                          }`}
                      >
                        {days.map(day => (
                          <option key={day} value={day}>{day}</option>
                        ))}
                      </select>
                      <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none ${darkMode ? "text-zinc-400" : "text-gray-500"
                        }`} />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-zinc-400" : "text-gray-600"
                      }`}>
                      Month
                    </label>
                    <div className="relative">
                      <select
                        value={tempDob.month}
                        onChange={(e) => setTempDob(prev => ({ ...prev, month: e.target.value }))}
                        className={`w-full px-4 py-3 pr-10 rounded-xl border outline-none appearance-none transition-colors ${darkMode
                          ? "bg-zinc-800 border-zinc-600 text-white hover:border-zinc-500 focus:border-emerald-500"
                          : "bg-white border-gray-300 text-gray-900 hover:border-gray-400 focus:border-emerald-500"
                          }`}
                      >
                        {months.map(month => (
                          <option key={month.value} value={month.value}>{month.label}</option>
                        ))}
                      </select>
                      <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none ${darkMode ? "text-zinc-400" : "text-gray-500"
                        }`} />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-zinc-400" : "text-gray-600"
                      }`}>
                      Year
                    </label>
                    <div className="relative">
                      <select
                        value={tempDob.year}
                        onChange={(e) => setTempDob(prev => ({ ...prev, year: e.target.value }))}
                        className={`w-full px-4 py-3 pr-10 rounded-xl border outline-none appearance-none transition-colors ${darkMode
                          ? "bg-zinc-800 border-zinc-600 text-white hover:border-zinc-500 focus:border-emerald-500"
                          : "bg-white border-gray-300 text-gray-900 hover:border-gray-400 focus:border-emerald-500"
                          }`}
                      >
                        {years.map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                      <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none ${darkMode ? "text-zinc-400" : "text-gray-500"
                        }`} />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDobModal(false)}
                    className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-colors ${darkMode
                      ? "bg-zinc-800 text-white hover:bg-zinc-700"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                      }`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveDob}
                    className="flex-1 px-4 py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors"
                  >
                    Save
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
    )
}
      </AnimatePresence >

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 right-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full blur-[100px] sm:blur-[120px] ${darkMode ? "bg-emerald-500/10" : "bg-emerald-50"
          }`} />
        <div className={`absolute bottom-0 left-0 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full blur-[80px] sm:blur-[100px] ${darkMode ? "bg-teal-500/10" : "bg-teal-50"
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
          <div className={`rounded-2xl sm:rounded-3xl overflow-hidden ${darkMode
            ? "bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/50"
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

              {/* Edit Button */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
                {isEditMode ? (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveAll}
                      className="px-4 py-2 rounded-xl bg-white text-emerald-600 font-semibold flex items-center gap-2 hover:bg-emerald-50 transition-all shadow-lg"
                    >
                      <Save className="w-4 h-4" />
                      <span className="hidden sm:inline">Save</span>
                    </button>
                    <button
                      onClick={handleEditToggle}
                      className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm text-white font-semibold flex items-center gap-2 hover:bg-white/20 transition-all border border-white/20"
                    >
                      <X className="w-4 h-4" />
                      <span className="hidden sm:inline">Cancel</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleEditToggle}
                    className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm text-white font-semibold flex items-center gap-2 hover:bg-white/20 transition-all border border-white/20"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span className="hidden sm:inline">Edit Profile</span>
                  </button>
                )}
              </div>

              <div className="relative z-10 flex flex-col items-center text-center">
                {/* Profile Picture */}
                <div className={`w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-2xl border-4 overflow-hidden shadow-2xl mb-4 ${darkMode ? "border-white/20" : "border-white"
                  }`}>
                  <div className="w-full h-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                      {getInitials(isEditMode ? tempData.fullName : profileData.fullName)}
                    </span>
                  </div>
                </div>

                {/* Name */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white drop-shadow-lg mb-3">
                  {profileData.fullName}
                </h1>

                {/* Role Badge */}
                {user && (
                  <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-4">
                    <Shield className="w-4 h-4 text-white" />
                    <span className="font-semibold text-sm text-white">
                      {userRoles.find(r => r.value === user.role)?.label || "Member"}
                    </span>
                  </div>
                )}


                {/* Editable Tags */}
<div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
  {isEditMode ? (
    <>
      <EditableTag
        icon={Droplet}
        label="Blood Group"
        value={tempData.bloodGroup || "Not Selected"}
        field="bloodGroup"
        color="red"
        type="select"
        options={["Select", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
      />
      <EditableTag
        icon={Users}
        label="Gender"
        value={tempData.gender || "Not Selected"}
        field="gender"
        color="blue"
        type="select"
        options={["Select", "Male", "Female"]}
      />
      <EditableTag
        icon={Calendar}
        label="Date of Birth"
        value={
          tempData.dobDay && tempData.dobMonth && tempData.dobYear
            ? `${tempData.dobDay}/${tempData.dobMonth}/${tempData.dobYear}`
            : "Not Selected"
        }
        field="dob"
        color="purple"
        type="modal"
        onModalOpen={handleOpenDobModal}
      />
      <DisplayTag
        icon={Calendar}
        label="Age"
        value={
          tempData.dobDay && tempData.dobMonth && tempData.dobYear
            ? `${calculateAge(tempData.dobDay, tempData.dobMonth, tempData.dobYear)} years`
            : "Not Provided"
        }
        color="purple"
      />
      <EditableTag
        icon={Briefcase}
        label="Profession"
        value={tempData.profession || "Not Selected"}
        field="profession"
        color="orange"
        type="modal"
        onModalOpen={handleOpenProfessionModal}
      />
    </>
  ) : (
    <>
      <DisplayTag icon={Droplet} label="Blood Group" value={profileData.bloodGroup || "Not Selected"} color="red" />
      <DisplayTag
        icon={Users}
        label="Gender"
        value={profileData.gender || "Not Selected"}
        color="blue"
      />
      <DisplayTag 
        icon={Calendar} 
        label="Age" 
        value={
          profileData.dobDay && profileData.dobMonth && profileData.dobYear
            ? `${calculateAge(profileData.dobDay, profileData.dobMonth, profileData.dobYear)} years`
            : "Not Provided"
        } 
        color="purple" 
      />
      <DisplayTag icon={Briefcase} label="Profession" value={profileData.profession || "Not Selected"} color="orange" />
    </>
  )}
</div>
              </div>
            </div>

            {/* Contact Cards */}
            <div className="px-4 sm:px-6 lg:px-10 py-6 sm:py-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {/* Email */}
                <div className={`group relative p-4 sm:p-5 rounded-xl border transition-all duration-300 overflow-hidden ${darkMode
                  ? "bg-zinc-800/60 border-zinc-700/60 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10"
                  : "bg-gradient-to-br from-blue-50 to-white border-blue-100 hover:border-blue-300 hover:shadow-lg"
                  }`}>
                  <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${darkMode ? "bg-blue-500/10" : "bg-blue-100/50"
                    }`}></div>
                  <div className="relative">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${darkMode ? "bg-blue-500/15 group-hover:bg-blue-500/25" : "bg-blue-100 group-hover:bg-blue-200"
                        }`}>
                        <Mail className={`w-5 h-5 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
                      </div>
                    </div>
                    <p className={`text-xs font-bold mb-2 tracking-wide ${darkMode ? "text-zinc-500" : "text-gray-500"}`}>
                      Email Address
                    </p>
                    {isEditMode ? (
                      <input
                        type="email"
                        value={tempData.email}
                        onChange={(e) => setTempData(prev => ({ ...prev, email: e.target.value }))}
                        className={`w-full text-sm font-semibold px-3 py-2 rounded-lg border outline-none transition-colors ${darkMode
                          ? "bg-zinc-900 border-zinc-700 text-white hover:border-zinc-600 focus:border-emerald-500"
                          : "bg-white border-gray-300 text-gray-900 hover:border-gray-400 focus:border-emerald-500"
                          }`}
                      />
                    ) : (
                      <p className={`text-sm font-bold break-all ${darkMode ? "text-white" : "text-gray-900"}`}>
                        {profileData.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Mobile */}
                <div className={`group relative p-4 sm:p-5 rounded-xl border transition-all duration-300 overflow-hidden ${darkMode
                  ? "bg-zinc-800/60 border-zinc-700/60 hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/10"
                  : "bg-gradient-to-br from-green-50 to-white border-green-100 hover:border-green-300 hover:shadow-lg"
                  }`}>
                  <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${darkMode ? "bg-green-500/10" : "bg-green-100/50"
                    }`}></div>
                  <div className="relative">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${darkMode ? "bg-green-500/15 group-hover:bg-green-500/25" : "bg-green-100 group-hover:bg-green-200"
                        }`}>
                        <Phone className={`w-5 h-5 ${darkMode ? "text-green-400" : "text-green-600"}`} />
                      </div>
                    </div>
                    <p className={`text-xs font-bold mb-2 tracking-wide ${darkMode ? "text-zinc-500" : "text-gray-500"}`}>
                      Mobile Number
                    </p>
                    {isEditMode ? (
                      <input
                        type="tel"
                        value={tempData.mobileNo}
                        onChange={(e) => setTempData(prev => ({ ...prev, mobileNo: e.target.value }))}
                        className={`w-full text-sm font-semibold px-3 py-2 rounded-lg border outline-none transition-colors ${darkMode
                          ? "bg-zinc-900 border-zinc-700 text-white hover:border-zinc-600 focus:border-emerald-500"
                          : "bg-white border-gray-300 text-gray-900 hover:border-gray-400 focus:border-emerald-500"
                          }`}
                      />
                    ) : (
                      <p className={`text-sm font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                        +91 {profileData.mobileNo}
                      </p>
                    )}
                  </div>
                </div>

                {/* Zakaat */}
                <div className={`group relative p-4 sm:p-5 rounded-xl border transition-all duration-300 overflow-hidden sm:col-span-2 lg:col-span-1 ${darkMode
                  ? "bg-gradient-to-br from-emerald-900/50 to-emerald-900/20 border-emerald-700/60 hover:border-emerald-600/70 hover:shadow-lg hover:shadow-emerald-500/10"
                  : "bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100/50 border-emerald-200 hover:border-emerald-300 hover:shadow-lg"
                  }`}>
                  <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl transition-opacity duration-300 opacity-30 group-hover:opacity-50 ${darkMode ? "bg-emerald-500/20" : "bg-emerald-200/50"
                    }`}></div>
                  <div className="relative">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${darkMode ? "bg-emerald-500/25 group-hover:bg-emerald-500/35" : "bg-emerald-200 group-hover:bg-emerald-300"
                        }`}>
                        <Award className={`w-5 h-5 ${darkMode ? "text-emerald-300" : "text-emerald-700"}`} />
                      </div>
                    </div>
                    <p className={`text-xs font-bold mb-2 tracking-wide ${darkMode ? "text-emerald-400" : "text-emerald-700"}`}>
                      My Zakat
                    </p>
                    {Number(profileData.zakaatAmount) > 0 ? (
                      // Show amount only if > 0
                      <p className={`text-lg font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                        ₹{Number(profileData.zakaatAmount).toLocaleString("en-IN")}
                      </p>
                    ) : (
                      // Show button if no valid zakat amount
                      <button
                        onClick={() => (window.location.href = "/zakat-calculator")}
    className={`text-sm font-bold transition-colors flex items-center gap-1.5 ${
      darkMode ? "text-emerald-300 hover:text-emerald-200" : "text-emerald-700 hover:text-emerald-800"
                          }`}
                      >
                        Calculate Zakat <Sparkles className="w-4 h-4" />
                      </button>
                    )}


                  </div>
                </div>
              </div>

              {/* Address */}
              <div className={`group relative p-5 sm:p-6 rounded-xl border transition-all duration-300 mb-8 overflow-hidden ${darkMode
                ? "bg-zinc-800/60 border-zinc-700/60 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10"
                : "bg-gradient-to-br from-purple-50 to-white border-purple-100 hover:border-purple-300 hover:shadow-lg"
                }`}>
                <div className={`absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${darkMode ? "bg-purple-500/10" : "bg-purple-100/50"
                  }`}></div>
                <div className="relative">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${darkMode ? "bg-purple-500/15 group-hover:bg-purple-500/25" : "bg-purple-100 group-hover:bg-purple-200"
                        }`}>
                        <MapPin className={`w-5 h-5 ${darkMode ? "text-purple-400" : "text-purple-600"}`} />
                      </div>
                      <p className={`text-sm font-bold ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                        Address
                      </p>
                    </div>
                  </div>
                  {isEditMode ? (
                    <textarea
                      value={tempData.address}
                      onChange={(e) => setTempData(prev => ({ ...prev, address: e.target.value }))}
                      rows="3"
                      className={`w-full text-sm font-medium px-3 py-2 rounded-lg border outline-none resize-none transition-colors ${darkMode
                        ? "bg-zinc-900 border-zinc-700 text-white hover:border-zinc-600 focus:border-emerald-500"
                        : "bg-white border-gray-300 text-gray-900 hover:border-gray-400 focus:border-emerald-500"
                        }`}
                    />
                  ) : (
                    <p className={`text-sm font-medium leading-relaxed ${darkMode ? "text-white" : "text-gray-900"}`}>
                      {profileData.address}
                    </p>
                  )}
                </div>
              </div>

              {/* Islamic Quote Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative overflow-hidden"
              >
                <div className={`relative rounded-2xl sm:rounded-3xl border overflow-hidden ${darkMode
                  ? "bg-gradient-to-br from-emerald-900/40 via-teal-900/30 to-emerald-900/40 border-emerald-700/30"
                  : "bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-50 border-emerald-200"
                  }`}>
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0L61.8 38.2L100 50L61.8 61.8L50 100L38.2 61.8L0 50L38.2 38.2z' fill='${darkMode ? '%23059669' : '%23047857'}' fill-opacity='0.4'/%3E%3C/svg%3E")`,
                      backgroundSize: '50px 50px'
                    }}
                  />

                  <div className={`absolute top-0 left-0 w-32 h-32 ${darkMode ? "opacity-20" : "opacity-30"}`}>
                    <svg viewBox="0 0 100 100" className={darkMode ? "text-emerald-400" : "text-emerald-600"}>
                      <path d="M0,0 Q50,50 0,100 Z" fill="currentColor" opacity="0.3" />
                    </svg>
                  </div>
                  <div className={`absolute bottom-0 right-0 w-32 h-32 rotate-180 ${darkMode ? "opacity-20" : "opacity-30"}`}>
                    <svg viewBox="0 0 100 100" className={darkMode ? "text-emerald-400" : "text-emerald-600"}>
                      <path d="M0,0 Q50,50 0,100 Z" fill="currentColor" opacity="0.3" />
                    </svg>
                  </div>

                  <div className="relative z-10 px-6 sm:px-10 lg:px-16 py-10 sm:py-14 lg:py-16 text-center">
                    <div className="flex justify-center mb-6">
                      <div className={`flex items-center gap-3 ${darkMode ? "text-emerald-400" : "text-emerald-700"}`}>
                        <div className="w-12 h-0.5 bg-current opacity-50"></div>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="opacity-70">
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                        </svg>
                        <div className="w-12 h-0.5 bg-current opacity-50"></div>
                      </div>
                    </div>

                    <div className="max-w-3xl mx-auto mb-6">
                      <p className={`text-xl sm:text-2xl lg:text-3xl font-serif leading-relaxed mb-4 ${darkMode ? "text-white" : "text-gray-900"
                        }`} style={{ fontFamily: "'Merriweather', serif" }}>
                        "The believer's shade on the Day of Resurrection will be their charity"
                      </p>
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${darkMode
                        ? "bg-emerald-500/20 border border-emerald-500/30"
                        : "bg-white/80 border border-emerald-300"
                        }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${darkMode ? "bg-emerald-400" : "bg-emerald-600"}`}></div>
                        <p className={`text-sm font-medium ${darkMode ? "text-emerald-300" : "text-emerald-800"}`}>
                          Sahih al-Tirmidhi
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-center mt-6">
                      <div className={`flex items-center gap-2 ${darkMode ? "text-emerald-400/60" : "text-emerald-600/60"}`}>
                        <div className="w-8 h-px bg-current"></div>
                        <div className="w-2 h-2 rounded-full bg-current"></div>
                        <div className="w-16 h-px bg-current"></div>
                        <div className="w-2 h-2 rounded-full bg-current"></div>
                        <div className="w-8 h-px bg-current"></div>
                      </div>
                    </div>

                    <p className={`mt-6 text-sm sm:text-base italic max-w-2xl mx-auto ${darkMode ? "text-emerald-300/70" : "text-emerald-800/70"
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
    </div >
  )
}