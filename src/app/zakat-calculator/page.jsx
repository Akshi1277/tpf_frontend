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

        <div className="absolute top-16 md:top-24 left-4 sm:left-6 md:left-8 lg:left-12 z-20">
          <button
            type="button"
            onClick={() => router.back()}
            className={`group flex items-center transition-all duration-300 ${darkMode ? "text-white" : "text-gray-900"
              }`}
            aria-label="Go back"
          >
            <div
              className={`flex items-center justify-center h-10 sm:h-12 rounded-full border backdrop-blur-md shadow-lg transition-all duration-300 ${darkMode
                  ? "bg-black/20 border-white/10 hover:bg-black/40 hover:border-emerald-500/50"
                  : "bg-white/20 border-white/30 hover:bg-white/40 hover:border-emerald-500/40"
                } px-3 sm:px-5`}
            >
              <ArrowLeft
                size={20}
                className="transition-transform duration-300 group-hover:-translate-x-1"
                strokeWidth={2}
              />
              <span className="hidden sm:inline-block ml-2 font-semibold tracking-wide text-sm uppercase">
                Back
              </span>
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