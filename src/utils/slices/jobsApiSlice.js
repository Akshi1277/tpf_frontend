import { apiSlice } from "./apiSlice";

export const jobApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // 🔹 Get All Jobs (with pagination)
        getAllJobs: builder.query({
            query: (params) => ({
                url: "/jobs/getall",
                params, // page, limit, search, department, sort
            }),
            providesTags: ["Jobs"],
        }),

        // 🔹 Get Single Job By Slug
        getJobBySlug: builder.query({
            query: (slug) => `/jobs/get/${slug}`,
            providesTags: (result, error, slug) => [{ type: "Jobs", id: slug }],
        }),

        applyToJob: builder.mutation({
            query: (formData) => ({
                url: "/applicants/apply", // adjust if your base route differs
                method: "POST",
                body: formData,
            }),
        }),

        getApplicationsByJob: builder.query({
            query: (jobId) => ({
                url: `/applicants/get/${jobId}`,
            }),
        }),

    }),
});

export const {
    useGetAllJobsQuery,
    useGetJobBySlugQuery,
    useApplyToJobMutation,
    useGetApplicationsByJobQuery,
} = jobApiSlice;