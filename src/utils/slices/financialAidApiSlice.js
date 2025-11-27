import { apiSlice } from "./apiSlice";

export const financialAidApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Submit financial aid application
        submitFinancialAid: builder.mutation({
            query: (formData) => ({
                url: '/financial-aid/apply',
                method: 'POST',
                body: formData,
                // Don't set Content-Type header - let browser set it for FormData
            }),
        }),

        // Get all applications (admin)
        getAllApplications: builder.query({
            query: ({ formType } = {}) => ({
                url: '/financial-aid',
                params: formType ? { formType } : {},
            }),
        }),

        // Get single application by ID
        getApplicationById: builder.query({
            query: (id) => `/financial-aid/${id}`,
        }),
    }),
});

export const {
    useSubmitFinancialAidMutation,
    useGetAllApplicationsQuery,
    useGetApplicationByIdQuery,
} = financialAidApiSlice;
