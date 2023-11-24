import process from 'process';
import express, { Application, Request, Response } from 'express';
import { Endpoint, ValidationSchema } from './types/types';
import { validateRequest } from './controllers/requestController';
import * as path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import Joi from 'joi';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import { authenticateUser, getUserData, loginUser, refreshUser, registerUser } from './controllers/userController';

config({ path: '../../.env' });

const dbUser = process.env.API_DB_USER;
const dbPassword = process.env.API_DB_PW;
const dbCluster = process.env.API_DB_CLUSTER;
const dbShard = process.env.API_DB_SHARD;

if ([dbUser, dbPassword, dbCluster, dbShard].some((item) => !item)) {
	console.error('Database credentials were not defined');
	process.exit(1);
}

const host = process.env.API_HOST || 'localhost';
const port = process.env.API_PORT ? Number(process.env.API_PORT) : 4000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, '../../../build/client')));
app.use(express.json());
app.use(cookieParser());

await mongoose.connect(
	`mongodb+srv://${process.env.API_DB_USER}:${process.env.API_DB_PW}@${process.env.API_DB_CLUSTER}.${process.env.API_DB_SHARD}.mongodb.net/calendarium-data?retryWrites=true&w=majority`,
);

const endpoints: Endpoint[] = [
	{
		method: 'get',
		path: '/api/heartbeat',
		middlewares: [],
		function: async (_: Request, res: Response) => res.send('Server running!'),
	},
	{
		method: 'get',
		path: '/api/docs',
		middlewares: [],
		function: async (_: Request, res: Response) => res.json(endpoints),
	},
	{
		method: 'post',
		path: '/api/login',
		middlewares: [],
		expectedBody: Joi.object({
			userId: Joi.string().required(),
			password: Joi.string().required(),
		}),
		function: (req: Request, res: Response) => loginUser(req, res),
	},
	{
		method: 'post',
		path: '/api/register',
		middlewares: [],
		expectedBody: Joi.object({
			displayName: Joi.string().required(),
			userId: Joi.string().required(),
			email: Joi.string().required(),
			password: Joi.string().required(),
		}),
		function: async (req: Request, res: Response) => registerUser(req, res),
	},
	{
		method: 'post',
		path: '/api/refresh',
		middlewares: [],
		function: async (req: Request, res: Response) => refreshUser(req, res),
	},
	{
		method: 'get',
		path: '/api/user',
		middlewares: [authenticateUser],
		function: async (req: Request, res: Response) => getUserData(req, res),
	},
	{
		method: 'get',
		path: '*',
		middlewares: [],
		function: async (_: Request, res: Response) =>
			res.sendFile(path.join(__dirname, '../../../build/client/index.html')),
	},
];

endpoints.forEach((endpoint) => {
	const validationSchemas: ValidationSchema[] = [
		{ schema: endpoint.expectedBody, source: 'body' },
		{ schema: endpoint.expectedQuery, source: 'query' },
		{ schema: endpoint.expectedUrlParams, source: 'params' },
		{ schema: endpoint.expectedHeaders, source: 'headers' },
	];
	const validatedRequestMiddleware = validateRequest(...validationSchemas);

	const middlewares = endpoint.middlewares || [];
	middlewares.push(validatedRequestMiddleware);

	app[endpoint.method as keyof Application](endpoint.path, middlewares, endpoint.function);
});

app.listen(port, () => {
	console.log(`Server running on: https://${host}:${port}`);
});
