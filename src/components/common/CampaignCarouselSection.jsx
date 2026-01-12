'use client';
import { useState, useEffect, useRef, useMemo } from 'react';
import CampaignCard from '@/components/ui/CampaignCard';
import { useCMS } from '@/app/CMSContext';
import { getMediaUrl } from '@/utils/media';

const calcDaysLeft = (deadline) => {
    const end = new Date(deadline);
    const now = new Date();
    return Math.max(0, Math.ceil((end - now) / (1000 * 60 * 60 * 24)));
};

export default function CampaignCarouselSection({ darkMode, title = "Ongoing Campaigns", subtitle = "Explore causes that matter most to our community" }) {
    const [scrollIndex, setScrollIndex] = useState(0);
    const [isUserScrolling, setIsUserScrolling] = useState(false);
    const containerRef = useRef(null);
    const cms = useCMS();

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

    const infiniteCampaigns = useMemo(() => {
        if (activeCampaigns.length === 0) return [];
        // Only loop if we have enough items
        return activeCampaigns.length >= 3 ? [...activeCampaigns, ...activeCampaigns] : activeCampaigns;
    }, [activeCampaigns]);

    useEffect(() => {
        if (isUserScrolling || infiniteCampaigns.length <= 1) return;
        const interval = setInterval(() => {
            setScrollIndex(prev => prev + 1);
        }, 4000);
        return () => clearInterval(interval);
    }, [isUserScrolling, infiniteCampaigns.length]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container || infiniteCampaigns.length <= 1) return;

        const firstCard = container.children[0];
        if (!firstCard) return;

        const cardWidth = firstCard.offsetWidth;
        const gap = 20;
        const scrollTo = (cardWidth + gap) * scrollIndex;

        container.scrollTo({ left: scrollTo, behavior: 'smooth' });

        // Handle Infinite Loop
        if (scrollIndex >= activeCampaigns.length && activeCampaigns.length >= 3) {
            setTimeout(() => {
                container.scrollTo({ left: 0, behavior: 'auto' });
                setScrollIndex(0);
            }, 500);
        }
    }, [scrollIndex, activeCampaigns.length, infiniteCampaigns.length]);

    const scrollLeft = () => {
        setIsUserScrolling(true);
        setScrollIndex(prev => prev > 0 ? prev - 1 : activeCampaigns.length - 1);
        setTimeout(() => setIsUserScrolling(false), 5000);
    };

    const scrollRight = () => {
        setIsUserScrolling(true);
        setScrollIndex(prev => prev + 1);
        setTimeout(() => setIsUserScrolling(false), 5000);
    };

    if (activeCampaigns.length === 0) return null;

    return (
        <section className={`py-14 sm:py-20 ${darkMode ? 'bg-zinc-900 border-t border-zinc-800' : 'bg-zinc-50 border-t border-zinc-200'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-1 w-12 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"></div>
                        <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                        <div className="h-1 w-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
                    </div>
                    <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                        {title.split(' ').map((word, i) => (
                            i === title.split(' ').length - 1 ?
                                <span key={i} className="bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-500 text-transparent bg-clip-text"> {word}</span>
                                : <span key={i}>{word} </span>
                        ))}
                    </h2>
                    <p className={`text-base sm:text-lg max-w-2xl mx-auto ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        {subtitle}
                    </p>
                </div>

                <div className="relative group/carousel">
                    {/* LEFT ARROW */}
                    <button
                        onClick={scrollLeft}
                        className="hidden md:flex items-center justify-center
                       absolute -left-6 lg:-left-12 top-1/2 -translate-y-1/2 z-10
                       h-10 w-10 rounded-full
                       border-2 border-emerald-600 dark:border-emerald-500/50
                       bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm
                       shadow-[0_0_15px_rgba(16,185,129,0.2)]
                       hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]
                       hover:scale-110 transition-all duration-300
                       text-emerald-700 dark:text-emerald-400
                       opacity-0 group-hover/carousel:opacity-100"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <div
                        ref={containerRef}
                        className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {infiniteCampaigns.map((campaign, index) => (
                            <div
                                key={`campaign-carousel-${campaign._id || campaign.id}-${index}`}
                                className="flex-shrink-0 w-[290px] sm:w-[330px] md:w-[350px] snap-start"
                            >
                                <div className="px-1 transform transition-transform duration-300 hover:scale-[1.02]">
                                    <CampaignCard campaign={campaign} darkMode={darkMode} />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* RIGHT ARROW */}
                    <button
                        onClick={scrollRight}
                        className="hidden md:flex items-center justify-center
                       absolute -right-6 lg:-right-12 top-1/2 -translate-y-1/2 z-10
                       h-10 w-10 rounded-full
                       border-2 border-emerald-600 dark:border-emerald-500/50
                       bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm
                       shadow-[0_0_15px_rgba(16,185,129,0.2)]
                       hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]
                       hover:scale-110 transition-all duration-300
                       text-emerald-700 dark:text-emerald-400
                       opacity-0 group-hover/carousel:opacity-100"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}
