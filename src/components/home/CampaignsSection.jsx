// components/home/CampaignsSection.jsx
'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import CampaignCard from '@/components/ui/CampaignCard';
import { useCMS } from '@/app/CMSContext';
import Link from 'next/link';
import { getMediaUrl } from '@/utils/media';

export default function CampaignsSection({ darkMode }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [campaignScrollIndex, setCampaignScrollIndex] = useState(0);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  const containerRef = useRef(null);
  const cms = useCMS();

  /* --------------------------------
     Helpers
  --------------------------------- */
  const calcDaysLeft = (deadline) => {
    const end = new Date(deadline);
    const now = new Date();
    return Math.max(
      0,
      Math.ceil((end - now) / (1000 * 60 * 60 * 24))
    );
  };

  /* --------------------------------
     🔒 ACTIVE CAMPAIGNS (HARD GATE)
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
      .map((campaign) => ({
        ...campaign,
        image: campaign.imageUrl
          ? getMediaUrl(campaign.imageUrl)
          : null,
        video: campaign.videoUrl
          ? getMediaUrl(campaign.videoUrl)
          : null,
        raised: Number(campaign.raisedAmount || 0),
        goal: Number(campaign.requiredAmount || campaign.goal || 0),
        org: campaign.organization || '',
        urgent: Boolean(campaign.isUrgent),
        taxBenefit: Boolean(campaign.taxBenefits),
        validityDate: campaign.deadline
          ? calcDaysLeft(campaign.deadline)
          : null,
        zakatVerified: Boolean(campaign.zakatVerified),
        slug: campaign.campaignSlug,
      }));
  }, [cms]);

  /* --------------------------------
     Category Filter (ACTIVE ONLY)
  --------------------------------- */
  const filteredCampaigns = useMemo(() => {
    if (selectedCategory === 'all') return activeCampaigns;
    return activeCampaigns.filter(
      (c) => c.category === selectedCategory
    );
  }, [activeCampaigns, selectedCategory]);

  /* --------------------------------
     🚫 HARD STOP — NO ACTIVE CAMPAIGNS
  --------------------------------- */
  if (!filteredCampaigns.length) {
    return null;
  }

  /* --------------------------------
     Infinite Scroll Setup
  --------------------------------- */
  const MIN_CARDS_FOR_INFINITE = 5;
  const enableInfiniteScroll =
    filteredCampaigns.length > MIN_CARDS_FOR_INFINITE;

  const infiniteCampaigns = useMemo(() => {
    return enableInfiniteScroll
      ? [...filteredCampaigns, ...filteredCampaigns]
      : filteredCampaigns;
  }, [filteredCampaigns, enableInfiniteScroll]);

  /* --------------------------------
     Scroll Helpers
  --------------------------------- */
  const getScrollAmount = () => {
    const container = containerRef.current;
    if (!container) return 0;
    const cardWidth = container.children[0]?.offsetWidth || 0;
    return cardWidth + 20;
  };

  const scrollLeft = () => {
    containerRef.current?.scrollBy({
      left: -getScrollAmount(),
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    containerRef.current?.scrollBy({
      left: getScrollAmount(),
      behavior: 'smooth',
    });
  };

  /* --------------------------------
     Auto Scroll
  --------------------------------- */
  useEffect(() => {
    if (!enableInfiniteScroll || isUserScrolling) return;

    const interval = setInterval(() => {
      setCampaignScrollIndex((i) => i + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, [enableInfiniteScroll, isUserScrolling]);

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
      }, 400);
    }
  }, [campaignScrollIndex, filteredCampaigns.length, enableInfiniteScroll]);

  /* --------------------------------
     User Scroll Detection
  --------------------------------- */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let timeout;

    const onScroll = () => {
      setIsUserScrolling(true);
      clearTimeout(timeout);
      timeout = setTimeout(
        () => setIsUserScrolling(false),
        2000
      );
    };

    container.addEventListener('scroll', onScroll, {
      passive: true,
    });
    return () =>
      container.removeEventListener('scroll', onScroll);
  }, []);

  /* --------------------------------
     Reset on Category Change
  --------------------------------- */
  useEffect(() => {
    setCampaignScrollIndex(0);
    containerRef.current?.scrollTo({
      left: 0,
      behavior: 'auto',
    });
  }, [selectedCategory]);

  /* --------------------------------
     Render
  --------------------------------- */
  return (
    <section
      id="campaigns"
      className={`py-10 ${darkMode ? 'bg-zinc-800' : 'bg-white'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2
            className={`text-3xl md:text-4xl font-bold ${darkMode ? 'text-white' : 'text-zinc-900'
              }`}
          >
            Fundraising now
          </h2>

          <Link href="/all-campaigns">
            <button className="text-xs sm:text-sm font-medium bg-emerald-600 px-4 py-2 rounded-full text-white hover:animate-pulse">
              Discover more
            </button>
          </Link>
        </div>

        <div className="relative">
          {enableInfiniteScroll && (
            <button
              onClick={scrollLeft}
              className="hidden md:flex absolute -left-10 top-1/2 -translate-y-1/2 z-10"
            >
              ◀
            </button>
          )}

          <div
            ref={containerRef}
            className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide"
          >
            {infiniteCampaigns.map((campaign, index) => (
              <div
                key={`${campaign._id}-${index}`}
                className="flex-shrink-0 w-[285px]"
              >
                <CampaignCard
                  campaign={campaign}
                  darkMode={darkMode}
                />
              </div>
            ))}
          </div>

          {enableInfiniteScroll && (
            <button
              onClick={scrollRight}
              className="hidden md:flex absolute -right-10 top-1/2 -translate-y-1/2 z-10"
            >
              ▶
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
