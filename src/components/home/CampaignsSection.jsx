// components/home/CampaignsSection.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import CampaignCard from '@/components/ui/CampaignCard';
import { categories } from '@/lib/constants';
import { useCMS } from '@/app/CMSContext';

export default function CampaignsSection({ darkMode }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [campaignScrollIndex, setCampaignScrollIndex] = useState(0);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  const containerRef = useRef(null);

  const cms = useCMS();
  const fundraisers = cms?.filter((item) => item.type === "fundraiser") || [];
  const validFundraisers = fundraisers.filter(
    (f) => typeof f.campaignSlug === "string" && f.campaignSlug.length > 0
  );

  const BASE_URL = process.env.NEXT_PUBLIC_UPLOAD_URL;

  if (!fundraisers.length) return null;

  const calcDaysLeft = (deadline) => {
    const end = new Date(deadline);
    const now = new Date();
    const diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const filteredCampaigns =
    selectedCategory === "all"
      ? validFundraisers
      : validFundraisers.filter((c) => c.category === selectedCategory);

  const MIN_CARDS_FOR_INFINITE = 5;
  const enableInfiniteScroll = filteredCampaigns.length > MIN_CARDS_FOR_INFINITE;

  const infiniteCampaigns = enableInfiniteScroll
    ? [...filteredCampaigns, ...filteredCampaigns]
    : filteredCampaigns;

  const COLORS = {
    neutralHeading: darkMode ? "text-white" : "text-zinc-900",
    neutralBody: darkMode ? "text-zinc-400" : "text-zinc-600",
  };

  const getScrollAmount = () => {
    const container = containerRef.current;
    if (!container) return 0;
    const cardWidth = container.children[0]?.offsetWidth || 0;
    const gap = 20;
    return cardWidth + gap;
  };

  const scrollLeft = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    }
  };

  // Pause auto-scroll externally
  useEffect(() => {
    const handlePause = () => setIsUserScrolling(true);
    window.addEventListener("pauseCampaignScroll", handlePause);
    return () => window.removeEventListener("pauseCampaignScroll", handlePause);
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (!enableInfiniteScroll || isUserScrolling) return;

    const interval = setInterval(() => {
      setCampaignScrollIndex((prev) => prev + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, [enableInfiniteScroll, isUserScrolling]);

  // Apply scroll position
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollAmount = getScrollAmount();
    container.scrollTo({
      left: scrollAmount * campaignScrollIndex,
      behavior: 'smooth',
    });

    if (
      enableInfiniteScroll &&
      campaignScrollIndex >= filteredCampaigns.length
    ) {
      setTimeout(() => {
        container.scrollTo({ left: 0, behavior: 'auto' });
        setCampaignScrollIndex(0);
      }, 500);
    }
  }, [campaignScrollIndex, filteredCampaigns.length, enableInfiniteScroll]);

  // Detect user scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scrollTimeout;

    const onScroll = () => {
      setIsUserScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsUserScrolling(false);
      }, 2000);
    };

    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, []);

  // Seamless infinite correction
  useEffect(() => {
    if (!enableInfiniteScroll) return;

    const container = containerRef.current;
    if (!container) return;

    const scrollAmount = getScrollAmount();

    const handleScrollEnd = () => {
      const index = Math.round(container.scrollLeft / scrollAmount);
      if (index >= filteredCampaigns.length) {
        container.scrollTo({
          left: (index - filteredCampaigns.length) * scrollAmount,
          behavior: 'auto',
        });
        setCampaignScrollIndex(index - filteredCampaigns.length);
      }
    };

    let timeout;
    const onScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(handleScrollEnd, 150);
    };

    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, [enableInfiniteScroll, filteredCampaigns.length]);

  // Reset on category change
  useEffect(() => {
    const container = containerRef.current;
    setCampaignScrollIndex(0);
    if (container) {
      container.scrollTo({ left: 0, behavior: 'auto' });
    }
  }, [selectedCategory]);

  return (
    <section id="campaigns" className={`py-10 ${darkMode ? 'bg-zinc-800' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-3xl md:text-4xl font-bold ${COLORS.neutralHeading}`}>
            Fundraising now
          </h2>
          <button className="text-xs sm:text-sm font-medium bg-emerald-600 px-4 py-2 rounded-full text-white hover:animate-pulse">
            Discover more
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`rounded-full border px-3 py-1.5 text-sm ${
                selectedCategory === cat.key
                  ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                  : darkMode
                  ? "border-zinc-700 bg-zinc-800 text-zinc-300"
                  : "border-zinc-200 bg-white text-zinc-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative">
          {enableInfiniteScroll && (
            <button onClick={scrollLeft} className="hidden md:flex absolute -left-10 top-1/2 -translate-y-1/2 z-10">
              ◀
            </button>
          )}

          <div
            ref={containerRef}
            className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          >
            {infiniteCampaigns.map((campaign, index) => (
              <div key={`${campaign._id}-${index}`} className="flex-shrink-0 w-[285px]">
                <CampaignCard
                  campaign={{
                    ...campaign,
                    image: campaign.imageUrl ? `${BASE_URL}${campaign.imageUrl}` : null,
                    video: campaign.videoUrl ? `${BASE_URL}${campaign.videoUrl}` : null,
                    raised: Number(campaign.raisedAmount || 0),
                    goal: Number(campaign.requiredAmount || campaign.goal || 0),
                    org: campaign.organization || "",
                    urgent: campaign.isUrgent || false,
                    taxBenefit: campaign.taxBenefits || false,
                    validityDate: campaign.deadline
                      ? calcDaysLeft(campaign.deadline)
                      : null,
                    zakatVerified: campaign.zakatVerified || false,
                    slug: campaign.campaignSlug,
                  }}
                  darkMode={darkMode}
                />
              </div>
            ))}
          </div>

          {enableInfiniteScroll && (
            <button onClick={scrollRight} className="hidden md:flex absolute -right-10 top-1/2 -translate-y-1/2 z-10">
              ▶
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
