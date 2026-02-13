"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";

export default function FloatingDonateButton({ darkMode, onClick, isModalOpen }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && !isModalOpen && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={onClick}
          className={`
            fixed bottom-20 right-4 z-[9999]
            lg:hidden
            group overflow-hidden
            px-6 py-3.5
            bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500
            text-white font-bold text-sm
            rounded-full
            shadow-lg shadow-emerald-500/40
            hover:shadow-xl hover:shadow-emerald-500/50
            active:scale-95
            transition-all duration-300
            flex items-center gap-2
          `}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ["-200%", "200%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />

          {/* Button content */}
          <div className="relative flex items-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart className="w-5 h-5" fill="currentColor" />
            </motion.div>
            <span>Donate Now</span>
          </div>

          {/* Ripple effect on hover */}
          <motion.div
            className="absolute inset-0 rounded-full bg-white/20"
            initial={{ scale: 0, opacity: 0.5 }}
            whileHover={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}