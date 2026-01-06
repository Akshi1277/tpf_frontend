'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import LoginModal from '../login/LoginModal';

import { useSelector, useDispatch } from 'react-redux';
import {
  Info,
  MessageCircle,
  FileText,
  Lock,
  Award,
  ChevronRight,
  Heart,
  Inbox,
  MessageSquare,
  User,
  Send,
  Loader2,
  MoreVertical,
  Edit2,
  Trash2,
  Check,
  XCircle,
} from 'lucide-react';
import {
  useGetCommentsQuery,
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} from '@/utils/slices/commentApiSlice';
import { useSendOtpMutation, useVerifyOtpMutation } from '@/utils/slices/authApiSlice';
import { setCredentials } from '@/utils/slices/authSlice';

export default function CampaignTabs({ darkMode, campaign }) {

  const userInfo = useSelector((state) => state.auth.userInfo);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingDocsAccess, setPendingDocsAccess] = useState(false);
  const [activeTab, setActiveTab] = useState('about')
  const isAuthenticated = !!userInfo;

  // Comments State
  const [commentPage, setCommentPage] = useState(1);
  const [newComment, setNewComment] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const BASE_URL = process.env.NEXT_PUBLIC_UPLOAD_URL;

  /* ---------------- API HOOKS ---------------- */
  // Comments
  const { data: commentsData, isLoading: commentsLoading, isFetching: commentsFetching } = useGetCommentsQuery({
    campaignId: campaign?._id,
    page: commentPage
  }, {
    skip: activeTab !== 'comments' || !campaign?._id,
  });

  const [addComment, { isLoading: isAdding }] = useAddCommentMutation();
  const [updateComment, { isLoading: isUpdating }] = useUpdateCommentMutation();
  const [deleteComment, { isLoading: isDeleting }] = useDeleteCommentMutation();

  // Auth Mutations
  const [sendOtp, { isLoading: sendingOtp }] = useSendOtpMutation();
  const [verifyOtp, { isLoading: verifyingOtp }] = useVerifyOtpMutation();

  /* ---------------- HANDLERS ---------------- */
  const handleSendOtp = async () => {
    if (mobile.length !== 10) return;
    try {
      await sendOtp({ mobileNo: mobile, type: 'login' }).unwrap();
      setStep('otp');
    } catch (err) {
      alert(err?.data?.message || "Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 4) return;
    try {
      const res = await verifyOtp({ mobileNo: mobile, otp }).unwrap();
      dispatch(setCredentials(res.user));
      setShowLogin(false);
      setStep('mobile');
      setMobile('');
      setOtp('');
    } catch (err) {
      alert(err?.data?.message || "Invalid OTP");
    }
  };

  const handlePostComment = async () => {
    if (!newComment.trim()) return;
    try {
      await addComment({
        campaignId: campaign._id,
        content: newComment,
        isAnonymous
      }).unwrap();
      setNewComment('');
      setIsAnonymous(false);
      setCommentPage(1); // Reset to first page to see new comment
    } catch (err) {
      console.error("Failed to post comment:", err);
      if (err?.status === 401) setShowLogin(true);
    }
  };

  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, id: null });

  const handleDelete = (id) => {
    setDeleteConfirm({ show: true, id });
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteComment(deleteConfirm.id).unwrap();
      setDeleteConfirm({ show: false, id: null });
    } catch (err) {
      console.error("Failed to delete", err);
    }
  };

  /* ---------------- SAFE DATA ---------------- */
  const impactGoals = campaign?.impactGoals ?? [];
  const documents = campaign?.documents ?? [];
  const donorMessages = campaign?.donorMessages ?? [];

  const handleDocumentsLogin = () => {
    if (!userInfo) {
      setPendingDocsAccess(true);
      setShowLoginModal(true);
    }
  };

  useEffect(() => {
    if (userInfo && pendingDocsAccess) {
      setPendingDocsAccess(false);
      setShowLoginModal(false);
    }
  }, [userInfo, pendingDocsAccess]);

  

  return (
    <div className={`${darkMode ? 'bg-zinc-800' : 'bg-white'} rounded-2xl shadow-lg overflow-hidden`}>
      {/* ---------------- TABS ---------------- */}
      <div className={`flex border-b ${darkMode ? 'border-zinc-700' : 'border-gray-200'}`}>
        {[
          { id: 'about', icon: Info, label: 'About' },
          { id: 'documents', icon: FileText, label: 'Documents', badge: documents.length },
          { id: 'comments', icon: MessageCircle, label: 'Comments', badge: commentsData?.data?.length || 0 },
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
          className={`p-6 md:p-8 ${(activeTab === 'documents' || activeTab === 'comments') ? 'min-h-[400px]' : ''}`}
        >
          {/* ================= ABOUT TAB ================= */}
          {activeTab === 'about' && (
            <div className="space-y-8">
              <div>
                <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  About This Campaign
                </h3>
                <p className={`whitespace-pre-line leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {campaign?.about || 'No description provided.'}
                </p>
              </div>

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
            <div className="relative min-h-[350px] flex flex-col">
              <div className={`flex-1 ${!isAuthenticated ? 'opacity-40 blur-sm pointer-events-none' : ''}`}>
                {documents.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 px-4">
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`w-20 h-20 rounded-full mb-6 flex items-center justify-center ${
                        darkMode ? 'bg-zinc-900' : 'bg-gray-100'
                      }`}
                    >
                      <Inbox className={`w-10 h-10 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                    </motion.div>
                    <h4 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      No Documents Yet
                    </h4>
                    <p className={`text-center max-w-md ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      Supporting documents will be uploaded here as they become available.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {documents.map((doc, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`flex items-center justify-between p-4 rounded-lg border transition-all hover:shadow-md
                          ${darkMode ? 'border-zinc-700 hover:border-emerald-500/50' : 'border-gray-200 hover:border-emerald-400'}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
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
                          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            darkMode 
                              ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20' 
                              : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                          }`}
                        >
                          View Document
                        </a>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {!isAuthenticated && (
                <div className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-md bg-black/40 rounded-xl">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-4 mx-auto">
                      <Lock className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-white font-semibold text-lg mb-2">Documents Locked</p>
                    <p className="text-white/80 text-sm mb-4 max-w-xs">
                      Sign in to access campaign documents and transparency reports
                    </p>
                    <button
                      onClick={handleDocumentsLogin}
                      className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-emerald-500/50 transition-all transform hover:scale-105"
                    >
                      Sign In to View
                    </button>
                  </motion.div>
                </div>
              )}
            </div>
          )}

          {/* ================= COMMENTS TAB ================= */}
          {activeTab === 'comments' && (
            <div className="min-h-[350px] flex flex-col">
              {donorMessages.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center py-16 px-4">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`w-20 h-20 rounded-full mb-6 flex items-center justify-center ${
                      darkMode ? 'bg-zinc-900' : 'bg-gray-100'
                    }`}
                  >
                    <MessageSquare className={`w-10 h-10 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                  </motion.div>
                  <h4 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    No Comments Yet
                  </h4>
                  <p className={`text-center max-w-md ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    Be the first to share words of encouragement and support for this cause.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {donorMessages.map((donor, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`p-5 rounded-xl border-l-4 border-emerald-500 transition-all hover:shadow-md
                        ${darkMode ? 'bg-zinc-900 hover:bg-zinc-900/80' : 'bg-gray-50 hover:bg-gray-100/80'}`}
                    >
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-semibold flex items-center justify-center flex-shrink-0">
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
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        darkMode={darkMode}
        onLoginSuccess={() => setShowLoginModal(false)}
      />


    </div>
  );
}