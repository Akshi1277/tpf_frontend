'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X, Moon, Sun, User2Icon } from 'lucide-react';
import { Plus, Heart, Leaf } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useLogoutUserMutation } from '@/utils/slices/authApiSlice';
import { useFetchCampaignsQuery } from '@/utils/slices/campaignApiSlice';
import { Search, MapPin, Building2, TrendingUp } from 'lucide-react';
import { useAppToast } from '@/app/AppToastContext';
import { getMediaUrl } from '@/utils/media';
import { Award } from 'lucide-react';

export default function Navbar({ darkMode, setDarkMode, scrolled }) {
  const dispatch = useDispatch()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { showToast } = useAppToast();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const { data: campaignData, isLoading } = useFetchCampaignsQuery();
  const campaigns = campaignData?.campaigns || [];

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    campaign.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    campaign.organization?.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5);

  const [logoutUser] = useLogoutUserMutation();
  useEffect(() => setHasMounted(true), []);
  const userInfo = useSelector((state) => state.auth.userInfo);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.search-container')) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode')
    if (savedMode !== null) {
      setDarkMode(savedMode === 'true')
    }
  }, [setDarkMode])

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode)
    window.dispatchEvent(new Event('darkModeChanged'))
  }, [darkMode])

  const handleAuthNavigation = (path) => {
    if (userInfo) {
      router.push("/profile/userprofile");
    } else {
      router.push(path);
    }
  };

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      await logoutUser().unwrap();
      showToast({
        type: "success",
        title: "Logged out",
        message: "See you again soon 👋",
        duration: 2000,
      });
    } catch (err) {
      showToast({
        type: "error",
        title: "Logout Failed",
        message: err,
        duration: 1000
      })
      console.log(err)
    } finally {
      // Smooth UX delay
      setTimeout(() => {
        setIsLoggingOut(false);
      }, 600);
    }
  };


  const router = useRouter();

  const handleSearchCommit = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      // In the future, this could navigate to a dedicated search page
      // For now, if there's a match, navigate to the first one
      if (filteredCampaigns.length > 0) {
        router.push(`/campaign/${filteredCampaigns[0].slug}`);
        setShowDropdown(false);
        setSearchQuery('');
      }
    }
  };

  const getInitials = (name) => {
    if (!name) return "U"; // default (User)
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  const initials = userInfo?.fullName ? getInitials(userInfo.fullName) : null;

  return (
    <>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
         ${scrolled
            ? darkMode
              ? 'bg-zinc-900 border-zinc-800 shadow-lg'
              : 'bg-white border-zinc-200 shadow-lg'
            : 'bg-transparent border-transparent'
          }
         border-b
       `}
      >
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <div className="flex items-center justify-between h-16 gap-6">
            {/* LEFT – Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Image
                src={scrolled && !darkMode ? "/TPFAid-Logo.png" : "/TPFAid-Logo1.png"}
                alt="TPF Aid Logo"
                width={160}
                height={40}
                priority
                className="h-8 md:h-9 w-auto cursor-pointer object-contain"
                onClick={() => router.push('/')}
              />
            </div>

            {/* CENTER – Search (hidden on mobile) */}
            <div className="hidden md:flex flex-1 max-w-xl lg:max-w-2xl xl:max-w-3xl md:mx-4 lg:mx-6 xl:mx-8 search-container">
              <div className="relative w-full group">
                {/* Animated background gradient */}
                <div className={`absolute inset-0 rounded-full opacity-0 group-focus-within:opacity-100 transition-all duration-500 blur-xl -z-10
           ${darkMode
                    ? 'bg-gradient-to-r from-emerald-500/30 via-teal-500/30 to-cyan-500/30'
                    : 'bg-gradient-to-r from-emerald-400/20 via-teal-400/20 to-cyan-400/20'
                  } animate-[pulse_3s_ease-in-out_infinite]`}
                />

                {/* Shimmer effect on focus */}
                <div className="absolute inset-0 rounded-full overflow-hidden opacity-0 group-focus-within:opacity-100 transition-opacity duration-300">
                  <div className={`absolute inset-0 -translate-x-full group-focus-within:translate-x-full transition-transform duration-[2000ms] ease-in-out
             ${darkMode
                      ? 'bg-gradient-to-r from-transparent via-white/10 to-transparent'
                      : 'bg-gradient-to-r from-transparent via-white/40 to-transparent'
                    }`}
                  />
                </div>

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => {
                    setShowDropdown(true);
                    setIsFocused(true);
                  }}
                  onKeyDown={handleSearchCommit}
                  placeholder="Find causes that matter"
                  className={`w-full px-4 py-2.5 pl-11 pr-4 rounded-full border transition-all duration-500
             ${darkMode
                      ? 'bg-zinc-800/90 text-white placeholder-zinc-400 border-zinc-700/50 backdrop-blur-md focus:bg-zinc-900/95 focus:border-emerald-500/60 focus:shadow-[0_0_30px_rgba(16,185,129,0.25),inset_0_1px_2px_rgba(255,255,255,0.05)]'
                      : 'bg-white/90 text-zinc-900 placeholder-zinc-500 border-zinc-300/50 backdrop-blur-md focus:bg-white focus:border-emerald-500/60 focus:shadow-[0_0_30px_rgba(16,185,129,0.15),inset_0_1px_2px_rgba(16,185,129,0.1)]'
                    } focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:scale-[1.02] hover:border-emerald-400/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.1)]`}
                />

                {/* Search icon with rotation animation */}
                <svg
                  className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 transition-all duration-500 group-focus-within:scale-110 group-focus-within:rotate-90 group-focus-within:text-emerald-500
             ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>

                {/* Particle effect dots */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-focus-within:opacity-100 transition-all duration-500 flex gap-1">
                  <span className={`w-1 h-1 rounded-full ${darkMode ? 'bg-emerald-400' : 'bg-emerald-500'} animate-[ping_1.5s_ease-in-out_infinite]`} style={{ animationDelay: '0s' }} />
                  <span className={`w-1 h-1 rounded-full ${darkMode ? 'bg-teal-400' : 'bg-teal-500'} animate-[ping_1.5s_ease-in-out_infinite]`} style={{ animationDelay: '0.3s' }} />
                  <span className={`w-1 h-1 rounded-full ${darkMode ? 'bg-cyan-400' : 'bg-cyan-500'} animate-[ping_1.5s_ease-in-out_infinite]`} style={{ animationDelay: '0.6s' }} />
                </div>

                {/* Search Results Dropdown */}
                {showDropdown && searchQuery && (
                  <div className={`absolute top-full left-0 right-0 mt-3 rounded-2xl overflow-hidden shadow-2xl border transition-all duration-300 z-[60]
                    ${darkMode
                      ? 'bg-zinc-900/95 border-zinc-800 backdrop-blur-xl'
                      : 'bg-white/95 border-zinc-100 backdrop-blur-xl'}`}>

                    <div className="p-2">
                      {filteredCampaigns.length > 0 ? (
                        <>
                          <div className={`px-3 py-2 text-[11px] font-bold uppercase tracking-wider ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                            Suggested Causes
                          </div>
                          {filteredCampaigns.map((campaign) => (
                            <div
                              key={campaign._id}
                              onClick={() => {
                                router.push(`/campaign/${campaign.slug}`);
                                setShowDropdown(false);
                                setSearchQuery('');
                              }}
                              className={`group flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all duration-200
                                ${darkMode ? 'hover:bg-zinc-800/80' : 'hover:bg-emerald-50/50'}`}
                            >
                              <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-200 dark:bg-zinc-800">
                                <Image
                                  src={campaign.imageUrl ? getMediaUrl(campaign.imageUrl) : "/placeholder-campaign.jpg"}
                                  alt={campaign.title}
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className={`text-sm font-semibold truncate ${darkMode ? 'text-zinc-200' : 'text-zinc-800'} group-hover:text-emerald-500 transition-colors`}>
                                  {campaign.title}
                                </h4>
                                <div className="flex items-center gap-3 mt-0.5">
                                  <span className={`flex items-center gap-1 text-[11px] ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                                    <Building2 className="w-3 h-3" />
                                    {campaign.organization}
                                  </span>
                                  <span className={`flex items-center gap-1 text-[11px] font-medium text-emerald-500`}>
                                    <TrendingUp className="w-3 h-3" />
                                    {campaign.targetAmount > 0 ? Math.round((campaign.raisedAmount / campaign.targetAmount) * 100) : 0}%
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </>
                      ) : (
                        <div className="p-8 text-center">
                          <div className={`inline-flex p-3 rounded-full mb-3 ${darkMode ? 'bg-zinc-800' : 'bg-zinc-50'}`}>
                            <Search className={`w-6 h-6 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`} />
                          </div>
                          <p className={`text-sm font-medium ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                            No causes found for "{searchQuery}"
                          </p>
                          <p className={`text-xs mt-1 ${darkMode ? 'text-zinc-600' : 'text-zinc-400'}`}>
                            Try searching for something else
                          </p>
                        </div>
                      )}
                    </div>

                    {filteredCampaigns.length > 0 && (
                      <div className={`p-2 border-t ${darkMode ? 'border-zinc-800 bg-zinc-900/50' : 'border-zinc-100 bg-zinc-50/50'}`}>
                        <button
                          onClick={() => {
                            router.push('/all-campaigns');
                            setShowDropdown(false);
                            setSearchQuery('');
                          }}
                          className={`w-full py-2 text-xs font-semibold text-center rounded-lg transition-colors
                            ${darkMode ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' : 'text-zinc-500 hover:text-emerald-600 hover:bg-white'}`}>
                          View all campaigns
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT – Actions */}
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
              {/* Start Fundraising – desktop only */}
              <button className="hidden md:flex items-center justify-center gap-2 px-4 md:px-5 lg:px-6 xl:px-7 py-2 md:py-2.5 lg:py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-medium text-sm md:text-base transition-all duration-300 cursor-pointer whitespace-nowrap"
                onClick={() => router.push('/financial-aid')} >
                Start fundraising
              </button>
              <div className="tooltip-container">
                <button
                  className={`p-2 rounded-full transition-colors cursor-pointer ${darkMode ? 'bg-zinc-800 hover:bg-zinc-800' : 'bg-white/80 hover:bg-zinc-100'
                    }`}
                  onClick={() => router.push('/zakat-calculator')}
                >
                  <Image
                    src="/TPFAid-Icon-Zakat-1.svg"
                    alt="Zakat"
                    width={28}
                    height={28}
                    className="w-7 h-7 scale-110" // increased size
                  />
                </button>

                <span
                  className={`tooltip ${darkMode ? 'bg-zinc-700 text-white' : 'bg-zinc-800 text-white'
                    }`}
                >
                  Zakaat
                </span>
              </div>


              <div className="tooltip-container">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`p-2 rounded-full transition-colors cursor-pointer ${darkMode ? ' bg-zinc-800 hover:bg-zinc-800' : ' bg-white/80 hover:bg-zinc-100'}`}
                >
                  {darkMode ? (
                    <Sun className="w-6 h-6 text-white" />
                  ) : (
                    <Moon className="w-6 h-6 text-zinc-900" />
                  )}
                </button>
                <span className={`tooltip ${darkMode ? 'bg-zinc-700 text-white' : 'bg-zinc-800 text-white'}`}>
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </span>
              </div>

              {/* Hamburger */}
              {/* profile initials instead of hamburger when logged in */}
              {hasMounted && userInfo ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(!mobileMenuOpen);
                    if (!mobileMenuOpen) window.lenis?.stop();
                    else window.lenis?.start();
                  }}

                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold tracking-wide text-[14px] sm:text-[15px] cursor-pointer transition-all duration-300
    ring-2 ring-white/70 dark:ring-white/40
    ${darkMode
                      ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white hover:scale-[1.08]"
                      : "bg-gradient-to-br from-emerald-500 to-teal-600 text-white hover:scale-[1.08]"
                    }`}
                >
                  {initials}
                </button>

              ) : (
                <div className="tooltip-container">
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Menu"
                    className={`p-1.5 sm:p-2 rounded-full transition-colors cursor-pointer
        ${darkMode
                        ? 'bg-zinc-800/80 text-white hover:bg-zinc-700 backdrop-blur-sm'
                        : 'bg-white/80 text-zinc-700 hover:bg-zinc-200 backdrop-blur-sm'
                      }`}
                  >
                    {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
                  </button>
                  <span className={`tooltip ${darkMode ? 'bg-zinc-700 text-white' : 'bg-zinc-800 text-white'}`}>
                    Menu
                  </span>
                </div>
              )}

            </div>
          </div>

          {/* Mobile search bar */}
          <div className="md:hidden pb-3 search-container">
            <div className="relative w-full group">
              {/* Animated background gradient */}
              <div className={`absolute inset-0 rounded-full opacity-0 group-focus-within:opacity-100 transition-all duration-500 blur-xl -z-10
           ${darkMode
                  ? 'bg-gradient-to-r from-emerald-500/30 via-teal-500/30 to-cyan-500/30'
                  : 'bg-gradient-to-r from-emerald-400/20 via-teal-400/20 to-cyan-400/20'
                } animate-[pulse_3s_ease-in-out_infinite]`}
              />

              {/* Shimmer effect on focus */}
              <div className="absolute inset-0 rounded-full overflow-hidden opacity-0 group-focus-within:opacity-100 transition-opacity duration-300">
                <div className={`absolute inset-0 -translate-x-full group-focus-within:translate-x-full transition-transform duration-[2000ms] ease-in-out
             ${darkMode
                    ? 'bg-gradient-to-r from-transparent via-white/10 to-transparent'
                    : 'bg-gradient-to-r from-transparent via-white/40 to-transparent'
                  }`}
                />
              </div>

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => {
                  setShowDropdown(true);
                  setIsFocused(true);
                }}
                onKeyDown={handleSearchCommit}
                placeholder="Find causes that matter"
                className={`w-full px-4 py-2.5 pl-11 pr-4 rounded-full border transition-all duration-500
             ${darkMode
                    ? 'bg-zinc-800/90 text-white placeholder-zinc-400 border-zinc-700/50 backdrop-blur-md focus:bg-zinc-900/95 focus:border-emerald-500/60 focus:shadow-[0_0_30px_rgba(16,185,129,0.25),inset_0_1px_2px_rgba(255,255,255,0.05)]'
                    : 'bg-white/90 text-zinc-900 placeholder-zinc-500 border-zinc-300/50 backdrop-blur-md focus:bg-white focus:border-emerald-500/60 focus:shadow-[0_0_30px_rgba(16,185,129,0.15),inset_0_1px_2px_rgba(16,185,129,0.1)]'
                  } focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:scale-[1.02] hover:border-emerald-400/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.1)]`}
              />

              {/* Search icon with rotation animation */}
              <svg
                className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 transition-all duration-500 group-focus-within:scale-110 group-focus-within:rotate-90 group-focus-within:text-emerald-500
             ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>

              {/* Particle effect dots */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-focus-within:opacity-100 transition-all duration-500 flex gap-1">
                <span className={`w-1 h-1 rounded-full ${darkMode ? 'bg-emerald-400' : 'bg-emerald-500'} animate-[ping_1.5s_ease-in-out_infinite]`} style={{ animationDelay: '0s' }} />
                <span className={`w-1 h-1 rounded-full ${darkMode ? 'bg-teal-400' : 'bg-teal-500'} animate-[ping_1.5s_ease-in-out_infinite]`} style={{ animationDelay: '0.3s' }} />
                <span className={`w-1 h-1 rounded-full ${darkMode ? 'bg-cyan-400' : 'bg-cyan-500'} animate-[ping_1.5s_ease-in-out_infinite]`} style={{ animationDelay: '0.6s' }} />
              </div>

              {/* Search Results Dropdown (Mobile) */}
              {showDropdown && searchQuery && (
                <div className={`absolute top-full left-0 right-0 mt-3 rounded-2xl overflow-hidden shadow-2xl border transition-all duration-300 z-[60]
                  ${darkMode
                    ? 'bg-zinc-900 border-zinc-800 backdrop-blur-xl'
                    : 'bg-white border-zinc-100 backdrop-blur-xl'}`}>

                  <div className="p-2">
                    {filteredCampaigns.length > 0 ? (
                      <>
                        <div className={`px-3 py-2 text-[10px] font-bold uppercase tracking-wider ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                          Causes
                        </div>
                        {filteredCampaigns.map((campaign) => (
                          <div
                            key={campaign._id}
                            onClick={() => {
                              router.push(`/campaign/${campaign.slug}`);
                              setShowDropdown(false);
                              setSearchQuery('');
                            }}
                            className={`group flex items-center gap-3 p-2 rounded-xl cursor-pointer active:bg-emerald-500/10 transition-colors
                              ${darkMode ? 'hover:bg-zinc-800' : 'hover:bg-zinc-50'}`}
                          >
                            <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-100 dark:bg-zinc-800">
                              <Image
                                src={campaign.imageUrl ? getMediaUrl(campaign.imageUrl) : "/placeholder-campaign.jpg"}
                                alt={campaign.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className={`text-xs font-semibold truncate ${darkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>
                                {campaign.title}
                              </h4>
                              <p className={`text-[10px] ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                                {campaign.organization}
                              </p>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <div className="p-4 text-center">
                        <p className={`text-xs font-medium ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                          No causes found
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <div
              className="fixed inset-0 z-40 md:flex md:items-start md:justify-end md:pr-8 md:pt-20"
              onClick={() => setMobileMenuOpen(false)}
            >
              {/* Modal popup */}
              <div
                data-lenis-prevent
                className={`fixed md:relative right-0 top-0 h-full md:h-auto md:max-h-[85vh] w-full md:w-96 md:max-w-md md:mx-4 md:rounded-2xl overflow-hidden transition-all duration-300 ease-in-out flex flex-col
    ${darkMode
                    ? 'bg-zinc-900 shadow-[0_0_40px_rgba(0,0,0,0.9)] border border-zinc-800'
                    : 'bg-white shadow-[0_4px_40px_rgba(0,0,0,0.25)] border border-zinc-200'
                  }`}
                onClick={(e) => e.stopPropagation()}
              >

                {/* Close button - fixed at top on mobile */}
                <div className={`md:hidden sticky top-0 z-10 flex justify-end px-4 py-3 ${darkMode ? 'bg-zinc-900' : 'bg-white'}`}>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-zinc-800' : 'hover:bg-zinc-100'}`}
                  >
                    <X className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-zinc-900'}`} />
                  </button>
                </div>
                {/* Menu content */}
                <div
                  className="px-6 py-4 space-y-4 flex-1 overflow-y-auto scrollbar-hide pb-8"
                  data-lenis-prevent
                >

                  {/* Greeting */}
                  <div>
                    <p className={`text-xs font-semibold ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                      SALAM!
                    </p>
                  </div>

                  {/* Search */}
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setShowDropdown(true);
                      }}
                      onFocus={() => setShowDropdown(true)}
                      onKeyDown={handleSearchCommit}
                      placeholder="I want to support..."
                      className={`w-full px-4 py-3 pl-10 rounded-xl border
                     ${darkMode
                          ? 'bg-zinc-800 text-white placeholder-zinc-500 border-zinc-700'
                          : 'bg-zinc-50 text-zinc-900 placeholder-zinc-400 border-zinc-200'
                        } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                    />
                    <svg
                      className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5
                     ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>

                    {/* Inline results for mobile menu */}
                    {searchQuery && (
                      <div className={`mt-2 rounded-xl overflow-hidden ${darkMode ? 'bg-zinc-800/50' : 'bg-zinc-50'}`}>
                        {filteredCampaigns.length > 0 ? (
                          filteredCampaigns.map((campaign) => (
                            <div
                              key={campaign._id}
                              onClick={() => {
                                router.push(`/campaign/${campaign.slug}`);
                                setMobileMenuOpen(false);
                                setSearchQuery('');
                              }}
                              className={`flex items-center gap-3 p-3 cursor-pointer border-b last:border-0
                                ${darkMode ? 'border-zinc-700 hover:bg-zinc-700/50' : 'border-zinc-100 hover:bg-white'}`}
                            >
                              <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                                <Image
                                  src={campaign.imageUrl ? getMediaUrl(campaign.imageUrl) : "/placeholder-campaign.jpg"}
                                  alt={campaign.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className={`text-xs font-semibold truncate ${darkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>
                                  {campaign.title}
                                </h4>
                                <p className={`text-[10px] ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                                  {campaign.organization}
                                </p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-4 text-center">
                            <p className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>No results found</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Discover link */}
                  <Link
                    href="/#campaigns"
                    className={`group flex items-center gap-2 py-2 px-2 rounded-lg transition-colors
                   ${darkMode
                        ? 'text-zinc-300 hover:bg-zinc-800'
                        : 'text-zinc-700 hover:bg-zinc-100'
                      }`}
                  >
                    <svg className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Discover inspiring campaigns →</span>
                  </Link>

                  <Link
                    href={userInfo?.role === 'volunteer' ? "/profile/vouchers" : "/volunteer/register"}
                    className={`group flex items-center gap-2 py-2 px-2 rounded-lg transition-all duration-300
                   ${darkMode
                        ? 'hover:bg-zinc-800'
                        : 'hover:bg-emerald-50'
                      }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className={`p-1 rounded-lg ${darkMode ? 'bg-emerald-500/10' : 'bg-emerald-50'}`}>
                      <Award size={18} className="transform transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <span className={`font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r ${userInfo?.role === 'volunteer'
                      ? 'from-[#FFE7A3] via-[#D4AF37] to-[#FFE7A3]'
                      : 'from-emerald-400 via-emerald-500 to-emerald-300'
                      }`}>
                      {userInfo?.role === 'volunteer' ? 'TPF Service Hero' : 'Join as a Volunteer'}
                    </span>
                  </Link>

                  {/* Main menu items with icons */}
                  <div className="space-y-1 border-t border-b py-3 border-zinc-200 dark:border-zinc-700">
                    {[
                      { name: 'My Profile', icon: User2Icon, isLucide: true, path: '/profile/userprofile' },
                      { name: 'My Donations', icon: Heart, isLucide: true, path: '/profile/mydonation' },
                      { name: 'My Wishlist', icon: Plus, isLucide: true, path: '/profile/my-campaign' },
                      { name: 'Daily Givers', icon: Leaf, isLucide: true, path: '/permanent-donor/daily' },
                      { name: 'Zakat', icon: '/TPFAid-Icon-Zakat-1.svg', isLucide: false, path: '/zakat-calculator' }
                    ].map(item => (
                      <Link
                        key={item.name}
                        href={item.path || '#'}
                        className={`group flex items-center gap-3 py-2 px-2 rounded-lg transition-all duration-300
        ${darkMode
                            ? 'text-zinc-300 hover:bg-zinc-800'
                            : 'text-zinc-700 hover:bg-zinc-100'
                          }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.isLucide ? (
                          <item.icon className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1.5" />
                        ) : (
                          <Image
                            src={item.icon}
                            alt={item.name}
                            width={20}
                            height={20}
                            className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1.5"
                          />
                        )}
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </div>



                  {/* Start section */}
                  <div>
                    <p
                      className={`text-xs font-semibold mb-2 ${darkMode ? "text-zinc-500" : "text-zinc-400"
                        }`}
                    >
                      START
                    </p>
                    <div className="space-y-1">
                      {/* Start Fundraising */}
                      <Link
                        href="/financial-aid"
                        className={`group flex items-center justify-between py-2 px-2 rounded-lg transition-all duration-300
             ${darkMode
                            ? "text-zinc-300 hover:bg-zinc-800"
                            : "text-zinc-700 hover:bg-zinc-100"
                          }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className="flex items-center gap-2">
                          <Image
                            src="/share.svg"
                            alt="Start Fundraising"
                            width={20}
                            height={20}
                            className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1.5"
                          />
                          <span>Start fundraising</span>
                        </div>
                        <span className="text-xs text-emerald-600 font-medium">
                          0% platform fee!
                        </span>
                      </Link>


                    </div>
                  </div>


                  {/* Support */}
                  <a
                    href="/contactus"
                    className={`flex items-center gap-2 py-2 px-2 rounded-lg transition-colors border-t pt-3 border-zinc-200 dark:border-zinc-700
                   ${darkMode
                        ? 'text-zinc-300 hover:bg-zinc-800'
                        : 'text-zinc-700 hover:bg-zinc-100'
                      }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>🎧</span>
                    <span>Support</span>
                  </a>

                  {/* Sign up / Log in */}
                  {/* Authentication Actions */}
                  <div className="space-y-1 border-t pt-3 border-zinc-200 dark:border-zinc-700">
                    {userInfo ? (
                      <button
                        onClick={() => setShowLogoutModal(true)}
                        disabled={isLoggingOut}
                        className={`flex items-center gap-2 w-full text-left py-2 px-4 rounded-lg transition-all duration-300
    ${isLoggingOut
                            ? 'text-zinc-400 cursor-not-allowed'
                            : darkMode
                              ? 'text-red-400 hover:bg-zinc-800'
                              : 'text-red-600 hover:bg-zinc-100'
                          }`}
                      >
                        {isLoggingOut ? (
                          <>
                            <svg
                              className="animate-spin w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <circle cx="12" cy="12" r="10" opacity="0.25" />
                              <path d="M22 12a10 10 0 0 1-10 10" />
                            </svg>
                            Logging out…
                          </>
                        ) : (
                          <>
                            <svg
                              width="20"
                              height="20"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                              <polyline points="16 17 21 12 16 7" />
                              <line x1="21" y1="12" x2="9" y2="12" />
                            </svg>
                            Logout
                          </>
                        )}
                      </button>

                    ) : (
                      <>
                        <button
                          onClick={() => {
                            handleAuthNavigation("/signup");
                            setMobileMenuOpen(false);
                          }}
                          className={`block w-full text-center py-2 px-4 rounded-lg transition-colors
        ${darkMode ? 'text-zinc-300 hover:bg-zinc-800' : 'text-zinc-700 hover:bg-zinc-100'}`}
                        >
                          Sign up
                        </button>

                        <button
                          onClick={() => {
                            handleAuthNavigation("/login");
                            setMobileMenuOpen(false);
                          }}
                          className={`block w-full text-center py-2 px-4 rounded-lg transition-colors
        ${darkMode ? 'text-zinc-300 hover:bg-zinc-800' : 'text-zinc-700 hover:bg-zinc-100'}`}
                        >
                          Log in
                        </button>
                      </>
                    )}
                  </div>

                </div>
              </div>
            </div>
          </>
        )}
      </header>
      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowLogoutModal(false)}
          />

          {/* Modal */}
          <div
            className={`relative w-full max-w-md rounded-2xl p-6 transition-all duration-300 scale-100
        ${darkMode
                ? 'bg-zinc-900 border border-zinc-800 text-white'
                : 'bg-white border border-zinc-200 text-zinc-900'
              }`}
          >
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
                <Heart className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-center mb-2">
              Are you sure you want to leave?
            </h3>

            {/* Motivation Text */}
            <p className={`text-sm text-center mb-6 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'
              }`}>
              Staying logged in helps us reduce operational costs and
              lets your support reach those who need it faster 🤍
            </p>

            {/* Actions */}
            <div className="flex gap-3">
              {/* Stay */}
              <button
                onClick={() => setShowLogoutModal(false)}
                className={`flex-1 py-2.5 rounded-lg font-medium transition-all
            ${darkMode
                    ? 'bg-zinc-800 hover:bg-zinc-700'
                    : 'bg-zinc-100 hover:bg-zinc-200'
                  }`}
              >
                Stay Logged In
              </button>

              {/* Logout */}
              <button
                onClick={async () => {
                  setShowLogoutModal(false);
                  setMobileMenuOpen(false);
                  await handleLogout();
                }}
                className="flex-1 py-2.5 rounded-lg font-medium bg-red-600 hover:bg-red-700 text-white transition-all"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
}