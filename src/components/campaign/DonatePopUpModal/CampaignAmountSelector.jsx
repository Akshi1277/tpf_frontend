'use client'

export const CAMPAIGN_CONFIGS = {
  'help-us-serve-10000-iftars-of-hope-87d4f3': {
    unitName: 'Iftaar Kit',
    unitNamePlural: 'Iftaar Kits',
    unitCost: 50,
    presets: [
      { amount: 50, label: '₹50', sublabel: null },
      { amount: 100, label: '₹100', sublabel: null },
      { amount: 50, label: '1 Iftaar Kit', sublabel: '₹50', qty: 1 },
      { amount: 500, label: '10 Iftaar Kits', sublabel: '₹500', qty: 10 },
      { amount: 5000, label: '100 Iftaar Kits', sublabel: '₹5,000', qty: 100 },
      { amount: 50000, label: '1000 Iftaar Kits', sublabel: '₹50,000', qty: 1000 },
    ],
    emoji: '🌙',
    // active colour per campaign
    activeSolid: 'bg-amber-500 text-white border-amber-500',
    activeSoft: 'bg-amber-100  text-amber-900 border-amber-400 font-extrabold',
    activeSoftDk: 'bg-amber-500/25 text-amber-300 border-amber-400/70 font-extrabold',
  },
  'fill-1000-kitchens-with-hope-this-ramadan-87d3bc': {
    unitName: 'Ration Kit',
    unitNamePlural: 'Ration Kits',
    unitCost: 1250,
    presets: [
      { amount: 50, label: '₹50', sublabel: null },
      { amount: 100, label: '₹100', sublabel: null },
      { amount: 1250, label: '1 Ration Kit', sublabel: '₹1,250', qty: 1 },
      { amount: 6250, label: '5 Ration Kits', sublabel: '₹6,250', qty: 5 },
      { amount: 12500, label: '10 Ration Kits', sublabel: '₹12,500', qty: 10 },
      { amount: 125000, label: '100 Ration Kits', sublabel: '₹1,25,000', qty: 100 },
    ],
    emoji: '🍽️',
    activeSolid: 'bg-emerald-500 text-white border-emerald-500',
    activeSoft: 'bg-emerald-100  text-emerald-900 border-emerald-400 font-extrabold',
    activeSoftDk: 'bg-emerald-500/25 text-emerald-300 border-emerald-400/70 font-extrabold',
  },
  "give-the-gift-of-qur'an-earn-endless-rewards-87d2ad": {
    unitName: "Qur'an",
    unitNamePlural: "Qur'ans",
    unitCost: 400,
    presets: [
      { amount: 50, label: '₹50', sublabel: null },
      { amount: 100, label: '₹100', sublabel: null },
      { amount: 400, label: "1 Qur'an", sublabel: '₹400', qty: 1 },
      { amount: 2000, label: "5 Qur'an", sublabel: '₹400', qty: 1 },
      { amount: 4000, label: "10 Qur'ans", sublabel: '₹4,000', qty: 10 },
      { amount: 40000, label: "100 Qur'ans", sublabel: '₹40,000', qty: 100 },
    ],
    emoji: '📖',
    activeSolid: 'bg-violet-500 text-white border-violet-500',
    activeSoft: 'bg-violet-100  text-violet-900 border-violet-400 font-extrabold',
    activeSoftDk: 'bg-violet-500/25 text-violet-300 border-violet-400/70 font-extrabold',
  },
  'end-hunger-in-palestine-today-13e390': {
    unitName: 'Ration Kit',
    unitNamePlural: 'Ration Kits',
    unitCost: 4999,
    presets: [
      { amount: 50, label: '₹50', sublabel: null },
      { amount: 100, label: '₹100', sublabel: null },
      { amount: 4999, label: '1 Ration Kit', sublabel: '₹4,999', qty: 1 },
      { amount: 49990, label: '10 Ration Kits', sublabel: '₹49,990', qty: 10 },
      { amount: 499900, label: '100 Ration Kits', sublabel: '₹4,99,900', qty: 100 },
      { amount: 4999000, label: '1000 Ration Kits', sublabel: '₹49,99,000', qty: 1000 },
    ],
    emoji: '🕊️',
    activeSolid: 'bg-rose-500 text-white border-rose-500',
    activeSoft: 'bg-rose-100  text-rose-900 border-rose-400 font-extrabold',
    activeSoftDk: 'bg-rose-500/25 text-rose-300 border-rose-400/70 font-extrabold',
  },
};

export function getCampaignConfig(slug) {
  return CAMPAIGN_CONFIGS[slug] || null;
}

export default function CampaignAmountSelector({
  slug,
  unitConfig: propUnitConfig,
  darkMode,
  selectedAmount,
  setSelectedAmount,
  customAmount,
  setCustomAmount,
  showCustomAmountInput,
  setShowCustomAmountInput,
  selectedPresetKey,
  setSelectedPresetKey,
}) {
  const config = propUnitConfig || getCampaignConfig(slug);
  if (!config) return null;

  const dk = darkMode;

  // active / inactive classes
  const activeFlat = (dk ? config.activeSoftDk : config.activeSoft) ||
    (dk ? 'bg-emerald-500/25 text-emerald-300 border-emerald-400/70 font-extrabold' : 'bg-emerald-100 text-emerald-900 border-emerald-400 font-extrabold');
  const activeKit = activeFlat;
  const inactiveFlat = dk
    ? 'bg-zinc-900/60 border-zinc-600 text-zinc-300 hover:border-zinc-500 hover:text-zinc-200'
    : 'bg-white border-gray-300 text-gray-700 hover:border-emerald-300';
  const inactiveKit = inactiveFlat;

  const selectPreset = (preset, key) => {
    setSelectedAmount(preset.amount);
    setCustomAmount('');
    setShowCustomAmountInput(false);
    setSelectedPresetKey(key);
  };

  const handleOtherClick = () => {
    const next = !showCustomAmountInput;
    setShowCustomAmountInput(next);
    if (!next) {
      setCustomAmount('');
      setSelectedAmount(config.presets[0].amount);
      setSelectedPresetKey('flat-0');
    } else {
      setSelectedAmount(null);
      setCustomAmount('');
      setSelectedPresetKey(null);
    }
  };

  const flatPresets = (config.presets && config.presets.length > 0)
    ? config.presets.filter(p => !p.qty)
    : [
      { amount: 50, label: '₹50' },
      { amount: 100, label: '₹100' },
      { amount: 500, label: '₹500' },
      { amount: 1000, label: '₹1000' }
    ];

  const kitPresets = (config.presets && config.presets.length > 0)
    ? config.presets.filter(p => p.qty)
    : [];

  const isOtherActive = showCustomAmountInput || !!customAmount;

  return (
    <div className="space-y-2.5">
      {/* Unit cost badge - Only show if in unit mode and cost exists */}
      {(config.configType !== 'fixed' && config.unitCost > 0) && (
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium ${dk ? 'bg-zinc-900/60 text-zinc-400 border border-zinc-700/50' : 'bg-white text-gray-500 border border-gray-200'
          }`}>
          <span>{config.emoji}</span>
          <span>1 {config.unitName || config.itemName} = ₹{config.unitCost.toLocaleString()}</span>
        </div>
      )}

      {/* Flat amounts + Other — 3 equal columns */}
      <div className="grid grid-cols-3 gap-2">
        {flatPresets.map((preset, i) => {
          const key = `flat-${i}`;
          const isActive = selectedPresetKey === key && !customAmount;
          const label = preset.label || `₹${preset.amount.toLocaleString()}`;
          return (
            <button
              key={key}
              onClick={() => selectPreset(preset, key)}
              className={`h-9 rounded-lg text-sm font-extrabold transition-colors border ${isActive ? activeFlat : inactiveFlat}`}
            >
              {label}
            </button>
          );
        })}
        <button
          onClick={handleOtherClick}
          className={`h-9 rounded-lg text-xs font-extrabold transition-colors border ${isOtherActive ? activeFlat : inactiveFlat}`}
        >
          {customAmount && !showCustomAmountInput ? `₹${parseInt(customAmount).toLocaleString()}` : 'Other'}
        </button>
      </div>

      {/* Kit presets — 2 columns */}
      <div className="grid grid-cols-2 gap-2">
        {kitPresets.map((preset, i) => {
          const key = `kit-${i}`;
          const isActive = selectedPresetKey === key && !customAmount;
          const label = preset.label || `${preset.qty} ${preset.qty > 1 ? config.unitNamePlural : config.unitName}`;
          const sublabel = preset.sublabel || `₹${(preset.qty * (config.unitCost || 0)).toLocaleString()}`;
          return (
            <button
              key={key}
              onClick={() => selectPreset(preset, key)}
              className={`h-12 rounded-lg transition-colors flex flex-col items-center justify-center gap-0.5 px-3 border ${isActive ? activeKit : inactiveKit}`}
            >
              <span className={`text-[11px] font-medium leading-none ${isActive ? 'opacity-70' : dk ? 'text-zinc-500' : 'text-gray-400'}`}>
                {label}
              </span>
              <span className="text-sm font-bold leading-none mt-0.5">{sublabel}</span>
            </button>
          );
        })}
      </div>

      {/* Custom input */}
      {showCustomAmountInput && (
        <div className="relative">
          <span className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold pointer-events-none ${dk ? 'text-zinc-400' : 'text-gray-400'}`}>₹</span>
          <input
            type="number"
            placeholder="Enter custom amount"
            value={customAmount}
            autoFocus
            min={50}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              setSelectedAmount(null);
              setSelectedPresetKey(null);
            }}
            className={`w-full h-10 pl-7 pr-10 text-sm rounded-lg font-semibold focus:outline-none border transition-colors ${dk
              ? 'bg-zinc-800 border-zinc-600 focus:border-emerald-500 text-white placeholder-zinc-500'
              : 'bg-white border-gray-200 focus:border-emerald-400 text-gray-900 placeholder-gray-400'
              }`}
          />
          {customAmount && parseInt(customAmount) >= 50 && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500 text-sm font-bold pointer-events-none">✓</span>
          )}
        </div>
      )}
    </div>
  );
}