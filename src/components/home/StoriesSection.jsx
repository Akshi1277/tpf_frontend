// components/home/StoriesSection.jsx
import { useState, useEffect } from 'react';
import StoryCard from '@/components/ui/StoryCard';
import { successStories } from '@/lib/constants';

export default function StoriesSection({ darkMode }) {
  const [isMobile, setIsMobile] = useState(false);
  const [storyScrollIndex, setStoryScrollIndex] = useState(0);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

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

  useEffect(() => {
    if (!isMobile || isUserScrolling) return;

    const interval = setInterval(() => {
      setStoryScrollIndex(prev => prev + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, [isMobile, isUserScrolling]);

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

  return (
    <section id="stories" className={`py-12 relative overflow-hidden ${darkMode ? 'bg-zinc-900' : 'bg-white'}`}>
      {/* Advanced background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, ${darkMode ? '#10b981' : '#059669'} 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Premium header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className={`h-px w-8 ${darkMode ? 'bg-emerald-500/30' : 'bg-emerald-600/30'}`}></div>
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${darkMode ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-emerald-50 border border-emerald-200'}`}>
              <span className={`text-2xl md:text-3xl font-semibold ${darkMode ? 'text-emerald-400' : 'text-black'}`}>
                Impact Stories
              </span>
            </div>
            <div className={`h-px w-8 ${darkMode ? 'bg-emerald-500/30' : 'bg-emerald-600/30'}`}></div>
          </div>
          
          <h2 className={`text-xl md:text-2xl font-bold mb-3 ${COLORS.neutralHeading}`}>
            Building Īmān,
            <span className={`block mt-1 ${darkMode ? 'text-emerald-400' : 'bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent'}`}>
              Inspiring Hearts
            </span>
          </h2>
          
          <p className={`text-sm md:text-base ${COLORS.neutralBody} max-w-2xl mx-auto leading-relaxed`}>
            Every act of kindness strengthens our unity and faith. These are the journeys of hope, resilience, and spiritual renewal that flourish through your support.
          </p>
        </div>

        {/* Cards grid */}
        <div 
          id="stories-container"
          className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-3 md:overflow-visible md:gap-4"
        >
         {(isMobile ? infiniteStories : successStories).map((story, index) => (
  <div 
    key={`story-${index}-${story.name || story.title || ''}`}
    className="min-w-[280px] md:min-w-0 flex-shrink-0 snap-start"
  >
    <StoryCard 
      story={story} 
      darkMode={darkMode}
      isActive={activeCard === index}
      onHover={() => setActiveCard(index)}
      onLeave={() => setActiveCard(null)}
      compact={true}
    />
  </div>
))}
        </div>

        {/* CTA section */}
        {/* <div className={`mt-8 text-center p-6 md:p-8 rounded-2xl relative overflow-hidden ${darkMode ? 'bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700' : 'bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100'}`}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-500 rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10">
            <h3 className={`text-xl md:text-2xl font-bold mb-2 ${COLORS.neutralHeading}`}>
              Your Story Could Be Next
            </h3>
            <p className={`text-sm md:text-base ${COLORS.neutralBody} mb-4 max-w-2xl mx-auto`}>
              Join thousands creating lasting impact. Start your campaign and let the world rally behind your cause.
            </p>
            <button className={`px-6 py-2.5 md:px-8 md:py-3 rounded-xl font-bold text-sm md:text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 ${
              darkMode 
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white' 
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}>
              Explore All Impact Stories
            </button>
          </div>
        </div> */}
      </div>
    </section>
  );
}