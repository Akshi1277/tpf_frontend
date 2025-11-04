import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Shield, Eye, Target, Users } from 'lucide-react';

export default function ValuesSection({ darkMode }) {
   const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const values = [
    {
      icon: Shield,
      title: 'Trust',
      description:
        'We verify every campaign and ensure your donations reach the right hands with complete transparency.',
      color: 'from-teal-500 to-emerald-500',
    },
    {
      icon: Eye,
      title: 'Transparency',
      description: 'Track every rupee with real-time updates and detailed reports on how funds are utilized.',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Target,
      title: 'Impact',
      description: 'Focused on creating measurable, lasting change in communities around the world.',
      color: 'from-orange-500 to-teal-500',
    },
    {
      icon: Users,
      title: 'Community',
      description:
        'Building a global network of compassionate individuals united by the desire to make a difference.',
      color: 'from-teal-500 to-orange-500',
    },
  ];

  return (
    <section ref={ref} className={`py-20 ${darkMode ? 'bg-zinc-800' : 'bg-zinc-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
            Our Core{' '}
            <span className="bg-gradient-to-r from-teal-500 to-emerald-500 text-transparent bg-clip-text">Values</span>
          </h2>
          <p className={`text-lg ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
            The principles that guide everything we do
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -8 }}
              className={`p-8 rounded-2xl ${
                darkMode ? 'bg-zinc-900' : 'bg-white'
              } shadow-lg hover:shadow-xl transition-shadow duration-300`}
            >
              <div
                className={`w-16 h-16 mb-6 rounded-xl bg-gradient-to-r ${value.color} flex items-center justify-center`}
              >
                <value.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                {value.title}
              </h3>
              <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
