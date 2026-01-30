'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PublicNoticesPage from '@/components/home/Notices';

export default function Page() {
  const [scrolled, setScrolled] = useState(true); // keep if Navbar expects it

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const savedMode = localStorage.getItem('darkMode');
      setDarkMode(savedMode === 'true');
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('darkModeChanged', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('darkModeChanged', handleStorageChange);
    };
  }, []);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-zinc-900' : 'bg-white'}`}>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        scrolled={scrolled}
      />
      <PublicNoticesPage darkMode={darkMode} />
      <Footer darkMode={darkMode} />
    </div>
  );
}
