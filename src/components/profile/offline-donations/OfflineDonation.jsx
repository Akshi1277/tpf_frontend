"use client"

import { useGetOfflineDonationsQuery, useCreateOfflineDonationMutation } from "@/utils/slices/offlineDonationSlice"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { setCredentials } from "@/utils/slices/authSlice"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { 
  CreditCard,
  Building2,
  FileText,
  CheckCircle2,
  Clock,
  XCircle,
  Plus,
  ChevronRight,
  ArrowLeft,
  Calendar,
  DollarSign,
  Hash,
  User,
  Mail,
  Phone,
  Landmark,
  AlertCircle,
  Check,
} from "lucide-react"

export default function OfflineDonationsPage({ darkModeFromParent }) {
  const [darkMode, setDarkMode] = useState(false)
  const [view, setView] = useState("list")
  const [selectedMethod, setSelectedMethod] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isClient, setIsClient] = useState(false);

useEffect(() => {
  setIsClient(true);
}, []);


const {
  data,
  isLoading,
  isError,
  error,
} = useGetOfflineDonationsQuery();

const donations = data?.donations || [];

  const [createDonation, { isLoading: creating }] =
    useCreateOfflineDonationMutation();

  

  const [formData, setFormData] = useState({
    method: "",
    amount: "",
    donorName: "",
    email: "",
    phone: "",
    transactionDate: "",
    referenceNumber: "",
    utrNumber: "",
    bankName: "",
    branchName: "",
    chequeNumber: "",
    chequeDate: "",
    bankAccountName: "",
    remarks: ""
  })

  useEffect(() => {
    if (darkModeFromParent !== undefined) {
      setDarkMode(darkModeFromParent)
    }
  }, [darkModeFromParent])

  const paymentMethods = [
    { id: "rtgs", name: "RTGS", icon: Building2, description: "Real Time Gross Settlement", color: "emerald" },
    { id: "imps", name: "IMPS", icon: CreditCard, description: "Immediate Payment Service", color: "blue" },
    { id: "neft", name: "NEFT", icon: Landmark, description: "National Electronic Funds Transfer", color: "purple" },
    { id: "cheque", name: "CHEQUE", icon: FileText, description: "Bank Cheque Payment", color: "orange" }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleMethodSelect = (method) => {
    setSelectedMethod(method)
    setFormData(prev => ({ ...prev, method: method.name }))
  }

  // FIXED — backend only accepts donation details, donor auto detected
const dispatch = useDispatch();

const handleSubmit = async () => {
  try {
        const payload = {
      method: formData.method,
      amount: Number(formData.amount), // ✅ FIX
      remarks: formData.remarks || "",

      bankName: formData.bankName,
      bankAccountName: formData.bankAccountName,
      transactionDate: formData.transactionDate,
      referenceNumber: formData.referenceNumber,
      utrNumber: formData.utrNumber,

      chequeNumber: formData.chequeNumber,
      chequeDate: formData.chequeDate,
      branchName: formData.branchName,
    }
    console.log("Submitting donation:", payload);

    const data = await createDonation(payload).unwrap();

    // ⭐ Save new user (with new donation) in Redux state
    dispatch(setCredentials(data.user));

    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      setView("list");
      setSelectedMethod(null);

    }, 1500);
  } catch (err) {
    console.error(err);
  }
};


  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return darkMode ? "text-emerald-400 bg-emerald-950/30 border-emerald-800" : "text-emerald-700 bg-emerald-50 border-emerald-200"
      case "rejected":
        return darkMode ? "text-red-400 bg-red-950/30 border-red-800" : "text-red-700 bg-red-50 border-red-200"
      default:
        return darkMode ? "text-yellow-400 bg-yellow-950/30 border-yellow-800" : "text-yellow-700 bg-yellow-50 border-yellow-200"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <CheckCircle2 className="w-4 h-4" />
      case "rejected":
        return <XCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }
  
if (!isClient) {
  return null; // or a loader
}

  return (
    <div className="min-h-screen">

      {/* SUCCESS TOAST — unchanged UI */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`fixed top-4 right-4 sm:top-6 sm:right-6 z-50 px-4 sm:px-6 py-3 sm:py-4 rounded-2xl shadow-2xl max-w-[calc(100vw-2rem)] sm:max-w-sm ${
              darkMode
                ? "bg-zinc-900 border border-emerald-500/20"
                : "bg-white border border-emerald-200"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-5 h-5 text-white" strokeWidth={3} />
              </div>
              <div className="flex-1">
                <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                  Donation Submitted Successfully!
                </p>
                <p className={`text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                  Your request is pending admin approval.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BACKGROUND + MAIN UI (UNCHANGED) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] ${
          darkMode ? "bg-emerald-950/20" : "bg-emerald-50"
        }`} />
        <div className={`absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[100px] ${
          darkMode ? "bg-teal-950/20" : "bg-teal-50"
        }`} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-12 pb-8 sm:pb-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className={`text-3xl sm:text-4xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Offline Donations
          </h1>
          <p className={`text-sm sm:text-base ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
            Submit and track your offline donation requests
          </p>
        </motion.div>

        {/* PAGE VIEW LOGIC */}
        <AnimatePresence mode="wait">

          {/* LIST VIEW */}
          {view === "list" && (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >

              {/* CREATE NEW donation button (UI unchanged) */}
              <motion.button
                onClick={() => setView("create")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mb-6 p-6 rounded-2xl border-2 border-dashed transition-all group hover:border-emerald-500"
                style={{
                  borderColor: darkMode ? "#3f3f46" : "#e5e7eb",
                  backgroundColor: darkMode ? "rgba(39,39,42,0.5)" : "#ffffff"
                }}
              >
                <div className="flex items-center justify-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                      darkMode 
                        ? "bg-emerald-950/50 group-hover:bg-emerald-900/50" 
                        : "bg-emerald-50 group-hover:bg-emerald-100"
                    }`}
                  >
                    <Plus className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="text-left">
                    <p className={`font-semibold text-lg ${darkMode ? "text-white" : "text-gray-900"}`}>
                      Create New Offline Donation
                    </p>
                    <p className={`text-sm ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                      Submit a new donation request for admin approval
                    </p>
                  </div>
                </div>
              </motion.button>

              {/* DONATION LIST (FIXED FIELDS, UI UNCHANGED) */}
              {donations.length > 0 ? (
                <div className="space-y-4">
                  <h2 className={`text-xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                    Your Donation Requests
                  </h2>

                  {donations.map((donation, index) => {
                    const donationDate =
                      donation.transactionDate ||
                      donation.chequeDate ||
                      donation.submittedOn

                    const refNumber =
                      donation.referenceNumber ||
                      donation.utrNumber ||
                      donation.chequeNumber ||
                      "--"

                    return (
                      <motion.div
                        key={donation._id || `${donation.method}-${donation.submittedOn}-${index}`}

                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-6 rounded-2xl border ${
                          darkMode 
                            ? "bg-zinc-900/50 border-zinc-800" 
                            : "bg-white border-gray-200 shadow-sm"
                        }`}
                      >
                        {/* Card header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                              darkMode ? "bg-emerald-950/50" : "bg-emerald-50"
                            }`}>
                              {(() => {
                                const m = paymentMethods.find(m => m.name === donation.method)
                                if (!m) return null
                                const Icon = m.icon
                                return <Icon className="w-6 h-6 text-emerald-600" />
                              })()}
                            </div>
                            <div>
                              <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                                {donation.method}
                              </p>
                              <p className={`text-sm ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                                {donation._id}
                              </p>
                            </div>
                          </div>

                          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold border ${getStatusColor(donation.status)}`}>
                            {getStatusIcon(donation.status)}
                            <span className="capitalize">{donation.status}</span>
                          </div>
                        </div>

                        {/* body */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className={`text-xs font-medium mb-1 ${darkMode ? "text-zinc-500" : "text-gray-500"}`}>
                              Amount
                            </p>
                            <p className={`font-bold text-lg ${darkMode ? "text-white" : "text-gray-900"}`}>
                              ₹{Number(donation.amount || 0).toLocaleString("en-IN")}

                            </p>
                          </div>

                          <div>
                            <p className={`text-xs font-medium mb-1 ${darkMode ? "text-zinc-500" : "text-gray-500"}`}>
                              Date
                            </p>
                            <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                              {new Date(donationDate).toLocaleDateString("en-IN")}
                            </p>
                          </div>

                          <div className="col-span-2">
                            <p className={`text-xs font-medium mb-1 ${darkMode ? "text-zinc-500" : "text-gray-500"}`}>
                              Reference Number
                            </p>
                            <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                              {refNumber}
                            </p>
                          </div>
                        </div>

                        {/* footer */}
                        <div className={`pt-4 border-t ${darkMode ? "border-zinc-800" : "border-gray-200"}`}>
                          <div className="flex items-center justify-between">
                            <p className={`text-xs ${darkMode ? "text-zinc-500" : "text-gray-500"}`}>
                              Submitted on {new Date(donation.submittedOn).toLocaleString("en-IN")}
                            </p>

                            {donation.status === "approved" && donation.approvedOn && (
                              <p className={`text-xs ${darkMode ? "text-emerald-400" : "text-emerald-600"}`}>
                                Approved on {new Date(donation.approvedOn).toLocaleString("en-IN")}
                              </p>
                            )}
                          </div>
                        </div>

                      </motion.div>
                    )
                  })}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`text-center py-16 rounded-2xl border ${
                    darkMode ? "bg-zinc-900/30 border-zinc-800" : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <FileText className={`w-16 h-16 mx-auto mb-4 ${darkMode ? "text-zinc-600" : "text-gray-300"}`} />
                  <p className={`text-lg font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                    No donation requests yet
                  </p>
                  <p className={`text-sm ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                    Create your first offline donation request
                  </p>
                </motion.div>
              )}

            </motion.div>
          )}

          {/* CREATE VIEW — UI UNCHANGED */}
          {view === "create" && (
            <motion.div
              key="create"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <button
                onClick={() => {
                  setView("list")
                  setSelectedMethod(null)
                }}
                className={`flex items-center gap-2 mb-6 px-4 py-2 rounded-xl font-semibold transition-all ${
                  darkMode
                    ? "bg-zinc-800 hover:bg-zinc-700 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
                Back to List
              </button>

              {/* method selection */}
              {!selectedMethod ? (
                <div>
                  <h2 className={`text-2xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
                    Select Payment Method
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {paymentMethods.map((method, index) => {
                      const Icon = method.icon
                      return (
                        <motion.button
                          key={method.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => handleMethodSelect(method)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`p-6 rounded-2xl border-2 transition-all text-left group ${
                            darkMode
                              ? "bg-zinc-900/50 border-zinc-800 hover:border-emerald-500"
                              : "bg-white border-gray-200 hover:border-emerald-500 shadow-sm"
                          }`}
                        >
                          <div
                            className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                              darkMode 
                                ? "bg-emerald-950/50 group-hover:bg-emerald-900/50" 
                                : "bg-emerald-50 group-hover:bg-emerald-100"
                            }`}
                          >
                            <Icon className="w-7 h-7 text-emerald-600" />
                          </div>
                          <h3 className={`text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                            {method.name}
                          </h3>
                          <p className={`text-sm mb-4 ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                            {method.description}
                          </p>
                          <div className="flex items-center gap-2 text-emerald-600 font-semibold group-hover:gap-3 transition-all">
                            Select
                            <ChevronRight className="w-5 h-5" />
                          </div>
                        </motion.button>
                      )
                    })}
                  </div>
                </div>
              ) : (
                <>
                {/* FORM WRAPPER — UI UNCHANGED */}
                <div className={`rounded-3xl overflow-hidden ${
                  darkMode 
                    ? "bg-zinc-900/50 backdrop-blur-xl border border-zinc-800" 
                    : "bg-white backdrop-blur-xl border border-gray-200 shadow-xl"
                }`}>
                  
                  {/* colored header */}
                  <div className={`relative h-24 sm:h-32 bg-gradient-to-r ${
                    selectedMethod.color === "emerald" ? "from-emerald-600 via-teal-600 to-emerald-700" :
                    selectedMethod.color === "blue" ? "from-blue-600 via-cyan-600 to-blue-700" :
                    selectedMethod.color === "purple" ? "from-purple-600 via-violet-600 to-purple-700" :
                    "from-orange-600 via-amber-600 to-orange-700"
                  }`}>
                    <div className="absolute inset-0 opacity-20">
                      <div 
                        className="absolute inset-0"
                        style={{
                          backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                          backgroundSize: "32px 32px"
                        }}
                      />
                    </div>
                    <div className="relative h-full flex items-center justify-center">
                      <div className="text-center px-4">
                        {(() => {
                          const Icon = selectedMethod.icon
                          return <Icon className="w-12 h-12 text-white mx-auto mb-2" />
                        })()}
                        <h2 className="text-2xl font-bold text-white">{selectedMethod.name} Donation</h2>
                        <p className="text-white/80 text-sm mt-1">{selectedMethod.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* form fields */}
                  <div className="p-6 sm:p-8 space-y-6">

                    {/* donor info — UI kept, but backend ignores these */}
                    <div>
                      <h3 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                        Donor Information
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* donor name */}
                        <div>
                          <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <User className={`absolute left-4 top-3.5 w-5 h-5 ${darkMode ? "text-zinc-500" : "text-gray-400"}`} />
                            <input
                              type="text"
                              name="donorName"
                              value={formData.donorName}
                              onChange={handleInputChange}
                              placeholder="Enter your full name"
                              className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 outline-none transition-all ${
                                darkMode
                                  ? "bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500 focus:border-emerald-500"
                                  : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500"
                              }`}
                            />
                          </div>
                        </div>

                        {/* email */}
                        <div>
                          <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Mail className={`absolute left-4 top-3.5 w-5 h-5 ${darkMode ? "text-zinc-500" : "text-gray-400"}`} />
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="your.email@example.com"
                              className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 outline-none transition-all ${
                                darkMode
                                  ? "bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500 focus:border-emerald-500"
                                  : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500"
                              }`}
                            />
                          </div>
                        </div>

                        {/* phone */}
                        <div>
                          <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                            Phone Number <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Phone className={`absolute left-4 top-3.5 w-5 h-5 ${darkMode ? "text-zinc-500" : "text-gray-400"}`} />
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="+91 98765 43210"
                              className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 outline-none transition-all ${
                                darkMode
                                  ? "bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500 focus:border-emerald-500"
                                  : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500"
                              }`}
                            />
                          </div>
                        </div>

                        {/* amount */}
                        <div>
                          <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                            Donation Amount <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <DollarSign className={`absolute left-4 top-3.5 w-5 h-5 ${darkMode ? "text-zinc-500" : "text-gray-400"}`} />
                            <input
                              type="number"
                              name="amount"
                              value={formData.amount}
                              onChange={handleInputChange}
                              placeholder="Enter amount in ₹"
                              className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 outline-none transition-all ${
                                darkMode
                                  ? "bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500 focus:border-emerald-500"
                                  : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500"
                              }`}
                            />
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* TRANSACTION DETAILS — unchanged UI but fixed logic */}
                    <div>
                      <h3 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                        Transaction Details
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {selectedMethod.id !== "cheque" ? (
                          <>
                            {/* RTGS/IMPS/NEFT reference/UTR */}
                            <div>
                              <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                                {selectedMethod.id === "rtgs"
                                  ? "UTR Number"
                                  : selectedMethod.id === "imps"
                                  ? "Transaction ID"
                                  : "Reference Number"}
                                <span className="text-red-500">*</span>
                              </label>
                              <div className="relative">
                                <Hash className={`absolute left-4 top-3.5 w-5 h-5 ${darkMode ? "text-zinc-500" : "text-gray-400"}`} />
                                <input
                                  type="text"
                                  name={selectedMethod.id === "rtgs" ? "utrNumber" : "referenceNumber"}
                                  value={selectedMethod.id === "rtgs" ? formData.utrNumber : formData.referenceNumber}
                                  onChange={handleInputChange}
                                  placeholder="Enter transaction reference"
                                  className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 outline-none transition-all ${
                                    darkMode
                                      ? "bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500 focus:border-emerald-500"
                                      : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500"
                                  }`}
                                />
                              </div>
                            </div>
                                  {/* Transaction Date */}
<div>
  <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
    Transaction Date <span className="text-red-500">*</span>
  </label>
  <div className="relative">
    <Calendar className={`absolute left-4 top-3.5 w-5 h-5 ${darkMode ? "text-zinc-500" : "text-gray-400"}`} />
    <input
      type="date"
      name="transactionDate"
      value={formData.transactionDate}
      onChange={handleInputChange}
      className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 outline-none transition-all ${
        darkMode
          ? "bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500 focus:border-emerald-500"
          : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500"
      }`}
    />
  </div>
</div>

                            {/* bank name */}
                            <div>
                              <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                                Bank Name <span className="text-red-500">*</span>
                              </label>
                              <div className="relative">
                                <Building2 className={`absolute left-4 top-3.5 w-5 h-5 ${darkMode ? "text-zinc-500" : "text-gray-400"}`} />
                                <input
                                  type="text"
                                  name="bankName"
                                  value={formData.bankName}
                                  onChange={handleInputChange}
                                  placeholder="Enter bank name"
                                  className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 outline-none transition-all ${
                                    darkMode
                                      ? "bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500 focus:border-emerald-500"
                                      : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500"
                                  }`}
                                />
                              </div>
                            </div>

                            {/* account holder */}
                            <div>
                              <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                                Account Holder Name <span className="text-red-500">*</span>
                              </label>
                              <div className="relative">
                                <User className={`absolute left-4 top-3.5 w-5 h-5 ${darkMode ? "text-zinc-500" : "text-gray-400"}`} />
                                <input
                                  type="text"
                                  name="bankAccountName"
                                  value={formData.bankAccountName}
                                  onChange={handleInputChange}
                                  placeholder="Account holder name"
                                  className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 outline-none transition-all ${
                                    darkMode
                                      ? "bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500 focus:border-emerald-500"
                                      : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500"
                                  }`}
                                />
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            {/* CHEQUE NUMBER */}
                            <div>
                              <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                                Cheque Number <span className="text-red-500">*</span>
                              </label>
                              <div className="relative">
                                <Hash className={`absolute left-4 top-3.5 w-5 h-5 ${darkMode ? "text-zinc-500" : "text-gray-400"}`} />
                                <input
                                  type="text"
                                  name="chequeNumber"
                                  value={formData.chequeNumber}
                                  onChange={handleInputChange}
                                  placeholder="Enter cheque number"
                                  className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 outline-none transition-all ${
                                    darkMode
                                      ? "bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500 focus:border-emerald-500"
                                      : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500"
                                  }`}
                                />
                              </div>
                            </div>

                            {/* cheque date */}
                            <div>
                              <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                                Cheque Date <span className="text-red-500">*</span>
                              </label>
                              <div className="relative">
                                <Calendar className={`absolute left-4 top-3.5 w-5 h-5 ${darkMode ? "text-zinc-500" : "text-gray-400"}`} />
                                <input
                                  type="date"
                                  name="chequeDate"
                                  value={formData.chequeDate}
                                  onChange={handleInputChange}
                                  className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 outline-none transition-all ${
                                    darkMode
                                      ? "bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500 focus:border-emerald-500"
                                      : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500"
                                  }`}
                                />
                              </div>
                            </div>

                            {/* cheque bank name */}
                            <div>
                              <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                                Bank Name <span className="text-red-500">*</span>
                              </label>
                              <div className="relative">
                                <Building2 className={`absolute left-4 top-3.5 w-5 h-5 ${darkMode ? "text-zinc-500" : "text-gray-400"}`} />
                                <input
                                  type="text"
                                  name="bankName"
                                  value={formData.bankName}
                                  onChange={handleInputChange}
                                  placeholder="Bank name on cheque"
                                  className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 outline-none transition-all ${
                                    darkMode
                                      ? "bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500 focus:border-emerald-500"
                                      : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500"
                                  }`}
                                />
                              </div>
                            </div>

                            {/* optional branch */}
                            <div>
                              <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                                Branch Name
                              </label>
                              <div className="relative">
                                <Landmark className={`absolute left-4 top-3.5 w-5 h-5 ${darkMode ? "text-zinc-500" : "text-gray-400"}`} />
                                <input
                                  type="text"
                                  name="branchName"
                                  value={formData.branchName}
                                  onChange={handleInputChange}
                                  placeholder="Branch name (optional)"
                                  className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 outline-none transition-all ${
                                    darkMode
                                      ? "bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500 focus:border-emerald-500"
                                      : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500"
                                  }`}
                                />
                              </div>
                            </div>

                          </>
                        )}

                      </div>
                    </div>

                    {/* Remarks */}
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                        Remarks / Additional Information
                      </label>
                      <textarea
                        name="remarks"
                        value={formData.remarks}
                        onChange={handleInputChange}
                        rows={4}
                        placeholder="Add any additional information..."
                        className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all resize-none ${
                          darkMode
                            ? "bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500 focus:border-emerald-500"
                            : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500"
                        }`}
                      />
                    </div>

                    {/* Notice */}
                    <div className={`p-4 rounded-xl border ${
                      darkMode ? "bg-blue-900/20 border-blue-800/50" : "bg-blue-50 border-blue-200"
                    }`}>
                      <div className="flex items-start gap-3">
                        <AlertCircle
                          className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                            darkMode ? "text-blue-400" : "text-blue-600"
                          }`}
                        />
                        <div>
                          <p className={`font-semibold mb-1 text-sm ${
                            darkMode ? "text-blue-300" : "text-blue-800"
                          }`}>
                            Important Information
                          </p>
                          <p className={`text-xs ${
                            darkMode ? "text-blue-400" : "text-blue-700"
                          }`}>
                            Your donation request will be reviewed by our admin team. You'll receive a
                            notification once it's approved.
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Submit */}
                  <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-zinc-800">

                    <button
                      onClick={() => setSelectedMethod(null)}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                        darkMode
                          ? "bg-zinc-800 hover:bg-zinc-700 text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      Change Method
                    </button>

                    <button
                      onClick={handleSubmit}
                      disabled={!formData.amount || creating}
                      className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all shadow-lg ${
                        !formData.amount || creating
                          ? "bg-gray-400 cursor-not-allowed text-white"
                          : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                      }`}
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      {creating ? "Submitting..." : "Submit Donation Request"}
                    </button>

                  </div>

                </div>
                </>
              )}

            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}
