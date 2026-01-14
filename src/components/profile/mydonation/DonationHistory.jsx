"use client"

import { motion } from "framer-motion"
import {
  Target,
  Wallet,
  Calendar,
  CheckCircle,
  ArrowRight
} from "lucide-react"

export default function RecentTransactions({
  darkMode,
  transactions
}) {
  const getTypeColor = (txnColor) => {
    return txnColor || "emerald"
  }

  // Show only the 6 most recent transactions
  const recentTransactions = transactions.slice(0, 6)

  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return {
          icon: "text-emerald-500",
          text: darkMode ? "text-emerald-400" : "text-emerald-600",
        }
      case "rejected":
        return {
          icon: "text-red-500",
          text: darkMode ? "text-red-400" : "text-red-600",
        }
      case "pending":
        return {
          icon: "text-yellow-500",
          text: darkMode ? "text-yellow-400" : "text-yellow-600",
        }
      default:
        return {
          icon: "text-zinc-500",
          text: darkMode ? "text-zinc-400" : "text-zinc-600",
        }
    }
  }


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.9 }}
      className="mb-8"
    >
      <div className={`rounded-2xl border overflow-hidden ${darkMode
        ? "bg-zinc-800/50 border-zinc-700"
        : "bg-white border-gray-200 shadow-lg"
        }`}>
        <div className={`p-4 sm:p-6 border-b ${darkMode ? "border-zinc-700" : "border-gray-200"
          }`}>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${darkMode ? "bg-blue-500/20" : "bg-blue-100"
                }`}>
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <div className="min-w-0">
                <h2 className={`text-xl sm:text-2xl font-bold truncate ${darkMode ? "text-white" : "text-gray-900"
                  }`}>
                  Recent Transactions
                </h2>
                <p className={`text-xs sm:text-sm ${darkMode ? "text-zinc-400" : "text-gray-600"
                  }`}>
                  Your latest contributions
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction List */}
        <div className={`divide-y ${darkMode ? "divide-zinc-800" : "divide-zinc-100"}`}>
          {recentTransactions.length === 0 ? (
            <div className="p-8 sm:p-12 text-center">
              <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${darkMode ? "bg-zinc-700" : "bg-gray-100"
                }`}>
                <Wallet className={`w-8 h-8 ${darkMode ? "text-zinc-500" : "text-gray-400"
                  }`} />
              </div>
              <p className={`text-base sm:text-lg font-medium mb-1 ${darkMode ? "text-white" : "text-gray-900"
                }`}>
                No donations yet
              </p>
              <p className={`text-sm ${darkMode ? "text-zinc-400" : "text-gray-600"
                }`}>
                Your donation history will appear here
              </p>
            </div>
          ) : (
            <>
              {recentTransactions.map((txn, index) => {
                const typeColor = getTypeColor(txn.color)
                const statusStyle = getStatusStyles(txn.status)

                return (
                  <motion.div
                    key={txn.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`p-3 sm:p-4 md:p-5 transition-all relative overflow-hidden group ${darkMode ? "hover:bg-zinc-700/30" : "hover:bg-gray-50"
                      }`}
                  >
                    {/* Colorful gradient background on hover */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${typeColor === "blue" ? "bg-gradient-to-r from-blue-500/5 to-transparent" :
                      typeColor === "purple" ? "bg-gradient-to-r from-purple-500/5 to-transparent" :
                        typeColor === "green" ? "bg-gradient-to-r from-green-500/5 to-transparent" :
                          typeColor === "pink" ? "bg-gradient-to-r from-pink-500/5 to-transparent" :
                            typeColor === "red" ? "bg-gradient-to-r from-red-500/5 to-transparent" :
                              typeColor === "orange" ? "bg-gradient-to-r from-orange-500/5 to-transparent" :
                                "bg-gradient-to-r from-emerald-500/5 to-transparent"
                      }`} />

                    <div className="flex items-start sm:items-center gap-3 sm:gap-4 relative z-10">
                      {/* Colorful Icon */}
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110 ${typeColor === "blue"
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
                        <Wallet className={`w-6 h-6 sm:w-7 sm:h-7 ${typeColor === "blue" ? "text-blue-600" :
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
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className={`font-semibold text-sm sm:text-base truncate ${darkMode ? "text-white" : "text-gray-900"
                            }`}>
                            {txn.recipient}
                          </h3>
                        </div>

                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium truncate max-w-[150px] sm:max-w-none ${typeColor === "blue"
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
                          <span className={`text-xs hidden sm:inline ${darkMode ? "text-zinc-500" : "text-gray-500"
                            }`}>
                            •
                          </span>
                          <span className={`text-xs truncate ${darkMode ? "text-zinc-400" : "text-gray-600"
                            }`}>
                            {txn.paymentMethod}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 sm:gap-2 text-xs">
                          <Calendar className={`w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0 ${darkMode ? "text-zinc-500" : "text-gray-400"
                            }`} />
                          <span className={`truncate ${darkMode ? "text-zinc-500" : "text-gray-500"}`}>
                            {new Date(txn.date).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                          <span className={`text-xs hidden sm:inline ${darkMode ? "text-zinc-600" : "text-gray-400"
                            }`}>
                            •
                          </span>
                          <span className={`text-xs truncate hidden sm:inline ${darkMode ? "text-zinc-500" : "text-gray-500"
                            }`}>
                            {txn.id}
                          </span>
                        </div>
                      </div>

                      {/* Amount with Status */}
                      <div className="text-right flex-shrink-0">
                        <p className={`text-lg sm:text-xl md:text-2xl font-bold mb-0.5 sm:mb-1 ${typeColor === "blue"
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
                        <div className="flex flex-col items-end gap-0.5">
                          {/* Status line */}
                          <div className="flex items-center gap-1">
                            <CheckCircle
                              className={`w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0 ${statusStyle.icon}`}
                            />
                            <span className={`text-xs font-medium capitalize ${statusStyle.text}`}>
                              {txn.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}

              {/* More Button */}
              {transactions.length > 6 && (
                <div className="p-4 sm:p-6">
                  <a
                    href="/profile/downloads"
                    className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${darkMode
                      ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border-2 border-blue-500/50"
                      : "bg-blue-500 text-white hover:bg-blue-600 border-2 border-blue-600"
                      }`}
                  >
                    View All Transactions
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}