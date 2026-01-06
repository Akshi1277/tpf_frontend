'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
  const [activeTab, setActiveTab] = useState('about');
  const [showLogin, setShowLogin] = useState(false);

  // Login State
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('mobile');

  // Redux Auth
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  // Comments State
  const [commentPage, setCommentPage] = useState(1);
  const [newComment, setNewComment] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState('');

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

  const handleEdit = (comment) => {
    setEditingId(comment._id);
    setEditContent(comment.content);
  };

  const handleSaveEdit = async () => {
    if (!editContent.trim()) return;
    try {
      await updateComment({
        id: editingId,
        content: editContent
      }).unwrap();
      setEditingId(null);
      setEditContent('');
    } catch (err) {
      console.error("Failed to update comment:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete your comment?")) {
      try {
        await deleteComment(id).unwrap();
      } catch (err) {
        console.error("Failed to delete", err);
      }
    }
  };

  /* ---------------- SAFE DATA ---------------- */
  const impactGoals = campaign?.impactGoals ?? [];
  const documents = campaign?.documents ?? [];

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
          className="p-6 md:p-8"
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
            <div className="relative">
              <div className={`space-y-3 ${!userInfo ? 'opacity-40 blur-sm pointer-events-none' : ''}`}>
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

              {!userInfo && (
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
            <div className="space-y-8">
              {/* --- Post Comment Section --- */}
              {userInfo ? (
                <div className={`p-4 rounded-xl border ${darkMode ? 'bg-zinc-900 border-zinc-700' : 'bg-gray-50 border-gray-100'}`}>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                      {userInfo.fullName?.charAt(0) || 'U'}
                    </div>
                    <div className="flex-1">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment..."
                        className={`w-full bg-transparent border-0 focus:ring-0 p-0 text-base resize-none min-h-[60px] ${darkMode ? 'text-white placeholder-zinc-500' : 'text-gray-900 placeholder-gray-400'}`}
                        maxLength={1000}
                      />
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-dashed border-gray-200/20">
                        <label className={`flex items-center gap-2 text-sm cursor-pointer select-none ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}>
                          <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isAnonymous ? 'bg-emerald-500 border-emerald-500' : 'border-gray-400'}`}>
                            {isAnonymous && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <input type="checkbox" checked={isAnonymous} onChange={e => setIsAnonymous(e.target.checked)} className="hidden" />
                          Comment as Anonymous
                        </label>
                        <button
                          onClick={handlePostComment}
                          disabled={!newComment.trim() || isAdding}
                          className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-all
                              ${!newComment.trim() ? 'opacity-50 cursor-not-allowed bg-gray-200 text-gray-400' : 'bg-emerald-600 text-white hover:bg-emerald-700'}`}
                        >
                          {isAdding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                          Post
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={`text-center p-8 rounded-xl border border-dashed ${darkMode ? 'border-zinc-700 bg-zinc-800/50' : 'border-gray-200 bg-gray-50'}`}>
                  <MessageCircle className={`w-12 h-12 mx-auto mb-3 ${darkMode ? 'text-zinc-600' : 'text-gray-300'}`} />
                  <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Join the conversation by logging in.</p>
                  <button
                    onClick={() => setShowLogin(true)}
                    className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                  >
                    Login to Comment
                  </button>
                </div>
              )}

              {/* --- Comment List --- */}
              <div className="space-y-4">
                {commentsLoading && commentPage === 1 ? (
                  <div className="text-center py-10">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-emerald-500" />
                  </div>
                ) : commentsData?.data?.length === 0 ? (
                  <p className={`text-center py-10 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>No comments yet. Be the first to share your thoughts!</p>
                ) : (
                  <>
                    {commentsData?.data?.map((comment) => (
                      <motion.div
                        key={comment._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-5 rounded-xl border-l-4 
                          ${editingId === comment._id ? 'border-amber-500' : 'border-emerald-500'}
                          ${darkMode ? 'bg-zinc-900' : 'bg-gray-50'}`}
                      >
                        {editingId === comment._id ? (
                          // Edit Mode
                          <div>
                            <textarea
                              value={editContent}
                              onChange={(e) => setEditContent(e.target.value)}
                              className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none resize-none min-h-[80px] mb-3 ${darkMode ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-200 text-gray-900'}`}
                            />
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => setEditingId(null)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${darkMode ? 'text-gray-400 hover:bg-zinc-800' : 'text-gray-600 hover:bg-gray-200'}`}
                              >
                                Cancel
                              </button>
                              <button
                                onClick={handleSaveEdit}
                                disabled={isUpdating || !editContent.trim()}
                                className="px-3 py-1.5 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 disabled:opacity-50"
                              >
                                {isUpdating ? 'Saving...' : 'Save Changes'}
                              </button>
                            </div>
                          </div>
                        ) : (
                          // Display Mode
                          <div className="flex gap-4">
                            <div className={`w-12 h-12 rounded-full font-semibold flex items-center justify-center shrink-0
                               ${comment.isAnonymous ? 'bg-gray-500' : 'bg-emerald-600'} text-white`}>
                              {comment.user?.fullName ? comment.user.fullName.charAt(0) : 'A'}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start mb-1">
                                <div>
                                  <span className={`font-semibold mr-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {comment.user?.fullName || 'Anonymous'}
                                    {comment.isOwner && comment.isAnonymous && <span className="opacity-50 ml-1">(You)</span>}
                                  </span>
                                  <span className="text-xs text-gray-500 whitespace-nowrap">
                                    {new Date(comment.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                  </span>
                                </div>

                                {/* Edit/Delete Actions */}
                                {comment.isOwner && (
                                  <div className="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                      onClick={() => handleEdit(comment)}
                                      className={`p-1.5 rounded hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-500 hover:text-blue-500`}
                                      title="Edit"
                                    >
                                      <Edit2 className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => handleDelete(comment._id)}
                                      className={`p-1.5 rounded hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-500 hover:text-red-500`}
                                      title="Delete"
                                    >
                                      {isDeleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                                    </button>
                                  </div>
                                )}
                              </div>

                              <p className={`whitespace-pre-wrap break-words ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                {comment.content}
                              </p>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}

                    {/* Load More */}
                    {commentsData?.hasMore && (
                      <div className="text-center pt-2">
                        <button
                          onClick={() => setCommentPage(prev => prev + 1)}
                          disabled={commentsFetching}
                          className={`text-sm font-semibold hover:underline ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}
                        >
                          {commentsFetching ? 'Loading...' : 'Load More Comments'}
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
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
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            onClick={() => setShowLogin(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 w-full max-w-md relative"
            >
              <button onClick={() => setShowLogin(false)} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-xl font-bold mb-4 text-gray-900">Login Required</h2>
              <p className="text-gray-600 mb-6">Please log in to view documents or post comments.</p>

              <div className="flex flex-col gap-3">
                {step === 'mobile' && (
                  <>
                    <input
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="Enter mobile number"
                      className="w-full border border-gray-300 p-3 rounded-xl mb-2 text-gray-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                      maxLength={10}
                    />
                    <button
                      onClick={handleSendOtp}
                      disabled={mobile.length < 10 || sendingOtp}
                      className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 disabled:opacity-50 flex justify-center items-center"
                    >
                      {sendingOtp ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send OTP"}
                    </button>
                  </>
                )}

                {step === 'otp' && (
                  <>
                    <input
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      placeholder="Enter 4-digit OTP"
                      className="w-full border border-gray-300 p-3 rounded-xl mb-2 text-gray-900 focus:ring-2 focus:ring-emerald-500 outline-none text-center tracking-widest text-lg"
                      maxLength={4}
                    />
                    <button
                      onClick={handleVerifyOtp}
                      disabled={otp.length < 4 || verifyingOtp}
                      className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 disabled:opacity-50 flex justify-center items-center"
                    >
                      {verifyingOtp ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify & Login"}
                    </button>
                  </>
                )}
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
