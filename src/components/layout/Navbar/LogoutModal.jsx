'use client';
import { Heart } from 'lucide-react';

export default function LogoutModal({ darkMode, isLoggingOut, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className={`relative w-full max-w-sm rounded-2xl p-6 shadow-2xl
        ${darkMode
          ? 'bg-zinc-900 border border-zinc-800 text-white'
          : 'bg-white border border-zinc-200 text-zinc-900'}`}>
        <div className="flex justify-center mb-3">
          <div className="w-11 h-11 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
            <Heart className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
        </div>
        <h3 className="text-base font-semibold text-center mb-1.5">
          Are you sure you want to leave?
        </h3>
        <p className={`text-xs text-center mb-5 leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
          Staying logged in helps us reduce operational costs and lets your support reach those who need it faster.
        </p>
        <div className="flex gap-2.5">
          <button
            onClick={onCancel}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all
              ${darkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-white' : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800'}`}
          >
            Stay Logged In
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoggingOut}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium text-white transition-all
              ${isLoggingOut ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 cursor-pointer'}`}
          >
            {isLoggingOut ? 'Signing out…' : 'Sign Out'}
          </button>
        </div>
      </div>
    </div>
  );
}