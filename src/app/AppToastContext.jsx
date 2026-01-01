"use client";

import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext(null);

export function AppToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((options) => {
    setToast({ ...options, id: Date.now() });

    if (options.duration !== 0) {
      setTimeout(() => {
        setToast(null);
      }, options.duration ?? 2000);
    }
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  return (
    <ToastContext.Provider value={{ toast, showToast, hideToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useAppToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useAppToast must be used inside AppToastProvider");
  }
  return ctx;
}
