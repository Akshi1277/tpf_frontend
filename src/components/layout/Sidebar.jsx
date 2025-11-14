"use client"

import { useState, useEffect, useCallback, memo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { 
  User, 
  Heart, 
  FileCheck, 
  Receipt,
  ChevronRight,
  X,
  Menu,
  Wrench,
  AlertTriangle,
  ClipboardList,
  HandHeartIcon,
  Download,
  IndianRupeeIcon
} from "lucide-react"

// Menu items defined outside component to prevent recreation on each render
const menuItems = [
  {
    name: "Profile",
    path: "/profile/userprofile",
    icon: User,
    gradient: "from-blue-500 to-indigo-600",
    activeColor: "blue",
    description: "Manage your account"
  },
  {
    name: "My Donations",
    path: "/profile/mydonation",
    icon: Heart,
    gradient: "from-emerald-500 to-teal-600",
    activeColor: "emerald",
    description: "View your contributions"
  },
  {
    name: "Offline Donations",
    path: "/profile/offline-donations",
    icon: IndianRupeeIcon,
    gradient: "from-cyan-500 to-blue-600",
    activeColor: "emerald",
    description: "Manage Offline Donations"
  },
  {
    name: "KYC Details",
    path: "/profile/kyc-details",
    icon: FileCheck,
   gradient: "from-blue-400 via-cyan-500 to-teal-400",
     activeColor: "purple",
    description: "Verify your identity"
  },
  {
    name: "My Communities",
    path: "/profile/my-communities",
    icon: HandHeartIcon,
    gradient: "from-orange-500 to-red-600",
    activeColor: "orange",
    description: "Manage your Communities"
  },
  {
    name: "My Campaigns",
    path: "/profile/my-campaign",
    icon: ClipboardList,
    gradient: "from-rose-500 to-red-600",
    activeColor: "orange",
    description: "Manage your Fundraisers"
  },
  {
    name: "Downloads",
    path: "/profile/downloads",
    icon: Download,
    gradient: "from-cyan-500 to-blue-600",
    activeColor: "orange",
    description: "Manage your Receipts and Invoices"
  },
  {
    name: "Contact",
    path: "/profile/contactpage",
    icon: Wrench,
    gradient: "from-rose-500 to-red-600",
    activeColor: "rose",
    description: "Submit Queries and Feedbacks"
  },
]

// Memoized sidebar content component
const SidebarContent = memo(({ onClose, darkMode, profileCompletion = 65 }) => {
  const pathname = usePathname()
  
  return (
    <div className="flex flex-col h-full overflow-y-auto scrollbar-hide">
      {/* Header */}
      <div className={`px-4 py-4 sm:px-6 sm:py-5 border-b flex-shrink-0 ${
        darkMode ? "border-zinc-800" : "border-gray-200"
      }`}>
        <div className="flex items-center justify-between mb-1">
          <h2 className={`text-lg sm:text-xl font-bold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}>
            My Profile
          </h2>
          <button
            onClick={onClose}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              darkMode 
                ? "hover:bg-zinc-800 text-zinc-400" 
                : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Profile Completion Indicator */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs sm:text-sm font-medium ${
              darkMode ? "text-zinc-300" : "text-gray-700"
            }`}>
              Profile Completion
            </span>
            <span className={`text-xs sm:text-sm font-bold ${
              profileCompletion === 100
                ? "text-emerald-500"
                : darkMode ? "text-zinc-400" : "text-gray-600"
            }`}>
              {profileCompletion}%
            </span>
          </div>
          <div className={`w-full h-2 rounded-full overflow-hidden ${
            darkMode ? "bg-zinc-800" : "bg-gray-200"
          }`}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${profileCompletion}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`h-full rounded-full ${
                profileCompletion === 100
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                  : profileCompletion >= 75
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500"
                  : profileCompletion >= 50
                  ? "bg-gradient-to-r from-orange-500 to-amber-500"
                  : "bg-gradient-to-r from-red-500 to-rose-500"
              }`}
            />
          </div>
          {profileCompletion < 100 && (
            <p className={`text-[10px] sm:text-xs mt-1.5 ${
              darkMode ? "text-zinc-500" : "text-gray-500"
            }`}>
              Complete your profile to unlock all features
            </p>
          )}
        </div>
      </div>

      {/* Navigation - Scrollable with all items visible */}
      <nav className="flex-1 p-2 sm:p-3 pb-6">
        <div className="flex flex-col space-y-1.5 sm:space-y-2">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.path
            const Icon = item.icon

            return (
              <Link key={item.path} href={item.path} className="block">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative group rounded-xl sm:rounded-2xl transition-all duration-300 border-2 ${
                    isActive
                      ? darkMode
                        ? "bg-zinc-800/80 shadow-xl border-transparent"
                        : "bg-gradient-to-r from-gray-50 to-white shadow-xl border-gray-200"
                      : darkMode
                      ? "hover:bg-zinc-800/50 border-transparent"
                      : "hover:bg-gray-50 border-transparent"
                  }`}
                >
                  {/* Active indicator bar */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-r-full bg-gradient-to-b ${item.gradient} shadow-lg`}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}

                  {/* Glow effect for active item */}
                  {isActive && (
                    <div className={`absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r ${item.gradient} opacity-5`} />
                  )}

                  <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-3.5">
                    {/* Icon */}
                    <div className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                      isActive
                        ? `bg-gradient-to-br ${item.gradient} shadow-lg shadow-${item.activeColor}-500/30`
                        : darkMode 
                        ? "bg-zinc-800" 
                        : "bg-gray-100"
                    }`}>
                      <Icon className={`w-5 h-5 transition-colors ${
                        isActive ? "text-white" : darkMode ? "text-zinc-400" : "text-gray-600"
                      }`} />
                      
                      {!isActive && (
                        <div className={`absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-20 transition-opacity`} />
                      )}
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-sm sm:text-base font-semibold mb-0.5 transition-colors ${
                        isActive
                          ? darkMode ? "text-white" : "text-gray-900"
                          : darkMode ? "text-zinc-300" : "text-gray-700"
                      }`}>
                        {item.name}
                      </h3>
                      <p className={`text-[10px] sm:text-xs truncate transition-colors ${
                        isActive
                          ? darkMode ? "text-zinc-400" : "text-gray-600"
                          : darkMode ? "text-zinc-500" : "text-gray-500"
                      }`}>
                        {item.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    <ChevronRight className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 transition-all ${
                      isActive
                        ? darkMode ? "text-white translate-x-1" : "text-gray-900 translate-x-1"
                        : darkMode ? "text-zinc-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1" : "text-gray-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
                    }`} />
                  </div>

                  {/* Bottom gradient line for active */}
                  {isActive && (
                    <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${item.gradient} opacity-30`} />
                  )}
                </motion.div>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
})

SidebarContent.displayName = 'SidebarContent'

function Sidebar({ darkMode }) {
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const toggleMobileMenu = useCallback(() => {
    setIsMobileOpen(prev => !prev)
  }, [])

  const closeMobileMenu = useCallback(() => {
    setIsMobileOpen(false)
  }, [])

  useEffect(() => {
    closeMobileMenu()
  }, [pathname, closeMobileMenu])

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileOpen])

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className={`lg:hidden fixed right-4 sm:right-6 bottom-20 sm:bottom-24 z-40 p-3 sm:p-4 rounded-full shadow-2xl transition-all ${
          darkMode
            ? "bg-gradient-to-br from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white"
            : "bg-gradient-to-br from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
        }`}
        aria-label="Open sidebar menu"
      >
        <Menu className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobileMenu}
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`lg:hidden fixed top-0 left-0 bottom-0 w-72 sm:w-80 z-50 ${
              darkMode ? "bg-zinc-900" : "bg-white"
            } shadow-2xl`}
          >
            <SidebarContent onClose={closeMobileMenu} darkMode={darkMode} profileCompletion={65} />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside 
        className={`hidden lg:block sticky w-64 xl:w-80 border-r ${
          darkMode 
            ? "bg-zinc-900 border-zinc-800" 
            : "bg-white border-gray-200"
        } shadow-xl`} 
        style={{ 
          top: '64px', 
          height: 'calc(100vh - 64px)', 
          zIndex: 20 
        }}
      >
        <SidebarContent onClose={closeMobileMenu} darkMode={darkMode} profileCompletion={65} />
      </aside>
    </>
  )
}

// Export memoized component
export default memo(Sidebar)