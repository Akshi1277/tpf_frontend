"use client"

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import VolunteerRegister from '@/components/volunteer/VolunteerRegister';

export default function VolunteerRegisterPage() {
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
        <div className={`min-h-screen ${darkMode ? 'bg-zinc-950' : 'bg-white'}`}>
                        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} scrolled={scrolled} />
          
            <main className="pt-16">
                <VolunteerRegister darkMode={darkMode} />
            </main>

            <Footer darkMode={darkMode} />
        </div>
    );
}
