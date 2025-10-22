// components/ui/ScrollToTop.jsx
import { ChevronRight } from 'lucide-react';

export default function ScrollToTop({ scrolled }) {
  if (!scrolled) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-8 w-12 h-12 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 flex items-center justify-center z-40 transition-all cursor-pointer"
      aria-label="Scroll to top"
    >
      <ChevronRight className="w-6 h-6 -rotate-90" />
    </button>
  );
}