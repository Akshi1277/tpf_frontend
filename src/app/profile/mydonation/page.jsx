"use client"
import ProfilePage from '@/components/profile/userprofile/UserProfile'
import Sidebar from '@/components/layout/Sidebar'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { useState, useEffect } from 'react'
import DonationsPage from '@/components/profile/mydonation/Donation'

export default function Page() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true'
    }
    return false
  })

  useEffect(() => {
    const handleStorageChange = () => {
      const savedMode = localStorage.getItem('darkMode')
      setDarkMode(savedMode === 'true')
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('darkModeChanged', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('darkModeChanged', handleStorageChange)
    }
  }, [])

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "bg-zinc-950" : "bg-gray-50"}`}>
      {/* Navbar - Fixed at top */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} scrolled={true} />
      
      {/* Main content area with sidebar */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar - Sticky on desktop, overlay on mobile */}
        <Sidebar darkMode={darkMode} />
        
        {/* Main content - Takes remaining space */}
        <main className="flex-1 w-full lg:w-auto overflow-x-hidden">
          <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-16 sm:pb-20 ${
            darkMode ? "bg-zinc-950" : "bg-gray-50"
          }`}>
            <DonationsPage darkModeFromParent={darkMode} />
          </div>
        </main>
      </div>

      {/* Footer - Normal flow at bottom with top margin */}
      <div className="mt-8 sm:mt-12">
        <Footer darkMode={darkMode} />
      </div>
    </div>
  )
}