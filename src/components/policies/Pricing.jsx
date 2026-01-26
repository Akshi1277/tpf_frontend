"use client";

import { ArrowLeft, CreditCard, RefreshCw, DollarSign, FileCheck, AlertCircle } from "lucide-react";

export default function Pricing({ onBack }) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <button
        onClick={onBack}
        className="mb-6 text-violet-600 hover:text-violet-700 font-semibold flex items-center gap-2 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Policies
      </button>

      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
        {/* Header */}
        <div className="mb-8 border-b border-gray-200 pb-6">
          <div className="flex items-center gap-3 mb-4">
            <CreditCard className="w-10 h-10 text-violet-600" />
            <h1 className="text-4xl font-bold text-gray-900">Pricing & Refunds</h1>
          </div>
          <p className="text-lg text-violet-700 font-medium">
            Ensuring Trust and Transparency in Every Contribution
          </p>
        </div>

        <div className="space-y-10">
          {/* Introduction */}
          <section>
            <p className="text-gray-700 leading-relaxed text-lg">
              At TPF Aid, we operate purely on the principle of charitable service, and we do not sell 
              goods or services for profit. However, in the spirit of transparency, we provide this 
              Pricing & Refund Policy to clarify how donations, platform fees (if any), and refund 
              processes work for all users.
            </p>
          </section>

          {/* Pricing Structure */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <DollarSign className="w-7 h-7 text-violet-600" />
              <h2 className="text-3xl font-bold text-gray-900">Pricing Structure</h2>
            </div>
            
            <div className="bg-gradient-to-r from-violet-50 to-purple-50 p-6 rounded-lg border border-violet-200 mb-5">
              <p className="text-gray-700 leading-relaxed font-semibold">
                True Path Foundation and TPF Aid <strong>do not charge any registration or membership fees</strong> from 
                beneficiaries, volunteers, or donors.
              </p>
            </div>

            <div className="space-y-5">
              {/* Donation-Based */}
              <div className="bg-white border-2 border-violet-200 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 bg-violet-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold">A</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Donation-Based Fundraisers</h3>
                    <p className="text-gray-700 leading-relaxed">
                      All contributions made through our platform are <strong>voluntary donations</strong> for 
                      charitable purposes. The amount you choose to donate is entirely up to your discretion.
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Gateway */}
              <div className="bg-white border-2 border-violet-200 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 bg-violet-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold">B</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Platform or Payment Gateway Charges</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      In some cases, a small convenience or processing fee (typically levied by our payment 
                      partners/payment aggregators having authority from Reserve Bank of India or other applicable 
                      legal payment gateways) may apply.
                    </p>
                    <div className="bg-blue-50 p-4 rounded border border-blue-200">
                      <p className="text-gray-700 text-sm">
                        <strong>Important:</strong> This charge does not go to True Path Foundation, and donors 
                        will be able to view this clearly during the transaction.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recurring Donations */}
              <div className="bg-white border-2 border-violet-200 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 bg-violet-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold">C</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Recurring Donations</h3>
                    <p className="text-gray-700 leading-relaxed">
                      If you choose to set up monthly/recurring donations, you will be billed as per your 
                      selected frequency. You may cancel this at any time through your donor dashboard or 
                      by contacting our support.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Refund Policy */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <RefreshCw className="w-7 h-7 text-violet-600" />
              <h2 className="text-3xl font-bold text-gray-900">Refund Policy</h2>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-600 p-6 rounded-lg mb-6">
              <p className="text-gray-700 leading-relaxed font-semibold">
                Since all donations made to TPF Aid are considered <strong>voluntary, irrevocable, and for 
                charitable purposes</strong>, we typically do not offer refunds.
              </p>
            </div>

            {/* Valid Scenarios */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Valid Scenarios for Refund:</h3>
              <p className="text-gray-700 mb-4">However, refunds may be considered only under the following rare circumstances:</p>
              
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  "Accidental Duplicate Donations",
                  "Unintended donations",
                  "Wrong Amount Entered",
                  "Technical Error on the Platform",
                  "Chose wrong campaign or fundraiser",
                  "Payment Debited but Donation Not Reflected"
                ].map((item, idx) => (
                  <div key={idx} className="bg-green-50 p-4 rounded-lg border border-green-300 flex items-start gap-2">
                    <span className="text-green-600 font-bold mt-0.5">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-blue-50 border-l-4 border-blue-600 p-5 rounded-r-lg">
                <p className="font-semibold text-blue-900 mb-3">In all such cases, kindly contact us at earliest through our "Contact Us" channel with details that should include:</p>
                <ul className="space-y-1 text-gray-700">
                  <li>• Transaction ID</li>
                  <li>• Payment method</li>
                  <li>• Date and time</li>
                  <li>• Amount</li>
                  <li>• Reason for refund</li>
                  <li>• Any attachment related to transaction</li>
                </ul>
                <p className="text-gray-600 mt-4 text-sm italic">
                  Refunds, once approved, may take <strong>7–14 working days</strong> to reflect in your bank account.
                </p>
              </div>
            </div>

            {/* Refunds Not Permitted */}
            <div className="bg-red-50 border-2 border-red-600 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-red-900 mb-4">Refunds Not Permitted For:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Change of heart or withdrawal of intention to donate</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Donations made under anonymous names</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Incorrect PAN or beneficiary name</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Disputes beyond our platform or third-party references</span>
                </li>
              </ul>
            </div>
          </section>

          {/* No Foreign Payments */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-7 h-7 text-red-600" />
              <h2 className="text-3xl font-bold text-gray-900">No Foreign Payments Accepted</h2>
            </div>
            
            <div className="bg-red-50 border-2 border-red-600 p-6 rounded-lg">
              <p className="text-gray-700 mb-4 leading-relaxed">
                Please note that True Path Foundation is <strong>not FCRA-registered</strong>, and therefore:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold text-xl">✗</span>
                  <span>We do not accept international donations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold text-xl">✗</span>
                  <span>No credit cards, bank transfers, or UPI from non-Indian accounts are allowed</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold text-xl">✗</span>
                  <span>If such a transaction is detected, the payment will be automatically rejected or reversed</span>
                </li>
              </ul>
              <p className="text-gray-700 mt-4 font-semibold">
                We reserve the right to block or blacklist accounts that repeatedly attempt foreign contributions.
              </p>
            </div>
          </section>

          {/* Issuance of Receipts */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <FileCheck className="w-7 h-7 text-violet-600" />
              <h2 className="text-3xl font-bold text-gray-900">Issuance of Receipts</h2>
            </div>
            
            <p className="text-gray-700 mb-5 leading-relaxed">
              Every donation made successfully through the platform is eligible for a <strong>donation 
              acknowledgement receipt</strong>, which includes:
            </p>

            <div className="grid md:grid-cols-2 gap-3 mb-5">
              {[
                "Donor name",
                "PAN (if provided)",
                "Transaction ID",
                "Amount donated",
                "80G certificate details (if applicable)",
                "Cause towards donation made or campaign name",
                "Campaign ID"
              ].map((item, idx) => (
                <div key={idx} className="bg-violet-50 p-4 rounded-lg border border-violet-200 flex items-center gap-2">
                  <div className="w-2 h-2 bg-violet-600 rounded-full"></div>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
              <p className="text-gray-700">
                Please allow up to <strong>48 hours</strong> to receive your receipt via email. For corrections 
                or re-issues, please contact our Help Centre through well-established medium.
              </p>
            </div>
          </section>

          {/* Disclaimer */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-5">Disclaimer</h2>
            
            <div className="space-y-4">
              <div className="bg-gray-50 border-l-4 border-gray-600 p-5 rounded-r-lg">
                <p className="font-semibold text-gray-900 mb-2">1. Refund Policy</p>
                <p className="text-gray-700">
                  All donations are <strong>non-refundable and non-transferable</strong> unless explicitly 
                  reviewed and approved by our internal refund committee.
                </p>
              </div>

              <div className="bg-gray-50 border-l-4 border-gray-600 p-5 rounded-r-lg">
                <p className="font-semibold text-gray-900 mb-3">2. TPF Aid shall not be held liable for:</p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Failed payment gateway transactions</li>
                  <li>• Delay caused by third-party providers</li>
                  <li>• Incorrect donor information provided during checkout</li>
                </ul>
              </div>

              <div className="bg-gray-50 border-l-4 border-gray-600 p-5 rounded-r-lg">
                <p className="font-semibold text-gray-900 mb-2">3. Policy Updates</p>
                <p className="text-gray-700">
                  We reserve the right to amend this policy without prior notice. Updated versions will be 
                  published on this page with the revised date.
                </p>
              </div>
            </div>
          </section>

          {/* Our Commitment */}
          <section className="bg-gradient-to-r from-violet-50 via-purple-50 to-violet-50 p-8 rounded-xl border border-violet-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Commitment</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We deeply value the trust of every donor, and every rupee donated is handled with integrity, 
              audited transparency, and in alignment with our charitable mission.
            </p>
            <div className="bg-white p-6 rounded-lg border-l-4 border-violet-600">
              <p className="text-gray-700 leading-relaxed">
                If you have any doubts, please write to us before donating. Our donor support team is 
                always here to assist you with complete transparency and care.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}