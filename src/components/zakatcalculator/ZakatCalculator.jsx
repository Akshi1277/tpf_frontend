import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center  justify-center p-4 shadow-2xl backdrop-blur bg-opacity-200"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        >
          <div className="sticky top-0 bg-gradient-to-r from-emerald-600 to-emerald-500 p-6 rounded-t-2xl">
            <div className="flex justify-between items-center">
              <h3 className="text-xl sm:text-2xl font-bold text-white">{title}</h3>
              <button
                onClick={onClose}
                className="text-white hover:text-emerald-100 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div className="p-6 sm:p-8">
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Info Button Component
const InfoButton = ({ onClick, text = "Learn more" }) => (
  <button
    onClick={onClick}
    className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors"
  >
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span className="underline">{text}</span>
  </button>
);

// Yes/No Toggle Component
const YesNoToggle = ({ value, onChange, yesLabel = "Yes", noLabel = "No" }) => (
  <div className="grid grid-cols-2 gap-3 sm:gap-4">
    <button
      onClick={() => onChange(true)}
      className={`py-3 rounded-xl font-medium transition-all text-sm sm:text-base ${
        value
          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {yesLabel}
    </button>
    <button
      onClick={() => onChange(false)}
      className={`py-3 rounded-xl font-medium transition-all text-sm sm:text-base ${
        !value
          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {noLabel}
    </button>
  </div>
);

// Input Field Component
const InputField = ({ label, value, onChange, placeholder = "0.00", type = "number", helperText, prefix = "₹" }) => (
  <div>
    <label className="block text-sm sm:text-base font-semibold mb-2 text-gray-900">
      {label}
    </label>
    <div className="relative">
      <span className="absolute left-3 sm:left-4 top-3 sm:top-3.5 text-gray-400 text-sm sm:text-base">{prefix}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-8 sm:pl-9 pr-4 py-3 sm:py-3.5 text-sm sm:text-base rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all"
      />
    </div>
    {helperText && <p className="text-xs sm:text-sm text-gray-500 mt-1.5">{helperText}</p>}
  </div>
);

// Multi-field Adder Component
const MultiFieldAdder = ({ fields, setFields, fieldLabels, placeholder = "Add item" }) => {
  const addField = () => {
    setFields([...fields, ...fieldLabels.map(() => '')]);
  };

  const removeField = (index) => {
    const newFields = [...fields];
    newFields.splice(index * fieldLabels.length, fieldLabels.length);
    setFields(newFields);
  };

  const updateField = (index, labelIndex, value) => {
    const newFields = [...fields];
    newFields[index * fieldLabels.length + labelIndex] = value;
    setFields(newFields);
  };

  const groupCount = Math.ceil(fields.length / fieldLabels.length);

  return (
    <div className="space-y-4">
      {[...Array(groupCount)].map((_, groupIndex) => (
        <div key={groupIndex} className="bg-gray-50 p-4 rounded-xl space-y-3">
          {fieldLabels.map((label, labelIndex) => (
            <div key={labelIndex}>
              <label className="block text-xs sm:text-sm font-medium mb-2 text-gray-700">{label}</label>
              <input
                type={label.toLowerCase().includes('amount') || label.toLowerCase().includes('value') ? 'number' : 'text'}
                value={fields[groupIndex * fieldLabels.length + labelIndex] || ''}
                onChange={(e) => updateField(groupIndex, labelIndex, e.target.value)}
                placeholder={placeholder}
                className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all"
              />
            </div>
          ))}
          {groupCount > 1 && (
            <button
              onClick={() => removeField(groupIndex)}
              className="text-red-600 hover:text-red-700 font-medium text-sm flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Remove
            </button>
          )}
        </div>
      ))}
      <button
        onClick={addField}
        className="w-full py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-medium rounded-xl transition-all flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add Another
      </button>
    </div>
  );
};

export default function ZakatCalculator() {
  const [currentStep, setCurrentStep] = useState(-1); // -1 for getting started
  const formRef = useRef(null);
  const [activeModal, setActiveModal] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    // Assets
    cash: '',
    hasGoldSilver: null,
    hasGold: false,
    hasSilver: false,
    goldGrams: '',
    goldValue: '',
    silverGrams: '',
    silverValue: '',
    
    // Investments
    hasInvestments: null,
    hasStocks: false,
    hasCrypto: false,
    hasPension: false,
    hasProperty: false,
    
    // Stocks
    activeInvestmentValue: '',
    passiveStocks: ['', ''], // [name, amount] pairs
    hasDividends: null,
    dividends: ['', '', ''], // [name, amount per share, number of shares]
    
    // Crypto
    cryptoValue: '',
    
    // Pension
    hasAccessToPension: null,
    pensionValue: '',
    
    // Property
    ownsOtherProperty: null,
    purchasedForResale: null,
    propertyMarketValue: '',
    rentingProperty: null,
    rentalIncome: '',
    
    // Debts Owed
    owedMoney: null,
    expectPayback: null,
    owedAmount: '',
    
    // Other Assets
    hasOtherAssets: null,
    otherAssets: ['', ''], // [description, value] pairs
    
    // Debts & Expenses
    hasDebtsExpenses: null,
    debtsExpenses: ['', ''] // [description, amount] pairs
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
    // Calculate total assets
    let totalAssets = parseFloat(formData.cash) || 0;
    
    // Gold & Silver
    if (formData.hasGold) {
      totalAssets += (parseFloat(formData.goldGrams) || 0) * (parseFloat(formData.goldValue) || 0);
    }
    if (formData.hasSilver) {
      totalAssets += (parseFloat(formData.silverGrams) || 0) * (parseFloat(formData.silverValue) || 0);
    }
    
    // Investments
    if (formData.hasStocks) {
      totalAssets += parseFloat(formData.activeInvestmentValue) || 0;
      // Passive stocks (30% zakatable)
      for (let i = 1; i < formData.passiveStocks.length; i += 2) {
        totalAssets += (parseFloat(formData.passiveStocks[i]) || 0) * 0.3;
      }
      // Dividends
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
    
    // Debts owed to you
    if (formData.owedMoney && formData.expectPayback) {
      totalAssets += parseFloat(formData.owedAmount) || 0;
    }
    
    // Other assets
    if (formData.hasOtherAssets) {
      for (let i = 1; i < formData.otherAssets.length; i += 2) {
        totalAssets += parseFloat(formData.otherAssets[i]) || 0;
      }
    }
    
    // Calculate liabilities
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

  const progressPercentage = currentStep === -1 ? 0 : ((currentStep + 1) / steps.length) * 100;

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section - Unchanged */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative overflow-hidden min-h-[70vh] sm:min-h-[75vh] flex items-center"
        style={{
          background: 'linear-gradient(180deg, #3D9970 0%, #2D7A5C 40%, #1E5A44 100%)',
        }}
      >
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, rgba(212, 175, 55, 0.3) 0%, transparent 50%), 
                             radial-gradient(circle at 80% 70%, rgba(212, 175, 55, 0.2) 0%, transparent 50%)`
          }} />
        </div>

        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(212, 175, 55, 0.4) 0%, transparent 70%)' }}
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, transparent 70%)' }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24 text-center w-full">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 sm:mb-12"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl sm:text-2xl md:text-3xl mb-6 sm:mb-8 font-arabic"
              style={{ color: '#D4AF37' }}
            >
              بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ
            </motion.div>
            
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 px-4"
              style={{ 
                color: '#FFFFFF',
                textShadow: '0 2px 20px rgba(0,0,0,0.2)'
              }}
            >
              Calculate
              <br />
              <span style={{ color: '#D4AF37' }}>your Zakat</span>
            </motion.h1>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4"
              style={{ color: 'rgba(255, 255, 255, 0.9)' }}
            >
              To determine how much Zakat is due,
              <br className="hidden sm:block" />
              we'll use a simple formula.
            </motion.p>
          </motion.div>

          {/* Formula Card */}
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 max-w-3xl mx-auto border"
            style={{
              background: 'rgba(255, 255, 255, 0.98)',
              borderColor: 'rgba(212, 175, 55, 0.2)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
            }}
          >
            <div className="space-y-5 sm:space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 text-base sm:text-lg md:text-xl font-medium">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                  className="text-gray-700 font-semibold"
                >
                  Your total <span style={{ color: '#2D7A5C' }}>assets</span>
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 }}
                  className="text-2xl sm:text-3xl font-bold"
                  style={{ color: '#D4AF37' }}
                >
                  −
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 }}
                  className="text-gray-700 font-semibold"
                >
                  Your immediate <span style={{ color: '#2D7A5C' }}>debts</span>
                </motion.span>
              </div>

              <motion.div
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ delay: 1.2 }}
                className="flex items-center justify-center"
              >
                <span className="text-2xl sm:text-3xl font-bold" style={{ color: '#D4AF37' }}>=</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
                className="text-lg sm:text-xl md:text-2xl font-bold py-3 px-6 rounded-xl inline-block"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(45, 122, 92, 0.1) 0%, rgba(212, 175, 55, 0.1) 100%)',
                  color: '#2D7A5C'
                }}
              >
                Your Zakatable wealth
              </motion.div>
              
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="h-px mx-auto w-3/4"
                style={{ background: 'linear-gradient(90deg, transparent 0%, #D4AF37 50%, transparent 100%)' }}
              />
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 text-base sm:text-lg md:text-xl font-medium pt-2">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5 }}
                  className="text-gray-700 font-semibold"
                >
                  If your Zakatable wealth is equal to, or above <span style={{ color: '#2D7A5C' }}>the nisab</span>
                </motion.span>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 }}
                className="text-sm sm:text-base text-gray-600 italic"
              >
                and you've had it for at least one lunar year, zakat is due.
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ delay: 1.7 }}
                className="flex items-center justify-center gap-4 py-4"
              >
                <div className="flex items-center gap-3 text-lg sm:text-xl">
                  <span className="font-semibold text-gray-700">Zakatable wealth</span>
                  <span className="text-2xl font-bold" style={{ color: '#D4AF37' }}>×</span>
                  <span className="font-bold text-xl sm:text-2xl" style={{ color: '#D4AF37' }}>2.5%</span>
                  <span className="text-2xl font-bold" style={{ color: '#D4AF37' }}>=</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.8 }}
                className="text-xl sm:text-2xl md:text-3xl font-bold py-4 px-8 rounded-xl"
                style={{ 
                  background: 'linear-gradient(135deg, #2D7A5C 0%, #1E5A44 100%)',
                  color: '#D4AF37',
                  boxShadow: '0 4px 20px rgba(45, 122, 92, 0.3)'
                }}
              >
                Your zakat due
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Progress Bar - Only show after getting started */}
      {currentStep >= 0 && (
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3">
            <div className="flex items-center justify-between mb-3">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-500 ${
                        index <= currentStep
                          ? 'bg-emerald-600 text-white shadow-lg'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div className="mt-1 text-center hidden sm:block">
                      <p className={`text-xs font-semibold transition-colors ${
                        index <= currentStep ? 'text-emerald-600' : 'text-gray-400'
                      }`}>
                        {step.title}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex-1 h-0.5 mx-2 sm:mx-3 bg-gray-200 rounded-full overflow-hidden -mt-4 sm:-mt-6">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: index < currentStep ? '100%' : '0%' }}
                        transition={{ duration: 0.5 }}
                        className="h-full bg-emerald-600"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="h-full bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-full"
              />
            </div>
            <div className="flex justify-between mt-1.5">
              <p className="text-xs text-gray-500">Step {currentStep + 1} of {steps.length}</p>
              <p className="text-xs font-medium text-emerald-600">{Math.round(progressPercentage)}% Complete</p>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <Modal
        isOpen={activeModal === 'documents'}
        onClose={() => setActiveModal(null)}
        title="Documents to Have Ready"
      >
        <div className="space-y-4">
          <p className="text-gray-600 mb-6">Here's a list of documents that would be good to have on hand. You may need them as you fill out this calculator.</p>
          <div className="space-y-3">
            {['Bank statements', 'Jeweler invoices', 'Stocks & dividends', 'Retirement accounts'].map((doc, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  {idx + 1}
                </div>
                <span className="text-gray-800 font-medium">{doc}</span>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === 'goldSilver'}
        onClose={() => setActiveModal(null)}
        title="How to Calculate Gold & Silver"
      >
        <p className="text-gray-700 leading-relaxed">
          If you own jewelry with gold or silver mixed with other metals and precious stones, go to your local jeweler and ask them to weigh your gold and silver from the jewelry.
        </p>
      </Modal>

      <Modal
        isOpen={activeModal === 'investments'}
        onClose={() => setActiveModal(null)}
        title="Example Investments"
      >
        <div className="space-y-4">
          <p className="text-gray-600 mb-4">You may be familiar with the following types of investments:</p>
          <ul className="space-y-2">
            {['Stocks/shares', '401k/IRA/ESA', 'RRSP/RESP', 'Real Estate investments', 'Retirement funds'].map((inv, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <span className="text-gray-700">{inv}</span>
              </li>
            ))}
          </ul>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === 'activePassive'}
        onClose={() => setActiveModal(null)}
        title="Active vs Passive Investment"
      >
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>If you own stocks, you may be actively trading in the market as a swing or day trader. If that describes you, you are an <strong>active investor</strong>.</p>
          <p>If you are buying and holding stock, then you are a <strong>passive investor</strong>.</p>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === 'passiveCalc'}
        onClose={() => setActiveModal(null)}
        title="Passive Investment Calculation"
      >
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>Only the zakatable assets of the shares are liable for Zakat. Scholars, including Sh. Joe Bradford, have allowed approximating this number to <strong>30% of the market value</strong> of your stocks.</p>
          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 my-4">
            <p className="font-medium text-emerald-900 mb-2">Example:</p>
            <p>If the value of your portfolio at Costco Wholesale Corp. (COST) is $5,000:</p>
            <p className="mt-2">$5,000 × 30% = <strong>$1,500</strong></p>
            <p className="mt-2 text-sm">Your zakatable assets for your Costco portfolio are $1,500.</p>
          </div>
          <p className="text-sm italic">Please enter the total value of your stock, and we will handle all the calculations.</p>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === 'crypto'}
        onClose={() => setActiveModal(null)}
        title="Cryptocurrency Zakat"
      >
        <p className="text-gray-700 leading-relaxed">
          Zakat is due on the market value of your crypto, regardless of whether your currency holdings are tokens (utility or work) or exchangeable coins.
        </p>
      </Modal>

      <Modal
        isOpen={activeModal === 'pension'}
        onClose={() => setActiveModal(null)}
        title="Pension & Retirement Savings"
      >
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>Depending on your country of residence, your pension funds and retirement savings may have a different name.</p>
          <p>There is a simple rule to follow when it comes to paying Zakat on it: <strong>If you have access to the funds, Zakat is paid on it.</strong></p>
          <p>Only the zakatable assets of the funds are liable for Zakat. Scholars, including Sh. Joe Bradford, have allowed approximating this number to <strong>30% of the market value</strong> of your funds.</p>
          <p className="font-medium">If you don't have access to control or withdraw those funds, you only pay Zakat upon maturity when you have access.</p>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === 'otherAssets'}
        onClose={() => setActiveModal(null)}
        title="Other Assets Examples"
      >
        <div className="space-y-4">
          <p className="text-gray-600 mb-4">You may have the following types of assets:</p>
          <ul className="space-y-2">
            {['Business inventory', 'International bank accounts', 'Livestock and food crops'].map((asset, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <span className="text-gray-700">{asset}</span>
              </li>
            ))}
          </ul>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === 'immediatelyPayable'}
        onClose={() => setActiveModal(null)}
        title="What Does Immediately Payable Mean?"
      >
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p><strong>Immediately due</strong> means your next payment on your expenses.</p>
          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 my-4">
            <p className="font-medium text-emerald-900 mb-2">Example:</p>
            <p>If you pay your car insurance monthly, you will deduct one month of car insurance payment.</p>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === 'commonExpenses'}
        onClose={() => setActiveModal(null)}
        title="Common Expenses"
      >
        <div className="space-y-4">
          <p className="text-gray-600 mb-4">You may have the following types of expenses:</p>
          <div className="space-y-4">
            {[
              { title: 'Housing', desc: 'Upcoming rent or mortgage payments' },
              { title: 'Insurance', desc: 'Upcoming home, auto and medical insurance payments' },
              { title: 'Utilities', desc: 'Upcoming energy, water and internet bills' },
              { title: 'Transportation', desc: 'Upcoming car payments' }
            ].map((expense, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-1">{expense.title}</h4>
                <p className="text-sm text-gray-600">{expense.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-sm italic text-gray-600 mt-4">Your next upcoming expense is what is deducted.</p>
        </div>
      </Modal>

      {/* Form Content */}
      <div ref={formRef} className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <AnimatePresence mode="wait">
          {/* Getting Started Page */}
          {currentStep === -1 && (
            <motion.div
              key="getting-started"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
              className="bg-white rounded-2xl shadow-xl p-5 sm:p-6 md:p-8 border border-gray-100"
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  Before You Get Started
                </h2>
                <p className="text-base text-gray-600">
                  Let's make sure you have everything you need
                </p>
              </div>

              {/* Documents Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-5 mb-4 border-2 border-emerald-200"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Documents to Have Ready
                </h3>
                <button
                  onClick={() => setActiveModal('documents')}
                  className="text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-2 group text-sm"
                >
                  <span>View the full list</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </motion.div>

              {/* Privacy Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-blue-50 rounded-xl p-5 mb-6 border-2 border-blue-200"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  We Value Your Privacy
                </h3>
                <p className="text-gray-700 mb-2 text-sm">
                  Your financial information is completely secure and never stored on our servers.
                </p>
                <a href="#" className="text-blue-700 hover:text-blue-800 font-semibold underline text-sm">
                  Read our Privacy Policy
                </a>
              </motion.div>

              {/* Bismillah Section */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center mb-6"
              >
                <div className="text-2xl sm:text-3xl mb-3" style={{ color: '#D4AF37' }}>
                  بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ
                </div>
                <p className="text-gray-600 italic text-sm">In the name of Allah, the Most Gracious, the Most Merciful</p>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={nextStep}
                className="w-full py-4 text-base bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 transition-all duration-300"
              >
                Start Calculating Zakat
              </motion.button>
            </motion.div>
          )}

          {/* Step 1: Assets */}
          {currentStep === 0 && (
            <motion.div
              key="step1"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
              className="bg-white rounded-2xl shadow-xl p-5 sm:p-6 md:p-8 border border-gray-100"
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
                onClick={nextStep}
                className="w-full mt-8 py-4 text-sm sm:text-base bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-200 transition-all duration-300"
              >
                Continue to Debts Owed
              </motion.button>
            </motion.div>
          )}

          {/* Step 2: Debts Owed to You */}
          {currentStep === 1 && (
            <motion.div
              key="step2"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
              className="bg-white rounded-2xl shadow-xl p-5 sm:p-6 md:p-8 border border-gray-100"
            >
              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  Debts Owed to You
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  Money that others owe you
                </p>
              </div>

              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="block text-sm font-medium mb-3 text-gray-700">
                    Does anyone owe money to you?
                  </label>
                  <YesNoToggle
                    value={formData.owedMoney}
                    onChange={(val) => updateFormData('owedMoney', val)}
                  />
                </motion.div>

                <AnimatePresence>
                  {formData.owedMoney && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden space-y-4"
                    >
                      <div>
                        <label className="block text-sm font-medium mb-3 text-gray-700">
                          Do you expect them to pay you back?
                        </label>
                        <YesNoToggle
                          value={formData.expectPayback}
                          onChange={(val) => updateFormData('expectPayback', val)}
                        />
                      </div>

                      {formData.expectPayback === true && (
                        <InputField
                          label="Amount Owed"
                          value={formData.owedAmount}
                          onChange={(val) => updateFormData('owedAmount', val)}
                          helperText="Total amount you expect to receive"
                        />
                      )}

                      {formData.expectPayback === false && (
                        <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200">
                          <p className="text-sm text-gray-700">Zakat is not due on debts you don't expect to recover.</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {formData.owedMoney === false && (
                  <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200">
                    <p className="text-sm text-gray-700">No zakat is payable on debts owed to you.</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={prevStep}
                  className="w-full sm:w-auto px-8 py-4 text-sm sm:text-base bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all"
                >
                  Back
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={nextStep}
                  className="flex-1 py-4 text-sm sm:text-base bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-200 transition-all duration-300"
                >
                  Continue to Other Assets
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Other Assets */}
          {currentStep === 2 && (
            <motion.div
              key="step3"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
              className="bg-white rounded-2xl shadow-xl p-5 sm:p-6 md:p-8 border border-gray-100"
            >
              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  Other Assets
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  Any additional wealth not mentioned previously
                </p>
              </div>

              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700">
                      Do you own any other assets not mentioned above?
                    </label>
                    <InfoButton onClick={() => setActiveModal('otherAssets')} text="See list of other assets" />
                  </div>
                  
                  <YesNoToggle
                    value={formData.hasOtherAssets}
                    onChange={(val) => updateFormData('hasOtherAssets', val)}
                  />
                </motion.div>

                <AnimatePresence>
                  {formData.hasOtherAssets && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <MultiFieldAdder
                        fields={formData.otherAssets}
                        setFields={(val) => updateFormData('otherAssets', val)}
                        fieldLabels={['Description', 'Cash Value']}
                        placeholder="Describe asset / Enter value"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {formData.hasOtherAssets === false && (
                  <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200">
                    <p className="text-sm text-gray-700">No additional assets to report.</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={prevStep}
                  className="w-full sm:w-auto px-8 py-4 text-sm sm:text-base bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all"
                >
                  Back
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={nextStep}
                  className="flex-1 py-4 text-sm sm:text-base bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-200 transition-all duration-300"
                >
                  Continue to Debts & Expenses
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Debts & Expenses */}
          {currentStep === 3 && (
            <motion.div
              key="step4"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
              className="bg-white rounded-2xl shadow-xl p-5 sm:p-6 md:p-8 border border-gray-100"
            >
              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  Debts & Expenses
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  Only include what is due right now
                </p>
              </div>

              <div className="space-y-6">
                {/* Info Boxes */}
                <div className="space-y-3">
                  <div className="bg-amber-50 p-4 rounded-xl border-2 border-amber-200">
                    <p className="text-sm text-gray-700">
                      <strong>Important:</strong> Make sure to only include what is due right now. For example, rent of this month, not annual rent.
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <InfoButton onClick={() => setActiveModal('immediatelyPayable')} text="What does immediately payable mean?" />
                    <InfoButton onClick={() => setActiveModal('commonExpenses')} text="See common expenses" />
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-4"
                >
                  <label className="block text-sm font-medium text-gray-700">
                    Do you have any expenses or debts?
                  </label>
                  
                  <YesNoToggle
                    value={formData.hasDebtsExpenses}
                    onChange={(val) => updateFormData('hasDebtsExpenses', val)}
                  />
                </motion.div>

                <AnimatePresence>
                  {formData.hasDebtsExpenses && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <MultiFieldAdder
                        fields={formData.debtsExpenses}
                        setFields={(val) => updateFormData('debtsExpenses', val)}
                        fieldLabels={['Expense/Debt Description', 'Amount Due']}
                        placeholder="Enter description / Enter amount"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {formData.hasDebtsExpenses === false && (
                  <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200">
                    <p className="text-sm text-gray-700">No immediate debts or expenses to deduct.</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={prevStep}
                  className="w-full sm:w-auto px-8 py-4 text-sm sm:text-base bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all"
                >
                  Back
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={calculateZakat}
                  className="flex-1 py-4 text-sm sm:text-base bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-200 transition-all duration-300"
                >
                  Calculate Zakat
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Step 5: Results */}
          {currentStep === 4 && results && (
            <motion.div
              key="step5"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
            >
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-r from-emerald-600 to-emerald-500 p-5 sm:p-6 text-center relative overflow-hidden"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"
                />
                <div className="relative">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    Zakat Calculation Complete
                  </h2>
                  <p className="text-emerald-50 text-sm sm:text-base">Your detailed breakdown</p>
                </div>
              </motion.div>

              <div className="p-5 sm:p-6 md:p-8">
                <div className="space-y-3 mb-6">
                  {[
                    { label: 'Total Assets', value: results.totalAssets, delay: 0.3 },
                    { label: 'Total Liabilities', value: results.totalLiabilities, delay: 0.4, negative: true },
                    { label: 'Net Zakatable Wealth', value: results.zakatableWealth, delay: 0.5, highlight: true },
                    { label: 'Nisab Threshold', value: results.nisab, delay: 0.6, small: true },
                    { label: 'Zakat Due (2.5%)', value: results.zakatDue, delay: 0.7, zakat: true }
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: item.delay }}
                      className={`flex justify-between items-center py-3 px-4 rounded-xl transition-all ${
                        item.highlight ? 'bg-emerald-50 border-2 border-emerald-200' :
                        item.zakat ? 'bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-300' :
                        'border-b border-gray-100'
                      }`}
                    >
                      <span className={`font-semibold text-sm sm:text-base ${
                        item.small ? 'text-gray-600' : 'text-gray-800'
                      }`}>
                        {item.label}
                      </span>
                      <span className={`font-bold text-lg sm:text-xl ${
                        item.zakat ? 'text-emerald-700' :
                        item.highlight ? 'text-emerald-600' :
                        item.negative ? 'text-red-600' :
                        'text-gray-900'
                      }`}>
                        {item.negative && '−'}{formatCurrency(Math.abs(item.value))}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className={`rounded-xl p-5 mb-5 text-center ${
                    results.isEligible 
                      ? 'bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-200'
                      : 'bg-blue-50 border-2 border-blue-200'
                  }`}
                >
                  <p className={`text-sm sm:text-base font-medium leading-relaxed ${
                    results.isEligible ? 'text-emerald-900' : 'text-blue-900'
                  }`}>
                    {results.isEligible 
                      ? "Your wealth exceeds the Nisab threshold. Zakat is obligatory if you have held this wealth for one lunar year."
                      : "Your wealth is below the Nisab threshold. Zakat is not obligatory at this time, though voluntary charity (Sadaqah) is always encouraged."}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <button className="flex-1 py-4 text-sm sm:text-base bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-200 transition-all">
                    Save Calculation
                  </button>
                  <button
                    onClick={resetForm}
                    className="flex-1 py-4 text-sm sm:text-base bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all"
                  >
                    Start New Calculation
                  </button>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-center text-sm text-gray-600 italic mt-5 leading-relaxed"
                >
                  May your contribution bring blessings to you and those in need.
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}