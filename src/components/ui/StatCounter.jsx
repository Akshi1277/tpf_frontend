// components/ui/StatCounter.jsx
import { useCountUp } from '@/lib/hooks/useCountUp';

export default function StatCounter({ label, end, format, suffix = '', darkMode, shouldAnimate }) {
  const count = useCountUp(end, 2000, shouldAnimate);
  
  const formatValue = (value) => {
    if (format === 'currency') {
      return new Intl.NumberFormat("en-IN", { 
        style: "currency", 
        currency: "INR", 
        maximumFractionDigits: 0 
      }).format(value);
    }
    return value.toLocaleString() + suffix;
  };

  return (
    <div className="text-center transform transition-all duration-700" style={{
      opacity: shouldAnimate ? 1 : 0,
      transform: shouldAnimate ? 'translateY(0)' : 'translateY(20px)'
    }}>
      <div className={`text-3xl md:text-4xl font-bold mb-2 transition-colors duration-300 ${
        darkMode ? 'text-emerald-400' : 'text-emerald-500'
      }`}>
        {formatValue(count)}
      </div>
      <div className={`text-sm font-medium uppercase tracking-wider ${
        darkMode ? 'text-zinc-500' : 'text-zinc-600'
      }`}>
        {label}
      </div>
    </div>
  );
}