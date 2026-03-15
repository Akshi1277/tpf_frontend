'use client';

import { motion } from 'framer-motion';
import { Youtube, Play } from 'lucide-react';

/**
 * Extracts the YouTube video ID from a full YouTube URL.
 * Handles formats:
 *  - https://www.youtube.com/watch?v=VIDEO_ID
 *  - https://youtu.be/VIDEO_ID
 *  - https://www.youtube.com/embed/VIDEO_ID
 *  - https://youtube.com/shorts/VIDEO_ID
 */
function getYouTubeVideoId(url) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    // youtu.be short links
    if (parsed.hostname === 'youtu.be') {
      return parsed.pathname.slice(1).split('?')[0];
    }
    // youtube.com/watch?v=
    const v = parsed.searchParams.get('v');
    if (v) return v;
    // youtube.com/embed/ or youtube.com/shorts/
    const pathParts = parsed.pathname.split('/').filter(Boolean);
    if (['embed', 'shorts', 'v'].includes(pathParts[0]) && pathParts[1]) {
      return pathParts[1];
    }
  } catch {
    // malformed URL — silently return null
  }
  return null;
}

export default function CampaignVideo({ campaign, darkMode }) {
  // Grab the first social media submission's YouTube link
  const youtubeUrl = campaign?.socialMediaSubmissions?.[0]?.links?.youtube;
  const videoId = getYouTubeVideoId(youtubeUrl);

  // Don't render anything if no valid YouTube video found
  if (!videoId) return null;

  const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&color=white`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`rounded-2xl overflow-hidden shadow-lg ${
        darkMode ? 'bg-zinc-800' : 'bg-white'
      }`}
    >
      {/* Header */}
      <div className={`flex items-center gap-3 px-5 py-4 border-b ${
        darkMode ? 'border-zinc-700' : 'border-gray-100'
      }`}>
        <div className="p-2 rounded-xl bg-red-500/10">
          <Youtube className="w-5 h-5 text-red-500" />
        </div>
        <div>
          <h3 className={`font-semibold text-sm sm:text-base ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Campaign Video
          </h3>
          <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            Watch to learn more about this cause
          </p>
        </div>
        {/* YouTube badge */}
        <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/10">
          <Play className="w-3 h-3 text-red-500 fill-red-500" />
          <span className="text-xs font-semibold text-red-500">YouTube</span>
        </div>
      </div>

      {/* Video embed — 16:9 responsive */}
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          src={embedUrl}
          title="Campaign Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          loading="lazy"
        />
      </div>
    </motion.div>
  );
}