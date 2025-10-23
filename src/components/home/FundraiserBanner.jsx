// components/home/StartFundraiserBanner.jsx

export default function StartFundraiserBanner({ darkMode }) {
  return (
    <section className={`py-14 ${darkMode ? 'bg-zinc-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
          <img
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&q=80"
            alt="Start Your Fundraiser"
            className="h-64 md:h-96 w-full object-cover"
          />
          <div className="absolute inset-0 p-6 md:p-10 flex items-center">
            <div className="max-w-xl text-white">
              <h3 className="text-2xl md:text-3xl font-semibold mb-3">
                Start your fundraiser in minutes
              </h3>
              <p className="text-sm md:text-base text-white/90 mb-5">
                No platform fees. Reach millions of donors worldwide. Turn your cause into impact today.
              </p>
              <button className="px-6 py-3 cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium text-lg transition-colors">
                Create Campaign Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}