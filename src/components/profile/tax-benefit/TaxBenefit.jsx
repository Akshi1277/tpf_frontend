"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { 
  Download,
  FileText,
  Calendar,
  IndianRupee,
  CheckCircle2,
  Clock,
  XCircle,
  Filter,
  Search,
  Receipt,
  TrendingUp
} from "lucide-react"

export default function TaxBenefitPage({ darkModeFromParent }) {
  const [darkMode, setDarkMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [showDownloadSuccess, setShowDownloadSuccess] = useState(false)

  // Sync with parent dark mode
  useEffect(() => {
    if (darkModeFromParent !== undefined) {
      setDarkMode(darkModeFromParent)
    }
  }, [darkModeFromParent])

  // Mock data - replace with actual API data
  const [taxBenefits] = useState([
    {
      id: "TB001",
      campaignName: "Education for Underprivileged Children",
      campaignId: "CAMP2024001",
      donationAmount: 5000,
      donationDate: "2024-10-15",
      status: "approved",
      receiptNumber: "REC-2024-001",
      financialYear: "2024-25"
    },
    {
      id: "TB002",
      campaignName: "Medical Aid for Cancer Patients",
      campaignId: "CAMP2024002",
      donationAmount: 10000,
      donationDate: "2024-09-20",
      status: "approved",
      receiptNumber: "REC-2024-002",
      financialYear: "2024-25"
    },
    {
      id: "TB003",
      campaignName: "Clean Water Initiative",
      campaignId: "CAMP2024003",
      donationAmount: 3000,
      donationDate: "2024-11-05",
      status: "pending",
      receiptNumber: null,
      financialYear: "2024-25"
    },
    {
      id: "TB004",
      campaignName: "Disaster Relief Fund",
      campaignId: "CAMP2024004",
      donationAmount: 7500,
      donationDate: "2024-08-12",
      status: "approved",
      receiptNumber: "REC-2024-003",
      financialYear: "2024-25"
    }
  ])

  const handleDownloadReceipt = (benefit) => {
    // Add your download logic here
    console.log("Downloading receipt for:", benefit)
    setShowDownloadSuccess(true)
    setTimeout(() => setShowDownloadSuccess(false), 3000)
  }

  const filteredBenefits = taxBenefits.filter(benefit => {
    const matchesSearch = benefit.campaignName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         benefit.campaignId.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === "all" || benefit.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const totalDonations = taxBenefits.reduce((sum, b) => sum + b.donationAmount, 0)
  const approvedDonations = taxBenefits.filter(b => b.status === "approved").reduce((sum, b) => sum + b.donationAmount, 0)
  const pendingCount = taxBenefits.filter(b => b.status === "pending").length

  const getStatusConfig = (status) => {
    switch(status) {
      case "approved":
        return {
          icon: CheckCircle2,
          text: "Approved",
          color: darkMode ? "text-emerald-400" : "text-emerald-600",
          bgColor: darkMode ? "bg-emerald-950/30" : "bg-emerald-50",
          borderColor: darkMode ? "border-emerald-600/50" : "border-emerald-200"
        }
      case "pending":
        return {
          icon: Clock,
          text: "Pending",
          color: darkMode ? "text-yellow-400" : "text-yellow-600",
          bgColor: darkMode ? "bg-yellow-950/30" : "bg-yellow-50",
          borderColor: darkMode ? "border-yellow-600/50" : "border-yellow-200"
        }
      case "rejected":
        return {
          icon: XCircle,
          text: "Rejected",
          color: darkMode ? "text-red-400" : "text-red-600",
          bgColor: darkMode ? "bg-red-950/30" : "bg-red-50",
          borderColor: darkMode ? "border-red-600/50" : "border-red-200"
        }
      default:
        return {
          icon: Clock,
          text: "Unknown",
          color: darkMode ? "text-zinc-400" : "text-gray-600",
          bgColor: darkMode ? "bg-zinc-800/30" : "bg-gray-50",
          borderColor: darkMode ? "border-zinc-700" : "border-gray-200"
        }
    }
  }

  return (
    <div className="min-h-screen">
      {/* Download Success Toast */}
      <AnimatePresence>
        {showDownloadSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`fixed top-4 right-4 sm:top-6 sm:right-6 z-50 px-4 sm:px-6 py-3 sm:py-4 rounded-2xl shadow-2xl flex items-center gap-3 ${
              darkMode
                ? "bg-zinc-900 border border-emerald-500/20"
                : "bg-white border border-emerald-200"
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
              <Download className="w-5 h-5 text-white" strokeWidth={3} />
            </div>
            <div>
              <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                Receipt Downloaded!
              </p>
              <p className={`text-sm ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                Your tax receipt is ready
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] ${
          darkMode ? "bg-emerald-950/20" : "bg-emerald-50"
        }`} />
        <div className={`absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[100px] ${
          darkMode ? "bg-teal-950/20" : "bg-teal-50"
        }`} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-12">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            
           
          </div>
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-3 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Your Tax Receipts
          </h1>
          <p className={`text-base sm:text-lg ${
            darkMode ? 'text-zinc-400' : 'text-gray-600'
          }`}>
            Download receipts for your charitable donations under Section 80G
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8"
        >
          <div className={`rounded-2xl p-6 border ${
            darkMode 
              ? "bg-zinc-900/50 backdrop-blur-xl border-zinc-800" 
              : "bg-white backdrop-blur-xl border-gray-200 shadow-lg"
          }`}>
            <div className="flex items-start justify-between">
              <div>
                <p className={`text-sm font-medium mb-2 ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                  Total Donations
                </p>
                <p className={`text-2xl sm:text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                  ₹{totalDonations.toLocaleString('en-IN')}
                </p>
              </div>
              <div className={`p-3 rounded-xl ${darkMode ? "bg-emerald-500/20" : "bg-emerald-100"}`}>
                <IndianRupee className={`w-6 h-6 ${darkMode ? "text-emerald-400" : "text-emerald-600"}`} />
              </div>
            </div>
          </div>

          <div className={`rounded-2xl p-6 border ${
            darkMode 
              ? "bg-zinc-900/50 backdrop-blur-xl border-zinc-800" 
              : "bg-white backdrop-blur-xl border-gray-200 shadow-lg"
          }`}>
            <div className="flex items-start justify-between">
              <div>
                <p className={`text-sm font-medium mb-2 ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                  Approved for Tax Benefit
                </p>
                <p className={`text-2xl sm:text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                  ₹{approvedDonations.toLocaleString('en-IN')}
                </p>
              </div>
              <div className={`p-3 rounded-xl ${darkMode ? "bg-teal-500/20" : "bg-teal-100"}`}>
                <TrendingUp className={`w-6 h-6 ${darkMode ? "text-teal-400" : "text-teal-600"}`} />
              </div>
            </div>
          </div>

          <div className={`rounded-2xl p-6 border ${
            darkMode 
              ? "bg-zinc-900/50 backdrop-blur-xl border-zinc-800" 
              : "bg-white backdrop-blur-xl border-gray-200 shadow-lg"
          }`}>
            <div className="flex items-start justify-between">
              <div>
                <p className={`text-sm font-medium mb-2 ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                  Pending Requests
                </p>
                <p className={`text-2xl sm:text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {pendingCount}
                </p>
              </div>
              <div className={`p-3 rounded-xl ${darkMode ? "bg-yellow-500/20" : "bg-yellow-100"}`}>
                <Clock className={`w-6 h-6 ${darkMode ? "text-yellow-400" : "text-yellow-600"}`} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`rounded-2xl p-4 sm:p-6 mb-6 border ${
            darkMode 
              ? "bg-zinc-900/50 backdrop-blur-xl border-zinc-800" 
              : "bg-white backdrop-blur-xl border-gray-200 shadow-lg"
          }`}
        >
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                darkMode ? "text-zinc-500" : "text-gray-400"
              }`} />
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 outline-none transition-all ${
                  darkMode
                    ? "bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500 focus:border-emerald-500"
                    : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                }`}
              />
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2">
              <Filter className={`w-5 h-5 ${darkMode ? "text-zinc-400" : "text-gray-600"}`} />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className={`px-4 py-3 rounded-xl border-2 outline-none transition-all ${
                  darkMode
                    ? "bg-zinc-800/50 border-zinc-700 text-white focus:border-emerald-500"
                    : "bg-white border-gray-200 text-gray-900 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                }`}
              >
                <option value="all">All Status</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Tax Benefits List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-4"
        >
          {filteredBenefits.length === 0 ? (
            <div className={`rounded-2xl p-12 text-center border ${
              darkMode 
                ? "bg-zinc-900/50 backdrop-blur-xl border-zinc-800" 
                : "bg-white backdrop-blur-xl border-gray-200 shadow-lg"
            }`}>
              <Receipt className={`w-16 h-16 mx-auto mb-4 ${darkMode ? "text-zinc-600" : "text-gray-400"}`} />
              <p className={`text-lg font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                No tax benefits found
              </p>
              <p className={`text-sm ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            filteredBenefits.map((benefit, index) => {
              const statusConfig = getStatusConfig(benefit.status)
              const StatusIcon = statusConfig.icon

              return (
                <motion.div
                  key={benefit.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`rounded-2xl p-4 sm:p-6 border hover:shadow-xl transition-all ${
                    darkMode 
                      ? "bg-zinc-900/50 backdrop-blur-xl border-zinc-800 hover:border-zinc-700" 
                      : "bg-white backdrop-blur-xl border-gray-200 shadow-lg hover:border-emerald-200"
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Left Section */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className={`text-lg font-bold mb-1 ${darkMode ? "text-white" : "text-gray-900"}`}>
                            {benefit.campaignName}
                          </h3>
                          <p className={`text-sm ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                            Campaign ID: {benefit.campaignId}
                          </p>
                        </div>
                        <div className={`px-3 py-1.5 rounded-lg border flex items-center gap-2 ${statusConfig.bgColor} ${statusConfig.borderColor}`}>
                          <StatusIcon className={`w-4 h-4 ${statusConfig.color}`} />
                          <span className={`text-sm font-semibold ${statusConfig.color}`}>
                            {statusConfig.text}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="flex items-center gap-2">
                          <IndianRupee className={`w-4 h-4 ${darkMode ? "text-zinc-500" : "text-gray-500"}`} />
                          <div>
                            <p className={`text-xs ${darkMode ? "text-zinc-500" : "text-gray-500"}`}>
                              Donation Amount
                            </p>
                            <p className={`text-sm font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                              ₹{benefit.donationAmount.toLocaleString('en-IN')}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Calendar className={`w-4 h-4 ${darkMode ? "text-zinc-500" : "text-gray-500"}`} />
                          <div>
                            <p className={`text-xs ${darkMode ? "text-zinc-500" : "text-gray-500"}`}>
                              Donation Date
                            </p>
                            <p className={`text-sm font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                              {new Date(benefit.donationDate).toLocaleDateString('en-IN', { 
                                day: 'numeric', 
                                month: 'short', 
                                year: 'numeric' 
                              })}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <FileText className={`w-4 h-4 ${darkMode ? "text-zinc-500" : "text-gray-500"}`} />
                          <div>
                            <p className={`text-xs ${darkMode ? "text-zinc-500" : "text-gray-500"}`}>
                              Financial Year
                            </p>
                            <p className={`text-sm font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                              {benefit.financialYear}
                            </p>
                          </div>
                        </div>
                      </div>

                      {benefit.receiptNumber && (
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${
                          darkMode ? "bg-zinc-800/50" : "bg-gray-100"
                        }`}>
                          <Receipt className={`w-4 h-4 ${darkMode ? "text-zinc-400" : "text-gray-600"}`} />
                          <span className={`text-sm font-medium ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                            Receipt: {benefit.receiptNumber}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Right Section - Download Button */}
                    {benefit.status === "approved" && (
                      <button
                        onClick={() => handleDownloadReceipt(benefit)}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold transition-all shadow-lg flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                      >
                        <Download className="w-5 h-5" />
                        Download Receipt
                      </button>
                    )}

                    {benefit.status === "pending" && (
                      <div className={`px-6 py-3 rounded-xl border-2 border-dashed flex items-center justify-center gap-2 ${
                        darkMode ? "border-zinc-700 text-zinc-400" : "border-gray-300 text-gray-500"
                      }`}>
                        <Clock className="w-5 h-5" />
                        <span className="font-medium">Under Review</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })
          )}
        </motion.div>

        {/* Info Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`mt-8 p-4 sm:p-6 rounded-2xl border ${
            darkMode
              ? "bg-blue-950/20 border-blue-900/30"
              : "bg-blue-50 border-blue-200"
          }`}
        >
          <p className={`text-sm ${darkMode ? "text-blue-300" : "text-blue-900"}`}>
            <strong>Note:</strong> These receipts are valid for claiming tax deductions under Section 80G of the Income Tax Act. 
            Please consult with your tax advisor for proper filing. Receipts are generated within 7-10 business days after donation approval.
          </p>
        </motion.div>
      </div>
    </div>
  )
}