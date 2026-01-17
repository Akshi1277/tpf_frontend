"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/Sidebar";
import GlobalLoader from "@/components/GlobalLoader";
import { useAppToast } from "@/app/AppToastContext";
import { useState, useEffect, useRef } from "react";

export default function ProfileLayout({ children }) {
  const { userInfo, authChecked } = useSelector((state) => state.auth);
  const router = useRouter();
  const { showToast } = useAppToast();

  const redirectingRef = useRef(false);

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("darkMode") === "true";
    }
    return false;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const savedMode = localStorage.getItem("darkMode");
      setDarkMode(savedMode === "true");
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("darkModeChanged", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("darkModeChanged", handleStorageChange);
    };
  }, []);

  /* ------------------------------------------------------------------
     UX IMPROVEMENTS ONLY (NO LOGIC CHANGES)
  ------------------------------------------------------------------ */

  // 1. While auth state is resolving → show global loader
  if (!authChecked) {
    return <GlobalLoader />;
  }

  // 2. Auth checked but user not logged in → toast + graceful redirect
  if (!userInfo) {
    if (!redirectingRef.current) {
      redirectingRef.current = true;
      showToast({
        type: "info",
        title: "Login Required",
        message: "Every good intention begins with the right step ✨",
        duration: 2000,
      });



      setTimeout(() => {
        router.replace("/login");
      }, 1000);
    }

    return <GlobalLoader />;
  }

  /* ------------------------------------------------------------------ */

  return (
    <div
      className={`min-h-screen flex flex-col ${darkMode ? "bg-zinc-950" : "bg-gray-50"
        }`}
    >
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        scrolled={true}
      />

      <div className="flex flex-1 pt-16">
        {/* Sidebar (unchanged) */}
        <Sidebar darkMode={darkMode} />

        {/* Main content */}
        <main className="flex-1 w-full lg:w-auto overflow-x-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-16 sm:pb-20">
            {children}
          </div>
        </main>
      </div>

      {/* Footer (unchanged) */}
      <Footer darkMode={darkMode} />
    </div>
  );
}
