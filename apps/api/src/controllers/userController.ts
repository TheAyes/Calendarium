import { Request, Response } from 'express';
import { User } from '../models/User.ts';
import process from 'process';
import bcrypt from 'bcrypt';
import { generateToken, refreshToken } from 'jwt-authorize';

const userIdPattern = /^[a-z][a-z0-9_-]{2,29}$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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

export const doesUserExist = async (username = '') => {
	const foundUser = await User.findOne({ username }).exec();

	return !!foundUser;
};

export const loginUser = async (req: Request, res: Response) => {
	const { username, password } = req.body;

	if (!userIdPattern.test(username)) {
		return res.status(400).json({
			accessToken: null,
			refreshToken: null,
			error: 'Invalid username',
		});
	}

	try {
		const foundUser = await User.findOne({ username }).exec();
		if (!foundUser) {
			return res.status(401).json({
				accessToken: null,
				refreshToken: null,
				error: 'Invalid username or password',
			});
		}

		const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);
		if (!isPasswordCorrect) {
			return res.status(401).json({
				accessToken: null,
				refreshToken: null,
				user: null,
				error: 'Invalid username or password',
			});
		}

		const result = generateToken(
			{
				payload: { userid: foundUser._id, hashedPassword: foundUser.password },
				secret: process.env.JWT_SECRET!,
				options: { expiresIn: process.env.API_JWT_EXPIRY || '10m' },
			},
			{
				payload: { userid: foundUser._id, hashedPassword: foundUser.password },
				secret: process.env.JWT_REFRESH_SECRET!,
				options: { expiresIn: process.env.API_JWT_REFRESH_EXPIRY || '7d' },
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

	try {
		if (await doesUserExist(userId)) {
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

		const savedUser = user; // await user.save();

		const result = generateToken(
			{
				payload: { userid: savedUser._id, hashedPassword: hashedPassword },
				secret: process.env.JWT_SECRET!,
				options: { expiresIn: '10m' },
			},
			{
				payload: { userid: savedUser._id, hashedPassword: hashedPassword },
				secret: process.env.JWT_REFRESH_SECRET!,
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
		const authHeader = req.get('Authorization') || req.get('authorization');
		const token = authHeader && authHeader.split(' ')[1];
		if (!token) {
			return res.status(401).json({ error: 'Token is required' });
		}

		const refreshSecret = process.env.JWT_REFRESH_SECRET;
		const jwtSecret = process.env.JWT_SECRET;

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
