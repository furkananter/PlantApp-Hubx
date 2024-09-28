import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeMode, ThemeState } from '@/types/type';

const initialState: ThemeState = {
  mode: 'light',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
      AsyncStorage.setItem('themeMode', action.payload);
    },
  },
});
export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
