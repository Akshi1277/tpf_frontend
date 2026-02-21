"use client";

import { useParams, useRouter } from "next/navigation";
import { useFetchOrganizationByIdQuery } from "@/utils/slices/organizationApiSlice";
import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import {
    ArrowLeft, ShieldCheck, Building2, User, ExternalLink,
    Calendar, Users, Info, Award, Zap
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlobalLoader from "@/components/GlobalLoader";
import { getMediaUrl } from "@/utils/media";

export default function OrganizationDetailPage() {
    const { id } = useParams();
    const router = useRouter();

    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== "undefined") {
            try {
                const saved = localStorage.getItem("darkMode");
                return saved ? JSON.parse(saved) : false;
            } catch { return false; }
        }
        return false;
    });

    const [scrolled] = useState(true);

    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }, [darkMode]);

    const { data, isLoading, error } = useFetchOrganizationByIdQuery(id, { skip: !id });
    const organization = useMemo(() => data?.data, [data]);

    // Centralised color tokens based on JS darkMode state
    const T = {
        page: darkMode ? "bg-zinc-950 text-white" : "bg-slate-50 text-slate-900",
        card: darkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-slate-200",
        cardAccent: darkMode ? "bg-[#0d2b1f] border-emerald-900/40" : "bg-emerald-50 border-emerald-100",
        inner: darkMode ? "bg-zinc-800" : "bg-zinc-100",
        subtext: darkMode ? "text-zinc-400" : "text-slate-500",
        divider: darkMode ? "border-zinc-800" : "border-slate-100",
        pill: darkMode ? "border-zinc-700 text-zinc-400" : "border-slate-200 text-slate-500",
        label: darkMode ? "text-emerald-400/60" : "text-emerald-700/60",
        tagBg: darkMode ? "bg-zinc-800 text-emerald-400 border-zinc-700" : "bg-emerald-50 text-emerald-700 border-emerald-100",
    };

    if (isLoading) return <GlobalLoader />;

    if (error || !organization) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${T.page}`}>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center p-8">
                    <h1 className="text-3xl font-black mb-4">Profile Not Found</h1>
                    <p className={`mb-8 max-w-md ${T.subtext}`}>This organization could not be retrieved.</p>
                    <button onClick={() => router.push("/")} className="px-8 py-4 bg-emerald-500 text-white rounded-full font-bold hover:bg-emerald-600 shadow-xl shadow-emerald-500/20">
                        Return Home
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen transition-colors duration-500 ${T.page}`}>
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} scrolled={scrolled} />

            <main className="relative pt-32 pb-24 overflow-hidden">
                {/* Mesh background */}
                <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-600/20 blur-[120px] rounded-full animate-pulse" />
                    <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[50%] bg-blue-600/10 blur-[100px] rounded-full" />
                    <div className="absolute top-[20%] right-[15%] w-[20%] h-[20%] bg-purple-600/10 blur-[80px] rounded-full animate-pulse" />
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8">

                    {/* --- CINEMATIC HEADER --- */}
                    <div className="flex flex-col gap-12 mb-16">
                        <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            onClick={() => router.back()}
                            className="w-fit flex items-center gap-3 text-sm font-bold tracking-widest uppercase opacity-60 hover:opacity-100 transition-all hover:gap-4"
                        >
                            <ArrowLeft size={16} />
                            Back to Organizations
                        </motion.button>

                        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10">
                            <div className="flex flex-col md:flex-row items-center gap-10">
                                {/* Logo */}
                                <motion.div
                                    whileHover={{ rotateY: 12, rotateX: -5, scale: 1.04 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className={`relative p-3 rounded-[2.5rem] border shadow-2xl ${T.card}`}
                                    style={{ transformStyle: "preserve-3d" }}
                                >
                                    <div className="w-32 h-32 md:w-48 md:h-48 rounded-[2rem] overflow-hidden bg-white flex items-center justify-center p-6 shadow-inner">
                                        {organization.organizationLogo ? (
                                            <img src={getMediaUrl(organization.organizationLogo)} alt={organization.organizationName} className="w-full h-full object-contain" />
                                        ) : (
                                            <Building2 size={64} className="text-zinc-200" />
                                        )}
                                    </div>
                                    {organization.verificationStatus === "verified" && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", delay: 0.5 }}
                                            className={`absolute -bottom-4 -right-4 bg-emerald-500 text-white p-3 rounded-2xl shadow-[0_10px_30px_rgba(16,185,129,0.5)] border-4 ${darkMode ? 'border-zinc-950' : 'border-slate-50'}`}
                                        >
                                            <ShieldCheck size={28} />
                                        </motion.div>
                                    )}
                                </motion.div>

                                {/* Identity text */}
                                <div className="text-center md:text-left">
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6">
                                        <span className="px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">
                                            {organization.isNGO ? "NGO / Non-Profit" : "Corporate Organization"}
                                        </span>
                                        <span className={`px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border ${T.pill}`}>
                                            {organization.city}, {organization.state}
                                        </span>
                                    </motion.div>
                                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
                                        {organization.organizationName.split(" ").map((word, i) => (
                                            <span key={i} className="inline-block mr-4">{word}</span>
                                        ))}
                                    </motion.h1>
                                </div>
                            </div>

                            {/* Website CTA */}
                            {organization.officialWebsite && (
                                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
                                    <a
                                        href={organization.officialWebsite.startsWith("http") ? organization.officialWebsite : `https://${organization.officialWebsite}`}
                                        target="_blank" rel="noopener noreferrer"
                                        className={`flex items-center justify-center gap-3 px-8 py-4 rounded-2xl border font-bold transition-all ${darkMode ? 'hover:bg-white hover:text-black border-white/20' : 'hover:bg-black hover:text-white border-black/10'}`}
                                    >
                                        Visit Site <ExternalLink size={18} />
                                    </a>
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* --- BENTO GRID --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">

                        {/* 1. Identity & Vision — large */}
                        <motion.div
                            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className={`lg:col-span-8 lg:row-span-2 p-8 rounded-[2.5rem] border shadow-sm transition-all hover:shadow-xl ${T.card}`}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-500"><Info size={20} /></div>
                                <h3 className="text-xl font-bold">Identity &amp; Vision</h3>
                            </div>
                            <p className={`text-xl md:text-2xl leading-relaxed font-medium ${T.subtext}`}>
                                {organization.organizationDescription || "No detailed dossier available for this entity. Their mission remains focused on delivering quality and excellence within their sector."}
                            </p>
                            <div className={`mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t ${T.divider}`}>
                                {[
                                    { label: "City Office", value: organization.city },
                                    { label: "Regional State", value: organization.state },
                                    { label: "Registration", value: organization.isNGO ? "Registered NGO" : "Private Entity" },
                                    { label: "Audited Status", value: <span className="text-emerald-500 flex items-center gap-1">Full <Zap size={14} fill="currentColor" /></span> },
                                ].map(({ label, value }, i) => (
                                    <div key={i} className="space-y-1">
                                        <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">{label}</p>
                                        <p className="font-bold text-lg">{value}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* 2. Contact Dossier */}
                        <motion.div
                            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className={`lg:col-span-4 p-8 rounded-[2.5rem] border shadow-sm transition-all hover:shadow-xl ${T.cardAccent}`}
                        >
                            <h3 className="text-xl font-black mb-8 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white"><User size={16} /></div>
                                Contact Dossier
                            </h3>
                            <div className="space-y-8">
                                <div>
                                    <p className={`text-[10px] uppercase tracking-widest font-black mb-1 ${T.label}`}>Point of Command</p>
                                    <p className="text-xl font-bold">{organization.contactDetails?.contactName}</p>
                                    <p className={`text-sm font-medium ${T.subtext}`}>{organization.contactDetails?.designation}</p>
                                </div>
                                <div>
                                    <p className={`text-[10px] uppercase tracking-widest font-black mb-1 ${T.label}`}>Secure Email</p>
                                    <a
                                        href={`mailto:${organization.organizationEmail}?subject=Inquiry%20via%20TPF&body=Hello%20${encodeURIComponent(organization.contactDetails?.contactName || organization.organizationName)}%2C%0A%0A`}
                                        className="text-lg font-bold break-all hover:text-emerald-500 transition-colors cursor-pointer"
                                    >
                                        {organization.organizationEmail}
                                    </a>
                                </div>
                                <div>
                                    <p className={`text-[10px] uppercase tracking-widest font-black mb-1 ${T.label}`}>Active Comms</p>
                                    <p className="text-lg font-bold">{organization.contactDetails?.contactNumber}</p>
                                </div>
                            </div>
                            <motion.a
                                href={`mailto:${organization.organizationEmail}?subject=Inquiry%20via%20TPF%20-%20${encodeURIComponent(organization.organizationName)}&body=Hello%20${encodeURIComponent(organization.contactDetails?.contactName || organization.organizationName)}%2C%0A%0AI%20came%20across%20your%20profile%20on%20TPF%20and%20would%20like%20to%20get%20in%20touch.%0A%0A`}
                                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                className="w-full mt-12 py-5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-[1.5rem] font-black tracking-widest uppercase text-xs shadow-2xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
                            >
                                Initiate Inquiry
                            </motion.a>
                        </motion.div>

                        {/* 3. Global Operations */}
                        <motion.div
                            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className={`lg:col-span-4 p-8 rounded-[2.5rem] border shadow-sm transition-all hover:shadow-xl ${T.card}`}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-500"><Award size={20} /></div>
                                <h3 className="text-xl font-bold">Global Operations</h3>
                            </div>
                            <div className="flex flex-col gap-4">
                                {[
                                    { icon: Users, label: "Personnel", value: organization.isNGO ? organization.ngoDetails?.employeeStrength : organization.companyDetails?.numberOfEmployees || "N/A" },
                                    { icon: Calendar, label: "Established", value: organization.companyDetails?.yearsInOperation || "N/A" },
                                ].map(({ icon: Icon, label, value }, i) => (
                                    <div key={i} className={`flex items-center justify-between p-4 rounded-2xl border border-transparent hover:border-emerald-500/20 transition-all ${T.inner}`}>
                                        <div className="flex items-center gap-3">
                                            <Icon size={18} className="text-emerald-500" />
                                            <span className="text-sm font-bold opacity-60 uppercase tracking-tighter">{label}</span>
                                        </div>
                                        <span className="font-black text-lg">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* 4. Focus Sectors (NGO only) */}
                        {organization.isNGO && (
                            <motion.div
                                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className={`lg:col-span-4 p-8 rounded-[2.5rem] border shadow-sm transition-all hover:shadow-xl ${T.card}`}
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-500"><Zap size={20} /></div>
                                    <h3 className="text-xl font-bold">Focus Sectors</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {organization.ngoDetails?.causesSupported?.map((cause, i) => (
                                        <span key={i} className={`px-4 py-2 rounded-xl text-xs font-bold border ${T.tagBg}`}>{cause}</span>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* 5. Verified Protocol */}
                        <motion.div
                            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className={`lg:col-span-4 p-8 rounded-[2.5rem] border shadow-sm transition-all hover:shadow-xl flex flex-col items-center justify-center text-center group ${T.card}`}
                        >
                            <motion.div
                                animate={{ scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 3.5 }}
                                className="w-16 h-16 rounded-3xl bg-emerald-500 flex items-center justify-center text-white mb-6 shadow-2xl shadow-emerald-500/40"
                            >
                                <ShieldCheck size={32} />
                            </motion.div>
                            <h4 className="text-xl font-black mb-2 uppercase tracking-tight">Verified Protocol</h4>
                            <p className={`text-sm font-medium max-w-[200px] ${T.subtext}`}>
                                This entity has passed all TPF transparency audits and compliance checks.
                            </p>
                        </motion.div>

                    </div>
                </div>
            </main>

            <Footer darkMode={darkMode} />
        </div>
    );
}
