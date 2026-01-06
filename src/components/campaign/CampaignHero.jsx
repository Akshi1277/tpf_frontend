import { motion } from "framer-motion";
import { getMediaUrl } from "@/utils/media";

export default function CampaignHero({ campaign, darkMode }) {
  if (!campaign) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden mb-8"
    >
      {/* IMAGE */}
      <img
        src={
          campaign.imageUrl
            ? getMediaUrl(campaign.imageUrl)
            : "https://via.placeholder.com/1200x400?text=Campaign"
        }
        alt={campaign.title}
        className="w-full h-full object-cover"
      />

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
