// app/page.jsx
'use client';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import ImpactStatsBar from '@/components/home/ImpactStatsBar';
import CampaignsSection from '@/components/home/CampaignsSection';
import CuratedSection from '@/components/home/CuratedSection';
import ImpactBanner from '@/components/home/ImpactBanner';
import CommunitiesSection from '@/components/home/CommunitiesSection';
import PartnersSection from '@/components/home/PartnersSection';
import PulseSection from '@/components/home/PulseSection';
import StoriesSection from '@/components/home/StoriesSection';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { useState, useEffect } from 'react';

export default function Page() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('darkMode');
        return saved ? JSON.parse(saved) : false;
      } catch (error) {
        console.error('localStorage not available:', error);
        return false;
      }
    }
    return false;
  });

  const [scrolled, setScrolled] = useState(false);
  const [totalRaised, setTotalRaised] = useState(2547893);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalRaised(prev => prev + Math.floor(Math.random() * 100));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('darkMode', JSON.stringify(darkMode));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen font-sans ${darkMode ? 'bg-zinc-900' : 'bg-white'}`}>
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(16, 185, 129, 0.5);
          }
        }
        .pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
      `}</style>

      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} scrolled={scrolled} />
      
      <HeroSection darkMode={darkMode} />
      <ImpactStatsBar darkMode={darkMode} totalRaised={totalRaised} />
      <CampaignsSection darkMode={darkMode} />
      <CuratedSection darkMode={darkMode} />
      <ImpactBanner darkMode={darkMode} />
      <CommunitiesSection darkMode={darkMode} />
      <PartnersSection darkMode={darkMode} />
      <PulseSection darkMode={darkMode} totalRaised={totalRaised} />
      <StoriesSection darkMode={darkMode} />
      
      <Footer darkMode={darkMode} />
      <ScrollToTop scrolled={scrolled} />
    </div>
  );
}