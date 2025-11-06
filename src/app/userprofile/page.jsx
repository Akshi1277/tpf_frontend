"use client"
import ProfilePage from '@/components/userprofile/UserProfile';
import React from 'react'
import { useEffect, useState } from 'react';

const page = () => {
      const [darkMode, setDarkMode] = useState(false);
    
      useEffect(() => {
        const savedMode = localStorage.getItem('darkMode');
        setDarkMode(savedMode === 'true');
      }, []);
    
      useEffect(() => {
        localStorage.setItem('darkMode', darkMode);
      }, [darkMode]);

  return (
    <div>
        
        <ProfilePage darkMode={darkMode} />

        </div>
   
  )
}

export default page