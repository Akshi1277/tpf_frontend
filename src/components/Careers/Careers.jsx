"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { useGetAllJobsQuery } from "@/utils/slices/jobsApiSlice";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const TYPE_COLORS = {
    "Full-time": "bg-emerald-100 text-emerald-700",
    "Part-time":  "bg-sky-100 text-sky-700",
    Internship:   "bg-violet-100 text-violet-700",
    Volunteer:    "bg-amber-100 text-amber-700",
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

function validateForm(values) {
    const errors = {};
    if (!values.fullName.trim()) errors.fullName = "Full name is required.";
    if (!values.email.trim()) {
        errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = "Enter a valid email address.";
    }
    if (!values.phone.trim()) {
        errors.phone = "Phone number is required.";
    } else if (!/^\+?[0-9\s\-()]{7,15}$/.test(values.phone)) {
        errors.phone = "Enter a valid phone number.";
    }
    if (!values.resume) errors.resume = "Please upload your resume.";
    if (!values.whyUs.trim()) errors.whyUs = "This field is required.";
    return errors;
}

// ─── Field ────────────────────────────────────────────────────────────────────
function Field({ label, error, required, children, darkMode }) {
    return (
        <div>
            <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${darkMode ? "text-zinc-400" : "text-slate-600"}`}>
                {label}
                {required && <span className="text-emerald-500 ml-0.5">*</span>}
            </label>
            {children}
            {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
        </div>
    );
}

// ─── Input class helper ───────────────────────────────────────────────────────
function inputCls(err, darkMode) {
    const base = "w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition focus:ring-2";
    if (err) {
        return `${base} border-red-400 bg-red-950/30 text-red-300 focus:ring-red-800`;
    }
    if (darkMode) {
        return `${base} border-zinc-600 bg-zinc-700 text-zinc-100 placeholder-zinc-500 focus:border-emerald-500 focus:ring-emerald-900`;
    }
    return `${base} border-slate-200 bg-slate-50 text-slate-700 focus:border-emerald-400 focus:ring-emerald-100`;
}

// ─── Apply Modal ──────────────────────────────────────────────────────────────
function ApplyModal({ job, onClose, darkMode }) {
    const [values, setValues] = useState({
        fullName: "",
        email: "",
        phone: "",
        resume: null,
        whyUs: "",
    });
    const [errors, setErrors]     = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted]   = useState(false);
    const overlayRef = useRef(null);

    useEffect(() => {
        const handler = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, []);

    const handleOverlayClick = (e) => {
        if (e.target === overlayRef.current) onClose();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((v) => ({ ...v, [name]: value }));
        if (errors[name]) setErrors((err) => { const n = { ...err }; delete n[name]; return n; });
    };

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            setValues((v) => ({ ...v, resume: file }));
            if (errors.resume) setErrors((err) => { const n = { ...err }; delete n.resume; return n; });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validateForm(values);
        if (Object.keys(errs).length) { setErrors(errs); return; }
        setSubmitting(true);
        // Replace with real API call
        await new Promise((r) => setTimeout(r, 1800));
        setSubmitting(false);
        setSubmitted(true);
    };

    const cardBg = darkMode ? "bg-zinc-900 border border-zinc-700" : "bg-white";

    return (
        <>
            <style>{`
                @keyframes modalIn {
                    from { opacity: 0; transform: scale(0.92) translateY(12px); }
                    to   { opacity: 1; transform: scale(1)    translateY(0); }
                }
            `}</style>

            <div
                ref={overlayRef}
                onClick={handleOverlayClick}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(5px)" }}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                <div
                    className={`relative w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden ${cardBg}`}
                    style={{ animation: "modalIn 0.25s cubic-bezier(0.34,1.56,0.64,1) both" }}
                >
                    {/* Header — always emerald, no dark mode needed */}
                    <div className="bg-emerald-500 px-6 py-5 pr-14">
                        <p className="text-emerald-100 text-xs font-semibold uppercase tracking-widest mb-1">
                            Apply for
                        </p>
                        <h2 id="modal-title" className="text-white text-xl font-bold leading-tight">
                            {job.title}
                        </h2>
                        <p className="text-emerald-200 text-sm mt-1">
                            {job.location} · {job.employmentType}
                        </p>
                    </div>

                    {/* Close */}
                    <button
                        onClick={onClose}
                        aria-label="Close modal"
                        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition"
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>

                    {/* Body */}
                    <div className="px-6 py-6 overflow-y-auto max-h-[70vh]">
                        {submitted ? (
                            <div className="flex flex-col items-center py-8 text-center">
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${darkMode ? "bg-emerald-900" : "bg-emerald-100"}`}>
                                    <svg className="text-emerald-500" width="32" height="32" viewBox="0 0 24 24" fill="none">
                                        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3 className={`text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-slate-800"}`}>
                                    Application Submitted!
                                </h3>
                                <p className={`text-sm max-w-xs ${darkMode ? "text-zinc-400" : "text-slate-500"}`}>
                                    Thank you for applying. We'll review your application and get back to you within 5–7 business days.
                                </p>
                                <button
                                    onClick={onClose}
                                    className="mt-6 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-semibold transition"
                                >
                                    Close
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} noValidate className="space-y-4">

                                <Field label="Full Name" error={errors.fullName} required darkMode={darkMode}>
                                    <input
                                        name="fullName"
                                        value={values.fullName}
                                        onChange={handleChange}
                                        placeholder="Jane Doe"
                                        aria-required="true"
                                        className={inputCls(errors.fullName, darkMode)}
                                    />
                                </Field>

                                <Field label="Email Address" error={errors.email} required darkMode={darkMode}>
                                    <input
                                        name="email"
                                        type="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        placeholder="jane@example.com"
                                        aria-required="true"
                                        className={inputCls(errors.email, darkMode)}
                                    />
                                </Field>

                                <Field label="Phone Number" error={errors.phone} required darkMode={darkMode}>
                                    <input
                                        name="phone"
                                        type="tel"
                                        value={values.phone}
                                        onChange={handleChange}
                                        placeholder="+91 98765 43210"
                                        aria-required="true"
                                        className={inputCls(errors.phone, darkMode)}
                                    />
                                </Field>

                                <Field label="Resume" error={errors.resume} required darkMode={darkMode}>
                                    <label className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-dashed cursor-pointer transition ${
                                        errors.resume
                                            ? "border-red-500 bg-red-950/30"
                                            : darkMode
                                                ? "border-zinc-600 bg-zinc-700 hover:border-emerald-500 hover:bg-zinc-600"
                                                : "border-slate-200 bg-slate-50 hover:border-emerald-400 hover:bg-emerald-50"
                                    }`}>
                                        <svg className="text-emerald-400 shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                            <path d="M12 16V8m0 0l-3 3m3-3l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="2" />
                                        </svg>
                                        <span className={`text-sm truncate ${darkMode ? "text-zinc-400" : "text-slate-500"}`}>
                                            {values.resume ? values.resume.name : "Upload PDF, DOC, or DOCX"}
                                        </span>
                                        <input
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            onChange={handleFile}
                                            className="hidden"
                                            aria-label="Upload resume"
                                        />
                                    </label>
                                </Field>

                                <Field label="Why should we hire you for this role?" error={errors.whyUs} required darkMode={darkMode}>
                                    <textarea
                                        name="whyUs"
                                        value={values.whyUs}
                                        onChange={handleChange}
                                        rows={4}
                                        placeholder="Tell us what makes you a great fit…"
                                        aria-required="true"
                                        className={`${inputCls(errors.whyUs, darkMode)} resize-none`}
                                    />
                                </Field>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm tracking-wide transition flex items-center justify-center gap-2 mt-2"
                                >
                                    {submitting ? (
                                        <>
                                            <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" />
                                                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                                            </svg>
                                            Submitting…
                                        </>
                                    ) : "Submit Application"}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

// ─── Job Card ─────────────────────────────────────────────────────────────────
function JobCard({ job, onApply, darkMode }) {
    return (
        <article className={`group rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 flex flex-col ${
            darkMode
                ? "bg-zinc-800 border-zinc-700 shadow-none hover:border-zinc-600"
                : "bg-white border-slate-100 shadow-sm hover:shadow-md"
        }`}>
            <div className="p-6 flex-1">
                <div className="flex items-center justify-between mb-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        TYPE_COLORS[job.employmentType] || "bg-slate-100 text-slate-600"
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

                <h3 className={`text-lg font-bold mb-1 group-hover:text-emerald-500 transition-colors ${
                    darkMode ? "text-white" : "text-slate-800"
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
                    className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold tracking-wide transition active:scale-95"
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
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-5 ${
                darkMode ? "bg-zinc-800" : "bg-emerald-50"
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
const TYPES = ["All", "Full-time", "Part-time", "Internship", "Volunteer"];

function FilterBar({ active, onChange, darkMode }) {
    return (
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by employment type">
            {TYPES.map((t) => (
                <button
                    key={t}
                    onClick={() => onChange(t)}
                    aria-pressed={active === t}
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition ${
                        active === t
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
                    className={`rounded-2xl border p-6 space-y-3 animate-pulse ${
                        darkMode ? "bg-zinc-800 border-zinc-700" : "bg-white border-slate-100"
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

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CareersPage({ darkMode = false }) {
    const { data, isLoading } = useGetAllJobsQuery({ page: 1, limit: 12 });
    const jobs = data?.data || [];

    const [activeFilter, setActiveFilter] = useState("All");
    const [selectedJob, setSelectedJob]   = useState(null);

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

                {/* ── Hero — always emerald, no dark mode needed ── */}
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
                        <div className="mt-8 flex items-center justify-center gap-8 text-white">
                            <div>
                                <div className="text-3xl font-display">{jobs.length || "—"}</div>
                                <div className="text-emerald-200 text-xs uppercase tracking-wider">Open Positions</div>
                            </div>
                            <div className="w-px h-10 bg-white/30" />
                            <div>
                                <div className="text-3xl font-display">12+</div>
                                <div className="text-emerald-200 text-xs uppercase tracking-wider">Countries</div>
                            </div>
                            <div className="w-px h-10 bg-white/30" />
                            <div>
                                <div className="text-3xl font-display">5K+</div>
                                <div className="text-emerald-200 text-xs uppercase tracking-wider">Lives Impacted</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Jobs Section ── */}
                <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
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

                {/* ── Why Join Us ── */}
                <section className={`border-t ${darkMode ? "bg-zinc-800 border-zinc-700" : "bg-white border-slate-100"}`}>
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                        <h2 className={`font-display text-2xl sm:text-3xl mb-3 ${darkMode ? "text-white" : "text-slate-800"}`}>
                            Why Work With Us?
                        </h2>
                        <p className={`text-sm max-w-lg mx-auto mb-10 ${darkMode ? "text-zinc-400" : "text-slate-400"}`}>
                            We believe great people deserve a great place to grow.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {[
                                { icon: "🌍", title: "Real Impact",       desc: "Your work directly shapes lives across communities." },
                                { icon: "🤝", title: "Inclusive Culture", desc: "A diverse, welcoming team where every voice counts." },
                                { icon: "📈", title: "Growth & Learning", desc: "Ongoing training, mentoring, and skill development." },
                            ].map((p) => (
                                <div key={p.title} className={`rounded-2xl p-6 ${darkMode ? "bg-zinc-700" : "bg-slate-50"}`}>
                                    <div className="text-3xl mb-3">{p.icon}</div>
                                    <h3 className={`font-bold mb-1 ${darkMode ? "text-white" : "text-slate-800"}`}>
                                        {p.title}
                                    </h3>
                                    <p className={`text-sm ${darkMode ? "text-zinc-300" : "text-slate-500"}`}>
                                        {p.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Footer ── */}
                <footer className={`text-center py-8 text-xs ${darkMode ? "text-zinc-600" : "text-slate-400"}`}>
                    © {new Date().getFullYear()} Your NGO Name. All rights reserved.
                </footer>
            </div>

            {/* Modal */}
            {selectedJob && (
                <ApplyModal job={selectedJob} onClose={handleClose} darkMode={darkMode} />
            )}
        </>
    );
}