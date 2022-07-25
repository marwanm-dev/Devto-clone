import apiSlice from '../api/apiSlice';
import { setCredentials } from '../auth/authSlice';

const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query({
      query: username => `/users/${username}`,
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
    }),
    updateUser: builder.mutation({
      query: body => ({
        url: `/users/${body.id}`,
        body,
        method: 'PATCH',
      }),
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(setCredentials(body));
      },
    }),
  }),
  overrideExisting: true,
});

export const { useGetUserQuery, useDeleteUserMutation, useUpdateUserMutation } = usersApiSlice;
