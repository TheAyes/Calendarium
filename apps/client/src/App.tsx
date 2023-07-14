import { GlobalStyles } from './GlobalStyles.tsx';
import { ThemeProvider } from '@emotion/react';
import { createContext, useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { darkTheme } from './themes/darkTheme.ts';
import { AuthenticationPage } from './pages/AuthenticationPage.tsx';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const AppContext = createContext({});

export const App = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const [cookies, setCookie] = useCookies(['accessToken', 'refreshToken']);

	const [appState, setAppState] = useState({
		theme: darkTheme,
		userState: {
			accessToken: cookies.accessToken || '',
			refreshToken: cookies.refreshToken || '',
		},
	});

	useEffect(() => {
		if (!appState.userState.accessToken) {
			if (!appState.userState.refreshToken) {
				navigate('/authenticate');
			} else {
				(async () => {
					try {
						const response = await axios.post(
							`/api/refresh`,
							{},
							{
								headers: {
									Authorization: `Bearer ${cookies.refreshToken}`,
								},
							}
						);
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
					} catch (error) {
						console.error(error);
					}
				})();
			}
		}
	}, [location.pathname]);
	return (
		<>
			<AppContext.Provider value={{ appState, setAppState }}>
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
