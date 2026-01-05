import { useState } from 'react';
import { Heart, Lock } from 'lucide-react';
import PayUForm from '../payments/PayUForm';

export default function DonationCard({ darkMode, campaignId, zakatVerified }) {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [payuData, setPayuData] = useState(null);
  const [donationType, setDonationType] = useState('SADAQAH'); // Default

  const presetAmounts = [500, 1000, 2500, 5000, 10000];

  const donationTypes = [
    { id: 'ZAKAAT', label: 'Zakat', desc: 'Obligatory charity', disabled: !zakatVerified },
    { id: 'SADAQAH', label: 'Sadaqah', desc: 'Voluntary charity' },
    { id: 'LILLAH', label: 'Lillah', desc: 'For sake of Allah' },
    { id: 'IMDAD', label: 'Imdad', desc: 'Emergency relief' },
  ];

  const handleDonate = async () => {
    const amount = selectedAmount || parseInt(customAmount);
    if (!amount) return;

    if (donationType === 'ZAKAAT' && !zakatVerified) {
      alert("This campaign is not verified for Zakaat.");
      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/donations/initiate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          amount,
          campaignId,
          donationType
        }),
      }
    );

    const data = await res.json();
    setPayuData(data.payu);
  };

  return (
    <div className={`${darkMode ? 'bg-zinc-800' : 'bg-white'} rounded-2xl shadow-lg p-6 md:p-8 sticky top-24`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
          <Heart className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Make a Donation
          </h3>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Every contribution counts
          </p>
        </div>
      </div>

      {/* Donation Type Selection */}
      <div className="mb-6 space-y-3">
        <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Donation Type
        </label>
        <div className="grid grid-cols-2 gap-2">
          {donationTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setDonationType(type.id)}
              disabled={type.disabled}
              className={`
                        p-3 rounded-xl border-2 text-left transition-all relative overflow-hidden group
                        ${donationType === type.id
                  ? 'border-emerald-500 bg-emerald-50/10'
                  : darkMode ? 'border-zinc-700 hover:border-zinc-600' : 'border-gray-100 hover:border-gray-200'}
                        ${type.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                    `}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-bold text-sm ${donationType === type.id
                      ? 'text-emerald-500'
                      : darkMode ? 'text-gray-200' : 'text-gray-900'
                    }`}>
                    {type.label}
                  </span>
                  {type.id === 'ZAKAAT' && !zakatVerified && (
                    <Lock className="w-3 h-3 text-gray-400" />
                  )}
                </div>
                <p className={`text-[10px] leading-tight ${darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                  {type.desc}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Select Amount
        </label>
        <div className="grid grid-cols-2 gap-3">
          {presetAmounts.map((amount) => (
            <button
              key={amount}
              onClick={() => {
                setSelectedAmount(amount);
                setCustomAmount('');
              }}
              className={`p-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 ${selectedAmount === amount
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30'
                : darkMode
                  ? 'bg-zinc-700 text-white hover:bg-zinc-600'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
            >
              ₹{(amount / 1000).toFixed(1)}K
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className={`text-sm font-medium mb-2 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Or Enter Custom Amount
        </label>
        <div className="relative">
          <span className={`absolute left-4 top-1/2 -translate-y-1/2 text-lg font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
            ₹
          </span>
          <input
            type="number"
            placeholder="5000"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              setSelectedAmount(null);
            }}
            className={`w-full h-14 pl-10 pr-4 text-lg rounded-xl border-2 transition-all focus:outline-none focus:ring-2 ${customAmount
              ? 'border-emerald-500 focus:ring-emerald-200'
              : darkMode
                ? 'text-white placeholder-zinc-500 focus:border-emerald-500'
                : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500'
              }`}
          />
        </div>
      </div>

      <button
        onClick={handleDonate}
        disabled={!selectedAmount && !customAmount}
        className={`w-full h-14 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${selectedAmount || customAmount
          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40'
          : darkMode
            ? 'bg-zinc-700 text-gray-400'
            : 'bg-gray-200 text-gray-400'
          }`}
      >
        Donate {selectedAmount ? `₹${selectedAmount.toLocaleString()}` : customAmount ? `₹${parseInt(customAmount).toLocaleString()}` : 'Now'}
      </button>

      <div className={`flex items-center justify-center gap-2 text-sm mt-4 p-3 rounded-lg ${darkMode ? 'bg-zinc-900' : 'bg-gray-50'
        }`}>
        <Lock className="w-4 h-4 text-emerald-500" />
        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
          100% secure payment • SSL encrypted
        </span>
      </div>

      <div className={`mt-6 p-4 rounded-xl border ${darkMode ? 'border-zinc-700 bg-zinc-900/50' : 'border-gray-200 bg-gray-50'
        }`}>
        <p className={`text-xs text-center leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          By donating, you agree to our terms. Your donation is tax-deductible.
          You'll receive a receipt via email.
        </p>
      </div>

      {payuData && (
        <PayUForm
          action={payuData.action}
          payload={payuData.payload}
        />
      )}
    </div>

  );
}