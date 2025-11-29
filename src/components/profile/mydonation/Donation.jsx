"use client"
import { useSelector } from "react-redux"
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
  const userInfo = useSelector((state)=> state.auth.userInfo || [])
  const [darkMode, setDarkMode] = useState(false)
  const [filterStatus, setFilterStatus] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [filter80G, setFilter80G] = useState(false)
  const [selectedYear, setSelectedYear] = useState("2024-25")
  const [dateRange, setDateRange] = useState({ start: "", end: "" })
  const [leaderboardPeriod, setLeaderboardPeriod] = useState("weekly")
  const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);


  // Sync with parent dark mode
  useEffect(() => {
    if (darkModeFromParent !== undefined) {
      setDarkMode(darkModeFromParent)
    }
  }, [darkModeFromParent])

  // Mock user data
  const currentUser = {
    name: userInfo.fullName,
    rank: userInfo?.rank || 0,
    weeklyDonation: userInfo?.weeklyDonation || 0
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

  const donationStats = {
    totalAmount: userInfo?.donations?.totalAmount || 0,
    totalZakat: userInfo?.donations?.totalZakat || 0,
    campaignsSupported: userInfo?.donations?.campaignsSupported || 0,
  };

  // Transaction history with 80G eligibility

  const transactions = userInfo?.donations?.history || [];

  const getRankIcon = (rank) => {
    if (rank === 1) return "🥇"
    if (rank === 2) return "🥈"
    if (rank === 3) return "🥉"
    return null
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
          className={`absolute inset-0 ${darkMode
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
          className={`mb-6 rounded-2xl overflow-hidden relative ${darkMode
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
                 {mounted && (
  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-white flex items-center gap-2">
    Salam, {currentUser.name}! <span className="text-4xl">🤲</span>
  </h1>
)}

                  <p className="text-sm md:text-base mb-3 text-white/90">
                    Your generosity is making a real difference in people's lives
                  </p>
                </motion.div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${darkMode ? "bg-white/10" : "bg-white/20"
                  } backdrop-blur-sm`}>
                  <Trophy className="w-4 h-4 text-amber-300" />
                  <span className="font-semibold text-sm text-white">
                    Rank #{currentUser.rank}
                  </span>
                </div>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${darkMode ? "bg-white/10" : "bg-white/20"
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
          monthlyData={leaderboardData}
          yearlyData={leaderboardData}
          getRankIcon={getRankIcon}
          leaderboardPeriod={leaderboardPeriod}
          setLeaderboardPeriod={setLeaderboardPeriod}
        />

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