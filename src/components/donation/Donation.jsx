"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
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
  XCircle
} from "lucide-react"

export default function DonationsPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [scrolled, setScrolled] = useState(true)
  const [filterType, setFilterType] = useState("all") // all, money, blood, food, other
  const [filterStatus, setFilterStatus] = useState("all") // all, completed, pending, failed
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode')
    setDarkMode(savedMode === 'true')
  }, [])

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

  // Mock data - Replace with actual API call
  const donationStats = {
    totalAmount: 125000,
    totalDonations: 24,
    bloodDonations: 3,
    foodDonations: 5,
    otherDonations: 2
  }

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
      transactionId: "UPI/456789123"
    },
    {
      id: "TXN123456788",
      date: "2024-01-10",
      time: "10:15",
      type: "blood",
      amount: null,
      units: "1 Unit (350ml)",
      bloodGroup: "O+",
      recipient: "City Blood Bank",
      cause: "Medical Emergency",
      status: "completed",
      location: "Central Hospital, Bangalore"
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
      transactionId: "NB/789456123"
    },
    {
      id: "TXN123456786",
      date: "2024-01-03",
      time: "09:20",
      type: "food",
      amount: null,
      items: "50 kg Rice, 20 kg Dal",
      recipient: "Community Kitchen",
      cause: "Food Security",
      status: "completed",
      location: "Whitefield Community Center"
    },
    {
      id: "TXN123456785",
      date: "2023-12-28",
      time: "11:30",
      type: "money",
      amount: 2500,
      recipient: "Animal Shelter",
      cause: "Animal Welfare",
      status: "pending",
      paymentMethod: "UPI",
      transactionId: "UPI/321654987"
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
      transactionId: "CARD/147258369"
    }
  ]

  const getTypeIcon = (type) => {
    switch(type) {
      case "money": return Wallet
      case "blood": return Droplet
      case "food": return Heart
      default: return Heart
    }
  }

  const getTypeColor = (type) => {
    switch(type) {
      case "money": return "emerald"
      case "blood": return "red"
      case "food": return "orange"
      default: return "blue"
    }
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case "completed": return CheckCircle
      case "pending": return Clock
      case "failed": return XCircle
      default: return Clock
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case "completed": return "emerald"
      case "pending": return "yellow"
      case "failed": return "red"
      default: return "gray"
    }
  }

  const filteredTransactions = transactions.filter(txn => {
    const matchesType = filterType === "all" || txn.type === filterType
    const matchesStatus = filterStatus === "all" || txn.status === filterStatus
    const matchesSearch = searchQuery === "" || 
      txn.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.cause.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.id.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesStatus && matchesSearch
  })

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
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        
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
            My Contributions
          </h1>
          <p className={`text-lg ${
            darkMode ? "text-zinc-400" : "text-gray-600"
          }`}>
            Track your impact and donation history
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Amount Donated */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
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
                Total Amount
              </p>
              <p className={`text-3xl font-bold ${
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
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`p-6 rounded-2xl border relative overflow-hidden ${
              darkMode 
                ? "bg-zinc-800/50 border-zinc-700" 
                : "bg-white border-gray-200 shadow-lg"
            }`}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/10 rounded-full -mr-12 -mt-12" />
            <div className="relative">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                darkMode ? "bg-teal-500/20" : "bg-teal-100"
              }`}>
                <Heart className="w-6 h-6 text-teal-600" />
              </div>
              <p className={`text-sm font-medium mb-1 ${
                darkMode ? "text-zinc-400" : "text-gray-600"
              }`}>
                Total Donations
              </p>
              <p className={`text-3xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}>
                {donationStats.totalDonations}
              </p>
              <p className={`text-xs mt-2 ${
                darkMode ? "text-zinc-500" : "text-gray-500"
              }`}>
                Across all categories
              </p>
            </div>
          </motion.div>

          {/* Blood Donations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`p-6 rounded-2xl border relative overflow-hidden ${
              darkMode 
                ? "bg-zinc-800/50 border-zinc-700" 
                : "bg-white border-gray-200 shadow-lg"
            }`}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-full -mr-12 -mt-12" />
            <div className="relative">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                darkMode ? "bg-red-500/20" : "bg-red-100"
              }`}>
                <Droplet className="w-6 h-6 text-red-600" />
              </div>
              <p className={`text-sm font-medium mb-1 ${
                darkMode ? "text-zinc-400" : "text-gray-600"
              }`}>
                Blood Donations
              </p>
              <p className={`text-3xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}>
                {donationStats.bloodDonations}
              </p>
              <p className={`text-xs mt-2 ${
                darkMode ? "text-zinc-500" : "text-gray-500"
              }`}>
                Lives potentially saved
              </p>
            </div>
          </motion.div>

          {/* Other Donations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className={`p-6 rounded-2xl border relative overflow-hidden ${
              darkMode 
                ? "bg-zinc-800/50 border-zinc-700" 
                : "bg-white border-gray-200 shadow-lg"
            }`}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full -mr-12 -mt-12" />
            <div className="relative">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                darkMode ? "bg-orange-500/20" : "bg-orange-100"
              }`}>
                <Heart className="w-6 h-6 text-orange-600" />
              </div>
              <p className={`text-sm font-medium mb-1 ${
                darkMode ? "text-zinc-400" : "text-gray-600"
              }`}>
                In-Kind Donations
              </p>
              <p className={`text-3xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}>
                {donationStats.foodDonations + donationStats.otherDonations}
              </p>
              <p className={`text-xs mt-2 ${
                darkMode ? "text-zinc-500" : "text-gray-500"
              }`}>
                Food, supplies & more
              </p>
            </div>
          </motion.div>
        </div>

        {/* Transaction History Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className={`text-2xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}>
                Transaction History
              </h2>
              <button className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 w-fit ${
                darkMode
                  ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                  : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
              }`}>
                <Download className="w-4 h-4" />
                Export Report
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

              {/* Type Filter */}
              <div className="relative">
                <Filter className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                  darkMode ? "text-zinc-500" : "text-gray-400"
                }`} />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className={`pl-11 pr-8 py-2.5 rounded-lg border outline-none transition-all appearance-none cursor-pointer ${
                    darkMode
                      ? "bg-zinc-700 border-zinc-600 text-white focus:border-emerald-500"
                      : "bg-gray-50 border-gray-200 text-gray-900 focus:border-emerald-500"
                  }`}
                >
                  <option value="all">All Types</option>
                  <option value="money">Money</option>
                  <option value="blood">Blood</option>
                  <option value="food">Food</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className={`px-4 py-2.5 rounded-lg border outline-none transition-all appearance-none cursor-pointer ${
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

          {/* Transaction List */}
          <div className="divide-y divide-zinc-700">
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
                  No transactions found
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
                const StatusIcon = getStatusIcon(txn.status)
                const typeColor = getTypeColor(txn.type)
                const statusColor = getStatusColor(txn.status)

                return (
                  <motion.div
                    key={txn.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`p-6 hover:bg-opacity-50 transition-all cursor-pointer ${
                      darkMode ? "hover:bg-zinc-700/30" : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        darkMode 
                          ? `bg-${typeColor}-500/20` 
                          : `bg-${typeColor}-100`
                      }`}>
                        <TypeIcon className={`w-6 h-6 text-${typeColor}-600`} />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex-1 min-w-0">
                            <h3 className={`font-semibold text-lg mb-1 ${
                              darkMode ? "text-white" : "text-gray-900"
                            }`}>
                              {txn.recipient}
                            </h3>
                            <p className={`text-sm ${
                              darkMode ? "text-zinc-400" : "text-gray-600"
                            }`}>
                              {txn.cause}
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            {txn.type === "money" && (
                              <p className={`text-xl font-bold ${
                                darkMode ? "text-emerald-400" : "text-emerald-600"
                              }`}>
                                ₹{txn.amount.toLocaleString('en-IN')}
                              </p>
                            )}
                            {txn.type === "blood" && (
                              <div>
                                <p className={`text-lg font-bold ${
                                  darkMode ? "text-red-400" : "text-red-600"
                                }`}>
                                  {txn.units}
                                </p>
                                <p className={`text-xs ${
                                  darkMode ? "text-zinc-500" : "text-gray-500"
                                }`}>
                                  {txn.bloodGroup}
                                </p>
                              </div>
                            )}
                            {txn.type === "food" && (
                              <p className={`text-sm font-semibold ${
                                darkMode ? "text-orange-400" : "text-orange-600"
                              }`}>
                                {txn.items}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                          <div className="flex items-center gap-1.5">
                            <Calendar className={`w-4 h-4 ${
                              darkMode ? "text-zinc-500" : "text-gray-400"
                            }`} />
                            <span className={darkMode ? "text-zinc-400" : "text-gray-600"}>
                              {new Date(txn.date).toLocaleDateString('en-IN', { 
                                day: 'numeric', 
                                month: 'short', 
                                year: 'numeric' 
                              })} • {txn.time}
                            </span>
                          </div>

                          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${
                            darkMode 
                              ? `bg-${statusColor}-500/20` 
                              : `bg-${statusColor}-100`
                          }`}>
                            <StatusIcon className={`w-4 h-4 text-${statusColor}-600`} />
                            <span className={`text-xs font-medium text-${statusColor}-600 capitalize`}>
                              {txn.status}
                            </span>
                          </div>

                          {txn.paymentMethod && (
                            <span className={`text-xs ${
                              darkMode ? "text-zinc-500" : "text-gray-500"
                            }`}>
                              via {txn.paymentMethod}
                            </span>
                          )}

                          {txn.location && (
                            <span className={`text-xs ${
                              darkMode ? "text-zinc-500" : "text-gray-500"
                            }`}>
                              {txn.location}
                            </span>
                          )}
                        </div>

                        {/* Transaction ID */}
                        <div className={`mt-3 pt-3 border-t ${
                          darkMode ? "border-zinc-700" : "border-gray-200"
                        }`}>
                          <div className="flex items-center justify-between">
                            <span className={`text-xs font-mono ${
                              darkMode ? "text-zinc-500" : "text-gray-500"
                            }`}>
                              ID: {txn.id}
                            </span>
                            <button className={`text-xs font-medium flex items-center gap-1 ${
                              darkMode ? "text-emerald-400 hover:text-emerald-300" : "text-emerald-600 hover:text-emerald-700"
                            }`}>
                              View Details
                              <ArrowUpRight className="w-3 h-3" />
                            </button>
                          </div>
                          {txn.transactionId && (
                            <span className={`text-xs ${
                              darkMode ? "text-zinc-600" : "text-gray-400"
                            }`}>
                              {txn.transactionId}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })
            )}
          </div>
        </motion.div>
      </div>

      <Footer darkMode={darkMode} />
    </div>
  )
}