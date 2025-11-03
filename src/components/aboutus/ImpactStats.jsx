// components/about/ImpactStats.jsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, TrendingUp, Globe, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ImpactStats({ darkMode }) {
  const sectionRef = useRef(null);
  const [counts, setCounts] = useState({
    donors: 0,
    raised: 0,
    countries: 0,
    campaigns: 0,
  });

  const finalValues = {
    donors: 1500000,
    raised: 500,
    countries: 120,
    campaigns: 25000,
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        onEnter: () => {
          // Animate donors
          gsap.to(counts, {
            donors: finalValues.donors,
            duration: 2,
            onUpdate: function () {
              setCounts((prev) => ({ ...prev, donors: Math.floor(this.targets()[0].donors) }));
            },
          });

          // Animate raised
          gsap.to(counts, {
            raised: finalValues.raised,
            duration: 2,
            onUpdate: function () {
              setCounts((prev) => ({ ...prev, raised: Math.floor(this.targets()[0].raised) }));
            },
          });

          // Animate countries
          gsap.to(counts, {
            countries: finalValues.countries,
            duration: 2,
            onUpdate: function () {
              setCounts((prev) => ({ ...prev, countries: Math.floor(this.targets()[0].countries) }));
            },
          });

          // Animate campaigns
          gsap.to(counts, {
            campaigns: finalValues.campaigns,
            duration: 2,
            onUpdate: function () {
              setCounts((prev) => ({ ...prev, campaigns: Math.floor(this.targets()[0].campaigns) }));
            },
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
    <section
      ref={sectionRef}
      className={`py-20 ${darkMode ? 'bg-zinc-900' : 'bg-white'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-zinc-900'
            }`}
          >
            Our Impact in{' '}
            <span className="bg-gradient-to-r from-teal-500 to-emerald-500 text-transparent bg-clip-text">
              Numbers
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`p-8 rounded-2xl text-center ${
                darkMode ? 'bg-zinc-800' : 'bg-zinc-50'
              } hover:scale-105 transition-transform duration-300`}
            >
              <div
                className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center`}
              >
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div
                className={`text-4xl font-bold mb-2 bg-gradient-to-r ${stat.color} text-transparent bg-clip-text`}
              >
                {stat.value}
              </div>
              <div
                className={`text-sm ${
                  darkMode ? 'text-zinc-400' : 'text-zinc-600'
                }`}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}