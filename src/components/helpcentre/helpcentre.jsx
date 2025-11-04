"use client"
import { motion, useInView } from 'framer-motion';
import { useState, useRef } from 'react';

export default function HelpCenterPage({ darkMode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [expandedStage, setExpandedStage] = useState(null);

  const reportableIssues = [
    'Delay or non-receipt of aid or donation receipt',
    'Fraudulent campaigns or suspected misuse',
    'Misbehaviour by any staff or volunteer',
    'Violation of privacy or misuse of information',
    'Technical issues with website, forms, or application',
    'Dispute regarding eligibility or verification',
    'Unethical or offensive content associated with the platform',
    'Feedback, suggestions, or service dissatisfaction'
  ];

  const grievanceStages = [
    {
      stage: 1,
      title: 'Initial Complaint',
      time: '7 working days',
      description: 'Submit your complaint and we\'ll address it promptly',
      channels: [
        { type: 'Email', value: 'help@truepathfoundation.org', icon: 'mail' },
        { type: 'Website', value: 'www.truepathfoundation.org/help-centre', icon: 'globe' },
        { type: 'WhatsApp', value: '+91-9411565185', icon: 'whatsapp' }
      ],
      required: [
        'Your full name, mobile number, and email',
        'Nature of complaint (with details and proof, if any)',
        'Reference ID or case number (if related to a campaign or donation)'
      ]
    },
    {
      stage: 2,
      title: 'Appeal Authority',
      time: '10 working days',
      description: 'Not satisfied? Escalate to our Appeal Authority for senior review',
      channels: [
        { type: 'Email', value: 'appeals@truepathfoundation.org', icon: 'mail' }
      ],
      required: [
        'Your appeal will be reviewed by a senior representative not involved in the original decision',
        'Subject: Appeal for Unresolved Complaint – [Your Name]',
        'Ensures impartial review and resolution'
      ]
    },
    {
      stage: 3,
      title: 'Ombudsman-Level Authority',
      time: '15 working days',
      description: 'Final internal review by our independent Ombudsman desk',
      channels: [
        { type: 'Email', value: 'ombudsman@truepathfoundation.org', icon: 'mail' }
      ],
      required: [
        'All previous correspondence and responses',
        'Clear summary of your grievance and what you seek',
        'Any legal document (if applicable)',
        'Functions independently of day-to-day operations'
      ]
    }
  ];

  const legalMatters = [
    'Fraud',
    'Legal liability',
    'Financial disputes',
    'Reputational harm',
    'Breach of terms of use or trust'
  ];

  const principles = [
    {
      title: 'Confidentiality',
      description: 'All complaints are handled with strict confidentiality and respect'
    },
    {
      title: 'Protection',
      description: 'Whistleblowers and concerned users are protected from retaliation'
    },
    {
      title: 'Communication',
      description: 'You will be updated via email or phone throughout your complaint process'
    },
    {
      title: 'Integrity',
      description: 'False, malicious, or defamatory complaints may result in blacklisting or legal action'
    }
  ];

  return (
    <section
      ref={ref}
      className={`py-36 sm:py-20 md:py-30  ${
        darkMode ? 'bg-zinc-900' : 'bg-white'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 sm:mb-16"
        >
             <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-1 w-12 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"></div>
            <div className="w-2 h-2 rounded-full bg-teal-500"></div>
            <div className="h-1 w-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
          </div>
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-center ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
            <span className="bg-gradient-to-r from-teal-500 via-emerald-500 to-orange-500 text-transparent bg-clip-text">
              Help Centre
            </span>
          </h1>
          
          <div className={`max-w-4xl mx-auto text-center mb-8 p-6 sm:p-8 rounded-xl ${
            darkMode ? 'bg-zinc-800/50' : 'bg-gray-50'
          }`}>
            <h2 className={`text-xl sm:text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
              Raise Your Concerns — We're Here to Listen, Solve, and Support
            </h2>
            <p className={`text-base sm:text-lg leading-relaxed ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
              At TPF Aid, we see every concern as an opportunity to improve — and every question as a responsibility before Allah and humanity. 
              <span className="font-semibold"> You will never be ignored. You will never be alone.</span> If something goes wrong — we'll make it right.
            </p>
          </div>

          <p className={`text-base sm:text-lg leading-relaxed max-w-4xl mx-auto ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
            At TPF Aid, we believe that serving humanity also means being accountable, approachable, and transparent. 
            Whether you're a donor, volunteer, beneficiary, or visitor, your experience matters to us — and so do your concerns.
          </p>
        </motion.div>

        {/* Your Rights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`mb-12 sm:mb-16 p-6 sm:p-8 rounded-xl border-l-4 border-teal-500 ${
            darkMode ? 'bg-zinc-800/30' : 'bg-teal-50/50'
          }`}
        >
          <h3 className={`text-xl sm:text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
            You Have the Full Right To:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {['Raise a query', 'File a complaint', 'Seek a fair and timely resolution'].map((right, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-4 rounded-lg ${
                  darkMode ? 'bg-zinc-700/30' : 'bg-white'
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-teal-500 flex-shrink-0"></div>
                <p className={`text-sm sm:text-base font-medium ${darkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>
                  {right}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Reportable Issues */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12 sm:mb-16"
        >
          <h2 className={`text-2xl sm:text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
            I. Issues You Can Report
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {reportableIssues.map((issue, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                className={`flex items-start gap-3 p-4 rounded-lg border ${
                  darkMode 
                    ? 'bg-zinc-800/50 border-zinc-700/50 hover:border-zinc-600' 
                    : 'bg-white border-zinc-200 hover:border-zinc-300'
                } transition-colors duration-200`}
              >
                <svg className={`w-5 h-5 flex-shrink-0 mt-0.5 ${darkMode ? 'text-teal-400' : 'text-teal-600'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className={`text-sm sm:text-base ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                  {issue}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Grievance Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-12 sm:mb-16"
        >
          <h2 className={`text-2xl sm:text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
            II. Step-by-Step Grievance Redressal Process
          </h2>

          <div className="space-y-4">
            {grievanceStages.map((stage, index) => (
              <motion.div
                key={stage.stage}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                className={`rounded-xl border overflow-hidden ${
                  darkMode 
                    ? 'bg-zinc-800/50 border-zinc-700/50' 
                    : 'bg-white border-zinc-200'
                }`}
              >
                <button
                  onClick={() => setExpandedStage(expandedStage === stage.stage ? null : stage.stage)}
                  className={`w-full p-6 flex items-center justify-between text-left ${
                    darkMode ? 'hover:bg-zinc-700/30' : 'hover:bg-gray-50'
                  } transition-colors duration-200`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center font-bold text-xl sm:text-2xl flex-shrink-0 ${
                      darkMode ? 'bg-teal-500/20 text-teal-400' : 'bg-teal-100 text-teal-700'
                    }`}>
                      {stage.stage}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-lg sm:text-xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                        Stage {stage.stage}: {stage.title}
                      </h3>
                      <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        {stage.description}
                      </p>
                      <div className={`mt-2 inline-flex items-center gap-2 text-xs sm:text-sm font-medium px-3 py-1 rounded-full ${
                        darkMode ? 'bg-zinc-700 text-zinc-300' : 'bg-gray-100 text-zinc-700'
                      }`}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Resolution: {stage.time}
                      </div>
                    </div>
                  </div>
                  <svg
                    className={`w-6 h-6 flex-shrink-0 transition-transform duration-300 ${
                      expandedStage === stage.stage ? 'rotate-180' : ''
                    } ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {expandedStage === stage.stage && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`px-6 pb-6 border-t ${darkMode ? 'border-zinc-700' : 'border-zinc-200'}`}
                  >
                    {/* Contact Channels */}
                    <div className="mt-6 mb-6">
                      <h4 className={`text-sm font-semibold mb-3 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                        How to Submit:
                      </h4>
                      <div className="space-y-2">
                        {stage.channels.map((channel, idx) => (
                          <div
                            key={idx}
                            className={`flex items-center gap-3 p-3 rounded-lg ${
                              darkMode ? 'bg-zinc-700/30' : 'bg-gray-50'
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              darkMode ? 'bg-teal-500/20' : 'bg-teal-100'
                            }`}>
                              {channel.icon === 'mail' && (
                                <svg className={`w-4 h-4 ${darkMode ? 'text-teal-400' : 'text-teal-600'}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                </svg>
                              )}
                              {channel.icon === 'globe' && (
                                <svg className={`w-4 h-4 ${darkMode ? 'text-teal-400' : 'text-teal-600'}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                                </svg>
                              )}
                              {channel.icon === 'whatsapp' && (
                                <svg className={`w-4 h-4 ${darkMode ? 'text-teal-400' : 'text-teal-600'}`} fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                </svg>
                              )}
                            </div>
                            <div>
                              <p className={`text-xs font-medium ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                {channel.type}
                              </p>
                              <p className={`text-sm font-semibold ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}>
                                {channel.value}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Requirements */}
                    <div>
                      <h4 className={`text-sm font-semibold mb-3 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                        {stage.stage === 1 ? 'Please Provide:' : 'Required Information:'}
                      </h4>
                      <div className="space-y-2">
                        {stage.required.map((req, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                              darkMode ? 'bg-teal-400' : 'bg-teal-600'
                            }`}></div>
                            <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                              {req}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Legal Oversight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.9 }}
          className={`mb-12 sm:mb-16 p-6 sm:p-8 rounded-xl border-l-4 border-orange-500 ${
            darkMode ? 'bg-zinc-800/30' : 'bg-orange-50/50'
          }`}
        >
          <h2 className={`text-2xl sm:text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
            III. Final Legal Oversight
          </h2>
          <p className={`text-base mb-6 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
            In rare and serious cases, the matter shall be referred to the Legal Wing of True Path Foundation, whose decision shall be final, binding, and enforceable within the framework of Indian law.
          </p>
          
          <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>
            Serious Cases Include:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {legalMatters.map((matter, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 p-3 rounded-lg ${
                  darkMode ? 'bg-zinc-700/30' : 'bg-white'
                }`}
              >
                <svg className="w-4 h-4 text-orange-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className={`text-sm ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                  {matter}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Core Principles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1 }}
          className="mb-12 sm:mb-16"
        >
          <h2 className={`text-2xl sm:text-3xl font-bold mb-8 text-center ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
            IV. Transparency, Confidentiality & Respect
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {principles.map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 1.1 + index * 0.1 }}
                className={`p-6 rounded-xl ${
                  darkMode ? 'bg-zinc-800/50' : 'bg-gray-50'
                }`}
              >
                <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                  {principle.title}
                </h3>
                <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1.4 }}
          className={`p-8 sm:p-10 rounded-xl text-center ${
            darkMode ? 'bg-teal-500/10 border border-teal-500/20' : 'bg-teal-50 border border-teal-200'
          }`}
        >
          <h2 className={`text-2xl sm:text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
            Contact the Help Centre
          </h2>
          <p className={`text-base mb-6 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
            Choose the method that works best for you
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {/* <a
              href="https://www.truepathfoundation.org/help-centre"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                darkMode 
                  ? 'bg-teal-500 text-white hover:bg-teal-600' 
                  : 'bg-teal-600 text-white hover:bg-teal-700'
              }`}
            >
              Submit Online
            </a> */}
            <a
              href="mailto:help@truepathfoundation.org"
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 border-2 ${
                darkMode 
                  ? 'border-teal-500 text-teal-400 hover:bg-teal-500/10' 
                  : 'border-teal-600 text-teal-600 hover:bg-teal-50'
              }`}
            >
              Email Us
            </a>
            <a
              href="https://wa.me/919411565185"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 border-2 ${
                darkMode 
                  ? 'border-teal-500 text-teal-400 hover:bg-teal-500/10' 
                  : 'border-teal-600 text-teal-600 hover:bg-teal-50'
              }`}
            >
              WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}