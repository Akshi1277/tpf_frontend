import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function OurTeamSection({ darkMode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const teamRoles = [
    {
      icon: (
        <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
        </svg>
      ),
      title: "Volunteers",
      description: "The beating heart of our ground operations"
    },
    {
      icon: (
        <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V9.39l7-3.5v7.1z"/>
        </svg>
      ),
      title: "Field Officers",
      description: "Trained in relief management, social work & ethics"
    },
    {
      icon: (
        <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z"/>
        </svg>
      ),
      title: "Verification Teams",
      description: "Ensuring genuine impact"
    },
    {
      icon: (
        <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      ),
      title: "You — The Donor",
      description: "Without whom none of this is possible"
    }
  ];

  return (
    <section
  ref={ref}
  className={`pt-12 sm:pt-14 md:pt-10 pb-12 sm:pb-16 md:pb-20 ${
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
          className="text-center mb-10 sm:mb-12 md:mb-16"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16 md:mb-20">
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
          className={`rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 mb-12 sm:mb-16 ${
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