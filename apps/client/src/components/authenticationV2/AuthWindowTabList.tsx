import React, { Dispatch, SetStateAction, SyntheticEvent } from 'react';
import styled from '@emotion/styled';
import { AuthWindowTab } from './AuthWindowTab.tsx';
import { AnimatePresence } from 'framer-motion';
import { Tab } from './AuthenticationWindow.tsx';

type AuthWindowTabListProps = {
	tabs: Tab[];
	activeTab: number;
	setActiveTab: Dispatch<SetStateAction<number>>;
	[key: string]: unknown;
};

const StyledAuthWindowTabList = styled('nav')`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const AuthWindowTabList: React.FC<AuthWindowTabListProps> = ({
	tabs,
	activeTab = 0,
	setActiveTab,
	...props
}) => {
	return (
		<StyledAuthWindowTabList {...props}>
			<AnimatePresence>
				{tabs.map((currentTab, index) => {
					return (
						<AuthWindowTab
							text={currentTab.label}
							key={`key_identifier-${currentTab.label}-${index}`}
							layoutId={`Layout_identifier-${currentTab.label}-${index}`}
							isActive={activeTab === index}
							index={index}
							onClick={(event: SyntheticEvent) => {
								event.preventDefault();
								setActiveTab(index);
							}}
						/>
					);
				})}
			</AnimatePresence>
		</StyledAuthWindowTabList>
	);
};
