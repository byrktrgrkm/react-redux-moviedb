import {  createSlice } from '@reduxjs/toolkit';


import translationEN from "../../locales/en/translation.json"
import translationTR from "../../locales/tr/translation.json"

const initialState = {
  language:localStorage.getItem('language'),
  default: 'tr',
  languages:["tr","en"]
};

export const resources = {
  en: {
    translation: translationEN
  },
  tr: {
    translation: translationTR
  }
};

if(!initialState.language || !initialState.languages.includes(initialState.language) ) 
  initialState.language = initialState.default;

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    switchLanguage: (state,action) => {
       // içermiyorsa izin verme
       if(!state.languages.includes(action.payload)) return;

       localStorage.setItem('language',action.payload)
      state.theme = action.payload;
    },
  },
});

export const { switchLanguage } = languageSlice.actions;

export const selectLanguage = (state) => state.language.language;

export const languages = initialState.languages;

export const initial = initialState;


export default languageSlice.reducer;
