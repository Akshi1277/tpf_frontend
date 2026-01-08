export const getMediaUrl = (path) => {
    if (!path) return "";

    // If it's already a full external URL, return as is
    if (path.startsWith("http")) return path;

    const BASE_URL = process.env.NEXT_PUBLIC_UPLOAD_URL || "https://api.anatech.fun";

    // Convert old /uploads/ paths to new /api/media/ format
    let cleanPath = path;
    if (path.startsWith("/uploads/")) {
        cleanPath = path.replace("/uploads/", "");
    } else if (path.startsWith("uploads/")) {
        cleanPath = path.replace("uploads/", "");
    }

    // Always use the backend's media proxy
    return `${BASE_URL}/api/media/${cleanPath}`;
};
