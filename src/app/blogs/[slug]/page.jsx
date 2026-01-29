"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useFetchBlogBySlugQuery } from "@/utils/slices/blogApiSlice";
import { ArrowLeft, Calendar, User, Clock, Share2, Tag, Mail, Award } from "lucide-react";
import { getMediaUrl } from "@/utils/media";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlobalLoader from "@/components/GlobalLoader";

export default function BlogPage() {
  const { slug } = useParams();
  const router = useRouter();

  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(true);
  const [readingTime, setReadingTime] = useState(0);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("darkMode");
      if (saved !== null) setDarkMode(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const { data, isLoading, error } = useFetchBlogBySlugQuery(slug, {
    skip: !slug,
  });

  // Calculate reading time
  useEffect(() => {
    if (data?.data?.content) {
      const words = data.data.content.split(/\s+/).length;
      const minutes = Math.ceil(words / 200); // Average reading speed
      setReadingTime(minutes);
    }
  }, [data]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.excerpt || blog.title,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (isLoading) return <GlobalLoader />;

  if (error || !data?.data) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          darkMode ? "bg-zinc-950" : "bg-[#FDFDFD]"
        }`}
      >
        <div className="text-center">
          <div className={`text-6xl mb-4 ${darkMode ? "text-zinc-700" : "text-gray-300"}`}>
            404
          </div>
          <p className={`text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Blog not found
          </p>
          <p className={`text-sm mb-6 ${darkMode ? "text-zinc-400" : "text-gray-500"}`}>
            The article you're looking for doesn't exist
          </p>
          <button
            onClick={() => router.push("/blogs")}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              darkMode
                ? "bg-zinc-800 text-white hover:bg-zinc-700"
                : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
          >
            Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  const blog = data.data;

  return (
    <div
      className={`min-h-screen flex flex-col relative overflow-hidden ${
        darkMode ? "bg-zinc-950" : "bg-[#FDFDFD]"
      }`}
    >
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        scrolled={scrolled}
      />

      {/* Premium Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className={`absolute top-0 right-0 w-1/3 h-1/3 blur-[150px] opacity-20 ${darkMode ? 'bg-emerald-600' : 'bg-emerald-200'}`} />
        <div className={`absolute bottom-0 left-0 w-1/3 h-1/3 blur-[150px] opacity-10 ${darkMode ? 'bg-[#D4AF37]' : 'bg-amber-200'}`} />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      {/* Back Button - Floating */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-32">
        <button
          onClick={() => router.back()}
          className={`group flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 ${
            darkMode
              ? "bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800"
              : "bg-white/80 hover:bg-white text-gray-600 hover:text-gray-900 border border-gray-200 shadow-lg shadow-gray-200/50"
          } backdrop-blur-md`}
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Back
        </button>
      </div>

      {/* Article Content */}
      <article className="relative z-10 flex-grow">
        {/* Hero Section with Cover Image */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-12 sm:pb-16">
          
          {/* Title */}
          <h1
            className={`text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black leading-[1.1] text-center mb-8 tracking-tight ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {blog.title}
          </h1>

          {/* Meta Information Bar */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-8">
            <div
              className={`flex items-center gap-2 text-sm font-semibold ${
                darkMode ? "text-zinc-400" : "text-gray-600"
              }`}
            >
              <Calendar size={16} />
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>

            {readingTime > 0 && (
              <>
                <div className={`h-4 w-px ${darkMode ? "bg-zinc-800" : "bg-gray-200"}`}></div>
                <div
                  className={`flex items-center gap-2 text-sm font-semibold ${
                    darkMode ? "text-zinc-400" : "text-gray-600"
                  }`}
                >
                  <Clock size={16} />
                  {readingTime} min read
                </div>
              </>
            )}
          </div>

          {/* Share Button */}
          <div className="flex justify-center mb-10">
            <button
              onClick={handleShare}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 ${
                darkMode
                  ? "bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700"
                  : "bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 border border-gray-200 shadow-lg shadow-gray-200/50"
              }`}
            >
              <Share2 size={16} />
              Share Article
            </button>
          </div>

          {/* Media Section - Dynamic Layout based on availability */}
          <div className="mb-12">
            {/* Both Image and Video Available - Side by Side on Desktop */}
            {blog.coverImage?.url && blog.video?.url && (
              <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
                {/* Cover Image */}
                <div className={`rounded-[2rem] overflow-hidden ${
                  darkMode ? "shadow-2xl shadow-black/50" : "shadow-2xl shadow-gray-300/50"
                }`}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={getMediaUrl(blog.coverImage.url)}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    <div className={`absolute bottom-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                      darkMode ? "bg-zinc-900/80 text-zinc-300" : "bg-white/90 text-gray-700"
                    } backdrop-blur-md`}>
                      Featured Image
                    </div>
                  </div>
                </div>

                {/* Video Player */}
                <div className={`rounded-[2rem] overflow-hidden ${
                  darkMode ? "shadow-2xl shadow-black/50" : "shadow-2xl shadow-gray-300/50"
                }`}>
                  <div className="relative aspect-[4/3] overflow-hidden bg-black">
                    <video
                      controls
                      className="w-full h-full object-cover"
                      preload="metadata"
                    >
                      <source src={getMediaUrl(blog.video.url)} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>
            )}

            {/* Only Image Available - Full Width Hero */}
            {blog.coverImage?.url && !blog.video?.url && (
              <div className={`rounded-[2rem] overflow-hidden ${
                darkMode ? "shadow-2xl shadow-black/50" : "shadow-2xl shadow-gray-300/50"
              }`}>
                <div className="relative aspect-[21/9] overflow-hidden">
                  <img
                    src={getMediaUrl(blog.coverImage.url)}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
            )}

            {/* Only Video Available - Centered Video */}
            {!blog.coverImage?.url && blog.video?.url && (
              <div className={`max-w-4xl mx-auto rounded-[2rem] overflow-hidden ${
                darkMode ? "shadow-2xl shadow-black/50" : "shadow-2xl shadow-gray-300/50"
              }`}>
                <div className="relative aspect-video overflow-hidden bg-black">
                  <video
                    controls
                    className="w-full h-full"
                    preload="metadata"
                  >
                    <source src={getMediaUrl(blog.video.url)} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            )}
          </div>

          {/* Excerpt */}
          {blog.excerpt && (
            <div className={`mb-12 text-center max-w-3xl mx-auto`}>
              <div className={`p-8 sm:p-10 rounded-3xl border-2 relative overflow-hidden ${
                darkMode
                  ? "bg-zinc-900/60 backdrop-blur-xl border-zinc-800/50"
                  : "bg-white/60 backdrop-blur-xl border-gray-200/50 shadow-xl shadow-emerald-500/5"
              }`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                <div className="relative">
                  <div className={`text-4xl mb-4 ${darkMode ? "text-[#D4AF37]" : "text-emerald-600"}`}>
                    ❝
                  </div>
                  <p
                    className={`text-lg sm:text-xl italic leading-relaxed font-medium ${
                      darkMode ? "text-zinc-300" : "text-gray-700"
                    }`}
                  >
                    {blog.excerpt}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-2 mb-12">
            <div className={`h-px w-20 ${darkMode ? "bg-gradient-to-r from-transparent via-zinc-700 to-transparent" : "bg-gradient-to-r from-transparent via-gray-300 to-transparent"}`}></div>
            <div className={`w-2 h-2 rounded-full ${darkMode ? "bg-[#D4AF37]" : "bg-emerald-500"}`}></div>
            <div className={`h-px w-20 ${darkMode ? "bg-gradient-to-r from-transparent via-zinc-700 to-transparent" : "bg-gradient-to-r from-transparent via-gray-300 to-transparent"}`}></div>
          </div>
        </div>

        {/* Two Column Layout: Content + Author Sidebar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Main Content Column */}
            <div className="lg:col-span-8">
              {/* Article Content */}
              <div className={`mb-12`}>
                {/* Check if content is HTML or plain text */}
                {blog.content && (blog.content.includes('<p>') || blog.content.includes('<div>') || blog.content.includes('<h')) ? (
                  // If HTML content, use prose styling
                  <div
                    className={`prose prose-lg max-w-none ${
                      darkMode
                        ? "prose-invert prose-headings:text-white prose-p:text-zinc-300 prose-a:text-emerald-400 prose-strong:text-white prose-em:text-zinc-400 prose-code:text-[#D4AF37] prose-code:bg-zinc-800 prose-pre:bg-zinc-800 prose-pre:border prose-pre:border-zinc-700 prose-blockquote:border-[#D4AF37] prose-blockquote:text-zinc-400 prose-ul:text-zinc-300 prose-ol:text-zinc-300 prose-li:text-zinc-300"
                        : "prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-emerald-600 prose-strong:text-gray-900 prose-em:text-gray-600 prose-code:text-emerald-700 prose-code:bg-emerald-50 prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200 prose-blockquote:border-emerald-500 prose-blockquote:text-gray-600 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:text-gray-700"
                    } prose-headings:font-black prose-headings:tracking-tight prose-p:leading-relaxed prose-a:font-semibold prose-a:no-underline hover:prose-a:underline prose-blockquote:italic prose-blockquote:font-medium prose-blockquote:border-l-4 prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-pre:rounded-xl prose-img:rounded-2xl prose-hr:border-2 ${
                      darkMode ? "prose-hr:border-zinc-800" : "prose-hr:border-gray-200"
                    }`}
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />
                ) : (
                  // If plain text, format it with beautiful typography
                  <div className="space-y-5">
                    {blog.content
                      // Normalize line endings and split by double newlines
                      .replace(/\r\n/g, '\n')
                      .split(/\n\n+/)
                      .map((section, sectionIndex) => {
                      // Skip empty sections
                      if (!section.trim()) return null;
                      
                      // Check if section looks like a heading (ALL CAPS or starts with #)
                      const trimmedSection = section.trim();
                      const isHeading = trimmedSection === trimmedSection.toUpperCase() && 
                                       trimmedSection.length < 100 && 
                                       trimmedSection.length > 0 &&
                                       !trimmedSection.startsWith('#') &&
                                       !trimmedSection.startsWith('-') &&
                                       !trimmedSection.startsWith('*') &&
                                       !/^\d+\./.test(trimmedSection);
                      const isMarkdownHeading = trimmedSection.startsWith('#');
                      
                      if (isMarkdownHeading) {
                        const level = trimmedSection.match(/^#+/)[0].length;
                        const text = trimmedSection.replace(/^#+\s*/, '');
                        const HeadingTag = `h${Math.min(level, 6)}`;
                        
                        return (
                          <HeadingTag
                            key={sectionIndex}
                            className={`font-black tracking-tight ${
                              level === 1 ? 'text-3xl sm:text-4xl mb-4' :
                              level === 2 ? 'text-2xl sm:text-3xl mb-3' :
                              level === 3 ? 'text-xl sm:text-2xl mb-3' :
                              'text-lg sm:text-xl mb-2'
                            } ${darkMode ? "text-white" : "text-gray-900"}`}
                          >
                            {text}
                          </HeadingTag>
                        );
                      }
                      
                      if (isHeading) {
                        return (
                          <h2
                            key={sectionIndex}
                            className={`text-2xl sm:text-3xl font-black tracking-tight mb-4 ${
                              darkMode ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {trimmedSection}
                          </h2>
                        );
                      }
                      
                      // Check if it's a list (starts with - or * or number.)
                      const isList = /^[\-\*]/.test(trimmedSection) || /^\d+\./.test(trimmedSection);
                      
                      if (isList) {
                        const items = section.split('\n').filter(line => line.trim());
                        const isOrdered = /^\d+\./.test(items[0]);
                        
                        return isOrdered ? (
                          <ol
                            key={sectionIndex}
                            className={`list-decimal list-inside space-y-2.5 pl-4 ${
                              darkMode ? "text-zinc-300" : "text-gray-700"
                            }`}
                          >
                            {items.map((item, itemIndex) => (
                              <li key={itemIndex} className="text-base sm:text-lg leading-relaxed">
                                {item.replace(/^\d+\.\s*/, '')}
                              </li>
                            ))}
                          </ol>
                        ) : (
                          <ul
                            key={sectionIndex}
                            className={`list-disc list-inside space-y-2.5 pl-4 ${
                              darkMode ? "text-zinc-300" : "text-gray-700"
                            }`}
                          >
                            {items.map((item, itemIndex) => (
                              <li key={itemIndex} className="text-base sm:text-lg leading-relaxed">
                                {item.replace(/^[\-\*]\s*/, '')}
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      
                      // Regular paragraph
                      return (
                        <p
                          key={sectionIndex}
                          className={`text-base sm:text-lg leading-relaxed ${
                            darkMode ? "text-zinc-300" : "text-gray-700"
                          }`}
                        >
                          {trimmedSection}
                        </p>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* SEO Keywords */}
              {blog.seo?.keywords && blog.seo.keywords.length > 0 && (
                <div className={`p-6 rounded-2xl border ${
                  darkMode 
                    ? "bg-zinc-900/50 border-zinc-800" 
                    : "bg-gray-50 border-gray-200"
                }`}>
                  <h3 className={`text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2 ${
                    darkMode ? "text-zinc-400" : "text-gray-600"
                  }`}>
                    <Tag size={16} />
                    Related Topics
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {blog.seo.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                          darkMode
                            ? "bg-zinc-800 text-zinc-400"
                            : "bg-white text-gray-600 border border-gray-200"
                        }`}
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar: Author & Info */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-32 space-y-6">
                
                {/* Author Card */}
                {blog.author && (
                  <div className={`p-1 rounded-[2rem] bg-gradient-to-br transition-all duration-300 ${
                    darkMode 
                      ? 'from-zinc-800 to-zinc-900' 
                      : 'from-gray-100 to-white shadow-lg shadow-gray-200/50'
                  }`}>
                    <div className={`rounded-[1.8rem] overflow-hidden p-6 sm:p-8 ${
                      darkMode ? 'bg-zinc-900' : 'bg-white'
                    }`}>
                      {/* Author Header */}
                      <div className="text-center mb-6">
                        <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center bg-gradient-to-br ${
                          darkMode 
                            ? "from-[#D4AF37]/20 to-emerald-600/20" 
                            : "from-[#D4AF37]/10 to-emerald-600/10"
                        }`}>
                          <User size={32} className={darkMode ? "text-[#D4AF37]" : "text-emerald-600"} />
                        </div>
                        <div className={`text-xs uppercase tracking-[0.2em] font-bold mb-2 ${
                          darkMode ? "text-zinc-600" : "text-gray-400"
                        }`}>
                          Written By
                        </div>
                        <h3 className={`text-xl font-black mb-2 ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}>
                          {blog.author.name}
                        </h3>
                        {blog.author.info && (
                          <div className={`flex items-center justify-center gap-2 text-sm ${
                            darkMode ? "text-zinc-400" : "text-gray-600"
                          }`}>
                            <Mail size={14} />
                            <span>{blog.author.info}</span>
                          </div>
                        )}
                      </div>

                      {/* Decorative Divider */}
                      <div className="flex items-center gap-2 my-6">
                        <div className={`h-px flex-grow ${darkMode ? 'bg-zinc-800' : 'bg-gray-200'}`}></div>
                        <div className={`w-1.5 h-1.5 rounded-full ${darkMode ? 'bg-[#D4AF37]' : 'bg-emerald-500'}`}></div>
                        <div className={`h-px flex-grow ${darkMode ? 'bg-zinc-800' : 'bg-gray-200'}`}></div>
                      </div>

                      {/* Author Bio/Stats could go here */}
                      <div className="space-y-3 text-center">
                        <p className={`text-sm leading-relaxed ${
                          darkMode ? "text-zinc-400" : "text-gray-600"
                        }`}>
                          Contributing author sharing insights on faith, community, and humanitarian efforts.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Article Meta Info Card */}
                <div className={`p-1 rounded-[2rem] bg-gradient-to-br ${
                  darkMode 
                    ? 'from-zinc-800 to-zinc-900' 
                    : 'from-gray-100 to-white shadow-lg shadow-gray-200/50'
                }`}>
                  <div className={`rounded-[1.8rem] overflow-hidden p-6 ${
                    darkMode ? 'bg-zinc-900' : 'bg-white'
                  }`}>
                    <h3 className={`text-xs uppercase tracking-[0.2em] font-bold mb-4 ${
                      darkMode ? "text-zinc-600" : "text-gray-400"
                    }`}>
                      Article Info
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Calendar className={`w-5 h-5 mt-0.5 ${darkMode ? "text-[#D4AF37]" : "text-emerald-600"}`} />
                        <div>
                          <div className={`text-xs font-bold mb-1 ${
                            darkMode ? "text-zinc-500" : "text-gray-500"
                          }`}>
                            Published
                          </div>
                          <div className={`text-sm font-semibold ${
                            darkMode ? "text-zinc-300" : "text-gray-700"
                          }`}>
                            {new Date(blog.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </div>
                        </div>
                      </div>

                      {readingTime > 0 && (
                        <div className="flex items-start gap-3">
                          <Clock className={`w-5 h-5 mt-0.5 ${darkMode ? "text-[#D4AF37]" : "text-emerald-600"}`} />
                          <div>
                            <div className={`text-xs font-bold mb-1 ${
                              darkMode ? "text-zinc-500" : "text-gray-500"
                            }`}>
                              Reading Time
                            </div>
                            <div className={`text-sm font-semibold ${
                              darkMode ? "text-zinc-300" : "text-gray-700"
                            }`}>
                              {readingTime} minute{readingTime !== 1 ? 's' : ''}
                            </div>
                          </div>
                        </div>
                      )}

                      {blog.updatedAt && new Date(blog.updatedAt).getTime() !== new Date(blog.createdAt).getTime() && (
                        <div className="flex items-start gap-3">
                          <Award className={`w-5 h-5 mt-0.5 ${darkMode ? "text-[#D4AF37]" : "text-emerald-600"}`} />
                          <div>
                            <div className={`text-xs font-bold mb-1 ${
                              darkMode ? "text-zinc-500" : "text-gray-500"
                            }`}>
                              Last Updated
                            </div>
                            <div className={`text-sm font-semibold ${
                              darkMode ? "text-zinc-300" : "text-gray-700"
                            }`}>
                              {new Date(blog.updatedAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Tags Card */}
                {blog.tags && blog.tags.length > 0 && (
                  <div className={`p-1 rounded-[2rem] bg-gradient-to-br ${
                    darkMode 
                      ? 'from-zinc-800 to-zinc-900' 
                      : 'from-gray-100 to-white shadow-lg shadow-gray-200/50'
                  }`}>
                    <div className={`rounded-[1.8rem] overflow-hidden p-6 ${
                      darkMode ? 'bg-zinc-900' : 'bg-white'
                    }`}>
                      <h3 className={`text-xs uppercase tracking-[0.2em] font-bold mb-4 flex items-center gap-2 ${
                        darkMode ? "text-zinc-600" : "text-gray-400"
                      }`}>
                        <Tag size={14} />
                        Tags
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {blog.tags.map((tag, index) => (
                          <span
                            key={index}
                            className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                              darkMode
                                ? "bg-zinc-800 text-zinc-400 hover:text-[#D4AF37]"
                                : "bg-gray-100 text-gray-600 hover:text-emerald-600"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </aside>

          </div>
        </div>

        {/* Islamic Quote Footer */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className={`p-8 sm:p-10 rounded-3xl border-2 relative overflow-hidden text-center ${
            darkMode
              ? "bg-zinc-900/80 backdrop-blur-xl border-zinc-800/50"
              : "bg-white/80 backdrop-blur-xl border-gray-200/50 shadow-xl shadow-emerald-500/5"
          }`}>
            <div className="absolute top-0 left-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full -ml-16 -mt-16 blur-3xl"></div>
            <div className="relative">
              <div
                className="font-arabic text-2xl sm:text-3xl mb-4"
                style={{ color: "#D4AF37", fontWeight: "500" }}
              >
                وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ
              </div>
              <p
                className={`text-sm sm:text-base italic leading-relaxed font-medium ${
                  darkMode ? "text-zinc-400" : "text-gray-600"
                }`}
              >
                "And cooperate in righteousness and piety"
              </p>
              <div
                className={`mt-3 text-xs uppercase tracking-[0.3em] font-bold ${
                  darkMode ? "text-zinc-600" : "text-gray-400"
                }`}
              >
                — Surah Al-Ma'idah 5:2
              </div>
            </div>
          </div>
        </div>

        {/* Back to Blogs Button */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 text-center">
          <button
            onClick={() => router.push("/blogs")}
            className={`inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 ${
              darkMode
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-500/20"
                : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-xl shadow-emerald-500/30"
            }`}
          >
            <ArrowLeft size={18} />
            Back to All Articles
          </button>
        </div>
      </article>

      {/* Footer - Sticks to Bottom */}
      <Footer darkMode={darkMode} />
    </div>
  );
}