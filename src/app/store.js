import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/theme/ThemeSlice';
import languageReducer from '../features/language/LanguageSlice';
export const store = configureStore({
  reducer: {
    theme:themeReducer,
    language:languageReducer
  },
});
