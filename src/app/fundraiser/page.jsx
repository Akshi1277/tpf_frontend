'use client'
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import FundraisingHero from '@/components/fundraising/FundraisingHero';
import CampaignDescription from '@/components/fundraising/CampaignDescription';
import DonorMessages from '@/components/fundraising/DonorMessages';
import CampaignDocuments from '@/components/fundraising/CampaignDocuments';
import RelatedCampaigns from '@/components/fundraising/RelatedCampaigns';
import CampaignProgress from '@/components/fundraising/CampaignProgress';
import DonationForm from '@/components/fundraising/DonationForm';
import Footer from '@/components/layout/Footer';
export default function Fundraising() {



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
    <div className={`min-h-screen ${darkMode ? 'bg-zinc-900' : 'bg-white'}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} scrolled={scrolled} />
      <FundraisingHero darkMode={darkMode} />
      <CampaignDescription darkMode={darkMode} />
      <DonorMessages darkMode={darkMode} />
      <CampaignDocuments darkMode={darkMode} />
      <RelatedCampaigns darkMode={darkMode} />
      <CampaignProgress darkMode={darkMode} />
      <DonationForm darkMode={darkMode} />
       <Footer darkMode={darkMode} />
    </div>
  );
}
