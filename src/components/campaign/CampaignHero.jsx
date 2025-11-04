import { motion } from 'framer-motion';

export default function CampaignHero({ darkMode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden mb-8"
    >
      <img
        src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1200&q=80"
        alt="Campaign"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-semibold">
            ACTIVE
          </span>
          <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-semibold">
            Zakaat Verified
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Clean Water for Rural Communities
        </h2>
        <p className="text-white/90 text-sm md:text-base max-w-2xl">
          Providing sustainable access to clean drinking water for 5,000+ families
        </p>
      </div>
    </motion.div>
  );
}