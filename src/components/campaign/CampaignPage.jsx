import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CampaignHero from './components/fundraising/CampaignHero';
import CampaignProgress from './components/fundraising/CampaignProgress';
import CampaignTabs from './components/fundraising/CampaignTabs';
import DonationCard from './components/fundraising/DonationCard';
import RelatedCampaigns from './components/fundraising/RelatedCampaigns';
import FooterCTA from './components/fundraising/FooterCTA';

export default function CampaignPage() {
  const [darkMode, setDarkMode] = useState(false);

  const campaignData = {
    raised: 1245000,
    goal: 2000000,
    donors: 423,
    daysLeft: 18,
    avgDonation: 2945
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-zinc-900' : 'bg-gray-50'}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        <RelatedCampaigns darkMode={darkMode} />
        
        <FooterCTA darkMode={darkMode} />
      </div>

      <Footer darkMode={darkMode} />
    </div>
  );
}