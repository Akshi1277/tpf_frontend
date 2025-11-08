
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
// Multi-field Adder Component
const MultiFieldAdder = ({ fields, setFields, fieldLabels, placeholder = "Add item" }) => {
  const addField = () => {
    setFields([...fields, ...fieldLabels.map(() => '')]);
  };

  const removeField = (index) => {
    const newFields = [...fields];
    newFields.splice(index * fieldLabels.length, fieldLabels.length);
    setFields(newFields);
  };

  const updateField = (index, labelIndex, value) => {
    const newFields = [...fields];
    newFields[index * fieldLabels.length + labelIndex] = value;
    setFields(newFields);
  };

  const groupCount = Math.ceil(fields.length / fieldLabels.length);

  return (
    <div className="space-y-4">
      {[...Array(groupCount)].map((_, groupIndex) => (
        <div key={groupIndex} className="bg-gray-50 p-4 rounded-xl space-y-3">
          {fieldLabels.map((label, labelIndex) => (
            <div key={labelIndex}>
              <label className="block text-xs sm:text-sm font-medium mb-2 text-gray-700">{label}</label>
              <input
                type={label.toLowerCase().includes('amount') || label.toLowerCase().includes('value') ? 'number' : 'text'}
                value={fields[groupIndex * fieldLabels.length + labelIndex] || ''}
                onChange={(e) => updateField(groupIndex, labelIndex, e.target.value)}
                placeholder={placeholder}
                className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all"
              />
            </div>
          ))}
          {groupCount > 1 && (
            <button
              onClick={() => removeField(groupIndex)}
              className="text-red-600 hover:text-red-700 font-medium text-sm flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Remove
            </button>
          )}
        </div>
      ))}
      <button
        onClick={addField}
        className="w-full py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-medium rounded-xl transition-all flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add Another
      </button>
    </div>
  );
};

// Modal Component
// Modal Component
const Modal = ({ isOpen, onClose, title, children, darkMode = false }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className={`rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl border-2 ${
            darkMode 
              ? 'bg-zinc-900 border-zinc-700 shadow-black/50' 
              : 'bg-white border-gray-200 shadow-gray-400/30'
          }`}
        >
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 p-6 shadow-lg">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">{title}</h3>
                <div className="h-1 w-20 bg-white/30 rounded-full" />
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-sm hover:scale-110 active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className={`p-6 sm:p-8 overflow-y-auto max-h-[calc(85vh-88px)] ${
            darkMode ? 'bg-zinc-900' : 'bg-white'
          }`}>
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Info Button Component
const InfoButton = ({ onClick, text = "Learn more" }) => (
  <button
    onClick={onClick}
    className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors"
  >
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span className="underline">{text}</span>
  </button>
);

// Yes/No Toggle Component
const YesNoToggle = ({ value, onChange, yesLabel = "Yes", noLabel = "No" }) => (
  <div className="grid grid-cols-2 gap-3 sm:gap-4">
    <button
      onClick={() => onChange(true)}
      className={`py-3 rounded-xl font-medium transition-all text-sm sm:text-base ${
        value
          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {yesLabel}
    </button>
    <button
      onClick={() => onChange(false)}
      className={`py-3 rounded-xl font-medium transition-all text-sm sm:text-base ${
        !value
          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {noLabel}
    </button>
  </div>
);

// Input Field Component
const InputField = ({ label, value, onChange, placeholder = "0.00", type = "number", helperText, prefix = "₹" }) => (
  <div>
    {label && (
      <label className="block text-sm sm:text-base font-semibold mb-2 text-gray-900">
        {label}
      </label>
    )}
    <div className="relative">
      <span className="absolute left-3 sm:left-4 top-3 sm:top-3.5 text-gray-400 text-sm sm:text-base">{prefix}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-8 sm:pl-9 pr-4 py-3 sm:py-3.5 text-sm sm:text-base rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all"
      />
    </div>
    {helperText && <p className="text-xs sm:text-sm text-gray-500 mt-1.5">{helperText}</p>}
  </div>
);

export { MultiFieldAdder, Modal, InfoButton, YesNoToggle, InputField };