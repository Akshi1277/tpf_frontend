"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { 
  Heart, 
  Droplet, 
  Wallet,
  TrendingUp,
  Calendar,
  ArrowUpRight,
  Download,
  Filter,
  Search,
  CheckCircle,
  Clock,
  XCircle,
  Trophy,
  Star,
  Award,
  Sparkles,
  Users,
  Target,
  BookOpen,
  Stethoscope,
  Home,
  Utensils,
  GraduationCap,
  HeartPulse,
  Quote
} from "lucide-react"

export default function DonationsPage({ darkModeFromParent }) {
  const [darkMode, setDarkMode] = useState(false)
  const [filterStatus, setFilterStatus] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Sync with parent dark mode
  useEffect(() => {
    if (darkModeFromParent !== undefined) {
      setDarkMode(darkModeFromParent)
    }
  }, [darkModeFromParent])

  // Mock user data - Replace with actual user data
  const currentUser = {
    name: "Ahmed",
    rank: 15,
    weeklyDonation: 8500
  }

  // Mock leaderboard data - Replace with actual API call
  const leaderboardData = [
    { id: 1, name: "Fatima Khan", amount: 45000, rank: 1, isPermanent: true },
    { id: 2, name: "Rahul Sharma", amount: 38000, rank: 2, isPermanent: true },
    { id: 3, name: "Ayesha Patel", amount: 32000, rank: 3, isPermanent: false },
    { id: 4, name: "Mohammed Ali", amount: 28500, rank: 4, isPermanent: true },
    { id: 5, name: "Priya Reddy", amount: 25000, rank: 5, isPermanent: false },
    { id: 6, name: "Kabir Singh", amount: 22000, rank: 6, isPermanent: false },
    { id: 7, name: "Zainab Ahmed", amount: 20000, rank: 7, isPermanent: true },
    { id: 8, name: "Arjun Verma", amount: 18500, rank: 8, isPermanent: false },
    { id: 9, name: "Sana Malik", amount: 17000, rank: 9, isPermanent: false },
    { id: 10, name: "Rohan Das", amount: 15500, rank: 10, isPermanent: false },
    { id: 11, name: "Noor Fatima", amount: 14000, rank: 11, isPermanent: true },
    { id: 12, name: "Vikram Joshi", amount: 12500, rank: 12, isPermanent: false },
    { id: 13, name: "Amina Syed", amount: 11000, rank: 13, isPermanent: false },
    { id: 14, name: "Karan Mehta", amount: 9500, rank: 14, isPermanent: false },
    { id: 15, name: currentUser.name, amount: currentUser.weeklyDonation, rank: 15, isPermanent: false, isCurrentUser: true },
  ]

  // Mock donation stats
  const donationStats = {
    totalAmount: 125000,
    totalDonations: 24,
    campaignsSupported: 12,
    bloodDonations: 3,
    foodDonations: 5,
    otherDonations: 2
  }

  // Real world impact data
  const realWorldImpact = [
    {
      icon: Stethoscope,
      title: "Medical Aid",
      value: "150+",
      description: "People received medical assistance",
      color: "blue"
    },
    {
      icon: HeartPulse,
      title: "Emergency Aid",
      value: "85",
      description: "Emergency cases handled",
      color: "red"
    },
    {
      icon: Droplet,
      title: "Clean Water Supply",
      value: "200+",
      description: "Families got clean water access",
      color: "cyan"
    },
    {
      icon: GraduationCap,
      title: "Education",
      value: "45",
      description: "Students sponsored for education",
      color: "purple"
    },
    {
      icon: Heart,
      title: "Orphans",
      value: "30",
      description: "Orphans supported with care",
      color: "pink"
    },
    {
      icon: Users,
      title: "Other Helps",
      value: "120+",
      description: "Various support activities",
      color: "emerald"
    }
  ]

  // Campaigns supported
  const campaignsSupported = [
    {
      id: 1,
      name: "Clean Water Initiative",
      amount: 25000,
      date: "2024-01-15",
      category: "Water & Sanitation",
      impact: "Helped provide clean water to 200 families"
    },
    {
      id: 2,
      name: "Rural Education Fund",
      amount: 30000,
      date: "2024-01-10",
      category: "Education",
      impact: "Sponsored education for 15 underprivileged children"
    },
    {
      id: 3,
      name: "Medical Emergency Fund",
      amount: 20000,
      date: "2024-01-05",
      category: "Healthcare",
      impact: "Funded 8 emergency medical procedures"
    },
    {
      id: 4,
      name: "Community Kitchen",
      amount: 15000,
      date: "2024-01-03",
      category: "Food Security",
      impact: "Provided meals for 300+ people"
    },
    {
      id: 5,
      name: "Orphanage Support",
      amount: 18000,
      date: "2023-12-28",
      category: "Child Welfare",
      impact: "Supported 25 children with basic necessities"
    },
    {
      id: 6,
      name: "Animal Shelter",
      amount: 8000,
      date: "2023-12-20",
      category: "Animal Welfare",
      impact: "Helped care for 40+ rescued animals"
    }
  ]

  // Transaction history - Only money donations
  const transactions = [
    {
      id: "TXN123456789",
      date: "2024-01-15",
      time: "14:30",
      type: "money",
      amount: 5000,
      recipient: "Clean Water Initiative",
      cause: "Water & Sanitation",
      status: "completed",
      paymentMethod: "UPI",
      color: "blue"
    },
    {
      id: "TXN123456787",
      date: "2024-01-05",
      time: "16:45",
      type: "money",
      amount: 10000,
      recipient: "Rural Education Fund",
      cause: "Education",
      status: "completed",
      paymentMethod: "Net Banking",
      color: "purple"
    },
    {
      id: "TXN123456785",
      date: "2023-12-28",
      time: "11:30",
      type: "money",
      amount: 2500,
      recipient: "Animal Shelter",
      cause: "Animal Welfare",
      status: "completed",
      paymentMethod: "UPI",
      color: "green"
    },
    {
      id: "TXN123456784",
      date: "2023-12-20",
      time: "15:00",
      type: "money",
      amount: 15000,
      recipient: "Orphanage Support",
      cause: "Child Welfare",
      status: "completed",
      paymentMethod: "Card",
      color: "pink"
    },
    {
      id: "TXN123456783",
      date: "2023-12-15",
      time: "12:20",
      type: "money",
      amount: 7500,
      recipient: "Medical Emergency Fund",
      cause: "Healthcare",
      status: "completed",
      paymentMethod: "UPI",
      color: "red"
    },
    {
      id: "TXN123456782",
      date: "2023-12-10",
      time: "09:45",
      type: "money",
      amount: 12000,
      recipient: "Community Kitchen",
      cause: "Food Security",
      status: "completed",
      paymentMethod: "Net Banking",
      color: "orange"
    }
  ]

  const getTypeIcon = (type) => {
    return Wallet
  }

  const getTypeColor = (txnColor) => {
    return txnColor || "emerald"
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case "completed": return CheckCircle
      case "failed": return XCircle
      default: return Clock
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case "completed": return "emerald"
      case "failed": return "red"
      default: return "gray"
    }
  }

  const getRankIcon = (rank) => {
    if (rank === 1) return "🥇"
    if (rank === 2) return "🥈"
    if (rank === 3) return "🥉"
    return null
  }

  const filteredTransactions = transactions.filter(txn => {
    const matchesStatus = filterStatus === "all" || txn.status === filterStatus
    const matchesSearch = searchQuery === "" || 
      txn.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.cause.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.id.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  return (
    <div className={`min-h-screen ${darkMode ? "bg-zinc-900" : "bg-gradient-to-br from-emerald-50 via-white to-teal-50"}`}>

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
        {/* Decorative blobs */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-20 pb-24">
        
        {/* 1. Greeting Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`mb-6 rounded-2xl overflow-hidden relative ${
            darkMode 
              ? "bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border border-emerald-700/30" 
              : "bg-gradient-to-br from-emerald-600 to-teal-600 shadow-xl"
          }`}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-24 -mt-24 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full -ml-20 -mb-20 blur-2xl" />
          
          <div className="relative p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Greeting Text */}
              <div className="flex-1">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-white">
                    𝒮𝒶𝓁𝒶𝒶𝓂! {currentUser.name}! 👋
                  </h1>
                  <p className="text-sm md:text-base mb-3 text-white/90">
                    Your generosity is making a real difference in people's lives
                  </p>
                </motion.div>
              </div>

              {/* Stats Badges */}
              <div className="flex flex-wrap items-center gap-3">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                  darkMode ? "bg-white/10" : "bg-white/20"
                } backdrop-blur-sm`}>
                  <Trophy className="w-4 h-4 text-amber-300" />
                  <span className="font-semibold text-sm text-white">
                    Rank #{currentUser.rank}
                  </span>
                </div>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                  darkMode ? "bg-white/10" : "bg-white/20"
                } backdrop-blur-sm`}>
                  <Heart className="w-4 h-4 text-rose-300" />
                  <span className="font-semibold text-sm text-white">
                    {donationStats.totalDonations} Contributions
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid - Leaderboard on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 flex flex-col">
            
            {/* Stats Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 flex-1">
              {/* Total Amount Donated */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className={`p-6 rounded-2xl border relative overflow-hidden ${
                  darkMode 
                    ? "bg-zinc-800/50 border-zinc-700" 
                    : "bg-white border-gray-200 shadow-lg"
                }`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full -mr-12 -mt-12" />
                <div className="relative">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    darkMode ? "bg-emerald-500/20" : "bg-emerald-100"
                  }`}>
                    <Wallet className="w-6 h-6 text-emerald-600" />
                  </div>
                  <p className={`text-sm font-medium mb-1 ${
                    darkMode ? "text-zinc-400" : "text-gray-600"
                  }`}>
                    Total Donated
                  </p>
                  <p className={`text-2xl md:text-3xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}>
                    ₹{donationStats.totalAmount.toLocaleString('en-IN')}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-medium text-emerald-600">
                      +12% this month
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Total Donations */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className={`p-6 rounded-2xl border relative overflow-hidden ${
                  darkMode 
                    ? "bg-zinc-800/50 border-zinc-700" 
                    : "bg-white border-gray-200 shadow-lg"
                }`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 rounded-full -mr-12 -mt-12" />
                <div className="relative">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    darkMode ? "bg-rose-500/20" : "bg-rose-100"
                  }`}>
                    <Heart className="w-6 h-6 text-rose-600" />
                  </div>
                  <p className={`text-sm font-medium mb-1 ${
                    darkMode ? "text-zinc-400" : "text-gray-600"
                  }`}>
                    Total Contributions
                  </p>
                  <p className={`text-2xl md:text-3xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}>
                    {donationStats.totalDonations}
                  </p>
                  <p className={`text-xs mt-2 ${
                    darkMode ? "text-zinc-500" : "text-gray-500"
                  }`}>
                    All categories
                  </p>
                </div>
              </motion.div>

              {/* Campaigns Supported */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className={`p-6 rounded-2xl border relative overflow-hidden ${
                  darkMode 
                    ? "bg-zinc-800/50 border-zinc-700" 
                    : "bg-white border-gray-200 shadow-lg"
                }`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full -mr-12 -mt-12" />
                <div className="relative">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    darkMode ? "bg-indigo-500/20" : "bg-indigo-100"
                  }`}>
                    <Target className="w-6 h-6 text-indigo-600" />
                  </div>
                  <p className={`text-sm font-medium mb-1 ${
                    darkMode ? "text-zinc-400" : "text-gray-600"
                  }`}>
                    Campaigns Supported
                  </p>
                  <p className={`text-2xl md:text-3xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}>
                    {donationStats.campaignsSupported}
                  </p>
                  <p className={`text-xs mt-2 ${
                    darkMode ? "text-zinc-500" : "text-gray-500"
                  }`}>
                    Active causes
                  </p>
                </div>
              </motion.div>

              {/* People Helped */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className={`p-6 rounded-2xl border relative overflow-hidden ${
                  darkMode 
                    ? "bg-zinc-800/50 border-zinc-700" 
                    : "bg-white border-gray-200 shadow-lg"
                }`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full -mr-12 -mt-12" />
                <div className="relative">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    darkMode ? "bg-amber-500/20" : "bg-amber-100"
                  }`}>
                    <Users className="w-6 h-6 text-amber-600" />
                  </div>
                  <p className={`text-sm font-medium mb-1 ${
                    darkMode ? "text-zinc-400" : "text-gray-600"
                  }`}>
                    People Helped
                  </p>
                  <p className={`text-2xl md:text-3xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}>
                    500+
                  </p>
                  <p className={`text-xs mt-2 ${
                    darkMode ? "text-zinc-500" : "text-gray-500"
                  }`}>
                    Lives impacted
                  </p>
                </div>
              </motion.div>
            </div>

          </div>

          {/* Right Column - Leaderboard */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className={`rounded-2xl border overflow-hidden ${
                darkMode 
                  ? "bg-zinc-800/50 border-zinc-700" 
                  : "bg-white border-gray-200 shadow-lg"
              }`}
            >
              {/* Header */}
              <div className={`p-6 border-b ${
                darkMode ? "border-zinc-700" : "border-gray-200"
              }`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    darkMode ? "bg-amber-500/20" : "bg-amber-100"
                  }`}>
                    <Trophy className="w-6 h-6 text-amber-600" />
                  </div>
                  <h2 className={`text-xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}>
                    Weekly Leaders
                  </h2>
                </div>
                <p className={`text-xs ${
                  darkMode ? "text-zinc-400" : "text-gray-600"
                }`}>
                  Top contributors • 
                  <span className="font-semibold text-amber-600"> Permanent</span>
                </p>
              </div>

              {/* Current User Rank (Sticky Top) */}
              <div className={`p-4 border-b ${
                darkMode ? "bg-zinc-900/50 border-zinc-700" : "bg-emerald-50 border-emerald-200"
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                    darkMode ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-500 text-white"
                  }`}>
                    #{currentUser.rank}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold text-sm truncate ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}>
                      You ({currentUser.name})
                    </p>
                    <p className={`text-xs ${
                      darkMode ? "text-zinc-400" : "text-gray-600"
                    }`}>
                      Your Position
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold text-sm ${
                      darkMode ? "text-emerald-400" : "text-emerald-600"
                    }`}>
                      ₹{currentUser.weeklyDonation.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Scrollable Leaderboard - Show 4-5, rest scrollable */}
              <div className="max-h-[320px] overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-500 scrollbar-track-transparent">
                {leaderboardData.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: Math.min(index * 0.02, 0.1) }}
                    className={`p-3 border-b transition-all ${
                      user.isCurrentUser
                        ? darkMode 
                          ? "bg-emerald-900/20 border-emerald-700" 
                          : "bg-emerald-50 border-emerald-200"
                        : user.isPermanent
                        ? darkMode
                          ? "bg-gradient-to-r from-amber-900/30 via-amber-900/20 to-amber-900/30 border-amber-700/50 hover:from-amber-900/40 hover:via-amber-900/30 hover:to-amber-900/40"
                          : "bg-gradient-to-r from-amber-50 via-amber-100/50 to-amber-50 border-amber-300 hover:from-amber-100 hover:via-amber-100 hover:to-amber-100"
                        : darkMode
                        ? "border-zinc-800 hover:bg-zinc-700/30"
                        : "border-gray-100 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Rank */}
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                        user.rank <= 3
                          ? "bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-lg"
                          : user.isPermanent
                          ? darkMode 
                            ? "bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-md" 
                            : "bg-gradient-to-br from-amber-400 to-amber-500 text-white shadow-md"
                          : darkMode ? "bg-zinc-700 text-zinc-400" : "bg-gray-100 text-gray-600"
                      }`}>
                        {getRankIcon(user.rank) || `#${user.rank}`}
                      </div>

                      {/* User Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className={`font-semibold text-sm truncate ${
                            user.isPermanent
                              ? darkMode ? "text-amber-300" : "text-amber-900"
                              : darkMode ? "text-white" : "text-gray-900"
                          }`}>
                            {user.name}
                            {user.isCurrentUser && " (You)"}
                          </p>
                          {user.isPermanent && (
                            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-amber-500/30 border border-amber-500/50">
                              <Star className="w-3 h-3 text-amber-600 fill-amber-500 flex-shrink-0" />
                            </div>
                          )}
                        </div>
                        <p className={`text-xs font-medium ${
                          user.isPermanent
                            ? darkMode ? "text-amber-400/80" : "text-amber-700"
                            : darkMode ? "text-zinc-400" : "text-gray-600"
                        }`}>
                          ₹{user.amount.toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Scroll indicator */}
              {leaderboardData.length > 5 && (
                <div className={`p-3 text-center border-t ${
                  darkMode ? "border-zinc-700 bg-zinc-800/30" : "border-gray-200 bg-gray-50"
                }`}>
                  <p className={`text-xs ${
                    darkMode ? "text-zinc-500" : "text-gray-500"
                  }`}>
                    Scroll to see more • {leaderboardData.length} total
                  </p>
                </div>
              )}
            </motion.div>
          </div>

        </div>

        {/* Donation History (Merged with Campaigns) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mb-8"
        >
          <div className={`rounded-2xl border overflow-hidden ${
            darkMode 
              ? "bg-zinc-800/50 border-zinc-700" 
              : "bg-white border-gray-200 shadow-lg"
          }`}>
            <div className={`p-6 border-b ${
              darkMode ? "border-zinc-700" : "border-gray-200"
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    darkMode ? "bg-blue-500/20" : "bg-blue-100"
                  }`}>
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className={`text-2xl font-bold ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}>
                      Donation History
                    </h2>
                    <p className={`text-sm ${
                      darkMode ? "text-zinc-400" : "text-gray-600"
                    }`}>
                      Your contributions over time
                    </p>
                  </div>
                </div>
                <button className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 w-fit ${
                  darkMode
                    ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                    : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                }`}>
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                    darkMode ? "text-zinc-500" : "text-gray-400"
                  }`} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by recipient, cause, or ID..."
                    className={`w-full pl-11 pr-4 py-2.5 rounded-lg border outline-none transition-all ${
                      darkMode
                        ? "bg-zinc-700 border-zinc-600 text-white placeholder-zinc-500 focus:border-emerald-500"
                        : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500"
                    }`}
                  />
                </div>

                {/* Status Filter */}
                <div className="relative">
                  <Filter className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                    darkMode ? "text-zinc-500" : "text-gray-400"
                  }`} />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className={`pl-11 pr-8 py-2.5 rounded-lg border outline-none transition-all appearance-none cursor-pointer ${
                      darkMode
                        ? "bg-zinc-700 border-zinc-600 text-white focus:border-emerald-500"
                        : "bg-gray-50 border-gray-200 text-gray-900 focus:border-emerald-500"
                    }`}
                  >
                    <option value="all">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Transaction List - Simplified */}
            <div className={`divide-y ${darkMode ? "divide-zinc-800" : "divide-zinc-100"}`}>
              {filteredTransactions.length === 0 ? (
                <div className="p-12 text-center">
                  <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                    darkMode ? "bg-zinc-700" : "bg-gray-100"
                  }`}>
                    <Search className={`w-8 h-8 ${
                      darkMode ? "text-zinc-500" : "text-gray-400"
                    }`} />
                  </div>
                  <p className={`text-lg font-medium mb-1 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}>
                    No donations found
                  </p>
                  <p className={`text-sm ${
                    darkMode ? "text-zinc-400" : "text-gray-600"
                  }`}>
                    Try adjusting your filters or search query
                  </p>
                </div>
              ) : (
                filteredTransactions.map((txn, index) => {
                  const TypeIcon = getTypeIcon(txn.type)
                  const typeColor = getTypeColor(txn.color)

                  return (
                    <motion.div
                      key={txn.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`p-4 md:p-5 transition-all relative overflow-hidden group ${
                        darkMode ? "hover:bg-zinc-700/30" : "hover:bg-gray-50"
                      }`}
                    >
                      {/* Colorful gradient background on hover */}
                      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                        typeColor === "blue" ? "bg-gradient-to-r from-blue-500/5 to-transparent" :
                        typeColor === "purple" ? "bg-gradient-to-r from-purple-500/5 to-transparent" :
                        typeColor === "green" ? "bg-gradient-to-r from-green-500/5 to-transparent" :
                        typeColor === "pink" ? "bg-gradient-to-r from-pink-500/5 to-transparent" :
                        typeColor === "red" ? "bg-gradient-to-r from-red-500/5 to-transparent" :
                        typeColor === "orange" ? "bg-gradient-to-r from-orange-500/5 to-transparent" :
                        "bg-gradient-to-r from-emerald-500/5 to-transparent"
                      }`} />
                      
                      <div className="flex items-center gap-4 relative z-10">
                        {/* Colorful Icon */}
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110 ${
                          typeColor === "blue" 
                            ? darkMode ? "bg-gradient-to-br from-blue-500/20 to-blue-600/20" : "bg-gradient-to-br from-blue-100 to-blue-200"
                            : typeColor === "purple"
                            ? darkMode ? "bg-gradient-to-br from-purple-500/20 to-purple-600/20" : "bg-gradient-to-br from-purple-100 to-purple-200"
                            : typeColor === "green"
                            ? darkMode ? "bg-gradient-to-br from-green-500/20 to-green-600/20" : "bg-gradient-to-br from-green-100 to-green-200"
                            : typeColor === "pink"
                            ? darkMode ? "bg-gradient-to-br from-pink-500/20 to-pink-600/20" : "bg-gradient-to-br from-pink-100 to-pink-200"
                            : typeColor === "red"
                            ? darkMode ? "bg-gradient-to-br from-red-500/20 to-red-600/20" : "bg-gradient-to-br from-red-100 to-red-200"
                            : typeColor === "orange"
                            ? darkMode ? "bg-gradient-to-br from-orange-500/20 to-orange-600/20" : "bg-gradient-to-br from-orange-100 to-orange-200"
                            : darkMode ? "bg-gradient-to-br from-emerald-500/20 to-emerald-600/20" : "bg-gradient-to-br from-emerald-100 to-emerald-200"
                        }`}>
                          <TypeIcon className={`w-7 h-7 ${
                            typeColor === "blue" ? "text-blue-600" :
                            typeColor === "purple" ? "text-purple-600" :
                            typeColor === "green" ? "text-green-600" :
                            typeColor === "pink" ? "text-pink-600" :
                            typeColor === "red" ? "text-red-600" :
                            typeColor === "orange" ? "text-orange-600" :
                            "text-emerald-600"
                          }`} />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className={`font-semibold text-base mb-1 ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}>
                            {txn.recipient}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              typeColor === "blue"
                                ? darkMode ? "bg-blue-500/20 text-blue-400" : "bg-blue-100 text-blue-700"
                                : typeColor === "purple"
                                ? darkMode ? "bg-purple-500/20 text-purple-400" : "bg-purple-100 text-purple-700"
                                : typeColor === "green"
                                ? darkMode ? "bg-green-500/20 text-green-400" : "bg-green-100 text-green-700"
                                : typeColor === "pink"
                                ? darkMode ? "bg-pink-500/20 text-pink-400" : "bg-pink-100 text-pink-700"
                                : typeColor === "red"
                                ? darkMode ? "bg-red-500/20 text-red-400" : "bg-red-100 text-red-700"
                                : typeColor === "orange"
                                ? darkMode ? "bg-orange-500/20 text-orange-400" : "bg-orange-100 text-orange-700"
                                : darkMode ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-100 text-emerald-700"
                            }`}>
                              {txn.cause}
                            </span>
                            <span className={`text-xs ${
                              darkMode ? "text-zinc-500" : "text-gray-500"
                            }`}>
                              •
                            </span>
                            <span className={`text-xs ${
                              darkMode ? "text-zinc-400" : "text-gray-600"
                            }`}>
                              {txn.paymentMethod}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-xs">
                            <Calendar className={`w-3.5 h-3.5 ${
                              darkMode ? "text-zinc-500" : "text-gray-400"
                            }`} />
                            <span className={darkMode ? "text-zinc-500" : "text-gray-500"}>
                              {new Date(txn.date).toLocaleDateString('en-IN', { 
                                day: 'numeric', 
                                month: 'short', 
                                year: 'numeric' 
                              })} • {txn.time}
                            </span>
                          </div>
                        </div>

                        {/* Amount with Status */}
                        <div className="text-right flex-shrink-0">
                          <p className={`text-xl md:text-2xl font-bold mb-1 ${
                            typeColor === "blue"
                              ? darkMode ? "text-blue-400" : "text-blue-600"
                              : typeColor === "purple"
                              ? darkMode ? "text-purple-400" : "text-purple-600"
                              : typeColor === "green"
                              ? darkMode ? "text-green-400" : "text-green-600"
                              : typeColor === "pink"
                              ? darkMode ? "text-pink-400" : "text-pink-600"
                              : typeColor === "red"
                              ? darkMode ? "text-red-400" : "text-red-600"
                              : typeColor === "orange"
                              ? darkMode ? "text-orange-400" : "text-orange-600"
                              : darkMode ? "text-emerald-400" : "text-emerald-600"
                          }`}>
                            ₹{txn.amount.toLocaleString('en-IN')}
                          </p>
                          <div className="flex items-center justify-end gap-1">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                            <span className="text-xs font-medium text-emerald-600 capitalize">
                              {txn.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })
              )}
            </div>
          </div>
        </motion.div>

        {/* Real World Impact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="mb-8"
        >
          <div className="text-center mb-6">
            <h2 className={`text-3xl md:text-4xl font-bold mb-2 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}>
              Your Real-World Impact
            </h2>
            <p className={`text-lg ${
              darkMode ? "text-zinc-400" : "text-gray-600"
            }`}>
              See the lives you've touched through your generosity
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {realWorldImpact.map((impact, index) => {
              const Icon = impact.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.1 + index * 0.1 }}
                  className={`p-6 rounded-2xl border relative overflow-hidden group hover:scale-105 transition-transform ${
                    darkMode 
                      ? "bg-zinc-800/50 border-zinc-700" 
                      : "bg-white border-gray-200 shadow-lg"
                  }`}
                >
                  {/* Background pattern */}
                  <div className={`absolute inset-0 opacity-5 ${
                    impact.color === "blue" ? "bg-blue-500" :
                    impact.color === "red" ? "bg-red-500" :
                    impact.color === "cyan" ? "bg-cyan-500" :
                    impact.color === "purple" ? "bg-purple-500" :
                    impact.color === "pink" ? "bg-pink-500" :
                    "bg-emerald-500"
                  }`} />
                  
                  <div className="relative">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                      impact.color === "blue" 
                        ? darkMode ? "bg-blue-500/20" : "bg-blue-100"
                        : impact.color === "red"
                        ? darkMode ? "bg-red-500/20" : "bg-red-100"
                        : impact.color === "cyan"
                        ? darkMode ? "bg-cyan-500/20" : "bg-cyan-100"
                        : impact.color === "purple"
                        ? darkMode ? "bg-purple-500/20" : "bg-purple-100"
                        : impact.color === "pink"
                        ? darkMode ? "bg-pink-500/20" : "bg-pink-100"
                        : darkMode ? "bg-emerald-500/20" : "bg-emerald-100"
                    }`}>
                      <Icon className={`w-7 h-7 ${
                        impact.color === "blue" ? "text-blue-600" :
                        impact.color === "red" ? "text-red-600" :
                        impact.color === "cyan" ? "text-cyan-600" :
                        impact.color === "purple" ? "text-purple-600" :
                        impact.color === "pink" ? "text-pink-600" :
                        "text-emerald-600"
                      }`} />
                    </div>
                    
                    <h3 className={`font-semibold mb-2 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}>
                      {impact.title}
                    </h3>
                    
                    <p className={`text-3xl font-bold mb-2 ${
                      impact.color === "blue" 
                        ? darkMode ? "text-blue-400" : "text-blue-600"
                        : impact.color === "red"
                        ? darkMode ? "text-red-400" : "text-red-600"
                        : impact.color === "cyan"
                        ? darkMode ? "text-cyan-400" : "text-cyan-600"
                        : impact.color === "purple"
                        ? darkMode ? "text-purple-400" : "text-purple-600"
                        : impact.color === "pink"
                        ? darkMode ? "text-pink-400" : "text-pink-600"
                        : darkMode ? "text-emerald-400" : "text-emerald-600"
                    }`}>
                      {impact.value}
                    </p>
                    
                    <p className={`text-sm ${
                      darkMode ? "text-zinc-400" : "text-gray-600"
                    }`}>
                      {impact.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Inspirational Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className={`mb-8 rounded-3xl overflow-hidden relative ${
            darkMode 
              ? "bg-gradient-to-br from-amber-900/30 to-orange-900/30 border border-amber-700/30" 
              : "bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 shadow-lg"
          }`}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full -ml-32 -mt-32 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full -mr-24 -mb-24 blur-3xl" />
          
          <div className="relative p-8 md:p-12 text-center">
            <motion.div
              animate={{ rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block mb-6"
            >
              <Quote className={`w-12 h-12 md:w-16 md:h-16 ${
                darkMode ? "text-amber-400" : "text-amber-600"
              }`} />
            </motion.div>
            
            <blockquote className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}>
              "Charity does not decrease wealth"
            </blockquote>
            
            <p className={`text-lg md:text-xl mb-2 ${
              darkMode ? "text-amber-200" : "text-amber-800"
            }`}>
              — Prophet Muhammad (ﷺ)
            </p>
            
            <p className={`text-base md:text-lg max-w-3xl mx-auto ${
              darkMode ? "text-zinc-300" : "text-gray-700"
            }`}>
              Every act of generosity creates a ripple of goodness. Your contributions are not just helping others, they're enriching your own soul and building a better world for everyone.
            </p>
          </div>
        </motion.div>

      </div>

    </div>
  )
}