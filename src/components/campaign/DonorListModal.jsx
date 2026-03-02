"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, User as UserIcon, ChevronLeft, ChevronRight, IndianRupee } from 'lucide-react';
import { useFetchCampaignDonorsQuery } from '@/utils/slices/donationApiSlice';

const DonorListModal = ({ isOpen, onClose, campaignId, darkMode }) => {
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data, isLoading, isError } = useFetchCampaignDonorsQuery({
        campaignId,
        page,
        limit
    }, { skip: !isOpen });

    // Scroll lock implementation
    React.useEffect(() => {
        if (isOpen) {
            const originalStyle = window.getComputedStyle(document.body).overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = originalStyle;
            };
        }
    }, [isOpen]);

    const donors = data?.donors || [];
    const pagination = data?.pagination || {};

    const getInitials = (name) => {
        if (!name) return "KS";
        const parts = name.split(" ");
        if (parts.length > 1) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return name.slice(0, 2).toUpperCase();
    };

    const getAvatarColor = (name) => {
        const colors = [
            'bg-blue-500', 'bg-emerald-500', 'bg-purple-500',
            'bg-amber-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
        ];
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className={`relative w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl ${darkMode ? "bg-zinc-900 text-white" : "bg-white text-gray-900"
                        }`}
                >
                    {/* Header */}
                    <div className={`flex items-center justify-between p-4 sm:p-6 border-b ${darkMode ? "border-zinc-800" : "border-gray-100"
                        }`}>
                        <div>
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Trophy className="w-5 h-5 text-amber-500" />
                                Top Supporters
                            </h2>
                            <p className={`text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-gray-500"}`}>
                                Real heroes who made this possible
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className={`p-2 rounded-full transition-colors ${darkMode ? "hover:bg-zinc-800 text-zinc-400" : "hover:bg-gray-100 text-gray-500"
                                }`}
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* List Content */}
                    <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-4 custom-scrollbar" data-lenis-prevent>
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-12 space-y-4">
                                <div className="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
                                <p className={darkMode ? "text-zinc-400" : "text-gray-500"}>Loading donors...</p>
                            </div>
                        ) : isError ? (
                            <div className="py-12 text-center">
                                <p className="text-red-500">Failed to load donor list.</p>
                            </div>
                        ) : donors.length === 0 ? (
                            <div className="py-12 text-center">
                                <p className={darkMode ? "text-zinc-400" : "text-gray-500"}>No donors found for this campaign yet.</p>
                            </div>
                        ) : (
                            donors.map((donor, index) => (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    key={donor.userId || index}
                                    className={`flex items-center justify-between p-3 rounded-xl transition-all ${darkMode ? "bg-zinc-800/50 hover:bg-zinc-800" : "bg-gray-50 hover:bg-gray-100"
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full !flex items-center justify-center text-white font-bold text-sm sm:text-base leading-none ${getAvatarColor(donor.fullName)}`}>
                                                {getInitials(donor.fullName)}
                                            </div>
                                            {index + (page - 1) * limit < 3 && (
                                                <div className="absolute -top-1 -right-1">
                                                    <Trophy className={`w-4 h-4 ${index === 0 ? "text-amber-400" :
                                                        index === 1 ? "text-zinc-300" :
                                                            "text-amber-600"
                                                        }`} />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-sm sm:text-base line-clamp-1">
                                                {donor.fullName}
                                            </h4>
                                            <p className={`text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full inline-block mt-0.5 ${darkMode ? "bg-zinc-700 text-zinc-300" : "bg-white text-gray-600 shadow-sm"
                                                }`}>
                                                Supporter Rank #{index + 1 + (page - 1) * limit}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center justify-end gap-1 text-emerald-500 font-bold text-sm sm:text-base">
                                            {formatCurrency(donor.totalAmount)}
                                        </div>
                                        <p className={`text-[10px] sm:text-xs ${darkMode ? "text-zinc-500" : "text-gray-400"}`}>
                                            Total Contribution
                                        </p>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>

                    {/* Footer & Pagination */}
                    {!isLoading && donors.length > 0 && (
                        <div className={`p-4 sm:p-6 border-t ${darkMode ? "border-zinc-800" : "border-gray-100"
                            } flex items-center justify-between`}>
                            <p className={`text-xs sm:text-sm ${darkMode ? "text-zinc-400" : "text-gray-500"}`}>
                                Showing {Math.min(donors.length, limit)} of {pagination.totalDonors}
                            </p>
                            <div className="flex items-center gap-2">
                                <button
                                    disabled={page === 1}
                                    onClick={() => setPage(prev => prev - 1)}
                                    className={`p-2 rounded-lg border transition-all disabled:opacity-30 ${darkMode ? "border-zinc-700 hover:bg-zinc-800 text-white" : "border-gray-200 hover:bg-gray-50 text-gray-700"
                                        }`}
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <span className="text-sm font-medium w-8 text-center">
                                    {page}
                                </span>
                                <button
                                    disabled={page >= pagination.totalPages}
                                    onClick={() => setPage(prev => prev + 1)}
                                    className={`p-2 rounded-lg border transition-all disabled:opacity-30 ${darkMode ? "border-zinc-700 hover:bg-zinc-800 text-white" : "border-gray-200 hover:bg-gray-50 text-gray-700"
                                        }`}
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default DonorListModal;
