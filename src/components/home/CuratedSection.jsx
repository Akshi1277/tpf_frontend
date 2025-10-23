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


  useEffect(() => {
    if (isUserScrolling) return;

    const interval = setInterval(() => {
      setCuratedScrollIndex(prev => prev + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, [isUserScrolling]);

  // Scroll curated container
  useEffect(() => {
    const container = document.getElementById('curated-container');
    if (!container) return;

    const cardWidth = container.children[0]?.offsetWidth || 0;
    const gap = 20; // 1.25rem = 20px
    const scrollTo = (cardWidth + gap) * curatedScrollIndex;
    
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
  }, [curatedScrollIndex]);

  // Handle user scrolling detection
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

    return () => {
      container.removeEventListener('scroll', handleScrollStart);
    };
  }, []);

  // Handle seamless infinite loop for manual scrolling
  useEffect(() => {
    const container = document.getElementById('curated-container');
    if (!container) return;

    const handleScrollEnd = () => {
      const cardWidth = container.children[0]?.offsetWidth || 0;
      const gap = 20; // 1.25rem = 20px
      const scrollLeft = container.scrollLeft;
      const currentIndex = Math.round(scrollLeft / (cardWidth + gap));

      if (currentIndex >= curatedItems.length) {
        const equivalentIndex = currentIndex - curatedItems.length;
        container.scrollTo({
          left: equivalentIndex * (cardWidth + gap),
          behavior: 'auto'
        });
        setCuratedScrollIndex(equivalentIndex);
      } else if (currentIndex < 0) {
        container.scrollTo({
          left: (curatedItems.length + currentIndex) * (cardWidth + gap),
          behavior: 'auto'
        });
        setCuratedScrollIndex(curatedItems.length + currentIndex);
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
  }, []);

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
  {infiniteCurated.map((item, index) => (
    <div 
      key={`curated-${item.id}-${index}`} 
      className="flex-shrink-0 w-[200px] md:w-[280px] snap-start"
    >
      <CuratedCard 
        item={item}
        darkMode={darkMode}
      />
    </div>
  ))}
</div>

      </div>
    </section>
  );
}