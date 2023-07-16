import React from 'react';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { RuleList } from './RuleList.tsx';
import { Tab, TabContent } from '../../types/AuthenticationTypes.ts';

const StyledAuthenticationHelper = styled('aside')`
	padding: 1rem;

	width: 340px;
`;

type AuthenticationHelperProps = {
	currentFocusedInputField?: TabContent;
	tabs: Tab[];
	activeTab: number;
	[key: string]: unknown;
};

export const AuthenticationHelper: React.FC<AuthenticationHelperProps> = ({
	currentFocusedInputField,
	tabs,
	activeTab,
	...props
}) => {
	return (
		<StyledAuthenticationHelper {...props}>
			<AnimatePresence mode="popLayout">
				{currentFocusedInputField?.isFocused && (
					<motion.p
						initial={{
							x: 50,
							opacity: 0,
						}}
						animate={{
							x: 0,
							opacity: 1,
						}}
						exit={{
							x: 50,
							opacity: 0,
						}}
						transition={{
							type: 'spring',
							duration: 0.5,
							stiffness: 120,
							damping: 14,
						}}
						key={currentFocusedInputField?.key + 'label'}
					>
						{currentFocusedInputField?.description}
					</motion.p>
				)}
			</AnimatePresence>
			<ul>
				<RuleList currentFocusedInputField={currentFocusedInputField} tabs={tabs} activeTab={activeTab} />
			</ul>
		</StyledAuthenticationHelper>
	);
};
