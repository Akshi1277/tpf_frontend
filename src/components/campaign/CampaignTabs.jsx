import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Info, MessageCircle, Image as ImageIcon, X, Smartphone, KeyRound, Heart, FileText, Lock, Award, ChevronRight } from 'lucide-react';

export default function CampaignTabs({ darkMode }) {
  const [activeTab, setActiveTab] = useState('about');
  const [showLogin, setShowLogin] = useState(false);
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('mobile');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    if (step === 'mobile') {
      if (mobile.length === 10) setStep('otp');
    } else if (step === 'otp') {
      if (otp.length === 6) {
        setLoggedIn(true);
        setShowLogin(false);
      }
    }
  };

  const documents = [
    { name: 'Financial Report Q4', date: 'Updated 1 week ago' },
    { name: 'Project Proposal', date: 'Last updated 2 days ago' }
  ];

  const donorMessages = [
    {
      name: 'Priya Sharma',
      amount: '₹5,000',
      message: 'Happy to contribute to such a noble cause. Every child deserves clean water.',
      time: '2 hours ago',
      avatar: 'PS'
    },
    {
      name: 'Rajesh Kumar',
      amount: '₹10,000',
      message: 'Keep up the excellent work. Looking forward to seeing the impact.',
      time: '5 hours ago',
      avatar: 'RK'
    },
    {
      name: 'Anonymous',
      amount: '₹2,500',
      message: 'Great initiative. Wishing you all the best!',
      time: '1 day ago',
      avatar: 'A'
    },
    {
      name: 'Anjali Verma',
      amount: '₹7,500',
      message: 'Proud to support this cause. Clean water is a basic human right.',
      time: '2 days ago',
      avatar: 'AV'
    }
  ];

  const galleryImages = [
    { url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80', label: 'Community Support' },
    { url: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&q=80', label: 'Clean Water' },
    { url: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80', label: 'Education' },
    { url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80', label: 'Food Security' },
    // { url: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=800&q=80', label: 'Agriculture' },
    { url: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&q=80', label: 'Empowerment' }
  ];

  return (
    <div className={`${darkMode ? 'bg-zinc-800' : 'bg-white'} rounded-2xl shadow-lg overflow-hidden`}>
      {/* Tabs */}
      <div className={`flex border-b ${darkMode ? 'border-zinc-700' : 'border-gray-200'}`}>
        {[
          { id: 'about', icon: Info, label: 'About' },
          { id: 'comments', icon: MessageCircle, label: 'Comments', badge: donorMessages.length },
          { id: 'gallery', icon: ImageIcon, label: 'Gallery', badge: galleryImages.length }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 font-medium transition-colors relative ${activeTab === tab.id
                ? darkMode
                  ? 'text-emerald-400'
                  : 'text-emerald-600'
                : darkMode
                  ? 'text-gray-400 hover:text-gray-300'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            <tab.icon className="w-5 h-5" />
            <span className="hidden sm:inline">{tab.label}</span>
            {tab.badge && (
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

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="p-6 md:p-8"
        >
          {/* About Tab */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <div>
                <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  About This Campaign
                </h3>
                <div className={`space-y-4 text-base leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <p>
                    Access to clean drinking water is a fundamental human right, yet millions of people in rural areas
                    lack this basic necessity. Our Clean Water Initiative aims to change this reality by building
                    sustainable water infrastructure in underserved communities.
                  </p>
                  <p>
                    Through this campaign, we will construct 25 new wells equipped with modern filtration systems,
                    providing clean, safe drinking water to over 5,000 families. Each well is designed to serve
                    200+ people and will be maintained by trained local community members.
                  </p>
                  <p>
                    Your donation directly funds materials, labor, and training programs that ensure long-term
                    sustainability. We believe in complete transparency - every rupee is tracked and reported
                    in our quarterly impact reports.
                  </p>
                </div>
              </div>

              <div className={`p-6 rounded-xl ${darkMode ? 'bg-zinc-900 border border-zinc-700' : 'bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100'}`}>
                <h4 className={`font-semibold mb-3 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  <Award className="w-5 h-5 text-blue-500" />
                  Campaign Impact Goals
                </h4>
                <ul className="space-y-2">
                  {[
                    '25 new water wells constructed',
                    '5,000+ families with clean water access',
                    '200+ local jobs created',
                    '15 community members trained in maintenance'
                  ].map((goal, i) => (
                    <li key={i} className={`flex items-start gap-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <ChevronRight className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Documents Section */}
              <div className={`p-6 rounded-xl relative overflow-hidden ${darkMode ? 'bg-zinc-900' : 'bg-gray-50'}`}>
                <h4 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Campaign Documents</h4>

                <div className={`grid gap-3 transition-all duration-500 ${!loggedIn ? 'opacity-40 blur-sm pointer-events-none' : 'opacity-100 blur-0'}`}>
                  {documents.map((doc, i) => (
                    <div key={i} className={`flex items-center justify-between p-4 rounded-lg border ${darkMode ? 'border-zinc-700' : 'border-gray-200'}`}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{doc.name}</p>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{doc.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {!loggedIn && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center backdrop-blur-md bg-black/40 rounded-xl"
                  >
                    <Lock className="w-10 h-10 text-white mb-3" />
                    <p className="text-white font-semibold mb-1">Documents Locked</p>
                    <p className="text-gray-200 text-sm mb-4">Login to view campaign files</p>
                    <button
                      onClick={() => setShowLogin(true)}
                      className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-emerald-500/30 transition-all cursor-pointer"
                    >
                      View Documents
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          )}

          {/* Comments Tab */}
          {activeTab === 'comments' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Donor Messages ({donorMessages.length})
                </h3>
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Recent contributions
                </span>
              </div>

              {donorMessages.map((donor, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-5 rounded-xl border-l-4 border-emerald-500 ${darkMode ? 'bg-zinc-900' : 'bg-gray-50'
                    }`}
                >
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white font-semibold flex items-center justify-center flex-shrink-0">
                      {donor.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {donor.name}
                        </span>
                        <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                          {donor.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <Heart className="w-4 h-4 text-emerald-500 fill-emerald-500" />
                        <span className={`text-sm font-medium ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                          Donated {donor.amount}
                        </span>
                      </div>
                      <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {donor.message}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Gallery Tab */}
          {activeTab === 'gallery' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Campaign Gallery
                </h3>
                <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center gap-1">
                  View All
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {galleryImages.map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
                  >
                    <img
                      src={img.url}
                      alt={img.label}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <p className="text-white font-medium text-sm">{img.label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

 <AnimatePresence>
  {showLogin && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={() => setShowLogin(false)}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className={`w-full ${
          step === "otp"
            ? "max-w-2xl"
            : "max-w-md"
        } bg-white rounded-3xl shadow-2xl p-6 sm:p-8 relative transition-all duration-300`}
      >
        {/* Close Button */}
        <button
          onClick={() => setShowLogin(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Logo/Brand */}
        <div className="flex items-center gap-2 mb-8 sm:mb-10">
          <img src="/TPFAid-Logo.png" alt="TPF Aid Logo" className="h-6 w-auto" />
        </div>

        {/* MOBILE STEP */}
        {step === "mobile" && (
          <div>
            {/* Header Section */}
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                Login with your mobile number
              </h2>
             
            </div>

            {/* Info Card */}
            <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <Smartphone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Quick & Secure Login</h3>
                  <p className="text-sm text-gray-600">
                    We'll send you a verification code to ensure your account security.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Mobile Input */}
              <div className="relative flex items-center border-b-2 border-teal-400 pb-2">
                <span className="flex items-center gap-2 text-base sm:text-lg font-medium mr-2 whitespace-nowrap">
                  <svg className="w-5 h-4" viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg">
                    <rect width="30" height="6.67" fill="#FF9933"/>
                    <rect y="6.67" width="30" height="6.67" fill="#FFFFFF"/>
                    <rect y="13.33" width="30" height="6.67" fill="#138808"/>
                    <circle cx="15" cy="10" r="2.5" fill="#000080"/>
                    <circle cx="15" cy="10" r="2" fill="transparent" stroke="#000080" strokeWidth="0.3"/>
                  </svg>
                  +91
                </span>
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setMobile(value.slice(0, 10));
                  }}
                  placeholder="Enter your mobile number"
                  className="flex-1 text-base sm:text-lg outline-none text-gray-900 placeholder-gray-400 bg-transparent min-w-0"
                />
              </div>

              {/* Continue Button */}
              <button
                onClick={() => {
                  handleLogin();
                  setStep("otp");
                }}
                disabled={mobile.length !== 10}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-semibold rounded-2xl transition-all text-base sm:text-lg shadow-lg shadow-blue-500/20"
              >
                Continue
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
               
              </div>

            

              {/* Footer Text */}
              <p className="text-xs text-center text-gray-500 pt-4">
                By continuing, you agree to our{" "}
                <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
                {" "}and{" "}
                <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
              </p>
            </div>
          </div>
        )}

        {/* OTP STEP */}
        {step === "otp" && (
          <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
            {/* LEFT SIDE */}
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Verify your account
              </h2>
              <p className="text-gray-500 mb-2 text-sm">
                Enter the verification code sent to your phone.
              </p>
              <p className="text-blue-600 font-medium text-sm mb-6 sm:mb-8">
                +91 {mobile}
              </p>

              {/* OTP Input */}
              <div className="flex gap-2 sm:gap-3 mb-6 sm:mb-8 justify-center sm:justify-start">
                {[...Array(4)].map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    value={otp[index] || ""}
                    onChange={(e) => {
                      const newOtp = otp.split("");
                      newOtp[index] = e.target.value;
                      setOtp(newOtp.join(""));
                      if (e.target.value && index < 3) {
                        e.target.nextElementSibling?.focus();
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace" && !otp[index] && index > 0) {
                        e.target.previousElementSibling?.focus();
                      }
                    }}
                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-center text-xl sm:text-2xl font-semibold border-2 border-gray-300 rounded-xl outline-none focus:border-blue-600 transition-colors"
                  />
                ))}
              </div>

              {/* Security Info */}
              <div className="mb-6 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Lock className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Secure verification.</span> We never share your phone number with anyone.
                    </p>
                  </div>
                </div>
              </div>

              {/* Resend Link */}
              <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left mb-4">
                Haven't received the code?{" "}
                <button
                  onClick={() => setStep("mobile")}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Send again
                </button>
              </p>

              {/* Verify Button (auto visible after typing 4 digits) */}
              {otp.length === 4 && (
                <button
                  onClick={handleLogin}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/20"
                >
                  Verify & Continue
                </button>
              )}
            </div>

            {/* RIGHT SIDE (Illustration) - Hidden on mobile */}
            <div className="hidden md:flex items-center justify-center flex-1 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
              <div className="relative">
                <div className="w-48 h-64 bg-white rounded-3xl shadow-xl border-4 border-slate-800 flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="absolute top-8 -right-4 w-24 h-16 bg-teal-500 rounded-2xl rounded-tr-none shadow-lg flex items-center justify-center">
                    <div className="flex gap-1">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-white rounded-full"></div>
                      ))}
                    </div>
                  </div>

                  <div className="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center mb-4">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>

                  <div className="space-y-2 w-32">
                    <div className="h-1 bg-gray-200 rounded"></div>
                    <div className="h-1 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

      </AnimatePresence>
    </div>
  );
}