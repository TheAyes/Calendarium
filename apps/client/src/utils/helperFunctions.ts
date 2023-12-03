import { AxiosResponse } from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { AppState } from '../types/AppState';

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
		expires: refreshTokenExpiryDate
	});
	setCookie('accessToken', response.data.accessToken, {
		path: '/',
		expires: accessTokenExpiryDate
	});

	setAppState((prevState) => {
		return {
			...prevState,
			userState: {
				...prevState.userState,
				accessToken: response.data.accessToken,
				refreshToken: response.data.refreshToken
			}
		};
	});
};

export const checkFunctions = {
	mustNotBeEmpty: (input: string) => !!input,
	mustBeginWithLetter: (input: string) => /^[a-zA-Z].*$/.test(input),
	mustBeginWithLowerCase: (input: string) => /^[a-z].*$/.test(input),
	canContainLettersNumbersUnderscoresHyphens: (input: string) => /^[a-z0-9_-]*$/.test(input),
	isValidLength: (input: string) => input.length >= 3 && input.length <= 30,
	containsLowerCase: (input: string) => /[a-z]/.test(input),
	containsUpperCase: (input: string) => /[A-Z]/.test(input),
	containsDigit: (input: string) => /\d/.test(input),
	containsSpecialCharacter: (input: string) => /[@$!%*?&_+.,-]/.test(input),
	isMinimumLength: (input: string) => input.length >= 8,
	matchWithPreviousPassword: (input: string, compare: string): boolean => input === compare,
	isValidEmail: (input: string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input)
};
/*
export const mustBeginWithLowerCase = (input: string) => /^[a-z].*$/.test(input);
export const canContainLettersNumbersUnderscoresHyphens = (input: string) => /^[a-z0-9_-]*$/.test(input);
export const isValidLength = (input: string) => input.length >= 3 && input.length <= 30;
export const containsLowerCase = (input: string) => /[a-z]/.test(input);
export const containsUpperCase = (input: string) => /[A-Z]/.test(input);
export const containsDigit = (input: string) => /\d/.test(input);
export const containsSpecialCharacter = (input: string) => /[@$!%*?&_+.,-]/.test(input);
export const isMinimumLength = (input: string) => input.length >= 8;
export const matchWithPreviousPassword = (input: string, targetId: string) => {
	const passwordInput = document.getElementById(targetId) as HTMLInputElement;
	//const passwordInput = formValues?.find((item) => item.key === 'passwordInput');
	return passwordInput ? passwordInput.value === input : false;
};
export const isValidEmail = (input: string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input);
*/
