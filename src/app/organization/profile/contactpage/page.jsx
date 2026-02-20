"use client"

import ContactPage from "@/components/orgProfile/contactpage/ContactPage";


export default function Page() {
  // Get darkMode from parent layout via context or pass it down
  const darkMode = typeof window !== 'undefined' 
    ? localStorage.getItem('darkMode') === 'true' 
    : false;

  return <ContactPage darkModeFromParent={darkMode} />;
}