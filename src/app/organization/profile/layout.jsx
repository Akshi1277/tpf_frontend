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

  if (!authChecked) return <GlobalLoader />;

  if (!userInfo || userInfo.role !== "organization") {
    if (!redirectingRef.current) {
      redirectingRef.current = true;
      showToast({
        type: "info",
        title: "Access Denied",
        message: "Please log in as an organization to continue.",
        duration: 2000,
      });
      setTimeout(() => router.replace("/organization/login"), 1000);
    }
    return <GlobalLoader />;
  }

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode ? "bg-zinc-950" : "bg-gray-50"
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