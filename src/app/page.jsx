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
import StartFundraiserBanner from '@/components/home/FundraiserBanner';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useCMS } from './CMSContext';
import { useFetchImpactStatsQuery } from '@/utils/slices/campaignApiSlice';

export default function Page() {
  const cms = useCMS()




  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('darkMode');
        return saved ? JSON.parse(saved) : false;
      } catch (error) {
        return false;
      }
    }
    return false;
  });

  const { data: statsData } = useFetchImpactStatsQuery();
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
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <div className={`min-h-screen font-sans ${darkMode ? 'bg-zinc-900' : 'bg-white'}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} scrolled={scrolled} />

      <section id="hero">
        <HeroSection darkMode={darkMode} />
      </section>

      <section id="impact-stats">
        <ImpactStatsBar darkMode={darkMode} />
      </section>

      <section id="stories">
        <StoriesSection darkMode={darkMode} />
      </section>

      <section id="campaigns">
        <CampaignsSection darkMode={darkMode} />
      </section>

      <section id="curated">
        <CuratedSection darkMode={darkMode} cms={cms} />
      </section>

      <section id="impact-banner">
        <ImpactBanner darkMode={darkMode} />
      </section>

      <section id="communities">
        <CommunitiesSection darkMode={darkMode} />
      </section>

      <section id="partners">
        <PartnersSection darkMode={darkMode} />
      </section>

      <section id="pulse">
        <PulseSection darkMode={darkMode} totalRaised={totalRaised} />
      </section>

      <section id="fundraiser-banner">
        <StartFundraiserBanner darkMode={darkMode} />
      </section>

      <Footer darkMode={darkMode} />
      <ScrollToTop scrolled={scrolled} />
    </div>
  );
}
