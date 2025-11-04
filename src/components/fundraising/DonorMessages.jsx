import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function DonorMessages({ darkMode }) {
  const messages = [
    {
      name: 'Priya Sharma',
      amount: '₹5,000',
      message: 'Happy to contribute to such a noble cause. Every child deserves clean water.',
      initial: 'P',
      color: 'bg-emerald-600',
    },
    {
      name: 'Anonymous',
      amount: '₹2,500',
      message: 'Great initiative. Wishing you all the best!',
      initial: 'A',
      color: 'bg-zinc-500',
    },
    {
      name: 'Rajesh Kumar',
      amount: '₹10,000',
      message: 'Keep up the excellent work. Looking forward to seeing the impact.',
      initial: 'R',
      color: 'bg-emerald-600',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`p-8 rounded-2xl ${darkMode ? 'bg-zinc-800' : 'bg-white'}`}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className={`text-xl md:text-2xl font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
            Donor Messages
          </h3>
          <span className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Recent contributions</span>
        </div>

        <div className="space-y-4">
          {messages.map((donor, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`flex gap-4 p-4 rounded-xl border-l-4 border-emerald-500 ${
                darkMode ? 'bg-zinc-900' : 'bg-zinc-50'
              }`}
              data-testid={`donor-message-${i}`}
            >
              <div className={`h-12 w-12 rounded-full ${donor.color} text-white font-semibold flex items-center justify-center flex-shrink-0`}>
                {donor.initial}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`font-semibold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{donor.name}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-3 h-3 text-emerald-500 fill-emerald-500" />
                  <span className={`text-sm font-medium ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                    Donated {donor.amount}
                  </span>
                </div>
                <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{donor.message}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}