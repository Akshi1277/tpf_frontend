'use client';

import { AlertCircle, Heart, ArrowRight, Home, Headphones, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

export default function DonationFailedPage() {
  const searchParams = useSearchParams();
  const campaignId = searchParams.get('campaign');
  const retryUrl = campaignId ? `/campaigns/${campaignId}` : '/all-campaigns';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-red-50 p-3 sm:p-4">
      <div className="w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Decorative top border */}
          <div className="h-1.5 sm:h-2 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400" />

          <div className="grid lg:grid-cols-2">
            {/* Left Column - Error & Actions */}
            <div className="p-5 sm:p-6 lg:p-8 flex flex-col justify-center relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-20" />
              
              <div className="relative z-10 space-y-4 sm:space-y-5">
                {/* Error Icon */}
                <div className="flex justify-center lg:justify-start">
                  <div className="relative">
                    <div className="absolute inset-0 bg-orange-400 rounded-full blur-xl opacity-30" />
                    <div className="relative bg-orange-50 rounded-full p-3 sm:p-4">
                      <AlertCircle className="w-12 h-12 sm:w-14 sm:h-14 text-orange-600" strokeWidth={2.5} />
                    </div>
                  </div>
                </div>

                {/* Title */}
                <div className="text-center lg:text-left">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-1.5">
                    Payment Unsuccessful
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600">
                    Don't worry, no amount was deducted
                  </p>
                </div>

                {/* Info Cards */}
                <div className="flex gap-2 sm:gap-2.5">
                  <div className="flex-1 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-lg sm:rounded-xl p-2.5 sm:p-3.5 text-center border border-blue-200/50">
                    <div className="bg-blue-500 rounded-md sm:rounded-lg w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center mx-auto mb-1 sm:mb-1.5">
                      <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" strokeWidth={2.5} />
                    </div>
                    <p className="text-[10px] sm:text-xs font-semibold text-blue-900">Your Intent Matters</p>
                  </div>
                  <div className="flex-1 bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-lg sm:rounded-xl p-2.5 sm:p-3.5 text-center border border-emerald-200/50">
                    <div className="bg-emerald-500 rounded-md sm:rounded-lg w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center mx-auto mb-1 sm:mb-1.5">
                      <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" strokeWidth={2.5} />
                    </div>
                    <p className="text-[10px] sm:text-xs font-semibold text-emerald-900">Try Once More</p>
                  </div>
                  <div className="flex-1 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-lg sm:rounded-xl p-2.5 sm:p-3.5 text-center border border-purple-200/50">
                    <div className="bg-purple-500 rounded-md sm:rounded-lg w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center mx-auto mb-1 sm:mb-1.5">
                      <Headphones className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" strokeWidth={2.5} />
                    </div>
                    <p className="text-[10px] sm:text-xs font-semibold text-purple-900">We're Here</p>
                  </div>
                </div>

                {/* Reasons */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200/50">
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-1.5 sm:mb-2">Common reasons:</h3>
                  <ul className="text-[11px] sm:text-xs text-gray-600 space-y-0.5 sm:space-y-1">
                    <li>• Insufficient balance or daily limit exceeded</li>
                    <li>• Incorrect card details or expired card</li>
                    <li>• Network connectivity issues</li>
                    <li>• Bank server temporarily unavailable</li>
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-2.5">
                  <Link
                    href={retryUrl}
                    className="group flex-1 py-2.5 sm:py-3 px-4 sm:px-5 rounded-lg sm:rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold hover:from-emerald-700 hover:to-emerald-600 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-xs sm:text-sm"
                  >
                    <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.5} />
                    <span>Try Again</span>
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform duration-200" strokeWidth={2.5} />
                  </Link>

                  <Link
                    href="/"
                    className="flex-1 py-2.5 sm:py-3 px-4 sm:px-5 rounded-lg sm:rounded-xl bg-white border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center justify-center gap-2 text-xs sm:text-sm shadow-sm hover:shadow"
                  >
                    <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.5} />
                    <span>Go Home</span>
                  </Link>
                </div>

                <Link
                  href="/contactus"
                  className="w-full py-2.5 sm:py-3 px-4 sm:px-5 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 text-blue-700 font-semibold hover:from-blue-100 hover:to-blue-200 transition-all duration-200 flex items-center justify-center gap-2 text-xs sm:text-sm"
                >
                  <Headphones className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.5} />
                  <span>Contact Support</span>
                </Link>

                {/* Footer Info */}
                <div className="text-center lg:text-left space-y-0.5 sm:space-y-1">
                  <p className="text-[11px] sm:text-xs text-gray-500">
                    💳 No amount was charged to your account
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-400">
                    If money was deducted, it will be refunded within 3–5 working days
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Motivation */}
            <div className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 p-5 sm:p-6 lg:p-8 flex flex-col justify-center text-white relative overflow-hidden min-h-[400px] lg:min-h-0">
              {/* Decorative Circles */}
              <div className="absolute top-10 right-10 w-32 h-32 sm:w-40 sm:h-40 bg-white rounded-full opacity-10 blur-3xl" />
              <div className="absolute bottom-10 left-10 w-40 h-40 sm:w-48 sm:h-48 bg-teal-400 rounded-full opacity-20 blur-3xl" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 bg-emerald-300 rounded-full opacity-10 blur-3xl" />
              
              <div className="relative z-10 space-y-5 sm:space-y-6 lg:space-y-7">
                {/* Main Message */}
                <div className="space-y-2.5 sm:space-y-3.5">
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/15 backdrop-blur-sm rounded-full px-3 sm:px-3.5 py-1 sm:py-1.5 border border-white/20">
                    <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5" strokeWidth={2.5} />
                    <span className="text-[10px] sm:text-xs font-semibold">Don't Give Up</span>
                  </div>
                  
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                    Your Kindness
                    <br />
                    Still Counts
                  </h2>
                  <p className="text-emerald-50 text-xs sm:text-sm leading-relaxed">
                    Technical issues happen, but your intention to help is what truly matters.
                  </p>
                </div>

                {/* Motivational Cards */}
                <div className="grid grid-cols-1 gap-2.5 sm:gap-3.5">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/20">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="bg-white/20 rounded-lg sm:rounded-xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0">
                        <Heart className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2} />
                      </div>
                      <div>
                        <p className="font-semibold text-xs sm:text-sm mb-0.5 sm:mb-1">Your Heart is in the Right Place</p>
                        <p className="text-emerald-50 text-[10px] sm:text-xs leading-relaxed">
                          The fact that you tried means everything. Your generosity is already inspiring.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/20">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="bg-white/20 rounded-lg sm:rounded-xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0">
                        <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2} />
                      </div>
                      <div>
                        <p className="font-semibold text-xs sm:text-sm mb-0.5 sm:mb-1">One More Try</p>
                        <p className="text-emerald-50 text-[10px] sm:text-xs leading-relaxed">
                          Sometimes it takes a second attempt. Your contribution will make a real difference.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/20">
                  <p className="text-sm sm:text-base italic leading-relaxed mb-1.5 sm:mb-2">
                    "Success is not final, failure is not fatal: it is the courage to continue that counts."
                  </p>
                  <p className="text-emerald-100 text-xs sm:text-sm font-medium">— Winston Churchill</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}