'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoginModal from '../login/LoginModal';
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
  Send,
  Loader2,
  Trash2,
  Check,
  Activity,
  User,
  Share2,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
  Linkedin,
  ExternalLink,
} from 'lucide-react';
import {
  useGetCommentsQuery,
  useAddCommentMutation,
  useDeleteCommentMutation,
} from '@/utils/slices/commentApiSlice';
import { getMediaUrl } from '@/utils/media';

export default function CampaignTabs({ darkMode, campaign }) {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingDocsAccess, setPendingDocsAccess] = useState(false);
  const [pendingCommentsAccess, setPendingCommentsAccess] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  const isAuthenticated = !!userInfo;

  // Comments State
  const [commentPage, setCommentPage] = useState(1);
  const [newComment, setNewComment] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  /* ---------------- API HOOKS ---------------- */
  const { data: commentsData, isLoading: commentsLoading, isFetching: commentsFetching } = useGetCommentsQuery({
    campaignId: campaign?._id,
    page: commentPage
  }, {
    skip: activeTab !== 'comments' || !campaign?._id,
  });

  const [addComment, { isLoading: isAdding }] = useAddCommentMutation();
  const [deleteComment, { isLoading: isDeleting }] = useDeleteCommentMutation();

  /* ---------------- SAFE DATA ---------------- */
  const impactGoals = campaign?.impactGoals ?? [];
  const documents = campaign?.documents ?? [];

  // Get social media links from the latest submission
  const socialMediaLinks = campaign?.socialMediaSubmissions?.[0]?.links || {};
  const hasSocialMedia = Object.values(socialMediaLinks).some(link => link && link.trim() !== '');

  // Helper to get social media icon and color
  const getSocialConfig = (platform) => {
    const configs = {
      instagram: {
        icon: Instagram,
        color: 'from-purple-500 to-pink-500',
        hoverColor: 'hover:border-purple-500/50',
        darkHoverColor: 'hover:border-purple-400/50',
        bgLight: 'bg-purple-50/30',
        bgDark: 'bg-purple-500/10',
        iconBgLight: 'bg-purple-100',
        iconBgDark: 'bg-purple-500/10',
        iconHoverLight: 'group-hover:bg-purple-200',
        iconHoverDark: 'group-hover:bg-purple-500/20',
        textLight: 'text-purple-600',
        textDark: 'text-purple-400'
      },
      facebook: {
        icon: Facebook,
        color: 'from-blue-600 to-blue-700',
        hoverColor: 'hover:border-blue-500/50',
        darkHoverColor: 'hover:border-blue-400/50',
        bgLight: 'bg-blue-50/30',
        bgDark: 'bg-blue-500/10',
        iconBgLight: 'bg-blue-100',
        iconBgDark: 'bg-blue-500/10',
        iconHoverLight: 'group-hover:bg-blue-200',
        iconHoverDark: 'group-hover:bg-blue-500/20',
        textLight: 'text-blue-600',
        textDark: 'text-blue-400'
      },
      youtube: {
        icon: Youtube,
        color: 'from-red-500 to-red-600',
        hoverColor: 'hover:border-red-500/50',
        darkHoverColor: 'hover:border-red-400/50',
        bgLight: 'bg-red-50/30',
        bgDark: 'bg-red-500/10',
        iconBgLight: 'bg-red-100',
        iconBgDark: 'bg-red-500/10',
        iconHoverLight: 'group-hover:bg-red-200',
        iconHoverDark: 'group-hover:bg-red-500/20',
        textLight: 'text-red-600',
        textDark: 'text-red-400'
      },
      twitter: {
        icon: Twitter,
        color: 'from-sky-400 to-sky-500',
        hoverColor: 'hover:border-sky-500/50',
        darkHoverColor: 'hover:border-sky-400/50',
        bgLight: 'bg-sky-50/30',
        bgDark: 'bg-sky-500/10',
        iconBgLight: 'bg-sky-100',
        iconBgDark: 'bg-sky-500/10',
        iconHoverLight: 'group-hover:bg-sky-200',
        iconHoverDark: 'group-hover:bg-sky-500/20',
        textLight: 'text-sky-600',
        textDark: 'text-sky-400'
      },
      linkedin: {
        icon: Linkedin,
        color: 'from-blue-600 to-blue-700',
        hoverColor: 'hover:border-blue-600/50',
        darkHoverColor: 'hover:border-blue-500/50',
        bgLight: 'bg-blue-50/30',
        bgDark: 'bg-blue-600/10',
        iconBgLight: 'bg-blue-100',
        iconBgDark: 'bg-blue-600/10',
        iconHoverLight: 'group-hover:bg-blue-200',
        iconHoverDark: 'group-hover:bg-blue-600/20',
        textLight: 'text-blue-700',
        textDark: 'text-blue-400'
      },
      other: {
        icon: ExternalLink,
        color: 'from-gray-500 to-gray-600',
        hoverColor: 'hover:border-gray-500/50',
        darkHoverColor: 'hover:border-gray-400/50',
        bgLight: 'bg-gray-50/30',
        bgDark: 'bg-gray-500/10',
        iconBgLight: 'bg-gray-100',
        iconBgDark: 'bg-gray-500/10',
        iconHoverLight: 'group-hover:bg-gray-200',
        iconHoverDark: 'group-hover:bg-gray-500/20',
        textLight: 'text-gray-600',
        textDark: 'text-gray-400'
      },
    };
    return configs[platform] || configs.other;
  };

  // Helper to get platform display name
  const getPlatformName = (platform) => {
    const names = {
      instagram: 'Instagram',
      facebook: 'Facebook',
      youtube: 'YouTube',
      twitter: 'Twitter',
      linkedin: 'LinkedIn',
      other: 'Website',
    };
    return names[platform] || platform;
  };

  const handleDocumentsLogin = () => {
    if (!userInfo) {
      setPendingDocsAccess(true);
      setPendingCommentsAccess(false);
      setShowLoginModal(true);
    }
  };

  const handleCommentsLogin = () => {
    if (!userInfo) {
      setPendingCommentsAccess(true);
      setPendingDocsAccess(false);
      setShowLoginModal(true);
    }
  };

  useEffect(() => {
    if (userInfo && (pendingDocsAccess || pendingCommentsAccess)) {
      setPendingDocsAccess(false);
      setPendingCommentsAccess(false);
      setShowLoginModal(false);
    }
  }, [userInfo, pendingDocsAccess, pendingCommentsAccess]);

  const handlePostComment = async () => {
    if (!userInfo) {
      handleCommentsLogin();
      return;
    }
    if (!newComment.trim()) return;
    try {
      await addComment({
        campaignId: campaign._id,
        content: newComment,
        isAnonymous
      }).unwrap();
      setNewComment('');
      setIsAnonymous(false);
      setCommentPage(1);
    } catch (err) {
      console.error("Failed to post comment:", err);
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

  return (
    <div className={`${darkMode ? 'bg-zinc-800' : 'bg-white'} rounded-2xl shadow-lg overflow-hidden`}>
      {/* ---------------- TABS ---------------- */}
      <div className={`flex border-b ${darkMode ? 'border-zinc-700' : 'border-gray-200'}`}>
        {[
          { id: 'about', icon: Info, label: 'About' },
          { id: 'status', icon: Activity, label: 'Current Status' },
          { id: 'documents', icon: FileText, label: 'Documents', badge: documents.length },
          { id: 'comments', icon: MessageCircle, label: 'Comments', badge: commentsData?.data?.length || 0 },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-3 sm:py-4 px-2 sm:px-4 font-medium relative transition-colors
              ${activeTab === tab.id
                ? darkMode ? 'text-emerald-400' : 'text-emerald-600'
                : darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            <tab.icon className="w-5 h-5" />
            <span className="text-[10px] sm:text-sm">{tab.label}</span>

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
          className={`p-4 sm:p-6 md:p-8 ${(activeTab === 'documents' || activeTab === 'comments') ? 'min-h-[300px] sm:min-h-[400px]' : ''}`}
        >
          {/* ================= ABOUT TAB ================= */}
          {activeTab === 'about' && (
            <div className="space-y-8">
              {/* About */}
              <div>
                <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  About This Campaign
                </h3>

                {/* Beneficiary & Campaigner Info Boxes */}
                {campaign?.beneficiaryName && (
                  <div className="space-y-4 mb-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Campaigner Box */}
                      <div className={`group p-5 rounded-2xl border transition-all duration-300 hover:shadow-lg ${darkMode ? 'bg-zinc-900/50 border-zinc-700 hover:border-blue-500/50' : 'bg-blue-50/30 border-blue-100 hover:border-blue-300'}`}>
                        <div className="flex items-center gap-2 mb-2 sm:mb-3">
                          <div className={`p-1.5 sm:p-2 rounded-xl transition-colors ${darkMode ? 'bg-blue-500/10 group-hover:bg-blue-500/20' : 'bg-blue-100 group-hover:bg-blue-200'}`}>
                            <User className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                          </div>
                          <h4 className={`font-bold text-[10px] sm:text-xs uppercase tracking-widest ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                            Campaigner
                          </h4>
                        </div>
                        <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {campaign.campaignerName || campaign.fullName}
                        </p>
                        <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Verified campaign organizer
                        </p>
                      </div>

                      {/* Beneficiary Box */}
                      <div className={`group p-5 rounded-2xl border transition-all duration-300 hover:shadow-lg ${darkMode ? 'bg-zinc-900/50 border-zinc-700 hover:border-emerald-500/50' : 'bg-emerald-50/30 border-emerald-100 hover:border-emerald-300'}`}>
                        <div className="flex items-center gap-2 mb-2 sm:mb-3">
                          <div className={`p-1.5 sm:p-2 rounded-xl transition-colors ${darkMode ? 'bg-emerald-500/10 group-hover:bg-emerald-500/20' : 'bg-emerald-100 group-hover:bg-emerald-200'}`}>
                            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
                          </div>
                          <h4 className={`font-bold text-[10px] sm:text-xs uppercase tracking-widest ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                            Beneficiary
                          </h4>
                        </div>
                        <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {campaign.beneficiaryName}
                        </p>
                        <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          The primary recipient of this fund
                        </p>
                      </div>
                    </div>

                    {/* Social Media Box */}
                    {hasSocialMedia && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className={`group p-5 rounded-2xl border transition-all duration-300 hover:shadow-lg ${darkMode ? 'bg-zinc-900/50 border-zinc-700 hover:border-teal-500/50' : 'bg-teal-50/30 border-teal-100 hover:border-teal-300'}`}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`p-2 rounded-xl transition-colors ${darkMode ? 'bg-teal-500/10 group-hover:bg-teal-500/20' : 'bg-teal-100 group-hover:bg-teal-200'}`}>
                            <Share2 className="w-5 h-5 text-teal-500" />
                          </div>
                          <h4 className={`font-bold text-xs uppercase tracking-widest ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}>
                            Follow Campaign Updates
                          </h4>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {Object.entries(socialMediaLinks).map(([platform, url]) => {
                            if (!url || url.trim() === '') return null;
                            const config = getSocialConfig(platform);
                            const Icon = config.icon;

                            return (
                              <a
                                key={platform}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`group/link flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200 hover:shadow-md ${darkMode
                                    ? `${config.bgDark} border-zinc-700 ${config.darkHoverColor}`
                                    : `${config.bgLight} border-gray-200 ${config.hoverColor}`
                                  }`}
                              >
                                <div className={`p-1.5 rounded-md transition-colors ${darkMode
                                    ? `${config.iconBgDark} ${config.iconHoverDark}`
                                    : `${config.iconBgLight} ${config.iconHoverLight}`
                                  }`}>
                                  <Icon className={`w-4 h-4 ${darkMode ? config.textDark : config.textLight}`} />
                                </div>
                                <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                  {getPlatformName(platform)}
                                </span>
                                <ExternalLink className={`w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity ${darkMode ? 'text-gray-400' : 'text-gray-500'
                                  }`} />
                              </a>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}

                <p className={`whitespace-pre-line leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {campaign?.about || 'No description provided.'}
                </p>
              </div>

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
            <div className="relative min-h-[350px] flex flex-col">
              <div className={`flex-1 ${!isAuthenticated ? 'opacity-40 blur-sm pointer-events-none' : ''}`}>
                {documents.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 px-4">
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`w-20 h-20 rounded-full mb-6 flex items-center justify-center ${darkMode ? 'bg-zinc-900' : 'bg-gray-100'
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
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
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
                          href={getMediaUrl(doc.fileUrl)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`px-4 py-2 rounded-lg font-medium transition-colors ${darkMode
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
            <div className="relative min-h-[350px] flex flex-col">
              <div className={`flex-1 ${!isAuthenticated ? 'opacity-40 blur-sm pointer-events-none' : ''}`}>
                <div className="space-y-8">
                  {/* --- Post Comment Section --- */}
                  {isAuthenticated && !commentsData?.userHasCommented && (
                    <div className={`p-4 rounded-xl border ${darkMode ? 'bg-zinc-900 border-zinc-700' : 'bg-gray-50 border-gray-100'}`}>
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center font-bold">
                          {userInfo?.fullName?.charAt(0) || 'U'}
                        </div>
                        <div className="flex-1">
                          <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Write a comment..."
                            className={`w-full bg-transparent border-0 focus:ring-0 outline-none p-0 text-base resize-none min-h-[60px] ${darkMode ? 'text-white placeholder-zinc-500' : 'text-gray-900 placeholder-gray-400'}`}
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
                  )}

                  {isAuthenticated && commentsData?.userHasCommented && (
                    <div className={`p-4 rounded-xl border border-dashed text-center ${darkMode ? 'bg-zinc-900/30 border-zinc-700 text-zinc-400' : 'bg-gray-50/50 border-gray-200 text-gray-500'}`}>
                      <p className="text-sm">You have already shared your thoughts on this campaign. Thank you for your support!</p>
                    </div>
                  )}

                  {/* --- Comment List --- */}
                  <div className="space-y-4">
                    {commentsLoading && commentPage === 1 ? (
                      <div className="text-center py-10">
                        <Loader2 className="w-8 h-8 animate-spin mx-auto text-emerald-500" />
                      </div>
                    ) : commentsData?.data?.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-16 px-4">
                        <motion.div
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className={`w-20 h-20 rounded-full mb-6 flex items-center justify-center ${darkMode ? 'bg-zinc-900' : 'bg-gray-100'
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
                      <>
                        {(isExpanded ? commentsData?.data : commentsData?.data?.slice(0, 5)).map((comment) => (
                          <motion.div
                            key={comment._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-5 rounded-xl border-l-4 border-emerald-500 transition-all hover:shadow-md
                              ${darkMode ? 'bg-zinc-900 hover:bg-zinc-900/80' : 'bg-gray-50 hover:bg-gray-100/80'}`}
                          >
                            <div className="flex gap-4">
                              <div className={`w-12 h-12 rounded-full font-semibold flex items-center justify-center shrink-0
                                 ${comment.isAnonymous ? 'bg-gray-500' : 'bg-gradient-to-br from-emerald-500 to-teal-600'} text-white`}>
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

                                  {/* Delete Action */}
                                  {comment.isOwner && (
                                    <button
                                      onClick={() => handleDelete(comment._id)}
                                      disabled={isDeleting}
                                      className={`p-2 rounded-xl transition-all duration-200 hover:scale-105
                                        ${darkMode
                                          ? 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20'
                                          : 'bg-red-50 hover:bg-red-100 text-red-600 border border-red-200'}`}
                                      title="Delete Comment"
                                    >
                                      {isDeleting ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                      ) : (
                                        <Trash2 className="w-4 h-4" />
                                      )}
                                    </button>
                                  )}
                                </div>

                                <p className={`whitespace-pre-wrap break-words ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                  {comment.content}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ))}

                        {/* Show More / Less / Load More */}
                        <div className="flex flex-col items-center gap-3 pt-2">
                          {(commentsData?.totalCount > 5 || commentsData?.data?.length > 5) && (
                            <button
                              onClick={() => setIsExpanded(!isExpanded)}
                              className={`text-sm font-semibold hover:underline ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}
                            >
                              {isExpanded ? 'Show Less Comments' : 'Show More Comments'}
                            </button>
                          )}

                          {isExpanded && commentsData?.hasMore && (
                            <button
                              onClick={() => setCommentPage(prev => prev + 1)}
                              disabled={commentsFetching}
                              className={`text-xs opacity-60 hover:opacity-100 flex items-center gap-1 ${darkMode ? 'text-white' : 'text-zinc-600'}`}
                            >
                              {commentsFetching ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
                              Load Older Comments
                            </button>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
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
                    <p className="text-white font-semibold text-lg mb-2">Comments Locked</p>
                    <p className="text-white/80 text-sm mb-4 max-w-xs">
                      Sign in to read and post comments for this campaign
                    </p>
                    <button
                      onClick={handleCommentsLogin}
                      className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-emerald-500/50 transition-all transform hover:scale-105"
                    >
                      Sign In to Comment
                    </button>
                  </motion.div>
                </div>
              )}
            </div>
          )}

          {/* ================= CURRENT STATUS TAB ================= */}
          {activeTab === 'status' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-xl ${darkMode ? 'bg-emerald-500/10' : 'bg-emerald-50'}`}>
                  <Activity className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Current Status
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Latest updates from the ground
                  </p>
                </div>
              </div>

              <div className={`p-6 rounded-2xl border transition-all ${darkMode
                ? 'bg-zinc-900/50 border-zinc-700'
                : 'bg-white border-gray-200 shadow-sm'
                }`}>
                {campaign?.currentStatus ? (
                  <p className={`whitespace-pre-line leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {campaign.currentStatus}
                  </p>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className={`w-16 h-16 rounded-full mb-4 flex items-center justify-center ${darkMode ? 'bg-zinc-800' : 'bg-gray-100'}`}>
                      <Info className={`w-8 h-8 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                    </div>
                    <p className={`font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      No status updates have been posted yet.
                    </p>
                  </div>
                )}
              </div>
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

      {/* ================= DELETE CONFIRMATION MODAL ================= */}
      <AnimatePresence>
        {deleteConfirm.show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4"
            onClick={() => setDeleteConfirm({ show: false, id: null })}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`rounded-2xl p-6 w-full max-w-sm relative ${darkMode ? 'bg-zinc-900 border border-zinc-800' : 'bg-white'}`}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`p-4 rounded-full mb-4 ${darkMode ? 'bg-red-500/10' : 'bg-red-50'}`}>
                  <Trash2 className="w-8 h-8 text-red-500" />
                </div>

                <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Delete Comment?
                </h3>
                <p className={`text-sm mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  This action cannot be undone. Are you sure you want to remove your comment?
                </p>

                <div className="flex w-full gap-3">
                  <button
                    onClick={() => setDeleteConfirm({ show: false, id: null })}
                    className={`flex-1 py-3 rounded-xl font-semibold transition-colors
                      ${darkMode
                        ? 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmDelete}
                    disabled={isDeleting}
                    className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold flex justify-center items-center transition-opacity disabled:opacity-50"
                  >
                    {isDeleting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Delete"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}