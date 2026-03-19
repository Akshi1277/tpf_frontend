"use client";

import { Users, Clock, Target, TrendingUp } from "lucide-react";

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

  const stats = [
    {
      icon: TrendingUp,
      label: "Raised",
      value: fmtINR(raised),
      sub: `${raisedPct}% of goal`,
      color: "emerald",
    },
    {
      icon: Target,
      label: "Goal",
      value: fmtINR(target),
      sub: "Annual target",
      color: "blue",
    },
    {
      icon: TrendingUp,
      label: "Still Needed",
      value: fmtINR(remaining),
      sub: "To reach goal",
      color: "orange",
      flip: true,           // orange accent for urgency
    },
    {
      icon: Users,
      label: "Donors",
      value: donors.toLocaleString("en-IN"),
      sub: "People contributed",
      color: "violet",
      clickable: true,
    },
    ...(daysLeft !== null
      ? [
          {
            icon: Clock,
            label: "Days Left",
            value: daysLeft,
            sub: deadline.toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }),
            color: daysLeft < 30 ? "red" : "gray",
          },
        ]
      : []),
  ];

  const colorMap = {
    emerald: "text-emerald-600 dark:text-emerald-400",
    blue:    "text-blue-600    dark:text-blue-400",
    orange:  "text-orange-600  dark:text-orange-400",
    violet:  "text-violet-600  dark:text-violet-400",
    red:     "text-red-500     dark:text-red-400",
    gray:    "text-gray-700    dark:text-gray-300",
  };

  return (
    <div
      className={`border-b ${
        darkMode ? "bg-gray-950 border-gray-800" : "bg-white border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* ── Progress bar ── */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2 text-sm">
            <span className={darkMode ? "text-gray-400" : "text-gray-500"}>
              {fmtINR(raised)} raised
            </span>
            <span className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
              {raisedPct}% of {fmtINR(target)}
            </span>
          </div>
          <div
            className={`relative h-2.5 w-full rounded-full overflow-hidden ${
              darkMode ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-700"
              style={{ width: `${Math.max(raisedPct, 0.5)}%` }}
            />
          </div>
        </div>

        {/* ── Stats row ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <button
                key={stat.label}
                disabled={!stat.clickable}
                onClick={stat.clickable ? () => setIsDonorModalOpen?.(true) : undefined}
                className={`flex flex-col gap-0.5 p-3 rounded-xl border text-left transition-colors ${
                  stat.clickable
                    ? "cursor-pointer"
                    : "cursor-default"
                } ${
                  darkMode
                    ? `bg-gray-900 border-gray-800 ${stat.clickable ? "hover:border-emerald-700" : ""}`
                    : `bg-gray-50 border-gray-100 ${stat.clickable ? "hover:border-emerald-200" : ""}`
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon
                    size={13}
                    className={`${colorMap[stat.color]} shrink-0`}
                  />
                  <span
                    className={`text-[11px] font-medium uppercase tracking-wide ${
                      darkMode ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    {stat.label}
                  </span>
                </div>
                <span
                  className={`text-xl font-bold leading-none ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {stat.value}
                </span>
                <span
                  className={`text-[11px] mt-0.5 ${
                    darkMode ? "text-gray-600" : "text-gray-400"
                  }`}
                >
                  {stat.sub}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Donate nudge ── */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className={`text-sm ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
            {remaining > 0
              ? `${fmtINR(remaining)} more needed to reach the annual goal`
              : "Annual goal reached — thank you!"}
          </p>
          <button
            onClick={onDonate}
            className="shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors shadow-md shadow-emerald-500/20"
          >
            Donate Now
          </button>
        </div>
      </div>
    </div>
  );
}