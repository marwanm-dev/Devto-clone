import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const postsSlice = createSlice({
  name: 'posts',
  initialState: {},
  reducers: {
    reducer: (state, action) => {},
  },
});

export const selectCurrentPost = state => state.currentPost;

export const { reducer } = postsSlice.actions;

export default postsSlice.reducer;
