import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { CalendariumTheme } from '../../types/CalendariumTheme.ts';

const StyledAuthenticationInput = styled(motion.input)`
	flex: 1;
	padding: 16px;
	color: ${(props) => (props.theme as CalendariumTheme).layers[0].text?.paragraphColor};
	font-weight: ${(props) => (props.theme as CalendariumTheme).typography?.h2?.fontWeight};

	&[type='text'],
	&[type='password'],
	&[type='email'] {
		border-bottom: 2px solid
			${(props) => (props.theme as CalendariumTheme).layers[0].formElements?.inputField?.default.borderColor};

		&:hover {
			border-bottom: 2px solid
				${(props) => (props.theme as CalendariumTheme).layers[0].formElements?.inputField?.hovered?.borderColor};
		}

		&:focus {
			border-bottom: 2px solid
				${(props) => (props.theme as CalendariumTheme).layers[0].formElements?.inputField?.focused?.borderColor};
		}
	}

	&[type='submit'] {
		border: 2px solid
			${(props) => (props.theme as CalendariumTheme).layers[0].formElements?.inputField?.default.borderColor};

		&:hover {
			border: 2px solid
				${(props) => (props.theme as CalendariumTheme).layers[0].formElements?.inputField?.hovered?.borderColor};
		}

		&:focus {
			border: 2px solid
				${(props) => (props.theme as CalendariumTheme).layers[0].formElements?.inputField?.focused?.borderColor};
		}
	}

	&::placeholder {
		color: rgb(120, 120, 180);
	}
`;

type AuthenticationInputProps = {
	[key: string]: unknown;
};

export const AuthenticationInput: React.FC<AuthenticationInputProps> = ({ ...props }) => {
	return (
		<StyledAuthenticationInput
			{...props}
			initial={{ opacity: 0, x: 100 }}
			animate={{
				opacity: 1,
				x: 0,
			}}
			exit={{ opacity: 0, x: -100 }}
			transition={{
				type: 'spring',
				duration: 0.7,
				bounce: 0.2,
			}}
			layout
		/>
	);
};
