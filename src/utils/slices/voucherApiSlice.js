import { apiSlice } from "./apiSlice";

export const voucherApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        raiseVoucher: builder.mutation({
            query: (data) => ({
                url: "/vouchers/raise",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Vouchers"],
        }),
        getMyVouchers: builder.query({
            query: () => "/vouchers/my-vouchers",
            providesTags: ["Vouchers"],
        }),
        updateVoucher: builder.mutation({
            query: ({ id, data }) => ({
                url: `/vouchers/update/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Vouchers"],
        }),
    }),
});

export const {
    useRaiseVoucherMutation,
    useGetMyVouchersQuery,
    useUpdateVoucherMutation,
} = voucherApiSlice;
