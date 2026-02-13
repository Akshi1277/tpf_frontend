"use client"
import { motion } from "framer-motion";
import { Shield, CheckCircle, CreditCard } from "lucide-react";

export default function TrustSafety({ darkMode }) {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className={`absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 rounded-full ${darkMode ? 'bg-emerald-400' : 'bg-emerald-600'} blur-3xl`} />
        <div className={`absolute bottom-0 left-0 w-24 sm:w-32 h-24 sm:h-32 rounded-full ${darkMode ? 'bg-teal-400' : 'bg-teal-600'} blur-3xl`} />
      </div>

      <div
        className={`relative p-4 sm:p-6 rounded-xl h-full ${darkMode
          ? "bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700"
          : "bg-gradient-to-br from-emerald-50 via-white to-teal-50 border-2 border-emerald-100"
          }`}
      >
        <div className="flex items-center gap-2 mb-4 sm:mb-5">
          <div className={`p-1.5 sm:p-2 rounded-lg ${darkMode ? 'bg-emerald-500/10' : 'bg-emerald-100'}`}>
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
          </div>
          <h4
            className={`text-sm sm:text-base font-semibold ${darkMode ? "text-white" : "text-gray-900"
              }`}
          >
            Trust & Safety
          </h4>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <TrustItem
            darkMode={darkMode}
            title="Verified Campaign"
            subtitle="Reviewed by platform team"
          />
          <TrustItem
            darkMode={darkMode}
            title="100% Transparent"
            subtitle="Documents & updates available"
          />
          <TrustItem
            darkMode={darkMode}
            title="Secure Payments"
            subtitle="Bank-grade encryption"
          />
          <TrustItem
            darkMode={darkMode}
            title="Payment Modes Accepted"
            subtitle="UPI, Credit & Debit Cards, Wallets, Net Banking, Pay Later & Cardless EMI via secure payment gateway"
            icon={<CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500" />}
          />
          <TrustItem
            darkMode={darkMode}
            title="Platform Sustainability"
            subtitle="Surplus funds may support similar campaigns or platform operational expenses"
          />
          <TrustItem
            darkMode={darkMode}
            title="No Unsolicited Fundraising"
            subtitle="TPFAid does not solicit donations via SMS, phone calls, or unsolicited messages"
          />
        </div>
      </div>
    </div>
  );
}

function TrustItem({ darkMode, title, subtitle, icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-start gap-2.5 sm:gap-3"
    >
      <div className={`mt-0.5 ${darkMode ? 'bg-emerald-500/10' : 'bg-emerald-100'} p-1 rounded flex-shrink-0`}>
        {icon || <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500" />}
      </div>
      <div className="min-w-0">
        <p
          className={`text-xs sm:text-sm font-semibold mb-0.5 ${darkMode ? "text-gray-200" : "text-gray-900"
            }`}
        >
          {title}
        </p>
        <p
          className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"
            }`}
        >
          {subtitle}
        </p>
      </div>
    </motion.div>
  );
}