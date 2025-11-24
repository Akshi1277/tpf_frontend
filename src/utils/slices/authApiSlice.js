import { apiSlice } from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    sendOtp: builder.mutation({
      query: ({ mobileNo }) => ({
        url: "/user/send-otp",
        method: "POST",
        body: { mobileNo },
      }),
    }),

    //useVerifyOtpMutaion
    verifyOtp: builder.mutation({
      query: ({ mobileNo, otp }) => ({
        url: "/user/verify-otp",
        method: "POST",
        body: { mobileNo, otp },
      }),
    }), // ✅ THIS WAS MISSING

    updateProfile: builder.mutation({
      query: ({ fullName, email }) => ({
        url: "/user/update-profile",
        method: "PUT",
        body: { fullName, email },
      }),
    }),



  }),
});

export const {
  useSendOtpMutation,
  useVerifyOtpMutation,
  useUpdateProfileMutation,
} = authApiSlice;
