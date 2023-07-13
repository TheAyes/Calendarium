export type TextStyleProperty = {
	fontFamily?: string;
	fontSize?: string;
	fontWeight?: number;
	lineHeight?: string;
	letterSpacing?: string;
	textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
	fontStyle?: 'normal' | 'italic' | 'oblique';
	textDecoration?: string;
};

export type ColorProperties = {
	fillColor?: string;
	borderColor?: string;
	textColor?: string;
};

export type StateProperties = {
	default: ColorProperties;
	hovered?: ColorProperties;
	pressed?: ColorProperties;
	disabled?: ColorProperties;
	focused?: ColorProperties;
};

export type ElementStates = {
	inputField?: StateProperties;
	checkbox?: StateProperties;
	radioButton?: StateProperties;
	dropDownMenu?: StateProperties;
};

export type LayerColors = {
	button?: StateProperties;
	header?: string;
	footer?: string;
	navigationMenu?: string;
	text?: {
		headingColor?: string;
		paragraphColor?: string;
		linkColor?: string;
	};
	background?: string;
	formElements?: ElementStates;
	cardColor?: string;
	iconColor?: string;
	borderColor?: string;
	scrollbarColor?: string;
};

export type CalendariumTheme = {
	layers: LayerColors[];
	typography?: {
		h1?: TextStyleProperty;
		h2?: TextStyleProperty;
		h3?: TextStyleProperty;
		h4?: TextStyleProperty;
		h5?: TextStyleProperty;
		h6?: TextStyleProperty;
		p?: TextStyleProperty;
		a?: TextStyleProperty;
	};
	spacing: (factor: number) => string;
	breakpoints?: {
		xs?: string;
		sm?: string;
		md?: string;
		lg?: string;
	};
	zIndex?: {
		appBar?: number;
		drawer?: number;
		modal?: number;
		snackbar?: number;
		tooltip?: number;
	};
	shape?: {
		borderRadius?: string;
	};
};
