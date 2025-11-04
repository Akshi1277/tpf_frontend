import { motion } from 'framer-motion';

export default function CampaignDescription({ darkMode }) {
  const stats = [
    { value: '50', label: 'Villages' },
    { value: '10K+', label: 'Families' },
    { value: '100%', label: 'Transparent' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`p-8 rounded-2xl ${darkMode ? 'bg-zinc-800' : 'bg-zinc-50'}`}
      >
        <div className={`border-l-4 border-emerald-500 pl-6 mb-6`}>
          <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
            Clean Water for Rural Communities
          </h2>
        </div>

        <div className="space-y-4 mb-8">
          <p className={`text-base ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
            We aim to provide clean drinking water to 50 villages in the northern region where families currently walk
            miles daily to access safe water.
          </p>
          <p className={`text-base ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
            The funds will be used to install water purification systems and bore wells, ensuring sustainable access to
            clean water for over 10,000 families.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 md:gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-transparent bg-clip-text mb-1">
                {stat.value}
              </div>
              <div className={`text-sm md:text-base ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
