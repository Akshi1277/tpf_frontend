import { motion } from "framer-motion";
import { getMediaUrl } from "@/utils/media";
import { useState, useEffect } from "react";
export default function CampaignHero({ campaign, darkMode }) {
  if (!campaign) return null;
  const [currentIndex, setCurrentIndex] = useState(0);

  const primaryImage = campaign.imageUrl;

  const galleryImages = (campaign.imageGallery || []).filter(
    (img) => img !== primaryImage
  );

  const orderedImages = primaryImage
    ? [primaryImage, ...galleryImages]
    : galleryImages;
  useEffect(() => {
    if (!orderedImages.length) return;
    console.log("orderedImages", orderedImages);

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === orderedImages.length - 1 ? 0 : prev + 1
      );
    }, 4000); // ⏱️ 4 seconds

    return () => clearInterval(interval);
  }, [orderedImages.length]);




  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden mb-8"
    >
      {/* IMAGE */}
      <div className="absolute inset-0">
        {orderedImages.map((img, index) => (
          <motion.img
            key={img}
            src={getMediaUrl(img)}
            alt={campaign.title}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentIndex ? 1 : 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        ))}
      </div>


      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* CONTENT */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
        {/* BADGES */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {campaign.isUrgent && (
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
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          {campaign.title}
        </h2>

        {/* ORGANIZATION */}
        <p className="text-white/90 text-sm md:text-base max-w-2xl">
          {campaign.organization}
        </p>
      </div>
    </motion.div>
  );
}
