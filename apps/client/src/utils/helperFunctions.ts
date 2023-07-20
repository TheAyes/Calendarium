import { AxiosResponse } from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { AppState } from '../types/AppState.ts';

export const generateUserTokens = (
	response: AxiosResponse,
	setCookie: (name: 'refreshToken' | 'accessToken', value: any, options?: any | undefined) => void,
	setAppState: Dispatch<SetStateAction<AppState>>
) => {
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

	setAppState((prevState) => {
		return {
			...prevState,
			userState: {
				...prevState.userState,
				accessToken: response.data.accessToken,
				refreshToken: response.data.refreshToken,
			},
		};
	});
};
