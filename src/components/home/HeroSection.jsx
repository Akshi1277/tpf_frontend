"use client";

import { useRouter } from "next/navigation";
import { useCMS } from "@/app/CMSContext";
import { getMediaUrl } from "@/utils/media";


export default function HeroSection({ darkMode }) {
  const router = useRouter();

  const cms = useCMS();
  const hero = cms?.find((item) => item.type === "hero");

  // Optional UI fallback while CMS first arrives
  if (!hero) {
    return (
      <section className="h-[650px] flex items-center justify-center bg-gray-900">
        <h1 className="text-4xl text-white font-bold">Loading...</h1>
      </section>
    );
  }

  return (
    <section className="relative min-h-[560px] md:h-[600px] lg:h-[650px] overflow-hidden">

      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={getMediaUrl(hero.image)}
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
      </div>

      <div className="relative h-full w-full flex items-center">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <div className="max-w-[90%] sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl space-y-4">
            <h1 className="text-3xl mt-32 sm:mt-24 md:mt-0 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
              {hero.title}
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-zinc-200 leading-relaxed">
              {hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4">
              <button
                onClick={() => router.push(hero.buttonRoute || "/")}
                className="w-full cursor-pointer sm:w-auto px-6 md:px-8 lg:px-10 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold shadow-lg"
              >
                 {hero.buttonText || "Start Giving" }
              </button>

              <button
                onClick={() => router.push("/about")}
                className={`w-full cursor-pointer sm:w-auto px-6 md:px-8 lg:px-10 py-3 rounded-lg font-semibold border-2 transition-colors
                  ${darkMode
                    ? "border-white text-white hover:bg-white/10"
                    : "border-white text-white hover:bg-white/20"
                  }`}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
