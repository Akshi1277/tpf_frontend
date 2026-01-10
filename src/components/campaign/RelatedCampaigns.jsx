'use client';

import { useMemo } from 'react';

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
    if (!Array.isArray(cms) || !currentSlug || !category) return [];

    const normalizedCurrentSlug = String(currentSlug)
      .trim()
      .toLowerCase();

    const normalizedCategory = String(category)
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

        const itemCategory = String(item.category || '')
          .trim()
          .toLowerCase();

        // 🚫 EXCLUDE CURRENT CAMPAIGN (HARD STOP)
        if (itemSlug === normalizedCurrentSlug) {
          return false;
        }

        // ✅ SAME CATEGORY ONLY
        if (itemCategory !== normalizedCategory) {
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
      }))
      .slice(0, 6); // UX limit
  }, [cms, category, currentSlug]);

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

        {/* Responsive Grid */}
        <div
          className="
            grid gap-6
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {relatedCampaigns.map((campaign) => (
            <CampaignCard
              key={campaign.slug}
              campaign={campaign}
              darkMode={darkMode}
            />
          ))}
        {/* Responsive Grid */}
        <div
          className="
            grid gap-6
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {relatedCampaigns.map((campaign) => (
            <CampaignCard
              key={campaign.slug}
              campaign={campaign}
              darkMode={darkMode}
            />
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}

