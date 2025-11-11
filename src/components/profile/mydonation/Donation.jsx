"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { 
  Heart, 
  Wallet,
  TrendingUp,
  Trophy,
  Users,
  Target,
  Download,
  FileText,
  Calendar
} from "lucide-react"
import DonationStats from "./DonationStats"
import DonationHistory from "./DonationHistory"
import RealWorldImpact from "./RealWorldImpact"

export default function DonationsPage({ darkModeFromParent }) {
  const [darkMode, setDarkMode] = useState(false)
  const [filterStatus, setFilterStatus] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [filter80G, setFilter80G] = useState(false)
  const [selectedYear, setSelectedYear] = useState("2024-25")
  const [dateRange, setDateRange] = useState({ start: "", end: "" })

  // Sync with parent dark mode
  useEffect(() => {
    if (darkModeFromParent !== undefined) {
      setDarkMode(darkModeFromParent)
    }
  }, [darkModeFromParent])

  // Mock user data
  const currentUser = {
    name: "Ahmed",
    rank: 15,
    weeklyDonation: 8500
  }

  // Mock leaderboard data
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

  // Transaction history with 80G eligibility
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
      color: "blue",
      eligible80G: true,
      financialYear: "2024-25"
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
      color: "purple",
      eligible80G: true,
      financialYear: "2024-25"
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
      color: "green",
      eligible80G: false,
      financialYear: "2023-24"
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
      color: "pink",
      eligible80G: true,
      financialYear: "2023-24"
    },
    {
      id: "TXN123456783",
      date: "2023-11-15",
      time: "12:20",
      type: "money",
      amount: 7500,
      recipient: "Medical Emergency Fund",
      cause: "Healthcare",
      status: "completed",
      paymentMethod: "UPI",
      color: "red",
      eligible80G: true,
      financialYear: "2023-24"
    },
    {
      id: "TXN123456782",
      date: "2023-10-10",
      time: "09:45",
      type: "money",
      amount: 12000,
      recipient: "Community Kitchen",
      cause: "Food Security",
      status: "completed",
      paymentMethod: "Net Banking",
      color: "orange",
      eligible80G: true,
      financialYear: "2023-24"
    },
    {
      id: "TXN123456781",
      date: "2023-05-20",
      time: "14:30",
      type: "money",
      amount: 8000,
      recipient: "Disaster Relief Fund",
      cause: "Emergency Relief",
      status: "completed",
      paymentMethod: "UPI",
      color: "red",
      eligible80G: true,
      financialYear: "2023-24"
    },
    {
      id: "TXN123456780",
      date: "2022-12-15",
      time: "10:20",
      type: "money",
      amount: 6000,
      recipient: "School Construction",
      cause: "Education",
      status: "completed",
      paymentMethod: "Card",
      color: "purple",
      eligible80G: true,
      financialYear: "2022-23"
    }
  ]

  const getRankIcon = (rank) => {
    if (rank === 1) return "🥇"
    if (rank === 2) return "🥈"
    if (rank === 3) return "🥉"
    return null
  }

  // Financial years for receipt download
  const financialYears = [
    { value: "2024-25", label: "FY 2024-25", start: "2024-04-01", end: "2025-03-31" },
    { value: "2023-24", label: "FY 2023-24", start: "2023-04-01", end: "2024-03-31" },
    { value: "2022-23", label: "FY 2022-23", start: "2022-04-01", end: "2023-03-31" }
  ]

  // Calculate 80G totals by year
  const calculate80GTotals = (year) => {
    const yearTransactions = transactions.filter(
      txn => txn.eligible80G && txn.financialYear === year
    )
    const total = yearTransactions.reduce((sum, txn) => sum + txn.amount, 0)
    const count = yearTransactions.length
    return { total, count }
  }

  const handleDownloadReceipt = (year) => {
    console.log(`Downloading 80G receipt for ${year}`)
    // Implement download logic
  }

  const handleDownloadInvoice = () => {
    console.log(`Downloading invoice for date range: ${dateRange.start} to ${dateRange.end}`)
    // Implement invoice download logic
  }

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
        <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-20 pb-24">
        
        {/* Greeting Section */}
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
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-24 -mt-24 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full -ml-20 -mb-20 blur-2xl" />
          
          <div className="relative p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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

        {/* Stats and Leaderboard */}
        <DonationStats 
          darkMode={darkMode}
          donationStats={donationStats}
          currentUser={currentUser}
          leaderboardData={leaderboardData}
          getRankIcon={getRankIcon}
        />

        {/* 80G Receipt Download Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
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
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  darkMode ? "bg-emerald-500/20" : "bg-emerald-100"
                }`}>
                  <FileText className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h2 className={`text-2xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}>
                    80G Tax Receipts
                  </h2>
                  <p className={`text-sm ${
                    darkMode ? "text-zinc-400" : "text-gray-600"
                  }`}>
                    Download consolidated receipts for tax filing
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {financialYears.map((year) => {
                  return (
                    <motion.div
                      key={year.value}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`p-5 rounded-xl border ${
                        darkMode
                          ? "bg-zinc-900/50 border-zinc-700 hover:border-emerald-500/50"
                          : "bg-gray-50 border-gray-200 hover:border-emerald-500/50"
                      } transition-all`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className={`font-bold text-lg ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}>
                          {year.label}
                        </h3>
                        <div className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                          darkMode
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-emerald-100 text-emerald-700"
                        }`}>
                          80G
                        </div>
                      </div>

                      <button
                        onClick={() => handleDownloadReceipt(year.value)}
                        className={`w-full py-2.5 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                          darkMode
                            ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                            : "bg-emerald-500 text-white hover:bg-emerald-600"
                        }`}
                      >
                        <Download className="w-4 h-4" />
                        Download Receipt
                      </button>
                    </motion.div>
                  )
                })}
              </div>

              {/* Info Note */}
              <div className={`mt-6 p-4 rounded-xl border ${
                darkMode
                  ? "bg-blue-950/20 border-blue-900/30"
                  : "bg-blue-50 border-blue-200"
              }`}>
                <p className={`text-sm ${darkMode ? "text-blue-300" : "text-blue-900"}`}>
                  <strong>Note:</strong> Only donations eligible for 80G tax deductions are included in these receipts. 
                  Receipts are available for completed financial years and the current ongoing year.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Donation History */}
        <DonationHistory 
          darkMode={darkMode}
          transactions={transactions}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filter80G={filter80G}
          setFilter80G={setFilter80G}
          dateRange={dateRange}
          setDateRange={setDateRange}
          handleDownloadInvoice={handleDownloadInvoice}
        />

        {/* Real World Impact */}
        <RealWorldImpact darkMode={darkMode} />

      </div>

    </div>
  )
}