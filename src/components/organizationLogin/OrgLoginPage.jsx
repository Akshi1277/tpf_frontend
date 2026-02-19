"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { AnimatePresence, motion } from "framer-motion"
import { Check } from "lucide-react"
import { setCredentials, logout } from "@/utils/slices/authSlice"
import {
  useSendOrganizationOtpMutation,
  useVerifyOrganizationOtpMutation,
} from "@/utils/slices/organizationApiSlice"
import { useAppToast } from "@/app/AppToastContext"
import DesktopOrgLogin from "./DesktopOrgLogin"
import MobileOrgLogin from "./MobileOrgLogin"

export default function OrgLoginPage({ darkMode }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const { showToast } = useAppToast()

  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)

  const [sendOrganizationOtp, { isLoading: sendingOtp }] = useSendOrganizationOtpMutation()
  const [verifyOrganizationOtp, { isLoading: verifyingOtp }] = useVerifyOrganizationOtpMutation()

  const handleLogin = async () => {
    if (!email || !email.includes("@")) {
      showToast({
        type: "error",
        title: "Invalid Email",
        message: "Please enter a valid organization email address",
        duration: 2000,
      })
      return
    }

    try {
      await sendOrganizationOtp(email).unwrap()
      setStep(2)
    } catch (error) {
      const msg = error?.data?.message || "Something went wrong"

      // Surface specific backend messages cleanly
      const friendlyMessages = {
        "Organization not registered": "This email is not registered as an organization.",
        "Organization verification pending": "Your organization is pending verification.",
        "Organization account inactive": "This organization account is currently inactive.",
      }

      showToast({
        type: "error",
        title: "Login Failed",
        message: friendlyMessages[msg] ?? msg,
        duration: 3000,
      })
    }
  }

  const handleOtpSubmit = async () => {
    if (otp.length !== 4) return

    try {
      // verifyOrganizationOtp's onQueryStarted handles dispatch(setCredentials) internally
      await verifyOrganizationOtp({ email, otp }).unwrap()

      setShowSuccess(true)
      showToast({
        type: "success",
        title: "Welcome Back!",
        message: "Redirecting to your organization dashboard...",
        duration: 2500,
      })

      setTimeout(() => router.push("/organization/profile/dashboard"), 2500)
    } catch (error) {
      const msg = error?.data?.message || "Invalid OTP"
      showToast({
        type: "error",
        title: "Verification Failed",
        message: msg,
        duration: 2000,
      })
    }
  }

  const dm = darkMode
  const sharedProps = {
    darkMode, step, email, setEmail, otp, setOtp,
    handleLogin, handleOtpSubmit, setStep, sendingOtp, verifyingOtp,
  }

  return (
    <div className={`min-h-screen relative overflow-hidden ${dm ? "bg-zinc-950" : "bg-white"}`}>
      {/* Subtle grid */}
      <div
        className={`absolute inset-0 pointer-events-none ${
          dm
            ? "bg-[linear-gradient(rgba(16,185,129,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.025)_1px,transparent_1px)]"
            : "bg-[linear-gradient(rgba(16,185,129,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.04)_1px,transparent_1px)]"
        }`}
        style={{ backgroundSize: "64px 64px" }}
      />

      {/* Success Toast */}
      {/* <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className={`fixed top-4 left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:w-80 z-50
              px-5 py-4 rounded-2xl shadow-xl flex items-center gap-3 ${
              dm
                ? "bg-zinc-900 border border-emerald-500/20"
                : "bg-white border border-emerald-200"
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
              <Check className="w-4 h-4 text-white" strokeWidth={3} />
            </div>
            <div>
              <p className={`font-semibold text-sm ${dm ? "text-white" : "text-zinc-900"}`}>
                Login Successful
              </p>
              <p className={`text-xs mt-0.5 ${dm ? "text-zinc-400" : "text-zinc-500"}`}>
                Redirecting to dashboard...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence> */}

      {/* Render layout components */}
      <DesktopOrgLogin {...sharedProps} />
      <MobileOrgLogin {...sharedProps} />
    </div>
  )
}
