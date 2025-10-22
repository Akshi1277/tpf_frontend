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
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=256&q=80&auto=format",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=256&q=80&auto=format",
  "https://plus.unsplash.com/premium_photo-1661964252605-8ba0cd83b056?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXJhYiUyMG1hbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
  "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=256&q=80&auto=format",
  "https://plus.unsplash.com/premium_photo-1679064458881-76904cf6d1aa?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aGlqYWIlMjB3b21lbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
  "https://plus.unsplash.com/premium_photo-1681489847451-0eaec69a0214?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhpamFiJTIwd29tZW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
  "https://media.istockphoto.com/id/2195339571/photo/portrait-of-happy-arab-man-standing-at-park.webp?a=1&b=1&s=612x612&w=0&k=20&c=NWyGOj28eT6nftfzxG0-Gs6z6S_O5lmAwPbpenfJp5o=",
  "https://plus.unsplash.com/premium_photo-1677523780219-ebb367026ced?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG11c2xpbSUyMG1hbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600"
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
    Start meaningful change with TPF Aid

    </h3>
    <p className={`text-sm ${COLORS.neutralBody} mb-4`}>
      Join a trusted community of givers supporting impactful causes. With 0% platform fees and a global donor network, your campaign gets the reach and support it deserves. Create hope—start fundraising today.
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
  className={`rounded-3xl p-6 md:p-8 border relative overflow-hidden flex flex-col
    ${darkMode
      ? 'bg-zinc-900 border-zinc-800'
      : 'bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 border-zinc-100'
    }
  `}
>
  <h3 className="text-2xl sm:text-5xl font-bold leading-tight mb-3 text-emerald-500">
    Easy. <br/>Trusted.<br/>Inspiring.
  </h3>
  <p className={`text-base ${COLORS.neutralBody} mb-7`}>
    Give with confidence—every fundraiser is vetted,<br></br>
     and making an impact is just a tap away. <span className="underline cursor-pointer">Learn more.</span>
  </p>

  <div className={`text-2xl font-semibold mb-3 ${COLORS.neutralHeading}`}>
    Trusted by those you trust
  </div>

  {/* Slider viewport (exactly 5 visible) */}
  <div className="relative overflow-hidden rounded-2xl pb-0">
    {/* moving track */}
    <div
      className="grid grid-flow-col auto-cols-[20%] items-center gap-0"
      style={{
        transform: `translateX(-${infIndex * 10}%)`,
        transition: infNoTransition ? 'none' : 'transform 5000ms ease-out',
      }}
    >
      {influencersExtended.map((src, i) => (
        <div key={`influencer-${i}`} className="flex items-center justify-center px-1">
          <img
            src={src}
            alt={`Influencer ${i + 1}`}
            className="w-14 h-14 sm:w-28 sm:h-28 rounded-full object-cover ring-2
                       ring-white dark:ring-zinc-800 shadow-md"
            loading="lazy"
          />
        </div>
      ))}
    </div>

    {/* subtle edge fade */}
    <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white/70 to-transparent dark:from-zinc-900/70"></div>
    <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white/70 to-transparent dark:from-zinc-900/70"></div>
  </div>
</div>
    </div>
  </div>
</section>
    <section id="pulse" className={`py-14 ${darkMode ? 'bg-zinc-800' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${COLORS.neutralHeading}`}>
            Pulse of the Ummah
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