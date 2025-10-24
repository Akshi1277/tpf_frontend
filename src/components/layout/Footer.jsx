'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import HijriDate from "hijri-date";
import { hijriMonths } from '@/lib/constants';

export default function Footer({ darkMode }) {
  const [hijriFromApi, setHijriFromApi] = useState(null);

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

        const monthName = hijri.month?.en || hijriMonths[Number(hijri.month) - 1];
        const [dayStr, monthStr, yearStr] = greg.date.split('-');
        const dayNum = parseInt(dayStr);
        const monthNum = parseInt(monthStr);
        const yearNum = parseInt(yearStr);
        const gregDate = new Date(yearNum, monthNum - 1, dayNum);
        const day = gregDate.getDate();
        const month = gregDate.toLocaleString('en-GB', { month: 'long' });
        const year = gregDate.getFullYear();

        const getOrdinal = (n) => {
          const s = ["th", "st", "nd", "rd"];
          const v = n % 100;
          return s[(v - 20) % 10] || s[v] || s[0];
        };

        const formattedGreg = `${day}${getOrdinal(day)} ${month} ${year}`;
        const formatted = `${monthName} ${hijri.day}, ${hijri.year}  (${greg.weekday.en}, ${formattedGreg})`;

        setHijriFromApi(formatted);
      } catch (err) {
        console.error("Failed to fetch Hijri date", err);
      }
    }

    fetchHijri();
  }, []);

  return (
    <footer className={`py-12 border-t ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-neutral-100 border-zinc-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Logo and Tagline */}
          <div className="md:col-span-1">
            <img
              src={darkMode ? "/TPFAid-Logo1.png" : "/TPFAid-Logo.png"}
              alt="TPF Aid Logo"
              width={160}
              height={160}
              className="cursor-pointer mb-4"
            />
            <p className={`text-sm font-semibold ${darkMode ? 'text-zinc-400' : 'text-gray-600'} leading-relaxed`}>
              Making a difference through community-funded projects and transparent impact.
            </p>
          </div>

          {/* 1️⃣ Ways To Jannah (moved up) */}
          <div>
            <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Ways To Jannah</div>
            <ul className="space-y-1.5 text-sm">
              {[
                'Daily Giver',
                'Donate Weekly (Friday)',
                'Donate Monthly',
                'Donate Your Zakat',
                'Discover Fundraiser',
                'Donate in Emergency Funds'
              ].map(item => (
                <li key={item}>
                  <a href="#" className={`${darkMode ? 'text-zinc-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 2️⃣ About Us (moved to middle) */}
          <div>
            <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>About Us</div>
            <ul className="space-y-1.5 text-sm mb-6">
              {['About TPF', 'FAQs', 'Legal & Help', 'Contact Us'].map(item => (
                <li key={item}>
                  <a href="#" className={`${darkMode ? 'text-zinc-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3️⃣ Get Involve (was at Ways to Jannah position) */}
          <div>
            <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Get Involve</div>
            <ul className="space-y-1.5 text-sm">
              {[
                'Careers',
                'Join TPF Aid',
                'Volunteer Now',
                'TPF Aid in News',
                'Blog',
                'Notices'
              ].map(item => (
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
        <div className={`mb-6 py-3 px-2`}>
          <div className="flex flex-col items-center justify-center gap-3 text-sm text-center">
            <div className="flex flex-col sm:flex-row items-center gap-2 flex-wrap justify-center">
              <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Today's Date:
              </span>
              <span className={`${darkMode ? 'text-zinc-300' : 'text-gray-700'} break-words`}>
                {hijriFromApi || '...'}
              </span>
            </div>
          </div>
        </div>

        {/* Quranic Quote */}
        <div className={`mb-6 py-3 text-center`}>
          <p className={`text-sm italic ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
            "Those who give charity—men and women—will have a noble reward." — Quran 57:18
          </p>
        </div>

        {/* Newsletter Section */}
        <div className={`mb-8 py-8 px-6`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Stay inspired — join our journey beyond this life
              </h3>
              <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                Plant in this dunya, to bloom in the akhirah.
              </p>
            </div>

            <div className="flex flex-col w-full md:w-auto md:min-w-[400px]">
              <p className={`text-sm md:text-base font-medium italic mb-2 text-center md:text-left ${
                darkMode ? 'text-zinc-300' : 'text-gray-700'
              }`}>
                Join our newsletter now & stay inspired
              </p>

              <div className="flex">
                <input
                  type="email"
                  placeholder="Email address"
                  className={`flex-1 px-4 py-3 rounded-l-lg focus:outline-gray-500 focus:ring-2 ${
                    darkMode
                      ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                  }`}
                />
                <button className="px-6 py-3 bg-black hover:bg-gray-900 text-white rounded-r-lg transition-colors flex items-center justify-center cursor-pointer">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`pt-6 flex flex-col sm:flex-row items-center justify-between gap-4`}>
          <span className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
            © {new Date().getFullYear()} True Path Foundation. All rights reserved.
          </span>

          {/* Social icons (unchanged) */}
          <div className="flex items-center gap-3">
            {/* Facebook */}
            <a href="#" className={`w-10 h-10 rounded flex items-center justify-center transition-colors ${
              darkMode ? 'bg-zinc-700 hover:bg-zinc-600 text-zinc-300' : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
            }`}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            {/* Twitter */}
            <a href="#" className={`w-10 h-10 rounded flex items-center justify-center transition-colors ${
              darkMode ? 'bg-zinc-700 hover:bg-zinc-600 text-zinc-300' : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
            }`}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
            {/* YouTube */}
            <a href="#" className={`w-10 h-10 rounded flex items-center justify-center transition-colors ${
              darkMode ? 'bg-zinc-700 hover:bg-zinc-600 text-zinc-300' : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
            }`}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            {/* Instagram */}
            <a href="#" className={`w-10 h-10 rounded flex items-center justify-center transition-colors ${
              darkMode ? 'bg-zinc-700 hover:bg-zinc-600 text-zinc-300' : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
            }`}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
