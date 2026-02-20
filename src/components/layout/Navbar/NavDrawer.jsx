'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { X, Heart, Globe, Award, Search, Building2, Send, Headphones, LayoutDashboard, PlusCircle, User2Icon, Plus, Leaf } from 'lucide-react';
import { Building2 as OrgIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Drawer } from 'vaul';
import { getMediaUrl } from '@/utils/media';

// Lightweight fade-in using CSS only (no framer-motion staggering in list)
const FadeIn = ({ children, delay = 0, className = '' }) => (
  <div
    className={className}
    style={{
      animation: `navFadeUp 0.3s ease both`,
      animationDelay: `${delay}ms`,
    }}
  >
    {children}
  </div>
);

export default function MobileMenu({
  open,
  onOpenChange,
  darkMode,
  userInfo,
  isOrganization,
  isVolunteer,
  donationCount,
  greeting,
  searchQuery,
  setSearchQuery,
  filteredCampaigns,
  handleSearchCommit,
  handleAuthNavigation,
  onLogoutRequest,
  isLoggingOut,
}) {
  const router = useRouter();
  const scrollRef = useRef(null);
  const [showBottomFade, setShowBottomFade] = useState(true);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      setShowBottomFade(scrollTop + clientHeight < scrollHeight - 20);
    }
  };

  const close = () => onOpenChange(false);

  const regularMenuItems = [
    { name: 'My Profile', icon: User2Icon, isLucide: true, path: '/profile/userprofile' },
    { name: 'My Donations', icon: Heart, isLucide: true, path: '/profile/mydonation' },
    { name: 'My Wishlist', icon: Plus, isLucide: true, path: '/profile/my-campaign' },
    { name: 'Daily Givers', icon: Leaf, isLucide: true, path: '/permanent-donor/daily' },
    { name: 'Zakat', icon: '/TPFAid-Icon-Zakat-1.svg', isLucide: false, path: '/zakat-calculator' },
  ];

  const organizationMenuItems = [
    { name: 'Organization Dashboard', icon: LayoutDashboard, isLucide: true, path: '/organization/profile/dashboard' },
    { name: 'My Donations', icon: Heart, isLucide: true, path: '/profile/mydonation' },
    { name: 'Request a Fundraiser', icon: PlusCircle, isLucide: true, path: '/organization/profile/my-campaigns/create' },
    { name: 'My Campaigns', icon: OrgIcon, isLucide: true, path: '/organization/profile/my-campaigns' },
    { name: 'Zakat', icon: '/TPFAid-Icon-Zakat-1.svg', isLucide: false, path: '/zakat-calculator' },
  ];

  const activeMenuItems = isOrganization ? organizationMenuItems : regularMenuItems;

  return (
    <>
      <style>{`
        @keyframes navFadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <Drawer.Root open={open} onOpenChange={onOpenChange} direction="right">
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm" />
          <Drawer.Content className={`fixed right-0 top-0 h-full w-[85%] max-w-sm z-[70] flex flex-col outline-none shadow-2xl
            ${darkMode ? 'bg-zinc-950 border-l border-zinc-800' : 'bg-white border-l border-zinc-200'}`}>

            <Drawer.Title className="sr-only">Navigation Menu</Drawer.Title>

            {/* Top Bar — auth buttons + close */}
            <div className="flex-shrink-0 flex items-center justify-between px-4 py-3">
              {!userInfo ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => { handleAuthNavigation('/signup'); close(); }}
                    className="px-4 py-2 rounded-xl cursor-pointer text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 transition-all"
                  >
                    Sign up
                  </button>
                  <button
                    onClick={() => { handleAuthNavigation('/login'); close(); }}
                    className={`px-4 py-2 cursor-pointer rounded-xl text-sm font-semibold transition-all active:scale-95 border
                      ${darkMode
                        ? 'border-zinc-700 text-zinc-100 hover:bg-zinc-800'
                        : 'border-zinc-300 text-zinc-800 hover:bg-zinc-100'}`}
                  >
                    Log in
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { onLogoutRequest(); close(); }}
                  disabled={isLoggingOut}
                  className={`text-xs font-bold tracking-wide uppercase cursor-pointer py-2
                    ${isLoggingOut ? 'text-zinc-500' : 'text-red-500 hover:text-red-400'}`}
                >
                  {isLoggingOut ? 'Signing Out…' : 'Sign Out'}
                </button>
              )}
              <button
                onClick={close}
                className={`w-8 h-8 cursor-pointer rounded-full flex items-center justify-center transition-colors flex-shrink-0
                  ${darkMode ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-zinc-100 text-zinc-600'}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto px-5 pb-8 space-y-4 scrollbar-nav"
              data-lenis-prevent
            >
              {/* ── IMPACT / CTA CARD ─────────────────────── */}
              <FadeIn delay={40}>
                {userInfo ? (
                  <div className={`p-4 rounded-2xl border overflow-hidden relative
                    ${darkMode
                      ? 'bg-zinc-900/60 border-zinc-800/60'
                      : 'bg-gradient-to-br from-emerald-50 to-teal-50/60 border-emerald-100/60'}`}>
                    <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl opacity-20 bg-emerald-400 pointer-events-none" />
                    <span className={`text-[9px] font-bold tracking-[0.18em] uppercase block mb-0.5
                      ${darkMode ? 'text-zinc-500' : 'text-emerald-600/70'}`}>
                      Your Impact
                    </span>
                    <h3 className={`text-base font-bold mb-0.5 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                      {greeting}, {userInfo.fullName?.split(' ')[0]}!
                    </h3>
                    <p className={`text-xs leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      You've supported{' '}
                      <span className="font-bold text-emerald-500">{donationCount}</span>{' '}
                      {donationCount === 1 ? 'cause' : 'causes'} this month.
                    </p>
                    <div className="mt-2.5 flex items-center gap-2">
                      <div className="flex -space-x-1.5">
                        {[0, 1, 2].map((i) => (
                          <div key={i} className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                            ${darkMode ? 'border-zinc-950 bg-zinc-800' : 'border-white bg-emerald-100'}`}>
                            <Heart className="w-2.5 h-2.5 text-emerald-500" fill="currentColor" />
                          </div>
                        ))}
                      </div>
                      <span className={`text-[10px] font-medium ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                        Keep spreading kindness
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className={`p-4 rounded-2xl border
                    ${darkMode ? 'bg-zinc-900/60 border-zinc-800/60' : 'bg-zinc-50 border-zinc-200'}`}>
                    <h3 className={`text-base font-bold mb-1.5 text-center ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                      Be the Change
                    </h3>
                    <p className={`text-xs text-center mb-3 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      Join thousands of donors making a real impact today.
                    </p>
                    <button
                      onClick={() => { handleAuthNavigation('/all-campaigns'); close(); }}
                      className="w-full py-2 cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm transition-colors"
                    >
                      Create Impact
                    </button>
                  </div>
                )}
              </FadeIn>

              {/* ── SEARCH ─────────────────────────────────── */}
              <FadeIn delay={80}>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearchCommit}
                    placeholder="I want to support..."
                    className={`w-full px-4 py-2.5 pl-10 rounded-xl border text-sm transition-colors
                      ${darkMode
                        ? 'bg-zinc-900 text-white placeholder-zinc-500 border-zinc-800 focus:border-emerald-500'
                        : 'bg-zinc-50 text-zinc-900 placeholder-zinc-400 border-zinc-200 focus:border-emerald-500'
                      } focus:outline-none`}
                  />
                  <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`} />

                  {searchQuery && (
                    <div className={`absolute top-full left-0 right-0 mt-1.5 rounded-xl overflow-hidden border shadow-xl z-10
                      ${darkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-zinc-100'}`}>
                      {filteredCampaigns.length > 0 ? filteredCampaigns.map((campaign) => (
                        <div
                          key={campaign._id}
                          onClick={() => { router.push(`/campaign/${campaign.slug}`); close(); setSearchQuery(''); }}
                          className={`flex items-center gap-3 p-2.5 cursor-pointer border-b last:border-0 transition-colors
                            ${darkMode ? 'border-zinc-700 hover:bg-zinc-700' : 'border-zinc-50 hover:bg-emerald-50/40'}`}
                        >
                          <div className="relative w-9 h-9 rounded-lg overflow-hidden flex-shrink-0">
                            <Image src={campaign.imageUrl ? getMediaUrl(campaign.imageUrl) : '/placeholder-campaign.jpg'} alt={campaign.title} fill className="object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className={`text-xs font-bold truncate ${darkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>{campaign.title}</h4>
                            <p className={`text-[10px] ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>{campaign.organization}</p>
                          </div>
                        </div>
                      )) : (
                        <div className="p-3 text-center text-zinc-400 text-xs">No causes found</div>
                      )}
                    </div>
                  )}
                </div>
              </FadeIn>

              {/* ── DISCOVER ───────────────────────────────── */}
              <FadeIn delay={110}>
                <Link
                  href="/#campaigns"
                  className={`flex items-center gap-2.5 text-sm font-medium transition-colors
                    ${darkMode ? 'text-zinc-300 hover:text-white' : 'text-zinc-700 hover:text-emerald-600'}`}
                  onClick={close}
                >
                  <Globe className="w-4.5 h-4.5 flex-shrink-0" style={{ width: 18, height: 18 }} />
                  Discover inspiring campaigns →
                </Link>
              </FadeIn>

              {/* ── VOLUNTEER ──────────────────────────────── */}
              {!isOrganization && (
                <FadeIn delay={130}>
                  <Link
                    href={isVolunteer ? '/profile/vouchers' : '/volunteer/register'}
                    className="flex items-center gap-3"
                    onClick={close}
                  >
                    <div className={`p-1.5 rounded-lg flex-shrink-0 ${darkMode ? 'bg-zinc-800' : 'bg-zinc-100'}`}>
                      <Award className={`w-4 h-4 ${isVolunteer ? 'text-emerald-500' : 'text-zinc-400'}`} />
                    </div>
                    <span className={`font-bold text-sm ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                      {isVolunteer ? 'Proud Service Hero' : 'Join as a Volunteer'}
                    </span>
                  </Link>
                </FadeIn>
              )}

              <FadeIn delay={150}>
                <div className={`h-px ${darkMode ? 'bg-zinc-800' : 'bg-zinc-100'}`} />
              </FadeIn>

              {/* ── MENU ITEMS ─────────────────────────────── */}
              <FadeIn delay={160}>
                <nav className="space-y-3.5">
                  {activeMenuItems.map((item, i) => (
                    <Link
                      key={item.name}
                      href={item.path || '#'}
                      className={`flex items-center gap-3.5 text-sm font-medium transition-colors
                        ${darkMode ? 'text-zinc-300 hover:text-white' : 'text-zinc-700 hover:text-emerald-600'}`}
                      onClick={close}
                    >
                      <span className="w-5 flex-shrink-0 flex justify-center">
                        {item.isLucide
                          ? <item.icon className="w-[18px] h-[18px]" />
                          : <Image src={item.icon} alt={item.name} width={18} height={18} />
                        }
                      </span>
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </FadeIn>

              <FadeIn delay={200}>
                <div className={`h-px ${darkMode ? 'bg-zinc-800' : 'bg-zinc-100'}`} />
              </FadeIn>

              {/* ── START FUNDRAISING ──────────────────────── */}
              {!isOrganization && (
                <FadeIn delay={220}>
                  <div className="space-y-2">
                    <p className={`text-[10px] font-bold tracking-widest uppercase ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                      Start
                    </p>
                    <Link
                      href="/financial-aid"
                      onClick={close}
                      className={`flex items-center justify-between gap-3 p-4 rounded-2xl border transition-colors
                        ${darkMode
                          ? 'bg-zinc-900/60 border-emerald-500/20 hover:border-emerald-500/40'
                          : 'bg-emerald-50/40 border-emerald-200 hover:border-emerald-300'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${darkMode ? 'bg-emerald-500/10' : 'bg-white shadow-sm'}`}>
                          <Send className="w-4 h-4 text-emerald-500" />
                        </div>
                        <div>
                          <span className={`font-bold text-sm block ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                            Start fundraising
                          </span>
                          <span className={`text-[11px] ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
                            Take the first step
                          </span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-emerald-600 font-bold text-sm">0%</span>
                        <span className="block text-[9px] text-emerald-500/80 uppercase tracking-tight">fee</span>
                      </div>
                    </Link>
                  </div>
                </FadeIn>
              )}

              {/* ── ORGANIZATIONS (distinct card) ─────────── */}
              {!userInfo && (
                <FadeIn delay={240}>
                  <div className={`rounded-2xl border p-4 space-y-3
                    ${darkMode
                      ? 'bg-indigo-950/30 border-indigo-900/60'
                      : 'bg-indigo-50 border-indigo-200'}`}>
                    <p className={`text-[10px] font-bold tracking-widest uppercase
                      ${darkMode ? 'text-indigo-400' : 'text-indigo-500'}`}>
                      Organizations
                    </p>
                    <Link
                      href="/organization/login"
                      className={`cursor-pointer flex items-center gap-3 text-sm font-semibold transition-colors
                        ${darkMode ? 'text-indigo-300 hover:text-white' : 'text-indigo-700 hover:text-indigo-900'}`}
                      onClick={close}
                    >
                      <Building2 className="w-[18px] h-[18px] flex-shrink-0" />
                      Organization Login
                    </Link>
                  </div>
                </FadeIn>
              )}

              {/* ── SUPPORT (separate, neutral) ────────────── */}
              <FadeIn delay={255}>
                <Link
                  href="/contactus"
                  className={`flex items-center gap-3 p-3.5 rounded-xl border text-sm font-medium transition-colors
                    ${darkMode
                      ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700'
                      : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:border-zinc-300'}`}
                  onClick={close}
                >
                  <Headphones className="w-[18px] h-[18px] flex-shrink-0" />
                  Support
                </Link>
              </FadeIn>

            </div>


          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
}