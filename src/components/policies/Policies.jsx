"use client";

import { useState } from "react";
import { Shield, FileText, CreditCard, Scale, ArrowLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsOfUse from "./TermsOfUse";
import Pricing from "./Pricing";
import Governance from "./Governance";

export default function Policies() {
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const router = useRouter();

  const policies = [
    {
      id: "privacy",
      title: "Privacy Policy",
      icon: Shield,
      description: "Your trust is sacred. Learn how we protect and handle your personal information.",
      gradient: "from-emerald-500 to-emerald-600",
      bgGradient: "from-emerald-50 to-emerald-100/50"
    },
    {
      id: "terms",
      title: "Terms of Use",
      icon: FileText,
      description: "Clear guidelines for using TPF Aid's platform with ethical engagement.",
      gradient: "from-teal-500 to-teal-600",
      bgGradient: "from-teal-50 to-teal-100/50"
    },
    {
      id: "pricing",
      title: "Pricing & Refunds",
      icon: CreditCard,
      description: "Complete transparency on donations, platform fees, and refund policy.",
      gradient: "from-emerald-600 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-100/50"
    },
    {
      id: "governance",
      title: "Anti-Discriminatory & Governance",
      icon: Scale,
      description: "Our commitment to equality and nation-first humanitarian service.",
      gradient: "from-teal-600 to-emerald-500",
      bgGradient: "from-teal-50 to-emerald-100/50"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  if (selectedPolicy) {
    return (
      <div className="min-h-screen bg-white">
        {selectedPolicy === "privacy" && <PrivacyPolicy onBack={() => { setSelectedPolicy(null); window.scrollTo(0, 0); }} />}
        {selectedPolicy === "terms" && <TermsOfUse onBack={() => { setSelectedPolicy(null); window.scrollTo(0, 0); }} />}
        {selectedPolicy === "pricing" && <Pricing onBack={() => { setSelectedPolicy(null); window.scrollTo(0, 0); }} />}
        {selectedPolicy === "governance" && <Governance onBack={() => { setSelectedPolicy(null); window.scrollTo(0, 0); }} />}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed top-4 sm:top-6 left-4 sm:left-6 z-50"
      >
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 bg-white/95 backdrop-blur-sm text-zinc-700 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full shadow-lg hover:shadow-xl transition-shadow border border-zinc-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-medium text-sm sm:text-base">Back</span>
        </button>
      </motion.div>

      {/* Hero Section */}
      <section className="pt-36 sm:pt-40 md:pt-44 pb-12 sm:pb-16 md:pb-20 bg-white relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #14b8a6 1px, transparent 1px),
                             radial-gradient(circle at 75% 75%, #14b8a6 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto mb-8 sm:mb-10 md:mb-12"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              <span className="text-zinc-900 block mb-1 sm:mb-2">
                Transparency & Trust in
              </span>
              <span className="bg-gradient-to-r from-teal-500 via-emerald-600 to-emerald-400 text-transparent bg-clip-text">
                Every Policy We Create
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-zinc-600 px-4 sm:px-0 max-w-3xl mx-auto">
              Comprehensive policies that govern our operations and protect your interests
            </p>
          </motion.div>

          {/* Policy Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 max-w-5xl mx-auto"
          >
            {policies.map((policy) => {
              const Icon = policy.icon;
              return (
                <motion.div
                  key={policy.id}
                  variants={itemVariants}
                  onClick={() => {
                    setSelectedPolicy(policy.id);
                    window.scrollTo(0, 0);
                  }}
                  className="group cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-zinc-200"
                >
                  <div className={`bg-gradient-to-br ${policy.bgGradient} p-5 sm:p-6 border-b border-zinc-200`}>
                    <div className={`bg-gradient-to-r ${policy.gradient} w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg`}>
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-zinc-800 mb-2">{policy.title}</h2>
                    <p className="text-sm text-zinc-600 leading-relaxed">
                      {policy.description}
                    </p>
                  </div>
                  
                  <div className="px-5 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between bg-zinc-50/50">
                    <span className={`text-xs sm:text-sm font-semibold bg-gradient-to-r ${policy.gradient} bg-clip-text text-transparent`}>
                      Read Policy
                    </span>
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 sm:mt-12 md:mt-16 bg-gradient-to-br from-white to-zinc-50 rounded-2xl p-6 sm:p-8 border border-zinc-200 shadow-md max-w-5xl mx-auto"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 sm:gap-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-800 mb-2">
                  Questions About Our Policies?
                </h3>
                <p className="text-sm sm:text-base text-zinc-600">
                  We're here to help. Your trust is our responsibility.
                </p>
              </div>
              <button
                onClick={() => router.push('/contactus')}
                className="bg-gradient-to-r from-teal-500 via-emerald-600 to-emerald-500 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-semibold hover:shadow-xl transition-all shadow-lg whitespace-nowrap text-sm sm:text-base w-full md:w-auto"
              >
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}