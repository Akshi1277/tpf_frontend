// components/ui/CampaignCard.jsx
import Image from 'next/image';
import { Users, CheckCircle } from 'lucide-react';
import { currency } from '@/lib/utils';

export default function CampaignCard({ campaign, darkMode }) {
  const progress = Math.min(100, Math.round((campaign.raised / campaign.goal) * 100));

  const COLORS = {
    neutralHeading: darkMode ? "text-white" : "text-zinc-900",
    neutralBody: darkMode ? "text-zinc-400" : "text-zinc-600",
  };

  return (
    <div 
      className={`flex-shrink-0 w-[280px] sm:w-[320px] md:w-auto snap-center rounded-2xl overflow-hidden transition-all duration-300 relative flex flex-col
        ${darkMode ? 'bg-zinc-800' : 'bg-white'}
        shadow-[0_4px_10px_rgba(156,163,175,0.4)] hover:shadow-[0_6px_14px_rgba(107,114,128,0.6)]`}
    >
     {campaign.video ? (
  <>
    <video
      src={campaign.video}
      className="absolute inset-0 w-full h-full object-cover"
      autoPlay
      loop
      muted
      playsInline
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/80"></div>

    {/* ✅ Move badges here */}
    {campaign.urgent && (
      <div className="absolute top-3 left-3 z-20 bg-red-600 text-white px-2.5 py-1 rounded-full text-[10px] font-semibold w-fit">
        Urgent
      </div>
    )}
    {campaign.taxBenefit && (
      <div className="absolute top-3 right-3 z-20 bg-emerald-600 text-white px-2.5 py-1 rounded-full text-[10px] font-semibold w-fit">
        Tax Benefits
      </div>
    )}

    <div className="aspect-video invisible"></div>
          
          {/* Content overlay for video cards */}
          <div className="relative z-10 p-4 sm:p-5 flex-1 flex flex-col justify-between">
           

            {/* Bottom content section */}
            <div>
              <h3 className="font-semibold text-sm sm:text-base mb-1 line-clamp-2 h-[2.5rem] sm:h-[3rem] text-white">
                {campaign.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-200 mb-3 truncate">{campaign.org}</p>
              
              <div className="mb-3">
                <div className="flex justify-between text-xs sm:text-sm mb-2">
                  <span className="font-medium text-white">
                    {currency(campaign.raised)}
                  </span>
                  <span className="text-zinc-200">
                    of {currency(campaign.goal)}
                  </span>
                </div>
                
                 {/* Days Left - Below amount */}
              {campaign.validityDate && (
                <div className="mb-2">
                  <span className="text-[10px] sm:text-xs font-semibold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                    {campaign.validityDate} Days Left
                  </span>
                </div>
              )}

                
                <div className="w-full bg-zinc-700/50 rounded-full h-2">
                  <div
                    className="bg-emerald-600 h-2 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-3 text-xs sm:text-sm">
                <span className="text-zinc-200">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                  {campaign.donors} donors
                </span>
                <span className="font-medium text-emerald-400">
                  {progress}% funded
                </span>
              </div>

              <button className="w-full cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-medium text-base sm:text-lg transition-colors mb-3 sm:mb-4">
                Donate Now
              </button>

              <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-zinc-600/50">
                <div className="flex items-center gap-3 sm:gap-4">
                  <button className="flex items-center gap-1 text-zinc-300 hover:text-red-400 transition-colors cursor-pointer">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </button>
                  <button className="flex items-center gap-1 text-zinc-300 hover:text-emerald-400 transition-colors cursor-pointer">
                    <Image
                      src="/share.svg"
                      alt="Share"
                      width={20}
                      height={20}
                      className="w-4 h-4 sm:w-5 sm:h-5 rotate-45"
                    />
                  </button>
                </div>
                <div className="flex items-center gap-1 text-[10px] sm:text-xs bg-emerald-900/40 px-2 sm:px-3 py-1 rounded-full">
                  <CheckCircle className="w-3 h-3 text-emerald-500" />
                  <span className="text-emerald-300 whitespace-nowrap">Zakaat Verified</span>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        // Image card layout - original structure
        <>
          <div className="relative aspect-video">
            <img
              src={campaign.image}
              alt={campaign.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            
            {/* Tax Benefit - Top right */}
            {campaign.taxBenefit && (
              <div className="absolute top-3 right-3 bg-emerald-600 text-white px-2.5 py-1 rounded-full text-[10px] font-semibold w-fit">
                Tax Benefits
              </div>
            )}

            {/* Urgent - Bottom right */}
            {campaign.urgent && (
              <div className="absolute top-3 left-3 bg-red-600 text-white px-2.5 py-1 rounded-full text-[10px] font-semibold w-fit">
                Urgent
              </div>
            )}
          </div>
          
          <div className="p-4 sm:p-5">
            <h3 className={`font-semibold text-sm sm:text-base mb-1 line-clamp-2 h-[2.5rem] sm:h-[3rem] ${COLORS.neutralHeading}`}>
              {campaign.title}
            </h3>
            <p className={`text-xs sm:text-sm ${COLORS.neutralBody} mb-3 truncate`}>{campaign.org}</p>
            
            <div className="mb-3">
              <div className="flex justify-between text-xs sm:text-sm mb-2">
                <span className={`font-medium ${COLORS.neutralHeading}`}>
                  {currency(campaign.raised)}
                </span>
                <span className={COLORS.neutralBody}>
                  of {currency(campaign.goal)}
                </span>
              </div>
              
           {campaign.validityDate && (
                <div className="mb-2">
                  <span className="text-[10px] sm:text-xs font-semibold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                    {campaign.validityDate} Days Left
                  </span>
                </div>
              )}

              
              <div className={`w-full ${darkMode ? 'bg-zinc-700' : 'bg-zinc-200'} rounded-full h-2`}>
                <div
                  className="bg-emerald-600 h-2 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-3 text-xs sm:text-sm">
              <span className={COLORS.neutralBody}>
                <Users className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                {campaign.donors} donors
              </span>
              <span className="font-medium text-emerald-600">
                {progress}% funded
              </span>
            </div>

            <button className="w-full cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-medium text-base sm:text-lg transition-colors mb-3 sm:mb-4">
              Donate Now
            </button>

            <div className={`flex items-center justify-between pt-3 sm:pt-4 border-t ${darkMode ? 'border-zinc-700' : 'border-zinc-200'}`}>
              <div className="flex items-center gap-3 sm:gap-4">
                <button className={`flex items-center gap-1 transition-colors cursor-pointer ${darkMode ? 'text-zinc-400 hover:text-red-400' : 'text-zinc-600 hover:text-red-600'}`}>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </button>
                <button className={`flex items-center gap-1 transition-colors cursor-pointer ${darkMode ? 'text-zinc-400 hover:text-emerald-400' : 'text-zinc-600 hover:text-emerald-600'}`}>
                  <Image
                    src="/share.svg"
                    alt="Share"
                    width={20}
                    height={20}
                    className="w-4 h-4 sm:w-5 sm:h-5 rotate-45"
                  />
                </button>
              </div>
              <div className={`flex items-center gap-1 text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full ${darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'}`}>
                <CheckCircle className="w-3 h-3 text-emerald-600" />
                <span className={`${darkMode ? 'text-emerald-400' : 'text-emerald-700'} whitespace-nowrap`}>Zakaat Verified</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}