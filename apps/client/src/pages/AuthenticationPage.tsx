import { FC, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { CalendariumTheme } from '../types/CalendariumTheme';
import { AuthenticationHelper } from '../components/authentication/AuthenticationHelper';
import { AuthenticationForm } from '../components/authentication/AuthenticationForm';
import { getTabs } from '../constants/authentication/tabs';
import { useDispatch, useSelector } from 'react-redux';
import { selectActiveTab, setActiveTab } from '../features/authenticationSlice';

type AuthenticatePageProps = {
	[key: string]: unknown;
};

const StyledAuthenticatePage = styled('div')`
	display: flex;
	justify-content: center;
	padding-top: 5rem;

	& main {
		display: flex;
		flex-direction: column;
		gap: 8px;
		width: 25rem;

		min-height: 550px;

		& > ul {
			display: flex;
			grid-column: 1/2;

			& > li {
				flex: 1;
				cursor: pointer;
				display: flex;
				flex-direction: column;
				background: ${(props) => (props.theme as CalendariumTheme).backgroundColor.main};
				transition: background-color 200ms;

				&.active {
					background: ${(props) => (props.theme as CalendariumTheme).backgroundColor.light};
				}

				&:hover {
					background: ${(props) => (props.theme as CalendariumTheme).primaryColor.main}22;
				}

				& > p {
					padding: 0.5rem 0;
					text-align: center;
					user-select: none;
					font-weight: ${(props) => (props.theme as CalendariumTheme).bodyTypography.fontWeight};
					flex: 1;
				}

				& > div {
					height: 4px;
					background: ${(props) => (props.theme as CalendariumTheme).primaryColor.main};
				}
			}
		}
	}
`;

export const AuthenticationPage: FC<AuthenticatePageProps> = ({ ...props }) => {
	//const [activeTab, setActiveTab] = useState(0);

	const [tabs, setTabs] = useState(getTabs());

	const activeTab = useSelector(selectActiveTab);
	const dispatch = useDispatch();
	const handleChangeTab = (newTab: number) => {
		dispatch(setActiveTab(newTab));
	};

	const handleBlurAll = () => {
		const newTabs = tabs.map((tab, index) =>
			index !== activeTab
				? tab
				: {
						...tab,
						content: tab.content.map((item) => ({ ...item, isFocused: false }))
				  }
		);
		setTabs(newTabs);
	};

	const currentFocusedInputField = useMemo(
		() => tabs[activeTab].content.find((currentItem) => currentItem.isFocused),
		[activeTab, tabs]
	);

	return (
		<StyledAuthenticatePage {...props}>
			<LayoutGroup>
				<main>
					<ul>
						<AnimatePresence>
							{tabs.map((item, index) => (
								<motion.li
									className={activeTab === index ? 'active' : ''}
									layoutId={item.label}
									initial={{
										y: -100
									}}
									animate={{
										y: 0
									}}
									exit={{
										y: -100
									}}
									transition={{
										delay: index * 0.1,
										type: 'spring',
										duration: 1,
										stiffness: 120,
										damping: 14
									}}
									key={item.label}
									onClick={() => {
										handleBlurAll();
										handleChangeTab(index);
									}}
								>
									<p>{item.label}</p>

									{activeTab === index && <motion.div layoutId="underline" />}
								</motion.li>
							))}
						</AnimatePresence>
					</ul>
					<AuthenticationForm tabs={tabs} activeTab={activeTab} setTabs={setTabs} />
				</main>

				<AuthenticationHelper
					tabs={tabs}
					activeTab={activeTab}
					currentFocusedInputField={currentFocusedInputField}
				/>
			</LayoutGroup>
		</StyledAuthenticatePage>
	);
};
