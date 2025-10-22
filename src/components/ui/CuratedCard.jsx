// components/ui/CuratedCard.jsx
import { ArrowRight } from 'lucide-react';

export default function CuratedCard({ item, darkMode }) {
  return (
    <div
      className={`flex-shrink-0 w-[280px] snap-center rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-105
        ${darkMode ? 'bg-zinc-800' : 'bg-white'}
        shadow-lg hover:shadow-2xl`}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.label}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-bold text-white text-lg mb-1">{item.label}</h3>
          <p className="text-white/90 text-sm line-clamp-2">{item.description}</p>
        </div>
      </div>
      <div className="p-4">
        <button className="w-full cursor-pointer bg-emerald-6F00 hover:bg-emerald-700 text-white py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
          <span>Support Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}