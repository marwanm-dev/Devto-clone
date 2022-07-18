import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//! Temporary using async thunk .. want to use rtk query
export const getPosts = createAsyncThunk('posts/getPosts', async () => {
  return fetch('http://localhost:5000/posts')
    .then(res => res.json())
    .then(json => json.sort((a, b) => (a.publishedDate > b.publishedDate ? -1 : 1)));
});

export const getPost = createAsyncThunk('posts/getPosts', async postUrl => {
  return fetch(`http://localhost:5000/posts/${postUrl}`)
    .then(res => res.json())
    .then(json => json);
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {},
  reducers: {
    reducer: (state, action) => {},
  },
  extraReducers: {
    [getPosts.fulfilled]: (state, { payload }) =>
      payload.sort((a, b) => {
        console.log(b.publishedDate - a.publishedDate);
        return b.publishedDate - a.publishedDate;
      }),
    [getPost.fulfilled]: (state, { payload }) => payload,
  },
});

export const selectCurrentPost = state => state.currentPost;

export const { reducer } = postsSlice.actions;

export default postsSlice.reducer;
