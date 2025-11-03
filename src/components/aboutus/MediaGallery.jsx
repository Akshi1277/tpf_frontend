// components/about/MediaGallery.jsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function MediaGallery({ darkMode }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.media-item', {
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.media-grid',
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const media = [
    {
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80',
      title: 'Our Story',
    },
    {
      type: 'image',
      thumbnail: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&q=80',
      title: 'Community Impact',
    },
    {
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&q=80',
      title: 'Donor Testimonials',
    },
    {
      type: 'image',
      thumbnail: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80',
      title: 'Global Reach',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className={`py-20 ${darkMode ? 'bg-zinc-900' : 'bg-white'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-zinc-900'
            }`}
          >
            Voices of{' '}
            <span className="bg-gradient-to-r from-teal-500 to-emerald-500 text-transparent bg-clip-text">
              TPF Aid
            </span>
          </h2>
          <p
            className={`text-lg ${
              darkMode ? 'text-zinc-400' : 'text-zinc-600'
            }`}
          >
            Stories from our community that inspire us every day
          </p>
        </div>

        <div className="media-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {media.map((item, i) => (
            <div
              key={i}
              className="media-item group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              {item.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <Play className="w-8 h-8 text-white fill-white" />
                  </div>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-semibold text-lg">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button className="px-8 py-3 cursor-pointer bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-lg font-medium text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
            Watch More Stories
          </button>
        </div>
      </div>
    </section>
  );
}