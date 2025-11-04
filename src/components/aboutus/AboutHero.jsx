import { motion } from 'framer-motion';

export default function AboutHero({ darkMode }) {
  const stats = [
    { value: '₹500M+', label: 'Total Raised' },
    { value: '1.5M+', label: 'Global Donors' },
    { value: '25,000+', label: 'Campaigns Funded' },
  ];

  return (
    <section className={`pt-32 pb-20 ${darkMode ? 'bg-zinc-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className={`${darkMode ? 'text-white' : 'text-zinc-900'} block mb-2`}>
              Explore the impact of
            </span>
            <span className="bg-gradient-to-r from-teal-500 via-emerald-500 to-orange-500 text-transparent bg-clip-text">
              goodness with TPF Aid's
            </span>
            <span className={`${darkMode ? 'text-white' : 'text-zinc-900'} block mt-2`}>
              global community
            </span>
          </h1>
          <p className={`text-lg md:text-xl ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
            The trusted crowdfunding platform connecting donors worldwide to causes that matter
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className={`text-center p-8 rounded-2xl ${darkMode ? 'bg-zinc-800' : 'bg-zinc-50'}`}
            >
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-500 to-emerald-500 text-transparent bg-clip-text mb-2">
                {stat.value}
              </div>
              <div className={`text-sm md:text-base ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
