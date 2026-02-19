import { apiSlice } from "./apiSlice";
import { setCredentials, logout } from "./authSlice";

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

    // --------------------
    // SEND OTP
    // --------------------
    sendOrganizationOtp: builder.mutation({
      query: (email) => ({
        url: "/organizations/send-otp",
        method: "POST",
        body: { email },
      }),
    }),

    // --------------------
    // VERIFY OTP
    // --------------------
    verifyOrganizationOtp: builder.mutation({
      query: ({ email, otp }) => ({
        url: "/organizations/verify-otp",
        method: "POST",
        body: { email, otp },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          // 🔥 Clear previous session (important)
          dispatch(logout());

          // 🔥 Normalize through authSlice
          dispatch(
            setCredentials({
              ...data.organization,
              type: "organization",
            })
          );

        } catch (err) { }
      },
    }),


    // --------------------
    // GET ME
    // --------------------
    getOrganizationMe: builder.query({
      query: () => "/organizations/me",
      providesTags: ["Organization"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setOrganizationCredentials(data.data));
        } catch (err) { }
      },
    }),

    // --------------------
    // LOGOUT
    // --------------------
    logoutOrganization: builder.mutation({
      query: () => ({
        url: "/organizations/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          dispatch(logoutOrganizationState());
          dispatch(organizationApiSlice.util.resetApiState());
        }
      },
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

    // ----------------------------------
    // CAMPAIGN REQUESTS
    // ----------------------------------
    submitCampaignRequest: builder.mutation({
      query: (formData) => ({
        url: "/campaign-requests",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["CampaignRequest"],
    }),

    updateCampaignRequest: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/campaign-requests/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["CampaignRequest"],
    }),

    getOrganizationCampaignRequests: builder.query({
      query: () => "/campaign-requests/me",
      providesTags: ["CampaignRequest"],
    }),

    getAllCampaignRequests: builder.query({
      query: () => "/campaign-requests/all",
      providesTags: ["CampaignRequest"],
    }),

    updateCampaignRequestStatus: builder.mutation({
      query: ({ id, status, adminStatement }) => ({
        url: `/campaign-requests/admin/${id}/status`,
        method: "PATCH",
        body: { status, adminStatement },
      }),
      invalidatesTags: ["CampaignRequest", "Campaign", "Fundraiser"],
    }),

  }),
});

export const {
  useRegisterOrganizationMutation,
  useFetchOrganizationsQuery,
  useGetOrganizationMeQuery,
  useFetchOrganizationStatsQuery,
  useFetchOrganizationByIdQuery,
  useUpdateOrganizationMutation,
  useUpdateVerificationStatusMutation,
  useDeleteOrganizationMutation,
  useSendOrganizationOtpMutation,
  useVerifyOrganizationOtpMutation,
  useLogoutOrganizationMutation,
  useSubmitCampaignRequestMutation,
  useUpdateCampaignRequestMutation,
  useGetOrganizationCampaignRequestsQuery,
  useGetAllCampaignRequestsQuery,
  useUpdateCampaignRequestStatusMutation,
} = organizationApiSlice;
