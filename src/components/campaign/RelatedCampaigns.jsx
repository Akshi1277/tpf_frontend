'use client';

import { useMemo } from 'react';
import { useRef } from 'react';
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

  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;

    const { current } = scrollRef;
    const scrollAmount = 350;

    current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  /* 🚫 DO NOT RENDER IF EMPTY */
  if (relatedCampaigns.length === 0) {
    return null;
  }

  return (
    <section
      className={`mt-16 ${darkMode ? 'bg-zinc-900' : 'bg-gray-50'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="mb-6">
          <h2
            className={`text-2xl sm:text-3xl font-bold ${darkMode ? 'text-white' : 'text-zinc-900'
              }`}
          >
            Related Campaigns
          </h2>
          <p
            className={`text-sm mt-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'
              }`}
          >
            Similar causes you may want to support
          </p>
        </div>

        {/* Scroll Row with External Buttons */}
        <div className="flex items-center gap-4">

          {/* Left Button */}
          <button
            onClick={() => scroll('left')}
            className={`p-3 rounded-full shadow-md transition ${darkMode
                ? 'bg-zinc-800 text-white hover:bg-zinc-700'
                : 'bg-white text-zinc-900 hover:bg-gray-100'
              }`}
          >
            <ChevronLeft size={20} />
          </button>

          {/* Scroll Container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar py-4"
          >
            {relatedCampaigns.map((campaign) => (
              <div
                key={campaign.slug}
                className="min-w-[300px] max-w-[320px] flex-shrink-0"
              >
                <CampaignCard
                  campaign={campaign}
                  darkMode={darkMode}
                />
              </div>
            ))}
          </div>

          {/* Right Button */}
          <button
            onClick={() => scroll('right')}
            className={`p-3 rounded-full shadow-md transition ${darkMode
                ? 'bg-zinc-800 text-white hover:bg-zinc-700'
                : 'bg-white text-zinc-900 hover:bg-gray-100'
              }`}
          >
            <ChevronRight size={20} />
          </button>

        </div>
      </div>
    </section>


  );
}

