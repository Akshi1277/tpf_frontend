"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import OrgSidebar from "@/components/layout/OrgSidebar";
import GlobalLoader from "@/components/GlobalLoader";
import { useAppToast } from "@/app/AppToastContext";
import { useState, useEffect, useRef } from "react";

export default function OrgLayout({ children }) {
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
    if (authChecked && (!userInfo || userInfo.type !== "organization")) {
      showToast({
        type: "info",
        title: "Please Login to Continue",
        message: "Small intentions lead to meaningful impact ✨",
        duration: 2000,
      });

      router.replace("/organization/login");
    }
  }, [authChecked, userInfo, router]);

  if (!userInfo || userInfo.type !== "organization") {
    return <GlobalLoader />;
  }

  return (
    <div
      className={`min-h-screen flex flex-col ${darkMode ? "bg-zinc-950" : "bg-gray-50"
        }`}
    >
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} scrolled={true} />

      <div className="flex flex-1 pt-16">
        <OrgSidebar darkMode={darkMode} />

        <main className="flex-1 w-full lg:w-auto overflow-x-hidden">
          {/* pass darkMode down through page → dashboard component */}
          <div className="w-full">
            {children}
          </div>
        </main>
      </div>

      <Footer darkMode={darkMode} />
    </div>
  );
}