import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  socket: {},
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
  },
});

export const { setSocket } = socketSlice.actions;

export const selectSocket = state => state.socket.socket;

export default socketSlice.reducer;
