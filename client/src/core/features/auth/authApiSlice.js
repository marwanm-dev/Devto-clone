import storage from 'redux-persist/lib/storage';
import apiSlice from '../api/apiSlice';
import {
  setToken,
  setExpirationDate,
  setUpdatedCredentials,
  setRegisteredCredentials,
} from './authSlice';

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    signUp: builder.mutation({
      query: userCredentials => ({
        url: '/register',
        method: 'POST',
        body: { ...userCredentials },
      }),
      invalidatesTags: ['Auth'],
    }),
    login: builder.mutation({
      query: userCredentials => ({
        url: '/auth',
        method: 'POST',
        body: { ...userCredentials },
        credentials: 'include',
      }),
      invalidatesTags: ['Auth'],
    }),
    logout: builder.query({
      query: () => ({
        url: '/logout',
        credentials: 'include',
      }),
      providesTags: ['Auth'],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(setRegisteredCredentials());
        storage.removeItem('persist:root');
      },
    }),
    refresh: builder.query({
      query: () => ({
        url: '/refresh',
        credentials: 'include',
      }),
      providesTags: ['Auth'],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const result = await queryFulfilled;
        const data = await result.data;
        dispatch(setToken(data?.accessToken));
        dispatch(setExpirationDate(data?.expirationDate));
      },
    }),
    updateUser: builder.mutation({
      query: info => ({
        url: `/users/${info.id}/edit`,
        method: 'PATCH',
        body: { ...info },
      }),
      invalidatesTags: ['Auth'],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const result = await queryFulfilled;
        const data = await result.data;
        const { username, picture, bio, location, education, work, availableFor, skills } = data;
        dispatch(
          setUpdatedCredentials({
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

export const {
  useSignUpMutation,
  useLoginMutation,
  useLazyLogoutQuery,
  useLazyRefreshQuery,
  useUpdateUserMutation,
} = authApiSlice;
