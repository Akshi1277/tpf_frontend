import { apiSlice } from "./apiSlice";
import { logout, setCredentials } from "./authSlice";
export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    softSignup: builder.mutation({
      query: ({ fullName, email, mobileNo, nisaabDate }) => ({
        url: "/user/identity",
        method: "POST",
        body: {
          fullName,
          email,
          mobileNo,
          nisaabDate
        },
      }),
    }),

    sendOtp: builder.mutation({
      query: ({ mobileNo, email, type }) => ({
        url: "/user/send-otp",
        method: "POST",
        body: { mobileNo, email, type },
      }),
    }),

    verifyOtp: builder.mutation({
      query: ({ mobileNo, email, otp }) => ({
        url: "/user/verify-otp",
        method: "POST",
        body: { mobileNo, email, otp },
      }),
    }),

    updateProfile: builder.mutation({
      query: (profileData) => ({
        url: "/user/update-profile",
        method: "PUT",
        body: profileData,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          // ✅ Update Redux immediately (NO refetch)
          dispatch(setCredentials(data.user));

        } catch (error) {
          // optional: console.error(error);
        }
      },

      invalidatesTags: ["User"],
    }),

    getMe: builder.query({
      query: () => "/user/me",
      providesTags: ["User"],
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: "/user/logout",
        method: "POST",
        credentials: "include", // 🔥 REQUIRED for cookies
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          dispatch(logout()); // clear auth slice
          dispatch(authApiSlice.util.resetApiState()); // 🔥 REQUIRED
        }
      },
    }),

    toggleWishlist: builder.mutation({
      query: (campaignId) => ({
        url: `/user/wishlist/${campaignId}`,
        method: "POST",
      }),
      invalidatesTags: ["Wishlist"],


      async onQueryStarted(campaignId, { dispatch, queryFulfilled, getState }) {
        try {
          const { data } = await queryFulfilled;
          const user = getState().auth.userInfo;

          dispatch(
            setCredentials({
              ...user,               // ✅ keep existing user
              wishlist: data.wishlist,
            })
          );
        } catch (err) {
          // console.error(err);
        }
      }



    }),

    // 📥 GET WISHLIST CAMPAIGNS
    getWishlist: builder.query({
      query: () => "/user/wishlist",
      providesTags: ["Wishlist"],
    }),

    getRecentTransactions: builder.query({
      query: () => "/user/recent-transactions",
      providesTags: ["RecentTransactions"],
    }),

    getPeopleHelpedStats: builder.query({
      query: () => "/user/people-helped",
      providesTags: ["PeopleHelped"],
    }),




    getMyApplications: builder.query({
      query: () => "/financial-aid/my-applications",
      keepUnusedDataFor: 0,
      providesTags: ["MyApplications"],
    }),

    uploadClarificationDocuments: builder.mutation({
      query: ({ applicationId, formData }) => ({
        url: `/financial-aid/${applicationId}/clarification`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["MyApplications"],
    }),

    registerVolunteer: builder.mutation({
      query: (volunteerData) => ({
        url: "/user/register-volunteer",
        method: "POST",
        body: volunteerData,
      }),
      // No auto-login - user must login manually after registration
    }),

  }),
});

export const {
  useSoftSignupMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useUpdateProfileMutation,
  useRegisterVolunteerMutation,
  useGetMeQuery,
  useLogoutUserMutation,
  useLazyGetMeQuery,
  useToggleWishlistMutation,
  useGetWishlistQuery,
  useGetRecentTransactionsQuery,
  useGetPeopleHelpedStatsQuery,
  useGetMyApplicationsQuery,
  useUploadClarificationDocumentsMutation,

} = authApiSlice;
