import { SupportedLanguages } from '../types/Translation';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export type LanguageState = SupportedLanguages;

export const languageSlice = createSlice({
	name: 'language',
	initialState: 'en' as LanguageState,
	reducers: {}
});
export const selectLanguage = (state: RootState) => state.language;
export default languageSlice.reducer;
