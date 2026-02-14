"use client"

import { motion } from "framer-motion"
import { FileText, ChevronRight, ChevronLeft, Upload, X, AlertCircle } from "lucide-react"
import FilePreview from "../../FilePreview"

export default function DocumentsStep({ 
  formData, 
  handleInputChange, 
  removeFile,
  handleNext, 
  handleBack,
  darkMode 
}) {
  const isNGO = formData.isNGO === "yes"

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <FileText className={`w-8 h-8 ${darkMode ? "text-emerald-400" : "text-emerald-600"}`} />
        <h2 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-zinc-900"}`}>
          Documents & Certifications
        </h2>
      </div>

      {isNGO ? (
        // NGO Documents
        <div className="space-y-6">
          <p className={`${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
            Upload your NGO certifications and documents. Please provide at least one verification document.
          </p>

          {/* 80G Certification */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
              Do you have 80G Certification? <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleInputChange({ target: { name: "has80G", value: "yes" } })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  formData.has80G === "yes"
                    ? darkMode
                      ? "border-emerald-500 bg-emerald-500/10"
                      : "border-emerald-600 bg-emerald-50"
                    : darkMode
                    ? "border-zinc-700 hover:border-zinc-600"
                    : "border-zinc-200 hover:border-zinc-300"
                }`}
              >
                <p className={`font-medium ${darkMode ? "text-white" : "text-zinc-900"}`}>Yes</p>
              </button>
              <button
                type="button"
                onClick={() => handleInputChange({ target: { name: "has80G", value: "no" } })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  formData.has80G === "no"
                    ? darkMode
                      ? "border-emerald-500 bg-emerald-500/10"
                      : "border-emerald-600 bg-emerald-50"
                    : darkMode
                    ? "border-zinc-700 hover:border-zinc-600"
                    : "border-zinc-200 hover:border-zinc-300"
                }`}
              >
                <p className={`font-medium ${darkMode ? "text-white" : "text-zinc-900"}`}>No</p>
              </button>
            </div>
          </div>

          {formData.has80G === "yes" && (
            <>
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                  80G Certificate Expiry Date
                </label>
                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${
                    darkMode
                      ? "bg-zinc-700 border-zinc-600 text-white focus:border-emerald-500"
                      : "bg-white border-zinc-300 text-zinc-900 focus:border-emerald-600"
                  } focus:outline-none focus:ring-2 focus:ring-emerald-500/20`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                  Upload 80G Certificate
                </label>
                <div className={`border-2 border-dashed rounded-lg p-6 ${
                  darkMode ? "border-zinc-700 bg-zinc-800/50" : "border-zinc-300 bg-zinc-50"
                }`}>
                  {formData.certification80G ? (
                    <FilePreview 
                      file={formData.certification80G} 
                      darkMode={darkMode}
                      onRemove={() => removeFile("certification80G")}
                    />
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center gap-2">
                      <Upload className={`w-8 h-8 ${darkMode ? "text-zinc-500" : "text-zinc-400"}`} />
                      <span className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                        Click to upload (PDF, JPG, PNG)
                      </span>
                      <input
                        type="file"
                        name="certification80G"
                        onChange={handleInputChange}
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            </>
          )}

          {/* PAN Card - Optional */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
              PAN Card Number (Optional)
            </label>
            <input
              type="text"
              name="panCard"
              value={formData.panCard}
              onChange={handleInputChange}
              placeholder="ABCDE1234F"
              maxLength={10}
              className={`w-full px-4 py-2.5 rounded-lg border transition-colors uppercase ${
                darkMode
                  ? "bg-zinc-700 border-zinc-600 text-white placeholder-zinc-400 focus:border-emerald-500"
                  : "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400 focus:border-emerald-600"
              } focus:outline-none focus:ring-2 focus:ring-emerald-500/20`}
            />
          </div>

          {formData.panCard && (
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                Upload PAN Card
              </label>
              <div className={`border-2 border-dashed rounded-lg p-6 ${
                darkMode ? "border-zinc-700 bg-zinc-800/50" : "border-zinc-300 bg-zinc-50"
              }`}>
                {formData.panCardImage ? (
                  <FilePreview 
                    file={formData.panCardImage} 
                    darkMode={darkMode}
                    onRemove={() => removeFile("panCardImage")}
                  />
                ) : (
                  <label className="cursor-pointer flex flex-col items-center gap-2">
                    <Upload className={`w-8 h-8 ${darkMode ? "text-zinc-500" : "text-zinc-400"}`} />
                    <span className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                      Click to upload (PDF, JPG, PNG)
                    </span>
                    <input
                      type="file"
                      name="panCardImage"
                      onChange={handleInputChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>
          )}

          {/* FCRA Certification */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
              Do you have FCRA Certification? <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleInputChange({ target: { name: "hasFCRA", value: "yes" } })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  formData.hasFCRA === "yes"
                    ? darkMode
                      ? "border-emerald-500 bg-emerald-500/10"
                      : "border-emerald-600 bg-emerald-50"
                    : darkMode
                    ? "border-zinc-700 hover:border-zinc-600"
                    : "border-zinc-200 hover:border-zinc-300"
                }`}
              >
                <p className={`font-medium ${darkMode ? "text-white" : "text-zinc-900"}`}>Yes</p>
              </button>
              <button
                type="button"
                onClick={() => handleInputChange({ target: { name: "hasFCRA", value: "no" } })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  formData.hasFCRA === "no"
                    ? darkMode
                      ? "border-emerald-500 bg-emerald-500/10"
                      : "border-emerald-600 bg-emerald-50"
                    : darkMode
                    ? "border-zinc-700 hover:border-zinc-600"
                    : "border-zinc-200 hover:border-zinc-300"
                }`}
              >
                <p className={`font-medium ${darkMode ? "text-white" : "text-zinc-900"}`}>No</p>
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Non-NGO Documents
        <div className="space-y-6">
          <div className={`p-4 rounded-lg flex items-start gap-3 ${
            darkMode ? "bg-blue-500/10 border border-blue-500/20" : "bg-blue-50 border border-blue-200"
          }`}>
            <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
            <p className={`text-sm ${darkMode ? "text-blue-300" : "text-blue-800"}`}>
              <strong>Document Requirement:</strong> Please upload at least ONE of the following documents: 
              GST Certificate, CIN (Certificate of Incorporation), PAN Card, or any other valid business registration document.
            </p>
          </div>

          {/* Document Type Selection */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
              Select Document Type <span className="text-red-500">*</span>
            </label>
            <select
              name="documentType"
              value={formData.documentType}
              onChange={handleInputChange}
              className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${
                darkMode
                  ? "bg-zinc-700 border-zinc-600 text-white focus:border-emerald-500"
                  : "bg-white border-zinc-300 text-zinc-900 focus:border-emerald-600"
              } focus:outline-none focus:ring-2 focus:ring-emerald-500/20`}
            >
              <option value="">Choose document type</option>
              <option value="gst">GST Certificate</option>
              <option value="cin">CIN (Certificate of Incorporation)</option>
              <option value="pan">PAN Card</option>
              <option value="other">Other Business Registration Document</option>
            </select>
          </div>

          {formData.documentType && (
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                Upload {formData.documentType === "gst" ? "GST Certificate" : 
                        formData.documentType === "cin" ? "CIN (Certificate of Incorporation)" : 
                        formData.documentType === "pan" ? "PAN Card" :
                        "Business Registration Document"} <span className="text-red-500">*</span>
              </label>
              <div className={`border-2 border-dashed rounded-lg p-6 ${
                darkMode ? "border-zinc-700 bg-zinc-800/50" : "border-zinc-300 bg-zinc-50"
              }`}>
                {formData.businessDocument ? (
                  <FilePreview 
                    file={formData.businessDocument} 
                    darkMode={darkMode}
                    onRemove={() => removeFile("businessDocument")}
                  />
                ) : (
                  <label className="cursor-pointer flex flex-col items-center gap-2">
                    <Upload className={`w-8 h-8 ${darkMode ? "text-zinc-500" : "text-zinc-400"}`} />
                    <span className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                      Click to upload (PDF, JPG, PNG)
                    </span>
                    <input
                      type="file"
                      name="businessDocument"
                      onChange={handleInputChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <p className={`text-xs mt-1 ${darkMode ? "text-zinc-500" : "text-zinc-400"}`}>
                Upload a clear, readable copy of your {formData.documentType === "gst" ? "GST certificate" : 
                formData.documentType === "cin" ? "incorporation certificate" : 
                formData.documentType === "pan" ? "PAN card" : "business document"}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-6 mt-6">
        <button
          onClick={handleBack}
          className={`px-8 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
            darkMode
              ? "bg-zinc-700 hover:bg-zinc-600 text-white"
              : "bg-zinc-200 hover:bg-zinc-300 text-zinc-900"
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>
        <button
          onClick={handleNext}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3 rounded-lg transition-all hover:shadow-lg flex items-center gap-2"
        >
          Next Step
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  )
}