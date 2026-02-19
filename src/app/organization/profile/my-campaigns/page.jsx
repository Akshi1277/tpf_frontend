"use client";

import MyCampaignsPage from "@/components/orgProfile/MyCampaigns/MyCampaign";


export default function Page() {
  const darkMode =
    typeof window !== "undefined"
      ? localStorage.getItem("darkMode") === "true"
      : false;

  return <MyCampaignsPage darkModeFromParent={darkMode} />;
}