"use client"

import Navbar from '@/components/layout/Navbar';
import LoginPage from '@/components/login/Login/Login';
import React from 'react'
import { useEffect, useState } from 'react';

const page = () => {
  // Initialize darkMode by checking localStorage first
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('darkMode');
        return saved ? JSON.parse(saved) : false;
      } catch (error) {
        console.error('localStorage not available:', error);
        return false;
      }
    }
    return false;
  });
  
  const [scrolled, setScrolled] = useState(true);

  // Save to localStorage whenever darkMode changes
  useEffect(() => {
    try {
      localStorage.setItem('darkMode', JSON.stringify(darkMode));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  }, [darkMode]);

  return (
    <div>
         <div className={`min-h-screen ${darkMode ? 'bg-zinc-900' : 'bg-white'}`}>
              <Navbar darkMode={darkMode} setDarkMode={setDarkMode} scrolled={scrolled} />
        
        <LoginPage darkMode={darkMode}/>

        
        </div>
    </div>
  )
}

export default page