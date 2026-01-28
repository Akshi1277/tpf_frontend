"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, X, Volume2, VolumeX, Loader2, Bot, Trash2, User, Sparkles } from "lucide-react";
import axios from "axios";

export default function VoiceAssistant() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [history, setHistory] = useState([]);
    const [interimTranscript, setInterimTranscript] = useState("");
    const [error, setError] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const synthesisRef = useRef(null);
    const recognitionRef = useRef(null);
    const scrollRef = useRef(null);
    const transcriptRef = useRef(""); // Keep a ref for the latest transcript

    // Initial Welcome Message
    useEffect(() => {
        if (history.length === 0) {
            setHistory([
                { role: "assistant", text: "Hello! I am your True Path Foundation Assistant. How can I help you today?" }
            ]);
        }
    }, [history.length]);

    // Handle Dark Mode Sync
    useEffect(() => {
        const checkDarkMode = () => {
            const savedMode = localStorage.getItem('darkMode');
            setIsDarkMode(savedMode === 'true');
        };

        checkDarkMode();
        window.addEventListener('darkModeChanged', checkDarkMode);
        const interval = setInterval(checkDarkMode, 1000); // Polling as backup

        return () => {
            window.removeEventListener('darkModeChanged', checkDarkMode);
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        synthesisRef.current = window.speechSynthesis;

        if (typeof window !== "undefined" && (window.webkitSpeechRecognition || window.SpeechRecognition)) {
            const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;

            recognitionRef.current.onresult = (event) => {
                let transcript = "";
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    transcript += event.results[i][0].transcript;
                }
                setInterimTranscript(transcript);
                transcriptRef.current = transcript;
            };

            recognitionRef.current.onend = () => {
                if (isRecording) {
                    try { recognitionRef.current.start(); } catch (e) { }
                }
            };
        }

        return () => {
            if (synthesisRef.current) synthesisRef.current.cancel();
            if (recognitionRef.current) recognitionRef.current.stop();
        };
    }, [isRecording]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history, interimTranscript, isProcessing]);

    const toggleAssistant = () => {
        setIsExpanded(!isExpanded);
        if (isRecording) stopRecording();
        if (isSpeaking) {
            synthesisRef.current.cancel();
            setIsSpeaking(false);
        }
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
                const finalTranscript = transcriptRef.current.trim();
                sendToAI(audioBlob, finalTranscript);
            };

            mediaRecorderRef.current.start();
            if (recognitionRef.current) {
                transcriptRef.current = "";
                setInterimTranscript("");
                try { recognitionRef.current.start(); } catch (e) { }
            }

            setIsRecording(true);
            setError(null);
            if (isSpeaking) {
                synthesisRef.current.cancel();
                setIsSpeaking(false);
            }
        } catch (err) {
            console.error("Mic access error:", err);
            setError("Microphone access denied.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            if (recognitionRef.current) {
                try { recognitionRef.current.stop(); } catch (e) { }
            }
            setIsRecording(false);
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        }
    };

    const sendToAI = async (audioBlob, transcript) => {
        setIsProcessing(true);

        // Add user message with WHATEVER was captured (even if empty, show something professional)
        const userMsgText = transcript || "Querying...";
        setHistory(prev => [...prev, { role: "user", text: userMsgText }]);

        const formData = new FormData();
        formData.append("audio", audioBlob, "query.webm");
        formData.append("history", JSON.stringify(history));

        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/ai/voice-query`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            if (res.data.success) {
                const aiText = res.data.data;
                setHistory(prev => [...prev, { role: "assistant", text: aiText }]);
                speak(aiText);
            }
        } catch (err) {
            console.error("AI Query Error:", err);
            setError("AI service unavailable.");
            setHistory(prev => prev.slice(0, -1));
        } finally {
            setIsProcessing(false);
            setInterimTranscript("");
            transcriptRef.current = "";
        }
    };

    const speak = (text) => {
        if (!synthesisRef.current) return;
        synthesisRef.current.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        const voices = synthesisRef.current.getVoices();

        // Use manually selected voice if available
        if (synthesisRef.current.currentVoiceName) {
            const selected = voices.find(v => v.name === synthesisRef.current.currentVoiceName);
            if (selected) {
                utterance.voice = selected;
                utterance.rate = 1.1;
                utterance.pitch = 0.9;
                utterance.onstart = () => setIsSpeaking(true);
                utterance.onend = () => setIsSpeaking(false);
                utterance.onerror = () => setIsSpeaking(false);
                synthesisRef.current.speak(utterance);
                console.log("Using manual voice:", selected.name);
                return;
            }
        }

        // AUTO: High-Quality Google Indian/English
        const premiumMaleVoice = voices.find(v => v.lang === "en-IN" && v.name.includes("Google"))
            || voices.find(v => v.lang === "en-IN" && (v.name.includes("Ravi") || v.name.includes("Hemant")))
            || voices.find(v => (v.name.includes("Google") || v.name.includes("Natural")) && v.lang.startsWith("en") && !v.name.includes("Female"))
            || voices.find(v => v.lang === "en-GB" && v.name.includes("Male"))
            || voices[0];

        if (premiumMaleVoice) utterance.voice = premiumMaleVoice;
        utterance.rate = 1.1;
        utterance.pitch = 0.95;
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        console.log("Using auto voice:", premiumMaleVoice?.name);
        synthesisRef.current.speak(utterance);
    };

    const clearHistory = () => {
        setHistory([{ role: "assistant", text: "How else can I assist you today?" }]);
        if (isSpeaking) synthesisRef.current.cancel();
    };

    return (
        <div className={`fixed bottom-6 right-6 z-[1000000] flex flex-col items-end gap-3 pointer-events-none`}>
            {/* Custom Scrollbar Styles */}
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 5px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: ${isDarkMode ? '#3f3f46' : '#e2e8f0'};
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #10b981;
                }
            `}</style>

            {/* Launcher */}
            {!isExpanded && (
                <motion.div
                    layoutId="assistant-btn"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex flex-col items-center gap-2 pointer-events-auto cursor-pointer"
                    onClick={toggleAssistant}
                >
                    <div className="relative group">
                        {!isDarkMode && <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-500 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-500"></div>}
                        <button className={`relative w-16 h-16 rounded-full flex items-center justify-center shadow-xl border-2 transition-all ${isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-white'}`}>
                            <img
                                src={isDarkMode ? "/TPFAid-Logo1.png" : "/TPFAid-Logo.png"}
                                alt="TPF"
                                className="w-10 h-10 object-contain"
                            />
                        </button>
                    </div>
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full shadow-sm border uppercase tracking-widest ${isDarkMode ? 'bg-zinc-900 text-zinc-100 border-zinc-800' : 'bg-white text-emerald-900 border-emerald-50'}`}>
                        TPF Assistant
                    </span>
                </motion.div>
            )}

            <AnimatePresence mode="wait">
                {isExpanded && (
                    <motion.div
                        key="assistant-chat-window"
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.95 }}
                        className={`w-[320px] sm:w-[400px] h-[600px] rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border flex flex-col overflow-hidden pointer-events-auto transition-colors duration-300 ${isDarkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-gray-100'}`}
                    >
                        <div className="bg-emerald-600 p-4 shrink-0 flex items-center justify-between border-b border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/30">
                                    <img
                                        src={isDarkMode ? "/TPFAid-Logo1.png" : "/TPFAid-Logo.png"}
                                        alt="TPF"
                                        className={`w-6 h-6 object-contain ${!isDarkMode && 'invert brightness-0'}`}
                                    />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-sm tracking-tight">Support Assistant</h3>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                       
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button onClick={clearHistory} className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                                    <Trash2 size={18} />
                                </button>
                                <button onClick={toggleAssistant} className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        <div
                            ref={scrollRef}
                            data-lenis-prevent
                            className={`flex-1 overflow-y-auto p-5 space-y-5 flex flex-col scroll-smooth custom-scrollbar pointer-events-auto ${isDarkMode ? 'bg-zinc-950' : 'bg-gray-50/50'}`}
                            style={{ WebkitOverflowScrolling: 'touch' }}
                        >
                            {history.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: msg.role === "user" ? 10 : -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div className={`max-w-[90%] flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                                        <div className={`w-7 h-7 shrink-0 rounded-full flex items-center justify-center text-[10px] ${msg.role === "user" ? "bg-emerald-500 text-white" : "bg-zinc-800 text-white"}`}>
                                            {msg.role === "user" ? <User size={14} /> : <Bot size={14} />}
                                        </div>
                                        <div className={`p-4 rounded-2xl text-[13px] leading-relaxed shadow-sm ${msg.role === "user"
                                            ? isDarkMode ? "bg-zinc-800 text-zinc-100 border border-zinc-700/50 rounded-tr-none" : "bg-white border border-gray-100 text-gray-800 rounded-tr-none"
                                            : "bg-emerald-600 text-white rounded-tl-none font-medium"
                                            }`}>
                                            {msg.text}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Processing Status */}
                            {isProcessing && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                                    <div className={`p-3 rounded-2xl rounded-tl-none flex items-center gap-3 shadow-sm border ${isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100'}`}>
                                        <Loader2 className="w-3 h-3 text-emerald-500 animate-spin" />
                                        <span className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-gray-400'}`}>Gemini is Thinking</span>
                                    </div>
                                </motion.div>
                            )}

                            {/* Live Transcript - Clean Bubble */}
                            {interimTranscript && (
                                <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="flex justify-end">
                                    <div className={`p-4 rounded-2xl rounded-tr-none text-xs leading-relaxed border shadow-sm ${isDarkMode ? 'bg-emerald-950/20 border-emerald-900/40 text-emerald-400' : 'bg-emerald-50 border-emerald-100 text-emerald-800'}`}>
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></div>
                                            <span className="font-bold uppercase text-[9px] tracking-widest opacity-60">Transcript</span>
                                        </div>
                                        {interimTranscript}
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Footer Controls - Clean & Minimalist */}
                        <div className={`p-5 border-t ${isDarkMode ? 'bg-zinc-950 border-zinc-900' : 'bg-white border-gray-100'}`}>
                            {error && (
                                <p className="text-red-500 text-[10px] font-bold mb-4 text-center uppercase tracking-widest">{error}</p>
                            )}

                            <div className="flex gap-3">
                                {isRecording ? (
                                    <button
                                        onClick={stopRecording}
                                        className="w-full h-12 bg-red-600 text-white rounded-2xl font-bold transition-all shadow-lg shadow-red-900/20 active:scale-95 flex items-center justify-center gap-3"
                                    >
                                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                        <span>STOP & SEND</span>
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            disabled={isProcessing}
                                            onClick={startRecording}
                                            className={`flex-1 h-12 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-900/10 active:scale-95 flex items-center justify-center gap-3 ${isProcessing ? 'opacity-50' : ''}`}
                                        >
                                            <Mic size={20} />
                                            <span>Start Speaking</span>
                                        </button>

                                        {/* Voice Cycle Button - Hidden Feature for Customization */}
                                        <button
                                            onClick={() => {
                                                const voices = synthesisRef.current.getVoices();
                                                const maleVoices = voices.filter(v =>
                                                    (v.lang.includes("en") || v.lang.includes("ar")) &&
                                                    (v.name.includes("Male") || v.name.includes("David") || v.name.includes("Mark") || v.name.includes("Ravi") || v.name.includes("Google") || v.name.includes("Natural"))
                                                );
                                                // Find current index and pick next
                                                let currentVoiceName = synthesisRef.current.currentVoiceName;
                                                let currentIndex = maleVoices.findIndex(v => v.name === currentVoiceName);
                                                let nextVoice = maleVoices[(currentIndex + 1) % maleVoices.length] || voices[0];

                                                // Save preference temporarily
                                                synthesisRef.current.currentVoiceName = nextVoice.name;

                                                // Feedback speak
                                                synthesisRef.current.cancel();
                                                const utt = new SpeechSynthesisUtterance("Voice changed. How is this?");
                                                utt.voice = nextVoice;
                                                utt.rate = 1.1;
                                                utt.pitch = 0.9; // Deeper tone
                                                synthesisRef.current.speak(utt);
                                            }}
                                            className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all ${isDarkMode ? 'bg-zinc-900 text-zinc-400 hover:text-emerald-400' : 'bg-gray-100 text-gray-500 hover:text-emerald-600'}`}
                                            title="Change Voice"
                                        >
                                            <Sparkles size={20} />
                                        </button>

                                        {isSpeaking && (
                                            <button
                                                onClick={() => { synthesisRef.current.cancel(); setIsSpeaking(false); }}
                                                className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all ${isDarkMode ? 'bg-zinc-900 text-zinc-400' : 'bg-gray-100 text-gray-500'}`}
                                            >
                                                <VolumeX size={20} />
                                            </button>
                                        )}
                                    </>
                                )}
                            </div>

                            <div className="mt-4 flex items-center justify-center gap-2 opacity-30 grayscale pointer-events-none">
                               
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
