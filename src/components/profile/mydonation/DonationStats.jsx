"use client"

import { motion } from "framer-motion"
import { 
  Wallet,
  Heart,
  Target,
  Users,
  TrendingUp,
  Trophy,
  Star
} from "lucide-react"

export default function DonationStats({ 
  darkMode, 
  donationStats, 
  currentUser, 
  leaderboardData,
  getRankIcon 
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      
      {/* Left Column - Stats Cards */}
      <div className="lg:col-span-2 flex flex-col">
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

          {/* Current User Rank */}
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

          {/* Scrollable Leaderboard */}
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
  )
}