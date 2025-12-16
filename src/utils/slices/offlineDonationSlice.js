import { apiSlice } from "./apiSlice";
import { setCredentials } from "./authSlice";

export const offlineDonationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    createOfflineDonation: builder.mutation({
      query: (formData) => ({
        url: '/offline-donations/create',
        method: 'POST',
        body: formData,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData(
              'getOfflineDonations',
              undefined,
              (draft) => {
                draft.donations.unshift(data.donation);
              }
            )
          );

          dispatch(setCredentials(data.user));
        } catch (err) {
          // optional error handling
        }
      },
    }),

    getOfflineDonations: builder.query({
      query: () => ({
        url: '/offline-donations',
        method: 'GET',
      }),
    }),

    getOfflineDonationById: builder.query({
      query: (id) => `/offline-donations/${id}`,
    }),
  }),
});

export const {
  useCreateOfflineDonationMutation,
  useGetOfflineDonationsQuery,
  useGetOfflineDonationByIdQuery,
} = offlineDonationApiSlice;
