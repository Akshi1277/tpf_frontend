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

  if (
    result?.error?.status === 401 &&
    api.endpoint === "getMe" // 👈 adjust if your auth-check endpoint name differs
  ) {
    api.dispatch(logout());
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAutoLogout,
  tagTypes: ["CMS", "Campaign", "User", "Wishlist", "RecentTransactions", "PeopleHelped", "Leaderboard", "Comments", "MyDonations", "MyApplications", "Vouchers", "Blog", "FAQ", "Organization", "CampaignRequest", "Fundraiser","Jobs"],
  endpoints: (builder) => ({
    getHijriDate: builder.query({
      async queryFn(date) {
        try {
          const res = await fetch(`https://api.aladhan.com/v1/gToH?date=${date}`);
          const data = await res.json();
          return { data };
        } catch (error) {
          return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        }
      },
      keepUnusedDataFor: 86400, // Cache for 24 hours
    }),
  }),
});

export const { useGetHijriDateQuery } = apiSlice;
