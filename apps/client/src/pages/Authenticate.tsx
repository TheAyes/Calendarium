import { FC, FormEvent, useState } from 'react';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendariumTheme } from '../types/CalendariumTheme.ts';
import { AuthenticationInput } from '../components/authentication/AuthenticationInput.tsx';
import { Link } from 'react-router-dom';

type AuthenticatePageProps = {
	[key: string]: unknown;
};

const StyledAuthenticatePage = styled('div')`
	display: flex;
	justify-content: center;
	align-items: center;

	& main {
		display: flex;
		flex-direction: column;
		gap: 8px;
		width: 26rem;
		margin-top: 10rem;

		& > ul {
			display: flex;
			background: ${(props) => (props.theme as CalendariumTheme).layers[0].button?.focused?.fillColor};

			& > li {
				flex: 1;
				cursor: pointer;
				display: flex;
				flex-direction: column;

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
			display: flex;
			flex-direction: column;
			gap: ${(props) => (props.theme as CalendariumTheme).spacing(0.75)};
		}
	}
`;

export const AuthenticatePage: FC<AuthenticatePageProps> = ({ ...props }) => {
	const [activeTab, setActiveTab] = useState(0);

	const tabs = [
		{
			label: 'Login',
			content: (
				<>
					<AnimatePresence mode="sync">
						<AuthenticationInput
							key="usernameInput"
							layoutId="usernameInput"
							type="text"
							placeholder="User ID"
						/>
						<AuthenticationInput
							key="passwordInput"
							layoutId="passwordInput"
							type="password"
							placeholder="Password"
						/>
						<AuthenticationInput key="submit" layoutId="submit" type="submit" value="Submit" />
						<motion.div
							key="forgottenPassword"
							layoutId="forgottenPassword"
							initial={{ opacity: 0, x: 100 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -100 }}
						>
							<Link to="#">Forgot your password?</Link>
						</motion.div>
					</AnimatePresence>
				</>
			),
		},
		{
			label: 'Register',
			content: (
				<>
					<AnimatePresence presenceAffectsLayout>
						<AuthenticationInput
							key="displayNameInput"
							layoutId="displayName"
							type="text"
							placeholder="Display Name"
						/>
						<AuthenticationInput
							key="usernameInput"
							layoutId="usernameInput"
							type="text"
							placeholder="User ID"
						/>
						<AuthenticationInput key="emailInput" layoutId="emailInput" type="email" placeholder="Email" />
						<AuthenticationInput
							key="passwordInput"
							layoutId="passwordInput"
							type="password"
							placeholder="Password"
						/>
						<AuthenticationInput
							key="confirmPasswordInput"
							layoutId="confirmPasswordInput"
							type="password"
							placeholder="Confirm Password"
						/>
						<AuthenticationInput key="submit" layoutId="submit" type="submit" value="Submit" />
					</AnimatePresence>
				</>
			),
		},
	];

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

	const [items, setItems] = useState([1, 2, 3, 4, 5]);

	return (
		<StyledAuthenticatePage {...props}>
			<main>
				<ul>
					{tabs.map((item, index) => (
						<li
							className={activeTab === index ? 'active' : ''}
							key={item.label}
							onClick={() => {
								setActiveTab(index);
							}}
						>
							<p>{item.label}</p>

							{activeTab === index && <motion.div layoutId="underline" />}
						</li>
					))}
				</ul>
				<form onSubmit={[handleLogin, handleRegister][activeTab]}>{tabs[activeTab].content}</form>
			</main>
			<button
				onClick={(event) => {
					event.preventDefault();
					const newArray = [];
					for (let i = 0; i < Math.floor(Math.random() * 10); i++) {
						newArray.push(i);
					}
					setItems(newArray);
				}}
			>
				click
			</button>
			<ul
				style={{
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<AnimatePresence mode="popLayout">
					{items.map((item) => {
						return (
							<motion.div
								key={item}
								layout
								initial={{ opacity: 0, x: 100 }}
								animate={{
									opacity: 1,
									x: 0,
								}}
								exit={{ opacity: 0, x: -100 }}
								transition={{
									type: 'spring',
									duration: 0.7,
									bounce: 0.2,
								}}
							>
								<p>{item}</p>
							</motion.div>
						);
					})}
				</AnimatePresence>
			</ul>
		</StyledAuthenticatePage>
	);
};
