import { CategoriesState } from '@/types/type';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState: CategoriesState = {
  items: [],
  loading: 'idle',
  error: null,
  hasMore: true,
};

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async ({ page, limit }: { page: number; limit: number }) => {
    try {
      const response = await axios.get(
        `https://dummy-api-jtg6bessta-ey.a.run.app/getCategories?page=${page}&limit=${limit}`
      );

      if (response.data.data.length === 0) {
        return { items: [], hasMore: false };
      }

      return {
        items: response.data.data,
        hasMore: response.data.data.length === limit,
      };
    } catch (error) {
      throw error;
    }
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.items = action.payload.items;
        state.hasMore = action.payload.hasMore;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default categoriesSlice.reducer;
