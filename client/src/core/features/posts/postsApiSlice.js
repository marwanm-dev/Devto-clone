import apiSlice from '../api/apiSlice';

const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getPosts: builder.query({
      query: () => `/posts`,
      providesTags: (result, err, args) => [
        { type: 'Posts', id: 'LIST' },
        ...result.map(({ _id }) => ({ type: 'Posts', id: _id })),
      ],
    }),
    getPost: builder.query({
      query: url => ({
        url: `/posts/${url}`,
      }),
      providesTags: (result, err, args) => [{ type: 'Posts', id: result?._id }],
    }),
    createPost: builder.mutation({
      query: ({ token, ...data }) => ({
        url: `/posts`,
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: { ...data },
      }),
      invalidatesTags: (result, err, args) => [{ type: 'Posts', id: result._id }],
    }),
    updatePost: builder.mutation({
      query: ({ meta, data }) => ({
        url: `/posts/${meta.url}`,
        method: 'PATCH',
        headers: { Authorization: `Bearer ${meta.token}` },
        body: { ...data },
      }),
      invalidatesTags: (result, err, args) => [{ type: 'Posts', id: args.meta.id }],
    }),
    deletePost: builder.mutation({
      query: ({ token, url, publicId }) => ({
        url: `/posts/${url}`,
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
        body: { publicId },
      }),
      invalidatesTags: (result, err, args) => [{ type: 'Posts', id: args.id }],
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
} = postsApiSlice;
