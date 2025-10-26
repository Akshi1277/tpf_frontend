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
        <div className={`mb-6 py-1 px-2`}>
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
        <div className={`mb-6 text-center`}>
          <p className={`text-sm font-bold italic ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
            "Those who give charity—men and women—will have a noble reward." — Quran 57:18
          </p>
        </div>

        {/* Newsletter Section */}
        <div className={`mb-8 px-6`}>
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
                  className={`flex-1 px-4 py-3 mr-5 border rounded-lg focus:outline-gray-500 focus:ring-2 ${
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
        <div className={` flex flex-col sm:flex-row items-center justify-between gap-4`}>
          <span className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
            © {new Date().getFullYear()} True Path Foundation. All rights reserved.
          </span>

        {/* Social icons (no background divs) */}
<div className="flex items-center gap-3 mt-3 mr-6">
  {/* Facebook */}
  <a href="#">
    <Image
      src="/facebook.png"
      alt="Facebook"
      width={24}
      height={24}
      className="w-6 h-6 object-contain hover:opacity-80 transition-opacity"
    />
  </a>

  {/* Twitter */}
  <a href="#">
    <Image
      src="/twitter.png"
      alt="Twitter"
      width={24}
      height={24}
      className="w-6 h-6 object-contain hover:opacity-80 transition-opacity"
    />
  </a>

  {/* YouTube */}
  <a href="#">
    <Image
      src="/youtube.png"
      alt="YouTube"
      width={24}
      height={24}
      className="w-6 h-6 object-contain hover:opacity-80 transition-opacity"
    />
  </a>

  {/* Instagram */}
  <a href="#">
    <Image
      src="/instagram.png"
      alt="Instagram"
      width={24}
      height={24}
      className="w-6 h-6 object-contain hover:opacity-80 transition-opacity"
    />
  </a>
</div>
</div>
      </div>
    </footer>
  );
}
