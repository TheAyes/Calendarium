import { FC, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { CalendariumTheme } from '../types/CalendariumTheme.ts';
import { Tab } from '../types/AuthenticationTypes.ts';
import { AuthenticationHelper } from '../components/authentication/AuthenticationHelper.tsx';
import { AuthenticationForm } from '../components/authentication/AuthenticationForm.tsx';
import { translations } from '../localization/translations.ts';
import { useCookies } from 'react-cookie';

type AuthenticatePageProps = {
	[key: string]: unknown;
};

const StyledAuthenticatePage = styled('div')`
	display: flex;
	justify-content: center;
	padding-top: 5rem;

	& main {
		display: flex;
		flex-direction: column;
		gap: 8px;
		width: 25rem;

		min-height: 550px;

		& > ul {
			display: flex;
			grid-column: 1/2;

			& > li {
				flex: 1;
				cursor: pointer;
				display: flex;
				flex-direction: column;
				background: ${(props) => (props.theme as CalendariumTheme).colors?.button?.focused?.fillColor};
				transition: background-color 200ms;

				&.active {
					background: ${(props) => (props.theme as CalendariumTheme).colors?.button?.focused?.fillColor};
				}

				&:hover {
					background: ${(props) => (props.theme as CalendariumTheme).colors?.button?.hovered?.fillColor};
				}

				& > P {
					padding: 0.5rem 0;
					text-align: center;
					user-select: none;
					font-weight: ${(props) => (props.theme as CalendariumTheme).typography?.h2?.fontWeight};
					flex: 1;
				}

				& > div {
					height: 4px;
					background: ${(props) => (props.theme as CalendariumTheme).colors?.button?.default.fillColor};
				}
			}
		}
	}
`;

const mustBeginWithLowerCase = (input: string) => /^[a-z].*$/.test(input);
const canContainLettersNumbersUnderscoresHyphens = (input: string) => /^[a-z0-9_-]*$/.test(input);
const isValidLength = (input: string) => input.length >= 3 && input.length <= 30;
const containsLowerCase = (input: string) => /[a-z]/.test(input);
const containsUpperCase = (input: string) => /[A-Z]/.test(input);
const containsDigit = (input: string) => /\d/.test(input);
const containsSpecialCharacter = (input: string) => /[@$!%*?&_+.,-]/.test(input);
const isMinimumLength = (input: string) => input.length >= 8;
const matchWithPreviousPassword = (input: string, targetId:string) => {
	const passwordInput = document.getElementById(targetId) as HTMLInputElement;
	//const passwordInput = formValues?.find((item) => item.key === 'passwordInput');
	return passwordInput ? passwordInput.value === input : false;
};
const isValidEmail = (input: string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input);
const specialPasswordCharacters = '[ @, $, !, %, *, ?, &, -, _, +, ., , ]';

export const AuthenticationPage: FC<AuthenticatePageProps> = ({ ...props }) => {
	const [activeTab, setActiveTab] = useState(0);
	const [cookies] = useCookies(['language']);

	const [tabs, setTabs] = useState([
		{
			label: translations[cookies.language || 'en' || 'en'].login.label,
			content: [
				{
					type: 'text',
					placeholder: translations[cookies.language || 'en'].login.content.userId.placeholder,
					key: 'userIdInput',
					isFocused: false,
					description: translations[cookies.language || 'en'].login.content.userId.description,
					value: '',
					rules: [
						{
							description:
								translations[cookies.language || 'en'].register.content.userId.rules?.[0].description,
							checkFunction: (input) => mustBeginWithLowerCase(input),
						},
						{
							description:
								translations[cookies.language || 'en'].register.content.userId.rules?.[1].description,
							checkFunction: (input) => canContainLettersNumbersUnderscoresHyphens(input),
						},
					],
				},
				{
					type: 'password',
					placeholder: translations[cookies.language || 'en'].login.content.password.placeholder,
					key: 'passwordInput',
					isFocused: false,
					description: translations[cookies.language || 'en'].login.content.password.description,
					value: '',
				},
				{
					type: 'submit',
					placeholder: translations[cookies.language || 'en'].login.content.submit.placeholder,
					key: 'submitInput',
					isFocused: false,
					description: translations[cookies.language || 'en'].login.content.submit.description,
					value: '',
				},
			],
		},
		{
			label: translations[cookies.language || 'en'].register.label,
			content: [
				{
					type: 'text',
					placeholder: translations[cookies.language || 'en'].register.content.displayName.placeholder,
					key: 'displayNameInput',
					isFocused: false,
					description: translations[cookies.language || 'en'].register.content.displayName.description,
					value: '',
					rules: [
						{
							description:
								translations[cookies.language || 'en'].register.content.displayName.rules?.[0]
									.description,
							checkFunction: (input) => /^[a-zA-z].*$/.test(input),
						},
					],
				},
				{
					type: 'text',
					placeholder: translations[cookies.language || 'en'].register.content.userId.placeholder,
					key: 'userIdInput',
					isFocused: false,
					description: translations[cookies.language || 'en'].register.content.userId.description,
					value: '',
					rules: [
						{
							description:
								translations[cookies.language || 'en'].register.content.userId.rules?.[0].description,
							checkFunction: (input) => mustBeginWithLowerCase(input),
						},
						{
							description:
								translations[cookies.language || 'en'].register.content.userId.rules?.[1].description,
							checkFunction: (input) => canContainLettersNumbersUnderscoresHyphens(input),
						},
						{
							description:
								translations[cookies.language || 'en'].register.content.userId.rules?.[2].description,
							checkFunction: (input) => isValidLength(input),
						},
					],
				},
				{
					type: 'email',
					placeholder: translations[cookies.language || 'en'].register.content.email.placeholder,
					key: 'emailInput',
					isFocused: false,
					description: translations[cookies.language || 'en'].register.content.email.description,
					value: '',
					rules: [
						{
							description:
								translations[cookies.language || 'en'].register.content.email.rules?.[0].description,
							checkFunction: (input) => isValidEmail(input),
						},
					],
				},
				{
					type: 'password',
					placeholder: translations[cookies.language || 'en'].register.content.password.placeholder,
					key: 'passwordInput',
					isFocused: false,
					description: translations[cookies.language || 'en'].register.content.password.description,
					value: '',
					rules: [
						{
							description:
								translations[cookies.language || 'en'].register.content.password.rules?.[0].description,
							checkFunction: (input) => containsLowerCase(input),
						},
						{
							description:
								translations[cookies.language || 'en'].register.content.password.rules?.[1].description,
							checkFunction: (input) => containsUpperCase(input),
						},
						{
							description:
								translations[cookies.language || 'en'].register.content.password.rules?.[2].description,
							checkFunction: (input) => containsDigit(input),
						},
						{
							description:
								translations[cookies.language || 'en'].register.content.password.rules?.[3].description,
							checkFunction: (input) => containsSpecialCharacter(input),
							additionalData: specialPasswordCharacters,
						},
						{
							description:
								translations[cookies.language || 'en'].register.content.password.rules?.[4].description,
							checkFunction: (input) => isMinimumLength(input),
						},
					],
				},
				{
					type: 'password',
					placeholder: translations[cookies.language || 'en'].register.content.confirmPassword.placeholder,
					key: 'confirmPasswordInput',
					isFocused: false,
					description: translations[cookies.language || 'en'].register.content.confirmPassword.description,
					value: '',
					rules: [
						{
							description:
								translations[cookies.language || 'en'].register.content.confirmPassword.rules?.[0]
									.description,
							checkFunction: (input) => !!input,
						},
						{
							description:
								translations[cookies.language || 'en'].register.content.confirmPassword.rules?.[1]
									.description,
							checkFunction: (input): boolean =>
								matchWithPreviousPassword(input, 'passwordInput'),
						},
					],
				},
				{
					type: 'submit',
					placeholder: translations[cookies.language || 'en'].register.content.submit.placeholder,
					key: 'submitInput',
					isFocused: false,
					description: translations[cookies.language || 'en'].register.content.submit.description,
					value: '',
				},
			],
		},
	] as Tab[]);

	const handleBlurAll = () => {
		const newTabs = tabs.map((tab, index) =>
			index !== activeTab
				? tab
				: {
						...tab,
						content: tab.content.map((item) => ({ ...item, isFocused: false })),
				  },
		);
		setTabs(newTabs);
	};

	const currentFocusedInputField = useMemo(
		() => tabs[activeTab].content.find((currentItem) => currentItem.isFocused),
		[activeTab, tabs],
	);

	return (
		<StyledAuthenticatePage {...props}>
			<LayoutGroup>
				<main>
					<ul>
						<AnimatePresence>
							{tabs.map((item, index) => (
								<motion.li
									className={activeTab === index ? 'active' : ''}
									layoutId={item.label}
									initial={{
										y: -100,
									}}
									animate={{
										y: 0,
									}}
									exit={{
										y: -100,
									}}
									transition={{
										delay: index * 0.1,
										type: 'spring',
										duration: 1,
										stiffness: 120,
										damping: 14,
									}}
									key={item.label}
									onClick={() => {
										handleBlurAll();
										setActiveTab(index);
									}}
								>
									<p>{item.label}</p>

									{activeTab === index && <motion.div layoutId="underline" />}
								</motion.li>
							))}
						</AnimatePresence>
					</ul>
					<AuthenticationForm tabs={tabs} activeTab={activeTab} setTabs={setTabs} />
				</main>

				<AuthenticationHelper
					tabs={tabs}
					activeTab={activeTab}
					currentFocusedInputField={currentFocusedInputField}
				/>
			</LayoutGroup>
		</StyledAuthenticatePage>
	);
};
