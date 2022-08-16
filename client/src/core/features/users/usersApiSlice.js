import apiSlice from '../api/apiSlice';
import { setCredentials } from '../auth/authSlice';

const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query({
      query: username => `/users/${username}`,
      providesTags: (result, err, args) =>
        result ? [{ type: 'User', id: result._id }] : [{ type: 'User', id: 'LIST' }],
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, err, { id }) => [{ type: 'User', id }],
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            usersApiSlice.util.updateQueryData('getUser', result.username, draft => {
              Object.assign(draft, patch);
            })
          );
        } catch {
          dispatch(
            usersApiSlice.util.invalidateTags([
              { type: 'User', id },
              { type: 'User', id: 'LIST' },
            ])
          );
        }
      },
    }),
    updateUser: builder.mutation({
      query: body => ({
        url: `/users/${body.id}`,
        body,
        method: 'PATCH',
      }),
      invalidatesTags: (result, err, { id }) => [{ type: 'User', id }],
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        const { username } = body;
        const patchResult = dispatch(
          usersApiSlice.util.updateQueryData('getUser', username, draftUser => {
            Object.assign(draftUser, body);
          })
        );
        try {
          await queryFulfilled;
          dispatch(setCredentials(body));
        } catch {
          patchResult.undo();
        }
      },
    }),
    handleUserFollow: builder.mutation({
      query: ({ previewedId, action, currentId }) => ({
        url: `/users/${previewedId}/${action}`,
        body: { currentId },
        method: 'PATCH',
      }),
      invalidatesTags: (result, err, { previewedId }) => [{ type: 'User', id: previewedId }],
      async onQueryStarted({ previewedUsername, ...patch }, { dispatch, queryFulfilled }) {
        const username = previewedUsername;
        const patchResult = dispatch(
          usersApiSlice.util.updateQueryData('getUser', username, draftUser => {
            Object.assign(draftUser, patch);
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
  useGetUserQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useHandleUserFollowMutation,
} = usersApiSlice;
