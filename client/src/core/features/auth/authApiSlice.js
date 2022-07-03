import apiSlice from '../api/apiSlice';

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
        headers: { 'Content-Type': 'application/json' },
      }),
      invalidatesTags: ['Auth'],
    }),
    logout: builder.query({
      query: () => '/logout',
      providesTags: ['Auth'],
    }),
  }),
});

export const { useSignUpMutation, useLoginMutation, useLogoutQuery } = authApiSlice;
