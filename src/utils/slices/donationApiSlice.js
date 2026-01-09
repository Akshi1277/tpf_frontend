import { apiSlice } from "./apiSlice";

export const donationApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchRecentDonations: builder.query({
            query: () => "/donations/recent",
            providesTags: ["RecentTransactions"],
            // Refetch every 30 seconds to keep it "Live"
            pollingInterval: 30000,
        }),
    }),
});

export const { useFetchRecentDonationsQuery } = donationApiSlice;
