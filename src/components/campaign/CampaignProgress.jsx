"use client"
import { motion } from "framer-motion";
import {
  TrendingUp,
  Calendar,
  Users,
  IndianRupee,
  Shield,
  CheckCircle,
  CreditCard,
  Heart,
  ArrowRight
} from "lucide-react";
import { useState } from "react";
import Image from 'next/image';
import DonateModal from "./DonationCard";
import DonatePopUpModal from "./DonateModal";
import ShareModal from "../ui/ShareModal";
import { useToggleWishlistMutation } from '@/utils/slices/authApiSlice';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

export default function CampaignProgress({ darkMode, campaign }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openShare, setOpenShare] = useState(false);

  const router = useRouter();
  const { userInfo } = useSelector((state) => state.auth);
  const wishlist = userInfo?.wishlist || [];

  const [toggleWishlist] = useToggleWishlistMutation();

  if (!campaign) return null;

  const {
    raisedAmount = 0,
    targetAmount = 0,
    totalDonors = 0,
    deadline,
    _id: campaignId,
    slug,
    title,
    source,
    fundsDisbursed = 0,
    allowedDonationTypes = [],
  } = campaign;

  const isFoundation = source === "FOUNDATION";

  const saved = wishlist.includes(campaignId);

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/campaign/${slug}`
      : "";

  const percentage =
    !isFoundation && targetAmount > 0
      ? Math.min(Math.round((raisedAmount / targetAmount) * 100), 100)
      : 100;

  const daysLeft = deadline
    ? Math.max(
      0,
      Math.ceil(
        (new Date(deadline).getTime() - Date.now()) /
        (1000 * 60 * 60 * 24)
      )
    )
    : 0;

  const avgDonation =
    totalDonors > 0 ? Math.round(raisedAmount / totalDonors) : 0;

  const formatNumber = (num) => num.toLocaleString('en-IN');

  const handleToggleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!userInfo) {
      router.push("/login");
      return;
    }

    try {
      await toggleWishlist(campaignId).unwrap();
    } catch (err) {
      console.error("Wishlist toggle failed", err);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`${darkMode ? "bg-zinc-800" : "bg-white"
          } rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* LEFT: PROGRESS */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg ${darkMode ? 'bg-emerald-500/10' : 'bg-emerald-50'}`}>
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
                </div>
                <h3
                  className={`text-base sm:text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"
                    }`}
                >
                  Campaign Progress
                </h3>
              </div>

              {/* Share and Wishlist Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleToggleWishlist}
                  className={`transition-all duration-200 hover:scale-110 ${saved
                    ? "text-red-500"
                    : darkMode
                      ? "text-zinc-400 hover:text-red-400"
                      : "text-zinc-600 hover:text-red-600"
                    }`}
                  title={saved ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill={saved ? "currentColor" : "none"}
                  />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenShare(true);
                  }}
                  className={`flex items-center gap-1 transition-all duration-200 hover:scale-110 ${darkMode ? 'text-zinc-400 hover:text-emerald-400' : 'text-zinc-600 hover:text-emerald-600'
                    }`}
                  title="Share campaign"
                >
                  <Image
                    src="/share.svg"
                    alt="Share"
                    width={24}
                    height={24}
                    className="w-5 h-5 sm:w-6 sm:h-6 rotate-45"
                  />
                </button>
              </div>
            </div>

            {/* Amount */}
            <div className="mb-6">
              {isFoundation ? (
                <div className="flex flex-wrap items-end gap-1.5 sm:gap-3 mb-4 sm:mb-6">
                  <div className="text-2xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent leading-none">
                    ₹{formatNumber(fundsDisbursed)}
                  </div>
                  <div className={`text-xs sm:text-base md:text-lg pb-0.5 sm:pb-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Total Funds Disbursed
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap items-end gap-1.5 sm:gap-3 mb-4 sm:mb-6">
                  <div className="text-2xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent leading-none">
                    {percentage}%
                  </div>
                  <div className={`text-xs sm:text-base md:text-lg pb-0.5 sm:pb-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    of ₹{formatNumber(targetAmount)}
                  </div>
                </div>
              )}

              {/* Progress bar */}
              <div className="relative">
                <div
                  className={`relative w-full h-2.5 sm:h-3 rounded-full overflow-hidden ${darkMode ? "bg-zinc-700" : "bg-gray-200"
                    }`}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-500 relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>
                </div>
                {percentage > 0 && (
                  <div
                    className="absolute top-0 h-2.5 sm:h-3 w-1 bg-white rounded-full shadow-lg"
                    style={{ left: `${Math.min(percentage, 98)}%` }}
                  />
                )}
              </div>

              {/* Motivational message */}
              {percentage < 100 && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className={`mt-4 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-l-4 border-emerald-500 ${darkMode
                    ? "bg-gradient-to-r from-emerald-500/10 to-transparent text-gray-200"
                    : "bg-gradient-to-r from-emerald-50 to-transparent text-gray-800"
                    }`}
                >
                  <p className="text-xs sm:text-sm font-medium">
                    Every contribution brings hope to those in need
                  </p>
                </motion.div>
              )}
            </div>

            {/* DONATE NOW BUTTON - Updated Design */}
            <motion.button
              onClick={() => setIsModalOpen(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                w-full sm:w-auto mb-6
                group relative overflow-hidden
                px-5 sm:px-8 py-3 sm:py-3.5
                bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500
                text-white font-bold text-sm sm:text-base
                rounded-xl
                shadow-lg shadow-emerald-500/30
                hover:shadow-xl hover:shadow-emerald-500/40
                transition-all duration-300
                flex items-center justify-center gap-2
              `}
            >
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ["-200%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />

              {/* Button content */}
              <div className="relative flex items-center gap-2.5">
                <Heart className="w-5 h-5 sm:w-5 sm:h-5" fill="currentColor" />
                <span>Donate Now</span>
                <motion.div
                  className="flex items-center"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.div>
              </div>
            </motion.button>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <StatCard
                darkMode={darkMode}
                icon={<Users className="w-4 h-4 sm:w-5 sm:h-5" />}
                value={formatNumber(totalDonors)}
                label="Donors"
                color="emerald"
              />
              <StatCard
                darkMode={darkMode}
                icon={<Calendar className="w-4 h-4 sm:w-5 sm:h-5" />}
                value={isFoundation ? "Permanent" : formatNumber(daysLeft)}
                label={isFoundation ? "Fund Status" : "Days Left"}
                color="blue"
              />
              <StatCard
                darkMode={darkMode}
                icon={<IndianRupee className="w-4 h-4 sm:w-5 sm:h-5" />}
                value={`₹${formatNumber(avgDonation)}`}
                label="Avg. Donation"
                color="purple"
              />
            </div>
          </div>

          {/* RIGHT: TRUST */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <div className={`absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 rounded-full ${darkMode ? 'bg-emerald-400' : 'bg-emerald-600'} blur-3xl`} />
              <div className={`absolute bottom-0 left-0 w-24 sm:w-32 h-24 sm:h-32 rounded-full ${darkMode ? 'bg-teal-400' : 'bg-teal-600'} blur-3xl`} />
            </div>

            <div
              className={`relative p-4 sm:p-6 rounded-xl h-full ${darkMode
                ? "bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700"
                : "bg-gradient-to-br from-emerald-50 via-white to-teal-50 border-2 border-emerald-100"
                }`}
            >
              <div className="flex items-center gap-2 mb-4 sm:mb-5">
                <div className={`p-1.5 sm:p-2 rounded-lg ${darkMode ? 'bg-emerald-500/10' : 'bg-emerald-100'}`}>
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                </div>
                <h4
                  className={`text-sm sm:text-base font-semibold ${darkMode ? "text-white" : "text-gray-900"
                    }`}
                >
                  Trust & Safety
                </h4>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <TrustItem
                  darkMode={darkMode}
                  title="Verified Campaign"
                  subtitle="Reviewed by platform team"
                />
                <TrustItem
                  darkMode={darkMode}
                  title="100% Transparent"
                  subtitle="Documents & updates available"
                />
                <TrustItem
                  darkMode={darkMode}
                  title="Secure Payments"
                  subtitle="Bank-grade encryption"
                />
                <TrustItem
                  darkMode={darkMode}
                  title="Multiple Payment Options"
                  subtitle="UPI, Cards, Net Banking & Wallets"
                  icon={<CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500" />}
                />
                <TrustItem
                  darkMode={darkMode}
                  title="Platform Sustainability"
                  subtitle="Surplus funds may support similar campaigns or platform operational expenses"
                />

                <TrustItem
                  darkMode={darkMode}
                  title="No Unsolicited Fundraising"
                  subtitle="TPFAid does not solicit donations via SMS, phone calls, or unsolicited messages"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Modals */}
      <DonatePopUpModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        darkMode={darkMode}
        campaignId={campaignId}
        zakatVerified={campaign.zakatVerified}
        ribaEligible={campaign.ribaEligible}
        taxEligible={campaign.taxBenefits}
        allowedDonationTypes={allowedDonationTypes}
      />

      {openShare && (
        <ShareModal
          url={shareUrl}
          title={title}
          onClose={() => setOpenShare(false)}
        />
      )}
    </>
  );
}

function StatCard({ darkMode, icon, value, label, color }) {
  const colorClasses = {
    emerald: darkMode ? 'text-emerald-400' : 'text-emerald-600',
    blue: darkMode ? 'text-blue-400' : 'text-blue-600',
    purple: darkMode ? 'text-purple-400' : 'text-purple-600'
  };

  const bgClasses = {
    emerald: darkMode ? 'bg-emerald-500/10' : 'bg-emerald-50',
    blue: darkMode ? 'bg-blue-500/10' : 'bg-blue-50',
    purple: darkMode ? 'bg-purple-500/10' : 'bg-purple-50'
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={`p-3 sm:p-4 rounded-xl border transition-all ${darkMode ? "bg-zinc-900/50 border-zinc-700 hover:border-zinc-600" : "bg-white border-gray-200 hover:border-gray-300 shadow-sm"
        }`}
    >
      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg ${bgClasses[color]} flex items-center justify-center mb-2 sm:mb-3`}>
        <div className={colorClasses[color]}>
          {icon}
        </div>
      </div>
      <div
        className={`text-sm sm:text-lg md:text-xl font-bold mb-0.5 sm:mb-1 ${darkMode ? "text-white" : "text-gray-900"
          }`}
      >
        {value}
      </div>
      <p
        className={`text-xs font-medium ${darkMode ? "text-gray-400" : "text-gray-600"
          }`}
      >
        {label}
      </p>
    </motion.div>
  );
}

function TrustItem({ darkMode, title, subtitle, icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-start gap-2.5 sm:gap-3"
    >
      <div className={`mt-0.5 ${darkMode ? 'bg-emerald-500/10' : 'bg-emerald-100'} p-1 rounded flex-shrink-0`}>
        {icon || <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500" />}
      </div>
      <div className="min-w-0">
        <p
          className={`text-xs sm:text-sm font-semibold mb-0.5 ${darkMode ? "text-gray-200" : "text-gray-900"
            }`}
        >
          {title}
        </p>
        <p
          className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"
            }`}
        >
          {subtitle}
        </p>
      </div>
    </motion.div>
  );
}