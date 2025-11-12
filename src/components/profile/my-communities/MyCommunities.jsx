"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { 
  Users,
  Droplet,
  Scale,
  BookOpen,
  Briefcase,
  Search
} from "lucide-react"

export default function MyCommunitiesPage({ darkModeFromParent }) {
  const [darkMode, setDarkMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Sync with parent dark mode
  useEffect(() => {
    if (darkModeFromParent !== undefined) {
      setDarkMode(darkModeFromParent)
    }
  }, [darkModeFromParent])

  // Mock user data
  const currentUser = {
    name: "Ahmed",
    totalCommunities: 2
  }

  // Communities data
  const communities = [
    {
      id: 1,
      name: "Blood Donors",
      icon: Droplet,
      image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=800&q=80",
      color: "rose",
      members: 1243
    },
    {
      id: 2,
      name: "Lawyer",
      icon: Scale,
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
      color: "blue",
      members: 892
    }
  ]

  const getColorClasses = (color, type = "bg") => {
    const colors = {
      rose: {
        bg: darkMode ? "bg-rose-500/20" : "bg-rose-100",
        text: darkMode ? "text-rose-400" : "text-rose-600",
        border: darkMode ? "border-rose-500/30" : "border-rose-200",
        gradient: "from-rose-500 to-pink-500",
        hover: darkMode ? "hover:bg-rose-500/30" : "hover:bg-rose-200"
      },
      blue: {
        bg: darkMode ? "bg-blue-500/20" : "bg-blue-100",
        text: darkMode ? "text-blue-400" : "text-blue-600",
        border: darkMode ? "border-blue-500/30" : "border-blue-200",
        gradient: "from-blue-500 to-cyan-500",
        hover: darkMode ? "hover:bg-blue-500/30" : "hover:bg-blue-200"
      },
      emerald: {
        bg: darkMode ? "bg-emerald-500/20" : "bg-emerald-100",
        text: darkMode ? "text-emerald-400" : "text-emerald-600",
        border: darkMode ? "border-emerald-500/30" : "border-emerald-200",
        gradient: "from-emerald-500 to-teal-500",
        hover: darkMode ? "hover:bg-emerald-500/30" : "hover:bg-emerald-200"
      },
      amber: {
        bg: darkMode ? "bg-amber-500/20" : "bg-amber-100",
        text: darkMode ? "text-amber-400" : "text-amber-600",
        border: darkMode ? "border-amber-500/30" : "border-amber-200",
        gradient: "from-amber-500 to-orange-500",
        hover: darkMode ? "hover:bg-amber-500/30" : "hover:bg-amber-200"
      }
    }
    return colors[color]?.[type] || colors.emerald[type]
  }

  const CommunityCard = ({ community }) => {
    const Icon = community.icon
    const colorClasses = getColorClasses(community.color)

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
        className={`rounded-xl sm:rounded-2xl overflow-hidden border ${
          darkMode
            ? "bg-zinc-800/50 border-zinc-700 hover:border-emerald-500/50"
            : "bg-white border-gray-200 hover:border-emerald-400 shadow-lg hover:shadow-xl"
        } transition-all cursor-pointer`}
      >
        {/* Image */}
        <div className="relative h-40 sm:h-44 md:h-48 lg:h-52 overflow-hidden">
          <img 
            src={community.image} 
            alt={community.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Icon overlay */}
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
            <div className={`p-2 sm:p-2.5 md:p-3 bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-lg`}>
              <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${colorClasses.text}`} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          <h3 className={`text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}>
            {community.name}
          </h3>

          {/* Members Count */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Users className={`w-4 h-4 sm:w-5 sm:h-5 ${darkMode ? "text-zinc-400" : "text-gray-600"}`} />
              <span className={`text-xs sm:text-sm ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                Total Members
              </span>
            </div>
            <span className={`text-xl sm:text-2xl md:text-3xl font-bold ${colorClasses.text}`}>
              {community.members.toLocaleString()}
            </span>
          </div>
        </div>
      </motion.div>
    )
  }

  const filteredCommunities = communities.filter(community =>
    community.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
          <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-white/5 rounded-full -mr-16 sm:-mr-24 md:-mr-32 -mt-16 sm:-mt-24 md:-mt-32 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-white/5 rounded-full -ml-12 sm:-ml-20 md:-ml-24 -mb-12 sm:-mb-20 md:-mb-24 blur-3xl" />
          
          <div className="relative p-4 sm:p-6 md:p-8">
            <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
              <Users className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                My Communities
              </h1>
            </div>
            <p className="text-sm sm:text-base text-white/90 mb-3 sm:mb-4">
              Connect, collaborate, and make a difference with like-minded individuals
            </p>
            
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full ${
                darkMode ? "bg-white/10" : "bg-white/20"
              } backdrop-blur-sm`}>
                <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                <span className="font-semibold text-xs sm:text-sm text-white">
                  {currentUser.totalCommunities} Communities Joined
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6 sm:mb-8"
        >
          <div className={`relative max-w-2xl mx-auto rounded-lg sm:rounded-xl overflow-hidden ${
            darkMode ? "bg-zinc-800/50 border border-zinc-700" : "bg-white shadow-lg border border-gray-200"
          }`}>
            <Search className={`absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 ${
              darkMode ? "text-zinc-400" : "text-gray-400"
            }`} />
            <input
              type="text"
              placeholder="Search communities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 text-sm sm:text-base ${
                darkMode 
                  ? "bg-transparent text-white placeholder-zinc-500" 
                  : "bg-transparent text-gray-900 placeholder-gray-400"
              } focus:outline-none`}
            />
          </div>
        </motion.div>

        {/* Communities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {filteredCommunities.map((community, index) => (
            <motion.div
              key={community.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <CommunityCard community={community} />
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCommunities.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-center py-12 sm:py-16 lg:py-20 rounded-xl sm:rounded-2xl ${
              darkMode ? "bg-zinc-800/50" : "bg-white shadow-lg"
            }`}
          >
            <Search className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 ${
              darkMode ? "text-zinc-600" : "text-gray-400"
            }`} />
            <h3 className={`text-lg sm:text-xl font-bold mb-2 px-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}>
              No communities found
            </h3>
            <p className={`text-sm sm:text-base px-4 ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
              Try adjusting your search terms
            </p>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className={`mt-8 sm:mt-10 md:mt-12 p-6 sm:p-8 rounded-xl sm:rounded-2xl text-center ${
            darkMode 
              ? "bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border border-emerald-700/30" 
              : "bg-gradient-to-br from-emerald-100 to-teal-100 border border-emerald-200"
          }`}
        >
          <h3 className={`text-xl sm:text-2xl font-bold mb-2 sm:mb-3 px-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Want to explore more communities?
          </h3>
          <p className={`mb-4 sm:mb-6 text-sm sm:text-base px-4 ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
            Discover other communities and expand your network
          </p>
          <button className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all inline-flex items-center justify-center gap-2 ${
            darkMode
              ? "bg-emerald-500 text-white hover:bg-emerald-600"
              : "bg-emerald-600 text-white hover:bg-emerald-700"
          }`}>
            <Users className="w-4 h-4 sm:w-5 sm:h-5" />
            Browse All Communities
          </button>
        </motion.div>

      </div>
    </div>
  )
}