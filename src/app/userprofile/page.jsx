"use client"
import ProfilePage from '@/components/userprofile/UserProfile'
import Sidebar from '@/components/layout/Sidebar'
import Navbar from '@/components/layout/Navbar'
import { useState, useEffect } from 'react'

export default function Page() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode')
    setDarkMode(savedMode === 'true')
  }, [])

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
    <div className={darkMode ? "bg-zinc-950" : "bg-gray-50"}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} scrolled={true} />
      <div className="flex min-h-screen"> {/* Remove pt-20 */}
        <Sidebar darkMode={darkMode} />
        <div className="flex-1">
          <ProfilePage darkModeFromParent={darkMode} setDarkModeFromParent={setDarkMode} />
        </div>
      </div>
    </div>
  )
}