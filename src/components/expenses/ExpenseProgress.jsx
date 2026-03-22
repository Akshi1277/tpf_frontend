"use client";

import { useState } from "react";
import { Users, Clock, Target, TrendingUp, Heart, Flame, ArrowUpRight } from "lucide-react";

function fmtINR(n) {
  return `₹${Number(n).toLocaleString("en-IN")}`;
}

export default function ExpenseProgress({ campaign, darkMode, onDonate, setIsDonorModalOpen }) {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const raised = campaign?.raisedAmount ?? 0;
  const target = campaign?.targetAmount ?? 1200000;
  const donors = campaign?.totalDonors ?? 0;

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
    <div className={`border-b ${darkMode ? "bg-gray-950 border-gray-800" : "bg-white border-gray-200"}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Top label row ── */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Flame size={14} className="text-orange-500" />
            <span className={`text-xs font-semibold uppercase tracking-widest ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              Live fundraiser
            </span>
          </div>
          <span className={`text-xs font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            {fmtINR(raised)} of {fmtINR(target)} goal
          </span>
        </div>

        {/* ── Progress bar ── */}
        <div className={`relative h-3 w-full rounded-full overflow-hidden mb-1.5 ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}>
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-emerald-400/30 blur-sm transition-all duration-700"
            style={{ width: `${Math.max(raisedPct, 0.5)}%` }}
          />
          <div
            className="relative h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-700"
            style={{ width: `${Math.max(raisedPct, 0.5)}%` }}
          />
          <div
            className="absolute inset-y-0 left-0 rounded-full overflow-hidden transition-all duration-700"
            style={{ width: `${Math.max(raisedPct, 0.5)}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite] -translate-x-full" />
          </div>
        </div>

        <div className="flex items-center justify-between mb-8">
          <span className={`text-[11px] font-semibold ${darkMode ? "text-emerald-400" : "text-emerald-600"}`}>
            {raisedPct}% funded
          </span>
          {daysLeft !== null && (
            <span className={`text-[11px] font-medium flex items-center gap-1 ${
              daysLeft < 30 ? "text-red-500" : darkMode ? "text-gray-400" : "text-gray-500"
            }`}>
              <Clock size={11} />
              {daysLeft} days left
            </span>
          )}
        </div>

        {/* ── Stats row ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">

          {/* Raised */}
          <div className={`p-3.5 rounded-2xl border-2 ${
            darkMode
              ? "bg-emerald-950/50 border-emerald-800"
              : "bg-emerald-100 border-emerald-200"
          }`}>
            <div className="flex items-center gap-1.5 mb-1.5">
              <TrendingUp size={12} className="text-emerald-600" />
              <span className={`text-[10px] font-bold uppercase tracking-widest ${
                darkMode ? "text-emerald-400" : "text-emerald-700"
              }`}>Raised</span>
            </div>
            <p className={`text-lg font-extrabold leading-none ${
              darkMode ? "text-emerald-300" : "text-emerald-800"
            }`}>
              {fmtINR(raised)}
            </p>
            <p className={`text-[11px] mt-1 font-medium ${
              darkMode ? "text-emerald-500" : "text-emerald-600"
            }`}>{raisedPct}% of goal</p>
          </div>

          {/* Still Needed */}
          <div className={`p-3.5 rounded-2xl border-2 ${
            darkMode
              ? "bg-orange-950/50 border-orange-800"
              : "bg-orange-100 border-orange-200"
          }`}>
            <div className="flex items-center gap-1.5 mb-1.5">
              <Target size={12} className="text-orange-600" />
              <span className={`text-[10px] font-bold uppercase tracking-widest ${
                darkMode ? "text-orange-400" : "text-orange-700"
              }`}>Still Needed</span>
            </div>
            <p className={`text-lg font-extrabold leading-none ${
              darkMode ? "text-orange-300" : "text-orange-700"
            }`}>
              {fmtINR(remaining)}
            </p>
            <p className={`text-[11px] mt-1 font-medium ${
              darkMode ? "text-orange-500" : "text-orange-600"
            }`}>To reach goal</p>
          </div>

          {/* Donors — with tooltip */}
          <div className="relative">
            <button
              onClick={() => setIsDonorModalOpen?.(true)}
              onMouseEnter={() => setTooltipVisible(true)}
              onMouseLeave={() => setTooltipVisible(false)}
              onFocus={() => setTooltipVisible(true)}
              onBlur={() => setTooltipVisible(false)}
              className={`w-full h-full p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                darkMode
                  ? "bg-violet-950/50 border-violet-800 hover:border-violet-600 hover:bg-violet-950/70"
                  : "bg-violet-100 border-violet-200 hover:border-violet-400 hover:bg-violet-150"
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1.5">
                <Users size={12} className="text-violet-600" />
                <span className={`text-[10px] font-bold uppercase tracking-widest ${
                  darkMode ? "text-violet-400" : "text-violet-700"
                }`}>Donors</span>
              </div>
              <p className={`text-lg font-extrabold leading-none ${
                darkMode ? "text-violet-300" : "text-violet-800"
              }`}>
                {donors.toLocaleString("en-IN")}
              </p>
              <p className={`text-[11px] mt-1 font-medium ${
                darkMode ? "text-violet-500" : "text-violet-600"
              }`}>People like you</p>

              {/* Tap indicator — always visible on mobile, hidden on desktop */}
              <div className={`flex items-center gap-1 mt-2 sm:hidden`}>
                <ArrowUpRight size={10} className="text-violet-500" />
                <span className={`text-[9px] font-bold ${
                  darkMode ? "text-violet-400" : "text-violet-600"
                }`}>Tap to view</span>
              </div>
            </button>

            {/* Tooltip — desktop hover only */}
            <div className={`
              hidden sm:block
              absolute top-full left-1/2 -translate-x-1/2 mt-3 z-30
              w-44 rounded-xl shadow-xl pointer-events-none
              transition-all duration-200
              ${tooltipVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}
              ${darkMode ? "bg-zinc-800 border border-zinc-700" : "bg-gray-900"}
            `}>
              {/* Arrow pointing UP */}
              <div className={`absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 rounded-sm ${
                darkMode ? "bg-zinc-800 border-l border-t border-zinc-700" : "bg-gray-900"
              }`} />
              <div className="px-3 py-2.5">
                <div className="flex items-center gap-1.5 mb-1">
                  <Users size={11} className="text-violet-400 shrink-0" />
                  <p className="text-white text-[11px] font-bold leading-tight">
                    View our supporters
                  </p>
                </div>
                <p className="text-gray-400 text-[10px] leading-tight">
                  Click to see who donated to this campaign
                </p>
              </div>
            </div>
          </div>

          {/* Days Left */}
          {daysLeft !== null ? (
            <div className={`p-3.5 rounded-2xl border-2 ${
              daysLeft < 30
                ? darkMode ? "bg-red-950/50 border-red-800" : "bg-red-100 border-red-200"
                : darkMode ? "bg-gray-800/80 border-gray-700" : "bg-gray-100 border-gray-200"
            }`}>
              <div className="flex items-center gap-1.5 mb-1.5">
                <Clock size={12} className={daysLeft < 30 ? "text-red-500" : darkMode ? "text-gray-400" : "text-gray-500"} />
                <span className={`text-[10px] font-bold uppercase tracking-widest ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}>Days Left</span>
              </div>
              <p className={`text-lg font-extrabold leading-none ${
                daysLeft < 30
                  ? "text-red-500"
                  : darkMode ? "text-white" : "text-gray-900"
              }`}>
                {daysLeft}
              </p>
              <p className={`text-[11px] mt-1 font-medium ${darkMode ? "text-gray-500" : "text-gray-600"}`}>
                {deadline?.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
              </p>
            </div>
          ) : (
            <div className={`p-3.5 rounded-2xl border-2 ${
              darkMode ? "bg-blue-950/50 border-blue-800" : "bg-blue-100 border-blue-200"
            }`}>
              <div className="flex items-center gap-1.5 mb-1.5">
                <Target size={12} className="text-blue-600" />
                <span className={`text-[10px] font-bold uppercase tracking-widest ${
                  darkMode ? "text-blue-400" : "text-blue-700"
                }`}>Goal</span>
              </div>
              <p className={`text-lg font-extrabold leading-none ${
                darkMode ? "text-blue-300" : "text-blue-800"
              }`}>
                {fmtINR(target)}
              </p>
              <p className={`text-[11px] mt-1 font-medium ${
                darkMode ? "text-blue-500" : "text-blue-600"
              }`}>Annual target</p>
            </div>
          )}
        </div>

        {/* ── CTA row ── */}
        <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-5 border-t ${
          darkMode ? "border-gray-800" : "border-gray-200"
        }`}>
          <div className="flex items-start gap-2.5">
            <Heart size={15} className="text-rose-500 mt-0.5 shrink-0" fill="currentColor" />
            <p className={`text-sm leading-snug ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              {urgencyMsg}
            </p>
          </div>

          <button
            onClick={onDonate}
            className="shrink-0 px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center gap-2"
          >
            <Heart size={15} fill="currentColor" />
            Keep the lights on — Donate now
          </button>
        </div>

      </div>
    </div>
  );
}