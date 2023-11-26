export class Breakpoints {
	public xs: number;
	public sm: number;
	public md: number;
	public lg: number;
	public xl: number;

	constructor(
		breakpoints: Breakpoints = new Breakpoints({
			xs: 0,
			sm: 600,
			md: 960,
			lg: 1280,
			xl: 1920,
		}),
	) {
		const { xs, sm, md, lg, xl } = breakpoints;
		this.xs = xs;
		this.sm = sm;
		this.md = md;
		this.lg = lg;
		this.xl = xl;
	}
}
