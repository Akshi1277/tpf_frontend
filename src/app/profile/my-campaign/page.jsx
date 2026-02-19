"use client"

import MyCampaignsPage from "@/components/orgProfile/MyCampaigns/MyCampaign";

export default function Page() {
  // Get darkMode from parent layout via context or pass it down
  const darkMode = typeof window !== 'undefined' 
    ? localStorage.getItem('darkMode') === 'true' 
    : false;

  return <MyCampaignsPage darkModeFromParent={darkMode} />;
}