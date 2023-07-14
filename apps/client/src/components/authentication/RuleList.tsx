import React from 'react';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { Tab, TabContent } from '../../types/AuthenticationTypes.ts';

const StyledRuleList = styled('ul')`
	display: flex;
	flex-direction: column;
	gap: 8px;

	& > li {
		display: flex;
		align-items: center;

		& > span {
			padding: 1rem;
		}
	}
`;

type RuleListProps = {
	currentFocusedInputField?: TabContent;
	tabs: Tab[];
	activeTab: number;
	[key: string]: unknown;
};

export const RuleList: React.FC<RuleListProps> = ({ currentFocusedInputField, tabs, activeTab, ...props }) => {
	return (
		<StyledRuleList {...props}>
			<AnimatePresence mode="popLayout">
				{currentFocusedInputField?.rules?.map((currentRule, i) => {
					if (!currentRule) {
						return <></>;
					}
					return (
						<motion.li
							key={currentRule.description + i}
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
								delay: i * 0.05,
							}}
						>
							<span>
								{currentRule.checkFunction(currentFocusedInputField.value, tabs[activeTab].content)
									? '✔️'
									: '❌'}
							</span>
							<p>{currentRule.description}</p>
						</motion.li>
					);
				})}
			</AnimatePresence>
		</StyledRuleList>
	);
};
