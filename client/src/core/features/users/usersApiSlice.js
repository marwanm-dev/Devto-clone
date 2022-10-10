import { createPostUrl, getPostParams } from '../../../helpers/string';
import apiSlice from '../api/apiSlice';
import { setCredentials } from '../auth/authSlice';
import postsApiSlice from '../posts/postsApiSlice';

const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/users',
            providesTags: (result, err, args) =>
                result
                    ? [
                          { type: 'User', id: 'LIST' },
                          ...result.map(({ id }) => ({ type: 'User', id })),
                      ]
                    : [{ type: 'User', id: 'LIST' }],
        }),
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
        getNotifications: builder.query({
            query: id => `/users/${id}/notifications`,
        }),
        getUnreadNotifications: builder.query({
            query: id => `/users/${id}/notifications/unread`,
        }),
        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: `/users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, err, { id }) => [{ type: 'User', id }],
        }),
        updateUser: builder.mutation({
            query: body => ({
                url: `/users/${body.id}`,
                body,
                method: 'PATCH',
            }),
            invalidatesTags: (result, err, { id }) => [{ type: 'User', id }],
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                const { data: updatedUser } = await queryFulfilled;
                dispatch(setCredentials(body));
                const { username } = body;
                dispatch(
                    usersApiSlice.util.updateQueryData('getUser', username, draftUser => {
                        Object.assign(draftUser, updatedUser);
                    })
                );
            },
        }),
        handleUserFollow: builder.mutation({
            query: ({ previewedId, currentId, action }) => ({
                url: `/users/${previewedId}/${action}`,
                body: { currentId },
                method: 'PATCH',
            }),
            invalidatesTags: (result, err, { previewedId, post }) => [
                { type: post ? 'Post' : 'User', id: post ? post.id : previewedId },
            ],
            async onQueryStarted(
                { previewedUsername, currentId, action, post },
                { dispatch, queryFulfilled }
            ) {
                const username = previewedUsername;
                const { encodedTitle, encodedId } = getPostParams(`${post.title}-${post.id}`);
                const postUrl = createPostUrl(encodedTitle, encodedId);
                const patchResult = dispatch(
                    post
                        ? postsApiSlice.util.updateQueryData(
                              'getPost',
                              {
                                  url: `${username}/${postUrl}`,
                              },
                              draftPost => {
                                  const currentUserIndex =
                                      draftPost.author.followers.indexOf(currentId);
                                  action === 'follow'
                                      ? draftPost.author.followers.push(currentId)
                                      : draftPost.author.followers.splice(currentUserIndex, 1);
                              }
                          )
                        : usersApiSlice.util.updateQueryData('getUser', username, draftUser => {
                              const currentUserIndex = draftUser.followers.indexOf(currentId);
                              action === 'follow'
                                  ? draftUser.followers.push(currentId)
                                  : draftUser.followers.splice(currentUserIndex, 1);
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
    useGetUsersQuery,
    useGetUserQuery,
    useGetUserDashboardQuery,
    useGetNotificationsQuery,
    useLazyGetUnreadNotificationsQuery,
    useDeleteUserMutation,
    useUpdateUserMutation,
    useHandleUserFollowMutation,
} = usersApiSlice;

export default usersApiSlice;
