import { motion, AnimatePresence } from 'framer-motion';
import { InputField, InfoButton, MultiFieldAdder, YesNoToggle } from './SharedComponents';
import { TrendingUp, Bitcoin, Wallet, Building2, Gem, ChevronRight, Check, Plus, X } from 'lucide-react';

const KARAT_OPTIONS = ['24', '22', '21', '18', '14', '12', '9'];

const SectionCard = ({ children, darkMode, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay }}
    className={`rounded-xl border ${
      darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-gray-200'
    }`}
  >
    {children}
  </motion.div>
);

const SectionHeader = ({ icon: Icon, title, subtitle, accent, darkMode, action }) => (
  <div className="flex items-center justify-between p-5 pb-4">
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-lg ${darkMode ? 'bg-zinc-800' : 'bg-gray-50'}`}>
        <Icon className={`w-4 h-4 ${accent}`} />
      </div>
      <div>
        <h3 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
        <p className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-gray-500'}`}>{subtitle}</p>
      </div>
    </div>
    {action}
  </div>
);

const GoldEntryRow = ({ entry, index, onChange, onRemove, canRemove, darkMode }) => (
  <motion.div
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -6 }}
    transition={{ duration: 0.2 }}
    className={`p-3 rounded-lg border space-y-2 ${
      darkMode ? 'bg-zinc-800/50 border-zinc-700' : 'bg-white border-gray-200'
    }`}
  >
    <div className="flex items-center justify-between">
      <span className={`text-xs font-semibold ${darkMode ? 'text-amber-400' : 'text-amber-700'}`}>
        Entry {index + 1}
      </span>
      {canRemove && (
        <button onClick={onRemove} className="text-red-400 hover:text-red-500 transition-colors">
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
    <div className="grid grid-cols-2 gap-2">
      <div>
        <label className={`block text-xs font-medium mb-1 ${darkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
          Weight (grams)
        </label>
        <div className="relative">
          <span className={`absolute left-3 top-2.5 text-xs ${darkMode ? 'text-zinc-500' : 'text-gray-400'}`}>g</span>
          <input
            type="number"
            value={entry.grams}
            onChange={(e) => onChange({ ...entry, grams: e.target.value })}
            placeholder="0.00"
            className={`w-full pl-7 pr-3 py-2 text-sm rounded-lg border outline-none transition-colors focus:ring-2 focus:ring-emerald-500/20 ${
              darkMode
                ? 'bg-zinc-900 border-zinc-600 text-white placeholder-zinc-500 focus:border-emerald-500'
                : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500'
            }`}
          />
        </div>
      </div>
      <div>
        <label className={`block text-xs font-medium mb-1 ${darkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
          Karat
        </label>
        <select
          value={entry.karat}
          onChange={(e) => onChange({ ...entry, karat: e.target.value })}
          className={`w-full px-3 py-2 text-sm rounded-lg border outline-none transition-colors ${
            darkMode
              ? 'bg-zinc-900 border-zinc-600 text-white focus:border-emerald-500'
              : 'bg-white border-gray-200 text-gray-900 focus:border-emerald-500'
          }`}
        >
          {KARAT_OPTIONS.map(k => (
            <option key={k} value={k}>{k}K</option>
          ))}
        </select>
      </div>
    </div>
  </motion.div>
);

const SilverEntryRow = ({ entry, index, onChange, onRemove, canRemove, darkMode }) => (
  <motion.div
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -6 }}
    transition={{ duration: 0.2 }}
    className={`p-3 rounded-lg border ${
      darkMode ? 'bg-zinc-800/50 border-zinc-700' : 'bg-white border-gray-200'
    }`}
  >
    <div className="flex items-center justify-between mb-2">
      <span className={`text-xs font-semibold ${darkMode ? 'text-zinc-300' : 'text-gray-600'}`}>
        Entry {index + 1}
      </span>
      {canRemove && (
        <button onClick={onRemove} className="text-red-400 hover:text-red-500 transition-colors">
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
    <div>
      <label className={`block text-xs font-medium mb-1 ${darkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
        Weight (grams)
      </label>
      <div className="relative">
        <span className={`absolute left-3 top-2.5 text-xs ${darkMode ? 'text-zinc-500' : 'text-gray-400'}`}>g</span>
        <input
          type="number"
          value={entry.grams}
          onChange={(e) => onChange({ ...entry, grams: e.target.value })}
          placeholder="0.00"
          className={`w-full pl-7 pr-3 py-2 text-sm rounded-lg border outline-none transition-colors focus:ring-2 focus:ring-emerald-500/20 ${
            darkMode
              ? 'bg-zinc-900 border-zinc-600 text-white placeholder-zinc-500 focus:border-emerald-500'
              : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500'
          }`}
        />
      </div>
    </div>
  </motion.div>
);

const Assets = ({ formData, updateFormData, onNext, setActiveModal, darkMode = false }) => {
  const navBtn = `px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2`;

  const updateGoldEntry = (index, updated) => {
    const entries = [...formData.goldEntries];
    entries[index] = updated;
    updateFormData('goldEntries', entries);
  };
  const addGoldEntry = () =>
    updateFormData('goldEntries', [...formData.goldEntries, { grams: '', karat: '24' }]);
  const removeGoldEntry = (index) =>
    updateFormData('goldEntries', formData.goldEntries.filter((_, i) => i !== index));

  const updateSilverEntry = (index, updated) => {
    const entries = [...formData.silverEntries];
    entries[index] = updated;
    updateFormData('silverEntries', entries);
  };
  const addSilverEntry = () =>
    updateFormData('silverEntries', [...formData.silverEntries, { grams: '' }]);
  const removeSilverEntry = (index) =>
    updateFormData('silverEntries', formData.silverEntries.filter((_, i) => i !== index));

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl mx-auto"
    >
      <div className="mb-6">
        <h2 className={`text-2xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Your Wealth & Savings</h2>
        <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
          Tell us about the money and valuables you currently own
        </p>
      </div>

      <div className="space-y-4">
        {/* Cash */}
        <SectionCard darkMode={darkMode} delay={0.05}>
          <SectionHeader
            icon={Wallet}
            title="Cash & Bank Accounts"
            subtitle="Money you have in hand or in the bank right now"
            accent={darkMode ? 'text-emerald-400' : 'text-emerald-600'}
            darkMode={darkMode}
          />
          <div className="px-5 pb-5">
            <InputField
              label="Total Cash & Savings"
              value={formData.cash}
              onChange={(val) => updateFormData('cash', val)}
              helperText="Add up all your bank accounts, savings, and any cash at home"
              darkMode={darkMode}
            />
          </div>
        </SectionCard>

        {/* Precious Metals */}
        <SectionCard darkMode={darkMode} delay={0.1}>
          <SectionHeader
            icon={Gem}
            title="Precious Metals"
            subtitle="Gold, silver, and other precious metal holdings"
            accent={darkMode ? 'text-amber-400' : 'text-amber-600'}
            darkMode={darkMode}
            action={<InfoButton onClick={() => setActiveModal('goldSilver')} text="How to calculate" darkMode={darkMode} />}
          />
          <div className="px-5 pb-5">
            <label className={`block text-xs font-medium mb-2 ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
              Do you own gold or silver?
            </label>
            <YesNoToggle
              value={formData.hasGoldSilver}
              onChange={(val) => updateFormData('hasGoldSilver', val)}
              darkMode={darkMode}
            />

            <AnimatePresence>
              {formData.hasGoldSilver && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-4 space-y-3"
                >
                  {/* ── Gold ── */}
                  <div className={`rounded-lg border p-4 transition-colors ${
                    formData.hasGold
                      ? darkMode ? 'bg-amber-950/20 border-amber-800/40' : 'bg-amber-50/60 border-amber-200'
                      : darkMode ? 'bg-zinc-800/30 border-zinc-700' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <label className="flex items-center gap-3 mb-3 cursor-pointer">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                        formData.hasGold ? 'bg-emerald-600 border-emerald-600' : darkMode ? 'border-zinc-600' : 'border-gray-300'
                      }`}>
                        {formData.hasGold && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                      </div>
                      <input type="checkbox" checked={formData.hasGold} onChange={(e) => updateFormData('hasGold', e.target.checked)} className="sr-only" />
                      <div>
                        <span className={`text-sm font-semibold ${darkMode ? 'text-zinc-100' : 'text-gray-900'}`}>Gold Holdings</span>
                        <span className={`text-xs ml-2 ${darkMode ? 'text-zinc-500' : 'text-gray-500'}`}>Jewellery, bars, coins</span>
                      </div>
                    </label>

                    <AnimatePresence>
                      {formData.hasGold && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden space-y-2 pt-1"
                        >
                          <p className={`text-xs mb-1 ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
                            If you have gold of different purities, add them separately
                          </p>
                          <AnimatePresence>
                            {formData.goldEntries.map((entry, idx) => (
                              <GoldEntryRow
                                key={idx}
                                entry={entry}
                                index={idx}
                                onChange={(updated) => updateGoldEntry(idx, updated)}
                                onRemove={() => removeGoldEntry(idx)}
                                canRemove={formData.goldEntries.length > 1}
                                darkMode={darkMode}
                              />
                            ))}
                          </AnimatePresence>
                          <button
                            onClick={addGoldEntry}
                            className={`w-full py-2 text-xs font-semibold rounded-lg border transition-colors flex items-center justify-center gap-1.5 ${
                              darkMode
                                ? 'border-amber-800/50 text-amber-400 hover:bg-amber-950/30'
                                : 'border-amber-200 text-amber-700 hover:bg-amber-50'
                            }`}
                          >
                            <Plus className="w-3.5 h-3.5" /> Add Another Gold Entry
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* ── Silver ── */}
                  <div className={`rounded-lg border p-4 transition-colors ${
                    formData.hasSilver
                      ? darkMode ? 'bg-zinc-700/20 border-zinc-600' : 'bg-gray-100/60 border-gray-300'
                      : darkMode ? 'bg-zinc-800/30 border-zinc-700' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <label className="flex items-center gap-3 mb-3 cursor-pointer">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                        formData.hasSilver ? 'bg-emerald-600 border-emerald-600' : darkMode ? 'border-zinc-600' : 'border-gray-300'
                      }`}>
                        {formData.hasSilver && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                      </div>
                      <input type="checkbox" checked={formData.hasSilver} onChange={(e) => updateFormData('hasSilver', e.target.checked)} className="sr-only" />
                      <div>
                        <span className={`text-sm font-semibold ${darkMode ? 'text-zinc-100' : 'text-gray-900'}`}>Silver Holdings</span>
                        <span className={`text-xs ml-2 ${darkMode ? 'text-zinc-500' : 'text-gray-500'}`}>Jewellery, bars, coins</span>
                      </div>
                    </label>

                    <AnimatePresence>
                      {formData.hasSilver && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden space-y-2 pt-1"
                        >
                          <p className={`text-xs mb-1 ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
                            Add each silver item separately if you have different pieces
                          </p>
                          <AnimatePresence>
                            {formData.silverEntries.map((entry, idx) => (
                              <SilverEntryRow
                                key={idx}
                                entry={entry}
                                index={idx}
                                onChange={(updated) => updateSilverEntry(idx, updated)}
                                onRemove={() => removeSilverEntry(idx)}
                                canRemove={formData.silverEntries.length > 1}
                                darkMode={darkMode}
                              />
                            ))}
                          </AnimatePresence>
                          <button
                            onClick={addSilverEntry}
                            className={`w-full py-2 text-xs font-semibold rounded-lg border transition-colors flex items-center justify-center gap-1.5 ${
                              darkMode
                                ? 'border-zinc-600 text-zinc-300 hover:bg-zinc-700/30'
                                : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            <Plus className="w-3.5 h-3.5" /> Add Another Silver Entry
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </SectionCard>

        {/* Investments */}
        <SectionCard darkMode={darkMode} delay={0.15}>
          <SectionHeader
            icon={TrendingUp}
            title="Investments"
            subtitle="Shares, crypto, pension savings, and property you own"
            accent={darkMode ? 'text-blue-400' : 'text-blue-600'}
            darkMode={darkMode}
            action={<InfoButton onClick={() => setActiveModal('investments')} text="What counts?" darkMode={darkMode} />}
          />
          <div className="px-5 pb-5">
            <label className={`block text-xs font-medium mb-2 ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
              Do you hold any investments?
            </label>
            <YesNoToggle
              value={formData.hasInvestments}
              onChange={(val) => updateFormData('hasInvestments', val)}
              darkMode={darkMode}
            />

            <AnimatePresence>
              {formData.hasInvestments && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-4 space-y-3"
                >
                  <div className={`p-3 rounded-lg border ${darkMode ? 'bg-zinc-800/30 border-zinc-700' : 'bg-gray-50 border-gray-100'}`}>
                    <p className={`text-xs font-medium mb-2 ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>Select all that apply</p>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { key: 'hasStocks', label: 'Shares / Funds' },
                        { key: 'hasCrypto', label: 'Crypto' },
                        { key: 'hasPension', label: 'Pension / Retirement' },
                        { key: 'hasProperty', label: 'Property' },
                      ].map(({ key, label }) => (
                        <label key={key} className="flex items-center gap-2 cursor-pointer">
                          <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
                            formData[key] ? 'bg-emerald-600 border-emerald-600' : darkMode ? 'border-zinc-600' : 'border-gray-300'
                          }`}>
                            {formData[key] && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
                          </div>
                          <input type="checkbox" checked={formData[key]} onChange={(e) => updateFormData(key, e.target.checked)} className="sr-only" />
                          <span className={`text-sm ${darkMode ? 'text-zinc-200' : 'text-gray-700'}`}>{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <AnimatePresence>
                    {formData.hasStocks && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className={`overflow-hidden rounded-lg border p-4 ${
                          darkMode ? 'bg-blue-950/10 border-blue-900/30' : 'bg-blue-50/50 border-blue-100'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <p className={`text-xs font-bold uppercase tracking-wide ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>Shares & Funds</p>
                          <InfoButton onClick={() => setActiveModal('activePassive')} text="Active vs Passive?" darkMode={darkMode} />
                        </div>
                        <div className="space-y-3">
                          <div>
                            <label className={`block text-xs font-medium mb-1.5 ${darkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
                              How do you invest in shares?
                            </label>
                            <div className="flex gap-2">
                              {[{ val: 'active', label: 'I buy & sell often' }, { val: 'passive', label: 'I buy & hold long-term' }].map(({ val, label }) => (
                                <button
                                  key={val}
                                  onClick={() => updateFormData('investmentType', val)}
                                  className={`flex-1 py-2 text-xs rounded-lg font-semibold transition-colors border ${
                                    formData.investmentType === val
                                      ? 'bg-emerald-600 text-white border-emerald-600'
                                      : darkMode
                                      ? 'bg-zinc-800 text-zinc-300 border-zinc-700'
                                      : 'bg-white text-gray-600 border-gray-200'
                                  }`}
                                >
                                  {label}
                                </button>
                              ))}
                            </div>
                          </div>
                          {formData.investmentType === 'active' && (
                            <InputField
                              label="Total value of your shares"
                              value={formData.activeInvestmentValue}
                              onChange={(val) => updateFormData('activeInvestmentValue', val)}
                              darkMode={darkMode}
                            />
                          )}
                          {formData.investmentType === 'passive' && (
                            <div className="space-y-3">
                              <InputField
                                label="Total value of your shares today"
                                value={formData.passivePortfolioValue}
                                onChange={(val) => updateFormData('passivePortfolioValue', val)}
                                helperText="The current total value of all your shares and funds"
                                darkMode={darkMode}
                              />
                              <div>
                                <label className={`block text-xs font-medium mb-1.5 ${darkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
                                  Do you receive dividends?
                                </label>
                                <YesNoToggle value={formData.hasDividends} onChange={(val) => updateFormData('hasDividends', val)} darkMode={darkMode} />
                                {formData.hasDividends && (
                                  <div className="mt-3">
                                    <MultiFieldAdder
                                      fields={formData.dividends}
                                      setFields={(val) => updateFormData('dividends', val)}
                                      fieldLabels={['Company', 'Annual dividend', 'Owned months']}
                                      placeholder="Enter details"
                                      darkMode={darkMode}
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {formData.hasCrypto && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className={`overflow-hidden rounded-lg border p-4 ${
                          darkMode ? 'bg-purple-950/10 border-purple-900/30' : 'bg-purple-50/50 border-purple-100'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <p className={`text-xs font-bold uppercase tracking-wide flex items-center gap-1.5 ${darkMode ? 'text-purple-400' : 'text-purple-700'}`}>
                            <Bitcoin className="w-3.5 h-3.5" /> Cryptocurrency
                          </p>
                          <InfoButton onClick={() => setActiveModal('crypto')} text="Learn more" darkMode={darkMode} />
                        </div>
                        <InputField
                          label="Total value of your crypto"
                          value={formData.cryptoValue}
                          onChange={(val) => updateFormData('cryptoValue', val)}
                          helperText="Add up the current value of all your coins and tokens"
                          darkMode={darkMode}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {formData.hasPension && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className={`overflow-hidden rounded-lg border p-4 ${
                          darkMode ? 'bg-orange-950/10 border-orange-900/30' : 'bg-orange-50/50 border-orange-100'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <p className={`text-xs font-bold uppercase tracking-wide ${darkMode ? 'text-orange-400' : 'text-orange-700'}`}>Pension & Retirement Savings</p>
                          <InfoButton onClick={() => setActiveModal('pension')} text="Learn more" darkMode={darkMode} />
                        </div>
                        <div className="space-y-3">
                          <div>
                            <label className={`block text-xs font-medium mb-1.5 ${darkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
                              Can you withdraw this money right now?
                            </label>
                            <YesNoToggle value={formData.hasAccessToPension} onChange={(val) => updateFormData('hasAccessToPension', val)} darkMode={darkMode} />
                          </div>
                          {formData.hasAccessToPension && (
                            <InputField
                              label="Total pension / retirement savings value"
                              value={formData.pensionValue}
                              onChange={(val) => updateFormData('pensionValue', val)}
                              helperText="30% of this amount will be used in the calculation"
                              darkMode={darkMode}
                            />
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {formData.hasProperty && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className={`overflow-hidden rounded-lg border p-4 ${
                          darkMode ? 'bg-teal-950/10 border-teal-900/30' : 'bg-teal-50/50 border-teal-100'
                        }`}
                      >
                        <p className={`text-xs font-bold uppercase tracking-wide flex items-center gap-1.5 mb-3 ${darkMode ? 'text-teal-400' : 'text-teal-700'}`}>
                          <Building2 className="w-3.5 h-3.5" /> Real Estate
                        </p>
                        <div className="space-y-3">
                          <div>
                            <label className={`block text-xs font-medium mb-1.5 ${darkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
                              Did you buy this property to sell it later?
                            </label>
                            <YesNoToggle value={formData.purchasedForResale} onChange={(val) => updateFormData('purchasedForResale', val)} darkMode={darkMode} />
                          </div>
                          {formData.purchasedForResale && (
                            <InputField label="What is it worth today?" value={formData.propertyMarketValue} onChange={(val) => updateFormData('propertyMarketValue', val)} darkMode={darkMode} />
                          )}
                          <div>
                            <label className={`block text-xs font-medium mb-1.5 ${darkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
                              Do you rent this property out to others?
                            </label>
                            <YesNoToggle value={formData.rentingProperty} onChange={(val) => updateFormData('rentingProperty', val)} darkMode={darkMode} />
                          </div>
                          {formData.rentingProperty && (
                            <InputField label="How much rent do you earn per year?" value={formData.rentalIncome} onChange={(val) => updateFormData('rentalIncome', val)} darkMode={darkMode} />
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </SectionCard>

        {/* Navigation */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onNext}
            className={`${navBtn} text-white`}
            style={{ background: 'linear-gradient(135deg, #2D7A5C 0%, #1E5A44 100%)' }}
          >
            Continue
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Assets;