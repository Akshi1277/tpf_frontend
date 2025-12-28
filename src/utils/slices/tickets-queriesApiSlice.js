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

  }),
});

export const {
  useCreateTicketMutation,
} = ticketApiSlice;