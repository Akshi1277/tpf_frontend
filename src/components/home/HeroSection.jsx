// components/home/HeroSection.jsx
import { useState, useEffect } from 'react';
import { heroImages } from '@/lib/constants';

export default function HeroSection({ darkMode }) {
  const [currentHeroImage, setCurrentHeroImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage(prev => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (// components/home/HeroSection.jsx (continued)
    <section className="relative h-[500px] md:h-[600px] overflow-hidden">
      <div className="absolute inset-0">
        {heroImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentHeroImage ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={img}
              alt={`Hero ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40 md:from-black/70 md:via-black/50 md:to-transparent"></div>
          </div>
        ))}
      </div>

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl space-y-4 md:space-y-6 pt-16 md:pt-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Make a difference in someone's life today
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-zinc-200">
            Join thousands of donors supporting causes that matter. <br />
            Every contribution creates lasting impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2">
            <button className="w-full cursor-pointer sm:w-auto px-6 md:px-8 py-3 md:py-4 flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-base md:text-lg transition-colors shadow-lg">
              Start Giving
            </button>
            <button className={`w-full cursor-pointer sm:w-auto px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg transition-colors border-2
              ${darkMode 
                ? 'border-white text-white hover:bg-white/10' 
                : 'border-white text-white hover:bg-white/20'
              }`}>
              Learn More
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentHeroImage(index)}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              index === currentHeroImage 
                ? 'w-8 bg-emerald-500' 
                : 'w-1.5 bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}