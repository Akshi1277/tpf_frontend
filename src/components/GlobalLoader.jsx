"use client";

export default function GlobalLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-black" />
    </div>
  );
}
