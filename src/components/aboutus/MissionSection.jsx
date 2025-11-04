import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function MissionSection({ darkMode }) {
   const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className={`py-20 ${darkMode ? 'bg-zinc-800' : 'bg-zinc-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className={`text-3xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
              We started with a{' '}
              <span className="bg-gradient-to-r from-teal-500 to-emerald-500 text-transparent bg-clip-text">
                belief
              </span>
            </h2>
            <p className={`text-lg md:text-xl mb-6 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
              Every person has incredible stories to share and causes worth fighting for. Together, we set out to build
              a platform that empowers individuals and organizations to make real impact.
            </p>
            <p className={`text-base md:text-lg ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              TPF Aid connects people from one part of the world to another to support good causes, embodying the
              global heartbeat of compassion and generosity.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            <img
              src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80"
              alt="Our Mission"
              className="rounded-2xl w-full h-[400px] object-cover shadow-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
