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
  Sparkles,
  TreePine,
  Home,
  Target,
  Award,
  Users,
  Gift,
  Star,
  Flame,
  BookOpen,
  Crown
} from "lucide-react"

export default function DonationsPage({ darkModeFromParent }) {
  const [darkMode, setDarkMode] = useState(false)
  const [filterType, setFilterType] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showIntentionModal, setShowIntentionModal] = useState(false)

  useEffect(() => {
    if (darkModeFromParent !== undefined) {
      setDarkMode(darkModeFromParent)
    }
  }, [darkModeFromParent])

  // Mock user data
  const userData = {
    name: "Ahmed",
    jannahPoints: 1250,
    totalAmount: 125000,
    totalDonations: 24,
    consistencyDays: 45,
    rank: 12,
    percentile: 5,
    gardenLevel: 3,
    intentions: [
      "For my parents' forgiveness",
      "For barakah in business",
      "For helping orphans"
    ],
    lastIntention: "For helping orphans",
    milestones: {
      nextMilestone: 150000,
      progress: 83.33
    }
  }

  const hadithOfTheDay = {
    text: "Charity does not decrease wealth.",
    reference: "Sahih Muslim 2588"
  }

  const recentImpact = [
    { icon: "🍽️", text: "Provided 45 meals", color: "orange" },
    { icon: "📚", text: "Helped 12 children study", color: "blue" },
    { icon: "💧", text: "Clean water for 8 families", color: "cyan" },
    { icon: "🏥", text: "Medical aid for 3 patients", color: "red" }
  ]

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
      jannahReward: "A golden brick added to your palace!",
      realImpact: "Provided clean water for 2 families"
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
      location: "Central Hospital",
      jannahReward: "A tree planted in your Jannah garden!",
      realImpact: "Saved 1 life"
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
      jannahReward: "A fountain added to your palace!",
      realImpact: "Educated 5 children for a month"
    }
  ]

  const leaderboard = [
    { rank: 1, name: "Anonymous Angel", streak: 89, donations: 156, badge: "👑" },
    { rank: 2, name: "Fatima K.", streak: 67, donations: 134, badge: "⭐" },
    { rank: 3, name: "You", streak: 45, donations: 24, badge: "🔥", highlight: true }
  ]

  return (
    <div className={`min-h-screen ${darkMode ? "bg-zinc-900" : "bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50"}`}>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className={`absolute inset-0 ${
          darkMode 
            ? "bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.1),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(20,184,166,0.1),transparent_50%)]"
            : "bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.2),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(20,184,166,0.2),transparent_50%)]"
        }`} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24">
        
        {/* Warm Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-8 p-6 sm:p-8 rounded-3xl border-2 ${
            darkMode 
              ? "bg-gradient-to-br from-emerald-900/30 to-teal-900/30 border-emerald-700/50" 
              : "bg-gradient-to-br from-white to-emerald-50/50 border-emerald-200 shadow-xl"
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-3xl flex-shrink-0">
              🌟
            </div>
            <div className="flex-1">
              <h1 className={`text-2xl sm:text-3xl font-bold mb-2 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}>
                As-salamu alaykum, {userData.name}! 💚
              </h1>
              <p className={`text-base sm:text-lg mb-3 ${
                darkMode ? "text-emerald-300" : "text-emerald-700"
              }`}>
                May Allah accept your generous contributions and multiply your rewards.
              </p>
              <div className={`flex flex-wrap items-center gap-3 text-sm ${
                darkMode ? "text-zinc-300" : "text-gray-700"
              }`}>
                <span className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <strong>{userData.consistencyDays} days</strong> streak
                </span>
                <span className="text-zinc-500">•</span>
                <span className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-yellow-500" />
                  Top <strong>{userData.percentile}%</strong> of givers
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Jannah Progress Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`mb-8 p-6 sm:p-8 rounded-3xl border-2 relative overflow-hidden ${
            darkMode 
              ? "bg-gradient-to-br from-zinc-800 to-zinc-900 border-zinc-700" 
              : "bg-gradient-to-br from-white to-amber-50/50 border-amber-200 shadow-xl"
          }`}
        >
          <div className="absolute top-0 right-0 text-8xl opacity-10">🏰</div>
          
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <Home className={`w-8 h-8 ${darkMode ? "text-amber-400" : "text-amber-600"}`} />
              <h2 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                Your Palace in Jannah
              </h2>
              <span className={`ml-auto px-4 py-1.5 rounded-full text-sm font-bold ${
                darkMode ? "bg-amber-500/20 text-amber-300" : "bg-amber-100 text-amber-700"
              }`}>
                Level {userData.gardenLevel}
              </span>
            </div>

            {/* Garden Progress */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className={`p-4 rounded-2xl text-center ${
                darkMode ? "bg-zinc-700/50" : "bg-emerald-50"
              }`}>
                <div className="text-4xl mb-2">🌳</div>
                <p className={`text-sm font-medium ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                  12 Trees
                </p>
              </div>
              <div className={`p-4 rounded-2xl text-center ${
                darkMode ? "bg-zinc-700/50" : "bg-blue-50"
              }`}>
                <div className="text-4xl mb-2">⛲</div>
                <p className={`text-sm font-medium ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                  3 Fountains
                </p>
              </div>
              <div className={`p-4 rounded-2xl text-center ${
                darkMode ? "bg-zinc-700/50" : "bg-yellow-50"
              }`}>
                <div className="text-4xl mb-2">🧱</div>
                <p className={`text-sm font-medium ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                  24 Bricks
                </p>
              </div>
              <div className={`p-4 rounded-2xl text-center ${
                darkMode ? "bg-zinc-700/50" : "bg-purple-50"
              }`}>
                <div className="text-4xl mb-2">🌺</div>
                <p className={`text-sm font-medium ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                  8 Gardens
                </p>
              </div>
            </div>

            <div className={`p-5 rounded-2xl border-l-4 border-amber-500 ${
              darkMode ? "bg-amber-500/10" : "bg-amber-50"
            }`}>
              <p className={`text-sm font-semibold mb-1 ${
                darkMode ? "text-amber-300" : "text-amber-800"
              }`}>
                Latest Addition:
              </p>
              <p className={`text-base ${darkMode ? "text-white" : "text-gray-900"}`}>
                ✨ A golden brick has been added to your palace in Jannah!
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {/* Jannah Points */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className={`p-6 rounded-2xl border-2 relative overflow-hidden ${
              darkMode 
                ? "bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-700/50" 
                : "bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-lg"
            }`}
          >
            <div className="absolute top-0 right-0 text-6xl opacity-10">⭐</div>
            <Sparkles className={`w-10 h-10 mb-3 ${darkMode ? "text-purple-400" : "text-purple-600"}`} />
            <p className={`text-sm font-medium mb-1 ${darkMode ? "text-purple-300" : "text-purple-700"}`}>
              Jannah Points
            </p>
            <p className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
              {userData.jannahPoints}
            </p>
          </motion.div>

          {/* Total Amount */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
            className={`p-6 rounded-2xl border-2 relative overflow-hidden ${
              darkMode 
                ? "bg-gradient-to-br from-emerald-900/30 to-teal-900/30 border-emerald-700/50" 
                : "bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 shadow-lg"
            }`}
          >
            <div className="absolute top-0 right-0 text-6xl opacity-10">💰</div>
            <Wallet className={`w-10 h-10 mb-3 ${darkMode ? "text-emerald-400" : "text-emerald-600"}`} />
            <p className={`text-sm font-medium mb-1 ${darkMode ? "text-emerald-300" : "text-emerald-700"}`}>
              Total Donated
            </p>
            <p className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
              ₹{userData.totalAmount.toLocaleString('en-IN')}
            </p>
          </motion.div>

          {/* Consistency */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className={`p-6 rounded-2xl border-2 relative overflow-hidden ${
              darkMode 
                ? "bg-gradient-to-br from-orange-900/30 to-red-900/30 border-orange-700/50" 
                : "bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 shadow-lg"
            }`}
          >
            <div className="absolute top-0 right-0 text-6xl opacity-10">🔥</div>
            <Flame className={`w-10 h-10 mb-3 ${darkMode ? "text-orange-400" : "text-orange-600"}`} />
            <p className={`text-sm font-medium mb-1 ${darkMode ? "text-orange-300" : "text-orange-700"}`}>
              Consistency Streak
            </p>
            <p className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
              {userData.consistencyDays} days
            </p>
          </motion.div>

          {/* Rank */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35 }}
            className={`p-6 rounded-2xl border-2 relative overflow-hidden ${
              darkMode 
                ? "bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-700/50" 
                : "bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 shadow-lg"
            }`}
          >
            <div className="absolute top-0 right-0 text-6xl opacity-10">🏆</div>
            <Award className={`w-10 h-10 mb-3 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
            <p className={`text-sm font-medium mb-1 ${darkMode ? "text-blue-300" : "text-blue-700"}`}>
              Your Rank
            </p>
            <p className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
              #{userData.rank}
            </p>
          </motion.div>
        </div>

        {/* Real Impact Mirror */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`mb-8 p-6 sm:p-8 rounded-3xl border-2 ${
            darkMode 
              ? "bg-gradient-to-br from-zinc-800 to-zinc-900 border-zinc-700" 
              : "bg-white border-gray-200 shadow-xl"
          }`}
        >
          <div className="flex items-center gap-3 mb-6">
            <Heart className={`w-8 h-8 ${darkMode ? "text-rose-400" : "text-rose-600"}`} />
            <h2 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
              Your Real-World Impact
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentImpact.map((impact, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className={`p-5 rounded-2xl border ${
                  darkMode ? "bg-zinc-700/50 border-zinc-600" : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="text-4xl mb-3">{impact.icon}</div>
                <p className={`text-sm font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {impact.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Hadith of the Day */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={`mb-8 p-6 sm:p-8 rounded-3xl border-2 relative overflow-hidden ${
            darkMode 
              ? "bg-gradient-to-br from-teal-900/30 to-emerald-900/30 border-teal-700/50" 
              : "bg-gradient-to-br from-teal-50 to-emerald-50 border-teal-200 shadow-xl"
          }`}
        >
          <div className="absolute top-4 right-4 text-6xl opacity-10">📖</div>
          <BookOpen className={`w-8 h-8 mb-4 ${darkMode ? "text-teal-400" : "text-teal-600"}`} />
          <p className={`text-lg sm:text-xl italic mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
            "{hadithOfTheDay.text}"
          </p>
          <p className={`text-sm ${darkMode ? "text-teal-300" : "text-teal-700"}`}>
            — {hadithOfTheDay.reference}
          </p>
        </motion.div>

        {/* Sadaqah Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className={`mb-8 p-6 sm:p-8 rounded-3xl border-2 ${
            darkMode 
              ? "bg-gradient-to-br from-zinc-800 to-zinc-900 border-zinc-700" 
              : "bg-white border-gray-200 shadow-xl"
          }`}
        >
          <div className="flex items-center gap-3 mb-6">
            <Crown className={`w-8 h-8 ${darkMode ? "text-yellow-400" : "text-yellow-600"}`} />
            <h2 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
              Consistency Leaderboard
            </h2>
          </div>

          <div className="space-y-3">
            {leaderboard.map((entry) => (
              <div
                key={entry.rank}
                className={`p-5 rounded-2xl border-2 flex items-center gap-4 ${
                  entry.highlight
                    ? darkMode
                      ? "bg-emerald-500/10 border-emerald-500/50"
                      : "bg-emerald-50 border-emerald-300"
                    : darkMode
                    ? "bg-zinc-700/30 border-zinc-600"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="text-3xl">{entry.badge}</div>
                <div className="flex-1">
                  <p className={`font-bold text-lg ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {entry.name}
                  </p>
                  <p className={`text-sm ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                    {entry.streak} day streak • {entry.donations} donations
                  </p>
                </div>
                <div className={`text-2xl font-bold ${darkMode ? "text-emerald-400" : "text-emerald-600"}`}>
                  #{entry.rank}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className={`rounded-3xl border-2 overflow-hidden ${
            darkMode 
              ? "bg-zinc-800/50 border-zinc-700" 
              : "bg-white border-gray-200 shadow-xl"
          }`}
        >
          <div className={`p-6 border-b ${darkMode ? "border-zinc-700" : "border-gray-200"}`}>
            <h2 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
              Recent Donations
            </h2>
          </div>

          <div className="divide-y divide-zinc-700">
            {transactions.map((txn, index) => (
              <motion.div
                key={txn.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className={`p-6 ${darkMode ? "hover:bg-zinc-700/30" : "hover:bg-gray-50"} transition-all`}
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <h3 className={`font-bold text-lg mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                      {txn.recipient}
                    </h3>
                    <p className={`text-sm mb-3 ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                      {txn.cause}
                    </p>
                    
                    <div className={`p-4 rounded-xl mb-2 ${
                      darkMode ? "bg-amber-500/10" : "bg-amber-50"
                    }`}>
                      <p className={`text-sm font-semibold ${
                        darkMode ? "text-amber-300" : "text-amber-800"
                      }`}>
                        ✨ {txn.jannahReward}
                      </p>
                    </div>
                    
                    <div className={`p-4 rounded-xl ${
                      darkMode ? "bg-emerald-500/10" : "bg-emerald-50"
                    }`}>
                      <p className={`text-sm font-semibold ${
                        darkMode ? "text-emerald-300" : "text-emerald-800"
                      }`}>
                        💚 {txn.realImpact}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right sm:min-w-[120px]">
                    {txn.amount && (
                      <p className={`text-2xl font-bold mb-2 ${
                        darkMode ? "text-emerald-400" : "text-emerald-600"
                      }`}>
                        ₹{txn.amount.toLocaleString('en-IN')}
                      </p>
                    )}
                    <p className={`text-sm ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                      {new Date(txn.date).toLocaleDateString('en-IN', { 
                        day: 'numeric', 
                        month: 'short'
                      })}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}