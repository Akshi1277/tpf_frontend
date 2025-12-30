"use client";
import { X, Copy, Share2 } from "lucide-react";
import { useState } from "react";

export default function ShareModal({ url, title, onClose }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            await navigator.share({
                title,
                url,
            });
        }
    };

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-sm rounded-2xl bg-white dark:bg-zinc-900 p-5 relative">

                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute cursor-pointer top-3 right-3 text-zinc-500 hover:text-zinc-800 dark:hover:text-white"
                >
                    <X className="w-5 h-5" />
                </button>

                <h3 className="text-lg font-semibold mb-4 text-zinc-900 dark:text-white">
                    Share Campaign
                </h3>

                {/* Link box */}
                <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 p-2 rounded-lg mb-4">
                    <input
                        readOnly
                        value={url}
                        className="flex-1 bg-transparent text-xs text-zinc-700 dark:text-zinc-300 outline-none"
                    />
                    <button
                        onClick={handleCopy}
                        className="p-2 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700"
                    >
                        <Copy className="w-4 h-4" />
                    </button>
                </div>

                {copied && (
                    <p className="text-xs text-emerald-500 mb-3">Link copied!</p>
                )}

                {/* Share buttons */}
                <div className="grid grid-cols-2 gap-3">
                    <a
                        href={`https://wa.me/?text=${encodeURIComponent(url)}`}
                        target="_blank"
                        className="bg-green-500 text-white py-2 rounded-lg text-center text-sm"
                    >
                        WhatsApp
                    </a>

                    <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
                        target="_blank"
                        className="bg-blue-600 text-white py-2 rounded-lg text-center text-sm"
                    >
                        Facebook
                    </a>

                    <a
                        href={`https://twitter.com/intent/tweet?url=${url}`}
                        target="_blank"
                        className="bg-sky-500 text-white py-2 rounded-lg text-center text-sm"
                    >
                        Twitter
                    </a>

                    {navigator.share && (
                        <button
                            onClick={handleNativeShare}
                            className="flex items-center justify-center gap-2 bg-zinc-700 text-white py-2 rounded-lg text-sm"
                        >
                            <Share2 className="w-4 h-4" /> More
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
