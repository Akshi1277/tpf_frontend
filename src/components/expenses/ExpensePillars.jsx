import { useState } from "react";
import {
  Users, Globe, Scale, Building2, Truck,
  Megaphone, ShieldAlert, MoreHorizontal,
  BarChart3, Heart, ChevronDown,
} from "lucide-react";

const TOTAL = 1200000;

const PILLARS = [
  {
    id: "people",
    label: "Our Team",
    color: "emerald",
    amount: 420000,
    tagline: "The people who show up every day to make things happen",
    items: [
      { Icon: Users,  label: "Office staff",        sub: "People who manage day-to-day work" },
      { Icon: Users,  label: "Program leads",        sub: "People who plan and run each project" },
      { Icon: Heart,  label: "Field workers",        sub: "People on the ground helping families" },
      { Icon: Heart,  label: "Volunteer costs",      sub: "Travel, food & safety for volunteers" },
    ],
  },
  {
    id: "systems",
    label: "How We Work",
    color: "blue",
    amount: 350000,
    tagline: "The tools and services that keep everything running smoothly",
    items: [
      { Icon: Globe,     label: "Website & payments",   sub: "So you can donate safely online" },
      { Icon: Building2, label: "Office & electricity", sub: "A place to work from" },
      { Icon: Scale,     label: "Government paperwork", sub: "Staying registered & following the rules" },
      { Icon: BarChart3, label: "Progress tracking",    sub: "Checking if our work is actually helping" },
    ],
  },
  {
    id: "execution",
    label: "Getting Things Done",
    color: "teal",
    amount: 330000,
    tagline: "The real costs of actually delivering help to people in need",
    items: [
      { Icon: Truck,     label: "Travel & transport",   sub: "Getting people and supplies where they're needed" },
      { Icon: Megaphone, label: "Spreading the word",   sub: "Letting people know about our campaigns" },
      { Icon: Heart,     label: "Volunteer gear",       sub: "Kits, training & equipment for our volunteers" },
    ],
  },
  {
    id: "support",
    label: "Just in Case",
    color: "orange",
    amount: 100000,
    tagline: "A safety net so we're always ready when disaster strikes",
    items: [
      { Icon: ShieldAlert,    label: "Emergency reserve",  sub: "Money kept ready for sudden disasters" },
      { Icon: MoreHorizontal, label: "Small daily costs",  sub: "Bank fees, deliveries, insurance & more" },
    ],
  },
];

const COLOR = {
  emerald: {
    active: { bg: "bg-emerald-500", text: "text-white", border: "border-emerald-500" },
    idle:   { border: "border-emerald-200 dark:border-emerald-800", label: "text-emerald-600 dark:text-emerald-400" },
    icon:   "text-emerald-500",
    iconBg: "bg-emerald-50 dark:bg-emerald-950/50",
    bar:    "bg-emerald-500",
    pct:    "text-emerald-600 dark:text-emerald-400",
    borderHex: "#10b981",
  },
  blue: {
    active: { bg: "bg-blue-500",    text: "text-white", border: "border-blue-500" },
    idle:   { border: "border-blue-200 dark:border-blue-800", label: "text-blue-600 dark:text-blue-400" },
    icon:   "text-blue-500",
    iconBg: "bg-blue-50 dark:bg-blue-950/50",
    bar:    "bg-blue-500",
    pct:    "text-blue-600 dark:text-blue-400",
    borderHex: "#3b82f6",
  },
  teal: {
    active: { bg: "bg-teal-500",    text: "text-white", border: "border-teal-500" },
    idle:   { border: "border-teal-200 dark:border-teal-800", label: "text-teal-600 dark:text-teal-400" },
    icon:   "text-teal-500",
    iconBg: "bg-teal-50 dark:bg-teal-950/50",
    bar:    "bg-teal-500",
    pct:    "text-teal-600 dark:text-teal-400",
    borderHex: "#14b8a6",
  },
  orange: {
    active: { bg: "bg-orange-500",  text: "text-white", border: "border-orange-500" },
    idle:   { border: "border-orange-200 dark:border-orange-800", label: "text-orange-600 dark:text-orange-400" },
    icon:   "text-orange-500",
    iconBg: "bg-orange-50 dark:bg-orange-950/50",
    bar:    "bg-orange-500",
    pct:    "text-orange-600 dark:text-orange-400",
    borderHex: "#f97316",
  },
};

function fmtINR(n) {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000)   return `₹${Math.round(n / 1000)}K`;
  return `₹${n}`;
}

export default function ExpensePillars({ darkMode, onDonate }) {
  const [active, setActive] = useState("people");

  return (
    <section
      id="breakdown"
      className={`py-16 md:py-20 ${darkMode ? "bg-gray-950" : "bg-gray-50"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className={`text-xs font-semibold uppercase tracking-widest mb-1.5 ${
              darkMode ? "text-emerald-400" : "text-emerald-600"
            }`}>
              How your money is used
            </p>
            <h2 className={`text-2xl md:text-3xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}>
              We spend every rupee carefully
            </h2>
            <p className={`text-sm mt-1.5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              Here's exactly what it costs to run this organisation for a full year
            </p>
          </div>
          <button
            onClick={onDonate}
            className="shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors cursor-pointer"
          >
            Donate Now
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* ── Pillar tabs (left) ── */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {PILLARS.map((p) => {
              const c = COLOR[p.color];
              const isActive = active === p.id;
              const pct = Math.round((p.amount / TOTAL) * 100);

              return (
                <button
                  key={p.id}
                  onClick={() => setActive(p.id)}
                  className={`w-full text-left rounded-2xl border-2 transition-all duration-200 overflow-hidden cursor-pointer ${
                    isActive
                      ? `${c.active.bg} ${c.active.border}`
                      : `${darkMode ? "bg-gray-900 border-gray-800 hover:border-gray-600" : "bg-white border-gray-100 hover:border-gray-200"}`
                  }`}
                >
                  <div className="p-4 flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className={`font-bold text-sm ${
                          isActive ? "text-white" : (darkMode ? "text-white" : "text-gray-900")
                        }`}>
                          {p.label}
                        </span>
                        <span className={`text-sm font-bold shrink-0 ${
                          isActive ? "text-white/90" : c.pct
                        }`}>
                          {fmtINR(p.amount)}
                        </span>
                      </div>
                      {/* Mini bar */}
                      <div className={`h-1.5 w-full rounded-full ${
                        isActive ? "bg-white/20" : (darkMode ? "bg-gray-800" : "bg-gray-100")
                      }`}>
                        <div
                          className={`h-1.5 rounded-full transition-all duration-500 ${
                            isActive ? "bg-white/70" : c.bar
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <p className={`text-[11px] mt-1.5 ${
                        isActive ? "text-white/70" : (darkMode ? "text-gray-500" : "text-gray-400")
                      }`}>
                        {pct}% of the total budget
                      </p>
                    </div>
                    <ChevronDown
                      size={15}
                      className={`shrink-0 transition-transform duration-200 ${
                        isActive ? "rotate-180 text-white/80" : (darkMode ? "text-gray-600" : "text-gray-300")
                      }`}
                    />
                  </div>
                </button>
              );
            })}

            {/* Total stacked bar */}
            <div className={`rounded-2xl p-4 border mt-1 ${
              darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"
            }`}>
              <div className="flex items-center justify-between mb-1 text-xs">
                <span className={darkMode ? "text-gray-400" : "text-gray-500"}>
                  Total needed for the whole year
                </span>
                <span className={`font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                  ₹12,00,000
                </span>
              </div>
              <p className={`text-[11px] mb-2.5 ${darkMode ? "text-gray-600" : "text-gray-400"}`}>
                Click any colour below to see where it goes
              </p>
              <div className="flex h-2.5 rounded-full overflow-hidden gap-0.5">
                {PILLARS.map((p) => (
                  <div
                    key={p.id}
                    className={`h-full transition-all duration-300 cursor-pointer ${COLOR[p.color].bar} ${
                      active === p.id ? "opacity-100" : "opacity-40"
                    }`}
                    style={{ width: `${(p.amount / TOTAL) * 100}%` }}
                    onClick={() => setActive(p.id)}
                    title={`${p.label}: ₹${p.amount.toLocaleString("en-IN")}`}
                  />
                ))}
              </div>
              <div className="flex flex-wrap gap-3 mt-2.5">
                {PILLARS.map((p) => (
                  <div key={p.id} className="flex items-center gap-1.5 cursor-pointer" onClick={() => setActive(p.id)}>
                    <span className={`w-2 h-2 rounded-full ${COLOR[p.color].bar}`} />
                    <span className={`text-[11px] ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                      {p.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Detail panel (right) ── */}
          <div className="lg:col-span-7">
            {PILLARS.map((p) => {
              if (p.id !== active) return null;
              const c = COLOR[p.color];
              const pct = Math.round((p.amount / TOTAL) * 100);

              return (
                <div
                  key={p.id}
                  className={`rounded-2xl border h-full ${
                    darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"
                  }`}
                >
                  {/* Panel header */}
                  <div className={`px-6 py-5 border-b rounded-t-2xl ${
                    darkMode ? "border-gray-800" : "border-gray-100"
                  }`}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className={`text-xs font-semibold uppercase tracking-widest mb-1 ${c.pct}`}>
                          {pct} paise out of every ₹1 you donate
                        </p>
                        <h3 className={`text-xl font-bold ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}>
                          {p.label}
                        </h3>
                        <p className={`text-sm mt-1 ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}>
                          {p.tagline}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className={`text-2xl font-bold ${c.pct}`}>
                          {fmtINR(p.amount)}
                        </p>
                        <p className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                          needed per year
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Line items */}
                  <div className="p-6 space-y-4">
                    <p className={`text-xs font-semibold uppercase tracking-widest mb-3 ${
                      darkMode ? "text-gray-500" : "text-gray-400"
                    }`}>
                      This covers things like…
                    </p>
                    {p.items.map((item, i) => {
                      const Icon = item.Icon;
                      return (
                        <div key={i} className="flex items-center gap-3.5">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${c.iconBg}`}>
                            <Icon size={16} className={c.icon} />
                          </div>
                          <div>
                            <p className={`text-sm font-semibold ${
                              darkMode ? "text-gray-200" : "text-gray-800"
                            }`}>
                              {item.label}
                            </p>
                            <p className={`text-xs ${
                              darkMode ? "text-gray-500" : "text-gray-400"
                            }`}>
                              {item.sub}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Panel donate nudge */}
                  <div className="px-6 pb-6 pt-0">
                    <button
                      onClick={onDonate}
                      className={`w-full py-3 rounded-xl text-sm font-semibold border-2 transition-colors cursor-pointer ${
                        darkMode
                          ? "text-white/80 hover:bg-white/5"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      style={{ borderColor: c.borderHex }}
                    >
                      Help us cover {p.label.toLowerCase()} costs
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}