// lib/constants.js

export const campaigns = [
  {
    id: 1,
    title: "Emergency Relief for Families in Gaza",
    category: "emergency",
    video: "https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/MPaEbz-/videoblocks-v1-0070_20210811-pm-peskov-migrants-7-lakokraska00000000_rayy7obsf__e6b924c92cc2a799a0a88c00d13c1f57__P360.mp4",
    raised: 45627,
    goal: 75000,
    donors: 342,
    org: "Global Family Aid",
    verified: true,
    urgent: true,
    validityDate: "30 Days",
    taxBenefit: true
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
    verified: true,
    validityDate: "22 Days",
    taxBenefit: true
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
    verified: true,
    validityDate: "17 Days",
    taxBenefit: false
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
    urgent: true,
    validityDate: "3 Days",
    taxBenefit: true
  }
];

export const successStories = [
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

export const curatedItems = [
  { 
    label: "Daily Giver", 
    image: "https://images.unsplash.com/photo-1677128912094-36d988ce198b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhlbHAlMjBwcm92aWRlJTIwbWVhbHMlMjBmb3IlMjB0aG9zZSUyMGluJTIwbmVlZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
  },
  { 
    label: "Donate Weekly (Friday) ", 
    image: "https://media.istockphoto.com/id/2159138979/photo/muslim-boy-donating-money.webp?a=1&b=1&s=612x612&w=0&k=20&c=1Ib35R9k_UjN6LC_h117cLRyOvINJ6iZ6bBkwVlSix8=",
  },
  { 
    label: "Donate Monthly", 
    image: "https://images.unsplash.com/photo-1576465767066-87fadbc4c2d8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fHN1cHBvcnQlMjBodW1hbml0YXJpYW4lMjByZWxpZWYlMjBlZmZvcnRzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
  },
  { 
    label: "Donate Your Zakat", 
    image: "https://media.istockphoto.com/id/1312575736/photo/concept-of-zakat-in-islam-religion-selective-focus-of-money-and-rice-with-alphabet-of-zakat.webp?a=1&b=1&s=612x612&w=0&k=20&c=SO0YUYqqHjRLRxMD5wiWNANHSD4pGII19FzfqHvcdPw=",
  },
  { 
    label: "Discover Fundraiser", 
    image: "https://images.unsplash.com/photo-1643429096345-9de0d2ab7e7c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2l2ZSUyMGlzbGFtaWMlMjBjaGlsZHJlbiUyMGElMjBicmlnaHQlMjBmdXR1cmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
  },
  { 
    label: "Donate in Emergency Funds", 
    image: "https://plus.unsplash.com/premium_photo-1683140538884-07fb31428ca6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGRvbmF0ZSUyMGluJTIwZW1lcmdlbmN5JTIwZnVuZHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
  },
  { 
    label: "Eid Kits(Eid-al-Fitr)", 
    image: "https://i.etsystatic.com/27296220/r/il/cd44af/3622176989/il_570xN.3622176989_2kws.jpg",
  },
  { 
    label: "Legal Aid for the Voiceless", 
    image: "https://media.istockphoto.com/id/2014292728/photo/judges-gavel-as-a-symbol-of-legal-system-and-wooden-stand-with-text-word.webp?a=1&b=1&s=612x612&w=0&k=20&c=lyx0WuVJC-yMC5BbA3y70una6t0ttX2fqi7m5EI7Awg=",
  },
  { 
    label: "Shelter and Home Support ", 
    image: "https://plus.unsplash.com/premium_photo-1683135030516-6317ed744628?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2hlbHRlciUyMGFuZCUyMGhvbWUlMjBzdXBwb3J0JTIwZm9yJTIwcGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
  },
  { 
    label: "Financial Emergency Aid ", 
    image: "https://media.istockphoto.com/id/813320518/photo/social-assistance.webp?a=1&b=1&s=612x612&w=0&k=20&c=ViKfqudhFcslXku_zcd9RYePinRk6gWWi1S7qL6kVwI=",
  },
  { 
    label: "Global Muslim Crisis Support ", 
    image: "https://images.unsplash.com/photo-1573886578907-58681efbaad3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8R2xvYmFsJTIwTXVzbGltJTIwQ3Jpc2lzJTIwU3VwcG9ydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
  },
  { 
    label: "Assistance for Marginalized Communities", 
    image: "https://media.istockphoto.com/id/537311780/photo/unity-of-indian-children-asia.webp?a=1&b=1&s=612x612&w=0&k=20&c=Z3vpXyVtDv0xzqOX2FDbdxn4kyIbwpO3xrGakyYPN1k=",
  },
  { 
    label: "Community Development", 
    image: "https://media.istockphoto.com/id/981339754/photo/silhouette-of-engineer-and-construction-team-working-at-site-over-blurred-background-sunset.webp?a=1&b=1&s=612x612&w=0&k=20&c=ftbsxL76vkKvsB8WUO-FMrCHyjrRJKzLpZ_evRWJR4E=",
  },
];

export const partners = [
  { name: "Seed Charity", image: "https://cdn.builder.io/api/v1/image/assets%2Fc05b786f1645447ab878b73ca4dd6870%2Ff0e211f4eed743b9a70fe6b4b6001b85?format=webp&width=2000" },
  { name: "Global Family Aid", image: "https://cdn.builder.io/api/v1/image/assets%2Fc05b786f1645447ab878b73ca4dd6870%2Fe9df5f33b91d46a293a5d3c661e5ad00?format=webp&width=2000" },
  { name: "Human Relief", image: "https://cdn.builder.io/api/v1/image/assets%2Fc05b786f1645447ab878b73ca4dd6870%2F1bf296792ea647b9aa7980631140b241?format=webp&width=2000" },
  { name: "Maan", image: "https://cdn.builder.io/api/v1/image/assets%2Fc05b786f1645447ab878b73ca4dd6870%2F9256431f39904e7997bbf0d7f19e2f96?format=webp&width=2000" },
  { name: "UN-ICC", image: "https://cdn.builder.io/api/v1/image/assets%2Fc05b786f1645447ab878b73ca4dd6870%2Fed5a55b79ee24f20a5cc6fd1abe39177?format=webp&width=2000" },
  { name: "Little Tree Foundation", image: "https://cdn.builder.io/api/v1/image/assets%2Fc05b786f1645447ab878b73ca4dd6870%2F4d5eb38bd91446389d6773e87a9aa424?format=webp&width=2000" }
];

export const communities = [
  {
    name: "Blood Community", 
    image: "https://www.shutterstock.com/image-vector/high-quality-blood-drop-isolated-600nw-2589564683.jpg"
  },
   {
    name: "Masjid Building Initiative", 
    image: "https://images.unsplash.com/photo-1512167108213-5ee155879c6a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFzamlkJTIwYnVpbGRpbmclMjBpbml0aWF0aXZlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600"
  },
   {
    name: "Quranic Studies Center", 
    image: "https://media.istockphoto.com/id/1161964542/photo/koran-holy-book-of-muslims-on-the-table-still-life.webp?a=1&b=1&s=612x612&w=0&k=20&c=q8tCvR0FT0W38pRIOTM_vFwV1ndJ3FRK42KhnvSYTPs="
  },
   {
    name: "Modern Islamic School Project", 
    image: "https://images.unsplash.com/photo-1643429096345-9de0d2ab7e7c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8TW9kZXJuJTIwSXNsYW1pYyUyMFNjaG9vbCUyMFByb2plY3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600"
  }
];

export const categories = [
  { key: "all", label: "All" },
  { key: "emergency", label: "Emergency Aid"},
  { key: "medical", label: "Medical Aid"},
  { key: "orphans", label: "Orphans" },
  { key: "education", label: "Education"},
  { key: "water", label: "Clean Water"}
];

export const hijriMonths = [
  "Muharram",
  "Safar",
  "Rabi' al-Awwal",
  "Rabi' ath-Thani",
  "Jumada al-Ula",
  "Jumada ath-Thani",
  "Rajab",
  "Sha'ban",
  "Ramadan",
  "Shawwal",
  "Dhu al-Qa'dah",
  "Dhu al-Hijjah"
];

export const recentDonations = [
  { name: "Anonymous", amount: 500, time: "2 min ago" },
  { name: "Ahmed K.", amount: 250, time: "5 min ago" },
  { name: "Fatima S.", amount: 1000, time: "8 min ago" },
  { name: "Anonymous", amount: 100, time: "12 min ago" },
  { name: "Yusuf M.", amount: 750, time: "15 min ago" },
   { name: "Anonymous", amount: 500, time: "2 min ago" },
   { name: "Anonymous", amount: 500, time: "2 min ago" },
];

export const heroImages = [
  "https://images.unsplash.com/photo-1622864352372-a68fa7dac64e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fFN0YW5kJTIwd2l0aCUyMEdhemF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=80",
  "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200&q=80"
];