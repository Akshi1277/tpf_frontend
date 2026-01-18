// components/home/CampaignsSection.jsx
'use client';

import { useState, useRef, useMemo } from 'react';
import CampaignCard from '@/components/ui/CampaignCard';
import { useCMS } from '@/app/CMSContext';
import Link from 'next/link';
import { getMediaUrl } from '@/utils/media';

export default function CampaignsSection({ darkMode }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const containerRef = useRef(null);
  const cms = useCMS();

  /* --------------------------------
     Helpers
  --------------------------------- */
  const calcDaysLeft = (deadline) => {
    const end = new Date(deadline);
    const now = new Date();
    return Math.max(0, Math.ceil((end - now) / (1000 * 60 * 60 * 24)));
  };

  /* --------------------------------
     ACTIVE CAMPAIGNS
  --------------------------------- */
  const activeCampaigns = useMemo(() => {
    if (!Array.isArray(cms)) return [];

    return cms
      .filter(
        (item) =>
          item.type === 'fundraiser' &&
          item.campaignStatus === 'ACTIVE' &&
          typeof item.campaignSlug === 'string' &&
          item.campaignSlug.trim().length > 0
      )
      .sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
      .map((campaign) => ({
        ...campaign,
        image: campaign.imageUrl ? getMediaUrl(campaign.imageUrl) : null,
        video: campaign.videoUrl ? getMediaUrl(campaign.videoUrl) : null,
        raised: Number(campaign.raisedAmount || 0),
        goal: Number(campaign.requiredAmount || campaign.goal || 0),
        org: campaign.organization || '',
        urgent: Boolean(campaign.isUrgent),
        taxBenefit: Boolean(campaign.taxBenefits),
        validityDate: campaign.deadline ? calcDaysLeft(campaign.deadline) : null,
        zakatVerified: Boolean(campaign.zakatVerified),
        slug: campaign.campaignSlug,
      }));
  }, [cms]);

  /* --------------------------------
     Category Filter
  --------------------------------- */
  const filteredCampaigns = useMemo(() => {
    if (selectedCategory === 'all') return activeCampaigns;
    return activeCampaigns.filter((c) => c.category === selectedCategory);
  }, [activeCampaigns, selectedCategory]);

  /* --------------------------------
     NO ACTIVE CAMPAIGNS
  --------------------------------- */
  if (!filteredCampaigns.length) return null;

  /* --------------------------------
     Scroll Helpers
  --------------------------------- */
  const scroll = (direction) => {
    const container = containerRef.current;
    if (!container) return;

    const cardWidth = 285;
    const gap = 20;
    const scrollAmount = (cardWidth + gap) * 2;

    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const showArrows = filteredCampaigns.length > 3;


  /* --------------------------------
     Render
  --------------------------------- */
  return (
    <section
      id="campaigns"
      className={`py-8 sm:py-10 ${darkMode ? 'bg-zinc-800' : 'bg-white'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
            Fundraising now
          </h2>

          <Link href="/all-campaigns">
            <button className="text-xs sm:text-sm font-medium bg-emerald-600 px-4 py-2 rounded-full text-white hover:bg-emerald-700 transition-colors">
              Discover more
            </button>
          </Link>
        </div>

        {/* Carousel */}
        <div className="relative group">
          {/* Left Arrow - Subtle & Elegant */}
          {showArrows && (
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className={`hidden md:flex absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2 z-20 w-9 h-9 items-center justify-center rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 ${darkMode
                ? 'bg-zinc-700/90 hover:bg-zinc-600 text-white shadow-lg'
                : 'bg-white/90 hover:bg-white text-zinc-700 shadow-md'
                } backdrop-blur-sm border ${darkMode ? 'border-zinc-600/50' : 'border-gray-200/50'}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Cards Container */}
          <div
            ref={containerRef}
            className="overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide"
          >
            <div className="flex gap-4 sm:gap-5">
              {filteredCampaigns.map((campaign) => (
                <div
                  key={campaign._id}
                  className="flex-shrink-0 w-[280px] sm:w-[285px]"
                >
                  <CampaignCard campaign={campaign} darkMode={darkMode} />
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow - Subtle & Elegant */}
          {showArrows && (
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className={`hidden md:flex absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 z-20 w-9 h-9 items-center justify-center rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 ${darkMode
                ? 'bg-zinc-700/90 hover:bg-zinc-600 text-white shadow-lg'
                : 'bg-white/90 hover:bg-white text-zinc-700 shadow-md'
                } backdrop-blur-sm border ${darkMode ? 'border-zinc-600/50' : 'border-gray-200/50'}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        {/* Mobile Scroll Hint */}
        <div className="md:hidden mt-3 text-center">
          <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
            ← Swipe to see more →
          </p>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}