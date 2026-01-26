"use client";

import { ArrowLeft, Shield, Lock, Eye, FileCheck } from "lucide-react";

export default function PrivacyPolicy({ onBack }) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <button
        onClick={onBack}
        className="mb-6 text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-2 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Policies
      </button>

      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
        {/* Header */}
        <div className="mb-8 border-b border-gray-200 pb-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-10 h-10 text-emerald-600" />
            <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
          </div>
          <p className="text-lg text-emerald-700 font-medium italic">
            Your Trust is Sacred. Your Privacy is Respected.
          </p>
        </div>

        <div className="space-y-10">
          {/* Introduction */}
          <section>
            <p className="text-gray-700 leading-relaxed text-lg">
              At TPF Aid, a project of True Path Foundation, we value not just your generosity, but your trust. 
              When you choose to support us—whether by donating, volunteering, or simply sharing your details—we 
              consider it a sacred responsibility to protect your personal information with the highest level of care. 
              This Privacy Policy explains how we collect, use, and safeguard your data transparently and ethically.
            </p>
          </section>

          {/* Legal Compliance */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <FileCheck className="w-7 h-7 text-emerald-600" />
              <h2 className="text-3xl font-bold text-gray-900">Legal Compliance</h2>
            </div>
            <p className="text-gray-700 mb-4 leading-relaxed">
              True Path Foundation is registered as a Section 8 Company under the Companies Act, 2013, 
              governed by the Ministry of Corporate Affairs (MCA), Government of India.
            </p>
            
            <div className="bg-emerald-50 border-l-4 border-emerald-600 p-5 rounded-r-lg">
              <p className="font-semibold text-emerald-900 mb-3">We comply with:</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-1">•</span>
                  <span>The Companies Act, 2013</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-1">•</span>
                  <span>The Income Tax Act, 1961</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-1">•</span>
                  <span>The Information Technology Act, 2000</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-1">•</span>
                  <span>Guidelines issued by the Registrar of Companies (ROC)</span>
                </li>
              </ul>
            </div>

            <div className="mt-5 bg-red-50 border-l-4 border-red-600 p-5 rounded-r-lg">
              <p className="font-bold text-red-900 mb-2">⚠️ Important Notice:</p>
              <p className="text-gray-700 leading-relaxed">
                True Path Foundation does not accept or solicit any foreign donations, directly or indirectly. 
                We are not registered under the Foreign Contribution (Regulation) Act (FCRA), 2010, and therefore 
                do not process international remittances, funding, or communications related to foreign contributions. 
                Any such attempts will be declined.
              </p>
            </div>

            <div className="mt-5 bg-blue-50 border-l-4 border-blue-600 p-5 rounded-r-lg">
              <p className="font-semibold text-blue-900 mb-2">Tax Compliance:</p>
              <p className="text-gray-700">
                To issue valid tax-exemption receipts (80G) or meet KYC requirements for large donations, 
                we may collect PAN or other official IDs. This is done only where legally necessary and 
                handled with utmost confidentiality.
              </p>
            </div>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Information We Collect</h2>
            <p className="text-gray-700 mb-5 leading-relaxed">
              When you interact with TPF Aid—whether by donating, volunteering, contacting us, or subscribing 
              to updates—we may collect only such data as is necessary, lawful, and directly related to our objectives:
            </p>
            
            <div className="grid md:grid-cols-2 gap-3">
              {[
                "Full name",
                "Contact number",
                "Email address",
                "Postal address",
                "PAN card (for 80G receipts)",
                "Aadhaar (only where required by law)",
                "Donation amount and method",
                "Communication preferences",
                "Feedback or complaint details"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
            <p className="text-gray-700 mb-5 leading-relaxed">
              We use your personal information responsibly and only for purposes that support our mission:
            </p>
            
            <div className="space-y-3">
              {[
                "Process donations and issue valid receipts",
                "Provide 80G tax-exemption certificates (if eligible)",
                "Share impact reports, newsletters, or gratitude messages (only with consent)",
                "Improve user experience on our platform",
                "Contact you for queries, corrections, or donation clarifications",
                "Comply with statutory, financial, and audit obligations under Indian law"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold">✓</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-5 bg-gradient-to-r from-emerald-50 to-blue-50 p-5 rounded-lg border border-emerald-200">
              <p className="text-gray-800 font-bold">
                ✓ We do not use your data for marketing, profiling, or commercial resale.
              </p>
            </div>
          </section>

          {/* Protection for Minors */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Protection for Minors</h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-600 p-5 rounded-r-lg">
              <p className="text-gray-700 leading-relaxed mb-3">
                TPF Aid is dedicated to responsible and ethical use by individuals of appropriate legal age. 
                Our website and services are <strong>not directed toward children under the age of 18</strong>. 
                We do not knowingly or intentionally collect personal information from individuals under 18 years of age.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                If you are under 18 years of age, you are advised not to use the site, share any personal 
                information, or engage in any activity on the platform without the explicit consent and 
                supervision of a parent or legal guardian.
              </p>
              <p className="text-gray-700 leading-relaxed">
                If we become aware that personal data has been collected from a minor without parental consent, 
                we will take immediate steps to remove that information and restrict access to services.
              </p>
            </div>
          </section>

          {/* Anonymous Donations */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-7 h-7 text-emerald-600" />
              <h2 className="text-3xl font-bold text-gray-900">Anonymity & Confidential Donations</h2>
            </div>
            <p className="text-gray-700 mb-5 leading-relaxed">
              TPF Aid respects your right to contribute with discretion and dignity. We offer the option 
              to make <strong>Anonymous Donations</strong> to any cause hosted on our platform.
            </p>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="font-bold text-blue-900 mb-3 text-lg">By Choosing to Remain Anonymous:</h3>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Your name, profile image, or any identifying information will not be displayed publicly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Your donation amount and identity will be hidden from other donors and visitors</span>
                </li>
              </ul>
              
              <h3 className="font-bold text-blue-900 mb-3 text-lg">Legal Compliance Requirements:</h3>
              <p className="text-gray-700 mb-3 leading-relaxed">
                In compliance with the Income Tax Act, 1961, and applicable transparency laws for NGOs in India:
              </p>
              <div className="bg-white p-4 rounded border border-blue-300">
                <p className="text-gray-700 mb-2">
                  If you choose to receive a <strong>tax exemption receipt (80G)</strong>, you must provide:
                </p>
                <ul className="space-y-1 text-gray-700 ml-4">
                  <li>• Full Name</li>
                  <li>• PAN (Permanent Account Number)</li>
                  <li>• Address</li>
                  <li>• Valid contact information</li>
                </ul>
                <p className="text-gray-600 mt-3 text-sm italic">
                  These details are used only for statutory reporting, internal audit, or submission to 
                  government authorities if legally mandated. They are never shared publicly, sold, or 
                  disclosed to third parties for commercial purposes.
                </p>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-7 h-7 text-emerald-600" />
              <h2 className="text-3xl font-bold text-gray-900">Data Security</h2>
            </div>
            <p className="text-gray-700 mb-5 leading-relaxed">
              We implement industry-standard security practices to protect your data:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: "Encrypted Donation Processing", desc: "All transactions are secured with encryption" },
                { title: "Secure Servers with Firewalls", desc: "Multiple layers of protection" },
                { title: "Limited Internal Access Controls", desc: "Only authorized personnel can access data" },
                { title: "Regular Security Audits", desc: "Ongoing monitoring and improvements" }
              ].map((item, idx) => (
                <div key={idx} className="bg-emerald-50 p-5 rounded-lg border border-emerald-200">
                  <h3 className="font-bold text-emerald-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Sharing of Information */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Sharing of Information</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Your data may be shared only with:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-emerald-600 font-bold">→</span>
                <span>Recognized Indian payment gateway service providers</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-600 font-bold">→</span>
                <span>Statutory authorities (e.g., Income Tax Department, MCA) where legally required</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-600 font-bold">→</span>
                <span>Auditors or government bodies for compliance purposes</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-600 font-bold">→</span>
                <span>Internal departments of TPF Aid under strict confidentiality norms</span>
              </li>
            </ul>
            <div className="mt-5 bg-red-50 p-4 rounded-lg border border-red-200">
              <p className="text-gray-800 font-bold">
                ⚠️ We never sell, trade, lease, or share your personal data with any third party for profit or commercial advantage.
              </p>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Cookies & Online Usage</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Our website may use basic cookies to:
            </p>
            <div className="bg-gray-50 p-5 rounded-lg">
              <ul className="space-y-2 text-gray-700">
                <li>• Remember your preferences</li>
                <li>• Optimize load speed and readability</li>
                <li>• Improve website performance analytics</li>
              </ul>
              <p className="text-gray-600 mt-4 text-sm">
                These do not collect sensitive personal information. You can disable cookies anytime through your browser settings.
              </p>
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Data Rights & Control</h2>
            <p className="text-gray-700 mb-4 leading-relaxed font-semibold">
              You are always in control of your data. You can:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                "Unsubscribe from our emails at any time",
                "Request a copy of your stored data",
                "Ask us to correct or delete your data (unless required for compliance)"
              ].map((item, idx) => (
                <div key={idx} className="bg-gradient-to-br from-emerald-50 to-blue-50 p-5 rounded-lg border border-emerald-200">
                  <p className="text-gray-700 font-medium">{item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Foreign Funding */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Foreign Funding Restriction</h2>
            <div className="bg-red-50 border-2 border-red-600 p-6 rounded-lg">
              <p className="text-gray-700 mb-4 leading-relaxed font-semibold">
                We reiterate that True Path Foundation and TPF Aid <strong>do not receive any foreign donations</strong>:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>We are not FCRA-registered</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>We do not process donations from non-resident Indians (NRIs), foreign individuals, institutions, or governments</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Our payment gateways are configured to reject foreign transactions automatically</span>
                </li>
              </ul>
              <p className="text-gray-700 mt-4 italic">
                Any attempt to send international donations, gifts, or funds will be declined or refunded without processing.
              </p>
            </div>
          </section>

          {/* Disclaimer */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Legal Liability Disclaimer</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              While every effort is made to protect your data and uphold privacy standards, True Path Foundation 
              and TPF Aid shall not be held legally liable for:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• Breaches beyond our control (e.g., cyberattacks, third-party security issues)</li>
              <li>• Misuse of information shared through unofficial channels</li>
              <li>• Incorrect data provided by donors or users</li>
              <li>• Any assumptions made by users beyond the terms explicitly stated here</li>
              <li>• Data shared on fake websites impersonating TPF Aid or True Path Foundation</li>
            </ul>
            <p className="text-gray-600 mt-4 text-sm italic">
              All users interacting with our platform agree to these terms and release the Foundation from 
              any unintentional or indirect liabilities arising from the use of our services.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-gradient-to-r from-emerald-50 via-blue-50 to-emerald-50 p-8 rounded-xl border border-emerald-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact & Data Concerns</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              For any queries or requests related to your data, please reach out through our 
              established contact channels on the platform.
            </p>
            <div className="bg-white p-6 rounded-lg border-l-4 border-emerald-600">
              <p className="text-gray-700 italic text-lg">
                "Your privacy is not just a legal matter—it's a matter of respect and ethics. 
                We hold your trust as dearly as your donation. As we strive to change lives, 
                we will never compromise yours."
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}