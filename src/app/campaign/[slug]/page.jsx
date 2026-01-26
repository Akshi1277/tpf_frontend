"use client";

import { useParams, useRouter } from "next/navigation";
import { useFetchCampaignBySlugQuery } from "@/utils/slices/campaignApiSlice";
import { useState, useRef } from "react";
import { ArrowLeft } from "lucide-react";

import CampaignHero from "@/components/campaign/CampaignHero";
import CampaignProgress from "@/components/campaign/CampaignProgress";
import CampaignTabs from "@/components/campaign/CampaignTabs";
import DonationCard from "@/components/campaign/DonationCard";
import RelatedCampaigns from "@/components/campaign/RelatedCampaigns";
import FooterCTA from "@/components/campaign/FooterCTA";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlobalLoader from "@/components/GlobalLoader";

export default function CampaignPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(true);
  const donationCardRef = useRef(null);

  const { data, isLoading, error } = useFetchCampaignBySlugQuery(slug, {
    skip: !slug,
  });

  if (isLoading) {
    return <GlobalLoader />
  }

  if (error || !data?.campaign) {
    return (
      <div className="py-24 text-center text-red-600">
        Campaign not found
      </div>
    );
  }

  const campaign = data.campaign;

  const handleDonateClick = () => {
    if (donationCardRef.current) {
      donationCardRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-zinc-900" : "bg-gray-50"}`}>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        scrolled={scrolled}
      />

      {/* Hero Section - Full width with overlay back button */}
      <div className="relative w-full pt-16 md:pt-20">
        {/* BACK BUTTON - Absolute positioned over hero */}
        <div className="absolute top-20 md:top-24 left-4 md:left-8 z-20">
          <button
            type="button"
            onClick={() => router.back()}
            className={`group flex items-center gap-2 transition-colors duration-200 ${darkMode
              ? "text-white hover:text-emerald-400"
              : "text-gray-900 hover:text-emerald-600"
              }`}
            aria-label="Go back"
          >
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-xl border backdrop-blur-md shadow-lg transition-all duration-200 ${darkMode
                ? "bg-black/40 border-white/20 hover:border-emerald-500/50 hover:bg-black/60"
                : "bg-white/70 border-gray-200 hover:border-emerald-500/40 hover:bg-white"
                }`}
            >
              <ArrowLeft size={20} strokeWidth={2.5} />
            </div>

            <span className="hidden sm:inline text-sm font-semibold tracking-wide">
              Back
            </span>
          </button>
        </div>


        {/* HERO - Full width */}
        <CampaignHero
          campaign={campaign}
          darkMode={darkMode}
          onDonateClick={handleDonateClick}
        />
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* PROGRESS */}
        <div className="mt-6">
          <CampaignProgress darkMode={darkMode} campaign={campaign} />
        </div>

        {/* TABS AND DONATION CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mt-6">
          {/* TABS */}
          <div className="lg:col-span-2">
            <CampaignTabs campaign={campaign} darkMode={darkMode} />
          </div>

          {/* DONATION */}
          <div className="lg:col-span-1" ref={donationCardRef}>
            <DonationCard
              campaignId={campaign._id}
              targetAmount={campaign.targetAmount}
              zakatVerified={campaign.zakatVerified}
              taxEligible={campaign.taxBenefits}
              ribaEligible={campaign.ribaEligible}
              allowedDonationTypes={campaign.allowedDonationTypes}
              darkMode={darkMode}
            />
          </div>
        </div>

        {/* RELATED */}
        <RelatedCampaigns
          category={campaign.category}
          currentSlug={campaign.slug}
          darkMode={darkMode}
        />

        <FooterCTA darkMode={darkMode} />
      </div>

      <Footer darkMode={darkMode} />
    </div>
  );
}