// components/home/PulseSection.jsx
import { currency } from '@/lib/utils';
import { recentDonations } from '@/lib/constants';

export default function PulseSection({ darkMode, totalRaised }) {
  const COLORS = {
    neutralHeading: darkMode ? "text-white" : "text-zinc-900",
    neutralBody: darkMode ? "text-zinc-400" : "text-zinc-600",
  };

  return (
    <section id="pulse" className={`py-14 ${darkMode ? 'bg-zinc-800' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${COLORS.neutralHeading}`}>
            Pulse of the Ummah
          </h2>
          <p className={`text-sm ${COLORS.neutralBody}`}>
            Live generosity snapshot
          </p>
        </div>
        
        <div className="flex flex-col items-center mb-10">
          <div className={`relative inline-block px-8 py-4 rounded-2xl ${darkMode ? 'bg-zinc-800' : 'bg-zinc-50'} shadow-[0_4px_10px_rgba(156,163,175,0.4)] hover:shadow-[0_6px_14px_rgba(107,114,128,0.6)]`}>
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-500 to-emerald-400 bg-clip-text text-transparent">
              {currency(totalRaised)}
            </div>
          </div>
          <div className={`text-sm ${COLORS.neutralBody} mt-3`}>raised in the last hour</div>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {recentDonations.map((donation, index) => (
              <div 
                key={index}
                className={`relative group p-5 rounded-xl text-center overflow-hidden transition-all duration-300 ${
                  darkMode ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-zinc-50 hover:bg-white'
                } border ${darkMode ? 'border-zinc-700' : 'border-zinc-200'} hover:border-zinc-400
                shadow-[0_4px_10px_rgba(156,163,175,0.4)] hover:shadow-[0_6px_14px_rgba(107,114,128,0.6)]`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className={`text-lg font-bold ${COLORS.neutralHeading} mb-1`}>
                    {currency(donation.amount)}
                  </div>
                  <div className={`text-xs ${COLORS.neutralBody}`}>
                    {donation.name}
                  </div>
                  <div className={`text-xs ${COLORS.neutralBody} opacity-60 mt-1`}>
                    {donation.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}