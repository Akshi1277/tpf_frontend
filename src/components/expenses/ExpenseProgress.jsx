"use client";

import { Users, Clock, Target, TrendingUp, Heart, Flame } from "lucide-react";

function fmtINR(n) {
  return `₹${Number(n).toLocaleString("en-IN")}`;
}

export default function ExpenseProgress({ campaign, darkMode, onDonate, setIsDonorModalOpen }) {
  const raised  = campaign?.raisedAmount  ?? 0;
  const target  = campaign?.targetAmount  ?? 1200000;
  const donors  = campaign?.totalDonors   ?? 0;

  const raisedPct = target > 0
    ? Math.min(100, Math.round((raised / target) * 100))
    : 0;

  const remaining = Math.max(0, target - raised);

  const deadline = campaign?.deadline?.$date
    ? new Date(campaign.deadline.$date)
    : campaign?.deadline
    ? new Date(campaign.deadline)
    : null;

  const daysLeft = deadline
    ? Math.max(0, Math.ceil((deadline - Date.now()) / 86400000))
    : null;

  const urgencyMsg =
    remaining === 0
      ? "🎉 Goal reached — thank you to every single donor!"
      : raisedPct >= 75
      ? `Almost there — just ${fmtINR(remaining)} left to close the gap`
      : raisedPct >= 40
      ? `${fmtINR(remaining)} still needed — every rupee counts`
      : `We're just getting started — ${fmtINR(remaining)} needed to keep us running`;

  return (
    <div className={`border-b ${darkMode ? "bg-gray-950 border-gray-800" : "bg-white border-gray-100"}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Top label row ── */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Flame size={14} className="text-orange-500" />
            <span className={`text-xs font-semibold uppercase tracking-widest ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
              Live fundraiser
            </span>
          </div>
          <span className={`text-xs font-medium ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
            {fmtINR(raised)} of {fmtINR(target)} goal
          </span>
        </div>

        {/* ── Progress bar ── */}
        <div className={`relative h-3 w-full rounded-full overflow-hidden mb-1.5 ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
          {/* Glow layer */}
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-emerald-400/30 blur-sm transition-all duration-700"
            style={{ width: `${Math.max(raisedPct, 0.5)}%` }}
          />
          {/* Solid fill */}
          <div
            className="relative h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-700"
            style={{ width: `${Math.max(raisedPct, 0.5)}%` }}
          />
          {/* Shimmer */}
          <div
            className="absolute inset-y-0 left-0 rounded-full overflow-hidden transition-all duration-700"
            style={{ width: `${Math.max(raisedPct, 0.5)}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite] -translate-x-full" />
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <span className={`text-[11px] font-semibold ${darkMode ? "text-emerald-400" : "text-emerald-600"}`}>
            {raisedPct}% funded
          </span>
          {daysLeft !== null && (
            <span className={`text-[11px] font-medium flex items-center gap-1 ${
              daysLeft < 30
                ? "text-red-500"
                : darkMode ? "text-gray-500" : "text-gray-400"
            }`}>
              <Clock size={11} />
              {daysLeft} days left
            </span>
          )}
        </div>

        {/* ── Stats row ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {/* Raised */}
          <div className={`p-3.5 rounded-2xl border ${darkMode ? "bg-gray-900 border-gray-800" : "bg-emerald-50 border-emerald-100"}`}>
            <div className="flex items-center gap-1.5 mb-1.5">
              <TrendingUp size={12} className="text-emerald-500" />
              <span className={`text-[10px] font-bold uppercase tracking-widest ${darkMode ? "text-gray-500" : "text-emerald-600/70"}`}>Raised</span>
            </div>
            <p className={`text-lg font-extrabold leading-none ${darkMode ? "text-emerald-400" : "text-emerald-700"}`}>
              {fmtINR(raised)}
            </p>
            <p className={`text-[11px] mt-1 ${darkMode ? "text-gray-600" : "text-emerald-600/60"}`}>{raisedPct}% of goal</p>
          </div>

          {/* Still Needed */}
          <div className={`p-3.5 rounded-2xl border ${darkMode ? "bg-gray-900 border-gray-800" : "bg-orange-50 border-orange-100"}`}>
            <div className="flex items-center gap-1.5 mb-1.5">
              <Target size={12} className="text-orange-500" />
              <span className={`text-[10px] font-bold uppercase tracking-widest ${darkMode ? "text-gray-500" : "text-orange-600/70"}`}>Still Needed</span>
            </div>
            <p className={`text-lg font-extrabold leading-none ${darkMode ? "text-orange-400" : "text-orange-600"}`}>
              {fmtINR(remaining)}
            </p>
            <p className={`text-[11px] mt-1 ${darkMode ? "text-gray-600" : "text-orange-500/60"}`}>To reach goal</p>
          </div>

          {/* Donors */}
          <button
            onClick={() => setIsDonorModalOpen?.(true)}
            className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
              darkMode
                ? "bg-gray-900 border-gray-800 hover:border-violet-700"
                : "bg-violet-50 border-violet-100 hover:border-violet-300"
            }`}
          >
            <div className="flex items-center gap-1.5 mb-1.5">
              <Users size={12} className="text-violet-500" />
              <span className={`text-[10px] font-bold uppercase tracking-widest ${darkMode ? "text-gray-500" : "text-violet-600/70"}`}>Donors</span>
            </div>
            <p className={`text-lg font-extrabold leading-none ${darkMode ? "text-violet-400" : "text-violet-700"}`}>
              {donors.toLocaleString("en-IN")}
            </p>
            <p className={`text-[11px] mt-1 ${darkMode ? "text-gray-600" : "text-violet-500/60"}`}>People like you</p>
          </button>

          {/* Days Left */}
          {daysLeft !== null ? (
            <div className={`p-3.5 rounded-2xl border ${
              daysLeft < 30
                ? darkMode ? "bg-red-950/30 border-red-900/50" : "bg-red-50 border-red-100"
                : darkMode ? "bg-gray-900 border-gray-800" : "bg-gray-50 border-gray-100"
            }`}>
              <div className="flex items-center gap-1.5 mb-1.5">
                <Clock size={12} className={daysLeft < 30 ? "text-red-500" : "text-gray-400"} />
                <span className={`text-[10px] font-bold uppercase tracking-widest ${darkMode ? "text-gray-500" : "text-gray-400"}`}>Days Left</span>
              </div>
              <p className={`text-lg font-extrabold leading-none ${
                daysLeft < 30
                  ? "text-red-500"
                  : darkMode ? "text-white" : "text-gray-900"
              }`}>
                {daysLeft}
              </p>
              <p className={`text-[11px] mt-1 ${darkMode ? "text-gray-600" : "text-gray-400"}`}>
                {deadline?.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
              </p>
            </div>
          ) : (
            <div className={`p-3.5 rounded-2xl border ${darkMode ? "bg-gray-900 border-gray-800" : "bg-blue-50 border-blue-100"}`}>
              <div className="flex items-center gap-1.5 mb-1.5">
                <Target size={12} className="text-blue-500" />
                <span className={`text-[10px] font-bold uppercase tracking-widest ${darkMode ? "text-gray-500" : "text-blue-600/70"}`}>Goal</span>
              </div>
              <p className={`text-lg font-extrabold leading-none ${darkMode ? "text-blue-400" : "text-blue-700"}`}>
                {fmtINR(target)}
              </p>
              <p className={`text-[11px] mt-1 ${darkMode ? "text-gray-600" : "text-blue-500/60"}`}>Annual target</p>
            </div>
          )}
        </div>

        {/* ── CTA row ── */}
        <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-5 border-t ${
          darkMode ? "border-gray-800" : "border-gray-100"
        }`}>
          <div className="flex items-start gap-2.5">
            <Heart size={15} className="text-rose-500 mt-0.5 shrink-0" fill="currentColor" />
            <p className={`text-sm leading-snug ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              {urgencyMsg}
            </p>
          </div>

          <button
            onClick={onDonate}
            className="shrink-0 group relative overflow-hidden px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Heart size={15} fill="currentColor" />
              Keep the lights on — Donate now
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}