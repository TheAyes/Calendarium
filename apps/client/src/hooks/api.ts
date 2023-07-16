import { useContext } from 'react';
import { AppContext } from '../App.tsx';
import axios, { AxiosResponse } from 'axios/index';
import { AppState } from '../types/AppState.ts';


const handleResponse = (response: AxiosResponse, appState: AppState, setCookie: (arg0: string, arg1: string, arg2: ) => {}) => {
	const refreshTokenExpiryDate = new Date();
	refreshTokenExpiryDate.setDate(refreshTokenExpiryDate.getDate() + 7);
	const accessTokenExpiryDate = new Date();
	accessTokenExpiryDate.setDate(accessTokenExpiryDate.getMinutes() + 10);
	setCookie('refreshToken', response.data.refreshToken, {
		path: '/',
		expires: refreshTokenExpiryDate,
	});
	setCookie('accessToken', response.data.accessToken, {
		path: '/',
		expires: accessTokenExpiryDate,
	});
	appState.set((prevState) => {
		return {
			...prevState,
			userState: {
				accessToken: response.data.accessToken,
				refreshToken: response.data.refreshToken,
			},
		};
	});
	console.table({
		status: response.status,
		accessToken: response.data.accessToken,
		refreshToken: response.data.refreshToken,
	});
};

const makeRequest = async (url: string, data: { [key: string]: any }, appState: AppState) => {
	return await axios.post(url, data, {
		headers: {
			language: appState.get.language,
		},
	});
};
export const useApi = () => {
	const appState = useContext(AppContext);
	return { handleResponse, makeRequest };
};
