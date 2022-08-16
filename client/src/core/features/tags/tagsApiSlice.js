import apiSlice from '../api/apiSlice';

const tagsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getTags: builder.query({
      query: () => '/tags',
      providesTags: (result, err, args) =>
        result
          ? [{ type: 'Tag', id: 'LIST' }, ...result.map(({ _id }) => ({ type: 'Tag', id: _id }))]
          : [{ type: 'Tag', id: 'LIST' }],
    }),
    getFollowingTags: builder.query({
      query: ({ userId }) => `/tags/limit/${userId}`,
      providesTags: (result, err, args) =>
        result
          ? [{ type: 'Tag', id: 'LIST' }, ...result.map(({ _id }) => ({ type: 'Tag', id: _id }))]
          : [{ type: 'Tag', id: 'LIST' }],
    }),
    getNumTags: builder.query({
      query: () => '/tags/limit',
      providesTags: (result, err, args) =>
        result
          ? [{ type: 'Tag', id: 'LIST' }, ...result.map(({ _id }) => ({ type: 'Tag', id: _id }))]
          : [{ type: 'Tag', id: 'LIST' }],
    }),
    getTagByName: builder.query({
      query: name => `/tags/${name}`,
      providesTags: (result, err, args) =>
        result ? [{ type: 'Tag', id: result._id }] : [{ type: 'Tag', id: 'LIST' }],
    }),
    handleFollow: builder.mutation({
      query: ({ name, action, userId, tagId }) => ({
        url: `/tags/${name}/${action}`,
        method: 'PATCH',
        body: { userId, tagId },
      }),
      invalidatesTags: (result, err, { tagId }) => [{ type: 'Tag', id: tagId }],
      async onQueryStarted({ name, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          tagsApiSlice.util.updateQueryData('getTagByName', { name }, draftTag => {
            Object.assign(draftTag, patch);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetTagsQuery,
  useGetNumTagsQuery,
  useGetFollowingTagsQuery,
  useGetTagByNameQuery,
  useHandleFollowMutation,
} = tagsApiSlice;
