import { motion } from "framer-motion";
import { getMediaUrl } from "@/utils/media";
import { useState, useEffect } from "react";
import { Heart, CheckCircle } from "lucide-react";
import DonateModal from "./DonateModal";
import DonatePopUpModal from "./DonateModal";

export default function CampaignHero({ campaign, darkMode, onDonateClick, isCompleted }) {
  if (!campaign) return null;

  const [currentIndex, setCurrentIndex] = useState(0);

  const primaryImage = campaign.imageUrl;

  // ✅ FIX: filter invalid/null images
  const galleryImages = (campaign.imageGallery || []).filter(
    (img) => img && img !== primaryImage
  );

  const orderedImages = primaryImage
    ? [primaryImage, ...galleryImages]
    : galleryImages;

  useEffect(() => {
    if (!orderedImages.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === orderedImages.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [orderedImages.length]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-[350px] sm:h-[450px] md:h-[550px] sm:rounded-3xl overflow-hidden mb-4 sm:mb-6 max-w-5xl mx-auto"
      >
        {/* MEDIA */}
        <div className="absolute inset-0">
          {campaign.mediaType === "video" && campaign.videoUrl ? (
            <video
              src={getMediaUrl(campaign.videoUrl)}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            orderedImages.length > 0 &&
            orderedImages.map((img, index) =>
              img ? (
                <motion.img
                  key={img}
                  src={getMediaUrl(img)}
                  alt={campaign.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: index === currentIndex ? 1 : 0 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
              ) : null
            )
          )}
        </div>

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* CONTENT */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-10">
          {/* BADGES */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {isCompleted ? (
              <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-semibold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Completed
              </span>
            ) : campaign.isUrgent && (
              <span className="px-3 py-1 rounded-full bg-red-600 text-white text-xs font-semibold">
                Urgent
              </span>
            )}

            {campaign.taxBenefits && (
              <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-semibold">
                Tax Benefits
              </span>
            )}

            {campaign.zakatVerified && (
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-semibold">
                Zakat Verified
              </span>
            )}
          </div>

          {/* TITLE */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
            {campaign.title}
          </h2>

          {/* ORGANIZATION */}
          <p className="text-white/90 text-sm md:text-base max-w-2xl mb-4">
            {campaign.organization}
          </p>

          {/* DONATE BUTTON */}
          {isCompleted ? (
            <div className="inline-flex items-center gap-2 px-8 py-3 bg-zinc-200/20 backdrop-blur-md border border-white/30 text-white font-bold rounded-xl shadow-lg">
              <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0">
                <rect x="3" y="3" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" />
                <path d="M7 10h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Not accepting payments
            </div>
          ) : (
            <motion.button
              onClick={onDonateClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl shadow-lg hover:shadow-emerald-500/50 transition-all"
            >
              <Heart className="w-5 h-5" fill="currentColor" />
              Donate Now
            </motion.button>
          )}
        </div>
      </motion.div>
    </>
  );
}