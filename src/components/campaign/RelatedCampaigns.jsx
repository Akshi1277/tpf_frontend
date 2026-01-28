'use client';

import { useMemo, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import CampaignCard from '@/components/ui/CampaignCard';
import { useCMS } from '@/app/CMSContext';
import { getMediaUrl } from '@/utils/media';

export default function RelatedCampaigns({
  category,
  currentSlug,
  darkMode,
}) {
  const cms = useCMS();
  const scrollRef = useRef(null);

  const relatedCampaigns = useMemo(() => {
    if (!Array.isArray(cms) || !currentSlug) return [];

    const normalizedCurrentSlug = String(currentSlug)
      .trim()
      .toLowerCase();

    return cms
      .filter((item) => {
        if (
          item.type !== 'fundraiser' ||
          item.campaignStatus !== 'ACTIVE'
        ) {
          return false;
        }

        const itemSlug = String(item.campaignSlug || '')
          .trim()
          .toLowerCase();

        // Exclude current campaign
        if (itemSlug === normalizedCurrentSlug) {
          return false;
        }

        return itemSlug.length > 0;
      })
      .map((campaign) => ({
        ...campaign,
        image: campaign.imageUrl
          ? getMediaUrl(campaign.imageUrl)
          : null,
        video: campaign.videoUrl
          ? getMediaUrl(campaign.videoUrl)
          : null,
        raised: Number(campaign.raisedAmount || 0),
        goal: Number(
          campaign.requiredAmount || campaign.goal || 0
        ),
        urgent: Boolean(campaign.isUrgent),
        taxBenefit: Boolean(campaign.taxBenefits),
        zakatVerified: Boolean(campaign.zakatVerified),
        slug: campaign.campaignSlug,
      }));
  }, [cms, currentSlug]);

  const scroll = (direction) => {
    if (!scrollRef.current) return;

    const { current } = scrollRef;
    const getCardWidth = () => {
      if (window.innerWidth < 640) return 280;
      if (window.innerWidth < 768) return 320;
      if (window.innerWidth < 1024) return 240;
      return 270;
    };
    const cardWidth = getCardWidth();
    const gap = window.innerWidth < 640 ? 12 : window.innerWidth < 768 ? 16 : 24;
    const scrollAmount = direction === 'left' ? -(cardWidth + gap) : (cardWidth + gap);

    current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  /* 🚫 DO NOT RENDER IF EMPTY */
  if (relatedCampaigns.length === 0) {
    return null;
  }

  return (
    <section
      className={`mt-12 sm:mt-16 py-6 sm:py-8 ${darkMode ? 'bg-zinc-900' : 'bg-gray-50'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <h2
            className={`text-xl sm:text-2xl md:text-3xl font-bold ${darkMode ? 'text-white' : 'text-zinc-900'
              }`}
          >
            Related Campaigns
          </h2>
          <p
            className={`text-xs sm:text-sm mt-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'
              }`}
          >
            Similar causes you may want to support
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons - Hidden on Mobile, Visible on Desktop */}
          <button
            onClick={() => scroll('left')}
            className={`hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 p-3 rounded-full shadow-lg transition items-center justify-center z-10 ${darkMode
              ? 'bg-zinc-800 text-white hover:bg-zinc-700'
              : 'bg-white text-zinc-900 hover:bg-gray-100'
              }`}
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Scroll Container */}
          <div
            ref={scrollRef}
            className="flex gap-3 sm:gap-4 md:gap-6 overflow-x-auto overflow-y-hidden scroll-smooth py-4 px-1 -mx-1 scrollbar-hide snap-x snap-mandatory"
          >
            {relatedCampaigns.map((campaign) => (
              <div
                key={campaign.slug}
                className="snap-start w-[280px] sm:w-[320px] md:w-[240px] lg:w-[270px] flex-shrink-0"
              >
                <CampaignCard
                  campaign={campaign}
                  darkMode={darkMode}
                />
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll('right')}
            className={`hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 p-3 rounded-full shadow-lg transition items-center justify-center z-10 ${darkMode
              ? 'bg-zinc-800 text-white hover:bg-zinc-700'
              : 'bg-white text-zinc-900 hover:bg-gray-100'
              }`}
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Mobile Scroll Indicator */}
        <div className="lg:hidden flex justify-center gap-1 mt-3">
          {relatedCampaigns.length > 1 && (
            <p
              className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-zinc-400'
                }`}
            >
              ← Swipe to see more →
            </p>
          )}
        </div>
      </div>
    </section>
  );
}