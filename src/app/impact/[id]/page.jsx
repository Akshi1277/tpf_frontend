"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    ArrowLeft, ExternalLink, Calendar, Heart, Share2,
    BookOpen, Globe, CheckCircle2, Sparkles,
} from "lucide-react";
import axios from "axios";
import GlobalLoader from "@/components/GlobalLoader";
import Navbar from "@/components/layout/Navbar";
import { getMediaUrl } from "@/utils/media";
import Footer from "@/components/layout/Footer";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

/* ── viewport reveal hook ── */
function useReveal(threshold = 0.08) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        if (!ref.current) return;
        const io = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
            { threshold }
        );
        io.observe(ref.current);
        return () => io.disconnect();
    }, []);
    return [ref, visible];
}

/* ── reading progress bar ── */
function ReadingProgress() {
    const [pct, setPct] = useState(0);
    useEffect(() => {
        const fn = () => {
            const d = document.documentElement;
            setPct(d.scrollHeight - d.clientHeight > 0
                ? (d.scrollTop / (d.scrollHeight - d.clientHeight)) * 100 : 0);
        };
        window.addEventListener("scroll", fn, { passive: true });
        return () => window.removeEventListener("scroll", fn);
    }, []);
    return (
        <div className="fixed top-0 left-0 right-0 h-[3px] z-[9999] pointer-events-none">
            <div
                className="h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500"
                style={{ width: `${pct}%`, transition: "width 80ms linear" }}
            />
        </div>
    );
}

/* ── reveal wrapper ── */
function Reveal({ children, delay = 0, dir = "up" }) {
    const [ref, visible] = useReveal();
    const from =
        dir === "left" ? "translateX(-20px)" :
            dir === "right" ? "translateX(20px)" : "translateY(16px)";
    return (
        <div
            ref={ref}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translate(0)" : from,
                transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
                willChange: "opacity, transform",
            }}
        >
            {children}
        </div>
    );
}

/* ── pull quote ── */
function PullQuote({ text, T }) {
    const [ref, visible] = useReveal();
    return (
        <div
            ref={ref}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-14px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
                willChange: "opacity, transform",
            }}
            className="my-8 pl-5 border-l-[3px] border-emerald-500"
        >
            <p className={`text-base sm:text-lg font-medium leading-relaxed italic ${T.body}`}>
                {text}
            </p>
        </div>
    );
}

export default function ImpactStoryDetailPage() {
    const { id } = useParams();
    const router = useRouter();

    const [story, setStory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [imgLoaded, setImgLoaded] = useState(false);
    const [copied, setCopied] = useState(false);

    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== "undefined") return localStorage.getItem("darkMode") === "true";
        return false;
    });

    useEffect(() => {
        const sync = () => setDarkMode(localStorage.getItem("darkMode") === "true");
        window.addEventListener("storage", sync);
        window.addEventListener("darkModeChanged", sync);
        return () => {
            window.removeEventListener("storage", sync);
            window.removeEventListener("darkModeChanged", sync);
        };
    }, []);

    useEffect(() => {
        if (!id) return;
        (async () => {
            try {
                setLoading(true); setError("");
                const res = await axios.get(`${API_BASE}/cms/impact-stories/${id}`);
                if (!res.data.success) throw new Error(res.data.message || "Failed to load");
                setStory(res.data.data);
            } catch (err) {
                setError(err.message || "Failed to load story");
            } finally { setLoading(false); }
        })();
    }, [id]);

    const fmt = (iso) =>
        iso ? new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }) : "";

    const getParagraphs = (text) =>
        text ? text.split(/\n{2,}/).map(p => p.trim()).filter(Boolean) : [];

    const handleShare = async () => {
        if (navigator.share) {
            await navigator.share({ title: story?.title, url: window.location.href }).catch(() => { });
        } else {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2200);
        }
    };

    const dk = darkMode;
    const T = {
        page: dk ? "bg-zinc-950" : "bg-[#f4f4f0]",
        card: dk ? "bg-zinc-900" : "bg-white",
        cardAlt: dk ? "bg-zinc-800/50" : "bg-zinc-50",
        border: dk ? "border-zinc-800" : "border-zinc-200",
        divider: dk ? "divide-zinc-800" : "divide-zinc-100",
        head: dk ? "text-white" : "text-zinc-900",
        body: dk ? "text-zinc-300" : "text-zinc-600",
        muted: dk ? "text-zinc-500" : "text-zinc-400",
    };

    if (loading) return <GlobalLoader />;

    if (error || !story) {
        return (
            <>
                <Navbar darkMode={darkMode} setDarkMode={setDarkMode} scrolled />
                <main className={`${T.page} min-h-screen flex items-center justify-center px-4`}>
                    <div className="max-w-sm text-center space-y-4">
                        <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                            <BookOpen className="w-7 h-7 text-emerald-500" />
                        </div>
                        <p className={`${T.head} text-lg font-semibold`}>{error || "Story not found"}</p>
                        <p className={`${T.muted} text-sm`}>This story may have been removed or is temporarily unavailable.</p>
                        <button
                            onClick={() => router.push("/#stories")}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-500 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" /> Back to Stories
                        </button>
                    </div>
                </main>
            </>
        );
    }

    const paras = getParagraphs(story.story);
    const splitAt = Math.max(1, Math.floor(paras.length / 2));
    const firstHalf = paras.slice(0, splitAt);
    const pullCandidate = firstHalf.length > 1 ? firstHalf[firstHalf.length - 1] : null;
    const mainParas = pullCandidate ? firstHalf.slice(0, -1) : firstHalf;
    const secondHalf = paras.slice(splitAt);

    const checkpoints = [
        "Story verified by our field team",
        "Funds distributed transparently",
        "Impact tracked and reported",
        "Community feedback collected",
    ];

    /* impact items — custom SVG, visual first */
    const impacts = [
        {
            number: "01",
            label: "Rapid Relief",
            sub: "Critical aid delivered in the first 72 hours — when delay costs lives.",
        },
        {
            number: "02",
            label: "Restored Dignity",
            sub: "Families regain stability, privacy, and control over daily life.",
        },
        {
            number: "03",
            label: "Sustained Support",
            sub: "Not one-time help — structured programs that continue beyond crisis.",
        },
        {
            number: "04",
            label: "Stronger Communities",
            sub: "Local networks rebuild together, reducing future vulnerability.",
        },
    ];
    return (
        <>
            <ReadingProgress />
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} scrolled />

            <main className={`${T.page} min-h-screen`}>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">

                    {/* ── back nav ── */}
                    <div className="mb-7" style={{ animation: "fadeUp 0.5s ease both" }}>
                        <button
                            onClick={() => router.push("/#stories")}
                            className={`inline-flex items-center gap-2 text-sm font-medium ${T.muted} hover:text-emerald-500 transition-colors group`}
                        >
                            <span
                                className={`w-7 h-7 rounded-full border ${T.border} flex items-center justify-center group-hover:border-emerald-500/50 transition-colors`}
                            >
                                <ArrowLeft className="w-3.5 h-3.5" />
                            </span>
                            Impact Stories
                        </button>
                    </div>

                    {/* ════════════════════════════════
              MAIN TWO-COLUMN GRID
          ════════════════════════════════ */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] gap-6 lg:gap-7 items-start">

                        {/* ══════════════
                LEFT COLUMN
            ══════════════ */}
                        <div className="space-y-5">

                            {/* ── HERO CARD ── */}
                            <div
                                className={`rounded-3xl border ${T.border} ${T.card} overflow-hidden`}
                                style={{ animation: "fadeUp 0.55s ease 60ms both" }}
                            >
                                {/* accent strip */}
                                <div className="h-[3px] bg-gradient-to-r from-emerald-500 via-teal-400 to-transparent" />

                                <div className="p-5 sm:p-6 md:p-7">

                                    {/* title + meta */}
                                    <div className="mb-5">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span
                                                className="relative flex h-2 w-2 flex-shrink-0"
                                                aria-hidden="true"
                                            >
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                                            </span>
                                            <span className={`text-xs font-semibold uppercase tracking-widest text-emerald-500`}>
                                                Impact Story
                                            </span>
                                        </div>

                                        <h1 className={`text-2xl sm:text-3xl md:text-[2rem] font-bold leading-tight tracking-tight ${T.head} mb-3`}>
                                            {story.title}
                                        </h1>

                                        <p className={`text-sm sm:text-base leading-relaxed ${T.body}`}>
                                            {story.description}
                                        </p>

                                        <div className={`flex items-center gap-4 mt-4 text-xs ${T.muted}`}>
                                            <span className="flex items-center gap-1.5">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {fmt(story.updatedAt || story.createdAt)}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Globe className="w-3.5 h-3.5" />
                                                Verified · TPF Aid
                                            </span>
                                            <button
                                                onClick={handleShare}
                                                className="flex items-center gap-1.5 hover:text-emerald-500 transition-colors"
                                            >
                                                <Share2 className="w-3.5 h-3.5" />
                                                {copied ? "Copied!" : "Share"}
                                            </button>
                                        </div>
                                    </div>

                                    {/* IMAGE — full width inside card, good height */}
                                    <div className={`relative rounded-2xl overflow-hidden border ${T.border} bg-zinc-800`}>
                                        <img
                                            src={getMediaUrl(story.image)}
                                            alt={story.title}
                                            onLoad={() => setImgLoaded(true)}
                                            className="w-full object-cover block"
                                            style={{
                                                height: "clamp(220px, 35vw, 420px)",
                                                opacity: imgLoaded ? 1 : 0,
                                                transform: imgLoaded ? "scale(1)" : "scale(1.03)",
                                                transition: "opacity 0.6s ease, transform 0.6s ease",
                                            }}
                                        />
                                        {/* gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                                        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                                            <span className="text-[10px] text-white/50 uppercase tracking-[0.15em]">TPF Aid · Īmān Fund</span>
                                            <span className="text-[10px] text-white/40">Impact Collection</span>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* ── STORY ARTICLE ── */}
                            <div
                                className={`rounded-3xl border ${T.border} ${T.card} overflow-hidden`}
                                style={{ animation: "fadeUp 0.55s ease 120ms both" }}
                            >
                                <div className="px-5 sm:px-7 md:px-8 py-6 sm:py-7">

                                    <Reveal>
                                        <div className="flex items-center gap-3 mb-7">
                                            <BookOpen className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                            <span className={`text-[11px] font-bold uppercase tracking-[0.18em] ${T.muted}`}>The Story</span>
                                            <div className={`flex-1 h-px ${dk ? "bg-zinc-800" : "bg-zinc-100"}`} />
                                        </div>
                                    </Reveal>

                                    {paras.length > 0 ? (
                                        <div>
                                            {mainParas.map((p, i) => (
                                                <Reveal key={i} delay={i * 50}>
                                                    <p className={`${T.body} text-sm sm:text-base leading-[1.95] mb-5`}>{p}</p>
                                                </Reveal>
                                            ))}
                                            {pullCandidate && <PullQuote text={pullCandidate} T={T} />}
                                            {secondHalf.map((p, i) => (
                                                <Reveal key={`s${i}`} delay={i * 50}>
                                                    <p className={`${T.body} text-sm sm:text-base leading-[1.95] mb-5`}>{p}</p>
                                                </Reveal>
                                            ))}
                                        </div>
                                    ) : (
                                        <Reveal>
                                            <p className={`${T.muted} text-sm leading-relaxed`}>
                                                The full story is being prepared and will be published soon. Thank you for your patience and continued support.
                                            </p>
                                        </Reveal>
                                    )}
                                </div>

                                <Reveal>
                                    <div className={`border-t ${T.border} px-5 sm:px-7 md:px-8 py-3.5 flex items-center justify-between gap-3`}>
                                        <span className={`text-xs ${T.muted}`}>TPF Aid · Verified Impact Story</span>
                                        <button
                                            onClick={() => router.push("/#stories")}
                                            className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-500 hover:underline"
                                        >
                                            <ArrowLeft className="w-3 h-3" /> More stories
                                        </button>
                                    </div>
                                </Reveal>
                            </div>

                            {/* ── VERIFICATION ── */}
                            <Reveal>
                                <div className={`rounded-3xl border ${T.border} ${T.card} p-5 sm:p-6`}>
                                    <div className="flex items-center gap-2 mb-5">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                        <span className={`text-[11px] font-bold uppercase tracking-[0.18em] ${T.muted}`}>Story Verification</span>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                                        {checkpoints.map((cp, i) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <span className="mt-1 w-3.5 h-3.5 rounded-full bg-emerald-500/15 flex-shrink-0 flex items-center justify-center">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                                </span>
                                                <span className={`text-sm ${T.body} leading-snug`}>{cp}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Reveal>

                        </div>
                        {/* end left col */}

                        {/* ══════════════
                RIGHT SIDEBAR
            ══════════════ */}
                        <aside className="space-y-5 lg:sticky lg:top-[72px]">

                            {/* ── Why This Matters ── */}
                            <Reveal dir="right">
                                <div className={`rounded-3xl border ${T.border} ${T.card} overflow-hidden`}>
                                    <div className="h-[3px] bg-gradient-to-r from-emerald-500/70 to-transparent" />
                                    <div className="p-5">
                                        <p className={`text-[10px] font-bold uppercase tracking-[0.22em] ${T.muted} mb-2.5`}>Why This Matters</p>
                                        <p className={`text-sm font-semibold leading-snug ${T.head} mb-3`}>
                                            Every donation is a direct lifeline — not an abstraction.
                                        </p>
                                        <p className={`text-xs leading-relaxed ${T.body}`}>
                                            Stories like this prove that transparent giving creates tangible, lasting change.
                                            Your contribution doesn&apos;t just help once — it ripples outward into entire communities.
                                        </p>
                                    </div>
                                </div>
                            </Reveal>

                            {/* ── YOUR DONATION CREATES — editorial rows ── */}
                            <Reveal dir="right" delay={70}>
                                <div className={`rounded-3xl border ${T.border} ${T.card} overflow-hidden`}>
                                    <div className="px-5 pt-5 pb-3 flex items-center justify-between">
                                        <p className={`text-[10px] font-bold uppercase tracking-[0.22em] ${T.muted}`}>Your Donation Creates</p>
                                    </div>

                                    <div className="px-4 pb-4 space-y-4">
                                        {impacts.map((item, i) => (
                                            <div
                                                key={item.number}
                                                className="relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 group"
                                            >
                                                {/* glowing background */}
                                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
                                                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/20 blur-2xl rounded-full" />
                                                </div>

                                                {/* subtle grid texture */}
                                                <div
                                                    className="absolute inset-0 opacity-[0.04]"
                                                    style={{
                                                        backgroundImage:
                                                            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
                                                        backgroundSize: "12px 12px",
                                                    }}
                                                />

                                                <div className="relative z-10">
                                                    {/* top row */}
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-[10px] tracking-[0.2em] uppercase text-emerald-500 font-bold">
                                                            {item.number}
                                                        </span>

                                                        {/* flowing connector */}
                                                        {i !== impacts.length - 1 && (
                                                            <span className="text-[10px] text-zinc-400">↓</span>
                                                        )}
                                                    </div>

                                                    {/* main label */}
                                                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-emerald-500 transition">
                                                        {item.label}
                                                    </h3>

                                                    {/* description */}
                                                    <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                                                        {item.sub}
                                                    </p>

                                                    {/* impact line */}
                                                    <div className="mt-3 h-[2px] w-12 bg-gradient-to-r from-emerald-500 to-transparent group-hover:w-20 transition-all duration-300" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Reveal>

                            {/* ── Story meta table ── */}
                            <Reveal dir="right" delay={130}>
                                <div className={`rounded-3xl border ${T.border} ${T.card} divide-y ${T.divider} overflow-hidden`}>
                                    <div className="px-5 py-3.5 flex items-center justify-between">
                                        <span className={`text-xs ${T.muted}`}>Published</span>
                                        <span className={`text-xs font-medium ${T.head}`}>{fmt(story.createdAt)}</span>
                                    </div>
                                    {story.updatedAt && story.updatedAt !== story.createdAt && (
                                        <div className="px-5 py-3.5 flex items-center justify-between">
                                            <span className={`text-xs ${T.muted}`}>Updated</span>
                                            <span className={`text-xs font-medium ${T.head}`}>{fmt(story.updatedAt)}</span>
                                        </div>
                                    )}
                                    <div className="px-5 py-3.5 flex items-center justify-between">
                                        <span className={`text-xs ${T.muted}`}>Category</span>
                                        <span className="text-xs font-semibold text-emerald-500">Impact Story</span>
                                    </div>
                                    <div className="px-5 py-3.5 flex items-center justify-between">
                                        <span className={`text-xs ${T.muted}`}>Source</span>
                                        <span className={`text-xs font-medium ${T.head}`}>TPF Aid · Īmān Fund</span>
                                    </div>
                                </div>
                            </Reveal>

                            {/* ── CTA ── */}
                            <Reveal dir="right" delay={180}>
                                <div className="rounded-3xl overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-700" />
                                    <div
                                        className="absolute inset-0 opacity-15"
                                        style={{ backgroundImage: "radial-gradient(circle at 75% 20%, white 0%, transparent 60%)" }}
                                    />
                                    <div className="relative p-5 space-y-3">
                                        <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center">
                                            <Sparkles className="w-4 h-4 text-white" />
                                        </div>
                                        <p className="text-sm font-bold text-white leading-snug">
                                            Help us create more stories like this.
                                        </p>
                                        <p className="text-xs text-white/65 leading-relaxed">
                                            Your ongoing support keeps our initiatives alive and transforms more lives every month.
                                        </p>
                                        <button
                                            onClick={() => router.push("/all-campaigns")}
                                            className="w-full px-4 py-2.5 rounded-xl bg-white text-emerald-700 text-xs font-bold cursor-pointer hover:bg-white/90 transition-colors"
                                        >
                                            Support Similar Causes →
                                        </button>
                                    </div>
                                </div>
                            </Reveal>

                            {/* ── Media links ── */}
                            {story.mediaLinks?.length > 0 && (
                                <Reveal dir="right" delay={230}>
                                    <div className={`rounded-3xl border ${T.border} ${T.card} p-5`}>
                                        <p className={`text-[10px] font-bold uppercase tracking-[0.22em] ${T.muted} mb-1.5`}>Related Resources</p>
                                        <p className={`text-xs ${T.body} mb-3.5 leading-relaxed`}>
                                            External links related to this impact story.
                                        </p>
                                        <div className="space-y-2">
                                            {story.mediaLinks.map((link, idx) => (
                                                <a
                                                    key={`${link}-${idx}`}
                                                    href={link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl border ${T.border} hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-colors group`}
                                                >
                                                    <span className={`text-xs ${T.muted} truncate min-w-0 group-hover:text-emerald-500 transition-colors`}>
                                                        {link}
                                                    </span>
                                                    <ExternalLink
                                                        className="w-3.5 h-3.5 flex-shrink-0 text-emerald-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                                                    />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </Reveal>
                            )}

                        </aside>
                    </div>
                </div>
                <Footer />
            </main>

            <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </>
    );
}