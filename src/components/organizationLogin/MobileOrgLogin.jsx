"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import {
  ArrowLeft, ArrowRight, Building2, Mail, RotateCcw,
  ShieldCheck, Sparkles
} from "lucide-react"

const fadeUp = {
  initial: { opacity: 0, y: 20, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit:    { opacity: 0, y: -20, filter: "blur(4px)" },
  transition: { duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] },
}

const stagger = {
  animate: { transition: { staggerChildren: 0.065, delayChildren: 0.04 } }
}
const item = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.36, ease: [0.25, 0.46, 0.45, 0.94] } }
}

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
  )
}

export default function MobileOrgLogin({
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
    <div className={`flex lg:hidden min-h-screen flex-col pt-16 ${dm ? "bg-zinc-950" : "bg-white"}`}>

      {/* ── Animated top bar ── */}
      <motion.div
        className={`h-0.5 w-full ${dm ? "bg-zinc-800" : "bg-zinc-100"}`}
        initial={false}
      >
        <motion.div
          className={`h-full ${dm ? "bg-emerald-500" : "bg-emerald-600"}`}
          animate={{ width: step === 1 ? "50%" : "100%" }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </motion.div>

      {/* ── Header ── */}
      <div className={`flex items-center justify-between border-b px-5 py-4 ${
        dm ? "border-zinc-900" : "border-zinc-100"
      }`}>
        <div className="flex items-center gap-2.5">
          <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${
            dm ? "bg-emerald-500" : "bg-emerald-600"
          }`}>
            <Building2 className="h-4 w-4 text-white" strokeWidth={1.8} />
          </div>
          <span className={`text-sm font-semibold tracking-tight ${dm ? "text-white" : "text-zinc-900"}`}>
            OrgPortal
          </span>
        </div>

        {/* Step indicator pills */}
        <div className="flex items-center gap-1.5">
          {[1, 2].map((s) => (
            <motion.div
              key={s}
              animate={{
                width: s === step ? 20 : 6,
                backgroundColor: s <= step
                  ? dm ? "#10b981" : "#059669"
                  : dm ? "#27272a" : "#e4e4e7",
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="h-1.5 rounded-full"
            />
          ))}
        </div>
      </div>

      {/* ── Hero strip (step 1 only) ── */}
      <AnimatePresence>
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className={`relative overflow-hidden px-5 py-7 ${
              dm ? "bg-zinc-900" : "bg-zinc-50"
            }`}>
              {/* Blob */}
              <div
                className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full ${
                  dm ? "bg-emerald-900/25" : "bg-emerald-100/70"
                }`}
                style={{ filter: "blur(50px)" }}
              />
              <div className="relative z-10 space-y-2">
                <div className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] uppercase ${
                  dm
                    ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                    : "border-emerald-200 bg-emerald-50 text-emerald-700"
                }`}>
                  <Sparkles className="h-2.5 w-2.5" />
                  Organization Portal
                </div>
                <h1 className={`text-2xl font-bold leading-tight tracking-tight ${
                  dm ? "text-white" : "text-zinc-900"
                }`}>
                  Manage your org,<br />
                  <span className={`italic ${dm ? "text-emerald-400" : "text-emerald-600"}`}>seamlessly.</span>
                </h1>
                <p className={`text-xs leading-relaxed ${dm ? "text-zinc-400" : "text-zinc-500"}`}>
                  OTP-based secure login for verified organizations only.
                </p>
              </div>

              {/* Mini trust badges */}
              <div className="relative z-10 mt-4 flex items-center gap-2">
                {["Verified", "Secure OTP", "Instant"].map((t) => (
                  <span key={t} className={`rounded-full border px-2.5 py-1 text-[10px] font-medium ${
                    dm
                      ? "border-zinc-700 bg-zinc-800/60 text-zinc-400"
                      : "border-zinc-200 bg-white text-zinc-500"
                  }`}>{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main Form Area ── */}
      <div className="flex flex-1 flex-col justify-center px-5 py-8">
        <AnimatePresence mode="wait">

          {/* ── STEP 1 ── */}
          {step === 1 && (
            <motion.div key="m-s1" {...fadeUp} className="space-y-6">
              <motion.div
                variants={stagger} initial="initial" animate="animate"
                className="space-y-1"
              >
                <motion.p variants={item} className={`text-[11px] font-semibold tracking-[0.15em] uppercase ${
                  dm ? "text-emerald-400" : "text-emerald-600"
                }`}>Step 1 of 2</motion.p>
                <motion.h2 variants={item} className={`text-2xl font-bold tracking-tight ${
                  dm ? "text-white" : "text-zinc-900"
                }`}>
                  Organization Login
                </motion.h2>
                <motion.p variants={item} className={`text-sm ${dm ? "text-zinc-400" : "text-zinc-500"}`}>
                  Enter your registered organization email
                </motion.p>
              </motion.div>

              <motion.div
                variants={stagger} initial="initial" animate="animate"
                className="space-y-1.5"
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
                  className={`flex items-center gap-3 rounded-2xl border px-4 py-4 transition-colors duration-200 ${
                    focused
                      ? dm ? "border-emerald-500 bg-zinc-900" : "border-emerald-500 bg-white"
                      : dm ? "border-zinc-800 bg-zinc-900/80" : "border-zinc-200 bg-zinc-50"
                  }`}
                >
                  <Mail className={`h-4 w-4 flex-shrink-0 transition-colors ${
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

              <motion.button
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.18 } }}
                whileTap={{ scale: 0.97 }}
                onClick={handleLogin}
                disabled={sendingOtp || !email.includes("@")}
                className={`group relative w-full overflow-hidden rounded-2xl py-4 text-sm font-semibold text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40 ${
                  dm ? "bg-emerald-500 hover:bg-emerald-400" : "bg-emerald-600 hover:bg-emerald-700"
                }`}
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/10 transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative flex items-center justify-center gap-2">
                  {sendingOtp ? <Spinner /> : <>Send OTP <ArrowRight className="h-4 w-4" /></>}
                </span>
              </motion.button>

              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.25 } }}
                className={`text-center text-xs ${dm ? "text-zinc-600" : "text-zinc-400"}`}
              >
                OTP will be sent to your organization's registered email.
              </motion.p>
            </motion.div>
          )}

          {/* ── STEP 2 ── */}
          {step === 2 && (
            <motion.div key="m-s2" {...fadeUp} className="space-y-6">
              <motion.div
                variants={stagger} initial="initial" animate="animate"
                className="space-y-1"
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

                <motion.p variants={item} className={`text-[11px] font-semibold tracking-[0.15em] uppercase ${
                  dm ? "text-emerald-400" : "text-emerald-600"
                }`}>Step 2 of 2</motion.p>
                <motion.h2 variants={item} className={`text-2xl font-bold tracking-tight ${
                  dm ? "text-white" : "text-zinc-900"
                }`}>
                  Check your inbox
                </motion.h2>
                <motion.p variants={item} className={`text-sm ${dm ? "text-zinc-400" : "text-zinc-500"}`}>
                  We sent a code to{" "}
                  <span className={`font-medium ${dm ? "text-zinc-100" : "text-zinc-800"}`}>{email}</span>
                </motion.p>
              </motion.div>

              {/* OTP grid */}
              <motion.div
                variants={stagger} initial="initial" animate="animate"
                className="space-y-5"
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
                      animate={digit ? { scale: [1, 1.08, 1], transition: { duration: 0.16 } } : { scale: 1 }}
                      className={`aspect-square w-full rounded-2xl border-2 text-center text-xl font-bold outline-none transition-all duration-150 focus:ring-2 ${
                        dm
                          ? `bg-zinc-900 text-white ${
                              digit ? "border-emerald-500 focus:ring-emerald-500/15"
                                    : "border-zinc-800 focus:border-emerald-500 focus:ring-emerald-500/10"
                            }`
                          : `bg-zinc-50 text-zinc-900 ${
                              digit ? "border-emerald-500 bg-white focus:ring-emerald-500/10"
                                    : "border-zinc-200 focus:border-emerald-500 focus:ring-emerald-500/10"
                            }`
                      }`}
                    />
                  ))}
                </motion.div>

                {/* Fill progress */}
                <motion.div variants={item} className={`h-0.5 w-full rounded-full ${dm ? "bg-zinc-800" : "bg-zinc-100"}`}>
                  <motion.div
                    className={`h-full rounded-full ${dm ? "bg-emerald-500" : "bg-emerald-600"}`}
                    animate={{ width: `${(otpDigits.filter(Boolean).length / 4) * 100}%` }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>

                <motion.button
                  variants={item}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleOtpSubmit}
                  disabled={verifyingOtp || otp.length !== 4}
                  className={`group relative w-full overflow-hidden rounded-2xl py-4 text-sm font-semibold text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40 ${
                    dm ? "bg-emerald-500 hover:bg-emerald-400" : "bg-emerald-600 hover:bg-emerald-700"
                  }`}
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/10 transition-transform duration-700 group-hover:translate-x-full" />
                  <span className="relative flex items-center justify-center gap-2">
                    {verifyingOtp ? <Spinner /> : <>Verify & Sign In <ArrowRight className="h-4 w-4" /></>}
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
                initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }}
                className={`text-center text-xs ${dm ? "text-zinc-600" : "text-zinc-400"}`}
              >
                OTP expires in 10 minutes. Check spam if not received.
              </motion.p>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}