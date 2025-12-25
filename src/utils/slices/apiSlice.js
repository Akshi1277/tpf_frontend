import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "@/utils/slices/authSlice";

/**
 * Base query with cookies enabled
 */
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include", // 👈 REQUIRED for HttpOnly cookies
});

/**
 * Wrapper to auto-logout on 401 (expired / missing cookie)
 */
const baseQueryWithAutoLogout = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    // Clear redux + localStorage
    api.dispatch(logout());
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAutoLogout,
  tagTypes: ["CMS", "Campaign", "User"],
  endpoints: (builder) => ({
    getHijriDate: builder.query({
      query: (date) => `https://api.aladhan.com/v1/gToH?date=${date}`,
      keepUnusedDataFor: 86400, // Cache for 24 hours
    }),
  }),
});

export const { useGetHijriDateQuery } = apiSlice;
