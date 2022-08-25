import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: {},
  token: null,
  authModal: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        ...action.payload,
      };
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setAuthModal: (state, action) => {
      state.authModal = action.payload;
    },
    logout: (state, action) => {
      state.currentUser = {};
      state.token = null;
      state.authModal = false;
    },
  },
});

export const { setCredentials, setToken, setAuthModal, logout } = authSlice.actions;

export const selectCurrentUser = state => state.auth.currentUser;
export const selectCurrentToken = state => state.auth.token;
export const selectAuthModal = state => state.auth.authModal;

export default authSlice.reducer;
