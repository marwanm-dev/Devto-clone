import { createSlice } from '@reduxjs/toolkit';

const postsSlice = createSlice({
  name: 'posts',
  initialState: [{ title: 'Post title', body: 'lorem100' }],
  reducers: {
    reducer: (state, action) => {},
  },
});

export const { reducer } = postsSlice.actions;

export default postsSlice.reducer;
