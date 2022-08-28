import { createPostUrl } from '../../../helpers/string';
import apiSlice from '../api/apiSlice';
import { setCredentials } from '../auth/authSlice';
import postsApiSlice from '../posts/postsApiSlice';

const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query({
      query: username => `/users/${username}`,
      providesTags: (result, err, args) =>
        result ? [{ type: 'User', id: result.id }] : [{ type: 'User', id: 'LIST' }],
    }),
    getUserDashboard: builder.query({
      query: username => `/users/dash/${username}`,
      providesTags: (result, err, args) =>
        result ? [{ type: 'User', id: result.id }] : [{ type: 'User', id: 'LIST' }],
    }),
    getAllNotifications: builder.query({
      query: id => `/users/${id}/notifications`,
    }),
    getUnreadNotifs: builder.query({
      query: id => `/users/${id}/notifications/unread`,
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
      invalidatesTags: (result, err, { previewedId, post }) => [
        { type: post ? 'Post' : 'User', id: post ? post.id : previewedId },
      ],
      async onQueryStarted({ previewedUsername, post, ...patch }, { dispatch, queryFulfilled }) {
        const username = previewedUsername;
        const patchResult = dispatch(
          post
            ? postsApiSlice.util.updateQueryData(
                'getPost',
                {
                  url: `${previewedUsername}/${createPostUrl(post.title, post.id)}`,
                },
                draftPost => {
                  Object.assign(draftPost, patch);
                }
              )
            : usersApiSlice.util.updateQueryData('getUser', username, draftUser => {
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
  useGetUserDashboardQuery,
  useGetAllNotificationsQuery,
  useGetUnreadNotifsQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useHandleUserFollowMutation,
} = usersApiSlice;
