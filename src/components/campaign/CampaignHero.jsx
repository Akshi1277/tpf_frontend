import { motion } from "framer-motion";
import { getMediaUrl } from "@/utils/media";
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import DonateModal from "./DonateModal";
import DonatePopUpModal from "./DonateModal";

export default function CampaignHero({ campaign, darkMode, onDonateClick }) {
  if (!campaign) return null;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false)

  const primaryImage = campaign.imageUrl;

  const galleryImages = (campaign.imageGallery || []).filter(
    (img) => img !== primaryImage
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

  useEffect(() => {
    const MAX_AUTO_OPENS = 3;
    const storageKey = "donate_popup_count";

    const rawCount = sessionStorage.getItem(storageKey);
    const count = rawCount ? parseInt(rawCount, 10) : 0;

    if (count < MAX_AUTO_OPENS) {
      setIsModalOpen(true);
      sessionStorage.setItem(storageKey, String(count + 1));
    }
  }, []);


  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-[350px] sm:h-[450px] md:h-[550px] sm:rounded-3xl overflow-hidden mb-4 sm:mb-6 max-w-5xl mx-auto"
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
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-10">
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
            {campaign.title}
          </h2>

          {/* ORGANIZATION */}
          <p className="text-white/90 text-sm md:text-base max-w-2xl mb-4">
            {campaign.organization}
          </p>

          {/* DONATE NOW BUTTON */}
          <motion.button
            onClick={() => setIsModalOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl shadow-lg hover:shadow-emerald-500/50 transition-all"
          >
            <Heart className="w-5 h-5" fill="currentColor" />
            Donate Now
          </motion.button>

        </div>
      </motion.div>
      <DonatePopUpModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        darkMode={darkMode}
        campaignId={campaign._id} // or campaign.id depending on your schema
        campaignSlug={campaign.slug}
        zakatVerified={campaign.zakatVerified}
        ribaEligible={campaign.ribaEligible}
        taxEligible={campaign.taxBenefits}
        allowedDonationTypes={campaign.allowedDonationTypes}
      />

    </>
  );
}