import apiSlice from '../api/apiSlice';
import { setToken, setExpirationDate, setRegisteredCredentials } from './authSlice';
import { persistor } from '../../store';

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    logout: builder.query({
      query: () => ({
        url: '/logout',
        credentials: 'include',
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(setRegisteredCredentials());
        persistor.purge();
      },
    }),
    refresh: builder.query({
      query: () => ({
        url: '/refresh',
        credentials: 'include',
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const result = await queryFulfilled;
        const data = await result.data;
        dispatch(setToken(data?.accessToken));
        dispatch(setExpirationDate(data?.expirationDate));
      },
    }),
    signUp: builder.mutation({
      query: userCredentials => ({
        url: '/register',
        method: 'POST',
        body: { ...userCredentials },
      }),
    }),
    login: builder.mutation({
      query: userCredentials => ({
        url: '/auth',
        method: 'POST',
        body: { ...userCredentials },
        credentials: 'include',
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useLazyLogoutQuery, useLazyRefreshQuery, useSignUpMutation, useLoginMutation } =
  authApiSlice;
