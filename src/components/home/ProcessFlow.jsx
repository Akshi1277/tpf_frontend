import { motion } from 'framer-motion';
import { FileText, ShieldCheck, Users, Heart, CheckCircle, Lock, TrendingUp, HandHeart } from 'lucide-react';

export default function ProcessFlowSection({ darkMode }) {
  const beneficiarySteps = [
    {
      icon: FileText,
      title: 'Share Your Need with Sincerity',
      description: 'Tell your story with honesty and hope. Every case is treated with compassion and confidentiality.'
    },
    {
      icon: ShieldCheck,
      title: 'Reviewed with Amanah',
      description: 'Our team carefully verifies each request to uphold trust, fairness, and transparency.'
    },
    {
      icon: Users,
      title: 'Supported by the Community',
      description: 'Your campaign is shared with a community united by compassion and responsibility.'
    },
    {
      icon: Heart,
      title: 'Receive Help with Dignity',
      description: 'Funds are delivered securely and respectfully, ensuring your support reaches you with integrity.'
    }
  ];

  const donorSteps = [
    {
      icon: CheckCircle,
      title: 'Trusted & Verified Causes',
      description: 'Every campaign is reviewed thoroughly to protect your amanah.'
    },
    {
      icon: Lock,
      title: 'Secure & Protected Giving',
      description: 'Your donation is handled with bank-grade security and ethical care.'
    },
    {
      icon: HandHeart,
      title: 'Direct Impact',
      description: 'Your sadaqah reaches those in need without unnecessary intermediaries.'
    },
    {
      icon: TrendingUp,
      title: 'Transparent Accountability',
      description: 'Track progress and see how your contribution changes lives.'
    }
  ];

  const renderSteps = (steps, isGradientBg = false) => (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
      {steps.map((step, index) => {
        const Icon = step.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            className="flex flex-col items-start"
          >
            {/* Icon */}
            <div className="mb-3 lg:mb-4">
              <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-xl ${isGradientBg
                  ? 'bg-white/20 backdrop-blur-sm'
                  : darkMode
                    ? 'bg-gradient-to-br from-emerald-600 to-teal-600'
                    : 'bg-gradient-to-br from-emerald-600 to-teal-600'
                } flex items-center justify-center relative`}>
                <Icon className={`w-6 h-6 lg:w-7 lg:h-7 ${isGradientBg ? 'text-white' : 'text-white'}`} strokeWidth={2} />
                {/* Step number badge */}
                <div className={`absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full ${isGradientBg
                    ? 'bg-white text-emerald-600'
                    : 'bg-emerald-600 text-white'
                  } flex items-center justify-center text-xs font-bold`}>
                  {index + 1}
                </div>
              </div>
            </div>

            {/* Content */}
            <h3 className={`text-sm lg:text-base font-semibold mb-1.5 lg:mb-2 ${isGradientBg
                ? 'text-white'
                : darkMode
                  ? 'text-white'
                  : 'text-gray-900'
              }`}>
              {step.title}
            </h3>
            <p className={`text-xs lg:text-sm leading-relaxed ${isGradientBg
                ? 'text-white/80'
                : darkMode
                  ? 'text-zinc-400'
                  : 'text-gray-600'
              }`}>
              {step.description}
            </p>
          </motion.div>
        );
      })}
    </div>
  );

  return (
    <div>
      {/* For Beneficiaries - White/Dark Background */}
      <section className={`py-8 lg:py-10 border-b ${darkMode
          ? 'bg-zinc-900 border-zinc-800'
          : 'bg-white border-gray-200'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-6 lg:mb-8"
          >
            <h2 className={`text-xl md:text-2xl lg:text-3xl font-bold mb-1.5 lg:mb-2 ${darkMode ? 'text-white' : 'text-gray-900'
              }`}>
              For Beneficiaries
            </h2>
            <p className={`text-sm lg:text-base ${darkMode ? 'text-zinc-400' : 'text-gray-600'
              }`}>
              A journey of dignity, trust, and support
            </p>
          </motion.div>

          {renderSteps(beneficiarySteps, false)}
        </div>
      </section>

      {/* For Donors - Subtle Premium Tint */}
      <section className={`py-12 lg:py-16 relative overflow-hidden ${darkMode
          ? 'bg-[#0A1A17]'
          : 'bg-emerald-50/50'
        }`}>
        {/* Subtle pattern overlay */}
        <div className={`absolute inset-0 opacity-[0.03] ${darkMode ? 'invert' : ''}`}>
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8 lg:mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Contributor Journey</span>
            </div>
            <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-zinc-900'
              }`}>
              For Donors
            </h2>
            <p className={`text-sm lg:text-lg max-w-2xl ${darkMode ? 'text-emerald-100/60' : 'text-zinc-600'
              }`}>
              Giving with intention, trust, and accountability. Every contribution is a seed of change.
            </p>
          </motion.div>

          {renderSteps(donorSteps, false)}
        </div>
      </section>
    </div>
  );
}