
import { communities } from '@/lib/constants';

export default function CommunitiesSection({ darkMode }) {
  const COLORS = {
    neutralHeading: darkMode ? "text-white" : "text-zinc-900",
    neutralBody: darkMode ? "text-zinc-400" : "text-zinc-600",
  };

  return (
    <section id="communities" className={`py-14 ${darkMode ? 'bg-zinc-900' : 'bg-zinc-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${COLORS.neutralHeading}`}>
            Communities
          </h2>
          <p className={`text-sm ${COLORS.neutralBody}`}>
            Communities you would like to join
          </p>
        </div>

        <div
          id="communities-container"
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-4 md:overflow-visible"
        >
          {communities.map((community, index) => (
            <div
              key={`community-${index}`}
              className={`
                flex-shrink-0 w-[280px] snap-center rounded-2xl overflow-hidden 
                group cursor-pointer transition-all duration-300 hover:scale-105
                ${darkMode ? 'bg-zinc-800' : 'bg-white'}
                shadow-lg hover:shadow-2xl
              `}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={community.image}
                  alt={community.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                  <h3 className="font-semibold text-white text-lg mb-2 drop-shadow-md">
                    {community.name}
                  </h3>
                  <button
                    className="cursor-pointer text-xs flex items-center justify-center gap-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl transition-colors duration-200"
                  >
                    Join Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
