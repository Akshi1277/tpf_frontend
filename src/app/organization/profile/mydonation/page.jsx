"use client"
import DonationsPage from "@/components/orgProfile/MyDonations/Donation";
export default function Page() {
  // Get darkMode from parent layout via context or pass it down
  const darkMode = typeof window !== 'undefined' 
    ? localStorage.getItem('darkMode') === 'true' 
    : false;

  return <DonationsPage darkModeFromParent={darkMode} />;
}