import apiSlice from '../api/apiSlice';

const commentsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getComments: builder.query({
      query: postId => `/comments/${postId}`,
      providesTags: (result, err, args) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Comment', id })), { type: 'Comment', id: 'LIST' }]
          : [{ type: 'Comment', id: 'LIST' }],
      keepUnusedDataFor: 1,
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
              { type: 'Comment', id: result.id },
            ]
          : [{ type: 'Comment', id: 'LIST' }],
      async onQueryStarted({ parentPost }, { dispatch, queryFulfilled }) {
        try {
          const { data: comment } = await queryFulfilled;
          dispatch(
            commentsApiSlice.util.updateQueryData('getComments', parentPost, draftComments => {
              Object.assign(draftComments, comment);
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
      invalidatesTags: (result, err, { id }) => [{ type: 'Comment', id }],
    }),
    commentReaction: builder.mutation({
      query: ({ id, action, userId }) => ({
        url: `/comments/${id}/${action}`,
        method: 'PATCH',
        body: { userId },
      }),
      invalidatesTags: (result, err, { id }) => [{ type: 'Comment', id }],
      async onQueryStarted({ id, action, userId, parentPost }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          commentsApiSlice.util.updateQueryData('getComments', parentPost, draftComments => {
            const comment = draftComments.find(comment => comment.id === id);
            const userIdIndex = comment.likes.indexOf(userId);
            action === 'like' ? comment.likes.push(userId) : comment.likes.splice(userIdIndex, 1);
          })
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
