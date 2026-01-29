"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useFetchBlogsQuery } from "@/utils/slices/blogApiSlice";
import { Calendar, User, ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { getMediaUrl } from "@/utils/media";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlobalLoader from "@/components/GlobalLoader";

export default function BlogListPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(true);
  const [page, setPage] = useState(1);
  const [allBlogs, setAllBlogs] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("darkMode");
      if (saved !== null) setDarkMode(JSON.parse(saved));
    } catch { }
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const { data, isLoading, error } = useFetchBlogsQuery({
    status: "PUBLISHED",
    page: page,
    limit: 12,
  });

  useEffect(() => {
    if (data?.data) {
      if (page === 1) {
        setAllBlogs(data.data);
      } else {
        setAllBlogs((prev) => [...prev, ...data.data]);
      }
    }
  }, [data, page]);

  const handleLoadMore = () => {
    if (data?.pagination?.hasNextPage) {
      setPage((prev) => prev + 1);
    }
  };

  if (isLoading && page === 1) return <GlobalLoader />;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-semibold text-lg mb-2">
            Failed to load blogs
          </p>
          <p className="text-gray-500 text-sm">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex flex-col relative overflow-hidden ${darkMode ? "bg-zinc-950" : "bg-[#FDFDFD]"
        }`}
    >
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        scrolled={scrolled}
      />

      {/* Premium Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-0 right-0 w-1/2 h-1/2 blur-[150px] opacity-20 ${darkMode ? 'bg-emerald-600' : 'bg-emerald-200'}`} />
        <div className={`absolute bottom-0 left-0 w-1/2 h-1/2 blur-[150px] opacity-10 ${darkMode ? 'bg-[#D4AF37]' : 'bg-amber-200'}`} />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      {/* Enhanced Hero Section */}
      <section className="relative pt-32 sm:pt-40 pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Islamic Calligraphy */}
          {/* <div className="text-center mb-8 sm:mb-10">
            <div 
              className="font-arabic text-3xl sm:text-4xl lg:text-5xl mb-3"
              style={{ color: '#D4AF37', fontWeight: '500' }}
            >
              بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ
            </div>
            <p className={`text-xs sm:text-sm uppercase tracking-[0.3em] font-semibold ${darkMode ? 'text-zinc-600' : 'text-gray-400'}`}>
              In the name of Allah, the Most Gracious, the Most Merciful
            </p>
          </div> */}

          {/* Main Heading */}
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-[#D4AF37]/10 border border-emerald-500/20 mb-4">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              <span className={`text-sm font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                Stories of Faith & Impact
              </span>
            </div>

            <h1 className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.1] ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <span className="block mb-2">Insights That</span>
              <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 bg-clip-text text-transparent">
                Inspire Action
              </span>
            </h1>

            <p className={`text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed font-medium ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
              Discover stories of compassion, faith-driven service, and the transformative power of collective good
            </p>

            {/* Stats Row */}
            <div className="flex flex-wrap justify-center gap-8 sm:gap-12 pt-8">
              <div className="text-center">
                <div className={`text-3xl sm:text-4xl font-black mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {allBlogs.length}+
                </div>
                <div className={`text-sm font-semibold uppercase tracking-wider ${darkMode ? 'text-zinc-500' : 'text-gray-500'}`}>
                  Articles
                </div>
              </div>
              <div className={`w-px ${darkMode ? 'bg-zinc-800' : 'bg-gray-200'}`}></div>
              <div className="text-center">
                <div className={`text-3xl sm:text-4xl font-black mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  <BookOpen className="w-8 h-8 inline-block" />
                </div>
                <div className={`text-sm font-semibold uppercase tracking-wider ${darkMode ? 'text-zinc-500' : 'text-gray-500'}`}>
                  Knowledge
                </div>
              </div>
              <div className={`w-px ${darkMode ? 'bg-zinc-800' : 'bg-gray-200'}`}></div>
              <div className="text-center">
                <div className={`text-3xl sm:text-4xl font-black mb-1 bg-gradient-to-r from-emerald-500 to-[#D4AF37] bg-clip-text text-transparent`}>
                  ∞
                </div>
                <div className={`text-sm font-semibold uppercase tracking-wider ${darkMode ? 'text-zinc-500' : 'text-gray-500'}`}>
                  Impact
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="flex justify-center gap-2 mt-12 sm:mt-16">
            <div className={`w-20 h-1 rounded-full ${darkMode ? 'bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent' : 'bg-gradient-to-r from-transparent via-emerald-600 to-transparent'}`}></div>
          </div>
        </div>

        {/* Islamic Quote Section */}

      </section>

      {/* Main Content - Flex Grow to Push Footer Down */}
      <main className="flex-grow py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {allBlogs.length === 0 ? (
            <div
              className={`text-center py-20 ${darkMode ? "text-zinc-400" : "text-gray-500"
                }`}
            >
              <div className="inline-block mb-4">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center ${darkMode ? "bg-zinc-800" : "bg-gray-100"
                    }`}
                >
                  <Calendar
                    size={32}
                    className={darkMode ? "text-zinc-600" : "text-gray-400"}
                  />
                </div>
              </div>
              <p className="text-lg font-medium">No articles available yet</p>
              <p className="text-sm mt-2">Check back soon for new content</p>
            </div>
          ) : (
            <>
              {/* Blog Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {allBlogs.map((blog) => (
                  <article
                    key={blog._id}
                    className="group"
                  >
                    <Link href={`/blogs/${blog.slug}`}>
                      {/* Premium Card Wrapper with Gradient Border */}
                      <div className={`p-1 rounded-[2rem] bg-gradient-to-br transition-all duration-300 h-full ${darkMode
                          ? 'from-zinc-800 to-zinc-900 group-hover:from-[#D4AF37]/20 group-hover:to-emerald-600/10'
                          : 'from-gray-100 to-white group-hover:from-emerald-500/10 group-hover:to-[#D4AF37]/5 shadow-lg shadow-gray-200/50 group-hover:shadow-xl group-hover:shadow-emerald-500/10'
                        }`}>
                        <div className={`rounded-[1.8rem] overflow-hidden h-full flex flex-col ${darkMode ? 'bg-zinc-900' : 'bg-white'
                          }`}>

                          {/* Image Container */}
                          <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                            {blog.coverImage?.url ? (
                              <img
                                src={getMediaUrl(blog.coverImage.url)}
                                alt={blog.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-500/10 to-[#D4AF37]/10">
                                <div
                                  className={`text-6xl font-black ${darkMode ? "text-zinc-700" : "text-gray-300"
                                    }`}
                                >
                                  {blog.title.charAt(0).toUpperCase()}
                                </div>
                              </div>
                            )}

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            {/* Floating Badge */}
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md ${darkMode
                                  ? 'bg-zinc-900/80 text-[#D4AF37]'
                                  : 'bg-white/90 text-emerald-600'
                                }`}>
                                Read Now
                              </div>
                            </div>
                          </div>

                          {/* Content Container */}
                          <div className="p-6 sm:p-7 space-y-4 flex-grow flex flex-col">
                            {/* Title */}
                            <h2
                              className={`text-lg sm:text-xl font-black leading-tight line-clamp-2 transition-colors ${darkMode
                                  ? "text-white group-hover:text-[#D4AF37]"
                                  : "text-gray-900 group-hover:text-emerald-600"
                                }`}
                            >
                              {blog.title}
                            </h2>

                            {/* Excerpt */}
                            <p
                              className={`text-sm leading-relaxed line-clamp-3 flex-grow ${darkMode ? "text-zinc-400" : "text-gray-600"
                                }`}
                            >
                              {blog.excerpt || "Discover more about this inspiring story and its impact on the community..."}
                            </p>

                            {/* Decorative Divider */}
                            <div className="flex items-center gap-2">
                              <div className={`h-px flex-grow ${darkMode ? 'bg-zinc-800' : 'bg-gray-200'}`}></div>
                              <div className={`w-1.5 h-1.5 rounded-full ${darkMode ? 'bg-[#D4AF37]' : 'bg-emerald-500'}`}></div>
                              <div className={`h-px flex-grow ${darkMode ? 'bg-zinc-800' : 'bg-gray-200'}`}></div>
                            </div>

                            {/* Meta Information */}
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
                              {blog.author?.name && (
                                <div
                                  className={`flex items-center gap-1.5 font-semibold ${darkMode ? "text-zinc-500" : "text-gray-500"
                                    }`}
                                >
                                  <User size={13} />
                                  <span>
                                    {blog.author.name}
                                  </span>
                                </div>
                              )}

                              <div
                                className={`flex items-center gap-1.5 font-semibold ${darkMode ? "text-zinc-500" : "text-gray-500"
                                  }`}
                              >
                                <Calendar size={13} />
                                <span>
                                  {new Date(blog.createdAt).toLocaleDateString(
                                    "en-US",
                                    {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    }
                                  )}
                                </span>
                              </div>
                            </div>

                            {/* Read More Button */}
                            <div className="pt-1">
                              <div
                                className={`inline-flex items-center gap-2 text-sm font-black uppercase tracking-wider transition-all group-hover:gap-3 ${darkMode
                                    ? "text-[#D4AF37]"
                                    : "text-emerald-600"
                                  }`}
                              >
                                Continue Reading
                                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>

              {/* Load More Button */}
              {data?.pagination?.hasNextPage && (
                <div className="mt-12 sm:mt-16 flex justify-center">
                  <button
                    onClick={handleLoadMore}
                    disabled={isLoading}
                    className={`px-8 sm:px-12 py-4 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 border-2 ${darkMode
                        ? "bg-zinc-800 border-zinc-700 text-white hover:border-[#D4AF37] hover:bg-zinc-700 disabled:opacity-50"
                        : "bg-white border-gray-300 text-gray-900 hover:border-emerald-500 hover:bg-gray-50 disabled:opacity-50"
                      }`}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-3">
                        <div className="w-4 h-4 border-2 border-gray-400/30 border-t-gray-400 rounded-full animate-spin"></div>
                        Loading...
                      </span>
                    ) : (
                      "Load More Articles"
                    )}
                  </button>
                </div>
              )}
            </>
          )}

          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
            <div className={`p-8 sm:p-10 rounded-3xl border-2 relative overflow-hidden ${darkMode
                ? 'bg-zinc-900/60 backdrop-blur-xl border-zinc-800/50'
                : 'bg-white/60 backdrop-blur-xl border-gray-200/50 shadow-xl shadow-emerald-500/5'
              }`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
              <div className="relative text-center">
                <div className={`text-4xl sm:text-5xl mb-4 ${darkMode ? 'text-[#D4AF37]' : 'text-emerald-600'}`}>
                  ❝
                </div>
                <p className={`text-base sm:text-lg lg:text-xl italic leading-relaxed font-medium ${darkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
                  "The best of people are those who bring the most benefit to others"
                </p>
                <div className={`mt-4 text-xs sm:text-sm uppercase tracking-[0.3em] font-bold ${darkMode ? 'text-zinc-600' : 'text-gray-400'}`}>
                  — Prophet Muhammad ﷺ
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer - Sticks to Bottom */}
      <Footer darkMode={darkMode} />
    </div>
  );
}