import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Info, MessageCircle, Image as ImageIcon, Heart, FileText, Lock, Award, ChevronRight } from 'lucide-react';

export default function CampaignTabs({ darkMode }) {
  const [activeTab, setActiveTab] = useState('about');

  const donorMessages = [
    {
      name: 'Priya Sharma',
      amount: '₹5,000',
      message: 'Happy to contribute to such a noble cause. Every child deserves clean water.',
      time: '2 hours ago',
      avatar: 'PS'
    },
    {
      name: 'Rajesh Kumar',
      amount: '₹10,000',
      message: 'Keep up the excellent work. Looking forward to seeing the impact.',
      time: '5 hours ago',
      avatar: 'RK'
    },
    {
      name: 'Anonymous',
      amount: '₹2,500',
      message: 'Great initiative. Wishing you all the best!',
      time: '1 day ago',
      avatar: 'A'
    },
    {
      name: 'Anjali Verma',
      amount: '₹7,500',
      message: 'Proud to support this cause. Clean water is a basic human right.',
      time: '2 days ago',
      avatar: 'AV'
    }
  ];

  const galleryImages = [
    { url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80', label: 'Community Support' },
    { url: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&q=80', label: 'Clean Water' },
    { url: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80', label: 'Education' },
    { url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80', label: 'Food Security' },
    // { url: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=800&q=80', label: 'Agriculture' },
    { url: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&q=80', label: 'Empowerment' }
  ];

  return (
    <div className={`${darkMode ? 'bg-zinc-800' : 'bg-white'} rounded-2xl shadow-lg overflow-hidden`}>
      {/* Tabs */}
      <div className={`flex border-b ${darkMode ? 'border-zinc-700' : 'border-gray-200'}`}>
        {[
          { id: 'about', icon: Info, label: 'About' },
          { id: 'comments', icon: MessageCircle, label: 'Comments', badge: donorMessages.length },
          { id: 'gallery', icon: ImageIcon, label: 'Gallery', badge: galleryImages.length }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 font-medium transition-colors relative ${
              activeTab === tab.id
                ? darkMode
                  ? 'text-emerald-400'
                  : 'text-emerald-600'
                : darkMode
                ? 'text-gray-400 hover:text-gray-300'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <span className="hidden sm:inline">{tab.label}</span>
            {tab.badge && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-xs font-semibold">
                {tab.badge}
              </span>
            )}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500"
              />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="p-6 md:p-8"
        >
          {/* About Tab */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <div>
                <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  About This Campaign
                </h3>
                <div className={`space-y-4 text-base leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <p>
                    Access to clean drinking water is a fundamental human right, yet millions of people in rural areas 
                    lack this basic necessity. Our Clean Water Initiative aims to change this reality by building 
                    sustainable water infrastructure in underserved communities.
                  </p>
                  <p>
                    Through this campaign, we will construct 25 new wells equipped with modern filtration systems, 
                    providing clean, safe drinking water to over 5,000 families. Each well is designed to serve 
                    200+ people and will be maintained by trained local community members.
                  </p>
                  <p>
                    Your donation directly funds materials, labor, and training programs that ensure long-term 
                    sustainability. We believe in complete transparency - every rupee is tracked and reported 
                    in our quarterly impact reports.
                  </p>
                </div>
              </div>

              <div className={`p-6 rounded-xl ${darkMode ? 'bg-zinc-900 border border-zinc-700' : 'bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100'}`}>
                <h4 className={`font-semibold mb-3 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  <Award className="w-5 h-5 text-blue-500" />
                  Campaign Impact Goals
                </h4>
                <ul className="space-y-2">
                  {[
                    '25 new water wells constructed',
                    '5,000+ families with clean water access',
                    '200+ local jobs created',
                    '15 community members trained in maintenance'
                  ].map((goal, i) => (
                    <li key={i} className={`flex items-start gap-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <ChevronRight className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`p-6 rounded-xl ${darkMode ? 'bg-zinc-900' : 'bg-gray-50'}`}>
                <h4 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Campaign Documents
                </h4>
                <div className="grid gap-3">
                  {[
                    { name: 'Financial Report Q4', date: 'Updated 1 week ago' },
                    { name: 'Project Proposal', date: 'Last updated 2 days ago' }
                  ].map((doc, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        darkMode ? 'border-zinc-700 hover:bg-zinc-800' : 'border-gray-200 hover:bg-white'
                      } transition-colors cursor-pointer group`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                          <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {doc.name}
                          </p>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {doc.date}
                          </p>
                        </div>
                      </div>
                      <Lock className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Comments Tab */}
          {activeTab === 'comments' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Donor Messages ({donorMessages.length})
                </h3>
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Recent contributions
                </span>
              </div>

              {donorMessages.map((donor, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-5 rounded-xl border-l-4 border-emerald-500 ${
                    darkMode ? 'bg-zinc-900' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white font-semibold flex items-center justify-center flex-shrink-0">
                      {donor.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {donor.name}
                        </span>
                        <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                          {donor.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <Heart className="w-4 h-4 text-emerald-500 fill-emerald-500" />
                        <span className={`text-sm font-medium ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                          Donated {donor.amount}
                        </span>
                      </div>
                      <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {donor.message}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Gallery Tab */}
          {activeTab === 'gallery' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Campaign Gallery
                </h3>
                <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center gap-1">
                  View All
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {galleryImages.map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
                  >
                    <img
                      src={img.url}
                      alt={img.label}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <p className="text-white font-medium text-sm">{img.label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}