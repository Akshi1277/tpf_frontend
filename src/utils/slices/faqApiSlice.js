import { apiSlice } from "./apiSlice";

export const faqApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAnsweredFAQs: builder.query({
            query: ({ category, page, limit }) => ({
                url: `/faqs`,
                params: { category, page, limit },
                method: 'GET',
            }),
            providesTags: ['FAQ'],
        }),
        askFAQQuestion: builder.mutation({
            query: (data) => ({
                url: `/faqs/ask`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['FAQ'],
        }),
        adminGetFAQs: builder.query({
            query: ({ status, category, page, limit }) => ({
                url: `/faqs/admin/all`,
                params: { status, category, page, limit },
                method: 'GET',
            }),
            providesTags: ['FAQ'],
        }),
        adminAnswerFAQ: builder.mutation({
            query: (data) => ({
                url: `/faqs/admin/answer`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['FAQ'],
        }),
    }),
});

export const {
    useGetAnsweredFAQsQuery,
    useAskFAQQuestionMutation,
    useAdminGetFAQsQuery,
    useAdminAnswerFAQMutation,
} = faqApiSlice;
