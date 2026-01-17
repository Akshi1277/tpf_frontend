'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import HijriDate from "hijri-date";
import { hijriMonths } from '@/lib/constants';
import Link from 'next/link';

import { useGetHijriDateQuery } from '@/utils/slices/apiSlice';

export default function Footer({ darkMode }) {
  const today = new Date();
  const dateStr = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
  const { data: hijriData } = useGetHijriDateQuery(dateStr);

  let hijriFromApi = null;
  if (hijriData?.data) {
    const { hijri, gregorian: greg } = hijriData.data;
    if (hijri && greg) {
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
      hijriFromApi = `${monthName} ${hijri.day}, ${hijri.year}  (${greg.weekday.en}, ${formattedGreg})`;
    }
  }

  return (
    <footer className={`py-12 border-t z-30 ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-neutral-100 border-zinc-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

          {/* Logo and Tagline */}
          <div className="md:col-span-1">
            <img
              src={darkMode ? "/TPFAid-Logo1.png" : "/TPFAid-Logo.png"}
              alt="TPF Aid Logo"
              width={160}
              height={45}
              className="h-9 w-auto cursor-pointer mb-4 object-contain"
            />
            <p className={`text-sm font-semibold ${darkMode ? 'text-zinc-400' : 'text-gray-600'} leading-relaxed`}>
              Making a difference through community-funded projects and transparent impact.
            </p>
          </div>

          {/* 1️⃣ Ways To Jannah (moved up) */}
          <div>
            <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
              Ways To Jannah
            </div>

            <ul className="space-y-1.5 text-sm">
              {[
                { name: 'Daily Giver', path: '/permanent-donor/daily' },
                { name: 'Donate Weekly (Friday)', path: '/permanent-donor/weekly' },
                { name: 'Donate Monthly', path: '/permanent-donor/monthly' },
                { name: 'Donate Your Zakat', path: '/zakat-calculator' },
                { name: 'Discover Fundraiser', path: '/' },
                { name: 'Donate in Emergency Funds', path: '/' }
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.path || '#'}
                    className={`${darkMode ? 'text-zinc-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                      } transition-colors`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>


          {/* 2️⃣ About Us (moved to middle) */}
          <div>
            <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
              About Us
            </div>
            <ul className="space-y-1.5 text-sm mb-6">
              {[
                { name: 'About TPF', path: '/about' },
                { name: 'FAQs', path: '/faqs' },
                { name: 'Legal Aid Centre', path: '/legalaid' },
                { name: 'Contact Us', path: '/contactus' },
                { name: 'Policies', path: '/policies' }

              ].map(link => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className={`${darkMode
                      ? 'text-zinc-400 hover:text-white'
                      : 'text-gray-600 hover:text-gray-900'
                      } transition-colors`}
                  >
                    {link.name}
                  </Link>
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

          {/* 4️⃣ Policies Section */}
          {/* <div>
  <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
    Policies
  </div>
  <ul className="space-y-1.5 text-sm">
    {[
      { name: 'Privacy Policy', path: '/privacy-policy' },
      { name: 'Terms & Conditions', path: '/terms' },
      { name: 'Use of Cookies', path: '/cookies' },
      { name: 'Legal', path: '/legal' },
    ].map(link => (
      <li key={link.name}>
        <a
          href={link.path}
          className={`${darkMode
            ? 'text-zinc-400 hover:text-white'
            : 'text-gray-600 hover:text-gray-900'
          } transition-colors`}
        >
          {link.name}
        </a>
      </li>
    ))}
  </ul>
</div> */}

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
              <p className={`text-sm md:text-base font-medium italic mb-2 text-center md:text-left ${darkMode ? 'text-zinc-300' : 'text-gray-700'
                }`}>
                Join our newsletter now & stay inspired
              </p>

              <div className="flex">
                <input
                  type="email"
                  placeholder="Email address"
                  className={`flex-1 px-1 py-3 -ml-5 border rounded-lg focus:outline-gray-500 focus:ring-2 ${darkMode
                    ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    }`}
                />
                <button className="px-6 ml-2 py-3 bg-black hover:bg-gray-900 text-white rounded-lg transition-colors flex items-center justify-center cursor-pointer">
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

          {/* Social icons (custom SVG silver icons) */}
          <div className="flex items-center gap-3 mt-3 mr-6">
            {/* Facebook */}
            <a
              href="#"
              className="social-icon-link group"
              aria-label="Visit our Facebook page"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-all duration-300"
              >
                <path
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                  fill={darkMode ? "#b8b8b8" : "#4a4a4a"}
                  className="group-hover:fill-[#6a6a6a] dark:group-hover:fill-[#e8e8e8] transition-colors duration-300"
                  strokeWidth={darkMode ? "0" : "0.5"}
                  stroke={darkMode ? "none" : "#4a4a4a"}
                />
              </svg>
            </a>

            {/* Twitter/X */}
            <a
              href="#"
              className="social-icon-link group"
              aria-label="Visit our Twitter page"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-all duration-300"
              >
                <path
                  d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                  fill={darkMode ? "#b8b8b8" : "#4a4a4a"}
                  className="group-hover:fill-[#6a6a6a] dark:group-hover:fill-[#e8e8e8] transition-colors duration-300"
                  strokeWidth={darkMode ? "0" : "0.5"}
                  stroke={darkMode ? "none" : "#4a4a4a"}
                />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="#"
              className="social-icon-link group"
              aria-label="Visit our YouTube channel"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-all duration-300"
              >
                <path
                  d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                  fill={darkMode ? "#b8b8b8" : "#4a4a4a"}
                  className="group-hover:fill-[#6a6a6a] dark:group-hover:fill-[#e8e8e8] transition-colors duration-300"
                  strokeWidth={darkMode ? "0" : "0.5"}
                  stroke={darkMode ? "none" : "#4a4a4a"}
                />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/tpf_aid?igsh=MTgyZG8weHdncmI1Yw=="
              className="social-icon-link group"
              aria-label="Visit our Instagram page"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-all duration-300"
              >
                <path
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"
                  fill={darkMode ? "#b8b8b8" : "#4a4a4a"}
                  className="group-hover:fill-[#6a6a6a] dark:group-hover:fill-[#e8e8e8] transition-colors duration-300"
                  strokeWidth={darkMode ? "0" : "0.5"}
                  stroke={darkMode ? "none" : "#4a4a4a"}
                />
              </svg>
            </a>
          </div>

          <style jsx>{`
  .social-icon-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border-radius: 4px;
    transition: all 0.3s ease;
  }
  
  .social-icon-link:hover {
    transform: translateY(-2px);
    filter: drop-shadow(0 4px 8px rgba(192, 192, 192, 0.3));
  }
  
  .social-icon-link:focus-visible {
    outline: 2px solid ${darkMode ? '#c0c0c0' : '#808080'};
    outline-offset: 3px;
    border-radius: 6px;
  }
  
  .social-icon-link:active {
    transform: translateY(0);
  }
`}</style>

        </div>
      </div>
    </footer>
  );
}
