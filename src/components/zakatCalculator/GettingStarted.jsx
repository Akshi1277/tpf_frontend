import { motion } from 'framer-motion';

const GettingStarted = ({ onStart, setActiveModal }) => {
  return (
    <section id='gettingStarted'>
    <motion.div
      key="getting-started"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="max-w-2xl mx-auto"
    >
      <div className={`bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden`}>
        <div className="p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Before You Begin</h2>
          <p className="text-sm text-gray-500 mb-6">Have these ready for an accurate calculation</p>

          <div className="space-y-3 mb-6">
            <button
              onClick={() => setActiveModal('documents')}
              className="w-full flex items-center justify-between p-4 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 transition-colors group text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-emerald-900">Documents to Have Ready</p>
                  <p className="text-xs text-emerald-700">Bank statements, investment records & more</p>
                </div>
              </div>
              <svg className="w-4 h-4 text-emerald-600 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div className="flex items-start gap-3 p-4 rounded-xl border border-blue-200 bg-blue-50">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-blue-900">Your Privacy is Protected</p>
                <p className="text-xs text-blue-700 mt-0.5">Financial information is never stored on our servers. <a href="#" className="underline font-medium">Privacy Policy</a></p>
              </div>
            </div>
          </div>

          <div className="text-center py-4 border-y border-gray-100 mb-6">
            <div className="text-xl mb-1 font-arabic" style={{ color: '#2D7A5C' }}>
              بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ
            </div>
            <p className="text-xs text-gray-400 italic">In the name of Allah, the Most Gracious, the Most Merciful</p>
          </div>

          <button
            onClick={onStart}
            className="w-full py-3 text-sm cursor-pointer font-bold rounded-xl text-white transition-colors"
            style={{ background: 'linear-gradient(135deg, #2D7A5C 0%, #1E5A44 100%)' }}
          >
            Start Calculating Zakat
          </button>
        </div>
      </div>
    </motion.div>
    </section>
  );
};

export default GettingStarted;