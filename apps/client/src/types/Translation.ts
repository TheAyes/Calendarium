type _AuthenticationString = {
	label: string;
	content: {
		[key: string]: {
			placeholder: string;
			description: string;
			rules?: { description: string }[];
		};
	};
};

type _LanguageStrings = {
	login: _AuthenticationString;
	register: _AuthenticationString;
};

export type Translation = {
	[key: string]: _LanguageStrings;
};
