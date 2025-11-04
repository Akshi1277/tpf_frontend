import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function MissionVisionSection({ darkMode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className={`py-12 sm:py-16 md:py-20 ${darkMode ? 'bg-zinc-900' : 'bg-white'} relative overflow-hidden`}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 30% 30%, ${darkMode ? '#10b981' : '#14b8a6'} 1px, transparent 1px),
                           radial-gradient(circle at 70% 70%, ${darkMode ? '#10b981' : '#14b8a6'} 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
            Our{' '}
            <span className="bg-gradient-to-r from-teal-500 to-emerald-500 text-transparent bg-clip-text">
              Purpose
            </span>
          </h2>
          <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Guided by faith, driven by compassion, united in service
          </p>
        </motion.div>

        {/* Vision Section */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.6, delay: 0.2 }}
  className="mb-12 sm:mb-14 md:mb-12" // ⬅️ reduced for desktop
>
          <div className={`rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 relative overflow-hidden ${
            darkMode ? 'bg-gradient-to-br from-zinc-800 to-zinc-800/50' : 'bg-gradient-to-br from-white to-zinc-50'
          } shadow-xl border ${darkMode ? 'border-zinc-700/50' : 'border-zinc-100'}`}>
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 sm:w-40 md:w-48 h-32 sm:h-40 md:h-48 bg-gradient-to-br from-teal-500/10 to-emerald-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 sm:w-40 md:w-48 h-32 sm:h-40 md:h-48 bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="h-1 w-8 sm:w-12 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"></div>
                <h3 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                  Our Vision
                </h3>
              </div>
              
              <p className={`text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                To build a world where no one is left behind, and every human being receives the care, dignity, and love they deserve — regardless of where they were born or how much they earn.
              </p>

              <div className={`p-4 sm:p-6 rounded-xl ${darkMode ? 'bg-zinc-700/30' : 'bg-teal-50/50'} border-l-4 border-teal-500`}>
                <p className={`text-sm sm:text-base md:text-lg font-medium mb-2 ${darkMode ? 'text-teal-400' : 'text-teal-700'}`}>
                  Our Inspiration
                </p>
                <p className={`text-sm sm:text-base leading-relaxed ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                  Every helping hand that joins us becomes a part of this spiritual journey. Every donation is more than money — it's a prayer, a smile, a lifeline, a reward in the Hereafter.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

       {/* Why We Exist */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.6, delay: 0.4 }}
  className="mb-12 sm:mb-14 md:mb-12" // ⬅️ reduced for desktop
>
          <div className={`rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 ${
            darkMode ? 'bg-zinc-800/50 backdrop-blur-sm' : 'bg-white'
          } shadow-xl border ${darkMode ? 'border-zinc-700/50' : 'border-zinc-100'}`}>
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="h-1 w-8 sm:w-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
              <h3 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                Why We Exist
              </h3>
            </div>

            <p className={`text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Because the Qur'an reminds us again and again:
            </p>

            <div className={`relative p-6 sm:p-8 rounded-xl ${
              darkMode ? 'bg-gradient-to-br from-zinc-700/50 to-zinc-800/50' : 'bg-gradient-to-br from-emerald-50 to-teal-50'
            } border-l-4 border-emerald-500 mb-6`}>
              <svg className="absolute top-4 left-4 w-6 h-6 sm:w-8 sm:h-8 text-emerald-500/20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
              </svg>
              
              <p className={`text-sm sm:text-base md:text-lg italic leading-relaxed pl-8 sm:pl-10 ${
                darkMode ? 'text-zinc-200' : 'text-zinc-800'
              }`}>
                "And they give food in spite of love for it to the needy, the orphan, and the captive, [saying], 'We feed you only for the countenance of Allah. We wish not from you reward or gratitude."
              </p>
              
              <p className={`text-xs sm:text-sm mt-3 sm:mt-4 pl-8 sm:pl-10 ${darkMode ? 'text-zinc-500' : 'text-zinc-600'} font-medium`}>
                — Surah Al-Insan, 76:8-9
              </p>
            </div>

            <p className={`text-base sm:text-lg leading-relaxed ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
              This is the <span className="font-semibold text-emerald-500">True Path</span> — and we are here to walk it together.
            </p>
          </div>
        </motion.div>

        {/* Mission Section */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.6, delay: 0.6 }}
  className="mb-12 sm:mb-14 md:mb-12" // ⬅️ reduced for desktop
>
          <div className={`rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 relative overflow-hidden ${
            darkMode ? 'bg-gradient-to-br from-zinc-800 to-zinc-800/50' : 'bg-gradient-to-br from-teal-50 to-emerald-50'
          } shadow-xl border ${darkMode ? 'border-zinc-700/50' : 'border-teal-100'}`}>
            {/* Decorative corner patterns */}
            <div className="absolute top-0 left-0 w-20 sm:w-24 h-20 sm:h-24 border-t-2 border-l-2 border-teal-500/20 rounded-tl-3xl"></div>
            <div className="absolute bottom-0 right-0 w-20 sm:w-24 h-20 sm:h-24 border-b-2 border-r-2 border-emerald-500/20 rounded-br-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="h-1 w-8 sm:w-12 bg-gradient-to-r from-teal-500 to-orange-500 rounded-full"></div>
                <h3 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                  TPF Mission
                </h3>
              </div>

              <div className={`inline-block px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 mb-6 sm:mb-8`}>
                <p className="text-white font-bold text-base sm:text-lg md:text-xl">
                  "Service to Mankind"
                </p>
              </div>

              <p className={`text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Not just our tagline, but our way of life.
              </p>

              <p className={`text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                At TPF Aid, we exist for one reason — to ease the burdens of the suffering, uplift the dignity of the vulnerable, and create a world where compassion becomes action.
              </p>

              <div className={`p-4 sm:p-6 md:p-8 rounded-xl ${darkMode ? 'bg-zinc-700/50' : 'bg-white'} mb-6 sm:mb-8 border ${
                darkMode ? 'border-zinc-600/50' : 'border-teal-200'
              }`}>
                <p className={`text-base sm:text-lg md:text-xl font-semibold leading-relaxed ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                  Our mission is simple yet powerful:
                </p>
                <p className={`text-sm sm:text-base md:text-lg leading-relaxed mt-3 sm:mt-4 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                  To serve humanity with dignity, equality, and kindness — reaching across every boundary of religion, caste, class, or geography — and to ensure that no one in need is ever left unseen.
                </p>
              </div>

              <p className={`text-sm sm:text-base md:text-lg leading-relaxed ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                We believe that <span className="font-semibold text-teal-500">every human life matters</span>, and every act of generosity can be life-changing. Whether it's a mother struggling to feed her children, a child missing out on school due to poverty, or a family left homeless after a disaster — we are there, not just to help, but to stand with them in their struggle.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}