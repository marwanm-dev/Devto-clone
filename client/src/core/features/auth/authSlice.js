import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: {},
    token: null,
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
      };
      state.token = token;
    },
    logout: (state, action) => {},
  },
  extraReducers: {},
});

export const { setCredentials, logout } = authSlice.actions;

export const selectCurrentUser = state => state.auth.currentUser;
export const selectCurrentToken = state => state.auth.token;

export default authSlice.reducer;
