// lib/utils.js
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Used by Aceternity UI components
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const currency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
};