import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
// Subtle Islamic 8-point star - light theme version
const IslamicStar = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
    <polygon points="50,8 59,36 89,36 66,54 75,82 50,64 25,82 34,54 11,36 41,36" fill="currentColor" />
  </svg>
);

const HeroSection = ({ onStart, formRef, darkMode = false }) => {
  const router = useRouter()

  const handleBegin = () => {
    formRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className={`relative overflow-hidden transition-colors ${darkMode ? 'bg-[#121212]' : 'bg-white'}`}>
      {/* Very subtle emerald tint at top */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(16,185,129,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Thin emerald top border */}
      <div className={`absolute top-0 inset-x-0 h-1 transition-colors ${darkMode ? 'bg-emerald-500' : 'bg-emerald-600'}`} />

      {/* Islamic star watermark - very faint */}
      <div className="absolute right-8 top-10 opacity-[0.04] hidden lg:block">
        <IslamicStar size={220} className={`transition-colors ${darkMode ? 'text-emerald-500' : 'text-emerald-800'}`} />
      </div>
      <div className="absolute left-0 bottom-0 opacity-[0.03] hidden lg:block" style={{ transform: 'translate(-30%, 30%)' }}>
        <IslamicStar size={280} className={`transition-colors ${darkMode ? 'text-emerald-500' : 'text-emerald-800'}`} />
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
            <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-6 border transition-colors ${darkMode ? 'bg-emerald-900/30 border-emerald-800' : 'bg-emerald-50 border-emerald-200'}`}>
              <IslamicStar size={12} className={`transition-colors ${darkMode ? 'text-emerald-500' : 'text-emerald-600'}`} />
              <span className={`text-xs font-semibold tracking-wide transition-colors ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>Zakat Calculator</span>
            </div>

            {/* Arabic */}
            <div className="mb-5 text-center">
              <p
                className={`text-2xl sm:text-3xl leading-loose transition-colors ${darkMode ? 'text-emerald-400' : 'text-emerald-800'}`}
                style={{
                  fontFamily: '"Noto Naskh Arabic", "Amiri", Georgia, serif',
                  direction: "rtl",
                }}
              >
                بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ
              </p>

              <p className={`text-xs mt-1 italic transition-colors ${darkMode ? 'text-zinc-500' : 'text-gray-400'}`}>
                In the name of Allah, the Most Gracious, the Most Merciful
              </p>
            </div>

            {/* Headline */}
            <h1 className={`text-4xl sm:text-5xl font-bold leading-tight mb-4 transition-colors ${darkMode ? 'text-zinc-100' : 'text-gray-900'}`}>
              Calculate your
              <span className={`block transition-colors ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>Zakat obligation</span>
            </h1>

            <p className={`text-base leading-relaxed mb-8 max-w-md transition-colors ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
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
                <div key={i} className={`rounded-xl p-3 text-center border transition-colors ${darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-gray-50 border-gray-100'}`}>
                  <p className={`text-base font-bold transition-colors ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>{stat.value}</p>
                  <p className={`text-xs mt-0.5 transition-colors ${darkMode ? 'text-zinc-500' : 'text-gray-400'}`}>{stat.label}</p>
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
            <div className={`rounded-2xl border shadow-sm overflow-hidden transition-colors ${darkMode ? 'bg-[#121212] border-zinc-800' : 'bg-white border-gray-200'}`}>
              {/* Emerald header bar */}
              <div className={`px-5 py-4 transition-colors ${darkMode ? 'bg-emerald-900/60' : 'bg-emerald-600'}`}>
                <p className={`text-xs font-bold uppercase tracking-widest mb-0.5 transition-colors ${darkMode ? 'text-emerald-500' : 'text-white/70'}`}>Formula</p>
                <p className={`font-bold text-base transition-colors ${darkMode ? 'text-emerald-100' : 'text-white'}`}>How Zakat is Calculated</p>
              </div>

              <div className="p-5 space-y-3">
                {/* Assets row */}
                <div className={`flex items-start gap-3 p-3.5 rounded-xl border transition-colors ${darkMode ? 'bg-emerald-900/20 border-emerald-900/50' : 'bg-emerald-50 border-emerald-100'}`}>
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${darkMode ? 'bg-emerald-800' : 'bg-emerald-600'}`}>
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <div>
                    <p className={`text-sm font-semibold transition-colors ${darkMode ? 'text-zinc-200' : 'text-gray-900'}`}>Zakatable Assets</p>
                    <p className={`text-xs mt-0.5 transition-colors ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>Cash · Gold · Silver · Investments · Receivables</p>
                  </div>
                </div>

                {/* Liabilities row */}
                <div className={`flex items-start gap-3 p-3.5 rounded-xl border transition-colors ${darkMode ? 'bg-red-900/20 border-red-900/50' : 'bg-red-50 border-red-100'}`}>
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${darkMode ? 'bg-red-900' : 'bg-red-500'}`}>
                    <svg className={`w-3 h-3 ${darkMode ? 'text-red-400' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
                    </svg>
                  </div>
                  <div>
                    <p className={`text-sm font-semibold transition-colors ${darkMode ? 'text-zinc-200' : 'text-gray-900'}`}>Immediate Liabilities</p>
                    <p className={`text-xs mt-0.5 transition-colors ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>Rent · Bills · Debts due now (not annual totals)</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-2">
                  <div className={`flex-1 h-px transition-colors ${darkMode ? 'bg-zinc-800' : 'bg-gray-100'}`} />
                  <span className={`text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-colors ${darkMode ? 'text-zinc-600' : 'text-gray-300'}`}>= Net Zakatable Wealth</span>
                  <div className={`flex-1 h-px transition-colors ${darkMode ? 'bg-zinc-800' : 'bg-gray-100'}`} />
                </div>

                {/* Nisab check */}
                <div className={`flex items-start gap-3 p-3.5 rounded-xl border transition-colors ${darkMode ? 'bg-amber-900/20 border-amber-900/50' : 'bg-amber-50 border-amber-100'}`}>
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${darkMode ? 'bg-amber-900' : 'bg-amber-500'}`}>
                    <svg className={`w-3 h-3 ${darkMode ? 'text-amber-400' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4" />
                    </svg>
                  </div>
                  <div>
                    <p className={`text-sm font-semibold transition-colors ${darkMode ? 'text-zinc-200' : 'text-gray-900'}`}>Nisab Threshold Check</p>
                    <p className={`text-xs mt-0.5 transition-colors ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
                      If wealth ≥ 87.48g gold <em>or</em> 612.36g silver, held for 1 lunar year
                    </p>
                  </div>
                </div>

                {/* Result */}
                <div className={`p-4 rounded-xl flex items-center justify-between transition-colors ${darkMode ? 'bg-emerald-800/40' : 'bg-emerald-600'}`}>
                  <div>
                    <p className={`text-xs uppercase tracking-widest transition-colors ${darkMode ? 'text-emerald-500' : 'text-white/60'}`}>Your obligation</p>
                    <p className={`text-sm font-bold mt-0.5 transition-colors ${darkMode ? 'text-emerald-100' : 'text-white'}`}>Net Wealth × 2.5%</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs uppercase tracking-widest transition-colors ${darkMode ? 'text-emerald-500' : 'text-white/60'}`}>Equals</p>
                    <p className={`text-xl font-black mt-0.5 transition-colors ${darkMode ? 'text-emerald-400' : 'text-white'}`}>Zakāt Due</p>
                  </div>
                </div>

                <p className={`text-xs text-center leading-relaxed pt-1 transition-colors ${darkMode ? 'text-zinc-500' : 'text-gray-400'}`}>
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