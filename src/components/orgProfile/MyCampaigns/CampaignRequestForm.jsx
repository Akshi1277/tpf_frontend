"use client"
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import {
    X,
    Upload,
    Image as ImageIcon,
    Play,
    FileText,
    Trash2,
    Plus,
    Star,
    Save,
    Loader2,
    Share2
} from 'lucide-react';
import { useSubmitCampaignRequestMutation, useUpdateCampaignRequestMutation } from '@/utils/slices/organizationApiSlice';
import { getMediaUrl } from '@/utils/media';

const CATEGORIES = [
    "Medical Aid",
    "Emergency Aid",
    "Education Support",
    "Food Distribution",
    "Water & Sanitation",
    "Community Development",
    "Zakat General",
    "Riba Fund",
    "Others"
];

export default function CampaignRequestForm({
    onClose,
    darkMode,
    editData = null,
    organization
}) {
    const [formData, setFormData] = useState({
        title: '',
        beneficiaryName: '',
        about: '',
        category: CATEGORIES[0],
        isUrgent: false,
        taxBenefits: false,
        zakatVerified: false,
        ribaEligible: false,
        targetAmount: '',
        deadline: '',
        mediaType: 'image',
        currentStatus: '',
        impactGoals: [''],
        socialLinks: {
            instagram: '',
            facebook: '',
            youtube: '',
            twitter: '',
            linkedin: '',
            other: ''
        }
    });

    const [images, setImages] = useState([]);
    const [video, setVideo] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [previews, setPreviews] = useState({ image: null, video: null });

    const [submitRequest, { isLoading: isSubmitting }] = useSubmitCampaignRequestMutation();
    const [updateRequest, { isLoading: isUpdating }] = useUpdateCampaignRequestMutation();

    useEffect(() => {
        if (editData) {
            setFormData({
                title: editData.title || '',
                beneficiaryName: editData.beneficiaryName || '',
                about: editData.about || '',
                category: editData.category || CATEGORIES[0],
                isUrgent: !!editData.isUrgent,
                taxBenefits: !!editData.taxBenefits,
                zakatVerified: !!editData.zakatVerified,
                ribaEligible: !!editData.ribaEligible,
                targetAmount: editData.targetAmount || '',
                deadline: editData.deadline ? new Date(editData.deadline).toISOString().split('T')[0] : '',
                mediaType: editData.mediaType || 'image',
                currentStatus: editData.currentStatus || '',
                impactGoals: editData.impactGoals?.length ? editData.impactGoals : [''],
                socialLinks: editData.socialLinks || {
                    instagram: '',
                    facebook: '',
                    youtube: '',
                    twitter: '',
                    linkedin: '',
                    other: ''
                }
            });
            // Previews for existing media
            if (editData.mediaType === 'image' && editData.imageUrl) {
                setPreviews(prev => ({ ...prev, image: getMediaUrl(editData.imageUrl) }));
            } else if (editData.mediaType === 'video' && editData.videoUrl) {
                setPreviews(prev => ({ ...prev, video: getMediaUrl(editData.videoUrl) }));
            }
            if (editData.documents) {
                // Documents are handled separately in state for new uploads, 
                // but we could show existing ones here if the UI supported it.
                // For now, let's just make sure the media preview is solid.
            }
        }
    }, [editData]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: { ...prev[parent], [child]: value }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleImpactGoalChange = (index, value) => {
        const newGoals = [...formData.impactGoals];
        newGoals[index] = value;
        setFormData(prev => ({ ...prev, impactGoals: newGoals }));
    };

    const addImpactGoal = () => {
        setFormData(prev => ({ ...prev, impactGoals: [...prev.impactGoals, ''] }));
    };

    const removeImpactGoal = (index) => {
        if (formData.impactGoals.length > 1) {
            const newGoals = formData.impactGoals.filter((_, i) => i !== index);
            setFormData(prev => ({ ...prev, impactGoals: newGoals }));
        }
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            setImages(prev => [...prev, ...files]);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviews(prev => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(files[0]);
        }
    };

    const handleVideoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setVideo(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviews(prev => ({ ...prev, video: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDocUpload = (e) => {
        const files = Array.from(e.target.files);
        setDocuments(prev => [...prev, ...files]);
    };

    const removeDoc = (index) => {
        setDocuments(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const submitData = new FormData();

        // Append standard fields
        Object.keys(formData).forEach(key => {
            if (key === 'impactGoals' || key === 'socialLinks') {
                submitData.append(key, JSON.stringify(formData[key]));
            } else {
                submitData.append(key, formData[key]);
            }
        });

        // Append files
        images.forEach(img => submitData.append('image', img));
        if (video) submitData.append('video', video);
        documents.forEach(doc => submitData.append('documents', doc));

        try {
            if (editData) {
                await updateRequest({ id: editData._id, formData: submitData }).unwrap();
                alert('Campaign request updated successfully!');
            } else {
                await submitRequest(submitData).unwrap();
                alert('Campaign request submitted successfully!');
            }
            onClose();
        } catch (error) {
            console.error('Failed to submit campaign request:', error);
            alert(error.data?.message || 'Something went wrong. Please try again.');
        }
    };

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm`}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative ${darkMode ? "bg-zinc-900 border border-zinc-800" : "bg-white"
                    }`}
            >
                {/* Header */}
                <div className={`sticky top-0 z-10 flex items-center justify-between p-6 border-b ${darkMode ? "bg-zinc-900/95 border-zinc-800" : "bg-white/95 border-gray-100"
                    }`}>
                    <div>
                        <h2 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                            {editData ? "Edit Campaign Request" : "Create Campaign Request"}
                        </h2>
                        <p className={`text-sm ${darkMode ? "text-zinc-400" : "text-gray-500"}`}>
                            Organization: <span className="font-semibold text-emerald-500">{organization?.organizationName}</span>
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className={`p-2 rounded-full transition-colors ${darkMode ? "hover:bg-zinc-800 text-zinc-400" : "hover:bg-gray-100 text-gray-500"
                            }`}
                    >
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-8">
                    {/* Media Section */}
                    <section className="space-y-4">
                        <h3 className={`text-lg font-bold flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                            <ImageIcon className="text-emerald-500" size={20} />
                            Campaign Media
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Media Type Selection */}
                            <div className="space-y-3">
                                <label className={`block text-sm font-semibold ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                                    Primary Media Type
                                </label>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setFormData(p => ({ ...p, mediaType: 'image' }))}
                                        className={`flex-1 py-3 px-4 rounded-xl font-semibold border-2 transition-all flex items-center justify-center gap-2 ${formData.mediaType === 'image'
                                            ? "border-emerald-500 bg-emerald-500/10 text-emerald-500"
                                            : darkMode ? "border-zinc-800 text-zinc-400 hover:border-zinc-700" : "border-gray-200 text-gray-600 hover:border-gray-300"
                                            }`}
                                    >
                                        <ImageIcon size={18} /> Images
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData(p => ({ ...p, mediaType: 'video' }))}
                                        className={`flex-1 py-3 px-4 rounded-xl font-semibold border-2 transition-all flex items-center justify-center gap-2 ${formData.mediaType === 'video'
                                            ? "border-emerald-500 bg-emerald-500/10 text-emerald-500"
                                            : darkMode ? "border-zinc-800 text-zinc-400 hover:border-zinc-700" : "border-gray-200 text-gray-600 hover:border-gray-300"
                                            }`}
                                    >
                                        <Play size={18} /> Video
                                    </button>
                                </div>
                            </div>

                            {/* Media Upload */}
                            <div className="space-y-3">
                                {formData.mediaType === 'image' ? (
                                    <div className="relative group">
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                            id="image-upload"
                                        />
                                        <label
                                            htmlFor="image-upload"
                                            className={`h-40 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all ${darkMode ? "border-zinc-800 hover:border-emerald-500/50 bg-zinc-800/20" : "border-gray-200 hover:border-emerald-500/50 bg-gray-50"
                                                }`}
                                        >
                                            {previews.image ? (
                                                <img src={previews.image} className="w-full h-full object-cover rounded-xl" />
                                            ) : (
                                                <>
                                                    <Upload className="mb-2 text-zinc-400" />
                                                    <span className="text-sm font-medium">Upload Images</span>
                                                </>
                                            )}
                                        </label>
                                    </div>
                                ) : (
                                    <div className="relative group">
                                        <input
                                            type="file"
                                            accept="video/*"
                                            onChange={handleVideoUpload}
                                            className="hidden"
                                            id="video-upload"
                                        />
                                        <label
                                            htmlFor="video-upload"
                                            className={`h-40 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all ${darkMode ? "border-zinc-800 hover:border-emerald-500/50 bg-zinc-800/20" : "border-gray-200 hover:border-emerald-500/50 bg-gray-50"
                                                }`}
                                        >
                                            {previews.video ? (
                                                <video src={previews.video} className="w-full h-full object-cover rounded-xl" controls />
                                            ) : (
                                                <>
                                                    <Play className="mb-2 text-zinc-400" />
                                                    <span className="text-sm font-medium">Upload Video</span>
                                                </>
                                            )}
                                        </label>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Basic Info Section */}
                    <section className="space-y-4">
                        <h3 className={`text-lg font-bold flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                            <FileText className="text-emerald-500" size={20} />
                            Basic Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className={`block text-sm font-semibold ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                                    Campaign Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    required
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Support Medical Treatment for Rahul"
                                    className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all ${darkMode ? "bg-zinc-800 border-zinc-700 focus:border-emerald-500 text-white" : "bg-white border-gray-100 focus:border-emerald-500"
                                        }`}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className={`block text-sm font-semibold ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                                    Category <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all ${darkMode ? "bg-zinc-800 border-zinc-700 focus:border-emerald-500 text-white" : "bg-white border-gray-100 focus:border-emerald-500"
                                        }`}
                                >
                                    {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className={`block text-sm font-semibold ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                                    Beneficiary Name
                                </label>
                                <input
                                    type="text"
                                    name="beneficiaryName"
                                    value={formData.beneficiaryName}
                                    onChange={handleInputChange}
                                    placeholder="Who is this for?"
                                    className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all ${darkMode ? "bg-zinc-800 border-zinc-700 focus:border-emerald-500 text-white" : "bg-white border-gray-100 focus:border-emerald-500"
                                        }`}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className={`block text-sm font-semibold ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                                    Required Amount (₹) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="targetAmount"
                                    required
                                    value={formData.targetAmount}
                                    onChange={handleInputChange}
                                    placeholder="Amount in Rupees"
                                    className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all ${darkMode ? "bg-zinc-800 border-zinc-700 focus:border-emerald-500 text-white" : "bg-white border-gray-100 focus:border-emerald-500"
                                        }`}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className={`block text-sm font-semibold ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                                    Campaign Deadline <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    name="deadline"
                                    required
                                    value={formData.deadline}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all ${darkMode ? "bg-zinc-800 border-zinc-700 focus:border-emerald-500 text-white" : "bg-white border-gray-100 focus:border-emerald-500"
                                        }`}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className={`block text-sm font-semibold ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                                About the Campaign <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="about"
                                required
                                rows={4}
                                value={formData.about}
                                onChange={handleInputChange}
                                placeholder="Tell us about the need and impact..."
                                className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all resize-none ${darkMode ? "bg-zinc-800 border-zinc-700 focus:border-emerald-500 text-white" : "bg-white border-gray-100 focus:border-emerald-500"
                                    }`}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className={`block text-sm font-semibold ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                                Current Status
                            </label>
                            <textarea
                                name="currentStatus"
                                rows={2}
                                value={formData.currentStatus}
                                onChange={handleInputChange}
                                placeholder="What is the current situation?"
                                className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all resize-none ${darkMode ? "bg-zinc-800 border-zinc-700 focus:border-emerald-500 text-white" : "bg-white border-gray-100 focus:border-emerald-500"
                                    }`}
                            />
                        </div>
                    </section>

                    {/* Badges Section */}
                    <section className="space-y-4">
                        <h3 className={`text-lg font-bold flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                            <Star className="text-emerald-500" size={20} />
                            Campaign Badges
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { label: 'Mark as Urgent', name: 'isUrgent' },
                                { label: 'Tax Benefits', name: 'taxBenefits' },
                                { label: 'Zakat Verified', name: 'zakatVerified' },
                                { label: 'Riba Eligible', name: 'ribaEligible' },
                            ].map(badge => (
                                <label
                                    key={badge.name}
                                    className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData[badge.name]
                                        ? "border-emerald-500 bg-emerald-500/10"
                                        : darkMode ? "border-zinc-800 bg-zinc-800/20 hover:border-zinc-700" : "border-gray-100 bg-gray-50 hover:border-gray-200"
                                        }`}
                                >
                                    <input
                                        type="checkbox"
                                        name={badge.name}
                                        checked={formData[badge.name]}
                                        onChange={handleInputChange}
                                        className="hidden"
                                    />
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData[badge.name] ? "border-emerald-500 bg-emerald-500" : "border-zinc-400"
                                        }`}>
                                        {formData[badge.name] && <div className="w-2 h-2 bg-white rounded-full" />}
                                    </div>
                                    <span className={`text-xs font-bold text-center ${formData[badge.name] ? "text-emerald-500" : darkMode ? "text-zinc-500" : "text-gray-500"}`}>
                                        {badge.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </section>

                    {/* Impact Goals Section */}
                    <section className="space-y-4">
                        <h3 className={`text-lg font-bold flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                            <Plus className="text-emerald-500" size={20} />
                            Impact Goals
                        </h3>
                        <div className="space-y-3">
                            {formData.impactGoals.map((goal, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={goal}
                                        onChange={(e) => handleImpactGoalChange(index, e.target.value)}
                                        placeholder="e.g., Feed 500 children for a month"
                                        className={`flex-1 px-4 py-3 rounded-xl border-2 outline-none transition-all ${darkMode ? "bg-zinc-800 border-zinc-700 focus:border-emerald-500 text-white" : "bg-white border-gray-100 focus:border-emerald-500"
                                            }`}
                                    />
                                    {formData.impactGoals.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeImpactGoal(index)}
                                            className="p-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-colors"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addImpactGoal}
                                className={`text-sm font-bold flex items-center gap-1 ${darkMode ? "text-emerald-400 hover:text-emerald-300" : "text-emerald-600 hover:text-emerald-700"}`}
                            >
                                <Plus size={16} /> Add Goal
                            </button>
                        </div>
                    </section>

                    {/* Documents Section */}
                    <section className="space-y-4">
                        <h3 className={`text-lg font-bold flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                            <FileText className="text-emerald-500" size={20} />
                            Supporting Documents
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <label className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all ${darkMode ? "border-zinc-800 hover:border-emerald-500/50 bg-zinc-800/20" : "border-gray-200 hover:border-emerald-500/50 bg-gray-50"
                                }`}>
                                <input type="file" multiple onChange={handleDocUpload} className="hidden" />
                                <Upload className="mb-2 text-zinc-400" />
                                <span className="text-sm font-medium">Upload PDF/Images</span>
                            </label>
                            <div className="space-y-2">
                                {documents.map((doc, idx) => (
                                    <div key={idx} className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? "bg-zinc-800" : "bg-gray-100"}`}>
                                        <span className="text-sm truncate max-w-[200px]">{doc.name}</span>
                                        <button type="button" onClick={() => removeDoc(idx)} className="text-red-500"><Trash2 size={16} /></button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Social Links Section */}
                    <section className="space-y-4">
                        <h3 className={`text-lg font-bold flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                            <Share2 className="text-emerald-500" size={20} />
                            Social Links (Optional)
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.keys(formData.socialLinks).map(platform => (
                                <div key={platform} className="space-y-1">
                                    <label className="text-xs font-semibold capitalize text-zinc-400">{platform}</label>
                                    <input
                                        type="url"
                                        name={`socialLinks.${platform}`}
                                        value={formData.socialLinks[platform]}
                                        onChange={handleInputChange}
                                        placeholder={`https://${platform}.com/...`}
                                        className={`w-full px-4 py-2 rounded-lg border outline-none transition-all ${darkMode ? "bg-zinc-800 border-zinc-700 text-white" : "bg-white border-gray-100"
                                            }`}
                                    />
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Submit Action */}
                    <div className="pt-8 border-t border-zinc-800 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className={`px-6 py-3 rounded-xl font-bold transition-all ${darkMode ? "bg-zinc-800 text-white hover:bg-zinc-700" : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                                }`}
                        >
                            Cancel
                        </button>
                     <button
    type="submit"
    disabled={isSubmitting || isUpdating}
    className={`px-10 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${
        isSubmitting || isUpdating
            ? "bg-emerald-600/50 cursor-not-allowed"
            : "bg-emerald-600 hover:bg-emerald-500"
    } text-white`}
>
    {(isSubmitting || isUpdating) ? (
        "Saving..."
    ) : (
        "Submit Request"
    )}
</button>

                    </div>
                </form>
            </motion.div>
        </div>
    );
}
