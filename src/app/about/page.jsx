'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AboutHero from '@/components/aboutus/AboutHero';
import MissionSection from '@/components/aboutus/MissionSection';
import ImpactStats from '@/components/aboutus/ImpactStats';
import TeamSection from '@/components/aboutus/TeamSection';
import TimelineSection from '@/components/aboutus/MissionVisionSection';
import ValuesSection from '@/components/aboutus/OurTeamSection';
import NewsletterBanner from '@/components/aboutus/NewsletterBanner';

import MissionVisionSection from '@/components/aboutus/MissionVisionSection';
import OurTeamSection from '@/components/aboutus/OurTeamSection';
import CuratedSection from '@/components/home/CuratedSection';
import WhatWeDoSection from '@/components/aboutus/WhatWeDoSection';
import CampaignCarouselSection from '@/components/common/CampaignCarouselSection';


export default function AboutPage() {

  const [scrolled, setScrolled] = useState(true);

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
    <div className={`min-h-screen ${darkMode ? 'bg-zinc-900' : 'bg-white'}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} scrolled={scrolled} />
      <AboutHero darkMode={darkMode} />
      {/* <MissionSection darkMode={darkMode} /> */}
      <MissionVisionSection darkMode={darkMode} />
      <OurTeamSection darkMode={darkMode} />
      <WhatWeDoSection darkMode={darkMode} />
      <CampaignCarouselSection
        darkMode={darkMode}
        title="Our Campaigns"
        subtitle="Be a part of our journey to help humanity. Your contribution matters."
      />
      <Footer darkMode={darkMode} />
    </div>
  );
}
