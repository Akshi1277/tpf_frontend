import Assets from "./Assets";
import DebtsOwed from "./DebtsOwed";
import OtherAssets from "./OtherAssets";
import Liabilities from "./Liabilities";
import Results from "./Results";
import GettingStarted from "./GettingStarted";
import HeroSection from "./HeroSection";
import ProgressBar from "./ProgressBar";
import Modals from "./Modals";
import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import { buildZakatPayload } from "@/utils/buildZakatPayload";

// ── Spinner overlay ──
const CalculatingSpinner = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    className="fixed inset-0 z-50 flex items-center justify-center"
    style={{ background: 'rgba(8,26,17,0.85)', backdropFilter: 'blur(6px)' }}
  >
    <div className="flex flex-col items-center gap-5">
      {/* Circular spinner with gold ring */}
      <div className="relative w-16 h-16">
        <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(212,175,55,0.15)" strokeWidth="3" />
          <motion.circle
            cx="32" cy="32" r="28"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="175.93"
            animate={{ strokeDashoffset: [175.93, 0, 175.93] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-6 h-6" viewBox="0 0 100 100" fill="none">
            <polygon points="50,5 61,35 93,35 68,57 79,91 50,70 21,91 32,57 7,35 39,35" fill="#D4AF37" opacity="0.7" />
          </svg>
        </div>
      </div>
      <div className="text-center">
        <p className="text-white font-semibold text-sm">Calculating your Zakat</p>
        <p className="text-white/40 text-xs mt-1">Verifying assets and Nisab threshold…</p>
      </div>
    </div>
  </motion.div>
);

// In ZakatCalculator.jsx — replace the INITIAL_FORM constant with this:

const INITIAL_FORM = {
  cash: '',
  hasGoldSilver: null, hasGold: false, hasSilver: false,
  goldEntries: [{ grams: '', karat: '24' }],   // replaces goldGrams + goldKarat
  silverEntries: [{ grams: '' }],               // replaces silverGrams
  hasInvestments: null, hasStocks: false, hasCrypto: false,
  hasPension: false, hasProperty: false,
  investmentType: '',
  activeInvestmentValue: '', passivePortfolioValue: '',
  hasDividends: null, dividends: ['', '', ''],
  cryptoValue: '', hasAccessToPension: null, pensionValue: '',
  ownsOtherProperty: null, purchasedForResale: null,
  propertyMarketValue: '', rentingProperty: null, rentalIncome: '',
  owedMoney: null, expectPayback: null, owedAmount: '',
  hasOtherAssets: null, otherAssets: ['', ''],
  hasDebtsExpenses: null, debtsExpenses: ['', ''],
};

export default function ZakatCalculator({ darkMode = false }) {
  const [currentStep, setCurrentStep] = useState(-1);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [results, setResults] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const pageTopRef = useRef(null);   // very top of page (for hero)
  const formRef = useRef(null);      // top of form area (for step nav)

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const scrollToForm = useCallback(() => {
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  }, []);

  const steps = [
    { title: 'Assets', subtitle: 'What You Own' },
    { title: 'Debts Owed', subtitle: 'Money Coming In' },
    { title: 'Other Assets', subtitle: 'Additional Wealth' },
    { title: 'Liabilities', subtitle: 'What You Owe' },
    { title: 'Results', subtitle: 'Your Zakat' },
  ];

  const updateFormData = (key, value) =>
    setFormData(prev => ({ ...prev, [key]: value }));

  const nextStep = useCallback(() => {
    setCurrentStep(prev => {
      if (prev < steps.length - 1) return prev + 1;
      return prev;
    });
    scrollToForm();
  }, [scrollToForm]);

  const prevStep = useCallback(() => {
    setCurrentStep(prev => {
      if (prev > -1) return prev - 1;
      return prev;
    });
    scrollToForm();
  }, [scrollToForm]);

  const calculateZakat = async () => {
    setIsCalculating(true);
    try {
      const payload = buildZakatPayload(formData);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/zakat/calculate`,
        payload
      );
      if (!data?.success) throw new Error("Zakat calculation failed");
      setResults({ ...data.data, nisab: data.data.nisabValue });
      setCurrentStep(prev => prev + 1);
      scrollToForm();
    } catch (error) {
      console.error("Zakat calculation error:", error);
    } finally {
      setIsCalculating(false);
    }
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM);
    setResults(null);
    setCurrentStep(-1);
    scrollToTop();
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(amount);

  const isLanding = currentStep === -1;

  return (
    <div ref={pageTopRef} className={`min-h-screen ${isLanding ? '' : darkMode ? 'bg-zinc-900' : 'bg-gray-50'}`}>
      {/* Spinner overlay */}
      <AnimatePresence>
        {isCalculating && <CalculatingSpinner />}
      </AnimatePresence>

      {/* Hero — only on landing */}
      <AnimatePresence>
        {isLanding && (
          <HeroSection onStart={nextStep} formRef={formRef} darkMode={darkMode} />
        )}
      </AnimatePresence>

      {/* Progress bar — only during form steps */}
      {!isLanding && currentStep < steps.length && (
        <ProgressBar currentStep={currentStep} steps={steps} darkMode={darkMode} />
      )}

      <Modals activeModal={activeModal} setActiveModal={setActiveModal} darkMode={darkMode} />

      {/* Form area */}
      <div
        ref={formRef}
        className={`${isLanding ? (darkMode ? 'bg-zinc-900' : 'bg-gray-50') : ''} px-4 sm:px-6 py-6 sm:py-8`}
        style={!isLanding ? { minHeight: 'calc(100vh - 64px)' } : {}}
      >
        <AnimatePresence mode="wait">
          {currentStep === -1 && (
            <GettingStarted key="start" onStart={nextStep} setActiveModal={setActiveModal} darkMode={darkMode} />
          )}
          {currentStep === 0 && (
            <Assets key="assets" formData={formData} updateFormData={updateFormData} onNext={nextStep} setActiveModal={setActiveModal} darkMode={darkMode} />
          )}
          {currentStep === 1 && (
            <DebtsOwed key="debts" formData={formData} updateFormData={updateFormData} onNext={nextStep} onBack={prevStep} darkMode={darkMode} />
          )}
          {currentStep === 2 && (
            <OtherAssets key="other" formData={formData} updateFormData={updateFormData} onNext={nextStep} onBack={prevStep} setActiveModal={setActiveModal} darkMode={darkMode} />
          )}
          {currentStep === 3 && (
            <Liabilities key="liabilities" formData={formData} updateFormData={updateFormData} onCalculate={calculateZakat} onBack={prevStep} setActiveModal={setActiveModal} darkMode={darkMode} />
          )}
          {currentStep === 4 && results && (
            <Results key="results" results={results} onReset={resetForm} formatCurrency={formatCurrency} darkMode={darkMode} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}