// components/about/MissionSection.jsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MissionSection({ darkMode }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.mission-text', {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: '.mission-text',
          start: 'top 80%',
        },
      });

      gsap.from('.mission-image', {
        opacity: 0,
        scale: 0.95,
        duration: 1,
        scrollTrigger: {
          trigger: '.mission-image',
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`py-20 ${darkMode ? 'bg-zinc-800' : 'bg-zinc-50'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="mission-text">
            <h2
              className={`text-3xl md:text-5xl font-bold mb-6 ${
                darkMode ? 'text-white' : 'text-zinc-900'
              }`}
            >
              We started with a{' '}
              <span className="bg-gradient-to-r from-teal-500 to-emerald-500 text-transparent bg-clip-text">
                belief
              </span>
            </h2>
            <p
              className={`text-lg md:text-xl mb-6 ${
                darkMode ? 'text-zinc-300' : 'text-zinc-700'
              }`}
            >
              Every person has incredible stories to share and causes worth fighting for. 
              Together, we set out to build a platform that empowers individuals and 
              organizations to make real impact.
            </p>
            <p
              className={`text-base md:text-lg ${
                darkMode ? 'text-zinc-400' : 'text-zinc-600'
              }`}
            >
              TPF Aid connects people from one part of the world to another to support 
              good causes, embodying the global heartbeat of compassion and generosity.
            </p>
          </div>
          <div className="mission-image">
            <img
              src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80"
              alt="Our Mission"
              className="rounded-2xl w-full h-[400px] object-cover shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}