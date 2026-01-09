import { apiSlice } from "./apiSlice";

export const campaignApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // ----------------------------------
    // GET ALL CAMPAIGNS (Landing page)
    // ----------------------------------
    fetchCampaigns: builder.query({
      query: () => "/campaigns/get",
      providesTags: ["Campaign"],
    }),

    // ----------------------------------
    // GET SINGLE CAMPAIGN BY SLUG
    // ----------------------------------
    fetchCampaignBySlug: builder.query({
      query: (slug) => `/campaigns/${slug}`,
      providesTags: (result, error, slug) => [
        { type: "Campaign", id: slug },
      ],
    }),

    // ----------------------------------
    // GET IMPACT STATS (Home page)
    // ----------------------------------
    fetchImpactStats: builder.query({
      query: () => "/campaigns/stats",
      providesTags: ["Campaign"],
    }),

  }),
});

export const {
  useFetchCampaignsQuery,
  useFetchCampaignBySlugQuery,
  useFetchImpactStatsQuery,
} = campaignApiSlice;
