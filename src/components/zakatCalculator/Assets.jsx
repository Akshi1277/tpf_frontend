import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InputField, InfoButton, Modal, MultiFieldAdder, YesNoToggle } from './SharedComponents';
import { 
  TrendingUp, 
  Bitcoin, 
  Wallet, 
  Building2, 
  Gem,
  ChevronRight,
  Check
} from 'lucide-react';

// ===== 3. ASSETS =====
const Assets = ({ formData, updateFormData, onNext, setActiveModal, darkMode = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-4xl mx-auto"
    >
      {/* Elegant Header */}
     <div className="mb-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3 mb-4"
        >
       
        </motion.div>
        <h2 className={`text-4xl sm:text-5xl font-bold mb-3 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Assets & Holdings
        </h2>
        <p className={`text-lg ${
          darkMode ? 'text-zinc-400' : 'text-gray-600'
        }`}>
          Let's begin by documenting your current assets and investments
        </p>
      </div>

      <div className="space-y-8">
        {/* Cash Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`group relative overflow-hidden rounded-2xl border transition-all ${
            darkMode 
              ? 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 backdrop-blur-sm' 
              : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg'
          }`}
        >
          <div className="p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className={`p-3 rounded-xl transition-colors ${
                darkMode ? 'bg-zinc-800 group-hover:bg-emerald-950/50' : 'bg-gray-100 group-hover:bg-emerald-50'
              }`}>
                <Wallet className={`w-6 h-6 transition-colors ${
                  darkMode ? 'text-zinc-400 group-hover:text-emerald-400' : 'text-gray-600 group-hover:text-emerald-600'
                }`} />
              </div>
              <div className="flex-1">
                <h3 className={`text-xl font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Liquid Assets
                </h3>
                <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                  Cash, savings accounts, and readily available funds
                </p>
              </div>
            </div>
            <InputField
              label="Total Cash & Savings"
              value={formData.cash}
              onChange={(val) => updateFormData('cash', val)}
              helperText="Include checking accounts, savings, and physical cash"
              darkMode={darkMode}
            />
          </div>
        </motion.div>

        {/* Precious Metals Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`group relative overflow-hidden rounded-2xl border transition-all ${
            darkMode 
              ? 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 backdrop-blur-sm' 
              : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg'
          }`}
        >
          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl transition-colors ${
                  darkMode ? 'bg-zinc-800 group-hover:bg-amber-950/50' : 'bg-gray-100 group-hover:bg-amber-50'
                }`}>
                  <Gem className={`w-6 h-6 transition-colors ${
                    darkMode ? 'text-zinc-400 group-hover:text-amber-400' : 'text-gray-600 group-hover:text-amber-600'
                  }`} />
                </div>
                <div>
                  <h3 className={`text-xl font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Precious Metals
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Gold, silver, and other precious metal holdings
                  </p>
                </div>
              </div>
              <InfoButton onClick={() => setActiveModal('goldSilver')} text="Calculate" darkMode={darkMode} />
            </div>

            <div className="mb-6">
              <YesNoToggle
                value={formData.hasGoldSilver}
                onChange={(val) => updateFormData('hasGoldSilver', val)}
                darkMode={darkMode}
              />
            </div>

            <AnimatePresence>
              {formData.hasGoldSilver && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-4 overflow-hidden"
                >
                  {/* Gold */}
                  <div className={`relative p-6 rounded-xl border transition-all ${
                    formData.hasGold
                      ? darkMode
                        ? 'bg-amber-500/5 border-amber-500/20'
                        : 'bg-amber-50/50 border-amber-200/50'
                      : darkMode
                      ? 'bg-zinc-800/30 border-zinc-700/50'
                      : 'bg-gray-50/50 border-gray-200/50'
                  }`}>
                    <label className="flex items-center gap-4 mb-5 cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={formData.hasGold}
                          onChange={(e) => updateFormData('hasGold', e.target.checked)}
                          className="peer sr-only"
                        />
                        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                          formData.hasGold
                            ? 'bg-gradient-to-br from-emerald-600 to-teal-600 border-transparent'
                            : darkMode
                            ? 'border-zinc-600 peer-hover:border-emerald-500'
                            : 'border-gray-300 peer-hover:border-emerald-500'
                        }`}>
                          {formData.hasGold && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                        </div>
                      </div>
                      <div>
                        <div className={`font-semibold text-base ${darkMode ? 'text-zinc-100' : 'text-gray-900'}`}>
                          Gold Holdings
                        </div>
                        <div className={`text-sm ${darkMode ? 'text-zinc-500' : 'text-gray-500'}`}>
                          Jewelry, bullion, coins
                        </div>
                      </div>
                    </label>
                    
                    <AnimatePresence>
                      {formData.hasGold && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-hidden"
                        >
                          <InputField
                            label="Weight (grams)"
                            value={formData.goldGrams}
                            onChange={(val) => updateFormData('goldGrams', val)}
                            prefix=""
                            placeholder="0.00"
                            darkMode={darkMode}
                          />
                          <InputField
                            label="Current price per gram"
                            value={formData.goldValue}
                            onChange={(val) => updateFormData('goldValue', val)}
                            placeholder="0.00"
                            darkMode={darkMode}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Silver */}
                  <div className={`relative p-6 rounded-xl border transition-all ${
                    formData.hasSilver
                      ? darkMode
                        ? 'bg-slate-500/5 border-slate-400/20'
                        : 'bg-slate-50/50 border-slate-200/50'
                      : darkMode
                      ? 'bg-zinc-800/30 border-zinc-700/50'
                      : 'bg-gray-50/50 border-gray-200/50'
                  }`}>
                    <label className="flex items-center gap-4 mb-5 cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={formData.hasSilver}
                          onChange={(e) => updateFormData('hasSilver', e.target.checked)}
                          className="peer sr-only"
                        />
                        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                          formData.hasSilver
                            ? 'bg-gradient-to-br from-emerald-600 to-teal-600 border-transparent'
                            : darkMode
                            ? 'border-zinc-600 peer-hover:border-emerald-500'
                            : 'border-gray-300 peer-hover:border-emerald-500'
                        }`}>
                          {formData.hasSilver && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                        </div>
                      </div>
                      <div>
                        <div className={`font-semibold text-base ${darkMode ? 'text-zinc-100' : 'text-gray-900'}`}>
                          Silver Holdings
                        </div>
                        <div className={`text-sm ${darkMode ? 'text-zinc-500' : 'text-gray-500'}`}>
                          Jewelry, bullion, coins
                        </div>
                      </div>
                    </label>
                    
                    <AnimatePresence>
                      {formData.hasSilver && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-hidden"
                        >
                          <InputField
                            label="Weight (grams)"
                            value={formData.silverGrams}
                            onChange={(val) => updateFormData('silverGrams', val)}
                            prefix=""
                            placeholder="0.00"
                            darkMode={darkMode}
                          />
                          <InputField
                            label="Current price per gram"
                            value={formData.silverValue}
                            onChange={(val) => updateFormData('silverValue', val)}
                            placeholder="0.00"
                            darkMode={darkMode}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Investment Portfolio Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`group relative overflow-hidden rounded-2xl border transition-all ${
            darkMode 
              ? 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 backdrop-blur-sm' 
              : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg'
          }`}
        >
          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl transition-colors ${
                  darkMode ? 'bg-zinc-800 group-hover:bg-blue-950/50' : 'bg-gray-100 group-hover:bg-blue-50'
                }`}>
                  <TrendingUp className={`w-6 h-6 transition-colors ${
                    darkMode ? 'text-zinc-400 group-hover:text-blue-400' : 'text-gray-600 group-hover:text-blue-600'
                  }`} />
                </div>
                <div>
                  <h3 className={`text-xl font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Investment Portfolio
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Stocks, bonds, cryptocurrencies, and retirement accounts
                  </p>
                </div>
              </div>
              <InfoButton onClick={() => setActiveModal('investments')} text="Examples" darkMode={darkMode} />
            </div>

            <div className="mb-6">
              <YesNoToggle
                value={formData.hasInvestments}
                onChange={(val) => updateFormData('hasInvestments', val)}
                darkMode={darkMode}
              />
            </div>

            <AnimatePresence>
              {formData.hasInvestments && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-6 overflow-hidden"
                >
                  {/* Investment Type Grid */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { key: 'hasStocks', label: 'Equities', sublabel: 'Stocks & shares', icon: TrendingUp },
                      { key: 'hasCrypto', label: 'Digital Assets', sublabel: 'Cryptocurrency', icon: Bitcoin },
                      { key: 'hasPension', label: 'Retirement', sublabel: 'Pension funds', icon: Wallet },
                      { key: 'hasProperty', label: 'Real Estate', sublabel: 'Property holdings', icon: Building2 }
                    ].map((inv) => {
                      const Icon = inv.icon;
                      const isActive = formData[inv.key];
                      return (
                        <button
                          key={inv.key}
                          onClick={() => updateFormData(inv.key, !formData[inv.key])}
                          className={`relative p-5 rounded-xl border-2 text-left transition-all group/item ${
                            isActive
                              ? darkMode
                                ? 'bg-gradient-to-br from-emerald-950/50 to-teal-950/30 border-emerald-600/50 shadow-lg shadow-emerald-900/20'
                                : 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-300 shadow-md'
                              : darkMode
                              ? 'bg-zinc-800/30 border-zinc-700 hover:border-zinc-600'
                              : 'bg-gray-50/50 border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className={`p-2 rounded-lg transition-colors ${
                              isActive
                                ? darkMode ? 'bg-emerald-500/20' : 'bg-emerald-100'
                                : darkMode ? 'bg-zinc-700' : 'bg-white'
                            }`}>
                              <Icon className={`w-5 h-5 transition-colors ${
                                isActive
                                  ? darkMode ? 'text-emerald-400' : 'text-emerald-600'
                                  : darkMode ? 'text-zinc-400' : 'text-gray-600'
                              }`} />
                            </div>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                              isActive
                                ? 'bg-gradient-to-br from-emerald-600 to-teal-600 border-transparent'
                                : darkMode
                                ? 'border-zinc-600'
                                : 'border-gray-300'
                            }`}>
                              {isActive && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                            </div>
                          </div>
                          <div className={`font-semibold mb-1 ${
                            darkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {inv.label}
                          </div>
                          <div className={`text-sm ${
                            darkMode ? 'text-zinc-500' : 'text-gray-600'
                          }`}>
                            {inv.sublabel}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Stocks Details */}
                  {formData.hasStocks && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`p-6 rounded-xl border ${
                        darkMode
                          ? 'bg-blue-950/10 border-blue-900/30'
                          : 'bg-blue-50/30 border-blue-100'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-5">
                        <h4 className={`font-semibold flex items-center gap-2 ${
                          darkMode ? 'text-blue-300' : 'text-blue-900'
                        }`}>
                          <TrendingUp className="w-4 h-4" />
                          Equity Holdings
                        </h4>
                        <InfoButton onClick={() => setActiveModal('activePassive')} text="Active vs Passive" darkMode={darkMode} />
                      </div>

                      <div className="space-y-5">
                        <InputField
                          label="Active Trading Portfolio"
                          value={formData.activeInvestmentValue}
                          onChange={(val) => updateFormData('activeInvestmentValue', val)}
                          placeholder="0.00"
                          helperText="Total value of actively managed investments"
                          darkMode={darkMode}
                        />

                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <label className={`text-sm font-medium ${
                              darkMode ? 'text-zinc-300' : 'text-gray-700'
                            }`}>
                              Passive Investments
                            </label>
                            <InfoButton onClick={() => setActiveModal('passiveCalc')} text="Calculation" darkMode={darkMode} />
                          </div>
                          <MultiFieldAdder
                            fields={formData.passiveStocks}
                            setFields={(val) => updateFormData('passiveStocks', val)}
                            fieldLabels={['Investment name', 'Total value']}
                            placeholder="Enter details"
                            darkMode={darkMode}
                          />
                        </div>

                        <div>
                          <label className={`block text-sm font-medium mb-3 ${
                            darkMode ? 'text-zinc-300' : 'text-gray-700'
                          }`}>
                            Dividend income received?
                          </label>
                          <YesNoToggle
                            value={formData.hasDividends}
                            onChange={(val) => updateFormData('hasDividends', val)}
                            darkMode={darkMode}
                          />
                          {formData.hasDividends && (
                            <div className="mt-4">
                              <MultiFieldAdder
                                fields={formData.dividends}
                                setFields={(val) => updateFormData('dividends', val)}
                                fieldLabels={['Stock', 'Per share', 'Shares owned']}
                                darkMode={darkMode}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Crypto Details */}
                  {formData.hasCrypto && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`p-6 rounded-xl border ${
                        darkMode
                          ? 'bg-purple-950/10 border-purple-900/30'
                          : 'bg-purple-50/30 border-purple-100'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-5">
                        <h4 className={`font-semibold flex items-center gap-2 ${
                          darkMode ? 'text-purple-300' : 'text-purple-900'
                        }`}>
                          <Bitcoin className="w-4 h-4" />
                          Digital Asset Portfolio
                        </h4>
                        <InfoButton onClick={() => setActiveModal('crypto')} text="Learn more" darkMode={darkMode} />
                      </div>

                      <InputField
                        label="Total cryptocurrency value"
                        value={formData.cryptoValue}
                        onChange={(val) => updateFormData('cryptoValue', val)}
                        helperText="Combined market value of all digital assets"
                        darkMode={darkMode}
                      />
                    </motion.div>
                  )}

                  {/* Pension Details */}
                  {formData.hasPension && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`p-6 rounded-xl border ${
                        darkMode
                          ? 'bg-orange-950/10 border-orange-900/30'
                          : 'bg-orange-50/30 border-orange-100'
                      }`}
                    >
                      <h4 className={`font-semibold flex items-center gap-2 mb-5 ${
                        darkMode ? 'text-orange-300' : 'text-orange-900'
                      }`}>
                        <Wallet className="w-4 h-4" />
                        Retirement Accounts
                      </h4>

                      <div className="space-y-5">
                        <div>
                          <label className={`block text-sm font-medium mb-3 ${
                            darkMode ? 'text-zinc-300' : 'text-gray-700'
                          }`}>
                            Immediate access to funds?
                          </label>
                          <YesNoToggle
                            value={formData.hasAccessToPension}
                            onChange={(val) => updateFormData('hasAccessToPension', val)}
                            darkMode={darkMode}
                          />
                        </div>

                        {formData.hasAccessToPension && (
                          <InputField
                            label="Total pension value"
                            value={formData.pensionValue}
                            onChange={(val) => updateFormData('pensionValue', val)}
                            helperText="30% of accessible funds will be calculated"
                            darkMode={darkMode}
                          />
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Property Details */}
                  {formData.hasProperty && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`p-6 rounded-xl border ${
                        darkMode
                          ? 'bg-teal-950/10 border-teal-900/30'
                          : 'bg-teal-50/30 border-teal-100'
                      }`}
                    >
                      <h4 className={`font-semibold flex items-center gap-2 mb-5 ${
                        darkMode ? 'text-teal-300' : 'text-teal-900'
                      }`}>
                        <Building2 className="w-4 h-4" />
                        Real Estate Holdings
                      </h4>

                      <div className="space-y-5">
                        <div>
                          <label className={`block text-sm font-medium mb-3 ${
                            darkMode ? 'text-zinc-300' : 'text-gray-700'
                          }`}>
                            Property acquired for resale?
                          </label>
                          <YesNoToggle
                            value={formData.purchasedForResale}
                            onChange={(val) => updateFormData('purchasedForResale', val)}
                            darkMode={darkMode}
                          />
                        </div>

                        {formData.purchasedForResale && (
                          <InputField
                            label="Current market valuation"
                            value={formData.propertyMarketValue}
                            onChange={(val) => updateFormData('propertyMarketValue', val)}
                            darkMode={darkMode}
                          />
                        )}

                        <div>
                          <label className={`block text-sm font-medium mb-3 ${
                            darkMode ? 'text-zinc-300' : 'text-gray-700'
                          }`}>
                            Property generating rental income?
                          </label>
                          <YesNoToggle
                            value={formData.rentingProperty}
                            onChange={(val) => updateFormData('rentingProperty', val)}
                            darkMode={darkMode}
                          />
                        </div>

                        {formData.rentingProperty && (
                          <InputField
                            label="Annual rental income"
                            value={formData.rentalIncome}
                            onChange={(val) => updateFormData('rentalIncome', val)}
                            darkMode={darkMode}
                          />
                        )}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-end pt-4"
        >
          <button
            onClick={onNext}
            className={`group relative px-8 py-4 rounded-xl font-semibold text-white overflow-hidden transition-all ${
              darkMode 
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:shadow-lg hover:shadow-emerald-900/30' 
                : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:shadow-xl hover:shadow-emerald-300/50'
            }`}
          >
            <span className="relative z-10 flex items-center gap-2">
              Continue
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Assets;