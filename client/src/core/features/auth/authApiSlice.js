import apiSlice from '../api/apiSlice';

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    signUp: builder.mutation({
      query: userCredentials => ({
        url: '/register',
        method: 'POST',
        body: { ...userCredentials },
      }),
      invalidatesTags: ['User'],
    }),
    login: builder.mutation({
      query: userCredentials => ({
        url: '/auth',
        method: 'POST',
        body: { ...userCredentials },
      }),
      invalidatesTags: ['User'],
    }),
    logout: builder.query({
      query: () => '/logout',
      providesTags: ['User'],
    }),
  }),
});

export const { useSignUpMutation, useLoginMutation, useLogoutQuery } = authApiSlice;
