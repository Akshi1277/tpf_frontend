import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "@/utils/slices/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include",
});

const baseQueryWithAutoLogout = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401 && api.endpoint === "getMe") {
    api.dispatch(logout());
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAutoLogout,
  tagTypes: [
    "CMS","Campaign","User","Wishlist","RecentTransactions","PeopleHelped",
    "Leaderboard","Comments","MyDonations","MyApplications","Vouchers",
    "Blog","FAQ","Organization","CampaignRequest","Fundraiser","Jobs","CampaignDonors",
  ],

  endpoints: (builder) => ({

    getHijriCalendar: builder.query({
      async queryFn({ month, year }) {
        try {
          const res = await fetch(
            `https://api.aladhan.com/v1/gToHCalendar/${month}/${year}?adjustment=-1`
          );
          const json = await res.json();
          return { data: json.data };
        } catch (err) {
          return { error: { status: "CUSTOM_ERROR", error: err.message } };
        }
      },
      keepUnusedDataFor: 86400,
    }),

  }),
});

export const { useGetHijriCalendarQuery } = apiSlice;