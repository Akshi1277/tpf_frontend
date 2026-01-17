"use client"
import ProfilePage from '@/components/profile/userprofile/UserProfile'

export default function Page() {
  // Get darkMode from parent layout via context or pass it down
  const darkMode = typeof window !== 'undefined' 
    ? localStorage.getItem('darkMode') === 'true' 
    : false;

  return <ProfilePage darkModeFromParent={darkMode} />;
}