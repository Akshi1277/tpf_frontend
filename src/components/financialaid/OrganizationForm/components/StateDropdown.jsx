"use client"

import { useState, useEffect } from "react"

export default function StateDropdown({ value, onChange, darkMode, required = false }) {
  const [states, setStates] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchStates()
  }, [])


// StateDropdown.jsx
const fetchStates = async () => {
  setLoading(true)
  try {
    const response = await fetch("https://countriesnow.space/api/v0.1/countries/states", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country: "India" }),
    })
    const { data } = await response.json()
    const sorted = data.states
      .map((s) => s.name)
      .sort((a, b) => a.localeCompare(b))
    setStates(sorted)
  } catch (err) {
    console.error("Error fetching states:", err)
    setError("Failed to load states")
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