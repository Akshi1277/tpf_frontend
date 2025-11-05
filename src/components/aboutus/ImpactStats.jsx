
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Users, TrendingUp, Globe, Heart } from 'lucide-react';


export default function ImpactStats ({ darkMode }){
 const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [counts, setCounts] = useState({ donors: 0, raised: 0, countries: 0, campaigns: 0 });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;

      const finalValues = {
        donors: 1500000,
        raised: 500,
        cities: 120,
        campaigns: 25000,
      };

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        setCounts({
          donors: Math.floor(finalValues.donors * progress),
          raised: Math.floor(finalValues.raised * progress),
          cities: Math.floor(finalValues.countries * progress),
          campaigns: Math.floor(finalValues.campaigns * progress),
        });

        if (step >= steps) {
          setCounts(finalValues);
          clearInterval(timer);
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isInView]);

  const stats = [
    {
      icon: (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      ),
      value: `${(counts.donors / 1000000).toFixed(1)}M+`,
      label: 'Global Donors',
      color: 'from-teal-500 to-emerald-500',
    },
    {
      icon: (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
        </svg>
      ),
      value: `₹${counts.raised}M+`,
      label: 'Total Raised',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
      ),
      value: `${counts.cities}+`,
      label: 'Cities Reached',
      color: 'from-emerald-600 to-emerald-400',
    },
    {
      icon: (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      ),
      value: `${(counts.campaigns / 1000).toFixed(0)}K+`,
      label: 'Lives Impacted',
      color: 'from-emerald-600 to-emerald-400',
    },
  ];

  return (
    <div ref={ref} className="relative">
      {/* Subtle divider with Islamic pattern */}
      <div className="flex items-center justify-center mb-8 sm:mb-12">
        <div className={`h-px flex-1 max-w-20 sm:max-w-32 bg-gradient-to-r from-transparent via-teal-500/30 to-transparent`}></div>
        <div className={`mx-4 w-2 h-2 rounded-full ${darkMode ? 'bg-teal-500/50' : 'bg-teal-500/40'}`}></div>
        <div className={`h-px flex-1 max-w-20 sm:max-w-32 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent`}></div>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -8 }}
            className={`relative p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl text-center ${
              darkMode ? 'bg-zinc-800/50 backdrop-blur-sm' : 'bg-white shadow-lg'
            } transition-all duration-300 overflow-hidden group border ${
              darkMode ? 'border-zinc-700/50' : 'border-zinc-100'
            }`}
          >
            {/* Geometric pattern overlay */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 20% 20%, currentColor 1px, transparent 1px),
                                 radial-gradient(circle at 80% 80%, currentColor 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>

            {/* Subtle top accent */}
            <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-16 sm:w-20 h-1 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b`}></div>
            
            <div className="relative z-10">
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg transform group-hover:rotate-3 transition-transform duration-300`}
              >
                <div className="text-white">
                  {stat.icon}
                </div>
              </div>
              <div className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2 bg-gradient-to-r ${stat.color} text-transparent bg-clip-text`}>
                {stat.value}
              </div>
              <div className={`text-xs sm:text-sm md:text-base font-medium ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {stat.label}
              </div>
            </div>

            {/* Bottom glow effect */}
            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-sm`}></div>
          </motion.div>
        ))}
      </div>

      {/* Bottom divider */}
      <div className="flex items-center justify-center mt-8 sm:mt-12">
        <div className={`h-px flex-1 max-w-20 sm:max-w-32 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent`}></div>
        <div className={`mx-4 w-2 h-2 rounded-full ${darkMode ? 'bg-emerald-500/50' : 'bg-emerald-500/40'}`}></div>
        <div className={`h-px flex-1 max-w-20 sm:max-w-32 bg-gradient-to-r from-transparent via-teal-500/30 to-transparent`}></div>
      </div>
    </div>
  );
}