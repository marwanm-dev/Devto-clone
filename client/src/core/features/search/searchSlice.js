import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    value: '',
    placeholder: 'Search..',
  },
  reducers: {
    setSearchValue: (state, action) => {
      state.value = action.payload;
    },
    reset: (state, action) => {
      state.value = '';
    },
    setPlaceholder: (state, action) => {
      state.placeholder = action.payload;
    },
  },
});
export const { setSearchValue, setPlaceholder, reset } = searchSlice.actions;

export const selectSearchValue = state => state.search.value;
export const selectPlaceholder = state => state.search.placeholder;

export default searchSlice.reducer;
