import { CalendariumTheme } from '../types/CalendariumTheme.ts';
import { defaultTheme } from './baseTheme.ts';

const deepBlue = '#0c5194';
const lightBlue = '#0066cc';
const orange = '#ff6600';
const lightGrey = '#aaaaaa';
const darkGrey = '#444444';
const white = '#ffffff';
const black = '#000000';

export const darkTheme: CalendariumTheme = {
	...defaultTheme,
	colors: {
		button: {
			...defaultTheme.colors.button,
			default: { fillColor: deepBlue, borderColor: lightBlue, textColor: white },
			hovered: { fillColor: '#f0f0f033', borderColor: orange, textColor: white },
			pressed: { fillColor: '#1f1e1e', borderColor: orange, textColor: white },
			disabled: { fillColor: darkGrey, borderColor: lightGrey, textColor: lightGrey },
			focused: { fillColor: '#f0f0f011', borderColor: orange, textColor: white },
		},
		header: deepBlue,
		footer: deepBlue,
		navigationMenu: black,
		text: {
			headingColor: orange,
			paragraphColor: white,
			linkColor: lightBlue,
		},
		background: '#121212',
		formElements: {
			...defaultTheme.colors.formElements,
			inputField: {
				...defaultTheme.colors.formElements?.inputField,
				default: { fillColor: '#10002050', borderColor: lightBlue, textColor: white },
				focused: { fillColor: 'rgba(76,51,108,0.31)', borderColor: '#ff6600', textColor: white },
				hovered: { fillColor: 'rgba(84,70,96,0.31)', borderColor: '#ffaaaa', textColor: white },
			},
			checkbox: {
				...defaultTheme.colors.formElements?.checkbox,
				default: { fillColor: deepBlue, borderColor: lightBlue, textColor: white },
				disabled: { fillColor: darkGrey, borderColor: lightGrey, textColor: lightGrey },
			},
			radioButton: {
				...defaultTheme.colors.formElements?.radioButton,
				default: { fillColor: deepBlue, borderColor: lightBlue, textColor: white },
				disabled: { fillColor: darkGrey, borderColor: lightGrey, textColor: lightGrey },
			},
			dropDownMenu: {
				...defaultTheme.colors.formElements?.dropDownMenu,
				default: { fillColor: deepBlue, borderColor: lightBlue, textColor: white },
				disabled: { fillColor: darkGrey, borderColor: lightGrey, textColor: lightGrey },
			},
		},
		cardColor: 'rgba(255, 255, 255, 0.01)',
		iconColor: white,
		borderColor: lightBlue,
		scrollbarColor: lightGrey,
	},

	typography: {
		...defaultTheme.typography,
		h1: { ...defaultTheme.typography?.h1 },
		h2: { ...defaultTheme.typography?.h2 },
		h3: { ...defaultTheme.typography?.h3 },
		h4: { ...defaultTheme.typography?.h4 },
		h5: { ...defaultTheme.typography?.h5 },
		h6: { ...defaultTheme.typography?.h6 },
		p: { ...defaultTheme.typography?.p },
		a: { ...defaultTheme.typography?.a },
	},
};
