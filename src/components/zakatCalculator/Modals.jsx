
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Modal } from './SharedComponents';
// ===== MODALS CONTENT =====
const Modals = ({ activeModal, setActiveModal }) => {
  return (
    <>
      <Modal
        isOpen={activeModal === 'documents'}
        onClose={() => setActiveModal(null)}
        title="Documents to Have Ready"
      >
        <div className="space-y-4">
          <p className="text-gray-600 mb-6">Here's a list of documents that would be good to have on hand. You may need them as you fill out this calculator.</p>
          <div className="space-y-3">
            {['Bank statements', 'Jeweler invoices', 'Stocks & dividends', 'Retirement accounts'].map((doc, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  {idx + 1}
                </div>
                <span className="text-gray-800 font-medium">{doc}</span>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === 'goldSilver'}
        onClose={() => setActiveModal(null)}
        title="How to Calculate Gold & Silver"
      >
        <p className="text-gray-700 leading-relaxed">
          If you own jewelry with gold or silver mixed with other metals and precious stones, go to your local jeweler and ask them to weigh your gold and silver from the jewelry.
        </p>
      </Modal>

      <Modal
        isOpen={activeModal === 'investments'}
        onClose={() => setActiveModal(null)}
        title="Example Investments"
      >
        <div className="space-y-4">
          <p className="text-gray-600 mb-4">You may be familiar with the following types of investments:</p>
          <ul className="space-y-2">
            {['Stocks/shares', '401k/IRA/ESA', 'RRSP/RESP', 'Real Estate investments', 'Retirement funds'].map((inv, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <span className="text-gray-700">{inv}</span>
              </li>
            ))}
          </ul>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === 'activePassive'}
        onClose={() => setActiveModal(null)}
        title="Active vs Passive Investment"
      >
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>If you own stocks, you may be actively trading in the market as a swing or day trader. If that describes you, you are an <strong>active investor</strong>.</p>
          <p>If you are buying and holding stock, then you are a <strong>passive investor</strong>.</p>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === 'passiveCalc'}
        onClose={() => setActiveModal(null)}
        title="Passive Investment Calculation"
      >
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>Only the zakatable assets of the shares are liable for Zakat. Scholars, including Sh. Joe Bradford, have allowed approximating this number to <strong>30% of the market value</strong> of your stocks.</p>
          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 my-4">
            <p className="font-medium text-emerald-900 mb-2">Example:</p>
            <p>If the value of your portfolio at Costco Wholesale Corp. (COST) is $5,000:</p>
            <p className="mt-2">$5,000 × 30% = <strong>$1,500</strong></p>
            <p className="mt-2 text-sm">Your zakatable assets for your Costco portfolio are $1,500.</p>
          </div>
          <p className="text-sm italic">Please enter the total value of your stock, and we will handle all the calculations.</p>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === 'crypto'}
        onClose={() => setActiveModal(null)}
        title="Cryptocurrency Zakat"
      >
        <p className="text-gray-700 leading-relaxed">
          Zakat is due on the market value of your crypto, regardless of whether your currency holdings are tokens (utility or work) or exchangeable coins.
        </p>
      </Modal>

      <Modal
        isOpen={activeModal === 'pension'}
        onClose={() => setActiveModal(null)}
        title="Pension & Retirement Savings"
      >
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>Depending on your country of residence, your pension funds and retirement savings may have a different name.</p>
          <p>There is a simple rule to follow when it comes to paying Zakat on it: <strong>If you have access to the funds, Zakat is paid on it.</strong></p>
          <p>Only the zakatable assets of the funds are liable for Zakat. Scholars, including Sh. Joe Bradford, have allowed approximating this number to <strong>30% of the market value</strong> of your funds.</p>
          <p className="font-medium">If you don't have access to control or withdraw those funds, you only pay Zakat upon maturity when you have access.</p>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === 'otherAssets'}
        onClose={() => setActiveModal(null)}
        title="Other Assets Examples"
      >
        <div className="space-y-4">
          <p className="text-gray-600 mb-4">You may have the following types of assets:</p>
          <ul className="space-y-2">
            {['Business inventory', 'International bank accounts', 'Livestock and food crops'].map((asset, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <span className="text-gray-700">{asset}</span>
              </li>
            ))}
          </ul>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === 'immediatelyPayable'}
        onClose={() => setActiveModal(null)}
        title="What Does Immediately Payable Mean?"
      >
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p><strong>Immediately due</strong> means your next payment on your expenses.</p>
          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 my-4">
            <p className="font-medium text-emerald-900 mb-2">Example:</p>
            <p>If you pay your car insurance monthly, you will deduct one month of car insurance payment.</p>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === 'commonExpenses'}
        onClose={() => setActiveModal(null)}
        title="Common Expenses"
      >
        <div className="space-y-4">
          <p className="text-gray-600 mb-4">You may have the following types of expenses:</p>
          <div className="space-y-4">
            {[
              { title: 'Housing', desc: 'Upcoming rent or mortgage payments' },
              { title: 'Insurance', desc: 'Upcoming home, auto and medical insurance payments' },
              { title: 'Utilities', desc: 'Upcoming energy, water and internet bills' },
              { title: 'Transportation', desc: 'Upcoming car payments' }
            ].map((expense, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-1">{expense.title}</h4>
                <p className="text-sm text-gray-600">{expense.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-sm italic text-gray-600 mt-4">Your next upcoming expense is what is deducted.</p>
        </div>
      </Modal>
    </>
  );
};

export default Modals;