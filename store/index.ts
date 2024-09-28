import { configureStore } from '@reduxjs/toolkit';
// import themeReducer from './slices/themeSlice';
import searchReducer from './slices/searchSlice';
import questionsReducer from './slices/questionSlice';
import categoriesReducer from './slices/categoriesSlice';

export const store = configureStore({
  reducer: {
    // If we want to use the theme, we need to uncomment this
    // theme: themeReducer,
    search: searchReducer,
    questions: questionsReducer,
    categories: categoriesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
