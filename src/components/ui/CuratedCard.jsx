// components/ui/CuratedCard.jsx
import { ArrowRight } from 'lucide-react';

export default function CuratedCard({ item, darkMode }) {
  return (
    <div
      className={`flex-shrink-0 w-full snap-center rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-105
        ${darkMode ? 'bg-zinc-800' : 'bg-white'}
        shadow-lg hover:shadow-2xl`}
    >
      <div className="relative h-32 sm:h-40 md:h-48 overflow-hidden rounded-xl">
        <img
          src={item.image}
          alt={item.label}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
          <h3 className="font-bold text-white text-sm md:text-lg mb-1">{item.label}</h3>
          <p className="text-white/90 text-xs md:text-sm line-clamp-2">{item.description}</p>
        </div>
      </div>
      <div className="p-2 md:p-3">
        <button className="w-full cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-medium transition-colors flex items-center justify-center gap-1.5">
          <span>Support Now</span>
          <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
        </button>
      </div>
    </div>
  );
}