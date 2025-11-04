// components/home/CampaignsSection.jsx
'use client';
import { useState, useEffect } from 'react';
import CampaignCard from '@/components/ui/CampaignCard';
import { campaigns, categories } from '@/lib/constants';
import { useRouter } from 'next/navigation';

export default function CampaignsSection({ darkMode }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [campaignScrollIndex, setCampaignScrollIndex] = useState(0);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  const router = useRouter();

  const filteredCampaigns = selectedCategory === 'all' 
    ? campaigns 
    : campaigns.filter(c => c.category === selectedCategory);

  const infiniteCampaigns = [...filteredCampaigns, ...filteredCampaigns];

  const COLORS = {
    neutralHeading: darkMode ? "text-white" : "text-zinc-900",
    neutralBody: darkMode ? "text-zinc-400" : "text-zinc-600",
  };

  const scrollLeft = () => {
  const container = document.getElementById('campaigns-container');
  if (container) {
    container.scrollBy({ left: -320, behavior: 'smooth' });
  }
};

const scrollRight = () => {
  const container = document.getElementById('campaigns-container');
  if (container) {
    container.scrollBy({ left: 320, behavior: 'smooth' });
  }
};

useEffect(() => {
  if (isUserScrolling) return;
  
  // Auto-scroll for both mobile and desktop
  const interval = setInterval(() => {
    setCampaignScrollIndex(prev => prev + 1);
  }, 2000); 

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
<div className="relative">
  {/* LEFT ARROW - Desktop only */}
 <button
  onClick={scrollLeft}
  className="absolute left-2 md:-left-10 top-1/2 -translate-y-1/2 z-10
             hidden md:flex items-center justify-center
             h-9 w-9 rounded-full
             border-2 border-emerald-600 dark:border-emerald-500/50
             bg-gradient-to-br from-emerald-200 via-emerald-50 to-emerald-100
             dark:bg-gradient-to-br dark:from-emerald-500/20 dark:via-zinc-800/60 dark:to-emerald-600/20
             backdrop-blur-sm
             shadow-[0_0_25px_rgba(5,150,105,0.7)]
             dark:shadow-[0_0_20px_rgba(16,185,129,0.3)]
             hover:from-emerald-300 hover:via-emerald-100 hover:to-emerald-200
             hover:shadow-[0_0_30px_rgba(5,150,105,0.9)]
             dark:hover:from-emerald-500/30 dark:hover:via-zinc-700/80 dark:hover:to-emerald-600/30
             dark:hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]
             transition-all duration-300
             text-emerald-700 dark:text-emerald-300"
>
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
</button>


  <div 
    id="campaigns-container"
    className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
  >
    {infiniteCampaigns.map((campaign, index) => (
      <div key={`campaign-${campaign.id}-${index}`} className="flex-shrink-0 w-[280px] sm:w-[285px] snap-start">
        <CampaignCard 
          campaign={campaign}
          darkMode={darkMode}
        />
      </div>
    ))}
  </div>

  {/* RIGHT ARROW - Desktop only */}
 <button
  onClick={scrollRight}
  className="absolute right-2 md:-right-10 top-1/2 -translate-y-1/2 z-10
             hidden md:flex items-center justify-center
             h-9 w-9 rounded-full
             border-2 border-emerald-600 dark:border-emerald-500/50
             bg-gradient-to-br from-emerald-200 via-emerald-50 to-emerald-100
             dark:bg-gradient-to-br dark:from-emerald-500/20 dark:via-zinc-800/60 dark:to-emerald-600/20
             backdrop-blur-sm
             shadow-[0_0_25px_rgba(5,150,105,0.7)]
             dark:shadow-[0_0_20px_rgba(16,185,129,0.3)]
             hover:from-emerald-300 hover:via-emerald-100 hover:to-emerald-200
             hover:shadow-[0_0_30px_rgba(5,150,105,0.9)]
             dark:hover:from-emerald-500/30 dark:hover:via-zinc-700/80 dark:hover:to-emerald-600/30
             dark:hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]
             transition-all duration-300
             text-emerald-700 dark:text-emerald-300"
>
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
</button>

</div>
</div>
      
    </section>
  );
}