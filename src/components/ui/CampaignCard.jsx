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
      className={`flex-shrink-0 w-[280px] sm:w-[320px] md:w-auto snap-center rounded-2xl overflow-hidden transition-all duration-300
        ${darkMode ? 'bg-zinc-800' : 'bg-white'}
        shadow-[0_4px_10px_rgba(156,163,175,0.4)] hover:shadow-[0_6px_14px_rgba(107,114,128,0.6)]`}
    >
      <div className="relative aspect-video">
  {campaign.video ? (
    <video
      src={campaign.video}
      className="w-full h-full object-cover"
      autoPlay
      loop
      muted
      playsInline
    />
  ) : (
    <img
      src={campaign.image}
      alt={campaign.title}
      className="w-full h-full object-cover"
    />
  )}
  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
  
  {/* Top left - Validity Date */}
  {campaign.validityDate && (
    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-semibold text-zinc-900 w-fit">
      Valid till: {campaign.validityDate}
    </div>
  )}

  {/* Top right - Tax Benefit */}
  {campaign.taxBenefit && (
    <div className="absolute top-3 right-3 bg-emerald-600 text-white px-2.5 py-1 rounded-full text-[10px] font-semibold w-fit">
      80G Tax Benefit
    </div>
  )}

  {/* Bottom right - Urgent */}
  {campaign.urgent && (
    <div className="absolute bottom-3 right-3 bg-red-600 text-white px-2.5 py-1 rounded-full text-[10px] font-semibold w-fit">
      Urgent
    </div>
  )}
</div>
      
      <div className="p-5">
        <h3 className={`font-semibold text-base mb-1 min-h-[3rem] flex items-start ${COLORS.neutralHeading}`}>
          {campaign.title}
        </h3>
        <p className={`text-sm ${COLORS.neutralBody} mb-3`}>{campaign.org}</p>
        
        <div className="mb-3">
          <div className="flex justify-between text-sm mb-2">
            <span className={`font-medium ${COLORS.neutralHeading}`}>
              {currency(campaign.raised)}
            </span>
            <span className={COLORS.neutralBody}>
              of {currency(campaign.goal)}
            </span>
          </div>
          <div className={`w-full ${darkMode ? 'bg-zinc-700' : 'bg-zinc-200'} rounded-full h-2`}>
            <div
              className="bg-emerald-600 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3 text-sm">
          <span className={COLORS.neutralBody}>
            <Users className="w-4 h-4 inline mr-1" />
            {campaign.donors} donors
          </span>
          <span className="font-medium text-emerald-600">
            {progress}% funded
          </span>
        </div>

        <button className="w-full cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-medium text-lg transition-colors mb-4">
          Donate Now
        </button>

        <div className="flex items-center justify-between pt-4 border-t border-zinc-200 dark:border-zinc-700">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 text-zinc-600 hover:text-red-600 transition-colors cursor-pointer">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
            <button className="flex items-center gap-1 text-zinc-600 hover:text-emerald-600 transition-colors cursor-pointer">
              <Image
                src="/share.svg"
                alt="Share"
                width={20}
                height={20}
                className="w-5 h-5 rotate-45"
              />
            </button>
          </div>
          <div className="flex items-center gap-1 text-xs bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full">
            <CheckCircle className="w-3 h-3 text-emerald-600" />
            <span className="text-emerald-700 dark:text-emerald-400">Zakaat Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
}