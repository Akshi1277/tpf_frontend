"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, X, Volume2, VolumeX, Loader2, Bot, Trash2, User, Sparkles, Calculator, UserPlus, AlertCircle, Settings2, Send, Minimize2 } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useGetPeopleHelpedStatsQuery, useRegisterVolunteerMutation } from "@/utils/slices/authApiSlice";
import { useFetchMyDonationsQuery } from "@/utils/slices/donationApiSlice";
import { useFetchCampaignsQuery } from "@/utils/slices/campaignApiSlice";
import { useAppToast } from "@/app/AppToastContext";
import { getMediaUrl } from "@/utils/media";

// Sub-component for Campaign Card (Stable definition outside)
const CampaignCard = ({ data, isDarkMode, router }) => {
    const goalAmount = data.goal || 0;
    const raisedAmount = data.raised || 0;
    const progress = goalAmount > 0 ? Math.min(Math.round((raisedAmount / goalAmount) * 100), 100) : 0;
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`mt-3 p-3 rounded-2xl border ${isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100'} shadow-md overflow-hidden`}
        >
            <div className="relative h-24 mb-3 rounded-xl overflow-hidden bg-gray-100">
                <img
                    src={getMediaUrl(data.image)}
                    alt={data.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 px-2 py-0.5 bg-emerald-500 text-white text-[8px] font-bold rounded-full">
                    ACTIVE
                </div>
            </div>
            <h4 className={`text-[11px] font-bold mb-2 line-clamp-1 ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>{data.title}</h4>
            <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] items-end">
                    <span className="text-emerald-500 font-bold">₹{(raisedAmount).toLocaleString()}</span>
                    <span className={isDarkMode ? 'text-zinc-500' : 'text-gray-400'}>Goal: ₹{(goalAmount).toLocaleString()}</span>
                </div>
                <div className={`h-1.5 w-full rounded-full overflow-hidden ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-100'}`}>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
                    />
                </div>
            </div>
            <button
                onClick={() => router.push(`/campaign/${data.slug}`)}
                className="pointer-events-auto w-full mt-3 py-2 bg-emerald-600 text-white text-[10px] font-bold rounded-lg hover:bg-emerald-700 transition-colors"
            >
                DONATE NOW
            </button>
        </motion.div>
    );
};

// Sub-component for Waveform Visualizer
const WaveformVisualizer = ({ isSpeaking }) => {
    return (
        <div className="flex items-center gap-1 h-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <motion.div
                    key={i}
                    animate={{
                        height: isSpeaking ? [4, 16, 8, 14, 6] : 4,
                    }}
                    transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.1,
                        ease: "easeInOut"
                    }}
                    className="w-1 bg-emerald-500 rounded-full"
                />
            ))}
        </div>
    );
};

// Sub-component for Quick Action Buttons
const QuickActions = ({ onAction, isDarkMode }) => {
    const actions = [
        { id: 'zakat', label: 'Calculate Zakat', icon: <Calculator size={14} />, query: 'How can I calculate my Zakat?' },
        { id: 'volunteer', label: 'Be a Volunteer', icon: <UserPlus size={14} />, query: 'I want to register as a volunteer.' },
        { id: 'urgent', label: 'Urgent Causes', icon: <AlertCircle size={14} />, query: 'Show me some urgent campaigns.' },
    ];

    return (
        <div className="flex flex-wrap gap-2 mt-2">
            {actions.map((action) => (
                <button
                    key={action.id}
                    onClick={() => onAction(action.query)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all border ${isDarkMode
                        ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:border-emerald-500/50'
                        : 'bg-white border-gray-100 text-gray-600 shadow-sm hover:border-emerald-500/50 hover:bg-emerald-50/50 hover:text-emerald-700'
                        }`}
                >
                    <span className="text-emerald-500">{action.icon}</span>
                    {action.label}
                </button>
            ))}
        </div>
    );
};

export default function VoiceAssistant() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showLauncherGreeting, setShowLauncherGreeting] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [history, setHistory] = useState([]);
    const [interimTranscript, setInterimTranscript] = useState("");
    const [error, setError] = useState(null);
    const [showCloseConfirm, setShowCloseConfirm] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [textInput, setTextInput] = useState("");
    const router = useRouter();

    // Redux & API Data for Personalization
    const { userInfo } = useSelector((state) => state.auth);

    // Memoize arguments to prevent infinite re-fetch loops
    const donationParams = useMemo(() => ({ limit: 1 }), []);

    const { data: impactData } = useGetPeopleHelpedStatsQuery(undefined, { skip: !userInfo });
    const { data: donationsData } = useFetchMyDonationsQuery(donationParams, { skip: !userInfo });
    const { data: campaignList } = useFetchCampaignsQuery();

    const activeCampaigns = useMemo(() =>
        campaignList?.campaigns?.slice(0, 3).map(c => ({
            title: c.title,
            raised: c.raisedAmount,
            goal: c.targetAmount,
            slug: c.slug,
            image: c.imageUrl
        })) || []
        , [campaignList]);

    const userContext = useMemo(() => ({
        fullName: userInfo?.fullName || "Guest",
        isLoggedIn: !!userInfo,
        peopleHelped: impactData?.data?.totalPeopleHelped || 0,
        lastDonation: donationsData?.donations?.[0] ? {
            amount: donationsData.donations[0].amount,
            date: donationsData.donations[0].date,
            txnid: donationsData.donations[0].id,
            taxEligible: donationsData.donations[0].taxEligible
        } : null,
        featuredCampaigns: activeCampaigns
    }), [userInfo, impactData, donationsData, activeCampaigns]);

    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    // Hands-Free Form Filling State
    const [isIntakeActive, setIsIntakeActive] = useState(false);
    const [volunteerData, setVolunteerData] = useState({
        fullName: "", email: "", phone: "", gender: "", state: "", city: "", expertise: ""
    });
    const [lastCapturedField, setLastCapturedField] = useState(null);

    const [registerVolunteer] = useRegisterVolunteerMutation();
    const { showToast } = useAppToast();

    const fetchCampaigns = useFetchCampaignsQuery();
    const campaigns = useMemo(() => fetchCampaigns?.data?.campaigns || [], [fetchCampaigns.data]);

    const synthesisRef = useRef(null);
    const recognitionRef = useRef(null);
    const scrollRef = useRef(null);
    const transcriptRef = useRef(""); // Keep a ref for the latest transcript

    // Initial Welcome Message
    useEffect(() => {
        if (history.length === 0) {
            const greeting = userContext?.fullName
                ? `Assalamu Alaikum, ${userContext.fullName}! I am Abeer. ${userContext.peopleHelped > 0 ? `Your support has helped ${userContext.peopleHelped} ${userContext.peopleHelped === 1 ? 'family' : 'families'} so far.` : ''} How can I help you today?`
                : "Assalamu Alaikum! I am Abeer, your assistant from True Path Foundation. How can I help you today?";

            setHistory([
                { role: "assistant", text: greeting }
            ]);
        }
    }, [history.length, userContext?.fullName, userContext?.peopleHelped]);

    // Show launcher greeting after a delay and keep it visible
    useEffect(() => {
        let timer;
        if (!isExpanded) {
            timer = setTimeout(() => {
                setShowLauncherGreeting(true);
            }, 3500);
        } else {
            setShowLauncherGreeting(false);
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [isExpanded]);

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
        setIsMinimized(false);
        if (isRecording) stopRecording();
        if (isSpeaking) {
            synthesisRef.current.cancel();
            setIsSpeaking(false);
        }
    };

    const handleMinimize = (e) => {
        e.stopPropagation();
        setIsMinimized(true);
        setIsExpanded(false);
    };

    const handleCloseClick = (e) => {
        e.stopPropagation();
        setShowCloseConfirm(true);
    };

    const confirmClose = () => {
        const byeMessage = "Assalamu Alaikum! It was a pleasure assisting you. Have a blessed day! Good bye.";
        setHistory(prev => [...prev, { role: "assistant", text: byeMessage }]);
        speak(byeMessage);

        setTimeout(() => {
            clearHistory();
            setIsExpanded(false);
            setShowCloseConfirm(false);
        }, 3000);
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

        // Add user message with captured transcript or professional placeholder
        const userMsgText = transcript || "Unlocking insights...";
        setHistory(prev => [...prev, { role: "user", text: userMsgText }]);

        const formData = new FormData();
        if (audioBlob) {
            formData.append("audio", audioBlob, "query.webm");
        }
        if (transcript) {
            formData.append("transcript", transcript);
        }
        formData.append("history", JSON.stringify(history));
        if (userContext) {
            formData.append("userContext", JSON.stringify(userContext));
        }

        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/ai/voice-query`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            if (res.data.success) {
                let aiText = res.data.data;

                // Handle Page Redirection Tag
                const gotoMatch = aiText.match(/\[GOTO:\s*([^\]]+)\]/);
                if (gotoMatch) {
                    const path = gotoMatch[1].trim();
                    console.log("Assistant Redirecting to:", path);

                    // Add a friendly redirection message if AI didn't provide enough text
                    let displayAiText = aiText.replace(/\[GOTO:\s*([^\]]+)\]/, "").trim();
                    if (!displayAiText || displayAiText.length < 5) {
                        displayAiText = "Sure! I'm redirecting you to that page now to help you with your question.";
                    }

                    setHistory(prev => [...prev, { role: "assistant", text: displayAiText }]);
                    speak(displayAiText);

                    // Delay redirection slightly so user can hear/read the response, then close
                    setTimeout(() => {
                        router.push(path);
                        setIsExpanded(false);
                    }, 3500);

                    return; // Exit early as we've already handled history and speech
                }

                // Handle Intake Mode Tags
                const intakeMatches = [...aiText.matchAll(/\[INTAKE:\s*({.*?})\]/g)];
                if (intakeMatches.length > 0) {
                    setIsIntakeActive(true);
                    intakeMatches.forEach(match => {
                        try {
                            const data = JSON.parse(match[1]);
                            setVolunteerData(prev => ({ ...prev, [data.field]: data.value }));
                            setLastCapturedField(data.field);
                        } catch (e) {
                            console.error("Intake parse error:", e);
                        }
                    });
                    aiText = aiText.replace(/\[INTAKE:\s*({.*?})\]/g, "").trim();
                }

                // Handle Submission Tag
                if (aiText.includes("[SUBMIT_VOLUNTEER: true]")) {
                    handleVolunteerSubmit();
                    aiText = aiText.replace("[SUBMIT_VOLUNTEER: true]", "").trim();
                    setIsIntakeActive(false);
                }

                // Handle Support Ticket Creation
                const ticketMatch = aiText.match(/\[CREATE_TICKET:\s*({.*?})\]/);
                if (ticketMatch) {
                    try {
                        const ticketData = JSON.parse(ticketMatch[1]);
                        handleTicketCreation(ticketData);
                        aiText = aiText.replace(/\[CREATE_TICKET:\s*({.*?})\]/, "").trim();
                    } catch (e) {
                        console.error("Ticket parse error:", e);
                    }
                }

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

    const handleVolunteerSubmit = async () => {
        try {
            // Map frontend field names to backend expectations
            const payload = {
                fullName: volunteerData.fullName,
                email: volunteerData.email,
                mobileNo: volunteerData.phone, // Backend expects 'mobileNo'
                gender: volunteerData.gender,
                state: volunteerData.state,
                city: volunteerData.city,
                profession: volunteerData.expertise // Backend expects 'profession'
            };

            await registerVolunteer(payload).unwrap();
            showToast({
                title: "Mubarak!",
                message: "You are now a registered TPF Volunteer.",
                type: "success"
            });
            setVolunteerData({ fullName: "", email: "", phone: "", gender: "", state: "", city: "", expertise: "" });
        } catch (err) {
            console.error("Volunteer submission error:", err);
            showToast({
                title: "Submission Error",
                message: err?.data?.message || "Failed to submit registration.",
                type: "error"
            });
        }
    };

    const handleTicketCreation = async (ticketData) => {
        try {
            const payload = {
                fullName: userContext?.fullName || "Anonymous User",
                email: userContext?.email || "support@tpfaid.org",
                queryType: ticketData.category || "General Query",
                message: ticketData.summary || "User requested support via Abeer.",
                status: "Unresolved"
            };

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/ticket/create`,
                payload
            );

            if (response.data.success) {
                showToast({
                    title: "Support Ticket Created",
                    message: "Our team will reach out to you shortly.",
                    type: "success"
                });
            }
        } catch (err) {
            console.error("Ticket creation error:", err);
            showToast({
                title: "Ticket Creation Failed",
                message: "Please try contacting us directly.",
                type: "error"
            });
        }
    };

    const speak = (text) => {
        if (!synthesisRef.current) return;
        synthesisRef.current.cancel();

        const cleanText = text
            .replace(/\[CARD:.*?\]/g, "")
            .replace(/\[GOTO:.*?\]/g, "")
            .replace(/\[INTAKE:.*?\]/g, "")
            .replace(/\[SUBMIT_VOLUNTEER:.*?\]/g, "")
            .replace(/\[CREATE_TICKET:.*?\]/g, "")
            .trim();

        if (!cleanText) return;

        const utterance = new SpeechSynthesisUtterance(cleanText);
        const voices = synthesisRef.current.getVoices();

        // Use manually selected voice if available
        if (synthesisRef.current.currentVoiceName) {
            const selected = voices.find(v => v.name === synthesisRef.current.currentVoiceName);
            if (selected) {
                utterance.voice = selected;
                utterance.rate = 1.1;
                utterance.pitch = 0.95;
                utterance.onstart = () => setIsSpeaking(true);
                utterance.onend = () => setIsSpeaking(false);
                utterance.onerror = () => setIsSpeaking(false);
                synthesisRef.current.speak(utterance);
                return;
            }
        }

        // AUTO: High-Quality Google Indian/English/Hindi
        const premiumMaleVoice = voices.find(v => v.lang === "en-IN" && v.name.includes("Google"))
            || voices.find(v => v.lang === "hi-IN" && v.name.includes("Google"))
            || voices.find(v => v.lang === "en-IN" && (v.name.includes("Ravi") || v.name.includes("Hemant")))
            || voices.find(v => (v.name.includes("Google") || v.name.includes("Natural")) && v.lang.startsWith("en") && !v.name.includes("Female"))
            || voices.find(v => v.lang === "en-GB" && v.name.includes("Male"))
            || voices.find(v => v.lang === "hi-IN")
            || voices[0];

        if (premiumMaleVoice) utterance.voice = premiumMaleVoice;
        utterance.rate = 1.1;
        utterance.pitch = 0.95;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        synthesisRef.current.speak(utterance);
    };

    const clearHistory = () => {
        setHistory([history[0]]);
        setIsIntakeActive(false);
        setVolunteerData({ fullName: "", email: "", phone: "", gender: "", state: "", city: "", expertise: "" });
        setLastCapturedField(null);
        setTextInput("");
        if (isSpeaking) {
            synthesisRef.current.cancel();
            setIsSpeaking(false);
        }
    };

    const handleTextSubmit = () => {
        if (!textInput.trim() || isProcessing) return;
        const query = textInput.trim();
        setTextInput("");
        if (isSpeaking) {
            synthesisRef.current.cancel();
            setIsSpeaking(false);
        }
        sendToAI(null, query);
    };

    // Waveform Visualizer Section moved out to props based if needed, or kept inline but simplified


    return (
        <div className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[1000000] flex flex-col items-end gap-3 pointer-events-none transition-all duration-300`}>
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
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex flex-col items-end gap-2 pointer-events-auto cursor-pointer relative"
                    onClick={() => {
                        setIsExpanded(true);
                        setIsMinimized(false);
                        setShowLauncherGreeting(false);
                    }}
                >
                    {/* <AnimatePresence>
                        {showLauncherGreeting && (
                            <motion.div
                                initial={{ opacity: 0, x: 20, y: 10, scale: 0.5 }}
                                animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                                exit={{ opacity: 0, x: 20, scale: 0.5 }}
                                onClick={(e) => { e.stopPropagation(); setShowLauncherGreeting(false); }}
                                className={`absolute bottom-full right-0 mb-3 px-3 py-2 rounded-2xl rounded-br-none shadow-lg border whitespace-normal sm:whitespace-nowrap max-w-[150px] sm:max-w-none text-[10px] sm:text-xs font-bold leading-tight cursor-pointer ${isDarkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-100' : 'bg-white border-emerald-100 text-emerald-900'}`}
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                        <span>Salam! I am Abeer, your assistant.</span>
                                    </div>
                                    <X size={12} className="opacity-50 hover:opacity-100 transition-opacity shrink-0" />
                                </div>
                                <motion.div
                                    className="absolute -bottom-2 right-4 w-4 h-4 rotate-45 border-r border-b"
                                    style={{
                                        backgroundColor: isDarkMode ? '#18181b' : '#ffffff',
                                        borderColor: isDarkMode ? '#27272a' : '#ecfdf5'
                                    }}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence> */}

                    <div className="relative group">
                        {!isDarkMode && <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-500 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-500"></div>}
                        <button className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-xl border-2 transition-all ${isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-white'}`}>
                            <img
                                src={isDarkMode ? "/TPFAid-Logo1.png" : "/TPFAid-Logo.png"}
                                alt="TPF"
                                className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                            />
                        </button>
                    </div>
                </motion.div>
            )}

            <AnimatePresence mode="wait">
                {isExpanded && (
                    <motion.div
                        key="assistant-chat-window"
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.95 }}
                        className={`w-[calc(100vw-2rem)] sm:w-[400px] h-[550px] sm:h-[600px] max-h-[85vh] rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border flex flex-col overflow-hidden pointer-events-auto transition-colors duration-300 ${isDarkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-gray-100'}`}
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
                                    <h3 className="text-white font-bold text-sm tracking-tight">Abeer</h3>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <WaveformVisualizer isSpeaking={isSpeaking} />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={clearHistory}
                                    className="px-3 py-1.5 text-[10px] font-bold text-white bg-white/10 hover:bg-white/20 rounded-lg transition-all flex items-center gap-1.5"
                                >
                                    <Trash2 size={14} />
                                    <span>CLEAR CHAT</span>
                                </button>
                                <button
                                    onClick={handleMinimize}
                                    className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                                    title="Minimize"
                                >
                                    <Minimize2 size={18} />
                                </button>
                                <button
                                    onClick={handleCloseClick}
                                    className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                                    title="Close"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        <AnimatePresence>
                            {showCloseConfirm && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="absolute inset-0 z-[110] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
                                >
                                    <div className={`${isDarkMode ? 'bg-zinc-900' : 'bg-white'} p-6 rounded-3xl shadow-2xl border ${isDarkMode ? 'border-zinc-800' : 'border-gray-100'} text-center max-w-[280px]`}>
                                        <AlertCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                                        <h4 className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>Leave Chat?</h4>
                                        <p className={`text-sm mb-6 ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>Do you really want to leave the chat?</p>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => setShowCloseConfirm(false)}
                                                className={`flex-1 py-2.5 rounded-xl font-bold text-sm border ${isDarkMode ? 'border-zinc-700 text-zinc-300 hover:bg-zinc-800' : 'border-gray-200 text-gray-600 hover:bg-gray-50'} transition-all`}
                                            >
                                                NO
                                            </button>
                                            <button
                                                onClick={confirmClose}
                                                className="flex-1 py-2.5 rounded-xl font-bold text-sm bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-900/10 transition-all"
                                            >
                                                YES
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Settings Panel */}


                        <div
                            ref={scrollRef}
                            data-lenis-prevent
                            className={`flex-1 overflow-y-auto px-4 py-5 sm:p-5 space-y-5 flex flex-col scroll-smooth custom-scrollbar pointer-events-auto ${isDarkMode ? 'bg-zinc-950' : 'bg-gray-50/50'}`}
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
                                            {msg.role === 'assistant' ? (
                                                <>
                                                    {msg.text.split(/\[CARD:.*?\]/g).map((part, i) => <span key={i}>{part}</span>)}
                                                    {(() => {
                                                        const match = msg.text.match(/\[CARD:(.*?)\]/);
                                                        if (!match) return null;
                                                        try {
                                                            const cardData = JSON.parse(match[1]);
                                                            return <CampaignCard data={cardData} isDarkMode={isDarkMode} router={router} />;
                                                        } catch (e) {
                                                            return null;
                                                        }
                                                    })()}

                                                    {/* Show Quick Actions only on the first message */}
                                                    {idx === 0 && history.length === 1 && (
                                                        <QuickActions onAction={(q) => sendToAI(null, q)} isDarkMode={isDarkMode} />
                                                    )}
                                                    {/* Show Intake Progress if active */}
                                                    {isIntakeActive && idx === history.length - 1 && (
                                                        <div className={`mt-3 p-3 rounded-2xl border ${isDarkMode ? 'bg-emerald-950/20 border-emerald-900/30' : 'bg-emerald-50 border-emerald-100'}`}>
                                                            <div className="flex items-center justify-between mb-2">
                                                                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Registration Progress</span>
                                                                <span className="text-[10px] font-bold text-emerald-500">
                                                                    {Object.values(volunteerData).filter(v => v !== "").length}/7 Fields
                                                                </span>
                                                            </div>
                                                            <div className="space-y-1">
                                                                {Object.entries(volunteerData).map(([key, val]) => (
                                                                    val && (
                                                                        <div key={key} className="flex items-center gap-2">
                                                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                                                            <span className={`text-[10px] font-medium capitalize ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{key}:</span>
                                                                            <span className={`text-[10px] font-bold truncate ${isDarkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>{val}</span>
                                                                        </div>
                                                                    )
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </>
                                            ) : msg.text}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Processing Status */}
                            {isProcessing && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                                    <div className={`p-3 rounded-2xl rounded-tl-none flex items-center gap-3 shadow-sm border ${isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100'}`}>
                                        <Loader2 className="w-3 h-3 text-emerald-500 animate-spin" />
                                        <span className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-gray-400'}`}>Abeer is Thinking</span>
                                    </div>
                                </motion.div>
                            )}

                            {/* Live Transcript - Only show while user is recording */}
                            {isRecording && interimTranscript && (
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
                        <div className={`p-4 sm:p-5 border-t ${isDarkMode ? 'bg-zinc-950 border-zinc-900' : 'bg-white border-gray-100'}`}>
                            {error && (
                                <p className="text-red-500 text-[10px] font-bold mb-4 text-center uppercase tracking-widest">{error}</p>
                            )}

                            <div className="flex flex-col gap-3">
                                {!isRecording && (
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            value={textInput}
                                            onChange={(e) => setTextInput(e.target.value)}
                                            onKeyDown={(e) => e.key === "Enter" && handleTextSubmit()}
                                            placeholder="Ask me anything..."
                                            className={`w-full h-12 pl-4 pr-12 rounded-2xl text-[13px] border transition-all outline-none ${isDarkMode
                                                ? 'bg-zinc-900 border-zinc-800 text-zinc-100 focus:border-emerald-500/50'
                                                : 'bg-gray-50 border-gray-100 text-gray-900 focus:border-emerald-500/50'
                                                }`}
                                        />
                                        <button
                                            onClick={handleTextSubmit}
                                            disabled={!textInput.trim() || isProcessing}
                                            className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all ${textInput.trim()
                                                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/10'
                                                : 'text-zinc-400'
                                                }`}
                                        >
                                            <Send size={16} />
                                        </button>
                                    </div>
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
                                                className={`flex-1 h-12 bg-emerald-600/10 text-emerald-600 hover:bg-emerald-600 hover:text-white border border-emerald-600/20 rounded-2xl font-bold transition-all active:scale-95 flex items-center justify-center gap-3 ${isProcessing ? 'opacity-50' : ''}`}
                                            >
                                                <Mic size={18} className="sm:w-5 sm:h-5" />
                                                <span className="text-sm">Speak</span>
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
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
