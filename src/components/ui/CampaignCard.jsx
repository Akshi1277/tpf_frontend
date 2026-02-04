"use client"
// components/ui/CampaignCard.jsx
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Users, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { currency } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Heart } from 'lucide-react';
import { FiShare2 } from "react-icons/fi";
import ShareModal from "./ShareModal"
import { useToggleWishlistMutation } from '@/utils/slices/authApiSlice';
import { useSelector } from 'react-redux';
import { getMediaUrl } from '@/utils/media';
export default function CampaignCard({ campaign, darkMode }) {

  const progress = campaign.requiredAmount
    ? Math.min(
      100,
      Math.round(
        (campaign.receivedAmount / campaign.requiredAmount) * 100
      )
    )
    : 0;

  const router = useRouter();
  const COLORS = {
    neutralHeading: darkMode ? "text-white" : "text-zinc-900",
    neutralBody: darkMode ? "text-zinc-400" : "text-zinc-600",
  };
  const { userInfo } = useSelector((state) => state.auth);
  const wishlist = userInfo?.wishlist || [];

  const [toggleWishlist] = useToggleWishlistMutation();

  const campaignId = campaign.campaignId || campaign._id;
  const saved = wishlist.includes(campaignId);

  const [openShare, setOpenShare] = useState(false);

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/campaign/${campaign.slug}`
      : "";


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



  if (!campaign?.slug) return null;



  if (campaign.video) {
    // Video card with full coverage
    return (
      <div
        onClick={() => router.push(`/campaign/${campaign.slug}`)}
        className={`group/card flex-shrink-0 w-[280px] sm:w-[320px] md:w-auto snap-center rounded-2xl overflow-hidden transition-all duration-300 relative cursor-pointer
          ${darkMode ? 'bg-zinc-800' : 'bg-white'}
          shadow-[0_4px_10px_rgba(156,163,175,0.4)] hover:shadow-[0_6px_14px_rgba(107,114,128,0.6)]`}
      >
        <video
          src={getMediaUrl(campaign.video)}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/80"></div>

        {/* Badges */}
        {campaign.urgent && (
          <div className="absolute top-3 left-3 z-20 bg-red-600 text-white px-2.5 py-1 rounded-full text-[10px] font-semibold w-fit">
            Urgent
          </div>
        )}
        {campaign.taxBenefit && (
          <div className="absolute top-3 right-3 z-20 bg-emerald-600 text-white px-2.5 py-1 rounded-full text-[10px] font-semibold w-fit">
            Tax Benefits
          </div>
        )}

        {/* Content structure matching image cards */}
        <div className="relative z-10">
          {/* Spacer matching aspect-video */}
          <div className="aspect-video"></div>

          {/* Content section */}
          <div className="p-4 sm:p-5">
            <h3 className="font-semibold text-sm sm:text-base mb-1 line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem] text-white">
              {campaign.title}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-200 mb-3 truncate">{campaign.org}</p>

            <div className="mb-3">
              <div className="flex justify-between text-xs sm:text-sm mb-2">
                {campaign.source === "FOUNDATION" ? (
                  <span className="font-medium text-white">
                    {currency(campaign.fundsDisbursed || 0)} <span className="text-[10px] opacity-70">disbursed</span>
                  </span>
                ) : (
                  <span className="font-medium text-white">
                    {progress}% <span className="text-[10px] opacity-70">funded</span>
                  </span>
                )}
                {campaign.source !== "FOUNDATION" && (
                  <span className="text-zinc-200">
                    of {currency(campaign.requiredAmount)}
                  </span>
                )}
              </div>

              {campaign.source === "FOUNDATION" ? (
                <div className="mb-2">
                  <span className="text-[10px] sm:text-xs font-bold bg-emerald-500 text-white px-2 py-0.5 rounded flex items-center gap-1 w-fit">
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    Permanent Fund
                  </span>
                </div>
              ) : campaign.validityDate ? (
                <div className="mb-2">
                  <span className="text-[10px] sm:text-xs font-semibold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                    {campaign.validityDate} Days Left
                  </span>
                </div>
              ) : (
                <div className="mb-2 h-[18px] sm:h-[22px]" />
              )}

              <div className="w-full bg-zinc-700/50 rounded-full h-2">
                <div
                  className={`bg-emerald-600 h-2 rounded-full transition-all ${campaign.source === "FOUNDATION" ? 'w-full' : ''}`}
                  style={{ width: campaign.source === "FOUNDATION" ? '100%' : `${progress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-3 text-xs sm:text-sm">
              <span className="text-zinc-200">
                <Users className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                {campaign.donorCount} donors
              </span>
              <span className="font-medium text-emerald-400">
                {campaign.source === "FOUNDATION" ? "Ongoing" : `${progress}% funded`}
              </span>
            </div>

            <Link href={`/campaign/${campaign.slug}`} prefetch className="w-full block">
              <button
                onClick={console.log("slug", `${campaign.campaignSlug}`)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-medium text-base sm:text-lg transition-colors mb-3 sm:mb-4 cursor-pointer">
                Donate Now
              </button>
            </Link>

            <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-zinc-600/50">
              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  onClick={handleToggleWishlist}
                  className={`transition-colors cursor-pointer ${saved
                    ? "text-red-500"
                    : darkMode
                      ? "text-zinc-400 hover:text-red-400"
                      : "text-zinc-600 hover:text-red-600"
                    }`}
                >
                  <Heart
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill={saved ? "currentColor" : "none"}
                  />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenShare(true);
                  }}
                  className="relative group flex items-center gap-1 text-zinc-300 hover:text-emerald-400 transition-colors cursor-pointer">
                  <FiShare2 className="peer w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="
  absolute -top-9 left-1/2 -translate-x-1/2
  whitespace-nowrap rounded-md bg-zinc-900 text-white
  text-[11px] px-2 py-1
  opacity-0 scale-95

  peer-hover:opacity-100
  peer-hover:scale-100

  transition-all duration-200
  pointer-events-none
">
                    Share this Campaign
                  </span>



                </button>
              </div>
              <div className="flex items-center gap-1 text-[10px] sm:text-xs bg-emerald-900/40 px-2 sm:px-3 py-1 rounded-full">
                <CheckCircle className="w-3 h-3 text-emerald-500" />
                <span className="text-emerald-300 whitespace-nowrap">Zakaat Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Image card - original layout
  return (
    <div
      onClick={() => router.push(`/campaign/${campaign.slug}`)}
      className={`flex-shrink-0 w-[280px] sm:w-[320px] md:w-auto snap-center rounded-2xl cursor-pointer overflow-hidden transition-all duration-300
        ${darkMode ? 'bg-zinc-800' : 'bg-white'}
        
        shadow-[0_4px_10px_rgba(156,163,175,0.4)] hover:shadow-[0_6px_14px_rgba(107,114,128,0.6)]`}
    >
      <div className="relative aspect-video">
        <img
          src={getMediaUrl(campaign.image)}
          alt={campaign.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

        {campaign.urgent && (
          <div className="absolute top-3 left-3 bg-red-600 text-white px-2.5 py-1 rounded-full text-[10px] font-semibold w-fit">
            Urgent
          </div>
        )}

        {campaign.taxBenefit && (
          <div className="absolute top-3 right-3 bg-emerald-600 text-white px-2.5 py-1 rounded-full text-[10px] font-semibold w-fit">
            Tax Benefits
          </div>
        )}
      </div>

      <div className="p-4 sm:p-5">
        <h3 className={`font-semibold text-sm sm:text-base mb-1 line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem] ${COLORS.neutralHeading}`}>
          {campaign.title}
        </h3>
        <p className={`text-xs sm:text-sm ${COLORS.neutralBody} mb-3 truncate`}>{campaign.org}</p>

        <div className="mb-3">
          <div className="flex justify-between text-xs sm:text-sm mb-2">
            {campaign.source === "FOUNDATION" ? (
              <span className={`font-medium ${COLORS.neutralHeading}`}>
                {currency(campaign.fundsDisbursed || 0)} <span className="text-[10px] opacity-70">disbursed</span>
              </span>
            ) : (
              <span className={`font-medium ${COLORS.neutralHeading}`}>
                {progress}% <span className="text-[10px] opacity-70">funded</span>
              </span>
            )}
            {campaign.source !== "FOUNDATION" && (
              <span className={COLORS.neutralBody}>
                of {currency(campaign.requiredAmount)}
              </span>
            )}
          </div>

          {campaign.source === "FOUNDATION" ? (
            <div className="mb-2">
              <span className="text-[10px] sm:text-xs font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded flex items-center gap-1 w-fit">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Permanent Fund
              </span>
            </div>
          ) : campaign.validityDate ? (
            <div className="mb-2">
              <span className="text-[10px] sm:text-xs font-semibold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                {campaign.validityDate} Days Left
              </span>
            </div>
          ) : (
            <div className="mb-2 h-[18px] sm:h-[22px]" /> // Spacer to match height
          )}

          <div className={`w-full ${darkMode ? 'bg-zinc-700' : 'bg-zinc-200'} rounded-full h-2`}>
            <div
              className={`bg-emerald-600 h-2 rounded-full transition-all ${campaign.source === "FOUNDATION" ? 'w-full' : ''}`}
              style={{ width: campaign.source === "FOUNDATION" ? '100%' : `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3 text-xs sm:text-sm">
          <span className={COLORS.neutralBody}>
            <Users className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
            {campaign.donorCount} donors
          </span>
          <span className="font-medium text-emerald-600">
            {campaign.source === "FOUNDATION" ? "Ongoing" : `${progress}% funded`}
          </span>
        </div>
        <Link href={`/campaign/${campaign.slug}`} prefetch className="w-full block">
          <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-medium text-base sm:text-lg transition-colors mb-3 sm:mb-4 cursor-pointer">
            Donate Now
          </button>
        </Link>


        <div className={`flex items-center justify-between pt-3 sm:pt-4 border-t ${darkMode ? 'border-zinc-700' : 'border-zinc-200'}`}>
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={handleToggleWishlist}
              className={`relative group transition-colors cursor-pointer ${saved
                ? "text-red-500"
                : darkMode
                  ? "text-zinc-400 hover:text-red-400"
                  : "text-zinc-600 hover:text-red-600"
                }`}
            >
              <Heart
                className="peer w-4 h-4 sm:w-5 sm:h-5"
                fill={saved ? "currentColor" : "none"}
              />

              <span
                className="
      absolute -top-9 left-1/2 -translate-x-1/2
      whitespace-nowrap rounded-md bg-zinc-900 text-white
      text-[11px] px-2 py-1
      opacity-0 scale-95

      peer-hover:opacity-100
      peer-hover:scale-100

      transition-all duration-200
      pointer-events-none
    "
              >
                Wishlist
              </span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpenShare(true);
              }}
              className={`relative group flex items-center gap-1 transition-colors cursor-pointer ${darkMode ? 'text-zinc-400 hover:text-emerald-400' : 'text-zinc-600 hover:text-emerald-600'}`}>
              <FiShare2 className="peer w-4 h-4 sm:w-5 sm:h-5" />
              <span className="
  absolute -top-9 left-1/2 -translate-x-1/2
  whitespace-nowrap rounded-md bg-zinc-900 text-white
  text-[11px] px-2 py-1
  opacity-0 scale-95

  peer-hover:opacity-100
  peer-hover:scale-100

  transition-all duration-200
  pointer-events-none
">
                Share this Campaign
              </span>



            </button>
          </div>
          {campaign.zakatVerified && (

            <div className={`flex items-center gap-1 text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full ${darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'}`}>
              <CheckCircle className="w-3 h-3 text-emerald-600" />
              <span className={`${darkMode ? 'text-emerald-400' : 'text-emerald-700'} whitespace-nowrap`}>Zakaat Verified</span>
            </div>
          )}
        </div>

      </div>
      {openShare && (
        <ShareModal
          url={shareUrl}
          title={campaign.title}
          onClose={() => setOpenShare(false)}
        />
      )}
    </div>
  );
}