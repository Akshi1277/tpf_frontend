export const getMediaUrl = (path) => {
    if (!path || path === "undefined") return "";

    // Already a full URL
    if (path.startsWith("http")) return path;

    const BASE_URL = process.env.NEXT_PUBLIC_UPLOAD_URL;

    if (!BASE_URL) {
        console.error("NEXT_PUBLIC_UPLOAD_URL is not defined");
        return "";
    }

    let cleanPath = path;

    if (path.startsWith("/uploads/")) {
        cleanPath = path.replace("/uploads/", "");
    } else if (path.startsWith("uploads/")) {
        cleanPath = path.replace("uploads/", "");
    }

    return `${BASE_URL}/api/media/${cleanPath}`;
};
