"use client"

import MyCommunitiesPage from "@/components/profile/my-communities/MyCommunities";

export default function Page() {
  // Get darkMode from parent layout via context or pass it down
  const darkMode = typeof window !== 'undefined' 
    ? localStorage.getItem('darkMode') === 'true' 
    : false;

  return <MyCommunitiesPage darkModeFromParent={darkMode} />;
}