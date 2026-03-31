"use client";

import { useState, useEffect } from "react";
import { useFetchCampaignBySlugQuery } from "@/utils/slices/campaignApiSlice";

import DonatePopUpModal from "@/components/campaign/DonateModal";
import FloatingDonateButton from "@/components/campaign/FloatingDonateButton";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlobalLoader from "@/components/GlobalLoader";

import ExpenseHero from "@/components/expenses/ExpenseHero";
import ExpenseProgress from "@/components/expenses/ExpenseProgress";
import ExpensePillars from "@/components/expenses/ExpensePillars";
import ExpenseImpact from "@/components/expenses/ExpenseImpact";
import ExpenseDonateCard from "@/components/expenses/ExpenseDonateCard";
import DonorListModal from "@/components/campaign/DonorListModal";
const EXPENSE_SLUG = "tpf-expesnses-454f4b";

export default function ExpensePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDonorModalOpen, setIsDonorModalOpen] = useState(false);

  const { data, isLoading, error } = useFetchCampaignBySlugQuery(EXPENSE_SLUG, {
    skip: false,
  });

  // Auto-open modal — same logic as campaign/[slug]/page.jsx
  useEffect(() => {
    if (isLoading) return;
    const MAX_AUTO_OPENS = 4;
    const storageKey = "donate_popup_count";
    const count = parseInt(sessionStorage.getItem(storageKey) || "0", 10);
    if (count < MAX_AUTO_OPENS) {
      setIsModalOpen(true);
      sessionStorage.setItem(storageKey, String(count + 1));
    }
  }, [isLoading]);

  if (isLoading) return <GlobalLoader />;

  if (error || !data?.campaign) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-sm">Campaign not found.</p>
      </div>
    );
  }

  const campaign = data.campaign;
  const openDonate = () => setIsModalOpen(true);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-950" : "bg-white"}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} scrolled />

      <ExpenseHero
        campaign={campaign}
        darkMode={darkMode}
        onDonate={openDonate}
      />

      <ExpenseProgress
        campaign={campaign}
        darkMode={darkMode}
        onDonate={openDonate}
        setIsDonorModalOpen={setIsDonorModalOpen}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* On mobile: order-2 (appears second), on desktop: order-none (natural grid flow) */}
          <div className="lg:col-span-8 space-y-0 order-2 lg:order-none">
            <ExpensePillars darkMode={darkMode} onDonate={openDonate} />
            <ExpenseImpact darkMode={darkMode} onDonate={openDonate} />
          </div>

          {/* On mobile: order-1 (appears first, right after Progress), on desktop: order-none */}
          <div className="lg:col-span-4 order-1 lg:order-none">
            <ExpenseDonateCard
              campaignId={campaign._id}
              darkMode={darkMode}
              zakatVerified={campaign.zakatVerified}
              taxEligible={campaign.taxBenefits}
              ribaEligible={campaign.ribaEligible}
              sadaqahEligible={campaign.sadaqahEligible ?? true}
              lillahEligible={campaign.lillahEligible ?? true}
              imdadEligible={campaign.imdadEligible ?? true}
            />
          </div>

        </div>
      </div>

      <Footer darkMode={darkMode} />

      <FloatingDonateButton
        darkMode={darkMode}
        onClick={openDonate}
        isModalOpen={isModalOpen || isDonorModalOpen}
      />

      <DonatePopUpModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        darkMode={darkMode}
        campaignId={campaign._id}
        campaignSlug={campaign.slug}
        zakatVerified={campaign.zakatVerified}
        ribaEligible={campaign.ribaEligible}
        sadaqahEligible={campaign.sadaqahEligible ?? true}
        lillahEligible={campaign.lillahEligible ?? true}
        imdadEligible={campaign.imdadEligible ?? true}
        taxEligible={campaign.taxBenefits}
        unitConfig={campaign.unitConfig}
        allowedDonationTypes={[]}
      />

      <DonorListModal
        isOpen={isDonorModalOpen}
        onClose={() => setIsDonorModalOpen(false)}
        campaignId={campaign._id}
        darkMode={darkMode}
      />
    </div>
  );
}