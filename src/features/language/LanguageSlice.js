import {  createSlice } from '@reduxjs/toolkit';

const initialState = {
  language:localStorage.getItem('language'),
  default: 'TR',
  languages:["TR","EN"]
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


export default languageSlice.reducer;
