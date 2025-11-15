"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { 
  Heart,
  TrendingUp,
  Clock,
  Users,
  Target,
  Share2,
  Edit,
  Trash2,
  BookmarkPlus,
  Bookmark,
  Eye,
  Calendar,
  DollarSign,
  IndianRupee
} from "lucide-react"

export default function MyCampaignsPage({ darkModeFromParent }) {
  const [darkMode, setDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState("wishlist")

  // Sync with parent dark mode
  useEffect(() => {
    if (darkModeFromParent !== undefined) {
      setDarkMode(darkModeFromParent)
    }
  }, [darkModeFromParent])

  // Mock user data
  const currentUser = {
    name: "Ahmed",
    totalCampaigns: 3,
    totalWishlisted: 5
  }

  // Mock campaigns created by user
  const myCampaigns = [
    {
      id: 1,
      title: "Help Build Water Wells in Rural Villages",
      description: "Provide clean drinking water to communities in need. Every contribution helps build sustainable water infrastructure.",
      image: "https://images.unsplash.com/photo-1541844053589-346841d0b34c?w=800&q=80",
      goalAmount: 50000,
      raisedAmount: 32500,
      donors: 127,
      daysLeft: 15,
      category: "Water & Sanitation",
      status: "active",
      createdDate: "2024-01-10",
      views: 1240
    },
    {
      id: 2,
      title: "Emergency Medical Fund for Cancer Patients",
      description: "Support cancer patients who cannot afford their treatment. Your donation can save lives.",
      image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&q=80",
      goalAmount: 100000,
      raisedAmount: 78000,
      donors: 234,
      daysLeft: 8,
      category: "Healthcare",
      status: "active",
      createdDate: "2024-01-05",
      views: 2340
    },
    {
      id: 3,
      title: "School Supplies for Underprivileged Children",
      description: "Ensure every child has the tools they need to learn and succeed in their education.",
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80",
      goalAmount: 25000,
      raisedAmount: 25000,
      donors: 98,
      daysLeft: 0,
      category: "Education",
      status: "completed",
      createdDate: "2023-12-15",
      views: 890
    }
  ]

  // Mock wishlisted campaigns
  const wishlistedCampaigns = [
    {
      id: 4,
      title: "Food Distribution for Homeless Shelters",
      description: "Help provide nutritious meals to homeless individuals and families in our community.",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
      goalAmount: 40000,
      raisedAmount: 28000,
      donors: 156,
      daysLeft: 20,
      category: "Food Security",
      organizer: "Community Kitchen Foundation",
      wishlistedDate: "2024-01-12"
    },
    {
      id: 5,
      title: "Animal Rescue and Rehabilitation Center",
      description: "Support our efforts to rescue, rehabilitate, and rehome abandoned and injured animals.",
      image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&q=80",
      goalAmount: 75000,
      raisedAmount: 45000,
      donors: 189,
      daysLeft: 25,
      category: "Animal Welfare",
      organizer: "Paws & Hearts Rescue",
      wishlistedDate: "2024-01-08"
    },
    {
      id: 6,
      title: "Rebuild Homes After Natural Disaster",
      description: "Help families rebuild their lives after devastating floods destroyed their homes.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      goalAmount: 150000,
      raisedAmount: 95000,
      donors: 412,
      daysLeft: 12,
      category: "Emergency Relief",
      organizer: "Disaster Response Team",
      wishlistedDate: "2024-01-06"
    },
    {
      id: 7,
      title: "Women's Skill Development Program",
      description: "Empower women with vocational training and resources to become financially independent.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
      goalAmount: 60000,
      raisedAmount: 42000,
      donors: 167,
      daysLeft: 18,
      category: "Women Empowerment",
      organizer: "Women Rising Initiative",
      wishlistedDate: "2024-01-03"
    },
    {
      id: 8,
      title: "Plant 10,000 Trees for Climate Action",
      description: "Join us in our mission to combat climate change by planting trees across urban and rural areas.",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
      goalAmount: 35000,
      raisedAmount: 31000,
      donors: 203,
      daysLeft: 10,
      category: "Environment",
      organizer: "Green Earth Collective",
      wishlistedDate: "2023-12-28"
    }
  ]

  const getStatusBadge = (status) => {
    const styles = {
      active: darkMode 
        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" 
        : "bg-emerald-100 text-emerald-700 border-emerald-200",
      completed: darkMode
        ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
        : "bg-blue-100 text-blue-700 border-blue-200"
    }

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}>
        {status === "active" ? "Active" : "Completed"}
      </span>
    )
  }

  const calculateProgress = (raised, goal) => {
    return Math.min((raised / goal) * 100, 100)
  }

  const CampaignCard = ({ campaign, isMyCampaign = false }) => {
    const progress = calculateProgress(campaign.raisedAmount, campaign.goalAmount)

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`rounded-xl sm:rounded-2xl overflow-hidden border ${
          darkMode
            ? "bg-zinc-800/50 border-zinc-700 hover:border-emerald-500/50"
            : "bg-white border-gray-200 hover:border-emerald-500/50 shadow-lg"
        } transition-all hover:shadow-xl`}
      >
        {/* Image */}
        <div className="relative h-40 sm:h-48 overflow-hidden">
          <img 
            src={campaign.image} 
            alt={campaign.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
            {isMyCampaign ? (
              getStatusBadge(campaign.status)
            ) : (
              <button className={`p-1.5 sm:p-2 rounded-full ${
                darkMode ? "bg-zinc-900/80" : "bg-white/80"
              } backdrop-blur-sm hover:scale-110 transition-transform`}>
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 fill-rose-500" />
              </button>
            )}
          </div>
          <div className={`absolute top-2 sm:top-3 left-2 sm:left-3 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold ${
            darkMode
              ? "bg-zinc-900/80 text-white"
              : "bg-white/80 text-gray-900"
          } backdrop-blur-sm`}>
            {campaign.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 lg:p-6">
          <h3 className={`text-base sm:text-lg lg:text-xl font-bold mb-1.5 sm:mb-2 line-clamp-2 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}>
            {campaign.title}
          </h3>
          
          <p className={`text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 ${
            darkMode ? "text-zinc-400" : "text-gray-600"
          }`}>
            {campaign.description}
          </p>

          {!isMyCampaign && campaign.organizer && (
            <p className={`text-xs sm:text-sm mb-3 sm:mb-4 ${
              darkMode ? "text-zinc-500" : "text-gray-500"
            }`}>
              by <span className="font-semibold">{campaign.organizer}</span>
            </p>
          )}

          {/* Progress Bar */}
          <div className="mb-3 sm:mb-4">
            <div className="flex justify-between items-center mb-1.5 sm:mb-2">
              <span className={`text-xs sm:text-sm font-semibold ${
                darkMode ? "text-zinc-300" : "text-gray-700"
              }`}>
                ₹{campaign.raisedAmount.toLocaleString()}
              </span>
              <span className={`text-xs ${
                darkMode ? "text-zinc-500" : "text-gray-500"
              }`}>
                of ₹{campaign.goalAmount.toLocaleString()}
              </span>
            </div>
            <div className={`h-1.5 sm:h-2 rounded-full overflow-hidden ${
              darkMode ? "bg-zinc-700" : "bg-gray-200"
            }`}>
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 flex-wrap">
            <div className="flex items-center gap-1">
              <Users className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                darkMode ? "text-zinc-400" : "text-gray-600"
              }`} />
              <span className={`text-xs sm:text-sm ${
                darkMode ? "text-zinc-400" : "text-gray-600"
              }`}>
                {campaign.donors}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                campaign.daysLeft <= 5 ? "text-rose-500" : darkMode ? "text-zinc-400" : "text-gray-600"
              }`} />
              <span className={`text-xs sm:text-sm ${
                campaign.daysLeft <= 5 ? "text-rose-500 font-semibold" : darkMode ? "text-zinc-400" : "text-gray-600"
              }`}>
                {campaign.daysLeft > 0 ? `${campaign.daysLeft}d` : "Ended"}
              </span>
            </div>
            {isMyCampaign && (
              <div className="flex items-center gap-1">
                <Eye className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                  darkMode ? "text-zinc-400" : "text-gray-600"
                }`} />
                <span className={`text-xs sm:text-sm ${
                  darkMode ? "text-zinc-400" : "text-gray-600"
                }`}>
                  {campaign.views}
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {isMyCampaign ? (
            <div className="flex gap-2">
              <button className={`flex-1 py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 sm:gap-2 ${
                darkMode
                  ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                  : "bg-emerald-500 text-white hover:bg-emerald-600"
              }`}>
                <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">View</span>
              </button>
              <button className={`py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg font-semibold transition-all ${
                darkMode
                  ? "bg-zinc-700 text-white hover:bg-zinc-600"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}>
                <Edit className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
              <button className={`py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg font-semibold transition-all ${
                darkMode
                  ? "bg-zinc-700 text-white hover:bg-zinc-600"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}>
                <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button className={`flex-1 py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 sm:gap-2 ${
                darkMode
                  ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                  : "bg-emerald-500 text-white hover:bg-emerald-600"
              }`}>
                <IndianRupee className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Donate
              </button>
              <button className={`py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg font-semibold transition-all ${
                darkMode
                  ? "bg-zinc-700 text-white hover:bg-zinc-600"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}>
                <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          )}
        </div>
      </motion.div>
    )
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
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-20 pb-16 sm:pb-20 lg:pb-24">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`mb-6 sm:mb-8 rounded-xl sm:rounded-2xl overflow-hidden relative ${
            darkMode 
              ? "bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border border-emerald-700/30" 
              : "bg-gradient-to-br from-emerald-600 to-teal-600 shadow-xl"
          }`}
        >
          <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 bg-white/5 rounded-full -mr-16 sm:-mr-24 -mt-16 sm:-mt-24 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-28 h-28 sm:w-40 sm:h-40 bg-white/5 rounded-full -ml-14 sm:-ml-20 -mb-14 sm:-mb-20 blur-2xl" />
          
          <div className="relative p-4 sm:p-6 md:p-8">
            <div className="flex flex-col gap-4">
              <div className="flex-1">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 text-white">
                  My Campaigns
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-white/90">
                  Manage your campaigns and track your wishlisted causes
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <div className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full ${
                  darkMode ? "bg-white/10" : "bg-white/20"
                } backdrop-blur-sm`}>
                  <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300" />
                  <span className="font-semibold text-xs sm:text-sm text-white">
                    {currentUser.totalCampaigns} Campaigns
                  </span>
                </div>
                <div className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full ${
                  darkMode ? "bg-white/10" : "bg-white/20"
                } backdrop-blur-sm`}>
                  <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-300" />
                  <span className="font-semibold text-xs sm:text-sm text-white">
                    {currentUser.totalWishlisted} Wishlisted
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6 sm:mb-8 overflow-x-auto"
        >
          <div className={`inline-flex w-full sm:w-auto rounded-lg sm:rounded-xl p-1 ${
            darkMode ? "bg-zinc-800/50" : "bg-white shadow-md"
          }`}>
            <button
              onClick={() => setActiveTab("wishlist")}
              className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-3 rounded-md sm:rounded-lg font-semibold text-xs sm:text-sm md:text-base transition-all whitespace-nowrap ${
                activeTab === "wishlist"
                  ? darkMode
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-emerald-500 text-white"
                  : darkMode
                    ? "text-zinc-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Wishlist ({wishlistedCampaigns.length})
            </button>
            <button
              onClick={() => setActiveTab("my-campaigns")}
              className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-3 rounded-md sm:rounded-lg font-semibold text-xs sm:text-sm md:text-base transition-all whitespace-nowrap ${
                activeTab === "my-campaigns"
                  ? darkMode
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-emerald-500 text-white"
                  : darkMode
                    ? "text-zinc-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
              }`}
            >
              My Campaigns ({myCampaigns.length})
            </button>
            
          </div>
        </motion.div>

        {/* Content */}
        {activeTab === "my-campaigns" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {myCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} isMyCampaign={true} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {wishlistedCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} isMyCampaign={false} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {activeTab === "my-campaigns" && myCampaigns.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-center py-12 sm:py-16 lg:py-20 rounded-xl sm:rounded-2xl ${
              darkMode ? "bg-zinc-800/50" : "bg-white shadow-lg"
            }`}
          >
            <Target className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 ${
              darkMode ? "text-zinc-600" : "text-gray-400"
            }`} />
            <h3 className={`text-lg sm:text-xl font-bold mb-2 px-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}>
              No campaigns yet
            </h3>
            <p className={`mb-4 sm:mb-6 text-sm sm:text-base px-4 ${
              darkMode ? "text-zinc-400" : "text-gray-600"
            }`}>
              Start creating campaigns to make a difference
            </p>
            <button className={`px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all ${
              darkMode
                ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                : "bg-emerald-500 text-white hover:bg-emerald-600"
            }`}>
              Create Campaign
            </button>
          </motion.div>
        )}

        {activeTab === "wishlist" && wishlistedCampaigns.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-center py-12 sm:py-16 lg:py-20 rounded-xl sm:rounded-2xl ${
              darkMode ? "bg-zinc-800/50" : "bg-white shadow-lg"
            }`}
          >
            <Heart className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 ${
              darkMode ? "text-zinc-600" : "text-gray-400"
            }`} />
            <h3 className={`text-lg sm:text-xl font-bold mb-2 px-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}>
              No wishlisted campaigns
            </h3>
            <p className={`text-sm sm:text-base px-4 ${
              darkMode ? "text-zinc-400" : "text-gray-600"
            }`}>
              Start saving campaigns you care about
            </p>
          </motion.div>
        )}

      </div>
    </div>
  )
}