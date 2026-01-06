import { motion } from 'framer-motion';

export default function FooterCTA({ darkMode }) {
  return (
    <div className="mt-16 mb-8 relative">
      {/* Decorative background pattern */}
      <div className={`absolute inset-0 rounded-3xl overflow-hidden ${darkMode ? 'opacity-20' : 'opacity-10'}`}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`relative p-8 md:p-12 lg:p-16 rounded-3xl text-center overflow-hidden ${
          darkMode 
            ? 'bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 border border-slate-700' 
            : 'bg-gradient-to-br from-emerald-50 via-white to-emerald-50 border-2 border-emerald-100'
        }`}
      >
        {/* Top decorative arc */}
        <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-24 rounded-full ${
          darkMode ? 'bg-emerald-500/20' : 'bg-emerald-200/40'
        }`}></div>
        
        {/* Islamic geometric pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            <pattern id="pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" className={darkMode ? 'text-emerald-300' : 'text-emerald-600'} />
              <circle cx="10" cy="10" r="4" fill="none" stroke="currentColor" strokeWidth="0.5" className={darkMode ? 'text-emerald-300' : 'text-emerald-600'} />
            </pattern>
            <rect width="100" height="100" fill="url(#pattern)" />
          </svg>
        </div>

        <motion.div
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative z-10"
        >
          {/* Decorative top element */}
          <motion.div 
            className={`inline-block mb-6 px-6 py-2 rounded-full ${
              darkMode 
                ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400' 
                : 'bg-emerald-100 border border-emerald-200 text-emerald-700'
            }`}
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-sm font-semibold tracking-wide">MAKE A DIFFERENCE TODAY</span>
          </motion.div>

          <h3 className={`text-3xl md:text-5xl font-bold mb-6 leading-tight ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Be a Light in Someone's{' '}
            <span className={`relative inline-block ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
              Darkness
              <motion.div
                className={`absolute bottom-0 left-0 right-0 h-3 ${darkMode ? 'bg-emerald-500/20' : 'bg-emerald-200'} -z-10`}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              />
            </span>
          </h3>
          
          <p className={`text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Join hundreds of compassionate souls transforming lives through the power of giving. 
            Every act of kindness ripples through eternity.
          </p>

          {/* CTA Button with enhanced styling */}
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`group relative px-10 py-5 rounded-2xl font-bold text-lg transition-all shadow-2xl ${
              darkMode
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-emerald-500/50'
                : 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:shadow-emerald-600/50'
            }`}
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Your Journey
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </span>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
          </motion.button>

          {/* Bottom decorative element */}
          <motion.div
            className={`mt-8 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Secure. Transparent. Impactful.
          </motion.div>
        </motion.div>

        {/* Bottom decorative arc */}
        <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-64 h-32 rounded-full ${
          darkMode ? 'bg-emerald-500/20' : 'bg-emerald-200/40'
        }`}></div>
      </motion.div>
    </div>
  );
}