import { css, Global, useTheme } from '@emotion/react';
import { CalendariumTheme } from './types/CalendariumTheme.ts';

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
					background: ${currentTheme.layers[0].background};

					body {
						overflow-x: hidden;
						color: ${currentTheme.layers[0].text?.paragraphColor};

						// Typography //
						font-family: ${currentTheme.typography?.p?.fontFamily};
						font-size: ${currentTheme.typography?.p?.fontSize};

						h1 {
							font-size: ${currentTheme.typography?.h1?.fontSize};
							color: ${currentTheme.layers[0].text?.headingColor};
						}

						h2 {
							font-size: ${currentTheme.typography?.h2?.fontSize};
							color: ${currentTheme.layers[0].text?.headingColor};
						}

						p {
							font-size: ${currentTheme.typography?.p?.fontSize};
							color: ${currentTheme.layers[0].text?.paragraphColor};
						}

						a {
							color: ${currentTheme.layers[0].text?.linkColor};
							text-decoration: ${currentTheme.typography?.a?.textDecoration};
						}

						ul {
							list-style: none;
						}

						input {
							outline: none;

							background-color: rgba(255, 255, 255, 0.01);
							color: ${currentTheme.layers[0].formElements?.inputField?.default.textColor};
							border: none;

							transition: background-color 500ms, color 500ms, border 500ms;

							&:hover {
								background: ${currentTheme.layers[0].formElements?.inputField?.hovered?.fillColor};
								color: ${currentTheme.layers[0].formElements?.inputField?.hovered?.textColor};
							}

							&:focus {
								background: ${currentTheme.layers[0].formElements?.inputField?.focused?.fillColor};
								color: ${currentTheme.layers[0].formElements?.inputField?.focused?.textColor};
							}
						}
					}
				}
			`}
		/>
	);
};
