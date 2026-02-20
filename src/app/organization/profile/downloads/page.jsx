"use client"

import DownloadsPage from "@/components/orgProfile/Downloads/Downloads";

export default function Page() {
  // Get darkMode from parent layout via context or pass it down
  const darkMode = typeof window !== 'undefined' 
    ? localStorage.getItem('darkMode') === 'true' 
    : false;

  return <DownloadsPage darkModeFromParent={darkMode} />;
}