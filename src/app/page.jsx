'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X, Users, ChevronRight, CheckCircle, ArrowRight, Moon, Sun } from 'lucide-react';
import { lazy } from 'react';
import HijriDate from "hijri-date";


export default function TPFAidMinimal() {



  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hijriFromApi, setHijriFromApi] = useState(null);
const [isMobile, setIsMobile] = useState(false);
  const [totalRaised, setTotalRaised] = useState(2547893);
  const [scrolled, setScrolled] = useState(false);
  const [isUserScrolling, setIsUserScrolling] = useState({
  campaigns: false,
  stories: false,
  curated: false
});
const [darkMode, setDarkMode] = useState(() => {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('darkMode');
      return saved ? JSON.parse(saved) : false;
    } catch (error) {
      console.error('localStorage not available:', error);
      return false;
    }
  }
  return false;
});
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [curatedScrollIndex, setCuratedScrollIndex] = useState(0);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [campaignScrollIndex, setCampaignScrollIndex] = useState(0);
  const [storyScrollIndex, setStoryScrollIndex] = useState(0);

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
      image: "https://images.unsplash.com/photo-1672985020068-75281fd2a8d2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWVkaWNhbCUyMHN1cHBsaWVzJTIwZm9yJTIwZmllbGQlMjBjbGluaWNzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
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
      image: "https://images.unsplash.com/photo-1727627441693-8f3be59d1778?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2FmZSUyMGhvdXNpbmclMjBmb3IlMjBkaXNwbGFjZWQlMjBvcnBoYW5zfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
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
      image: "https://images.unsplash.com/photo-1708795921291-0cf575279404?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2Nob29sJTIwa2l0cyUyMGZvciUyMGNoaWxkcmVufGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
      raised: 18750,
      goal: 30000,
      donors: 156,
      org: "TPF Aid Education",
      verified: true,
      urgent: true
    }
  ];

   const successStories = [
    {
      title: "Your donations delivered winter kits to 1,200 families",
      image: "https://plus.unsplash.com/premium_photo-1661964155049-f8a24a60be74?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZG9uYXRpb25zJTIwZGVsaXZlcmVkJTIwd2ludGVyJTIwa2l0cyUyMHRvJTIwMSUyQzIwMCUyMGZhbWlsaWVzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
      excerpt: "Blankets, heaters, and fuel vouchers have reached those most in need."
    },
    {
      title: "A new water point is serving 3,000 daily",
      image: "https://images.unsplash.com/photo-1559079236-2e64f89c7764?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fENsZWFuJTJDJTIwc2FmZSUyMHdhdGVyJTIwaXMlMjBub3clMjBhY2Nlc3NpYmxlJTIwd2l0aGluJTIwd2Fsa2luZyUyMGRpc3RhbmNlLnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
      excerpt: "Clean, safe water is now accessible within walking distance."
    },
    {
      title: "School-in-a-box restarted classes in the camps",
      image: "https://images.unsplash.com/photo-1726726192151-6d4139ff229d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fFBvcnRhYmxlJTIwc2Nob29sJTIwa2l0cyUyMGJyb3VnaHQlMjBzdHJ1Y3R1cmVkJTIwbGVhcm5pbmclMjBiYWNrJTIwdG8lMjBjaGlsZHJlbi58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
      excerpt: "Portable school kits brought structured learning back to children."
    }
  ];

   const curatedItems = [
  { 
    label: "Daily Giver", 
    image: "https://images.unsplash.com/photo-1677128912094-36d988ce198b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhlbHAlMjBwcm92aWRlJTIwbWVhbHMlMjBmb3IlMjB0aG9zZSUyMGluJTIwbmVlZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
    description: "Help provide meals to those in need"
  },
  { 
    label: "Donate Weekly (Friday) ", 
    image: "https://media.istockphoto.com/id/2159138979/photo/muslim-boy-donating-money.webp?a=1&b=1&s=612x612&w=0&k=20&c=1Ib35R9k_UjN6LC_h117cLRyOvINJ6iZ6bBkwVlSix8=",
    description: "Make a lasting impact every Jumu’ah with your weekly giving."
  },
  { 
    label: "Donate Monthly", 
    image: "https://images.unsplash.com/photo-1576465767066-87fadbc4c2d8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fHN1cHBvcnQlMjBodW1hbml0YXJpYW4lMjByZWxpZWYlMjBlZmZvcnRzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
    description: "Support ongoing causes with consistent monthly donations."
  },
  { 
    label: "Donate Your Zakat", 
    image: "https://media.istockphoto.com/id/1312575736/photo/concept-of-zakat-in-islam-religion-selective-focus-of-money-and-rice-with-alphabet-of-zakat.webp?a=1&b=1&s=612x612&w=0&k=20&c=SO0YUYqqHjRLRxMD5wiWNANHSD4pGII19FzfqHvcdPw=",
    description: "Fulfill your obligation and uplift those most in need."
  },
  { 
    label: "Discover Fundraiser", 
    image: "https://images.unsplash.com/photo-1643429096345-9de0d2ab7e7c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2l2ZSUyMGlzbGFtaWMlMjBjaGlsZHJlbiUyMGElMjBicmlnaHQlMjBmdXR1cmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
    description: "Explore campaigns that inspire change and save lives."
  },
  { 
    label: "Donate in Emergency Funds", 
    image: "https://plus.unsplash.com/premium_photo-1683140538884-07fb31428ca6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGRvbmF0ZSUyMGluJTIwZW1lcmdlbmN5JTIwZnVuZHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
    description: "Be the first to respond when disaster strikes."
  },
   { 
    label: "Eid Kits(Eid-al-Fitr)", 
    image: "https://i.etsystatic.com/27296220/r/il/cd44af/3622176989/il_570xN.3622176989_2kws.jpg",
    description: "Share the joy of Eid with families who need it most."
  },

   { 
    label: "Legal Aid for the Voiceless", 
    image: "https://media.istockphoto.com/id/2014292728/photo/judges-gavel-as-a-symbol-of-legal-system-and-wooden-stand-with-text-word.webp?a=1&b=1&s=612x612&w=0&k=20&c=lyx0WuVJC-yMC5BbA3y70una6t0ttX2fqi7m5EI7Awg=",
    description: "Help defend the rights of those without representation."
  },
   { 
    label: "Shelter and Home Support ", 
    image: "https://plus.unsplash.com/premium_photo-1683135030516-6317ed744628?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2hlbHRlciUyMGFuZCUyMGhvbWUlMjBzdXBwb3J0JTIwZm9yJTIwcGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
    description: "Provide warmth, safety, and dignity to the homeless."
  },
   { 
    label: "Financial Emergency Aid ", 
    image: "https://media.istockphoto.com/id/813320518/photo/social-assistance.webp?a=1&b=1&s=612x612&w=0&k=20&c=ViKfqudhFcslXku_zcd9RYePinRk6gWWi1S7qL6kVwI=",
    description: "Offer immediate relief to families facing hardship."
  },
   { 
    label: "Global Muslim Crisis Support ", 
    image: "https://images.unsplash.com/photo-1573886578907-58681efbaad3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8R2xvYmFsJTIwTXVzbGltJTIwQ3Jpc2lzJTIwU3VwcG9ydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
    description: "Stand with Muslim communities in crisis worldwide."
  },
   { 
    label: "Assistance for Marginalized Communities", 
    image: "https://media.istockphoto.com/id/537311780/photo/unity-of-indian-children-asia.webp?a=1&b=1&s=612x612&w=0&k=20&c=Z3vpXyVtDv0xzqOX2FDbdxn4kyIbwpO3xrGakyYPN1k=",
    description: "Empower those left behind through your compassion."
  },
   { 
    label: "Community Development", 
    image: "https://media.istockphoto.com/id/981339754/photo/silhouette-of-engineer-and-construction-team-working-at-site-over-blurred-background-sunset.webp?a=1&b=1&s=612x612&w=0&k=20&c=ftbsxL76vkKvsB8WUO-FMrCHyjrRJKzLpZ_evRWJR4E=",
    description: "Invest in education, growth, and a better tomorrow."
  },
];

  const filteredCampaigns = selectedCategory === 'all' 
    ? campaigns 
    : campaigns.filter(c => c.category === selectedCategory);
  // Duplicate arrays for infinite scroll effect


  const COLORS = {
    primary: "bg-emerald-600",
    primaryText: "text-emerald-600",
    neutralHeading: darkMode ? "text-white" : "text-zinc-900",
    neutralBody: darkMode ? "text-zinc-400" : "text-zinc-600",
  };

  const heroImages = [
    "https://images.unsplash.com/photo-1622864352372-a68fa7dac64e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fFN0YW5kJTIwd2l0aCUyMEdhemF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=80",
    "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200&q=80"
  ];

  // Duplicate arrays for infinite scroll effect
const infiniteCampaigns = [...filteredCampaigns, ...filteredCampaigns];
const infiniteStories = [...successStories, ...successStories];
const infiniteCurated = [...curatedItems, ...curatedItems];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage(prev => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

useEffect(() => {
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Aref+Ruqaa:wght@400;700&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
  
  return () => {
    document.head.removeChild(link);
  };
}, []);

useEffect(() => {
  const checkMobile = () => {
    setIsMobile(window.innerWidth < 768);
  };
  
  checkMobile();
  window.addEventListener('resize', checkMobile);
  
  return () => window.removeEventListener('resize', checkMobile);
}, []);

useEffect(() => {
  async function fetchHijri() {
    try {
      const today = new Date();
      const d = today.getDate();
      const m = today.getMonth() + 1;
      const y = today.getFullYear();
      const dateStr = `${d}-${m}-${y}`;

      const res = await fetch(`https://api.aladhan.com/v1/gToH?date=${dateStr}`);
      const json = await res.json();


      const hijri = json?.data?.hijri;
      const greg = json?.data?.gregorian;

      if (!hijri || !greg) return;

      const monthName = hijri.month?.en || hijriMonths[Number(hijri.month)-1];

      const formatted = `${monthName} ${hijri.day}, ${hijri.year}  (${greg.weekday.en}, ${greg.date})`;

      setHijriFromApi(formatted);
    } catch (err) {
      console.error("Failed to fetch Hijri date", err);
    }
  }

  fetchHijri();
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


useEffect(() => {
  try {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
}, [darkMode]);

 const today = new Date();

  const hijriMonths = [
    "Muharram",
    "Safar",
    "Rabi’ al-Awwal",
    "Rabi’ ath-Thani",
    "Jumada al-Ula",
    "Jumada ath-Thani",
    "Rajab",
    "Sha’ban",
    "Ramadan",
    "Shawwal",
    "Dhu al-Qa’dah",
    "Dhu al-Hijjah"
  ];

  // 1) Hijri date parts
 const h = new HijriDate(); // moonsighting / global

const hijriFormatted = `${hijriMonths[h.getMonth()]} ${h.getDate()}, ${h.getFullYear()} `;


  // const dayHijri = islamic.find(p => p.type === "day").value;
  // const monthHijriIndex = +islamic.find(p => p.type === "month").value - 1;
  // const yearHijri = islamic.find(p => p.type === "year").value;

 


  // 2) Gregorian with weekday
  const gregorianFormatted = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

 

  const categories = [
    { key: "all", label: "All" },
    { key: "emergency", label: "Emergency Aid"},
    { key: "medical", label: "Medical Aid"},
    { key: "orphans", label: "Orphans" },
    { key: "education", label: "Education"},
    { key: "water", label: "Clean Water"}
  ];

 

const partners = [
   { name: "Seed Charity", image: "https://cdn.builder.io/api/v1/image/assets%2Fc05b786f1645447ab878b73ca4dd6870%2Ff0e211f4eed743b9a70fe6b4b6001b85?format=webp&width=2000" },
  { name: "Global Family Aid", image: "https://cdn.builder.io/api/v1/image/assets%2Fc05b786f1645447ab878b73ca4dd6870%2Fe9df5f33b91d46a293a5d3c661e5ad00?format=webp&width=2000" },
  { name: "Human Relief", image: "https://cdn.builder.io/api/v1/image/assets%2Fc05b786f1645447ab878b73ca4dd6870%2F1bf296792ea647b9aa7980631140b241?format=webp&width=2000" },
  { name: "Maan", image: "https://cdn.builder.io/api/v1/image/assets%2Fc05b786f1645447ab878b73ca4dd6870%2F9256431f39904e7997bbf0d7f19e2f96?format=webp&width=2000" },
  { name: "UN-ICC", image: "https://cdn.builder.io/api/v1/image/assets%2Fc05b786f1645447ab878b73ca4dd6870%2Fed5a55b79ee24f20a5cc6fd1abe39177?format=webp&width=2000" },
  { name: "Little Tree Foundation", image: "https://cdn.builder.io/api/v1/image/assets%2Fc05b786f1645447ab878b73ca4dd6870%2F4d5eb38bd91446389d6773e87a9aa424?format=webp&width=2000" }
 
];

const communities=[
  {
    name: "Blood Community", image: "https://openclipart.org/image/800px/154351"
  }
]

  const recentDonations = [
    { name: "Anonymous", amount: 500, time: "2 min ago" },
    { name: "Ahmed K.", amount: 250, time: "5 min ago" },
    { name: "Fatima S.", amount: 1000, time: "8 min ago" },
    { name: "Anonymous", amount: 100, time: "12 min ago" },
    { name: "Yusuf M.", amount: 750, time: "15 min ago" }
  ];

 



 // Auto-scroll campaigns


// Scroll campaigns with infinite effect


// Auto-scroll stories

// Scroll stories with infinite effect


  // Scroll campaigns on mobile
 

  // Scroll stories on mobile


// Auto-scroll for curated on mobile
// Auto-scroll curated

// Scroll curated with infinite effect


// Scroll curated on mobile


// Auto-scroll for campaigns (mobile only)
useEffect(() => {
  if (!isMobile || isUserScrolling.campaigns) return;

  const interval = setInterval(() => {
    setCampaignScrollIndex(prev => prev + 1);
  }, 4000);

  return () => clearInterval(interval);
}, [isMobile, isUserScrolling.campaigns]);


// Scroll campaigns container

useEffect(() => {
  if (!isMobile) return;

  const container = document.getElementById('campaigns-container');
  if (!container) return;

  const cardWidth = container.offsetWidth;
  const scrollTo = cardWidth * campaignScrollIndex;
  
  container.scrollTo({
    left: scrollTo,
    behavior: 'smooth'
  });

  // Reset to beginning without animation when reaching the duplicate set
  if (campaignScrollIndex >= filteredCampaigns.length) {
    setTimeout(() => {
      container.scrollTo({
        left: 0,
        behavior: 'auto' // instant, no animation
      });
      setCampaignScrollIndex(0);
    }, 500); // after smooth scroll completes
  }
}, [campaignScrollIndex, isMobile, filteredCampaigns.length]);


// Auto-scroll for stories (mobile only)
useEffect(() => {
  if (!isMobile || isUserScrolling.stories) return;

  const interval = setInterval(() => {
    setStoryScrollIndex(prev => prev + 1);
  }, 4000);

  return () => clearInterval(interval);
}, [isMobile, isUserScrolling.stories]);



// Scroll stories container
useEffect(() => {
  if (!isMobile) return;

  const container = document.getElementById('stories-container');
  if (!container) return;

  const cardWidth = container.offsetWidth;
  const scrollTo = cardWidth * storyScrollIndex;
  
  container.scrollTo({
    left: scrollTo,
    behavior: 'smooth'
  });

  // Reset to beginning without animation
  if (storyScrollIndex >= successStories.length) {
    setTimeout(() => {
      container.scrollTo({
        left: 0,
        behavior: 'auto'
      });
      setStoryScrollIndex(0);
    }, 500);
  }
}, [storyScrollIndex, isMobile, successStories.length]);


// Auto-scroll for curated (mobile only)
useEffect(() => {
  if (!isMobile || isUserScrolling.curated) return;

  const interval = setInterval(() => {
    setCuratedScrollIndex(prev => prev + 1);
  }, 4000);

  return () => clearInterval(interval);
}, [isMobile, isUserScrolling.curated]);



// Scroll curated container
useEffect(() => {
  if (!isMobile) return;

  const container = document.getElementById('curated-container');
  if (!container) return;

  const cardWidth = container.offsetWidth;
  const scrollTo = cardWidth * curatedScrollIndex;
  
  container.scrollTo({
    left: scrollTo,
    behavior: 'smooth'
  });

  // Reset to beginning without animation
  if (curatedScrollIndex >= curatedItems.length) {
    setTimeout(() => {
      container.scrollTo({
        left: 0,
        behavior: 'auto'
      });
      setCuratedScrollIndex(0);
    }, 500);
  }
}, [curatedScrollIndex, isMobile, curatedItems.length]);


// Handle user scrolling detection
useEffect(() => {
  if (!isMobile) return;

  const containers = [
    { id: 'campaigns-container', key: 'campaigns' },
    { id: 'stories-container', key: 'stories' },
    { id: 'curated-container', key: 'curated' }
  ];

  const handlers = [];

  containers.forEach(({ id, key }) => {
    const container = document.getElementById(id);
    if (!container) return;

    let scrollTimeout;
    let isScrolling = false;

    const handleScrollStart = () => {
      if (!isScrolling) {
        isScrolling = true;
        setIsUserScrolling(prev => ({ ...prev, [key]: true }));
      }
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
        setIsUserScrolling(prev => ({ ...prev, [key]: false }));
      }, 2000); // Resume auto-scroll 2 seconds after user stops
    };

    container.addEventListener('scroll', handleScrollStart, { passive: true });
    handlers.push({ container, handleScrollStart });
  });

  return () => {
    handlers.forEach(({ container, handleScrollStart }) => {
      container.removeEventListener('scroll', handleScrollStart);
    });
  };
}, [isMobile]);

  const currency = (amount) => {
    return new Intl.NumberFormat("en-IN", { 
      style: "currency", 
      currency: "INR", 
      maximumFractionDigits: 0 
    }).format(amount);
  };


  // Handle seamless infinite loop for manual scrolling
useEffect(() => {
  if (!isMobile) return;

  const containers = [
    { id: 'campaigns-container', length: filteredCampaigns.length, setIndex: setCampaignScrollIndex },
    { id: 'stories-container', length: successStories.length, setIndex: setStoryScrollIndex },
    { id: 'curated-container', length: curatedItems.length, setIndex: setCuratedScrollIndex }
  ];

  const observers = [];

  containers.forEach(({ id, length, setIndex }) => {
    const container = document.getElementById(id);
    if (!container) return;

    const handleScrollEnd = () => {
      const cardWidth = container.offsetWidth;
      const scrollLeft = container.scrollLeft;
      const currentIndex = Math.round(scrollLeft / cardWidth);

      // If user scrolled past the original items into duplicates
      if (currentIndex >= length) {
        const equivalentIndex = currentIndex - length;
        container.scrollTo({
          left: equivalentIndex * cardWidth,
          behavior: 'auto' // instant jump
        });
        setIndex(equivalentIndex);
      }
      // If user scrolled backwards before 0 (shouldn't happen but just in case)
      else if (currentIndex < 0) {
        container.scrollTo({
          left: (length + currentIndex) * cardWidth,
          behavior: 'auto'
        });
        setIndex(length + currentIndex);
      }
    };

    let scrollTimeout;
    const onScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScrollEnd, 150);
    };

    container.addEventListener('scroll', onScroll, { passive: true });
    observers.push({ container, onScroll });
  });

  return () => {
    observers.forEach(({ container, onScroll }) => {
      container.removeEventListener('scroll', onScroll);
    });
  };
}, [isMobile, filteredCampaigns.length, successStories.length, curatedItems.length]);

  return (
<div className={`min-h-screen ${darkMode ? 'bg-zinc-900' : 'bg-white'}`}>
<style jsx global>{`
* {
  font-family: 'Aref Ruqaa', serif !important;
}
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
      placeholder="Discover inspiring causes"
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
      <span className={`w-1 h-1 rounded-full ${darkMode ? 'bg-emerald-400' : 'bg-emerald-500'} animate-[ping_1.5s_ease-in-out_infinite]`} style={{animationDelay: '0s'}} />
      <span className={`w-1 h-1 rounded-full ${darkMode ? 'bg-teal-400' : 'bg-teal-500'} animate-[ping_1.5s_ease-in-out_infinite]`} style={{animationDelay: '0.3s'}} />
      <span className={`w-1 h-1 rounded-full ${darkMode ? 'bg-cyan-400' : 'bg-cyan-500'} animate-[ping_1.5s_ease-in-out_infinite]`} style={{animationDelay: '0.6s'}} />
    </div>
  </div>
</div>

      {/* RIGHT – Actions */}
      <div className="flex items-center gap-3">
        {/* Start Fundraising – desktop only */}
        <button className="hidden md:flex items-center justify-center gap-2 px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-medium transition-colors cursor-pointer">
          Start fundraising
        </button>

        {/* Zakaat icon */}
        <button
          aria-label="Zakaat"
          className={`p-2 rounded-full transition-colors cursor-pointer
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
          className={`p-2 rounded-full transition-colors cursor-pointer
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
          className={`p-2 rounded-full transition-colors cursor-pointer
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
      placeholder="Discover inspiring causes"
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
      <span className={`w-1 h-1 rounded-full ${darkMode ? 'bg-emerald-400' : 'bg-emerald-500'} animate-[ping_1.5s_ease-in-out_infinite]`} style={{animationDelay: '0s'}} />
      <span className={`w-1 h-1 rounded-full ${darkMode ? 'bg-teal-400' : 'bg-teal-500'} animate-[ping_1.5s_ease-in-out_infinite]`} style={{animationDelay: '0.3s'}} />
      <span className={`w-1 h-1 rounded-full ${darkMode ? 'bg-cyan-400' : 'bg-cyan-500'} animate-[ping_1.5s_ease-in-out_infinite]`} style={{animationDelay: '0.6s'}} />
    </div>
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
        className={`fixed md:relative right-0 top-0 h-full md:h-[33rem] w-full md:w-96 md:max-w-md md:mx-4 md:rounded-2xl shadow-2xl overflow-hidden transition-transform duration-300 ease-in-out
          ${darkMode
            ? 'bg-zinc-900'
            : 'bg-white'
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
          </a>

          {/* Main menu items with icons */}
<div className="space-y-1 border-t border-b py-3 border-zinc-200 dark:border-zinc-700">
  {[
    { name: 'Deeds', icon: '/deeds.svg' },
    { name: 'Palestine', icon: '/heart.svg' },
    { name: 'Daily Givers', icon: '/leaf.svg' },
    { name: 'Zakat', icon: '/zakkat.svg' }
  ].map(item => (
    <a
      key={item.name}
      href="#"
      className={`group flex items-center gap-3 py-2 px-2 rounded-lg transition-all duration-300
        ${darkMode
          ? 'text-zinc-300 hover:bg-zinc-800'
          : 'text-zinc-700 hover:bg-zinc-100'
        }`}
      onClick={() => setMobileMenuOpen(false)}
    >
      <Image
        src={item.icon}
        alt={item.name}
        width={20}
        height={20}
        className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1.5"
      />
      <span>{item.name}</span>
    </a>
  ))}
</div>


          {/* Start section */}
<div>
  <p
    className={`text-xs font-semibold mb-2 ${
      darkMode ? "text-zinc-500" : "text-zinc-400"
    }`}
  >
    START
  </p>
  <div className="space-y-1">
    {/* Start Fundraising */}
    <a
      href="#"
      className={`group flex items-center justify-between py-2 px-2 rounded-lg transition-all duration-300
        ${
          darkMode
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
    </a>

    {/* Start Community */}
    <a
      href="#"
      className={`group flex items-center gap-2 py-2 px-2 rounded-lg transition-all duration-300
        ${
          darkMode
            ? "text-zinc-300 hover:bg-zinc-800"
            : "text-zinc-700 hover:bg-zinc-100"
        }`}
      onClick={() => setMobileMenuOpen(false)}
    >
      <Image
        src="/community.svg"
        alt="Start a community"
        width={20}
        height={20}
        className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1.5"
      />
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

<section className="relative h-[500px] md:h-[600px] overflow-hidden">
  <div className="absolute inset-0">
    {heroImages.map((img, index) => (
      <div
        key={index}
        className={`absolute inset-0 transition-opacity duration-1000 ${
          index === currentHeroImage ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <img
          src={img}
          alt={`Hero ${index + 1}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40 md:from-black/70 md:via-black/50 md:to-transparent"></div>
      </div>
    ))}
  </div>

  <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
    <div className="max-w-2xl space-y-4 md:space-y-6 pt-16 md:pt-0">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
        Make a difference in someone's life today
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-zinc-200">
        Join thousands of donors supporting causes that matter. <br></br>
        Every contribution creates lasting impact.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2">
        <button className="w-full cursor-pointer sm:w-auto px-6 md:px-8 py-3 md:py-4 flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-base md:text-lg transition-colors shadow-lg">
          Start Giving
        </button>
        <button className={`w-full cursor-pointer sm:w-auto px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg transition-colors border-2
          ${darkMode 
            ? 'border-white text-white hover:bg-white/10' 
            : 'border-white text-white hover:bg-white/20'
          }`}>
          Learn More
        </button>
      </div>
    </div>
  </div>

  {/* Progress indicators */}
  <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
    {heroImages.map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrentHeroImage(index)}
        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
          index === currentHeroImage 
            ? 'w-8 bg-emerald-500' 
            : 'w-1.5 bg-white/50 hover:bg-white/75'
        }`}
        aria-label={`Go to slide ${index + 1}`}
      />
    ))}
  </div>
</section>
{/* Impact Stats Bar */}
<section className={`py-12 border-b ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {[
        { label: "Total Raised", value: currency(totalRaised) },
        { label: "Active Campaigns", value: "150+" },
        { label: "Lives Impacted", value: "50,000+" },
        { label: "Partner NGOs", value: `${partners.length}` }
      ].map((stat, index) => (
        <div key={index} className="text-center">
          <div className={`text-3xl md:text-4xl font-bold mb-2 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
            {stat.value}
          </div>
          <div className={`text-sm font-medium uppercase tracking-wider ${darkMode ? 'text-zinc-500' : 'text-zinc-600'}`}>
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Campaigns Section */}
      <section id="campaigns" className={`py-14 ${darkMode ? 'bg-zinc-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
           <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${COLORS.neutralHeading}`}>
        Fundraising now
      </h2>
            <button href="#" className="text-sm cursor-pointer font-medium bg-emerald-700 p-2 rounded-full text-white hover:animate-pulse cursor-pointer">
              Discover more
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
            {categories.map((cat) => {
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-sm cursor-pointer transition-colors flex items-center gap-2 ${
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
 {(isMobile ? infiniteCampaigns : filteredCampaigns).map((campaign, index) => {

    const progress = Math.min(100, Math.round((campaign.raised / campaign.goal) * 100));
    return (
      <div 
        key={`campaign-${campaign.id}-${index}`}  // Changed this line
        className={`flex-shrink-0 w-[280px] sm:w-[320px] md:w-auto snap-center rounded-2xl overflow-hidden transition-all duration-300
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

              <button className="w-full cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-medium text-sm transition-colors mb-4">
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
            })}
          </div>
        </div>
      </section>

      {/* Curated Section */}
 <section id="curated" className={`py-14 ${darkMode ? 'bg-zinc-900' : 'bg-zinc-50'}`}>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-10">
     <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${COLORS.neutralHeading}`}>
        Curated for you
      </h2>
      <p className={`text-sm ${COLORS.neutralBody}`}>
        Explore causes that matter most to our community
      </p>
    </div>
<div 
  id="curated-container"
  className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
>
  {(isMobile ? infiniteCurated : curatedItems).map((item, index) => (
    <div
      key={`curated-${index}`}  // Changed from just `index` to `curated-${index}`
      className={`flex-shrink-0 w-[280px] snap-center rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-105
        ${darkMode ? 'bg-zinc-800' : 'bg-white'}
        shadow-lg hover:shadow-2xl`}
    >
    <div className="relative h-48 overflow-hidden">
      <img
        src={item.image}
        alt={item.label}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="font-bold text-white text-lg mb-1">{item.label}</h3>
        <p className="text-white/90 text-sm line-clamp-2">{item.description}</p>
      </div>
    </div>
    <div className="p-4">
      <button className="w-full cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
        <span>Support Now</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  </div>
))}
    </div>
  </div>
</section>


      {/* Impact Banner */}
      <section className={`py-14 ${darkMode ? 'bg-zinc-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 "></div>
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
                <button className="px-6 py-3 cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors">
                 Start Giving Daily Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}

      {/* <section id="partners" className={`py-14 ${darkMode ? 'bg-zinc-800' : 'bg-zinc-50'}`}>
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
            {partners.map((partner, index) => (
            <div 
  key={index}
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
      </section> */}

      <section id="communities" className={`py-12 border-b border-gray-300 ${darkMode ? 'bg-zinc-800' : 'bg-zinc-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
         <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${COLORS.neutralHeading}`}>
        Communities
      </h2>
            <p className={`text-sm ${COLORS.neutralBody}`}>
             Communities you would like to join
            </p>
          </div>
          
          <div className="grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5 flex items-center justify-center">
            {communities.map((partner, index) => (
            <div 
  key={index}
  className={`group relative flex flex-col items-center justify-center p-6 rounded-xl overflow-hidden transition-all duration-300 ${
    darkMode ? 'bg-zinc-900' : 'bg-white'
  } border ${darkMode ? 'border-zinc-700 hover:border-emerald-600' : 'border-zinc-200 hover:border-emerald-600'} shadow-[0_2px_6px_rgba(110,231,183,0.25)] hover:shadow-[0_4px_12px_rgba(16,185,129,0.4)]`}
>
 
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
               <div className="relative w-20 h-20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 overflow-hidden">
  <img 
    src={partner.image}
    alt={partner.name}
    className="w-full h-full object-cover"
    loading='lazy'
  />
</div>
                <span className={`relative mt-3 text-xs font-medium ${COLORS.neutralBody} text-center group-hover:text-emerald-600 transition-colors duration-300`}>{partner.name}</span>
                <button className='cursor-pointer mt-2 flex items-center gap-2 px-2 py-2 bg-emerald-500 text-white rounded-2xl group-hover:bg-red-500'>
                  Donate
                </button>
              </div>
              
            ))}
            
          </div>
        </div>
      </section>
     <section id="partners" className={`py-14 ${darkMode ? 'bg-zinc-900' : 'bg-zinc-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
          <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${COLORS.neutralHeading}`}>
        Trusted By
      </h2>
            <p className={`text-sm ${COLORS.neutralBody}`}>
              Trusted partners we collaborate with to deliver impact
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5">
            {partners.map((partner, index) => (
            <div 
  key={index}
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
      <section id="pulse" className={`py-14 ${darkMode ? 'bg-zinc-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
           <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${COLORS.neutralHeading}`}>
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
              {recentDonations.map((donation, index) => (
            <div 
  key={index}
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
      <section id="stories" className={`py-14 ${darkMode ? 'bg-zinc-900' : 'bg-zinc-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${COLORS.neutralHeading}`}>
        Impact stories
      </h2>
          <p className={`text-sm ${COLORS.neutralBody} mb-6`}>
            Real change made possible by your generosity.
          </p>
          
<div 
  id="stories-container"
  className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-3 md:overflow-visible"
>
 {(isMobile ? infiniteStories : successStories).map((story, index) => (
    <div 
      key={`story-${index}`}  // This is already correct since index is unique
      className={`flex-shrink-0 w-[280px] sm:w-[320px] md:w-auto snap-center rounded-2xl overflow-hidden transition-all duration-300
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

      {/* Newsletter Section */}
<section className={`py-16 ${darkMode ? 'bg-gradient-to-br from-emerald-900 to-zinc-900' : 'bg-gradient-to-br from-emerald-600 to-emerald-700'}`}>
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        Stay Updated on Our Impact
      </h2>
      <p className="text-white/90 text-lg mb-8">
        Get weekly stories of hope, campaign updates, and ways to make a difference
      </p>
      <form className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
        <input
          type="email"
          placeholder="Enter your email address"
          value={newsletterEmail}
          onChange={(e) => setNewsletterEmail(e.target.value)}
          className="flex-1 px-6 py-4 rounded-xl border-2 border-white/30 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
        />
        <button
          type="submit"
          className="cursor-pointer px-8 py-4 bg-white text-emerald-600 rounded-xl font-bold hover:bg-zinc-100 transition-colors whitespace-nowrap"
        >
          Subscribe
        </button>
      </form>
      <p className="text-white/70 text-sm mt-4">
        Join 10,000+ subscribers. Unsubscribe anytime.
      </p>
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
        <ul className="space-y-2.5 text-sm mb-6">
          {['About us', 'Our Mission', 'Our Team', 'FAQs'].map(item => (
            <li key={item}>
              <a href="#" className={`${darkMode ? 'text-zinc-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                {item}
              </a>
            </li>
          ))}
        </ul>
        <a 
          href="#" 
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            darkMode 
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
          }`}
        >
          What We Do
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
      {/* Get Involved */}
      <div>
        <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Get Involved</div>
        <ul className="space-y-2.5 text-sm">
          {['Careers', 'Join TPF Aid', 'Volunteer Now', 'TPF Aid in News', 'Blog', 'Notices'].map(item => (
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
          {['Contact Us', 'Request a Feature', 'Complaints', 'Help Centre', 'Our Legal Status', 'Privacy Policies'].map(item => (
            <li key={item}>
              <a href="#" className={`${darkMode ? 'text-zinc-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>

    
    </div>

          {/* Islamic Calendar */}
<div
  className={`mb-6 py-4 px-4 border-t border-b ${
    darkMode ? 'border-zinc-700' : 'border-zinc-300'
  }`}
>
  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-center sm:text-left">
    <div className="flex flex-col sm:flex-row items-center gap-2 flex-wrap justify-center sm:justify-start">
      <span
        className={`font-semibold ${
          darkMode ? 'text-white' : 'text-gray-800'
        }`}
      >
        Today's Date:
      </span>
      <span
        className={`${
          darkMode ? 'text-zinc-300' : 'text-gray-700'
        } break-words`}
      >
        {hijriFromApi || '...'}
      </span>
    </div>
  </div>
</div>



          {/* Bottom Bar */}
          <div className={`pt-6 flex flex-col sm:flex-row items-center justify-between gap-4`}>
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
          className="fixed bottom-8 right-8 w-12 h-12 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 flex items-center justify-center z-40 transition-all cursor-pointer"
          aria-label="Scroll to top"
        >
          <ChevronRight className="w-6 h-6 -rotate-90" />
        </button>
      )}
    </div>
  );
}