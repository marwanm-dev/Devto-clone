import apiSlice from '../api/apiSlice';

const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getPosts: builder.query({
      query: args => '/posts',
      transformResponse: response => response.sort((a, b) => (a.date < b.date ? 1 : -1)),
      providesTags: (result, err, args) =>
        result
          ? [{ type: 'Post', id: 'LIST' }, ...result.map(({ _id }) => ({ type: 'Post', id: _id }))]
          : [{ type: 'Post', id: 'LIST' }],
    }),
    getPost: builder.query({
      query: ({ url }) => ({
        url: `/posts/${url}`,
      }),
      providesTags: (result, err, args) =>
        result ? [{ type: 'Post', id: result?._id }] : [{ type: 'Post', id: 'LIST' }],
    }),
    createPost: builder.mutation({
      query: ({ ...data }) => ({
        url: `/posts`,
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: (result, err, args) =>
        result ? [{ type: 'Post', id: result._id }] : [{ type: 'Post', id: 'LIST' }],
    }),
    updatePost: builder.mutation({
      query: ({ meta, data }) => ({
        url: `/posts/${meta.url}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, err, args) => [{ type: 'Post', id: args.meta.id }],
      async onQueryStarted({ meta, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          postsApiSlice.util.updateQueryData('getPost', { meta, ...patch }, draft => {
            Object.assign(draft, patch);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
          dispatch(
            postsApiSlice.util.invalidateTags([
              { type: 'Post', id: postId },
              { type: 'Post', id: 'LIST' },
            ])
          );
        }
      },
    }),
    deletePost: builder.mutation({
      query: ({ url, publicId }) => ({
        url: `/posts/${url}`,
        method: 'DELETE',
        body: { publicId },
      }),
      invalidatesTags: (result, err, args) => [{ type: 'Post', id: args.id }],
    }),
    postReaction: builder.mutation({
      query: ({ url, action, userId }) => ({
        url: `/posts/${url}/${action}`,
        method: 'PATCH',
        body: { userId },
      }),
      invalidatesTags: (result, err, args) => [{ type: 'Post', id: args.postId }],
      async onQueryStarted(
        { url, action, userId, postId, ...patch },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          postsApiSlice.util.updateQueryData('getPost', { url, action, userId }, draft => {
            Object.assign(draft, patch);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
          dispatch(
            postsApiSlice.util.invalidateTags([
              { type: 'Post', id: postId },
              { type: 'Post', id: 'LIST' },
            ])
          );
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  usePostReactionMutation,
} = postsApiSlice;
