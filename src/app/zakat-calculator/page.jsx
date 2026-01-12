"use client"
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import ZakatCalculator from '@/components/zakatCalculator/ZakaatCalculator';
import React from 'react'
import { useEffect, useState } from 'react';
import CampaignCarouselSection from '@/components/common/CampaignCarouselSection';

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
        {/* <Navbar darkMode={darkMode} setDarkMode={setDarkMode}  /> */}

        <ZakatCalculator darkMode={darkMode} />

        <CampaignCarouselSection
          darkMode={darkMode}
          title="Zakat Eligible Campaigns"
          subtitle="Direct your Zakat to verified causes and help the needy."
        />

        <Footer darkMode={darkMode} />
      </div>
    </div>
  )
}

export default page