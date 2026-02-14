"use client"

import { useState, useEffect } from "react"

export default function PhoneInput({ name, value, onChange, darkMode }) {
  const [localValue, setLocalValue] = useState(value || "")
  const [isValid, setIsValid] = useState(true)

  useEffect(() => {
    setLocalValue(value || "")
  }, [value])

  const validatePhone = (phone) => {
    // Indian phone number validation: 10 digits
    const phoneRegex = /^[6-9]\d{9}$/
    return phoneRegex.test(phone.replace(/\s/g, ''))
  }

  const formatPhone = (phone) => {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '')
    
    // Limit to 10 digits
    const limited = cleaned.slice(0, 10)
    
    return limited
  }

  const handleInputChange = (e) => {
    const formatted = formatPhone(e.target.value)
    setLocalValue(formatted)
    
    // Validate only if there's input and it's 10 digits
    if (formatted.length === 10) {
      setIsValid(validatePhone(formatted))
    } else if (formatted.length === 0) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
    
    onChange({ target: { name, value: formatted } })
  }

  const showValidation = localValue && !isValid

  return (
    <div>
      <div className="relative">
        <div className={`absolute left-3 top-1/2 -translate-y-1/2 ${
          darkMode ? "text-zinc-400" : "text-zinc-500"
        }`}>
          +91
        </div>
        <input
          type="tel"
          name={name}
          value={localValue}
          onChange={handleInputChange}
          placeholder="9876543210"
          maxLength={10}
          className={`w-full pl-12 pr-4 py-2.5 rounded-lg border transition-colors ${
            showValidation
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
              : darkMode
              ? "bg-zinc-700 border-zinc-600 text-white placeholder-zinc-400 focus:border-emerald-500"
              : "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400 focus:border-emerald-600"
          } focus:outline-none focus:ring-2 focus:ring-emerald-500/20`}
        />
      </div>
      
      {showValidation && (
        <p className="text-xs text-red-500 mt-1">
          {localValue.length < 10 
            ? `Please enter ${10 - localValue.length} more digit${10 - localValue.length > 1 ? 's' : ''}`
            : "Please enter a valid Indian mobile number starting with 6-9"}
        </p>
      )}
      
      {localValue && isValid && localValue.length === 10 && (
        <p className={`text-xs mt-1 ${darkMode ? "text-emerald-400" : "text-emerald-600"}`}>
          ✓ Valid mobile number
        </p>
      )}
    </div>
  )
}