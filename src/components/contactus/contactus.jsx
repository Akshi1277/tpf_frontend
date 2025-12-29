"use client"
import { motion, useInView } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useCreateTicketMutation } from '@/utils/slices/tickets-queriesApiSlice';
import { useLazyGetMeQuery } from "@/utils/slices/authApiSlice";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify"
// Help Centre Section Component
function HelpCentreSection({ darkMode, isInView }) {
  const [expandedSection, setExpandedSection] = useState(null);
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

  const sections = [
    {
      id: 'issues',
      title: 'Issues You Can Report',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
        </svg>
      ),
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {reportableIssues.map((issue, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 p-4 rounded-lg border ${darkMode
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
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'grievance',
      title: 'Step-by-Step Grievance Redressal Process',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
        </svg>
      ),
      content: (
        <div className="space-y-4">
          {grievanceStages.map((stage, index) => (
            <div
              key={stage.stage}
              className={`rounded-xl border overflow-hidden ${darkMode
                ? 'bg-zinc-800/50 border-zinc-700/50'
                : 'bg-white border-zinc-200'
                }`}
            >
              <button
                onClick={() => setExpandedStage(expandedStage === stage.stage ? null : stage.stage)}
                className={`w-full p-6 flex items-center justify-between text-left ${darkMode ? 'hover:bg-zinc-700/30' : 'hover:bg-gray-50'
                  } transition-colors duration-200`}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center font-bold text-xl sm:text-2xl flex-shrink-0 ${darkMode ? 'bg-teal-500/20 text-teal-400' : 'bg-teal-100 text-teal-700'
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
                    <div className={`mt-2 inline-flex items-center gap-2 text-xs sm:text-sm font-medium px-3 py-1 rounded-full ${darkMode ? 'bg-zinc-700 text-zinc-300' : 'bg-gray-100 text-zinc-700'
                      }`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Resolution: {stage.time}
                    </div>
                  </div>
                </div>
                <svg
                  className={`w-6 h-6 flex-shrink-0 transition-transform duration-300 ${expandedStage === stage.stage ? 'rotate-180' : ''
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
                  <div className="mt-6">
                    <h4 className={`text-sm font-semibold mb-3 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                      {stage.stage === 1 ? 'Please Provide:' : 'Required Information:'}
                    </h4>
                    <div className="space-y-2">
                      {stage.required.map((req, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${darkMode ? 'bg-teal-400' : 'bg-teal-600'
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
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'legal',
      title: 'Final Legal Oversight',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
        </svg>
      ),
      content: (
        <div>
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
                className={`flex items-center gap-2 p-3 rounded-lg ${darkMode ? 'bg-zinc-700/30' : 'bg-white'
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
        </div>
      )
    },
    {
      id: 'transparency',
      title: 'Transparency, Confidentiality & Respect',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {principles.map((principle, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl ${darkMode ? 'bg-zinc-800/50' : 'bg-gray-50'
                }`}
            >
              <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                {principle.title}
              </h3>
              <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-4">
      {sections.map((section, index) => (
        <div
          key={section.id}
          className={`rounded-xl border overflow-hidden ${darkMode
            ? 'bg-zinc-800/50 border-zinc-700/50'
            : 'bg-white border-zinc-200'
            }`}
        >
          <button
            onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
            className={`w-full p-6 flex items-center justify-between text-left ${darkMode ? 'hover:bg-zinc-700/30' : 'hover:bg-gray-50'
              } transition-colors duration-200`}
          >
            <h2 className={`text-xl sm:text-2xl font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
              {section.title}
            </h2>
            <svg
              className={`w-6 h-6 flex-shrink-0 transition-transform duration-300 ${expandedSection === section.id ? 'rotate-180' : ''
                } ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {expandedSection === section.id && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={`px-6 pb-6 border-t ${darkMode ? 'border-zinc-700' : 'border-zinc-200'}`}
            >
              <div className="mt-6">
                {section.content}
              </div>
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function ContactPage({ darkMode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    queryType: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [createTicket, { isLoading }] = useCreateTicketMutation();
  const router = useRouter();
  const [
    triggerGetMe,
    { data: userData, isLoading: authLoading }
  ] = useLazyGetMeQuery();


  const queryTypes = [
    {
      value: '',
      label: 'Select a category...',
      icon: null
    },
    {
      value: 'general',
      label: 'Raise a Query',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
        </svg>
      )
    },
    {
      value: 'fraud',
      label: 'Report a Fraud Campaign',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      )
    },
    {
      value: 'feedback',
      label: 'Feedback',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      )
    },
    {
      value: 'complaint',
      label: 'Raise a Complaint',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
      )
    },
    {
      value: 'bug',
      label: 'Report a Bug',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0112 12.75zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 01-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 0 002.248-2.354M12 12.75a2.25 2.25 0 01-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 00-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 01.4-2.253M12 8.25a2.25 2.25 0 00-2.248 2.146M12 8.25a2.25 2.25 0 012.248 2.146M8.683 5a6.032 6.032 0 01-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 3.75 0 0115.318 5m0 0c.427-.283.815-.62 1.155-.999a4.471 4.471 0 00-.575-1.752M4.921 6a24.048 24.048 0 00-.392 3.314c1.668.546 3.416.914 5.223 1.082M19.08 6c.205 1.08.337 2.187.392 3.314a23.882 23.882 0 01-5.223 1.082" />
        </svg>
      )
    },
    {
      value: 'donation',
      label: 'Donation Query',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      )
    },
    {
      value: 'fundraiser',
      label: 'Fundraiser Assistance',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      )
    },
    {
      value: 'volunteer',
      label: 'Volunteer Inquiry',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      )
    },
    {
      value: 'other',
      label: 'Other',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
        </svg>
      )
    }
  ];
  // useEffect(() => {
  //   toast.success("Test toast");
  // }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.queryType) {
      newErrors.queryType = 'Please select a category';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  console.log("1️⃣ Form validated, checking authentication...");

  try {
    // ✅ AUTH CHECK
    const user = await triggerGetMe().unwrap();
    console.log("2️⃣ User authenticated:", user);

    setIsAuthenticated(true);

    // ✅ CREATE TICKET
    console.log("3️⃣ Creating ticket...");
    await createTicket(formData).unwrap();

    console.log("4️⃣ Ticket created successfully");
    toast.success("✅ Your message has been sent successfully!");
    setSubmitted(true);

    setTimeout(() => {
      setFormData({
        fullName: "",
        email: "",
        queryType: "",
        message: "",
      });
      setSubmitted(false);
      setErrors({});
    }, 3000);

  } catch (error) {
    // console.error("🔴 handleSubmit error:", error);

    // 🔐 Check for authentication error
    // RTK Query errors can be in error.status or error.data.status
    if (error?.status === 401 || error?.originalStatus === 401) {
      toast.error("🔒 Please login to send your message.");
      setTimeout(() => {
        router.push("/login");
      }, 1500); // Give time for toast to show
      return;
    }

    // ❗ OTHER ERRORS
    const errorMessage = error?.data?.message || "⚠️ Something went wrong. Please try again.";
    toast.error(errorMessage);
  }
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Verified Support',
      description: 'Authentic assistance always'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
      title: 'Secure & Private',
      description: 'Your data is protected'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ),
      title: 'Dedicated Support',
      description: 'Expert team ready to resolve issues'
    }
  ];

  return (
    <section
      ref={ref}
      className={`py-16 sm:py-20 md:py-24 ${darkMode ? 'bg-zinc-900' : 'bg-gray-50'
        } relative overflow-hidden`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-1 w-12 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"></div>
            <div className="w-2 h-2 rounded-full bg-teal-500"></div>
            <div className="h-1 w-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
          </div>

          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
            Get In{' '}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400 text-transparent bg-clip-text">
              Touch
            </span>
          </h1>

          <p className={`text-base sm:text-lg max-w-2xl mx-auto mb-6 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Have a question or need assistance? We're here to help you every step of the way.
          </p>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`inline-block p-4 sm:p-5 rounded-2xl border backdrop-blur-sm ${darkMode
              ? 'bg-zinc-800/30 border-zinc-700/50'
              : 'bg-white/60 border-zinc-200'
              }`}
          >
            <p className={`text-sm sm:text-base italic ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
              "And lower your wing in humility to the believers." — Surah Al-Hijr (15:88)
            </p>
          </motion.div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className={`p-5 rounded-xl text-center backdrop-blur-sm ${darkMode
                ? 'bg-zinc-800/30 border border-zinc-700/50'
                : 'bg-white/60 border border-zinc-200'
                }`}
            >
              <div className={`w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center ${darkMode ? 'text-white' : 'text-white'
                }`}>
                {feature.icon}
              </div>
              <h3 className={`text-base font-semibold mb-1 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                {feature.title}
              </h3>
              <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-3xl mx-auto mb-12"
        >
          {!submitted ? (
            <div className={`p-6 sm:p-8 rounded-2xl backdrop-blur-sm border ${darkMode
              ? 'bg-zinc-800/30 border-zinc-700/50'
              : 'bg-white/80 border-zinc-200'
              } shadow-2xl`}>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="fullName"
                    className={`block text-sm font-semibold mb-2 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('fullName')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Enter your full name"
                      className={`w-full px-4 py-3 rounded-xl text-base transition-all duration-300 ${darkMode
                        ? 'bg-zinc-700/50 text-white placeholder-zinc-400 border-zinc-600'
                        : 'bg-white text-zinc-900 placeholder-zinc-500 border-zinc-300'
                        } border-2 ${errors.fullName
                          ? 'border-red-500'
                          : focusedField === 'fullName'
                            ? 'border-teal-500 shadow-lg shadow-teal-500/20'
                            : ''
                        } focus:outline-none`}
                    />
                  </div>
                  {errors.fullName && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-2 flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      {errors.fullName}
                    </motion.p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className={`block text-sm font-semibold mb-2 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="your.email@example.com"
                      className={`w-full px-5 py-4 rounded-xl text-base transition-all duration-300 ${darkMode
                        ? 'bg-zinc-700/50 text-white placeholder-zinc-400 border-zinc-600'
                        : 'bg-white text-zinc-900 placeholder-zinc-500 border-zinc-300'
                        } border-2 ${errors.email
                          ? 'border-red-500'
                          : focusedField === 'email'
                            ? 'border-teal-500 shadow-lg shadow-teal-500/20'
                            : ''
                        } focus:outline-none`}
                    />
                  </div>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-2 flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                {/* Query Type */}
                <div>
                  <label
                    htmlFor="queryType"
                    className={`block text-sm font-semibold mb-2 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                    </svg>
                    Category <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="queryType"
                      name="queryType"
                      value={formData.queryType}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('queryType')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-5 py-4 rounded-xl text-base transition-all duration-300 appearance-none cursor-pointer ${darkMode
                        ? 'bg-zinc-700/50 text-white border-zinc-600'
                        : 'bg-white text-zinc-900 border-zinc-300'
                        } border-2 ${errors.queryType
                          ? 'border-red-500'
                          : focusedField === 'queryType'
                            ? 'border-teal-500 shadow-lg shadow-teal-500/20'
                            : ''
                        } focus:outline-none`}
                    >
                      {queryTypes.map((type) => (
                        <option
                          key={type.value}
                          value={type.value}
                          className={darkMode ? 'bg-zinc-800' : 'bg-white'}
                        >
                          {type.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className={`w-5 h-5 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </div>
                  </div>
                  {errors.queryType && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-2 flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      {errors.queryType}
                    </motion.p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className={`block text-sm font-semibold mb-2 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                    </svg>
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      rows="5"
                      placeholder="Please provide details about your query..."
                      className={`w-full px-5 py-4 rounded-xl text-base resize-none transition-all duration-300 ${darkMode
                        ? 'bg-zinc-700/50 text-white placeholder-zinc-400 border-zinc-600'
                        : 'bg-white text-zinc-900 placeholder-zinc-500 border-zinc-300'
                        } border-2 ${errors.message
                          ? 'border-red-500'
                          : focusedField === 'message'
                            ? 'border-teal-500 shadow-lg shadow-teal-500/20'
                            : ''
                        } focus:outline-none`}
                    />
                    <div className={`absolute bottom-4 right-4 text-xs ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                      {formData.message.length} characters
                    </div>
                  </div>
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-2 flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      {errors.message}
                    </motion.p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-500 text-white font-semibold shadow-lg"
                >
                  {isLoading ? "Sending..." : "Send Message"}
                </motion.button>

              </form>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className={`p-10 sm:p-12 rounded-2xl text-center backdrop-blur-sm border ${darkMode
                ? 'bg-zinc-800/30 border-zinc-700/50'
                : 'bg-white/80 border-zinc-200'
                } shadow-2xl`}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
                className="w-20 h-20 mx-auto mb-5 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center"
              >
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className={`text-2xl sm:text-3xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-zinc-900'}`}
              >
                Message Sent Successfully!
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className={`text-base sm:text-lg mb-5 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}
              >
                Thank you for reaching out to us.
              </motion.p>
            </motion.div>
          )}
        </motion.div>

        {/* Help Centre Content - Collapsed Sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="max-w-5xl mx-auto mt-12"
        >
          <div className={`text-center mb-8 p-6 sm:p-8 rounded-xl ${darkMode ? 'bg-zinc-800/50' : 'bg-gray-50'
            }`}>
            <h2 className={`text-lg sm:text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
              Raise Your Concerns — We're Here to Listen, Solve, and Support
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
              At TPF Aid, we see every concern as an opportunity to improve — and every question as a responsibility before Allah and humanity.
              <span className="font-semibold"> You will never be ignored. You will never be alone.</span> If something goes wrong — we'll make it right.
            </p>
          </div>

          <HelpCentreSection darkMode={darkMode} isInView={isInView} />
        </motion.div>
      </div>
    </section>
  );
}