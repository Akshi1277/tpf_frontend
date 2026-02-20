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
      setDarkMode(localStorage.getItem("darkMode") === "true");
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("darkModeChanged", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("darkModeChanged", handleStorageChange);
    };
  }, []);
// 🔐 Wait for auth resolution
if (!authChecked) return <GlobalLoader />;

useEffect(() => {
  if (authChecked && (!userInfo || userInfo.type !== "user")) {
    showToast({
      type: "info",
      title: "Please Login to Continue",
      message: "Small intentions lead to meaningful impact ✨",
      duration: 2000,
    });

    router.replace("/login");
  }
}, [authChecked, userInfo, router]);

if (!userInfo || userInfo.type !== "user") {
  return <GlobalLoader />;
}

  return (
    <div
      className={`min-h-screen flex flex-col ${darkMode ? "bg-zinc-950" : "bg-gray-50"
        }`}
    >
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} scrolled={true} />

      <div className="flex flex-1 pt-16">
        <Sidebar darkMode={darkMode} />

        <main className="flex-1 w-full lg:w-auto overflow-x-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-16 sm:pb-20">
            {children}
          </div>
        </main>
      </div>

      <Footer darkMode={darkMode} />
    </div>
  );
}