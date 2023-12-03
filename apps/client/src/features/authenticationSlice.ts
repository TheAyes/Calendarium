import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { Tab } from '../types/AuthenticationTypes';
import { getTabs } from '../constants/authentication/tabs';

type AuthenticationState = {
	activeTab: number;
	tabs: Tab[];
	errorMessage: string;
};

export const authenticationSlice = createSlice({
	name: 'authentication',
	initialState: { activeTab: 0, tabs: getTabs('en'), errorMessage: '' } as AuthenticationState,
	reducers: {
		setActiveTab: (state: AuthenticationState, action: PayloadAction<number>) => {
			state.activeTab = action.payload;
		},

		setErrorMessage: (state: AuthenticationState, action: PayloadAction<string>) => {
			state.errorMessage = action.payload;
		}
	}
});

export const { setActiveTab, setErrorMessage } = authenticationSlice.actions;
export const selectActiveTab = (state: RootState) => state.authentication.activeTab;
export const selectErrorMessage = (state: RootState) => state.authentication.errorMessage;
export default authenticationSlice.reducer;
