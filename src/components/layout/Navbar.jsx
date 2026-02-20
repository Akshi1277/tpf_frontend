'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Menu, X, Moon, Sun, User2Icon } from 'lucide-react';
import { Plus, Heart, Leaf, LayoutDashboard, PlusCircle, Building2 as OrgIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useLogoutUserMutation } from '@/utils/slices/authApiSlice';
import { useLogoutOrganizationMutation } from '@/utils/slices/organizationApiSlice';
import { useFetchCampaignsQuery } from '@/utils/slices/campaignApiSlice';
import { useFetchMyDonationsQuery } from '@/utils/slices/donationApiSlice';
import { Search, MapPin, Building2, TrendingUp, Globe, Send, Headphones } from 'lucide-react';
import { useAppToast } from '@/app/AppToastContext';
import { getMediaUrl } from '@/utils/media';
import { Award, ChevronRight } from 'lucide-react';
import { logout } from '@/utils/slices/authSlice';
import { Drawer } from 'vaul';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [showBottomFade, setShowBottomFade] = useState(true);
  const scrollRef = useRef(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      setShowBottomFade(scrollTop + clientHeight < scrollHeight - 20);
    }
  };

  const { data: campaignData, isLoading } = useFetchCampaignsQuery();
  const campaigns = campaignData?.campaigns || [];

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    campaign.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    campaign.organization?.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5);

  const [logoutUser] = useLogoutUserMutation();
  const [logoutOrganization] = useLogoutOrganizationMutation();

  const getGreeting = () => {
    return 'Salam';
  };

  const greeting = getGreeting();
  useEffect(() => setHasMounted(true), []);
  const userInfo = useSelector((state) => state.auth.userInfo);

  // ── ROLE DETECTION (Reverted to Original) ───────────────────────────────
  const isOrganization = userInfo?.role === 'organization';
  const isVolunteer = userInfo?.role === 'volunteer';

  const { data: myDonationsData } = useFetchMyDonationsQuery({}, { skip: !userInfo });
  const donationCount = myDonationsData?.donations?.length || 0;

  // ── REMOVED: Vaul handles scroll locking and Lenis automatically ───────

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

  const router = useRouter();

  const handleAuthNavigation = (path) => {
    if (userInfo) {
      router.push("/profile/userprofile");
    } else {
      router.push(path);
    }
  };

  const handleLogout = async () => {
    if (userInfo?.type === "organization") {
      await logoutOrganization().unwrap();
    } else {
      await logoutUser().unwrap();
    }
    router.replace("/");
  };



  const handleSearchCommit = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      if (filteredCampaigns.length > 0) {
        router.push(`/campaign/${filteredCampaigns[0].slug}`);
        setShowDropdown(false);
        setSearchQuery('');
      }
    }
  };

  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  const initials = userInfo?.fullName ? getInitials(userInfo.fullName) : null;

  // ── TYPEWRITER EFFECT (Restored) ────────────────────────────────────────
  const placeholders = ["medical support", "education", "clean water", "emergency relief", "orphan support"];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [currentPlaceholder, setCurrentPlaceholder] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const timeout = setTimeout(() => {
      const fullText = placeholders[placeholderIndex];
      if (!isDeleting) {
        setCurrentPlaceholder(fullText.slice(0, currentPlaceholder.length + 1));
        if (currentPlaceholder.length + 1 === fullText.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setCurrentPlaceholder(fullText.slice(0, currentPlaceholder.length - 1));
        if (currentPlaceholder.length === 0) {
          setIsDeleting(false);
          setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        }
      }
    }, isDeleting ? 50 : 100);
    return () => clearTimeout(timeout);
  }, [currentPlaceholder, isDeleting, placeholderIndex, mobileMenuOpen]);

  // ── FIXED: unauthenticated users go directly to /login, no toast ─────────
  const checkNavigation = (path, callback = null) => {
    if (!userInfo) {
      router.push('/login');
      setMobileMenuOpen(false);
      return false;
    }
    if (userInfo && (!userInfo.fullName || !userInfo.email)) {
      showToast({
        type: "info",
        title: "Profile Incomplete",
        message: "Please complete your profile to continue.",
        duration: 3000,
      });
      return false;
    }
    if (callback) {
      callback();
    } else if (path) {
      router.push(path);
    }
    return true;
  };

  // ── MENU CONFIGURATION (Original) ──────────────────────────────────────
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

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    },
  };

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
                <div className={`absolute inset-0 rounded-full opacity-0 group-focus-within:opacity-100 transition-all duration-500 blur-xl -z-10
                  ${darkMode
                    ? 'bg-gradient-to-r from-emerald-500/30 via-teal-500/30 to-cyan-500/30'
                    : 'bg-gradient-to-r from-emerald-400/20 via-teal-400/20 to-cyan-400/20'
                  } animate-[pulse_3s_ease-in-out_infinite]`}
                />
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
                  onChange={(e) => { setSearchQuery(e.target.value); setShowDropdown(true); }}
                  onFocus={() => { setShowDropdown(true); setIsFocused(true); }}
                  onKeyDown={handleSearchCommit}
                  placeholder="Find causes that matter"
                  className={`w-full px-4 py-2.5 pl-11 pr-4 rounded-full border transition-all duration-500
                    ${darkMode
                      ? 'bg-zinc-800/90 text-white placeholder-zinc-400 border-zinc-700/50 backdrop-blur-md focus:bg-zinc-900/95 focus:border-emerald-500/60 focus:shadow-[0_0_30px_rgba(16,185,129,0.25),inset_0_1px_2px_rgba(255,255,255,0.05)]'
                      : 'bg-white/90 text-zinc-900 placeholder-zinc-500 border-zinc-300/50 backdrop-blur-md focus:bg-white focus:border-emerald-500/60 focus:shadow-[0_0_30px_rgba(16,185,129,0.15),inset_0_1px_2px_rgba(16,185,129,0.1)]'
                    } focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:scale-[1.02] hover:border-emerald-400/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.1)]`}
                />
                <svg
                  className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 transition-all duration-500 group-focus-within:scale-110 group-focus-within:rotate-90 group-focus-within:text-emerald-500
                    ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {showDropdown && searchQuery && (
                  <div className={`absolute top-full left-0 right-0 mt-3 rounded-2xl overflow-hidden shadow-2xl border transition-all duration-300 z-[60]
                    ${darkMode ? 'bg-zinc-900/95 border-zinc-800 backdrop-blur-xl' : 'bg-white/95 border-zinc-100 backdrop-blur-xl'}`}>
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
                                checkNavigation(null, () => {
                                  router.push(`/campaign/${campaign.slug}`);
                                  setShowDropdown(false);
                                  setSearchQuery('');
                                });
                              }}
                              className={`group flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all duration-200
                                ${darkMode ? 'hover:bg-zinc-800/80' : 'hover:bg-emerald-50/50'}`}
                            >
                              <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                <Image src={campaign.imageUrl ? getMediaUrl(campaign.imageUrl) : "/placeholder-campaign.jpg"} alt={campaign.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className={`text-sm font-semibold truncate ${darkMode ? 'text-zinc-200' : 'text-zinc-800'} group-hover:text-emerald-500 transition-colors`}>{campaign.title}</h4>
                                <div className="flex items-center gap-3 mt-0.5">
                                  <span className={`flex items-center gap-1 text-[11px] ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}><Building2 className="w-3 h-3" />{campaign.organization}</span>
                                  <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-500"><TrendingUp className="w-3 h-3" />{campaign.targetAmount > 0 ? Math.round((campaign.raisedAmount / campaign.targetAmount) * 100) : 0}%</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </>
                      ) : (
                        <div className="p-8 text-center">
                          <p className={`text-sm font-medium ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>No causes found for "{searchQuery}"</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT – Actions */}
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
              {!isOrganization && (
                <button className="hidden md:flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-medium text-sm transition-all duration-300 cursor-pointer whitespace-nowrap"
                  onClick={() => checkNavigation('/financial-aid')}>
                  Start fundraising
                </button>
              )}
              <button className={`p-2 rounded-full transition-colors cursor-pointer ${darkMode ? 'bg-zinc-800 hover:bg-zinc-800' : 'bg-white/80 hover:bg-zinc-100'}`}
                onClick={() => router.push('/zakat-calculator')}>
                <Image src="/TPFAid-Icon-Zakat-1.svg" alt="Zakat" width={28} height={28} className="w-7 h-7" />
              </button>
              <button onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full transition-colors cursor-pointer ${darkMode ? 'bg-zinc-800 hover:bg-zinc-800' : 'bg-white/80 hover:bg-zinc-100'}`}>
                {darkMode ? <Sun className="w-6 h-6 text-white" /> : <Moon className="w-6 h-6 text-zinc-900" />}
              </button>

              <Drawer.Root open={mobileMenuOpen} onOpenChange={setMobileMenuOpen} direction="right">
                <Drawer.Trigger asChild>
                  {hasMounted && userInfo ? (
                    <button className="w-10 h-10 rounded-full flex items-center justify-center font-bold bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg">
                      {initials}
                    </button>
                  ) : (
                    <button className={`p-2.5 rounded-full transition-all duration-300 ${darkMode ? 'bg-zinc-800 text-white' : 'bg-white text-zinc-900'}`}>
                      <Menu className="w-6 h-6" />
                    </button>
                  )}
                </Drawer.Trigger>

                <Drawer.Portal>
                  <Drawer.Overlay className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm" />
                  <Drawer.Content className={`fixed right-0 top-0 h-full w-[85%] max-w-md z-[70] flex flex-col outline-none shadow-2xl
                    ${darkMode ? 'bg-zinc-950 border-l border-zinc-800' : 'bg-white border-l border-zinc-200'}`}>

                    {/* Accessibility Title */}
                    <Drawer.Title className="sr-only">Mobile Navigation Menu</Drawer.Title>

                    <div className="flex justify-end px-4 py-3">
                      <button onClick={() => setMobileMenuOpen(false)} className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-zinc-800 text-white' : 'hover:bg-zinc-100 text-zinc-900'}`}>
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    <div
                      ref={scrollRef}
                      onScroll={handleScroll}
                      className="flex-1 overflow-y-auto scrollbar-hide flex flex-col px-5 pb-5 relative" data-lenis-prevent
                    >
                      <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={mobileMenuOpen ? "show" : "hidden"}
                        className="space-y-4"
                      >
                        {/* Impact Card */}
                        <motion.div variants={itemVariants}>
                          {userInfo ? (
                            <div className={`p-4 rounded-2xl border backdrop-blur-xl overflow-hidden relative group transition-all duration-500
                              ${darkMode
                                ? 'bg-zinc-900/40 border-zinc-800/50 shadow-[0_8px_32px_rgba(0,0,0,0.3)]'
                                : 'bg-emerald-50/40 border-emerald-100/50 shadow-[0_8px_32px_rgba(16,185,129,0.05)]'}`}>

                              {/* Background Glow */}
                              <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-3xl opacity-20 transition-all duration-700 group-hover:scale-150
                                ${darkMode ? 'bg-emerald-500' : 'bg-emerald-400'}`} />

                              <div className="relative z-10">
                                <span className={`text-[9px] font-bold tracking-[0.2em] uppercase mb-0 block
                                  ${darkMode ? 'text-zinc-500' : 'text-emerald-600/70'}`}>
                                  Your Impact
                                </span>
                                <h3 className={`text-lg font-bold mb-0.5 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                                  {greeting}, {userInfo.fullName?.split(' ')[0]}!
                                </h3>
                                <p className={`text-xs leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                  You've supported <span className="font-bold text-emerald-500">{donationCount}</span> {donationCount === 1 ? 'cause' : 'causes'} this month.
                                </p>

                                <div className="mt-3 flex items-center gap-2">
                                  <div className="flex -space-x-1.5">
                                    {[1, 2, 3].map((i) => (
                                      <div key={i} className={`w-5 h-5 rounded-full border-2 ${darkMode ? 'border-zinc-900 bg-zinc-800' : 'border-white bg-emerald-100'} flex items-center justify-center`}>
                                        <Heart className="w-2.5 h-2.5 text-emerald-500" fill="currentColor" />
                                      </div>
                                    ))}
                                  </div>
                                  <span className={`text-[10px] font-medium ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                                    Keep spreading kindness
                                  </span>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className={`p-5 rounded-2xl border backdrop-blur-xl overflow-hidden relative group
                              ${darkMode
                                ? 'bg-zinc-900/40 border-zinc-800/50'
                                : 'bg-zinc-50/40 border-zinc-200/50'}`}>
                              <div className="relative z-10 text-center">
                                <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                                  Be the Change
                                </h3>
                                <p className={`text-sm mb-4 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                  Join thousands of donors making a real impact today.
                                </p>
                                <button
                                  onClick={() => { handleAuthNavigation("/signup"); setMobileMenuOpen(false); }}
                                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
                                >
                                  Create Impact
                                </button>
                              </div>
                            </div>
                          )}
                        </motion.div>

                        {/* Search Section */}
                        <motion.div variants={itemVariants} className="relative group">
                          <input
                            type="text" value={searchQuery}
                            onChange={(e) => { setSearchQuery(e.target.value); setShowDropdown(true); }}
                            onFocus={() => setShowDropdown(true)}
                            onKeyDown={handleSearchCommit}
                            placeholder={currentPlaceholder ? `Search for ${currentPlaceholder}...` : "I want to support..."}
                            className={`w-full px-4 py-2.5 pl-12 rounded-xl border transition-all duration-300
                                ${darkMode
                                ? 'bg-transparent text-white placeholder-zinc-500 border-zinc-800 focus:border-emerald-500'
                                : 'bg-zinc-50 text-zinc-900 placeholder-zinc-400 border-zinc-200 focus:border-emerald-500'
                              } focus:outline-none`}
                          />
                          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`} />

                          {searchQuery && (
                            <div className={`absolute top-full left-0 right-0 mt-2 rounded-xl overflow-hidden border shadow-xl z-10 ${darkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-zinc-100'}`}>
                              {filteredCampaigns.length > 0 ? filteredCampaigns.slice(0, 5).map((campaign) => (
                                <div key={campaign._id}
                                  onClick={() => { router.push(`/campaign/${campaign.slug}`); setMobileMenuOpen(false); setSearchQuery(''); }}
                                  className={`flex items-center gap-3 p-3 cursor-pointer border-b last:border-0 transition-colors ${darkMode ? 'border-zinc-700 hover:bg-zinc-700' : 'border-zinc-50 hover:bg-emerald-50/30'}`}>
                                  <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                                    <Image src={campaign.imageUrl ? getMediaUrl(campaign.imageUrl) : "/placeholder-campaign.jpg"} alt={campaign.title} fill className="object-cover" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className={`text-xs font-bold truncate ${darkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>{campaign.title}</h4>
                                    <p className={`text-[10px] ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>{campaign.organization}</p>
                                  </div>
                                </div>
                              )) : (
                                <div className="p-4 text-center text-zinc-400 text-xs">No causes found</div>
                              )}
                            </div>
                          )}
                        </motion.div>

                        {/* Discover Link */}
                        <motion.div variants={itemVariants}>
                          <Link href="/#campaigns" className={`group flex items-center gap-3 text-[15px] font-medium transition-colors ${darkMode ? 'text-zinc-300 hover:text-white' : 'text-zinc-700 hover:text-emerald-600'}`} onClick={() => setMobileMenuOpen(false)}>
                            <motion.div
                              whileHover={{ rotate: 15, scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Globe className="w-5 h-5" />
                            </motion.div>
                            <span>Discover inspiring campaigns →</span>
                          </Link>
                        </motion.div>

                        {/* Volunteer Link */}
                        {!isOrganization && (
                          <motion.div variants={itemVariants}>
                            <Link href={isVolunteer ? "/profile/vouchers" : "/volunteer/register"} className="group flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
                              <motion.div
                                whileHover={{ scale: 1.1, rotate: -10 }}
                                whileTap={{ scale: 0.9 }}
                                className={`p-1.5 rounded-lg ${darkMode ? 'bg-zinc-800' : 'bg-zinc-100'}`}
                              >
                                <Award className={`w-5 h-5 ${isVolunteer ? 'text-emerald-500' : 'text-zinc-400'}`} />
                              </motion.div>
                              <span className={`font-bold text-[15px] ${darkMode ? 'text-emerald-500' : 'text-emerald-600'}`}>{isVolunteer ? 'Proud Service Hero' : 'Join as a Volunteer'}</span>
                            </Link>
                          </motion.div>
                        )}

                        <motion.div variants={itemVariants} className={`h-px ${darkMode ? 'bg-zinc-800' : 'bg-zinc-100'}`} />

                        <nav className="space-y-4">
                          {activeMenuItems.map(item => (
                            <motion.div key={item.name} variants={itemVariants}>
                              <Link href={item.path || '#'} className={`group flex items-center gap-4 transition-all ${darkMode ? 'text-zinc-300 hover:text-white' : 'text-zinc-700 hover:text-emerald-600'}`} onClick={() => setMobileMenuOpen(false)}>
                                <motion.div
                                  whileHover={{ scale: 1.2, rotate: 5 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="w-6 flex justify-center"
                                >
                                  {item.isLucide ? <item.icon className="w-5 h-5 transition-colors" /> : <Image src={item.icon} alt={item.name} width={20} height={20} className="w-5 h-5" />}
                                </motion.div>
                                <span className="font-medium text-[15px]">{item.name}</span>
                              </Link>
                            </motion.div>
                          ))}
                        </nav>

                        <motion.div variants={itemVariants} className={`h-px ${darkMode ? 'bg-zinc-800' : 'bg-zinc-100'}`} />

                        {!isOrganization && (
                          <motion.div variants={itemVariants} className="space-y-4">
                            <p className={`text-[11px] font-bold tracking-widest ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>START</p>
                            <Link
                              href="/financial-aid"
                              onClick={() => setMobileMenuOpen(false)}
                              className={`group relative flex flex-col gap-3 p-5 rounded-2xl border overflow-hidden transition-all duration-500
                                ${darkMode
                                  ? 'bg-zinc-900/40 border-emerald-500/20 hover:border-emerald-500/40'
                                  : 'bg-emerald-50/30 border-emerald-200 hover:border-emerald-300'}`}
                            >
                              {/* Animated Shimmer Background */}
                              <motion.div
                                animate={{
                                  x: ['-100%', '100%'],
                                }}
                                transition={{
                                  duration: 3,
                                  repeat: Infinity,
                                  ease: "linear"
                                }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/5 to-transparent skew-x-12 pointer-events-none"
                              />

                              <div className="flex items-center justify-between relative z-10">
                                <div className="flex items-center gap-4">
                                  <div className={`p-2 rounded-lg ${darkMode ? 'bg-emerald-500/10' : 'bg-white shadow-sm'}`}>
                                    <Send className="w-5 h-5 text-emerald-500" />
                                  </div>
                                  <div className="flex flex-col">
                                    <span className={`font-bold text-[15px] ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Start fundraising</span>
                                    <span className={`text-[11px] font-medium leading-none mt-0.5 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>Take the first step</span>
                                  </div>
                                </div>
                                <div className="flex flex-col items-end">
                                  <span className="text-[14px] text-emerald-600 font-bold">0%</span>
                                  <span className="text-[9px] text-emerald-500/80 font-medium uppercase tracking-tighter">fee</span>
                                </div>
                              </div>


                            </Link>
                          </motion.div>
                        )}

                        <motion.div variants={itemVariants} className="space-y-4">
                          {!userInfo && <p className={`text-[11px] font-bold tracking-widest ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>ORGANIZATIONS</p>}
                          {!userInfo && (
                            <Link href="/organization/login" className="group flex items-center gap-4 transition-all" onClick={() => setMobileMenuOpen(false)}>
                              <motion.div whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.9 }}>
                                <Building2 className={`w-5 h-5 ${darkMode ? 'text-zinc-300 group-hover:text-white' : 'text-zinc-700 group-hover:text-emerald-600'}`} />
                              </motion.div>
                              <span className={`font-medium text-[15px] ${darkMode ? 'text-zinc-300 group-hover:text-white' : 'text-zinc-700 group-hover:text-emerald-600'}`}>Organization Login</span>
                            </Link>
                          )}
                          <Link href="/contactus" className={`group flex items-center gap-4 p-4 rounded-xl border transition-all ${darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:text-emerald-600'}`} onClick={() => setMobileMenuOpen(false)}>
                            <motion.div
                              animate={{
                                y: [0, -2, 0],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            >
                              <Headphones className="w-5 h-5" />
                            </motion.div>
                            <span className="font-medium text-[15px]">Support</span>
                          </Link>
                        </motion.div>



                        <motion.div variants={itemVariants} className="pt-8 flex flex-col items-center gap-6">
                          {userInfo ? (
                            <button onClick={() => setShowLogoutModal(true)} disabled={isLoggingOut} className={`text-sm font-bold tracking-wide uppercase ${isLoggingOut ? 'text-zinc-500' : 'text-red-500 hover:text-red-400'}`}>
                              {isLoggingOut ? 'Signing Out...' : 'Sign Out'}
                            </button>
                          ) : (
                            <>
                              <button onClick={() => { handleAuthNavigation("/signup"); setMobileMenuOpen(false); }} className={`text-[15px] font-medium transition-colors ${darkMode ? 'text-zinc-300 hover:text-white' : 'text-zinc-700 hover:text-zinc-900'}`}>Sign up</button>
                              <button onClick={() => { handleAuthNavigation("/login"); setMobileMenuOpen(false); }} className={`text-[15px] font-medium transition-colors ${darkMode ? 'text-zinc-300 hover:text-white' : 'text-zinc-700 hover:text-zinc-900'}`}>Log in</button>
                            </>
                          )}
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Gradient Fade Mask */}
                    <div className={`absolute bottom-0 left-0 right-0 h-16 pointer-events-none z-[80] transition-opacity duration-300
                      ${showBottomFade ? 'opacity-100' : 'opacity-0'}
                      ${darkMode
                        ? 'bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent'
                        : 'bg-gradient-to-t from-white via-white/80 to-transparent'}`}
                    />
                  </Drawer.Content>
                </Drawer.Portal>
              </Drawer.Root>
            </div>
          </div>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowLogoutModal(false)} />
          <div className={`relative w-full max-w-md rounded-2xl p-6 transition-all duration-300 scale-100
            ${darkMode ? 'bg-zinc-900 border border-zinc-800 text-white' : 'bg-white border border-zinc-200 text-zinc-900'}`}>
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
                <Heart className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-center mb-2">Are you sure you want to leave?</h3>
            <p className={`text-sm text-center mb-6 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Staying logged in helps us reduce operational costs and lets your support reach those who need it faster
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowLogoutModal(false)}
                className={`flex-1 py-2.5 rounded-lg font-medium transition-all ${darkMode ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-zinc-100 hover:bg-zinc-200'}`}>
                Stay Logged In
              </button>
              <button
                onClick={async () => { setShowLogoutModal(false); setMobileMenuOpen(false); await handleLogout(); }}
                className="flex-1 py-2.5 rounded-lg font-medium bg-red-600 hover:bg-red-700 text-white transition-all">
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}