import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchState } from '@/types/type';

const initialState: SearchState = {
  query: '',
  results: [],
  isFocused: false,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setResults: (state, action: PayloadAction<string[]>) => {
      state.results = action.payload;
    },
    clearResults: (state) => {
      state.results = [];
    },
    setIsFocused: (state, action: PayloadAction<boolean>) => {
      state.isFocused = action.payload;
    },
  },
});

export const { setQuery, setResults, clearResults, setIsFocused } =
  searchSlice.actions;

export default searchSlice.reducer;
