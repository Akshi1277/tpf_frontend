import { apiSlice } from "./apiSlice";
import { setCredentials } from "./authSlice";
export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    sendOtp: builder.mutation({
      query: ({ mobileNo, type }) => ({
        url: "/user/send-otp",
        method: "POST",
        body: { mobileNo, type },
      }),
    }),

    verifyOtp: builder.mutation({
      query: ({ mobileNo, otp }) => ({
        url: "/user/verify-otp",
        method: "POST",
        body: { mobileNo, otp },
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
      }),
    }),

  }),
});

export const {
  useSendOtpMutation,
  useVerifyOtpMutation,
  useUpdateProfileMutation,
  useGetMeQuery,
  useLogoutUserMutation,
  useLazyGetMeQuery,
} = authApiSlice;
