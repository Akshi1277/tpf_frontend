"use client"
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import LoginModal from "../login/LoginModal"
import { useCreateTicketMutation } from '@/utils/slices/tickets-queriesApiSlice';
// Interactive Search Component
function InteractiveSearchSection({ darkMode, isInView, faqData }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [stage, setStage] = useState('initial'); // initial, result, feedback, question
  const [userQuestion, setUserQuestion] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingSubmit, setPendingSubmit] = useState(false);
  const user = useSelector(state => state.auth.userInfo);
  const [createTicket, { isLoading }] = useCreateTicketMutation();

  const searchFAQs = (query) => {
    if (!query.trim()) return null;

    const lowerQuery = query.toLowerCase();
    let bestMatch = null;
    let highestScore = 0;

    Object.keys(faqData).forEach(category => {
      faqData[category].forEach(faq => {
        const qLower = faq.q.toLowerCase();
        const aLower = faq.a.toLowerCase();

        let score = 0;
        if (qLower.includes(lowerQuery)) score += 3;
        if (aLower.includes(lowerQuery)) score += 1;

        const queryWords = lowerQuery.split(' ');
        queryWords.forEach(word => {
          if (word.length > 2) {
            if (qLower.includes(word)) score += 2;
            if (aLower.includes(word)) score += 0.5;
          }
        });

        if (score > highestScore) {
          highestScore = score;
          bestMatch = faq;
        }
      });
    });

    return highestScore > 1 ? bestMatch : null;
  };

  const handleSearch = (e) => {
    e.preventDefault();
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
      }, 2000);
    } else {
      setStage('question');
    }
  };

  const submitQuestion = async () => {
    try {
      setSubmitted(true);

      await createTicket({
        fullName: user.fullName || "Authenticated User",
        email: user.email,
        queryType: "faqs",          // ✅ IMPORTANT
        message: userQuestion,      // ✅ FAQ question
      }).unwrap();

      setTimeout(() => {
        setStage("initial");
        setSearchQuery("");
        setSearchResult(null);
        setUserQuestion("");
        setSubmitted(false);
        setPendingSubmit(false);
      }, 2000);

    } catch (error) {
      console.error("FAQ submit failed", error);
      setSubmitted(false);
    }
  };

  const handleQuestionSubmit = (e) => {
    e.preventDefault();

    // ❌ Not logged in → block + open modal
    if (!user) {
      setPendingSubmit(true);
      setShowLoginModal(true);
      return;
    }

    // ✅ Logged in → proceed
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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.6 }}
      className={`mt-12 sm:mt-16 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 ${darkMode
        ? 'bg-gradient-to-br from-zinc-800 to-zinc-800/50 border-zinc-700/50'
        : 'bg-gradient-to-br from-teal-50 to-emerald-50 border-teal-100'
        } border relative overflow-hidden`}
    >
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-teal-500/10 to-emerald-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {/* Initial Search Stage */}
          {stage === 'initial' && (
            <motion.div
              key="initial"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <h3 className={`text-2xl sm:text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                Still Have Questions?
              </h3>
              <p className={`text-base sm:text-lg mb-8 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                Search for answers or ask us directly
              </p>

              <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Type your question here..."
                    className={`w-full px-6 py-4 pr-14 rounded-xl text-base ${darkMode
                      ? 'bg-zinc-700/50 text-white placeholder-zinc-400 border-zinc-600'
                      : 'bg-white text-zinc-900 placeholder-zinc-500 border-zinc-300'
                      } border focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300`}
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-lg bg-gradient-to-r from-teal-500 to-emerald-500 text-white hover:shadow-lg transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                  </button>
                </div>
              </form>

              <div className="mt-8">
                <a
                  href="https://tpf-aid.vercel.app/contactus"
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl ${darkMode ? 'bg-zinc-700/30 hover:bg-zinc-700/50 text-zinc-300' : 'bg-white/60 hover:bg-white text-zinc-700'
                    } transition-all duration-300 group`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                  <span className="font-medium">Contact Us</span>
                </a>
              </div>
            </motion.div>
          )}

          {/* Search Result Stage */}
          {stage === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {searchResult ? (
                <div className="max-w-3xl mx-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className={`text-xl sm:text-2xl font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                      Found an Answer
                    </h3>
                    <button
                      onClick={handleReset}
                      className={`p-2 rounded-lg ${darkMode ? 'hover:bg-zinc-700/50' : 'hover:bg-white/60'
                        } transition-all duration-300`}
                    >
                      <svg className={`w-5 h-5 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className={`p-6 rounded-xl ${darkMode ? 'bg-zinc-700/30' : 'bg-white/60'
                    } mb-8`}>
                    <h4 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                      {searchResult.q}
                    </h4>
                    <p className={`text-base leading-relaxed ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                      {searchResult.a}
                    </p>
                  </div>

                  <div className="text-center">
                    <p className={`text-lg mb-4 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                      Was this helpful?
                    </p>
                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={() => handleFeedback(true)}
                        className="px-8 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-medium hover:shadow-lg transition-all duration-300"
                      >
                        Yes, thank you!
                      </button>
                      <button
                        onClick={() => handleFeedback(false)}
                        className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 ${darkMode
                          ? 'bg-zinc-700/50 text-zinc-300 hover:bg-zinc-700'
                          : 'bg-zinc-200 text-zinc-700 hover:bg-zinc-300'
                          }`}
                      >
                        No, I need more help
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="max-w-3xl mx-auto text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-teal-500/20 to-emerald-500/20 flex items-center justify-center">
                    <svg className={`w-8 h-8 ${darkMode ? 'text-teal-400' : 'text-teal-600'}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                    </svg>
                  </div>
                  <h3 className={`text-xl sm:text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                    No Match Found
                  </h3>
                  <p className={`text-base mb-6 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    We couldn't find an answer to your question in our FAQ.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={handleReset}
                      className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${darkMode
                        ? 'bg-zinc-700/50 text-zinc-300 hover:bg-zinc-700'
                        : 'bg-zinc-200 text-zinc-700 hover:bg-zinc-300'
                        }`}
                    >
                      Try Another Search
                    </button>
                    <button
                      onClick={() => setStage('question')}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-medium hover:shadow-lg transition-all duration-300"
                    >
                      Ask Your Question
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Thank You Stage */}
          {stage === 'thankYou' && (
            <motion.div
              key="thankYou"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="text-center py-8"
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                Great! We're Happy to Help
              </h3>
            </motion.div>
          )}

          {/* Question Form Stage */}
          {stage === 'question' && (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto"
            >
              {!submitted ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className={`text-xl sm:text-2xl font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                      Ask Your Question
                    </h3>
                    <button
                      onClick={handleReset}
                      className={`p-2 rounded-lg ${darkMode ? 'hover:bg-zinc-700/50' : 'hover:bg-white/60'
                        } transition-all duration-300`}
                    >
                      <svg className={`w-5 h-5 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <p className={`text-base mb-6 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    Please describe your question in detail, and we'll get back to you as soon as possible.
                  </p>

                  <form onSubmit={handleQuestionSubmit}>
                    <textarea
                      value={userQuestion}
                      onChange={(e) => setUserQuestion(e.target.value)}
                      placeholder="Type your question here..."
                      rows="6"
                      required
                      className={`w-full px-6 py-4 rounded-xl text-base resize-none ${darkMode
                        ? 'bg-zinc-700/50 text-white placeholder-zinc-400 border-zinc-600'
                        : 'bg-white text-zinc-900 placeholder-zinc-500 border-zinc-300'
                        } border focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300`}
                    />
                    <button
                      type="submit"
                      className="w-full mt-4 px-6 py-4 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-medium hover:shadow-lg transition-all duration-300"
                    >
                      Submit Question
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                    Question Submitted!
                  </h3>
                  <p className={`text-base ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    We'll review your question and get back to you soon.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => {
            setShowLoginModal(false);
            setPendingSubmit(false);
          }}
          darkMode={darkMode}
          onLoginSuccess={handleLoginSuccess}
        />

      </div>
    </motion.div>
  );
}

export default function FAQSection({ darkMode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [openCategory, setOpenCategory] = useState('general');
  const [openQuestion, setOpenQuestion] = useState(null);

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

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <section
      ref={ref}
      className={`py-36 sm:py-20 md:py-30 ${darkMode ? 'bg-zinc-900' : 'bg-white'
        } relative overflow-hidden`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 30% 40%, ${darkMode ? '#10b981' : '#14b8a6'} 2px, transparent 2px)`,
          backgroundSize: '60px 60px'
        }}></div>
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
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-emerald-600 via-emerald-300 to-emerald-400 text-transparent bg-clip-text">
              Questions
            </span>
          </h2>
          <p className={`text-base sm:text-lg max-w-3xl mx-auto ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
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
              className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 inline-flex items-center gap-2 ${openCategory === cat.id
                ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg scale-105'
                : darkMode
                  ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
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
            {faqData[openCategory].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`rounded-xl sm:rounded-2xl overflow-hidden border ${darkMode
                  ? 'bg-zinc-800/50 border-zinc-700/50 backdrop-blur-sm'
                  : 'bg-white border-zinc-200'
                  } shadow-sm hover:shadow-md transition-all duration-300`}
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className={`w-full px-5 sm:px-6 py-4 sm:py-5 flex items-start justify-between gap-4 text-left transition-colors duration-200 ${darkMode ? 'hover:bg-zinc-700/30' : 'hover:bg-zinc-50'
                    }`}
                >
                  <div className="flex-1">
                    <h3 className={`text-base sm:text-lg font-semibold ${darkMode ? 'text-white' : 'text-zinc-900'
                      }`}>
                      {faq.q}
                    </h3>
                  </div>
                  <div className={`flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all duration-300 ${openQuestion === index
                    ? 'bg-gradient-to-r from-teal-500 to-emerald-500 rotate-180'
                    : darkMode
                      ? 'bg-zinc-700'
                      : 'bg-zinc-100'
                    }`}>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: openQuestion === index ? 'auto' : 0,
                    opacity: openQuestion === index ? 1 : 0
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
            ))}
          </div>
        </motion.div>

        {/* Interactive Search Section */}
        <InteractiveSearchSection darkMode={darkMode} isInView={isInView} faqData={faqData} />
      </div>
    </section>
  );
}