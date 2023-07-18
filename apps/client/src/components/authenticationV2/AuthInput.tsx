import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

type AuthInputProps = {
	placeholder: string;
	[key: string]: unknown;
};

const StyledAuthInput = styled(motion.input)``;

export const AuthInput: React.FC<AuthInputProps> = ({ placeholder, ...props }) => {
	return <StyledAuthInput placeholder={placeholder} {...props} />;
};
