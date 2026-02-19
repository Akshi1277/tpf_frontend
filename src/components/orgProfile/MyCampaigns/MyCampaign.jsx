"use client"
import { useSelector } from "react-redux"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Heart,
  TrendingUp,
  Clock,
  Users,
  Target,
  Share2,
  Edit,
  Trash2,
  BookmarkPlus,
  Bookmark,
  Eye,
  Calendar,
  DollarSign,
  IndianRupee,
  Upload,
  Plus
} from "lucide-react"
import { useToggleWishlistMutation, useGetWishlistQuery, useGetMyApplicationsQuery, useUploadClarificationDocumentsMutation } from "@/utils/slices/authApiSlice"
import { useGetOrganizationCampaignRequestsQuery } from "@/utils/slices/organizationApiSlice"
import ShareModal from "../../ui/ShareModal"
import { getMediaUrl } from "@/utils/media"


export default function MyCampaignsPage({ darkModeFromParent }) {
  const userInfo = useSelector((state) => state.auth.userInfo)
  const isOrganization = userInfo?.type === "organization"

  const [darkMode, setDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState("my-campaigns")
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const router = useRouter();
  const { data: wishlistedCampaigns = [], isLoading } = useGetWishlistQuery();

  // Fetch based on user type
  const { data: applicationsData, isLoading: isLoadingApps } = useGetMyApplicationsQuery(undefined, {
    skip: isOrganization
  });

  const { data: orgRequestsData, isLoading: isLoadingOrg } = useGetOrganizationCampaignRequestsQuery(undefined, {
    skip: !isOrganization
  });

  const applications = applicationsData?.data || [];
  const orgRequests = orgRequestsData?.requests || [];
  const approvedCampaigns = orgRequestsData?.approvedCampaigns || [];

  const [toggleWishlist] = useToggleWishlistMutation();
  // Sync with parent dark mode
  useEffect(() => {
    if (darkModeFromParent !== undefined) {
      setDarkMode(darkModeFromParent)
    }
  }, [darkModeFromParent])

  const myItems = isOrganization
    ? [
      ...orgRequests
        .filter(req => req.status !== 'approved')
        .map(req => ({ type: 'request', data: req, status: req.status })),
      ...approvedCampaigns.map(camp => ({ type: 'campaign', data: { ...camp, status: 'active' } }))
    ]
    : applications.map(app => {
      if (app.status === 'approved' && app.campaignId && typeof app.campaignId === 'object') {
        return { type: 'campaign', data: { ...app.campaignId, status: 'active' }, original: app };
      }
      return { type: 'application', data: app, status: app.status };
    });

  // Mock user data
  const currentUser = {
    name: userInfo?.fullName,
    totalCampaigns: myItems.filter(i => i.type === 'campaign').length,
    totalWishlisted: wishlistedCampaigns.length,
  };

  // Mock campaigns created by user


  const getStatusBadge = (status) => {
    const styles = {
      active: darkMode
        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
        : "bg-emerald-100 text-emerald-700 border-emerald-200",
      completed: darkMode
        ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
        : "bg-blue-100 text-blue-700 border-blue-200",
      pending: darkMode
        ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
        : "bg-amber-100 text-amber-700 border-amber-200",
      rejected: darkMode
        ? "bg-rose-500/20 text-rose-400 border-rose-500/30"
        : "bg-rose-100 text-rose-700 border-rose-200",
      clarification: darkMode
        ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
        : "bg-purple-100 text-purple-700 border-purple-200"
    }

    const labels = {
      active: "Active",
      completed: "Completed",
      pending: "Pending Approval",
      rejected: "Rejected",
      clarification: "Clarification Needed"
    }

    return (
      <span className={`px-3 py-1 rounded-full text-center text-xs font-semibold border ${styles[status] || styles.pending}`}>
        {labels[status] || status}
      </span>
    )
  }

  const calculateProgress = (raised, goal) => {
    return Math.min((raised / goal) * 100, 100)
  }

  const ApplicationCard = ({ application }) => {
    const isRejected = application.status === 'rejected';
    const isClarification = application.status === 'clarification';
    const reason = application.groundReport?.reason || "No specific reason provided.";

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [uploadClarificationDocuments, { isLoading: isUploading }] = useUploadClarificationDocumentsMutation();

    const handleFileSelect = (e) => {
      const files = Array.from(e.target.files || []);
      setSelectedFiles(prev => [...prev, ...files]);
    };

    const handleDragOver = (e) => {
      e.preventDefault();
      setIsDragging(true);
    };

    const handleDragLeave = (e) => {
      e.preventDefault();
      setIsDragging(false);
    };

    const handleDrop = (e) => {
      e.preventDefault();
      setIsDragging(false);
      const files = Array.from(e.dataTransfer.files || []);
      setSelectedFiles(prev => [...prev, ...files]);
    };

    const removeFile = (index) => {
      setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleUpload = async () => {
      if (selectedFiles.length === 0) return;

      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append('supportingDocuments', file);
      });

      try {
        await uploadClarificationDocuments({
          applicationId: application._id,
          formData
        }).unwrap();

        setSelectedFiles([]);
        alert('Documents uploaded successfully!');
      } catch (error) {
        console.error('Upload failed:', error);
        alert('Failed to upload documents. Please try again.');
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`rounded-xl sm:rounded-2xl overflow-hidden border p-6 flex flex-col justify-between h-full ${darkMode
          ? "bg-zinc-800/50 border-zinc-700"
          : "bg-white border-gray-200 shadow-lg"
          }`}
      >
        <div>
          <div className="flex justify-between items-start mb-4">
            <h3 className={`text-lg font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
              Financial Aid Application
            </h3>
            {getStatusBadge(application.status)}
          </div>

          <div className={`mb-4 text-sm ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
            <p className="mb-2"><span className="font-semibold">ID:</span> #{application._id.slice(-6).toUpperCase()}</p>
            <p><span className="font-semibold">Applied on:</span> {new Date(application.createdAt).toLocaleDateString()}</p>
          </div>

          {(isRejected || isClarification) && (
            <div className={`p-4 rounded-lg text-sm mb-4 ${darkMode ? "bg-red-500/10 border border-red-500/20" : "bg-red-50 border border-red-100"
              }`}>
              <p className={`font-semibold mb-1 ${darkMode ? "text-red-400" : "text-red-700"}`}>
                {isClarification ? "Clarification Required:" : "Reason for Rejection:"}
              </p>
              <p className={darkMode ? "text-zinc-300" : "text-gray-600"}>
                {reason}
              </p>
            </div>
          )}

          {/* Upload Section for Clarification */}
          {isClarification && (
            <div className="mb-4">
              <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Upload Clarification Documents
              </label>

              {/* Drag and Drop Area */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${isDragging
                  ? darkMode ? "border-emerald-500 bg-emerald-500/10" : "border-emerald-500 bg-emerald-50"
                  : darkMode ? "border-zinc-600 bg-zinc-800/50" : "border-gray-300 bg-gray-50"
                  }`}
              >
                <Upload className={`w-8 h-8 mx-auto mb-2 ${darkMode ? "text-zinc-400" : "text-gray-400"}`} />
                <p className={`text-sm mb-2 ${darkMode ? "text-zinc-300" : "text-gray-600"}`}>
                  Drag and drop files here, or click to select
                </p>
                <input
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                  id={`file-upload-${application._id}`}
                  accept="image/*,.pdf,.doc,.docx"
                />
                <label
                  htmlFor={`file-upload-${application._id}`}
                  className={`inline-block px-4 py-2 rounded-lg cursor-pointer text-sm font-semibold transition-colors ${darkMode
                    ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                    : "bg-emerald-500 text-white hover:bg-emerald-600"
                    }`}
                >
                  Select Files
                </label>
              </div>

              {/* Selected Files List */}
              {selectedFiles.length > 0 && (
                <div className="mt-3 space-y-2">
                  {selectedFiles.map((file, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-2 rounded-lg ${darkMode ? "bg-zinc-700/50" : "bg-gray-100"
                        }`}
                    >
                      <span className={`text-sm truncate flex-1 ${darkMode ? "text-zinc-300" : "text-gray-700"}`}>
                        {file.name}
                      </span>
                      <button
                        onClick={() => removeFile(index)}
                        className={`ml-2 p-1 rounded hover:bg-red-500/20 transition-colors ${darkMode ? "text-red-400" : "text-red-600"
                          }`}
                      >
                        ×
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={handleUpload}
                    disabled={isUploading}
                    className={`w-full py-2 px-4 rounded-lg font-semibold text-sm transition-all ${isUploading
                      ? darkMode ? "bg-zinc-600 text-zinc-400 cursor-not-allowed" : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : darkMode
                        ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                        : "bg-emerald-500 text-white hover:bg-emerald-600"
                      }`}
                  >
                    {isUploading ? "Uploading..." : "Upload Documents"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-zinc-700">
          <p className={`text-xs text-center ${darkMode ? "text-zinc-500" : "text-gray-500"}`}>
            {application.status === 'pending'
              ? "Our team is reviewing your application. You will be notified of any updates."
              : isClarification
                ? "Please upload the requested documents above."
                : "Create a new application or contact support for help."}
          </p>
        </div>
      </motion.div>
    );
  };

  const RequestCard = ({ request }) => {
    const isClarification = request.status === 'clarification';
    const isRejected = request.status === 'rejected';

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-xl sm:rounded-2xl overflow-hidden border flex flex-col h-full ${darkMode
          ? "bg-zinc-800/50 border-zinc-700"
          : "bg-white border-gray-200 shadow-lg"
          }`}
      >
        {request.imageUrl && (
          <div className="relative h-32 overflow-hidden bg-gray-100 dark:bg-zinc-800">
            <img
              src={getMediaUrl(request.imageUrl)}
              alt={request.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/60 text-white backdrop-blur-sm">
              REQUEST PREVIEW
            </div>
          </div>
        )}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <h3 className={`text-lg font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
              {request.title}
            </h3>
            {getStatusBadge(request.status)}
          </div>

          <div className={`mb-4 text-sm ${darkMode ? "text-zinc-400" : "text-gray-600"}`}>
            <p className="mb-2 uppercase tracking-wider text-[10px] font-bold">Campaign Request</p>
            <p><span className="font-semibold">Submitted:</span> {new Date(request.createdAt).toLocaleDateString()}</p>
          </div>

          {(isRejected || isClarification) && (
            <div className={`p-4 rounded-lg text-sm mb-4 ${darkMode ? "bg-red-500/10 border border-red-500/20" : "bg-red-50 border border-red-100"
              }`}>
              <p className={`font-semibold mb-1 ${darkMode ? "text-red-400" : "text-red-700"}`}>
                {isClarification ? "Action Required:" : "Admin Feedback:"}
              </p>
              <p className={darkMode ? "text-zinc-300" : "text-gray-600"}>
                {request.adminStatement || "No feedback provided."}
              </p>
            </div>
          )}

          {isClarification && (
            <button
              onClick={() => router.push(`/organization/profile/my-campaigns/edit/${request._id}`)}
              className={`w-full py-2 px-4 rounded-lg font-bold text-sm transition-all ${darkMode
                ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                : "bg-emerald-500 text-white hover:bg-emerald-600"
                }`}
            >
              Edit & Resubmit
            </button>
          )}
        </div>
      </motion.div>
    );
  };

  const CampaignCard = ({ campaign, isMyCampaign = false }) => {
    const progress = calculateProgress(campaign.raisedAmount, campaign.targetAmount)
    console.log("Campaign inside MyCampaignsPage:", campaign);


    const handleDonateClick = () => {
      // Ensure the campaign and slug exist
      if (campaign?.slug) {
        router.push(`/campaign/${campaign.slug}`); // Navigate to campaign page
      } else {
        console.error("Campaign slug is not available");
      }
    };

    const getDaysLeft = (deadline) => {
      const today = new Date();
      const endDate = new Date(deadline);

      // Normalize times to avoid partial-day issues
      today.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);

      const diffTime = endDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      return diffDays;
    };

    const daysLeft = getDaysLeft(campaign.deadline);


    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`rounded-xl sm:rounded-2xl overflow-hidden border ${darkMode
          ? "bg-zinc-800/50 border-zinc-700 hover:border-emerald-500/50"
          : "bg-white border-gray-200 hover:border-emerald-500/50 shadow-lg"
          } transition-all hover:shadow-xl`}
      >
        {/* Image */}
        <div className="relative h-40 sm:h-48 overflow-hidden bg-gray-100 dark:bg-zinc-800 flex items-center justify-center">
          {campaign.imageUrl ? (
            <img
              src={getMediaUrl(campaign.imageUrl)}
              alt={campaign.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-4 text-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${darkMode ? "bg-zinc-700" : "bg-gray-200"
                }`}>
                <Clock className={`w-6 h-6 ${darkMode ? "text-zinc-400" : "text-gray-400"}`} />
              </div>
              <p className={`text-xs font-semibold ${darkMode ? "text-zinc-400" : "text-gray-500"}`}>
                Image Pending
              </p>
            </div>
          )}

          {/* Fallback for when image fails to load (hidden by default) */}
          <div className="hidden absolute inset-0 flex-col items-center justify-center p-4 text-center bg-gray-100 dark:bg-zinc-800">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${darkMode ? "bg-zinc-700" : "bg-gray-200"
              }`}>
              <Clock className={`w-6 h-6 ${darkMode ? "text-zinc-400" : "text-gray-400"}`} />
            </div>
            <p className={`text-xs font-semibold ${darkMode ? "text-zinc-400" : "text-gray-500"}`}>
              Image Unavailable
            </p>
          </div>

          <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
            {isMyCampaign ? (
              getStatusBadge(campaign.status)
            ) : (
              <button className={`p-1.5 sm:p-2 cursor-pointer rounded-full ${darkMode ? "bg-zinc-900/80" : "bg-white/80"
                } backdrop-blur-sm hover:scale-110 transition-transform`}>
                <Heart
                  onClick={() => handleToggleWishlist(campaign._id)}
                  className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 fill-rose-500" />
              </button>
            )}
          </div>
          <div className={`absolute top-2 sm:top-3 left-2 sm:left-3 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold ${darkMode
            ? "bg-zinc-900/80 text-white"
            : "bg-white/80 text-gray-900"
            } backdrop-blur-sm`}>
            {campaign.category || "General"}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 lg:p-6">
          <h3 className={`text-base sm:text-lg lg:text-xl font-bold mb-1.5 sm:mb-2 line-clamp-2 ${darkMode ? "text-white" : "text-gray-900"
            }`}>
            {campaign.title}
          </h3>

          <p className={`text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 ${darkMode ? "text-zinc-400" : "text-gray-600"
            }`}>
            {campaign.description}
          </p>

          {!isMyCampaign && campaign.organization && (
            <p className={`text-xs sm:text-sm mb-3 sm:mb-4 ${darkMode ? "text-zinc-500" : "text-gray-500"
              }`}>
              by <span className="font-semibold">{campaign.organization}</span>
            </p>
          )}

          {/* Progress Bar */}
          <div className="mb-3 sm:mb-4">
            <div className="flex justify-between items-center mb-1.5 sm:mb-2">
              <span className={`text-xs sm:text-sm font-semibold ${darkMode ? "text-zinc-300" : "text-gray-700"
                }`}>
                ₹{campaign.raisedAmount.toLocaleString()}
              </span>
              <span className={`text-xs ${darkMode ? "text-zinc-500" : "text-gray-500"
                }`}>
                of ₹{campaign.targetAmount}
              </span>
            </div>
            <div className={`h-1.5 sm:h-2 rounded-full overflow-hidden ${darkMode ? "bg-zinc-700" : "bg-gray-200"
              }`}>
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 flex-wrap">
            <div className="flex items-center gap-1">
              <Users className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${darkMode ? "text-zinc-400" : "text-gray-600"
                }`} />
              <span className={`text-xs sm:text-sm ${darkMode ? "text-zinc-400" : "text-gray-600"
                }`}>
                {campaign.totalDonors}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${daysLeft <= 5 && daysLeft > 0
                  ? "text-rose-500"
                  : darkMode
                    ? "text-zinc-400"
                    : "text-gray-600"
                  }`}
              />
              <span
                className={`text-xs sm:text-sm ${daysLeft <= 5 && daysLeft > 0
                  ? "text-rose-500 font-semibold"
                  : darkMode
                    ? "text-zinc-400"
                    : "text-gray-600"
                  }`}
              >
                {daysLeft > 0 ? `${daysLeft}d` : "Ended"}
              </span>
            </div>

            {isMyCampaign && (
              <div className="flex items-center gap-1">
                <Eye className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${darkMode ? "text-zinc-400" : "text-gray-600"
                  }`} />
                <span className={`text-xs sm:text-sm ${darkMode ? "text-zinc-400" : "text-gray-600"
                  }`}>
                  {campaign.views}
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {isMyCampaign ? (
            <div className="flex gap-2">
              <button
                onClick={handleDonateClick} // Reusing the navigate logic
                className={`flex-1 py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 sm:gap-2 ${darkMode
                  ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                  : "bg-emerald-500 text-white hover:bg-emerald-600"
                  }`}>
                <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">View</span>
              </button>
              <button
                className={`py-2 sm:py-2.5 px-3 sm:px-4 cursor-pointer rounded-lg font-semibold transition-all ${darkMode
                  ? "bg-zinc-700 text-white hover:bg-zinc-600"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                onClick={() => handleOpenModal(campaign)} // Open the modal when the share button is clicked
              >
                <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleDonateClick}
                className={`flex-1 py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg cursor-pointer font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 sm:gap-2 ${darkMode
                  ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                  : "bg-emerald-500 text-white hover:bg-emerald-600"
                  }`}>
                <IndianRupee className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Donate
              </button>
              <button
                className={`py-2 sm:py-2.5 px-3 cursor-pointer sm:px-4 rounded-lg font-semibold transition-all ${darkMode
                  ? "bg-zinc-700 text-white hover:bg-zinc-600"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                onClick={() => handleOpenModal(campaign)} // Open the modal when the share button is clicked
              >
                <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          )}
        </div>
      </motion.div>
    )
  }

  const handleOpenModal = (campaign) => {
    console.log("Opening modal for campaign:", campaign); // Debug log
    setSelectedCampaign(campaign); // Set the selected campaign data
    setIsModalOpen(true); // Open the modal
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleToggleWishlist = async (campaignId) => {
    try {
      // Call the existing toggleWishlist function that will either add or remove
      // the campaign based on its current state in the wishlist
      await toggleWishlist(campaignId); // Assuming the toggleWishlist function is already available in your API call
    } catch (err) {
      console.error("Error toggling wishlist:", err);
    }
  };

  return (
    <div className={`relative min-h-screen ${darkMode ? "bg-zinc-950" : "bg-gray-50"}`}>

      {/* Background Pattern */}
      <div className="absolute inset-y-0 left-0 right-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute inset-0 ${darkMode
            ? "bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)]"
            : "bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)]"
            }`}
          style={{ backgroundSize: '48px 48px' }}
        />
        <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-20 pb-16 sm:pb-20 lg:pb-24">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`mb-6 sm:mb-8 rounded-xl sm:rounded-2xl overflow-hidden relative ${darkMode
            ? "bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border border-emerald-700/30"
            : "bg-gradient-to-br from-emerald-600 to-teal-600 shadow-xl"
            }`}
        >
          <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 bg-white/5 rounded-full -mr-16 sm:-mr-24 -mt-16 sm:-mt-24 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-28 h-28 sm:w-40 sm:h-40 bg-white/5 rounded-full -ml-14 sm:-ml-20 -mb-14 sm:-mb-20 blur-2xl" />

          <div className="relative p-4 sm:p-6 md:p-8">
            <div className="flex flex-col gap-4">
              <div className="flex-1 flex justify-between items-start">
                <div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 text-white">
                    My Campaigns
                  </h1>
                  <p className="text-xs sm:text-sm md:text-base text-white/90">
                    Manage your campaigns and track your {isOrganization ? "requests" : "applications"}
                  </p>
                </div>
                {isOrganization && (
                  <button
                    onClick={() => router.push("/organization/profile/my-campaigns/create")}
                    className={`hidden sm:flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-lg ${darkMode ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30" : "bg-white text-emerald-600 hover:bg-emerald-50"
                      }`}>
                    <Plus size={20} />
                    Create Campaign
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <div className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full ${darkMode ? "bg-white/10" : "bg-white/20"
                  } backdrop-blur-sm`}>
                  <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300" />
                  <span className="font-semibold text-xs sm:text-sm text-white">
                    {currentUser.totalCampaigns} Campaigns
                  </span>
                </div>
                <div className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full ${darkMode ? "bg-white/10" : "bg-white/20"
                  } backdrop-blur-sm`}>
                  <Heart
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-300" />
                  <span className="font-semibold text-xs sm:text-sm text-white">
                    {currentUser.totalWishlisted} Wishlisted
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div className={`inline-flex w-full sm:w-auto rounded-lg sm:rounded-xl p-1 ${darkMode ? "bg-zinc-800/50" : "bg-white shadow-md"
            }`}>
              <button
              onClick={() => setActiveTab("my-campaigns")}
              className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-3 rounded-md sm:rounded-lg font-semibold text-xs sm:text-sm md:text-base transition-all whitespace-nowrap ${activeTab === "my-campaigns"
                ? darkMode
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-emerald-500 text-white"
                : darkMode
                  ? "text-zinc-400 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
                }`}
            >
              {isOrganization ? "Organization Campaigns" : "My Applications"} ({myItems.length})
            </button>
            <button
              onClick={() => setActiveTab("wishlist")}
              className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-3 rounded-md sm:rounded-lg font-semibold text-xs sm:text-sm md:text-base transition-all whitespace-nowrap ${activeTab === "wishlist"
                ? darkMode
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-emerald-500 text-white"
                : darkMode
                  ? "text-zinc-400 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
                }`}
            >
              Wishlist ({wishlistedCampaigns.length})
            </button>
            
          </div>

          {isOrganization && (
            <button
              onClick={() => router.push("/organization/profile/my-campaigns/create")}
              className={`sm:hidden w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold transition-all shadow-lg ${darkMode ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-500 text-white"
                }`}
            >
              <Plus size={20} />
              Create Campaign
            </button>
          )}
        </motion.div>

        {/* Content */}
        {activeTab === "my-campaigns" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {myItems.map((item, idx) => (
              item.type === 'campaign' ? (
                <CampaignCard key={item.data._id || idx} campaign={item.data} isMyCampaign={true} />
              ) : item.type === 'request' ? (
                <RequestCard key={item.data._id || idx} request={item.data} />
              ) : (
                <ApplicationCard key={item.data._id || idx} application={item.data} />
              )
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {wishlistedCampaigns.map((campaign) => (
              <CampaignCard key={campaign._id} campaign={campaign} isMyCampaign={false} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {activeTab === "my-campaigns" && myItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-center py-12 sm:py-16 lg:py-20 rounded-xl sm:rounded-2xl ${darkMode ? "bg-zinc-800/50" : "bg-white shadow-lg"
              }`}
          >
            <Target className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 ${darkMode ? "text-zinc-600" : "text-gray-400"
              }`} />
            <h3 className={`text-lg sm:text-xl font-bold mb-2 px-4 ${darkMode ? "text-white" : "text-gray-900"
              }`}>
              No campaigns yet
            </h3>
            <p className={`mb-4 sm:mb-6 text-sm sm:text-base px-4 ${darkMode ? "text-zinc-400" : "text-gray-600"
              }`}>
              Start creating campaigns to make a difference
            </p>
            <button
              onClick={() => router.push("/organization/profile/my-campaigns/create")}
              className={`px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all ${darkMode
                ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                : "bg-emerald-500 text-white hover:bg-emerald-600"
                }`}>
              Create Campaign
            </button>
          </motion.div>
        )}



        {activeTab === "wishlist" && wishlistedCampaigns.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-center py-12 sm:py-16 lg:py-20 cursor-pointer rounded-xl sm:rounded-2xl ${darkMode ? "bg-zinc-800/50" : "bg-white shadow-lg"
              }`}
          >
            <Heart
              onClick={() => handleToggleWishlist(campaign._id)}
              className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 ${darkMode ? "text-zinc-600" : "text-gray-400"
                }`} />
            <h3 className={`text-lg sm:text-xl font-bold mb-2 px-4 ${darkMode ? "text-white" : "text-gray-900"
              }`}>
              No wishlisted campaigns
            </h3>
            <p className={`text-sm sm:text-base px-4 ${darkMode ? "text-zinc-400" : "text-gray-600"
              }`}>
              Start saving campaigns you care about
            </p>
          </motion.div>
        )}

        {isModalOpen && selectedCampaign && (
          <ShareModal
            url={`${window.location.origin}/campaign/${selectedCampaign.slug}`}
            title={selectedCampaign.title}
            onClose={handleCloseModal}
          />
        )}
      </div>

    </div>
  )
}