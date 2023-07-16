import { NextFunction, Request, Response } from 'express';
import { User } from '../models/User.ts';
import process from 'process';
import bcrypt from 'bcrypt';
import { authenticate, generateToken, refreshToken } from 'jwt-authorize';

const userIdPattern = /^[a-z][a-z0-9_-]{2,29}$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_+.,-])[A-Za-z\d@$!%*?&_+.,-]{8,}$/;

declare global {
	namespace Express {
		interface Request {
			user?: any;
		}
	}
}

const errorResponse = (res: Response, status: number, error: unknown) => {
	if (error instanceof Error) {
		return res.status(status).json({
			accessToken: null,
			refreshToken: null,
			error: error.message,
		});
	} else {
		return res.status(status).json({
			accessToken: null,
			refreshToken: null,
			error: 'Unknown error',
		});
	}
};

export const doesUserExist = async (userId = '', email = '') => {
	const foundUsername = await User.findOne({ userId: userId }).exec();
	const foundEmail = await User.findOne({ email: email });

	return !!foundUsername || foundEmail;
};

export const loginUser = async (req: Request, res: Response) => {
	const { userId, password } = req.body;

	if (!userIdPattern.test(userId)) {
		return res.status(400).json({
			accessToken: null,
			refreshToken: null,
			error: 'Invalid userId',
		});
	}

	try {
		const foundUser = await User.findOne({ userId: userId }).exec();
		if (!foundUser) {
			return res.status(401).json({
				accessToken: null,
				refreshToken: null,
				error: 'Invalid userId or password',
			});
		}

		const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);
		if (!isPasswordCorrect) {
			return res.status(401).json({
				accessToken: null,
				refreshToken: null,
				user: null,
				error: 'Invalid userId or password',
			});
		}

		const refreshSecret = process.env.API_JWT_REFRESH_SECRET;
		const jwtSecret = process.env.API_JWT_SECRET;

		const result = generateToken(
			{
				payload: { userId: foundUser._id },
				secret: jwtSecret!,
				options: { expiresIn: '10m' },
			},
			{
				payload: { userId: foundUser._id },
				secret: refreshSecret!,
				options: { expiresIn: '7d' },
			}
		);

		return res.status(200).json({
			accessToken: result.accessToken,
			refreshToken: result.refreshToken,
			error: null,
		});
	} catch (err: unknown) {
		return errorResponse(res, 500, err);
	}
};

export const registerUser = async (req: Request, res: Response) => {
	const { userId, displayName, email, password } = req.body;

	if (!userIdPattern.test(userId)) {
		return res.status(400).json({
			accessToken: null,
			refreshToken: null,
			error: 'Invalid username',
		});
	}

	if (!emailPattern.test(email)) {
		return res.status(400).json({
			accessToken: null,
			refreshToken: null,
			error: 'Invalid email',
		});
	}

	if (!passwordPattern.test(password)) {
		return res.status(400).json({
			accessToken: null,
			refreshToken: null,
			error: 'Invalid password',
		});
	}

	try {
		if (await doesUserExist(userId, email)) {
			return res.status(409).json({
				accessToken: null,
				refreshToken: null,
				error: 'User already exists',
			});
		}

		const userSalt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(password, userSalt);

		const user = new User({
			userId: userId,
			displayName: displayName,
			email: email,
			password: hashedPassword,
		});

		const savedUser = await user.save();

		const refreshSecret = process.env.API_JWT_REFRESH_SECRET;

		const jwtSecret = process.env.API_JWT_SECRET;

		const result = generateToken(
			{
				payload: { userId: savedUser._id },
				secret: jwtSecret!,
				options: { expiresIn: '10m' },
			},
			{
				payload: { userId: savedUser._id },
				secret: refreshSecret!,
				options: { expiresIn: '7d' },
			}
		);

		return res.status(201).json({
			accessToken: result.accessToken,
			refreshToken: result.refreshToken,
			error: null,
		});
	} catch (err: unknown) {
		return errorResponse(res, 500, err);
	}
};
export const refreshUser = async (req: Request, res: Response) => {
	try {
		const token = req.cookies.refreshToken;
		if (!token) {
			return res.status(401).json({ error: 'Token is required' });
		}

		const refreshSecret = process.env.API_JWT_REFRESH_SECRET;

		const jwtSecret = process.env.API_JWT_SECRET;

		if (!refreshSecret || !jwtSecret) {
			return res.status(500).json({ error: 'Server configuration error' });
		}

		const result = refreshToken(token, refreshSecret, jwtSecret, '10m', '7d');

		// Handling the result of refreshToken
		if (result.status === 200) {
			return res.json({
				accessToken: result.accessToken,
				refreshToken: result.refreshToken,
			});
		} else {
			return res.status(result.status!).json({ error: result.error });
		}
	} catch (err: unknown) {
		return errorResponse(res, 500, err);
	}
};

export const authenticateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const accessToken = req.cookies.accessToken;
		if (!accessToken) {
			res.status(401).json({ error: 'Unauthorized' });
			return;
		}

		const result = authenticate({ accessToken: accessToken }, process.env.API_JWT_SECRET || '');
		if (result.status !== 200) {
			res.status(result.status!).json({ error: 'Unauthorized' }); // Add return here
			return;
		}

		req.user = await User.findById(result.payload?.userId).select('-password');
		console.log(req.user);
		next();
		return;
	} catch (error) {
		res.status(500).json({ error: error });
		return;
	}
};

export const getUserData = async (req: Request, res: Response) => {
	try {
		res.json(req.user);
	} catch (error) {
		res.status(500).json({ error: error });
	}
};
