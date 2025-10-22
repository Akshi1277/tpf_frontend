// components/home/StoriesSection.jsx
import { useState, useEffect } from 'react';
import StoryCard from '@/components/ui/StoryCard';
import { successStories } from '@/lib/constants';
import { ArrowRight } from 'lucide-react';

export default function StoriesSection({ darkMode }) {
  const [isMobile, setIsMobile] = useState(false);
  const [storyScrollIndex, setStoryScrollIndex] = useState(0);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  const infiniteStories = [...successStories, ...successStories];

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

  // Auto-scroll for stories (mobile only)
  useEffect(() => {
    if (!isMobile || isUserScrolling) return;

    const interval = setInterval(() => {
      setStoryScrollIndex(prev => prev + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, [isMobile, isUserScrolling]);

  // Scroll stories container
  useEffect(() => {
    if (!isMobile) return;

    const container = document.getElementById('stories-container');
    if (!container) return;

    const cardWidth = container.offsetWidth;
    const scrollTo = cardWidth * storyScrollIndex;
    
    container.scrollTo({
      left: scrollTo,
      behavior: 'smooth'
    });

    if (storyScrollIndex >= successStories.length) {
      setTimeout(() => {
        container.scrollTo({
          left: 0,
          behavior: 'auto'
        });
        setStoryScrollIndex(0);
      }, 500);
    }
  }, [storyScrollIndex, isMobile]);

  // Handle user scrolling detection
  useEffect(() => {
    if (!isMobile) return;

    const container = document.getElementById('stories-container');
    if (!container) return;

    let scrollTimeout;
    let isScrolling = false;

    const handleScrollStart = () => {
      if (!isScrolling) {
        isScrolling = true;
        setIsUserScrolling(true);
      }
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => { isScrolling = false;
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

    const container = document.getElementById('stories-container');
    if (!container) return;

    const handleScrollEnd = () => {
      const cardWidth = container.offsetWidth;
      const scrollLeft = container.scrollLeft;
      const currentIndex = Math.round(scrollLeft / cardWidth);

      if (currentIndex >= successStories.length) {
        const equivalentIndex = currentIndex - successStories.length;
        container.scrollTo({
          left: equivalentIndex * cardWidth,
          behavior: 'auto'
        });
        setStoryScrollIndex(equivalentIndex);
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
   <section id="stories" className={`py-14 ${darkMode ? 'bg-zinc-900' : 'bg-zinc-50'}`}>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${COLORS.neutralHeading}`}>
      Impact Stories
    </h2>
    <p className={`text-sm ${COLORS.neutralBody} mb-6`}>
      Real change made possible by your generosity.
    </p>

    <div 
      id="stories-container"
      className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-3 md:overflow-visible"
    >
      {(isMobile ? infiniteStories : successStories).map((story, index) => (
        <div 
          key={`story-${index}`}
          className={`flex-shrink-0 w-[280px] sm:w-[320px] md:w-auto snap-center rounded-2xl overflow-hidden transition-all duration-300
            ${darkMode ? 'bg-zinc-800' : 'bg-white'}
            shadow-[0_4px_10px_rgba(156,163,175,0.4)] hover:shadow-[0_6px_14px_rgba(107,114,128,0.6)]`}
        >
          <img
            src={story.image}
            alt={story.title}
            className="h-44 w-full object-cover"
          />
          <div className="p-5">
            <h3 className={`font-semibold text-base ${COLORS.neutralHeading} mb-2`}>
              {story.title}
            </h3>
            <p className={`text-sm ${COLORS.neutralBody} mb-3`}>
              {story.excerpt}
            </p>
            <a href="#" className="text-sm font-medium text-emerald-700 hover:underline flex items-center gap-1">
              Read more 
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

  );
}