import { GlobalStyles } from './GlobalStyles.tsx';
import { ThemeProvider } from '@emotion/react';
import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { darkTheme } from './themes/darkTheme.ts';
import { AuthenticationPage } from './pages/AuthenticationPage.tsx';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { AppState } from './types/AppState.ts';
import { CalendariumTheme } from './types/CalendariumTheme.ts';

type AppContextType = {
	get: {
		theme: CalendariumTheme;
		language: string;
		userState: {
			accessToken: string;
			refreshToken: string;
		};
	};
	set: Dispatch<SetStateAction<AppState>>;
};
export const AppContext = createContext({} as AppContextType);

export const App = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const [cookies, setCookie] = useCookies(['accessToken', 'refreshToken']);

	const [appState, setAppState] = useState({
		theme: darkTheme,
		language: 'en',
		userState: {
			accessToken: cookies.accessToken || '',
			refreshToken: cookies.refreshToken || '',
			displayName: '',
		},
	} as AppState);

	useEffect(() => {
		if (appState.userState.refreshToken) {
			(async () => {
				try {
					const response = await axios.post(`/api/refresh`, {});
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

					const userData = await axios.get(`/api/user`);
					console.table(userData.data);
					setAppState((prevState) => {
						return {
							...prevState,
							userState: {
								...prevState.userState,
								displayName: userData.data.displayName,
								userId: userData.data.userId,
								email: userData.data.email,
								id: userData.data._id,
							},
						};
					});
				} catch (error: any) {
					console.warn('Refreshing failed with error: ', error.response.data);
				}
			})();
		}
		if (!appState.userState.accessToken && !appState.userState.refreshToken) {
			navigate('/authenticate');
			return;
		}
	}, [location.pathname]);
	return (
		<>
			<AppContext.Provider value={{ get: appState, set: setAppState }}>
				<ThemeProvider theme={appState.theme}>
					<GlobalStyles />
					<Routes>
						<Route index path="/" element={<></>} />
						<Route path="/authenticate" element={<AuthenticationPage />} />
						<Route path="/dashboard" element={<></>} />
						<Route path="/*" element={<AuthenticationPage />} />
					</Routes>
				</ThemeProvider>
			</AppContext.Provider>
		</>
	);
};
