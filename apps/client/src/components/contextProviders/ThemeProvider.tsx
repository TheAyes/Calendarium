import { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from 'react';
import { darkTheme } from '../../themes/darkTheme.ts';
import { CalendariumTheme } from '../../types/CalendariumTheme.ts';

type ThemeProviderProps = {
	children: ReactNode;
	[key: string]: unknown;
};

export const ThemeContext = createContext(
	{} as {
		get: CalendariumTheme;
		set: Dispatch<SetStateAction<CalendariumTheme>>;
	}
);

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
	const [theme, setTheme] = useState(darkTheme);
	return <ThemeContext.Provider value={{ get: theme, set: setTheme }}>{children}</ThemeContext.Provider>;
};
