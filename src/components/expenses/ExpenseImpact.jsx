import { X, Check } from "lucide-react";

export default function ExpenseImpact({ darkMode, onDonate }) {
  const withoutItems = [
    "Delays in aid delivery",
    "No team coordination",
    "Donations unaccounted",
    "Families left waiting",
  ];

  const withItems = [
    "Rapid, coordinated response",
    "Fully transparent processes",
    "Verified distribution",
    "Families helped fast",
  ];

  return (
    <section className={`py-16 md:py-20 ${darkMode ? "bg-gray-900" : "bg-white"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* ── Split contrast — two completely separate cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Without */}
          <div
            className={`rounded-2xl p-8 md:p-10 ${
              darkMode ? "bg-gray-950" : "bg-gray-50"
            }`}
          >
            <p
              className={`text-xs font-semibold uppercase tracking-widest mb-4 ${
                darkMode ? "text-red-400" : "text-red-500"
              }`}
            >
              Without operational support
            </p>
            <h3
              className={`text-xl font-bold mb-6 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Help doesn't reach in time
            </h3>
            <ul className="space-y-3">
              {withoutItems.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                      darkMode ? "bg-red-950/60" : "bg-red-50"
                    }`}
                  >
                    <X
                      size={11}
                      className={darkMode ? "text-red-400" : "text-red-500"}
                    />
                  </div>
                  <span
                    className={`text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* With */}
          <div
            className={`rounded-2xl p-8 md:p-10 ${
              darkMode ? "bg-gray-800/40" : "bg-emerald-50/60"
            }`}
          >
            <p
              className={`text-xs font-semibold uppercase tracking-widest mb-4 ${
                darkMode ? "text-emerald-400" : "text-emerald-600"
              }`}
            >
              With TPF Aid platform support
            </p>
            <h3
              className={`text-xl font-bold mb-6 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Every effort becomes impact
            </h3>
            <ul className="space-y-3">
              {withItems.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                      darkMode ? "bg-emerald-950/60" : "bg-emerald-100"
                    }`}
                  >
                    <Check
                      size={11}
                      className={
                        darkMode ? "text-emerald-400" : "text-emerald-600"
                      }
                    />
                  </div>
                  <span
                    className={`text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Quote / CTA block — completely separate element ── */}
        <div className="rounded-2xl p-8 md:p-12 text-center bg-emerald-500">
          <p className="text-white text-xl md:text-2xl font-bold leading-snug max-w-2xl mx-auto">
            "Operations are not overhead — they are the foundation of every
            successful relief effort."
          </p>
          <button
            onClick={onDonate}
            className="mt-8 px-8 py-3 rounded-xl font-semibold text-sm bg-white text-emerald-700 hover:bg-emerald-50 transition-colors"
          >
            Support Platform Operations
          </button>
        </div>
      </div>
    </section>
  );
}