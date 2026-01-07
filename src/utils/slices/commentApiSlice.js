import { apiSlice } from "./apiSlice";

export const commentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getComments: builder.query({
            query: ({ campaignId, page = 1 }) => `/comments/${campaignId}?page=${page}`,
            providesTags: (result, error, { campaignId }) =>
                result
                    ? [
                        ...result.data.map(({ _id }) => ({ type: "Comments", id: _id })),
                        { type: "Comments", id: `LIST-${campaignId}` },
                    ]
                    : [{ type: "Comments", id: "LIST" }],
            serializeQueryArgs: ({ endpointName, queryArgs }) => {
                return `${endpointName}-${queryArgs.campaignId}`;
            },
            merge: (currentCache, newItems, { arg }) => {
                if (arg.page === 1) {
                    currentCache.data = newItems.data;
                    currentCache.hasMore = newItems.hasMore;
                    currentCache.totalCount = newItems.totalCount;
                    currentCache.userHasCommented = newItems.userHasCommented;
                } else {
                    // Filter out duplicates just in case
                    const existingIds = new Set(currentCache.data.map(c => c._id));
                    const uniqueNew = newItems.data.filter(c => !existingIds.has(c._id));
                    currentCache.data.push(...uniqueNew);
                    currentCache.hasMore = newItems.hasMore;
                    currentCache.totalCount = newItems.totalCount;
                    currentCache.userHasCommented = newItems.userHasCommented;
                }
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            },
        }),

        addComment: builder.mutation({
            query: (data) => ({
                url: "/comments",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Comments"],
        }),

        updateComment: builder.mutation({
            query: ({ id, content }) => ({
                url: `/comments/${id}`,
                method: "PUT",
                body: { content },
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: "Comments", id },
                "Comments",
            ],
        }),

        deleteComment: builder.mutation({
            query: (id) => ({
                url: `/comments/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Comments"],
        }),
    }),
});

export const {
    useGetCommentsQuery,
    useAddCommentMutation,
    useUpdateCommentMutation,
    useDeleteCommentMutation,
} = commentApiSlice;
