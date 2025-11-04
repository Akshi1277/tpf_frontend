import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

export default function FundraisingHero({ darkMode }) {
  return (
    <div className={`pt-20 ${darkMode ? 'bg-zinc-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
              Hope Foundation
            </h1>
            <p className={`text-base ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Building a Better Tomorrow
            </p>
          </div>
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
              darkMode ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-zinc-900'
            }`}
            data-testid="badge-donor-count"
          >
            <Users className="w-4 h-4" />
            <span className="font-semibold">423 Donors</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="relative rounded-2xl overflow-hidden h-[400px]">
            <img
              src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1200&q=80"
              alt="Clean water initiative"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute top-4 left-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-full text-sm"
              data-testid="badge-campaign-status"
            >
              Active Campaign
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative rounded-2xl overflow-hidden h-[200px]">
              <img
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80"
                alt="Village community"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative rounded-2xl overflow-hidden h-[200px]">
              <img
                src="https://images.unsplash.com/photo-1594646634217-a0aaadcc8450?w=600&q=80"
                alt="Water access project"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}