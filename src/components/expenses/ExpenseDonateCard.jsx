import { useState, useEffect, useRef } from "react";
import {
  Shield, BadgeCheck, Lock, Clock, Calendar, CalendarDays,
  Target, User, Mail, Phone, Sparkles, ShieldCheck, AlertCircle,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useAppToast } from "@/app/AppToastContext";
import { useSoftSignupMutation } from "@/utils/slices/authApiSlice";

const PERIODS = [
  {
    key: "daily",
    label: "Daily",
    Icon: Clock,
    amount: 3290,
    sub: "keeps us running for 24 hours",
    emotion: "One day of hope, powered by you.",
  },
  {
    key: "weekly",
    label: "Weekly",
    Icon: Calendar,
    amount: 23030,
    sub: "powers a full week of operations",
    emotion: "Seven days of change, because of you.",
  },
  {
    key: "monthly",
    label: "Monthly",
    Icon: CalendarDays,
    amount: 98700,
    sub: "sustains the full team for a month",
    emotion: "A month of impact — your legacy.",
  },
  {
    key: "yearly",
    label: "Annually",
    Icon: Target,
    amount: 120000,
    sub: "funds the entire year of operations",
    emotion: "A full year of lives transformed.",
  },
];

const QUICK_AMOUNTS = [50, 100, 500, 1000, 2100, 5000];

function fmtFull(n) {
  return `₹${n.toLocaleString("en-IN")}`;
}

export default function ExpenseDonateCard({
  darkMode,
  campaignId,
  zakatVerified  = false,
  taxEligible    = false,
  ribaEligible   = false,
  sadaqahEligible = true,
  lillahEligible  = true,
  imdadEligible   = true,
}) {
  const DONATION_TYPES = [
    { id: "SADAQAH", label: "Sadaqah", enabled: sadaqahEligible },
    { id: "LILLAH",  label: "Lillah",  enabled: lillahEligible  },
    { id: "IMDAD",   label: "Imdad",   enabled: imdadEligible   },
    { id: "ZAKAAT",  label: "Zakat",   enabled: zakatVerified   },
    { id: "RIBA",    label: "RIBA",    enabled: ribaEligible    },
  ];

  const defaultType = DONATION_TYPES.find((t) => t.enabled)?.id ?? "SADAQAH";

  const [activePeriod, setActivePeriod]   = useState("monthly");
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount]   = useState("");
  const [showCustom, setShowCustom]       = useState(false);
  const [donationType, setDonationType]   = useState(defaultType);

  const [fullName, setFullName] = useState("");
  const [email, setEmail]       = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [userId, setUserId]     = useState(null);

  const [isDonating, setIsDonating]   = useState(false);
  const [cashfreeData, setCashfreeData] = useState(null);
  const checkoutStartedRef = useRef(false);

  const userInfo     = useSelector((state) => state.auth?.userInfo);
  const { showToast } = useAppToast?.() ?? { showToast: () => {} };
  const [softSignup]  = useSoftSignupMutation?.() ?? [async () => {}];

  const sel = PERIODS.find((p) => p.key === activePeriod);
  const dk  = darkMode;

  // Re-default donation type if current selection becomes disabled
  useEffect(() => {
    const current = DONATION_TYPES.find((t) => t.id === donationType);
    if (!current?.enabled) {
      const fallback = DONATION_TYPES.find((t) => t.enabled);
      if (fallback) setDonationType(fallback.id);
    }
  }, [zakatVerified, ribaEligible, sadaqahEligible, lillahEligible, imdadEligible]);

  useEffect(() => {
    if (userInfo) {
      setFullName(userInfo.fullName || "");
      setEmail(userInfo.email || "");
      setMobileNo(userInfo.mobileNo || "");
      setUserId(userInfo._id || userInfo.userId);
    }
  }, [userInfo]);

  const baseAmount =
    selectedAmount === "period"
      ? sel.amount
      : selectedAmount
      ? selectedAmount
      : customAmount
      ? parseInt(customAmount) || 0
      : 0;

  const handlePeriodSelect = (key) => {
    setActivePeriod(key);
    setSelectedAmount("period");
    setCustomAmount("");
    setShowCustom(false);
  };

  const handleQuickSelect = (amt) => {
    setSelectedAmount(amt);
    setCustomAmount("");
    setShowCustom(false);
  };

  const handleIdentifyUser = async () => {
    const result = await softSignup({ fullName, email, mobileNo }).unwrap();
    if (result?.data?.userId) return result.data.userId;
    throw new Error("Unable to identify user");
  };

  const handleDonate = async () => {
    if (isDonating) return;
    const amount = baseAmount;
    if (!amount || amount < 50) {
      showToast({ title: "Minimum Amount", message: "The minimum donation amount is ₹50.", type: "error" });
      return;
    }
    if (!userInfo) {
      if (!fullName.trim()) {
        showToast({ title: "Name Required", message: "Please enter your full name.", type: "error" });
        return;
      }
      if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast({ title: "Valid Email Required", message: "Please enter a valid email address.", type: "error" });
        return;
      }
      if (!mobileNo.trim() || !/^\d{10}$/.test(mobileNo)) {
        showToast({ title: "Valid Mobile Required", message: "Please enter a valid 10-digit mobile number.", type: "error" });
        return;
      }
    }

    setIsDonating(true);
    try {
      let userIdToUse = userId;
      if (!userIdToUse && !userInfo) {
        userIdToUse = await handleIdentifyUser();
        setUserId(userIdToUse);
      }
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/donations/initiate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          amount,
          tipAmount: 0,
          campaignId,
          donationType,
          isAnonymous: false,
          isTaxEligible: false,
          userId: userIdToUse,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data?.cashfree?.paymentSessionId) {
        throw new Error(data?.message || "Unable to initiate payment");
      }
      setCashfreeData(data.cashfree);
    } catch (err) {
      showToast({ title: "Error", message: err.message || "Failed to initiate donation.", type: "error" });
    } finally {
      setIsDonating(false);
    }
  };

  useEffect(() => {
    if (!cashfreeData?.paymentSessionId) return;
    if (checkoutStartedRef.current) return;
    checkoutStartedRef.current = true;
    const startCheckout = () => {
      const cashfree = new window.Cashfree({ mode: process.env.NEXT_PUBLIC_CASHFREE_MODE || "sandbox" });
      cashfree.checkout({ paymentSessionId: cashfreeData.paymentSessionId, redirectTarget: "_self" });
    };
    if (window.Cashfree) { startCheckout(); return; }
    const script = document.createElement("script");
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.async = true;
    script.onload = startCheckout;
    document.body.appendChild(script);
    return () => { if (document.body.contains(script)) document.body.removeChild(script); };
  }, [cashfreeData]);

  const inputCls = `w-full h-10 pl-9 pr-3 text-sm rounded-lg font-medium focus:outline-none transition-colors border ${
    dk
      ? "bg-zinc-800/80 border-zinc-700 text-white placeholder-zinc-500 focus:border-emerald-500"
      : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/10"
  }`;

  return (
    <div
      className={`rounded-2xl border overflow-hidden sticky top-24 ${
        dk ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100 shadow-xl shadow-gray-100/80"
      }`}
    >
      {/* Header strip */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-4">
        <p className="text-emerald-100 text-[11px] font-semibold uppercase tracking-widest">
          Real cost breakdown
        </p>
        <p className="text-white font-bold text-lg leading-tight mt-0.5">
          What does it cost to keep us running?
        </p>
        <p className="text-emerald-100/80 text-xs mt-1 leading-relaxed">
          Every rupee goes directly to operations — no middlemen, no overhead waste.
        </p>
      </div>

      <div className="p-5 space-y-5">
        {/* Period tabs */}
        <div>
          <p className={`text-[11px] font-semibold uppercase tracking-widest mb-2.5 ${dk ? "text-gray-500" : "text-gray-400"}`}>
            See the cost per period
          </p>
          <div className="grid grid-cols-4 gap-1.5">
            {PERIODS.map(({ key, label, Icon: PIcon }) => {
              const isActive = activePeriod === key && selectedAmount === "period";
              return (
                <button
                  key={key}
                  onClick={() => handlePeriodSelect(key)}
                  className={`flex flex-col items-center cursor-pointer gap-1 py-2.5 rounded-xl text-[11px] font-semibold border transition-all ${
                    isActive
                      ? "bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/25"
                      : dk
                      ? "bg-gray-800 text-gray-400 border-gray-700 hover:border-emerald-700"
                      : "bg-gray-50 text-gray-500 border-gray-200 hover:border-emerald-300"
                  }`}
                >
                  <PIcon size={13} />
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected period amount display */}
        <div className={`rounded-xl p-4 text-center transition-all ${dk ? "bg-gray-800" : "bg-emerald-50"}`}>
          <p className={`text-3xl font-bold tracking-tight ${dk ? "text-white" : "text-gray-900"}`}>
            {fmtFull(sel.amount)}
          </p>
          <p className={`text-xs mt-1 font-medium ${dk ? "text-gray-400" : "text-emerald-700"}`}>
            {sel.sub}
          </p>
          <p className={`text-[11px] mt-2 italic ${dk ? "text-gray-500" : "text-gray-500"}`}>
            "{sel.emotion}"
          </p>
          <button
            onClick={() => handlePeriodSelect(activePeriod)}
            className={`mt-3 px-4 py-1.5 rounded-full cursor-pointer text-xs font-bold border transition-all ${
              selectedAmount === "period"
                ? "bg-emerald-500 text-white border-emerald-500"
                : dk
                ? "border-emerald-600 text-emerald-400 hover:bg-emerald-950/40"
                : "border-emerald-400 text-emerald-700 hover:bg-emerald-50"
            }`}
          >
            {selectedAmount === "period" ? "✓ Selected" : `Donate ${fmtFull(sel.amount)}`}
          </button>
        </div>

        {/* Divider */}
        <div className={`border-t border-dashed ${dk ? "border-gray-800" : "border-gray-200"}`} />

        {/* Quick donate amounts */}
        <div>
          <p className={`text-[11px] font-semibold uppercase tracking-widest mb-2.5 ${dk ? "text-gray-500" : "text-gray-400"}`}>
            Or choose a quick amount
          </p>
          <div className="grid grid-cols-3 gap-2">
            {QUICK_AMOUNTS.map((amt) => {
              const isActive = selectedAmount === amt;
              return (
                <button
                  key={amt}
                  onClick={() => handleQuickSelect(amt)}
                  className={`py-2.5 rounded-xl text-sm cursor-pointer font-bold border transition-all ${
                    isActive
                      ? "bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/20"
                      : dk
                      ? "bg-gray-800 border-gray-700 text-gray-300 hover:border-emerald-600 hover:text-emerald-400"
                      : "bg-gray-50 border-gray-200 text-gray-700 hover:border-emerald-400 hover:bg-emerald-50"
                  }`}
                >
                  {fmtFull(amt)}
                </button>
              );
            })}
          </div>

          {/* Custom amount */}
          <button
            onClick={() => {
              setShowCustom((v) => !v);
              setSelectedAmount(null);
              setCustomAmount("");
            }}
            className={`mt-2 w-full py-2.5 rounded-xl cursor-pointer text-sm font-bold border transition-all ${
              showCustom
                ? dk
                  ? "bg-emerald-950/40 border-emerald-600 text-emerald-400"
                  : "bg-emerald-50 border-emerald-400 text-emerald-700"
                : dk
                ? "bg-gray-800 border-gray-700 text-gray-400 hover:border-emerald-700"
                : "bg-gray-50 border-gray-200 text-gray-500 hover:border-emerald-300"
            }`}
          >
            {showCustom ? "Enter Custom Amount ↓" : "+ Enter Custom Amount"}
          </button>
          {showCustom && (
            <div className="mt-2 relative">
              <span className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold pointer-events-none ${dk ? "text-zinc-400" : "text-gray-400"}`}>
                ₹
              </span>
              <input
                type="number"
                placeholder="Enter amount"
                value={customAmount}
                autoFocus
                min={50}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(null);
                }}
                className={`w-full h-10 pl-7 pr-3 text-sm rounded-lg font-semibold focus:outline-none border transition-colors ${
                  dk
                    ? "bg-zinc-800 border-zinc-600 focus:border-emerald-500 text-white placeholder-zinc-500"
                    : "bg-white border-gray-200 focus:border-emerald-400 text-gray-900 placeholder-gray-400"
                }`}
              />
            </div>
          )}
        </div>

        {/* Selected amount summary */}
        {baseAmount > 0 && (
          <div className={`px-3 py-2.5 rounded-lg flex items-center justify-between ${
            dk ? "bg-zinc-800/50 border border-zinc-700/50" : "bg-gray-50 border border-gray-100"
          }`}>
            <span className={`text-xs font-medium ${dk ? "text-zinc-400" : "text-gray-500"}`}>
              Donation amount
            </span>
            {baseAmount >= 50 ? (
              <span className={`text-sm font-extrabold ${dk ? "text-emerald-400" : "text-emerald-600"}`}>
                {fmtFull(baseAmount)}
              </span>
            ) : (
              <span className="text-xs font-semibold text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> Min. ₹50
              </span>
            )}
          </div>
        )}

        {/* Divider */}
        <div className={`border-t border-dashed ${dk ? "border-gray-800" : "border-gray-200"}`} />

        {/* Donation Type selector */}
        <div>
          <p className={`text-[11px] font-semibold uppercase tracking-widest mb-2.5 ${dk ? "text-gray-500" : "text-gray-400"}`}>
            Donation Type
          </p>
          <div className="flex flex-wrap gap-1.5">
            {DONATION_TYPES.map(({ id, label, enabled }) => {
              const isActive = donationType === id;
              return (
                <button
                  key={id}
                  onClick={() => enabled && setDonationType(id)}
                  disabled={!enabled}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs font-semibold transition-colors ${
                    !enabled
                      ? "opacity-40 cursor-not-allowed " + (dk
                          ? "border-zinc-700 bg-zinc-800/60 text-zinc-500"
                          : "border-gray-200 bg-gray-50 text-gray-400")
                      : isActive
                        ? dk
                          ? "border-emerald-500 bg-emerald-950/40 text-emerald-400"
                          : "border-emerald-600 bg-emerald-50 text-emerald-700"
                        : dk
                          ? "border-zinc-700 bg-zinc-800/60 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200"
                          : "border-gray-200 bg-white text-gray-600 hover:border-emerald-300 hover:text-gray-900"
                  }`}
                >
                  {!enabled && <Lock size={10} className="flex-shrink-0" />}
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className={`border-t border-dashed ${dk ? "border-gray-800" : "border-gray-200"}`} />

        {/* Guest Details */}
        {!userInfo && (
          <div className="space-y-2.5">
            <p className={`text-[11px] font-semibold uppercase tracking-widest ${dk ? "text-gray-500" : "text-gray-400"}`}>
              Your Details
            </p>
            <div className="relative">
              <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${dk ? "text-zinc-500" : "text-gray-400"}`} />
              <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputCls} />
            </div>
            <div className="relative">
              <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${dk ? "text-zinc-500" : "text-gray-400"}`} />
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
            </div>
            <div className="relative">
              <Phone className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${dk ? "text-zinc-500" : "text-gray-400"}`} />
              <input
                type="tel"
                placeholder="Mobile (10 digits)"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value.replace(/\D/g, "").slice(0, 10))}
                maxLength={10}
                className={inputCls}
              />
            </div>
          </div>
        )}

        {/* Emotional statement */}
        <div className={`rounded-xl px-4 py-3 text-center ${
          dk ? "bg-emerald-950/30 border border-emerald-900/40" : "bg-emerald-50 border border-emerald-100"
        }`}>
          <p className={`text-xs leading-relaxed font-medium ${dk ? "text-emerald-300/80" : "text-emerald-800"}`}>
            💚 Without your support, the lights go out. Every campaign, every cause, every family we help — it all rests on people like you choosing to act.
          </p>
        </div>

        {/* Main CTA */}
        <button
          onClick={handleDonate}
          disabled={isDonating || baseAmount < 50}
          className={`
            w-full py-4 rounded-xl font-bold text-base cursor-pointer transition-all flex items-center justify-center gap-2
            ${isDonating
              ? "bg-emerald-600 text-white cursor-wait"
              : baseAmount >= 50
              ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg shadow-emerald-500/25 active:scale-[0.98]"
              : dk
              ? "bg-zinc-800 text-gray-600 cursor-not-allowed border border-zinc-700"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"}
          `}
        >
          {isDonating ? (
            <>
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v0C5.373 4 0 8.373 0 12h4z" />
              </svg>
              Processing…
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              {baseAmount === 0
                ? "Select an Amount"
                : baseAmount < 50
                ? "Minimum ₹50 Required"
                : `Donate ${fmtFull(baseAmount)} as ${DONATION_TYPES.find((t) => t.id === donationType)?.label}`}
            </>
          )}
        </button>

        {/* Trust row */}
        <div className={`flex items-center justify-between pt-1 border-t ${dk ? "border-gray-800" : "border-gray-100"}`}>
          {[
            { Icon: Shield,    text: "Secure"      },
            { Icon: BadgeCheck, text: "Verified NGO" },
            { Icon: Lock,      text: "Encrypted"   },
          ].map(({ Icon: TIcon, text }) => (
            <div key={text} className={`flex items-center gap-1 text-[11px] ${dk ? "text-gray-500" : "text-gray-400"}`}>
              <TIcon size={11} className="text-emerald-500" />
              {text}
            </div>
          ))}
        </div>

        <div className={`flex items-center justify-center gap-1.5 ${dk ? "text-zinc-600" : "text-gray-400"}`}>
          <ShieldCheck className="w-3.5 h-3.5" />
          <span className="text-xs font-medium">Secure payment · Receipt via email</span>
        </div>
      </div>
    </div>
  );
}