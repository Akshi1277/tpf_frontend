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
            Having these ready will help you fill in the form without having to guess any numbers.
          </p>
          <div className="space-y-3">
            {[
              { title: 'Bank Statements', desc: 'Recent statements showing all account balances' },
              { title: 'Gold & Silver Records', desc: 'Any receipts, certificates, or notes about your gold and silver' },
              { title: 'Investment Records', desc: 'Current value of your shares, funds, or any other investments' },
              { title: 'Pension Statements', desc: 'How much is in your pension or retirement savings' }
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
              If your jewellery is mixed with other metals or has gems in it, a jeweller can help you find out the gold or silver content.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              How to find your gold/silver value:
            </h4>
            <ol className="space-y-3">
              {[
                'Take your gold or silver to a local jeweller',
                'Ask them to weigh each item separately',
                'Find out the current price per gram (you can search online)',
                'Multiply the weight by the price per gram to get the value'
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
            These are the most common types of investments that Zakat applies to:
          </p>
          <div className="grid gap-3">
            {[
              { title: 'Shares & Funds', desc: 'Any shares you own in companies or investment funds' },
              { title: 'Retirement Savings', desc: 'EPF, NPS, 401(k), IRA, or similar accounts' },
              { title: 'Property', desc: 'Property you bought to sell or rent out (not your home)' },
              { title: 'Pension', desc: 'Retirement savings you can currently access' },
              { title: 'Cryptocurrency', desc: 'Bitcoin, Ethereum, and other digital coins or tokens' }
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
              You regularly buy and sell shares to make quick profits — for example, trading daily or weekly.
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
              You buy shares and keep them for a long time — you don't trade often and are focused on long-term growth.
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
            Not all of your shares' value is subject to Zakat — only the zakatable portion. Scholars allow using <strong className={darkMode ? 'text-emerald-400' : 'text-emerald-600'}>30% of market value</strong>.
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
              Easy to Understand
            </p>
            <p className={`text-sm ${
              darkMode ? 'text-orange-200/80' : 'text-orange-800/80'
            }`}>
              If you can take money out of your pension right now, Zakat applies to it.
            </p>
          </div>

          <div className="space-y-4">
            <p className={`text-sm ${darkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
              Not everything in your pension is subject to Zakat. Scholars say you can use <strong>30% of the total value</strong> as a simple estimate.
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
                If you can't take the money out yet, you don't need to pay Zakat on it now. Pay when you can actually access it.
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
            Other things you might own that could be subject to Zakat:
          </p>
          <div className="grid gap-3">
            {[
              { title: 'Business Stock', desc: 'Products or materials your business holds for sale' },
              { title: 'Overseas Bank Accounts', desc: 'Money you have in bank accounts in other countries' },
              { title: 'Money Owed by Clients', desc: 'Payments your business is waiting to receive' },
              { title: 'Valuable Collections', desc: 'Collectibles or items of significant value held as investments' }
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
            This means only include the <strong>next payment you owe</strong> — not the total for the whole year.
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
              If you pay car insurance every month, only enter one month's amount — not the full year's premium.
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
            Here are some common bills and payments you can subtract from your wealth:
          </p>
          <div className="grid gap-3">
            {[
              { title: 'Rent / Mortgage', desc: 'Your next rent or home loan payment', icon: '🏠' },
              { title: 'Insurance', desc: 'Your next home, car, or health insurance payment', icon: '🛡️' },
              { title: 'Utility Bills', desc: 'Next electricity, water, or internet bill', icon: '💡' },
              { title: 'Car Payment', desc: 'Your next car loan or lease payment', icon: '🚗' }
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
              Tip: Always enter the next payment due — not the full year's total.
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Modals;