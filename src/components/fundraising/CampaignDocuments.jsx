"use client"

import { motion } from "framer-motion"
import { FileText, Lock } from "lucide-react"

export default function CampaignDocuments({ darkMode }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`p-8 rounded-2xl ${darkMode ? "bg-zinc-800" : "bg-white"}`}
      >
        <h3 className={`text-xl md:text-2xl font-bold mb-6 ${darkMode ? "text-white" : "text-zinc-900"}`}>
          Campaign Documents
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Document Card 1 */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`relative p-6 rounded-xl overflow-hidden ${darkMode ? "bg-zinc-700" : "bg-gray-100"}`}
          >
            <div className="blur-sm opacity-60">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h4 className={`font-semibold ${darkMode ? "text-white" : "text-zinc-900"}`}>Financial Report Q4</h4>
                  <p className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>Updated 1 week ago</p>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <Lock className="w-8 h-8 text-emerald-600" />
                <span className={`text-xs font-medium ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                  Private Document
                </span>
              </div>
            </div>
          </motion.div>

          {/* Document Card 2 */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`relative p-6 rounded-xl overflow-hidden ${darkMode ? "bg-zinc-700" : "bg-gray-100"}`}
          >
            <div className="blur-sm opacity-60">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h4 className={`font-semibold ${darkMode ? "text-white" : "text-zinc-900"}`}>Project Proposal</h4>
                  <p className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>Last updated 2 days ago</p>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <Lock className="w-8 h-8 text-emerald-600" />
                <span className={`text-xs font-medium ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                  Private Document
                </span>
              </div>
            </div>
          </motion.div>

          {/* <motion.div
            whileHover={{ scale: 1.02 }}
            className={`relative p-6 rounded-xl overflow-hidden ${darkMode ? "bg-zinc-700" : "bg-gray-100"}`}
          >
            <div className="blur-sm opacity-60">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h4 className={`font-semibold ${darkMode ? "text-white" : "text-zinc-900"}`}>Budget Allocation</h4>
                  <p className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>Last updated 5 days ago</p>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <Lock className="w-8 h-8 text-emerald-600" />
                <span className={`text-xs font-medium ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                  Private Document
                </span>
              </div>
            </div>
          </motion.div> */}

          {/* <motion.div
            whileHover={{ scale: 1.02 }}
            className={`relative p-6 rounded-xl overflow-hidden ${darkMode ? "bg-zinc-700" : "bg-gray-100"}`}
          >
            <div className="blur-sm opacity-60">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h4 className={`font-semibold ${darkMode ? "text-white" : "text-zinc-900"}`}>Impact Report 2024</h4>
                  <p className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>Last updated 3 days ago</p>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <Lock className="w-8 h-8 text-emerald-600" />
                <span className={`text-xs font-medium ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                  Private Document
                </span>
              </div>
            </div>
          </motion.div> */}
        </div>

        <button
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-2 rounded-lg font-medium transition-colors"
          data-testid="button-view-documents"
        >
          View Documents
        </button>
      </motion.div>
    </div>
  )
}
