"use client"

import { useState, useRef, useEffect } from "react"

export default function EmailInput({ name, value, onChange, darkMode, placeholder = "email@example.com" }) {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [localValue, setLocalValue] = useState(value || "")
  const inputRef = useRef(null)
  const suggestionsRef = useRef(null)

  const emailDomains = [
    "@gmail.com",
    "@yahoo.com",
    "@hotmail.com",
    "@outlook.com",
    "@icloud.com",
    "@protonmail.com"
  ]

  useEffect(() => {
    setLocalValue(value || "")
  }, [value])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target) &&
          inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleInputChange = (e) => {
    const newValue = e.target.value
    setLocalValue(newValue)
    onChange(e)

    // Show suggestions if there's text before @ or just @
    const hasAt = newValue.includes('@')
    const textBeforeAt = newValue.split('@')[0]
    
    if (textBeforeAt && !hasAt) {
      setShowSuggestions(true)
    } else if (hasAt && newValue.split('@')[1] === '') {
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (domain) => {
    const textBeforeAt = localValue.split('@')[0]
    const newEmail = textBeforeAt + domain
    setLocalValue(newEmail)
    onChange({ target: { name, value: newEmail } })
    setShowSuggestions(false)
    inputRef.current?.focus()
  }

  const getFilteredSuggestions = () => {
    const textBeforeAt = localValue.split('@')[0]
    const domainPart = localValue.split('@')[1] || ""
    
    if (!textBeforeAt) return []
    
    return emailDomains.filter(domain => 
      domain.toLowerCase().includes(domainPart.toLowerCase())
    ).map(domain => textBeforeAt + domain)
  }

  const filteredSuggestions = getFilteredSuggestions()

  // Validate email format
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const showValidation = localValue && !isValidEmail(localValue) && !showSuggestions

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="email"
        name={name}
        value={localValue}
        onChange={handleInputChange}
        onFocus={() => {
          const textBeforeAt = localValue.split('@')[0]
          if (textBeforeAt) setShowSuggestions(true)
        }}
        placeholder={placeholder}
        className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${
          showValidation
            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
            : darkMode
            ? "bg-zinc-700 border-zinc-600 text-white placeholder-zinc-400 focus:border-emerald-500"
            : "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400 focus:border-emerald-600"
        } focus:outline-none focus:ring-2 focus:ring-emerald-500/20`}
      />
      
      {showValidation && (
        <p className="text-xs text-red-500 mt-1">Please enter a valid email address</p>
      )}

      {showSuggestions && filteredSuggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className={`absolute z-10 w-full mt-1 rounded-lg shadow-lg border overflow-hidden ${
            darkMode ? "bg-zinc-800 border-zinc-700" : "bg-white border-zinc-200"
          }`}
        >
          {filteredSuggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSuggestionClick(suggestion.split('@')[1] ? '@' + suggestion.split('@')[1] : '')}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                darkMode
                  ? "hover:bg-zinc-700 text-zinc-300"
                  : "hover:bg-zinc-50 text-zinc-700"
              }`}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}