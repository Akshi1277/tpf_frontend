import { apiSlice } from "./apiSlice";


export const ticketApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    createTicket: builder.mutation({
      query: (ticketData) => ({
        url: "/ticket/create",
        method: "POST",
        body: ticketData,
      }),
    }),
    getAllNotices: builder.query({
      query: () => ({
        url: "/notices/get",
        method: "GET",
      }),
      providesTags: ["CMS"],
    }),

    getNoticeById: builder.query({
      query: (id) => `/notices/${id}/get`,
      providesTags: ["CMS"],
    }),

  }),
});

export const {
  useCreateTicketMutation,
  useGetAllNoticesQuery,
  useGetNoticeByIdQuery
} = ticketApiSlice;