import { apiSlice } from "./apiSlice";

export const leaderboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLeaderboardStats: builder.query({
      query: () => ({
        url: "/leaderboard",
        method: "GET",
      }),

      // Optional: normalize or protect shape
      transformResponse: (response) => {
        if (!response?.success) {
          return {
            weekly: [],
            monthly: [],
            yearly: [],
          };
        }

        return response.data;
      },

      // Optional caching strategy
      keepUnusedDataFor: 300, // 5 minutes
      providesTags: ["Leaderboard"],
    }),
  }),
});

export const {
  useGetLeaderboardStatsQuery,
  useLazyGetLeaderboardStatsQuery,
} = leaderboardApiSlice;
