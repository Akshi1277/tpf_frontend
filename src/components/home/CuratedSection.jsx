// components/home/CuratedSection.jsx
import { useState, useEffect } from 'react';
import CuratedCard from '@/components/ui/CuratedCard';
import { curatedItems } from '@/lib/constants';

export default function CuratedSection({ darkMode }) {
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
          <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${COLORS.neutralHeading}`}>
            Tailored Feed
          </h2>
          <p className={`text-sm ${COLORS.neutralBody}`}>
            Explore causes that matter most to our community
          </p>
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
      </div>
    </section>
  );
}
