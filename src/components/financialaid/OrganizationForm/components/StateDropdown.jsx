"use client"

import { useState, useEffect } from "react"

export default function StateDropdown({ value, onChange, darkMode, required = false }) {
  const [states, setStates] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchStates()
  }, [])

  const fetchStates = async () => {
    setLoading(true)
    try {
      // Example API call - replace with your actual API
      // const response = await fetch('https://api.example.com/states')
      // const data = await response.json()
      
      // Fallback: Using static Indian states list
      const indianStates = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
        "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
        "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
        "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
        "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
        "Uttar Pradesh", "Uttarakhand", "West Bengal",
        "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
        "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
      ]
      setStates(indianStates)
    } catch (error) {
      console.error('Error fetching states:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
        State {required && <span className="text-red-500">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={loading}
        className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${
          darkMode
            ? "bg-zinc-700 border-zinc-600 text-white focus:border-emerald-500"
            : "bg-white border-zinc-300 text-zinc-900 focus:border-emerald-600"
        } focus:outline-none focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-50`}
      >
        <option value="">{loading ? "Loading states..." : "Select state"}</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
    </div>
  )
}