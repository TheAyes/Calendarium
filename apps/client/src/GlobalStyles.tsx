import { css, Global, useTheme } from '@emotion/react';
import { CalendariumTheme } from './types/CalendariumTheme';

export const GlobalStyles = () => {
	const currentTheme = useTheme() as CalendariumTheme;
	return (
		<Global
			styles={css`
				* {
					padding: 0;
					margin: 0;
					box-sizing: border-box;
				}

				html {
					scroll-behavior: smooth;
					background: ${currentTheme.backgroundColor.dark};

					body {
						overflow-x: hidden;
						color: ${currentTheme.textColor.main};

						font-family: ${currentTheme.bodyTypography.fontFamily};
						font-size: ${currentTheme.bodyTypography.fontSize};
						font-weight: ${currentTheme.bodyTypography.fontWeight};

						h1,
						h2,
						h3,
						h4,
						h5,
						h6 {
							font-family: ${currentTheme.headingTypography.fontFamily};
							font-size: ${currentTheme.headingTypography.fontSize};
							font-weight: ${currentTheme.headingTypography.fontWeight};
						}

						a {
							color: inherit;
							text-decoration: inherit;
						}

						ul {
							list-style: none;
						}

						input {
							outline: none;

							background-color: ${currentTheme.backgroundColor.main};
							color: ${currentTheme.primaryColor.main};
							border: none;

							&::placeholder {
								transition: color 200ms;
								color: ${currentTheme.primaryColor.main};
							}

							&:-webkit-autofill {
								box-shadow: 0 0 0 30px ${currentTheme.backgroundColor.main} inset;
								-webkit-text-fill-color: ${currentTheme.primaryColor.light};
							}

							&:hover {
								color: ${currentTheme.primaryColor.light};
								background: ${currentTheme.backgroundColor.light};

								&::placeholder {
									color: ${currentTheme.primaryColor.light};
								}

								&:-webkit-autofill {
									box-shadow: 0 0 0 30px ${currentTheme.backgroundColor.light} inset;
									-webkit-text-fill-color: ${currentTheme.primaryColor.light};
								}
							}

							&:focus {
								color: ${currentTheme.primaryColor.lighter};
							}
						}
					}
				}
			`}
		/>
	);
};
