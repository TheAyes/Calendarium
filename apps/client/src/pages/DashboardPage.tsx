import { FC } from 'react';
import styled from '@emotion/styled';

type DashboardPageProps = {
	[key: string]: unknown;
};

const StyledDashboardPage = styled('div')``;

export const DashboardPage: FC<DashboardPageProps> = ({ ...props }) => {
	return <StyledDashboardPage {...props}>Hello Dashboard</StyledDashboardPage>;
};
