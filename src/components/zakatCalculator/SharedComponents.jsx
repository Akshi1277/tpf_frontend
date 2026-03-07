import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// Multi-field Adder Component
const MultiFieldAdder = ({ fields, setFields, fieldLabels, placeholder = "Add item", darkMode = false }) => {
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
    <div className="space-y-3">
      {[...Array(groupCount)].map((_, groupIndex) => (
        <div key={groupIndex} className={`p-3 rounded-lg border ${
          darkMode ? 'bg-zinc-800/50 border-zinc-700' : 'bg-gray-50 border-gray-200'
        }`}>
          <div className="space-y-2">
            {fieldLabels.map((label, labelIndex) => (
              <div key={labelIndex}>
                <label className={`block text-xs font-medium mb-1 ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
                  {label}
                </label>
                <input
                  type={label.toLowerCase().includes('amount') || label.toLowerCase().includes('value') ? 'number' : 'text'}
                  value={fields[groupIndex * fieldLabels.length + labelIndex] || ''}
                  onChange={(e) => updateField(groupIndex, labelIndex, e.target.value)}
                  placeholder={placeholder}
                  className={`w-full px-3 py-2 text-sm rounded-lg border transition-colors outline-none ${
                    darkMode
                      ? 'bg-zinc-900 border-zinc-600 text-white placeholder-zinc-500 focus:border-emerald-500'
                      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500'
                  } focus:ring-2 focus:ring-emerald-500/20`}
                />
              </div>
            ))}
          </div>
          {groupCount > 1 && (
            <button
              onClick={() => removeField(groupIndex)}
              className="mt-2 text-xs text-red-500 hover:text-red-600 font-medium flex items-center gap-1 transition-colors"
            >
              <X className="w-3 h-3" />
              Remove
            </button>
          )}
        </div>
      ))}
      <button
        onClick={addField}
        className={`w-full py-2 text-sm font-medium rounded-lg border transition-colors flex items-center justify-center gap-1.5 ${
          darkMode
            ? 'bg-transparent border-zinc-700 text-zinc-300 hover:border-emerald-600 hover:text-emerald-400'
            : 'bg-white border-gray-200 text-gray-600 hover:border-emerald-400 hover:text-emerald-600'
        }`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add Another
      </button>
    </div>
  );
};

// Modal Component
const Modal = ({ isOpen, onClose, title, children, darkMode = false }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.96, opacity: 0, y: 8 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0, y: 8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className={`rounded-2xl max-w-xl w-full max-h-[85vh] overflow-hidden shadow-2xl ${
            darkMode ? 'bg-zinc-900 border border-zinc-700' : 'bg-white border border-gray-200'
          }`}
        >
          {/* Header */}
          <div className="px-6 py-4 border-b flex items-center justify-between" style={{
            background: 'linear-gradient(135deg, #2D7A5C 0%, #1E5A44 100%)',
            borderColor: 'transparent'
          }}>
            <h3 className="text-base font-bold text-white">{title}</h3>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          {/* Content */}
          <div className={`p-6 overflow-y-auto max-h-[calc(85vh-60px)] data-lenis-prevent ${darkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Info Button Component
const InfoButton = ({ onClick, text = "Learn more", darkMode = false }) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center gap-1 font-medium text-xs px-2.5 py-1 rounded-md border transition-colors ${
      darkMode
        ? 'text-emerald-400 border-emerald-800 hover:bg-emerald-950/50'
        : 'text-emerald-700 border-emerald-200 hover:bg-emerald-50'
    }`}
  >
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    {text}
  </button>
);

// Yes/No Toggle Component
const YesNoToggle = ({ value, onChange, yesLabel = "Yes", noLabel = "No", darkMode = false }) => (
  <div className="flex gap-2">
    <button
      onClick={() => onChange(true)}
      className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${
        value === true
          ? 'bg-emerald-600 text-white shadow-sm'
          : darkMode
          ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-700'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
      }`}
    >
      {yesLabel}
    </button>
    <button
      onClick={() => onChange(false)}
      className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${
        value === false
          ? 'bg-emerald-600 text-white shadow-sm'
          : darkMode
          ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-700'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
      }`}
    >
      {noLabel}
    </button>
  </div>
);

// Input Field Component
const InputField = ({ label, value, onChange, placeholder = "0.00", type = "number", helperText, prefix = "₹", darkMode = false }) => (
  <div>
    {label && (
      <label className={`block text-sm font-semibold mb-1.5 ${darkMode ? 'text-zinc-200' : 'text-gray-800'}`}>
        {label}
      </label>
    )}
    <div className="relative">
      <span className={`absolute left-3 top-2.5 text-sm ${darkMode ? 'text-zinc-500' : 'text-gray-400'}`}>{prefix}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full pl-8 pr-4 py-2.5 text-sm rounded-lg border transition-colors outline-none ${
          darkMode
            ? 'bg-zinc-900 border-zinc-700 text-white placeholder-zinc-500 focus:border-emerald-500'
            : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500'
        } focus:ring-2 focus:ring-emerald-500/20`}
      />
    </div>
    {helperText && <p className={`text-xs mt-1 ${darkMode ? 'text-zinc-500' : 'text-gray-500'}`}>{helperText}</p>}
  </div>
);

export { MultiFieldAdder, Modal, InfoButton, YesNoToggle, InputField };