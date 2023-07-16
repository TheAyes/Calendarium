import { CalendariumTheme } from './CalendariumTheme.ts';

export type AppState = {
	theme: CalendariumTheme;
	language: string;
	userState: {
		accessToken: any;
		refreshToken: any;
	};
};
