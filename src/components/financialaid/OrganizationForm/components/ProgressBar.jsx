"use client"

import { Building2, Users, FileText, Award, CheckCircle2 } from "lucide-react"

export default function ProgressBar({ steps, currentStep, darkMode, isNGO }) {
  const getIcon = (iconName) => {
    const iconProps = { className: "w-5 h-5" }
    switch (iconName) {
      case "building":
        return <Building2 {...iconProps} />
      case "users":
        return <Users {...iconProps} />
      case "fileText":
        return <FileText {...iconProps} />
      case "award":
        return <Award {...iconProps} />
      case "check":
        return <CheckCircle2 {...iconProps} />
      default:
        return null
    }
  }

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center relative">
        {/* Progress Line */}
        <div className={`absolute top-5 left-0 h-1 ${darkMode ? "bg-zinc-700" : "bg-zinc-200"}`}
             style={{ width: "100%", zIndex: 0 }}>
          <div 
            className="h-full bg-emerald-600 transition-all duration-500"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {/* Steps */}
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.number
          const isCurrent = currentStep === step.number
          
          return (
            <div key={step.number} className="flex flex-col items-center relative z-10" style={{ flex: 1 }}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                isCompleted
                  ? "bg-emerald-600 text-white"
                  : isCurrent
                  ? darkMode
                    ? "bg-emerald-500 text-white"
                    : "bg-emerald-600 text-white"
                  : darkMode
                  ? "bg-zinc-700 text-zinc-400"
                  : "bg-zinc-200 text-zinc-500"
              }`}>
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  getIcon(step.icon)
                )}
              </div>
              <p className={`text-xs mt-2 text-center max-w-[80px] ${
                isCurrent
                  ? darkMode ? "text-emerald-400 font-semibold" : "text-emerald-600 font-semibold"
                  : darkMode ? "text-zinc-400" : "text-zinc-600"
              }`}>
                {step.title}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}