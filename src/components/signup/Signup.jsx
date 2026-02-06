"use client"

import { useSendOtpMutation, useUpdateProfileMutation, useVerifyOtpMutation } from "@/utils/slices/authApiSlice"
import { useDispatch, useSelector } from "react-redux"
import { setCredentials } from "@/utils/slices/authSlice"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Check } from "lucide-react"
import { useAppToast } from "@/app/AppToastContext"
import { useRouter, useSearchParams } from "next/navigation"
import DesktopSignup from "./DesktopSignup"
import MobileSignup from "./MobileSignup"
export default function SignUpPage({ darkMode }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const searchParams = useSearchParams()

  const [sendOtp, { isLoading: sendingOtp }] = useSendOtpMutation()
  const [verifyOtp, { isLoading: verifyingOtp }] = useVerifyOtpMutation()
  const [updateProfile, { isLoading: updatingProfile }] = useUpdateProfileMutation()
  const { showToast } = useAppToast()
  const [step, setStep] = useState(1)
  const userInfo = useSelector((state) => state.auth.userInfo) // Get user info from Redux
  const [mobile, setMobile] = useState('')
  const [otp, setOtp] = useState('')
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  // Auto-resume step 3 if user is already logged in but incomplete
  useEffect(() => {
    if (userInfo && (!userInfo.fullName || !userInfo.email)) {
      setStep(3);
      if (userInfo.mobileNo) setMobile(userInfo.mobileNo.replace(/\D/g, "").slice(-10));
    }
  }, [userInfo]);

  // Pre-fill from query params (e.g. from AI assistant)
  useEffect(() => {
    const qName = searchParams.get('fullName')
    const qEmail = searchParams.get('email')
    const qPhone = searchParams.get('phone')

    if (qName) setFullName(qName)
    if (qEmail) setEmail(qEmail)
    if (qPhone) setMobile(qPhone.replace(/\D/g, "").slice(-10))
  }, [searchParams])

  const handleMobileSubmit = async () => {
    try {
      if (mobile.length !== 10) return;
      const res = await sendOtp({ mobileNo: mobile, type: "signup" }).unwrap();

      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      showToast({
        type: "error",
        title: err?.data?.message || "Failed to send OTP",
        message: ' ',
        duration: 2000,
      });
    }
  }

  const handleOtpSubmit = async () => {
    try {
      if (otp.length !== 4) return;

      const res = await verifyOtp({ mobileNo: mobile, otp }).unwrap();

      // Save user in Redux + localStorage
      dispatch(setCredentials(res.user));

      // Already logged in via cookie from backend

      // Does user already have profile?
      if (!res.user.fullName || !res.user.email) {
        setStep(3); // Go to details
      } else {
        router.push("/"); // User already has profile
      }
    } catch (err) {
      showToast({
        type: "error",
        title: err?.data?.message || "Invalid OTP",
        message: ' ',
        duration: 2000,
      });
    }
  }

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleFinalSubmit = async () => {
    try {
      if (!email || !fullName) return;

      if (!isValidEmail(email)) {
        showToast({
          type: "error",
          title: "Invalid Email",
          message: "Please enter a valid email address.",
          duration: 2000,
        });
        return;
      }

      const profileData = { fullName, email }
      const res = await updateProfile(profileData).unwrap();
      dispatch(setCredentials(res.user));
      setShowSuccess(true);

      setTimeout(() => {
        router.push("/profile/userprofile");
      }, 2000);
    } catch (err) {
      showToast({
        type: "error",
        title: err?.data?.message || "Failed to save profile",
        message: ' ',
        duration: 2000,
      });
    }
  }

  return (
    <div className={`min-h-screen relative overflow-hidden ${darkMode ? "bg-zinc-950" : "bg-white"
      }`}>
      {/* Sophisticated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid Pattern */}
        <div
          className={`absolute inset-0 ${darkMode
            ? "bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)]"
            : "bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)]"
            }`}
          style={{ backgroundSize: '64px 64px' }}
        />

        {/* Gradient Orbs */}
        <div className={`absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[120px] ${darkMode ? "bg-emerald-950/20" : "bg-emerald-50"
          }`} />
        <div className={`absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[100px] ${darkMode ? "bg-teal-950/20" : "bg-teal-50"
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
            className={`fixed top-4 sm:top-6 left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:max-w-md z-50 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-2xl flex items-center gap-2 sm:gap-3 ${darkMode
              ? "bg-zinc-900 border border-emerald-500/20"
              : "bg-white border border-emerald-200"
              }`}
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={3} />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`font-semibold text-sm sm:text-base ${darkMode ? "text-white" : "text-gray-900"}`}>
                Account created!
              </p>
              <p className={`text-xs sm:text-sm ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
                Taking you to your profile...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex lg:items-center justify-center p-4 lg:p-8 pt-24 lg:pt-20">
        <div className="w-full max-w-7xl mx-auto">
          {/* Desktop Signup */}
          <DesktopSignup
            darkMode={darkMode}
            step={step}
            mobile={mobile}
            setMobile={setMobile}
            otp={otp}
            setOtp={setOtp}
            email={email}
            setEmail={setEmail}
            fullName={fullName}
            setFullName={setFullName}
            handleMobileSubmit={handleMobileSubmit}
            handleOtpSubmit={handleOtpSubmit}
            handleFinalSubmit={handleFinalSubmit}
            setStep={setStep}
            sendingOtp={sendingOtp}
            verifyingOtp={verifyingOtp}
            updatingProfile={updatingProfile}
          />

          {/* Mobile Signup */}
          <MobileSignup
            darkMode={darkMode}
            step={step}
            mobile={mobile}
            setMobile={setMobile}
            otp={otp}
            setOtp={setOtp}
            email={email}
            setEmail={setEmail}
            fullName={fullName}
            setFullName={setFullName}
            handleMobileSubmit={handleMobileSubmit}
            handleOtpSubmit={handleOtpSubmit}
            handleFinalSubmit={handleFinalSubmit}
            setStep={setStep}
            sendingOtp={sendingOtp}
            verifyingOtp={verifyingOtp}
            updatingProfile={updatingProfile}
          />
        </div>
      </div>
    </div>
  )
}

