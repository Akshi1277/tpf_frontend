import { apiSlice } from "./apiSlice";

export const permanentDonorApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Create permanent donor subscription
        createSubscription: builder.mutation({
            query: (subscriptionData) => ({
                url: '/permanent-donor/create',
                method: 'POST',
                body: subscriptionData,
            }),
        }),

        // Get my subscription
        getMySubscription: builder.query({
            query: () => '/permanent-donor/my-subscription',
        }),

        // Update subscription amount
        updateAmount: builder.mutation({
            query: ({ amount }) => ({
                url: '/permanent-donor/update-amount',
                method: 'PUT',
                body: { amount },
            }),
        }),

        // Update subscription schedule
        updateSchedule: builder.mutation({
            query: (scheduleData) => ({
                url: '/permanent-donor/update-schedule',
                method: 'PUT',
                body: scheduleData,
            }),
        }),

        // Pause subscription
        pauseSubscription: builder.mutation({
            query: () => ({
                url: '/permanent-donor/pause',
                method: 'PATCH',
            }),
        }),

        // Resume subscription
        resumeSubscription: builder.mutation({
            query: () => ({
                url: '/permanent-donor/resume',
                method: 'PATCH',
            }),
        }),

        // Cancel subscription
        cancelSubscription: builder.mutation({
            query: ({ reason }) => ({
                url: '/permanent-donor/cancel',
                method: 'DELETE',
                body: { reason },
            }),
        }),

        // Get subscription history
        getSubscriptionHistory: builder.query({
            query: () => '/permanent-donor/history',
        }),
    }),
});

export const {
    useCreateSubscriptionMutation,
    useGetMySubscriptionQuery,
    useUpdateAmountMutation,
    useUpdateScheduleMutation,
    usePauseSubscriptionMutation,
    useResumeSubscriptionMutation,
    useCancelSubscriptionMutation,
    useGetSubscriptionHistoryQuery,
} = permanentDonorApiSlice;