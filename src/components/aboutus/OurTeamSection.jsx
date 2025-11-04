import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function OurTeamSection({ darkMode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const teamRoles = [
    {
      icon: (
        <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ),
      title: "Volunteers",
      description: "The beating heart of our ground operations"
    },
    {
      icon: (
        <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
        </svg>
      ),
      title: "Field Officers",
      description: "Trained in relief management, social work & ethics"
    },
    {
      icon: (
        <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
        </svg>
      ),
      title: "Verification Teams",
      description: "Ensuring genuine impact"
    },
    {
      icon: (
        <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      ),
      title: "You — The Donor",
      description: "Without whom none of this is possible"
    }
  ];

  return (
    <section
      ref={ref}
      className={`pt-8 sm:pt-12 md:pt-10 pb-8 sm:pb-12 md:pb-20 ${
        darkMode ? 'bg-zinc-900' : 'bg-white'
      } relative overflow-hidden`}
    >

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, ${darkMode ? '#10b981' : '#14b8a6'} 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, ${darkMode ? '#10b981' : '#14b8a6'} 2px, transparent 2px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10 md:mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-1 w-8 sm:w-12 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"></div>
            <div className="w-2 h-2 rounded-full bg-teal-500"></div>
            <div className="h-1 w-8 sm:w-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
          </div>
          <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
            Our People — The True{' '}
            <span className="bg-gradient-to-r from-teal-500 to-emerald-500 text-transparent bg-clip-text">
              Backbone
            </span>
          </h2>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12 md:mb-20">
          {teamRoles.map((role, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className={`relative p-5 sm:p-6 rounded-xl sm:rounded-2xl text-center ${
                darkMode ? 'bg-zinc-800/50 backdrop-blur-sm border-zinc-700/50' : 'bg-zinc-50 border-zinc-100'
              } border transition-all duration-300 group`}
            >
              <div className={`w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center shadow-lg transform group-hover:rotate-3 transition-transform duration-300`}>
                <div className="text-white">
                  {role.icon}
                </div>
              </div>
              <h3 className={`text-base sm:text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                {role.title}
              </h3>
              <p className={`text-xs sm:text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {role.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Faith Inspired Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className={`rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 mb-8 sm:mb-12 md:mb-16 ${
            darkMode ? 'bg-gradient-to-br from-zinc-800 to-zinc-800/50' : 'bg-gradient-to-br from-teal-50 to-emerald-50'
          } border ${darkMode ? 'border-zinc-700/50' : 'border-teal-100'} relative overflow-hidden`}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-500/10 to-emerald-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h3 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
              Faith-Inspired, Human-Centered
            </h3>
            <p className={`text-sm sm:text-base md:text-lg leading-relaxed mb-6 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
              While inspired by values found in Islam — particularly the call to serve humanity with compassion and humility — our model is universal. We serve all people, not in the name of religion, but in the name of shared humanity.
            </p>
            <div className={`p-4 sm:p-5 rounded-xl ${darkMode ? 'bg-zinc-700/30' : 'bg-white/60'} border-l-4 border-emerald-500`}>
              <p className={`text-base sm:text-lg italic ${darkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>
                "A small act of kindness, done sincerely, can become the turning point in someone's life."
              </p>
            </div>
          </div>
        </motion.div>

        {/* Founder Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className={`rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 ${
            darkMode ? 'bg-zinc-800/50 backdrop-blur-sm' : 'bg-white'
          } border ${darkMode ? 'border-zinc-700/50' : 'border-zinc-100'} shadow-xl relative overflow-hidden`}
        >
          {/* Decorative corner */}
          <div className="absolute top-0 left-0 w-20 sm:w-24 h-20 sm:h-24 border-t-2 border-l-2 border-teal-500/20 rounded-tl-3xl"></div>
          <div className="absolute bottom-0 right-0 w-20 sm:w-24 h-20 sm:h-24 border-b-2 border-r-2 border-emerald-500/20 rounded-br-3xl"></div>

          <div className="relative z-10">
            <h3 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
              Our Founder
            </h3>
            <p className={`text-lg sm:text-xl md:text-2xl font-semibold mb-6 sm:mb-8 bg-gradient-to-r from-teal-500 to-emerald-500 text-transparent bg-clip-text`}>
              A Name You May Never Know, But a Heart You'll Always Feel
            </p>

            <div className={`p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl ${
              darkMode ? 'bg-gradient-to-br from-zinc-700/50 to-zinc-800/50' : 'bg-gradient-to-br from-emerald-50 to-teal-50'
            } mb-6 sm:mb-8 border-l-4 border-teal-500`}>
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-teal-500/30 mb-3 sm:mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
              </svg>
              <p className={`text-sm sm:text-base md:text-lg italic leading-relaxed ${darkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>
                "When you give in charity, let not your left hand know what your right hand has given."
              </p>
            </div>

            <p className={`text-sm sm:text-base md:text-lg leading-relaxed mb-6 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
              In a world where recognition is often louder than action, the founder of True Path Foundation chose a quieter path. With a heart full of compassion, yet a deep desire to remain unseen, our founder believes that true charity is not in being known, but in being felt.
            </p>

            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8`}>
              <div className={`p-4 sm:p-5 rounded-xl ${darkMode ? 'bg-zinc-700/30' : 'bg-zinc-50'}`}>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <p className={`text-xs sm:text-sm ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                  A public servant in the truest sense, not a public figure
                </p>
              </div>

              <div className={`p-4 sm:p-5 rounded-xl ${darkMode ? 'bg-zinc-700/30' : 'bg-zinc-50'}`}>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </div>
                <p className={`text-xs sm:text-sm ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                  Building sustainable systems of care with compassion
                </p>
              </div>
            </div>

            <div className={`p-5 sm:p-6 md:p-8 rounded-xl ${darkMode ? 'bg-teal-900/20' : 'bg-teal-50'} border ${
              darkMode ? 'border-teal-800/30' : 'border-teal-200'
            }`}>
              <p className={`text-sm sm:text-base md:text-lg italic leading-relaxed ${darkMode ? 'text-teal-300' : 'text-teal-900'}`}>
                "I am not the face of this foundation. The faces are those we serve — the child who smiles after a meal, the widow who stands tall again, the student who opens his first book."
              </p>
              <p className={`text-xs sm:text-sm mt-3 ${darkMode ? 'text-teal-500' : 'text-teal-700'}`}>
                — Shared anonymously through our team
              </p>
            </div>

            <p className={`text-sm sm:text-base md:text-lg leading-relaxed mt-6 sm:mt-8 text-center font-medium ${
              darkMode ? 'text-zinc-300' : 'text-zinc-700'
            }`}>
              A Leader Who Stays Behind the Curtain — So Others Can Step into the Light
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}