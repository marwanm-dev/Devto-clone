import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: '',
  placeholder: 'Search..',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.value = action.payload;
    },
    resetValue: (state, action) => {
      state.value = initialState.value;
    },
  },
});
export const { setSearchValue, resetValue } = searchSlice.actions;

export const selectSearchValue = state => state.search.value;

export default searchSlice.reducer;
