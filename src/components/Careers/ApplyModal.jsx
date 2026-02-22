"use client";

import { useState, useEffect, useRef } from "react";

// ─── Validation ───────────────────────────────────────────────────────────────
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

// ─── Input class helper ───────────────────────────────────────────────────────
function inputCls(err, darkMode) {
    const base = "w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition focus:ring-2";
    if (err) {
        return `${base} border-red-400 bg-red-950/30 text-red-300 focus:ring-red-800`;
    }
    if (darkMode) {
        return `${base} border-zinc-600 bg-zinc-700 text-zinc-100 placeholder-zinc-500 focus:border-emerald-500 focus:ring-emerald-900`;
    }
    return `${base} border-slate-200 bg-slate-50 text-slate-700 placeholder-slate-400 focus:border-emerald-400 focus:ring-emerald-100`;
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

// ─── Main Modal ───────────────────────────────────────────────────────────────
export default function ApplyModal({ job, onClose, darkMode = false }) {
    const [values, setValues] = useState({
        fullName: "",
        email: "",
        phone: "",
        resume: null,
        whyUs: "",
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    // Close on ESC
    useEffect(() => {
        const handler = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    // Lock body scroll
    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = prev; };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((v) => ({ ...v, [name]: value }));
        if (errors[name])
            setErrors((err) => { const n = { ...err }; delete n[name]; return n; });
    };

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            setValues((v) => ({ ...v, resume: file }));
            if (errors.resume)
                setErrors((err) => { const n = { ...err }; delete n.resume; return n; });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validateForm(values);
        if (Object.keys(errs).length) { setErrors(errs); return; }
        setSubmitting(true);

        // ── Replace with real API call ────────────────────────────────────────
        // const formData = new FormData();
        // formData.append("jobId", job._id);
        // formData.append("fullName", values.fullName);
        // formData.append("email", values.email);
        // formData.append("phone", values.phone);
        // formData.append("resume", values.resume);
        // formData.append("whyUs", values.whyUs);
        // await fetch("/api/applications", { method: "POST", body: formData });
        // ─────────────────────────────────────────────────────────────────────

        await new Promise((r) => setTimeout(r, 1800));
        setSubmitting(false);
        setSubmitted(true);
    };

    return (
        <>
            <style>{`
                @keyframes modalIn {
                    from { opacity: 0; transform: scale(0.93) translateY(14px); }
                    to   { opacity: 1; transform: scale(1) translateY(0); }
                }
            `}</style>

            {/*
              ── SCROLL ARCHITECTURE ───────────────────────────────────────────
              The overlay is split into two layers stacked with absolute/fixed:

              Layer 1 (backdrop): fixed inset-0, handles backdrop click + blur.
                                  pointer-events-auto, z-50.
              Layer 2 (scroller): fixed inset-0, overflow-y-auto, z-50.
                                  This one actually scrolls. It contains the card.
                                  Click on the scroller OUTSIDE the card = close.

              Why not one div with overflow-y-auto + onClick?
              Because pointer-events-none on the centering wrapper breaks
              scroll on iOS/Safari. Two layers is the clean solution.
            */}

            {/* Layer 1: Backdrop (blur + dim) */}
            <div
                className="fixed inset-0 z-50"
                style={{
                    backgroundColor: "rgba(0,0,0,0.55)",
                    backdropFilter: "blur(5px)",
                }}
                aria-hidden="true"
            />

            {/* Layer 2: Scrollable container + click-outside-to-close */}
            <div
                className="fixed inset-0 z-50 overflow-y-auto"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                data-lenis-prevent="true"
                onClick={(e) => {
                    // Close only if clicking the scroll container itself, not the card
                    if (e.target === e.currentTarget) onClose();
                }}
            >
                {/*
                  py-8 gives top/bottom breathing room when the card is taller
                  than the viewport. min-h-full + flex centers when it fits.
                  NO pointer-events-none anywhere — everything is clickable.
                */}
                <div className="flex min-h-full items-center justify-center py-8 px-4 sm:px-6">

                    {/* Card */}
                    <div
                        className={`relative w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden ${darkMode ? "bg-zinc-900 border border-zinc-700" : "bg-white"
                            }`}
                        style={{ animation: "modalIn 0.28s cubic-bezier(0.34,1.56,0.64,1) both" }}
                    >
                        {/* ── Header ── */}
                        <div className="bg-emerald-500 px-6 py-5 pr-14">
                            <p className="text-emerald-100 text-xs font-semibold uppercase tracking-widest mb-1">
                                Apply for
                            </p>
                            <h2
                                id="modal-title"
                                className="text-white text-xl font-bold leading-tight"
                            >
                                {job.title}
                            </h2>
                            <p className="text-emerald-200 text-sm mt-1">
                                {job.location} · {job.employmentType}
                            </p>
                        </div>

                        {/* ── Close button ── */}
                        <button
                            onClick={onClose}
                            aria-label="Close modal"
                            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition"
                        >
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </button>

                        {/* ── Body — full natural height, no overflow/max-height ── */}
                        <div className="px-6 py-6">
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
                                        className="mt-6 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-bold transition"
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
                                        <label className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-dashed cursor-pointer transition ${errors.resume
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
                                        ) : (
                                            "Submit Application"
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}