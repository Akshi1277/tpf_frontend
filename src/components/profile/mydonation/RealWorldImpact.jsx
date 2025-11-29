"use client";

import { motion } from "framer-motion";
import {
  Stethoscope,
  HeartPulse,
  Droplet,
  GraduationCap,
  Heart,
  Users,
  Quote
} from "lucide-react";

export default function RealWorldImpact({ darkMode, transactions = [] }) {
  const hasDonations = transactions && transactions.length > 0;

  const baseCounts = {
    medical: 0,
    education: 0,
    orphans: 0,
    emergency: 0,
    water: 0,
    zakat: 0,
    food: 0,
    other: 0,
  };

  if (hasDonations) {
    transactions.forEach((txn) => {
      const raw = (txn.category || txn.cause || "").toString().trim().toLowerCase();
      let key = "other";

      if (raw.includes("medical") || raw.includes("health")) key = "medical";
      else if (raw.includes("educat")) key = "education";
      else if (raw.includes("orphan")) key = "orphans";
      else if (raw.includes("emerg")) key = "emergency";
      else if (raw.includes("water")) key = "water";
      else if (raw.includes("zakat")) key = "zakat";
      else if (raw.includes("food") || raw.includes("ration")) key = "food";

      baseCounts[key] = (baseCounts[key] || 0) + 1;
    });
  }

  const realWorldImpact = [
    {
      icon: Stethoscope,
      title: "Medical Aid",
      value: baseCounts.medical,
      description: hasDonations
        ? "People received medical assistance"
        : "Your donations can bring relief to patients",
      color: "blue",
    },
    {
      icon: HeartPulse,
      title: "Emergency Aid",
      value: baseCounts.emergency,
      description: hasDonations
        ? "Emergency cases supported"
        : "Be the first to respond in an emergency",
      color: "red",
    },
    {
      icon: Droplet,
      title: "Clean Water Supply",
      value: baseCounts.water,
      description: hasDonations
        ? "Families got access to clean water"
        : "Help families get clean and safe water",
      color: "cyan",
    },
    {
      icon: GraduationCap,
      title: "Education",
      value: baseCounts.education,
      description: hasDonations
        ? "Students supported in education"
        : "Sponsor education and change a future",
      color: "purple",
    },
    {
      icon: Heart,
      title: "Orphans",
      value: baseCounts.orphans,
      description: hasDonations
        ? "Orphans supported with care"
        : "Be a source of care for an orphan",
      color: "pink",
    },
    {
      icon: Users,
      title: "Other Helps",
      value: baseCounts.other + baseCounts.zakat + baseCounts.food,
      description: hasDonations
        ? "Various acts of kindness"
        : "Your kindness will create many such stories",
      color: "emerald",
    },
  ];

  const formatImpactValue = (v) => (v > 0 ? `${v}+` : "—");
  return (
    <>
      {/* Real World Impact Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
        className="mb-8"
      >
        <div className="text-center mb-6">
          <h2 className={`text-3xl md:text-4xl font-bold mb-2 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}>
            Your Real-World Impact
          </h2>
          <p className={`text-lg ${
            darkMode ? "text-zinc-400" : "text-gray-600"
          }`}>
            {hasDonations
              ? "See the lives you've touched through your generosity"
              : "Your first donation will start writing this story"}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {realWorldImpact.map((impact, index) => {
            const Icon = impact.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.1 + index * 0.1 }}
                className={`p-6 rounded-2xl border relative overflow-hidden group hover:scale-105 transition-transform ${
                  darkMode 
                    ? "bg-zinc-800/50 border-zinc-700" 
                    : "bg-white border-gray-200 shadow-lg"
                }`}
              >
                {/* Background pattern */}
                <div className={`absolute inset-0 opacity-5 ${
                  impact.color === "blue" ? "bg-blue-500" :
                  impact.color === "red" ? "bg-red-500" :
                  impact.color === "cyan" ? "bg-cyan-500" :
                  impact.color === "purple" ? "bg-purple-500" :
                  impact.color === "pink" ? "bg-pink-500" :
                  "bg-emerald-500"
                }`} />
                
                <div className="relative">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                    impact.color === "blue" 
                      ? darkMode ? "bg-blue-500/20" : "bg-blue-100"
                      : impact.color === "red"
                      ? darkMode ? "bg-red-500/20" : "bg-red-100"
                      : impact.color === "cyan"
                      ? darkMode ? "bg-cyan-500/20" : "bg-cyan-100"
                      : impact.color === "purple"
                      ? darkMode ? "bg-purple-500/20" : "bg-purple-100"
                      : impact.color === "pink"
                      ? darkMode ? "bg-pink-500/20" : "bg-pink-100"
                      : darkMode ? "bg-emerald-500/20" : "bg-emerald-100"
                  }`}>
                    <Icon className={`w-7 h-7 ${
                      impact.color === "blue" ? "text-blue-600" :
                      impact.color === "red" ? "text-red-600" :
                      impact.color === "cyan" ? "text-cyan-600" :
                      impact.color === "purple" ? "text-purple-600" :
                      impact.color === "pink" ? "text-pink-600" :
                      "text-emerald-600"
                    }`} />
                  </div>
                  
                  <h3 className={`font-semibold mb-2 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}>
                    {impact.title}
                  </h3>
                  
                  <p className={`text-3xl font-bold mb-2 ${
                    impact.color === "blue" 
                      ? darkMode ? "text-blue-400" : "text-blue-600"
                      : impact.color === "red"
                      ? darkMode ? "text-red-400" : "text-red-600"
                      : impact.color === "cyan"
                      ? darkMode ? "text-cyan-400" : "text-cyan-600"
                      : impact.color === "purple"
                      ? darkMode ? "text-purple-400" : "text-purple-600"
                      : impact.color === "pink"
                      ? darkMode ? "text-pink-400" : "text-pink-600"
                      : darkMode ? "text-emerald-400" : "text-emerald-600"
                  }`}>
                    {formatImpactValue(impact.value)}
                  </p>
                  
                  <p className={`text-sm ${
                    darkMode ? "text-zinc-400" : "text-gray-600"
                  }`}>
                    {impact.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Inspirational Quote Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        className={`mb-8 rounded-3xl overflow-hidden relative ${
          darkMode 
            ? "bg-gradient-to-br from-amber-900/30 to-orange-900/30 border border-amber-700/30" 
            : "bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 shadow-lg"
        }`}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full -ml-32 -mt-32 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full -mr-24 -mb-24 blur-3xl" />
        
        <div className="relative p-8 md:p-12 text-center">
          <motion.div
            animate={{ rotate: [0, 5, 0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block mb-6"
          >
            <Quote className={`w-12 h-12 md:w-16 md:h-16 ${
              darkMode ? "text-amber-400" : "text-amber-600"
            }`} />
          </motion.div>
          
          <blockquote className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-4 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}>
            "Charity does not decrease wealth"
          </blockquote>
          
          <p className={`text-lg md:text-xl mb-2 ${
            darkMode ? "text-amber-200" : "text-amber-800"
          }`}>
            — Prophet Muhammad (ﷺ)
          </p>
          
          <p className={`text-base md:text-lg max-w-3xl mx-auto ${
            darkMode ? "text-zinc-300" : "text-gray-700"
          }`}>
            Every act of generosity creates a ripple of goodness. Your contributions are not just helping others, they're enriching your own soul and building a better world for everyone.
          </p>
        </div>
      </motion.div>
    </>
  )
}