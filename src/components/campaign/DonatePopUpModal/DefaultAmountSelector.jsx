'use client'

const presetAmounts = [
  { value: 50,  label: '₹50' },
  { value: 100, label: '₹100' },
  { value: 200, label: '₹200' },
  { value: 500, label: '₹500' },
];

export default function DefaultAmountSelector({
  darkMode,
  selectedAmount,
  setSelectedAmount,
  customAmount,
  setCustomAmount,
  showCustomAmountInput,
  setShowCustomAmountInput,
  hideLabel = false,
}) {
  const activeCls = 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-sm';
  const inactiveCls = darkMode
    ? 'bg-zinc-800 text-gray-300 hover:bg-zinc-700 border border-zinc-700/50'
    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200';

  const handleOtherClick = () => {
    const next = !showCustomAmountInput;
    setShowCustomAmountInput(next);
    if (!next) {
      setCustomAmount('');
      setSelectedAmount(100);
    } else {
      setSelectedAmount(null);
      setCustomAmount('');
    }
  };

  return (
    <div>
      <label className={`block text-xs font-semibold mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        Amount
      </label>

      {/* Preset row + Other button */}
      <div className="grid grid-cols-5 gap-1.5">
        {presetAmounts.map((amt) => (
          <button
            key={amt.value}
            onClick={() => {
              setSelectedAmount(amt.value);
              setCustomAmount('');
              setShowCustomAmountInput(false);
            }}
            className={`
              h-9 rounded-lg font-bold text-xs transition-all
              ${selectedAmount === amt.value && !customAmount ? activeCls : inactiveCls}
            `}
          >
            {amt.label}
          </button>
        ))}

        {/* Other — always a button */}
        <button
          onClick={handleOtherClick}
          className={`
            h-9 rounded-lg font-bold text-xs transition-all
            ${showCustomAmountInput || customAmount ? activeCls : inactiveCls}
          `}
        >
          {customAmount && !showCustomAmountInput ? `₹${customAmount}` : 'Other'}
        </button>
      </div>

      {/* Full-width custom input — appears below the grid */}
      {showCustomAmountInput && (
        <div className="mt-2 relative">
          <span className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold pointer-events-none ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>
            ₹
          </span>
          <input
            type="number"
            placeholder="Enter custom amount"
            value={customAmount}
            autoFocus
            min={50}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              setSelectedAmount(null);
            }}
            className={`
              w-full h-10 pl-7 pr-10 text-sm rounded-xl font-semibold focus:outline-none transition-all
              ${darkMode
                ? 'bg-zinc-800 border-2 border-emerald-500 text-white placeholder-gray-600'
                : 'bg-emerald-50 border-2 border-emerald-500 text-gray-900 placeholder-gray-400'}
            `}
          />
          {customAmount && parseInt(customAmount) >= 50 && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500 text-sm font-bold pointer-events-none">
              ✓
            </span>
          )}
        </div>
      )}
    </div>
  );
}