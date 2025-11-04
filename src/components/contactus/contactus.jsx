    "use client"
    import { motion, useInView } from 'framer-motion';
    import { useState, useRef } from 'react';

    export default function ContactPage({ darkMode }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [activeCard, setActiveCard] = useState(null);

    const contactMethods = [
        {
        id: 'phone',
        title: 'Phone Support',
        primary: '+91 9411565185',
        secondary: '10 AM – 6 PM IST (Mon–Sat)',
        action: 'tel:+919411565185',
        iconSvg: (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
        )
        },
        {
        id: 'whatsapp',
        title: 'WhatsApp',
        primary: '+91 9411565185',
        secondary: 'Quick replies within hours',
        action: 'https://wa.me/919411565185',
        iconSvg: (
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
        )
        },
        {
        id: 'email',
        title: 'Email',
        primary: 'info@truepathfoundation.org',
        secondary: 'Response in 24–48 hours',
        action: 'mailto:info@truepathfoundation.org',
        iconSvg: (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
        )
        }
    ];

    const emailCategories = [
        {
        category: 'General Inquiries',
        email: 'info@truepathfoundation.org',
        description: 'General questions and information'
        },
        {
        category: 'Donations & Support',
        email: 'donations@truepathfoundation.org',
        description: 'Donation queries and receipts'
        },
        {
        category: 'Fundraiser Assistance',
        email: 'fundraiser@truepathfoundation.org',
        description: 'Apply for aid or support'
        },
        {
        category: 'Volunteer with Us',
        email: 'volunteer@truepathfoundation.org',
        description: 'Join our volunteer network'
        },
        {
        category: 'Help & Feedback',
        email: 'help@truepathfoundation.org',
        description: 'Concerns and suggestions'
        },
        {
        category: 'Legal & Compliance',
        email: 'legal@truepathfoundation.org',
        description: 'Legal matters and compliance'
        }
    ];

    return (
        <section
        ref={ref}
        className={`py-36 sm:py-20 md:py-30  ${
            darkMode ? 'bg-zinc-900' : 'bg-gray-50'
        } relative`}
        >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 sm:mb-12"
            >
                <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-1 w-12 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"></div>
                <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                <div className="h-1 w-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
            </div>
            <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                <span className="bg-gradient-to-r from-teal-500 via-emerald-500 to-orange-500 text-transparent bg-clip-text">
                Contact Us
                </span>
            </h1>
            
            <p className={`text-base sm:text-lg max-w-2xl mx-auto mb-6 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                We're just a call, message, or email away
            </p>

            {/* Quote */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`inline-block p-4 sm:p-5 rounded-lg border ${
                darkMode 
                    ? 'bg-zinc-800/50 border-zinc-700/50' 
                    : 'bg-white border-zinc-200'
                }`}
            >
                <p className={`text-sm sm:text-base italic ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                "And lower your wing in humility to the believers." — Surah Al-Hijr (15:88)
                </p>
            </motion.div>
            </motion.div>

            {/* Primary Contact Methods */}
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-12 sm:mb-16"
            >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {contactMethods.map((method, index) => (
                <motion.a
                    key={method.id}
                    href={method.action}
                    target={method.id === 'whatsapp' ? '_blank' : undefined}
                    rel={method.id === 'whatsapp' ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    onMouseEnter={() => setActiveCard(method.id)}
                    onMouseLeave={() => setActiveCard(null)}
                    className={`p-6 rounded-xl ${
                    darkMode ? 'bg-zinc-800/50' : 'bg-white'
                    } border ${
                    activeCard === method.id
                        ? 'border-teal-500 shadow-lg shadow-teal-500/20'
                        : darkMode
                        ? 'border-zinc-700/50 hover:border-zinc-600'
                        : 'border-zinc-200 hover:border-zinc-300'
                    } transition-all duration-300 group cursor-pointer`}
                >
                    <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-teal-500 via-emerald-500 to-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        {method.iconSvg}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <h3 className={`text-lg font-semibold mb-1 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                        {method.title}
                        </h3>
                        <p className={`text-base font-medium mb-1 break-all ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}>
                        {method.primary}
                        </p>
                        <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        {method.secondary}
                        </p>
                    </div>
                    </div>
                </motion.a>
                ))}
            </div>
            </motion.div>

            {/* Email Categories */}
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mb-12 sm:mb-16"
            >
            <h2 className={`text-2xl sm:text-3xl font-bold mb-2 text-center ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                <span className="bg-teal-500 text-transparent bg-clip-text">
                Department Emails
                </span>
            </h2>
            <p className={`text-center text-sm sm:text-base mb-8 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                We respond within 24–48 working hours
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {emailCategories.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.8 + index * 0.05 }}
                    className={`p-5 rounded-lg ${
                    darkMode 
                        ? 'bg-zinc-800/50 border border-zinc-700/50 hover:border-zinc-600' 
                        : 'bg-white border border-zinc-200 hover:border-zinc-300'
                    } hover:shadow-md transition-all duration-300`}
                >
                    <h3 className={`text-base font-semibold mb-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                    {item.category}
                    </h3>
                    <p className={`text-xs mb-3 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    {item.description}
                    </p>
                    <a
                    href={`mailto:${item.email}`}
                    className={`text-sm font-medium break-all ${darkMode ? 'text-teal-400 hover:text-teal-300' : 'text-teal-600 hover:text-teal-700'} transition-colors`}
                    >
                    {item.email}
                    </a>
                </motion.div>
                ))}
            </div>
            </motion.div>

            {/* Address & Legal Section */}
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8"
            >
            {/* Address */}
            <div className={`p-6 sm:p-8 rounded-xl ${
                darkMode 
                ? 'bg-zinc-800/50 border border-zinc-700/50' 
                : 'bg-white border border-zinc-200'
            }`}>
                <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                </div>
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                    Our Address
                </h2>
                </div>
                
                <div className={`space-y-1 text-sm sm:text-base ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                <p className="font-semibold">True Path Foundation (TPF Aid)</p>
                <p>229A, DDA LIG Flats, Pocket -12</p>
                <p>Jasola, New Delhi – 110025, India</p>
                </div>
            </div>

            {/* Legal */}
            <div className={`p-6 sm:p-8 rounded-xl ${
                darkMode 
                ? 'bg-zinc-800/50 border border-zinc-700/50' 
                : 'bg-white border border-zinc-200'
            }`}>
                <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-500  flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                    </svg>
                </div>
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                    Legal Matters
                </h2>
                </div>
                
                <p className={`text-sm sm:text-base mb-3 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                For compliance and legal queries:
                </p>
                <a 
                href="mailto:legal@truepathfoundation.org"
                className={`text-sm sm:text-base font-semibold break-all ${darkMode ? 'text-teal-400 hover:text-teal-300' : 'text-teal-600 hover:text-teal-700'} transition-colors`}
                >
                legal@truepathfoundation.org
                </a>
                
                <div className={`mt-4 pt-4 border-t text-xs sm:text-sm ${
                darkMode ? 'border-zinc-700 text-zinc-400' : 'border-zinc-200 text-zinc-600'
                }`}>
                <p className="font-medium text-orange-500 mb-1">⚠️ Important Notice</p>
                <p>No foreign donations or FCRA-based communication accepted as per compliance policy.</p>
                </div>
            </div>
            </motion.div>
        </div>
        </section>
    );
    }   