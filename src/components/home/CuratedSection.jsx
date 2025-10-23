// components/home/CuratedSection.jsx
import { useState, useEffect } from 'react';
import CuratedCard from '@/components/ui/CuratedCard';
import { curatedItems } from '@/lib/constants';

export default function CuratedSection({ darkMode }) {
  const [isMobile, setIsMobile] = useState(false);
  const [curatedScrollIndex, setCuratedScrollIndex] = useState(0);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  const infiniteCurated = [...curatedItems, ...curatedItems];

  const COLORS = {
    neutralHeading: darkMode ? "text-white" : "text-zinc-900",
    neutralBody: darkMode ? "text-zinc-400" : "text-zinc-600",
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-scroll for curated (mobile only)
  useEffect(() => {
    if (!isMobile || isUserScrolling) return;

    const interval = setInterval(() => {
      setCuratedScrollIndex(prev => prev + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, [isMobile, isUserScrolling]);

  // Scroll curated container
  useEffect(() => {
    if (!isMobile) return;

    const container = document.getElementById('curated-container');
    if (!container) return;

    const cardWidth = container.offsetWidth;
    const scrollTo = cardWidth * curatedScrollIndex;
    
    container.scrollTo({
      left: scrollTo,
      behavior: 'smooth'
    });

    if (curatedScrollIndex >= curatedItems.length) {
      setTimeout(() => {
        container.scrollTo({
          left: 0,
          behavior: 'auto'
        });
        setCuratedScrollIndex(0);
      }, 500);
    }
  }, [curatedScrollIndex, isMobile]);

  // Handle user scrolling detection
  useEffect(() => {
    if (!isMobile) return;

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

    return () => {
      container.removeEventListener('scroll', handleScrollStart);
    };
  }, [isMobile]);

  // Handle seamless infinite loop
  useEffect(() => {
    if (!isMobile) return;

    const container = document.getElementById('curated-container');
    if (!container) return;

    const handleScrollEnd = () => {
      const cardWidth = container.offsetWidth;
      const scrollLeft = container.scrollLeft;
      const currentIndex = Math.round(scrollLeft / cardWidth);

      if (currentIndex >= curatedItems.length) {
        const equivalentIndex = currentIndex - curatedItems.length;
        container.scrollTo({
          left: equivalentIndex * cardWidth,
          behavior: 'auto'
        });
        setCuratedScrollIndex(equivalentIndex);
      }
    };

    let scrollTimeout;
    const onScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScrollEnd, 150);
    };

    container.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      container.removeEventListener('scroll', onScroll);
    };
  }, [isMobile]);

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
        
        <div 
          id="curated-container"
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
        >
          {(isMobile ? infiniteCurated : curatedItems).map((item, index) => (
            <CuratedCard 
              key={`curated-${index}`}
              item={item}
              darkMode={darkMode}
            />
          ))}
        </div>
      </div>
    </section>
  );
}