import { createContext, Dispatch, FC, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserStateType } from '../../types/UserStateType.ts';

export const UserContext = createContext(
	{} as {
		userState: UserStateType;
		setUserState: Dispatch<SetStateAction<UserStateType>>;
	}
);

type AuthContextType = {
	authenticateUser: () => void | Promise<void>;
	loginUser: (userId: string, password: string) => boolean | Promise<boolean>;
	registerUser: (displayName: string, userId: string, email: string, password: string) => boolean | Promise<boolean>;
	logoutUser: () => Promise<boolean>;
};

export const AuthContext = createContext({} as AuthContextType);

type AuthenticationProviderProps = {
	children?: ReactNode;
	[key: string]: unknown;
};

export const AuthenticationProvider: FC<AuthenticationProviderProps> = ({ children }) => {
	const [cookies, setCookie, removeCookie] = useCookies(['accessToken', 'refreshToken']);
	const [userState, setUserState] = useState({} as UserStateType);
	const navigate = useNavigate();
	const location = useLocation();

	const setTokenCookies = (response: AxiosResponse) => {
		const accessTokenExpiryDate = new Date();
		accessTokenExpiryDate.setDate(accessTokenExpiryDate.getMinutes() + 10);
		setCookie('accessToken', response.data.accessToken, { path: '/', expires: accessTokenExpiryDate });

		const refreshTokenExpiryDate = new Date();
		refreshTokenExpiryDate.setDate(refreshTokenExpiryDate.getDate() + 7);
		setCookie('refreshToken', response.data.refreshToken, { path: '/', expires: refreshTokenExpiryDate });
	};

	const [authenticationRetries, setAuthenticationRetries] = useState(0);
	const authenticateUser = async () => {
		if (!cookies.accessToken) return;

		if (authenticationRetries > 3) {
			setAuthenticationRetries(0);
			throw Error('Authentication failed with too many retries.');
		}
		try {
			const response = await axios.get('/api/user');
			setUserState((prevState) => ({
				...prevState,
				displayName: response.data.displayName,
				email: response.data.email
			}));
		} catch (authenticationError: unknown) {
			try {
				const response = await axios.post('/api/refresh');

				setTokenCookies(response);

				setAuthenticationRetries((prevState) => prevState + 1);
				await authenticateUser();
			} catch (refreshError) {
				if (refreshError instanceof AxiosError) {
					if (refreshError.status !== 200) return navigate('/authenticate');
					//console.error(refreshError);
				} else {
					//console.error(refreshError);
				}
			}
		}
	};

	const loginUser = async (userId: string, password: string): Promise<boolean> => {
		try {
			const response = await axios.post('/api/login', {
				userId,
				password
			});

			setTokenCookies(response);
			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	};
	const registerUser = async (
		displayName: string,
		userId: string,
		email: string,
		password: string
	): Promise<boolean> => {
		try {
			const response = await axios.post('/api/register', {
				displayName,
				email,
				userId,
				password
			});
			setTokenCookies(response);
			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	};

	const logoutUser = async () => {
		try {
			removeCookie('accessToken');
			removeCookie('refreshToken');
			navigate('/authenticate');
			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	};

	const [authState] = useState({
		authenticateUser,
		loginUser,
		registerUser,
		logoutUser
	} as AuthContextType);

	useEffect(() => {
		(async () => {
			await authenticateUser();
		})();
	}, [location.pathname]);
	return (
		<UserContext.Provider value={{ userState, setUserState }}>
			<AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
		</UserContext.Provider>
	);
};
