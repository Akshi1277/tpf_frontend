'use client';

import { useState, useEffect, useMemo } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StoryCard from '@/components/ui/StoryCard';
import { useCMS } from '@/app/CMSContext';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AllImpactStoriesPage() {
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            try {
                const saved = localStorage.getItem('darkMode');
                return saved ? JSON.parse(saved) : false;
            } catch (error) {
                return false;
            }
        }
        return false;
    });

    const [scrolled, setScrolled] = useState(true);
    const [visibleCount, setVisibleCount] = useState(12);
    const loadMore = () => {
        setVisibleCount((prev) => prev + 12);
    };
    const router = useRouter();

    useEffect(() => {
        const handleDarkModeChange = () => {
            const saved = localStorage.getItem('darkMode');
            setDarkMode(saved === 'true');
        };

        window.addEventListener('storage', handleDarkModeChange);
        window.addEventListener('darkModeChanged', handleDarkModeChange);

        return () => {
            window.removeEventListener('storage', handleDarkModeChange);
            window.removeEventListener('darkModeChanged', handleDarkModeChange);
        };
    }, []);

    const cms = useCMS();

    const impactStories = useMemo(() => {
        if (!Array.isArray(cms)) return [];
        return cms
            .filter((item) => item.type === 'impact-stories')
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }, [cms]);

    const COLORS = {
        neutralHeading: darkMode ? "text-white" : "text-zinc-900",
        neutralBody: darkMode ? "text-zinc-400" : "text-zinc-600",
    };

    return (
        <div className={`min-h-screen font-sans ${darkMode ? 'bg-zinc-900' : 'bg-[#fcfcfc]'}`}>
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} scrolled={scrolled} />

            {/* Back Button */}
            <div className="absolute top-20 md:top-28 left-4 md:left-12 z-20">
                <button
                    type="button"
                    onClick={() => router.push('/')}
                    className={`group flex items-center gap-2 transition-colors duration-200 ${darkMode
                        ? "text-white hover:text-emerald-400"
                        : "text-gray-900 hover:text-emerald-600"
                        }`}
                    aria-label="Back to home"
                >
                    <div
                        className={`flex items-center justify-center w-10 h-10 rounded-xl border backdrop-blur-md shadow-lg transition-all duration-200 ${darkMode
                            ? "bg-black/40 border-white/10 hover:border-emerald-500/50 hover:bg-black/60"
                            : "bg-white/70 border-gray-200 hover:border-emerald-500/40 hover:bg-white"
                            }`}
                    >
                        <ArrowLeft size={20} strokeWidth={2.5} />
                    </div>
                    <span className="hidden sm:block font-semibold text-sm">Back to Home</span>
                </button>
            </div>

            <main className="pt-44 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 -z-10 opacity-10 pointer-events-none">
                    <div className="w-[500px] h-[500px] bg-emerald-500 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
                </div>

                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                            Our Impact
                        </span>
                    </div>
                    <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight ${COLORS.neutralHeading}`}>
                        Building Īmān, <br className="hidden sm:block" />
                        <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            Inspiring Hearts
                        </span>
                    </h1>
                    <p className={`text-lg md:text-xl ${COLORS.neutralBody} max-w-3xl mx-auto leading-relaxed`}>
                        Every story here is a testament to the power of community. Explore the journeys of hope, resilience, and spiritual renewal made possible through your support.
                    </p>
                </div>

                {/* Grid */}
                {impactStories.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
                        {impactStories.slice(0, visibleCount).map((story, index) => (
                            <div key={`${story._id}-${index}`} className="flex">
                                <StoryCard
                                    story={story}
                                    darkMode={darkMode}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={`text-center py-32 rounded-3xl border-2 border-dashed ${darkMode ? 'border-zinc-800' : 'border-zinc-200'} ${COLORS.neutralBody}`}>
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                            <span className="text-3xl">✨</span>
                        </div>
                        <p className="text-xl font-medium mb-2">More stories coming soon</p>
                        <p className="text-sm">We're currently documenting new impact stories. Check back soon!</p>
                    </div>
                )}

                {/* Load More Button */}
                {visibleCount < impactStories.length && (
                    <div className="mt-20 text-center">
                        <button
                            onClick={loadMore}
                            className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-200 bg-emerald-600 font-pj rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600 hover:bg-emerald-700 shadow-xl shadow-emerald-500/25 active:scale-95"
                        >
                            <span className="relative">Load More Stories</span>
                        </button>
                    </div>
                )}
            </main>

            <Footer darkMode={darkMode} />
            <ScrollToTop scrolled={scrolled} />

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                main {
                    animation: fadeIn 0.8s ease-out forwards;
                }
            `}</style>
        </div>
    );
}
