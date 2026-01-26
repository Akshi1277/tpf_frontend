"use client";

import { ArrowLeft, Scale, Flag, Heart, Shield, Users, Eye, CheckCircle } from "lucide-react";

export default function Governance({ onBack }) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <button
        onClick={onBack}
        className="mb-6 text-amber-600 hover:text-amber-700 font-semibold flex items-center gap-2 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Policies
      </button>

      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
        {/* Header */}
        <div className="mb-8 border-b border-gray-200 pb-6">
          <div className="flex items-center gap-3 mb-4">
            <Scale className="w-10 h-10 text-amber-600" />
            <h1 className="text-4xl font-bold text-gray-900">Anti-Discriminatory & Clear Governance Policies</h1>
          </div>
          <p className="text-lg text-amber-700 font-medium">
            Our unwavering commitment to the Constitution of India, equality, and nation-first humanitarian service
          </p>
        </div>

        <div className="space-y-10">
          {/* Introduction */}
          <section>
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-amber-300 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed text-lg font-medium">
                True Path Foundation, through its humanitarian platform TPF Aid, is founded and operated with 
                complete devotion to the Republic of India, its Constitution, and its people. Every activity 
                of the Foundation is aligned with the welfare, security, and dignity of the Indian nation.
              </p>
            </div>
          </section>

          {/* Policy 1: Commitment to Nation */}
          <section>
            <div className="flex items-start gap-4 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-amber-600 text-white rounded-full font-bold text-xl flex-shrink-0">
                1
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Flag className="w-6 h-6 text-amber-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Commitment to the Nation</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  The Foundation derives its guiding spirit from the constitutional ideals of sovereignty, unity, 
                  integrity, and fraternity, and functions with an unambiguous sense of national responsibility. 
                  TPF Aid is conceived as a <strong>deshbhakt humanitarian initiative</strong>, rooted in the belief 
                  that service to Indian citizens and protection of national interests are inseparable duties.
                </p>
              </div>
            </div>
          </section>

          {/* Policy 2: Exclusive Service to Indians */}
          <section>
            <div className="flex items-start gap-4 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-amber-600 text-white rounded-full font-bold text-xl flex-shrink-0">
                2
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-6 h-6 text-amber-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Exclusive Service to Indian Nationals</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  TPF Aid functions exclusively for the welfare, relief, and upliftment of <strong>Indian nationals 
                  within the territory of India</strong>. All humanitarian assistance, relief measures, and welfare 
                  interventions are directed solely towards addressing the needs of Indian citizens and communities. 
                  The platform is designed to strengthen social resilience, compassion, and mutual support among 
                  Indians, ensuring that resources mobilized contribute directly to national well-being and social stability.
                </p>
              </div>
            </div>
          </section>

          {/* Policy 3: National Interest Framework */}
          <section>
            <div className="flex items-start gap-4 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-amber-600 text-white rounded-full font-bold text-xl flex-shrink-0">
                3
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-6 h-6 text-amber-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Humanitarianism Guided by National Interest</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  While TPF Aid is humanitarian in nature, its humanitarianism is consciously guided by national interest. 
                  The Foundation believes that genuine humanitarian work must reinforce the nation's internal harmony, 
                  social cohesion, and constitutional order. Assistance is provided to relieve human suffering and promote 
                  dignity, while ensuring that such assistance does not undermine public order, national security, or the 
                  unity and integrity of India. This balance reflects India's civilizational values of compassion combined 
                  with responsibility.
                </p>
              </div>
            </div>
          </section>

          {/* Policy 4: Constitutional Equality */}
          <section>
            <div className="flex items-start gap-4 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-amber-600 text-white rounded-full font-bold text-xl flex-shrink-0">
                4
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Scale className="w-6 h-6 text-amber-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Strict Adherence to Constitutional Equality</h2>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-600 p-5 rounded-r-lg mb-4">
                  <p className="font-semibold text-blue-900 mb-2">
                    We strictly adhere to Articles 14, 15, and 21 of the Constitution of India
                  </p>
                  <p className="text-gray-700">
                    Guaranteeing equality before law and dignity of life for all Indian nationals.
                  </p>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  TPF Aid <strong>does not discriminate</strong> among Indian nationals on the basis of religion, caste, 
                  creed, community, language, gender, region, or socio-economic background. Assistance is determined 
                  solely on humanitarian need and vulnerability. This policy strengthens constitutional fraternity and 
                  ensures that welfare efforts unify rather than divide Indian society.
                </p>
              </div>
            </div>
          </section>

          {/* Policy 5: Secular & Neutral Operation */}
          <section>
            <div className="flex items-start gap-4 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-amber-600 text-white rounded-full font-bold text-xl flex-shrink-0">
                5
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="w-6 h-6 text-amber-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Secular and Neutral Manner</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  TPF Aid operates in a secular and neutral manner, respecting all faiths and cultural traditions that 
                  form the pluralistic fabric of India. However, neutrality does not imply indifference to national values. 
                  The Foundation remains unequivocally loyal to the Constitution of India and does not support, endorse, 
                  or associate with any ideology, group, or activity that seeks to weaken the sovereignty, unity, or 
                  integrity of the nation.
                </p>
              </div>
            </div>
          </section>

          {/* Policy 6: Zero Tolerance */}
          <section>
            <div className="flex items-start gap-4 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-red-600 text-white rounded-full font-bold text-xl flex-shrink-0">
                6
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-6 h-6 text-red-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Zero-Tolerance Policy</h2>
                </div>
                <div className="bg-red-50 border-2 border-red-600 p-5 rounded-lg">
                  <p className="text-gray-700 leading-relaxed mb-3">
                    True Path Foundation maintains a <strong>zero-tolerance policy</strong> towards individuals, groups, 
                    or entities that pose a threat to national security, public order, or constitutional governance.
                  </p>
                  <p className="text-gray-700 leading-relaxed font-semibold">
                    TPF Aid does not, directly or indirectly, provide assistance, resources, visibility, or support to 
                    any person or organization involved in unlawful, anti-national, extremist, or secessionist activities.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Policy 7: No Foreign Funding */}
          <section>
            <div className="flex items-start gap-4 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-amber-600 text-white rounded-full font-bold text-xl flex-shrink-0">
                7
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Flag className="w-6 h-6 text-amber-600" />
                  <h2 className="text-2xl font-bold text-gray-900">No Foreign Contributions</h2>
                </div>
                <div className="bg-red-50 border-l-4 border-red-600 p-5 rounded-r-lg">
                  <p className="text-gray-700 leading-relaxed mb-3">
                    True Path Foundation categorically affirms that it <strong>does not receive, solicit, or accept 
                    funds, resources, donations, or assistance</strong> of any nature from foreign nationals, foreign 
                    entities, foreign institutions, or foreign sources.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    TPF Aid operates entirely on domestic resources raised in compliance with Indian laws. The Foundation 
                    is not registered for, nor does it engage in, any activity involving foreign contributions, thereby 
                    ensuring complete insulation from foreign influence and alignment with national policy, sovereignty, 
                    and security considerations.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Policy 8: Lawful Sources */}
          <section>
            <div className="flex items-start gap-4 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-amber-600 text-white rounded-full font-bold text-xl flex-shrink-0">
                8
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-6 h-6 text-amber-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Lawful and Transparent Sources</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  All resources for TPF Aid are sourced through <strong>lawful, transparent, and verifiable means</strong> within 
                  India. The Foundation exercises due diligence to ensure that contributions do not originate from unlawful 
                  activities, prohibited sources, or entities inimical to national interest. Acceptance and utilization of 
                  funds are governed by applicable Indian financial, taxation, and regulatory laws, reinforcing institutional 
                  integrity and public confidence.
                </p>
              </div>
            </div>
          </section>

          {/* Policy 9: Fund Utilization */}
          <section>
            <div className="flex items-start gap-4 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-amber-600 text-white rounded-full font-bold text-xl flex-shrink-0">
                9
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="w-6 h-6 text-amber-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Strict Fund Utilization</h2>
                </div>
                <div className="bg-green-50 border-l-4 border-green-600 p-5 rounded-r-lg">
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Funds mobilized under TPF Aid are utilized strictly for <strong>humanitarian and welfare purposes 
                    benefiting Indian nationals</strong>.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    No funds are diverted for political activity, personal enrichment, or any purpose inconsistent with 
                    public interest or national security. Utilization decisions are guided by necessity, urgency, and 
                    social impact, ensuring that every rupee contributes meaningfully to lawful welfare objectives.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Policy 10: Governance Structure */}
          <section>
            <div className="flex items-start gap-4 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-amber-600 text-white rounded-full font-bold text-xl flex-shrink-0">
                10
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Scale className="w-6 h-6 text-amber-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Independent and Ethical Governance</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  True Path Foundation is governed through an independent and ethical governance structure committed to 
                  accountability, transparency, and national loyalty. Decision-making processes are insulated from personal, 
                  political, or external influence. Office bearers and functionaries act as custodians of public trust and 
                  national values, ensuring that the Foundation remains credible, disciplined, and aligned with the rule of law.
                </p>
              </div>
            </div>
          </section>

          {/* Policy 11: Transparency & Cooperation */}
          <section>
            <div className="flex items-start gap-4 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-amber-600 text-white rounded-full font-bold text-xl flex-shrink-0">
                11
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="w-6 h-6 text-amber-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Transparency & Cooperation</h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The Foundation maintains accurate records of financial transactions, activities, and decisions, subject 
                  to audit and lawful inspection by competent authorities. TPF Aid remains fully cooperative with government 
                  departments, regulatory bodies, and lawful inquiries.
                </p>
                <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
                  <p className="text-gray-700 italic">
                    Transparency is viewed not merely as a legal requirement but as a <strong>patriotic duty</strong> owed 
                    to the people and institutions of India.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Policy 12: Beneficiary Dignity */}
          <section>
            <div className="flex items-start gap-4 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-amber-600 text-white rounded-full font-bold text-xl flex-shrink-0">
                12
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="w-6 h-6 text-amber-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Beneficiary Dignity & Empowerment</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  TPF Aid upholds the dignity, privacy, and self-respect of beneficiaries, ensuring that assistance is 
                  provided in a manner that fosters <strong>empowerment rather than dependency</strong>. The Foundation 
                  consciously avoids actions that may create social discord, mistrust, or division, and instead works to 
                  strengthen national harmony and mutual respect among citizens.
                </p>
              </div>
            </div>
          </section>

          {/* Policy 13: Deshbhakt Declaration */}
          <section>
            <div className="flex items-start gap-4 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-amber-600 text-white rounded-full font-bold text-xl flex-shrink-0">
                13
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Flag className="w-6 h-6 text-amber-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Deshbhakt Declaration</h2>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-amber-400 p-6 rounded-lg">
                  <p className="text-gray-700 leading-relaxed mb-3">
                    True Path Foundation declares that TPF Aid is <strong>deshbhakt in nature</strong>, guided by love 
                    for the nation, respect for its Constitution, and faith in its democratic institutions.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    The Foundation considers itself accountable to the people of India and committed to safeguarding 
                    national interest alongside humanitarian service. Service rendered through TPF Aid is an expression 
                    of <strong>civic duty, national pride, and constitutional responsibility</strong>.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Policy 14: Periodic Review */}
          <section>
            <div className="flex items-start gap-4 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-amber-600 text-white rounded-full font-bold text-xl flex-shrink-0">
                14
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-6 h-6 text-amber-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Periodic Review & Compliance</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  This policy shall be periodically reviewed to ensure continued compliance with Indian laws, evolving 
                  regulatory frameworks, and national security considerations. Any amendment shall be guided by 
                  constitutional values, government advisories, and the overriding objective of serving India and its 
                  people responsibly.
                </p>
              </div>
            </div>
          </section>

          {/* Closing Statement */}
          <section className="bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 p-8 rounded-xl border-2 border-amber-300">
            <div className="flex items-center justify-center mb-6">
              <Flag className="w-16 h-16 text-amber-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
              Jai Hind. Jai Bharat.
            </h2>
            <p className="text-gray-700 text-center leading-relaxed text-lg">
              True Path Foundation is proud to serve the people of India with unwavering commitment to 
              constitutional values, national integrity, and humanitarian compassion. Our policies reflect 
              our deep respect for the Republic of India and our dedication to transparent, ethical, and 
              nation-first service.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}