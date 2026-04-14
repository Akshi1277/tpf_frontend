import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SLIDES = [
  {
    key: 'donor',
    label: 'For Donors',
    accent: '#10b981',
    bg: 'rgba(16,185,129,0.08)',
    steps: [
      {
        icon: (
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
            <path d="M20 3L7 8V19C7 27 12.6 34.4 20 36C27.4 34.4 33 27 33 19V8L20 3Z" fill="rgba(16,185,129,0.15)" stroke="#10b981" strokeWidth="1.8"/>
            <path d="M14 20L18 24L26 16" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ),
        title: 'Give with confidence',
        sub: 'Every cause is verified before going live.',
      },
      {
        icon: (
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
            <rect x="8" y="5" width="24" height="30" rx="3" fill="rgba(16,185,129,0.12)" stroke="#10b981" strokeWidth="1.8"/>
            <path d="M13 14H27M13 19H23M13 24H19" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round"/>
            <rect x="22" y="22" width="7" height="7" rx="1.5" fill="#10b981" opacity="0.85"/>
            <path d="M24 25.5L25.2 26.7L27 25" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ),
        title: 'Be a proud donor',
        sub: 'Get an 80G certificate for tax savings.',
      },
      {
        icon: (
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
            <rect x="4" y="4" width="32" height="32" rx="6" fill="rgba(16,185,129,0.08)" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 2"/>
            <path d="M9 27L16 19L22 22L31 13" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="31" cy="13" r="2.5" fill="#10b981"/>
          </svg>
        ),
        title: 'See your impact',
        sub: 'Track where every rupee goes, in real time.',
      },
    ],
  },
  {
    key: 'beneficiary',
    label: 'For Beneficiaries',
    accent: '#059669',
    bg: 'rgba(5,150,105,0.08)',
    steps: [
      {
        icon: (
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
            <circle cx="20" cy="13" r="6" fill="rgba(5,150,105,0.15)" stroke="#059669" strokeWidth="1.8"/>
            <path d="M8 34C8 27 13.4 21.5 20 21.5C26.6 21.5 32 27 32 34" stroke="#059669" strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M25 31L20 26L15 31M20 26V36" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ),
        title: 'Just tell your story',
        sub: 'Fill a simple form — we do the rest.',
      },
      {
        icon: (
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
            <path d="M20 5L8 10V19C8 26.4 13.2 33.2 20 35C26.8 33.2 32 26.4 32 19V10L20 5Z" fill="rgba(5,150,105,0.08)" stroke="#059669" strokeWidth="1.5" strokeDasharray="3 2"/>
            <path d="M20 9L11 13V20C11 25.5 15 31 20 32.5C25 31 29 25.5 29 20V13L20 9Z" fill="rgba(5,150,105,0.15)" stroke="#059669" strokeWidth="1.5"/>
            <path d="M15 20L18.5 23.5L25 17" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ),
        title: 'We verify, you rest',
        sub: 'Our team handles verification, donors trust you.',
      },
      {
        icon: (
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
            <circle cx="20" cy="20" r="14" fill="rgba(5,150,105,0.12)" stroke="#059669" strokeWidth="1.8"/>
            <path d="M14 20h12M20 14v12" stroke="#059669" strokeWidth="2.2" strokeLinecap="round"/>
            <circle cx="20" cy="20" r="3" fill="#059669" opacity="0.7"/>
          </svg>
        ),
        title: '100% free, always',
        sub: 'No fees ever. Every rupee raised goes to you.',
      },
    ],
  },
];

const INTERVAL = 10000;

export default function ProcessFlowSection({ darkMode }) {
  const [active, setActive] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    timer.current = setInterval(() => setActive(a => (a + 1) % SLIDES.length), INTERVAL);
    return () => clearInterval(timer.current);
  }, []);

  const go = (i) => {
    clearInterval(timer.current);
    setActive(i);
    timer.current = setInterval(() => setActive(a => (a + 1) % SLIDES.length), INTERVAL);
  };

  const slide = SLIDES[active];
  const bg = darkMode ? '#0f1715' : '#f9fafb';
  const card = darkMode ? 'rgba(255,255,255,0.04)' : '#ffffff';
  const border = darkMode ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)';
  const textPrimary = darkMode ? '#f0fdf4' : '#111827';
  const textMuted = darkMode ? 'rgba(240,253,244,0.45)' : '#6b7280';
  const divider = darkMode ? 'rgba(255,255,255,0.07)' : `rgba(${active === 0 ? '16,185,129' : '5,150,105'},0.15)`;

  return (
    <section style={{ background: bg }} className="relative overflow-hidden py-6 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div>
            <span className="text-xs font-medium" style={{ color: textMuted }}>How it works</span>
          </div>

          {/* Tab pills */}
          <div
            className="flex gap-1 p-1 rounded-xl self-start sm:self-auto"
            style={{ background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
          >
            {SLIDES.map((s, i) => (
              <button
                key={s.key}
                onClick={() => go(i)}
                className="relative px-3 py-1 rounded-lg text-xs font-semibold"
                style={{ color: active === i ? slide.accent : textMuted }}
              >
                {active === i && (
                  <motion.div
                    layoutId="tp"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: slide.bg }}
                    transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: card,
            border: `1px solid ${border}`,
            boxShadow: darkMode ? '0 8px 32px rgba(0,0,0,0.25)' : '0 2px 16px rgba(0,0,0,0.06)',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="grid grid-cols-1 sm:grid-cols-3"
            >
              {slide.steps.map((step, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 px-5 py-4 sm:py-5"
                  style={{
                    borderRight: i < 2 ? `1px solid ${divider}` : 'none',
                    borderBottom: `1px solid ${divider}`,
                  }}
                >
                  <div className="shrink-0">{step.icon}</div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold uppercase tracking-wider mb-0.5" style={{ color: slide.accent }}>
                      0{i + 1}
                    </div>
                    <div className="text-sm font-bold leading-tight mb-0.5" style={{ color: textPrimary }}>
                      {step.title}
                    </div>
                    <div className="text-xs leading-snug" style={{ color: textMuted }}>
                      {step.sub}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}