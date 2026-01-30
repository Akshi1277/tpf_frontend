"use client"
import { motion, useInView } from 'framer-motion';
import { useState, useRef } from 'react';

export default function LegalAidPage({ darkMode = false }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCard, setActiveCard] = useState(null);

  const supportAreas = [
    {
      id: 'bail',
      title: 'Bail & Fine Assistance',
      description: 'Freedom shouldn\'t have a price tag. We help those trapped behind bars due to inability to pay small fines or bail amounts.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
      ),
      gradient: 'from-amber-500 to-orange-500'
    },
    {
      id: 'undertrial',
      title: 'Undertrial Support',
      description: 'Families of undertrial prisoners struggling for legal help deserve compassion and expert guidance.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ),
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'documentation',
      title: 'Documentation Help',
      description: 'Poor accused persons who lack documentation or literacy get full support in navigating the legal system.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 'youth',
      title: 'Youth Defense',
      description: 'Young people wrongly implicated in petty offenses deserve a second chance and proper legal representation.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
        </svg>
      ),
      gradient: 'from-green-500 to-teal-500'
    },
    {
      id: 'guidance',
      title: 'Legal Guidance',
      description: 'Legal guidance and filing support for poor litigants who can\'t afford expensive lawyers.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      ),
      gradient: 'from-indigo-500 to-blue-500'
    },
    {
      id: 'parole',
      title: 'Parole & Compensation',
      description: 'Assistance in securing parole, sureties, or government compensation for those who qualify.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      ),
      gradient: 'from-rose-500 to-red-500'
    }
  ];

  const stats = [
    { value: '100+', label: 'Cases Handled' },
    { value: '₹0', label: 'Cost to Beneficiaries' },
    { value: '24/7', label: 'Support Available' }
  ];

  return (
    <section
      ref={ref}
      className={`py-36 sm:py-20 md:py-30  ${
        darkMode ? 'bg-zinc-900' : 'bg-gray-50'
      } relative overflow-hidden`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-80 h-80 ${darkMode ? 'bg-teal-900/10' : 'bg-teal-100/40'} rounded-full blur-3xl`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 ${darkMode ? 'bg-emerald-900/10' : 'bg-emerald-100/40'} rounded-full blur-3xl`}></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-1 w-12 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"></div>
            <div className="w-2 h-2 rounded-full bg-teal-500"></div>
            <div className="h-1 w-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
          </div>
          
          <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
            <span className="bg-gradient-to-r from-emerald-600 via-teal-400 to-emerald-500 text-transparent bg-clip-text">
              Legal Aid
            </span>
            <br />
            <span className={darkMode ? 'text-white' : 'text-zinc-900'}>
              for the Voiceless
            </span>
          </h1>
          
          <p className={`text-lg sm:text-xl max-w-3xl mx-auto mb-8 leading-relaxed ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
            Many are trapped in jails, not because they are guilty — but because they are poor. 
            TPF Aid's legal wing ensures <span className="font-semibold text-teal-500">justice does not require money</span>.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                className={`px-6 py-4 rounded-xl ${
                  darkMode ? 'bg-zinc-800/50 border-zinc-700/50' : 'bg-white border-zinc-200'
                } border`}
              >
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-teal-500 to-emerald-500 text-transparent bg-clip-text mb-1">
                  {stat.value}
                </div>
                <div className={`text-xs sm:text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className={`inline-block p-5 rounded-lg border ${
              darkMode 
                ? 'bg-zinc-800/50 border-zinc-700/50' 
                : 'bg-white border-zinc-200'
            }`}
          >
            <p className={`text-sm sm:text-base italic ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
              "Stand out firmly for justice, as witnesses to Allah, even if it be against yourselves." — Surah An-Nisa (4:135)
            </p>
          </motion.div>
        </motion.div>

        {/* Support Areas Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-16"
        >
          <h2 className={`text-2xl sm:text-3xl font-bold mb-8 text-center ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
            How We <span className="bg-gradient-to-r from-teal-500 to-emerald-500 text-transparent bg-clip-text">Help</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportAreas.map((area, index) => (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                onMouseEnter={() => setActiveCard(area.id)}
                onMouseLeave={() => setActiveCard(null)}
                className={`p-6 rounded-xl ${
                  darkMode ? 'bg-zinc-800/50' : 'bg-white'
                } border ${
                  activeCard === area.id
                    ? 'border-teal-500 shadow-xl shadow-teal-500/20 scale-105'
                    : darkMode
                    ? 'border-zinc-700/50 hover:border-zinc-600'
                    : 'border-zinc-200 hover:border-zinc-300'
                } transition-all duration-300 group cursor-pointer`}
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${area.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {area.icon}
                  </div>
                </div>

                <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                  {area.title}
                </h3>

                <p className={`text-sm leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  {area.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1 }}
          className={`p-8 sm:p-10 rounded-2xl ${
            darkMode 
              ? 'bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700/50' 
              : 'bg-gradient-to-br from-white to-gray-50 border border-zinc-200'
          } text-center`}
        >
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </div>

            <h2 className={`text-2xl sm:text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
              Building a Legal Aid Army
            </h2>
            
            <p className={`text-base sm:text-lg mb-6 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
              Where justice does not require money. Every voice deserves to be heard.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                className="px-8 py-4 rounded-lg bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-300 hover:scale-105"
              >
                Request Legal Help
              </a>
              <a  
                className={`px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${
                  darkMode 
                    ? 'bg-zinc-700 text-white hover:bg-zinc-600' 
                    : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200'
                }`}
              >
                Email Legal Team
              </a>
            </div>

            <p className={`text-xs sm:text-sm mt-6 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
              Available for genuine cases • Completely free of cost
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}