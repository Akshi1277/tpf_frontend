"use client"
import OfflineDonationsPage from "@/components/profile/offline-donations/OfflineDonation";

export default function Page() {
  // Get darkMode from parent layout via context or pass it down
  const darkMode = typeof window !== 'undefined' 
    ? localStorage.getItem('darkMode') === 'true' 
    : false;

  return <OfflineDonationsPage darkModeFromParent={darkMode} />;
}