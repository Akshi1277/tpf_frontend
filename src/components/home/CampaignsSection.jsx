// components/home/CampaignsSection.jsx
'use client';
import { useState, useEffect } from 'react';
import CampaignCard from '@/components/ui/CampaignCard';
import { campaigns, categories } from '@/lib/constants';

export default function CampaignsSection({ darkMode }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [campaignScrollIndex, setCampaignScrollIndex] = useState(0);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  const filteredCampaigns = selectedCategory === 'all' 
    ? campaigns 
    : campaigns.filter(c => c.category === selectedCategory);

  const infiniteCampaigns = [...filteredCampaigns, ...filteredCampaigns];

  const COLORS = {
    neutralHeading: darkMode ? "text-white" : "text-zinc-900",
    neutralBody: darkMode ? "text-zinc-400" : "text-zinc-600",
  };

  // Auto-scroll for campaigns
  useEffect(() => {
    if (isUserScrolling) return;

    const interval = setInterval(() => {
      setCampaignScrollIndex(prev => prev + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, [isUserScrolling]);

  // Scroll campaigns container
  useEffect(() => {
    const container = document.getElementById('campaigns-container');
    if (!container) return;

    const cardWidth = container.children[0]?.offsetWidth || 0;
    const gap = 20; // 1.25rem = 20px
    const scrollTo = (cardWidth + gap) * campaignScrollIndex;
    
    container.scrollTo({
      left: scrollTo,
      behavior: 'smooth'
    });

    if (campaignScrollIndex >= filteredCampaigns.length) {
      setTimeout(() => {
        container.scrollTo({
          left: 0,
          behavior: 'auto'
        });
        setCampaignScrollIndex(0);
      }, 500);
    }
  }, [campaignScrollIndex, filteredCampaigns.length]);

  // Handle user scrolling detection
  useEffect(() => {
    const container = document.getElementById('campaigns-container');
    if (!container) return;

    let scrollTimeout;
    let isScrolling = false;

    const handleScrollStart = () => {
      if (!isScrolling) {
        isScrolling = true;
        setIsUserScrolling(true);
      }
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
        setIsUserScrolling(false);
      }, 2000);
    };

    container.addEventListener('scroll', handleScrollStart, { passive: true });

    return () => {
      container.removeEventListener('scroll', handleScrollStart);
    };
  }, []);

  // Handle seamless infinite loop for manual scrolling
  useEffect(() => {
    const container = document.getElementById('campaigns-container');
    if (!container) return;

    const handleScrollEnd = () => {
      const cardWidth = container.children[0]?.offsetWidth || 0;
      const gap = 20; // 1.25rem = 20px
      const scrollLeft = container.scrollLeft;
      const currentIndex = Math.round(scrollLeft / (cardWidth + gap));

      if (currentIndex >= filteredCampaigns.length) {
        const equivalentIndex = currentIndex - filteredCampaigns.length;
        container.scrollTo({
          left: equivalentIndex * (cardWidth + gap),
          behavior: 'auto'
        });
        setCampaignScrollIndex(equivalentIndex);
      } else if (currentIndex < 0) {
        container.scrollTo({
          left: (filteredCampaigns.length + currentIndex) * (cardWidth + gap),
          behavior: 'auto'
        });
        setCampaignScrollIndex(filteredCampaigns.length + currentIndex);
      }
    };

    let scrollTimeout;
    const onScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScrollEnd, 150);
    };

    container.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      container.removeEventListener('scroll', onScroll);
    };
  }, [filteredCampaigns.length]);

  return (
    <section id="campaigns" className={`py-10 ${darkMode ? 'bg-zinc-800' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${COLORS.neutralHeading}`}>
            Fundraising now
          </h2>
          <button
            className="
              whitespace-nowrap
              text-xs sm:text-sm font-medium
              bg-emerald-600 px-3 py-1.5 sm:px-4 sm:py-2
              rounded-full text-white
              hover:animate-pulse cursor-pointer
            "
          >
            Discover more
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-sm cursor-pointer transition-colors flex items-center gap-2 ${
                selectedCategory === cat.key
                  ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                  : darkMode 
                    ? "border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                    : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div 
          id="campaigns-container"
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
        >
          {infiniteCampaigns.map((campaign, index) => (
            <CampaignCard 
              key={`campaign-${campaign.id}-${index}`}
              campaign={campaign}
              darkMode={darkMode}
            />
          ))}
        </div>
      </div>
    </section>
  );
}