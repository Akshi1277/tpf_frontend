import { motion } from 'framer-motion';
import { Download, RotateCcw, TrendingUp, Minus, Scale, Calculator, Sparkles, Info, BookOpen, CheckCircle2, XCircle } from 'lucide-react';

// Small section heading
const SectionLabel = ({ children }) => (
  <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-gray-400 mb-3">{children}</p>
);

// Tooltip-style info callout
const InfoCallout = ({ icon: Icon, title, body, colorClass = 'blue' }) => {
  const map = {
    blue: { bg: 'bg-blue-50', border: 'border-blue-100', title: 'text-blue-800', body: 'text-blue-700', icon: 'text-blue-500' },
    green: { bg: 'bg-emerald-50', border: 'border-emerald-100', title: 'text-emerald-800', body: 'text-emerald-700', icon: 'text-emerald-500' },
    gold: { bg: 'bg-amber-50', border: 'border-amber-100', title: 'text-amber-800', body: 'text-amber-700', icon: 'text-amber-500' },
    red: { bg: 'bg-red-50', border: 'border-red-100', title: 'text-red-800', body: 'text-red-700', icon: 'text-red-500' },
  };
  const c = map[colorClass];
  return (
    <div className={`flex items-start gap-3 p-3.5 rounded-xl border ${c.bg} ${c.border}`}>
      <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${c.icon}`} />
      <div>
        <p className={`text-xs font-bold mb-0.5 ${c.title}`}>{title}</p>
        <p className={`text-xs leading-relaxed ${c.body}`}>{body}</p>
      </div>
    </div>
  );
};

const Results = ({ results, onReset, formatCurrency, darkMode = false }) => {
  if (!results) return null;

  const zakatableWealth = results.zakatableWealth || 0;
  const nisab = results.nisab || 0;
  const zakatDue = results.zakatDue || 0;
  const totalAssets = results.totalAssets || 0;
  const totalLiabilities = results.totalLiabilities || 0;
  const isEligible = results.isEligible;

  // Nisab context from API — fallback to typical values
  const nisabBasis = results.nisabBasis || 'silver'; // 'gold' | 'silver'
  const goldNisabGrams = 87.48;
  const silverNisabGrams = 612.36;
  const nisabLabel = nisabBasis === 'gold'
    ? `${goldNisabGrams}g of gold`
    : `${silverNisabGrams}g of silver`;

  const card = `rounded-2xl border bg-white border-gray-200 overflow-hidden`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="max-w-3xl mx-auto space-y-4"
    >
      {/* ── Header banner ── */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0d2b1e 0%, #1a4a35 50%, #112b20 100%)' }}
      >
        {/* Gold top line */}
        <div className="h-[2px]"
          style={{ background: 'linear-gradient(90deg, #D4AF37, rgba(212,175,55,0.3))' }} />

        <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-white font-bold text-base">Calculation Complete</p>
              <p className="text-white/50 text-xs mt-0.5">Your comprehensive Zakat breakdown</p>
            </div>
          </div>
          {/* Eligibility badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold ${
            isEligible
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
          }`}>
            {isEligible
              ? <><CheckCircle2 className="w-3.5 h-3.5" /> Zakat is Due</>
              : <><XCircle className="w-3.5 h-3.5" /> Below Nisab</>
            }
          </div>
        </div>
      </div>

      {/* ── Main zakat amount ── */}
      {isEligible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #1a4a35 0%, #2D7A5C 60%, #1E5A44 100%)',
            border: '1px solid rgba(45,122,92,0.5)',
          }}
        >
          <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4" style={{ color: '#D4AF37' }} />
              </div>
              <p className="text-white/80 text-sm font-medium">Total Zakat Payable</p>
            </div>
            <div className="sm:ml-auto text-left sm:text-right">
              <p className="text-3xl sm:text-4xl font-black text-white tabular-nums">{formatCurrency(zakatDue)}</p>
              <p className="text-white/40 text-xs mt-0.5">2.5% of {formatCurrency(zakatableWealth)}</p>
            </div>
          </div>
        </motion.div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        {/* ── Calculation breakdown ── */}
        <div className={`${card} sm:col-span-2`}>
          <div className="p-5">
            <SectionLabel>Calculation Breakdown</SectionLabel>
            <div className="space-y-1.5">
              {[
                {
                  label: 'Total Zakatable Assets',
                  value: totalAssets,
                  icon: TrendingUp,
                  iconColor: 'text-blue-500',
                  bg: 'bg-blue-50',
                  note: 'Cash, metals, investments, receivables',
                },
                {
                  label: 'Total Liabilities Deducted',
                  value: totalLiabilities,
                  icon: Minus,
                  iconColor: 'text-red-500',
                  bg: 'bg-red-50',
                  prefix: '−',
                  note: 'Immediate debts & expenses',
                },
                {
                  label: 'Net Zakatable Wealth',
                  value: zakatableWealth,
                  icon: Scale,
                  iconColor: 'text-purple-600',
                  bg: 'bg-purple-50',
                  note: 'Assets minus liabilities',
                  bold: true,
                  separator: true,
                },
                {
                  label: 'Nisab Threshold',
                  value: nisab,
                  icon: Calculator,
                  iconColor: 'text-gray-400',
                  bg: 'bg-gray-50',
                  note: `Based on ${nisabLabel}`,
                  muted: true,
                },
                {
                  label: 'Zakat Due (2.5%)',
                  value: zakatDue,
                  icon: Sparkles,
                  iconColor: 'text-emerald-600',
                  bg: 'bg-emerald-50',
                  note: 'Your obligatory payment',
                  highlight: true,
                },
              ].map((row, idx) => {
                const Icon = row.icon;
                return (
                  <div key={idx}>
                    {row.separator && (
                      <div className="flex items-center gap-2 py-1.5">
                        <div className="flex-1 h-px bg-gray-100" />
                        <span className="text-[9px] font-bold tracking-widest text-gray-300 uppercase">Net</span>
                        <div className="flex-1 h-px bg-gray-100" />
                      </div>
                    )}
                    <motion.div
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`flex items-center gap-3 px-3.5 py-3 rounded-xl ${
                        row.highlight
                          ? 'bg-emerald-50 border border-emerald-200'
                          : row.bold
                          ? 'bg-purple-50 border border-purple-100'
                          : 'bg-gray-50/60 border border-gray-100'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${row.bg}`}>
                        <Icon className={`w-3.5 h-3.5 ${row.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-semibold leading-tight ${row.muted ? 'text-gray-400' : 'text-gray-800'}`}>
                          {row.label}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">{row.note}</p>
                      </div>
                      <span className={`text-sm font-bold tabular-nums flex-shrink-0 ${
                        row.highlight ? 'text-emerald-700' : row.bold ? 'text-purple-700' : row.muted ? 'text-gray-400' : 'text-gray-700'
                      }`}>
                        {row.prefix}{formatCurrency(Math.abs(row.value))}
                      </span>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Nisab Explained ── */}
        <div className={card}>
          <div className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-4 h-4 text-amber-500" />
              <SectionLabel>What is Nisab?</SectionLabel>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed mb-3">
              <strong className="text-gray-800">Nisab</strong> is the minimum threshold of wealth a Muslim must possess before Zakat becomes obligatory. It was established by the Prophet Muhammad ﷺ and is equivalent to either:
            </p>
            <div className="space-y-2 mb-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 border border-amber-100">
                <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0 text-sm">🥇</div>
                <div>
                  <p className="text-xs font-bold text-amber-800">Gold Standard</p>
                  <p className="text-xs text-amber-700 mt-0.5">87.48 grams of pure (24K) gold</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 text-sm">🥈</div>
                <div>
                  <p className="text-xs font-bold text-gray-700">Silver Standard</p>
                  <p className="text-xs text-gray-500 mt-0.5">612.36 grams of pure silver</p>
                </div>
              </div>
            </div>
            <InfoCallout
              icon={Info}
              title="Which standard is used?"
              body="Most scholars recommend the silver standard as it results in a lower threshold, ensuring more Muslims fulfil their obligation. Your calculation used the silver Nisab."
              colorClass="blue"
            />
          </div>
        </div>

        {/* ── How it's calculated ── */}
        <div className={card}>
          <div className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <Calculator className="w-4 h-4 text-emerald-500" />
              <SectionLabel>How Nisab is Applied</SectionLabel>
            </div>

            <div className="space-y-2 mb-3">
              {[
                {
                  step: '1',
                  title: 'Current Nisab Value',
                  body: `Today's Nisab = ${formatCurrency(nisab)} (based on live silver/gold spot price)`,
                  color: 'bg-emerald-50 border-emerald-100',
                },
                {
                  step: '2',
                  title: 'Compare Your Wealth',
                  body: `Your net zakatable wealth: ${formatCurrency(zakatableWealth)}`,
                  color: 'bg-purple-50 border-purple-100',
                },
                {
                  step: '3',
                  title: isEligible ? 'Above Nisab ✓' : 'Below Nisab ✗',
                  body: isEligible
                    ? 'Your wealth exceeds the threshold — Zakat is obligatory if held for 1 lunar year.'
                    : 'Your wealth is below the threshold. Zakat is not due, but voluntary Sadaqah is encouraged.',
                  color: isEligible ? 'bg-emerald-50 border-emerald-100' : 'bg-blue-50 border-blue-100',
                },
              ].map((item) => (
                <div key={item.step} className={`flex items-start gap-3 p-3 rounded-xl border ${item.color}`}>
                  <span className="w-5 h-5 rounded-full bg-white border border-gray-200 text-[10px] font-bold text-gray-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    {item.step}
                  </span>
                  <div>
                    <p className="text-xs font-bold text-gray-700">{item.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>

            {isEligible && (
              <InfoCallout
                icon={Info}
                title="The Haul Condition"
                body="Zakat is only due if this level of wealth has been maintained for one complete lunar year (Haul). If your wealth dropped below Nisab at any point, the Haul resets."
                colorClass="gold"
              />
            )}
          </div>
        </div>
      </div>

      {/* ── Eligibility message ── */}
      <div className={`${card} border-0 overflow-hidden`}
        style={isEligible
          ? { background: 'linear-gradient(135deg, #f0fdf4, #ecfdf5)', border: '1px solid #bbf7d0' }
          : { background: 'linear-gradient(135deg, #eff6ff, #f0f9ff)', border: '1px solid #bfdbfe' }
        }>
        <div className="p-5">
          <div className="flex items-start gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isEligible ? 'bg-emerald-100' : 'bg-blue-100'}`}>
              {isEligible
                ? <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                : <Info className="w-5 h-5 text-blue-600" />
              }
            </div>
            <div>
              <p className={`font-bold text-sm mb-1 ${isEligible ? 'text-emerald-800' : 'text-blue-800'}`}>
                {isEligible ? 'Zakat is Obligatory' : 'Zakat is Not Required at This Time'}
              </p>
              <p className={`text-xs leading-relaxed ${isEligible ? 'text-emerald-700' : 'text-blue-700'}`}>
                {isEligible
                  ? "Your zakatable wealth exceeds the Nisab threshold. Zakat at 2.5% is obligatory if you have maintained this level of wealth for one complete lunar year (Haul). We recommend paying at the same time each Islamic year."
                  : "Your net zakatable wealth falls below the Nisab threshold. Zakat is not obligatory at this time. If your wealth increases above Nisab, a new one-year Haul period begins. Voluntary Sadaqah (charity) is always encouraged and rewarded by Allah."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Actions ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          className="flex-1 py-3 px-5 rounded-xl text-sm font-bold text-white transition-all flex items-center justify-center gap-2 shadow-sm"
          style={{ background: 'linear-gradient(135deg, #2D7A5C 0%, #1E5A44 100%)' }}
        >
          <Download className="w-4 h-4" /> Download Summary
        </button>
        <button
          onClick={onReset}
          className="flex-1 py-3 px-5 rounded-xl text-sm font-bold border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" /> New Calculation
        </button>
      </div>

      {/* ── Closing duaa ── */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 text-center">
        <p className="text-sm leading-relaxed text-gray-500 italic mb-3">
          May your Zakat purify your wealth and bring blessings to you and those in need.
        </p>
        <p
          className="text-xl leading-loose mb-1"
          style={{ fontFamily: '"Noto Naskh Arabic", Georgia, serif', color: '#2D7A5C', direction: 'rtl' }}
        >
          خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِم بِهَا
        </p>
        <p className="text-xs text-gray-400 italic mb-2">
          "Take from their wealth a charity by which you purify them and cause them to increase." — Quran 9:103
        </p>
        <div className="h-px bg-gray-100 my-3" />
        <p className="text-xs text-gray-400">
          "The example of those who spend their wealth in the way of Allah is like a seed of grain that sprouts seven ears; in every ear there are a hundred grains." — Quran 2:261
        </p>
      </div>
    </motion.div>
  );
};

export default Results;