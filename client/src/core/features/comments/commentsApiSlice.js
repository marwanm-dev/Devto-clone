import apiSlice from '../api/apiSlice';

const commentsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getComments: builder.query({
      query: postId => `/comments/${postId}`,
      providesTags: (result, err, args) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Comment', id: _id })),
              { type: 'Comment', id: 'LIST' },
            ]
          : [{ type: 'Comment', id: 'LIST' }],
    }),
    postComment: builder.mutation({
      query: data => ({
        url: `/comments`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, err, args) =>
        result
          ? [
              { type: 'Comment', id: 'LIST' },
              ...result.map(({ _id }) => ({ type: 'Comment', id: _id })),
            ]
          : [{ type: 'Comment', id: 'LIST' }],
      async onQueryStarted({ parentPost }, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        try {
          dispatch(
            commentsApiSlice.util.updateQueryData('getComments', parentPost, draftComments => {
              Object.assign(draftComments, data);
            })
          );
        } catch {
          dispatch(commentsApiSlice.util.invalidateTags([{ type: 'Comment', id: 'LIST' }]));
        }
      },
    }),
    deleteComment: builder.mutation({
      query: id => ({
        url: `/comments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, err, id) => [{ type: 'Comment', id }],
    }),
    updateComment: builder.mutation({
      query: data => ({
        url: `/comments/${data.id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, err, args) => [{ type: 'Comment', id: args.id }],
    }),
    commentReaction: builder.mutation({
      query: ({ id, action, userId }) => ({
        url: `/comments/${id}/${action}`,
        method: 'PATCH',
        body: { userId },
      }),
      invalidatesTags: (result, err, { id }) => [{ type: 'Comment', id }],
      async onQueryStarted({ id, parentPost, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          commentsApiSlice.util.updateQueryData('getComments', parentPost, () => {})
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
          dispatch(
            commentsApiSlice.util.invalidateTags([
              { type: 'Comment', id },
              { type: 'Comment', id: 'LIST' },
            ])
          );
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetCommentsQuery,
  usePostCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
  useCommentReactionMutation,
} = commentsApiSlice;
