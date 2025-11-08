import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Modal } from './SharedComponents';
import { Check, Info, Sparkles, TrendingUp, Calculator } from 'lucide-react';

// ===== MODALS CONTENT =====
const Modals = ({ activeModal, setActiveModal, darkMode = false }) => {
  return (
    <>
      {/* Documents Modal */}
      <Modal
        isOpen={activeModal === 'documents'}
        onClose={() => setActiveModal(null)}
        title="Documents to Have Ready"
        darkMode={darkMode}
      >
        <div className="space-y-6">
          <p className={`text-base leading-relaxed ${
            darkMode ? 'text-zinc-300' : 'text-gray-600'
          }`}>
            Having these documents ready will help you complete the calculation accurately and efficiently.
          </p>
          <div className="space-y-3">
            {[
              { title: 'Bank Statements', desc: 'Recent statements showing all account balances' },
              { title: 'Precious Metals Documentation', desc: 'Invoices or certificates for gold and silver' },
              { title: 'Investment Portfolios', desc: 'Current values of stocks, bonds, and dividends' },
              { title: 'Retirement Accounts', desc: 'Pension and retirement fund statements' }
            ].map((doc, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`flex items-start gap-4 p-5 rounded-xl border ${
                  darkMode
                    ? 'bg-emerald-950/30 border-emerald-800/50'
                    : 'bg-emerald-50 border-emerald-200'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0 ${
                  darkMode
                    ? 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white'
                    : 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white'
                }`}>
                  {idx + 1}
                </div>
                <div>
                  <p className={`font-semibold mb-1 ${darkMode ? 'text-emerald-300' : 'text-emerald-900'}`}>
                    {doc.title}
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-emerald-400/70' : 'text-emerald-800/70'}`}>
                    {doc.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Modal>

      {/* Gold & Silver Modal */}
      <Modal
        isOpen={activeModal === 'goldSilver'}
        onClose={() => setActiveModal(null)}
        title="Calculating Gold & Silver Value"
        darkMode={darkMode}
      >
        <div className="space-y-5">
          <div className={`p-5 rounded-xl border flex items-start gap-3 ${
            darkMode
              ? 'bg-blue-950/20 border-blue-900/30'
              : 'bg-blue-50 border-blue-200'
          }`}>
            <Info className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
              darkMode ? 'text-blue-400' : 'text-blue-600'
            }`} />
            <p className={`text-sm leading-relaxed ${
              darkMode ? 'text-blue-200' : 'text-blue-900'
            }`}>
              For jewelry containing mixed metals and precious stones, consult a professional jeweler.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Steps to Calculate:
            </h4>
            <ol className="space-y-3">
              {[
                'Visit your local jeweler with your jewelry',
                'Request separate weighing of gold and silver components',
                'Obtain current market price per gram',
                'Calculate: Weight (grams) × Price per gram'
              ].map((step, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className={`flex items-center justify-center w-6 h-6 rounded-full text-sm font-bold flex-shrink-0 ${
                    darkMode
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {idx + 1}
                  </span>
                  <span className={darkMode ? 'text-zinc-300' : 'text-gray-700'}>
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Modal>

      {/* Investments Modal */}
      <Modal
        isOpen={activeModal === 'investments'}
        onClose={() => setActiveModal(null)}
        title="Common Investment Types"
        darkMode={darkMode}
      >
        <div className="space-y-5 -mt-1">
          <p className={`text-base ${darkMode ? 'text-zinc-300' : 'text-gray-600'}`}>
            The following investment types are commonly subject to Zakat:
          </p>
          <div className="grid gap-3">
            {[
              { title: 'Equities', desc: 'Stocks, shares, and mutual funds' },
              { title: 'Retirement Accounts', desc: '401(k), IRA, ESA, RRSP, RESP' },
              { title: 'Real Estate', desc: 'Investment properties and REITs' },
              { title: 'Pension Funds', desc: 'Accessible retirement savings' },
              { title: 'Digital Assets', desc: 'Cryptocurrencies and tokens' }
            ].map((inv, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-xl border ${
                  darkMode
                    ? 'bg-zinc-800/50 border-zinc-700'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Check className={`w-5 h-5 ${
                    darkMode ? 'text-emerald-400' : 'text-emerald-600'
                  }`} />
                  <div>
                    <h5 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {inv.title}
                    </h5>
                    <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                      {inv.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* Active vs Passive Modal */}
      <Modal
        isOpen={activeModal === 'activePassive'}
        onClose={() => setActiveModal(null)}
        title="Active vs Passive Investment"
        darkMode={darkMode}
      >
        <div className="space-y-5">
          <div className={`p-5 rounded-xl border ${
            darkMode
              ? 'bg-purple-950/20 border-purple-900/30'
              : 'bg-purple-50 border-purple-200'
          }`}>
            <h4 className={`font-semibold mb-2 ${
              darkMode ? 'text-purple-300' : 'text-purple-900'
            }`}>
              Active Investor
            </h4>
            <p className={`text-sm leading-relaxed ${
              darkMode ? 'text-purple-200/80' : 'text-purple-800/80'
            }`}>
              If you actively trade stocks as a swing trader or day trader, buying and selling frequently to profit from market movements.
            </p>
          </div>

          <div className={`p-5 rounded-xl border ${
            darkMode
              ? 'bg-blue-950/20 border-blue-900/30'
              : 'bg-blue-50 border-blue-200'
          }`}>
            <h4 className={`font-semibold mb-2 ${
              darkMode ? 'text-blue-300' : 'text-blue-900'
            }`}>
              Passive Investor
            </h4>
            <p className={`text-sm leading-relaxed ${
              darkMode ? 'text-blue-200/80' : 'text-blue-800/80'
            }`}>
              If you buy and hold stocks for long-term growth, typically not trading frequently.
            </p>
          </div>
        </div>
      </Modal>

      {/* Passive Calculation Modal */}
      <Modal
        isOpen={activeModal === 'passiveCalc'}
        onClose={() => setActiveModal(null)}
        title="Passive Investment Calculation"
        darkMode={darkMode}
      >
        <div className="space-y-5">
          <p className={`text-base leading-relaxed ${
            darkMode ? 'text-zinc-300' : 'text-gray-700'
          }`}>
            Only the zakatable assets within shares are liable for Zakat. Scholars have allowed approximating this to <strong className={darkMode ? 'text-emerald-400' : 'text-emerald-600'}>30% of market value</strong>.
          </p>

          <div className={`p-6 rounded-xl border ${
            darkMode
              ? 'bg-gradient-to-br from-emerald-950/30 to-teal-950/20 border-emerald-800/50'
              : 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200'
          }`}>
            <div className="flex items-start gap-3 mb-4">
              <Calculator className={`w-5 h-5 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
              <h5 className={`font-semibold ${darkMode ? 'text-emerald-300' : 'text-emerald-900'}`}>
                Example Calculation
              </h5>
            </div>
            <div className={`space-y-2 text-sm ${darkMode ? 'text-emerald-200/90' : 'text-emerald-900/90'}`}>
              <p>Portfolio value at Costco (COST): <strong>$5,000</strong></p>
              <p className="font-mono">$5,000 × 30% = <strong className="text-lg">$1,500</strong></p>
              <p className="pt-2 border-t border-emerald-700/30">
                Zakatable assets: <strong>$1,500</strong>
              </p>
            </div>
          </div>

          <p className={`text-sm italic ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
            Simply enter your total stock value—we'll calculate the zakatable amount automatically.
          </p>
        </div>
      </Modal>

      {/* Crypto Modal */}
      <Modal
        isOpen={activeModal === 'crypto'}
        onClose={() => setActiveModal(null)}
        title="Cryptocurrency Zakat"
        darkMode={darkMode}
      >
        <div className="space-y-5">
          <div className={`p-5 rounded-xl border flex items-start gap-3 ${
            darkMode
              ? 'bg-purple-950/20 border-purple-900/30'
              : 'bg-purple-50 border-purple-200'
          }`}>
            <Sparkles className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
              darkMode ? 'text-purple-400' : 'text-purple-600'
            }`} />
            <div>
              <p className={`text-sm leading-relaxed ${
                darkMode ? 'text-purple-200' : 'text-purple-900'
              }`}>
                Zakat is payable on the <strong>current market value</strong> of all cryptocurrency holdings.
              </p>
            </div>
          </div>

          <p className={`text-sm ${darkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
            This applies to all digital assets including:
          </p>

          <ul className="space-y-2">
            {['Exchangeable coins (Bitcoin, Ethereum, etc.)', 'Utility tokens', 'Work tokens', 'NFTs held as investments'].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <Check className={`w-4 h-4 mt-1 flex-shrink-0 ${
                  darkMode ? 'text-emerald-400' : 'text-emerald-600'
                }`} />
                <span className={`text-sm ${darkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Modal>

      {/* Pension Modal */}
      <Modal
        isOpen={activeModal === 'pension'}
        onClose={() => setActiveModal(null)}
        title="Pension & Retirement Savings"
        darkMode={darkMode}
      >
        <div className="space-y-5">
          <div className={`p-5 rounded-xl border ${
            darkMode
              ? 'bg-orange-950/20 border-orange-900/30'
              : 'bg-orange-50 border-orange-200'
          }`}>
            <p className={`font-semibold mb-2 text-lg ${
              darkMode ? 'text-orange-300' : 'text-orange-900'
            }`}>
              Simple Rule
            </p>
            <p className={`text-sm ${
              darkMode ? 'text-orange-200/80' : 'text-orange-800/80'
            }`}>
              If you have access to withdraw or control the funds, Zakat is due on them.
            </p>
          </div>

          <div className="space-y-4">
            <p className={`text-sm ${darkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
              Only zakatable assets are liable. Scholars allow approximating this to <strong>30% of market value</strong>.
            </p>

            <div className={`p-5 rounded-xl border ${
              darkMode
                ? 'bg-blue-950/20 border-blue-900/30'
                : 'bg-blue-50 border-blue-200'
            }`}>
              <p className={`text-sm font-medium ${
                darkMode ? 'text-blue-300' : 'text-blue-900'
              }`}>
                No Current Access?
              </p>
              <p className={`text-sm mt-2 ${
                darkMode ? 'text-blue-200/80' : 'text-blue-800/80'
              }`}>
                If you cannot withdraw or control the funds, pay Zakat only when they mature and become accessible.
              </p>
            </div>
          </div>
        </div>
      </Modal>

      {/* Other Assets Modal */}
      <Modal
        isOpen={activeModal === 'otherAssets'}
        onClose={() => setActiveModal(null)}
        title="Other Asset Examples"
        darkMode={darkMode}
      >
        <div className="space-y-5">
          <p className={`text-base ${darkMode ? 'text-zinc-300' : 'text-gray-600'}`}>
            Additional assets that may be subject to Zakat:
          </p>
          <div className="grid gap-3">
            {[
              { title: 'Business Inventory', desc: 'Goods and materials held for sale' },
              { title: 'International Accounts', desc: 'Foreign bank accounts and holdings' },
              { title: 'Agricultural Assets', desc: 'Livestock and food crops' },
              { title: 'Trade Receivables', desc: 'Outstanding payments from business' }
            ].map((asset, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border ${
                  darkMode
                    ? 'bg-zinc-800/50 border-zinc-700'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    darkMode
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {idx + 1}
                  </div>
                  <div>
                    <h5 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {asset.title}
                    </h5>
                    <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                      {asset.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* Immediately Payable Modal */}
      <Modal
        isOpen={activeModal === 'immediatelyPayable'}
        onClose={() => setActiveModal(null)}
        title="Immediately Payable Expenses"
        darkMode={darkMode}
      >
        <div className="space-y-5">
          <p className={`text-base ${darkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
            <strong>Immediately due</strong> refers to your next scheduled payment, not annual totals.
          </p>

          <div className={`p-6 rounded-xl border ${
            darkMode
              ? 'bg-gradient-to-br from-emerald-950/30 to-teal-950/20 border-emerald-800/50'
              : 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200'
          }`}>
            <div className="flex items-start gap-3 mb-3">
              <Info className={`w-5 h-5 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
              <h5 className={`font-semibold ${darkMode ? 'text-emerald-300' : 'text-emerald-900'}`}>
                Example
              </h5>
            </div>
            <p className={`text-sm ${darkMode ? 'text-emerald-200/90' : 'text-emerald-900/90'}`}>
              If you pay car insurance monthly, deduct only one month's payment—not the annual premium.
            </p>
          </div>
        </div>
      </Modal>

      {/* Common Expenses Modal */}
      <Modal
        isOpen={activeModal === 'commonExpenses'}
        onClose={() => setActiveModal(null)}
        title="Common Deductible Expenses"
        darkMode={darkMode}
      >
        <div className="space-y-5">
          <p className={`text-base ${darkMode ? 'text-zinc-300' : 'text-gray-600'}`}>
            Typical upcoming expenses you may deduct:
          </p>
          <div className="grid gap-3">
            {[
              { title: 'Housing Costs', desc: 'Next rent or mortgage payment', icon: '🏠' },
              { title: 'Insurance Premiums', desc: 'Upcoming home, auto, and medical insurance', icon: '🛡️' },
              { title: 'Utility Bills', desc: 'Next energy, water, and internet bills', icon: '💡' },
              { title: 'Transportation', desc: 'Upcoming car payments and fuel costs', icon: '🚗' }
            ].map((expense, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-xl border ${
                  darkMode
                    ? 'bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800 transition-colors'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100 transition-colors'
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{expense.icon}</span>
                  <div>
                    <h5 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {expense.title}
                    </h5>
                    <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                      {expense.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={`p-4 rounded-xl border ${
            darkMode
              ? 'bg-blue-950/20 border-blue-900/30'
              : 'bg-blue-50 border-blue-200'
          }`}>
            <p className={`text-sm italic ${
              darkMode ? 'text-blue-200' : 'text-blue-900'
            }`}>
              Remember: Only deduct your next upcoming payment, not annual amounts.
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Modals;