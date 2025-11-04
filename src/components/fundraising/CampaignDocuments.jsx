import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

export default function CampaignDocuments({ darkMode }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`p-8 rounded-2xl ${darkMode ? 'bg-zinc-800' : 'bg-white'}`}
      >
        <h3 className={`text-xl md:text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
          Campaign Documents
        </h3>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center">
              <FileText className="w-8 h-8 text-emerald-600" />
            </div>
            <div>
              <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Project Proposal</h4>
              <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Last updated 2 days ago</p>
            </div>
          </div>

          <button
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-2 rounded-lg font-medium transition-colors"
            data-testid="button-view-documents"
          >
            View Documents
          </button>
        </div>
      </motion.div>
    </div>
  );
}