"use client";

import { useParams, useRouter } from "next/navigation";
import { useFetchOrganizationByIdQuery } from "@/utils/slices/organizationApiSlice";
import { useState, useMemo, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
    ArrowLeft, ShieldCheck, Building2, User, ExternalLink,
    MapPin, Calendar, Users, Info, Zap, Globe, Phone, Mail
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlobalLoader from "@/components/GlobalLoader";
import { getMediaUrl } from "@/utils/media";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { TracingBeam } from "@/components/ui/tracing-beam";

/* ─── Fade-up on scroll (react-intersection-observer) ───────────────────── */
function FadeUp({ children, delay = 0, className = "" }) {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/* ─── Section label ──────────────────────────────────────────────────────── */
function Label({ children }) {
    return (
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-emerald-500 mb-2">
            {children}
        </p>
    );
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

    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }, [darkMode]);

    const { data, isLoading, error } = useFetchOrganizationByIdQuery(id, { skip: !id });
    const org = useMemo(() => data?.data, [data]);

    // colour tokens
    const T = {
        page:      darkMode ? "bg-zinc-950 text-white"              : "bg-slate-50 text-slate-900",
        card:      darkMode ? "bg-zinc-900/90 border-zinc-800"      : "bg-white border-slate-200 shadow-sm",
        muted:     darkMode ? "text-zinc-400"                       : "text-slate-500",
        divider:   darkMode ? "border-zinc-800"                     : "border-slate-100",
        pill:      darkMode ? "border-zinc-700 text-zinc-400"       : "border-slate-200 text-slate-500",
        statBg:    darkMode ? "bg-zinc-900 border-zinc-800"         : "bg-white border-slate-200 shadow-sm",
        tag:       darkMode ? "bg-zinc-800 text-emerald-400 border-zinc-700" : "bg-emerald-50 text-emerald-700 border-emerald-100",
        innerRow:  darkMode ? "bg-zinc-800/50"                      : "bg-slate-50",
    };

    if (isLoading) return <GlobalLoader />;
    if (error || !org) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${T.page}`}>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center p-8">
                    <h1 className="text-3xl font-black mb-4">Profile Not Found</h1>
                    <p className={`mb-8 ${T.muted}`}>This organization could not be retrieved.</p>
                    <button onClick={() => router.push("/")} className="px-8 py-4 bg-emerald-500 text-white rounded-full font-bold hover:bg-emerald-600 shadow-xl shadow-emerald-500/20">
                        Return Home
                    </button>
                </motion.div>
            </div>
        );
    }

    const mailto = `mailto:${org.organizationEmail}?subject=Inquiry%20via%20TPF%20-%20${encodeURIComponent(org.organizationName)}&body=Hello%20${encodeURIComponent(org.contactDetails?.contactName || org.organizationName)}%2C%0A%0AI%20came%20across%20your%20profile%20on%20TPF%20and%20would%20like%20to%20get%20in%20touch.%0A%0A`;

    return (
        <div className={`min-h-screen transition-colors duration-500 ${T.page}`}>
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} scrolled={scrolled} />

            {/* ════════════════════════════════════════════════════════
                ZONE 1 — HERO  with BackgroundBeams
            ════════════════════════════════════════════════════════ */}
            <section className="relative pt-32 pb-20 overflow-hidden min-h-[70vh] flex flex-col justify-center">
                {/* Aceternity BackgroundBeams — only visible in dark mode for contrast */}
                {darkMode && (
                    <BackgroundBeams className="opacity-30" />
                )}

                {/* Soft colour mesh (both modes) */}
                <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
                    <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[55%] bg-emerald-600/10 blur-[130px] rounded-full" />
                    <div className="absolute top-[5%] right-[-8%] w-[35%] h-[50%] bg-indigo-600/8 blur-[110px] rounded-full" />
                </div>

                <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 w-full">
                    {/* Back */}
                    <motion.button
                        initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                        onClick={() => router.back()}
                        className="flex items-center gap-2.5 text-xs font-black uppercase tracking-widest opacity-50 hover:opacity-100 hover:gap-4 transition-all mb-14"
                    >
                        <ArrowLeft size={14} /> Back to Organizations
                    </motion.button>

                    {/* Logo + Identity row */}
                    <div className="flex flex-col lg:flex-row items-center lg:items-end gap-10 lg:gap-16">

                        {/* Logo block */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                            className="flex-shrink-0"
                        >
                            <motion.div
                                whileHover={{ rotateY: 10, rotateX: -5, scale: 1.04 }}
                                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                                style={{ transformStyle: "preserve-3d" }}
                                className={`relative p-4 rounded-[2.5rem] border shadow-2xl ${T.card}`}
                            >
                                <div className="w-36 h-36 md:w-48 md:h-48 rounded-[2rem] overflow-hidden bg-white flex items-center justify-center p-5">
                                    {org.organizationLogo
                                        ? <img src={getMediaUrl(org.organizationLogo)} alt={org.organizationName} className="w-full h-full object-contain" />
                                        : <Building2 size={56} className="text-zinc-200" />}
                                </div>

                                {/* Verification badge — anchored to logo */}
                                {org.verificationStatus === "verified" && (
                                    <motion.div
                                        initial={{ scale: 0, rotate: -20 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ type: "spring", delay: 0.55, stiffness: 320 }}
                                        className={`absolute -bottom-4 -right-4 flex items-center gap-2 bg-emerald-500 text-white pl-3 pr-4 py-2.5 rounded-2xl shadow-[0_8px_24px_rgba(16,185,129,0.4)] border-4 ${darkMode ? "border-zinc-950" : "border-slate-50"}`}
                                    >
                                        <ShieldCheck size={16} />
                                        <span className="text-[10px] font-black uppercase tracking-wider">Verified</span>
                                    </motion.div>
                                )}
                            </motion.div>
                        </motion.div>

                        {/* Identity text */}
                        <div className="flex-1 min-w-0 text-center lg:text-left pb-2">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                                className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-5"
                            >
                                <span className="px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.18em] bg-emerald-500 text-white shadow-md shadow-emerald-500/25">
                                    {org.isNGO ? "NGO / Non-Profit" : "Corporate Organization"}
                                </span>
                                <span className={`flex items-center gap-1.5 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.18em] border ${T.pill}`}>
                                    <MapPin size={10} /> {org.city}, {org.state}
                                </span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.25, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.88] mb-8"
                            >
                                {org.organizationName}
                            </motion.h1>

                            {/* Hero CTAs */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                                className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
                            >
                                <a href={mailto}
                                    className="flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm transition-all shadow-xl shadow-emerald-500/25 hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    <Mail size={15} /> Initiate Inquiry
                                </a>
                                {org.officialWebsite && (
                                    <a
                                        href={org.officialWebsite.startsWith("http") ? org.officialWebsite : `https://${org.officialWebsite}`}
                                        target="_blank" rel="noopener noreferrer"
                                        className={`flex items-center gap-2.5 px-7 py-3.5 rounded-2xl border font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] ${darkMode ? "border-zinc-700 hover:bg-zinc-800" : "border-slate-200 hover:bg-slate-50"}`}
                                    >
                                        <Globe size={15} /> Visit Website <ExternalLink size={13} className="opacity-40" />
                                    </a>
                                )}
                            </motion.div>
                        </div>
                    </div>

                    {/* Stats strip — 4 equal pills below hero */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14">
                        {[
                            { icon: MapPin,   label: "City Office",  value: org.city },
                            { icon: MapPin,   label: "State",        value: org.state },
                            { icon: Users,    label: "Personnel",    value: org.isNGO ? org.ngoDetails?.employeeStrength : org.companyDetails?.numberOfEmployees || "N/A" },
                            { icon: Calendar, label: "Years Active", value: org.companyDetails?.yearsInOperation || "N/A" },
                        ].map(({ icon: Icon, label, value }, i) => (
                            <FadeUp key={i} delay={0.08 * i}>
                                <div className={`flex flex-col gap-2 p-5 rounded-2xl border hover:border-emerald-500/40 transition-all ${T.statBg}`}>
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

            {/* ════════════════════════════════════════════════════════
                ZONE 2 — MAIN CONTENT  (TracingBeam left, sticky right)
            ════════════════════════════════════════════════════════ */}
            <section className="max-w-6xl mx-auto px-6 lg:px-8 pb-28">
                <div className="flex flex-col lg:flex-row gap-8 items-start">

                    {/* ── LEFT — TracingBeam wraps content ── */}
                    <div className="flex-1 min-w-0">
                        <TracingBeam className="px-0">
                            <div className="flex flex-col gap-8 ml-6 lg:ml-10">

                                {/* Identity & Vision */}
                                <FadeUp delay={0.1}>
                                    <div className={`rounded-[2rem] border p-8 transition-all hover:border-emerald-500/30 ${T.card}`}>
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                                <Info size={18} />
                                            </div>
                                            <h2 className="text-xl font-bold tracking-tight">Identity &amp; Vision</h2>
                                        </div>
                                        <p className={`text-lg leading-relaxed ${T.muted}`}>
                                            {org.organizationDescription || "No description provided. This organization is focused on its sector with a commitment to excellence and long-term impact."}
                                        </p>
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

                                {/* Focus Sectors (NGO only) */}
                                {org.isNGO && org.ngoDetails?.causesSupported?.length > 0 && (
                                    <FadeUp delay={0.15}>
                                        <div className={`rounded-[2rem] border p-8 transition-all hover:border-emerald-500/30 ${T.card}`}>
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                                    <Zap size={18} />
                                                </div>
                                                <h2 className="text-xl font-bold tracking-tight">Focus Sectors</h2>
                                            </div>
                                            <div className="flex flex-wrap gap-2.5">
                                                {org.ngoDetails.causesSupported.map((c, i) => (
                                                    <span key={i} className={`px-4 py-2 rounded-xl text-xs font-bold border ${T.tag}`}>
                                                        {c}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </FadeUp>
                                )}

                            </div>
                        </TracingBeam>
                    </div>

                    {/* ── RIGHT — Sticky sidebar ── */}
                    <div className="w-full lg:w-[360px] flex-shrink-0">
                        <div className="sticky top-28 flex flex-col gap-5">

                            {/* Contact Dossier — CardSpotlight */}
                            <FadeUp delay={0.2}>
                                <CardSpotlight
                                    className={`rounded-[2rem] p-8 border ${darkMode ? "bg-zinc-900 border-zinc-800" : "!bg-white border-slate-200 shadow-sm"}`}
                                    color={darkMode ? "#0d2b1f" : "#ecfdf5"}
                                    radius={300}
                                >
                                    <div className="relative z-10">
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
                                                    <a href={mailto} className="flex items-start gap-2 text-base font-bold leading-snug hover:text-emerald-500 transition-colors break-all">
                                                        <Mail size={15} className="mt-0.5 flex-shrink-0 text-emerald-500" />
                                                        {org.organizationEmail}
                                                    </a>
                                                </div>
                                            )}
                                            {org.contactDetails?.contactNumber && (
                                                <div>
                                                    <Label>Phone</Label>
                                                    <a href={`tel:${org.contactDetails.contactNumber}`} className="flex items-center gap-2 text-base font-bold hover:text-emerald-500 transition-colors">
                                                        <Phone size={15} className="text-emerald-500" />
                                                        {org.contactDetails.contactNumber}
                                                    </a>
                                                </div>
                                            )}
                                        </div>

                                        <motion.a
                                            href={mailto}
                                            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                                            className="w-full mt-10 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black tracking-widest uppercase text-[11px] shadow-2xl shadow-emerald-500/20 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <Mail size={13} /> Initiate Inquiry
                                        </motion.a>
                                    </div>
                                </CardSpotlight>
                            </FadeUp>

                            {/* Verification — CardSpotlight */}
                            {org.verificationStatus === "verified" && (
                                <FadeUp delay={0.3}>
                                    <CardSpotlight
                                        className={`rounded-[2rem] p-6 border ${darkMode ? "bg-zinc-900 border-zinc-800" : "!bg-white border-slate-200 shadow-sm"}`}
                                        color={darkMode ? "#0d2b1f" : "#ecfdf5"}
                                        radius={250}
                                    >
                                        <div className="relative z-10 flex items-center gap-5">
                                            <motion.div
                                                animate={{ scale: [1, 1.1, 1] }}
                                                transition={{ repeat: Infinity, duration: 3.5 }}
                                                className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-emerald-500/30"
                                            >
                                                <ShieldCheck size={22} />
                                            </motion.div>
                                            <div>
                                                <p className="font-black text-base leading-tight">TPF Verified</p>
                                                <p className={`text-xs mt-1 leading-snug ${T.muted}`}>Passed all transparency audits &amp; compliance checks.</p>
                                            </div>
                                        </div>
                                    </CardSpotlight>
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
