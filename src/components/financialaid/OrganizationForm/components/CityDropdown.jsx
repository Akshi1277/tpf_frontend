"use client"

import { useState, useEffect } from "react"

export default function CityDropdown({ state, value, onChange, darkMode, required = false, disabled = false }) {
  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (state) {
      fetchCities(state)
    } else {
      setCities([])
    }
  }, [state])

  // CityDropdown.jsx — state is the display name here, no iso2 needed
  const fetchCities = async (stateName) => {
    setLoading(true)
    try {
      const response = await fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: "India", state: stateName }),
      })
      const { data } = await response.json()
      setCities([...data].sort((a, b) => a.localeCompare(b)))
    } catch (err) {
      console.error("Error fetching cities:", err)
      setCities([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
        City {required && <span className="text-red-500">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled || loading || !state}
        className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${darkMode
            ? "bg-zinc-700 border-zinc-600 text-white focus:border-emerald-500"
            : "bg-white border-zinc-300 text-zinc-900 focus:border-emerald-600"
          } focus:outline-none focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <option value="">
          {!state ? "Select state first" : loading ? "Loading cities..." : "Select city"}
        </option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      {!state && (
        <p className={`text-xs mt-1 ${darkMode ? "text-zinc-500" : "text-zinc-400"}`}>
          Please select a state first
        </p>
      )}
    </div>
  )
}