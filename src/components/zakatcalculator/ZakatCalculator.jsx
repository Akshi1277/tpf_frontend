import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ZakatEstimator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showGold, setShowGold] = useState(false);
  const [showSilver, setShowSilver] = useState(false);
  const [selectedInvestments, setSelectedInvestments] = useState([]);
  const formRef = useRef(null);
  
  const [assets, setAssets] = useState({
    cashSavings: '',
    goldGrams: '',
    goldPrice: '',
    silverGrams: '',
    silverPrice: '',
    businessAssets: '',
    moneyOwed: ''
  });

  const [liabilities, setLiabilities] = useState({
    personalDebts: '',
    businessPayables: '',
    expensesDue: ''
  });

  const [results, setResults] = useState(null);

  const investments = ['Stocks', 'Crypto', 'Mutual Funds', 'Business Equity'];

  const steps = [
    { title: 'Assets', subtitle: 'What You Own' },
    { title: 'Liabilities', subtitle: 'What You Owe' },
    { title: 'Results', subtitle: 'Your Zakat' }
  ];

  const toggleInvestment = (inv) => {
    setSelectedInvestments(prev => 
      prev.includes(inv) ? prev.filter(i => i !== inv) : [...prev, inv]
    );
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
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const calculateZakat = () => {
    const cash = parseFloat(assets.cashSavings) || 0;
    const goldValue = (parseFloat(assets.goldGrams) || 0) * (parseFloat(assets.goldPrice) || 0);
    const silverValue = (parseFloat(assets.silverGrams) || 0) * (parseFloat(assets.silverPrice) || 0);
    const business = parseFloat(assets.businessAssets) || 0;
    const owed = parseFloat(assets.moneyOwed) || 0;
    
    const totalAssets = cash + goldValue + silverValue + business + owed;
    
    const debts = parseFloat(liabilities.personalDebts) || 0;
    const payables = parseFloat(liabilities.businessPayables) || 0;
    const expenses = parseFloat(liabilities.expensesDue) || 0;
    
    const totalLiabilities = debts + payables + expenses;
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
    setAssets({
      cashSavings: '',
      goldGrams: '',
      goldPrice: '',
      silverGrams: '',
      silverPrice: '',
      businessAssets: '',
      moneyOwed: ''
    });
    setLiabilities({
      personalDebts: '',
      businessPayables: '',
      expensesDue: ''
    });
    setSelectedInvestments([]);
    setShowGold(false);
    setShowSilver(false);
    setResults(null);
    setCurrentStep(0);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  // Animation variants
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
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative overflow-hidden min-h-[70vh] sm:min-h-[75vh] flex items-center"
        style={{
          background: 'linear-gradient(180deg, #3D9970 0%, #2D7A5C 40%, #1E5A44 100%)',
        }}
      >
        {/* Decorative patterns */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, rgba(212, 175, 55, 0.3) 0%, transparent 50%), 
                             radial-gradient(circle at 80% 70%, rgba(212, 175, 55, 0.2) 0%, transparent 50%)`
          }} />
        </div>

        {/* Animated decorative elements */}
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
            {/* Islamic Star Icon */}
            {/* <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
              className="mb-6 sm:mb-8 inline-block"
            >
              <svg width="80" height="80" viewBox="0 0 100 100" className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-lg">
                <path
                  d="M50 10 L55 35 L75 25 L60 45 L85 50 L60 55 L75 75 L55 65 L50 90 L45 65 L25 75 L40 55 L15 50 L40 45 L25 25 L45 35 Z"
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M50 25 L53 40 L65 35 L57 48 L70 50 L57 52 L65 65 L53 60 L50 75 L47 60 L35 65 L43 52 L30 50 L43 48 L35 35 L47 40 Z"
                  fill="#D4AF37"
                  opacity="0.9"
                />
              </svg>
            </motion.div> */}

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
              {/* First line of formula */}
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
              
              {/* Second line of formula */}
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

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          {/* Step Indicators */}
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-500 ${
                      index <= currentStep
                        ? 'bg-emerald-600 text-white shadow-lg'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="mt-2 text-center">
                    <p className={`text-xs sm:text-sm font-semibold transition-colors ${
                      index <= currentStep ? 'text-emerald-600' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-400 hidden sm:block">{step.subtitle}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 h-1 mx-2 sm:mx-4 bg-gray-200 rounded-full overflow-hidden -mt-8">
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

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="h-full bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-full"
            />
          </div>
          <div className="flex justify-between mt-2">
            <p className="text-xs text-gray-500">Step {currentStep + 1} of {steps.length}</p>
            <p className="text-xs font-medium text-emerald-600">{Math.round(progressPercentage)}% Complete</p>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div ref={formRef} className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
        <AnimatePresence mode="wait">
          {/* Step 1: Assets */}
          {currentStep === 0 && (
            <motion.div
              key="step1"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
              className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 border border-gray-100"
            >
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  Assets & Possessions
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  Enter everything you own that is subject to Zakat — including cash, gold, investments, and business assets.
                </p>
              </div>

              <div className="space-y-6">
                {/* Cash Savings */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="block text-sm sm:text-base font-semibold mb-2 text-gray-900">
                    Cash & Bank Savings
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 sm:left-4 top-3 sm:top-3.5 text-gray-400 text-sm sm:text-base">$</span>
                    <input
                      type="number"
                      value={assets.cashSavings}
                      onChange={(e) => setAssets({ ...assets, cashSavings: e.target.value })}
                      placeholder="0.00"
                      className="w-full pl-8 sm:pl-9 pr-4 py-3 sm:py-3.5 text-sm sm:text-base rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all"
                    />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1.5">Total cash in hand, bank accounts, and savings</p>
                </motion.div>

                {/* Gold Holdings */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-sm sm:text-base font-semibold mb-3 text-gray-900">
                    Gold Holdings
                  </label>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <button
                      onClick={() => setShowGold(true)}
                      className={`py-3 rounded-xl font-medium transition-all text-sm sm:text-base ${
                        showGold
                          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => {
                        setShowGold(false);
                        setAssets({ ...assets, goldGrams: '', goldPrice: '' });
                      }}
                      className={`py-3 rounded-xl font-medium transition-all text-sm sm:text-base ${
                        !showGold
                          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      No
                    </button>
                  </div>

                  <AnimatePresence>
                    {showGold && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4">
                          <div>
                            <label className="block text-xs sm:text-sm font-medium mb-2 text-gray-700">Weight (grams)</label>
                            <input
                              type="number"
                              value={assets.goldGrams}
                              onChange={(e) => setAssets({ ...assets, goldGrams: e.target.value })}
                              placeholder="0"
                              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-xs sm:text-sm font-medium mb-2 text-gray-700">Price per gram</label>
                            <input
                              type="number"
                              value={assets.goldPrice}
                              onChange={(e) => setAssets({ ...assets, goldPrice: e.target.value })}
                              placeholder="0.00"
                              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Silver Holdings */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm sm:text-base font-semibold mb-3 text-gray-900">
                    Silver Holdings
                  </label>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <button
                      onClick={() => setShowSilver(true)}
                      className={`py-3 rounded-xl font-medium transition-all text-sm sm:text-base ${
                        showSilver
                          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => {
                        setShowSilver(false);
                        setAssets({ ...assets, silverGrams: '', silverPrice: '' });
                      }}
                      className={`py-3 rounded-xl font-medium transition-all text-sm sm:text-base ${
                        !showSilver
                          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      No
                    </button>
                  </div>

                  <AnimatePresence>
                    {showSilver && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4">
                          <div>
                            <label className="block text-xs sm:text-sm font-medium mb-2 text-gray-700">Weight (grams)</label>
                            <input
                              type="number"
                              value={assets.silverGrams}
                              onChange={(e) => setAssets({ ...assets, silverGrams: e.target.value })}
                              placeholder="0"
                              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-xs sm:text-sm font-medium mb-2 text-gray-700">Price per gram</label>
                            <input
                              type="number"
                              value={assets.silverPrice}
                              onChange={(e) => setAssets({ ...assets, silverPrice: e.target.value })}
                              placeholder="0.00"
                              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Investments */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-sm sm:text-base font-semibold mb-3 text-gray-900">
                    Investment Portfolio <span className="text-xs sm:text-sm text-gray-500 font-normal">(Select all that apply)</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {investments.map((inv) => (
                      <button
                        key={inv}
                        onClick={() => toggleInvestment(inv)}
                        className={`py-3 px-4 rounded-xl font-medium transition-all text-sm sm:text-base ${
                          selectedInvestments.includes(inv)
                            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {inv}
                      </button>
                    ))}
                  </div>
                </motion.div>

                {/* Business Assets */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm sm:text-base font-semibold mb-2 text-gray-900">
                    Business Assets & Inventory
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 sm:left-4 top-3 sm:top-3.5 text-gray-400 text-sm sm:text-base">$</span>
                    <input
                      type="number"
                      value={assets.businessAssets}
                      onChange={(e) => setAssets({ ...assets, businessAssets: e.target.value })}
                      placeholder="0.00"
                      className="w-full pl-8 sm:pl-9 pr-4 py-3 sm:py-3.5 text-sm sm:text-base rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all"
                    />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1.5">Value of stock or trade goods intended for sale</p>
                </motion.div>

                {/* Money Owed */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="block text-sm sm:text-base font-semibold mb-2 text-gray-900">
                    Receivables <span className="text-gray-400 text-xs sm:text-sm font-normal">(optional)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 sm:left-4 top-3 sm:top-3.5 text-gray-400 text-sm sm:text-base">$</span>
                    <input
                      type="number"
                      value={assets.moneyOwed}
                      onChange={(e) => setAssets({ ...assets, moneyOwed: e.target.value })}
                      placeholder="0.00"
                      className="w-full pl-8 sm:pl-9 pr-4 py-3 sm:py-3.5 text-sm sm:text-base rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all"
                    />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1.5">Money others owe you that you expect to receive</p>
                </motion.div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={nextStep}
                className="w-full mt-8 py-4 text-sm sm:text-base bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-200 transition-all duration-300"
              >
                Continue to Liabilities
              </motion.button>
            </motion.div>
          )}

          {/* Step 2: Liabilities */}
          {currentStep === 1 && (
            <motion.div
              key="step2"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
              className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 border border-gray-100"
            >
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  Liabilities & Debts
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  Enter your immediate financial obligations and debts that are due within the next year.
                </p>
              </div>

              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="block text-sm sm:text-base font-semibold mb-2 text-gray-900">
                    Personal Debts
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 sm:left-4 top-3 sm:top-3.5 text-gray-400 text-sm sm:text-base">$</span>
                    <input
                      type="number"
                      value={liabilities.personalDebts}
                      onChange={(e) => setLiabilities({ ...liabilities, personalDebts: e.target.value })}
                      placeholder="0.00"
                      className="w-full pl-8 sm:pl-9 pr-4 py-3 sm:py-3.5 text-sm sm:text-base rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all"
                    />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1.5">Loans, credit card debt, and amounts due within 12 months</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-sm sm:text-base font-semibold mb-2 text-gray-900">
                    Business Payables <span className="text-gray-400 text-xs sm:text-sm font-normal">(optional)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 sm:left-4 top-3 sm:top-3.5 text-gray-400 text-sm sm:text-base">$</span>
                    <input
                      type="number"
                      value={liabilities.businessPayables}
                      onChange={(e) => setLiabilities({ ...liabilities, businessPayables: e.target.value })}
                      placeholder="0.00"
                      className="w-full pl-8 sm:pl-9 pr-4 py-3 sm:py-3.5 text-sm sm:text-base rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all"
                    />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1.5">Outstanding payments to suppliers and vendors</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm sm:text-base font-semibold mb-2 text-gray-900">
                    Immediate Expenses <span className="text-gray-400 text-xs sm:text-sm font-normal">(optional)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 sm:left-4 top-3 sm:top-3.5 text-gray-400 text-sm sm:text-base">$</span>
                    <input
                      type="number"
                      value={liabilities.expensesDue}
                      onChange={(e) => setLiabilities({ ...liabilities, expensesDue: e.target.value })}
                      placeholder="0.00"
                      className="w-full pl-8 sm:pl-9 pr-4 py-3 sm:py-3.5 text-sm sm:text-base rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all"
                    />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1.5">Rent, utilities, and bills due in the near term</p>
                </motion.div>
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

          {/* Step 3: Results */}
          {currentStep === 2 && results && (
            <motion.div
              key="step3"
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
                className="bg-gradient-to-r from-emerald-600 to-emerald-500 p-6 sm:p-8 text-center relative overflow-hidden"
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

              <div className="p-6 sm:p-8 md:p-10">
                <div className="space-y-4 mb-8">
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
                      className={`flex justify-between items-center py-4 px-5 rounded-xl transition-all ${
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
                  className={`rounded-xl p-6 mb-6 text-center ${
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
                  className="text-center text-sm text-gray-600 italic mt-6 leading-relaxed"
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