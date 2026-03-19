import { useState } from "react";
import { Shield, BadgeCheck, Lock, Clock, Calendar, CalendarDays, Target } from "lucide-react";

const TOTAL   = 1200000;
const DAILY   = Math.round(TOTAL / 365);
const WEEKLY  = Math.round(TOTAL / 52);
const MONTHLY = Math.round(TOTAL / 12);

const PERIODS = [
  { key: "daily",   label: "Daily",   Icon: Clock,        amount: DAILY,   sub: "keeps us running for 24 hours" },
  { key: "weekly",  label: "Weekly",  Icon: Calendar,     amount: WEEKLY,  sub: "powers a full week of operations" },
  { key: "monthly", label: "Monthly", Icon: CalendarDays, amount: MONTHLY, sub: "sustains the full team for a month" },
  { key: "yearly",  label: "Annual",  Icon: Target,       amount: TOTAL,   sub: "funds the entire year of operations" },
];

function fmtFull(n) {
  return `₹${n.toLocaleString("en-IN")}`;
}

function fmtShort(n) {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000)   return `₹${Math.round(n / 1000)}K`;
  return `₹${n}`;
}

export default function ExpenseDonateCard({ campaign, darkMode, onDonate }) {
  const [active, setActive] = useState("monthly");
  const sel = PERIODS.find((p) => p.key === active);

  const presets = campaign?.unitConfig?.presets ?? [];

  return (
    <div className={`rounded-2xl border overflow-hidden sticky top-24 ${
      darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100 shadow-lg shadow-gray-100"
    }`}>
      {/* Header strip */}
      <div className="bg-emerald-500 px-5 py-4">
        <p className="text-emerald-100 text-[11px] font-semibold uppercase tracking-widest">
          Real cost breakdown
        </p>
        <p className="text-white font-bold text-lg leading-tight mt-0.5">
          What does it cost?
        </p>
      </div>

      <div className="p-5 space-y-4">
        {/* Period tabs */}
        <div className="grid grid-cols-4 gap-1.5">
          {PERIODS.map(({ key, label, Icon: PIcon }) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`flex flex-col items-center gap-1 py-2.5 rounded-xl text-[11px] font-semibold border transition-all ${
                active === key
                  ? "bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/25"
                  : darkMode
                  ? "bg-gray-800 text-gray-400 border-gray-700 hover:border-emerald-700"
                  : "bg-gray-50 text-gray-500 border-gray-200 hover:border-emerald-300"
              }`}
            >
              <PIcon size={13} />
              {label}
            </button>
          ))}
        </div>

        {/* Selected amount */}
        <div className={`rounded-xl p-4 text-center ${
          darkMode ? "bg-gray-800" : "bg-emerald-50"
        }`}>
          <p className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
            {fmtFull(sel.amount)}
          </p>
          <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-emerald-700"}`}>
            {sel.sub}
          </p>
        </div>

        {/* Other periods as small references */}
        <div className="grid grid-cols-2 gap-2">
          {PERIODS.filter((p) => p.key !== active).map((p) => (
            <button
              key={p.key}
              onClick={() => setActive(p.key)}
              className={`text-left rounded-lg px-3 py-2 border transition-colors ${
                darkMode
                  ? "bg-gray-800/50 border-gray-700 hover:border-emerald-700"
                  : "bg-gray-50 border-gray-100 hover:border-emerald-200"
              }`}
            >
              <p className={`text-[11px] ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                {p.label}
              </p>
              <p className={`text-sm font-semibold ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
                {fmtShort(p.amount)}
              </p>
            </button>
          ))}
        </div>

        {/* Preset amounts from campaign backend */}
        {presets.length > 0 && (
          <div>
            <p className={`text-[11px] mb-2 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
              Quick donate
            </p>
            <div className="grid grid-cols-3 gap-2">
              {presets.slice(0, 6).map((preset) => (
                <button
                  key={preset._id?.$oid ?? preset.amount}
                  onClick={onDonate}
                  className={`py-2 rounded-lg text-sm font-semibold border transition-all hover:border-emerald-500 hover:text-emerald-600 ${
                    darkMode
                      ? "border-gray-700 text-gray-300 hover:bg-emerald-950/30"
                      : "border-gray-200 text-gray-700 hover:bg-emerald-50"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main CTA */}
        <button
          onClick={onDonate}
          className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl text-sm transition-colors shadow-lg shadow-emerald-500/20 active:scale-[0.98]"
        >
          Donate Now
        </button>

        {/* Trust row */}
        <div className={`flex items-center justify-between pt-1 border-t ${
          darkMode ? "border-gray-800" : "border-gray-100"
        }`}>
          {[
            { Icon: Shield,    text: "Secure" },
            { Icon: BadgeCheck, text: "Verified NGO" },
            { Icon: Lock,      text: "Encrypted" },
          ].map(({ Icon: TIcon, text }) => (
            <div key={text} className={`flex items-center gap-1 text-[11px] ${
              darkMode ? "text-gray-500" : "text-gray-400"
            }`}>
              <TIcon size={11} className="text-emerald-500" />
              {text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
