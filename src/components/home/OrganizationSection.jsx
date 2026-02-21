import { useFetchPublicOrganizationsQuery } from '@/utils/slices/organizationApiSlice';
import { getMediaUrl } from '@/utils/media';
import Link from 'next/link';

export default function OrganizationSection({ darkMode }) {
    const { data: orgData, isLoading } = useFetchPublicOrganizationsQuery({ limit: 12 });
    const organizations = orgData?.data || [];

    const COLORS = {
        neutralHeading: darkMode ? "text-white" : "text-zinc-900",
        neutralBody: darkMode ? "text-zinc-400" : "text-zinc-600",
        cardBg: darkMode ? "bg-zinc-800/50" : "bg-white",
        cardBorder: darkMode ? "border-zinc-700 hover:border-emerald-500/50" : "border-zinc-200 hover:border-emerald-500/50",
    };

    if (isLoading || organizations.length === 0) return null;

    return (
        <section id="organizations" className={`py-20 ${darkMode ? 'bg-zinc-900' : 'bg-zinc-50'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${COLORS.neutralHeading}`}>
                        Featured <span className="text-emerald-500">Organizations</span>
                    </h2>
                    <p className={`text-lg max-w-2xl mx-auto ${COLORS.neutralBody}`}>
                        Collaborating with world-class organizations to create sustainable impact across communities.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                    {organizations.map((org) => (
                        <Link
                            href={`/organization/${org._id}`}
                            key={org._id}
                            className={`group relative p-8 rounded-2xl border ${COLORS.cardBg} ${COLORS.cardBorder} transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] overflow-hidden`}
                        >
                            {/* Decorative background element */}
                            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors duration-500"></div>

                            <div className="relative z-10 flex flex-col items-center">
                                <div className="w-24 h-24 md:w-32 md:h-32 mb-6 rounded-2xl overflow-hidden bg-white shadow-sm border border-zinc-100 p-2 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                                    {org.organizationLogo ? (
                                        <img
                                            src={getMediaUrl(org.organizationLogo)}
                                            alt={org.organizationName}
                                            className="w-full h-full object-contain"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-zinc-100 flex items-center justify-center text-zinc-400 text-2xl font-bold">
                                            {org.organizationName.charAt(0)}
                                        </div>
                                    )}
                                </div>

                                <h3 className={`text-center font-bold text-lg leading-tight mb-2 group-hover:text-emerald-500 transition-colors duration-300 ${COLORS.neutralHeading}`}>
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
                    ))}
                </div>
            </div>
        </section>
    );
}
