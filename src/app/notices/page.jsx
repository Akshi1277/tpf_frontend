'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PublicNoticesPage from '@/components/home/Notices';

export default function Page() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <PublicNoticesPage darkMode={darkMode} />
      <Footer darkMode={darkMode} />
    </div>
  );
}
