import { apiSlice } from "./apiSlice";

export const blogApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // ----------------------------------
    // GET ALL BLOGS (Blog listing page)
    // ----------------------------------
    fetchBlogs: builder.query({
      query: (params) => ({
        url: "/blogs",
        params, // { page, limit, tag, search }
      }),
      providesTags: ["Blog"],
    }),

    // ----------------------------------
    // GET SINGLE BLOG BY SLUG
    // ----------------------------------
    fetchBlogBySlug: builder.query({
      query: (slug) => `/blogs/${slug}`,
      providesTags: (result, error, slug) => [
        { type: "Blog", id: slug },
      ],
    }),

  }),
});

export const {
  useFetchBlogsQuery,
  useFetchBlogBySlugQuery,
} = blogApiSlice;
