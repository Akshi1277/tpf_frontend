"use client"
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import LoginModal from "../login/LoginModal"
import { useAskFAQQuestionMutation, useGetAnsweredFAQsQuery } from '@/utils/slices/faqApiSlice';
import { ChevronLeft, ChevronRight, HelpCircle, X, Send, Search, ChevronDown } from 'lucide-react';
// Interactive Search Component
function InteractiveSearchSection({ darkMode, isInView, faqData, dynamicFAQs }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [stage, setStage] = useState('initial'); // initial, result, feedback, question
  const [userQuestion, setUserQuestion] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingSubmit, setPendingSubmit] = useState(false);
  const user = useSelector(state => state.auth.userInfo);
  const [askQuestion, { isLoading }] = useAskFAQQuestionMutation();

  const searchFAQs = (query) => {
    if (!query.trim()) return null;

    const lowerQuery = query.toLowerCase();
    const queryWords = lowerQuery.split(/\s+/).filter(w => w.length > 2);

    let bestMatch = null;
    let highestScore = 0;

    // Combine static and dynamic FAQs for searching
    const allFAQs = [];
    Object.keys(faqData).forEach(cat => {
      faqData[cat].forEach(faq => allFAQs.push({ ...faq, category: cat }));
    });
    dynamicFAQs?.forEach(faq => allFAQs.push({ ...faq, dynamic: true }));

    allFAQs.forEach(faq => {
      const qLower = faq.q?.toLowerCase() || "";
      const aLower = faq.a?.toLowerCase() || "";

      let score = 0;

      // Exact matching scores higher
      if (qLower.includes(lowerQuery)) score += 20;
      if (aLower.includes(lowerQuery)) score += 10;

      // Keyword matching
      queryWords.forEach(word => {
        if (qLower.includes(word)) score += 5;
        if (aLower.includes(word)) score += 2;

        // Bonus for word equality (start of word)
        if (qLower.split(/\W+/).some(w => w === word)) score += 10;
      });

      if (score > highestScore) {
        highestScore = score;
        bestMatch = faq;
      }
    });

    // Minimum score threshold to avoid unrelated results
    return highestScore > 5 ? bestMatch : null;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const result = searchFAQs(searchQuery);
    setSearchResult(result);
    setStage('result');
  };

  const handleFeedback = (helpful) => {
    if (helpful) {
      setStage('thankYou');
      setTimeout(() => {
        setStage('initial');
        setSearchQuery('');
        setSearchResult(null);
      }, 3000);
    } else {
      setStage('question');
    }
  };

  const submitQuestion = async () => {
    try {
      setSubmitted(true);
      await askQuestion({
        question: userQuestion,
      }).unwrap();

      setTimeout(() => {
        setStage("initial");
        setSearchQuery("");
        setSearchResult(null);
        setUserQuestion("");
        setSubmitted(false);
        setPendingSubmit(false);
      }, 3000);

    } catch (error) {
      console.error("FAQ submit failed", error);
      setSubmitted(false);
    }
  };

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      setPendingSubmit(true);
      setShowLoginModal(true);
      return;
    }
    submitQuestion();
  };

  const handleLoginSuccess = async () => {
    setShowLoginModal(false);
    if (pendingSubmit) {
      setPendingSubmit(false);
      submitQuestion();
    }
  };

  const handleReset = () => {
    setStage('initial');
    setSearchQuery('');
    setSearchResult(null);
    setUserQuestion('');
    setSubmitted(false);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
        className={`mt-12 sm:mt-16 rounded-3xl p-8 sm:p-12 ${darkMode
          ? 'bg-[#0a0f0d] border-emerald-500/20 shadow-[0_0_50px_-12px_rgba(16,185,129,0.15)]'
          : 'bg-white border-teal-100 shadow-2xl shadow-teal-500/10'
          } border relative overflow-hidden group/container`}
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-emerald-500/20 to-teal-500/10 rounded-full blur-[100px] -mr-40 -mt-40 transition-all group-hover/container:scale-110"></div>
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-emerald-500/5 rounded-full blur-[80px] -ml-30 -mb-30"></div>

        <div className="relative z-10">
          <AnimatePresence mode="wait">
            {stage === 'initial' && (
              <motion.div
                key="initial"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center"
              >
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-black uppercase tracking-widest mb-8 border border-emerald-500/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Smart AI Search
                </div>
                <h3 className={`text-4xl sm:text-5xl font-black mb-6 tracking-tight ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                  Still Have Questions?
                </h3>
                <p className={`text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Find the answers you need in seconds. Type keywords below or click "Ask Your Question" to file a query.
                </p>

                <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative group/input">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Try 'medical aid', '80G tax benefit', or 'zakat'..."
                    className={`w-full px-8 py-6 pr-20 rounded-2xl text-lg shadow-2xl ${darkMode
                      ? 'bg-[#121815] text-white placeholder-zinc-500 border-emerald-500/30 focus:border-emerald-500 focus:bg-[#161d19]'
                      : 'bg-white text-zinc-900 placeholder-zinc-400 border-zinc-200 focus:border-teal-500'
                      } border-2 focus:outline-none focus:ring-8 focus:ring-emerald-500/10 transition-all duration-500`}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <button
                      type="submit"
                      className="p-3.5 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-emerald-500/20"
                    >
                      <Search className="w-6 h-6" />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {stage === 'result' && searchResult && (
              <motion.div
                key="result-found"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`p-8 rounded-3xl border-2 ${darkMode
                  ? 'bg-[#0d1310]/80 border-emerald-500/40 shadow-[0_0_40px_-10px_rgba(16,185,129,0.2)]'
                  : 'bg-white border-teal-500/20 shadow-2xl'
                  } backdrop-blur-xl relative`}
              >
                <div className="absolute -top-4 -left-4 px-4 py-1.5 rounded-lg bg-teal-500 text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-teal-500/20">
                  Best Match Found
                </div>

                <h3 className={`text-2xl font-bold mb-6 pt-4 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                  {searchResult.q}
                </h3>
                <div className={`text-lg leading-relaxed mb-10 ${darkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
                  {searchResult.a}
                </div>

                <div className={`pt-8 border-t ${darkMode ? 'border-zinc-800' : 'border-zinc-100'} flex flex-col sm:flex-row items-center justify-between gap-6`}>
                  <div className="text-center sm:text-left">
                    <p className={`text-sm font-bold uppercase tracking-wider ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                      Was this helpful?
                    </p>
                    <p className={`text-xs mt-1 ${darkMode ? 'text-zinc-600' : 'text-zinc-400'}`}>
                      Your feedback helps us improve our search.
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleFeedback(true)}
                      className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-sm hover:scale-[1.04] active:scale-[0.99] transition-all shadow-xl shadow-teal-500/20"
                    >
                      Yes, very!
                    </button>
                    <button
                      onClick={() => handleFeedback(false)}
                      className={`px-8 py-3 rounded-xl font-black text-sm transition-all ${darkMode
                        ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                        }`}
                    >
                      Not what I needed
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {stage === 'result' && !searchResult && (
              <motion.div
                key="result-none"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`p-10 sm:p-16 rounded-3xl text-center border-2 border-dashed ${darkMode
                  ? 'bg-emerald-950/20 border-emerald-500/30 shadow-[0_0_30px_-5px_rgba(16,185,129,0.1)]'
                  : 'bg-white border-zinc-200 shadow-lg'
                  }`}
              >
                <div className="w-24 h-24 bg-teal-500/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                  <HelpCircle className="w-12 h-12 text-teal-500" />
                </div>
                <h3 className={`text-3xl font-black mb-4 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                  No Exact Match Found
                </h3>
                <p className={`text-zinc-500 max-w-sm mx-auto mb-10 text-lg leading-relaxed`}>
                  We couldn't find an answer to your specific keywords. Our team is ready to help!
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button
                    onClick={() => setStage('initial')}
                    className={`px-10 py-4 rounded-xl font-black transition-all ${darkMode
                      ? 'bg-zinc-800 text-white hover:bg-zinc-700'
                      : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                      }`}
                  >
                    Try Again
                  </button>
                  <button
                    onClick={() => setStage('question')}
                    className="px-10 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black hover:scale-[1.05] active:scale-[0.99] transition-all shadow-xl shadow-teal-500/30"
                  >
                    Ask Your Question
                  </button>
                </div>
              </motion.div>
            )}

            {stage === 'thankYou' && (
              <motion.div
                key="thank-you"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-teal-500 flex items-center justify-center shadow-2xl shadow-teal-500/30">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className={`text-3xl font-black ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                  Happy to Help!
                </h3>
                <p className="text-teal-500 font-bold mt-2 italic">Returning you to search...</p>
              </motion.div>
            )}

            {stage === 'question' && (
              <motion.div
                key="ask-question"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl mx-auto"
              >
                {!submitted ? (
                  <>
                    <div className="flex items-center justify-between mb-8 text-emerald-400">
                      <h3 className={`text-3xl font-black ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                        Ask Your Question
                      </h3>
                      <button
                        onClick={handleReset}
                        className={`p-3 rounded-xl ${darkMode ? 'hover:bg-emerald-900/30' : 'hover:bg-zinc-100'
                          } transition-all`}
                      >
                        <X className={`w-6 h-6 ${darkMode ? 'text-emerald-400' : 'text-zinc-500'}`} />
                      </button>
                    </div>

                    <form onSubmit={handleQuestionSubmit} className="space-y-6">
                      <div className="relative">
                        <textarea
                          value={userQuestion}
                          onChange={(e) => setUserQuestion(e.target.value)}
                          placeholder="Please describe your question here. Our team will get back to you personally."
                          rows="6"
                          required
                          className={`w-full px-8 py-6 rounded-2xl text-lg shadow-inner ${darkMode
                            ? 'bg-[#121815] text-white placeholder-zinc-500 border-emerald-500/30 focus:border-emerald-500'
                            : 'bg-white text-zinc-900 placeholder-zinc-400 border-zinc-200 focus:shadow-lg'
                            } border-2 focus:outline-none focus:ring-8 focus:ring-emerald-500/5 transition-all duration-300 resize-none`}
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-lg hover:scale-[1.01] active:scale-[0.99] transition-all shadow-2xl shadow-emerald-500/20 flex items-center justify-center gap-3"
                      >
                        {isLoading ? 'Submitting...' : 'Submit Your Question'}
                        <Send className="w-5 h-5" />
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-teal-500 flex items-center justify-center shadow-2xl shadow-teal-500/30">
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className={`text-3xl font-black mb-4 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                      Question Received!
                    </h3>
                    <p className={`text-lg ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      We've received your query. Our team will review it and notify you via email when an answer is ready.
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => {
          setShowLoginModal(false);
          setPendingSubmit(false);
        }}
        darkMode={darkMode}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}

export default function FAQSection({ darkMode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [openCategory, setOpenCategory] = useState('general');
  const [openQuestion, setOpenQuestion] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;

  // Active category FAQs (paginated)
  const { data: dynamicData, isLoading: isFetching } = useGetAnsweredFAQsQuery({
    category: openCategory,
    page: currentPage,
    limit: limit
  });

  // Global answered FAQs for search
  const { data: globalData } = useGetAnsweredFAQsQuery({
    limit: 100 // Fetch enough for search
  });

  const globalDynamicFAQs = globalData?.faqs?.map(faq => ({
    q: faq.question,
    a: faq.answer,
    id: faq._id,
    category: faq.category
  })) || [];

  const categories = [
    {
      id: 'general', label: 'General', icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'donors', label: 'For Donors', icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'beneficiaries', label: 'For Beneficiaries', icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      id: 'volunteers', label: 'For Volunteers', icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      )
    },
    {
      id: 'issues', label: 'Issues & Support', icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      id: 'legal', label: 'Legal', icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      )
    },
    {
      id: 'other', label: 'Other', icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      )
    }
  ];

  const faqData = {
    general: [
      {
        q: "What is TPF Aid?",
        a: "TPF Aid is a project of True Path Foundation, a registered Indian non-profit organization committed to serving humanity. We provide verified aid for medical, educational, legal, and emergency needs without discrimination, inspired by the Islamic principle of 'Service to Mankind'."
      },
      {
        q: "Is TPF Aid only for Muslims?",
        a: "Absolutely not. We serve people of all religions, regions, and communities. Our values are Islamic, but our work is inclusive, secular, and humanitarian."
      },
      {
        q: "Is your founder anonymous? Why?",
        a: "Yes, our founder has chosen to remain anonymous in the spirit of Islamic humility — 'Let not your left hand know what your right hand gives.' The work matters, not the name behind it."
      },
      {
        q: "Where is TPF Aid based?",
        a: "We are headquartered in New Delhi, India and aim to expand into all 700+ districts through a decentralized model of service."
      }
    ],
    donors: [
      {
        q: "How do I know my donation is going to the right person?",
        a: "Every fundraiser is verified through a strict document check, background screening, and real-time monitoring. We publish case updates and remain transparent about fund usage."
      },
      {
        q: "Can I choose whom to donate to?",
        a: "Yes, you can browse live fundraisers on our site and choose a case that touches your heart."
      },
      {
        q: "Do you accept international donations?",
        a: "No. TPF Aid does not hold FCRA registration, so we do not accept foreign donations of any kind, as per Indian law."
      },
      {
        q: "Will I get a receipt?",
        a: "Yes. Every donor receives a digital payment receipt immediately upon successful donation."
      },
      {
        q: "Is my donation eligible for tax exemption under 80G?",
        a: "Yes, True Path Foundation is registered under Section 80G of the Income Tax Act. You'll get an 80G-compliant receipt upon request."
      },
      {
        q: "How secure is my payment?",
        a: "We use secure, encrypted payment gateways like Razorpay and Instamojo. No card/banking data is stored on our servers."
      }
    ],
    beneficiaries: [
      {
        q: "Who can apply for a fundraiser?",
        a: "Anyone facing a genuine financial emergency who is not a taxpayer, is Zakat-eligible (in Zakat cases), and has valid documents can apply."
      },
      {
        q: "What documents are needed?",
        a: "You'll need: Aadhaar/Voter ID, Proof of need (medical, educational, rent, etc.), Income proof (ration card/passbook), Bank account details, and Reference contacts."
      },
      {
        q: "How long does it take for my fundraiser to be approved?",
        a: "Usually within 72 working hours, after verification."
      },
      {
        q: "Can someone apply on my behalf?",
        a: "Yes, if you're physically or digitally unable to apply, a family member, social worker, or volunteer can help you apply — but all documents must be verified in your name."
      },
      {
        q: "What if someone lies or submits a fake fundraiser?",
        a: "We have zero tolerance for fraud. Fake applicants will be: Blacklisted permanently, Reported legally under BNS & IT Act, Publicly delisted. Zakat abusers may also face religious and social accountability."
      },
      {
        q: "Can I apply again if I already received aid once?",
        a: "Yes, but each new request must be a new, genuine crisis and will undergo fresh verification."
      }
    ],
    volunteers: [
      {
        q: "How do I become a volunteer?",
        a: "Apply online at our Volunteer Page. We'll verify your intent, conduct a short interaction, and issue a Volunteer ID upon approval."
      },
      {
        q: "Do volunteers get paid?",
        a: "No. Volunteering is completely selfless and unpaid, but rewarded spiritually and with official recognition."
      },
      {
        q: "What are the duties of a volunteer?",
        a: "Spreading awareness, Distributing aid, Collecting field reports, Coordinating with beneficiaries, Supporting during disasters or emergencies."
      },
      {
        q: "Can volunteers speak to the media or use TPF Aid's name for other purposes?",
        a: "No. Volunteers must not represent the foundation in media or public without written permission. Misuse of the TPF Aid name or identity may result in expulsion and legal action."
      },
      {
        q: "Can a volunteer be removed?",
        a: "Yes, for: Misconduct, Disrespect, Fraud or negligence, Violation of terms, or Bringing disrepute to the NGO."
      }
    ],
    issues: [
      {
        q: "What should I do if I don't receive a donation receipt?",
        a: "Please visit our portal of help centre with your payment details."
      },
      {
        q: "Where do I report website errors or technical problems?",
        a: "Please visit our portal of help centre with your payment details."
      },
      {
        q: "How do I report fraud or misuse of funds?",
        a: "Immediately email: legal@truepathfoundation.org with screenshots, links, or evidence."
      },
      {
        q: "What if I am not satisfied with a complaint response?",
        a: "Follow our 3-tier Grievance Redressal process: 1. File complaint 2. Appeal Authority 3. Ombudsman-like authority 4. Final decision by Legal Wing."
      }
    ],
    legal: [
      {
        q: "Are you registered with the Indian government?",
        a: "Yes, True Path Foundation is a Section 8 Company under the Ministry of Corporate Affairs and complies with all required laws, including 80G, NGO Darpan, and CSR eligibility (upon request)."
      },
      {
        q: "Do you share my data with anyone?",
        a: "No. Your data is confidential and protected. Refer to our Privacy Policy for full details."
      },
      {
        q: "Can I delete my data from your records?",
        a: "Yes, you may email privacy@truepathfoundation.org to request deletion of your records."
      },
      {
        q: "Do you use cookies?",
        a: "Yes, only for essential features. You can read our full Cookie Policy for transparency."
      }
    ],
    other: [
      {
        q: "Can I visit your centre or meet the team?",
        a: "Yes, you may visit during office hours. Use our Contact Us page to fix an appointment."
      },
      {
        q: "Do you support overseas humanitarian aid programmes in crisis areas?",
        a: "We raise awareness and offer non-political humanitarian assistance (not monetary aid) if it is supported by Indian Laws, Indian Government(s) and Indian regimes where possible, subject to Indian legal limitations."
      },
      {
        q: "Can I suggest someone for aid?",
        a: "Yes. You may refer a person via our Start a Fundraiser section, but the beneficiary must provide all documentation directly."
      },
      {
        q: "Do you support religious conversions?",
        a: "No. TPF Aid is a service-only platform. We do not support or promote any conversion activity. Our mission is to serve humanity — not divide it."
      }
    ]
  };

  const toggleQuestion = (id) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  const dynamicFAQs = dynamicData?.faqs?.map(faq => ({
    q: faq.question,
    a: faq.answer,
    id: faq._id
  })) || [];

  const combinedFAQs = [...faqData[openCategory], ...dynamicFAQs];

  return (
    <section
      ref={ref}
      className={`py-36 sm:py-20 md:py-30 ${darkMode ? 'bg-zinc-900' : 'bg-white'
        } relative overflow-hidden`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 30% 40%, ${darkMode ? '#059669' : '#10b981'} 1.5px, transparent 1.5px)`,
          backgroundSize: '40px 40px'
        }}></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full -mr-64 -mt-64"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-500/10 blur-[120px] rounded-full -ml-64 -mb-64"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-1 w-12 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"></div>
            <div className="w-2 h-2 rounded-full bg-teal-500"></div>
            <div className="h-1 w-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
          </div>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 tracking-tight ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 text-transparent bg-clip-text drop-shadow-sm">
              Questions
            </span>
          </h2>
          <p className={`text-base sm:text-lg max-w-3xl mx-auto font-medium ${darkMode ? 'text-emerald-400/80' : 'text-zinc-600'}`}>
            Your Doubts Are Valid — And We're Here to Answer Them
          </p>
        </motion.div>

        {/* Category Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setOpenCategory(cat.id);
                setOpenQuestion(null);
              }}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-bold transition-all duration-300 inline-flex items-center gap-2 ${openCategory === cat.id
                ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xl shadow-emerald-500/20 scale-105 border-2 border-white/10'
                : darkMode
                  ? 'bg-emerald-950/20 text-emerald-400/60 border border-emerald-500/10 hover:bg-emerald-900/30 hover:text-emerald-300'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                }`}
            >
              <span className="flex items-center">{cat.icon}</span>
              <span className="whitespace-nowrap">{cat.label}</span>
            </button>
          ))}
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="space-y-3 sm:space-y-4">
            {combinedFAQs.map((faq, index) => {
              const faqId = faq.id || `static-${index}`;
              return (
                <motion.div
                  key={faqId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`rounded-xl sm:rounded-2xl overflow-hidden border ${darkMode
                    ? 'bg-emerald-950/10 border-emerald-500/10 backdrop-blur-sm'
                    : 'bg-white border-zinc-200'
                    } shadow-sm hover:shadow-xl hover:border-emerald-500/30 transition-all duration-500 group`}
                >
                  <button
                    onClick={() => toggleQuestion(faqId)}
                    className={`w-full px-5 sm:px-6 py-4 sm:py-5 flex items-start justify-between gap-4 text-left transition-colors duration-200 ${darkMode ? 'hover:bg-emerald-900/10' : 'hover:bg-zinc-50'
                      }`}
                  >
                    <div className="flex-1">
                      <h3 className={`text-base sm:text-lg font-semibold ${darkMode ? 'text-white' : 'text-zinc-900'
                        }`}>
                        {faq.q}
                      </h3>
                    </div>
                    <div className={`flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all duration-500 ${openQuestion === faqId
                      ? 'bg-emerald-500 shadow-lg shadow-emerald-500/40 rotate-180'
                      : darkMode
                        ? 'bg-emerald-950/40 text-emerald-400/50'
                        : 'bg-zinc-100 text-zinc-400'
                      }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <motion.div
                    initial={false}
                    animate={{
                      height: openQuestion === faqId ? 'auto' : 0,
                      opacity: openQuestion === faqId ? 1 : 0
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className={`px-5 sm:px-6 pb-4 sm:pb-5 pt-2 ${darkMode ? 'text-zinc-300' : 'text-zinc-600'
                      }`}>
                      <div className={`pl-4 border-l-2 ${darkMode ? 'border-teal-500/50' : 'border-emerald-500/50'
                        }`}>
                        <p className="text-sm sm:text-base leading-relaxed">{faq.a}</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Pagination for Dynamic FAQs */}
          {dynamicData?.pagination?.totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className={`p-2 rounded-lg transition-all ${darkMode ? 'bg-zinc-800 text-zinc-400 hover:text-white disabled:opacity-50' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50'
                  }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
                {[...Array(dynamicData.pagination.totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${currentPage === i + 1
                      ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white'
                      : darkMode ? 'bg-zinc-800 text-zinc-400 hover:text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                disabled={currentPage === dynamicData.pagination.totalPages}
                onClick={() => setCurrentPage(prev => Math.min(dynamicData.pagination.totalPages, prev + 1))}
                className={`p-2 rounded-lg transition-all ${darkMode ? 'bg-zinc-800 text-zinc-400 hover:text-white disabled:opacity-50' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50'
                  }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </motion.div>

        {/* Interactive Search Section */}
        <InteractiveSearchSection
          darkMode={darkMode}
          isInView={isInView}
          faqData={faqData}
          dynamicFAQs={globalDynamicFAQs}
        />
      </div>
    </section>
  );
}