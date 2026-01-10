"use client";

import { useParams, useRouter } from "next/navigation";
import { useFetchCampaignBySlugQuery } from "@/utils/slices/campaignApiSlice";
import { useState } from "react";
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
  console.log(campaign)


  return (
    <div className={`min-h-screen ${darkMode ? "bg-zinc-900" : "bg-gray-50"}`}>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        scrolled={scrolled}
      />

      <div className="max-w-7xl pt-30 sm:pt-36 md:pt-30 mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* BACK BUTTON */}
        <button
          onClick={() => router.back()}
          className={`group flex items-center gap-2 mb-6 transition-colors ${darkMode
              ? "text-zinc-400 hover:text-white"
              : "text-gray-600 hover:text-gray-900"
            }`}
        >
          <div className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-all shadow-sm group-hover:shadow-md ${darkMode
              ? "bg-zinc-800 border-zinc-700 group-hover:border-emerald-500"
              : "bg-white border-gray-200 group-hover:border-emerald-500"
            }`}>
            <ArrowLeft size={20} strokeWidth={2.5} className="group-hover:text-emerald-600" />
          </div>
          <span className="font-bold text-sm">Back</span>
        </button>

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
              zakatVerified={campaign.zakatVerified}
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
