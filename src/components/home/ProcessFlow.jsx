import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ShieldCheck, Users, Heart, CheckCircle, Lock, TrendingUp, HandHeart } from 'lucide-react';

const TABS = [
  {
    key: 'beneficiary',
    heading: 'Beneficiaries',
    eyebrow: 'Your path to support',
    steps: [
      { icon: FileText,    num: '01', title: 'Share Your Need',       description: 'Tell your story with honesty and hope. Every case is treated with compassion and full confidentiality.' },
      { icon: ShieldCheck, num: '02', title: 'Reviewed with Amanah',  description: 'Our team carefully verifies each request to uphold trust, fairness, and complete transparency.' },
      { icon: Users,       num: '03', title: 'Community Rallies',     description: 'Your campaign reaches a community united by compassion, shared purpose, and responsibility.' },
      { icon: Heart,       num: '04', title: 'Received with Dignity', description: 'Funds arrive securely and respectfully, ensuring support reaches you with absolute integrity.' },
    ],
  },
  {
    key: 'donor',
    heading: 'Donors',
    eyebrow: 'Your path to impact',
    steps: [
      { icon: CheckCircle, num: '01', title: 'Causes Verified',     description: 'Every campaign is reviewed thoroughly — your amanah is protected before a single dirham moves.' },
      { icon: Lock,        num: '02', title: 'Secured End-to-End',  description: 'Your donation flows through bank-grade security and ethical care at every single touchpoint.' },
      { icon: HandHeart,   num: '03', title: 'Reaches Directly',    description: 'Your sadaqah lands without unnecessary intermediaries — maximum impact, minimum friction.' },
      { icon: TrendingUp,  num: '04', title: 'Tracked Openly',      description: 'Follow every step. See exactly how your generosity transforms lives in real time.' },
    ],
  },
];

export default function ProcessFlowSection({ darkMode }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [prevIdx, setPrevIdx]     = useState(0);

  const handleSwitch = (i) => { setPrevIdx(activeIdx); setActiveIdx(i); };
  const dir = activeIdx >= prevIdx ? 1 : -1;

  const { eyebrow, steps } = TABS[activeIdx];

  // ── theme tokens ──────────────────────────────────────────────────────────
  const bg      = darkMode ? '#0f1a15' : '#ffffff';
  const surface = darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(16,185,129,0.03)';
  const text     = darkMode ? '#f0fdf4' : '#111827';
  const muted    = darkMode ? 'rgba(240,253,244,0.45)' : '#6b7280';
  const rule     = darkMode ? 'rgba(255,255,255,0.07)' : '#e5e7eb';
  const ghostCol = darkMode ? 'rgba(52,211,153,0.09)' : 'rgba(16,185,129,0.08)';
  const iconCol  = darkMode ? 'rgba(110,231,183,0.7)'  : '#059669';

  return (
    <section style={{ background: bg }} className="relative overflow-hidden py-8 lg:py-12">

      {/* Top emerald rule */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #10b981 40%, #34d399 60%, transparent)' }} />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* ── HEADER ROW ─────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4 mb-7 lg:mb-9">

          {/* Left: label + eyebrow */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                How It Works
              </span>
            </div>
            <AnimatePresence mode="wait">
              <motion.p key={eyebrow}
                initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -3 }}
                transition={{ duration: 0.22 }}
                style={{ color: muted }} className="text-sm">
                {eyebrow}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Right: tab switcher */}
          <div className="flex items-baseline gap-6 sm:gap-8">
            {TABS.map((tab, i) => (
              <button key={tab.key} onClick={() => handleSwitch(i)}
                className="relative pb-1.5 outline-none text-2xl sm:text-3xl font-bold tracking-tight transition-colors duration-200"
                style={{ color: i === activeIdx ? text : muted }}>
                {tab.heading}
                {i === activeIdx && (
                  <motion.span layoutId="tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full bg-emerald-500"
                    transition={{ type: 'spring', stiffness: 420, damping: 36 }} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── STEPS GRID ─────────────────────────────────────────────────── */}
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div key={activeIdx}
            className="grid grid-cols-2 lg:grid-cols-4"
            style={{ border: `1px solid ${rule}`, borderRadius: 16, overflow: 'hidden', background: surface }}>
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isLastRow   = i >= 2;
              const isLastCol   = i % 4 === 3 || (i === steps.length - 1);
              return (
                <motion.div key={i}
                  custom={dir}
                  variants={{
                    hidden:  { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] } },
                    exit:    { opacity: 0, transition: { duration: 0.12, delay: i * 0.02 } },
                  }}
                  initial="hidden" animate="visible" exit="exit"
                  className="relative flex flex-col p-4 lg:p-5 overflow-hidden group cursor-default"
                  style={{
                    borderRight: i % 2 !== 1 ? `1px solid ${rule}` : 'none',      // mobile: 2 cols
                    borderBottom: i < 2 ? `1px solid ${rule}` : 'none',
                  }}>

                  {/* Desktop: 4-col borders override */}
                  <style>{`
                    @media (min-width: 1024px) {
                      .step-cell-${i} { 
                        border-right: ${i < 3 ? `1px solid ${rule}` : 'none'} !important;
                        border-bottom: none !important;
                      }
                    }
                  `}</style>
                  <div className={`step-cell-${i} contents`} />

                  {/* Ghost numeral */}
                  <span aria-hidden className="absolute -bottom-3 -right-1 select-none pointer-events-none leading-none"
                    style={{ fontSize: 'clamp(80px, 10vw, 120px)', fontWeight: 800, color: ghostCol, lineHeight: 1, letterSpacing: '-0.04em' }}>
                    {step.num}
                  </span>

                  {/* Top row: num + rule + icon */}
                  <div className="relative z-10 flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold tracking-widest text-emerald-500">{step.num}</span>
                    <div className="flex-1 h-px" style={{ background: rule }} />
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0
                      ${darkMode ? 'bg-emerald-500/15' : 'bg-emerald-50'}`}>
                      <Icon strokeWidth={1.75} className="w-3.5 h-3.5" style={{ color: iconCol }} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="relative z-10 text-sm lg:text-[15px] font-semibold mb-2 leading-snug"
                    style={{ color: text }}>
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="relative z-10 text-xs leading-relaxed font-normal"
                    style={{ color: muted }}>
                    {step.description}
                  </p>

                  {/* Hover: emerald bottom sweep */}
                  <motion.div
                    initial={{ scaleX: 0 }} whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute bottom-0 left-0 right-0 h-[2px] origin-left"
                    style={{ background: 'linear-gradient(90deg, #10b981, #34d399)' }} />
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* ── BOTTOM ROW ─────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between mt-5 pt-4"
          style={{ borderTop: `1px solid ${rule}` }}>
          <div className="flex gap-1.5">
            {TABS.map((_, i) => (
              <button key={i} onClick={() => handleSwitch(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === activeIdx ? 24 : 6,
                  height: 6,
                  background: i === activeIdx ? '#10b981' : (darkMode ? 'rgba(255,255,255,0.12)' : '#d1d5db'),
                }} />
            ))}
          </div>
          <span className="text-[11px] font-medium tracking-widest uppercase" style={{ color: muted }}>
            {activeIdx + 1} / {TABS.length}
          </span>
        </div>

      </div>
    </section>
  );
}