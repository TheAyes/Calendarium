export type FormRule = {
	description: string;
	checkFunction: (arg0: string, arg1?: TabContent[]) => boolean;
	additionalData?: string;
};
export type TabContent = {
	type: string;
	placeholder?: string;
	key: string;
	isFocused: boolean;
	description?: string;
	value: string;
	rules?: FormRule[];
};
export type Tab = { label: string; content: TabContent[] };
