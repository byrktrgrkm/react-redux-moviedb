import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/theme/ThemeSlice';
import languageReducer from '../features/language/LanguageSlice';
import bookmarkReducer from '../features/BookmarkSlice';
export const store = configureStore({
  reducer: {
    theme:themeReducer,
    language:languageReducer,
    bookmark:bookmarkReducer,
  },
});
