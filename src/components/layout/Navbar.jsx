'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutUserMutation } from '@/utils/slices/authApiSlice';
import { useLogoutOrganizationMutation } from '@/utils/slices/organizationApiSlice';
import { useFetchCampaignsQuery } from '@/utils/slices/campaignApiSlice';
import { useFetchMyDonationsQuery } from '@/utils/slices/donationApiSlice';
import { useAppToast } from '@/app/AppToastContext';
import DesktopNav from './Navbar/DesktopNav';
import MobileMenu from './Navbar/NavDrawer';
import LogoutModal from './Navbar/LogoutModal';

export default function Navbar({ darkMode, setDarkMode, scrolled }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { showToast } = useAppToast();

  // ── STATE ─────────────────────────────────────────────────────────────
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // ── DATA ──────────────────────────────────────────────────────────────
  const userInfo = useSelector((state) => state.auth.userInfo);
  const isOrganization = userInfo?.type === 'organization';
  const isVolunteer = userInfo?.role === 'volunteer';

  const { data: campaignData } = useFetchCampaignsQuery();
  const campaigns = campaignData?.campaigns || [];

  const { data: myDonationsData } = useFetchMyDonationsQuery({}, { skip: !userInfo });
  const donationCount = myDonationsData?.donations?.length || 0;

  const [logoutUser] = useLogoutUserMutation();
  const [logoutOrganization] = useLogoutOrganizationMutation();

  // ── DERIVED ───────────────────────────────────────────────────────────
  const filteredCampaigns = campaigns.filter(c =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.organization?.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5);

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };
  const initials = userInfo?.fullName ? getInitials(userInfo.fullName) : null;

  const greeting = 'Salam';

  // ── EFFECTS ───────────────────────────────────────────────────────────
  useEffect(() => setHasMounted(true), []);

  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) setDarkMode(saved === 'true');
  }, [setDarkMode]);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    window.dispatchEvent(new Event('darkModeChanged'));
  }, [darkMode]);

  // Close search dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.search-container')) setShowDropdown(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // ── HANDLERS ──────────────────────────────────────────────────────────
  const handleAuthNavigation = (path) => {
    router.push(userInfo ? '/profile/userprofile' : path);
  };

  const checkNavigation = (path, callback = null) => {
    if (!userInfo) {
      router.push('/login');
      setMobileMenuOpen(false);
      return false;
    }
    if (!userInfo.fullName || !userInfo.email) {
      showToast({
        type: 'info',
        title: 'Profile Incomplete',
        message: 'Please complete your profile to continue.',
        duration: 3000,
      });
      return false;
    }
    if (callback) callback();
    else if (path) router.push(path);
    return true;
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      if (userInfo?.type === 'organization') {
        await logoutOrganization().unwrap();
      } else {
        await logoutUser().unwrap();
      }
      router.replace('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      setIsLoggingOut(false);
      setShowLogoutModal(false);
    }
  };

  const handleSearchCommit = (e) => {
    if (e.key === 'Enter' && searchQuery.trim() && filteredCampaigns.length > 0) {
      router.push(`/campaign/${filteredCampaigns[0].slug}`);
      setShowDropdown(false);
      setSearchQuery('');
    }
  };

  // ── RENDER ────────────────────────────────────────────────────────────
  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b
          ${scrolled
            ? darkMode
              ? 'bg-zinc-900/98 border-zinc-800 shadow-lg shadow-black/20'
              : 'bg-white/98 border-zinc-200 shadow-lg shadow-zinc-200/40'
            : 'bg-transparent border-transparent'
          }`}
      >
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <div className="flex items-center justify-between h-14 gap-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Image
                src={scrolled && !darkMode ? '/TPFAid-Logo.png' : '/TPFAid-Logo1.png'}
                alt="TPF Aid Logo"
                width={140}
                height={36}
                priority
                className="h-7 md:h-8 w-auto cursor-pointer object-contain"
                onClick={() => router.push('/')}
              />
            </div>

            {/* Desktop nav (search + right actions) */}
            <DesktopNav
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              userInfo={hasMounted ? userInfo : null}
              isOrganization={isOrganization}
              initials={initials}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              showDropdown={showDropdown}
              setShowDropdown={setShowDropdown}
              filteredCampaigns={filteredCampaigns}
              handleSearchCommit={handleSearchCommit}
              checkNavigation={checkNavigation}
              onMenuOpen={() => setMobileMenuOpen(true)}
            />
          </div>
        </div>
      </header>

      {/* Mobile / Drawer Menu */}
      <MobileMenu
        open={mobileMenuOpen}
        onOpenChange={setMobileMenuOpen}
        darkMode={darkMode}
        userInfo={hasMounted ? userInfo : null}
        isOrganization={isOrganization}
        isVolunteer={isVolunteer}
        donationCount={donationCount}
        greeting={greeting}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredCampaigns={filteredCampaigns}
        handleSearchCommit={handleSearchCommit}
        handleAuthNavigation={handleAuthNavigation}
        onLogoutRequest={() => setShowLogoutModal(true)}
        isLoggingOut={isLoggingOut}
      />

      {/* Logout Modal */}
      {showLogoutModal && (
        <LogoutModal
          darkMode={darkMode}
          isLoggingOut={isLoggingOut}
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}
    </>
  );
}