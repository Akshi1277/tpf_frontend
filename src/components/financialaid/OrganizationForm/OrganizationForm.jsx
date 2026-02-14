"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useRegisterOrganizationMutation } from "@/utils/slices/organizationApiSlice"
import { ChevronLeft } from "lucide-react"
import { useAppToast } from "@/app/AppToastContext"

// Import step components
import OrganizationDetailsStep from "./steps/OrganizationDetailsStep"
import ContactDetailsStep from "./steps/ContactDetailsStep"
import DocumentsStep from "./steps/DocumentsStep"
import OrganizationProfileStep from "./steps/OrganizationProfileStep"
import ReviewSubmitStep from "./steps/ReviewSubmitStep"
import ProgressBar from "./components/ProgressBar"
import SuccessMessage from "./components/SuccessMessage"

export default function OrganizationRegistrationPage({ darkModeFromParent }) {
  const router = useRouter()
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [registerOrganization, { isLoading }] = useRegisterOrganizationMutation()
  const [darkMode, setDarkMode] = useState(false)
  const { showToast } = useAppToast()

  useEffect(() => {
    if (darkModeFromParent !== undefined) {
      setDarkMode(darkModeFromParent)
    }
  }, [darkModeFromParent])

  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Organization Details
    isNGO: "", // "yes" or "no"
    organizationName: "",
    organizationEmail: "",
    officialWebsite: "",
    state: "",
    city: "",
    
    // NGO specific
    causesSupported: [],
    founderName: "",
    founderEmail: "",
    founderMobile: "",
    
    // Non-NGO specific
    businessDomain: "",
    directorName: "",
    directorEmail: "",
    directorMobile: "",

    // Step 2: Contact Details
    contactName: "",
    contactNumber: "",
    contactEmail: "",
    designation: "",

    // Step 3: Documents
    // For NGO
    has80G: "",
    expiryDate: "",
    certification80G: null,
    panCard: "",
    panCardImage: null,
    hasFCRA: "",
    
    // For Non-NGO
    documentType: "", // "gst", "incorporation", "other"
    businessDocument: null,
    businessPanCard: null,

    // Step 4: Organization Profile
    // For NGO
    annualBudget: "",
    donorDatabase: "",
    fullTimeFundraising: "",
    crowdfundedBefore: "",
    employeeStrength: "",
    volunteerStrength: "",
    organizeEvents: "",
    
    // For Non-NGO
    annualRevenue: "",
    numberOfEmployees: "",
    yearsInOperation: "",
    csr_initiatives: "",
    partnershipInterest: "",
    
    // Common optional fields
    organizationLogo: null,
    organizationDescription: "",

    termsAccepted: false,
  })

  const handleInputChange = (e) => {
    const { name, value, type } = e.target

    if (type === "file") {
      setFormData(prev => ({
        ...prev,
        [name]: e.target.files[0]
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleCheckboxChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter(item => item !== value)
        : [...prev[name], value]
    }))
  }

  const removeFile = (name) => {
    setFormData(prev => ({ ...prev, [name]: null }))
  }

  const updateFormData = (data) => {
    setFormData(prev => ({ ...prev, ...data }))
  }

  const validateStep = (step) => {
    const isNGO = formData.isNGO === "yes"
    
    switch (step) {
      case 1:
        const basicFields = ["isNGO", "organizationName", "organizationEmail", "state", "city"]
        for (const field of basicFields) {
          if (!formData[field]) return false
        }
        
        if (isNGO) {
          if (!formData.founderName || !formData.founderEmail || !formData.founderMobile) return false
          if (formData.causesSupported.length === 0) return false
        } else {
          if (!formData.businessDomain || !formData.directorName || !formData.directorEmail || !formData.directorMobile) return false
        }
        return true

      case 2:
        return formData.contactName && formData.contactNumber && formData.contactEmail && formData.designation

      case 3:
        if (isNGO) {
          return formData.has80G !== "" && formData.hasFCRA !== ""
        } else {
          return formData.documentType !== "" && formData.businessDocument !== null
        }

      case 4:
        if (isNGO) {
          return formData.annualBudget && formData.donorDatabase && formData.fullTimeFundraising && 
                 formData.crowdfundedBefore && formData.employeeStrength
        } else {
          return formData.annualRevenue && formData.numberOfEmployees && formData.yearsInOperation &&
                 formData.csr_initiatives && formData.partnershipInterest
        }

      case 5:
        return formData.termsAccepted

      default:
        return true
    }
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      window.scrollTo({ top: 0, behavior: "smooth" })
      setCurrentStep(prev => prev + 1)
    } else {
      showToast({
        type: "error",
        title: "Please fill all required fields",
        message: "Complete all required information before proceeding",
        duration: 3000,
      })
    }
  }

  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    setCurrentStep(prev => prev - 1)
  }

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault()
    }

    if (!formData.termsAccepted) {
      showToast({
        type: "error",
        title: "Please accept the terms and policies",
        message: " ",
        duration: 2000,
      })
      return
    }

    try {
      const formDataToSend = new FormData()
      
      // Add all form fields
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== undefined) {
          if (Array.isArray(formData[key])) {
            formDataToSend.append(key, JSON.stringify(formData[key]))
          } else if (formData[key] instanceof File) {
            formDataToSend.append(key, formData[key])
          } else {
            formDataToSend.append(key, formData[key])
          }
        }
      })

      const response = await registerOrganization(formDataToSend).unwrap()

      setShowSuccessMessage(true)
      showToast({
        type: "success",
        title: "Registration Successful",
        message: response.message || "Your organization has been registered successfully",
        duration: 3000,
      })

      setTimeout(() => {
        router.push("/")
      }, 3000)
    } catch (error) {
      console.error('Submission error:', error)
      showToast({
        type: "error",
        title: "Submission Failed",
        message: error?.data?.message || "An error occurred during submission",
        duration: 3000,
      })
    }
  }

  const steps = [
    { number: 1, title: formData.isNGO === "yes" ? "NGO Details" : "Organization Details", icon: "building" },
    { number: 2, title: "Contact Details", icon: "users" },
    { number: 3, title: "Documents", icon: "fileText" },
    { number: 4, title: "Organization Profile", icon: "award" },
    { number: 5, title: "Review & Submit", icon: "check" }
  ]

  if (showSuccessMessage) {
    return <SuccessMessage darkMode={darkMode} />
  }

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900" : "bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50"} py-8 px-4`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${darkMode ? "text-white" : "text-zinc-900"}`}>
            Organization Registration
          </h1>
          <p className={`text-sm md:text-base ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
            {formData.isNGO === "yes" ? "Register your NGO" : formData.isNGO === "no" ? "Register your company" : "Complete the form to register"}
          </p>
        </div>

        {/* Progress Bar */}
        <ProgressBar 
          steps={steps} 
          currentStep={currentStep} 
          darkMode={darkMode}
          isNGO={formData.isNGO === "yes"}
        />

        {/* Form Steps */}
        <div className={`rounded-2xl shadow-2xl p-6 md:p-8 mt-8 ${darkMode ? "bg-zinc-800/50 backdrop-blur" : "bg-white"}`}>
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <OrganizationDetailsStep
                key="step1"
                formData={formData}
                updateFormData={updateFormData}
                handleInputChange={handleInputChange}
                handleCheckboxChange={handleCheckboxChange}
                handleNext={handleNext}
                darkMode={darkMode}
              />
            )}

            {currentStep === 2 && (
              <ContactDetailsStep
                key="step2"
                formData={formData}
                handleInputChange={handleInputChange}
                handleNext={handleNext}
                handleBack={handleBack}
                darkMode={darkMode}
              />
            )}

            {currentStep === 3 && (
              <DocumentsStep
                key="step3"
                formData={formData}
                handleInputChange={handleInputChange}
                removeFile={removeFile}
                handleNext={handleNext}
                handleBack={handleBack}
                darkMode={darkMode}
              />
            )}

            {currentStep === 4 && (
              <OrganizationProfileStep
                key="step4"
                formData={formData}
                handleInputChange={handleInputChange}
                removeFile={removeFile}
                handleNext={handleNext}
                handleBack={handleBack}
                darkMode={darkMode}
              />
            )}

            {currentStep === 5 && (
              <ReviewSubmitStep
                key="step5"
                formData={formData}
                updateFormData={updateFormData}
                handleSubmit={handleSubmit}
                handleBack={handleBack}
                setCurrentStep={setCurrentStep}
                isLoading={isLoading}
                darkMode={darkMode}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}