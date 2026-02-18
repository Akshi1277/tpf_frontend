"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import {
  ArrowLeft, ArrowRight, Building2, Mail,
  RotateCcw, ShieldCheck, Users, BarChart3, Sparkles
} from "lucide-react"

const fadeSlide = (dir = 1) => ({
  initial: { opacity: 0, x: dir * 28, filter: "blur(4px)" },
  animate: { opacity: 1, x: 0, filter: "blur(0px)" },
  exit:    { opacity: 0, x: dir * -28, filter: "blur(4px)" },
  transition: { duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] },
})

const stagger = {
  animate: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } }
}
const item = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } }
}

function Spinner() {
  return (
    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
  )
}

const STATS = [
  { icon: Users,       label: "Organizations", value: "2,400+" },
  { icon: BarChart3,   label: "Campaigns Run",  value: "18,000+" },
  { icon: ShieldCheck, label: "Verified NGOs",  value: "99.2%" },
]

export default function DesktopOrgLogin({
  darkMode, step, email, setEmail, otp, setOtp,
  handleLogin, handleOtpSubmit, setStep, sendingOtp, verifyingOtp,
}) {
  const inputRefs = useRef([])
  const [otpDigits, setOtpDigits] = useState(["", "", "", ""])
  const [focused, setFocused] = useState(false)
  const dm = darkMode

  useEffect(() => { setOtp(otpDigits.join("")) }, [otpDigits])
  useEffect(() => {
    if (step === 2) setTimeout(() => inputRefs.current[0]?.focus(), 150)
  }, [step])

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return
    const next = [...otpDigits]
    next[index] = value.slice(-1)
    setOtpDigits(next)
    if (value && index < 3) inputRefs.current[index + 1]?.focus()
  }
  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0)
      inputRefs.current[index - 1]?.focus()
  }
  const handleOtpPaste = (e) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4)
    const next = ["", "", "", ""]
    pasted.split("").forEach((ch, i) => (next[i] = ch))
    setOtpDigits(next)
    inputRefs.current[Math.min(pasted.length, 3)]?.focus()
  }

  return (
    <div className="hidden lg:grid lg:grid-cols-[52%_48%] min-h-screen w-full pt-16">

      {/* ══════════════════════════════
          LEFT — Brand / Info Panel
      ══════════════════════════════ */}
      <div className={`relative flex flex-col justify-between overflow-hidden px-16 py-14 ${
        dm ? "bg-zinc-900" : "bg-[#f7f7f6]"
      }`}>

        {/* Ambient blobs — subtle, not cheap */}
        <div className={`pointer-events-none absolute -top-48 -right-48 h-[640px] w-[640px] rounded-full ${
          dm ? "bg-emerald-900/20" : "bg-emerald-100/60"
        }`} style={{ filter: "blur(100px)" }} />
        <div className={`pointer-events-none absolute -bottom-32 -left-32 h-[480px] w-[480px] rounded-full ${
          dm ? "bg-teal-900/15" : "bg-teal-50/80"
        }`} style={{ filter: "blur(90px)" }} />

        {/* Fine dot texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage: `radial-gradient(${dm ? "#fff" : "#000"} 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />

        {/* ── Logo ── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-10 flex items-center gap-3"
        >
          <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${
            dm ? "bg-emerald-500" : "bg-emerald-600"
          }`}>
            <Building2 className="h-4 w-4 text-white" strokeWidth={1.8} />
          </div>
          <span className={`text-sm font-semibold tracking-tight ${dm ? "text-white" : "text-zinc-900"}`}>
            OrgPortal
          </span>
        </motion.div>

        {/* ── Hero Copy ── */}
        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="relative z-10 space-y-7"
        >
          <motion.div variants={item} className="space-y-1">
            <div className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold tracking-[0.14em] uppercase ${
              dm
                ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                : "border-emerald-200 bg-emerald-50 text-emerald-700"
            }`}>
              <Sparkles className="h-2.5 w-2.5" />
              Organization Portal
            </div>
          </motion.div>

          <motion.h1
            variants={item}
            className={`text-[3.4rem] font-bold leading-[1.04] tracking-[-0.02em] ${
              dm ? "text-white" : "text-zinc-900"
            }`}
          >
            Manage your<br />
            organization<br />
            <span className={`italic ${dm ? "text-emerald-400" : "text-emerald-600"}`}>
              seamlessly.
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className={`max-w-[300px] text-sm leading-[1.75] ${dm ? "text-zinc-400" : "text-zinc-500"}`}
          >
            Secure OTP-based login for verified organizations. Access dashboards, manage campaigns, and track real-world impact.
          </motion.p>

          {/* ── Stats Row ── */}
          <motion.div variants={item} className="flex items-center gap-5 pt-1">
            {STATS.map(({ icon: Icon, label, value }) => (
              <div key={label} className={`group flex flex-col gap-0.5 rounded-2xl border px-4 py-3 ${
                dm
                  ? "border-zinc-800 bg-zinc-800/50"
                  : "border-zinc-200/80 bg-white"
              }`}>
                <div className="flex items-center gap-1.5">
                  <Icon className={`h-3 w-3 ${dm ? "text-emerald-400" : "text-emerald-600"}`} strokeWidth={2} />
                  <span className={`text-[10px] font-medium uppercase tracking-wider ${
                    dm ? "text-zinc-500" : "text-zinc-400"
                  }`}>{label}</span>
                </div>
                <span className={`text-lg font-bold tracking-tight ${dm ? "text-white" : "text-zinc-900"}`}>
                  {value}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Footer note ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className={`relative z-10 text-xs ${dm ? "text-zinc-600" : "text-zinc-400"}`}
        >
          Only verified organizations can access this portal.
        </motion.p>
      </div>

      {/* ══════════════════════════════
          RIGHT — Form Panel
      ══════════════════════════════ */}
      <div className={`relative flex flex-col items-center justify-center px-16 py-14 ${
        dm ? "bg-zinc-950" : "bg-white"
      }`}>

        {/* Step dots — top right */}
        <div className="absolute right-14 top-8 flex items-center gap-2">
          {[1, 2].map((s) => (
            <motion.div
              key={s}
              animate={{
                width: s === step ? 24 : 8,
                backgroundColor: s <= step
                  ? dm ? "#10b981" : "#059669"
                  : dm ? "#27272a" : "#e4e4e7",
              }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="h-2 rounded-full"
            />
          ))}
        </div>

        <div className="w-full max-w-[360px]">
          <AnimatePresence mode="wait">

            {/* ─────────── STEP 1 ─────────── */}
            {step === 1 && (
              <motion.div key="d-s1" {...fadeSlide(1)} className="space-y-8">

                {/* Heading */}
                <motion.div
                  variants={stagger} initial="initial" animate="animate"
                  className="space-y-1.5"
                >
                  <motion.h2 variants={item} className={`text-[1.6rem] font-bold tracking-tight ${
                    dm ? "text-white" : "text-zinc-900"
                  }`}>
                    Organization Login
                  </motion.h2>
                  <motion.p variants={item} className={`text-sm ${dm ? "text-zinc-400" : "text-zinc-500"}`}>
                    Enter your registered organization email to continue
                  </motion.p>
                </motion.div>

                {/* Email field */}
                <motion.div
                  variants={stagger} initial="initial" animate="animate"
                  className="space-y-2"
                >
                  <motion.label variants={item} className={`block text-[11px] font-semibold uppercase tracking-[0.12em] ${
                    dm ? "text-zinc-400" : "text-zinc-500"
                  }`}>
                    Organization Email
                  </motion.label>

                  <motion.div
                    variants={item}
                    animate={focused
                      ? { boxShadow: dm ? "0 0 0 3px rgba(16,185,129,0.15)" : "0 0 0 3px rgba(5,150,105,0.1)" }
                      : { boxShadow: "0 0 0 0px rgba(0,0,0,0)" }
                    }
                    className={`flex items-center gap-3 rounded-2xl border px-4 py-3.5 transition-colors duration-200 ${
                      focused
                        ? dm ? "border-emerald-500 bg-zinc-900" : "border-emerald-500 bg-white"
                        : dm ? "border-zinc-800 bg-zinc-900" : "border-zinc-200 bg-zinc-50"
                    }`}
                  >
                    <Mail className={`h-4 w-4 flex-shrink-0 transition-colors duration-200 ${
                      focused
                        ? dm ? "text-emerald-400" : "text-emerald-600"
                        : dm ? "text-zinc-500" : "text-zinc-400"
                    }`} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocused(true)}
                      onBlur={() => setFocused(false)}
                      onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                      placeholder="org@example.com"
                      className={`flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500 ${
                        dm ? "text-white" : "text-zinc-900"
                      }`}
                    />
                  </motion.div>
                </motion.div>

                {/* CTA */}
                <motion.button
                  variants={item}
                  initial="initial" animate="animate"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLogin}
                  disabled={sendingOtp || !email.includes("@")}
                  className={`group relative w-full overflow-hidden rounded-2xl py-3.5 text-sm font-semibold text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40 ${
                    dm ? "bg-emerald-500 hover:bg-emerald-400" : "bg-emerald-600 hover:bg-emerald-700"
                  }`}
                >
                  {/* Shimmer */}
                  <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/10 transition-transform duration-700 group-hover:translate-x-full" />
                  <span className="relative flex items-center justify-center gap-2">
                    {sendingOtp ? <Spinner /> : (
                      <>Send OTP <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" /></>
                    )}
                  </span>
                </motion.button>

                <motion.p
                  variants={item} initial="initial" animate="animate"
                  className={`text-center text-xs ${dm ? "text-zinc-600" : "text-zinc-400"}`}
                >
                  OTP will be sent to your organization's registered email address.
                </motion.p>
              </motion.div>
            )}

            {/* ─────────── STEP 2 ─────────── */}
            {step === 2 && (
              <motion.div key="d-s2" {...fadeSlide(1)} className="space-y-8">

                <motion.div
                  variants={stagger} initial="initial" animate="animate"
                  className="space-y-1.5"
                >
                  <motion.button
                    variants={item}
                    onClick={() => { setStep(1); setOtpDigits(["","","",""]); }}
                    whileHover={{ x: -2 }}
                    className={`mb-3 flex items-center gap-1.5 text-xs font-medium transition-colors ${
                      dm ? "text-zinc-500 hover:text-zinc-200" : "text-zinc-400 hover:text-zinc-700"
                    }`}
                  >
                    <ArrowLeft className="h-3.5 w-3.5" /> Back
                  </motion.button>

                  <motion.h2 variants={item} className={`text-[1.6rem] font-bold tracking-tight ${
                    dm ? "text-white" : "text-zinc-900"
                  }`}>
                    Check your inbox
                  </motion.h2>
                  <motion.p variants={item} className={`text-sm ${dm ? "text-zinc-400" : "text-zinc-500"}`}>
                    We sent a 4-digit code to{" "}
                    <span className={`font-medium ${dm ? "text-zinc-100" : "text-zinc-800"}`}>{email}</span>
                  </motion.p>
                </motion.div>

                {/* OTP Inputs */}
                <motion.div
                  variants={stagger} initial="initial" animate="animate"
                  className="space-y-6"
                >
                  <motion.div variants={item} className="flex gap-3" onPaste={handleOtpPaste}>
                    {otpDigits.map((digit, i) => (
                      <motion.input
                        key={i}
                        ref={(el) => (inputRefs.current[i] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(i, e)}
                        animate={digit
                          ? { scale: [1, 1.06, 1], transition: { duration: 0.18 } }
                          : { scale: 1 }
                        }
                        className={`aspect-square w-full rounded-2xl border-2 text-center text-xl font-bold outline-none transition-all duration-150 focus:ring-2 ${
                          dm
                            ? `bg-zinc-900 text-white ${
                                digit
                                  ? "border-emerald-500 bg-zinc-900 focus:ring-emerald-500/15"
                                  : "border-zinc-800 focus:border-emerald-500 focus:ring-emerald-500/10"
                              }`
                            : `bg-zinc-50 text-zinc-900 ${
                                digit
                                  ? "border-emerald-500 bg-white focus:ring-emerald-500/10"
                                  : "border-zinc-200 focus:border-emerald-500 focus:ring-emerald-500/10"
                              }`
                        }`}
                      />
                    ))}
                  </motion.div>

                  {/* Progress bar */}
                  <motion.div variants={item} className={`h-0.5 w-full rounded-full ${dm ? "bg-zinc-800" : "bg-zinc-100"}`}>
                    <motion.div
                      className={`h-full rounded-full ${dm ? "bg-emerald-500" : "bg-emerald-600"}`}
                      animate={{ width: `${(otpDigits.filter(Boolean).length / 4) * 100}%` }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>

                  <motion.button
                    variants={item}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleOtpSubmit}
                    disabled={verifyingOtp || otp.length !== 4}
                    className={`group relative w-full overflow-hidden rounded-2xl py-3.5 text-sm font-semibold text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40 ${
                      dm ? "bg-emerald-500 hover:bg-emerald-400" : "bg-emerald-600 hover:bg-emerald-700"
                    }`}
                  >
                    <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/10 transition-transform duration-700 group-hover:translate-x-full" />
                    <span className="relative flex items-center justify-center gap-2">
                      {verifyingOtp ? <Spinner /> : (
                        <>Verify & Sign In <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" /></>
                      )}
                    </span>
                  </motion.button>

                  <motion.div variants={item} className="flex justify-center">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      onClick={() => { setStep(1); setOtpDigits(["","","",""]); }}
                      className={`flex items-center gap-1.5 text-xs transition-colors ${
                        dm ? "text-zinc-500 hover:text-emerald-400" : "text-zinc-400 hover:text-emerald-600"
                      }`}
                    >
                      <RotateCcw className="h-3 w-3" /> Resend OTP
                    </motion.button>
                  </motion.div>
                </motion.div>

                <motion.p
                  variants={item} initial="initial" animate="animate"
                  className={`text-center text-xs ${dm ? "text-zinc-600" : "text-zinc-400"}`}
                >
                  OTP expires in 10 minutes. Check your spam folder if not received.
                </motion.p>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}