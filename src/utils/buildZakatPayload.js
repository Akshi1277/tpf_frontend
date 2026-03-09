export const buildZakatPayload = (formData) => {
  const sumDynamicAmounts = (arr, step = 2) => {
    let total = 0;
    for (let i = 1; i < arr.length; i += step) {
      total += Number(arr[i] || 0);
    }
    return total;
  };

  return {
    assets: {
      cash: Number(formData.cash || 0),

      // Each entry carries { grams, karat } so the backend can apply purity per entry
      gold: formData.hasGold
        ? (formData.goldEntries || []).map((e) => ({
            grams: Number(e.grams || 0),
            karat: Number(e.karat || 24),
          }))
        : [],

      // Each entry carries { grams }; silver is always pure so no karat needed
      silver: formData.hasSilver
        ? (formData.silverEntries || []).map((e) => ({
            grams: Number(e.grams || 0),
          }))
        : [],

      stocks: {
        active: formData.hasStocks
          ? Number(formData.activeInvestmentValue || 0)
          : 0,

        passive: formData.hasStocks
          ? Number(formData.passivePortfolioValue || 0)
          : 0,
      },

      crypto: formData.hasCrypto
        ? Number(formData.cryptoValue || 0)
        : 0,

      pension: {
        value: formData.hasPension
          ? Number(formData.pensionValue || 0)
          : 0,
        accessible: formData.hasAccessToPension || false,
      },

      property: {
        resaleValue: formData.purchasedForResale
          ? Number(formData.propertyMarketValue || 0)
          : 0,
        rentalSavings: formData.rentingProperty
          ? Number(formData.rentalIncome || 0)
          : 0,
      },

      otherAssets: formData.hasOtherAssets
        ? sumDynamicAmounts(formData.otherAssets)
        : 0,

      debtsOwedToYou:
        formData.owedMoney && formData.expectPayback
          ? Number(formData.owedAmount || 0)
          : 0,

      // Manual rate overrides — null when user chose "Auto (Live rate)"
      customGoldPricePerGram:
        formData.hasGold && formData.goldRateSource === 'manual' && formData.manualGoldRate
          ? Number(formData.manualGoldRate)
          : null,

      customSilverPricePerGram:
        formData.hasSilver && formData.silverRateSource === 'manual' && formData.manualSilverRate
          ? Number(formData.manualSilverRate)
          : null,
    },

    liabilities: formData.hasDebtsExpenses
      ? sumDynamicAmounts(formData.debtsExpenses)
      : 0,
  };
};