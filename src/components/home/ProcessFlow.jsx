import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ShieldCheck, Users, Heart, CheckCircle, Lock, TrendingUp, HandHeart, Search, Smartphone, Share2, ClipboardCheck, Video, Eye, Info } from 'lucide-react';

const TABS = [
  {
    key: 'donor',
    heading: 'For Donors',
    eyebrow: 'Your path to impact',
    illustration: '/donors_process.png',
    steps: [
      { 
        icon: HandHeart, 
        num: '01', 
        title: 'Contribute with Heart', 
        description: 'You donate your Sadaqah, Zakat, bank interest, or other contributions to causes that need it most.',
        image: '/Donor/contributewithheart.png'
      },
      { 
        icon: Search, 
        num: '02', 
        title: 'Case Verification', 
        description: 'Every request goes through a strict, multi-level verification process to ensure 100% authenticity.',
        image: '/Donor/caseverification.png'
      },
      { 
        icon: ClipboardCheck, 
        num: '03', 
        title: 'Verified for You', 
        description: 'Only genuine, vetted cases are approved and listed on our platform for you to support.',
        image: '/Donor/verifiedforyou.png'
      },
      { 
        icon: TrendingUp, 
        num: '04', 
        title: 'Direct Impact', 
        description: 'Once a campaign reaches its target, the funds are transferred directly to the beneficiary.',
        image: '/Donor/image copy 2.png',
        cover: true
      },
      { 
        icon: Video, 
        num: '05', 
        title: 'Confirmation Proof', 
        description: 'A post or video is shared globally to confirm that help has been successfully delivered.',
        image: '/Donor/confirmationproof.png'
      },
      { 
        icon: Eye, 
        num: '06', 
        title: 'Total Transparency', 
        description: 'We operate with complete honesty and open accountability at every single step of the journey.',
        image: '/Donor/transparency.png'
      },
    ],
  },
  {
    key: 'beneficiary',
    heading: 'For Beneficiaries',
    eyebrow: 'Your path to support',
    steps: [
      { 
        icon: FileText, 
        num: '01', 
        title: 'Start Your Journey', 
        description: 'Register and submit your request to start a fundraiser in a simple and transparent way.',
        image: '/Beneficiary/startyourjourney.png'
      },
      { 
        icon: ShieldCheck, 
        num: '02', 
        title: 'Layered Review', 
        description: 'Our team conducts a strict and multi-layer verification of your case to ensure full credibility.',
        image: '/Beneficiary/layeredreview.png'
      },
      { 
        icon: Smartphone, 
        num: '03', 
        title: 'Live Campaign', 
        description: 'If found genuine, your campaign is launched on our platform to reach thousands of potential donors.',
        image: '/Beneficiary/livecampaign.png'
      },
      { 
        icon: Users, 
        num: '04', 
        title: 'Community Rallies', 
        description: 'The TPF community and donors contribute to your campaign until the required goal is raised.',
        image: '/Beneficiary/community.png'
      },
      { 
        icon: Lock, 
        num: '05', 
        title: 'Funds Transferred', 
        description: 'Once the target is achieved, the funds are securely transferred to you for the intended cause.',
        image: '/Beneficiary/funds.png'
      },
      { 
        icon: Share2, 
        num: '06', 
        title: 'Delivery Proof', 
        description: 'After successful help delivery, a confirmation video/post is shared as proof for the community.',
        image: '/Beneficiary/deliveryproof.png'
      },
    ],
  },
];

export default function ProcessFlowSection({ darkMode }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState(0);

  const handleSwitch = (i) => { setPrevIdx(activeIdx); setActiveIdx(i); };
  const dir = activeIdx >= prevIdx ? 1 : -1;

  const { eyebrow, steps, illustration, heading } = TABS[activeIdx];

  // ── theme tokens ──────────────────────────────────────────────────────────
  const bg = darkMode ? '#0f1715' : '#ffffff';
  const surface = darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(16,185,129,0.04)';
  const text = darkMode ? '#f0fdf4' : '#111827';
  const muted = darkMode ? 'rgba(240,253,244,0.45)' : '#6b7280';
  const rule = darkMode ? 'rgba(255,255,255,0.07)' : '#e5e7eb';
  const ghostCol = darkMode ? 'rgba(52,211,153,0.08)' : 'rgba(16,185,129,0.06)';
  const iconCol = darkMode ? 'rgba(110,231,183,0.7)' : '#059669';

  return (
    <section style={{ background: bg }} className="relative overflow-hidden py-16 lg:py-24">

      {/* Background radial glow */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 pointer-events-none ${darkMode ? 'bg-emerald-900' : 'bg-emerald-100'}`}></div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">

        {/* ── HEADER & SWITCHER ───────────────────────────────────────────── */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
              Process Flow
            </span>
          </motion.div>
          
          <h2 className={`text-3xl sm:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
            How it works
          </h2>
          <p className={`text-base max-w-2xl mb-10 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
            {activeIdx === 0 
              ? "Your trust matters to us. Here’s how we ensure your donations are used responsibly and reach those in genuine need."
              : "Start your fundraising journey with us in a simple, transparent way. We guide you through every step of receiving support."
            }
          </p>

          {/* Redesigned Tab Switcher */}
          <div className={`flex p-1.5 rounded-2xl border ${darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-zinc-100 border-zinc-200'} shadow-sm relative w-full max-w-[400px]`}>
            {TABS.map((tab, i) => (
              <button
                key={tab.key}
                onClick={() => handleSwitch(i)}
                className={`relative flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300 z-10 ${
                  activeIdx === i 
                    ? (darkMode ? 'text-emerald-400' : 'text-emerald-700') 
                    : (darkMode ? 'text-zinc-500' : 'text-zinc-600')
                }`}
              >
                <span className="relative z-10">{tab.heading}</span>
                {activeIdx === i && (
                  <motion.div
                    layoutId="active-pill"
                    className={`absolute inset-0 rounded-xl shadow-lg ${darkMode ? 'bg-emerald-500/10' : 'bg-white'}`}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── STEPS GRID ─────────────────────────────────────────────────── */}
        <div className="relative">
          {/* Subtle connecting line background for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent -translate-y-1/2"></div>
          
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, x: dir * 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -50 }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`relative p-8 lg:p-10 rounded-3xl border transition-all duration-500 hover:shadow-2xl overflow-hidden group ${
                      darkMode 
                        ? 'bg-zinc-900/40 border-zinc-800 hover:border-emerald-500/30' 
                        : 'bg-white border-zinc-100 hover:border-emerald-500/30 shadow-xl shadow-zinc-200/50'
                    }`}
                  >
                    {/* Step Number Decoration */}
                    <div className="absolute top-6 right-8 text-5xl lg:text-6xl font-black opacity-[0.1] dark:opacity-[0.05] group-hover:opacity-[0.15] dark:group-hover:opacity-[0.1] transition-opacity duration-500 pointer-events-none z-20" style={{ color: iconCol }}>
                      {step.num}
                    </div>

                    {/* Icon */}
                    <div className="relative z-10 flex items-center gap-4 mb-6">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner transition-transform duration-500 group-hover:rotate-6
                        ${darkMode ? 'bg-emerald-500/10' : 'bg-emerald-50'}`}>
                        <Icon className="w-7 h-7" style={{ color: iconCol }} />
                      </div>
                    </div>

                    {/* Main Graphic - Placed as full-opacity illustration, just like the reference */}
                    {step.image && (
                      <div className={`relative z-10 w-full h-40 sm:h-48 mb-6 rounded-2xl flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-105 ${darkMode ? 'bg-white shadow-inner' : 'bg-transparent'}`}>
                        <img 
                          src={step.image} 
                          alt="" 
                          className={`w-full h-full ${step.cover ? 'object-cover' : 'object-contain'} transition-all duration-500 ${darkMode ? 'mix-blend-multiply' : 'mix-blend-darken'}`} 
                        />
                      </div>
                    )}

                    {/* Title */}
                    <h3 className={`relative z-10 text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className={`relative z-10 text-sm leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      {step.description}
                    </p>

                    {/* Hover Glow */}
                    <div className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${darkMode ? 'bg-emerald-400' : 'bg-emerald-500'}`}></div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── TRUST BANNER ────────────────────────────────────────────────── */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`mt-16 lg:mt-24 p-8 lg:p-12 rounded-[40px] relative overflow-hidden flex flex-col md:flex-row items-center gap-8 ${
            darkMode 
              ? 'bg-gradient-to-br from-emerald-900/20 to-zinc-900 border border-emerald-500/10' 
              : 'bg-gradient-to-br from-emerald-50 to-white border border-emerald-100'
          }`}
        >
          <div className={`w-16 h-16 rounded-full flex items-center justify-center shrink-0 ${darkMode ? 'bg-emerald-500/20' : 'bg-white shadow-lg'}`}>
            <Info className="w-8 h-8 text-emerald-600" />
          </div>
          <div>
            <h4 className={`text-xl font-bold mb-2 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
              Transparency & Trust
            </h4>
            <p className={`text-base lg:text-lg leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              We are committed to ensuring that every donation reaches the right person. From verification to fund transfer and final proof, every step is handled with honesty, accountability, and full transparency.
            </p>
          </div>
          
          {/* Decorative illustration backgroup */}
          <div className="absolute right-0 top-0 w-64 h-full opacity-5 pointer-events-none">
            <img src={illustration} alt="" className="w-full h-full object-contain grayscale" />
          </div>
        </motion.div>

        {/* ── FOOTER PAGE INDICATOR ───────────────────────────────────────── */}
        <div className="flex items-center justify-center mt-12 gap-1.5">
          {TABS.map((_, i) => (
            <button key={i} onClick={() => handleSwitch(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === activeIdx ? 32 : 8,
                height: 8,
                background: i === activeIdx ? '#10b981' : (darkMode ? 'rgba(255,255,255,0.1)' : '#d1d5db'),
              }} />
          ))}
        </div>

      </div>
    </section>
  );
}