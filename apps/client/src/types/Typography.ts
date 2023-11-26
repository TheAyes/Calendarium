export class Typography {
	fontFamily: string = 'sans-serif';
	fontSize: string = '1rem';
	fontWeight: number = 400;

	constructor(options?: Partial<Typography>) {
		if (options) {
			Object.assign(this, options);
		}
	}
}
