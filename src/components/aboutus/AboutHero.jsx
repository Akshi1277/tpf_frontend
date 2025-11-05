"use client"
import ImpactStats from "./ImpactStats";
import { motion, useInView } from 'framer-motion';
import { useEffect, useState } from "react";


export default function AboutHero({ darkMode = false }) {
    


  return (
   // Change the AboutHero section padding:
<section className={`pt-36 sm:pt-40 md:pt-44 pb-12 sm:pb-16 md:pb-20 ${darkMode ? 'bg-zinc-900' : 'bg-white'} relative overflow-hidden`}>
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, ${darkMode ? '#10b981' : '#14b8a6'} 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, ${darkMode ? '#10b981' : '#14b8a6'} 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-6 sm:mb-8 md:mb-10"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            <span className={`${darkMode ? 'text-white' : 'text-zinc-900'} block mb-1 sm:mb-2`}>
              Explore the impact of
            </span>
            <span className="bg-gradient-to-r from-teal-500 via-emerald-600 to-emerald-400 text-transparent bg-clip-text">
              goodness with TPF Aid's
            </span>
            <span className={`${darkMode ? 'text-white' : 'text-zinc-900'} block mt-1 sm:mt-2`}>
              global community
            </span>
          </h1>
          <p className={`text-base sm:text-lg md:text-xl ${darkMode ? 'text-zinc-400' : 'text-zinc-600'} px-4 sm:px-0`}>
            The trusted crowdfunding platform connecting donors worldwide to causes that matter
          </p>
        </motion.div>
        <ImpactStats darkMode={darkMode} />
      </div>
    </section>
  );
}