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
      async onQueryStarted(
        { name, action, userId, isTagPage, tagId },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          tagsApiSlice.util.updateQueryData(
            isTagPage ? 'getTagByName' : 'getTags',
            isTagPage ? name : null,
            draft => {
              if (isTagPage) {
                const userIndex = draft.followers.indexOf(userId);
                action === 'follow'
                  ? draft.followers.push(userId)
                  : draft.followers.splice(userIndex, 1);
              } else {
                const foundTag = draft.find(tag => tag.id === tagId);
                const userIndex = foundTag.followers.indexOf(userId);
                action === 'follow'
                  ? foundTag.followers.push(userId)
                  : foundTag.followers.splice(userIndex, 1);
              }
            }
          )
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
  useLazyGetFollowingTagsQuery,
  useGetTagByNameQuery,
  useHandleFollowMutation,
} = tagsApiSlice;

export default tagsApiSlice;
