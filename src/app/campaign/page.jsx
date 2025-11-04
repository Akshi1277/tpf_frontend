"use client"
import { useState } from 'react';
import CampaignHero from '@/components/campaign/CampaignHero';
import CampaignProgress from '@/components/campaign/CampaignProgress';
import CampaignTabs from '@/components/campaign/CampaignTabs';
import DonationCard from '@/components/campaign/DonationCard';
import RelatedCampaigns from '@/components/campaign/RelatedCampaigns';
import FooterCTA from '@/components/campaign/FooterCTA';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CampaignCard from '@/components/ui/CampaignCard';
import CampaignsSection from '@/components/home/CampaignsSection';

export default function CampaignPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(true);

  const campaignData = {
    raised: 1245000,
    goal: 2000000,
    donors: 423,
    daysLeft: 18,
    avgDonation: 2945
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-zinc-900' : 'bg-gray-50'}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} scrolled={scrolled} />

      <div className="max-w-7xl pt-30 sm:pt-36 md:pt-30 mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CampaignHero darkMode={darkMode} />
        
        <CampaignProgress 
          darkMode={darkMode}
          raised={campaignData.raised}
          goal={campaignData.goal}
          donors={campaignData.donors}
          daysLeft={campaignData.daysLeft}
          avgDonation={campaignData.avgDonation}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CampaignTabs darkMode={darkMode} />
          </div>

          <div className="lg:col-span-1">
            <DonationCard darkMode={darkMode} />
          </div>
        </div>

        {/* <RelatedCampaigns darkMode={darkMode} />
         */}
         <CampaignsSection  darkMode={darkMode}/>
        
        <FooterCTA darkMode={darkMode} />
      </div>

      <Footer darkMode={darkMode} />
    </div>
  );
}