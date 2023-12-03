import { checkFunctions } from '../utils/helperFunctions';

export type FormRule = {
	description: string;
	checkFunction: keyof typeof checkFunctions;
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
