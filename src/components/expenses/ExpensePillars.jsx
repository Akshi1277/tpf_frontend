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
    label: "People",
    color: "emerald",
    amount: 420000,
    tagline: "The people who plan and execute every mission",
    items: [
      { Icon: Users,  label: "Administrative staff",   sub: "Management & coordination" },
      { Icon: Users,  label: "Program managers",        sub: "Planning & oversight" },
      { Icon: Heart,  label: "Field coordinators",      sub: "On-ground execution" },
      { Icon: Heart,  label: "Volunteer support",       sub: "Travel, meals & safety" },
    ],
  },
  {
    id: "systems",
    label: "Systems",
    color: "blue",
    amount: 350000,
    tagline: "The infrastructure that keeps everything running",
    items: [
      { Icon: Globe,     label: "Technology & platform",  sub: "Website, payments, security" },
      { Icon: Building2, label: "Office infrastructure",  sub: "Workspace & utilities" },
      { Icon: Scale,     label: "Legal & compliance",     sub: "Filings, audits, registrations" },
      { Icon: BarChart3, label: "Monitoring & reporting", sub: "Assessments & transparency" },
    ],
  },
  {
    id: "execution",
    label: "Execution",
    color: "teal",
    amount: 330000,
    tagline: "Where planning turns into real-world help",
    items: [
      { Icon: Truck,     label: "Field logistics",      sub: "Transport, fuel, vehicles" },
      { Icon: Megaphone, label: "Communication",        sub: "Awareness & documentation" },
      { Icon: Heart,     label: "Volunteer management", sub: "Kits, training & gear" },
    ],
  },
  {
    id: "support",
    label: "Support",
    color: "orange",
    amount: 100000,
    tagline: "Ensuring readiness for any urgent need",
    items: [
      { Icon: ShieldAlert,    label: "Emergency fund",    sub: "Rapid disaster response" },
      { Icon: MoreHorizontal, label: "Miscellaneous ops", sub: "Banking, courier, insurance" },
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
  },
  blue: {
    active: { bg: "bg-blue-500",    text: "text-white", border: "border-blue-500" },
    idle:   { border: "border-blue-200 dark:border-blue-800",       label: "text-blue-600 dark:text-blue-400" },
    icon:   "text-blue-500",
    iconBg: "bg-blue-50 dark:bg-blue-950/50",
    bar:    "bg-blue-500",
    pct:    "text-blue-600 dark:text-blue-400",
  },
  teal: {
    active: { bg: "bg-teal-500",    text: "text-white", border: "border-teal-500" },
    idle:   { border: "border-teal-200 dark:border-teal-800",       label: "text-teal-600 dark:text-teal-400" },
    icon:   "text-teal-500",
    iconBg: "bg-teal-50 dark:bg-teal-950/50",
    bar:    "bg-teal-500",
    pct:    "text-teal-600 dark:text-teal-400",
  },
  orange: {
    active: { bg: "bg-orange-500",  text: "text-white", border: "border-orange-500" },
    idle:   { border: "border-orange-200 dark:border-orange-800",   label: "text-orange-600 dark:text-orange-400" },
    icon:   "text-orange-500",
    iconBg: "bg-orange-50 dark:bg-orange-950/50",
    bar:    "bg-orange-500",
    pct:    "text-orange-600 dark:text-orange-400",
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
              Annual Breakdown
            </p>
            <h2 className={`text-2xl md:text-3xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}>
              Where every rupee goes
            </h2>
          </div>
          <button
            onClick={onDonate}
            className="shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors"
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
                  className={`w-full text-left rounded-2xl border-2 transition-all duration-200 overflow-hidden ${
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
              <div className="flex items-center justify-between mb-2.5 text-xs">
                <span className={darkMode ? "text-gray-400" : "text-gray-500"}>Total annual budget</span>
                <span className={`font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>₹12,00,000</span>
              </div>
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
                  <div key={p.id} className="flex items-center gap-1.5">
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
                          {pct}% of annual budget
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
                          per year
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Line items */}
                  <div className="p-6 space-y-4">
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
                  <div className={`px-6 pb-6 pt-0`}>
                    <button
                      onClick={onDonate}
                      className={`w-full py-3 rounded-xl text-sm font-semibold border-2 transition-colors ${
                        darkMode
                          ? `border-${p.color}-700 text-${p.color}-400 hover:bg-${p.color}-950/50`
                          : `border-${p.color}-200 text-${p.color}-600 hover:bg-${p.color}-50`
                      }`}
                      style={{ borderColor: active === "people" ? "#10b981" : active === "systems" ? "#3b82f6" : active === "execution" ? "#14b8a6" : "#f97316" }}
                    >
                      Support {p.label} costs
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
