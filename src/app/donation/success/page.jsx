'use client';

import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

export default function DonationSuccessPage() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-16 h-16 text-emerald-500" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Donation Successful
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for your generosity. Your contribution has been
          successfully received and will make a real impact.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="w-full py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
          >
            Back to Home
          </Link>

          <Link
            href="/campaigns"
            className="w-full py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition"
          >
            Support Another Campaign
          </Link>
        </div>

        <p className="text-xs text-gray-400 mt-6">
          A receipt has been sent to your registered email address.
        </p>
      </div>
    </div>
  );
}
