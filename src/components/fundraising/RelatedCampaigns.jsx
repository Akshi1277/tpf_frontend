import { motion } from 'framer-motion';

export default function RelatedCampaigns({ darkMode }) {
  const campaigns = [
    {
      title: 'Education for Children',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80',
      raised: '₹15,60,000',
      progress: 78,
    },
    {
      title: 'Mobile Health Clinics',
      image: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=600&q=80',
      raised: '₹9,00,000',
      progress: 45,
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
        <h3 className={`text-xl md:text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
          Related Campaigns
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {campaigns.map((campaign, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`rounded-2xl overflow-hidden ${
                darkMode ? 'bg-zinc-900' : 'bg-zinc-50'
              } transition-shadow cursor-pointer`}
              data-testid={`related-campaign-${i}`}
            >
              <div className="relative h-48">
                <img src={campaign.image} alt={campaign.title} className="w-full h-full object-cover" />
                <div
                  className="absolute top-4 right-4 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-full text-sm font-medium"
                  data-testid={`badge-active-${i}`}
                >
                  Active
                </div>
              </div>
              <div className="p-6">
                <h4 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                  {campaign.title}
                </h4>
                <div className={`w-full h-2 rounded-full mb-3 overflow-hidden ${darkMode ? 'bg-zinc-700' : 'bg-zinc-200'}`}>
                  <div
                    className="h-full bg-emerald-600 transition-all duration-300"
                    style={{ width: `${campaign.progress}%` }}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className={`font-semibold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                    {campaign.raised}
                  </span>
                  <span className={`text-sm font-medium ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                    {campaign.progress}%
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}