
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InputField, InfoButton, Modal, MultiFieldAdder, YesNoToggle } from './SharedComponents';


// ===== 3. ASSETS =====
const Assets = ({ formData, updateFormData, onNext, setActiveModal }) => {
  const pageVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  const pageTransition = {
    type: "tween",
    ease: [0.22, 1, 0.36, 1],
    duration: 0.5
  };

  return (
    <motion.div
      key="step1"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className="bg-white rounded-2xl shadow-xl p-5 sm:p-6 md:p-8 md:pb-40 border border-gray-100"
    >
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Assets You Own
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          Enter everything you own that is subject to Zakat
        </p>
      </div>

      <div className="space-y-6">
        {/* Cash */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <InputField
            label="Cash & Bank Savings"
            value={formData.cash}
            onChange={(val) => updateFormData('cash', val)}
            helperText="Bank, wallet, under your mattress - everything counts"
          />
        </motion.div>

        {/* Gold and Silver */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <label className="block text-sm sm:text-base font-semibold text-gray-900">
              Gold and Silver
            </label>
            <InfoButton onClick={() => setActiveModal('goldSilver')} text="How to calculate?" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-3 text-gray-700">
              Do any of these apply to you?
            </label>
            <YesNoToggle
              value={formData.hasGoldSilver}
              onChange={(val) => updateFormData('hasGoldSilver', val)}
            />
          </div>

          <AnimatePresence>
            {formData.hasGoldSilver && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden space-y-4"
              >
                {/* Gold */}
                <div className="bg-amber-50 p-5 rounded-xl border-2 border-amber-200">
                  <div className="flex items-center gap-3 mb-4">
                    <input
                      type="checkbox"
                      checked={formData.hasGold}
                      onChange={(e) => updateFormData('hasGold', e.target.checked)}
                      className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
                    />
                    <label className="font-semibold text-gray-900">I own Gold</label>
                  </div>
                  {formData.hasGold && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      <InputField
                        label="Weight (grams)"
                        value={formData.goldGrams}
                        onChange={(val) => updateFormData('goldGrams', val)}
                        prefix=""
                        placeholder="0"
                      />
                      <InputField
                        label="Price per gram"
                        value={formData.goldValue}
                        onChange={(val) => updateFormData('goldValue', val)}
                        placeholder="0.00"
                      />
                    </div>
                  )}
                </div>

                {/* Silver */}
                <div className="bg-gray-50 p-5 rounded-xl border-2 border-gray-300">
                  <div className="flex items-center gap-3 mb-4">
                    <input
                      type="checkbox"
                      checked={formData.hasSilver}
                      onChange={(e) => updateFormData('hasSilver', e.target.checked)}
                      className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
                    />
                    <label className="font-semibold text-gray-900">I own Silver</label>
                  </div>
                  {formData.hasSilver && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      <InputField
                        label="Weight (grams)"
                        value={formData.silverGrams}
                        onChange={(val) => updateFormData('silverGrams', val)}
                        prefix=""
                        placeholder="0"
                      />
                      <InputField
                        label="Price per gram"
                        value={formData.silverValue}
                        onChange={(val) => updateFormData('silverValue', val)}
                        placeholder="0.00"
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Investments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <label className="block text-sm sm:text-base font-semibold text-gray-900">
              Investments
            </label>
            <InfoButton onClick={() => setActiveModal('investments')} text="See example investments" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-3 text-gray-700">
              Does this apply to you?
            </label>
            <YesNoToggle
              value={formData.hasInvestments}
              onChange={(val) => updateFormData('hasInvestments', val)}
            />
          </div>

          <AnimatePresence>
            {formData.hasInvestments && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden space-y-4"
              >
                {/* Investment Type Selection */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { key: 'hasStocks', label: 'Stocks & Shares' },
                    { key: 'hasCrypto', label: 'Crypto' },
                    { key: 'hasPension', label: 'Pension/Retirement' },
                    { key: 'hasProperty', label: 'Investment Property' }
                  ].map((inv) => (
                    <button
                      key={inv.key}
                      onClick={() => updateFormData(inv.key, !formData[inv.key])}
                      className={`py-3 px-4 rounded-xl font-medium transition-all text-sm ${
                        formData[inv.key]
                          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {inv.label}
                    </button>
                  ))}
                </div>

                {/* Stocks & Shares */}
                {formData.hasStocks && (
                  <div className="bg-blue-50 p-5 rounded-xl border-2 border-blue-200 space-y-4">
                    <h4 className="font-bold text-gray-900 flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                      </svg>
                      Stocks & Shares
                    </h4>

                    <InfoButton onClick={() => setActiveModal('activePassive')} text="What's the difference between Active and Passive?" />

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">Active Investment</label>
                      <InputField
                        label=""
                        value={formData.activeInvestmentValue}
                        onChange={(val) => updateFormData('activeInvestmentValue', val)}
                        placeholder="Total value of active trading"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="block text-sm font-medium text-gray-700">Passive Investment</label>
                        <InfoButton onClick={() => setActiveModal('passiveCalc')} text="How do we calculate?" />
                      </div>
                      <MultiFieldAdder
                        fields={formData.passiveStocks}
                        setFields={(val) => updateFormData('passiveStocks', val)}
                        fieldLabels={['Stock Name', 'Total Value']}
                        placeholder="Enter value"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-3 text-gray-700">Dividends</label>
                      <YesNoToggle
                        value={formData.hasDividends}
                        onChange={(val) => updateFormData('hasDividends', val)}
                      />
                      {formData.hasDividends && (
                        <div className="mt-4">
                          <MultiFieldAdder
                            fields={formData.dividends}
                            setFields={(val) => updateFormData('dividends', val)}
                            fieldLabels={['Stock Name', 'Received per Share', 'Number of Shares']}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Crypto */}
                {formData.hasCrypto && (
                  <div className="bg-purple-50 p-5 rounded-xl border-2 border-purple-200 space-y-4">
                    <h4 className="font-bold text-gray-900 flex items-center gap-2">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Cryptocurrencies
                    </h4>

                    <InfoButton onClick={() => setActiveModal('crypto')} text="Read more about crypto zakat" />

                    <InputField
                      label="Current Market Value of Crypto"
                      value={formData.cryptoValue}
                      onChange={(val) => updateFormData('cryptoValue', val)}
                      helperText="Enter the entire value of your crypto wallet"
                    />
                  </div>
                )}

                {/* Pension */}
                {formData.hasPension && (
                  <div className="bg-orange-50 p-5 rounded-xl border-2 border-orange-200 space-y-4">
                    <h4 className="font-bold text-gray-900 flex items-center gap-2">
                      <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Pension Funds & Retirement Savings
                    </h4>

                    <InfoButton onClick={() => setActiveModal('pension')} text="Read more about pension zakat" />

                    <div>
                      <label className="block text-sm font-medium mb-3 text-gray-700">
                        Do you have access to the funds?
                      </label>
                      <YesNoToggle
                        value={formData.hasAccessToPension}
                        onChange={(val) => updateFormData('hasAccessToPension', val)}
                      />
                    </div>

                    {formData.hasAccessToPension === true && (
                      <InputField
                        label="Total Funds (After Tax)"
                        value={formData.pensionValue}
                        onChange={(val) => updateFormData('pensionValue', val)}
                        helperText="We'll calculate 30% of this value"
                      />
                    )}

                    {formData.hasAccessToPension === false && (
                      <div className="bg-white p-4 rounded-lg border-2 border-orange-300">
                        <p className="text-sm text-gray-700">Zakat is not payable until you have access to withdraw these funds.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Property */}
                {formData.hasProperty && (
                  <div className="bg-green-50 p-5 rounded-xl border-2 border-green-200 space-y-4">
                    <h4 className="font-bold text-gray-900 flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Investment Properties & Fixed Assets
                    </h4>

                    <div className="bg-white p-4 rounded-lg border border-green-300">
                      <p className="text-sm text-gray-700"><strong>Note:</strong> If you live in the property, there is no zakat.</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-3 text-gray-700">
                        Do you own anything besides what you live in?
                      </label>
                      <YesNoToggle
                        value={formData.ownsOtherProperty}
                        onChange={(val) => updateFormData('ownsOtherProperty', val)}
                      />
                    </div>

                    {formData.ownsOtherProperty && (
                      <>
                        <div>
                          <label className="block text-sm font-medium mb-3 text-gray-700">
                            Was this purchased for resale?
                          </label>
                          <YesNoToggle
                            value={formData.purchasedForResale}
                            onChange={(val) => updateFormData('purchasedForResale', val)}
                          />
                        </div>

                        {formData.purchasedForResale && (
                          <InputField
                            label="Market Value"
                            value={formData.propertyMarketValue}
                            onChange={(val) => updateFormData('propertyMarketValue', val)}
                          />
                        )}

                        {formData.purchasedForResale === false && (
                          <div className="bg-white p-4 rounded-lg border-2 border-green-300">
                            <p className="text-sm text-gray-700">Zakat is not due on property not intended for resale.</p>
                          </div>
                        )}
                      </>
                    )}

                    <div>
                      <label className="block text-sm font-medium mb-3 text-gray-700">
                        Are you actively renting property for income?
                      </label>
                      <YesNoToggle
                        value={formData.rentingProperty}
                        onChange={(val) => updateFormData('rentingProperty', val)}
                      />
                    </div>

                    {formData.rentingProperty && (
                      <InputField
                        label="Rental Income"
                        value={formData.rentalIncome}
                        onChange={(val) => updateFormData('rentalIncome', val)}
                        helperText="Annual rental income received"
                      />
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={onNext}
        className="w-full mt-8 py-4 text-sm sm:text-base bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-200 transition-all duration-300"
      >
        Continue to Debts Owed
      </motion.button>
    </motion.div>
  );
};

export default Assets;