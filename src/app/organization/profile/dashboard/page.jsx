"use client";

import OrgDashboard from "@/components/orgProfile/OrgDashboard";

export default function Page() {
  const darkMode =
    typeof window !== "undefined"
      ? localStorage.getItem("darkMode") === "true"
      : false;

  return <OrgDashboard darkModeFromParent={darkMode} />;
}