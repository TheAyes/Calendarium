import { FC, ReactNode } from 'react';
import { AuthenticationProvider } from './components/contextProviders/AuthenticationProvider';
import { CalendariumTheme } from './types/CalendariumTheme';

import { Provider } from 'react-redux';
import { store } from './app/store';
import { ThemeProvider } from '@emotion/react';

const theme = new CalendariumTheme();

export const Wrappers: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<>
			<Provider store={store}>
				<AuthenticationProvider>
					<ThemeProvider theme={theme}>{children}</ThemeProvider>
				</AuthenticationProvider>
			</Provider>
		</>
	);
};

export default Wrappers;
