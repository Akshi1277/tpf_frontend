"use client"
import FinancialAidPage from '@/components/FinancialAidForm'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import React from 'react'
import { useEffect, useState } from 'react'

const page = () => {
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
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} scrolled={true} />
      
      <main className="flex-1 w-full overflow-x-hidden pt-16">
        <div className={`min-h-[calc(100vh-64px)] ${darkMode ? "bg-zinc-950" : "bg-gray-50"}`}>
          <FinancialAidPage darkModeFromParent={darkMode} />
        </div>
      </main>

      <Footer darkMode={darkMode} />
    </div>
  )
}

export default page