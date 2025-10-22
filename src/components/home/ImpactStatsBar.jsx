// components/home/ImpactStatsBar.jsx
import { useState, useEffect, useRef } from 'react';
import StatCounter from '@/components/ui/StatCounter';

export default function ImpactStatsBar({ darkMode, totalRaised }) {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={statsRef}
      className={`py-12 border-b relative overflow-hidden ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-white'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatCounter
            label="Total Raised"
            end={totalRaised}
            format="currency"
            darkMode={darkMode}
            shouldAnimate={statsVisible}
          />
          <StatCounter
            label="Active Campaigns"
            end={150}
            suffix="+"
            darkMode={darkMode}
            shouldAnimate={statsVisible}
          />
          <StatCounter
            label="Lives Impacted"
            end={50000}
            suffix="+"
            darkMode={darkMode}
            shouldAnimate={statsVisible}
          />
          <StatCounter
            label="Number Of Donors"
            end={1000}
            suffix="+"
            darkMode={darkMode}
            shouldAnimate={statsVisible}
          />
        </div>
      </div>
    </section>
  );
}