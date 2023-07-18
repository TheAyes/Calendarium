import React, { useState } from 'react';
import styled from '@emotion/styled';
import { AuthWindowTabList } from './AuthWindowTabList.tsx';
import { AuthInput } from './AuthInput.tsx';
import { AnimatePresence } from 'framer-motion';

export type Tab = {
	label: string;
	content: {
		type: 'text' | 'password' | 'email' | 'submit';
		placeholder: string;
		key: string;
	}[];
};

const tabs: Tab[] = [
	{
		label: 'Login',
		content: [
			{
				type: 'text',
				placeholder: 'User ID',
				key: 'user-id',
			},
		],
	},
	{
		label: 'Register',
		content: [
			{
				type: 'text',
				placeholder: 'User ID',
				key: 'user-id',
			},
		],
	},
];

type AuthenticationWindowProps = {
	[key: string]: unknown;
};

const StyledAuthenticationWindow = styled('div')`
	margin: 0 auto;
	width: 40%;
	max-width: 25em;
`;

export const AuthenticationWindow: React.FC<AuthenticationWindowProps> = ({ ...props }) => {
	const [activeTab, setActiveTab] = useState(0);

	return (
		<StyledAuthenticationWindow {...props}>
			<form>
				<AuthWindowTabList tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
				{/* Tab Content Goes Here */}
				<AnimatePresence>
					{tabs[activeTab].content.map((currentItem, index) => {
						return (
							<AuthInput
								placeholder={currentItem.placeholder}
								key={`key_identifier-${currentItem.key}-${index}`}
								layoutId={`layout_identifier-${currentItem.key}-${index}`}
							/>
						);
					})}
				</AnimatePresence>
			</form>
			<aside>Test Rules</aside>
		</StyledAuthenticationWindow>
	);
};
