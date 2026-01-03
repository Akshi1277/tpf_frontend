'use client';

import { XCircle } from 'lucide-react';
import Link from 'next/link';

export default function DonationFailedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
        
        <div className="flex justify-center mb-4">
          <XCircle className="w-16 h-16 text-red-500" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Failed
        </h1>

        <p className="text-gray-600 mb-6">
          Unfortunately, your payment could not be completed.
          No amount has been deducted from your account.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/campaigns"
            className="w-full py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
          >
            Try Again
          </Link>

          <Link
            href="/support"
            className="w-full py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition"
          >
            Contact Support
          </Link>
        </div>

        <p className="text-xs text-gray-400 mt-6">
          If money was deducted, it will be refunded automatically within
          3–5 working days.
        </p>
      </div>
    </div>
  );
}
