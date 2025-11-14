"use client"
import MyselfForm from '@/components/financialaid/MyselfForm'
import OrganizationRegistrationPage from '@/components/financialaid/OrganisationForm'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Initialize dark mode from localStorage after client-side mount
  useEffect(() => {
    setIsClient(true)
    const savedMode = localStorage.getItem('darkMode')
    if (savedMode !== null) {
      setDarkMode(savedMode === 'true')
    }
  }, [])

  // Listen for dark mode changes from other components
  useEffect(() => {
    const handleStorageChange = () => {
      const savedMode = localStorage.getItem('darkMode')
      if (savedMode !== null) {
        setDarkMode(savedMode === 'true')
      }
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('darkModeChanged', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('darkModeChanged', handleStorageChange)
    }
  }, [])

  // Don't render until client-side to avoid hydration mismatch
  if (!isClient) {
    return null
  }

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "bg-zinc-950" : "bg-gray-50"}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} scrolled={true} />
      
      <main className="flex-1 w-full overflow-x-hidden pt-16">
        <div className={`min-h-[calc(100vh-64px)] ${darkMode ? "bg-zinc-950" : "bg-gray-50"}`}>
          <OrganizationRegistrationPage darkModeFromParent={darkMode} />
        </div>
      </main>

      <Footer darkMode={darkMode} />
    </div>
  )
}

export default Page