import chroma from 'chroma-js';

/**
 * Represents a color with variations for light and dark shades.
 *
 * @class
 * @classdesc This class is used to generate a color with light and dark variations.
 */
export class Color {
	/**
	 * The main color.
	 * @type {string}
	 */
	public main: string;

	/**
	 * The light variation of the main color.
	 * @type {string}
	 */
	public light: string;
	public lighter: string;

	/**
	 * The dark variation of the main color.
	 * @type {string}
	 */
	public dark: string;
	public darker: string;

	/**
	 * Constructs a ThemedColor instance.
	 *
	 * @constructor
	 * @param {string} mainColor - The main color in hexadecimal format.
	 * @param {number} [colorSpread=0.2] - The spread factor for generating light and dark variations.
	 */
	constructor(mainColor: string, colorSpread: number = 0.2) {
		const chromaColor = chroma(mainColor);

		/**
		 * The main color.
		 * @member {string}
		 */
		this.main = mainColor;

		/**
		 * The light variation of the main color.
		 * @member {string}
		 */
		this.light = chromaColor.brighten(colorSpread).hex();
		this.lighter = chromaColor.brighten(colorSpread + 1).hex();

		/**
		 * The dark variation of the main color.
		 * @member {string}
		 */
		this.dark = chromaColor.darken(colorSpread).hex();
		this.darker = chromaColor.brighten(colorSpread + 1).hex();
	}
}
