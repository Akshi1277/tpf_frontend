"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { 
  Target,
  Download,
  Filter,
  Search,
  Calendar,
  CheckCircle,
  Wallet,
  Shield
} from "lucide-react"

export default function DonationHistory({ 
  darkMode, 
  transactions, 
  filterStatus, 
  setFilterStatus, 
  searchQuery, 
  setSearchQuery,
  filter80G,
  setFilter80G,
  dateRange,
  setDateRange,
  handleDownloadInvoice
}) {
  const [showDateRange, setShowDateRange] = useState(false)

  const getTypeColor = (txnColor) => {
    return txnColor || "emerald"
  }

  const filteredTransactions = transactions.filter(txn => {
    const matchesStatus = filterStatus === "all" || txn.status === filterStatus
    const matchesSearch = searchQuery === "" || 
      txn.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.cause.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matches80G = !filter80G || txn.eligible80G
    
    // Date range filter
    let matchesDateRange = true
    if (dateRange.start && dateRange.end) {
      const txnDate = new Date(txn.date)
      const startDate = new Date(dateRange.start)
      const endDate = new Date(dateRange.end)
      matchesDateRange = txnDate >= startDate && txnDate <= endDate
    }
    
    return matchesStatus && matchesSearch && matches80G && matchesDateRange
  })

  const totalFiltered = filteredTransactions.reduce((sum, txn) => sum + txn.amount, 0)
  const total80G = filteredTransactions.filter(txn => txn.eligible80G).reduce((sum, txn) => sum + txn.amount, 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.9 }}
      className="mb-8"
    >
      <div className={`rounded-2xl border overflow-hidden ${
        darkMode 
          ? "bg-zinc-800/50 border-zinc-700" 
          : "bg-white border-gray-200 shadow-lg"
      }`}>
        <div className={`p-6 border-b ${
          darkMode ? "border-zinc-700" : "border-gray-200"
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                darkMode ? "bg-blue-500/20" : "bg-blue-100"
              }`}>
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className={`text-2xl font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}>
                  Donation History
                </h2>
                <p className={`text-sm ${
                  darkMode ? "text-zinc-400" : "text-gray-600"
                }`}>
                  Your contributions over time
                </p>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className={`p-4 rounded-xl border ${
              darkMode ? "bg-zinc-900/50 border-zinc-700" : "bg-gray-50 border-gray-200"
            }`}>
              <p className={`text-xs font-medium mb-1 ${
                darkMode ? "text-zinc-400" : "text-gray-600"
              }`}>
                Filtered Total
              </p>
              <p className={`text-2xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}>
                ₹{totalFiltered.toLocaleString('en-IN')}
              </p>
              <p className={`text-xs mt-1 ${
                darkMode ? "text-zinc-500" : "text-gray-500"
              }`}>
                {filteredTransactions.length} {filteredTransactions.length === 1 ? 'transaction' : 'transactions'}
              </p>
            </div>

            <div className={`p-4 rounded-xl border ${
              darkMode ? "bg-emerald-900/20 border-emerald-700/50" : "bg-emerald-50 border-emerald-200"
            }`}>
              <p className={`text-xs font-medium mb-1 ${
                darkMode ? "text-emerald-400" : "text-emerald-700"
              }`}>
                80G Eligible Amount
              </p>
              <p className={`text-2xl font-bold ${
                darkMode ? "text-emerald-400" : "text-emerald-600"
              }`}>
                ₹{total80G.toLocaleString('en-IN')}
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
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                  darkMode ? "text-zinc-500" : "text-gray-400"
                }`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by recipient, cause, or ID..."
                  className={`w-full pl-11 pr-4 py-2.5 rounded-lg border outline-none transition-all ${
                    darkMode
                      ? "bg-zinc-700 border-zinc-600 text-white placeholder-zinc-500 focus:border-emerald-500"
                      : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500"
                  }`}
                />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <Filter className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                  darkMode ? "text-zinc-500" : "text-gray-400"
                }`} />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className={`pl-11 pr-8 py-2.5 rounded-lg border outline-none transition-all appearance-none cursor-pointer ${
                    darkMode
                      ? "bg-zinc-700 border-zinc-600 text-white focus:border-emerald-500"
                      : "bg-gray-50 border-gray-200 text-gray-900 focus:border-emerald-500"
                  }`}
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
            </div>

            {/* 80G Filter Toggle and Date Range */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* 80G Filter */}
              <button
                onClick={() => setFilter80G(!filter80G)}
                className={`px-4 py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                  filter80G
                    ? darkMode
                      ? "bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500/50"
                      : "bg-emerald-500 text-white border-2 border-emerald-600"
                    : darkMode
                    ? "bg-zinc-700 text-zinc-400 border-2 border-zinc-600 hover:border-emerald-500/50"
                    : "bg-gray-100 text-gray-700 border-2 border-gray-200 hover:border-emerald-500/50"
                }`}
              >
                <Shield className="w-5 h-5" />
                {filter80G ? "Showing 80G Only" : "Show 80G Eligible"}
              </button>

              {/* Date Range Toggle */}
              <button
                onClick={() => setShowDateRange(!showDateRange)}
                className={`px-4 py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                  showDateRange || (dateRange.start && dateRange.end)
                    ? darkMode
                      ? "bg-blue-500/20 text-blue-400 border-2 border-blue-500/50"
                      : "bg-blue-500 text-white border-2 border-blue-600"
                    : darkMode
                    ? "bg-zinc-700 text-zinc-400 border-2 border-zinc-600 hover:border-blue-500/50"
                    : "bg-gray-100 text-gray-700 border-2 border-gray-200 hover:border-blue-500/50"
                }`}
              >
                <Calendar className="w-5 h-5" />
                Date Range Filter
              </button>

              {/* Download Invoice Button */}
              {dateRange.start && dateRange.end && (
                <button
                  onClick={handleDownloadInvoice}
                  className={`px-4 py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                    darkMode
                      ? "bg-purple-500/20 text-purple-400 border-2 border-purple-500/50 hover:bg-purple-500/30"
                      : "bg-purple-500 text-white border-2 border-purple-600 hover:bg-purple-600"
                  }`}
                >
                  <Download className="w-5 h-5" />
                  Download Invoice
                </button>
              )}
            </div>

            {/* Date Range Inputs */}
            {showDateRange && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className={`p-4 rounded-xl border ${
                  darkMode ? "bg-zinc-900/50 border-zinc-700" : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-zinc-400" : "text-gray-700"
                    }`}>
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={dateRange.start}
                      onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-all ${
                        darkMode
                          ? "bg-zinc-700 border-zinc-600 text-white focus:border-emerald-500"
                          : "bg-white border-gray-200 text-gray-900 focus:border-emerald-500"
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-zinc-400" : "text-gray-700"
                    }`}>
                      End Date
                    </label>
                    <input
                      type="date"
                      value={dateRange.end}
                      onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-all ${
                        darkMode
                          ? "bg-zinc-700 border-zinc-600 text-white focus:border-emerald-500"
                          : "bg-white border-gray-200 text-gray-900 focus:border-emerald-500"
                      }`}
                    />
                  </div>
                </div>
                {dateRange.start && dateRange.end && (
                  <div className="mt-3 flex items-center justify-between">
                    <p className={`text-sm ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                      Showing donations from {new Date(dateRange.start).toLocaleDateString('en-IN')} to {new Date(dateRange.end).toLocaleDateString('en-IN')}
                    </p>
                    <button
                      onClick={() => setDateRange({ start: "", end: "" })}
                      className={`text-sm font-medium ${
                        darkMode ? "text-red-400 hover:text-red-300" : "text-red-600 hover:text-red-700"
                      }`}
                    >
                      Clear
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>

        {/* Transaction List */}
        <div className={`divide-y ${darkMode ? "divide-zinc-800" : "divide-zinc-100"}`}>
          {filteredTransactions.length === 0 ? (
            <div className="p-12 text-center">
              <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                darkMode ? "bg-zinc-700" : "bg-gray-100"
              }`}>
                <Search className={`w-8 h-8 ${
                  darkMode ? "text-zinc-500" : "text-gray-400"
                }`} />
              </div>
              <p className={`text-lg font-medium mb-1 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}>
                No donations found
              </p>
              <p className={`text-sm ${
                darkMode ? "text-zinc-400" : "text-gray-600"
              }`}>
                Try adjusting your filters or search query
              </p>
            </div>
          ) : (
            filteredTransactions.map((txn, index) => {
              const typeColor = getTypeColor(txn.color)

              return (
                <motion.div
                  key={txn.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`p-4 md:p-5 transition-all relative overflow-hidden group ${
                    darkMode ? "hover:bg-zinc-700/30" : "hover:bg-gray-50"
                  }`}
                >
                  {/* Colorful gradient background on hover */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    typeColor === "blue" ? "bg-gradient-to-r from-blue-500/5 to-transparent" :
                    typeColor === "purple" ? "bg-gradient-to-r from-purple-500/5 to-transparent" :
                    typeColor === "green" ? "bg-gradient-to-r from-green-500/5 to-transparent" :
                    typeColor === "pink" ? "bg-gradient-to-r from-pink-500/5 to-transparent" :
                    typeColor === "red" ? "bg-gradient-to-r from-red-500/5 to-transparent" :
                    typeColor === "orange" ? "bg-gradient-to-r from-orange-500/5 to-transparent" :
                    "bg-gradient-to-r from-emerald-500/5 to-transparent"
                  }`} />
                  
                  <div className="flex items-center gap-4 relative z-10">
                    {/* Colorful Icon */}
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110 ${
                      typeColor === "blue" 
                        ? darkMode ? "bg-gradient-to-br from-blue-500/20 to-blue-600/20" : "bg-gradient-to-br from-blue-100 to-blue-200"
                        : typeColor === "purple"
                        ? darkMode ? "bg-gradient-to-br from-purple-500/20 to-purple-600/20" : "bg-gradient-to-br from-purple-100 to-purple-200"
                        : typeColor === "green"
                        ? darkMode ? "bg-gradient-to-br from-green-500/20 to-green-600/20" : "bg-gradient-to-br from-green-100 to-green-200"
                        : typeColor === "pink"
                        ? darkMode ? "bg-gradient-to-br from-pink-500/20 to-pink-600/20" : "bg-gradient-to-br from-pink-100 to-pink-200"
                        : typeColor === "red"
                        ? darkMode ? "bg-gradient-to-br from-red-500/20 to-red-600/20" : "bg-gradient-to-br from-red-100 to-red-200"
                        : typeColor === "orange"
                        ? darkMode ? "bg-gradient-to-br from-orange-500/20 to-orange-600/20" : "bg-gradient-to-br from-orange-100 to-orange-200"
                        : darkMode ? "bg-gradient-to-br from-emerald-500/20 to-emerald-600/20" : "bg-gradient-to-br from-emerald-100 to-emerald-200"
                    }`}>
                      <Wallet className={`w-7 h-7 ${
                        typeColor === "blue" ? "text-blue-600" :
                        typeColor === "purple" ? "text-purple-600" :
                        typeColor === "green" ? "text-green-600" :
                        typeColor === "pink" ? "text-pink-600" :
                        typeColor === "red" ? "text-red-600" :
                        typeColor === "orange" ? "text-orange-600" :
                        "text-emerald-600"
                      }`} />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className={`font-semibold text-base ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}>
                          {txn.recipient}
                        </h3>
                        {txn.eligible80G && (
                          <div className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1 flex-shrink-0 ${
                            darkMode ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-100 text-emerald-700"
                          }`}>
                            <Shield className="w-3 h-3" />
                            80G
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          typeColor === "blue"
                            ? darkMode ? "bg-blue-500/20 text-blue-400" : "bg-blue-100 text-blue-700"
                            : typeColor === "purple"
                            ? darkMode ? "bg-purple-500/20 text-purple-400" : "bg-purple-100 text-purple-700"
                            : typeColor === "green"
                            ? darkMode ? "bg-green-500/20 text-green-400" : "bg-green-100 text-green-700"
                            : typeColor === "pink"
                            ? darkMode ? "bg-pink-500/20 text-pink-400" : "bg-pink-100 text-pink-700"
                            : typeColor === "red"
                            ? darkMode ? "bg-red-500/20 text-red-400" : "bg-red-100 text-red-700"
                            : typeColor === "orange"
                            ? darkMode ? "bg-orange-500/20 text-orange-400" : "bg-orange-100 text-orange-700"
                            : darkMode ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-100 text-emerald-700"
                        }`}>
                          {txn.cause}
                        </span>
                        <span className={`text-xs ${
                          darkMode ? "text-zinc-500" : "text-gray-500"
                        }`}>
                          •
                        </span>
                        <span className={`text-xs ${
                          darkMode ? "text-zinc-400" : "text-gray-600"
                        }`}>
                          {txn.paymentMethod}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs">
                        <Calendar className={`w-3.5 h-3.5 ${
                          darkMode ? "text-zinc-500" : "text-gray-400"
                        }`} />
                        <span className={darkMode ? "text-zinc-500" : "text-gray-500"}>
                          {new Date(txn.date).toLocaleDateString('en-IN', { 
                            day: 'numeric', 
                            month: 'short', 
                            year: 'numeric' 
                          })} • {txn.time}
                        </span>
                        <span className={`text-xs ${
                          darkMode ? "text-zinc-600" : "text-gray-400"
                        }`}>
                          •
                        </span>
                        <span className={`text-xs ${
                          darkMode ? "text-zinc-500" : "text-gray-500"
                        }`}>
                          {txn.id}
                        </span>
                      </div>
                    </div>

                    {/* Amount with Status */}
                    <div className="text-right flex-shrink-0">
                      <p className={`text-xl md:text-2xl font-bold mb-1 ${
                        typeColor === "blue"
                          ? darkMode ? "text-blue-400" : "text-blue-600"
                          : typeColor === "purple"
                          ? darkMode ? "text-purple-400" : "text-purple-600"
                          : typeColor === "green"
                          ? darkMode ? "text-green-400" : "text-green-600"
                          : typeColor === "pink"
                          ? darkMode ? "text-pink-400" : "text-pink-600"
                          : typeColor === "red"
                          ? darkMode ? "text-red-400" : "text-red-600"
                          : typeColor === "orange"
                          ? darkMode ? "text-orange-400" : "text-orange-600"
                          : darkMode ? "text-emerald-400" : "text-emerald-600"
                      }`}>
                        ₹{txn.amount.toLocaleString('en-IN')}
                      </p>
                      <div className="flex items-center justify-end gap-1">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-xs font-medium text-emerald-600 capitalize">
                          {txn.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })
          )}
        </div>
      </div>
    </motion.div>
  )
}