import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { CalendariumTheme } from '../../types/CalendariumTheme.ts';

type AuthenticationWindowTabProps = {
	isActive: boolean;
	index: number;
	text: string;
	[key: string]: unknown;
};

const StyledAuthWindowTab = styled(motion.button)`
	flex: 1;
	text-align: center;
	background: ${(props) => (props.theme as CalendariumTheme).colors.button?.focused?.fillColor};

	border: none;
	outline: 2px solid transparent;

	position: relative;

	transition: background-color 200ms, outline 200ms;

	&.active {
		background: ${(props) => (props.theme as CalendariumTheme).colors.button?.focused?.fillColor};
	}

	&:hover {
		background: ${(props) => (props.theme as CalendariumTheme).colors.button?.hovered?.fillColor};
	}

	&:focus-visible {
		outline: 2px solid ${(props) => (props.theme as CalendariumTheme).colors.button?.focused?.borderColor};
	}

	&:active {
		background: ${(props) => (props.theme as CalendariumTheme).colors.button?.pressed?.fillColor};
	}

	& > p {
		padding: 0.75em;
	}

	& > div {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 4px;
		background: ${(props) => (props.theme as CalendariumTheme).colors.button?.default.fillColor};
	}
`;

export const AuthWindowTab: React.FC<AuthenticationWindowTabProps> = ({
	isActive = false,
	index = 0,
	text = '',
	...props
}) => {
	return (
		<StyledAuthWindowTab
			{...props}
			initial={{
				y: -100,
			}}
			animate={{
				y: 0,
			}}
			transition={{
				delay: index * 0.1,
				type: 'spring',
				duration: 1,
				stiffness: 120,
				damping: 14,
			}}
			className={isActive ? 'active' : ''}
		>
			<p>{text}</p>
			{isActive && <motion.div layoutId="tabLine"></motion.div>}
		</StyledAuthWindowTab>
	);
};
