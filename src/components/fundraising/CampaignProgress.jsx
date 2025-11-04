import { motion } from 'framer-motion';
import { TrendingUp, Calendar, Users, DollarSign } from 'lucide-react';

export default function CampaignProgress({ darkMode }) {
  const raised = 1245000;
  const goal = 2000000;
  const percentage = Math.round((raised / goal) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-8 md:p-10 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 text-white shadow-xl"
      >
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-6 h-6" />
          <h3 className="text-xl md:text-2xl font-bold">Campaign Progress</h3>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <div>
              <span className="text-sm opacity-90">Raised</span>
              <div className="text-3xl md:text-4xl font-bold" data-testid="text-amount-raised">
                ₹12,45,000
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm opacity-90">Goal</span>
              <div className="text-2xl md:text-3xl font-bold" data-testid="text-amount-goal">
                ₹20,00,000
              </div>
            </div>
          </div>
          <div className="w-full h-3 rounded-full bg-white/20 overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="text-sm mt-2 opacity-90">{percentage}% of goal reached</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3" data-testid="stat-days-remaining">
            <Calendar className="w-5 h-5 opacity-90" />
            <div>
              <p className="text-sm opacity-90">Days remaining</p>
              <p className="text-xl font-bold">18 days</p>
            </div>
          </div>
          <div className="flex items-center gap-3" data-testid="stat-total-donors">
            <Users className="w-5 h-5 opacity-90" />
            <div>
              <p className="text-sm opacity-90">Total donors</p>
              <p className="text-xl font-bold">423</p>
            </div>
          </div>
          <div className="flex items-center gap-3" data-testid="stat-avg-donation">
            <DollarSign className="w-5 h-5 opacity-90" />
            <div>
              <p className="text-sm opacity-90">Avg. donation</p>
              <p className="text-xl font-bold">₹2,945</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}