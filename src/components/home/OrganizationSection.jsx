import { useRef } from 'react';
import { useFetchPublicOrganizationsQuery } from '@/utils/slices/organizationApiSlice';
import { getMediaUrl } from '@/utils/media';
import Link from 'next/link';

export default function OrganizationSection({ darkMode }) {
    const { data: orgData, isLoading } = useFetchPublicOrganizationsQuery({ limit: 12 });
    const organizations = orgData?.data || [];
    const scrollRef = useRef(null);

    if (isLoading || organizations.length === 0) return null;

    const useScrollLayout = organizations.length > 5;

    const COLORS = {
        neutralHeading: darkMode ? 'text-white' : 'text-zinc-900',
        neutralBody: darkMode ? 'text-zinc-400' : 'text-zinc-600',
        sectionBg: darkMode ? 'bg-zinc-900' : 'bg-zinc-50',
        btnBg: darkMode
            ? 'bg-zinc-800 hover:bg-emerald-500 border-zinc-700 text-white hover:text-white'
            : 'bg-white hover:bg-emerald-500 border-zinc-200 text-zinc-700 hover:text-white',
    };

    const scroll = (dir) => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollBy({ left: dir * 300, behavior: 'smooth' });
    };

    const cardStyle = {
        background: darkMode
            ? 'linear-gradient(145deg, #1f2937 0%, #18202e 60%, #0f1a14 100%)'
            : 'linear-gradient(145deg, #ffffff 0%, #f0fdf4 60%, #ecfdf5 100%)',
        border: darkMode
            ? '1px solid rgba(52, 211, 153, 0.15)'
            : '1px solid rgba(16, 185, 129, 0.2)',
        boxShadow: darkMode
            ? '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)'
            : '0 4px 24px rgba(16, 185, 129, 0.08), 0 1px 4px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)',
    };

    const cardHoverEnter = (e) => {
        e.currentTarget.style.boxShadow = darkMode
            ? '0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(52,211,153,0.3), inset 0 1px 0 rgba(255,255,255,0.05)'
            : '0 20px 40px rgba(16, 185, 129, 0.15), 0 0 0 1px rgba(16,185,129,0.35), inset 0 1px 0 rgba(255,255,255,0.9)';
        e.currentTarget.style.borderColor = darkMode ? 'rgba(52,211,153,0.4)' : 'rgba(16,185,129,0.45)';
        e.currentTarget.style.transform = 'translateY(-8px)';
    };

    const cardHoverLeave = (e) => {
        e.currentTarget.style.boxShadow = cardStyle.boxShadow;
        e.currentTarget.style.borderColor = darkMode ? 'rgba(52,211,153,0.15)' : 'rgba(16,185,129,0.2)';
        e.currentTarget.style.transform = 'translateY(0)';
    };

    const OrgCard = ({ org, width = 'w-52 sm:w-60' }) => (
        <Link
            href={`/organization/${org._id}`}
            className={`group relative flex-shrink-0 ${width} p-8 rounded-2xl overflow-hidden`}
            style={{ ...cardStyle, transition: 'all 0.4s ease' }}
            onMouseEnter={cardHoverEnter}
            onMouseLeave={cardHoverLeave}
        >
            {/* Top shine streak */}
            <div
                className="absolute top-0 left-0 w-full h-px"
                style={{
                    background: darkMode
                        ? 'linear-gradient(90deg, transparent, rgba(52,211,153,0.3), transparent)'
                        : 'linear-gradient(90deg, transparent, rgba(16,185,129,0.4), transparent)',
                }}
            />

            {/* Bottom-right glow blob */}
            <div
                className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full group-hover:scale-150 transition-transform duration-500"
                style={{
                    background: darkMode
                        ? 'radial-gradient(circle, rgba(52,211,153,0.12) 0%, transparent 70%)'
                        : 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)',
                    filter: 'blur(12px)',
                }}
            />

            {/* Accent dot */}
            <div
                className="absolute top-4 right-4 w-2 h-2 rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-300"
                style={{ background: 'rgb(16,185,129)' }}
            />

            <div className="relative z-10 flex flex-col items-center">
                <div
                    className="w-24 h-24 md:w-32 md:h-32 mb-6 rounded-2xl overflow-hidden p-2 flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                    style={{
                        background: darkMode ? 'linear-gradient(145deg,#374151,#1f2937)' : 'linear-gradient(145deg,#ffffff,#f9fafb)',
                        border: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.07)',
                        boxShadow: darkMode ? '0 2px 12px rgba(0,0,0,0.4)' : '0 2px 12px rgba(0,0,0,0.08)',
                    }}
                >
                    {org.organizationLogo ? (
                        <img
                            src={getMediaUrl(org.organizationLogo)}
                            alt={org.organizationName}
                            className="w-full h-full object-contain"
                            loading="lazy"
                        />
                    ) : (
                        <div
                            className="w-full h-full flex items-center justify-center text-2xl font-bold rounded-xl"
                            style={{ background: 'linear-gradient(135deg,#10b981,#059669)', color: 'white' }}
                        >
                            {org.organizationName.charAt(0)}
                        </div>
                    )}
                </div>

                <h3 className={`text-center font-bold text-lg leading-tight mb-2 transition-colors duration-300 group-hover:text-emerald-500 ${COLORS.neutralHeading}`}>
                    {org.organizationName}
                </h3>

                <p className={`text-xs uppercase tracking-widest font-semibold ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                    {org.isNGO ? 'NGO / Non-Profit' : 'Organization'}
                </p>

                <div className="mt-4 flex items-center text-emerald-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    View Profile
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>
        </Link>
    );

    return (
        <section id="organizations" className={`py-20 ${COLORS.sectionBg}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${COLORS.neutralHeading}`}>
                        Featured <span className="text-emerald-500">Organizations</span>
                    </h2>
                    <p className={`text-lg max-w-2xl mx-auto ${COLORS.neutralBody}`}>
                        Collaborating with world-class organizations to create sustainable impact across communities.
                    </p>
                </div>

                {/* ── MOBILE: always horizontal scroll, completely isolated ── */}
                <div
                    className="md:hidden flex gap-4 overflow-x-auto pb-3 -mx-4 px-4"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
                >
                    {organizations.map((org) => (
                        <OrgCard key={org._id} org={org} width="w-48" />
                    ))}
                </div>

                {/* ── DESKTOP ≤5: centered flex wrap ── */}
                {!useScrollLayout && (
                    <div className="hidden md:flex flex-wrap justify-center gap-6">
                        {organizations.map((org) => (
                            <OrgCard key={org._id} org={org} width="w-60" />
                        ))}
                    </div>
                )}

                {/* ── DESKTOP >5: horizontal scroll with arrow buttons ── */}
                {useScrollLayout && (
                    <div className="hidden md:block relative">
                        <button
                            onClick={() => scroll(-1)}
                            aria-label="Scroll left"
                            className={`absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full border shadow-md transition-all duration-300 ${COLORS.btnBg}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>

                        <div
                            ref={scrollRef}
                            className="flex gap-6 overflow-x-auto pb-4"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {organizations.map((org) => (
                                <OrgCard key={org._id} org={org} width="w-60" />
                            ))}
                        </div>

                        <button
                            onClick={() => scroll(1)}
                            aria-label="Scroll right"
                            className={`absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full border shadow-md transition-all duration-300 ${COLORS.btnBg}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}