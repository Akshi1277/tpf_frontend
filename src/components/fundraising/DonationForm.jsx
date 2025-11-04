import { motion } from 'framer-motion';
import { useState } from 'react';
import { Lock } from 'lucide-react';

export default function DonationForm({ darkMode }) {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');

  const presetAmounts = [500, 1000, 2500, 5000];

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const handleDonate = () => {
    const amount = selectedAmount || parseInt(customAmount);
    console.log('Donate amount:', amount);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`p-8 rounded-2xl ${darkMode ? 'bg-zinc-800' : 'bg-white'} shadow-lg`}
      >
        <h3 className={`text-xl md:text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
          Choose Amount
        </h3>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {presetAmounts.map((amount) => (
            <button
              key={amount}
              onClick={() => handleAmountSelect(amount)}
              className={`p-4 rounded-xl font-semibold text-lg transition-all ${
                selectedAmount === amount
                  ? 'bg-emerald-600 text-white'
                  : darkMode
                  ? 'bg-zinc-700 text-white hover:bg-zinc-600'
                  : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200'
              }`}
              data-testid={`button-amount-${amount}`}
            >
              ₹{amount.toLocaleString()}
            </button>
          ))}
        </div>

        <input
          type="number"
          placeholder="Custom amount"
          value={customAmount}
          onChange={(e) => handleCustomAmountChange(e.target.value)}
          className={`w-full mb-6 h-14 text-lg px-4 rounded-xl border transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
            darkMode ? 'bg-zinc-700 border-zinc-600 text-white placeholder-zinc-400' : 'bg-white border-zinc-200 text-zinc-900 placeholder-zinc-500'
          }`}
          data-testid="input-custom-amount"
        />

        <button
          onClick={handleDonate}
          className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-semibold rounded-xl mb-3 transition-colors"
          data-testid="button-donate-now"
        >
          Donate Now
        </button>

        <div className="flex items-center justify-center gap-2 text-sm text-zinc-500">
          <Lock className="w-4 h-4" />
          <span>100% secure payment</span>
        </div>
      </motion.div>
    </div>
  );
}