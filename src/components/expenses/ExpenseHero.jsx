"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowDown } from "lucide-react";
import { getMediaUrl } from "@/utils/media";

export default function ExpenseHero({ campaign, darkMode, onDonate }) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  // ── Build ordered image list — identical logic to CampaignHero.jsx ──────
  const primaryImage = campaign.imageUrl;
  const galleryImages = (campaign.imageGallery || []).filter(
    (img) => img !== primaryImage
  );
  const orderedImages = primaryImage
    ? [primaryImage, ...galleryImages]
    : galleryImages;

  // ── Auto-advance every 4 s — same as CampaignHero.jsx ───────────────────
  useEffect(() => {
    if (orderedImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === orderedImages.length - 1 ? 0 : prev + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [orderedImages.length]);

  // ── Video support (if mediaType === "video") ─────────────────────────────
  const hasVideo =
    campaign.mediaType === "video" && !!campaign.videoUrl;

  return (
    <section
      className={`relative pt-16 md:pt-20 ${
        darkMode ? "bg-gray-950" : "bg-white"
      }`}
    >
      {/* Back button */}
      <div className="absolute top-[4.5rem] md:top-24 left-4 sm:left-6 lg:left-8 z-20">
        <button
          onClick={() => router.back()}
          className={`flex items-center cursor-pointer justify-center w-9 h-9 rounded-xl border backdrop-blur-sm transition-colors ${
            darkMode
              ? "bg-gray-900/80 border-gray-700 hover:border-emerald-600 text-gray-400 hover:text-white"
              : "bg-white/80 border-gray-200 hover:border-emerald-300 text-gray-500 hover:text-gray-900"
          }`}
        >
          <ArrowLeft size={16} />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">

          {/* ── LEFT: headline + description + CTAs ─────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Badge */}
          

            {/* Badges from campaign */}
            {(campaign.isUrgent ||
              campaign.taxBenefits ||
              campaign.zakatVerified) && (
                <div className="flex flex-wrap gap-2 mt-10 sm:mt-0">
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
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                      darkMode
                        ? "bg-white/10 text-white border-white/20"
                        : "bg-gray-900/10 text-gray-800 border-gray-200"
                    }`}
                  >
                    Zakat Verified
                  </span>
                )}
              </div>
            )}

            {/* Headline */}
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Real Help Isn't Free.
              <br />
              <span className="text-emerald-500">It Takes a Team, Tools</span>
              <br />
              & Someone Who Cares
            </h1>

            <p
              className={`text-base leading-relaxed max-w-md ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Every donation passes through the hands of a real team. Designers, developers, coordinators, transport staff, etc. All working to make help reach the right people. These roles carry real costs, and your support is what keeps them going.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-1">
              <motion.button
                onClick={onDonate}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-7 py-3 rounded-xl cursor-pointer font-semibold text-sm text-white bg-emerald-500 hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20"
              >
                Support Platform Operations
              </motion.button>
              <a
                href="#breakdown"
                className={`px-7 py-3 rounded-xl font-semibold text-sm border flex items-center gap-2 transition-colors ${
                  darkMode
                    ? "border-gray-700 text-gray-300 hover:border-emerald-700 hover:text-white"
                    : "border-gray-200 text-gray-600 hover:border-emerald-300 hover:text-gray-900"
                }`}
              >
                See Breakdown
                <ArrowDown size={14} />
              </a>
            </div>
          </motion.div>

          {/* ── RIGHT: campaign image/video — same as CampaignHero ───── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative h-[300px] sm:h-[380px] md:h-[420px] rounded-2xl overflow-hidden"
          >
            {hasVideo ? (
              /* ── Video ── */
              <video
                src={getMediaUrl(campaign.videoUrl)}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : orderedImages.length > 0 ? (
              /* ── Image carousel — same motion crossfade as CampaignHero ── */
              <>
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

                {/* Dot indicators — only when multiple images */}
                {orderedImages.length > 1 && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                    {orderedImages.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`rounded-full transition-all duration-300 ${
                          i === currentIndex
                            ? "w-5 h-1.5 bg-white"
                            : "w-1.5 h-1.5 bg-white/50 hover:bg-white/80"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              /* ── Fallback: no media uploaded ── */
              <div
                className={`w-full h-full flex items-center justify-center ${
                  darkMode ? "bg-gray-900" : "bg-gray-100"
                }`}
              >
                <span
                  className={`text-sm ${
                    darkMode ? "text-gray-600" : "text-gray-300"
                  }`}
                >
                  No media uploaded
                </span>
              </div>
            )}

            {/* Bottom gradient overlay */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}