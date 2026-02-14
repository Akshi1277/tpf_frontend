"use client"

import { motion } from "framer-motion"
import { Building2, ChevronRight, AlertCircle } from "lucide-react"
import { useState, useEffect } from "react"
import StateDropdown from "../components/StateDropdown"
import CityDropdown from "../components/CityDropdown"
import EmailInput from "../components/EmailInput"
import PhoneInput from "../components/PhoneInput"

export default function OrganizationDetailsStep({ 
  formData, 
  updateFormData, 
  handleInputChange, 
  handleCheckboxChange,
  handleNext, 
  darkMode 
}) {
  const [selectedState, setSelectedState] = useState(formData.state || "")
  const isNGO = formData.isNGO === "yes"

  const causes = [
    "Education",
    "Healthcare",
    "Environment",
    "Women Empowerment",
    "Child Welfare",
    "Animal Welfare",
    "Disaster Relief",
    "Poverty Alleviation",
    "Skill Development",
    "Rural Development"
  ]

  const businessDomains = [
    "Technology",
    "Manufacturing",
    "Healthcare",
    "Education",
    "Finance",
    "Retail",
    "Hospitality",
    "Agriculture",
    "Construction",
    "Consulting",
    "Other"
  ]

  const handleStateChange = (state) => {
    setSelectedState(state)
    updateFormData({ state, city: "" })
  }

  const handleCityChange = (city) => {
    updateFormData({ city })
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <Building2 className={`w-8 h-8 ${darkMode ? "text-emerald-400" : "text-emerald-600"}`} />
        <h2 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-zinc-900"}`}>
          {isNGO ? "NGO Details" : formData.isNGO === "no" ? "Organization Details" : "Organization Information"}
        </h2>
      </div>

      <div className="space-y-6">
        {/* Organization Type */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
            Is this a registered NGO/Non-Profit? <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => updateFormData({ isNGO: "yes" })}
              className={`p-4 rounded-lg border-2 transition-all ${
                formData.isNGO === "yes"
                  ? darkMode
                    ? "border-emerald-500 bg-emerald-500/10"
                    : "border-emerald-600 bg-emerald-50"
                  : darkMode
                  ? "border-zinc-700 hover:border-zinc-600"
                  : "border-zinc-200 hover:border-zinc-300"
              }`}
            >
              <p className={`font-semibold ${darkMode ? "text-white" : "text-zinc-900"}`}>Yes, NGO/Non-Profit</p>
              <p className={`text-xs mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                Registered charitable organization
              </p>
            </button>
            <button
              type="button"
              onClick={() => updateFormData({ isNGO: "no" })}
              className={`p-4 rounded-lg border-2 transition-all ${
                formData.isNGO === "no"
                  ? darkMode
                    ? "border-emerald-500 bg-emerald-500/10"
                    : "border-emerald-600 bg-emerald-50"
                  : darkMode
                  ? "border-zinc-700 hover:border-zinc-600"
                  : "border-zinc-200 hover:border-zinc-300"
              }`}
            >
              <p className={`font-semibold ${darkMode ? "text-white" : "text-zinc-900"}`}>No, Private Company</p>
              <p className={`text-xs mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                Pvt Ltd, LLP, or other business
              </p>
            </button>
          </div>
        </div>

        {formData.isNGO && (
          <>
            {/* Basic Organization Details */}
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                  Organization Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleInputChange}
                  placeholder="Enter organization name"
                  className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${
                    darkMode
                      ? "bg-zinc-700 border-zinc-600 text-white placeholder-zinc-400 focus:border-emerald-500"
                      : "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400 focus:border-emerald-600"
                  } focus:outline-none focus:ring-2 focus:ring-emerald-500/20`}
                />
              </div>
            </div>

            {/* Organization Email and Website */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                  Organization Email <span className="text-red-500">*</span>
                </label>
                <EmailInput
                  name="organizationEmail"
                  value={formData.organizationEmail}
                  onChange={handleInputChange}
                  darkMode={darkMode}
                  placeholder="organization@example.com"
                />
                <p className={`text-xs mt-1 flex items-center gap-1 ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                  <AlertCircle className="w-3 h-3" />
                  Official organization email improves credibility
                </p>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                  Official Website
                </label>
                <input
                  type="url"
                  name="officialWebsite"
                  value={formData.officialWebsite}
                  onChange={handleInputChange}
                  placeholder="https://www.example.org"
                  className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${
                    darkMode
                      ? "bg-zinc-700 border-zinc-600 text-white placeholder-zinc-400 focus:border-emerald-500"
                      : "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400 focus:border-emerald-600"
                  } focus:outline-none focus:ring-2 focus:ring-emerald-500/20`}
                />
                <p className={`text-xs mt-1 flex items-center gap-1 ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                  <AlertCircle className="w-3 h-3" />
                  Having a website speeds up verification
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StateDropdown
                value={formData.state}
                onChange={handleStateChange}
                darkMode={darkMode}
                required={true}
              />

              <CityDropdown
                state={selectedState}
                value={formData.city}
                onChange={handleCityChange}
                darkMode={darkMode}
                required={true}
                disabled={!selectedState}
              />
            </div>

            {/* Causes Supported */}
            {isNGO && (
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                  Causes Supported <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {causes.map((cause) => (
                    <label
                      key={cause}
                      className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        formData.causesSupported?.includes(cause)
                          ? darkMode
                            ? "border-emerald-500 bg-emerald-500/10"
                            : "border-emerald-600 bg-emerald-50"
                          : darkMode
                          ? "border-zinc-700 hover:border-zinc-600"
                          : "border-zinc-200 hover:border-zinc-300"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.causesSupported?.includes(cause)}
                        onChange={() => handleCheckboxChange("causesSupported", cause)}
                        className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                      />
                      <span className={`text-sm ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>{cause}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Business Domain for Non-NGO */}
            {!isNGO && formData.isNGO === "no" && (
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                  Business Domain <span className="text-red-500">*</span>
                </label>
                <select
                  name="businessDomain"
                  value={formData.businessDomain}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${
                    darkMode
                      ? "bg-zinc-700 border-zinc-600 text-white focus:border-emerald-500"
                      : "bg-white border-zinc-300 text-zinc-900 focus:border-emerald-600"
                  } focus:outline-none focus:ring-2 focus:ring-emerald-500/20`}
                >
                  <option value="">Select business domain</option>
                  {businessDomains.map((domain) => (
                    <option key={domain} value={domain}>{domain}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Founder/Director Details */}
            <div className="border-t pt-6 mt-6" style={{ borderColor: darkMode ? "#3f3f46" : "#e4e4e7" }}>
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : "text-zinc-900"}`}>
                {isNGO ? "Founder Details" : "Director Details"}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                    {isNGO ? "Founder Name" : "Director Name"} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name={isNGO ? "founderName" : "directorName"}
                    value={isNGO ? formData.founderName : formData.directorName}
                    onChange={handleInputChange}
                    placeholder={`Enter ${isNGO ? "founder" : "director"} name`}
                    className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${
                      darkMode
                        ? "bg-zinc-700 border-zinc-600 text-white placeholder-zinc-400 focus:border-emerald-500"
                        : "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400 focus:border-emerald-600"
                    } focus:outline-none focus:ring-2 focus:ring-emerald-500/20`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                    {isNGO ? "Founder Email" : "Director Email"} <span className="text-red-500">*</span>
                  </label>
                  <EmailInput
                    name={isNGO ? "founderEmail" : "directorEmail"}
                    value={isNGO ? formData.founderEmail : formData.directorEmail}
                    onChange={handleInputChange}
                    darkMode={darkMode}
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                    {isNGO ? "Founder Mobile" : "Director Mobile"} <span className="text-red-500">*</span>
                  </label>
                  <PhoneInput
                    name={isNGO ? "founderMobile" : "directorMobile"}
                    value={isNGO ? formData.founderMobile : formData.directorMobile}
                    onChange={handleInputChange}
                    darkMode={darkMode}
                  />
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-end pt-6">
              <button
                onClick={handleNext}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3 rounded-lg transition-all hover:shadow-lg flex items-center gap-2"
              >
                Next Step
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </>
        )}
      </div>
    </motion.div>
  )
}