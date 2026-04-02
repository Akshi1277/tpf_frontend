"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import ApplyModal from "./ApplyModal";
import { useGetAllJobsQuery } from "@/utils/slices/jobsApiSlice";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const TYPE_COLORS = {
    "Full-time": "bg-emerald-100 text-emerald-700",
    "Part-time": "bg-sky-100 text-sky-700",
    Internship: "bg-violet-100 text-violet-700",
    Volunteer: "bg-amber-100 text-amber-700",
};

function formatDate(dateStr) {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "";
    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

// ─── Job Card ─────────────────────────────────────────────────────────────────
function JobCard({ job, onApply, darkMode }) {
    return (
        <article className={`group rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 flex flex-col ${darkMode
                ? "bg-zinc-800 border-zinc-700 shadow-none hover:border-zinc-600"
                : "bg-white border-slate-100 shadow-sm hover:shadow-md"
            }`}>
            <div className="p-6 flex-1">
                <div className="flex items-center justify-between mb-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${TYPE_COLORS[job.employmentType] || "bg-slate-100 text-slate-600"
                        }`}>
                        {job.employmentType}
                    </span>
                    <Link
                        href={`/careers/${job.slug}`}
                        className="text-xs font-semibold text-emerald-500 hover:text-emerald-400 transition"
                    >
                        View Details →
                    </Link>
                </div>

                <h3 className={`text-lg font-bold mb-1 group-hover:text-emerald-500 transition-colors ${darkMode ? "text-white" : "text-slate-800"
                    }`}>
                    {job.title}
                </h3>

                <div className={`flex items-center gap-1.5 text-xs mb-3 ${darkMode ? "text-zinc-500" : "text-slate-400"}`}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="currentColor" />
                        <circle cx="12" cy="9" r="2.5" fill={darkMode ? "#27272a" : "white"} />
                    </svg>
                    {job.location}
                    <span className="mx-1">·</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                        <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    {job.createdAt && formatDate(job.createdAt)}
                </div>

                <p className={`text-sm leading-relaxed line-clamp-3 ${darkMode ? "text-zinc-400" : "text-slate-500"}`}>
                    {job.description}
                </p>
            </div>

            <div className="px-6 pb-6">
                <button
                    onClick={() => onApply(job)}
                    className="w-full py-2.5 cursor-pointer rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold tracking-wide transition active:scale-95"
                    aria-label={`Apply for ${job.title}`}
                >
                    Apply Now
                </button>
            </div>
        </article>
    );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
function EmptyState({ darkMode }) {
    return (
        <div className="col-span-full flex flex-col items-center py-24 text-center">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-5 ${darkMode ? "bg-zinc-800" : "bg-emerald-50"
                }`}>
                <svg className="text-emerald-400" width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="12" cy="13" r="2" stroke="currentColor" strokeWidth="1.5" />
                </svg>
            </div>
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? "text-zinc-200" : "text-slate-700"}`}>
                No openings right now
            </h3>
            <p className={`text-sm max-w-xs ${darkMode ? "text-zinc-500" : "text-slate-400"}`}>
                We don't have any active positions at the moment. Check back soon — we're always growing!
            </p>
        </div>
    );
}

// ─── Filter Bar ───────────────────────────────────────────────────────────────
const TYPES = ["All", "Full-time", "Part-time", "Internship", "Volunteer", "Contract"];

function FilterBar({ active, onChange, darkMode }) {
    return (
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by employment type">
            {TYPES.map((t) => (
                <button
                    key={t}
                    onClick={() => onChange(t)}
                    aria-pressed={active === t}
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition ${active === t
                            ? "bg-emerald-500 text-white border-emerald-500 shadow-sm"
                            : darkMode
                                ? "bg-zinc-800 text-zinc-300 border-zinc-600 hover:border-emerald-500 hover:text-emerald-400"
                                : "bg-white text-slate-600 border-slate-200 hover:border-emerald-400 hover:text-emerald-600"
                        }`}
                >
                    {t}
                </button>
            ))}
        </div>
    );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function SkeletonGrid({ darkMode }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
                <div
                    key={i}
                    className={`rounded-2xl border p-6 space-y-3 animate-pulse ${darkMode ? "bg-zinc-800 border-zinc-700" : "bg-white border-slate-100"
                        }`}
                >
                    <div className={`h-4 rounded w-1/3 ${darkMode ? "bg-zinc-700" : "bg-slate-200"}`} />
                    <div className={`h-5 rounded w-3/4 ${darkMode ? "bg-zinc-700" : "bg-slate-200"}`} />
                    <div className={`h-3 rounded w-1/2 ${darkMode ? "bg-zinc-700" : "bg-slate-200"}`} />
                    <div className={`h-3 rounded w-full ${darkMode ? "bg-zinc-700" : "bg-slate-200"}`} />
                    <div className={`h-3 rounded w-5/6 ${darkMode ? "bg-zinc-700" : "bg-slate-200"}`} />
                    <div className={`h-10 rounded-xl mt-4 ${darkMode ? "bg-zinc-700" : "bg-slate-200"}`} />
                </div>
            ))}
        </div>
    );
}

// ─── Why Join Us — Pillars ────────────────────────────────────────────────────
const pillars = [
    {
        number: "01",
        title: "Real Impact",
        desc: "Every role here is tied directly to our mission. Your contributions fund livelihoods, support education, and restore dignity to communities in need — at scale.",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M12 21C12 21 4 13.5 4 8.5C4 5.46 6.69 3 10 3C11.04 3 12 3.27 12 3.27C12 3.27 12.96 3 14 3C17.31 3 20 5.46 20 8.5C20 13.5 12 21 12 21Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
                <path d="M12 11.5L10.5 10L9 11.5L10.5 13L12 11.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
            </svg>
        ),
    },
    {
        number: "02",
        title: "Inclusive Culture",
        desc: "We are built on pluralism, respect, and shared purpose. Our team spans backgrounds, faiths, and geographies — united by a commitment to service above self.",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.8"/>
                <circle cx="17" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.8"/>
                <path d="M2 20c0-3.31 3.13-6 7-6s7 2.69 7 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                <path d="M17 15c1.66 0 3 1.34 3 3v1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
        ),
    },
    {
        number: "03",
        title: "Growth & Learning",
        desc: "We invest in our people with structured mentorship, cross-functional projects, and continuous skill-building — so your growth mirrors the growth of those we serve.",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M2 20h20M6 20V10l6-6 6 6v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="10" y="14" width="4" height="6" rx="0.5" stroke="currentColor" strokeWidth="1.8"/>
            </svg>
        ),
    },
];

function WhyJoinUs({ darkMode }) {
    return (
        <section className={`relative border-t overflow-hidden ${darkMode ? "bg-zinc-900 border-zinc-800" : "bg-slate-50 border-slate-100"}`}>

            {/* Subtle background grid */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.025]"
                style={{
                    backgroundImage: darkMode
                        ? "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)"
                        : "linear-gradient(rgba(0,0,0,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.6) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                }}
            />

            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">

                {/* Section header */}
                <div className="max-w-xl mb-16">
                    <span className={`inline-block text-xs font-bold uppercase tracking-[0.2em] mb-4 ${darkMode ? "text-emerald-400" : "text-emerald-600"}`}>
                        Why Work With Us
                    </span>
                    <h2 className={`font-display text-3xl sm:text-4xl leading-tight mb-4 ${darkMode ? "text-white" : "text-slate-900"}`}>
                        A place where purpose<br />
                        <em>meets profession.</em>
                    </h2>
                    <p className={`text-sm sm:text-base leading-relaxed ${darkMode ? "text-zinc-400" : "text-slate-500"}`}>
                        We believe exceptional people deserve more than a job — they deserve meaningful work,
                        genuine community, and a career that leaves the world better than they found it.
                    </p>
                </div>

                {/* Pillars */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-px">
                    {pillars.map((pillar, i) => (
                        <div
                            key={pillar.number}
                            className={`relative group p-8 sm:p-10 transition-all duration-300 ${
                                i < pillars.length - 1
                                    ? darkMode
                                        ? "border-b lg:border-b-0 lg:border-r border-zinc-800"
                                        : "border-b lg:border-b-0 lg:border-r border-slate-200"
                                    : ""
                            } ${darkMode ? "hover:bg-zinc-800/60" : "hover:bg-white"} rounded-none`}
                            style={{ transition: "background 0.2s" }}
                        >
                            {/* Emerald accent line on hover */}
                            <div className={`absolute top-0 left-8 sm:left-10 w-8 h-0.5 bg-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />

                            {/* Number */}
                            <span className={`block text-xs font-bold tracking-[0.25em] uppercase mb-6 ${darkMode ? "text-zinc-600" : "text-slate-300"}`}>
                                {pillar.number}
                            </span>

                            {/* Icon in a refined container */}
                            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-6 transition-colors duration-300 ${
                                darkMode
                                    ? "bg-zinc-800 text-emerald-400 group-hover:bg-emerald-950/60 group-hover:text-emerald-300"
                                    : "bg-slate-100 text-slate-500 group-hover:bg-emerald-50 group-hover:text-emerald-600"
                            }`}>
                                {pillar.icon}
                            </div>

                            {/* Title */}
                            <h3 className={`font-display text-xl sm:text-2xl mb-3 transition-colors duration-300 ${
                                darkMode
                                    ? "text-zinc-100 group-hover:text-white"
                                    : "text-slate-800 group-hover:text-slate-900"
                            }`}>
                                {pillar.title}
                            </h3>

                            {/* Description */}
                            <p className={`text-sm leading-relaxed ${darkMode ? "text-zinc-500" : "text-slate-400"}`}>
                                {pillar.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA strip */}
                <div className={`mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t ${
                    darkMode ? "border-zinc-800" : "border-slate-200"
                }`}>
                    <div>
                        <p className={`text-xs uppercase font-bold tracking-widest mb-1 ${darkMode ? "text-zinc-500" : "text-slate-400"}`}>
                            Ready to contribute?
                        </p>
                        <p className={`text-base sm:text-lg font-display ${darkMode ? "text-zinc-200" : "text-slate-700"}`}>
                            Browse open roles and take the first step.
                        </p>
                    </div>
                    <a
                        href="#open-positions"
                        className="flex-shrink-0 inline-flex items-center gap-2.5 px-7 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold tracking-wide transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
                    >
                        See All Openings
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CareersPage({ darkMode = false }) {
    const { data, isLoading } = useGetAllJobsQuery({ page: 1, limit: 12 });
    const jobs = data?.data || [];

    const [activeFilter, setActiveFilter] = useState("All");
    const [selectedJob, setSelectedJob] = useState(null);

    const filtered = activeFilter === "All"
        ? jobs
        : jobs.filter((j) => j.employmentType === activeFilter);

    const handleApply = useCallback((job) => setSelectedJob(job), []);
    const handleClose = useCallback(() => setSelectedJob(null), []);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600;700&display=swap');
                body { font-family: 'DM Sans', sans-serif; }
                .font-display { font-family: 'DM Serif Display', serif; }
                .line-clamp-3 {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>

            <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-zinc-900 text-white" : "bg-slate-50 text-slate-900"}`}>

                {/* ── Hero ── */}
                <section className="relative overflow-hidden bg-emerald-500">
                    <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-emerald-400 opacity-30" />
                    <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-emerald-600 opacity-25" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/10" />

                    <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                        <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold uppercase tracking-widest mb-5">
                            Join Our Mission
                        </span>
                        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-5">
                            Build a Career That<br />
                            <em>Matters.</em>
                        </h1>
                        <p className="text-emerald-100 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
                            Be part of a passionate team committed to creating lasting change.
                            Every role here is an opportunity to shape lives and communities.
                        </p>
                    </div>
                </section>

                {/* ── Jobs Section ── */}
                <section id="open-positions" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
                        <div>
                            <h2 className={`font-display text-2xl sm:text-3xl ${darkMode ? "text-white" : "text-slate-800"}`}>
                                Open Positions
                            </h2>
                            <p className={`text-sm mt-1 ${darkMode ? "text-zinc-500" : "text-slate-400"}`}>
                                {isLoading ? "Loading…" : `${filtered.length} ${filtered.length === 1 ? "role" : "roles"} available`}
                            </p>
                        </div>
                        <FilterBar active={activeFilter} onChange={setActiveFilter} darkMode={darkMode} />
                    </div>

                    {isLoading ? (
                        <SkeletonGrid darkMode={darkMode} />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {filtered.length === 0 ? (
                                <EmptyState darkMode={darkMode} />
                            ) : (
                                filtered.map((job) => (
                                    <JobCard key={job._id} job={job} onApply={handleApply} darkMode={darkMode} />
                                ))
                            )}
                        </div>
                    )}
                </section>

                {/* ── Why Join Us — redesigned ── */}
                <WhyJoinUs darkMode={darkMode} />

                {/* ── Footer ── */}
                <footer className={`text-center py-8 text-xs ${darkMode ? "text-zinc-600" : "text-slate-400"}`}>
                    © {new Date().getFullYear()} TPF Aid. All rights reserved.
                </footer>
            </div>

            {/* Modal */}
            {selectedJob && (
                <ApplyModal job={selectedJob} onClose={handleClose} darkMode={darkMode} />
            )}
        </>
    );
}