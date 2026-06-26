"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { ArrowLeft, Loader2, Camera, FileText } from "lucide-react";
import { motion } from "framer-motion";
import {
    useSubmitCampaignRequestMutation,
    useUpdateCampaignRequestMutation,
    useGetOrganizationCampaignRequestsQuery,
} from "@/utils/slices/organizationApiSlice";

export default function CampaignRequestFormPage({ editId = null }) {
    const router = useRouter();
    const userInfo = useSelector((state) => state.auth.userInfo);

    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("darkMode") === "true";
        }
        return false;
    });

    useEffect(() => {
        const handleStorageChange = () => {
            setDarkMode(localStorage.getItem("darkMode") === "true");
        };
        window.addEventListener("storage", handleStorageChange);
        window.addEventListener("darkModeChanged", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
            window.removeEventListener("darkModeChanged", handleStorageChange);
        };
    }, []);

    // Fetch requests data to get the editData when in edit mode
    const { data: orgRequestsData, isLoading: isLoadingRequests } = useGetOrganizationCampaignRequestsQuery(undefined, {
        skip: !editId,
    });

    const editData = editId
        ? orgRequestsData?.requests?.find((r) => r._id === editId) || null
        : null;

    const handleClose = () => {
        router.push("/organization/profile/my-campaigns");
    };

    return (
        <div className={`min-h-screen ${darkMode ? "bg-zinc-950" : "bg-gray-50"}`}>
            {/* Background decorative elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div
                    className={`absolute inset-0 ${darkMode
                        ? "bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)]"
                        : "bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)]"
                        }`}
                    style={{ backgroundSize: "48px 48px" }}
                />
                <div className="absolute top-20 right-10 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-10 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
                {/* Back Button + Page Title */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mb-6"
                >
                    <button
                        onClick={handleClose}
                        className={`flex items-center gap-2 text-sm font-semibold mb-4 transition-colors group ${darkMode ? "text-zinc-400 hover:text-white" : "text-gray-500 hover:text-gray-900"
                            }`}
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        Back to My Campaigns
                    </button>

                    {/* Hero header */}
                    <div className={`rounded-2xl overflow-hidden relative ${darkMode
                        ? "bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border border-emerald-700/30"
                        : "bg-gradient-to-br from-emerald-600 to-teal-600 shadow-xl"
                        }`}>
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20 blur-2xl" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16 blur-2xl" />
                        <div className="relative p-6 sm:p-8">
                            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                                {editId ? "Edit Campaign Request" : "Create Campaign Request"}
                            </h1>
                            <p className="text-white/80 text-sm sm:text-base">
                                Organization:{" "}
                                <span className="font-semibold text-emerald-200">
                                    {userInfo?.organizationName || userInfo?.fullName}
                                </span>
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Loading state when fetching editData */}
                {editId && isLoadingRequests ? (
                    <div className={`flex items-center justify-center py-24 rounded-2xl ${darkMode ? "bg-zinc-900/50 border border-zinc-800" : "bg-white shadow-lg"}`}>
                        <Loader2 className="animate-spin text-emerald-500 mr-3" size={28} />
                        <span className={`font-medium ${darkMode ? "text-zinc-300" : "text-gray-600"}`}>
                            Loading request data...
                        </span>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <CampaignRequestFormInline
                            onClose={handleClose}
                            darkMode={darkMode}
                            editData={editData}
                            organization={userInfo}
                        />
                    </motion.div>
                )}
            </div>
        </div>
    );
}

// Inline (non-modal) version of the form — same logic, just no fixed overlay
function CampaignRequestFormInline({ onClose, darkMode, editData, organization }) {
    const [formData, setFormData] = useState({
        title: "",
        beneficiaryName: "",
        about: "",
        category: "Medical Aid",
        isUrgent: false,
        taxBenefits: false,
        zakatVerified: false,
        ribaEligible: false,
        targetAmount: "",
        deadline: "",
        mediaType: "image",
        currentStatus: "",
        impactGoals: [""],
        socialLinks: {
            instagram: "",
            facebook: "",
            youtube: "",
            twitter: "",
            linkedin: "",
            other: "",
        },
    });

    const [images, setImages] = useState([]);
    const [video, setVideo] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [previews, setPreviews] = useState({ image: null, video: null });

    const [submitRequest, { isLoading: isSubmitting }] = useSubmitCampaignRequestMutation();
    const [updateRequest, { isLoading: isUpdating }] = useUpdateCampaignRequestMutation();

    const { getMediaUrl } = require("@/utils/media");

    useEffect(() => {
        if (editData) {
            setFormData({
                title: editData.title || "",
                beneficiaryName: editData.beneficiaryName || "",
                about: editData.about || "",
                category: editData.category || "Medical Aid",
                isUrgent: !!editData.isUrgent,
                taxBenefits: !!editData.taxBenefits,
                zakatVerified: !!editData.zakatVerified,
                ribaEligible: !!editData.ribaEligible,
                targetAmount: editData.targetAmount || "",
                deadline: editData.deadline ? new Date(editData.deadline).toISOString().split("T")[0] : "",
                mediaType: editData.mediaType || "image",
                currentStatus: editData.currentStatus || "",
                impactGoals: editData.impactGoals?.length ? editData.impactGoals : [""],
                socialLinks: editData.socialLinks || {
                    instagram: "", facebook: "", youtube: "", twitter: "", linkedin: "", other: "",
                },
            });
            if (editData.mediaType === "image" && editData.imageUrl) {
                setPreviews((prev) => ({ ...prev, image: getMediaUrl(editData.imageUrl) }));
            } else if (editData.mediaType === "video" && editData.videoUrl) {
                setPreviews((prev) => ({ ...prev, video: getMediaUrl(editData.videoUrl) }));
            }
        }
    }, [editData]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name.includes(".")) {
            const [parent, child] = name.split(".");
            setFormData((prev) => ({ ...prev, [parent]: { ...prev[parent], [child]: value } }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
        }
    };

    const handleImpactGoalChange = (index, value) => {
        const newGoals = [...formData.impactGoals];
        newGoals[index] = value;
        setFormData((prev) => ({ ...prev, impactGoals: newGoals }));
    };

    const addImpactGoal = () =>
        setFormData((prev) => ({ ...prev, impactGoals: [...prev.impactGoals, ""] }));

    const removeImpactGoal = (index) => {
        if (formData.impactGoals.length > 1) {
            setFormData((prev) => ({ ...prev, impactGoals: prev.impactGoals.filter((_, i) => i !== index) }));
        }
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            setImages((prev) => [...prev, ...files]);
            const reader = new FileReader();
            reader.onloadend = () => setPreviews((prev) => ({ ...prev, image: reader.result }));
            reader.readAsDataURL(files[0]);
        }
    };

    const handleVideoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setVideo(file);
            const reader = new FileReader();
            reader.onloadend = () => setPreviews((prev) => ({ ...prev, video: reader.result }));
            reader.readAsDataURL(file);
        }
    };

    const handleDocUpload = (e) => {
        const files = Array.from(e.target.files);
        setDocuments((prev) => [...prev, ...files]);
    };

    const removeDoc = (index) => setDocuments((prev) => prev.filter((_, i) => i !== index));

    const handleSubmit = async (e) => {
        e.preventDefault();
        const submitData = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key === "impactGoals" || key === "socialLinks") {
                submitData.append(key, JSON.stringify(formData[key]));
            } else {
                submitData.append(key, formData[key]);
            }
        });
        images.forEach((img) => submitData.append("image", img));
        if (video) submitData.append("video", video);
        documents.forEach((doc) => submitData.append("documents", doc));

        try {
            if (editData) {
                await updateRequest({ id: editData._id, formData: submitData }).unwrap();
            } else {
                await submitRequest(submitData).unwrap();
            }
            onClose();
        } catch (error) {
            console.error("Failed to submit campaign request:", error);
            alert(error.data?.message || "Something went wrong. Please try again.");
        }
    };

    const inputClass = `w-full px-4 py-3 rounded-xl border-2 outline-none transition-all ${darkMode
        ? "bg-zinc-800/80 border-zinc-700 focus:border-emerald-500 text-white placeholder:text-zinc-500"
        : "bg-white border-gray-200 focus:border-emerald-500 text-gray-900 placeholder:text-gray-400"
        }`;

    const sectionClass = `rounded-2xl p-6 space-y-5 ${darkMode ? "bg-zinc-900/70 border border-zinc-800" : "bg-white shadow-sm border border-gray-100"
        }`;

    const labelClass = `block text-sm font-semibold ${darkMode ? "text-zinc-300" : "text-gray-700"}`;

    const CATEGORIES = [
        "Medical Aid", "Emergency Aid", "Education Support", "Food Distribution",
        "Water & Sanitation", "Community Development", "Zakat General", "Riba Fund", "Others",
    ];

    return (
        <form onSubmit={handleSubmit} className="space-y-6">

            {/* ── MEDIA SECTION ── */}
            <div className={sectionClass}>
                <h3 className={`text-base font-bold flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 text-xs font-bold">1</span>
                    Campaign Media
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <label className={labelClass}>Primary Media Type</label>
                        <div className="flex gap-2">
                            {["image", "video"].map((type) => (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => setFormData((p) => ({ ...p, mediaType: type }))}
                                    className={`flex-1 py-3 px-4 rounded-xl font-semibold border-2 transition-all capitalize ${formData.mediaType === type
                                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-500"
                                        : darkMode ? "border-zinc-700 text-zinc-400 hover:border-zinc-600" : "border-gray-200 text-gray-600 hover:border-gray-300"
                                        }`}
                                >
                                    {type === "image" ? "🖼 Images" : "▶ Video"}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        {formData.mediaType === "image" ? (
                            <label className={`h-40 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden ${darkMode ? "border-zinc-700 hover:border-emerald-500/60 bg-zinc-800/30" : "border-gray-200 hover:border-emerald-400 bg-gray-50"}`}>
                                <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                                {previews.image ? (
                                    <img src={previews.image} className="w-full h-full object-cover" alt="preview" />
                                ) : (
                                    <div className="flex flex-col items-center gap-2 text-zinc-400">
                                          <Camera className="text-2xl" />
                                        <span className="text-sm font-medium">Upload Images</span>
                                    </div>
                                )}
                            </label>
                        ) : (
                            <label className={`h-40 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden ${darkMode ? "border-zinc-700 hover:border-emerald-500/60 bg-zinc-800/30" : "border-gray-200 hover:border-emerald-400 bg-gray-50"}`}>
                                <input type="file" accept="video/*" onChange={handleVideoUpload} className="hidden" />
                                {previews.video ? (
                                    <video src={previews.video} className="w-full h-full object-cover" controls />
                                ) : (
                                    <div className="flex flex-col items-center gap-2 text-zinc-400">
                                        <Camera className="text-2xl" />
                                        <span className="text-sm font-medium">Upload Video</span>
                                    </div>
                                )}
                            </label>
                        )}
                    </div>
                </div>
            </div>

            {/* ── BASIC INFO ── */}
            <div className={sectionClass}>
                <h3 className={`text-base font-bold flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 text-xs font-bold">2</span>
                    Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                        <label className={labelClass}>Campaign Title <span className="text-red-500">*</span></label>
                        <input type="text" name="title" required value={formData.title} onChange={handleInputChange}
                            placeholder="e.g., Support Medical Treatment for Rahul" className={inputClass} />
                    </div>
                    <div className="space-y-2">
                        <label className={labelClass}>Category <span className="text-red-500">*</span></label>
                        <select name="category" value={formData.category} onChange={handleInputChange} className={inputClass}>
                            {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className={labelClass}>Beneficiary Name</label>
                        <input type="text" name="beneficiaryName" value={formData.beneficiaryName} onChange={handleInputChange}
                            placeholder="Who is this for?" className={inputClass} />
                    </div>
                    <div className="space-y-2">
                        <label className={labelClass}>Required Amount (₹) <span className="text-red-500">*</span></label>
                        <input type="number" name="targetAmount" required value={formData.targetAmount} onChange={handleInputChange}
                            placeholder="Amount in Rupees" className={inputClass} />
                    </div>
                    <div className="space-y-2">
                        <label className={labelClass}>Campaign Deadline <span className="text-red-500">*</span></label>
                        <input type="date" name="deadline" required value={formData.deadline} onChange={handleInputChange} className={inputClass} />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className={labelClass}>About the Campaign <span className="text-red-500">*</span></label>
                    <textarea name="about" required rows={4} value={formData.about} onChange={handleInputChange}
                        placeholder="Tell us about the need and impact..." className={`${inputClass} resize-none`} />
                </div>
                <div className="space-y-2">
                    <label className={labelClass}>Current Status</label>
                    <textarea name="currentStatus" rows={2} value={formData.currentStatus} onChange={handleInputChange}
                        placeholder="What is the current situation?" className={`${inputClass} resize-none`} />
                </div>
            </div>

            {/* ── BADGES ── */}
            <div className={sectionClass}>
                <h3 className={`text-base font-bold flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 text-xs font-bold">3</span>
                    Campaign Badges
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: "Mark as Urgent", name: "isUrgent" },
                        { label: "Tax Benefits", name: "taxBenefits"},
                        { label: "Zakat Verified", name: "zakatVerified"},
                        { label: "Riba Eligible", name: "ribaEligible"},
                    ].map((badge) => (
                        <label key={badge.name} className={`flex flex-col items-center p-5 rounded-xl border-2 cursor-pointer transition-all ${formData[badge.name]
                            ? "border-emerald-500 bg-emerald-500/10"
                            : darkMode ? "border-zinc-700 bg-zinc-800/20 hover:border-zinc-600" : "border-gray-200 bg-gray-50 hover:border-gray-300"
                            }`}>
                            <input type="checkbox" name={badge.name} checked={formData[badge.name]} onChange={handleInputChange} className="hidden" />
                            <span className="text-xl">{badge.icon}</span>
                            <span className={`text-xs font-bold text-center ${formData[badge.name] ? "text-emerald-500" : darkMode ? "text-zinc-400" : "text-gray-500"}`}>
                                {badge.label}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* ── IMPACT GOALS ── */}
            <div className={sectionClass}>
                <h3 className={`text-base font-bold flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 text-xs font-bold">4</span>
                    Impact Goals
                </h3>
                <div className="space-y-3">
                    {formData.impactGoals.map((goal, index) => (
                        <div key={index} className="flex gap-2">
                            <input type="text" value={goal} onChange={(e) => handleImpactGoalChange(index, e.target.value)}
                                placeholder="e.g., Feed 500 children for a month" className={`flex-1 px-4 py-3 rounded-xl border-2 outline-none transition-all ${darkMode ? "bg-zinc-800/80 border-zinc-700 focus:border-emerald-500 text-white placeholder:text-zinc-500" : "bg-white border-gray-200 focus:border-emerald-500"}`} />
                            {formData.impactGoals.length > 1 && (
                                <button type="button" onClick={() => removeImpactGoal(index)}
                                    className="p-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-colors">✕</button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={addImpactGoal}
                        className={`text-sm font-bold flex items-center gap-1 ${darkMode ? "text-emerald-400 hover:text-emerald-300" : "text-emerald-600 hover:text-emerald-700"}`}>
                        + Add Goal
                    </button>
                </div>
            </div>

            {/* ── DOCUMENTS ── */}
            <div className={sectionClass}>
                <h3 className={`text-base font-bold flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 text-xs font-bold">5</span>
                    Supporting Documents
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all ${darkMode ? "border-zinc-700 hover:border-emerald-500/50 bg-zinc-800/20" : "border-gray-200 hover:border-emerald-400 bg-gray-50"}`}>
                        <input type="file" multiple onChange={handleDocUpload} className="hidden" />
                            <FileText size={28} className="mb-2 text-zinc-400" />

                        <span className={`text-sm font-medium ${darkMode ? "text-zinc-400" : "text-gray-500"}`}>Upload PDF/Images</span>
                    </label>
                    <div className="space-y-2">
                        {documents.map((doc, idx) => (
                            <div key={idx} className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? "bg-zinc-800 text-zinc-300" : "bg-gray-100 text-gray-700"}`}>
                                <span className="text-sm truncate max-w-[200px]">{doc.name}</span>
                                <button type="button" onClick={() => removeDoc(idx)} className="text-red-500 hover:text-red-400 transition-colors">✕</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── SOCIAL LINKS ── */}
            <div className={sectionClass}>
                <h3 className={`text-base font-bold flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 text-xs font-bold">6</span>
                    Social Links <span className={`text-xs font-normal ml-1 ${darkMode ? "text-zinc-500" : "text-gray-400"}`}>(Optional)</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.keys(formData.socialLinks).map((platform) => (
                        <div key={platform} className="space-y-1">
                            <label className={`text-xs font-semibold capitalize ${darkMode ? "text-zinc-400" : "text-gray-500"}`}>{platform}</label>
                            <input type="url" name={`socialLinks.${platform}`} value={formData.socialLinks[platform]}
                                onChange={handleInputChange} placeholder={`https://${platform}.com/...`}
                                className={`w-full px-4 py-2.5 rounded-lg border-2 outline-none transition-all ${darkMode ? "bg-zinc-800/80 border-zinc-700 focus:border-emerald-500 text-white placeholder:text-zinc-600" : "bg-white border-gray-200 focus:border-emerald-500"}`} />
                        </div>
                    ))}
                </div>
            </div>

            {/* ── ACTIONS ── */}
            <div className={`flex justify-between items-center gap-4 pt-2 pb-4`}>
                <button type="button" onClick={onClose}
                    className={`px-6 py-3 rounded-xl font-bold transition-all border-2 ${darkMode ? "border-zinc-700 text-zinc-300 hover:bg-zinc-800" : "border-gray-200 text-gray-700 hover:bg-gray-100"}`}>
                    Cancel
                </button>
             <button
    type="submit"
    disabled={isSubmitting || isUpdating}
    className={`px-10 py-3 rounded-xl font-bold transition-all flex items-center justify-center shadow-lg ${
        isSubmitting || isUpdating
            ? "bg-emerald-600/50 cursor-not-allowed text-white/70"
            : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/25"
    }`}
>
    {isSubmitting || isUpdating
        ? "Saving..."
        : editData
            ? "Update Request"
            : "Submit Request"}
</button>

            </div>
        </form>
    );
}
