import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: {},
    token: null,
    expirationDate: null,
  },
  reducers: {
    setRegisteredCredentials: (state, action) => {
      if (action.payload) {
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
          expirationDate,
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
        state.expirationDate = expirationDate;
        state.token = token;
      } else {
        state.currentUser = {};
        state.token = null;
        state.expirationDate = null;
      }
    },
    setUpdatedCredentials: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setExpirationDate: (state, action) => {
      state.expirationDate = action.payload;
    },
  },
});

export const { setRegisteredCredentials, setUpdatedCredentials, setToken, setExpirationDate } =
  authSlice.actions;

export const selectCurrentAuthState = state => state.auth;
export const selectCurrentUser = state => state.auth.currentUser;
export const selectCurrentToken = state => state.auth.token;
export const selectExpirationDate = state => state.auth.expirationDate;

export default authSlice.reducer;
