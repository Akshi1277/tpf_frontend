"use client";

import { useState, useEffect, useCallback, memo } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  User,
  Heart,
  FileCheck,
  Receipt,
  ChevronRight,
  X,
  Menu,
  Wrench,
  AlertTriangle,
  ClipboardList,
  HandHeartIcon,
  Download,
  IndianRupeeIcon,
} from "lucide-react";

const menuItems = [
  {
    name: "Profile",
    path: "/profile/userprofile",
    icon: User,
    gradient: "from-blue-500 to-indigo-600",
    activeColor: "blue",
    description: "Manage your account"
  },
  {
    name: "My Donations",
    path: "/profile/mydonation",
    icon: Heart,
    gradient: "from-emerald-500 to-teal-600",
    activeColor: "emerald",
    description: "View your contributions"
  },
  {
    name: "Offline Donations",
    path: "/profile/offline-donations",
    icon: IndianRupeeIcon,
    gradient: "from-cyan-500 to-blue-600",
    activeColor: "emerald",
    description: "Manage Offline Donations"
  },
  {
    name: "KYC Details",
    path: "/profile/kyc-details",
    icon: FileCheck,
    gradient: "from-blue-400 via-cyan-500 to-teal-400",
    activeColor: "purple",
    description: "Verify your identity"
  },
  {
    name: "My Communities",
    path: "/profile/my-communities",
    icon: HandHeartIcon,
    gradient: "from-orange-500 to-red-600",
    activeColor: "orange",
    description: "Manage your Communities"
  },
  {
    name: "My Campaigns",
    path: "/profile/my-campaign",
    icon: ClipboardList,
    gradient: "from-rose-500 to-red-600",
    activeColor: "orange",
    description: "Manage your Fundraisers"
  },
  {
    name: "Downloads",
    path: "/profile/downloads",
    icon: Download,
    gradient: "from-cyan-500 to-blue-600",
    activeColor: "orange",
    description: "Manage your Receipts and Invoices"
  },
  {
    name: "Contact Us",
    path: "/profile/contactpage",
    icon: Wrench,
    gradient: "from-rose-500 to-red-600",
    activeColor: "rose",
    description: "Submit Queries and Feedbacks"
  },
];

const SidebarContent = memo(({ onClose, darkMode, profileCompletion }) => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);


  return (
    <div className="flex flex-col h-full overflow-y-auto scrollbar-hide">
      {/* HEADER */}
      {/* HEADER */}
<div
  className={`px-4 py-4 sm:px-6 sm:py-5 border-b flex-shrink-0 ${
    darkMode ? "border-zinc-800" : "border-gray-200"
  }`}
>
  <div className="flex items-center justify-between mb-1">
    <h2
      className={`text-lg sm:text-xl font-bold ${
        darkMode ? "text-white" : "text-gray-900"
      }`}
    >
      {menuItems.find((i) => i.path === pathname)?.name || "My Profile"}
    </h2>

    <button
      onClick={onClose}
      className={`lg:hidden p-2 rounded-lg transition-colors ${
        darkMode
          ? "hover:bg-zinc-800 text-zinc-400"
          : "hover:bg-gray-100 text-gray-600"
      }`}
    >
      <X className="w-5 h-5" />
    </button>
  </div>

  {/* 🔥 HYDRATION-SAFE PROFILE COMPLETION SECTION */}
  {mounted && (
    <>
      {profileCompletion < 100 && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span
              className={`text-xs sm:text-sm font-medium ${
                darkMode ? "text-zinc-300" : "text-gray-700"
              }`}
            >
              Profile Completion
            </span>
            <span
              className={`text-xs sm:text-sm font-bold ${
                darkMode ? "text-zinc-400" : "text-gray-600"
              }`}
            >
              {`${profileCompletion}%`}
            </span>
          </div>

          <div
            className={`w-full h-2 rounded-full overflow-hidden ${
              darkMode ? "bg-zinc-800" : "bg-gray-200"
            }`}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${profileCompletion}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`h-full rounded-full ${
                profileCompletion >= 75
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500"
                  : profileCompletion >= 50
                  ? "bg-gradient-to-r from-orange-500 to-amber-500"
                  : "bg-gradient-to-r from-red-500 to-rose-500"
              }`}
            />
          </div>

          <p
            className={`text-[10px] sm:text-xs mt-1.5 ${
              darkMode ? "text-zinc-500" : "text-gray-500"
            }`}
          >
            Complete your profile to unlock all features
          </p>
        </div>
      )}

      {profileCompletion === 100 && (
        <div
          className={`mt-4 px-4 py-3 rounded-xl text-center border backdrop-blur-sm ${
            darkMode
              ? "bg-emerald-900/10 border-emerald-800/40"
              : "bg-emerald-50/70 border-emerald-200"
          }`}
        >
          <p
            className={`text-[13px] font-semibold ${
              darkMode ? "text-emerald-300" : "text-emerald-700"
            }`}
          >
            “Every act of kindness is a charity.”
          </p>
        </div>
      )}
    </>
  )}
</div>


      

      {/* MENU */}
      <nav className="flex-1 p-2 sm:p-3 pb-6">
        <div className="flex flex-col space-y-1.5 sm:space-y-2">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;

            return (
              <Link key={item.path} href={item.path} className="block">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative group rounded-xl sm:rounded-2xl transition-all duration-300 border-2 ${
                    isActive
                      ? darkMode
                        ? "bg-zinc-800/80 shadow-xl border-transparent"
                        : "bg-gradient-to-r from-gray-50 to-white shadow-xl border-gray-200"
                      : darkMode
                      ? "hover:bg-zinc-800/50 border-transparent"
                      : "hover:bg-gray-50 border-transparent"
                  }`}
                >
                  {/* RED ALERT ICON FOR INCOMPLETE SECTIONS */}
                {mounted && item.incomplete && (
  <AlertTriangle className="absolute right-9 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />
)}

                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-r-full bg-gradient-to-b ${item.gradient} shadow-lg`}
                    />
                  )}

                  <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-3.5">
                    <div className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                      isActive
                        ? `bg-gradient-to-br ${item.gradient} shadow-lg shadow-${item.activeColor}-500/30`
                        : darkMode
                        ? "bg-zinc-800"
                        : "bg-gray-100"
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        isActive ? "text-white" : darkMode ? "text-zinc-400" : "text-gray-600"
                      }`} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className={`text-sm sm:text-base font-semibold mb-0.5 ${
                        isActive
                          ? darkMode ? "text-white" : "text-gray-900"
                          : darkMode ? "text-zinc-300" : "text-gray-700"
                      }`}>
                        {item.name}
                      </h3>
                      <p className={`text-[10px] sm:text-xs truncate ${
                        isActive
                          ? darkMode ? "text-zinc-400" : "text-gray-600"
                          : darkMode ? "text-zinc-500" : "text-gray-500"
                      }`}>
                        {item.description}
                      </p>
                    </div>

                    <ChevronRight className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ${
                      isActive
                        ? darkMode ? "text-white translate-x-1" : "text-gray-900 translate-x-1"
                        : darkMode
                        ? "text-zinc-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
                        : "text-gray-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
                    }`} />
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
});

SidebarContent.displayName = "SidebarContent";

function Sidebar({ darkMode }) {
  const pathname = usePathname();
  const user = useSelector((state) => state.auth.userInfo);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => setIsMobileOpen((prev) => !prev), []);
  const closeMobileMenu = useCallback(() => setIsMobileOpen(false), []);

  // PHASE 1 — Profile fields 50%
  const calcProfile = () => {
  let score = 0;
  if (user?.fullName) score += 15;
  if (user?.email) score += 15;
  if (user?.mobileNo) score += 15;
  if (user?.bloodGroup) score += 15;
  if (user?.gender) score += 15;
  if (user?.dob) score += 15;
  if (user?.profession) score += 10;

  return score; // 0–100
};


  // PHASE 2 — KYC 50%
  const calcKyc = () => {
  const k = user?.kycDetails;
  if (!k) return 0;

  const hasAll =
    k.fullLegalName &&
    k.panNumber &&
    k.address &&
    k.city &&
    k.state ;

  return hasAll ? 100 : 0;
};


  const profilePhase = calcProfile(); // 0–100
  const kycPhase = calcKyc(); // 0–100

  const totalCompletion = Math.round(profilePhase * 0.5 + kycPhase * 0.5);

  // FLAG for red ❗ markers
  menuItems.find((i) => i.path === "/profile/userprofile").incomplete = profilePhase < 100;
  menuItems.find((i) => i.path === "/profile/kyc-details").incomplete = kycPhase < 100;

  useEffect(() => closeMobileMenu(), [pathname, closeMobileMenu]);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "unset";
  }, [isMobileOpen]);

  return (
    <>
      {/* MOBILE BUTTON */}
      <button
        onClick={toggleMobileMenu}
        className={`lg:hidden fixed right-4 sm:right-6 bottom-20 sm:bottom-24 z-40 p-3 sm:p-4 rounded-full shadow-2xl transition-all ${
          darkMode
            ? "bg-gradient-to-br from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text:white"
            : "bg-gradient-to-br from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
        }`}
      >
        <Menu className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
      </button>

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobileMenu}
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
        )}
      </AnimatePresence>

      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`lg:hidden fixed top-0 left-0 bottom-0 w-72 sm:w-80 z-50 ${
              darkMode ? "bg-zinc-900" : "bg-white"
            } shadow-2xl`}
          >
            <SidebarContent
              onClose={closeMobileMenu}
              darkMode={darkMode}
              profileCompletion={totalCompletion}
            />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* DESKTOP SIDEBAR */}
      <aside
        className={`hidden lg:block sticky w-64 xl:w-80 border-r ${
          darkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-gray-200"
        } shadow-xl`}
        style={{ top: "64px", height: "calc(100vh - 64px)", zIndex: 20 }}
      >
        <SidebarContent darkMode={darkMode} profileCompletion={totalCompletion} />
      </aside>
    </>
  );
}

export default memo(Sidebar);
