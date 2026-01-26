"use client";

import { ArrowLeft, FileText, Users, Heart, Shield, AlertTriangle, Scale } from "lucide-react";

export default function TermsOfUse({ onBack }) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <button
        onClick={onBack}
        className="mb-6 text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Policies
      </button>

      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
        {/* Header */}
        <div className="mb-8 border-b border-gray-200 pb-6">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Terms & Conditions of Use</h1>
          </div>
          <p className="text-lg text-blue-700 font-medium">
            Please read this document carefully before using TPF Aid's services.
          </p>
        </div>

        <div className="space-y-10">
          {/* Introduction */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              These Terms and Conditions ("Terms") govern the use of the website <strong>www.tpfaid.org</strong>, 
              and all related online services offered by True Path Foundation, a Section 8 Company registered 
              under the Companies Act, 2013, Government of India.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-5 rounded-r-lg">
              <p className="text-gray-700 leading-relaxed">
                By accessing, browsing, using, donating to, registering with, or participating in any activity 
                on this platform, you agree to be bound by these Terms, including all updates and policies 
                referred herein. <strong>If you do not agree, please do not use this website.</strong>
              </p>
            </div>
          </section>

          {/* Definitions */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-5">Key Definitions</h2>
            <div className="grid gap-4">
              {[
                { term: "Platform", def: "The website www.tpfaid.org and all related digital services operated by True Path Foundation" },
                { term: "True Path Foundation / TPF", def: "The registered Section 8 Company, parent organization of TPF Aid" },
                { term: "TPF Aid", def: "The flagship charitable project focused on public welfare, community aid, and emergency relief programs" },
                { term: "User / You", def: "Any person accessing the platform, including donors, beneficiaries, volunteers, visitors, members, employees, and representatives" },
                { term: "Donor", def: "Any individual or organization voluntarily contributing funds, resources, or time to TPF Aid" },
                { term: "Beneficiary", def: "Any individual or entity applying for aid or being featured on the platform for fundraising" },
                { term: "Volunteer", def: "A person offering time or service to TPF Aid activities without remuneration" },
                { term: "Permanent Member", def: "A person officially inducted as part of the organization's core team with defined rights and responsibilities" },
                { term: "Legal Wing", def: "The legal advisory and enforcement arm of True Path Foundation, empowered to take action in cases of misuse or breach" }
              ].map((item, idx) => (
                <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="font-bold text-blue-900 mb-1">{item.term}</h3>
                  <p className="text-gray-700 text-sm">{item.def}</p>
                </div>
              ))}
            </div>
          </section>

          {/* General Terms */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-7 h-7 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">General Terms of Use</h2>
            </div>
            <p className="text-gray-700 mb-4 font-semibold">Applicable to All Users:</p>
            <div className="space-y-3">
              {[
                "The platform is for lawful, humanitarian, and non-profit use only.",
                "By using the platform, you confirm that you are at least 18 years of age, or using under guardian supervision, and you agree to provide accurate, honest, and verifiable information.",
                "Any attempt to hack, disrupt, defame, defraud, or misuse this platform will be strictly prosecuted under Indian laws.",
                "TPF Aid may refuse, restrict, suspend, or terminate your access to any part of the platform without prior notice for violation of these Terms.",
                "TPF Aid may modify or update these Terms at any time. Continued use constitutes your acceptance."
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-blue-50 p-4 rounded-lg">
                  <span className="text-blue-600 font-bold text-xl">{idx + 1}.</span>
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Donations */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-7 h-7 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">Donations</h2>
            </div>
            <div className="space-y-3">
              {[
                "All donations are voluntary, non-refundable, and final unless explicitly stated otherwise.",
                "Donations are accepted only from Indian citizens and through Indian payment instruments. We do not accept foreign funding or donations from NRIs under any circumstance.",
                "PAN and Aadhaar may be requested for high-value donations or 80G compliance purposes.",
                "TPF Aid provides donation receipts as per the Indian Income Tax Act and follows transparent accounting practices.",
                "Donors are not entitled to influence beneficiary selection, program direction, or management decisions."
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold">✓</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Beneficiaries */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Beneficiaries & Fundraiser Applicants</h2>
            <p className="text-gray-700 mb-5 leading-relaxed">
              Applicants seeking financial, medical, educational, or livelihood assistance must agree to the following:
            </p>
            
            <div className="space-y-4">
              <div className="bg-green-50 border-l-4 border-green-600 p-5 rounded-r-lg">
                <p className="font-semibold text-green-900 mb-2">Responsibilities:</p>
                <ul className="space-y-2 text-gray-700">
                  <li>• All information submitted must be truthful, complete, and supported by valid documentation</li>
                  <li>• TPF Aid reserves the right to verify all claims through on-ground checks, third-party investigators, or internal teams</li>
                  <li>• Applicants/fundraisers grant TPF Aid the right to display their stories, images, and details on the platform or in impact reports, while maintaining dignity and consent</li>
                </ul>
              </div>

              <div className="bg-red-50 border-l-4 border-red-600 p-5 rounded-r-lg">
                <p className="font-semibold text-red-900 mb-3">If False or Misleading Data is Discovered:</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">→</span>
                    <span>Aid may be immediately revoked</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">→</span>
                    <span>Raised funds will be allocated to another similar case or organizational operations and expenses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">→</span>
                    <span>Transfer of religious zakat donations to zakat account subject to varied considerations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">→</span>
                    <span>Legal action may be initiated by the Legal Wing of TPF</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">→</span>
                    <span>The applicant may be permanently blacklisted</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-gray-700 italic">
                  <strong>Important:</strong> Receiving aid from TPF Aid does not create any right to future or 
                  recurring support or legal obligation on part of the Foundation.
                </p>
              </div>
            </div>
          </section>

          {/* Volunteers */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Volunteers</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              All TPF volunteers must agree to:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Serve with honesty, discipline, and dignity, without expecting remuneration or reward",
                "Not misuse the Foundation's name, brand, data, or resources for personal or political gain",
                "Maintain the confidentiality of all internal information, including beneficiary data",
                "Follow all instructions issued by local or central team leads",
                "Accept that any misconduct, negligence, or breach of trust will result in immediate removal and legal action where appropriate"
              ].map((item, idx) => (
                <div key={idx} className="bg-violet-50 p-4 rounded-lg border border-violet-200">
                  <p className="text-gray-700 text-sm">{item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Permanent Members */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Permanent Members & Core Associates</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Permanent members, whether on advisory, administrative, or ground-level positions, agree to:
            </p>
            <div className="space-y-3">
              {[
                "Uphold the mission and values of True Path Foundation in personal and public life",
                "Avoid any activity that may bring disrepute to the organization",
                "Disclose conflicts of interest and not misuse authority for personal benefit",
                "Adhere to all internal policies, financial controls, and legal obligations",
                "Cooperate fully with the Foundation's governance and audit systems"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-amber-50 p-4 rounded-lg border border-amber-200">
                  <div className="w-6 h-6 bg-amber-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold">{idx + 1}</span>
                  </div>
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Disclaimer */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-7 h-7 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">Disclaimer of Liability</h2>
            </div>
            
            <div className="bg-yellow-50 border-2 border-yellow-600 p-6 rounded-lg mb-4">
              <p className="text-gray-700 leading-relaxed mb-3">
                TPF Aid offers support on a <strong>best-effort, compassionate basis</strong>, and does not 
                guarantee outcomes for any individual campaign or service.
              </p>
            </div>

            <p className="text-gray-700 mb-4 font-semibold">True Path Foundation shall not be held liable for:</p>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                "Technical errors, transaction failures, or data loss",
                "Unauthorized use of your login or data",
                "Errors by third-party partners or vendors",
                "Emotional, reputational, or financial loss caused due to aid delay or denial"
              ].map((item, idx) => (
                <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-300">
                  <p className="text-gray-700 text-sm">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-2 text-gray-600">
              <p>• We make no warranties about the accuracy, reliability, or completeness of content posted by third-party fundraiser applicants.</p>
              <p>• The platform may include external links for convenience. We are not responsible for external content or policies.</p>
            </div>
          </section>

          {/* Breach of Terms */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-7 h-7 text-red-600" />
              <h2 className="text-3xl font-bold text-gray-900">Breach of Terms</h2>
            </div>
            
            <div className="bg-red-50 border-2 border-red-600 p-6 rounded-lg">
              <p className="font-semibold text-red-900 mb-4">If any user is found to be:</p>
              <ul className="space-y-2 text-gray-700 mb-5">
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Misusing the website</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Providing false documents</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Harassing volunteers or beneficiaries</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Attempting fraud, extortion, or impersonation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Violating Indian laws</span>
                </li>
              </ul>

              <p className="font-semibold text-red-900 mb-3">Then TPF Aid reserves the right to:</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">→</span>
                  <span>Report the matter to cybercrime authorities and law enforcement</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">→</span>
                  <span>Take strict legal action under the supervision of the Legal Wing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">→</span>
                  <span>Initiate permanent bans or blacklisting from all future aid, volunteer, or donor engagements</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Final Declaration */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-7 h-7 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">Final Declaration</h2>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
              <p className="text-gray-700 mb-4 leading-relaxed">
                By using this platform, you declare that you:
              </p>
              <div className="space-y-3">
                {[
                  "Have read and understood these Terms",
                  "Agree to abide by them fully",
                  "Understand that True Path Foundation's liability is limited to the extent allowed under Indian law",
                  "Will cooperate with all verification and ethical practices"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <p className="text-gray-700 font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Grievances */}
          <section className="bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 p-8 rounded-xl border border-blue-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Grievances and Contact</h2>
            <p className="text-gray-700 leading-relaxed">
              For any concerns, feedback, or complaints related to these Terms, users may contact us 
              through our established contact channels on the platform. We are committed to addressing 
              all grievances promptly and fairly.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}