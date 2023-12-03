import React from 'react';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { Tab, TabContent } from '../../types/AuthenticationTypes';
import { checkFunctions } from '../../utils/helperFunctions';

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

					const isValid = checkFunctions[currentRule.checkFunction](currentFocusedInputField.value, '');

					return (
						<motion.li
							key={currentRule.description + i}
							initial={{
								x: 50,
								opacity: 0
							}}
							animate={{
								x: 0,
								opacity: 1
							}}
							exit={{
								x: 50,
								opacity: 0
							}}
							transition={{
								type: 'spring',
								duration: 0.5,
								stiffness: 120,
								damping: 14,
								delay: i * 0.05
							}}
						>
							<span>{isValid ? '✔️' : '❌'}</span>
							<div>
								<p>{currentRule.description}</p>
								{currentRule.additionalData && <p>{currentRule.additionalData}</p>}
							</div>
						</motion.li>
					);
				})}
			</AnimatePresence>
		</StyledRuleList>
	);
};
