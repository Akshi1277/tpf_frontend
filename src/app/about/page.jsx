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
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import MissionVisionSection from '@/components/aboutus/MissionVisionSection';
import OurTeamSection from '@/components/aboutus/OurTeamSection';
import CuratedSection from '@/components/home/CuratedSection';
import WhatWeDoSection from '@/components/aboutus/WhatWeDoSection';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(true); // 👈 Always true

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    setDarkMode(savedMode === 'true');
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-zinc-900' : 'bg-white'}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} scrolled={scrolled} />
      <AboutHero darkMode={darkMode} />
      {/* <MissionSection darkMode={darkMode} /> */}
      <MissionVisionSection darkMode={darkMode} />
      <OurTeamSection darkMode={darkMode} />
      <WhatWeDoSection darkMode={darkMode} />
      <Footer darkMode={darkMode} />
    </div>
  );
}
