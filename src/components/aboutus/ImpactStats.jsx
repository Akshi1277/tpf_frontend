// components/about/ImpactStats.jsx
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Users, TrendingUp, Globe, Heart } from 'lucide-react';

export default function ImpactStats({ darkMode }) {
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
        countries: 120,
        campaigns: 25000,
      };

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        setCounts({
          donors: Math.floor(finalValues.donors * progress),
          raised: Math.floor(finalValues.raised * progress),
          countries: Math.floor(finalValues.countries * progress),
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
      icon: Users,
      value: `${(counts.donors / 1000000).toFixed(1)}M+`,
      label: 'Global Donors',
      color: 'from-teal-500 to-emerald-500',
    },
    {
      icon: TrendingUp,
      value: `₹${counts.raised}M+`,
      label: 'Total Raised',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Globe,
      value: `${counts.countries}+`,
      label: 'Countries Reached',
      color: 'from-orange-500 to-teal-500',
    },
    {
      icon: Heart,
      value: `${(counts.campaigns / 1000).toFixed(0)}K+`,
      label: 'Lives Impacted',
      color: 'from-teal-500 to-orange-500',
    },
  ];

  return (
    <section ref={ref} className={`py-20 ${darkMode ? 'bg-zinc-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
            Our Impact in{' '}
            <span className="bg-gradient-to-r from-teal-500 to-emerald-500 text-transparent bg-clip-text">Numbers</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className={`p-8 rounded-2xl text-center ${darkMode ? 'bg-zinc-800' : 'bg-zinc-50'} transition-transform`}
            >
              <div
                className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center`}
              >
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className={`text-4xl font-bold mb-2 bg-gradient-to-r ${stat.color} text-transparent bg-clip-text`}>
                {stat.value}
              </div>
              <div className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
