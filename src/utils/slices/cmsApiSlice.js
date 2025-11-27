import { apiSlice } from "./apiSlice";

export const cmsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCMS: builder.query({
      query: () => `/cms/all`,
      providesTags: ["CMS"],
    }),
  }),
});

export const { useGetCMSQuery } = cmsApi;
