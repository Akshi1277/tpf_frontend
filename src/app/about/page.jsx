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
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AboutPage() {

  const [scrolled, setScrolled] = useState(true);
  const router = useRouter();

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

      <div className="absolute top-16 md:top-24 left-2 sm:left-4 md:left-8 z-20">
        <button
          type="button"
          onClick={() => router.back()}
          className={`group flex items-center gap-2 transition-colors duration-200 ${darkMode
            ? "text-white hover:text-emerald-400"
            : "text-gray-900 hover:text-emerald-600"
            }`}
          aria-label="Go back"
        >
          <div
            className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl border backdrop-blur-md shadow-lg transition-all duration-200 ${darkMode
              ? "bg-black/40 border-white/20 hover:border-emerald-500/50 hover:bg-black/60"
              : "bg-white/70 border-gray-200 hover:border-emerald-500/40 hover:bg-white"
              }`}
          >
            <ArrowLeft size={18} className="sm:size-[20px]" strokeWidth={2.5} />
          </div>
        </button>
      </div>

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
