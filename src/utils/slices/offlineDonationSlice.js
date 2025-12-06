import { apiSlice } from "./apiSlice";

export const offlineDonationApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // CREATE offline donation
        createOfflineDonation: builder.mutation({
            query: (formData) => ({
                url: '/offline-donations/create',
                method: 'POST',
                body: formData,
            }),
        }),

        // GET all donations (admin or user list)
        getOfflineDonations: builder.query({
            query: () => ({
                url: '/offline-donations',
                method: 'GET',
            }),
        }),

        // GET one donation by ID
        getOfflineDonationById: builder.query({
            query: (id) => `/offline-donations/${id}`,
        }),
    }),
});

// Export hooks
export const {
    useCreateOfflineDonationMutation,
    useGetOfflineDonationsQuery,
    useGetOfflineDonationByIdQuery,
} = offlineDonationApiSlice;
