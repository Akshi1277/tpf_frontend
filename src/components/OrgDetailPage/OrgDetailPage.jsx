"use client";

import { useParams, useRouter } from "next/navigation";
import { useFetchOrganizationByIdQuery } from "@/utils/slices/organizationApiSlice";
import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import {
    ArrowLeft, ShieldCheck, Building2, User, ExternalLink,
    MapPin, Calendar, Users, Info, Zap, Globe, Phone, Mail,
    ChevronDown, ChevronUp
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlobalLoader from "@/components/GlobalLoader";
import { getMediaUrl } from "@/utils/media";

/* ─────────────────────────────────────────────────────────────────────────────
   PERFORMANCE STRATEGY
   ─ Removed: TracingBeam, BackgroundBeams, CardSpotlight (Aceternity)
   ─ All ambient glow / grain: CSS-only, no JS animation loop
   ─ Framer-motion: ONLY for initial mount sequences (fires once, then done)
   ─ Spotlight on sidebar card: CSS radial-gradient via CSS custom property on
     mousemove — no setInterval, no RAF loop
   ─ FadeUp: single shared IntersectionObserver, CSS transitions (not JS RAF)
   ─ blur() kept ≤ 50px, on isolated layers so the compositor doesn't repaint
   ─ willChange applied surgically only on elements that actually animate
───────────────────────────────────────────────────────────────────────────── */

/* ── Shared IntersectionObserver for all FadeUp instances ─────────────────── */
const _ioCallbacks = new Map();
let _sharedIO = null;

function getIO() {
    if (typeof window === "undefined") return null;
    if (!_sharedIO) {
        _sharedIO = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        _ioCallbacks.get(e.target)?.();
                        _sharedIO.unobserve(e.target);
                        _ioCallbacks.delete(e.target);
                    }
                });
            },
            { threshold: 0.08 }
        );
    }
    return _sharedIO;
}

function FadeUp({ children, delay = 0, className = "" }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = getIO();
        if (!io) { setVisible(true); return; }
        _ioCallbacks.set(el, () => setVisible(true));
        io.observe(el);
        return () => { io.unobserve(el); _ioCallbacks.delete(el); };
    }, []);

    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(18px)",
                transition: `opacity 0.48s ease ${delay}s, transform 0.48s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
                willChange: "opacity, transform",
            }}
        >
            {children}
        </div>
    );
}

/* ── CSS spotlight card — mousemove updates a CSS var, zero animation loop ─── */
function SpotlightCard({ children, className = "", darkMode }) {
    const ref = useRef(null);

    const onMove = useCallback((e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        ref.current.style.setProperty("--sx", `${e.clientX - r.left}px`);
        ref.current.style.setProperty("--sy", `${e.clientY - r.top}px`);
    }, []);

    const onLeave = useCallback(() => {
        ref.current?.style.setProperty("--sx", "-999px");
        ref.current?.style.setProperty("--sy", "-999px");
    }, []);

    return (
        <div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className={`relative overflow-hidden ${className}`}
            style={{ "--sx": "-999px", "--sy": "-999px" }}
        >
            {/* Spotlight — single CSS radial-gradient, repaints only on mousemove */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-0"
                style={{
                    background: `radial-gradient(300px circle at var(--sx) var(--sy), ${
                        darkMode ? "rgba(16,185,129,0.09)" : "rgba(16,185,129,0.06)"
                    }, transparent 70%)`,
                    transition: "background 0.08s linear",
                }}
            />
            <div className="relative z-10">{children}</div>
        </div>
    );
}

/* ── Vertical accent line (replaces TracingBeam) ──────────────────────────── */
function AccentLine({ darkMode }) {
    return (
        <div
            aria-hidden
            className="absolute left-0 top-0 bottom-0 w-px pointer-events-none"
            style={{
                background: darkMode
                    ? "linear-gradient(to bottom, transparent 0%, #10b981 15%, #10b981 85%, transparent 100%)"
                    : "linear-gradient(to bottom, transparent 0%, #a7f3d0 10%, #10b981 55%, #a7f3d0 90%, transparent 100%)",
            }}
        />
    );
}

/* ── Section label ────────────────────────────────────────────────────────── */
function Label({ children }) {
    return (
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-emerald-500 mb-2">
            {children}
        </p>
    );
}

/* ── Word count ───────────────────────────────────────────────────────────── */
function countWords(str = "") {
    return str.trim().split(/\s+/).filter(Boolean).length;
}

/* ═══════════════════════════════════════════════════════════════════════════ */
export default function OrganizationDetailPage() {
    const { id } = useParams();
    const router = useRouter();

    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== "undefined") {
            try { return JSON.parse(localStorage.getItem("darkMode")) ?? false; }
            catch { return false; }
        }
        return false;
    });

    const [scrolled] = useState(true);
    const [descExpanded, setDescExpanded] = useState(false);

    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }, [darkMode]);

    const { data, isLoading, error } = useFetchOrganizationByIdQuery(id, { skip: !id });
    const org = useMemo(() => data?.data, [data]);

    const T = {
        page:    darkMode ? "bg-zinc-950 text-white" : "bg-slate-50 text-slate-900",
        card:    darkMode
                    ? "bg-zinc-900/90 border-zinc-800"
                    : "bg-white border-slate-200",
        muted:   darkMode ? "text-zinc-400" : "text-slate-500",
        divider: darkMode ? "border-zinc-800" : "border-slate-100",
        pill:    darkMode ? "border-zinc-700 text-zinc-400" : "border-slate-200 text-slate-500",
        statBg:  darkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-slate-200",
        tag:     darkMode
                    ? "bg-zinc-800 text-emerald-400 border-zinc-700"
                    : "bg-emerald-50 text-emerald-700 border-emerald-100",
    };

    if (isLoading) return <GlobalLoader />;
    if (error || !org) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${T.page}`}>
                <div className="text-center p-8">
                    <h1 className="text-3xl font-black mb-4">Profile Not Found</h1>
                    <p className={`mb-8 ${T.muted}`}>This organization could not be retrieved.</p>
                    <button
                        onClick={() => router.push("/")}
                        className="px-8 py-4 bg-emerald-500 text-white rounded-full font-bold hover:bg-emerald-600 transition-colors shadow-xl shadow-emerald-500/20"
                    >
                        Return Home
                    </button>
                </div>
            </div>
        );
    }

    const mailto = `mailto:${org.organizationEmail}?subject=Inquiry%20via%20TPF%20-%20${encodeURIComponent(org.organizationName)}&body=Hello%20${encodeURIComponent(org.contactDetails?.contactName || org.organizationName)}%2C%0A%0AI%20came%20across%20your%20profile%20on%20TPF%20and%20would%20like%20to%20get%20in%20touch.%0A%0A`;

    const description    = org.organizationDescription || "";
    const needsShowMore  = countWords(description) > 100;
    const truncatedDesc  = needsShowMore
        ? description.trim().split(/\s+/).slice(0, 100).join(" ") + "…"
        : description;

    const stats = [
        { icon: MapPin,   label: "City Office",  value: org.city },
        { icon: MapPin,   label: "State",         value: org.state },
        {
            icon:  Users,
            label: "Personnel",
            value: org.isNGO
                ? (org.ngoDetails?.employeeStrength || "N/A")
                : (org.companyDetails?.numberOfEmployees || "N/A"),
        },
        org.isNGO
            ? { icon: Users,    label: "Volunteer Strength", value: org.ngoDetails?.volunteerStrength || "N/A" }
            : { icon: Calendar, label: "Years Active",        value: org.companyDetails?.yearsInOperation || "N/A" },
    ];

    /* shared shadow tokens */
    const cardShadow = darkMode
        ? "0 0 0 1px rgba(255,255,255,0.03), 0 20px 40px rgba(0,0,0,0.45)"
        : "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)";
    const emeraldShadow = "0 8px 24px rgba(16,185,129,0.28)";

    return (
        <div className={`min-h-screen transition-colors duration-500 ${T.page}`}>
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} scrolled={scrolled} />

            {/* ══════════════════════════════════════════════════════════════
                HERO
            ══════════════════════════════════════════════════════════════ */}
            <section className="relative pt-32 pb-20 overflow-hidden min-h-[70vh] flex flex-col justify-center">

                {/* ── Ambient glows — CSS only, isolated compositing layers ── */}
                <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
                    {/* Glow 1 */}
                    <div
                        className="absolute rounded-full"
                        style={{
                            top: "-15%", left: "-8%",
                            width: "44%", height: "58%",
                            background: darkMode
                                ? "radial-gradient(ellipse, rgba(16,185,129,0.14) 0%, transparent 70%)"
                                : "radial-gradient(ellipse, rgba(16,185,129,0.08) 0%, transparent 70%)",
                            filter: "blur(42px)",
                            willChange: "auto",
                        }}
                    />
                    {/* Glow 2 */}
                    <div
                        className="absolute rounded-full"
                        style={{
                            top: "8%", right: "-10%",
                            width: "38%", height: "52%",
                            background: darkMode
                                ? "radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 70%)"
                                : "radial-gradient(ellipse, rgba(99,102,241,0.04) 0%, transparent 70%)",
                            filter: "blur(50px)",
                            willChange: "auto",
                        }}
                    />
                    {/* Subtle noise grain */}
                    <div
                        className="absolute inset-0"
                        style={{
                            opacity: 0.022,
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                            backgroundSize: "180px 180px",
                        }}
                    />
                    {/* Horizontal separator glow at bottom of hero */}
                    <div
                        className="absolute bottom-0 left-0 right-0 h-px"
                        style={{
                            background: darkMode
                                ? "linear-gradient(to right, transparent, rgba(16,185,129,0.2), transparent)"
                                : "linear-gradient(to right, transparent, rgba(16,185,129,0.15), transparent)",
                        }}
                    />
                </div>

                <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 w-full">

                    {/* Back */}
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2.5 text-xs font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity duration-200 mb-14"
                    >
                        <ArrowLeft size={14} /> Back to Organizations
                    </button>

                    {/* Logo + Identity row */}
                    <div className="flex flex-col lg:flex-row items-center lg:items-end gap-10 lg:gap-16">

                        {/* Logo — single mount animation, then static */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.94 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="flex-shrink-0"
                        >
                            <div
                                className={`relative p-4 rounded-[2.5rem] border ${T.card}`}
                                style={{ boxShadow: cardShadow }}
                            >
                                <div className="w-36 h-36 md:w-48 md:h-48 rounded-[2rem] overflow-hidden bg-white flex items-center justify-center p-5">
                                    {org.organizationLogo
                                        ? <img
                                            src={getMediaUrl(org.organizationLogo)}
                                            alt={org.organizationName}
                                            className="w-full h-full object-contain"
                                            loading="eager"
                                            decoding="async"
                                          />
                                        : <Building2 size={56} className="text-zinc-200" />
                                    }
                                </div>

                                {org.verificationStatus === "verified" && (
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.42, duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                                        className={`absolute -bottom-4 -right-4 flex items-center gap-2 bg-emerald-500 text-white pl-3 pr-4 py-2.5 rounded-2xl border-4 ${darkMode ? "border-zinc-950" : "border-slate-50"}`}
                                        style={{ boxShadow: emeraldShadow }}
                                    >
                                        <ShieldCheck size={16} />
                                        <span className="text-[10px] font-black uppercase tracking-wider">Verified</span>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>

                        {/* Identity text — staggered mount, then static */}
                        <div className="flex-1 min-w-0 text-center lg:text-left pb-2">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1, duration: 0.38 }}
                                className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-5"
                            >
                                <span
                                    className="px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.18em] bg-emerald-500 text-white"
                                    style={{ boxShadow: emeraldShadow }}
                                >
                                    {org.isNGO ? "NGO / Non-Profit" : "Corporate Organization"}
                                </span>
                                <span className={`flex items-center gap-1.5 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.18em] border ${T.pill}`}>
                                    <MapPin size={10} /> {org.city}, {org.state}
                                </span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.17, duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
                                className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.88] mb-8"
                            >
                                {org.organizationName}
                            </motion.h1>

                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.28, duration: 0.34 }}
                                className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
                            >
                                {org.officialWebsite && (
                                    <a
                                        href={org.officialWebsite.startsWith("http") ? org.officialWebsite : `https://${org.officialWebsite}`}
                                        target="_blank" rel="noopener noreferrer"
                                        className={`flex items-center gap-2.5 px-7 py-3.5 rounded-2xl border font-bold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.97] hover:border-emerald-500/50 ${darkMode ? "border-zinc-700 hover:bg-zinc-800/80" : "border-slate-200 hover:bg-slate-50"}`}
                                        style={{ willChange: "transform" }}
                                    >
                                        <Globe size={15} /> Visit Website <ExternalLink size={13} className="opacity-40" />
                                    </a>
                                )}
                            </motion.div>
                        </div>
                    </div>

                    {/* Stats strip */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14">
                        {stats.map(({ icon: Icon, label, value }, i) => (
                            <FadeUp key={i} delay={0.05 * i}>
                                <div
                                    className={`flex flex-col gap-2 p-5 rounded-2xl border cursor-default transition-colors duration-200 hover:border-emerald-500/40 ${T.statBg}`}
                                    style={{ boxShadow: cardShadow }}
                                >
                                    <div className="flex items-center gap-2">
                                        <Icon size={13} className="text-emerald-500" />
                                        <span className="text-[10px] font-black uppercase tracking-widest opacity-50">{label}</span>
                                    </div>
                                    <p className="text-lg font-black leading-none">{value}</p>
                                </div>
                            </FadeUp>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════
                MAIN CONTENT
            ══════════════════════════════════════════════════════════════ */}
            <section className="max-w-6xl mx-auto px-6 lg:px-8 pb-28">
                <div className="flex flex-col lg:flex-row gap-8 items-start">

                    {/* ── LEFT — accent line replaces TracingBeam ── */}
                    <div className="flex-1 min-w-0">
                        <div className="relative pl-px">
                            <AccentLine darkMode={darkMode} />

                            <div className="flex flex-col gap-8 ml-8 lg:ml-12">

                                {/* Identity & Vision */}
                                <FadeUp delay={0.06}>
                                    <div
                                        className={`relative rounded-[2rem] border p-8 transition-colors duration-200 hover:border-emerald-500/30 ${T.card}`}
                                        style={{ boxShadow: cardShadow }}
                                    >
                                        {/* Top inner highlight line */}
                                        <div
                                            aria-hidden
                                            className="absolute top-0 left-10 right-10 h-px rounded-full"
                                            style={{
                                                background: "linear-gradient(to right, transparent, rgba(16,185,129,0.35), transparent)",
                                            }}
                                        />

                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                                <Info size={18} />
                                            </div>
                                            <h2 className="text-xl font-bold tracking-tight">Identity &amp; Vision</h2>
                                        </div>

                                        <p className={`text-lg leading-relaxed ${T.muted}`}>
                                            {needsShowMore && !descExpanded
                                                ? truncatedDesc
                                                : (description || "No description provided. This organization is focused on its sector with a commitment to excellence and long-term impact.")}
                                        </p>

                                        {needsShowMore && (
                                            <button
                                                onClick={() => setDescExpanded(v => !v)}
                                                className="mt-4 flex items-center gap-1.5 text-sm font-bold text-emerald-500 hover:text-emerald-400 transition-colors duration-150"
                                            >
                                                {descExpanded
                                                    ? <><ChevronUp size={15} /> Show Less</>
                                                    : <><ChevronDown size={15} /> Show More</>}
                                            </button>
                                        )}

                                        {/* Registration / Audit row — always visible */}
                                        <div className={`mt-8 pt-8 border-t flex items-center justify-between ${T.divider}`}>
                                            <div>
                                                <Label>Registration</Label>
                                                <p className="font-bold">{org.isNGO ? "Registered NGO" : "Private Entity"}</p>
                                            </div>
                                            <div className="text-right">
                                                <Label>Audit Status</Label>
                                                <p className="font-bold text-emerald-500 flex items-center gap-1 justify-end">
                                                    Full <Zap size={13} fill="currentColor" />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </FadeUp>

                                {/* Focus Sectors */}
                                {org.isNGO && org.ngoDetails?.causesSupported?.length > 0 && (
                                    <FadeUp delay={0.1}>
                                        <div
                                            className={`rounded-[2rem] border p-8 transition-colors duration-200 hover:border-emerald-500/30 ${T.card}`}
                                            style={{ boxShadow: cardShadow }}
                                        >
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                                    <Zap size={18} />
                                                </div>
                                                <h2 className="text-xl font-bold tracking-tight">Focus Sectors</h2>
                                            </div>
                                            <div className="flex flex-wrap gap-2.5">
                                                {org.ngoDetails.causesSupported.map((c, i) => (
                                                    <span
                                                        key={i}
                                                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors duration-150 hover:border-emerald-500/50 ${T.tag}`}
                                                    >
                                                        {c}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </FadeUp>
                                )}

                            </div>
                        </div>
                    </div>

                    {/* ── RIGHT — sticky sidebar ── */}
                    <div className="w-full lg:w-[360px] flex-shrink-0">
                        <div className="sticky top-28 flex flex-col gap-5">

                            {/* Contact Dossier */}
                            <FadeUp delay={0.12}>
                                <SpotlightCard
                                    darkMode={darkMode}
                                    className={`rounded-[2rem] border p-8 ${darkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-slate-200"}`}
                                    style={{ boxShadow: cardShadow }}
                                >
                                    {/* Top inner highlight */}
                                    <div
                                        aria-hidden
                                        className="absolute top-0 left-10 right-10 h-px rounded-full"
                                        style={{
                                            background: "linear-gradient(to right, transparent, rgba(16,185,129,0.3), transparent)",
                                        }}
                                    />

                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-white">
                                            <User size={15} />
                                        </div>
                                        <h2 className="text-xl font-black">Contact Dossier</h2>
                                    </div>

                                    <div className="space-y-7">
                                        <div>
                                            <Label>Point of Contact</Label>
                                            <p className="text-xl font-bold leading-tight">{org.contactDetails?.contactName || "—"}</p>
                                            {org.contactDetails?.designation && (
                                                <p className={`text-sm mt-0.5 ${T.muted}`}>{org.contactDetails.designation}</p>
                                            )}
                                        </div>
                                        {org.organizationEmail && (
                                            <div>
                                                <Label>Email</Label>
                                                <a href={mailto} className="flex items-start gap-2 text-base font-bold leading-snug hover:text-emerald-500 transition-colors duration-150 break-all">
                                                    <Mail size={15} className="mt-0.5 flex-shrink-0 text-emerald-500" />
                                                    {org.organizationEmail}
                                                </a>
                                            </div>
                                        )}
                                        {org.contactDetails?.contactNumber && (
                                            <div>
                                                <Label>Phone</Label>
                                                <a href={`tel:${org.contactDetails.contactNumber}`} className="flex items-center gap-2 text-base font-bold hover:text-emerald-500 transition-colors duration-150">
                                                    <Phone size={15} className="text-emerald-500" />
                                                    {org.contactDetails.contactNumber}
                                                </a>
                                            </div>
                                        )}
                                    </div>

                                    <div className={`my-8 h-px ${darkMode ? "bg-zinc-800" : "bg-slate-100"}`} />

                                    <a
                                        href={mailto}
                                        className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white rounded-2xl font-black tracking-widest uppercase text-[11px] transition-colors duration-150 flex items-center justify-center gap-2"
                                        style={{ boxShadow: emeraldShadow }}
                                    >
                                        <Mail size={13} /> Reach Out →
                                    </a>
                                </SpotlightCard>
                            </FadeUp>

                            {/* Verified chip */}
                            {org.verificationStatus === "verified" && (
                                <FadeUp delay={0.18}>
                                    <div
                                        className={`rounded-[2rem] p-6 border flex items-center gap-5 ${darkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-slate-200"}`}
                                        style={{
                                            boxShadow: darkMode
                                                ? "0 0 0 1px rgba(16,185,129,0.08), 0 12px 28px rgba(0,0,0,0.3)"
                                                : "0 1px 3px rgba(0,0,0,0.04), 0 8px 20px rgba(16,185,129,0.07)",
                                        }}
                                    >
                                        <div
                                            className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white flex-shrink-0"
                                            style={{ boxShadow: "0 6px 18px rgba(16,185,129,0.38)" }}
                                        >
                                            <ShieldCheck size={22} />
                                        </div>
                                        <div>
                                            <p className="font-black text-base leading-tight">TPF Verified</p>
                                            <p className={`text-xs mt-1 leading-snug ${T.muted}`}>
                                                Passed all transparency audits &amp; compliance checks.
                                            </p>
                                        </div>
                                    </div>
                                </FadeUp>
                            )}

                        </div>
                    </div>
                </div>
            </section>

            <Footer darkMode={darkMode} />
        </div>
    );
}