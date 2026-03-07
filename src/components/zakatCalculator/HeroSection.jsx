import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
// Subtle Islamic 8-point star - light theme version
const IslamicStar = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
    <polygon points="50,8 59,36 89,36 66,54 75,82 50,64 25,82 34,54 11,36 41,36" fill="currentColor" />
  </svg>
);

const HeroSection = ({ onStart, formRef }) => {
  const router = useRouter()

  const handleBegin = () => {
    formRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="relative overflow-hidden bg-white">
      {/* Very subtle emerald tint at top */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(16,185,129,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Thin emerald top border */}
      <div className="absolute top-0 inset-x-0 h-1 bg-emerald-600" />

      {/* Islamic star watermark - very faint */}
      <div className="absolute right-8 top-10 opacity-[0.04] hidden lg:block">
        <IslamicStar size={220} className="text-emerald-800" />
      </div>
      <div className="absolute left-0 bottom-0 opacity-[0.03] hidden lg:block" style={{ transform: 'translate(-30%, 30%)' }}>
        <IslamicStar size={280} className="text-emerald-800" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 sm:px-10 py-16 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* ── LEFT ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Org badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1.5 mb-6">
              <IslamicStar size={12} className="text-emerald-600" />
              <span className="text-xs font-semibold text-emerald-700 tracking-wide">Zakat Calculator</span>
            </div>

            {/* Arabic */}
            {/* Arabic */}
            <div className="mb-5 text-center">
              <p
                className="text-2xl sm:text-3xl leading-loose text-emerald-800"
                style={{
                  fontFamily: '"Noto Naskh Arabic", "Amiri", Georgia, serif',
                  direction: "rtl",
                }}
              >
                بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ
              </p>

              <p className="text-xs text-gray-400 mt-1 italic">
                In the name of Allah, the Most Gracious, the Most Merciful
              </p>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Calculate your
              <span className="block text-emerald-600">Zakat obligation</span>
            </h1>

            <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-md">
              A step-by-step calculator grounded in Islamic jurisprudence. Covering assets, deductions, and Nisab — clear and transparent.
            </p>

            {/* Quick facts */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[
                { label: 'Zakat Rate', value: '2.5%' },
                { label: 'Gold Nisab', value: '87.48g' },
                { label: 'Silver Nisab', value: '612.36g' },
                { label: 'Haul Period', value: '1 Lunar Yr' },
              ].map((stat, i) => (
                <div key={i} className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-center">
                  <p className="text-base font-bold text-emerald-700">{stat.value}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={handleBegin}
              className="inline-flex items-center gap-3 cursor-pointer px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors shadow-sm shadow-emerald-200"
            >
              Begin Calculation
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>

          {/* ── RIGHT — Formula card ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              {/* Emerald header bar */}
              <div className="bg-emerald-600 px-5 py-4">
                <p className="text-xs font-bold text-white/70 uppercase tracking-widest mb-0.5">Formula</p>
                <p className="text-white font-bold text-base">How Zakat is Calculated</p>
              </div>

              <div className="p-5 space-y-3">
                {/* Assets row */}
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-emerald-50 border border-emerald-100">
                  <div className="w-6 h-6 rounded-lg bg-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Zakatable Assets</p>
                    <p className="text-xs text-gray-500 mt-0.5">Cash · Gold · Silver · Investments · Receivables</p>
                  </div>
                </div>

                {/* Liabilities row */}
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-red-50 border border-red-100">
                  <div className="w-6 h-6 rounded-lg bg-red-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Immediate Liabilities</p>
                    <p className="text-xs text-gray-500 mt-0.5">Rent · Bills · Debts due now (not annual totals)</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-px bg-gray-100" />
                  <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest whitespace-nowrap">= Net Zakatable Wealth</span>
                  <div className="flex-1 h-px bg-gray-100" />
                </div>

                {/* Nisab check */}
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-50 border border-amber-100">
                  <div className="w-6 h-6 rounded-lg bg-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Nisab Threshold Check</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      If wealth ≥ 87.48g gold <em>or</em> 612.36g silver, held for 1 lunar year
                    </p>
                  </div>
                </div>

                {/* Result */}
                <div className="p-4 rounded-xl bg-emerald-600 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-white/60 uppercase tracking-widest">Your obligation</p>
                    <p className="text-sm font-bold text-white mt-0.5">Net Wealth × 2.5%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-white/60 uppercase tracking-widest">Equals</p>
                    <p className="text-xl font-black text-white mt-0.5">Zakāt Due</p>
                  </div>
                </div>

                <p className="text-xs text-gray-400 text-center leading-relaxed pt-1">
                  Nisab: minimum threshold set by the Prophet ﷺ — scholars typically use the silver standard.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default HeroSection;