"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ExternalLink, Calendar } from "lucide-react";
import axios from "axios";
import GlobalLoader from "@/components/GlobalLoader";
import { getMediaUrl } from "@/utils/media";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export default function ImpactStoryDetailPage() {
    const { id } = useParams();
    const router = useRouter();

    const [story, setStory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('darkMode') === 'true'
        }
        return false
    })

    useEffect(() => {
        const handleStorageChange = () => {
            const savedMode = localStorage.getItem('darkMode')
            setDarkMode(savedMode === 'true')
        }

        window.addEventListener('storage', handleStorageChange)
        window.addEventListener('darkModeChanged', handleStorageChange)

        return () => {
            window.removeEventListener('storage', handleStorageChange)
            window.removeEventListener('darkModeChanged', handleStorageChange)
        }
    }, [])

    useEffect(() => {
        if (!id) return;

        const fetchStory = async () => {
            try {
                setLoading(true);
                setError("");

                const res = await axios.get(`${API_BASE}/cms/impact-stories/${id}`);

                if (!res.data.success) {
                    throw new Error(res.data.message || "Failed to load story");
                }

                setStory(res.data.data);
            } catch (err) {
                console.error("Error loading impact story:", err);
                setError(err.message || "Failed to load story");
            } finally {
                setLoading(false);
            }
        };

        fetchStory();
    }, [id]);

    const COLORS = {
        bg: darkMode ? "bg-zinc-950" : "bg-white",
        sectionBg: darkMode ? "bg-zinc-900" : "bg-zinc-50",
        cardBg: darkMode ? "bg-zinc-900" : "bg-white",
        border: darkMode ? "border-zinc-800" : "border-zinc-200",
        muted: darkMode ? "text-zinc-400" : "text-zinc-600",
        heading: darkMode ? "text-white" : "text-zinc-900",
        accent: darkMode ? "text-emerald-400" : "text-emerald-600",
    };

    const formattedDate = (isoString) => {
        if (!isoString) return "";
        return new Date(isoString).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const getParagraphs = (text) => {
        if (!text) return [];
        return text
            .split(/\n{2,}/)
            .map((p) => p.trim())
            .filter(Boolean);
    };

    if (loading) {
        return <GlobalLoader />;
    }

    if (error || !story) {
        return (
            <main className={`${COLORS.bg} min-h-screen px-4 py-8 flex items-center justify-center`}>
                <div className="max-w-md w-full text-center space-y-4">
                    <p className={`${COLORS.heading} text-lg font-semibold`}>
                        {error || "Story not found"}
                    </p>
                    <p className={`${COLORS.muted} text-sm`}>
                        The story you&apos;re looking for may have been removed or is temporarily unavailable.
                    </p>
                    <button
                        onClick={() => router.push("/#stories")}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors cursor-pointer"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Impact Stories
                    </button>
                </div>
            </main>
        );
    }

    const storyParagraphs = getParagraphs(story.story);
    const hasStoryContent = storyParagraphs.length > 0;

    return (
        <main className={`${COLORS.bg} min-h-screen`}>
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden">
                {/* Background gradient */}
                <div
                    className="absolute inset-0 opacity-20 sm:opacity-30 pointer-events-none"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 0 0, #22c55e 0, transparent 45%), radial-gradient(circle at 100% 0, #0ea5e9 0, transparent 55%)",
                    }}
                />

                {/* Back button */}
                <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-4 pt-4 sm:pt-6 md:pt-10">
                    <button
                        onClick={() => router.push("/#stories")}
                        className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full bg-zinc-900/80 text-zinc-100 text-xs sm:text-sm border border-zinc-700/70 shadow-sm hover:bg-zinc-800 transition-colors cursor-pointer"
                    >
                        <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span>Impact Stories</span>
                    </button>
                </div>

                {/* Hero content grid */}
                <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-4 pb-6 sm:pb-10 md:pb-14 pt-4 sm:pt-6">
                    <div className="flex flex-col md:grid md:grid-cols-5 gap-5 sm:gap-8 md:gap-10 items-center">

                        {/* Text — full width on mobile, 2/5 on desktop */}
                        <div className="w-full md:col-span-2 space-y-3 sm:space-y-4 md:space-y-5">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                                <span className="text-[10px] sm:text-xs font-medium text-emerald-500 tracking-wide whitespace-nowrap">
                                    Impact Story
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-tight ${COLORS.heading}`}>
                                {story.title}
                            </h1>

                            {/* Description */}
                            <p className={`${COLORS.muted} text-sm sm:text-base leading-relaxed`}>
                                {story.description}
                            </p>

                            {/* Meta pills */}
                            <div className="flex flex-col xs:flex-row flex-wrap gap-2">
                                <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-black/60 text-zinc-100 border border-zinc-700/70 text-xs sm:text-sm">
                                    <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                                    <span className="truncate">
                                        Updated {formattedDate(story.updatedAt || story.createdAt)}
                                    </span>
                                </div>
                                <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-zinc-900/80 text-zinc-100 border border-zinc-700/70 text-xs sm:text-sm">
                                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 flex-shrink-0" />
                                    <span className="whitespace-nowrap">Powered by your donations</span>
                                </div>
                            </div>
                        </div>

                        {/* Image — full width on mobile, 3/5 on desktop */}
                        <div className="w-full md:col-span-3">
                            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-emerald-500/40 bg-zinc-900 shadow-xl sm:shadow-2xl shadow-emerald-500/20">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none z-10" />
                                <img
                                    src={getMediaUrl(story.image)}
                                    alt={story.title}
                                    className="w-full h-[200px] xs:h-[240px] sm:h-[280px] md:h-[320px] object-cover"
                                    loading="lazy"
                                />
                                <div className="absolute bottom-0 left-0 right-0 z-20 p-3 sm:p-4 md:p-5 flex items-end justify-between gap-2">
                                    <div className="space-y-0.5 flex-1 min-w-0">
                                        <p className="text-[11px] xs:text-xs sm:text-sm text-zinc-200 font-medium leading-tight">
                                            &quot;Your generosity continues to create ripples of change.&quot;
                                        </p>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] text-zinc-400">
                                            Īmān Fund
                                        </p>
                                        <p className="text-[10px] sm:text-xs font-semibold text-zinc-100">
                                            Impact Collection
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {/* end hero */}

            {/* Story content + sidebar */}
            <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-4 pb-10 sm:pb-16 md:pb-20">
                <div className="flex flex-col lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)] gap-5 sm:gap-8 md:gap-10">

                    {/* Sidebar — rendered first on mobile via order */}
                    <aside className="order-1 lg:order-2 space-y-4 sm:space-y-6">
                        {/* Highlight card */}
                        <div className={`rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 ${COLORS.cardBg} border ${COLORS.border} relative overflow-hidden`}>
                            <div className="absolute -top-10 -right-10 w-24 h-24 sm:w-28 sm:h-28 bg-emerald-500/10 rounded-full blur-3xl" />
                            <div className="relative space-y-2 sm:space-y-3">
                                <p className={`text-[10px] sm:text-xs font-semibold tracking-[0.15em] sm:tracking-[0.2em] uppercase ${COLORS.muted}`}>
                                    Why this matters
                                </p>
                                <p className={`text-sm sm:text-base font-medium leading-snug ${COLORS.heading}`}>
                                    Each story is a living proof that your contribution is more than a
                                    transaction—it&apos;s a mercy, a lifeline, a renewed hope.
                                </p>
                                <p className={`${COLORS.muted} text-xs sm:text-sm leading-relaxed`}>
                                    Continue supporting initiatives like this to keep transforming lives and
                                    hearts across the Ummah.
                                </p>
                            </div>
                        </div>

                        {/* Media links */}
                        {story.mediaLinks && story.mediaLinks.length > 0 && (
                            <div className={`rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 ${COLORS.cardBg} border ${COLORS.border}`}>
                                <h3 className={`text-sm sm:text-base font-semibold mb-2 sm:mb-3 ${COLORS.heading}`}>
                                    Explore more about this story
                                </h3>
                                <p className={`${COLORS.muted} text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed`}>
                                    These external resources may include campaign pages, videos, or social
                                    posts related to this impact.
                                </p>
                                <div className="space-y-2">
                                    {story.mediaLinks.map((link, idx) => (
                                        <a
                                            key={`${link}-${idx}`}
                                            href={link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl border border-emerald-500/40 bg-emerald-500/5 text-xs sm:text-sm text-emerald-600 hover:bg-emerald-500/10 hover:border-emerald-500/70 transition-colors"
                                        >
                                            <span className="truncate min-w-0 break-all">{link}</span>
                                            <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </aside>

                    {/* Story article */}
                    <article className={`order-2 lg:order-1 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 ${COLORS.cardBg} border ${COLORS.border} shadow-sm`}>
                        <h2 className={`text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4 md:mb-6 ${COLORS.heading}`}>
                            The Story
                        </h2>

                        {hasStoryContent ? (
                            <div className="space-y-4 sm:space-y-5 md:space-y-6">
                                {storyParagraphs.map((para, idx) => (
                                    <p
                                        key={idx}
                                        className={`${COLORS.muted} text-sm sm:text-base leading-relaxed`}
                                    >
                                        {para}
                                    </p>
                                ))}
                            </div>
                        ) : (
                            <p className={`${COLORS.muted} text-sm sm:text-base leading-relaxed`}>
                                The full story is being prepared and will be published soon. Thank you for
                                your patience and continued support.
                            </p>
                        )}
                    </article>

                </div>
            </div>
        </main>
    );
}