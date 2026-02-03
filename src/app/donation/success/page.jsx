'use client';

import { CheckCircle, Heart, ArrowRight, Award, Download, Home, Mail } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function DonationSuccessPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(8);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      router.push('/');
    }
  }, [countdown, router]);

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4 overflow-hidden">
      <div className="w-full max-w-6xl h-[85vh] max-h-[650px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden h-full"
        >
          {/* Decorative top border */}
          <div className="h-2 bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500" />

          <div className="grid lg:grid-cols-2 h-[calc(100%-8px)]">
            {/* Left Column - Success & Actions */}
            <div className="p-6 lg:p-8 flex flex-col justify-center relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-100 rounded-full blur-3xl opacity-20" />
              
              <div className="relative z-10 space-y-5">
                {/* Success Icon */}
                <div className="flex justify-center lg:justify-start">
                  <div className="relative">
                    <div className="absolute inset-0 bg-emerald-400 rounded-full blur-xl opacity-30" />
                    <div className="relative bg-emerald-50 rounded-full p-4">
                      <CheckCircle className="w-14 h-14 lg:w-16 lg:h-16 text-emerald-600" strokeWidth={2.5} />
                    </div>
                  </div>
                </div>

                {/* Title */}
                <div className="text-center lg:text-left">
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1.5">
                    Donation Successful
                  </h1>
                  <p className="text-base text-gray-600">
                    Thank you for making a difference
                  </p>
                </div>

                {/* Impact Visual Cards */}
                <div className="flex gap-2.5">
                  <div className="flex-1 bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl p-3.5 text-center border border-emerald-200/50">
                    <div className="bg-emerald-500 rounded-lg w-9 h-9 flex items-center justify-center mx-auto mb-1.5">
                      <Heart className="w-4 h-4 text-white" strokeWidth={2.5} />
                    </div>
                    <p className="text-xs font-semibold text-emerald-900">Making Impact</p>
                  </div>
                  <div className="flex-1 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-3.5 text-center border border-blue-200/50">
                    <div className="bg-blue-500 rounded-lg w-9 h-9 flex items-center justify-center mx-auto mb-1.5">
                      <Award className="w-4 h-4 text-white" strokeWidth={2.5} />
                    </div>
                    <p className="text-xs font-semibold text-blue-900">Champion</p>
                  </div>
                  <div className="flex-1 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl p-3.5 text-center border border-purple-200/50">
                    <div className="bg-purple-500 rounded-lg w-9 h-9 flex items-center justify-center mx-auto mb-1.5">
                      <CheckCircle className="w-4 h-4 text-white" strokeWidth={2.5} />
                    </div>
                    <p className="text-xs font-semibold text-purple-900">Verified</p>
                  </div>
                </div>

                {/* Countdown */}
                <div className="space-y-2">
                  <div className="flex items-center justify-center lg:justify-start gap-3">
                    <span className="text-sm text-gray-600">Redirecting in</span>
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white font-bold text-sm shadow-md">
                      {countdown}
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      initial={{ width: '100%' }}
                      animate={{ width: '0%' }}
                      transition={{ duration: 8, ease: 'linear' }}
                      className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <Link
                    href="/campaigns"
                    className="group flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold hover:from-emerald-700 hover:to-emerald-600 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm"
                  >
                    <Heart className="w-4 h-4" strokeWidth={2.5} />
                    <span>Donate Again</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" strokeWidth={2.5} />
                  </Link>

                  <Link
                    href="/"
                    className="flex-1 py-3 px-5 rounded-xl bg-white border-2 border-emerald-200 text-emerald-700 font-semibold hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-200 flex items-center justify-center gap-2 text-sm shadow-sm hover:shadow"
                  >
                    <Home className="w-4 h-4" strokeWidth={2.5} />
                    <span>Go Home</span>
                  </Link>
                </div>

                {/* Footer Info - Compact */}
                <div className="text-center lg:text-left space-y-1">
                  <p className="text-xs text-gray-500 flex items-center justify-center lg:justify-start gap-1.5">
                    <Mail className="w-3 h-3 text-gray-400" />
                    Receipt sent to your email
                  </p>
                  <Link 
                    href="/profile/downloads" 
                    className="text-xs text-emerald-600 hover:text-emerald-700 transition-colors inline-flex items-center gap-1 font-medium"
                  >
                    <Download className="w-3 h-3" />
                    Download invoice & certificate
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column - Visual Motivation */}
            <div className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 p-6 lg:p-8 flex flex-col justify-center text-white relative overflow-hidden">
              {/* Decorative Circles */}
              <div className="absolute top-10 right-10 w-40 h-40 bg-white rounded-full opacity-10 blur-3xl" />
              <div className="absolute bottom-10 left-10 w-48 h-48 bg-teal-400 rounded-full opacity-20 blur-3xl" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-300 rounded-full opacity-10 blur-3xl" />
              
              <div className="relative z-10 space-y-7">
                {/* Main Message */}
                <div className="space-y-3.5">
                  <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-3.5 py-1.5 border border-white/20">
                    <CheckCircle className="w-3.5 h-3.5" strokeWidth={2.5} />
                    <span className="text-xs font-semibold">Thank You</span>
                  </div>
                  
                  <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
                    Champion of
                    <br />
                    Change
                  </h2>
                </div>

                {/* Visual Impact Icons */}
                <div className="grid grid-cols-2 gap-3.5">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center hover:bg-white/15 transition-colors duration-200">
                    <div className="bg-white/20 rounded-xl w-12 h-12 flex items-center justify-center mx-auto mb-2.5">
                      <Heart className="w-6 h-6" strokeWidth={2} />
                    </div>
                    <p className="font-semibold text-sm">Real Impact</p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center hover:bg-white/15 transition-colors duration-200">
                    <div className="bg-white/20 rounded-xl w-12 h-12 flex items-center justify-center mx-auto mb-2.5">
                      <Award className="w-6 h-6" strokeWidth={2} />
                    </div>
                    <p className="font-semibold text-sm">You're Amazing</p>
                  </div>
                </div>

                {/* Quote */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                  <p className="text-base italic leading-relaxed mb-2">
                    "Charity does not in any way decrease the wealth and the servant who forgives, Allah adds to his respect; and the one who shows humility, Allah elevates him in the estimation (of the people)"
                  </p>
                  <p className="text-emerald-100 text-sm font-medium">— Prophet Muhammad (SAW)</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}