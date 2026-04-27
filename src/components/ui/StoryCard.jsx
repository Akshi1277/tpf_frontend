import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getMediaUrl } from '@/utils/media';

export default function StoryCard({ story, darkMode }) {
  const router = useRouter();

  const handleCardClick = () => {
    if (story.story && story.story.trim().length > 0) {
      router.push(`/impact/${story._id}`);
    } else {
      alert("Full story is not available.");
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={`flex flex-col h-full w-full cursor-pointer rounded-2xl overflow-hidden
        border transition-[box-shadow,border-color] duration-200
        ${darkMode
          ? 'bg-zinc-800 border-zinc-700/50 hover:border-emerald-500/50 hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)]'
          : 'bg-white border-zinc-200 hover:border-emerald-400/60 hover:shadow-[0_4px_16px_rgba(0,0,0,0.10)]'}
        shadow-sm`}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={getMediaUrl(story.image)}
          alt={story.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className={`font-bold text-lg mb-2 line-clamp-2 leading-tight ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
          {story.title}
        </h3>

        <p className={`text-sm mb-4 line-clamp-2 leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
          {story.description || story.excerpt}
        </p>

        <div className={`pt-3 border-t mt-auto ${darkMode ? 'border-zinc-700' : 'border-zinc-200'}`}>
          <span className={`inline-flex items-center gap-2 text-sm font-semibold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
            <span className="underline underline-offset-2 decoration-1 decoration-current">Read the full story</span>
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </div>
  );
}