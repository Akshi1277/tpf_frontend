'use client';

import { AnimatePresence, motion } from "framer-motion";
import { Check, XCircle, AlertTriangle, Info } from "lucide-react";
import { useAppToast } from "@/app/AppToastContext";

export default function AppToast({ darkMode = false }) {
  const { toast } = useAppToast();

  if (!toast) return null;

  const ICON_MAP = {
    success: <Check className="w-5 h-5 text-white" strokeWidth={3} />,
    error: <XCircle className="w-5 h-5 text-white" strokeWidth={3} />,
    warning: <AlertTriangle className="w-5 h-5 text-white" strokeWidth={3} />,
    info: <Info className="w-5 h-5 text-white" strokeWidth={3} />,
  };

  const COLOR_MAP = {
    success: "bg-emerald-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500",
  };

  return (
    <AnimatePresence>
      <motion.div
        key={toast.id}
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={`fixed top-4 sm:top-6 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 
          sm:max-w-md z-[9999] px-4 sm:px-6 py-3 sm:py-4 
          rounded-xl sm:rounded-2xl shadow-2xl flex items-center gap-3
          ${darkMode
            ? "bg-zinc-900 border border-white/10"
            : "bg-white border border-zinc-200"
          }`}
      >
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${COLOR_MAP[toast.type]}`}
        >
          {ICON_MAP[toast.type]}
        </div>

        <div className="flex-1 min-w-0">
          <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
            {toast.title}
          </p>
          {toast.message && (
            <p className={`text-sm ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
              {toast.message}
            </p>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
