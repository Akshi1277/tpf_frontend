// app/about/page.jsx
'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AboutHero from '@/components/aboutus/AboutHero';
import MissionSection from '@/components/aboutus/MissionSection';
import ImpactStats from '@/components/aboutus/ImpactStats';
import TeamSection from '@/components/aboutus/TeamSection';
import TimelineSection from '@/components/aboutus/TimelineSection';
import ValuesSection from '@/components/aboutus/ValuesSection';
import MediaGallery from '@/components/aboutus/MediaGallery';
import NewsletterBanner from '@/components/aboutus/NewsletterBanner';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const [darkMode, setDarkMode] = useState(false);

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
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <AboutHero darkMode={darkMode} />
      <MissionSection darkMode={darkMode} />
      <ImpactStats darkMode={darkMode} />
      <TeamSection darkMode={darkMode} />
      <TimelineSection darkMode={darkMode} />
      <ValuesSection darkMode={darkMode} />
      <MediaGallery darkMode={darkMode} />
      <NewsletterBanner darkMode={darkMode} />
      <Footer darkMode={darkMode} />
    </div>
  );
}