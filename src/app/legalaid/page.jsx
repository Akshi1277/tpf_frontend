"use client"
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import LegalAidPage from '@/components/legalaid/LegalAid';
import React from 'react'
import { useEffect, useState } from 'react';

const page = () => {
      const [darkMode, setDarkMode] = useState(false);
      const [scrolled, setScrolled] = useState(true); // 👈 Always true
    
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
        
        <LegalAidPage darkMode={darkMode} />

          <Footer darkMode={darkMode} />
        </div>
    </div>
  )
}

export default page