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

  return (
    <section className="relative h-[500px] md:h-[600px] lg:h-[650px] overflow-hidden">
      {/* Background Images */}
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
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40 md:from-black/75 md:via-black/55 md:to-transparent lg:from-black/70 lg:via-black/50"></div>
          </div>
        ))}
      </div>

     
      <div className="relative h-full w-full">
        <div className="h-full flex items-center">
         
          <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
            <div className="max-w-[90%] sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl space-y-4 md:space-y-5 lg:space-y-6">
              {/* Heading */}
              <h1 className="text-3xl mt-8 md:mt-0 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                Make a difference in someone's life today
              </h1>
              
              {/* Description */}
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-zinc-200 leading-relaxed">
                Join thousands of donors supporting causes that matter.
                <br className="hidden sm:inline" />
                <span className="sm:inline"> </span>
                Every contribution creates lasting impact.
              </p>
              
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4">
                <button className="w-full cursor-pointer sm:w-auto px-6 md:px-8 lg:px-10 py-3 md:py-3.5 lg:py-4 flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-base md:text-lg lg:text-xl transition-colors shadow-lg">
                  Start Giving
                </button>
                <button className={`w-full cursor-pointer sm:w-auto px-6 md:px-8 lg:px-10 py-3 md:py-3.5 lg:py-4 rounded-lg font-semibold text-base md:text-lg lg:text-xl transition-colors border-2
                  ${darkMode 
                    ? 'border-white text-white hover:bg-white/10' 
                    : 'border-white text-white hover:bg-white/20'
                  }`}>
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
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