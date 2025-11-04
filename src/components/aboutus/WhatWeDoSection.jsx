// components/home/CuratedSection.jsx
import { useState, useEffect } from 'react';
import CuratedCard from '@/components/ui/CuratedCard';
import { curatedItems } from '@/lib/constants';

export default function WhatWeDoSection({ darkMode }) {
  const [curatedScrollIndex, setCuratedScrollIndex] = useState(0);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  const infiniteCurated = [...curatedItems, ...curatedItems];

  const COLORS = {
    neutralHeading: darkMode ? "text-white" : "text-zinc-900",
    neutralBody: darkMode ? "text-zinc-400" : "text-zinc-600",
  };

  // ---------- AUTO SCROLL (mobile only) ----------
  useEffect(() => {
    if (isUserScrolling) return;
   
    const interval = setInterval(() => {
      setCuratedScrollIndex(prev => prev + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, [isUserScrolling]);

  // ---------- SCROLL TO INDEX ----------
  useEffect(() => {
    const container = document.getElementById('curated-container');
    if (!container) return;

    const cardWidth = container.children[0]?.offsetWidth || 0;
    const gap = 20;
    const scrollTo = (cardWidth + gap) * curatedScrollIndex;
    
    container.scrollTo({ left: scrollTo, behavior: 'smooth' });

    if (curatedScrollIndex >= curatedItems.length) {
      setTimeout(() => {
        container.scrollTo({ left: 0, behavior: 'auto' });
        setCuratedScrollIndex(0);
      }, 500);
    }
  }, [curatedScrollIndex]);

  // ---------- USER SCROLL DETECTION ----------
  useEffect(() => {
    const container = document.getElementById('curated-container');
    if (!container) return;

    let scrollTimeout;
    let isScrolling = false;

    const handleScrollStart = () => {
      if (!isScrolling) {
        isScrolling = true;
        setIsUserScrolling(true);
      }
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
        setIsUserScrolling(false);
      }, 2000);
    };

    container.addEventListener('scroll', handleScrollStart, { passive: true });
    return () => container.removeEventListener('scroll', handleScrollStart);
  }, []);

  // ---------- INFINITE MANUAL LOOP ----------
  useEffect(() => {
    const container = document.getElementById('curated-container');
    if (!container) return;

    const handleScrollEnd = () => {
      const cardWidth = container.children[0]?.offsetWidth || 0;
      const gap = 20;
      const scrollLeft = container.scrollLeft;
      const currentIndex = Math.round(scrollLeft / (cardWidth + gap));

      if (currentIndex >= curatedItems.length) {
        const equivalentIndex = currentIndex - curatedItems.length;
        container.scrollTo({ left: equivalentIndex * (cardWidth + gap), behavior: 'auto' });
        setCuratedScrollIndex(equivalentIndex);
      } else if (currentIndex < 0) {
        container.scrollTo({ left: (curatedItems.length + currentIndex) * (cardWidth + gap), behavior: 'auto' });
        setCuratedScrollIndex(curatedItems.length + currentIndex);
      }
    };

    let scrollTimeout;
    const onScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScrollEnd, 150);
    };

    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, []);

  // ---------- MANUAL SCROLL HANDLERS ----------
  const scrollLeft = () => {
    const c = document.getElementById('curated-container');
    c?.scrollBy({ left: -300, behavior: 'smooth' });
  };
  const scrollRight = () => {
    const c = document.getElementById('curated-container');
    c?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <section id="curated" className={`py-14 ${darkMode ? 'bg-zinc-900' : 'bg-zinc-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          {/* Decorative accent */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-1 w-8 sm:w-12 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"></div>
            <svg className="w-5 h-5 text-teal-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <div className="h-1 w-8 sm:w-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
          </div>

          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-3 ${COLORS.neutralHeading}`}>
            Join Us for a{' '}
            <span className="bg-gradient-to-r from-teal-500 via-emerald-500 to-orange-500 text-transparent bg-clip-text">
              Cause
            </span>
          </h2>
          <p className={`text-base sm:text-lg md:text-xl max-w-2xl mx-auto ${COLORS.neutralBody}`}>
            Every donation plants hope. Every contribution writes a new story. Choose a cause, change a life.
          </p>

          {/* Call to action badge */}
          <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-gradient-to-r from-teal-500/10 to-emerald-500/10 border border-teal-500/20">
            <svg className="w-4 h-4 text-teal-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span className={`text-sm font-medium ${darkMode ? 'text-teal-400' : 'text-teal-700'}`}>
              Your generosity creates miracles
            </span>
          </div>
        </div>

        <div className="relative">
          {/* LEFT - desktop only */}
          <button
            onClick={scrollLeft}
            className="hidden md:flex items-center justify-center
                       absolute -left-10 top-1/2 -translate-y-1/2 z-10
                       h-9 w-9 rounded-full
                       border-2 border-emerald-600 dark:border-emerald-500/50
                       bg-gradient-to-br from-emerald-200 via-emerald-50 to-emerald-100
                       dark:bg-gradient-to-br dark:from-emerald-500/20 dark:via-zinc-800/60 dark:to-emerald-600/20
                       backdrop-blur-sm
                       shadow-[0_0_25px_rgba(5,150,105,0.7)]
                       dark:shadow-[0_0_20px_rgba(16,185,129,0.3)]
                       hover:from-emerald-300 hover:via-emerald-100 hover:to-emerald-200
                       hover:shadow-[0_0_30px_rgba(5,150,105,0.9)]
                       dark:hover:from-emerald-500/30 dark:hover:via-zinc-700/80 dark:hover:to-emerald-600/30
                       dark:hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]
                       transition-all duration-300
                       text-emerald-700 dark:text-emerald-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div 
            id="curated-container"
            className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          >
            {infiniteCurated.map((item, index) => (
              <div key={`curated-${item.id}-${index}`} className="flex-shrink-0 w-[200px] md:w-[280px] snap-start">
                <CuratedCard item={item} darkMode={darkMode}/>
              </div>
            ))}
          </div>

          {/* RIGHT - desktop only */}
          <button
            onClick={scrollRight}
            className="hidden md:flex items-center justify-center
                       absolute -right-10 top-1/2 -translate-y-1/2 z-10
                       h-9 w-9 rounded-full
                       border-2 border-emerald-600 dark:border-emerald-500/50
                       bg-gradient-to-br from-emerald-200 via-emerald-50 to-emerald-100
                       dark:bg-gradient-to-br dark:from-emerald-500/20 dark:via-zinc-800/60 dark:to-emerald-600/20
                       backdrop-blur-sm
                       shadow-[0_0_25px_rgba(5,150,105,0.7)]
                       dark:shadow-[0_0_20px_rgba(16,185,129,0.3)]
                       hover:from-emerald-300 hover:via-emerald-100 hover:to-emerald-200
                       hover:shadow-[0_0_30px_rgba(5,150,105,0.9)]
                       dark:hover:from-emerald-500/30 dark:hover:via-zinc-700/80 dark:hover:to-emerald-600/30
                       dark:hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]
                       transition-all duration-300
                       text-emerald-700 dark:text-emerald-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Bottom inspiration text */}
        <div className="text-center mt-8">
          <p className={`text-sm italic ${COLORS.neutralBody}`}>
            "No act of kindness, no matter how small, is ever wasted."
          </p>
        </div>
      </div>
    </section>
  );
}