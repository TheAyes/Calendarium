import { Tab } from '../../types/AuthenticationTypes';
import { translations } from '../localization/translations';
import { SupportedLanguages } from '../../types/Translation';

import { specialPasswordCharacters } from './specialPasswordCharacters';

export const getTabs = (language: SupportedLanguages = 'en'): Tab[] => [
	{
		label: translations[language || 'en' || 'en'].login.label,
		content: [
			{
				type: 'text',
				placeholder: translations[language || 'en'].login.content.userId.placeholder,
				key: 'userIdInput',
				isFocused: false,
				description: translations[language || 'en'].login.content.userId.description,
				value: '',
				rules: [
					/*
					{
						description: translations[language || 'en'].register.content.userId.rules?.[0].description,
						checkFunction: 'mustBeginWithLowerCase'
					},
					{
						description: translations[language || 'en'].register.content.userId.rules?.[1].description,
						checkFunction: 'canContainLettersNumbersUnderscoresHyphens'
					}
					*/
				]
			},
			{
				type: 'password',
				placeholder: translations[language || 'en'].login.content.password.placeholder,
				key: 'passwordInput',
				isFocused: false,
				description: translations[language || 'en'].login.content.password.description,
				value: ''
			},
			{
				type: 'submit',
				placeholder: translations[language || 'en'].login.content.submit.placeholder,
				key: 'submitInput',
				isFocused: false,
				description: translations[language || 'en'].login.content.submit.description,
				value: ''
			}
		]
	},
	{
		label: translations[language || 'en'].register.label,
		content: [
			{
				type: 'text',
				placeholder: translations[language || 'en'].register.content.displayName.placeholder,
				key: 'displayNameInput',
				isFocused: false,
				description: translations[language || 'en'].register.content.displayName.description,
				value: '',
				rules: [
					{
						description: translations[language || 'en'].register.content.displayName.rules?.[0].description,
						checkFunction: 'mustBeginWithLetter'
					}
				]
			},
			{
				type: 'text',
				placeholder: translations[language || 'en'].register.content.userId.placeholder,
				key: 'userIdInput',
				isFocused: false,
				description: translations[language || 'en'].register.content.userId.description,
				value: '',
				rules: [
					{
						description: translations[language || 'en'].register.content.userId.rules?.[0].description,
						checkFunction: 'mustBeginWithLowerCase'
					},
					{
						description: translations[language || 'en'].register.content.userId.rules?.[1].description,
						checkFunction: 'canContainLettersNumbersUnderscoresHyphens'
					},
					{
						description: translations[language || 'en'].register.content.userId.rules?.[2].description,
						checkFunction: 'isValidLength'
					}
				]
			},
			{
				type: 'email',
				placeholder: translations[language || 'en'].register.content.email.placeholder,
				key: 'emailInput',
				isFocused: false,
				description: translations[language || 'en'].register.content.email.description,
				value: '',
				rules: [
					{
						description: translations[language || 'en'].register.content.email.rules?.[0].description,
						checkFunction: 'isValidEmail'
					}
				]
			},
			{
				type: 'password',
				placeholder: translations[language || 'en'].register.content.password.placeholder,
				key: 'passwordInput',
				isFocused: false,
				description: translations[language || 'en'].register.content.password.description,
				value: '',
				rules: [
					{
						description: translations[language || 'en'].register.content.password.rules?.[0].description,
						checkFunction: 'containsLowerCase'
					},
					{
						description: translations[language || 'en'].register.content.password.rules?.[1].description,
						checkFunction: 'containsUpperCase'
					},
					{
						description: translations[language || 'en'].register.content.password.rules?.[2].description,
						checkFunction: 'containsDigit'
					},
					{
						description: translations[language || 'en'].register.content.password.rules?.[3].description,
						checkFunction: 'containsSpecialCharacter',
						additionalData: specialPasswordCharacters
					},
					{
						description: translations[language || 'en'].register.content.password.rules?.[4].description,
						checkFunction: 'isMinimumLength'
					}
				]
			},
			{
				type: 'password',
				placeholder: translations[language || 'en'].register.content.confirmPassword.placeholder,
				key: 'confirmPasswordInput',
				isFocused: false,
				description: translations[language || 'en'].register.content.confirmPassword.description,
				value: '',
				rules: [
					{
						description:
							translations[language || 'en'].register.content.confirmPassword.rules?.[0].description,
						checkFunction: 'mustNotBeEmpty'
					},
					{
						description:
							translations[language || 'en'].register.content.confirmPassword.rules?.[1].description,
						checkFunction: 'matchWithPreviousPassword'
					}
				]
			},
			{
				type: 'submit',
				placeholder: translations[language || 'en'].register.content.submit.placeholder,
				key: 'submitInput',
				isFocused: false,
				description: translations[language || 'en'].register.content.submit.description,
				value: ''
			}
		]
	}
];
