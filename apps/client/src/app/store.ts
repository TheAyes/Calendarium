import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import languageReducer from '../features/languageSlice';
import authenticationReducer from '../features/authenticationSlice';

export const store = configureStore({
	reducer: {
		language: languageReducer,
		authentication: authenticationReducer
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
