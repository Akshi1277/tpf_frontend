import { motion } from 'framer-motion';
import { TrendingUp, Calendar, Users, DollarSign, Shield, CheckCircle } from 'lucide-react';

export default function CampaignProgress({ darkMode, raised, goal, donors, daysLeft, avgDonation }) {
  const percentage = Math.round((raised / goal) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className={`${darkMode ? 'bg-zinc-800' : 'bg-white'} rounded-2xl shadow-lg p-6 md:p-8 mb-8`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Amount Section */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-emerald-500" />
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Campaign Progress
            </h3>
          </div>
          
          <div className="mb-6">
            <div className="flex items-end gap-3 mb-3">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                ₹{(raised / 100000).toFixed(2)}L
              </div>
              <div className={`text-lg pb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                raised of ₹{(goal / 100000).toFixed(0)}L
              </div>
            </div>
            
            <div className={`relative w-full h-4 rounded-full overflow-hidden ${darkMode ? 'bg-zinc-700' : 'bg-gray-200'}`}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              </motion.div>
            </div>
            
            <p className={`text-sm mt-2 font-medium ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
              {percentage}% funded
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-zinc-700/50' : 'bg-gray-50'}`}>
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4 text-emerald-500" />
                <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{donors}</span>
              </div>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Donors</p>
            </div>
            
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-zinc-700/50' : 'bg-gray-50'}`}>
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4 text-blue-500" />
                <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{daysLeft}</span>
              </div>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Days left</p>
            </div>
            
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-zinc-700/50' : 'bg-gray-50'}`}>
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="w-4 h-4 text-purple-500" />
                <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>₹{(avgDonation / 1000).toFixed(1)}K</span>
              </div>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Avg. donation</p>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gradient-to-br from-emerald-900/30 to-teal-900/30 border border-emerald-800/30' : 'bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100'}`}>
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-emerald-600" />
            <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Trust & Safety
            </h4>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                  Verified Organization
                </p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Registered NGO since 2015
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                  100% Transparent
                </p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Full financial disclosure
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                  Secure Payments
                </p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Bank-grade encryption
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}