'use client';

import { useState, useEffect, useMemo } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CampaignCard from '@/components/ui/CampaignCard';
import { useCMS } from '@/app/CMSContext';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { getMediaUrl } from '@/utils/media';

export default function AllCampaignsPage() {
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            try {
                const saved = localStorage.getItem('darkMode');
                return saved ? JSON.parse(saved) : false;
            } catch (error) {
                return false;
            }
        }
        return false;
    });

    const [scrolled, setScrolled] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);


    const cms = useCMS();

    const validFundraisers = useMemo(() => {
        if (!Array.isArray(cms)) return [];

        return cms
            .filter(
                (item) =>
                    item.type === "fundraiser" &&
                    item.campaignStatus === "ACTIVE" &&
                    typeof item.campaignSlug === "string" &&
                    item.campaignSlug.trim().length > 0
            )
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }, [cms]);

    // Dynamic categories extracted from valid fundraisers
    const dynamicCategories = useMemo(() => {
        const cats = Array.from(new Set(validFundraisers.map(f => f.category)))
            .filter(Boolean)
            .sort();
        return [
            { key: 'all', label: 'All' },
            ...cats.map(cat => ({ key: cat, label: cat }))
        ];
    }, [validFundraisers]);



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

    const COLORS = {
        neutralHeading: darkMode ? "text-white" : "text-zinc-900",
        neutralBody: darkMode ? "text-zinc-400" : "text-zinc-600",
    };

    return (
        <div className={`min-h-screen font-sans ${darkMode ? 'bg-zinc-900' : 'bg-white'}`}>
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} scrolled={scrolled} />

            <main className="pt-40 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${COLORS.neutralHeading}`}>
                        All Campaigns
                    </h1>
                    <p className={`text-lg ${COLORS.neutralBody}`}>
                        Support the causes that matter to you
                    </p>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {dynamicCategories.map((cat) => (
                        <button
                            key={cat.key}
                            onClick={() => setSelectedCategory(cat.key)}
                            className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${selectedCategory === cat.key
                                ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                                : darkMode
                                    ? "border-zinc-700 bg-zinc-800 text-zinc-300 hover:border-emerald-500"
                                    : "border-zinc-200 bg-white text-zinc-700 hover:border-emerald-500"
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredCampaigns.map((campaign, index) => (
                        <div key={`${campaign._id}-${index}`} className="flex justify-center">
                            <div className="w-full max-w-[285px]">
                                <CampaignCard
                                    campaign={{
                                        ...campaign,
                                        image: campaign.imageUrl ? getMediaUrl(campaign.imageUrl) : null,
                                        video: campaign.videoUrl ? getMediaUrl(campaign.videoUrl) : null,
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
                        </div>
                    ))}
                </div>

                {filteredCampaigns.length === 0 && (
                    <div className={`text-center py-20 ${COLORS.neutralBody}`}>
                        <p className="text-xl">No campaigns found in this category.</p>
                    </div>
                )}
            </main>

            <Footer darkMode={darkMode} />
            <ScrollToTop scrolled={scrolled} />
        </div>
    );
}
