import { FC, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendariumTheme } from '../types/CalendariumTheme.ts';
import { Tab, TabContent } from '../types/AuthenticationTypes.ts';
import { AuthenticationHelper } from '../components/authentication/AuthenticationHelper.tsx';
import { AuthenticationForm } from '../components/authentication/AuthenticationForm.tsx';

type AuthenticatePageProps = {
	[key: string]: unknown;
};

const StyledAuthenticatePage = styled('div')`
	display: flex;
	justify-content: center;
	align-items: center;
	padding-top: 5rem;

	& main {
		display: flex;
		flex-direction: column;
		gap: 8px;
		width: 25rem;

		min-height: 550px;
		justify-content: center;

		& > ul {
			display: flex;

			grid-column: 1/2;

			& > li {
				flex: 1;
				cursor: pointer;
				display: flex;
				flex-direction: column;
				background: ${(props) => (props.theme as CalendariumTheme).layers[0].button?.focused?.fillColor};
				transition: background-color 200ms;

				&.active {
					background: ${(props) => (props.theme as CalendariumTheme).layers[0].button?.focused?.fillColor};
				}

				&:hover {
					background: ${(props) => (props.theme as CalendariumTheme).layers[0].button?.hovered?.fillColor};
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
					background: ${(props) => (props.theme as CalendariumTheme).layers[0].button?.default.fillColor};
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
const containsSpecialCharacter = (input: string) => /[@$!%*?&]/.test(input);
const isMinimumLength = (input: string) => input.length >= 8;
const matchWithPreviousPassword = (input: string, formValues: TabContent[]) => {
	const passwordInput = formValues?.find((item) => item.key === 'passwordInput');
	return passwordInput ? passwordInput.value === input : false;
};
const isValidEmail = (input: string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input);

export const AuthenticationPage: FC<AuthenticatePageProps> = ({ ...props }) => {
	const [activeTab, setActiveTab] = useState(0);

	const [tabs, setTabs] = useState([
		{
			label: 'Login',
			content: [
				{
					type: 'text',
					placeholder: 'User ID',
					key: 'userIdInput',
					isFocused: false,
					description: 'Enter your user-id.',
					value: '',
					rules: [],
				},
				{
					type: 'password',
					placeholder: 'Password',
					key: 'passwordInput',
					isFocused: false,
					description: 'Enter your password.',
					value: '',
				},
				{
					type: 'submit',
					placeholder: 'Submit',
					key: 'submitInput',
					isFocused: false,
					description: '',
					value: '',
				},
			],
		},
		{
			label: 'Register',
			content: [
				{
					type: 'text',
					placeholder: 'Display Name',
					key: 'displayNameInput',
					isFocused: false,
					description: 'Enter your desired display name:',
					value: '',
					rules: [
						{
							description: 'Must start with a letter.',
							checkFunction: (input) => /^[a-zA-z].*$/.test(input),
						},
					],
				},
				{
					type: 'text',
					placeholder: 'User ID',
					key: 'userIdInput',
					isFocused: false,
					description: 'Enter your user ID:',
					value: '',
					rules: [
						{
							description: 'Must begin with a lowercase letter.',
							checkFunction: (input) => mustBeginWithLowerCase(input),
						},
						{
							description: 'Can contain lowercase letters, numbers, underscores, and hyphens.',
							checkFunction: (input) => canContainLettersNumbersUnderscoresHyphens(input),
						},
						{
							description: 'Must be at least 3 characters and not exceed 30 characters in length.',
							checkFunction: (input) => isValidLength(input),
						},
					],
				},
				{
					type: 'email',
					placeholder: 'Email',
					key: 'emailInput',
					isFocused: false,
					description: 'Enter your email:',
					value: '',
					rules: [
						{
							description: 'Must be a valid email.',
							checkFunction: (input) => isValidEmail(input),
						},
					],
				},
				{
					type: 'password',
					placeholder: 'Password',
					key: 'passwordInput',
					isFocused: false,
					description: 'Enter your password:',
					value: '',
					rules: [
						{
							description: 'Must contain at least one lowercase letter.',
							checkFunction: (input) => containsLowerCase(input),
						},
						{
							description: 'Must contain at least one uppercase letter.',
							checkFunction: (input) => containsUpperCase(input),
						},
						{
							description: 'Must contain at least one digit.',
							checkFunction: (input) => containsDigit(input),
						},
						{
							description: 'Must contain at least one special character (@, $, !, %, *, ?, &).',
							checkFunction: (input) => containsSpecialCharacter(input),
						},
						{
							description: 'Must be at least 8 characters in length.',
							checkFunction: (input) => isMinimumLength(input),
						},
					],
				},
				{
					type: 'password',
					placeholder: 'Confirm Password',
					key: 'confirmPasswordInput',
					isFocused: false,
					description: 'Please confirm your password:',
					value: '',
					rules: [
						{
							description: 'Must not be empty.',
							checkFunction: (input) => !!input,
						},
						{
							description: 'Must match with previous password.',
							checkFunction: (input, formValues): boolean =>
								matchWithPreviousPassword(input, formValues!),
						},
					],
				},
				{
					type: 'submit',
					placeholder: 'Submit',
					key: 'submitInput',
					isFocused: false,
					description: '',
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
				  }
		);
		setTabs(newTabs);
	};

	const currentFocusedInputField = useMemo(
		() => tabs[activeTab].content.find((currentItem) => currentItem.isFocused),
		[activeTab, tabs]
	);

	return (
		<StyledAuthenticatePage {...props}>
			<main>
				<ul>
					<AnimatePresence mode="popLayout">
						{tabs.map((item, index) => (
							<motion.li
								className={activeTab === index ? 'active' : ''}
								layoutId={item.label}
								initial={{
									y: -100,
								}}
								animate={{
									y: 0,
									transition: {
										delay: index * 0.1,
										type: 'spring',
										duration: 1,
										stiffness: 120,
										damping: 14,
									},
								}}
								exit={{
									y: -100,
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
		</StyledAuthenticatePage>
	);
};
