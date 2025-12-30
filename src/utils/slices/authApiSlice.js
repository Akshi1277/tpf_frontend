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

  }),
});

export const {
  useSendOtpMutation,
  useVerifyOtpMutation,
  useUpdateProfileMutation,
  useGetMeQuery,
  useLogoutUserMutation,
  useLazyGetMeQuery,
  useToggleWishlistMutation,
  useGetWishlistQuery,
} = authApiSlice;
