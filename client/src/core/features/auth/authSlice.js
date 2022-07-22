import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: {},
    token: null,
  },
  reducers: {
    setRegisteredCredentials: (state, action) => {
      const {
        id,
        name,
        username,
        picture,
        email,
        bio,
        location,
        joinDate,
        education,
        work,
        availableFor,
        skills,
        token,
      } = action.payload;
      state.currentUser = {
        id,
        name,
        username,
        picture,
        email,
        bio,
        location,
        education,
        work,
        availableFor,
        skills,
        joinDate,
      };
      state.token = token;
    },
    setUpdatedCredentials: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state, action) => {
      state.currentUser = {};
      state.token = null;
    },
  },
});

export const { setRegisteredCredentials, setUpdatedCredentials, setToken, logout } =
  authSlice.actions;

export const selectCurrentAuthState = state => state.auth;
export const selectCurrentUser = state => state.auth.currentUser;
export const selectCurrentToken = state => state.auth.token;

export default authSlice.reducer;
