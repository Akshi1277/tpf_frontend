import { ArrowRight, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getMediaUrl } from '@/utils/media';

export default function StoryCard({ story, darkMode, isActive, onHover, onLeave }) {
  const COLORS = {
    neutralHeading: darkMode ? "text-white" : "text-zinc-900",
    neutralBody: darkMode ? "text-zinc-400" : "text-zinc-600",
  };
  const router = useRouter();

  const handleReadMore = () => {
    if (story.story && story.story.trim().length > 0) {
      router.push(`/impact/${story._id}`);
    } else {
      alert("Full story is not available.");
    }
  };

  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`group flex flex-col h-full flex-shrink-0 w-[280px] sm:w-[320px] md:w-auto snap-center rounded-3xl overflow-hidden transition-all duration-700 cursor-pointer
    ${darkMode ? 'bg-zinc-800' : 'bg-white'}
    ${isActive ? 'shadow-2xl md:scale-105' : 'shadow-lg md:hover:shadow-2xl md:hover:scale-105'}
    border ${darkMode ? 'border-zinc-700/50' : 'border-zinc-200'}`}
    >

      {/* Image with overlay */}
      <div className="relative overflow-hidden h-48"> {/* reduced from h-64 */}
        <img
          src={getMediaUrl(story.image)}
          alt={story.title}
          className="h-full w-full object-cover transition-all duration-1000 group-hover:scale-125 group-hover:rotate-2"
          loading='lazy'
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

        {/* Bottom info - visible on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <div className="flex items-center gap-3 text-white text-sm">
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              <span className="font-semibold">1.2K+ helped</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow"> {/* reduced from p-7 */}
        <h3 className={`font-bold text-xl ${COLORS.neutralHeading} mb-2 line-clamp-2 group-hover:text-emerald-500 transition-colors duration-300 leading-tight`}>
          {story.title}
        </h3>

        <p className={`text-sm ${COLORS.neutralBody} mb-4 line-clamp-2 leading-relaxed`}>
          {story.description || story.excerpt}
        </p>

        {/* Action bar */}
        <div className={`pt-3 border-t mt-auto ${darkMode ? 'border-zinc-700' : 'border-zinc-200'}`}>
          <div
            onClick={handleReadMore}
            className={`inline-flex items-center gap-2 text-sm font-bold group/link transition-all duration-300 cursor-pointer ${darkMode ? 'text-emerald-400' : 'text-emerald-600'
              }`}
          >
            <span className="relative">
              Read the full story
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-500 group-hover/link:w-full transition-all duration-300"></span>
            </span>

            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-2" />
          </div>
        </div>

      </div>
    </div>
  );
}
