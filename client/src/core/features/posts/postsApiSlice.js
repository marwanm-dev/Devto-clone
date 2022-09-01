import { GiConsoleController } from 'react-icons/gi';
import apiSlice from '../api/apiSlice';

const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getPostsList: builder.query({
      query: id => `/posts${id ? `/bookmarked/${id}` : ''}`,
      providesTags: (result, err, args) =>
        result
          ? [{ type: 'Post', id: 'LIST' }, ...result.map(({ id }) => ({ type: 'Post', id }))]
          : [{ type: 'Post', id: 'LIST' }],
    }),
    getPost: builder.query({
      query: ({ url }) => `/posts/${url}`,
      providesTags: (result, err, args) =>
        result ? [{ type: 'Post', id: result.id }] : [{ type: 'Post', id: 'LIST' }],
    }),
    createPost: builder.mutation({
      query: ({ ...data }) => ({
        url: `/posts`,
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: (result, err, args) =>
        result ? [{ type: 'Post', id: result.id }] : [{ type: 'Post', id: 'LIST' }],
    }),
    updatePost: builder.mutation({
      query: ({ meta, data }) => ({
        url: `/posts/${meta.url}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, err, { meta }) => [{ type: 'Post', id: meta.id }],
      async onQueryStarted({ meta: { url } }, { dispatch, queryFulfilled }) {
        const { data: updatedPost } = await queryFulfilled;
        dispatch(
          postsApiSlice.util.updateQueryData('getPost', { url }, draftPost => {
            Object.assign(draftPost, updatedPost);
          })
        );
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
      invalidatesTags: (result, err, { id }) => [{ type: 'Post', id }],
      async onQueryStarted({ url, id, actionKey, immutatedArray }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          postsApiSlice.util.updateQueryData('getPost', { url }, draftPost => {
            draftPost[actionKey] = immutatedArray;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
          dispatch(
            postsApiSlice.util.invalidateTags([
              { type: 'Post', id },
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
  useGetPostsListQuery,
  useGetPostQuery,
  useGetBookmarkedPostsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  usePostReactionMutation,
} = postsApiSlice;

export default postsApiSlice;
