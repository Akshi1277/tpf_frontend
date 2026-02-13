"use client"
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import ZakatCalculator from '@/components/zakatCalculator/ZakaatCalculator';
import React from 'react'
import { useEffect, useState } from 'react';
import CampaignCarouselSection from '@/components/common/CampaignCarouselSection';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const page = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(true); // 👈 Always true
  const router = useRouter();

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
              className={`flex items-center justify-center w-8 h-8 sm:w-22 sm:h-10 rounded-lg sm:rounded-3xl border backdrop-blur-md py-5 px-3 shadow-lg transition-all duration-200 ${darkMode
                ? "bg-black/40 border-white/20 hover:border-emerald-500/50 hover:bg-black/60"
                : "bg-white/70 border-gray-200 hover:border-emerald-500/40 hover:bg-white"
                }`}
            >
              
              <ArrowLeft size={18} className="sm:size-[18px] mr-2" strokeWidth={1.5} />
              Back
            </div>
          </button>
        </div>

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