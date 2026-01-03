"use client";

import { useParams } from "next/navigation";
import { useFetchCampaignBySlugQuery } from "@/utils/slices/campaignApiSlice";
import { useState } from "react";

import CampaignHero from "@/components/campaign/CampaignHero";
import CampaignProgress from "@/components/campaign/CampaignProgress";
import CampaignTabs from "@/components/campaign/CampaignTabs";
import DonationCard from "@/components/campaign/DonationCard";
import RelatedCampaigns from "@/components/campaign/RelatedCampaigns";
import FooterCTA from "@/components/campaign/FooterCTA";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function CampaignPage() {
  const { slug } = useParams();
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(true);

  const { data, isLoading, error } = useFetchCampaignBySlugQuery(slug, {
    skip: !slug,
  });

  if (isLoading) {
    return <div className="py-24 text-center">Loading campaign…</div>;
  }

  if (error || !data?.campaign) {
    return (
      <div className="py-24 text-center text-red-600">
        Campaign not found
      </div>
    );
  }

  const campaign = data.campaign;
  console.log(campaign)


  return (
    <div className={`min-h-screen ${darkMode ? "bg-zinc-900" : "bg-gray-50"}`}>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        scrolled={scrolled}
      />

      <div className="max-w-7xl pt-30 sm:pt-36 md:pt-30 mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* HERO */}
        <CampaignHero campaign={campaign} darkMode={darkMode} />

        {/* PROGRESS */}
       <CampaignProgress darkMode={darkMode} campaign={campaign} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* TABS */}
          <div className="lg:col-span-2">
            <CampaignTabs campaign={campaign} darkMode={darkMode} />
          </div>

          {/* DONATION */}
          <div className="lg:col-span-1">
            <DonationCard
              campaignId={campaign._id}
              targetAmount={campaign.targetAmount}
              darkMode={darkMode}
            />
          </div>
        </div>

        {/* RELATED */}
        <RelatedCampaigns
          category={campaign.category}
          currentCampaignId={campaign._id}
          darkMode={darkMode}
        />

        <FooterCTA darkMode={darkMode} />
      </div>

      <Footer darkMode={darkMode} />
    </div>
  );
}
