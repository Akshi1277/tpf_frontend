"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { 
  Download,
  FileText,
  Receipt,
  Calendar,
  Filter,
  Search,
  CheckCircle,
  Shield,
  Wallet,
  X,
  FileCheck,
  Clock,
  ArrowRight
} from "lucide-react"

export default function DownloadsPage({ darkModeFromParent }) {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkModeFromParent !== undefined) {
      setDarkMode(darkModeFromParent)
    }
  }, [darkModeFromParent])
  
  // Form 10BE State
  const [selectedFinancialYear, setSelectedFinancialYear] = useState("2024-25")
  
  // Invoice Filters State
  const [invoiceFilters, setInvoiceFilters] = useState({
    search: "",
    donationType: "all",
    dateFilter: "all",
    customStartDate: "",
    customEndDate: "",
    show80GOnly: false
  })
  
  const [showCustomDateRange, setShowCustomDateRange] = useState(false)

  // Mock Data - Form 10BE Receipts
  const form10BEReceipts = [
    {
      year: "2024-25",
      status: "available",
      issueDate: "2025-04-15",
      totalAmount: 125000,
      transactionCount: 8
    },
    {
      year: "2023-24",
      status: "available",
      issueDate: "2024-05-10",
      totalAmount: 98000,
      transactionCount: 6
    },
    {
      year: "2022-23",
      status: "available",
      issueDate: "2023-05-20",
      totalAmount: 75000,
      transactionCount: 5
    }
  ]

  // Mock Data - Transactions
  const allTransactions = [
    {
      id: "TXN001",
      recipient: "Al-Noor Education Trust",
      cause: "Education",
      amount: 5000,
      date: "2024-11-10",
      time: "10:30 AM",
      type: "80G",
      eligible80G: true,
      donationType: "sadaqah",
      paymentMethod: "UPI",
      color: "blue"
    },
    {
      id: "TXN002",
      recipient: "Hope Medical Foundation",
      cause: "Healthcare",
      amount: 10000,
      date: "2024-11-05",
      time: "2:15 PM",
      type: "80G",
      eligible80G: true,
      donationType: "zakat",
      paymentMethod: "Card",
      color: "emerald"
    },
    {
      id: "TXN003",
      recipient: "Orphan Care Society",
      cause: "Children",
      amount: 7500,
      date: "2024-10-28",
      time: "11:45 AM",
      type: "80G",
      eligible80G: true,
      donationType: "sadaqah",
      paymentMethod: "Net Banking",
      color: "purple"
    },
    {
      id: "TXN004",
      recipient: "Food Relief Program",
      cause: "Food Security",
      amount: 3000,
      date: "2024-10-15",
      time: "4:20 PM",
      type: "General",
      eligible80G: false,
      donationType: "imdaad",
      paymentMethod: "UPI",
      color: "orange"
    },
    {
      id: "TXN005",
      recipient: "Water Wells Project",
      cause: "Clean Water",
      amount: 15000,
      date: "2024-09-20",
      time: "9:00 AM",
      type: "80G",
      eligible80G: true,
      donationType: "sadaqah",
      paymentMethod: "Card",
      color: "blue"
    },
    {
      id: "TXN006",
      recipient: "Masjid Development Fund",
      cause: "Religious",
      amount: 8000,
      date: "2024-08-12",
      time: "3:30 PM",
      type: "General",
      eligible80G: false,
      donationType: "zakat",
      paymentMethod: "UPI",
      color: "green"
    }
  ]

  // Quick Date Filter Options
  const quickDateFilters = [
    { value: "all", label: "All Time" },
    { value: "last-month", label: "Last Month" },
    { value: "last-3-months", label: "Last 3 Months" },
    { value: "last-6-months", label: "Last 6 Months" },
    { value: "last-year", label: "Last Financial Year" },
    { value: "current-year", label: "Current Financial Year" },
    { value: "custom", label: "Custom Range" }
  ]

  // Filter transactions based on selected filters
  const getFilteredTransactions = () => {
    let filtered = allTransactions

    // 80G filter
    if (invoiceFilters.show80GOnly) {
      filtered = filtered.filter(txn => txn.eligible80G)
    }

    // Search filter
    if (invoiceFilters.search) {
      filtered = filtered.filter(txn =>
        txn.recipient.toLowerCase().includes(invoiceFilters.search.toLowerCase()) ||
        txn.cause.toLowerCase().includes(invoiceFilters.search.toLowerCase()) ||
        txn.id.toLowerCase().includes(invoiceFilters.search.toLowerCase())
      )
    }

    // Donation type filter
    if (invoiceFilters.donationType !== "all") {
      filtered = filtered.filter(txn => txn.donationType === invoiceFilters.donationType)
    }

    // Date filter
    if (invoiceFilters.dateFilter !== "all") {
      const now = new Date()
      const filterDate = (dateStr) => {
        const txnDate = new Date(dateStr)
        
        switch(invoiceFilters.dateFilter) {
          case "last-month":
            const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
            return txnDate >= lastMonth
          case "last-3-months":
            const last3Months = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate())
            return txnDate >= last3Months
          case "last-6-months":
            const last6Months = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate())
            return txnDate >= last6Months
          case "last-year":
            const lastYear = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
            return txnDate >= lastYear
          case "current-year":
            const currentYear = new Date(now.getFullYear(), now.getMonth(), now.getDate())
            return txnDate >= currentYear
          case "custom":
            if (invoiceFilters.customStartDate && invoiceFilters.customEndDate) {
              const startDate = new Date(invoiceFilters.customStartDate)
              const endDate = new Date(invoiceFilters.customEndDate)
              return txnDate >= startDate && txnDate <= endDate
            }
            return true
          default:
            return true
        }
      }
      
      filtered = filtered.filter(txn => filterDate(txn.date))
    }

    return filtered
  }

  const filteredTransactions = getFilteredTransactions()
  const totalFilteredAmount = filteredTransactions.reduce((sum, txn) => sum + txn.amount, 0)
  const total80GAmount = filteredTransactions.filter(txn => txn.eligible80G).reduce((sum, txn) => sum + txn.amount, 0)

  const handleDownload10BE = (year) => {
    alert(`Downloading Form 10BE for FY ${year}`)
  }

  const handleDownloadInvoice = (txnId) => {
    alert(`Downloading invoice for transaction ${txnId}`)
  }

  const handleDownloadAllInvoices = () => {
    alert(`Downloading ${filteredTransactions.length} invoices as ZIP`)
  }

  const resetFilters = () => {
    setInvoiceFilters({
      search: "",
      donationType: "all",
      dateFilter: "all",
      customStartDate: "",
      customEndDate: "",
      show80GOnly: false
    })
    setShowCustomDateRange(false)
  }

  const getTypeColor = (color) => {
    const colors = {
      blue: darkMode ? "text-blue-400" : "text-blue-600",
      emerald: darkMode ? "text-emerald-400" : "text-emerald-600",
      purple: darkMode ? "text-purple-400" : "text-purple-600",
      orange: darkMode ? "text-orange-400" : "text-orange-600",
      green: darkMode ? "text-green-400" : "text-green-600",
      red: darkMode ? "text-red-400" : "text-red-600"
    }
    return colors[color] || colors.emerald
  }

  const getTypeBg = (color) => {
    const colors = {
      blue: darkMode ? "bg-blue-500/20" : "bg-blue-100",
      emerald: darkMode ? "bg-emerald-500/20" : "bg-emerald-100",
      purple: darkMode ? "bg-purple-500/20" : "bg-purple-100",
      orange: darkMode ? "bg-orange-500/20" : "bg-orange-100",
      green: darkMode ? "bg-green-500/20" : "bg-green-100",
      red: darkMode ? "bg-red-500/20" : "bg-red-100"
    }
    return colors[color] || colors.emerald
  }

  return (
    <div className={`min-h-screen ${darkMode ? "bg-zinc-900" : "bg-gradient-to-br from-emerald-50 via-white to-teal-50"}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className={`absolute inset-0 ${
            darkMode 
              ? "bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)]" 
              : "bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)]"
          }`}
          style={{ backgroundSize: '48px 48px' }}
        />
        <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16 lg:pb-24">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center justify-center mb-4 sm:mb-6"
          >
            <div className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl ${
              darkMode 
                ? "bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30" 
                : "bg-gradient-to-br from-emerald-500 to-teal-500 shadow-xl"
            }`}>
              <Download className={`w-12 h-12 sm:w-16 sm:h-16 ${
                darkMode ? "text-emerald-400" : "text-white"
              }`} />
            </div>
          </motion.div>

          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 px-4 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}>
            Downloads &{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Receipts
            </span>
          </h1>
          
          <p className={`text-base sm:text-lg lg:text-xl max-w-3xl mx-auto px-4 ${
            darkMode ? "text-zinc-400" : "text-gray-600"
          }`}>
            Access your Form 10BE certificates and transaction invoices anytime
          </p>
        </motion.div>

        {/* Form 10BE Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8 sm:mb-12"
        >
          <div className={`rounded-xl sm:rounded-2xl border overflow-hidden ${
            darkMode 
              ? "bg-zinc-800/50 border-zinc-700" 
              : "bg-white border-gray-200 shadow-lg"
          }`}>
            <div className={`p-4 sm:p-6 border-b ${
              darkMode ? "border-zinc-700" : "border-gray-200"
            }`}>
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center ${
                  darkMode ? "bg-emerald-500/20" : "bg-emerald-100"
                }`}>
                  <FileText className="w-5 h-5 sm:w-7 sm:h-7 text-emerald-600" />
                </div>
                <div className="min-w-0">
                  <h2 className={`text-lg sm:text-xl lg:text-2xl font-bold truncate ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}>
                    Form 10BE Receipts
                  </h2>
                  <p className={`text-xs sm:text-sm ${
                    darkMode ? "text-zinc-400" : "text-gray-600"
                  }`}>
                    Official tax exemption certificates
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {form10BEReceipts.map((receipt, index) => (
                  <motion.div
                    key={receipt.year}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className={`p-4 sm:p-6 rounded-xl border ${
                      darkMode
                        ? "bg-zinc-900/50 border-zinc-700 hover:border-emerald-500/50"
                        : "bg-gray-50 border-gray-200 hover:border-emerald-400"
                    } transition-all`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className={`text-lg sm:text-xl font-bold mb-1 ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}>
                          FY {receipt.year}
                        </h3>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500" />
                          <span className="text-xs sm:text-sm font-medium text-emerald-600 capitalize">
                            {receipt.status}
                          </span>
                        </div>
                      </div>
                      <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
                    </div>

                    <div className="space-y-2 sm:space-y-3 mb-4">
                      <div className={`flex justify-between text-xs sm:text-sm ${
                        darkMode ? "text-zinc-400" : "text-gray-600"
                      }`}>
                        <span>Total Amount:</span>
                        <span className={`font-bold ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}>
                          ₹{receipt.totalAmount.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className={`flex justify-between text-xs sm:text-sm ${
                        darkMode ? "text-zinc-400" : "text-gray-600"
                      }`}>
                        <span>Donations:</span>
                        <span className={`font-semibold ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}>
                          {receipt.transactionCount}
                        </span>
                      </div>
                      <div className={`flex justify-between text-xs sm:text-sm ${
                        darkMode ? "text-zinc-400" : "text-gray-600"
                      }`}>
                        <span>Issue Date:</span>
                        <span className={darkMode ? "text-zinc-300" : "text-gray-700"}>
                          {new Date(receipt.issueDate).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDownload10BE(receipt.year)}
                      className={`w-full py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all flex items-center justify-center gap-2 ${
                        darkMode
                          ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                          : "bg-emerald-600 text-white hover:bg-emerald-700"
                      }`}
                    >
                      <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                      Download Receipt
                    </button>
                  </motion.div>
                ))}
              </div>

              <div className={`mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg sm:rounded-xl ${
                darkMode ? "bg-blue-500/10 border border-blue-500/30" : "bg-blue-50 border border-blue-200"
              }`}>
                <p className={`text-xs sm:text-sm ${
                  darkMode ? "text-blue-400" : "text-blue-700"
                }`}>
                  <strong>Note:</strong> Form 10BE certificates are issued after the financial year ends and are available for download within 60 days.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Transaction Invoices Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className={`rounded-xl sm:rounded-2xl border overflow-hidden ${
            darkMode 
              ? "bg-zinc-800/50 border-zinc-700" 
              : "bg-white border-gray-200 shadow-lg"
          }`}>
            <div className={`p-4 sm:p-6 border-b ${
              darkMode ? "border-zinc-700" : "border-gray-200"
            }`}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 ${
                    darkMode ? "bg-blue-500/20" : "bg-blue-100"
                  }`}>
                    <Receipt className="w-5 h-5 sm:w-7 sm:h-7 text-blue-600" />
                  </div>
                  <div className="min-w-0">
                    <h2 className={`text-lg sm:text-xl lg:text-2xl font-bold truncate ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}>
                      Transaction Invoices
                    </h2>
                    <p className={`text-xs sm:text-sm ${
                      darkMode ? "text-zinc-400" : "text-gray-600"
                    }`}>
                      Download invoices for your donations
                    </p>
                  </div>
                </div>

                {filteredTransactions.length > 0 && (
                  <button
                    onClick={handleDownloadAllInvoices}
                    className={`w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all flex items-center justify-center gap-2 ${
                      darkMode
                        ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                    Download All ({filteredTransactions.length})
                  </button>
                )}
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
                <div className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border ${
                  darkMode ? "bg-zinc-900/50 border-zinc-700" : "bg-gray-50 border-gray-200"
                }`}>
                  <p className={`text-xs font-medium mb-1 ${
                    darkMode ? "text-zinc-400" : "text-gray-600"
                  }`}>
                    Filtered Total
                  </p>
                  <p className={`text-xl sm:text-2xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}>
                    ₹{totalFilteredAmount.toLocaleString('en-IN')}
                  </p>
                  <p className={`text-xs mt-1 ${
                    darkMode ? "text-zinc-500" : "text-gray-500"
                  }`}>
                    {filteredTransactions.length} {filteredTransactions.length === 1 ? 'invoice' : 'invoices'}
                  </p>
                </div>

                <div className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border ${
                  darkMode ? "bg-emerald-900/20 border-emerald-700/50" : "bg-emerald-50 border-emerald-200"
                }`}>
                  <p className={`text-xs font-medium mb-1 ${
                    darkMode ? "text-emerald-400" : "text-emerald-700"
                  }`}>
                    80G Eligible Amount
                  </p>
                  <p className={`text-xl sm:text-2xl font-bold ${
                    darkMode ? "text-emerald-400" : "text-emerald-600"
                  }`}>
                    ₹{total80GAmount.toLocaleString('en-IN')}
                  </p>
                  <p className={`text-xs mt-1 ${
                    darkMode ? "text-emerald-500" : "text-emerald-600"
                  }`}>
                    {filteredTransactions.filter(txn => txn.eligible80G).length} eligible donations
                  </p>
                </div>
              </div>

              {/* Filters */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  {/* Search */}
                  <div className="flex-1 relative">
                    <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 ${
                      darkMode ? "text-zinc-500" : "text-gray-400"
                    }`} />
                    <input
                      type="text"
                      value={invoiceFilters.search}
                      onChange={(e) => setInvoiceFilters({...invoiceFilters, search: e.target.value})}
                      placeholder="Search..."
                      className={`w-full pl-9 sm:pl-11 pr-4 py-2.5 rounded-lg border outline-none transition-all text-sm sm:text-base ${
                        darkMode
                          ? "bg-zinc-700 border-zinc-600 text-white placeholder-zinc-500 focus:border-emerald-500"
                          : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500"
                      }`}
                    />
                  </div>

                  {/* Donation Type Filter */}
                  <div className="relative">
                    <Filter className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 ${
                      darkMode ? "text-zinc-500" : "text-gray-400"
                    }`} />
                    <select
                      value={invoiceFilters.donationType}
                      onChange={(e) => setInvoiceFilters({...invoiceFilters, donationType: e.target.value})}
                      className={`pl-9 sm:pl-11 pr-8 py-2.5 rounded-lg border outline-none transition-all appearance-none cursor-pointer text-sm sm:text-base ${
                        darkMode
                          ? "bg-zinc-700 border-zinc-600 text-white focus:border-emerald-500"
                          : "bg-gray-50 border-gray-200 text-gray-900 focus:border-emerald-500"
                      }`}
                    >
                      <option value="all">All Types</option>
                      <option value="zakat">Zakaat</option>
                      <option value="sadaqah">Sadaqah</option>
                      <option value="imdaad">Imdaad</option>
                    </select>
                  </div>
                </div>

                {/* 80G Toggle and Date Filters */}
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {/* 80G Toggle Button */}
                  <button
                    onClick={() => setInvoiceFilters({...invoiceFilters, show80GOnly: !invoiceFilters.show80GOnly})}
                    className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-sm sm:text-base transition-all flex items-center gap-2 ${
                      invoiceFilters.show80GOnly
                        ? darkMode
                          ? "bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500/50"
                          : "bg-emerald-500 text-white border-2 border-emerald-600"
                        : darkMode
                        ? "bg-zinc-700 text-zinc-400 border-2 border-zinc-600 hover:border-emerald-500/50"
                        : "bg-gray-100 text-gray-700 border-2 border-gray-200 hover:border-emerald-500/50"
                    }`}
                  >
                    <Shield className="w-4 h-4" />
                    80G Only
                  </button>

                  {quickDateFilters.map((filter) => (
                    <button
                      key={filter.value}
                      onClick={() => {
                        setInvoiceFilters({...invoiceFilters, dateFilter: filter.value})
                        setShowCustomDateRange(filter.value === "custom")
                      }}
                      className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-sm sm:text-base transition-all whitespace-nowrap ${
                        invoiceFilters.dateFilter === filter.value
                          ? darkMode
                            ? "bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500/50"
                            : "bg-emerald-500 text-white border-2 border-emerald-600"
                          : darkMode
                          ? "bg-zinc-700 text-zinc-400 border-2 border-zinc-600 hover:border-emerald-500/50"
                          : "bg-gray-100 text-gray-700 border-2 border-gray-200 hover:border-emerald-500/50"
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}

                  {(invoiceFilters.search || invoiceFilters.donationType !== "all" || invoiceFilters.dateFilter !== "all" || invoiceFilters.show80GOnly) && (
                    <button
                      onClick={resetFilters}
                      className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-sm sm:text-base transition-all flex items-center gap-2 ${
                        darkMode
                          ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                          : "bg-red-100 text-red-600 hover:bg-red-200"
                      }`}
                    >
                      <X className="w-4 h-4" />
                      Clear
                    </button>
                  )}
                </div>

                {/* Custom Date Range */}
                {showCustomDateRange && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border ${
                      darkMode ? "bg-zinc-900/50 border-zinc-700" : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className={`block text-xs sm:text-sm font-medium mb-2 ${
                          darkMode ? "text-zinc-400" : "text-gray-700"
                        }`}>
                          Start Date
                        </label>
                        <input
                          type="date"
                          value={invoiceFilters.customStartDate}
                          onChange={(e) => setInvoiceFilters({...invoiceFilters, customStartDate: e.target.value})}
                          className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border outline-none transition-all text-sm sm:text-base ${
                            darkMode
                              ? "bg-zinc-700 border-zinc-600 text-white focus:border-emerald-500"
                              : "bg-white border-gray-200 text-gray-900 focus:border-emerald-500"
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block text-xs sm:text-sm font-medium mb-2 ${
                          darkMode ? "text-zinc-400" : "text-gray-700"
                        }`}>
                          End Date
                        </label>
                        <input
                          type="date"
                          value={invoiceFilters.customEndDate}
                          onChange={(e) => setInvoiceFilters({...invoiceFilters, customEndDate: e.target.value})}
                          className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border outline-none transition-all text-sm sm:text-base ${
                            darkMode
                              ? "bg-zinc-700 border-zinc-600 text-white focus:border-emerald-500"
                              : "bg-white border-gray-200 text-gray-900 focus:border-emerald-500"
                          }`}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Transaction List */}
            <div className={`divide-y ${darkMode ? "divide-zinc-800" : "divide-zinc-100"}`}>
              {filteredTransactions.length === 0 ? (
                <div className="p-8 sm:p-12 text-center">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                    darkMode ? "bg-zinc-700" : "bg-gray-100"
                  }`}>
                    <FileCheck className={`w-6 h-6 sm:w-8 sm:h-8 ${
                      darkMode ? "text-zinc-500" : "text-gray-400"
                    }`} />
                  </div>
                  <p className={`text-base sm:text-lg font-medium mb-1 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}>
                    No invoices found
                  </p>
                  <p className={`text-xs sm:text-sm ${
                    darkMode ? "text-zinc-400" : "text-gray-600"
                  }`}>
                    Try adjusting your filters
                  </p>
                </div>
              ) : (
                filteredTransactions.map((txn, index) => (
                  <motion.div
                    key={txn.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`p-3 sm:p-4 lg:p-5 transition-all group ${
                      darkMode ? "hover:bg-zinc-700/30" : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                      {/* Icon */}
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110 ${
                        getTypeBg(txn.color)
                      }`}>
                        <Wallet className={`w-5 h-5 sm:w-6 sm:h-6 ${getTypeColor(txn.color)}`} />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0 w-full sm:w-auto">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className={`font-semibold text-sm sm:text-base truncate ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}>
                            {txn.recipient}
                          </h3>
                          {txn.eligible80G && (
                            <div className={`px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1 flex-shrink-0 ${
                              darkMode ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-100 text-emerald-700"
                            }`}>
                              <Shield className="w-3 h-3" />
                              80G
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            getTypeBg(txn.color)
                          } ${getTypeColor(txn.color)}`}>
                            {txn.cause}
                          </span>
                          <span className={`text-xs ${
                            darkMode ? "text-zinc-500" : "text-gray-500"
                          }`}>•</span>
                          <span className={`text-xs capitalize ${
                            darkMode ? "text-zinc-400" : "text-gray-600"
                          }`}>
                            {txn.donationType}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-xs flex-wrap">
                          <Calendar className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${
                            darkMode ? "text-zinc-500" : "text-gray-400"
                          }`} />
                          <span className={darkMode ? "text-zinc-500" : "text-gray-500"}>
                            {new Date(txn.date).toLocaleDateString('en-IN', { 
                              day: 'numeric', 
                              month: 'short', 
                              year: 'numeric' 
                            })}
                          </span>
                          <span className={`hidden sm:inline ${darkMode ? "text-zinc-600" : "text-gray-400"}`}>
                            •
                          </span>
                          <span className={`hidden sm:inline ${darkMode ? "text-zinc-500" : "text-gray-500"}`}>
                            {txn.id}
                          </span>
                        </div>
                      </div>

                      {/* Amount and Download */}
                      <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
                        <div className="text-left sm:text-right">
                          <p className={`text-lg sm:text-xl font-bold ${getTypeColor(txn.color)}`}>
                            ₹{txn.amount.toLocaleString('en-IN')}
                          </p>
                          <p className={`text-xs ${
                            darkMode ? "text-zinc-500" : "text-gray-500"
                          }`}>
                            {txn.paymentMethod}
                          </p>
                        </div>

                        <button
                          onClick={() => handleDownloadInvoice(txn.id)}
                          className={`p-2.5 sm:p-3 rounded-lg transition-all flex-shrink-0 ${
                            darkMode
                              ? "bg-zinc-700 hover:bg-emerald-500/20 text-zinc-400 hover:text-emerald-400"
                              : "bg-gray-100 hover:bg-emerald-100 text-gray-600 hover:text-emerald-600"
                          }`}
                        >
                          <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </motion.div>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className={`mt-6 sm:mt-8 p-4 sm:p-6 rounded-xl sm:rounded-2xl ${
            darkMode 
              ? "bg-gradient-to-br from-blue-900/30 to-emerald-900/30 border border-blue-700/30" 
              : "bg-gradient-to-br from-blue-50 to-emerald-50 border border-blue-200"
          }`}
        >
          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
            <div className={`p-2.5 sm:p-3 rounded-lg sm:rounded-xl flex-shrink-0 ${
              darkMode ? "bg-blue-500/20" : "bg-blue-100"
            }`}>
              <FileText className={`w-5 h-5 sm:w-6 sm:h-6 ${
                darkMode ? "text-blue-400" : "text-blue-600"
              }`} />
            </div>
            <div>
              <h3 className={`font-bold text-base sm:text-lg mb-2 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}>
                Important Information
              </h3>
              <ul className={`space-y-1.5 sm:space-y-2 text-xs sm:text-sm ${
                darkMode ? "text-zinc-400" : "text-gray-600"
              }`}>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>All invoices are generated automatically upon successful donation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>Form 10BE certificates include all 80G eligible donations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>Keep these documents safe for tax filing purposes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>You can download your receipts anytime - they don't expire</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-6 sm:mt-8 px-4"
        >
          <p className={`text-xs sm:text-sm mb-2 ${
            darkMode ? "text-zinc-500" : "text-gray-500"
          }`}>
            Need help? Contact our support team for assistance.
          </p>
          <a href="/contactus" className={`text-xs sm:text-sm font-medium underline ${
            darkMode ? "text-emerald-400 hover:text-emerald-500" : "text-emerald-600 hover:text-emerald-700"
          }`}>
            Visit Support Center
          </a>
        </motion.div>
      </div>
    </div>
  )
}