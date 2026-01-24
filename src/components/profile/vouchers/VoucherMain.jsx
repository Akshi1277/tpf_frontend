"use client";

import { useState, useEffect } from "react";
import {
    Ticket,
    Plus,
    Clock,
    CheckCircle,
    AlertCircle,
    XCircle,
    Upload,
    Image as ImageIcon,
    Loader2,
    MessageSquare,
    Eye,
    ChevronRight,
    Search,
    IndianRupee,
    Calendar,
    Edit3,
    X,
    Save,
    ChevronLeft
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
    useRaiseVoucherMutation,
    useGetMyVouchersQuery,
    useUpdateVoucherMutation
} from "@/utils/slices/voucherApiSlice";
import { toast } from "react-hot-toast";

export default function VoucherMain({ darkModeFromParent }) {
    const [view, setView] = useState("list"); // "list" or "form"
    const [selectedVoucher, setSelectedVoucher] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [darkMode, setDarkMode] = useState(darkModeFromParent);

    useEffect(() => {
        setDarkMode(darkModeFromParent);
    }, [darkModeFromParent]);

    useEffect(() => {
        document.title = "Voucher Management | TPF Aid";
    }, []);

    // Handle internal dark mode changes
    useEffect(() => {
        const handleDarkModeChange = () => {
            setDarkMode(localStorage.getItem('darkMode') === 'true');
        };
        window.addEventListener('darkModeChanged', handleDarkModeChange);
        return () => window.removeEventListener('darkModeChanged', handleDarkModeChange);
    }, []);

    const { data: vouchersResponse, isLoading: isLoadingVouchers } = useGetMyVouchersQuery();
    const [raiseVoucher, { isLoading: isRaising }] = useRaiseVoucherMutation();
    const [updateVoucher, { isLoading: isUpdating }] = useUpdateVoucherMutation();

    const vouchers = vouchersResponse?.data || [];

    const [formData, setFormData] = useState({
        amount: "",
        description: "",
        particulars: "",
        quantity: "",
        unit: "unit",
        transactionDate: new Date().toISOString().split('T')[0],
        city: "",
        state: "",
        proof: null,
    });

    const [previewUrl, setPreviewUrl] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, proof: file }));
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.amount || !formData.description) {
            toast.error("Please fill all required fields");
            return;
        }

        const data = new FormData();
        data.append("amount", formData.amount);
        data.append("description", formData.description);
        data.append("particulars", formData.particulars);
        data.append("quantity", formData.quantity);
        data.append("unit", formData.unit);
        data.append("transactionDate", formData.transactionDate);
        data.append("city", formData.city);
        data.append("state", formData.state);

        if (formData.proof) {
            data.append("proof", formData.proof);
        }

        try {
            if (isEditing) {
                await updateVoucher({ id: selectedVoucher._id, data }).unwrap();
                toast.success("Voucher updated successfully");
            } else {
                await raiseVoucher(data).unwrap();
                toast.success("Voucher raised successfully");
            }
            handleBackToList();
        } catch (error) {
            toast.error(error?.data?.message || "Something went wrong");
        }
    };

    const handleOpenForm = (voucher = null) => {
        if (voucher) {
            setSelectedVoucher(voucher);
            setIsEditing(true);
            setFormData({
                amount: voucher.amount,
                description: voucher.description,
                particulars: voucher.particulars || "",
                quantity: voucher.quantity || "",
                unit: voucher.unit || "unit",
                transactionDate: voucher.transactionDate ? new Date(voucher.transactionDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
                city: voucher.city || "",
                state: voucher.state || "",
                proof: null
            });
            setPreviewUrl(voucher.proofDocument?.fileUrl);
        } else {
            setSelectedVoucher(null);
            setIsEditing(false);
            setFormData({
                amount: "",
                description: "",
                particulars: "",
                quantity: "",
                unit: "unit",
                transactionDate: new Date().toISOString().split('T')[0],
                city: "",
                state: "",
                proof: null
            });
            setPreviewUrl(null);
        }
        setView("form");
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleBackToList = () => {
        setView("list");
        setSelectedVoucher(null);
        setIsEditing(false);
        setFormData({
            amount: "",
            description: "",
            particulars: "",
            quantity: "",
            unit: "unit",
            transactionDate: new Date().toISOString().split('T')[0],
            city: "",
            state: "",
            proof: null
        });
        setPreviewUrl(null);
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "approved": return <CheckCircle className="w-5 h-5 text-emerald-500" />;
            case "clarification": return <AlertCircle className="w-5 h-5 text-orange-500" />;
            case "rejected": return <XCircle className="w-5 h-5 text-red-500" />;
            default: return <Clock className="w-5 h-5 text-amber-500" />;
        }
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case "approved":
                return darkMode
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    : "bg-emerald-50 text-emerald-700 border-emerald-100";
            case "clarification":
                return darkMode
                    ? "bg-orange-500/10 text-orange-400 border-orange-500/20"
                    : "bg-orange-50 text-orange-700 border-orange-100";
            case "rejected":
                return darkMode
                    ? "bg-red-500/10 text-red-400 border-red-500/20"
                    : "bg-red-50 text-red-700 border-red-100";
            default:
                return darkMode
                    ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    : "bg-amber-50 text-amber-700 border-amber-100";
        }
    };

    return (
        <div className="relative mt-5">
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className={`absolute top-0 right-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full blur-[100px] sm:blur-[120px] ${darkMode ? "bg-emerald-500/10" : "bg-emerald-50"
                    }`} />
                <div className={`absolute bottom-0 left-0 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full blur-[80px] sm:blur-[100px] ${darkMode ? "bg-teal-500/10" : "bg-teal-50"
                    }`} />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">

                <AnimatePresence mode="wait">
                    {view === "list" ? (
                        <motion.div
                            key="list-view"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.4 }}
                        >
                            {/* Header Section matching UserProfile */}
                            <div className="mb-8">
                                <div className={`rounded-2xl sm:rounded-3xl overflow-hidden ${darkMode
                                    ? "bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/50"
                                    : "bg-white backdrop-blur-xl border border-gray-200 shadow-xl"
                                    }`}>
                                    {/* Header Gradient */}
                                    <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 px-6 sm:px-10 py-10 sm:py-14">
                                        <div className="absolute inset-0">
                                            <div
                                                className="absolute inset-0 opacity-20"
                                                style={{
                                                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                                                }}
                                            />
                                        </div>

                                        <div className="relative z-10 flex flex-col items-center text-center">
                                            <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/10 backdrop-blur-sm shadow-2xl flex items-center justify-center mb-6 border border-white/20`}>
                                                <Ticket className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                                            </div>
                                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-md">
                                                Reimbursement Vouchers
                                            </h1>
                                            <p className="text-white/80 font-semibold text-xs sm:text-sm tracking-widest uppercase">
                                                Manage and track your volunteer expense claims
                                            </p>
                                        </div>

                                        <div className="absolute top-6 right-6 z-20">
                                            <button
                                                onClick={() => handleOpenForm()}
                                                className="px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-md text-white font-bold flex items-center gap-2 hover:bg-white/20 transition-all border border-white/20 shadow-lg"
                                            >
                                                <Plus className="w-4 h-4" strokeWidth={3} />
                                                <span className="hidden sm:inline">Raise New Voucher</span>
                                                <span className="sm:hidden">New</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Recent Stats or Summary Area */}
                                    <div className="px-6 sm:px-10 py-8 border-t border-gray-100/10">
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className={`p-4 rounded-xl border ${darkMode ? 'bg-zinc-800/40 border-zinc-700' : 'bg-gray-50 border-gray-100'}`}>
                                                <p className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${darkMode ? 'text-zinc-500' : 'text-gray-400'}`}>Total Claims</p>
                                                <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{vouchers.length}</p>
                                            </div>
                                            <div className={`p-4 rounded-xl border ${darkMode ? 'bg-zinc-800/40 border-zinc-700' : 'bg-gray-50 border-gray-100'}`}>
                                                <p className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${darkMode ? 'text-zinc-500' : 'text-gray-400'}`}>Approved</p>
                                                <p className="text-xl font-bold text-emerald-500">{vouchers.filter(v => v.status === 'approved').length}</p>
                                            </div>
                                            <div className={`p-4 rounded-xl border ${darkMode ? 'bg-zinc-800/40 border-zinc-700' : 'bg-gray-50 border-gray-100'}`}>
                                                <p className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${darkMode ? 'text-zinc-500' : 'text-gray-400'}`}>Pending</p>
                                                <p className="text-xl font-bold text-amber-500">{vouchers.filter(v => v.status === 'pending').length}</p>
                                            </div>
                                            <div className={`p-4 rounded-xl border ${darkMode ? 'bg-zinc-800/40 border-zinc-700' : 'bg-gray-50 border-gray-100'}`}>
                                                <p className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${darkMode ? 'text-zinc-500' : 'text-gray-400'}`}>Clarification</p>
                                                <p className="text-xl font-bold text-orange-500">{vouchers.filter(v => v.status === 'clarification').length}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Vouchers Grid Section */}
                            {isLoadingVouchers ? (
                                <div className="flex flex-col items-center justify-center py-20">
                                    <Loader2 className="w-10 h-10 text-emerald-600 animate-spin mb-4" />
                                    <p className={`${darkMode ? 'text-zinc-500' : 'text-zinc-400'} font-bold text-xs uppercase tracking-widest`}>
                                        Loading Claims...
                                    </p>
                                </div>
                            ) : vouchers.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className={`rounded-[2rem] p-12 text-center border-2 border-dashed ${darkMode ? 'bg-zinc-900/40 border-zinc-800' : 'bg-white border-gray-200'}`}
                                >
                                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${darkMode ? 'bg-zinc-800 text-zinc-600' : 'bg-gray-50 text-gray-300'}`}>
                                        <Ticket className="w-8 h-8" />
                                    </div>
                                    <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>No vouchers yet</h3>
                                    <p className={`${darkMode ? 'text-zinc-500' : 'text-gray-500'} max-w-sm mx-auto mb-8`}>
                                        Submit your business expenses here to get them reimbursed.
                                    </p>
                                    <button
                                        onClick={() => handleOpenForm()}
                                        className="text-emerald-600 font-bold hover:underline"
                                    >
                                        Raise your first voucher →
                                    </button>
                                </motion.div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                                    {vouchers.map((voucher, index) => (
                                        <motion.div
                                            key={voucher._id}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: index * 0.05 }}
                                            className={`rounded-2xl border transition-all duration-300 overflow-hidden group ${darkMode
                                                ? "bg-zinc-900/60 border-zinc-800/60 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10"
                                                : "bg-white border-gray-200 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-500/5"
                                                }`}
                                        >
                                            <div className="p-6">
                                                <div className="flex justify-between items-start mb-6">
                                                    <div className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border flex items-center gap-1.5 ${getStatusStyles(voucher.status)}`}>
                                                        {getStatusIcon(voucher.status)}
                                                        {voucher.status.toUpperCase()}
                                                    </div>
                                                    <span className={`text-[10px] font-bold ${darkMode ? 'text-zinc-600' : 'text-zinc-400'}`}>
                                                        #{voucher._id.slice(-6).toUpperCase()}
                                                    </span>
                                                </div>

                                                <div className="mb-6">
                                                    <h3 className={`text-2xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                                                        ₹{voucher.amount.toLocaleString()}
                                                    </h3>
                                                    <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-gray-600'} line-clamp-2 min-h-[2.5rem]`}>
                                                        {voucher.description}
                                                    </p>
                                                </div>

                                                <div className={`flex items-center justify-between text-xs font-bold border-t ${darkMode ? 'border-zinc-800/50 pt-4' : 'border-gray-50 pt-4'}`}>
                                                    <span className={darkMode ? 'text-zinc-600' : 'text-gray-400'}>
                                                        {new Date(voucher.createdAt).toLocaleDateString()}
                                                    </span>

                                                    {voucher.status === "clarification" ? (
                                                        <button
                                                            onClick={() => handleOpenForm(voucher)}
                                                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 shadow-lg active:scale-95 group/btn ${darkMode
                                                                    ? "bg-orange-500 text-white hover:bg-orange-600 shadow-orange-500/20"
                                                                    : "bg-orange-600 text-white hover:bg-orange-700 shadow-orange-600/20"
                                                                }`}
                                                        >
                                                            <div className="relative">
                                                                <AlertCircle className="w-4 h-4" />
                                                                <span className="absolute inset-0 rounded-full bg-white animate-ping opacity-25" />
                                                            </div>
                                                            Action Required
                                                        </button>
                                                    ) : (
                                                        <span className={`flex items-center gap-1.5 ${voucher.status === "approved" ? "text-emerald-500" : "text-amber-500"}`}>
                                                            {voucher.status === "approved" ? <CheckCircle size={14} /> : <Clock size={14} />}
                                                            {voucher.status === "approved" ? "Approved" : "Processing"}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="form-view"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4 }}
                            className="max-w-2xl mx-auto pb-20"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <button
                                    onClick={handleBackToList}
                                    className={`p-2.5 rounded-xl transition-all ${darkMode ? 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800' : 'bg-white text-gray-500 hover:bg-gray-50 shadow-sm border border-gray-100'}`}
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <div>
                                    <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        {isEditing ? "Address Required Details" : "Submit New Expense"}
                                    </h2>
                                    <p className={`text-sm font-semibold uppercase tracking-wider mt-1 ${darkMode ? 'text-zinc-500' : 'text-gray-400'}`}>
                                        {isEditing ? "Update your voucher claim" : "Fill in the details below"}
                                    </p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className={`p-8 rounded-[2.5rem] border ${darkMode ? 'bg-zinc-900/80 backdrop-blur-xl border-zinc-800/50' : 'bg-white border-gray-200 shadow-2xl'} space-y-8`}>
                                {isEditing && selectedVoucher?.clarificationReason && (
                                    <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-orange-500/5 border-orange-500/10' : 'bg-orange-50 border-orange-100'} flex gap-4`}>
                                        <AlertCircle className="w-6 h-6 text-orange-500 shrink-0" />
                                        <div className="text-sm">
                                            <p className="font-bold text-orange-500 mb-1 uppercase tracking-widest text-[10px]">Feedback from Admin</p>
                                            <p className={`italic text-base ${darkMode ? 'text-orange-100/90' : 'text-orange-700'}`}>
                                                "{selectedVoucher.clarificationReason}"
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <label className={`block text-xs font-black uppercase tracking-[0.15em] ml-1 ${darkMode ? 'text-zinc-500' : 'text-gray-500'}`}>
                                            Item Particulars (e.g. Rice, Laptop)
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.particulars}
                                            onChange={(e) => setFormData(p => ({ ...p, particulars: e.target.value }))}
                                            placeholder="What is this expense for?"
                                            className={`w-full px-6 py-4 rounded-2xl outline-none transition-all font-semibold border-2 ${darkMode
                                                ? 'bg-zinc-950 border-zinc-800 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 text-white'
                                                : 'bg-gray-50 border-gray-100 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 text-gray-900'
                                                }`}
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <label className={`block text-xs font-black uppercase tracking-[0.15em] ml-1 ${darkMode ? 'text-zinc-500' : 'text-gray-500'}`}>
                                            Quantity & Unit
                                        </label>
                                        <div className="flex gap-2">
                                            <input
                                                type="number"
                                                required
                                                value={formData.quantity}
                                                onChange={(e) => setFormData(p => ({ ...p, quantity: e.target.value }))}
                                                placeholder="Qty"
                                                className={`w-24 px-4 py-4 rounded-2xl outline-none transition-all font-semibold border-2 ${darkMode
                                                    ? 'bg-zinc-950 border-zinc-800 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 text-white'
                                                    : 'bg-gray-50 border-gray-100 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 text-gray-900'
                                                    }`}
                                            />
                                            <select
                                                required
                                                value={formData.unit}
                                                onChange={(e) => setFormData(p => ({ ...p, unit: e.target.value }))}
                                                className={`flex-1 px-4 py-4 rounded-2xl outline-none transition-all font-semibold border-2 ${darkMode
                                                    ? 'bg-zinc-950 border-zinc-800 focus:border-emerald-500 text-white'
                                                    : 'bg-gray-50 border-gray-100 focus:border-emerald-500 text-gray-900'
                                                    }`}
                                            >
                                                <option value="unit">Unit</option>
                                                <option value="piece">Piece</option>
                                                <option value="kg">KG</option>
                                                <option value="gram">Gram</option>
                                                <option value="litre">Litre</option>
                                                <option value="ml">ML</option>
                                                <option value="packet">Packet</option>
                                                <option value="box">Box</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className={`block text-xs font-black uppercase tracking-[0.15em] ml-1 ${darkMode ? 'text-zinc-500' : 'text-gray-500'}`}>
                                        Expense Description
                                    </label>
                                    <textarea
                                        required
                                        rows="3"
                                        value={formData.description}
                                        onChange={(e) => setFormData(p => ({ ...p, description: e.target.value }))}
                                        placeholder="Briefly explain the purpose of this expense..."
                                        className={`w-full px-6 py-5 rounded-[2rem] outline-none transition-all resize-none font-semibold text-base border-2 ${darkMode
                                            ? 'bg-zinc-950 border-zinc-800 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 text-white'
                                            : 'bg-gray-50 border-gray-100 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 text-gray-900'
                                            }`}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <label className={`block text-xs font-black uppercase tracking-[0.15em] ml-1 ${darkMode ? 'text-zinc-500' : 'text-gray-500'}`}>
                                            Transaction Date
                                        </label>
                                        <input
                                            type="date"
                                            required
                                            value={formData.transactionDate}
                                            onChange={(e) => setFormData(p => ({ ...p, transactionDate: e.target.value }))}
                                            className={`w-full px-6 py-4 rounded-2xl outline-none transition-all font-semibold border-2 ${darkMode
                                                ? 'bg-zinc-950 border-zinc-800 focus:border-emerald-500 text-white'
                                                : 'bg-gray-50 border-gray-100 focus:border-emerald-500 text-gray-900'
                                                }`}
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <label className={`block text-xs font-black uppercase tracking-[0.15em] ml-1 ${darkMode ? 'text-zinc-500' : 'text-gray-500'}`}>
                                            Location (City & State) - Optional
                                        </label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={formData.city}
                                                onChange={(e) => setFormData(p => ({ ...p, city: e.target.value }))}
                                                placeholder="City"
                                                className={`w-full px-4 py-4 rounded-2xl outline-none transition-all font-semibold border-2 ${darkMode
                                                    ? 'bg-zinc-950 border-zinc-800 focus:border-emerald-500 text-white'
                                                    : 'bg-gray-50 border-gray-100 focus:border-emerald-500 text-gray-900'
                                                    }`}
                                            />
                                            <input
                                                type="text"
                                                value={formData.state}
                                                onChange={(e) => setFormData(p => ({ ...p, state: e.target.value }))}
                                                placeholder="State"
                                                className={`w-full px-4 py-4 rounded-2xl outline-none transition-all font-semibold border-2 ${darkMode
                                                    ? 'bg-zinc-950 border-zinc-800 focus:border-emerald-500 text-white'
                                                    : 'bg-gray-50 border-gray-100 focus:border-emerald-500 text-gray-900'
                                                    }`}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className={`block text-xs font-black uppercase tracking-[0.15em] ml-1 ${darkMode ? 'text-zinc-500' : 'text-gray-500'}`}>
                                        Claim Amount (INR)
                                    </label>
                                    <div className="relative group">
                                        <span className={`absolute left-6 top-1/2 -translate-y-1/2 text-xl font-bold ${darkMode ? 'text-zinc-600' : 'text-gray-400'}`}>₹</span>
                                        <input
                                            type="number"
                                            required
                                            value={formData.amount}
                                            onChange={(e) => setFormData(p => ({ ...p, amount: e.target.value }))}
                                            placeholder="0.00"
                                            className={`w-full pl-12 pr-6 py-5 rounded-3xl outline-none transition-all text-2xl font-black border-2 ${darkMode
                                                ? 'bg-zinc-950 border-zinc-800 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 text-white'
                                                : 'bg-gray-50 border-gray-100 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 text-gray-900'
                                                }`}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className={`block text-xs font-black uppercase tracking-[0.15em] ml-1 ${darkMode ? 'text-zinc-500' : 'text-gray-500'}`}>
                                        Upload Proof (Bill/Receipt)
                                    </label>
                                    <div className="relative group">
                                        <input
                                            type="file"
                                            id="proof-upload"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="hidden"
                                            required={!isEditing}
                                        />
                                        <label
                                            htmlFor="proof-upload"
                                            className={`flex flex-col items-center justify-center gap-4 p-10 border-2 border-dashed rounded-[3rem] cursor-pointer transition-all ${previewUrl
                                                ? (darkMode ? "border-emerald-500/30 bg-emerald-500/5" : "border-emerald-500/50 bg-emerald-50")
                                                : (darkMode ? "border-zinc-800 hover:border-emerald-500" : "border-gray-100 hover:border-emerald-500 shadow-sm")
                                                }`}
                                        >
                                            {previewUrl ? (
                                                <div className="relative w-full aspect-video rounded-[2rem] overflow-hidden border shadow-2xl">
                                                    <img
                                                        src={previewUrl.startsWith('blob') ? previewUrl : `${process.env.NEXT_PUBLIC_API_URL}${previewUrl}`}
                                                        alt="Proof"
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                                                        <div className="flex flex-col items-center gap-2">
                                                            <Upload className="w-8 h-8 text-white" />
                                                            <span className="text-white text-xs font-bold uppercase tracking-wider">Change Image</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-all group-hover:scale-110 ${darkMode ? 'bg-zinc-800 text-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.1)]' : 'bg-white text-emerald-600 shadow-lg'}`}>
                                                        <ImageIcon className="w-8 h-8" />
                                                    </div>
                                                    <div className="text-center">
                                                        <p className="text-lg font-black">Drop your receipt here</p>
                                                        <p className={`${darkMode ? 'text-zinc-500' : 'text-gray-400'} text-xs font-bold mt-1`}>Please upload a <span className="text-emerald-500 italic">geo-tagged photo</span></p>
                                                        <p className={`${darkMode ? 'text-zinc-700' : 'text-gray-300'} text-[10px] mt-2`}>Supports JPG, PNG up to 10MB</p>
                                                    </div>
                                                </>
                                            )}
                                        </label>
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={handleBackToList}
                                        className={`flex-1 py-5 rounded-3xl font-black text-sm uppercase tracking-widest transition-all ${darkMode ? 'bg-zinc-800 text-white hover:bg-zinc-700' : 'bg-gray-100 text-gray-900 hover:bg-gray-200 shadow-sm'}`}
                                    >
                                        Discard
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isRaising || isUpdating}
                                        className="flex-[2] py-5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-3xl font-black text-sm uppercase tracking-widest shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
                                    >
                                        {(isRaising || isUpdating) ? (
                                            <Loader2 className="w-6 h-6 animate-spin" />
                                        ) : (
                                            <>
                                                <CheckCircle className="w-5 h-5" strokeWidth={3} />
                                                {isEditing ? "Update Claim" : "Submit Claim"}
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
