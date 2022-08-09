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
    setPlaceholder: (state, action) => {
      state.placeholder = action.payload;
    },
    resetPlaceholder: (state, action) => {
      state.placeholder = initialState.placeholder;
    },
  },
});
export const { setSearchValue, resetValue, setPlaceholder, resetPlaceholder } = searchSlice.actions;

export const selectSearchValue = state => state.search.value;

export const selectPlaceholder = state => state.search.placeholder;

export default searchSlice.reducer;
