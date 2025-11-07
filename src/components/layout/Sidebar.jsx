"use client"

import { useState, useEffect } from "react"
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
  Menu
} from "lucide-react"

export default function Sidebar({ darkMode }) {
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

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

  const menuItems = [
    {
      name: "Profile",
      path: "/profile",
      icon: User,
      gradient: "from-blue-500 to-indigo-600",
      description: "Manage your account"
    },
    {
      name: "Donations",
      path: "/donations",
      icon: Heart,
      gradient: "from-emerald-500 to-teal-600",
      description: "View your contributions"
    },
    {
      name: "KYC Details",
      path: "/kyc",
      icon: FileCheck,
      gradient: "from-purple-500 to-pink-600",
      description: "Verify your identity"
    },
    {
      name: "Tax Benefit",
      path: "/tax-benefit",
      icon: Receipt,
      gradient: "from-orange-500 to-red-600",
      description: "Download tax receipts"
    }
  ]

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className={`p-6 border-b ${
        darkMode ? "border-zinc-800" : "border-gray-200"
      }`}>
        <div className="flex items-center justify-between mb-2">
          <h2 className={`text-xl font-bold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}>
            Dashboard
          </h2>
          <button
            onClick={() => setIsMobileOpen(false)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              darkMode 
                ? "hover:bg-zinc-800 text-zinc-400" 
                : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className={`text-sm ${
          darkMode ? "text-zinc-400" : "text-gray-600"
        }`}>
          Manage your account
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item, index) => {
          const isActive = pathname === item.path
          const Icon = item.icon

          return (
            <Link key={item.path} href={item.path} className="block">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative group rounded-2xl transition-all duration-300 ${
                  isActive
                    ? darkMode
                      ? "bg-zinc-800 shadow-lg"
                      : "bg-white shadow-lg shadow-gray-200/50"
                    : darkMode
                    ? "hover:bg-zinc-800/50"
                    : "hover:bg-gray-50"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className={`absolute left-0 top-0 bottom-0 w-1 rounded-r-full bg-gradient-to-b ${item.gradient}`}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}

                <div className="flex items-center gap-4 p-4">
                  <div className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                    isActive
                      ? `bg-gradient-to-br ${item.gradient} shadow-lg`
                      : darkMode 
                      ? "bg-zinc-800" 
                      : "bg-gray-100"
                  }`}>
                    <Icon className={`w-6 h-6 transition-colors ${
                      isActive ? "text-white" : darkMode ? "text-zinc-400" : "text-gray-600"
                    }`} />
                    
                    {!isActive && (
                      <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-20 transition-opacity`} />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold mb-0.5 ${
                      isActive
                        ? darkMode ? "text-white" : "text-gray-900"
                        : darkMode ? "text-zinc-300" : "text-gray-700"
                    }`}>
                      {item.name}
                    </h3>
                    <p className={`text-xs truncate ${
                      darkMode ? "text-zinc-500" : "text-gray-500"
                    }`}>
                      {item.description}
                    </p>
                  </div>

                  <ChevronRight className={`w-5 h-5 transition-all ${
                    isActive
                      ? darkMode ? "text-white translate-x-1" : "text-gray-900 translate-x-1"
                      : darkMode ? "text-zinc-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1" : "text-gray-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
                  }`} />
                </div>

                {isActive && (
                  <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r ${item.gradient} opacity-20`} />
                )}
              </motion.div>
            </Link>
          )
        })}
      </nav>

     
    </div>
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className={`lg:hidden fixed top-32 left-4 z-40 p-3 rounded-xl shadow-lg transition-all ${
          darkMode
            ? "bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800"
            : "bg-white border border-gray-200 text-gray-900 hover:bg-gray-50"
        }`}
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
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
            className={`lg:hidden fixed top-0 left-0 bottom-0 w-80 z-50 ${
              darkMode ? "bg-zinc-900" : "bg-white"
            } shadow-2xl`}
          >
            <SidebarContent />
          </motion.aside>
        )}
      </AnimatePresence>

{/* Desktop Sidebar */}
<aside className={`hidden lg:block fixed left-0 w-80 border-r ${
  darkMode 
    ? "bg-zinc-900 border-zinc-800" 
    : "bg-white border-gray-200"
} shadow-xl overflow-y-auto`} style={{ top: '64px', bottom: '0', zIndex: 20 }}> {/* Changed z-30 to z-20 */}
  <SidebarContent />
</aside>

      {/* Spacer for desktop layout */}
      <div className="hidden lg:block w-80 flex-shrink-0" />
    </>
  )
}