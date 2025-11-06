"use client"

import Navbar from '@/components/layout/Navbar';
import SignUpPage from '@/components/signup/Signup';
import React from 'react'
import { useEffect, useState } from 'react';

const page = () => {
      const [darkMode, setDarkMode] = useState(false);
      const [scrolled, setScrolled] = useState(true); 
    
      useEffect(() => {
        const savedMode = localStorage.getItem('darkMode');
        setDarkMode(savedMode === 'true');
      }, []);
    
      useEffect(() => {
        localStorage.setItem('darkMode', darkMode);
      }, [darkMode]);

  return (
    <div>
         <div className={`min-h-screen ${darkMode ? 'bg-zinc-900' : 'bg-white'}`}>
              <Navbar darkMode={darkMode} setDarkMode={setDarkMode} scrolled={scrolled} />
        
        <SignUpPage darkMode={darkMode}/>

        
        </div>
    </div>
  )
}

export default page