import { CalendariumTheme } from '../types/CalendariumTheme.ts';

export const defaultTheme: CalendariumTheme = {
	layers: [
		{
			button: {
				default: { fillColor: '#ffffff', borderColor: '#cccccc', textColor: '#000000' },
				hovered: { fillColor: '#f0f0f0', borderColor: '#c0c0c0', textColor: '#000000' },
				pressed: { fillColor: '#e0e0e0', borderColor: '#a0a0a0', textColor: '#000000' },
				disabled: { fillColor: '#f5f5f5', borderColor: '#f5f5f5', textColor: '#888888' },
				focused: { fillColor: '#ffffff', borderColor: '#0000ff', textColor: '#000000' },
			},
			header: '#eeeeee',
			footer: '#eeeeee',
			navigationMenu: '#dddddd',
			text: {
				headingColor: '#111111',
				paragraphColor: '#333333',
				linkColor: '#0000ff',
			},
			background: '#ffffff',
			formElements: {
				inputField: {
					default: { fillColor: '#ffffff', borderColor: '#cccccc', textColor: '#000000' },
					focused: { fillColor: '#ffffff', borderColor: '#0000ff', textColor: '#000000' },
				},
				checkbox: {
					default: { fillColor: '#ffffff', borderColor: '#cccccc', textColor: '#000000' },
					disabled: { fillColor: '#f5f5f5', borderColor: '#f5f5f5', textColor: '#888888' },
				},
				radioButton: {
					default: { fillColor: '#ffffff', borderColor: '#cccccc', textColor: '#000000' },
					disabled: { fillColor: '#f5f5f5', borderColor: '#f5f5f5', textColor: '#888888' },
				},
				dropDownMenu: {
					default: { fillColor: '#ffffff', borderColor: '#cccccc', textColor: '#000000' },
					disabled: { fillColor: '#f5f5f5', borderColor: '#f5f5f5', textColor: '#888888' },
				},
			},
			cardColor: '#ffffff',
			iconColor: '#000000',
			borderColor: '#cccccc',
			scrollbarColor: '#aaaaaa',
		},
	],
	typography: {
		h1: {
			fontFamily: 'Arial',
			fontSize: '2.0rem',
			fontWeight: 700,
			lineHeight: '2.4rem',
			letterSpacing: 'normal',
			textTransform: 'none',
			fontStyle: 'normal',
			textDecoration: 'none',
		},
		h2: {
			fontFamily: 'Arial',
			fontSize: '1.8rem',
			fontWeight: 600,
			lineHeight: '2.2rem',
			letterSpacing: 'normal',
			textTransform: 'none',
			fontStyle: 'normal',
			textDecoration: 'none',
		},
		h3: {
			fontFamily: 'Arial',
			fontSize: '1.6rem',
			fontWeight: 500,
			lineHeight: '2.0rem',
			letterSpacing: 'normal',
			textTransform: 'none',
			fontStyle: 'normal',
			textDecoration: 'none',
		},
		h4: {
			fontFamily: 'Arial',
			fontSize: '1.4rem',
			fontWeight: 400,
			lineHeight: '1.8rem',
			letterSpacing: 'normal',
			textTransform: 'none',
			fontStyle: 'normal',
			textDecoration: 'none',
		},
		h5: {
			fontFamily: 'Arial',
			fontSize: '1.2rem',
			fontWeight: 300,
			lineHeight: '1.6rem',
			letterSpacing: 'normal',
			textTransform: 'none',
			fontStyle: 'normal',
			textDecoration: 'none',
		},
		h6: {
			fontFamily: 'Arial',
			fontSize: '1.0rem',
			fontWeight: 200,
			lineHeight: '1.4rem',
			letterSpacing: 'normal',
			textTransform: 'none',
			fontStyle: 'normal',
			textDecoration: 'none',
		},
		p: {
			fontFamily: 'Arial',
			fontSize: '1.0rem',
			fontWeight: 200,
			lineHeight: '1.6rem',
			letterSpacing: 'normal',
			textTransform: 'none',
			fontStyle: 'normal',
			textDecoration: 'none',
		},
		a: {
			fontFamily: 'Arial',
			fontSize: '1.0rem',
			fontWeight: 200,
			lineHeight: '1.6rem',
			letterSpacing: 'normal',
			textTransform: 'none',
			fontStyle: 'normal',
			textDecoration: 'underline',
		},
	},
	spacing: (factor: number) => `${0.8 * factor}rem`,
	breakpoints: {
		xs: '20rem',
		sm: '30rem',
		md: '45rem',
		lg: '60rem',
	},
	zIndex: {
		appBar: 1200,
		drawer: 1100,
		modal: 1300,
		snackbar: 1400,
		tooltip: 1500,
	},
	shape: {
		borderRadius: '0.4rem',
	},
};
