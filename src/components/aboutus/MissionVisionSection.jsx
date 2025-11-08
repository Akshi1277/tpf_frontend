import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function MissionVisionSection({ darkMode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className={`py-8 sm:py-16 md:py-8 ${darkMode ? 'bg-zinc-900' : 'bg-white'} relative overflow-hidden`}>
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
          className="mb-12 sm:mb-14 md:mb-12"
        >
          <div className={`rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 relative overflow-hidden ${
            darkMode ? 'bg-gradient-to-br from-zinc-800 to-zinc-800/50' : 'bg-gradient-to-br from-white to-zinc-50'
          } shadow-xl border ${darkMode ? 'border-zinc-700/50' : 'border-zinc-100'}`}>
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 sm:w-40 md:w-48 h-32 sm:h-40 md:h-48 bg-gradient-to-br from-teal-500/10 to-emerald-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 sm:w-40 md:w-48 h-32 sm:h-40 md:h-48 bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <div className="h-1 w-8 sm:w-12 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"></div>
                <h3 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                  Our Vision
                </h3>
              </div>
              
              {/* Vision Statement with Icon Graphics */}
              <div className="grid md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                {/* World Icon */}
                <div className={`p-4 sm:p-6 rounded-xl ${darkMode ? 'bg-zinc-700/30' : 'bg-teal-50'} border ${darkMode ? 'border-zinc-600/50' : 'border-teal-100'} text-center`}>
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className={`text-sm sm:text-base font-semibold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                    No One Left Behind
                  </p>
                </div>

                {/* Hands Icon */}
                <div className={`p-4 sm:p-6 rounded-xl ${darkMode ? 'bg-zinc-700/30' : 'bg-emerald-50'} border ${darkMode ? 'border-zinc-600/50' : 'border-emerald-100'} text-center`}>
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                    </svg>
                  </div>
                  <p className={`text-sm sm:text-base font-semibold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                    Care & Dignity
                  </p>
                </div>

                {/* Equality Icon */}
                <div className={`p-4 sm:p-6 rounded-xl ${darkMode ? 'bg-zinc-700/30' : 'bg-teal-50'} border ${darkMode ? 'border-zinc-600/50' : 'border-teal-100'} text-center`}>
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <p className={`text-sm sm:text-base font-semibold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                    Universal Love
                  </p>
                </div>
              </div>

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
          className="mb-12 sm:mb-14 md:mb-12"
        >
          <div className={`rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 ${
            darkMode ? 'bg-zinc-800/50 backdrop-blur-sm' : 'bg-white'
          } shadow-xl border ${darkMode ? 'border-zinc-700/50' : 'border-zinc-100'}`}>
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="h-1 w-8 sm:w-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
              <h3 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                Why We Exist
              </h3>
            </div>

            {/* Icon Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-3 rounded-2xl ${darkMode ? 'bg-emerald-500/10' : 'bg-emerald-50'} flex items-center justify-center`}>
                  <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <p className={`text-xs font-medium ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Quranic Guidance</p>
              </div>

              <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-3 rounded-2xl ${darkMode ? 'bg-teal-500/10' : 'bg-teal-50'} flex items-center justify-center`}>
                  <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p className={`text-xs font-medium ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Serving All</p>
              </div>

              <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-3 rounded-2xl ${darkMode ? 'bg-emerald-500/10' : 'bg-emerald-50'} flex items-center justify-center`}>
                  <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <p className={`text-xs font-medium ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Compassion</p>
              </div>

              <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-3 rounded-2xl ${darkMode ? 'bg-teal-500/10' : 'bg-teal-50'} flex items-center justify-center`}>
                  <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <p className={`text-xs font-medium ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Faith in Action</p>
              </div>
            </div>

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

            <div className="flex items-center gap-4 justify-center">
              <div className={`px-6 py-3 rounded-full ${darkMode ? 'bg-emerald-500/10' : 'bg-emerald-50'} border-2 border-emerald-500`}>
                <p className={`text-base font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
                  This is the <span className="text-emerald-500">True Path</span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12 sm:mb-14 md:mb-12"
        >
          <div className={`rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 relative overflow-hidden ${
            darkMode ? 'bg-gradient-to-br from-zinc-800 to-zinc-800/50' : 'bg-gradient-to-br from-teal-50 to-emerald-50'
          } shadow-xl border ${darkMode ? 'border-zinc-700/50' : 'border-teal-100'}`}>
            {/* Decorative corner patterns */}
            <div className="absolute top-0 left-0 w-20 sm:w-24 h-20 sm:h-24 border-t-2 border-l-2 border-teal-500/20 rounded-tl-3xl"></div>
            <div className="absolute bottom-0 right-0 w-20 sm:w-24 h-20 sm:h-24 border-b-2 border-r-2 border-emerald-500/20 rounded-br-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <div className="h-1 w-8 sm:w-12 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full"></div>
                <h3 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                  TPF Mission
                </h3>
              </div>

              <div className={`inline-block px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 mb-6 sm:mb-8`}>
                <p className="text-white font-bold text-base sm:text-lg md:text-xl">
                  "Service to Mankind"
                </p>
              </div>

              {/* Mission Values Grid */}
              <div className="grid md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className={`p-5 rounded-xl ${darkMode ? 'bg-zinc-700/50' : 'bg-white'} border ${darkMode ? 'border-zinc-600/50' : 'border-teal-100'} text-center transform hover:scale-105 transition-transform duration-300`}>
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h4 className={`font-bold text-base mb-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Dignity</h4>
                  <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Uplifting the vulnerable with respect</p>
                </div>

                <div className={`p-5 rounded-xl ${darkMode ? 'bg-zinc-700/50' : 'bg-white'} border ${darkMode ? 'border-zinc-600/50' : 'border-emerald-100'} text-center transform hover:scale-105 transition-transform duration-300`}>
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                  </div>
                  <h4 className={`font-bold text-base mb-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Equality</h4>
                  <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Serving beyond boundaries</p>
                </div>

                <div className={`p-5 rounded-xl ${darkMode ? 'bg-zinc-700/50' : 'bg-white'} border ${darkMode ? 'border-zinc-600/50' : 'border-teal-100'} text-center transform hover:scale-105 transition-transform duration-300`}>
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className={`font-bold text-base mb-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Action</h4>
                  <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Compassion becomes reality</p>
                </div>
              </div>

              <div className={`p-5 sm:p-7 rounded-xl ${darkMode ? 'bg-zinc-700/50' : 'bg-white'} mb-6 sm:mb-8 border-2 ${
                darkMode ? 'border-emerald-500/30' : 'border-emerald-200'
              }`}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className={`text-base sm:text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                      Our mission is simple yet powerful:
                    </p>
                    <p className={`text-sm sm:text-base leading-relaxed ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                      To serve humanity with dignity, equality, and kindness — reaching across every boundary of religion, caste, class, or geography — and to ensure that no one in need is ever left unseen.
                    </p>
                  </div>
                </div>
              </div>

              {/* Impact Statement with Visual Elements */}
              <div className={`p-6 rounded-xl ${darkMode ? 'bg-gradient-to-r from-teal-900/30 to-emerald-900/30' : 'bg-gradient-to-r from-teal-50 to-emerald-50'} border-l-4 border-teal-500`}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-lg bg-teal-500 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                  <p className={`text-sm sm:text-base leading-relaxed ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    We believe that <span className="font-semibold text-teal-500">every human life matters</span>, and every act of generosity can be life-changing. Whether it's a mother struggling to feed her children, a child missing out on school due to poverty, or a family left homeless after a disaster — we are there, not just to help, but to stand with them in their struggle.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}