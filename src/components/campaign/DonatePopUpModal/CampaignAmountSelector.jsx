'use client'

export const CAMPAIGN_CONFIGS = {
  'help-us-serve-10000-iftars-of-hope-87d4f3': {
    unitName: 'Iftaar Kit',
    unitNamePlural: 'Iftaar Kits',
    unitCost: 50,
    presets: [
      { amount: 50,   label: '₹50',          sublabel: null },
      { amount: 100,  label: '₹100',         sublabel: null },
      { amount: 50,   label: '1 Iftaar Kit',  sublabel: '₹50',   qty: 1 },
      { amount: 500,  label: '10 Iftaar Kits',sublabel: '₹500',  qty: 10 },
      { amount: 5000, label: '100 Iftaar Kits',sublabel: '₹5,000', qty: 100 },
      { amount: 50000,label: '1000 Iftaar Kits',sublabel: '₹50,000', qty: 1000 },
    ],
    emoji: '🌙',
    activeCls: 'bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/25',
  },
  'fill-1000-kitchens-with-hope-this-ramadan-87d3bc': {
    unitName: 'Ration Kit',
    unitNamePlural: 'Ration Kits',
    unitCost: 1250,
    presets: [
      { amount: 50,    label: '₹50',           sublabel: null },
      { amount: 100,   label: '₹100',          sublabel: null },
      { amount: 1250,  label: '1 Ration Kit',  sublabel: '₹1,250',  qty: 1 },
      { amount: 6250,  label: '5 Ration Kits', sublabel: '₹6,250',  qty: 5 },
      { amount: 12500, label: '10 Ration Kits',sublabel: '₹12,500', qty: 10 },
      { amount: 125000,label: '100 Ration Kits',sublabel: '₹1,25,000', qty: 100 },
    ],
    emoji: '🍽️',
    activeCls: 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/25',
  },
  "give-the-gift-of-qur'an-earn-endless-rewards-87d2ad": {
    unitName: "Qur'an",
    unitNamePlural: "Qur'ans",
    unitCost: 400,
    presets: [
      { amount: 50,   label: '₹50',       sublabel: null },
      { amount: 100,  label: '₹100',      sublabel: null },
      { amount: 400,  label: "1 Qur'an",  sublabel: '₹400',   qty: 1 },
      { amount: 4000, label: "10 Qur'ans",sublabel: '₹4,000', qty: 10 },
      { amount: 40000,label: "100 Qur'ans",sublabel: '₹40,000', qty: 100 },
    ],
    emoji: '📖',
    activeCls: 'bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-md shadow-violet-500/25',
  },
};

export function getCampaignConfig(slug) {
  return CAMPAIGN_CONFIGS[slug] || null;
}

export default function CampaignAmountSelector({
  slug,
  darkMode,
  selectedAmount,
  setSelectedAmount,
  customAmount,
  setCustomAmount,
  showCustomAmountInput,
  setShowCustomAmountInput,
  hideLabel = false,
}) {
  const config = getCampaignConfig(slug);
  if (!config) return null;

  const inactiveCls = darkMode
    ? 'bg-zinc-800 text-gray-300 hover:bg-zinc-700 border border-zinc-700/60'
    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200';

  const handleOtherClick = () => {
    const next = !showCustomAmountInput;
    setShowCustomAmountInput(next);
    if (!next) {
      // closing — restore first preset
      setCustomAmount('');
      setSelectedAmount(config.presets[0].qty * config.unitCost);
    } else {
      setSelectedAmount(null);
      setCustomAmount('');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className={`text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Amount
        </label>
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${darkMode ? 'bg-zinc-800 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
          {config.emoji} 1 {config.unitName} = ₹{config.unitCost.toLocaleString()}
        </span>
      </div>

      {/* Preset grid — ₹50 & ₹100 in top row (cols-3 with Other), kit options below in cols-2 */}
      <div className="grid grid-cols-3 gap-1.5 mb-1.5">
        {config.presets.filter(p => !p.qty).map((preset) => {
          const isSelected = selectedAmount === preset.amount && !customAmount;
          return (
            <button
              key={preset.label}
              onClick={() => {
                setSelectedAmount(preset.amount);
                setCustomAmount('');
                setShowCustomAmountInput(false);
              }}
              className={`
                h-9 rounded-xl text-sm font-bold transition-all
                ${isSelected ? config.activeCls : inactiveCls}
              `}
            >
              {preset.label}
            </button>
          );
        })}

        {/* Other — in same top row */}
        <button
          onClick={handleOtherClick}
          className={`
            h-9 rounded-xl text-xs font-bold transition-all
            ${showCustomAmountInput || customAmount ? config.activeCls : inactiveCls}
          `}
        >
          {customAmount && !showCustomAmountInput ? `₹${parseInt(customAmount).toLocaleString()}` : 'Other'}
        </button>
      </div>

      {/* Kit presets grid */}
      <div className="grid grid-cols-2 gap-1.5">
        {config.presets.filter(p => p.qty).map((preset) => {
          const isSelected = selectedAmount === preset.amount && !customAmount;
          return (
            <button
              key={preset.label}
              onClick={() => {
                setSelectedAmount(preset.amount);
                setCustomAmount('');
                setShowCustomAmountInput(false);
              }}
              className={`
                h-[3.25rem] rounded-xl text-xs transition-all flex flex-col items-center justify-center gap-0.5 px-2
                ${isSelected ? config.activeCls : inactiveCls}
              `}
            >
              <span className={`text-[11px] font-medium leading-none ${isSelected ? 'text-white/75' : darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {preset.label}
              </span>
              <span className="text-sm font-bold leading-none mt-0.5">
                {preset.sublabel}
              </span>
            </button>
          );
        })}
      </div>

      {/* Full-width custom input — slides in below grid */}
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