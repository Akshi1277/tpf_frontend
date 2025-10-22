// components/ui/StoryCard.jsx
import { ArrowRight } from 'lucide-react';

export default function StoryCard({ story, darkMode }) {
  const COLORS = {
    neutralHeading: darkMode ? "text-white" : "text-zinc-900",
    neutralBody: darkMode ? "text-zinc-400" : "text-zinc-600",
  };

  return (
    <div 
      className={`flex-shrink-0 w-[280px] sm:w-[320px] md:w-auto snap-center rounded-2xl overflow-hidden transition-all duration-300
        ${darkMode ? 'bg-zinc-800' : 'bg-white'}
        shadow-[0_4px_10px_rgba(110,231,183,0.4)] hover:shadow-[0_6px_14px_rgba(16,185,129,0.6)]`}
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
  );
}