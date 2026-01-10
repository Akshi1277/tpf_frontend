"use client"
import ContactPage from '@/components/contactus/contactus';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import React from 'react'
import { useEffect, useState } from 'react';

const page = () => {

      const [scrolled, setScrolled] = useState(true); // 👈 Always true
    
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
    <div>
         <div className={`min-h-screen ${darkMode ? 'bg-zinc-900' : 'bg-white'}`}>
              <Navbar darkMode={darkMode} setDarkMode={setDarkMode} scrolled={scrolled} />
        
          <ContactPage darkMode={darkMode} />
          <Footer darkMode={darkMode} />
        </div>
    </div>
  )
}

export default page