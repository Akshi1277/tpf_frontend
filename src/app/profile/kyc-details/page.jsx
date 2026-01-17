"use client"
import KYCPage from "@/components/profile/kycdetails/KYCDetails";

export default function Page() {
  // Get darkMode from parent layout via context or pass it down
  const darkMode = typeof window !== 'undefined' 
    ? localStorage.getItem('darkMode') === 'true' 
    : false;

  return <KYCPage darkModeFromParent={darkMode} />;
}