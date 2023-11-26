import { Color } from './Color.ts';
import { Typography } from './Typography.ts';
import { Breakpoints } from './Breakpoints.ts';

export class CalendariumTheme {
	public primaryColor: Color = new Color('#2d80b8');
	public secondaryColor: Color = new Color('#f05000');
	public backgroundColor: Color = new Color('#1d1d1d');
	public textColor: Color = new Color('#dedede');
	public errorColor: Color = new Color('#ff2222');

	public bodyTypography: Typography = {
		fontFamily: 'Arial, sans-serif',
		fontSize: '16px',
		fontWeight: 700,
	};

	public headingTypography: Typography = {
		fontFamily: 'Roboto, sans-serif',
		fontSize: '24px',
		fontWeight: 900,
	};

	public breakpoints: Breakpoints = {
		xs: 0,
		sm: 600,
		md: 960,
		lg: 1280,
		xl: 1920,
	};

	/**
	 * Constructs a CalendariumThemeV2 instance.
	 *
	 * @constructor
	 * @param {Partial<CalendariumTheme>} [options] - An object containing optional values to override the default theme.
	 */
	constructor(options?: Partial<CalendariumTheme>) {
		if (options) {
			Object.assign(this, options);
		}
	}
}
