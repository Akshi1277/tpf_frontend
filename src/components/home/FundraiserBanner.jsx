// components/home/StartFundraiserBanner.jsx
import Image from "next/image";
import { useCMS } from "@/app/CMSContext";
import { getMediaUrl } from "@/utils/media";
import Link from "next/link";
export default function StartFundraiserBanner({ darkMode }) {
  const cms = useCMS();
  const cmsBeforeFooter = cms.filter(item => item.type === "before-footer");

  if (!cmsBeforeFooter || cmsBeforeFooter.length === 0) {
    return null;
  }

  return (
    <section className={`py-8 sm:py-10 md:py-14 ${darkMode ? 'bg-zinc-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">

          {/* Image with responsive heights */}
          <img
            src={getMediaUrl(cmsBeforeFooter[0]?.image)}
            alt="Start Your Fundraiser"
            className="h-72 sm:h-80 md:h-80 lg:h-96 w-full object-cover"
            loading="lazy"
          />

          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10"></div>

          {/* Content overlay with responsive positioning and sizing */}
          <div className="absolute inset-0 z-20 p-4 sm:p-6 md:p-8 lg:p-10 flex items-center">
            <div className="w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl text-white">
              {/* Title with responsive sizing */}
              <h3 className="text-xl sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-2 sm:mb-2.5 md:mb-3 leading-tight">
                {cmsBeforeFooter[0]?.title}
              </h3>

              {/* Description with responsive sizing and line clamping */}
              <p className="text-sm sm:text-sm md:text-base text-white/90 mb-3 sm:mb-4 md:mb-5 line-clamp-3 sm:line-clamp-3 md:line-clamp-none leading-relaxed">
                {cmsBeforeFooter[0]?.description}
              </p>

              {/* Button with responsive sizing */}
              {cmsBeforeFooter[0]?.buttonRoute ? (
                <Link href={cmsBeforeFooter[0].buttonRoute}>
                  <button className="w-full sm:w-auto px-5 sm:px-5 md:px-6 lg:px-7 py-2.5 sm:py-2.5 md:py-3 cursor-pointer bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-lg font-medium text-sm sm:text-base md:text-lg transition-colors shadow-lg hover:shadow-xl">
                    {cmsBeforeFooter[0]?.buttonText}
                  </button>
                </Link>
              ) : (
                <button
                  disabled
                  className="w-full sm:w-auto px-5 py-2.5 bg-gray-400 text-white rounded-lg cursor-not-allowed"
                >
                  {cmsBeforeFooter[0]?.buttonText}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}