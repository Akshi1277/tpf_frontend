"use client";

import { useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ApplyModal from "./ApplyModal";
import { useGetJobBySlugQuery } from "@/utils/slices/jobsApiSlice";
import { IndianRupee } from "lucide-react";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(dateStr) {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

const TYPE_COLORS = {
    "Full-time": "bg-emerald-100 text-emerald-700 border-emerald-200",
    "Part-time":  "bg-sky-100 text-sky-700 border-sky-200",
    Internship:   "bg-violet-100 text-violet-700 border-violet-200",
    Volunteer:    "bg-amber-100 text-amber-700 border-amber-200",
};

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconLocation = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="currentColor" />
        <circle cx="12" cy="9" r="2.5" fill="white" />
    </svg>
);
const IconBriefcase = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    </svg>
);
const IconClock = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);
const IconCalendar = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
);
const IconDept = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
);

// ─── Bullet List ──────────────────────────────────────────────────────────────
function BulletList({ items, darkMode }) {
    return (
        <ul className="space-y-3" role="list">
            {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-emerald-500 shrink-0" aria-hidden="true" />
                    <span className={`text-[15px] leading-relaxed ${darkMode ? "text-zinc-300" : "text-slate-600"}`}>
                        {item}
                    </span>
                </li>
            ))}
        </ul>
    );
}

// ─── Meta Row ─────────────────────────────────────────────────────────────────
function MetaRow({ icon, label, value, darkMode }) {
    if (!value) return null;
    return (
        <div className={`flex items-start gap-3 py-3 border-b last:border-0 ${darkMode ? "border-zinc-700" : "border-slate-100"}`}>
            <span className="mt-0.5 text-emerald-500 shrink-0">{icon}</span>
            <div>
                <p className={`text-[11px] font-semibold uppercase tracking-wider ${darkMode ? "text-zinc-500" : "text-slate-400"}`}>
                    {label}
                </p>
                <p className={`text-sm font-medium mt-0.5 ${darkMode ? "text-zinc-200" : "text-slate-700"}`}>
                    {value}
                </p>
            </div>
        </div>
    );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function Skeleton({ darkMode }) {
    return (
        <div className={`min-h-screen animate-pulse ${darkMode ? "bg-zinc-900" : "bg-slate-50"}`}>
            <div className={`h-64 w-full ${darkMode ? "bg-zinc-700" : "bg-slate-200"}`} />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 space-y-6">
                        {[3 / 4, 1, 5 / 6, 2 / 3].map((w, i) => (
                            <div
                                key={i}
                                className={`h-4 rounded ${darkMode ? "bg-zinc-700" : "bg-slate-200"}`}
                                style={{ width: `${w * 100}%` }}
                            />
                        ))}
                    </div>
                    <div className={`h-64 rounded-2xl ${darkMode ? "bg-zinc-700" : "bg-slate-200"}`} />
                </div>
            </div>
        </div>
    );
}

// ─── Not Found ────────────────────────────────────────────────────────────────
function NotFound({ darkMode }) {
    return (
        <div className={`min-h-screen flex items-center justify-center px-4 ${darkMode ? "bg-zinc-900" : "bg-slate-50"}`}>
            <div className="text-center max-w-md">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${darkMode ? "bg-zinc-800" : "bg-emerald-50"}`}>
                    <svg className="text-emerald-400" width="48" height="48" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                        <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <circle cx="12" cy="16" r="1" fill="currentColor" />
                    </svg>
                </div>
                <h1 className={`font-display text-3xl mb-3 ${darkMode ? "text-white" : "text-slate-800"}`}>
                    Job Not Found
                </h1>
                <p className={`text-sm mb-8 leading-relaxed ${darkMode ? "text-zinc-400" : "text-slate-500"}`}>
                    This position may have been filled or the link may be incorrect.
                </p>
                <Link
                    href="/careers"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-bold transition"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 5l-7 7 7 7" />
                    </svg>
                    Back to Careers
                </Link>
            </div>
        </div>
    );
}

// ─── Apply Panel ──────────────────────────────────────────────────────────────
function ApplyPanel({ job, onApply, darkMode }) {
    return (
        <div className={`rounded-2xl border shadow-md overflow-hidden ${darkMode ? "bg-zinc-800 border-zinc-700 shadow-zinc-900" : "bg-white border-slate-100 shadow-slate-200/60"}`}>
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 px-5 py-4">
                <p className="text-emerald-100 text-xs font-semibold uppercase tracking-widest">Quick Info</p>
                <p className="text-white font-bold text-base mt-0.5 leading-snug">{job.title}</p>
            </div>
            <div className="px-5 pt-2 pb-1">
                <MetaRow icon={<IconDept />}               label="Department"      value={job.department}            darkMode={darkMode} />
                <MetaRow icon={<IconLocation />}           label="Location"        value={job.location}              darkMode={darkMode} />
                <MetaRow icon={<IconBriefcase />}          label="Employment Type" value={job.employmentType}        darkMode={darkMode} />
                <MetaRow icon={<IconClock />}              label="Experience"      value={job.experience}            darkMode={darkMode} />
                <MetaRow icon={<IndianRupee size={16} />}  label="Salary"          value={job.salary}                darkMode={darkMode} />
                <MetaRow icon={<IconCalendar />}           label="Posted On"       value={formatDate(job.createdAt)} darkMode={darkMode} />
            </div>
            <div className="px-5 pb-5 pt-3">
                <button
                    onClick={onApply}
                    className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-white font-bold text-sm tracking-wide transition"
                    aria-label={`Apply for ${job.title}`}
                >
                    Apply Now
                </button>
                <p className={`text-center text-xs mt-3 ${darkMode ? "text-zinc-500" : "text-slate-400"}`}>
                    Takes less than 5 minutes
                </p>
            </div>
        </div>
    );
}

// ─── Section ──────────────────────────────────────────────────────────────────
function Section({ title, children, darkMode }) {
    return (
        <section className="mb-10" aria-labelledby={`section-${title.replace(/\s+/g, "-").toLowerCase()}`}>
            <div className="flex items-center gap-3 mb-5">
                <span className="w-1 h-6 rounded-full bg-emerald-500 shrink-0" aria-hidden="true" />
                <h2
                    id={`section-${title.replace(/\s+/g, "-").toLowerCase()}`}
                    className={`font-display text-xl ${darkMode ? "text-white" : "text-slate-800"}`}
                >
                    {title}
                </h2>
            </div>
            {children}
        </section>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function JobDetailPage({ darkMode = false }) {
    const [applyOpen, setApplyOpen] = useState(false);

    const params = useParams();
    const slug = params?.slug;

    const { data, isLoading, error } = useGetJobBySlugQuery(slug, { skip: !slug });
    const job = data?.data;

    const handleApplyOpen  = useCallback(() => setApplyOpen(true),  []);
    const handleApplyClose = useCallback(() => setApplyOpen(false), []);

    if (isLoading) return <Skeleton darkMode={darkMode} />;
    if (error || !job) return <NotFound darkMode={darkMode} />;

    const typeBadgeClass = TYPE_COLORS[job.employmentType] || "bg-slate-100 text-slate-600 border-slate-200";
    const waveFill = darkMode ? "#18181b" : "#f8fafc";

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap');
                .font-display { font-family: 'DM Serif Display', serif; }
                body { font-family: 'DM Sans', sans-serif; }
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(18px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .anim-fadeup  { animation: fadeUp 0.5s ease both; }
                .anim-delay-1 { animation-delay: 0.08s; }
                .anim-delay-2 { animation-delay: 0.16s; }
                .anim-delay-3 { animation-delay: 0.24s; }
            `}</style>

            {/*
              ── IMPORTANT: No overflow-hidden on this root wrapper ────────────
              overflow-hidden on any ancestor of a fixed element creates a new
              stacking/clipping context that traps the modal and prevents it
              from rendering or scrolling correctly across the full viewport.
              The hero uses its own scoped overflow-hidden — that's fine.
              This root div must stay overflow-visible (the default).
            */}
            <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-zinc-900" : "bg-slate-50"}`}>

                {/* ── Hero — overflow-hidden scoped HERE only ── */}
                <header className="relative overflow-hidden bg-emerald-500" aria-label="Job header">
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-emerald-400 opacity-25" />
                        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-emerald-600 opacity-20 -translate-x-1/2 translate-y-1/2" />
                        <div className="absolute top-1/2 right-1/4 w-96 h-96 rounded-full border border-white/10 -translate-y-1/2" />
                        <div className="absolute top-1/2 right-1/4 w-64 h-64 rounded-full border border-white/10 -translate-y-1/2" />
                    </div>

                    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
                        <nav aria-label="Breadcrumb" className="anim-fadeup mb-6">
                            <ol className="flex items-center gap-2 text-emerald-200 text-xs">
                                <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                                <li aria-hidden="true"><span className="text-emerald-300">/</span></li>
                                <li><Link href="/careers" className="hover:text-white transition">Careers</Link></li>
                                <li aria-hidden="true"><span className="text-emerald-300">/</span></li>
                                <li className="text-white font-medium truncate max-w-[200px]" aria-current="page">
                                    {job.title}
                                </li>
                            </ol>
                        </nav>

                        <div className="anim-fadeup anim-delay-1 flex flex-wrap items-center gap-2 mb-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border bg-white/90 ${typeBadgeClass}`}>
                                {job.employmentType}
                            </span>
                            {job.department && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-white border border-white/20">
                                    {job.department}
                                </span>
                            )}
                        </div>

                        <h1 className="font-display anim-fadeup anim-delay-1 text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-5 max-w-3xl">
                            {job.title}
                        </h1>

                        <div className="anim-fadeup anim-delay-2 flex flex-wrap gap-4 text-emerald-100 text-sm">
                            {job.location && (
                                <span className="flex items-center gap-1.5">
                                    <span className="text-emerald-300"><IconLocation /></span>
                                    {job.location}
                                </span>
                            )}
                            {job.experience && (
                                <span className="flex items-center gap-1.5">
                                    <span className="text-emerald-300"><IconClock /></span>
                                    {job.experience}
                                </span>
                            )}
                            {job.salary && (
                                <span className="flex items-center gap-1.5">
                                    <span className="text-emerald-300"><IndianRupee size={16} /></span>
                                    {job.salary}
                                </span>
                            )}
                            {job.createdAt && (
                                <span className="flex items-center gap-1.5">
                                    <span className="text-emerald-300"><IconCalendar /></span>
                                    Posted {formatDate(job.createdAt)}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="relative h-10 overflow-hidden" aria-hidden="true">
                        <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
                            <path d="M0,40 C360,0 1080,0 1440,40 L1440,40 L0,40 Z" fill={waveFill} />
                        </svg>
                    </div>
                </header>

                {/* ── Content ── */}
                <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                        <article className="lg:col-span-2 anim-fadeup anim-delay-3">

                            {job.description && (
                                <Section title="About the Role" darkMode={darkMode}>
                                    <p className={`text-[15px] leading-relaxed whitespace-pre-line ${darkMode ? "text-zinc-300" : "text-slate-600"}`}>
                                        {job.description}
                                    </p>
                                </Section>
                            )}

                            {job.description && job.responsibilities?.length > 0 && (
                                <div className={`border-t my-8 ${darkMode ? "border-zinc-700" : "border-slate-100"}`} aria-hidden="true" />
                            )}

                            {job.responsibilities?.length > 0 && (
                                <Section title="Key Responsibilities" darkMode={darkMode}>
                                    <BulletList items={job.responsibilities} darkMode={darkMode} />
                                </Section>
                            )}

                            {job.responsibilities?.length > 0 && job.requirements?.length > 0 && (
                                <div className={`border-t my-8 ${darkMode ? "border-zinc-700" : "border-slate-100"}`} aria-hidden="true" />
                            )}

                            {job.requirements?.length > 0 && (
                                <Section title="Requirements" darkMode={darkMode}>
                                    <BulletList items={job.requirements} darkMode={darkMode} />
                                </Section>
                            )}

                            <div className="block lg:hidden mt-10">
                                <ApplyPanel job={job} onApply={handleApplyOpen} darkMode={darkMode} />
                            </div>

                            <div className={`hidden lg:flex items-center justify-between mt-12 pt-8 border-t ${darkMode ? "border-zinc-700" : "border-slate-100"}`}>
                                <div>
                                    <p className={`font-bold text-base ${darkMode ? "text-white" : "text-slate-800"}`}>
                                        Ready to make an impact?
                                    </p>
                                    <p className={`text-sm ${darkMode ? "text-zinc-400" : "text-slate-400"}`}>
                                        Join our mission and help create lasting change.
                                    </p>
                                </div>
                                <button
                                    onClick={handleApplyOpen}
                                    className="px-8 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-white font-bold text-sm tracking-wide transition"
                                >
                                    Apply Now
                                </button>
                            </div>

                            <div className="mt-8">
                                <Link
                                    href="/careers"
                                    className={`inline-flex items-center gap-2 text-sm transition ${darkMode ? "text-zinc-500 hover:text-emerald-400" : "text-slate-400 hover:text-emerald-600"}`}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M19 12H5M12 5l-7 7 7 7" />
                                    </svg>
                                    Back to all openings
                                </Link>
                            </div>
                        </article>

                        <aside className="hidden lg:block" aria-label="Job quick info">
                            <div className="sticky top-8">
                                <ApplyPanel job={job} onApply={handleApplyOpen} darkMode={darkMode} />
                                <div className={`mt-4 p-4 rounded-xl border text-center ${darkMode ? "bg-zinc-800 border-zinc-700" : "bg-emerald-50 border-emerald-100"}`}>
                                    <p className={`text-xs font-semibold mb-0.5 ${darkMode ? "text-emerald-400" : "text-emerald-700"}`}>
                                        Know someone perfect?
                                    </p>
                                    <p className={`text-xs ${darkMode ? "text-zinc-400" : "text-emerald-500"}`}>
                                        Share this opportunity with them.
                                    </p>
                                    <button
                                        onClick={() => {
                                            if (navigator.share) {
                                                navigator.share({ title: job.title, url: window.location.href });
                                            } else {
                                                navigator.clipboard.writeText(window.location.href);
                                            }
                                        }}
                                        className={`mt-3 w-full py-2 rounded-lg border text-xs font-semibold transition ${
                                            darkMode
                                                ? "border-zinc-600 text-emerald-400 hover:bg-zinc-700"
                                                : "border-emerald-300 text-emerald-600 hover:bg-emerald-100"
                                        }`}
                                    >
                                        Share this Role
                                    </button>
                                </div>
                            </div>
                        </aside>

                    </div>
                </main>

                <footer className={`text-center py-8 text-xs border-t mt-4 ${darkMode ? "text-zinc-600 border-zinc-800" : "text-slate-400 border-slate-100"}`}>
                    © {new Date().getFullYear()} Your NGO Name. All rights reserved.
                </footer>
            </div>

            {/*
              ── Modal sits OUTSIDE the page wrapper div ───────────────────────
              This is critical. Any ancestor with overflow-hidden, transform,
              filter, or will-change creates a new stacking context that clips
              fixed-position children. By placing the modal here as a sibling
              of the page wrapper (not a child), it is guaranteed to render
              over the entire viewport with no clipping whatsoever.
            */}
            {applyOpen && (
                <ApplyModal
                    job={job}
                    onClose={handleApplyClose}
                    darkMode={darkMode}
                />
            )}
        </>
    );
}