import Assets from "./Assets";
import DebtsOwed from "./DebtsOwed";
import OtherAssets from "./OtherAssets";
import Liabilities from "./Liabilities";
import Results from "./Results";
import GettingStarted from "./GettingStarted";
import HeroSection from "./HeroSection";
import ProgressBar from "./ProgressBar";
import Modals from "./Modals";
import { Modal } from "./SharedComponents";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ===== MAIN COMPONENT =====
export default function ZakatCalculator() {
  const [currentStep, setCurrentStep] = useState(-1);
  const formRef = useRef(null);
  const [activeModal, setActiveModal] = useState(null);
  
  const [formData, setFormData] = useState({
    cash: '',
    hasGoldSilver: null,
    hasGold: false,
    hasSilver: false,
    goldGrams: '',
    goldValue: '',
    silverGrams: '',
    silverValue: '',
    hasInvestments: null,
    hasStocks: false,
    hasCrypto: false,
    hasPension: false,
    hasProperty: false,
    activeInvestmentValue: '',
    passiveStocks: ['', ''],
    hasDividends: null,
    dividends: ['', '', ''],
    cryptoValue: '',
    hasAccessToPension: null,
    pensionValue: '',
    ownsOtherProperty: null,
    purchasedForResale: null,
    propertyMarketValue: '',
    rentingProperty: null,
    rentalIncome: '',
    owedMoney: null,
    expectPayback: null,
    owedAmount: '',
    hasOtherAssets: null,
    otherAssets: ['', ''],
    hasDebtsExpenses: null,
    debtsExpenses: ['', '']
  });

  const [results, setResults] = useState(null);

  const steps = [
    { title: 'Assets', subtitle: 'What You Own' },
    { title: 'Debts Owed', subtitle: 'Money Coming In' },
    { title: 'Other Assets', subtitle: 'Additional Wealth' },
    { title: 'Liabilities', subtitle: 'What You Owe' },
    { title: 'Results', subtitle: 'Your Zakat' }
  ];

  const updateFormData = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const prevStep = () => {
    if (currentStep > -1) {
      setCurrentStep(currentStep - 1);
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const calculateZakat = () => {
    let totalAssets = parseFloat(formData.cash) || 0;
    
    if (formData.hasGold) {
      totalAssets += (parseFloat(formData.goldGrams) || 0) * (parseFloat(formData.goldValue) || 0);
    }
    if (formData.hasSilver) {
      totalAssets += (parseFloat(formData.silverGrams) || 0) * (parseFloat(formData.silverValue) || 0);
    }
    
    if (formData.hasStocks) {
      totalAssets += parseFloat(formData.activeInvestmentValue) || 0;
      for (let i = 1; i < formData.passiveStocks.length; i += 2) {
        totalAssets += (parseFloat(formData.passiveStocks[i]) || 0) * 0.3;
      }
      if (formData.hasDividends) {
        for (let i = 0; i < formData.dividends.length; i += 3) {
          const perShare = parseFloat(formData.dividends[i + 1]) || 0;
          const shares = parseFloat(formData.dividends[i + 2]) || 0;
          totalAssets += perShare * shares;
        }
      }
    }
    
    if (formData.hasCrypto) {
      totalAssets += parseFloat(formData.cryptoValue) || 0;
    }
    
    if (formData.hasPension && formData.hasAccessToPension) {
      totalAssets += (parseFloat(formData.pensionValue) || 0) * 0.3;
    }
    
    if (formData.hasProperty) {
      if (formData.purchasedForResale) {
        totalAssets += parseFloat(formData.propertyMarketValue) || 0;
      }
      if (formData.rentingProperty) {
        totalAssets += parseFloat(formData.rentalIncome) || 0;
      }
    }
    
    if (formData.owedMoney && formData.expectPayback) {
      totalAssets += parseFloat(formData.owedAmount) || 0;
    }
    
    if (formData.hasOtherAssets) {
      for (let i = 1; i < formData.otherAssets.length; i += 2) {
        totalAssets += parseFloat(formData.otherAssets[i]) || 0;
      }
    }
    
    let totalLiabilities = 0;
    if (formData.hasDebtsExpenses) {
      for (let i = 1; i < formData.debtsExpenses.length; i += 2) {
        totalLiabilities += parseFloat(formData.debtsExpenses[i]) || 0;
      }
    }
    
    const zakatableWealth = totalAssets - totalLiabilities;
    const nisab = 5950;
    const zakatDue = zakatableWealth >= nisab ? zakatableWealth * 0.025 : 0;
    
    setResults({
      totalAssets,
      totalLiabilities,
      zakatableWealth,
      nisab,
      zakatDue,
      isEligible: zakatableWealth >= nisab
    });
    
    nextStep();
  };

  const resetForm = () => {
    setFormData({
      cash: '',
      hasGoldSilver: null,
      hasGold: false,
      hasSilver: false,
      goldGrams: '',
      goldValue: '',
      silverGrams: '',
      silverValue: '',
      hasInvestments: null,
      hasStocks: false,
      hasCrypto: false,
      hasPension: false,
      hasProperty: false,
      activeInvestmentValue: '',
      passiveStocks: ['', ''],
      hasDividends: null,
      dividends: ['', '', ''],
      cryptoValue: '',
      hasAccessToPension: null,
      pensionValue: '',
      ownsOtherProperty: null,
      purchasedForResale: null,
      propertyMarketValue: '',
      rentingProperty: null,
      rentalIncome: '',
      owedMoney: null,
      expectPayback: null,
      owedAmount: '',
      hasOtherAssets: null,
      otherAssets: ['', ''],
      hasDebtsExpenses: null,
      debtsExpenses: ['', '']
    });
    setResults(null);
    setCurrentStep(-1);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <HeroSection onStart={nextStep} />
      
      <ProgressBar currentStep={currentStep} steps={steps} />
      
      <Modals activeModal={activeModal} setActiveModal={setActiveModal} />

      <div ref={formRef} className="max-w-4xl mx-auto md:pb-64 px-4 sm:px-6 py-4 sm:py-6">
        <AnimatePresence mode="wait">
          {currentStep === -1 && (
            <GettingStarted onStart={nextStep} setActiveModal={setActiveModal} />
          )}

          {currentStep === 0 && (
            <Assets 
              formData={formData}
              updateFormData={updateFormData}
              onNext={nextStep}
              setActiveModal={setActiveModal}
            />
          )}

          {currentStep === 1 && (
            <DebtsOwed
              formData={formData}
              updateFormData={updateFormData}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}

          {currentStep === 2 && (
            <OtherAssets
              formData={formData}
              updateFormData={updateFormData}
              onNext={nextStep}
              onBack={prevStep}
              setActiveModal={setActiveModal}
            />
          )}

          {currentStep === 3 && (
            <Liabilities
              formData={formData}
              updateFormData={updateFormData}
              onCalculate={calculateZakat}
              onBack={prevStep}
              setActiveModal={setActiveModal}
            />
          )}

          {currentStep === 4 && results && (
            <Results
              results={results}
              onReset={resetForm}
              formatCurrency={formatCurrency}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}