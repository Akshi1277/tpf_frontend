import { apiSlice } from "./apiSlice";

export const donationApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchRecentDonations: builder.query({
            query: () => "/donations/recent",
            providesTags: ["RecentTransactions"],
            // Refetch every 30 seconds to keep it "Live"
            pollingInterval: 30000,
        }),
        fetchMyDonations: builder.query({
            query: (params) => ({
                url: "/donations/my-donations",
                params: params,
            }),
            providesTags: ["MyDonations"],
        }),
        fetchCampaignDonors: builder.query({
            query: ({ campaignId, page = 1, limit = 10 }) => ({
                url: `/donations/campaign/${campaignId}/donors`,
                params: { page, limit },
            }),
            providesTags: (result, error, { campaignId }) => [{ type: "CampaignDonors", id: campaignId }],
        }),
    }),
});

export const { useFetchRecentDonationsQuery, useFetchMyDonationsQuery, useFetchCampaignDonorsQuery } = donationApiSlice;
