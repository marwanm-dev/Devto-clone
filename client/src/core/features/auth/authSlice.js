import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: {},
    token: null,
    expirationDate: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { username, picture, email, bio, location, joinDate, education, work, token } =
        action.payload;
      state.currentUser = {
        username,
        picture,
        email,
        bio,
        location,
        joinDate,
        education,
        work,
        expirationDate: Date.now() + 1000 * 15, // 15 secs
      };
      state.token = token;
    },
    logout: (state, action) => {},
  },
  extraReducers: {},
});

export const { setCredentials, refreshToken, logout } = authSlice.actions;

export const selectCurrentUser = state => state.auth.currentUser;
export const selectCurrentToken = state => state.auth.token;
export const selectTokenExpiration = state => state.auth.currentUser.expirationDate;

export default authSlice.reducer;
