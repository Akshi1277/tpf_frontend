'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BlogListPage from '@/components/blogs/BlogListPage';

const Page = () => {
  const [scrolled] = useState(true); // Always true (matches your previous pattern)

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

      <BlogListPage darkMode={darkMode} />

      <Footer darkMode={darkMode} />
    </div>
  );
};

export default Page;
