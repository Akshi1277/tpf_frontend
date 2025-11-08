"use client"
import ProfilePage from '@/components/profile/userprofile/UserProfile'
import Sidebar from '@/components/layout/Sidebar'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { useState, useEffect } from 'react'

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
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} scrolled={true} />
      
      <div className="flex flex-1">
        <Sidebar darkMode={darkMode} />
        <div className="flex-1">
          <ProfilePage darkModeFromParent={darkMode}/>
        </div>
      </div>

      {/* Normal footer at the bottom - not fixed */}
      <Footer darkMode={darkMode} />
    </div>
  )
}