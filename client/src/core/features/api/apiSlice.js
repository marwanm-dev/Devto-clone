import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { persistor } from '../../store';
import { logout, setAuthModal, setToken } from '../auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) headers.set('authorization', `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 403) {
    // sends refresh token to get new access token
    const refreshResult = await baseQuery('/refresh', api, extraOptions);
    // stores the new token
    if (refreshResult?.data) {
      api.dispatch(setToken(refreshResult.data));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Logging out
      // 1- deleting refresh token from cookies
      // 2- resetting redux state
      // 3- resetting redux persist
      await baseQuery('/logout', api, extraOptions);
      api.dispatch(logout());
      persistor.purge();

      api.dispatch(setAuthModal(true));
    }
  }

  return result;
};

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({}),
  tagTypes: ['User', 'Post', 'Comment', 'Tag', 'Notification'],
  keepUnusedDataFor: 5,
});

export default apiSlice;
