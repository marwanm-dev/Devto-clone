import apiSlice from '../api/apiSlice';
import { setUpdatedCredentials } from '../auth/authSlice';

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
      query: info => ({
        url: `/users/${info.id}`,
        method: 'PATCH',
        body: { ...info },
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const result = await queryFulfilled;
        const data = await result.data;
        const { name, username, picture, bio, location, education, work, availableFor, skills } =
          data;
        dispatch(
          setUpdatedCredentials({
            name,
            username,
            picture,
            bio,
            location,
            education,
            work,
            availableFor,
            skills,
          })
        );
      },
    }),
  }),
  overrideExisting: true,
});

export const { useGetUserQuery, useDeleteUserMutation, useUpdateUserMutation } = usersApiSlice;
