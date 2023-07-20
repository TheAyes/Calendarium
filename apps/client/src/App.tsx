import { GlobalStyles } from './GlobalStyles.tsx';
import { ThemeProvider } from '@emotion/react';
import { Route, Routes } from 'react-router-dom';
import { AuthenticationPage } from './pages/AuthenticationPage.tsx';
import { DashboardPage } from './pages/DashboardPage.tsx';
import { AuthenticationProvider } from './components/contextProviders/AuthenticationProvider.tsx';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { darkTheme } from './themes/darkTheme.ts';

export const App = () => {
	const [cookies, setCookie] = useCookies(['language']);
	/*
	useEffect(() => {
		if (cookies.refreshToken) {
			(async () => {
				try {
					const response = await axios.post(`/api/refresh`, {});
					generateUserTokens(response, setCookie, setAppState);

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
		} else if (!cookies.accessToken && !cookies.refreshToken) {
			navigate('/authenticate');
			return;
		}
	}, [location.pathname]);
	 */

	useEffect(() => {
		if (!cookies.language) setCookie('language', 'en');
	}, []);

	return (
		<>
			<AuthenticationProvider>
				<ThemeProvider theme={darkTheme}>
					<GlobalStyles />
					<Routes>
						<Route index path="/" element={<></>} />
						<Route path="/authenticate" element={<AuthenticationPage />} />
						<Route path="/dashboard" element={<DashboardPage />} />
						<Route path="/*" element={<AuthenticationPage />} />
					</Routes>
				</ThemeProvider>
			</AuthenticationProvider>
		</>
	);
};
