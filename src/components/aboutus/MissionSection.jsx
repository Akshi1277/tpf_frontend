import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MissionSection({ darkMode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className={`py-12 sm:py-16 md:py-20 ${darkMode ? 'bg-zinc-800' : 'bg-zinc-50'} relative overflow-hidden`}>
      {/* Subtle Islamic geometric pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, ${darkMode ? '#10b981' : '#14b8a6'} 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, ${darkMode ? '#10b981' : '#14b8a6'} 2px, transparent 2px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
           {/* Arabic calligraphy style accent */}
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className={`h-0.5 sm:h-1 w-8 sm:w-12 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500`}></div>
              <Heart className="text-teal-500 flex-shrink-0" size={16} fill="currentColor" />
            </div>

            <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 ${darkMode ? 'text-white' : 'text-zinc-900'} leading-tight`}>
              Built on the foundation of{' '}
              <span className="bg-gradient-to-r from-teal-500 to-emerald-500 text-transparent bg-clip-text">
                compassion
              </span>
            </h2>
            
            <p className={`text-base sm:text-lg md:text-xl mb-4 sm:mb-6 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'} leading-relaxed`}>
              Inspired by the principles of Sadaqah and Zakat, we believe in the power of giving to transform lives. 
              Every individual has a story worth sharing and a duty to help those in need.
            </p>
            
            <p className={`text-sm sm:text-base md:text-lg mb-4 sm:mb-6 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'} leading-relaxed`}>
              TPF Aid bridges communities across the globe, uniting the Ummah in service of humanity. Together, 
              we fulfill our obligation to care for one another and create lasting positive change.
            </p>

            {/* Islamic quote */}
            <div className={`border-l-3 sm:border-l-4 border-teal-500 pl-3 sm:pl-4 py-2 sm:py-3 ${darkMode ? 'bg-zinc-700/30' : 'bg-white/50'} rounded-r`}>

              <p className={`italic ${darkMode ? 'text-zinc-300' : 'text-zinc-700'} text-sm sm:text-base leading-relaxed`}>
                "The believer's shade on the Day of Resurrection will be their charity."
              </p>
              <p className={`text-xs sm:text-sm ${darkMode ? 'text-zinc-500' : 'text-zinc-500'} mt-1`}>
                — Prophet Muhammad ﷺ
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="relative mt-8 lg:mt-0"
          >
            {/* Decorative corner accents */}
            <div className={`absolute -top-2 -left-2 sm:-top-4 sm:-left-4 w-12 h-12 sm:w-20 sm:h-20 border-t-3 border-l-3 sm:border-t-4 sm:border-l-4 border-teal-500 rounded-tl-2xl sm:rounded-tl-3xl ${darkMode ? 'opacity-30' : 'opacity-20'}`}></div>
            <div className={`absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 w-12 h-12 sm:w-20 sm:h-20 border-b-3 border-r-3 sm:border-b-4 sm:border-r-4 border-emerald-500 rounded-br-2xl sm:rounded-br-3xl ${darkMode ? 'opacity-30' : 'opacity-20'}`}></div>
            
            <img
              src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80"
              alt="Our Mission"
              className="rounded-xl sm:rounded-2xl w-full h-[280px] sm:h-[350px] md:h-[400px] object-cover shadow-xl sm:shadow-2xl relative z-10"
            />
            
            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-teal-500/10 to-emerald-500/10 pointer-events-none"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}