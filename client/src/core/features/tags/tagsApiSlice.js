import apiSlice from '../api/apiSlice';

const tagsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getTags: builder.query({
      query: () => '/tags',
      providesTags: (result, err, args) =>
        result
          ? [{ type: 'Tag', id: 'LIST' }, ...result.map(({ id }) => ({ type: 'Tag', id }))]
          : [{ type: 'Tag', id: 'LIST' }],
    }),
    getFollowingTags: builder.query({
      query: ({ userId }) => `/tags/limit/${userId}`,
      providesTags: (result, err, args) =>
        result
          ? [{ type: 'Tag', id: 'LIST' }, ...result.map(({ id }) => ({ type: 'Tag', id }))]
          : [{ type: 'Tag', id: 'LIST' }],
    }),
    getNumTags: builder.query({
      query: () => '/tags/limit',
      providesTags: (result, err, args) =>
        result
          ? [{ type: 'Tag', id: 'LIST' }, ...result.map(({ id }) => ({ type: 'Tag', id }))]
          : [{ type: 'Tag', id: 'LIST' }],
    }),
    getTagByName: builder.query({
      query: name => `/tags/${name}`,
      providesTags: (result, err, args) =>
        result ? [{ type: 'Tag', id: result.id }] : [{ type: 'Tag', id: 'LIST' }],
    }),
    handleFollow: builder.mutation({
      query: ({ name, action, userId, tagId }) => ({
        url: `/tags/${name}/${action}`,
        method: 'PATCH',
        body: { userId, tagId },
      }),
      invalidatesTags: (result, err, { tagId }) => [{ type: 'Tag', id: tagId }],
      async onQueryStarted({ name, action, userId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          tagsApiSlice.util.updateQueryData('getTagByName', name, draftTag => {
            const userIndex = draftTag.followers.indexOf(userId);
            action === 'follow'
              ? draftTag.followers.push(userId)
              : draftTag.followers.splice(userIndex, 1);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
          tagsApiSlice.util.invalidateTags([
            { type: 'Tag', id: tagId },
            { type: 'Tag', id: 'LIST' },
          ]);
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
