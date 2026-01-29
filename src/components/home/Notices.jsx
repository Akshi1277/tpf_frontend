'use client';

import { useGetAllNoticesQuery, useGetNoticeByIdQuery } from '@/utils/slices/tickets-queriesApiSlice';
import { formatDistance } from 'date-fns';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PublicNoticesPage({ darkMode }) {
    const router = useRouter();
    const { data, isLoading, isError } = useGetAllNoticesQuery();
    const [selectedNoticeId, setSelectedNoticeId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch selected notice details
    const { data: noticeDetail, isLoading: isLoadingDetail } = useGetNoticeByIdQuery(
        selectedNoticeId,
        { skip: !selectedNoticeId }
    );

    // Filter out expired notices
    const activeNotices = data?.data?.filter(notice => {
        const expiryDate = new Date(notice.expiresAt);
        return expiryDate > new Date();
    }) || [];

    // Format category for display
    const getCategoryLabel = (category) => {
        return category.charAt(0).toUpperCase() + category.slice(1);
    };

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Truncate description
    const truncateText = (text, maxLength = 150) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength).trim() + '...';
    };

    // Handle read more click
    const handleReadMore = (noticeId) => {
        setSelectedNoticeId(noticeId);
        setIsModalOpen(true);
    };

    // Handle close modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedNoticeId(null), 300);
    };

    // Handle ESC key to close modal
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape' && isModalOpen) {
                handleCloseModal();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isModalOpen]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen]);

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-zinc-900' : 'bg-gray-50'}`}>
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                    {/* Back Button - Mobile & Desktop */}
                    <div className="mb-6 sm:mb-8">
                        <button
                            onClick={() => router.back()}
                            className="inline-flex items-center text-emerald-50 hover:text-white transition-colors group"
                        >
                            <svg
                                className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 group-hover:-translate-x-1 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                            <span className="text-sm sm:text-base">Back</span>
                        </button>
                    </div>

                    {/* Centered Content */}
                    <div className="text-center">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
                            Public Notices
                        </h1>
                        <p className="text-emerald-50 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto px-4 sm:px-0">
                            Stay informed about our latest announcements, programs, and community updates
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                {/* Loading State */}
                {isLoading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div
                                key={i}
                                className={`rounded-xl shadow-sm border overflow-hidden ${darkMode
                                    ? 'bg-zinc-800 border-zinc-700'
                                    : 'bg-white border-gray-100'
                                    }`}
                            >
                                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <div className={`h-5 sm:h-6 w-16 sm:w-20 rounded-full animate-pulse ${darkMode ? 'bg-zinc-700' : 'bg-gray-200'
                                            }`}></div>
                                        <div className={`h-3 sm:h-4 w-20 sm:w-24 rounded animate-pulse ${darkMode ? 'bg-zinc-700' : 'bg-gray-200'
                                            }`}></div>
                                    </div>
                                    <div className={`h-6 sm:h-7 rounded animate-pulse w-3/4 ${darkMode ? 'bg-zinc-700' : 'bg-gray-200'
                                        }`}></div>
                                    <div className="space-y-2">
                                        <div className={`h-3 sm:h-4 rounded animate-pulse ${darkMode ? 'bg-zinc-700' : 'bg-gray-200'
                                            }`}></div>
                                        <div className={`h-3 sm:h-4 rounded animate-pulse w-5/6 ${darkMode ? 'bg-zinc-700' : 'bg-gray-200'
                                            }`}></div>
                                        <div className={`h-3 sm:h-4 rounded animate-pulse w-4/6 ${darkMode ? 'bg-zinc-700' : 'bg-gray-200'
                                            }`}></div>
                                    </div>
                                    <div className={`h-9 sm:h-10 rounded-lg animate-pulse w-24 sm:w-28 ${darkMode ? 'bg-zinc-700' : 'bg-gray-200'
                                        }`}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Error State */}
                {isError && !isLoading && (
                    <div className="max-w-md mx-auto text-center py-12 sm:py-16">
                        <div className={`rounded-2xl shadow-sm border p-6 sm:p-8 ${darkMode
                            ? 'bg-zinc-800 border-zinc-700'
                            : 'bg-white border-gray-100'
                            }`}>
                            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                <svg
                                    className="w-7 h-7 sm:w-8 sm:h-8 text-red-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    />
                                </svg>
                            </div>
                            <h3 className={`text-lg sm:text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'
                                }`}>
                                Unable to Load Notices
                            </h3>
                            <p className={`mb-5 sm:mb-6 text-sm sm:text-base ${darkMode ? 'text-zinc-400' : 'text-gray-600'
                                }`}>
                                We're having trouble loading the notices right now. Please try again in a moment.
                            </p>
                            <button
                                onClick={() => window.location.reload()}
                                className="inline-flex items-center px-5 sm:px-6 py-2 sm:py-2.5 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 transition-colors text-sm sm:text-base"
                            >
                                Refresh Page
                            </button>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && !isError && activeNotices.length === 0 && (
                    <div className="max-w-md mx-auto text-center py-12 sm:py-16">
                        <div className={`rounded-2xl shadow-sm border p-6 sm:p-8 ${darkMode
                            ? 'bg-zinc-800 border-zinc-700'
                            : 'bg-white border-gray-100'
                            }`}>
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                <svg
                                    className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                    />
                                </svg>
                            </div>
                            <h3 className={`text-lg sm:text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'
                                }`}>
                                No Active Notices
                            </h3>
                            <p className={`text-sm sm:text-base ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                                There are no public notices at this time. Please check back later for updates and announcements.
                            </p>
                        </div>
                    </div>
                )}

                {/* Notices Grid */}
                {!isLoading && !isError && activeNotices.length > 0 && (
                    <>
                        <div className="mb-6 sm:mb-8">
                            <p className={`text-xs sm:text-sm ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                                Showing {activeNotices.length} active {activeNotices.length === 1 ? 'notice' : 'notices'}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {activeNotices.map((notice) => (
                                <article
                                    key={notice._id}
                                    className={`rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col ${darkMode
                                        ? 'bg-zinc-800 border-zinc-700'
                                        : 'bg-white border-gray-100'
                                        }`}
                                >
                                    <div className="p-4 sm:p-6 flex-1 flex flex-col">
                                        {/* Category and Date */}
                                        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap">
                                            <span className="inline-flex items-center px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800">
                                                {getCategoryLabel(notice.category)}
                                            </span>
                                            <time className={`text-[10px] sm:text-xs ${darkMode ? 'text-zinc-500' : 'text-gray-500'
                                                }`}>
                                                {formatDate(notice.publishAt)}
                                            </time>
                                        </div>

                                        {/* Title */}
                                        <h2 className={`text-lg sm:text-xl font-semibold mb-2 sm:mb-3 line-clamp-2 ${darkMode ? 'text-white' : 'text-gray-900'
                                            }`}>
                                            {notice.title}
                                        </h2>

                                        {/* Description */}
                                        <p className={`text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 flex-1 ${darkMode ? 'text-zinc-400' : 'text-gray-600'
                                            }`}>
                                            {truncateText(notice.description)}
                                        </p>

                                        {/* Read More Link */}
                                        <div className={`flex items-center justify-between pt-3 sm:pt-4 border-t ${darkMode ? 'border-zinc-700' : 'border-gray-100'
                                            }`}>
                                            <button
                                                className="inline-flex items-center text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium text-xs sm:text-sm transition-colors group"
                                                onClick={() => handleReadMore(notice._id)}
                                            >
                                                Read more
                                                <svg
                                                    className="w-3 h-3 sm:w-4 sm:h-4 ml-1 group-hover:translate-x-1 transition-transform"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 5l7 7-7 7"
                                                    />
                                                </svg>
                                            </button>

                                            {notice.expiresAt && (
                                                <span className={`text-[10px] sm:text-xs ${darkMode ? 'text-zinc-600' : 'text-gray-400'
                                                    } hidden sm:inline`}>
                                                    Expires {formatDistance(new Date(notice.expiresAt), new Date(), { addSuffix: true })}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Footer CTA */}
            {!isLoading && !isError && activeNotices.length > 0 && (
                <div
                    className={`border-t ${darkMode
                            ? 'bg-zinc-800 border-zinc-700'
                            : 'bg-white border-gray-200'
                        }`}
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-center">
                        <h3
                            className={`text-xl sm:text-2xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'
                                }`}
                        >
                            Insights & Updates
                        </h3>

                        <p
                            className={`max-w-2xl mx-auto mb-6 text-sm sm:text-base ${darkMode ? 'text-zinc-400' : 'text-gray-600'
                                }`}
                        >
                            Read our latest blogs, stories from the field, and in-depth updates on our ongoing initiatives.
                        </p>

                        <button
                            onClick={() => router.push('/blogs')}
                            className="
          inline-flex items-center gap-2
          px-6 py-3
          bg-emerald-500 hover:bg-emerald-600
          text-white font-medium rounded-lg
          transition-colors 
        "
                        >
                            Explore Blogs
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            )}


            {/* Notice Detail Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 overflow-y-auto"
                    aria-labelledby="modal-title"
                    role="dialog"
                    aria-modal="true"
                >
                    {/* Backdrop */}
                    <div
                        className={`fixed inset-0 transition-opacity duration-300 ${darkMode ? 'bg-black/80' : 'bg-gray-900/75'
                            }`}
                        onClick={handleCloseModal}
                    ></div>

                    {/* Modal Container */}
                    <div className="flex min-h-full items-center justify-center p-2 sm:p-4 text-center">
                        <div
                            className={`relative transform overflow-hidden rounded-xl sm:rounded-2xl text-left shadow-xl transition-all duration-300 w-full sm:my-8 sm:max-w-3xl max-h-[90vh] flex flex-col ${darkMode ? 'bg-zinc-800' : 'bg-white'
                                }`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className={`sticky top-0 z-10 border-b px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between ${darkMode
                                ? 'bg-zinc-800 border-zinc-700'
                                : 'bg-white border-gray-200'
                                }`}>
                                <h3 className={`text-lg sm:text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'
                                    }`}>
                                    Notice Details
                                </h3>
                                <button
                                    onClick={handleCloseModal}
                                    className={`rounded-lg p-1.5 sm:p-2 transition-colors ${darkMode
                                        ? 'text-zinc-400 hover:bg-zinc-700 hover:text-zinc-300'
                                        : 'text-gray-400 hover:bg-gray-100 hover:text-gray-500'
                                        }`}
                                >
                                    <svg
                                        className="w-5 h-5 sm:w-6 sm:h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="px-4 sm:px-6 py-4 sm:py-6 overflow-y-auto flex-1">
                                {isLoadingDetail ? (
                                    // Loading state for modal
                                    <div className="space-y-4 sm:space-y-6 animate-pulse">
                                        <div className="flex items-center gap-2 sm:gap-3">
                                            <div className={`h-5 sm:h-6 w-20 sm:w-24 rounded-full ${darkMode ? 'bg-zinc-700' : 'bg-gray-200'
                                                }`}></div>
                                            <div className={`h-3 sm:h-4 w-24 sm:w-32 rounded ${darkMode ? 'bg-zinc-700' : 'bg-gray-200'
                                                }`}></div>
                                        </div>
                                        <div className={`h-7 sm:h-8 rounded w-3/4 ${darkMode ? 'bg-zinc-700' : 'bg-gray-200'
                                            }`}></div>
                                        <div className="space-y-2 sm:space-y-3">
                                            <div className={`h-3 sm:h-4 rounded ${darkMode ? 'bg-zinc-700' : 'bg-gray-200'
                                                }`}></div>
                                            <div className={`h-3 sm:h-4 rounded ${darkMode ? 'bg-zinc-700' : 'bg-gray-200'
                                                }`}></div>
                                            <div className={`h-3 sm:h-4 rounded w-5/6 ${darkMode ? 'bg-zinc-700' : 'bg-gray-200'
                                                }`}></div>
                                            <div className={`h-3 sm:h-4 rounded ${darkMode ? 'bg-zinc-700' : 'bg-gray-200'
                                                }`}></div>
                                            <div className={`h-3 sm:h-4 rounded w-4/6 ${darkMode ? 'bg-zinc-700' : 'bg-gray-200'
                                                }`}></div>
                                        </div>
                                    </div>
                                ) : noticeDetail?.data ? (
                                    <div className="space-y-4 sm:space-y-6">
                                        {/* Category and Date */}
                                        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                                            <span className="inline-flex items-center px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800">
                                                {getCategoryLabel(noticeDetail.data.category)}
                                            </span>
                                            <div className={`flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm ${darkMode ? 'text-zinc-400' : 'text-gray-500'
                                                }`}>
                                                <svg
                                                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                    />
                                                </svg>
                                                <time>{formatDate(noticeDetail.data.publishAt)}</time>
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <h2 className={`text-2xl sm:text-3xl font-bold leading-tight ${darkMode ? 'text-white' : 'text-gray-900'
                                            }`}>
                                            {noticeDetail.data.title}
                                        </h2>

                                        {/* Description */}
                                        <div className="prose prose-gray max-w-none">
                                            <p className={`text-sm sm:text-base leading-relaxed whitespace-pre-wrap ${darkMode ? 'text-zinc-300' : 'text-gray-700'
                                                }`}>
                                                {noticeDetail.data.description}
                                            </p>
                                        </div>

                                        {/* Expiry Information */}
                                        {noticeDetail.data.expiresAt && (
                                            <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 rounded-lg p-3 sm:p-4">
                                                <div className="flex items-start gap-2 sm:gap-3">
                                                    <svg
                                                        className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                        />
                                                    </svg>
                                                    <div className="flex-1">
                                                        <p className={`text-xs sm:text-sm font-medium ${darkMode ? 'text-emerald-300' : 'text-emerald-900'
                                                            }`}>
                                                            Notice Validity
                                                        </p>
                                                        <p className={`text-xs sm:text-sm mt-1 ${darkMode ? 'text-emerald-400' : 'text-emerald-700'
                                                            }`}>
                                                            This notice expires on {formatDate(noticeDetail.data.expiresAt)} (
                                                            {formatDistance(new Date(noticeDetail.data.expiresAt), new Date(), { addSuffix: true })})
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <p className={`text-sm sm:text-base ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                                            Unable to load notice details.
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Modal Footer */}
                            <div className={`px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-end gap-2 sm:gap-3 border-t ${darkMode ? 'bg-zinc-900/50 border-zinc-700' : 'bg-gray-50 border-gray-200'
                                }`}>
                                <button
                                    onClick={handleCloseModal}
                                    className={`px-4 sm:px-6 py-2 sm:py-2.5 font-medium rounded-lg border transition-colors text-sm sm:text-base ${darkMode
                                        ? 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700'
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                                        }`}
                                >
                                    Close
                                </button>
                                {/* <button
                                    onClick={() => window.print()}
                                    className="px-4 sm:px-6 py-2 sm:py-2.5 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 transition-colors inline-flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base"
                                >
                                    <svg
                                        className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                                        />
                                    </svg>
                                    <span className="hidden sm:inline">Print</span>
                                </button> */}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}