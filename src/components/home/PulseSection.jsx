'use client';
import { currency } from '@/lib/utils';
import { recentDonations } from '@/lib/constants';

import { useState,useEffect } from 'react';

export default function PulseSection({ darkMode, totalRaised }) {
  const COLORS = {
    neutralHeading: darkMode ? "text-white" : "text-zinc-900",
    neutralBody: darkMode ? "text-zinc-400" : "text-zinc-600",
  };

  /* Influencers slider (5 visible, auto-scroll left by 1 every second) */
const VISIBLE_INFLUENCERS = 5;

const influencerAvatars = [
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=256&q=80&auto=format",
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=256&q=80&auto=format",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=256&q=80&auto=format",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=256&q=80&auto=format",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=256&q=80&auto=format",
  "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=256&q=80&auto=format",
  "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=256&q=80&auto=format",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=256&q=80&auto=format",
  "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=256&q=80&auto=format",
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=256&q=80&auto=format",
  "https://images.unsplash.com/photo-1463453091185-61582044d556?w=256&q=80&auto=format",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=256&q=80&auto=format",
];

const influencersExtended = [
  ...influencerAvatars,
  ...influencerAvatars.slice(0, VISIBLE_INFLUENCERS),
];

const [infIndex, setInfIndex] = useState(0);
const [infNoTransition, setInfNoTransition] = useState(false);

useEffect(() => {
  const id = setInterval(() => setInfIndex((i) => i + 1), 1000);
  return () => clearInterval(id);
}, []);

useEffect(() => {
  if (infIndex === influencerAvatars.length) {
    const t = setTimeout(() => {
      setInfNoTransition(true);
      setInfIndex(0);
      requestAnimationFrame(() => setInfNoTransition(false));
    }, 520); // wait for the current slide transition to end
    return () => clearTimeout(t);
  }
}, [infIndex, influencerAvatars.length]);

  return (
    <>
 <section id="influencers" className={`py-14 ${darkMode ? 'bg-zinc-900' : 'bg-zinc-50'}`}>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid md:grid-cols-2 gap-6 items-stretch">
      
    {/* LEFT CARD */}
<div
  className={`rounded-3xl p-6 md:p-8 border flex flex-col
    ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}
  `}
>
  <div>
    <h3 className={`text-2xl sm:text-4xl font-bold leading-tight mb-3 ${COLORS.neutralHeading}`}>
    Make a difference that lasts — with TPF Aid.

    </h3>
    <p className={`text-sm ${COLORS.neutralBody} mb-4`}>
      Join a trusted network of givers who believe in impact without barriers. With no platform fees and access to a global donor community, your campaign can reach hearts everywhere. Start your journey toward change today.
    </p>
    <button className="px-6 py-2 rounded-full cursor-pointer font-semibold border transition-colors bg-white text-zinc-900 hover:bg-zinc-50 shadow-sm w-fit text-sm">
      Start fundraising today
    </button>
  </div>

  {/* IMAGE */}
  <div className="mt-5 flex items-center justify-center">
    <img
      src="/funding.jpg"
      alt="Funding Growth Visual"
      className="w-full max-w-[240px] h-auto object-contain"
    />
  </div>
</div>

{/* RIGHT CARD */}
<div
  className={`rounded-3xl p-8 md:p-10 border relative overflow-hidden flex flex-col transition-all duration-500
    ${darkMode
      ? 'bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border-zinc-700/50 shadow-2xl shadow-emerald-500/5'
      : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100 border-purple-300/40 shadow-xl'
    }
  `}
>
  {/* Animated gradient orbs */}
  <div className={`absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-25 ${darkMode ? 'bg-emerald-600' : 'bg-indigo-300'}`}></div>
  <div className={`absolute -bottom-24 -left-12 w-80 h-80 rounded-full blur-3xl opacity-20 ${darkMode ? 'bg-purple-700' : 'bg-pink-300'}`}></div>

  <div className="relative z-10 mb-6">
    <h3 className="text-2xl sm:text-5xl font-bold leading-tight mb-4">
      <span className="inline-block transition-transform duration-300 hover:scale-105 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500">
        Simple.
      </span>
      <br/>
      <span className="inline-block transition-transform duration-300 hover:scale-105 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500">
        Reliable.
      </span>
      <br/>
      <span className="inline-block transition-transform duration-300 hover:scale-105 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
        Impactful.
      </span>
    </h3>
    
    <p className={`text-base ${COLORS.neutralBody} max-w-md leading-relaxed`}>
      Give with trust—every cause is verified, and making change takes just one tap.
Start today, inspire others, and help create a world where generosity knows no boundaries.{' '}
      <span className="underline cursor-pointer hover:text-purple-600 dark:hover:text-emerald-400 transition-colors inline-flex items-center gap-1 group font-medium">
        Learn more
        <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
      </span>
    </p>
  </div>

  <div className="relative z-10 mt-auto pt-6 border-t border-zinc-200/50 dark:border-zinc-700/50">
    <div className={`text-xl font-semibold mb-5 ${COLORS.neutralHeading} flex items-center gap-2`}>
      <span className={`inline-block w-2 h-2 rounded-full ${darkMode ? 'bg-emerald-400' : 'bg-purple-500'} animate-pulse`}></span>
      Trusted by those you trust
    </div>

    {/* Slider viewport (exactly 5 visible) */}
    <div className="relative overflow-hidden rounded-2xl">
      {/* moving track */}
      <div
        className="grid grid-flow-col auto-cols-[20%] items-center gap-0 py-2"
        style={{
          transform: `translateX(-${infIndex * 10}%)`,
          transition: infNoTransition ? 'none' : 'transform 5000ms ease-out',
        }}
      >
        {influencersExtended.map((src, i) => (
          <div key={`influencer-${i}`} className="flex items-center justify-center px-1.5">
            <img
              src={src}
              alt={`Influencer ${i + 1}`}
              className={`w-16 h-16 sm:w-24 sm:h-24 rounded-full object-cover shadow-xl
                         transition-all duration-300 hover:scale-110 hover:z-10
                         ${darkMode 
                           ? 'ring-2 ring-emerald-500/40 hover:ring-4 hover:ring-emerald-400/60' 
                           : 'ring-3 ring-white/80 hover:ring-4 hover:ring-purple-400/60'
                         }`}
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Enhanced edge fades */}
      <div className={`pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r ${darkMode ? 'from-zinc-900 via-zinc-900/90' : 'from-indigo-50 via-purple-50/90'} to-transparent`}></div>
      <div className={`pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l ${darkMode ? 'from-zinc-950 via-zinc-900/90' : 'from-pink-100 via-purple-50/90'} to-transparent`}></div>
    </div>
  </div>
</div>
    </div>
  </div>
</section>
    <section id="pulse" className={`py-14 ${darkMode ? 'bg-zinc-800' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${COLORS.neutralHeading}`}>
            Faith in Motion
          </h2>
          <p className={`text-sm ${COLORS.neutralBody}`}>
            Live generosity snapshot
          </p>
        </div>
        
        <div className="flex flex-col items-center mb-10">
          <div className={`relative inline-block px-8 py-4 rounded-2xl ${darkMode ? 'bg-zinc-800' : 'bg-zinc-50'} shadow-[0_4px_10px_rgba(156,163,175,0.4)] hover:shadow-[0_6px_14px_rgba(107,114,128,0.6)]`}>
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
              {currency(totalRaised)}
            </div>
          </div>
          <div className={`text-sm ${COLORS.neutralBody} mt-3`}>raised in the last hour</div>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {recentDonations.map((donation, index) => (
              <div 
                key={index}
                className={`relative group p-5 rounded-xl text-center overflow-hidden transition-all duration-300 ${
                  darkMode ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-zinc-50 hover:bg-white'
                } border ${darkMode ? 'border-zinc-700' : 'border-zinc-200'} hover:border-zinc-400
                shadow-[0_4px_10px_rgba(156,163,175,0.4)] hover:shadow-[0_6px_14px_rgba(107,114,128,0.6)]`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className={`text-lg font-bold ${COLORS.neutralHeading} mb-1`}>
                    {currency(donation.amount)}
                  </div>
                  <div className={`text-xs ${COLORS.neutralBody}`}>
                    {donation.name}
                  </div>
                  <div className={`text-xs ${COLORS.neutralBody} opacity-60 mt-1`}>
                    {donation.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    </>
  );
}