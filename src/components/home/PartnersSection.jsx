// components/home/PartnersSection.jsx
import { partners } from '@/lib/constants';

export default function PartnersSection({ darkMode }) {
  const COLORS = {
    neutralHeading: darkMode ? "text-white" : "text-zinc-900",
    neutralBody: darkMode ? "text-zinc-400" : "text-zinc-600",
  };

  return (
    <section id="partners" className={`py-14 ${darkMode ? 'bg-zinc-900' : 'bg-zinc-50'}`}>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-8">
      <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${COLORS.neutralHeading}`}>
        Trusted By
      </h2>
      <p className={`text-sm ${COLORS.neutralBody}`}>
        Trusted partners we collaborate with to deliver impact
      </p>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5">
      {partners.map((partner, index) => (
        <div
          key={index}
          className={`group relative flex flex-col items-center justify-center p-6 rounded-xl overflow-hidden transition-all duration-300 ${
            darkMode ? 'bg-zinc-900' : 'bg-white'
          } border ${darkMode ? 'border-zinc-700 hover:border-zinc-500' : 'border-zinc-200 hover:border-zinc-400'}
          shadow-[0_4px_10px_rgba(156,163,175,0.4)] hover:shadow-[0_6px_14px_rgba(107,114,128,0.6)]`}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
          ></div>
          
          <div className="relative w-20 h-20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 overflow-hidden">
            <img
              src={partner.image}
              alt={partner.name}
              className="w-full h-full object-cover"
            />
          </div>

          <span
            className={`relative mt-3 text-xs font-medium ${COLORS.neutralBody} text-center group-hover:text-emerald-600 transition-colors duration-300`}
          >
            {partner.name}
          </span>
        </div>
      ))}
    </div>
  </div>
</section>

  );
}