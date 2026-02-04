"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check } from "lucide-react"
import { useSendOtpMutation, useVerifyOtpMutation } from "@/utils/slices/authApiSlice"
import { useDispatch } from "react-redux"
import { setCredentials } from "@/utils/slices/authSlice"
import { useAppToast } from "@/app/AppToastContext"
import DesktopLogin from "@/components/login/Login/DesktopLogin"
import MobileLogin from "@/components/login/Login/MobileLogin"

export default function LoginPage({ darkMode }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const [loginMethod, setLoginMethod] = useState("email")
  const [email, setEmail] = useState("")
  const [mobile, setMobile] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const { showToast } = useAppToast()
  const [step, setStep] = useState(1)
  const [otp, setOtp] = useState('')
  const [sendOtp, { isLoading: sendingOtp }] = useSendOtpMutation()
  const [verifyOtp, { isLoading: verifyingOtp }] = useVerifyOtpMutation()

  const handleLogin = async () => {
    try {
      if (loginMethod === "email") {
        if (!email || !email.includes("@")) {
          showToast({
            type: "error",
            title: "Invalid Email",
            message: "Please enter a valid email address",
            duration: 2000,
          })
          return
        }

        await sendOtp({
          email,
          loginMethod: "email",
          purpose: "login",
          type: "login",
        }).unwrap()
      }

      if (loginMethod === "mobile") {
        if (mobile.length !== 10) return

        await sendOtp({
          mobileNo: mobile,
          loginMethod: "mobile",
          purpose: "login",
          type: "login",
        }).unwrap()
      }

      setStep(2)
    } catch (error) {
      showToast({
        type: "error",
        title: "Login Failed",
        message: error?.data?.message || "Something went wrong",
        duration: 2000,
      })
    }
  }

  const handleOtpSubmit = async () => {
    if (otp.length !== 4) return

    try {
      const payload =
        loginMethod === "email"
          ? { email, otp }
          : { mobileNo: mobile, otp }

      const res = await verifyOtp(payload).unwrap()

      dispatch(setCredentials(res.user))

      showToast({
        type: "success",
        title: "Welcome Back!",
        message: `Salam ${res.user.fullName}!`,
        duration: 2000,
      })

      setTimeout(() => router.push("/profile/userprofile"), 2500)
    } catch {
      showToast({
        type: "error",
        title: "Invalid OTP",
        message: "Please try again!",
        duration: 2000,
      })
    }
  }

  return (
    <div className={`min-h-screen relative overflow-hidden ${
      darkMode ? "bg-zinc-950" : "bg-white"
    }`}>
      {/* Sophisticated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid Pattern */}
        <div
          className={`absolute inset-0 ${
            darkMode
              ? "bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)]"
              : "bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)]"
          }`}
          style={{ backgroundSize: '64px 64px' }}
        />

        {/* Gradient Orbs */}
        <div className={`absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[120px] ${
          darkMode ? "bg-emerald-950/20" : "bg-emerald-50"
        }`} />
        <div className={`absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[100px] ${
          darkMode ? "bg-teal-950/20" : "bg-teal-50"
        }`} />

        {/* Noise Texture Overlay */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`fixed top-4 sm:top-6 left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:max-w-md z-50 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-2xl flex items-center gap-2 sm:gap-3 ${
              darkMode
                ? "bg-zinc-900 border border-emerald-500/20"
                : "bg-white border border-emerald-200"
            }`}
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={3} />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`font-semibold text-sm sm:text-base ${darkMode ? "text-white" : "text-gray-900"}`}>
                Welcome back!
              </p>
              <p className={`text-xs sm:text-sm ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                Logging you in...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 lg:p-8 pt-4 lg:pt-20">
        <div className="w-full max-w-7xl mx-auto">
          {/* Desktop Login */}
          <DesktopLogin
            darkMode={darkMode}
            loginMethod={loginMethod}
            setLoginMethod={setLoginMethod}
            step={step}
            email={email}
            setEmail={setEmail}
            mobile={mobile}
            setMobile={setMobile}
            otp={otp}
            setOtp={setOtp}
            handleLogin={handleLogin}
            handleOtpSubmit={handleOtpSubmit}
            setStep={setStep}
            sendingOtp={sendingOtp}
            verifyingOtp={verifyingOtp}
          />

          {/* Mobile Login */}
          <MobileLogin
            darkMode={darkMode}
            loginMethod={loginMethod}
            setLoginMethod={setLoginMethod}
            step={step}
            email={email}
            setEmail={setEmail}
            mobile={mobile}
            setMobile={setMobile}
            otp={otp}
            setOtp={setOtp}
            handleLogin={handleLogin}
            handleOtpSubmit={handleOtpSubmit}
            setStep={setStep}
            sendingOtp={sendingOtp}
            verifyingOtp={verifyingOtp}
          />
        </div>
      </div>
    </div>
  )
}