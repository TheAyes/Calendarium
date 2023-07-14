import { FC, FormEvent, useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendariumTheme } from '../types/CalendariumTheme.ts';

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

		& > form {
			grid-column: 1/2;

			display: flex;
			flex-direction: column;

			gap: ${(props) => (props.theme as CalendariumTheme).spacing(0.75)};

			& > div {
				display: flex;
				flex-direction: column;

				& > p {
					display: none;

					&:has(+ input:focus) {
						display: block;
					}
				}

				& > input {
					flex: 1;
					padding: 16px;
					color: ${(props) => (props.theme as CalendariumTheme).layers[0].text?.paragraphColor};
					font-weight: ${(props) => (props.theme as CalendariumTheme).typography?.h2?.fontWeight};
					position: relative;

					&[type='text'],
					&[type='password'],
					&[type='email'] {
						border-bottom: 2px solid
							${(props) =>
								(props.theme as CalendariumTheme).layers[0].formElements?.inputField?.default
									.borderColor};

						&:hover {
							border-bottom: 2px solid
								${(props) =>
									(props.theme as CalendariumTheme).layers[0].formElements?.inputField?.hovered
										?.borderColor};
						}

						&:focus {
							border-bottom: 2px solid
								${(props) =>
									(props.theme as CalendariumTheme).layers[0].formElements?.inputField?.focused
										?.borderColor};
						}
					}

					&[type='submit'] {
						border: 2px solid
							${(props) =>
								(props.theme as CalendariumTheme).layers[0].formElements?.inputField?.default
									.borderColor};

						&:hover {
							border: 2px solid
								${(props) =>
									(props.theme as CalendariumTheme).layers[0].formElements?.inputField?.hovered
										?.borderColor};
						}

						&:focus {
							border: 2px solid
								${(props) =>
									(props.theme as CalendariumTheme).layers[0].formElements?.inputField?.focused
										?.borderColor};
						}
					}

					&::placeholder {
						color: rgb(120, 120, 180);
					}
				}
			}
		}
	}

	& > aside {
		padding: 1rem;

		width: 240px;

		& > p {
			padding: 0.5rem 0;
		}

		& > ul {
			display: flex;
			flex-direction: column;
			gap: 8px;

			& > li {
				display: flex;
				align-items: center;

				& > span {
					padding: 1rem;
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

type FormRule = {
	description: string;
	checkFunction: (arg0: string, arg1?: TabContent[]) => boolean;
};
type TabContent = {
	type: string;
	placeholder?: string;
	key: string;
	isFocused: boolean;
	description?: string;
	value: string;
	rules?: FormRule[];
};
type Tab = { label: string; content: TabContent[] };

export const AuthenticatePage: FC<AuthenticatePageProps> = ({ ...props }) => {
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

	const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const userId = ((event.target as HTMLFormElement).elements[0] as HTMLInputElement).value;
		const password = ((event.target as HTMLFormElement).elements[1] as HTMLInputElement).value;

		console.table([userId, password]);
	};

	const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const displayName = ((event.target as HTMLFormElement).elements[0] as HTMLInputElement).value;
		const userId = ((event.target as HTMLFormElement).elements[1] as HTMLInputElement).value;
		const email = ((event.target as HTMLFormElement).elements[2] as HTMLInputElement).value;
		const password = ((event.target as HTMLFormElement).elements[3] as HTMLInputElement).value;
		const confirmPassword = ((event.target as HTMLFormElement).elements[4] as HTMLInputElement).value;

		console.table([displayName, userId, email, password, confirmPassword]);
	};

	const handleFocus = (key: string) => {
		const newTabs = tabs.map((tab, index) =>
			index !== activeTab
				? tab
				: {
						...tab,
						content: tab.content.map((item) => (item.key === key ? { ...item, isFocused: true } : item)),
				  }
		);
		setTabs(newTabs);
	};

	const handleBlur = (key: string) => {
		const newTabs = tabs.map((tab, index) =>
			index !== activeTab
				? tab
				: {
						...tab,
						content: tab.content.map((item) => (item.key === key ? { ...item, isFocused: false } : item)),
				  }
		);
		setTabs(newTabs);
	};

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

	const handleInput = useCallback(
		(key: string, value: string) => {
			let newTabs = [...tabs];
			newTabs = newTabs.map((tab, index) =>
				index !== activeTab
					? tab
					: {
							...tab,
							content: tab.content.map((item) => (item.key === key ? { ...item, value } : item)),
					  }
			);

			newTabs[activeTab].content.forEach((item) => {
				item.rules?.forEach((rule) => {
					rule.checkFunction(value, newTabs[activeTab].content);
				});
			});

			setTabs(newTabs);
		},
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
				<form onSubmit={[handleLogin, handleRegister][activeTab]}>
					<AnimatePresence mode="popLayout">
						{tabs[activeTab].content.map((currentItem, index) => {
							return (
								<motion.div
									key={currentItem.key}
									layout
									initial={{
										opacity: 0,
										x: 100,
									}}
									animate={{
										opacity: 1,
										x: 0,
										transition: {
											delay: index * 0.1 + 0.2,
										},
									}}
									exit={{
										opacity: 0,
										x: -100,
									}}
									transition={{
										type: 'spring',
										duration: 0.5,
										stiffness: 120,
										damping: 14,
									}}
								>
									<motion.input
										type={currentItem.type}
										placeholder={currentItem.placeholder}
										onFocus={() => handleFocus(currentItem.key)}
										onBlur={() => handleBlur(currentItem.key)}
										onChange={(event) => handleInput(currentItem.key, event.target.value)}
									/>
								</motion.div>
							);
						})}
					</AnimatePresence>
				</form>
			</main>
			<aside>
				<AnimatePresence mode="popLayout">
					{tabs[activeTab].content.find((currentItem) => currentItem.isFocused) && (
						<motion.p
							initial={{
								x: 50,
								opacity: 0,
							}}
							animate={{
								x: 0,
								opacity: 1,
							}}
							exit={{
								x: 50,
								opacity: 0,
							}}
							transition={{
								type: 'spring',
								duration: 0.5,
								stiffness: 120,
								damping: 14,
							}}
							key={tabs[activeTab].content.find((currentItem) => currentItem.isFocused)?.key + 'label'}
						>
							{tabs[activeTab].content.find((currentItem) => currentItem.isFocused)?.description}
						</motion.p>
					)}
				</AnimatePresence>
				<ul>
					<AnimatePresence mode="popLayout">
						{tabs[activeTab].content
							.find((currentItem) => currentItem.isFocused)
							?.rules?.map((currentRule, i) => {
								const currentInput = tabs[activeTab].content.find(
									(currentItem) => currentItem.isFocused
								);
								if (!currentInput) {
									return <></>;
								}
								return (
									<motion.li
										key={currentRule.description + i}
										initial={{
											x: 50,
											opacity: 0,
										}}
										animate={{
											x: 0,
											opacity: 1,
										}}
										exit={{
											x: 50,
											opacity: 0,
										}}
										transition={{
											type: 'spring',
											duration: 0.5,
											stiffness: 120,
											damping: 14,
											delay: i * 0.05,
										}}
									>
										<span>
											{currentRule.checkFunction(currentInput.value, tabs[activeTab].content)
												? '✔️'
												: '❌'}
										</span>
										<p>{currentRule.description}</p>
									</motion.li>
								);
							})}
					</AnimatePresence>
				</ul>
			</aside>
		</StyledAuthenticatePage>
	);
};