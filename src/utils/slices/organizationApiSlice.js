import { apiSlice } from "./apiSlice";

export const organizationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // ----------------------------------
    // REGISTER ORGANIZATION (FORMDATA)
    // ----------------------------------
    registerOrganization: builder.mutation({
      query: (formData) => ({
        url: "/organizations/register",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Organization"],
    }),

    // ----------------------------------
    // GET ALL ORGANIZATIONS (ADMIN)
    // ----------------------------------
    fetchOrganizations: builder.query({
      query: (params) => ({
        url: "/organizations",
        params, // { page, limit, isNGO, verificationStatus, state, city, search }
      }),
      providesTags: ["Organization"],
    }),

    // ----------------------------------
    // GET ORGANIZATION STATS (ADMIN)
    // ----------------------------------
    fetchOrganizationStats: builder.query({
      query: () => "/organizations/stats",
      providesTags: ["OrganizationStats"],
    }),

    // ----------------------------------
    // GET SINGLE ORGANIZATION
    // ----------------------------------
    fetchOrganizationById: builder.query({
      query: (id) => `/organizations/${id}`,
      providesTags: (result, error, id) => [
        { type: "Organization", id },
      ],
    }),

    // ----------------------------------
    // UPDATE ORGANIZATION (LIMITED FIELDS)
    // ----------------------------------
    updateOrganization: builder.mutation({
      query: ({ id, data }) => ({
        url: `/organizations/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Organization", id },
        "Organization",
      ],
    }),

    // ----------------------------------
    // VERIFY / REJECT ORGANIZATION (ADMIN)
    // ----------------------------------
    updateVerificationStatus: builder.mutation({
      query: ({ id, verificationStatus, verificationNotes }) => ({
        url: `/organizations/${id}/verify`,
        method: "PUT",
        body: { verificationStatus, verificationNotes },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Organization", id },
        "Organization",
      ],
    }),

    // ----------------------------------
    // DELETE ORGANIZATION (ADMIN)
    // ----------------------------------
    deleteOrganization: builder.mutation({
      query: (id) => ({
        url: `/organizations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Organization"],
    }),

  }),
});

export const {
  useRegisterOrganizationMutation,
  useFetchOrganizationsQuery,
  useFetchOrganizationStatsQuery,
  useFetchOrganizationByIdQuery,
  useUpdateOrganizationMutation,
  useUpdateVerificationStatusMutation,
  useDeleteOrganizationMutation,
} = organizationApiSlice;
