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

  const fetchCities = async (selectedState) => {
    setLoading(true)
    try {
      // Example API call - replace with your actual API
      // const response = await fetch(`https://api.example.com/cities?state=${selectedState}`)
      // const data = await response.json()
      
      // Fallback: Using static cities mapping (sample data)
      const citiesData = {
        "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Solapur", "Thane", "Kolhapur"],
        "Delhi": ["New Delhi", "Central Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi"],
        "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum", "Davangere"],
        "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli"],
        "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar"],
        "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri"],
        "Rajasthan": ["Jaipur", "Jodhpur", "Kota", "Udaipur", "Ajmer", "Bikaner"],
        "Uttar Pradesh": ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Varanasi", "Meerut", "Allahabad"],
        "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar"],
        "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam", "Kannur"],
        "Punjab": ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar", "Patiala"],
        "Haryana": ["Faridabad", "Gurgaon", "Panipat", "Ambala", "Karnal", "Rohtak"],
        "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain", "Sagar"],
        "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Tirupati"],
        // Add more states and cities as needed
      }
      
      setCities(citiesData[selectedState] || [])
    } catch (error) {
      console.error('Error fetching cities:', error)
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
        className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${
          darkMode
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