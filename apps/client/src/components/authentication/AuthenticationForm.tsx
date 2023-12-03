import {
	Dispatch,
	FC,
	FormEvent,
	KeyboardEvent,
	SetStateAction,
	useCallback,
	useContext,
	useEffect,
	useState
} from 'react';
import styled from '@emotion/styled';
import { css, useTheme } from '@emotion/react';
import { CalendariumTheme } from '../../types/CalendariumTheme';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthContext } from '../contextProviders/AuthenticationProvider';
import { useNavigate } from 'react-router-dom';
import { Tab } from '../../types/AuthenticationTypes';
import { selectActiveTab, selectErrorMessage, setErrorMessage } from '../../features/authenticationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { checkFunctions } from '../../utils/helperFunctions';

type StyledAuthenticationFormV2Props = {
	[key: string]: any;
};

const StyledAuthenticationForm = styled('form')<StyledAuthenticationFormV2Props>(() => {
	const theme = useTheme() as CalendariumTheme;
	return css`
      grid-column: 1/2;

      display: flex;
      flex-direction: column;

      gap: 1em;

      & > div {
        display: flex;
        border: 2px solid transparent;
        background: ${theme.backgroundColor.main};

        transition: background-color 200ms, color 200ms, border 200ms;

        border-bottom: 2px solid ${theme.primaryColor.main};

        &:hover {
          background: ${theme.backgroundColor.light};
          border-bottom: 2px solid ${theme.primaryColor.light};

          & > button > svg {
            fill: ${theme.primaryColor.light};
          }
        }


        &:not(.error):has(input:focus) {
          background: ${theme.primaryColor.dark}22;
          border-bottom: 2px solid ${theme.primaryColor.lighter};

          & > input::placeholder {
            color: inherit;
          }

          & > button > svg {
            fill: ${theme.primaryColor.lighter};
          }
        }

        & > input {
          flex: 1;
          padding: 16px;
          background: inherit;
          font-weight: ${theme.bodyTypography.fontWeight};
          position: relative;

          &:hover {
            background: inherit;
          }

          @keyframes shake {
            10%,
            90% {
              transform: translate3d(-2px, 0, 0);
            }

            20%,
            80% {
              transform: translate3d(2px, 0, 0);
            }

            30%,
            50%,
            70% {
              transform: translate3d(-4px, 0, 0);
            }

            40%,
            60% {
              transform: translate3d(4px, 0, 0);
            }
          }
        }

        &:has(input[type='submit']) {
          border: 2px solid ${theme.primaryColor.main};

          &:hover {
            border: 2px solid ${theme.primaryColor.light};
          }

          &:focus, &:active {
            color: 2px solid ${theme.secondaryColor.main};
            border: 2px solid ${theme.secondaryColor.main};
          }
        }

        & > button {
          background: inherit;
          border: none;
          padding: 0 1em;


          & > svg {
            width: 1.6em;
            display: block;
            transition: fill 500ms;
            fill: ${theme.primaryColor.main};
          }

          &:active > svg {
            fill: ${theme.secondaryColor.main};
          }
        }

        &.error {
          animation: shake 0.5s cubic-bezier(.36, .07, .19, .97) both;
          border: 2px solid ${theme.errorColor.main};
          color: ${theme.errorColor.main};

          & > input {
            color: inherit;

            &::placeholder {
              color: inherit;
            }
          }

          & > button > svg {
            fill: ${theme.errorColor.main};
          }
        }
      }
    }


    & > p {
      text-align: center;
      color: ${theme.errorColor.main};;
    }
	`;
});

type AuthenticationFormV2Props = {
	tabs: Tab[];
	setTabs: Dispatch<SetStateAction<Tab[]>>;
	activeTab: number;
	[key: string]: any;
};

export const AuthenticationForm: FC<AuthenticationFormV2Props> = ({ tabs, nullTab, setTabs, ...props }) => {
	const dispatch = useDispatch();

	const [validState, setValidState] = useState<Record<string, boolean>>({});
	const errorMessage = useSelector(selectErrorMessage);
	const [showPassword, setShowPassword] = useState(false);

	const activeTab = useSelector(selectActiveTab);

	const authFunctions = useContext(AuthContext);
	const navigate = useNavigate();

	const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const userId = ((event.target as HTMLFormElement).elements[0] as HTMLInputElement).value;
		const password = ((event.target as HTMLFormElement).elements[1] as HTMLInputElement).value;

		const invalidFields = validateUserInput();
		if (invalidFields.length > 0) {
			return;
		}

		const success: boolean = await authFunctions.loginUser(userId, password);

		if (success) navigate('/dashboard');
		else dispatch(setErrorMessage('Invalid login credentials.'));
	};

	const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const displayName = ((event.target as HTMLFormElement).elements[0] as HTMLInputElement).value;
		const userId = ((event.target as HTMLFormElement).elements[1] as HTMLInputElement).value;
		const email = ((event.target as HTMLFormElement).elements[2] as HTMLInputElement).value;
		const password = ((event.target as HTMLFormElement).elements[3] as HTMLInputElement).value;

		const invalidFields = validateUserInput();
		if (invalidFields.length > 0) {
			return;
		}

		const success: boolean = await authFunctions.registerUser(displayName, userId, email, password);
		if (success) navigate('/dashboard');
		else dispatch(setErrorMessage('Invalid Registration'));
	};

	const handleFocus = (key: string) => {
		const newTabs = tabs.map((tab, index) =>
			index !== activeTab
				? tab
				: {
						...tab,
						content: tab.content.map((item) => (item.key === key ? { ...item, isFocused: true } : item))
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
						content: tab.content.map((item) => (item.key === key ? { ...item, isFocused: false } : item))
				  }
		);
		setTabs(newTabs);
	};

	const validateUserInput = useCallback(
		(_key?: string, _value?: string, _activeTab?: number) => {
			const invalidFields: string[] = [];
			const validState = {};
			if (_key !== undefined && _value !== undefined) {
				if (_activeTab !== undefined) {
					// Validate only the relevant input field
					const contents = tabs[_activeTab].content;
					const item = contents.find((c) => c.key === _key);
					if (item?.rules) {
						item.rules.forEach((rule) => {
							// const isValid = rule.checkFunction(_value);
							const isValid = checkFunctions[rule.checkFunction];
							if (!isValid) invalidFields.push(_key);
						});
					}

					(validState as Record<string, boolean>)[_key] = !invalidFields.includes(_key);
				}
			} else {
				// Old code to validate all fields
				const contents = tabs[activeTab].content;
				contents.forEach((item) => {
					item.rules?.forEach((rule) => {
						const isValid = checkFunctions[rule.checkFunction];
						if (!isValid) invalidFields.push(item.key);
					});
				});

				contents.forEach((item) => {
					(validState as Record<string, boolean>)[item.key] = !invalidFields.includes(item.key);
				});
			}

			setValidState(validState);
			return invalidFields;
		},
		[tabs, activeTab]
	);

	const handleInput = useCallback(
		(key: string, value: string) => {
			setValidState({});

			let newTabs = [...tabs];
			newTabs = newTabs.map((tab, index) =>
				index !== activeTab
					? tab
					: {
							...tab,
							content: tab.content.map((item) => (item.key === key ? { ...item, value } : item))
					  }
			);

			newTabs[activeTab].content.forEach((item) => {
				item.rules?.forEach((rule) => {
					checkFunctions[rule.checkFunction];
				});
			});

			setTabs(newTabs);
		},
		[activeTab, tabs]
	);

	useEffect(() => {
		dispatch(setErrorMessage(''));
	}, [activeTab]);

	const handleMouseDown = () => {
		setShowPassword(true);
	};

	const handleMouseUp = () => {
		setShowPassword(false);
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
		if (event.key === 'Enter' || event.key === ' ') {
			setShowPassword(true);
		}
	};

	const handleKeyUp = (event: KeyboardEvent<HTMLButtonElement>) => {
		if (event.key === 'Enter' || event.key === ' ') {
			setShowPassword(false);
		}
	};

	const handleTouchStart = (): void => {
		setShowPassword(true);
	};

	const handleTouchEnd = (): void => {
		setShowPassword(false);
	};

	return (
		<StyledAuthenticationForm onSubmit={[handleLogin, handleRegister][activeTab]} {...props}>
			<AnimatePresence mode="popLayout">
				{tabs[activeTab].content.map((currentItem, index) => {
					return (
						<motion.div
							key={currentItem.key}
							layout
							initial={{
								opacity: 0,
								x: 100
							}}
							animate={{
								opacity: 1,
								x: 0
							}}
							exit={{
								opacity: 0,
								x: -100
							}}
							transition={{
								delay: index * 0.05,
								type: 'spring',
								duration: 1,
								stiffness: 120,
								damping: 14
							}}
							className={validState[currentItem.key] ?? false ? 'error' : ''}
						>
							<input
								id={currentItem.key}
								value={currentItem.type === 'submit' ? currentItem.placeholder : undefined}
								type={
									currentItem.type === 'password'
										? showPassword
											? 'text'
											: 'password'
										: currentItem.type
								}
								placeholder={currentItem.placeholder}
								onFocus={() => handleFocus(currentItem.key)}
								onBlur={() => {
									validateUserInput(currentItem.key, currentItem.value, activeTab);
									handleBlur(currentItem.key);
								}}
								onChange={(event) => {
									handleInput(currentItem.key, event.target.value);
								}}
							/>
							{currentItem.key === 'passwordInput' && (
								<button
									type="button"
									onMouseDown={handleMouseDown}
									onMouseUp={handleMouseUp}
									onKeyDown={handleKeyDown}
									onKeyUp={handleKeyUp}
									onTouchStart={handleTouchStart}
									onTouchEnd={handleTouchEnd}
									tabIndex={0}
									aria-label="Show Password"
								>
									{showPassword ? (
										<svg
											version="1.1"
											xmlns="http://www.w3.org/2000/svg"
											width="32"
											height="32"
											viewBox="0 0 32 32"
										>
											<title>eye</title>
											<path d="M16 6c-6.979 0-13.028 4.064-16 10 2.972 5.936 9.021 10 16 10s13.027-4.064 16-10c-2.972-5.936-9.021-10-16-10zM23.889 11.303c1.88 1.199 3.473 2.805 4.67 4.697-1.197 1.891-2.79 3.498-4.67 4.697-2.362 1.507-5.090 2.303-7.889 2.303s-5.527-0.796-7.889-2.303c-1.88-1.199-3.473-2.805-4.67-4.697 1.197-1.891 2.79-3.498 4.67-4.697 0.122-0.078 0.246-0.154 0.371-0.228-0.311 0.854-0.482 1.776-0.482 2.737 0 4.418 3.582 8 8 8s8-3.582 8-8c0-0.962-0.17-1.883-0.482-2.737 0.124 0.074 0.248 0.15 0.371 0.228v0zM16 13c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"></path>
										</svg>
									) : (
										<svg
											version="1.1"
											xmlns="http://www.w3.org/2000/svg"
											width="32"
											height="32"
											viewBox="0 0 32 32"
										>
											<title>eye-blocked</title>
											<path d="M29.561 0.439c-0.586-0.586-1.535-0.586-2.121 0l-6.318 6.318c-1.623-0.492-3.342-0.757-5.122-0.757-6.979 0-13.028 4.064-16 10 1.285 2.566 3.145 4.782 5.407 6.472l-4.968 4.968c-0.586 0.586-0.586 1.535 0 2.121 0.293 0.293 0.677 0.439 1.061 0.439s0.768-0.146 1.061-0.439l27-27c0.586-0.586 0.586-1.536 0-2.121zM13 10c1.32 0 2.44 0.853 2.841 2.037l-3.804 3.804c-1.184-0.401-2.037-1.521-2.037-2.841 0-1.657 1.343-3 3-3zM3.441 16c1.197-1.891 2.79-3.498 4.67-4.697 0.122-0.078 0.246-0.154 0.371-0.228-0.311 0.854-0.482 1.776-0.482 2.737 0 1.715 0.54 3.304 1.459 4.607l-1.904 1.904c-1.639-1.151-3.038-2.621-4.114-4.323z"></path>
											<path d="M24 13.813c0-0.849-0.133-1.667-0.378-2.434l-10.056 10.056c0.768 0.245 1.586 0.378 2.435 0.378 4.418 0 8-3.582 8-8z"></path>
											<path d="M25.938 9.062l-2.168 2.168c0.040 0.025 0.079 0.049 0.118 0.074 1.88 1.199 3.473 2.805 4.67 4.697-1.197 1.891-2.79 3.498-4.67 4.697-2.362 1.507-5.090 2.303-7.889 2.303-1.208 0-2.403-0.149-3.561-0.439l-2.403 2.403c1.866 0.671 3.873 1.036 5.964 1.036 6.978 0 13.027-4.064 16-10-1.407-2.81-3.504-5.2-6.062-6.938z"></path>
										</svg>
									)}
								</button>
							)}
						</motion.div>
					);
				})}
				{errorMessage && <motion.p>{errorMessage}</motion.p>}
			</AnimatePresence>
		</StyledAuthenticationForm>
	);
};

export default AuthenticationForm;
