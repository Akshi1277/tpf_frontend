import { motion } from 'framer-motion';
import { Users, ChevronRight } from 'lucide-react';

export default function RelatedCampaigns({ darkMode }) {
  const relatedCampaigns = [
    {
      title: 'Education for Children',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80',
      raised: '₹15,60,000',
      goal: '₹20,00,000',
      progress: 78,
      donors: 342
    },
    {
      title: 'Mobile Health Clinics',
      image: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=600&q=80',
      raised: '₹9,00,000',
      goal: '₹20,00,000',
      progress: 45,
      donors: 198
    }
  ];

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Related Campaigns
        </h2>
        <button className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1">
          View All
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {relatedCampaigns.map((campaign, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group cursor-pointer ${
              darkMode ? 'bg-zinc-800' : 'bg-white'
            }`}
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={campaign.image}
                alt={campaign.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute top-4 right-4 flex gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-semibold backdrop-blur-sm">
                  ACTIVE
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h4 className="text-xl font-bold text-white mb-1">
                  {campaign.title}
                </h4>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {campaign.raised}
                  </span>
                  <span className={`text-sm font-medium ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                    {campaign.progress}%
                  </span>
                </div>
                
                <div className={`relative w-full h-2.5 rounded-full overflow-hidden ${
                  darkMode ? 'bg-zinc-700' : 'bg-gray-200'
                }`}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${campaign.progress}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                  />
                </div>
                
                <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  of {campaign.goal} goal
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-zinc-700">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {campaign.donors} donors
                  </span>
                </div>
                <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  View Campaign
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}