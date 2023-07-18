import React from 'react';
import styled from '@emotion/styled';
import { AuthenticationWindow } from '../components/authenticationV2/AuthenticationWindow.tsx';

const StyledAuthenticationPageV2 = styled('div')``;

type AuthenticationPageV2Props = {
	[key: string]: unknown;
};

export const AuthenticationPageV2: React.FC<AuthenticationPageV2Props> = ({ ...props }) => {
	return (
		<StyledAuthenticationPageV2 {...props}>
			<AuthenticationWindow />
		</StyledAuthenticationPageV2>
	);
};
