import { motion } from "framer-motion";
import {
  TrendingUp,
  Calendar,
  Users,
  DollarSign,
  Shield,
  CheckCircle,
} from "lucide-react";

/**
 * campaign shape (important fields):
 * {
 *   raisedAmount,
 *   targetAmount,
 *   totalDonors,
 *   deadline,
 *   isUrgent,
 *   zakatVerified,
 *   taxBenefits
 * }
 */
export default function CampaignProgress({ darkMode, campaign }) {
  if (!campaign) return null;

  const {
    raisedAmount = 0,
    targetAmount = 0,
    totalDonors = 0,
    deadline,
  } = campaign;

  // ---- Calculations ----
  const percentage =
    targetAmount > 0
      ? Math.min(Math.round((raisedAmount / targetAmount) * 100), 100)
      : 0;

  const daysLeft = deadline
    ? Math.max(
        0,
        Math.ceil(
          (new Date(deadline).getTime() - Date.now()) /
            (1000 * 60 * 60 * 24)
        )
      )
    : 0;

  const avgDonation =
    totalDonors > 0 ? Math.round(raisedAmount / totalDonors) : 0;

  // INR helpers
  const formatLakhs = (amount) => (amount / 100000).toFixed(2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className={`${
        darkMode ? "bg-zinc-800" : "bg-white"
      } rounded-2xl shadow-lg p-6 md:p-8 mb-8`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ===================== LEFT: PROGRESS ===================== */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-emerald-500" />
            <h3
              className={`text-lg font-semibold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Campaign Progress
            </h3>
          </div>

          {/* Amount */}
          <div className="mb-6">
            <div className="flex items-end gap-3 mb-3">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                ₹{formatLakhs(raisedAmount)}L
              </div>
              <div
                className={`text-lg pb-1 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                raised of ₹{formatLakhs(targetAmount)}L
              </div>
            </div>

            {/* Progress bar */}
            <div
              className={`relative w-full h-4 rounded-full overflow-hidden ${
                darkMode ? "bg-zinc-700" : "bg-gray-200"
              }`}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1, delay: 0.4 }}
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 relative"
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              </motion.div>
            </div>

            <p
              className={`text-sm mt-2 font-medium ${
                darkMode ? "text-emerald-400" : "text-emerald-600"
              }`}
            >
              {percentage}% funded
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <StatCard
              darkMode={darkMode}
              icon={<Users className="w-4 h-4 text-emerald-500" />}
              value={totalDonors}
              label="Donors"
            />
            <StatCard
              darkMode={darkMode}
              icon={<Calendar className="w-4 h-4 text-blue-500" />}
              value={daysLeft}
              label="Days left"
            />
            <StatCard
              darkMode={darkMode}
              icon={<DollarSign className="w-4 h-4 text-purple-500" />}
              value={`₹${(avgDonation / 1000).toFixed(1)}K`}
              label="Avg. donation"
            />
          </div>
        </div>

        {/* ===================== RIGHT: TRUST ===================== */}
        <div
          className={`p-6 rounded-xl ${
            darkMode
              ? "bg-gradient-to-br from-emerald-900/30 to-teal-900/30 border border-emerald-800/30"
              : "bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100"
          }`}
        >
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-emerald-600" />
            <h4
              className={`font-semibold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Trust & Safety
            </h4>
          </div>

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
        </div>
      </div>
    </motion.div>
  );
}

/* ===================== SUB COMPONENTS ===================== */

function StatCard({ darkMode, icon, value, label }) {
  return (
    <div
      className={`p-4 rounded-xl ${
        darkMode ? "bg-zinc-700/50" : "bg-gray-50"
      }`}
    >
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span
          className={`text-2xl font-bold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {value}
        </span>
      </div>
      <p
        className={`text-xs ${
          darkMode ? "text-gray-400" : "text-gray-600"
        }`}
      >
        {label}
      </p>
    </div>
  );
}

function TrustItem({ darkMode, title, subtitle }) {
  return (
    <div className="flex items-start gap-3 mb-3">
      <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5" />
      <div>
        <p
          className={`text-sm font-medium ${
            darkMode ? "text-gray-200" : "text-gray-900"
          }`}
        >
          {title}
        </p>
        <p
          className={`text-xs ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}
