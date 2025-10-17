'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X, Users, ChevronRight, CheckCircle, ArrowRight, Moon, Sun } from 'lucide-react';

export default function TPFAidMinimal() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [totalRaised, setTotalRaised] = useState(2547893);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [curatedScrollIndex, setCuratedScrollIndex] = useState(0);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [campaignScrollIndex, setCampaignScrollIndex] = useState(0);
  const [storyScrollIndex, setStoryScrollIndex] = useState(0);

  const COLORS = {
    primary: "bg-emerald-600",
    primaryText: "text-emerald-600",
    neutralHeading: darkMode ? "text-white" : "text-zinc-900",
    neutralBody: darkMode ? "text-zinc-400" : "text-zinc-600",
  };

  const heroImages = [
    "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1200&q=80",
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=80",
    "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200&q=80"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage(prev => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  
useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 0);
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
}, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalRaised(prev => prev + Math.floor(Math.random() * 100));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const campaigns = [
    {
      id: 1,
      title: "Emergency Relief for Families in Gaza",
      category: "emergency",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
      raised: 45627,
      goal: 75000,
      donors: 342,
      org: "Global Family Aid",
      verified: true,
      urgent: true
    },
    {
      id: 2,
      title: "Medical Supplies for Field Clinics",
      category: "medical",
      image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&q=80",
      raised: 32450,
      goal: 50000,
      donors: 198,
      org: "Seed Charity",
      verified: true
    },
    {
      id: 3,
      title: "Safe Housing for Displaced Orphans",
      category: "orphans",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
      raised: 28900,
      goal: 40000,
      donors: 267,
      org: "Together Organization",
      verified: true
    },
    {
      id: 4,
      title: "School Kits for Children",
      category: "education",
      image: "https://images.unsplash.com/photo-1541844053589-346841d0b34c?w=800&q=80",
      raised: 18750,
      goal: 30000,
      donors: 156,
      org: "TPF Aid Education",
      verified: true,
      urgent: true
    }
  ];

  const categories = [
    { key: "all", label: "All" },
    { key: "emergency", label: "Emergency Aid"},
    { key: "medical", label: "Medical Aid"},
    { key: "orphans", label: "Orphans" },
    { key: "education", label: "Education"},
    { key: "water", label: "Clean Water"}
  ];

  const curatedItems = [
  { 
    label: "Feed the hungry", 
    image: "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Help provide meals to those in need"
  },
  { 
    label: "Provide clean water", 
    image: "https://media.istockphoto.com/id/600999260/photo/hands-of-poor-african-children-asking-for-drinking-water.webp?a=1&b=1&s=612x612&w=0&k=20&c=Ev7WU39mC-XPkcsfhRBRJv6cKSeEsR01-yrcuQYUa_0=",
    description: "Bring fresh water to communities"
  },
  { 
    label: "Send Gaza aid", 
    image: "https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Support humanitarian relief efforts"
  },
  { 
    label: "Emergency aid", 
    image: "https://plus.unsplash.com/premium_photo-1663091439138-cc1e9307ff4e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZW1lcmdlbmN5JTIwYWlkfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
    description: "Respond to urgent crisis situations"
  },
  { 
    label: "Support orphans", 
    image: "https://media.istockphoto.com/id/900565350/photo/rural-children.webp?a=1&b=1&s=612x612&w=0&k=20&c=jkEbfVI87_ZcxKAd7icX17U2m7b7WS6MB9w_yQT049A=",
    description: "Give children a brighter future"
  },
  { 
    label: "Education", 
    image: "https://plus.unsplash.com/premium_photo-1661501762981-b30750d3e50c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvdmlkZSUyMGVkdWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
    description: "Empower through learning"
  }
];

const partners = [
  { name: "Seed Charity", image: "https://cdn.builder.io/api/v1/image/assets%2Fc05b786f1645447ab878b73ca4dd6870%2Ff0e211f4eed743b9a70fe6b4b6001b85?format=webp&width=2000" },
  { name: "Global Family Aid", image: "https://cdn.builder.io/api/v1/image/assets%2Fc05b786f1645447ab878b73ca4dd6870%2Fe9df5f33b91d46a293a5d3c661e5ad00?format=webp&width=2000" },
  { name: "Human Relief", image: "https://cdn.builder.io/api/v1/image/assets%2Fc05b786f1645447ab878b73ca4dd6870%2F1bf296792ea647b9aa7980631140b241?format=webp&width=2000" },
  { name: "Maan", image: "https://cdn.builder.io/api/v1/image/assets%2Fc05b786f1645447ab878b73ca4dd6870%2F9256431f39904e7997bbf0d7f19e2f96?format=webp&width=2000" },
  { name: "UN-ICC", image: "https://cdn.builder.io/api/v1/image/assets%2Fc05b786f1645447ab878b73ca4dd6870%2Fed5a55b79ee24f20a5cc6fd1abe39177?format=webp&width=2000" },
  { name: "Little Tree Foundation", image: "https://cdn.builder.io/api/v1/image/assets%2Fc05b786f1645447ab878b73ca4dd6870%2F4d5eb38bd91446389d6773e87a9aa424?format=webp&width=2000" }
];

  const recentDonations = [
    { name: "Anonymous", amount: 500, time: "2 min ago" },
    { name: "Ahmed K.", amount: 250, time: "5 min ago" },
    { name: "Fatima S.", amount: 1000, time: "8 min ago" },
    { name: "Anonymous", amount: 100, time: "12 min ago" },
    { name: "Yusuf M.", amount: 750, time: "15 min ago" }
  ];

  const successStories = [
    {
      title: "Your donations delivered winter kits to 1,200 families",
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80",
      excerpt: "Blankets, heaters, and fuel vouchers have reached those most in need."
    },
    {
      title: "A new water point is serving 3,000 daily",
      image: "https://images.unsplash.com/photo-1541844053589-346841d0b34c?w=800&q=80",
      excerpt: "Clean, safe water is now accessible within walking distance."
    },
    {
      title: "School-in-a-box restarted classes in the camps",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
      excerpt: "Portable school kits brought structured learning back to children."
    }
  ];

  const filteredCampaigns = selectedCategory === 'all' 
    ? campaigns 
    : campaigns.filter(c => c.category === selectedCategory);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;

    const interval = setInterval(() => {
      setCampaignScrollIndex(prev => (prev + 1) % filteredCampaigns.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [filteredCampaigns.length]);

 useEffect(() => {
  const checkAndScroll = () => {
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return null;

    const interval = setInterval(() => {
      setStoryScrollIndex(prev => (prev + 1) % successStories.length);
    }, 4000);

    return interval;
  };

  const interval = checkAndScroll();
  return () => {
    if (interval) clearInterval(interval);
  };
}, [successStories.length]);

  // Scroll campaigns on mobile
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;

    const container = document.getElementById('campaigns-container');
    if (container) {
      const cardWidth = container.scrollWidth / filteredCampaigns.length;
      container.scrollTo({
        left: cardWidth * campaignScrollIndex,
        behavior: 'smooth'
      });
    }
  }, [campaignScrollIndex, filteredCampaigns.length]);

  // Scroll stories on mobile
 useEffect(() => {
  const scrollStories = () => {
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;

    const container = document.getElementById('stories-container');
    if (container && container.scrollWidth > 0) {
      const cardWidth = container.scrollWidth / successStories.length;
      container.scrollTo({
        left: cardWidth * storyScrollIndex,
        behavior: 'smooth'
      });
    }
  };

  // Small delay to ensure DOM is ready
  const timer = setTimeout(scrollStories, 100);
  return () => clearTimeout(timer);
}, [storyScrollIndex, successStories.length]);

// Auto-scroll for curated on mobile
useEffect(() => {
  const isMobile = window.innerWidth < 768;
  if (!isMobile) return;

  const interval = setInterval(() => {
    setCuratedScrollIndex(prev => (prev + 1) % curatedItems.length);
  }, 4000);

  return () => clearInterval(interval);
}, [curatedItems.length]);

// Scroll curated on mobile
useEffect(() => {
  const scrollCurated = () => {
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;

    const container = document.getElementById('curated-container');
    if (container && container.scrollWidth > 0) {
      const cardWidth = container.scrollWidth / curatedItems.length;
      container.scrollTo({
        left: cardWidth * curatedScrollIndex,
        behavior: 'smooth'
      });
    }
  };

  const timer = setTimeout(scrollCurated, 100);
  return () => clearTimeout(timer);
}, [curatedScrollIndex, curatedItems.length]);

  const currency = (amount) => {
    return new Intl.NumberFormat("en-IN", { 
      style: "currency", 
      currency: "INR", 
      maximumFractionDigits: 0 
    }).format(amount);
  };

  return (
    <div className={`min-h-screen font-sans ${darkMode ? 'bg-zinc-900' : 'bg-white'}`}>
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(16, 185, 129, 0.5);
          }
        }
        .pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
      `}</style>


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
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16 gap-6">
      {/* LEFT – Logo */}
    {/* LEFT – Logo */}
<div className="flex-shrink-0">
  <Image
    src={scrolled && !darkMode ? "/TPFAid-Logo.png" : "/TPFAid-Logo1.png"}
    alt="TPF Aid Logo"
    width={120}
    height={120}
    priority
    className="cursor-pointer"
  />
</div>

      {/* CENTER – Search (hidden on mobile) */}
      <div className="hidden md:flex flex-1 max-w-xl mx-8">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Discover inspiring causes"
            className={`w-full px-4 py-2 pl-10 rounded-full border
              ${darkMode
                ? 'bg-zinc-800/80 text-white placeholder-zinc-400 border-zinc-700/50 backdrop-blur-sm'
                : 'bg-white/80 text-zinc-900 placeholder-zinc-500 border-zinc-300/50 backdrop-blur-sm'
              } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
          />
          <svg
            className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5
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
        </div>
      </div>

      {/* RIGHT – Actions */}
      <div className="flex items-center gap-3">
        {/* Start Fundraising – desktop only */}
        <button className="hidden md:flex items-center gap-2 px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-medium transition-colors">
          Start fundraising
        </button>

        {/* Zakaat icon */}
        <button
          aria-label="Zakaat"
          className={`p-2 rounded-full transition-colors
            ${darkMode
              ? 'bg-zinc-800/80 text-white hover:bg-zinc-700 backdrop-blur-sm'
              : 'bg-white/80 text-zinc-700 hover:bg-zinc-200 backdrop-blur-sm'
            }`}
        >
          <Image
            src="/zakkat.svg"
            alt="Zakaat"
            width={20}
            height={20}
            className={darkMode ? 'brightness-0 invert' : ''}
          />
        </button>

        {/* Dark-mode toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle dark mode"
          className={`p-2 rounded-full transition-colors
            ${darkMode
              ? 'bg-zinc-800/80 text-yellow-400 hover:bg-zinc-700 backdrop-blur-sm'
              : 'bg-white/80 text-zinc-700 hover:bg-zinc-200 backdrop-blur-sm'
            }`}
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
          className={`p-2 rounded-full transition-colors
            ${darkMode
              ? 'bg-zinc-800/80 text-white hover:bg-zinc-700 backdrop-blur-sm'
              : 'bg-white/80 text-zinc-700 hover:bg-zinc-200 backdrop-blur-sm'
            }`}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </div>

    {/* Mobile search bar */}
    <div className="md:hidden pb-3">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Discover inspiring causes"
          className={`w-full px-4 py-2 pl-10 rounded-full border
            ${darkMode
              ? 'bg-zinc-800/80 text-white placeholder-zinc-400 border-zinc-700/50 backdrop-blur-sm'
              : 'bg-white/80 text-zinc-900 placeholder-zinc-500 border-zinc-300/50 backdrop-blur-sm'
            } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
        />
        <svg
          className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5
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
      </div>
    </div>
  </div>

  {/* Mobile menu dropdown */}
{mobileMenuOpen && (
  <>
    {/* Backdrop overlay */}
   <div 
  className="fixed inset-0 z-40 flex items-start justify-end pr-8 pt-20"
  onClick={() => setMobileMenuOpen(false)}
>
      {/* Modal popup */}
      <div
        className={`w-96 h-[33rem] max-w-md mx-4 rounded-2xl shadow-2xl overflow-hidden 
          ${darkMode
            ? 'bg-zinc-900'
            : 'bg-white'
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Menu content */}
       <div className="px-6 py-6 space-y-4 max-h-[80vh] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">

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
          </div>

          {/* Discover link */}
          <a
            href="#"
            className={`flex items-center gap-2 py-2 px-2 rounded-lg transition-colors
              ${darkMode
                ? 'text-zinc-300 hover:bg-zinc-800'
                : 'text-zinc-700 hover:bg-zinc-100'
              }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Discover inspiring campaigns →</span>
          </a>

          {/* Main menu items with icons */}
          <div className="space-y-1 border-t border-b py-3 border-zinc-200 dark:border-zinc-700">
            {[
              { name: 'Deeds', icon: '+', color: 'text-emerald-600' },
              { name: 'Palestine', icon: '❤️', color: 'text-red-600' },
              { name: 'Daily Givers', icon: '🟢', color: 'text-emerald-600' },
              { name: 'Zakat', icon: '☪️', color: 'text-emerald-600' }
            ].map(item => (
              <a
                key={item.name}
                href="#"
                className={`flex items-center gap-3 py-2 px-2 rounded-lg transition-colors
                  ${darkMode
                    ? 'text-zinc-300 hover:bg-zinc-800'
                    : 'text-zinc-700 hover:bg-zinc-100'
                  }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className={item.color}>{item.icon}</span>
                <span>{item.name}</span>
              </a>
            ))}
          </div>

          {/* Start section */}
          <div>
            <p className={`text-xs font-semibold mb-2 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
              START
            </p>
            <div className="space-y-1">
              <a
                href="#"
                className={`flex items-center justify-between py-2 px-2 rounded-lg transition-colors
                  ${darkMode
                    ? 'text-zinc-300 hover:bg-zinc-800'
                    : 'text-zinc-700 hover:bg-zinc-100'
                  }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <span>✈️</span>
                  <span>Start fundraising</span>
                </div>
                <span className="text-xs text-emerald-600 font-medium">0% platform fee!</span>
              </a>
              <a
                href="#"
                className={`flex items-center gap-2 py-2 px-2 rounded-lg transition-colors
                  ${darkMode
                    ? 'text-zinc-300 hover:bg-zinc-800'
                    : 'text-zinc-700 hover:bg-zinc-100'
                  }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>👥</span>
                <span>Start a community</span>
              </a>
            </div>
          </div>

          {/* Support */}
          <a
            href="#"
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
          <div className="space-y-1 border-t pt-3 border-zinc-200 dark:border-zinc-700">
            <a
              href="#"
              className={`block text-center py-2 px-4 rounded-lg transition-colors
                ${darkMode
                  ? 'text-zinc-300 hover:bg-zinc-800'
                  : 'text-zinc-700 hover:bg-zinc-100'
                }`}
            >
              Sign up
            </a>
            <a
              href="#"
              className={`block text-center py-2 px-4 rounded-lg transition-colors
                ${darkMode
                  ? 'text-zinc-300 hover:bg-zinc-800'
                  : 'text-zinc-700 hover:bg-zinc-100'
                }`}
            >
              Log in
            </a>
          </div>
        </div>
      </div>
    </div>
  </>
)}
</header>

      {/* Hero Section */}
      <section className="relative pt-16">
        <div className="absolute inset-0">
          {heroImages.map((img, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                currentHeroImage === idx ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/70 via-zinc-800/60 to-emerald-900/50"></div>
            </div>
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-2xl rounded-xl bg-white/90 backdrop-blur p-6">
            <h1 className="text-3xl md:text-5xl font-semibold leading-tight text-zinc-900">
              Rebuild shattered lives. Stand with Gaza.
            </h1>
            <p className="mt-3 md:mt-4 text-base md:text-lg text-zinc-600">
              TPF Aid mobilizes fast, transparent support to deliver urgent relief and long-term recovery for families in crisis.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors">
                Send urgent aid
              </button>
              <button className="px-6 py-3 border border-emerald-600 text-emerald-700 hover:bg-emerald-50 rounded-lg font-medium transition-colors">
                Discover campaigns
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Campaigns Section */}
      <section id="campaigns" className={`py-14 ${darkMode ? 'bg-zinc-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl md:text-2xl font-semibold ${COLORS.neutralHeading}`}>
              Fundraising now
            </h2>
            <a href="#" className="text-sm font-medium text-emerald-700 hover:underline">
              Discover more
            </a>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
            {categories.map((cat) => {
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-sm transition-colors flex items-center gap-2 ${
                    selectedCategory === cat.key
                      ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                      : darkMode 
                        ? "border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                        : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div 
            id="campaigns-container"
            className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible"
          >
            {filteredCampaigns.map((campaign) => {
              const progress = Math.min(100, Math.round((campaign.raised / campaign.goal) * 100));
              return (
                <div 
                  key={campaign.id}
                  className={`flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-auto snap-center rounded-2xl overflow-hidden transition-all duration-300
                    ${darkMode ? 'bg-zinc-800' : 'bg-white'}
                    shadow-[0_4px_10px_rgba(110,231,183,0.4)] hover:shadow-[0_6px_14px_rgba(16,185,129,0.6)]`}
                >
                  <div className="relative aspect-video">
                    <img
                      src={campaign.image}
                      alt={campaign.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    {/* {campaign.verified && (
                      <div className="absolute bottom-3 right-3 bg-emerald-600 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Zakaat Verified
                      </div>
                    )} */}
                    {campaign.urgent && (
                      <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
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

              <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-medium text-sm transition-colors mb-4">
  Donate Now
</button>

<div className="flex items-center justify-between pt-4 border-t border-zinc-200 dark:border-zinc-700">
  <div className="flex items-center gap-4">
    <button className="flex items-center gap-1 text-zinc-600 hover:text-red-600 transition-colors">
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    </button>
    <button className="flex items-center gap-1 text-zinc-600 hover:text-emerald-600 transition-colors">
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
            })}
          </div>
        </div>
      </section>

      {/* Curated Section */}
     <section id="curated" className={`py-14 ${darkMode ? 'bg-zinc-800' : 'bg-zinc-50'}`}>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-10">
      <h2 className={`text-xl md:text-2xl font-semibold ${COLORS.neutralHeading} mb-2`}>
        Curated for you
      </h2>
      <p className={`text-sm ${COLORS.neutralBody}`}>
        Explore causes that matter most to our community
      </p>
    </div>
   <div 
  id="curated-container"
  className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide lg:grid lg:grid-cols-3 lg:overflow-visible"
>
  {curatedItems.map((item, idx) => (
    <button
      key={idx}
      className={`flex-shrink-0 w-[85vw] sm:w-[70vw] lg:w-auto snap-center group relative flex flex-col items-center justify-center p-6 rounded-xl overflow-hidden transition-all duration-300 ${
        darkMode ? 'bg-zinc-900' : 'bg-white'
      } border ${darkMode ? 'border-zinc-700 hover:border-emerald-600' : 'border-zinc-200 hover:border-emerald-600'} shadow-[0_2px_6px_rgba(110,231,183,0.25)] hover:shadow-[0_4px_12px_rgba(16,185,129,0.4)]`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
      
      <div className="relative h-48 overflow-hidden w-full">
        <img 
          src={item.image} 
          alt={item.label}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
      </div>

      <div className="p-5">
        <h3 className={`text-lg font-semibold mb-2 ${COLORS.neutralHeading} group-hover:text-emerald-600 transition-colors duration-300`}>
          {item.label}
        </h3>
        <p className={`text-sm ${COLORS.neutralBody}`}>
          {item.description}
        </p>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </button>
  ))}
</div>
  </div>
</section>


      {/* Impact Banner */}
      <section className={`py-14 ${darkMode ? 'bg-zinc-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-zinc-900/60"></div>
            <img
              src={heroImages[0]}
              alt="Stand with Gaza"
              className="h-64 md:h-80 w-full object-cover"
            />
            <div className="absolute inset-0 p-6 md:p-10 flex items-center">
              <div className="max-w-xl text-white">
                <h3 className="text-2xl md:text-3xl font-semibold mb-3">
                  Stand with Gaza every single day
                </h3>
                <p className="text-sm md:text-base text-white/90 mb-5">
                  Your steady support helps deliver food, shelter, medical care, and dignity to families in crisis.
                </p>
                <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors">
                  Sign up for Daily Givers
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className={`py-14 ${darkMode ? 'bg-zinc-800' : 'bg-zinc-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className={`text-xl md:text-2xl font-semibold ${COLORS.neutralHeading} mb-2`}>
              Inspiring organizations
            </h2>
            <p className={`text-sm ${COLORS.neutralBody}`}>
              Trusted partners we collaborate with to deliver impact
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5">
            {partners.map((partner, idx) => (
            <div 
  key={idx}
  className={`group relative flex flex-col items-center justify-center p-6 rounded-xl overflow-hidden transition-all duration-300 ${
    darkMode ? 'bg-zinc-900' : 'bg-white'
  } border ${darkMode ? 'border-zinc-700 hover:border-emerald-600' : 'border-zinc-200 hover:border-emerald-600'} shadow-[0_2px_6px_rgba(110,231,183,0.25)] hover:shadow-[0_4px_12px_rgba(16,185,129,0.4)]`}
>
                <div className={`absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
               <div className="relative w-20 h-20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 overflow-hidden">
  <img 
    src={partner.image}
    alt={partner.name}
    className="w-full h-full object-cover"
  />
</div>
                <span className={`relative mt-3 text-xs font-medium ${COLORS.neutralBody} text-center group-hover:text-emerald-600 transition-colors duration-300`}>{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pulse Section */}
      <section id="pulse" className={`py-14 ${darkMode ? 'bg-zinc-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className={`text-xl md:text-2xl font-semibold ${COLORS.neutralHeading} mb-2`}>
              Pulse of the Ummah
            </h2>
            <p className={`text-sm ${COLORS.neutralBody}`}>
              Live generosity snapshot
            </p>
          </div>
          
          <div className="flex flex-col items-center mb-10">
            <div className={`relative inline-block px-8 py-4 rounded-2xl ${darkMode ? 'bg-zinc-800' : 'bg-zinc-50'} pulse-glow`}>
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                {currency(totalRaised)}
              </div>
            </div>
            <div className={`text-sm ${COLORS.neutralBody} mt-3`}>raised in the last hour</div>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {recentDonations.map((donation, idx) => (
            <div 
  key={idx}
  className={`relative group p-5 rounded-xl text-center overflow-hidden transition-all duration-300 ${
    darkMode ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-zinc-50 hover:bg-white'
  } border ${darkMode ? 'border-zinc-700' : 'border-zinc-200'} hover:border-emerald-600 shadow-[0_2px_6px_rgba(110,231,183,0.25)] hover:shadow-[0_4px_12px_rgba(16,185,129,0.4)]`}
>
                  <div className={`absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  <div className="relative">
                    <div className={`text-lg font-bold ${COLORS.neutralHeading} mb-1`}>
                      {currency(donation.amount)}
                    </div>
                    <div className={`text-xs ${COLORS.neutralBody}`}>
                      {donation.name}
                    </div>
                    <div className={`text-xs ${COLORS.neutralBody} opacity-60 mt-1`}>
                      {donation.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stories Section */}
      <section id="stories" className={`py-14 ${darkMode ? 'bg-zinc-800' : 'bg-zinc-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-xl md:text-2xl font-semibold ${COLORS.neutralHeading} mb-2`}>
            Impact stories
          </h2>
          <p className={`text-sm ${COLORS.neutralBody} mb-6`}>
            Real change made possible by your generosity.
          </p>
          
          <div 
            id="stories-container"
            className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-3 md:overflow-visible"
          >
            {successStories.map((story, idx) => (
              <div 
                key={idx}
                className={`flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-auto snap-center rounded-2xl overflow-hidden transition-all duration-300
                  ${darkMode ? 'bg-zinc-800' : 'bg-white'}
                  shadow-[0_4px_10px_rgba(110,231,183,0.4)] hover:shadow-[0_6px_14px_rgba(16,185,129,0.6)]`}
              >
                <img
                  src={story.image}
                  alt={story.title}
                  className="h-44 w-full object-cover"
                />
                <div className="p-5">
                  <h3 className={`font-semibold text-base ${COLORS.neutralHeading} mb-2`}>
                    {story.title}
                  </h3>
                  <p className={`text-sm ${COLORS.neutralBody} mb-3`}>
                    {story.excerpt}
                  </p>
                  <a href="#" className="text-sm font-medium text-emerald-700 hover:underline flex items-center gap-1">
                    Read more 
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 border-t ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-neutral-100 border-zinc-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
            {/* Logo and Tagline */}
            <div className="md:col-span-1">
            <Image
  src={darkMode ? "/TPFAid-Logo1.png" : "/TPFAid-Logo.png"}
  alt="TPF Aid Logo"
  width={160}
  height={160}
  priority
  className="cursor-pointer mb-4"
/>
              <p className={`text-sm font-semibold ${darkMode ? 'text-zinc-400' : 'text-gray-600'} leading-relaxed`}>
                Making a difference through community-funded projects and transparent impact.
              </p>
            </div>

            {/* About TPF */}
            <div>
              <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>About TPF</div>
              <ul className="space-y-2.5 text-sm">
                {['About TPF', 'TPF Mission', 'Our Founder', 'Our Team', 'TPF Blog', 'FAQs'].map(item => (
                  <li key={item}>
                    <a href="#" className={`${darkMode ? 'text-zinc-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* What We Do */}
            <div>
              <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>What We Do</div>
              <ul className="space-y-2.5 text-sm">
                {['Social Services', 'TPF School', 'TPF Hospital', 'TPF Dawah Centre', 'Future Projects'].map(item => (
                  <li key={item}>
                    <a href="#" className={`${darkMode ? 'text-zinc-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Get Involved */}
            <div>
              <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Get Involved</div>
              <ul className="space-y-2.5 text-sm">
                {['Join as Volunteer', 'Start a Fundraiser', 'Zakat', 'Emergency Funds', 'TPF AID in News'].map(item => (
                  <li key={item}>
                    <a href="#" className={`${darkMode ? 'text-zinc-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal & Help */}
            <div>
              <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Legal & Help</div>
              <ul className="space-y-2.5 text-sm">
                {['Legal', 'Privacy Policy', 'Terms & Conditions', 'Use of Cookies', 'Help Centre', 'Contact Us'].map(item => (
                  <li key={item}>
                    <a href="#" className={`${darkMode ? 'text-zinc-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className={`pt-6 border-t ${darkMode ? 'border-zinc-700' : 'border-zinc-300'} flex flex-col sm:flex-row items-center justify-between gap-4`}>
            <span className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
              © {new Date().getFullYear()} True Path Foundation. All rights reserved.
            </span>
            <div className="flex items-center gap-3">
              <a href="#" className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center justify-center transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 bg-blue-400 hover:bg-blue-500 text-white rounded flex items-center justify-center transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 bg-red-600 hover:bg-red-700 text-white rounded flex items-center justify-center transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gray-900 text-white rounded flex items-center justify-center transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {scrolled && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 w-12 h-12 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 flex items-center justify-center z-40 transition-all"
          aria-label="Scroll to top"
        >
          <ChevronRight className="w-6 h-6 -rotate-90" />
        </button>
      )}
    </div>
  );
}