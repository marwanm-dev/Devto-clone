import apiSlice from '../api/apiSlice';

const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createPost: builder.mutation({
      query: data => ({
        url: `/posts`,
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: (result, err, args) => {
        return [{ type: 'Posts', id: result._id }];
      },
    }),
    getPosts: builder.query({
      query: () => `/posts`,
      providesTags: (result, err, args) => {
        console.log({ result, err, args });
        return [...result._ids.map(id => [{ type: 'Posts', id }]), [{ type: 'Posts', id: 'LIST' }]];
      },
    }),
    updatePost: builder.mutation({
      query: ({ meta, data }) => ({
        url: `/posts/${meta.url}`,
        method: 'PATCH',
        body: { ...data },
      }),
      invalidatesTags: (result, err, args) => [{ type: 'Posts', id: args.meta.id }],
    }),
    deletePost: builder.mutation({
      query: ({ url, publicId }) => ({
        url: `/posts/${url}`,
        method: 'DELETE',
        body: { publicId },
      }),
      invalidatesTags: (result, err, args) => [{ type: 'Posts', id: args.id }],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApiSlice;
