export const getMediaUrl = (path) => {
  if (!path || path === "undefined") return null;

  // Already absolute URL
  if (typeof path === "string" && path.startsWith("http")) {
    return path;
  }

  const BASE_URL = process.env.NEXT_PUBLIC_UPLOAD_URL;

  if (!BASE_URL) {
    if (process.env.NODE_ENV !== "production") {
      console.error("NEXT_PUBLIC_UPLOAD_URL is not defined");
    }
    return null;
  }

  let cleanPath = path;

  if (cleanPath.startsWith("/uploads/")) {
    cleanPath = cleanPath.replace("/uploads/", "");
  } else if (cleanPath.startsWith("uploads/")) {
    cleanPath = cleanPath.replace("uploads/", "");
  }

  return `${BASE_URL}/api/media/${cleanPath}`;
};
