import { motion } from 'framer-motion';
import { CheckCircle2, Download, RotateCcw, Sparkles, TrendingUp, Minus, DollarSign, Calculator, Heart } from 'lucide-react';

// ===== 7. RESULTS =====
const Results = ({ results, onReset, formatCurrency, darkMode = false }) => {
  // Safety check
  if (!results) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-4xl mx-auto"
    >
      {/* Celebration Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className={`rounded-3xl overflow-hidden shadow-2xl border-2 mb-8 ${
          darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'
        }`}
      >
        {/* Animated Gradient Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 p-10 text-center relative overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="relative"
          >
            <CheckCircle2 className="w-20 h-20 text-white mx-auto mb-4" strokeWidth={2} />
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-3">
              Calculation Complete
            </h2>
            <p className="text-emerald-50 text-lg">Your comprehensive Zakat breakdown</p>
          </motion.div>
        </div>

        {/* Breakdown Section */}
        <div className="p-8 sm:p-10">
          <div className="space-y-4 mb-8">
            {[
              { 
                label: 'Total Assets', 
                value: results.totalAssets || 0, 
                delay: 0.4, 
                icon: TrendingUp,
                color: darkMode ? 'text-blue-400' : 'text-blue-600',
                bgColor: darkMode ? 'bg-blue-950/30' : 'bg-blue-50'
              },
              { 
                label: 'Total Liabilities', 
                value: results.totalLiabilities || 0, 
                delay: 0.5, 
                negative: true,
                icon: Minus,
                color: 'text-red-600',
                bgColor: darkMode ? 'bg-red-950/30' : 'bg-red-50'
              },
              { 
                label: 'Net Zakatable Wealth', 
                value: results.zakatableWealth || 0, 
                delay: 0.6, 
                highlight: true,
                icon: DollarSign,
                color: darkMode ? 'text-purple-400' : 'text-purple-600',
                bgColor: darkMode ? 'bg-purple-950/30' : 'bg-purple-50'
              },
              { 
                label: 'Nisab Threshold', 
                value: results.nisab || 0, 
                delay: 0.7, 
                small: true,
                icon: Calculator,
                color: darkMode ? 'text-zinc-400' : 'text-gray-600',
                bgColor: darkMode ? 'bg-zinc-800/30' : 'bg-gray-50'
              },
              { 
                label: 'Zakat Due (2.5%)', 
                value: results.zakatDue || 0, 
                delay: 0.8, 
                zakat: true,
                icon: Sparkles,
                color: darkMode ? 'text-emerald-400' : 'text-emerald-600',
                bgColor: darkMode ? 'bg-emerald-950/30' : 'bg-emerald-50'
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: item.delay }}
                  className={`flex justify-between items-center py-5 px-6 rounded-xl border-2 transition-all ${
                    item.zakat 
                      ? darkMode
                        ? 'bg-gradient-to-r from-emerald-950/50 to-teal-950/30 border-emerald-600/50 shadow-lg'
                        : 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-300 shadow-md'
                      : item.highlight
                      ? darkMode
                        ? 'border-purple-600/50 ' + item.bgColor
                        : 'border-purple-200 ' + item.bgColor
                      : darkMode
                      ? 'border-zinc-700 ' + item.bgColor
                      : 'border-gray-200 ' + item.bgColor
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2.5 rounded-lg ${
                      item.zakat
                        ? darkMode ? 'bg-emerald-500/20' : 'bg-emerald-100'
                        : darkMode ? 'bg-zinc-800' : 'bg-white'
                    }`}>
                      <Icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                    <span className={`font-semibold text-base sm:text-lg ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {item.label}
                    </span>
                  </div>
                  <span className={`font-bold text-xl sm:text-2xl ${item.color}`}>
                    {item.negative && '−'}{formatCurrency(Math.abs(item.value))}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Eligibility Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className={`rounded-xl p-6 mb-8 text-center border-2 ${
              results.isEligible 
                ? darkMode
                  ? 'bg-emerald-950/30 border-emerald-600/50'
                  : 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-300'
                : darkMode
                ? 'bg-blue-950/30 border-blue-600/50'
                : 'bg-blue-50 border-blue-200'
            }`}>
           
            <h3 className={`text-xl font-bold mb-3 ${
              results.isEligible 
                ? darkMode ? 'text-emerald-300' : 'text-emerald-900'
                : darkMode ? 'text-blue-300' : 'text-blue-900'
            }`}>
              {results.isEligible ? 'Zakat is Due' : 'Zakat Not Required'}
            </h3>
            <p className={`text-sm sm:text-base leading-relaxed ${
              results.isEligible 
                ? darkMode ? 'text-emerald-200/90' : 'text-emerald-900/90'
                : darkMode ? 'text-blue-200/90' : 'text-blue-900/90'
            }`}>
              {results.isEligible 
                ? "Your wealth exceeds the Nisab threshold. Zakat is obligatory if you have maintained this wealth for one complete lunar year."
                : "Your wealth is below the Nisab threshold. While Zakat is not obligatory at this time, voluntary charity (Sadaqah) is always encouraged and rewarded."}
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button 
              className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all shadow-lg flex items-center justify-center gap-2 ${
                darkMode
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-emerald-900/30'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-emerald-300/50'
              }`}
            >
              <Download className="w-5 h-5" />
              Download Summary
            </button>
            <button
              onClick={onReset}
              className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all border-2 flex items-center justify-center gap-2 ${
                darkMode
                  ? 'bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <RotateCcw className="w-5 h-5" />
              New Calculation
            </button>
          </motion.div>

          {/* Blessing Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className={`mt-8 text-center p-6 rounded-xl border ${
              darkMode
                ? 'bg-zinc-800/30 border-zinc-700'
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            <Heart className={`w-6 h-6 mx-auto mb-3 ${
              darkMode ? 'text-emerald-400' : 'text-emerald-600'
            }`} />
            <p className={`text-sm leading-relaxed italic ${
              darkMode ? 'text-zinc-400' : 'text-gray-600'
            }`}>
              May your contribution purify your wealth and bring blessings to you and those in need.
              <br />
              <span className="font-semibold mt-2 block not-italic">
                "The example of those who spend their wealth in the way of Allah is like a seed of grain that sprouts seven ears; in every ear there are a hundred grains."
              </span>
              <span className={`text-xs mt-1 block ${darkMode ? 'text-zinc-500' : 'text-gray-500'}`}>
                — Quran 2:261
              </span>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Results;