'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Menu, X, Moon, Sun } from 'lucide-react';

export default function Navbar({ darkMode, setDarkMode, scrolled }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
                  <span className={`w-1 h-1 rounded-full ${darkMode ? 'bg-emerald-400' : 'bg-emerald-500'} animate-[ping_1.5s_ease-in-out_infinite]`} style={{ animationDelay: '0s' }} />
                  <span className={`w-1 h-1 rounded-full ${darkMode ? 'bg-teal-400' : 'bg-teal-500'} animate-[ping_1.5s_ease-in-out_infinite]`} style={{ animationDelay: '0.3s' }} />
                  <span className={`w-1 h-1 rounded-full ${darkMode ? 'bg-cyan-400' : 'bg-cyan-500'} animate-[ping_1.5s_ease-in-out_infinite]`} style={{ animationDelay: '0.6s' }} />
                </div>
              </div>
            </div>

            {/* RIGHT – Actions */}
            <div className="flex items-center gap-4">
              {/* Start Fundraising – desktop only */}
              <button className="hidden md:flex items-center justify-center gap-2 px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-medium transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl">
                Start fundraising
              </button>
              {/* Zakaat icon */}
              <button
                aria-label="Zakaat"
                className={`relative p-2 rounded-full transition-colors cursor-pointer
    ${darkMode
                    ? 'bg-zinc-800/80 hover:bg-zinc-700 backdrop-blur-sm'
                    : 'bg-white/80 hover:bg-zinc-100 backdrop-blur-sm'
                  }`}
              >
                <Image
                  src="/zakaat.svg"
                  alt="Zakaat"
                  width={24}
                  height={24}
                  className="scale-[1.7]"  // ⬅️ increased image size significantly
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



              {/* <select
       value={fontFamily}
       onChange={e => setFontFamily(e.target.value)}
       className="p-2 bg-white text-black rounded"
     >
       <option value="aref">Aref Ruqaa</option>
       <option value="markazi">Markazi Text</option>
       <option value="cairo">Cairo</option>
       <option value="amiri">Amiri</option>
     </select> */}
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
                <span className={`w-1 h-1 rounded-full ${darkMode ? 'bg-emerald-400' : 'bg-emerald-500'} animate-[ping_1.5s_ease-in-out_infinite]`} style={{ animationDelay: '0s' }} />
                <span className={`w-1 h-1 rounded-full ${darkMode ? 'bg-teal-400' : 'bg-teal-500'} animate-[ping_1.5s_ease-in-out_infinite]`} style={{ animationDelay: '0.3s' }} />
                <span className={`w-1 h-1 rounded-full ${darkMode ? 'bg-cyan-400' : 'bg-cyan-500'} animate-[ping_1.5s_ease-in-out_infinite]`} style={{ animationDelay: '0.6s' }} />
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
                      { name: 'Zakat', icon: '/abcd.svg' }
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
                      className={`text-xs font-semibold mb-2 ${darkMode ? "text-zinc-500" : "text-zinc-400"
                        }`}
                    >
                      START
                    </p>
                    <div className="space-y-1">
                      {/* Start Fundraising */}
                      <a
                        href="#"
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
                      </a>

                      {/* Start Community */}
                      <a
                        href="#"
                        className={`group flex items-center gap-2 py-2 px-2 rounded-lg transition-all duration-300
             ${darkMode
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
    </>
  );
}