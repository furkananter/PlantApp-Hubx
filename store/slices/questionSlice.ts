import { QuestionsState } from '@/types/type';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

const initialState: QuestionsState = {
  items: [],
  loading: 'idle',
  error: null,
  hasMore: true,
};

export const fetchQuestions = createAsyncThunk(
  'questions/fetchQuestions',
  async ({ page, limit }: { page: number; limit: number }) => {
    try {
      const response = await axios.get(
        `https://dummy-api-jtg6bessta-ey.a.run.app/getQuestions?page=${page}&limit=${limit}`
      );

      if (response.data.length === 0) {
        return { items: [], hasMore: false };
      }
      return { items: response.data, hasMore: response.data.length === limit };
    } catch (error) {
      throw error;
    }
  }
);

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.items = action.payload.items;
        state.hasMore = action.payload.hasMore;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default questionsSlice.reducer;
