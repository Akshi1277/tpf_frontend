"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useRef, useEffect, useState, useCallback, useMemo } from "react"
import { gsap } from "gsap"
import { InertiaPlugin } from "gsap/InertiaPlugin"
import { useRouter } from "next/navigation"
import {
  ArrowLeft, ArrowRight, Building2, Mail, RotateCcw,
} from "lucide-react"

gsap.registerPlugin(InertiaPlugin)

/* ══════════════════════════════
   UTILITIES
══════════════════════════════ */
function hexToRgb(hex) {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i)
  if (!m) return { r: 0, g: 0, b: 0 }
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) }
}
function throttle(fn, limit) {
  let last = 0
  return (...args) => {
    const now = performance.now()
    if (now - last >= limit) { last = now; fn(...args) }
  }
}

/* ══════════════════════════════
   DOT FIELD
══════════════════════════════ */
function DotField({ darkMode }) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const dotsRef = useRef([])
  const ptr = useRef({ x: -9999, y: -9999, vx: 0, vy: 0, lastTime: 0, lastX: 0, lastY: 0 })
  const dmRef = useRef(darkMode)
  dmRef.current = darkMode

  const DARK = { base: "#071510", ripple: "#10b981", trail: "#6ee7b7" }
  const LIGHT = { base: "#bbf7d0", ripple: "#059669", trail: "#10b981" }
  const DOT = 3.5, GAP = 20, PROX = 95
  const SR = 210, SS = 7, RES = 720, RD = 1.7

  const path = useMemo(() => {
    if (typeof window === "undefined" || !window.Path2D) return null
    const p = new Path2D(); p.arc(0, 0, DOT / 2, 0, Math.PI * 2); return p
  }, [])

  const buildGrid = useCallback(() => {
    const wrap = wrapRef.current, canvas = canvasRef.current
    if (!wrap || !canvas) return
    const { width, height } = wrap.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr; canvas.height = height * dpr
    canvas.style.width = `${width}px`; canvas.style.height = `${height}px`
    const ctx = canvas.getContext("2d"); if (ctx) ctx.scale(dpr, dpr)
    const cell = DOT + GAP
    const cols = Math.floor((width + GAP) / cell)
    const rows = Math.floor((height + GAP) / cell)
    const sx = (width - (cols * cell - GAP)) / 2 + DOT / 2
    const sy = (height - (rows * cell - GAP)) / 2 + DOT / 2
    dotsRef.current = []
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++)
        dotsRef.current.push({ cx: sx + c * cell, cy: sy + r * cell, xOffset: 0, yOffset: 0, _busy: false })
  }, [])

  useEffect(() => {
    if (!path) return
    let rafId
    const psq = PROX * PROX
    const draw = () => {
      const canvas = canvasRef.current; if (!canvas) return
      const ctx = canvas.getContext("2d"); if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const t = dmRef.current ? DARK : LIGHT
      const br = hexToRgb(t.base), rr = hexToRgb(t.ripple), tr = hexToRgb(t.trail)
      const { x: px, y: py } = ptr.current
      for (const d of dotsRef.current) {
        const dx = d.cx - px, dy = d.cy - py, dsq = dx * dx + dy * dy
        let fr = br.r, fg = br.g, fb = br.b
        if (dsq <= psq) {
          const tv = 1 - Math.sqrt(dsq) / PROX
          const ti = Math.max(0, tv * 2 - 1), to = Math.min(1, tv * 2)
          const ir = rr.r * ti + tr.r * (to - ti), ig = rr.g * ti + tr.g * (to - ti), ib = rr.b * ti + tr.b * (to - ti)
          fr = Math.round(br.r + (ir - br.r) * to); fg = Math.round(br.g + (ig - br.g) * to); fb = Math.round(br.b + (ib - br.b) * to)
        }
        ctx.save(); ctx.translate(d.cx + d.xOffset, d.cy + d.yOffset)
        ctx.fillStyle = `rgb(${fr},${fg},${fb})`; ctx.fill(path); ctx.restore()
      }
      rafId = requestAnimationFrame(draw)
    }
    draw(); return () => cancelAnimationFrame(rafId)
  }, [path])

  useEffect(() => {
    buildGrid()
    const ro = new ResizeObserver(buildGrid)
    if (wrapRef.current) ro.observe(wrapRef.current)
    return () => ro.disconnect()
  }, [buildGrid])

  useEffect(() => {
    const onMove = (e) => {
      const rect = canvasRef.current?.getBoundingClientRect(); if (!rect) return
      const now = performance.now(), p = ptr.current
      const dt = p.lastTime ? now - p.lastTime : 16
      const vx = ((e.clientX - p.lastX) / dt) * 1000
      const vy = ((e.clientY - p.lastY) / dt) * 1000
      const speed = Math.hypot(vx, vy)
      p.lastTime = now; p.lastX = e.clientX; p.lastY = e.clientY; p.vx = vx; p.vy = vy
      p.x = e.clientX - rect.left; p.y = e.clientY - rect.top
      if (speed > 110) {
        for (const d of dotsRef.current) {
          if (d._busy || Math.hypot(d.cx - p.x, d.cy - p.y) >= PROX) continue
          d._busy = true; gsap.killTweensOf(d)
          gsap.to(d, {
            inertia: { xOffset: (d.cx - p.x) + vx * 0.004, yOffset: (d.cy - p.y) + vy * 0.004, resistance: RES },
            onComplete: () => { gsap.to(d, { xOffset: 0, yOffset: 0, duration: RD, ease: "elastic.out(1,0.75)" }); d._busy = false }
          })
        }
      }
    }
    const onClick = (e) => {
      const rect = canvasRef.current?.getBoundingClientRect(); if (!rect || e.clientX > rect.right) return
      const cx = e.clientX - rect.left, cy = e.clientY - rect.top
      for (const d of dotsRef.current) {
        if (d._busy) continue
        const dist = Math.hypot(d.cx - cx, d.cy - cy); if (dist >= SR) continue
        d._busy = true; const f = Math.max(0, 1 - dist / SR); gsap.killTweensOf(d)
        gsap.to(d, {
          inertia: { xOffset: (d.cx - cx) * SS * f, yOffset: (d.cy - cy) * SS * f, resistance: RES },
          onComplete: () => { gsap.to(d, { xOffset: 0, yOffset: 0, duration: RD, ease: "elastic.out(1,0.75)" }); d._busy = false }
        })
      }
    }
    const tMove = throttle(onMove, 16)
    window.addEventListener("mousemove", tMove, { passive: true })
    window.addEventListener("click", onClick)
    return () => { window.removeEventListener("mousemove", tMove); window.removeEventListener("click", onClick) }
  }, [])

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  )
}

/* ══════════════════════════════
   ANIMATIONS
══════════════════════════════ */
const fadeSlide = (dir = 1) => ({
  initial: { opacity: 0, x: dir * 20, filter: "blur(5px)" },
  animate: { opacity: 1, x: 0, filter: "blur(0px)" },
  exit: { opacity: 0, x: dir * -20, filter: "blur(5px)" },
  transition: { duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] },
})
const stagger = { animate: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } } }
const item = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] } },
}

function Spinner() {
  return (
    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
  )
}

/* ══════════════════════════════
   MAIN COMPONENT
══════════════════════════════ */
export default function DesktopOrgLogin({
  darkMode,
  navbarHeight = 64,
  step = 1, email = "", setEmail = () => { }, otp = "", setOtp = () => { },
  handleLogin = () => { }, handleOtpSubmit = () => { }, setStep = () => { },
  sendingOtp = false, verifyingOtp = false,
}) {
  const inputRefs = useRef([])
  const [otpDigits, setOtpDigits] = useState(["", "", "", ""])
  const [focused, setFocused] = useState(false)
  const dm = darkMode
  const router = useRouter()

  useEffect(() => { setOtp(otpDigits.join("")) }, [otpDigits])
  useEffect(() => { if (step === 2) setTimeout(() => inputRefs.current[0]?.focus(), 150) }, [step])

  const handleOtpChange = (i, v) => {
    if (!/^\d*$/.test(v)) return
    const next = [...otpDigits]; next[i] = v.slice(-1); setOtpDigits(next)
    if (v && i < 3) inputRefs.current[i + 1]?.focus()
  }
  const handleOtpKeyDown = (i, e) => {
    if (e.key === "Backspace" && !otpDigits[i] && i > 0) inputRefs.current[i - 1]?.focus()
  }
  const handleOtpPaste = (e) => {
    e.preventDefault()
    const p = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4)
    const next = ["", "", "", ""]; p.split("").forEach((ch, i) => (next[i] = ch))
    setOtpDigits(next); inputRefs.current[Math.min(p.length, 3)]?.focus()
  }

  /* theme */
  const accent = dm ? "#10b981" : "#059669"
  const accentMid = dm ? "#34d399" : "#10b981"
  const accentGlow = dm ? "rgba(16,185,129,0.2)" : "rgba(5,150,105,0.14)"
  const bgLeft = dm ? "#040d09" : "#f0fdf4"
  const bgRight = dm ? "#080f0c" : "#ffffff"
  const textPrim = dm ? "#ffffff" : "#0a0a0a"
  // FIX: increased opacity for better readability
  const textMuted = dm ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.60)"
  // FIX: increased opacity for labels that were barely visible
  const textFaint = dm ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.50)"
  const borderSub = dm ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)"
  const inputBg = dm ? "#0d1a13" : "#f5fef9"
  const inputBgFoc = dm ? "#0f2218" : "#ffffff"

  return (
    <div
      className="hidden lg:flex fixed left-0 right-0 bottom-0 w-full"
      style={{ top: navbarHeight, zIndex: 10 }}
    >
      {/* ══════════════════════
          LEFT — Dot Panel
      ══════════════════════ */}
      <div
        className="relative flex flex-col overflow-hidden"
        style={{ width: "52%", background: bgLeft }}
      >
        <DotField darkMode={dm} />

        {/* vignette */}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background: dm
              ? "radial-gradient(ellipse 80% 75% at 50% 50%, transparent 20%, rgba(4,13,9,0.88) 100%)"
              : "radial-gradient(ellipse 80% 75% at 50% 50%, transparent 20%, rgba(240,253,244,0.88) 100%)",
          }}
        />

        {/* content */}
        {/* FIX: reduced padding so content has more room and isn't pushed to corners */}
        <div className="relative z-10 flex flex-col h-full px-10 py-8 xl:px-14 xl:py-10">

          {/* Logo */}
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-sm font-semibold cursor-pointer"
            style={{ color: textMuted }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </motion.button>


          {/* Hero — centred vertically in remaining space */}
          <div className="flex-1 flex flex-col justify-center ml-6 xl:ml-10">

            <motion.div
              variants={stagger}
              initial="initial"
              animate="animate"
              className="space-y-6 w-full max-w-[720px]"
            >



              {/* badge */}
              <motion.div variants={item}>
                <span
                  className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.16em] uppercase"
                  style={{ borderColor: `${accent}28`, background: `${accent}0c`, color: accentMid }}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-55" style={{ background: accent }} />
                    <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: accent }} />
                  </span>
                  Organization Portal
                </span>
              </motion.div>

              {/* headline — FIX: larger font size, more generous line height */}
              <motion.div variants={item} className="space-y-4">
                <h1
                  className="font-bold leading-[1.04] tracking-[-0.025em]"
                  style={{ color: textPrim, fontSize: "clamp(2.6rem, 3.8vw, 4.2rem)" }}
                >
                  Manage your<br />organization<br />
                  <span className="italic font-light" style={{ color: accentMid }}>seamlessly.</span>
                </h1>
                {/* FIX: increased font size and max-width for description */}
                <p
                  className="leading-[1.8]"
                  style={{ color: textMuted, maxWidth: "340px", fontSize: "clamp(0.875rem, 1.1vw, 1rem)" }}
                >
                  Secure OTP login for verified organizations — dashboards, campaigns, and real-world impact.
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* footer — FIX: use textMuted instead of hardcoded "black" for dark mode compatibility, and better visibility */}
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            className="flex-shrink-0 text-xs font-medium ml-6 xl:ml-10" style={{ color: textMuted }}
          >
            Only verified organizations can access this portal.
          </motion.p>
        </div>
      </div>

      {/* ══════════════════════
          RIGHT — Form Panel
      ══════════════════════ */}
      <div
        className="relative flex flex-col overflow-hidden"
        style={{
          width: "48%",
          background: bgRight,
          boxShadow: dm
            ? "-1px 0 0 rgba(255,255,255,0.05), -24px 0 64px rgba(0,0,0,0.55)"
            : "-1px 0 0 rgba(0,0,0,0.06), -24px 0 64px rgba(0,0,0,0.07)",
        }}
      >
        {/* top accent */}
        <div
          className="pointer-events-none absolute top-0 left-10 right-10 h-px z-10"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}45, transparent)` }}
        />

        {/* step indicator */}
        <div className="absolute right-10 top-8 flex flex-col items-end gap-1 z-10 xl:right-14">
          <div className="flex items-center gap-2">
            {[1, 2].map((s) => (
              <motion.div
                key={s}
                animate={{
                  width: s === step ? 28 : 8,
                  backgroundColor: s <= step ? accent : (dm ? "#1c2921" : "#e5e7eb"),
                }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="h-[3px] rounded-full"
              />
            ))}
          </div>
          {/* FIX: step label more visible */}
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: textMuted }}>
            Step {step} / 2
          </p>
        </div>

        {/* Form — centred */}
        <div className="flex flex-1 items-center justify-center w-full h-full px-10 py-16 xl:px-14">
          <div className="w-full" style={{ maxWidth: "380px" }}>
            <AnimatePresence mode="wait">

              {/* ── STEP 1 ── */}
              {step === 1 && (
                <motion.div key="s1" {...fadeSlide(1)} className="space-y-8">

                  <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-3">
                    <motion.p variants={item} className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: accentMid }}>
                      Welcome back
                    </motion.p>
                    <motion.h2
                      variants={item}
                      className="font-bold tracking-tight leading-[1.1]"
                      style={{ color: textPrim, fontSize: "clamp(1.6rem, 2.2vw, 2.1rem)" }}
                    >
                      Sign in to your<br />organization
                    </motion.h2>
                    <motion.p variants={item} className="text-sm leading-relaxed" style={{ color: textMuted }}>
                      Enter your registered email — we'll send a secure one-time code
                    </motion.p>
                  </motion.div>

                  <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-1.5">
                    {/* FIX: label uses textMuted for proper visibility */}
                    <motion.label
                      variants={item}
                      className="block text-[11px] font-semibold uppercase tracking-[0.13em]"
                      style={{ color: textMuted }}
                    >
                      Organization Email
                    </motion.label>
                    <motion.div
                      variants={item}
                      animate={focused
                        ? { boxShadow: `0 0 0 3px ${accentGlow}` }
                        : { boxShadow: dm ? "0 1px 8px rgba(0,0,0,0.35)" : "0 1px 8px rgba(0,0,0,0.07)" }
                      }
                      className="flex items-center gap-3 rounded-2xl border px-4 py-3.5 transition-colors duration-200"
                      style={{ borderColor: focused ? accent : borderSub, background: focused ? inputBgFoc : inputBg }}
                    >
                      <Mail className="h-4 w-4 flex-shrink-0" style={{ color: focused ? accent : textMuted }} />
                      <input
                        type="email" value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                        placeholder="org@example.com"
                        className="flex-1 bg-transparent text-sm outline-none placeholder:opacity-40"
                        style={{ color: textPrim, caretColor: accent }}
                      />
                    </motion.div>
                  </motion.div>

                  <motion.button
                    variants={item} initial="initial" animate="animate"
                    whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.975 }}
                    onClick={handleLogin}
                    disabled={sendingOtp || !email.includes("@")}
                    className="group relative w-full overflow-hidden rounded-2xl py-4 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-30"
                    style={{
                      background: `linear-gradient(135deg, ${accentMid} 0%, ${accent} 60%, ${dm ? "#065f46" : "#047857"} 100%)`,
                      boxShadow: `0 4px 28px ${accentGlow}, 0 1px 0 rgba(255,255,255,0.12) inset`,
                    }}
                  >
                    <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/10 transition-transform duration-700 group-hover:translate-x-full" />
                    <span className="relative flex items-center justify-center gap-2">
                      {sendingOtp ? <Spinner /> : <>Continue with OTP <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" /></>}
                    </span>
                  </motion.button>

                  {/* FIX: footer note uses textMuted for proper visibility */}
                  <p className={`text-center text-sm ${darkMode ? "text-zinc-500" : "text-gray-500"}`}>
                    Not Registered Yet?{" "}
                    <a href="/organization/register" className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                      Register Here
                    </a>
                  </p>
                </motion.div>
              )}

              {/* ── STEP 2 ── */}
              {step === 2 && (
                <motion.div key="s2" {...fadeSlide(1)} className="space-y-8">

                  <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-3">
                    <motion.button
                      variants={item}
                      onClick={() => { setStep(1); setOtpDigits(["", "", "", ""]); }}
                      whileHover={{ x: -3 }}
                      className="mb-1 flex items-center gap-1.5 text-xs font-semibold"
                      style={{ color: textMuted }}
                    >
                      <ArrowLeft className="h-3.5 w-3.5" /> Back
                    </motion.button>
                    <motion.p variants={item} className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: accentMid }}>
                      Inbox check
                    </motion.p>
                    <motion.h2
                      variants={item}
                      className="font-bold tracking-tight leading-[1.1]"
                      style={{ color: textPrim, fontSize: "clamp(1.6rem, 2.2vw, 2.1rem)" }}
                    >
                      Enter the<br />4-digit code
                    </motion.h2>
                    <motion.p variants={item} className="text-sm" style={{ color: textMuted }}>
                      Sent to{" "}
                      <span className="font-semibold" style={{ color: dm ? "rgba(255,255,255,0.8)" : "#0a0a0a" }}>
                        {email}
                      </span>
                    </motion.p>
                  </motion.div>

                  <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-5">
                    <motion.div variants={item} className="flex gap-3" onPaste={handleOtpPaste}>
                      {otpDigits.map((digit, i) => (
                        <motion.input
                          key={i}
                          ref={(el) => (inputRefs.current[i] = el)}
                          type="text" inputMode="numeric" maxLength={1} value={digit}
                          onChange={(e) => handleOtpChange(i, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(i, e)}
                          animate={digit ? { scale: [1, 1.09, 1], transition: { duration: 0.2 } } : { scale: 1 }}
                          className="aspect-square w-full rounded-2xl border-2 text-center text-2xl font-bold outline-none transition-all duration-150"
                          style={{
                            background: digit ? (dm ? "#0f2a1e" : "#ecfdf5") : inputBg,
                            borderColor: digit ? accent : borderSub,
                            color: textPrim, caretColor: accent,
                            boxShadow: digit ? `0 0 0 3px ${accentGlow}` : "none",
                          }}
                        />
                      ))}
                    </motion.div>

                    <motion.div variants={item} className="h-[3px] w-full rounded-full" style={{ background: borderSub }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${accentMid}, ${accent})` }}
                        animate={{ width: `${(otpDigits.filter(Boolean).length / 4) * 100}%` }}
                        transition={{ duration: 0.22 }}
                      />
                    </motion.div>

                    <motion.button
                      variants={item}
                      whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.975 }}
                      onClick={handleOtpSubmit}
                      disabled={verifyingOtp || otp.length !== 4}
                      className="group relative w-full overflow-hidden rounded-2xl py-4 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-30"
                      style={{
                        background: `linear-gradient(135deg, ${accentMid} 0%, ${accent} 60%, ${dm ? "#065f46" : "#047857"} 100%)`,
                        boxShadow: `0 4px 28px ${accentGlow}, 0 1px 0 rgba(255,255,255,0.12) inset`,
                      }}
                    >
                      <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/10 transition-transform duration-700 group-hover:translate-x-full" />
                      <span className="relative flex items-center justify-center gap-2">
                        {verifyingOtp ? <Spinner /> : <>Verify & Sign In <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" /></>}
                      </span>
                    </motion.button>

                    <motion.div variants={item} className="flex items-center justify-between">
                      {/* FIX: "Expires in" note uses textMuted for better readability */}
                      <p className="text-xs" style={{ color: textMuted }}>Expires in 10 min · check spam</p>
                      <motion.button
                        whileHover={{ scale: 1.04 }}
                        onClick={() => { setStep(1); setOtpDigits(["", "", "", ""]); }}
                        className="flex items-center gap-1.5 text-xs font-bold"
                        style={{ color: accent }}
                      >
                        <RotateCcw className="h-3 w-3" /> Resend
                      </motion.button>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}