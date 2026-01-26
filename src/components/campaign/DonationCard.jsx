import { useState, useEffect } from 'react';
import { Heart, Lock, Info, Check } from 'lucide-react';
import { useSelector } from 'react-redux';
import PayUForm from '../payments/PayUForm';
import LoginModal from '../login/LoginModal';

export default function DonationCard({ darkMode, campaignId, zakatVerified, taxEligible, ribaEligible, allowedDonationTypes = [] }) {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [tipAmount, setTipAmount] = useState(0);
  const [tipPercentage, setTipPercentage] = useState(18);
  const [payuData, setPayuData] = useState(null);
  const [donationType, setDonationType] = useState('SADAQAH');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [claim80G, setClaim80G] = useState(false);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingDonate, setPendingDonate] = useState(false);
  const [isDonating, setIsDonating] = useState(false);

  const userInfo = useSelector((state) => state.auth.userInfo);

  const presetAmounts = [500, 1000, 5000, 10000];
  const tipPercentages = [2, 5, 10, 15, 18];

  const allDonationTypes = [
    { id: 'ZAKAAT', label: 'Zakat', desc: 'Obligatory charity', disabled: !zakatVerified },
    { id: 'RIBA', label: 'RIBA', desc: 'Interest Money', disabled: !ribaEligible },
    { id: 'SADAQAH', label: 'Sadaqah', desc: 'Voluntary charity' },
    { id: 'LILLAH', label: 'Lillah', desc: 'For sake of Allah' },
    { id: 'IMDAD', label: 'Imdad', desc: 'Emergency relief' },
  ];

  const filteredDonationTypes = allowedDonationTypes?.length > 0
    ? allDonationTypes.filter(t => allowedDonationTypes.some(at => at.toUpperCase() === t.id.toUpperCase() || (at.toUpperCase() === 'ZAKAT' && t.id === 'ZAKAAT')))
    : allDonationTypes;

  // Set default donation type if restricted
  useEffect(() => {
    if (allowedDonationTypes?.length > 0 && !allowedDonationTypes.some(at => at.toUpperCase() === donationType.toUpperCase() || (at.toUpperCase() === 'ZAKAT' && donationType === 'ZAKAAT'))) {
      setDonationType(filteredDonationTypes[0]?.id || 'SADAQAH');
    }
  }, [allowedDonationTypes, filteredDonationTypes]);

  const handleDonate = async () => {
    if (isDonating) return;

    const amount = selectedAmount || parseInt(customAmount);
    if (!amount) return;

    if (!userInfo) {
      setPendingDonate(true);
      setShowLoginModal(true);
      return;
    }

    setPendingDonate(false);
    setIsDonating(true);

    try {
      if (donationType === 'ZAKAAT' && !zakatVerified) {
        alert("This campaign is not verified for Zakaat.");
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/donations/initiate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            amount,
            tipAmount,
            campaignId,
            donationType,
            isAnonymous,
            isTaxEligible: claim80G,
          }),
        }
      );

      const data = await res.json();
      setPayuData(data.payu);
    } catch (err) {
      console.error("Donation initiate failed", err);
    } finally {
      setIsDonating(false);
    }
  };

  useEffect(() => {
    if (userInfo && pendingDonate) {
      handleDonate();
    }
  }, [userInfo, pendingDonate]);

  // Calculate tip based on percentage
  useEffect(() => {
    const baseAmount = selectedAmount || (customAmount ? parseInt(customAmount) : 0);
    if (baseAmount > 0) {
      setTipAmount(Math.round(baseAmount * (tipPercentage / 100)));
    } else {
      setTipAmount(0);
    }
  }, [selectedAmount, customAmount, tipPercentage]);

  const handleTipPercentageClick = (percentage) => {
    setTipPercentage(percentage);
  };

  return (
    <>
      <div className={`${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100'} border-2 rounded-lg p-8 sticky top-24`}>
        {/* Header */}
        <div className="mb-8 pb-6 border-b-2 border-dashed" style={{ borderColor: darkMode ? '#27272a' : '#f3f4f6' }}>
          <div className="flex items-start gap-4 mb-3">
            <div className={`w-11 h-11 rounded-lg ${darkMode ? 'bg-zinc-800' : 'bg-gray-50'} flex items-center justify-center flex-shrink-0`}>
              <Heart className={`w-5 h-5 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} fill="currentColor" />
            </div>
            <div className="flex-1">
              <h3 className={`text-xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Support This Cause
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Your contribution makes a difference
              </p>
            </div>
          </div>
        </div>

        {/* Donation Type Selection */}
        <div className="mb-8">
          <label className={`block text-sm font-semibold mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            Type of Donation
          </label>
          <div className="grid grid-cols-2 gap-3">
            {filteredDonationTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => !type.disabled && setDonationType(type.id)}
                disabled={type.disabled}
                className={`
                p-4 rounded-lg border-2 text-left transition-colors
                ${donationType === type.id
                    ? darkMode
                      ? 'border-emerald-500 bg-emerald-950/30'
                      : 'border-emerald-600 bg-emerald-50'
                    : darkMode
                      ? 'border-zinc-800 hover:border-zinc-700'
                      : 'border-gray-200 hover:border-gray-300'}
                ${type.disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
              `}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className={`font-bold text-base ${donationType === type.id
                    ? darkMode ? 'text-emerald-400' : 'text-emerald-700'
                    : darkMode ? 'text-gray-200' : 'text-gray-900'
                    }`}>
                    {type.label}
                  </span>
                  {type.id === 'ZAKAAT' && !zakatVerified && (
                    <Lock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  )}
                </div>
                <p className={`text-xs leading-snug ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                  {type.desc}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Amount Selection */}
        <div className="mb-8">
          <label className={`block text-sm font-semibold mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            Choose Amount
          </label>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {presetAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => {
                  setSelectedAmount(amount);
                  setCustomAmount('');
                }}
                className={`
                h-14 rounded-lg font-semibold text-base border-2 transition-colors
                ${selectedAmount === amount
                    ? darkMode
                      ? 'border-emerald-500 bg-emerald-950/30 text-emerald-400'
                      : 'border-emerald-600 bg-emerald-50 text-emerald-700'
                    : darkMode
                      ? 'border-zinc-800 text-gray-300 hover:border-zinc-700'
                      : 'border-gray-200 text-gray-700 hover:border-gray-300'}
              `}
              >
                ₹{amount.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Amount */}
        <div className="mb-8">
          <label className={`block text-sm font-semibold mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            Custom Amount
          </label>
          <div className="relative">
            <span className={`absolute left-4 top-1/2 -translate-y-1/2 text-lg font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              ₹
            </span>
            <input
              type="number"
              placeholder="Enter amount"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setSelectedAmount(null);
              }}
              className={`
              w-full h-14 pl-10 pr-4 text-base rounded-lg border-2 transition-colors
              ${customAmount
                  ? darkMode
                    ? 'border-emerald-500 bg-emerald-950/30 text-white'
                    : 'border-emerald-600 bg-emerald-50 text-gray-900'
                  : darkMode
                    ? 'border-zinc-800 bg-zinc-900 text-white placeholder-gray-600'
                    : 'border-gray-200 bg-white text-gray-900 placeholder-gray-400'}
              focus:outline-none focus:ring-0
            `}
            />
          </div>
        </div>

        {/* Tip Section */}
        <div className="mb-8">
          <label className={`block text-sm font-semibold mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-800'} flex items-center gap-2`}>
            Support TPF
            <div className="group relative">
              <Info className="w-4 h-4 text-emerald-500 cursor-help" />
              <div className={`
              absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-4 rounded-lg text-xs leading-relaxed
              ${darkMode ? 'bg-zinc-800 text-gray-200 border border-zinc-700' : 'bg-gray-900 text-white'}
              opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10
            `}>
                We do not charge for our services and rely on your generosity. Your support helps us run this platform, enabling us to connect donors with worthy causes and sustain similar campaigns.
              </div>
            </div>
          </label>

          {/* Tip Percentage Buttons */}
          <div className="grid grid-cols-5 gap-2 mb-3">
            {tipPercentages.map((percentage) => (
              <button
                key={percentage}
                onClick={() => handleTipPercentageClick(percentage)}
                className={`
                  py-2 rounded-lg text-sm font-semibold border-2 transition-colors
                  ${tipPercentage === percentage
                    ? darkMode
                      ? 'border-emerald-500 bg-emerald-950/30 text-emerald-400'
                      : 'border-emerald-600 bg-emerald-50 text-emerald-700'
                    : darkMode
                      ? 'border-zinc-800 text-gray-400 hover:border-zinc-700'
                      : 'border-gray-200 text-gray-700 hover:border-gray-300'}
                `}
              >
                {percentage}%
              </button>
            ))}
          </div>

          <div className="relative">
            <span className={`absolute left-4 top-1/2 -translate-y-1/2 text-lg font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              ₹
            </span>
            <input
              type="number"
              placeholder="0"
              value={tipAmount}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setTipAmount(isNaN(val) ? 0 : val);
                setTipPercentage(null);
              }}
              className={`
              w-full h-14 pl-10 pr-4 text-base rounded-lg border-2 transition-colors
              ${tipAmount > 0
                  ? darkMode
                    ? 'border-emerald-500 bg-emerald-950/30 text-white'
                    : 'border-emerald-600 bg-emerald-50 text-gray-900'
                  : darkMode
                    ? 'border-zinc-800 bg-zinc-900 text-white placeholder-gray-600'
                    : 'border-gray-200 bg-white text-gray-900 placeholder-gray-400'}
              focus:outline-none focus:ring-0
            `}
            />
          </div>
        </div>

        {/* Anonymous Donation Checkbox */}
        <div className="mb-6">
          <label className={`flex items-center gap-3 cursor-pointer select-none ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${isAnonymous
              ? 'bg-emerald-500 border-emerald-500'
              : darkMode ? 'border-zinc-600' : 'border-gray-300'
              }`}>
              {isAnonymous && <Check className="w-3 h-3 text-white" />}
            </div>
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="hidden"
            />
            <span className="text-sm font-medium">Make my donation anonymous</span>
          </label>
        </div>

        {/* 80G Tax Benefit Checkbox */}
        {taxEligible && (
          <div className="mb-6">
            <label className={`flex items-center gap-3 cursor-pointer select-none ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${claim80G
                ? 'bg-emerald-500 border-emerald-500'
                : darkMode ? 'border-zinc-600' : 'border-gray-300'
                }`}>
                {claim80G && <Check className="w-3 h-3 text-white" />}
              </div>
              <input
                type="checkbox"
                checked={claim80G}
                onChange={(e) => setClaim80G(e.target.checked)}
                className="hidden"
              />
              <span className="text-sm font-medium">Claim 80G tax benefits</span>
            </label>
          </div>
        )}

        {/* Donate Button */}
        <button
          onClick={handleDonate}
          disabled={isDonating || (!selectedAmount && !customAmount)}
          className={`
    w-full h-14 rounded-lg font-bold text-base mb-6 transition-colors
    flex items-center justify-center gap-2
    ${isDonating
              ? 'bg-emerald-600 text-white cursor-wait'
              : selectedAmount || customAmount
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : darkMode
                  ? 'bg-zinc-800 text-gray-600 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
  `}
        >
          {isDonating ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v0C5.373 4 0 8.373 0 12h4z"
                />
              </svg>
              Processing Donation…
            </>
          ) : (
            selectedAmount || customAmount
              ? `Donate ₹${((selectedAmount || Number(customAmount) || 0) + (tipAmount || 0)).toLocaleString()}`
              : 'Select Amount to Continue'
          )}
        </button>

        {/* Terms */}
        <div className={`pt-6 border-t-2 border-dashed`} style={{ borderColor: darkMode ? '#27272a' : '#f3f4f6' }}>
          <p className={`text-xs text-center leading-relaxed ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
            By donating, you agree to our terms. Donations are tax-deductible and a receipt will be sent to your email.
          </p>
        </div>

        {payuData && (
          <PayUForm
            action={payuData.action}
            payload={payuData.payload}
          />
        )}
      </div>
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        darkMode={darkMode}
        onLoginSuccess={() => setShowLoginModal(false)}
      />
    </>
  );
}