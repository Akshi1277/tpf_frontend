import { X, Check, Heart, AlertTriangle } from "lucide-react";

export default function ExpenseImpact({ darkMode, onDonate }) {
  const withoutItems = [
    { text: "Aid takes days longer to reach families", detail: "No one to coordinate the response" },
    { text: "Donations go untracked and unverified", detail: "No systems to record what was spent" },
    { text: "Volunteers show up with no direction", detail: "No coordination or planning support" },
    { text: "Families wait while we figure things out", detail: "Delays cost lives in emergencies" },
  ];

  const withItems = [
    { text: "Help reaches families within hours", detail: "A trained team responds immediately" },
    { text: "Every rupee is tracked and reported", detail: "Full transparency for every donor" },
    { text: "Volunteers are trained, equipped, ready", detail: "Operations run like a well-oiled machine" },
    { text: "Families get help when it matters most", detail: "Speed and care, every single time" },
  ];

  return (
    <section className={`py-16 md:py-20 ${darkMode ? "bg-gray-900" : "bg-white"}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">

        {/* Section header */}
        <div className="text-center mb-8">
          <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${darkMode ? "text-emerald-400" : "text-emerald-600"}`}>
            Why it matters
          </p>
          <h2 className={`text-2xl md:text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
            The difference your support makes
          </h2>
          <p className={`text-sm mt-2 max-w-xl mx-auto ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            Behind every family we help is an invisible layer of work — and that work needs funding too.
          </p>
        </div>

        {/* ── Split contrast cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Without */}
          <div className={`rounded-2xl p-7 border-2 ${
            darkMode
              ? "bg-gray-950 border-red-900/40"
              : "bg-red-50/60 border-red-100"
          }`}>
            <div className="flex items-center gap-2.5 mb-5">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                darkMode ? "bg-red-950/60" : "bg-red-100"
              }`}>
                <AlertTriangle size={14} className="text-red-500" />
              </div>
              <div>
                <p className={`text-[10px] font-bold uppercase tracking-widest ${darkMode ? "text-red-400/70" : "text-red-400"}`}>
                  Without your support
                </p>
                <h3 className={`text-base font-bold leading-tight ${darkMode ? "text-white" : "text-gray-900"}`}>
                  Help doesn't reach in time
                </h3>
              </div>
            </div>
            <ul className="space-y-3.5">
              {withoutItems.map((item) => (
                <li key={item.text} className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    darkMode ? "bg-red-950/60" : "bg-red-100"
                  }`}>
                    <X size={10} className="text-red-500" />
                  </div>
                  <div>
                    <p className={`text-sm font-semibold leading-snug ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
                      {item.text}
                    </p>
                    <p className={`text-xs mt-0.5 ${darkMode ? "text-gray-600" : "text-gray-400"}`}>
                      {item.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* With */}
          <div className={`rounded-2xl p-7 border-2 ${
            darkMode
              ? "bg-emerald-950/20 border-emerald-900/50"
              : "bg-emerald-50/70 border-emerald-100"
          }`}>
            <div className="flex items-center gap-2.5 mb-5">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                darkMode ? "bg-emerald-950/60" : "bg-emerald-100"
              }`}>
                <Heart size={14} className="text-emerald-500" fill="currentColor" />
              </div>
              <div>
                <p className={`text-[10px] font-bold uppercase tracking-widest ${darkMode ? "text-emerald-400/70" : "text-emerald-500/80"}`}>
                  With your support
                </p>
                <h3 className={`text-base font-bold leading-tight ${darkMode ? "text-white" : "text-gray-900"}`}>
                  Every effort becomes impact
                </h3>
              </div>
            </div>
            <ul className="space-y-3.5">
              {withItems.map((item) => (
                <li key={item.text} className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    darkMode ? "bg-emerald-950/60" : "bg-emerald-100"
                  }`}>
                    <Check size={10} className="text-emerald-500" />
                  </div>
                  <div>
                    <p className={`text-sm font-semibold leading-snug ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
                      {item.text}
                    </p>
                    <p className={`text-xs mt-0.5 ${darkMode ? "text-gray-600" : "text-gray-400"}`}>
                      {item.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Quote / CTA block ── */}
        <div className="relative rounded-2xl overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600" />
          {/* Decorative circles */}
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5" />
          <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-white/5" />

          <div className="relative px-8 py-10 md:px-12 md:py-12 text-center">
            <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center mx-auto mb-5">
              <Heart size={18} className="text-white" fill="currentColor" />
            </div>
            <p className="text-white text-xl md:text-2xl font-bold leading-snug max-w-2xl mx-auto">
              "Operations are not overhead — they are the reason families get help at all."
            </p>
            <p className="text-emerald-100/80 text-sm mt-3 max-w-md mx-auto">
              Without a functioning team, platform, and system behind it — no donation reaches anyone.
            </p>
            <button
              onClick={onDonate}
              className="mt-7 inline-flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-sm bg-white text-emerald-700 hover:bg-emerald-50 transition-all shadow-lg shadow-black/10 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Heart size={14} fill="currentColor" />
              Yes, I want to help keep this running
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}