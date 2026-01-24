import { useState, useEffect, useRef } from 'react';
import StatCounter from '@/components/ui/StatCounter';
import { useFetchImpactStatsQuery } from '@/utils/slices/campaignApiSlice';

export default function ImpactStatsBar({ darkMode }) {
  const { data: statsData, isLoading } = useFetchImpactStatsQuery();
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  const stats = statsData?.stats || {
    totalRaised: 0,
    activeCampaigns: 0,
    totalDonors: 0,
    livesImpacted: 0
  };

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
      className={`py-8 border-b relative overflow-hidden ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-white'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatCounter
            label="Total Raised"
            end={stats.totalRaised}
            format="currency"
            darkMode={darkMode}
            shouldAnimate={statsVisible && !isLoading}
          />
          <StatCounter
            label="Total Campaigns"
            end={stats.activeCampaigns}
            suffix="+"
            darkMode={darkMode}
            shouldAnimate={statsVisible && !isLoading}
          />
          <StatCounter
            label="Lives Impacted"
            end={stats.livesImpacted}
            suffix="+"
            darkMode={darkMode}
            shouldAnimate={statsVisible && !isLoading}
          />
          <StatCounter
            label="Number Of Donors"
            end={stats.totalDonors}
            suffix="+"
            darkMode={darkMode}
            shouldAnimate={statsVisible && !isLoading}
          />
        </div>
      </div>
    </section>
  );
}