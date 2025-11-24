import { apiSlice } from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    sendOtp: builder.mutation({
      query: ({ mobileNo, type }) => ({
        url: "/user/send-otp",
        method: "POST",
        body: { mobileNo, type },
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
  query: (profileData) => ({
    url: "/user/update-profile",
    method: "PUT",
    body: profileData,   // send everything user wants to update
  }),
}),

getUser : builder.query({
  query:() =>({
    url: "/user/getUser",
    method: "GET"
  })
})




  }),
});

export const {
  useSendOtpMutation,
  useVerifyOtpMutation,
  useUpdateProfileMutation,
  useGetUserQuery
} = authApiSlice;
