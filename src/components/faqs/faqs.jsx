"use client"
import { motion, useInView } from 'framer-motion';
import { useState, useRef } from 'react';

export default function FAQSection({ darkMode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [openCategory, setOpenCategory] = useState('general');
  const [openQuestion, setOpenQuestion] = useState(null);

  const categories = [
    { id: 'general', label: 'General', icon: '🏛️' },
    { id: 'donors', label: 'For Donors', icon: '❤️' },
    { id: 'beneficiaries', label: 'For Beneficiaries', icon: '🤝' },
    { id: 'volunteers', label: 'For Volunteers', icon: '🌟' },
    { id: 'issues', label: 'Issues & Support', icon: '🛟' },
    { id: 'legal', label: 'Legal', icon: '⚖️' },
    { id: 'other', label: 'Other', icon: '💬' }
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
      className={`py-30 sm:py-20 md:py-30 ${
        darkMode ? 'bg-zinc-900' : 'bg-white'
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
            <span className="bg-gradient-to-r from-teal-500 via-emerald-500 to-orange-500 text-transparent bg-clip-text">
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
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${
                openCategory === cat.id
                  ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg scale-105'
                  : darkMode
                  ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              <span className="mr-2">{cat.icon}</span>
              {cat.label}
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
                className={`rounded-xl sm:rounded-2xl overflow-hidden border ${
                  darkMode
                    ? 'bg-zinc-800/50 border-zinc-700/50 backdrop-blur-sm'
                    : 'bg-white border-zinc-200'
                } shadow-sm hover:shadow-md transition-all duration-300`}
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className={`w-full px-5 sm:px-6 py-4 sm:py-5 flex items-start justify-between gap-4 text-left transition-colors duration-200 ${
                    darkMode ? 'hover:bg-zinc-700/30' : 'hover:bg-zinc-50'
                  }`}
                >
                  <div className="flex-1">
                    <h3 className={`text-base sm:text-lg font-semibold ${
                      darkMode ? 'text-white' : 'text-zinc-900'
                    }`}>
                      {faq.q}
                    </h3>
                  </div>
                  <div className={`flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                    openQuestion === index
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
                  <div className={`px-5 sm:px-6 pb-4 sm:pb-5 pt-2 ${
                    darkMode ? 'text-zinc-300' : 'text-zinc-600'
                  }`}>
                    <div className={`pl-4 border-l-2 ${
                      darkMode ? 'border-teal-500/50' : 'border-emerald-500/50'
                    }`}>
                      <p className="text-sm sm:text-base leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className={`mt-12 sm:mt-16 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 ${
            darkMode
              ? 'bg-gradient-to-br from-zinc-800 to-zinc-800/50 border-zinc-700/50'
              : 'bg-gradient-to-br from-teal-50 to-emerald-50 border-teal-100'
          } border relative overflow-hidden`}
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-teal-500/10 to-emerald-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 text-center">
            <h3 className={`text-2xl sm:text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
              Still Have Questions?
            </h3>
            <p className={`text-base sm:text-lg mb-8 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
              We're happy to help you with anything else you need to know
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto">
              <a
                href="mailto:help@truepathfoundation.org"
                className={`p-4 sm:p-5 rounded-xl ${
                  darkMode ? 'bg-zinc-700/30 hover:bg-zinc-700/50' : 'bg-white/60 hover:bg-white'
                } transition-all duration-300 group`}
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <p className={`text-sm font-medium ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                  help@truepathfoundation.org
                </p>
              </a>

              <a
                href="https://wa.me/919411565185"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-4 sm:p-5 rounded-xl ${
                  darkMode ? 'bg-zinc-700/30 hover:bg-zinc-700/50' : 'bg-white/60 hover:bg-white'
                } transition-all duration-300 group`}
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <p className={`text-sm font-medium ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                  +91 94115 65185
                </p>
              </a>

              <a
                href="https://tpf-aid.vercel.app/helpcentre"
                className={`p-4 sm:p-5 rounded-xl ${
                  darkMode ? 'bg-zinc-700/30 hover:bg-zinc-700/50' : 'bg-white/60 hover:bg-white'
                } transition-all duration-300 group`}
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                </div>
                <p className={`text-sm font-medium ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                  Visit Help Centre
                </p>
                
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}