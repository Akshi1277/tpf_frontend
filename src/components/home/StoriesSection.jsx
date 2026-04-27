// components/home/StoriesSection.jsx
import { useRef } from 'react';
import StoryCard from '@/components/ui/StoryCard';
import { useCMS } from '@/app/CMSContext';

export default function StoriesSection({ darkMode }) {
  const containerRef = useRef(null);
  const cms = useCMS();

  const cmsImpactStories = cms.filter(item => item.type === "impact-stories");
  if (!cmsImpactStories || cmsImpactStories.length === 0) {
    return null;
  }

  const COLORS = {
    neutralHeading: darkMode ? "text-white" : "text-zinc-900",
    neutralBody: darkMode ? "text-zinc-400" : "text-zinc-600",
  };

  const scroll = (direction) => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollBy({
      left: direction === 'left' ? -640 : 640,
      behavior: 'smooth',
    });
  };

  const showArrows = cmsImpactStories.length > 3;

  return (
    <section id="stories" className={`py-12 relative overflow-hidden ${darkMode ? 'bg-zinc-900' : 'bg-white'}`}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, ${darkMode ? '#10b981' : '#059669'} 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
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

        {/* Carousel */}
        <div className="relative group">
          {/* Left Arrow */}
          {showArrows && (
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className={`hidden md:flex absolute top-1/2 -translate-y-1/2 left-2 lg:left-0 lg:-translate-x-1/2 z-20 w-8 h-8 lg:w-9 lg:h-9 items-center justify-center rounded-full transition-all duration-300 ${darkMode
                ? 'bg-zinc-700/95 hover:bg-zinc-600 text-emerald-400 shadow-lg shadow-emerald-500/20'
                : 'bg-white/95 hover:bg-emerald-50 text-emerald-600 shadow-lg shadow-emerald-500/15'
                } backdrop-blur-sm border-2 ${darkMode ? 'border-emerald-500/40 hover:border-emerald-400/60' : 'border-emerald-400/40 hover:border-emerald-500/60'}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Cards Container */}
          <div
            ref={containerRef}
            className="overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide"
          >
            <div className="flex gap-4 sm:gap-5 items-stretch">
              {cmsImpactStories.map((story, index) => (
                <div
                  key={`story-${index}-${story.name || story.title || ''}`}
                  className="flex-shrink-0 w-[280px] sm:w-[300px] flex"
                >
                  <StoryCard
                    story={story}
                    darkMode={darkMode}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          {showArrows && (
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className={`hidden md:flex absolute top-1/2 -translate-y-1/2 right-2 lg:right-0 lg:translate-x-1/2 z-20 w-8 h-8 lg:w-9 lg:h-9 items-center justify-center rounded-full transition-all duration-300 ${darkMode
                ? 'bg-zinc-700/95 hover:bg-zinc-600 text-emerald-400 shadow-lg shadow-emerald-500/20'
                : 'bg-white/95 hover:bg-emerald-50 text-emerald-600 shadow-lg shadow-emerald-500/15'
                } backdrop-blur-sm border-2 ${darkMode ? 'border-emerald-500/40 hover:border-emerald-400/60' : 'border-emerald-400/40 hover:border-emerald-500/60'}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        {/* Mobile Scroll Hint */}
        <div className="md:hidden mt-3 text-center">
          <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
            ← Swipe to see more →
          </p>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}