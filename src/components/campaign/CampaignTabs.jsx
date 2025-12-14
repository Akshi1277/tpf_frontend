'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  Info,
  MessageCircle,
  FileText,
  Lock,
  Award,
  ChevronRight,
  X,
  Smartphone,
  Heart,
} from 'lucide-react';

export default function CampaignTabs({ darkMode, campaign }) {
  const [activeTab, setActiveTab] = useState('about');
  const [showLogin, setShowLogin] = useState(false);
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('mobile');
  const [loggedIn, setLoggedIn] = useState(false);


  const BASE_URL = process.env.NEXT_PUBLIC_UPLOAD_URL;

  /* ---------------- SAFE DATA ---------------- */
  const impactGoals = campaign?.impactGoals ?? [];
  const documents = campaign?.documents ?? [];
  const donorMessages = campaign?.donorMessages ?? [];

  /* ---------------- LOGIN HANDLER ---------------- */
  const handleLogin = () => {
    if (step === 'mobile' && mobile.length === 10) {
      setStep('otp');
    } else if (step === 'otp' && otp.length === 4) {
      setLoggedIn(true);
      setShowLogin(false);
    }
  };

  return (
    <div className={`${darkMode ? 'bg-zinc-800' : 'bg-white'} rounded-2xl shadow-lg overflow-hidden`}>
      {/* ---------------- TABS ---------------- */}
      <div className={`flex border-b ${darkMode ? 'border-zinc-700' : 'border-gray-200'}`}>
        {[
          { id: 'about', icon: Info, label: 'About' },
          { id: 'documents', icon: FileText, label: 'Documents', badge: documents.length },
          { id: 'comments', icon: MessageCircle, label: 'Comments', badge: donorMessages.length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 font-medium relative transition-colors
              ${activeTab === tab.id
                ? darkMode ? 'text-emerald-400' : 'text-emerald-600'
                : darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            <tab.icon className="w-5 h-5" />
            <span className="hidden sm:inline">{tab.label}</span>

            {tab.badge > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-xs font-semibold">
                {tab.badge}
              </span>
            )}

            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500"
              />
            )}
          </button>
        ))}
      </div>

      {/* ---------------- TAB CONTENT ---------------- */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="p-6 md:p-8"
        >
          {/* ================= ABOUT TAB ================= */}
          {activeTab === 'about' && (
            <div className="space-y-8">
              {/* About */}
              <div>
                <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  About This Campaign
                </h3>
                <p className={`whitespace-pre-line leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {campaign?.about || 'No description provided.'}
                </p>
              </div>

              {/* Beneficiary */}
              {campaign?.beneficiaryName && (
                <div className={`p-5 rounded-xl ${darkMode ? 'bg-zinc-900 border border-zinc-700' : 'bg-gray-50 border border-gray-200'}`}>
                  <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Beneficiary Details
                  </h4>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <span className="font-medium">Beneficiary:</span> {campaign.beneficiaryName}
                  </p>
                </div>
              )}

              {/* Impact Goals */}
              {impactGoals.length > 0 && (
                <div className={`p-6 rounded-xl ${darkMode ? 'bg-zinc-900 border border-zinc-700' : 'bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100'}`}>
                  <h4 className={`font-semibold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    <Award className="w-5 h-5 text-blue-500" />
                    Campaign Impact Goals
                  </h4>
                  <ul className="space-y-2">
                    {impactGoals.map((goal, i) => (
                      <li key={i} className={`flex items-start gap-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <ChevronRight className="w-5 h-5 text-emerald-500 mt-0.5" />
                        <span>{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* ================= DOCUMENTS TAB ================= */}
          {activeTab === 'documents' && (
            <div className="relative">
              <div className={`space-y-3 ${!loggedIn ? 'opacity-40 blur-sm pointer-events-none' : ''}`}>
                {documents.length === 0 && (
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                    No documents available.
                  </p>
                )}

                {documents.map((doc, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between p-4 rounded-lg border
                      ${darkMode ? 'border-zinc-700' : 'border-gray-200'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {doc.name}
                        </p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {doc.fileType?.toUpperCase()}
                        </p>
                      </div>
                    </div>

                    <a
                      href={`${BASE_URL}${doc.fileUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Document
                    </a>
                  </div>
                ))}
              </div>

              {!loggedIn && (
                <div className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-md bg-black/40 rounded-xl">
                  <Lock className="w-10 h-10 text-white mb-3" />
                  <p className="text-white font-semibold mb-1">Documents Locked</p>
                  <button
                    onClick={() => setShowLogin(true)}
                    className="px-5 py-2.5 bg-emerald-600 text-white rounded-lg font-semibold"
                  >
                    Login to View
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ================= COMMENTS TAB ================= */}
          {activeTab === 'comments' && (
            <div className="space-y-4">
              {donorMessages.length === 0 && (
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  No comments yet.
                </p>
              )}

              {donorMessages.map((donor, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`p-5 rounded-xl border-l-4 border-emerald-500
                    ${darkMode ? 'bg-zinc-900' : 'bg-gray-50'}`}
                >
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-600 text-white font-semibold flex items-center justify-center">
                      {donor.name?.charAt(0) || 'A'}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {donor.name || 'Anonymous'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(donor.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      {donor.amount && (
                        <div className="flex items-center gap-2 mb-2">
                          <Heart className="w-4 h-4 text-emerald-500 fill-emerald-500" />
                          <span className="text-sm text-emerald-600 font-medium">
                            Donated ₹{donor.amount.toLocaleString()}
                          </span>
                        </div>
                      )}

                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {donor.message}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* ================= LOGIN MODAL ================= */}
      <AnimatePresence>
        {showLogin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            onClick={() => setShowLogin(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 w-full max-w-md"
            >
              <button onClick={() => setShowLogin(false)} className="absolute top-4 right-4">
                <X />
              </button>

              <h2 className="text-xl font-bold mb-4">Login to Continue</h2>

              {step === 'mobile' && (
                <>
                  <input
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="Enter mobile number"
                    className="w-full border p-3 rounded mb-4"
                  />
                  <button
                    onClick={handleLogin}
                    className="w-full bg-emerald-600 text-white py-3 rounded"
                  >
                    Send OTP
                  </button>
                </>
              )}

              {step === 'otp' && (
                <>
                  <input
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    placeholder="Enter OTP"
                    className="w-full border p-3 rounded mb-4"
                  />
                  <button
                    onClick={handleLogin}
                    className="w-full bg-emerald-600 text-white py-3 rounded"
                  >
                    Verify
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
