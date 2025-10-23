// components/home/ImpactBanner.jsx
import { heroImages } from '@/lib/constants';

export default function ImpactBanner({ darkMode }) {
  return (
    <section className={`py-14 ${darkMode ? 'bg-zinc-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0"></div>
          <img
            src={heroImages[0]}
            alt="Stand with Gaza"
            className="h-64 md:h-96 w-full object-cover object-[50%_37%]"
          />
          <div className="absolute inset-0 p-6 md:p-10 flex items-center">
            <div className="max-w-xl text-white">
              <h3 className="text-2xl md:text-3xl font-semibold mb-3">
                Stand with Gaza — every day matters
              </h3>
              <p className="text-sm md:text-base text-white/90 mb-5">
                Your daily support delivers relief, care, and dignity to families in urgent need.
              </p>
              <button className="px-6 py-3 cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium text-lg transition-colors">
                Start Giving Daily Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}