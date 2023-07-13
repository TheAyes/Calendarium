import { NextFunction, Request, Response } from 'express';
import Joi, { ObjectSchema } from 'joi';

export type ExpressMethods = 'get' | 'post' | 'put' | 'patch' | 'delete';

export type Endpoint = {
	/**
	 * A JSON Schema Object representing the expected structure and validation rules for the request body.
	 * This schema is used for data validation if provided.
	 */
	expectedHeaders?: Joi.ObjectSchema;

	/**
	 * A JSON Schema Object representing the expected structure and validation rules for the request body.
	 * This schema is used for data validation if provided.
	 */
	expectedBody?: Joi.ObjectSchema;

	/**
	 * A JSON Schema Object representing the expected structure and validation rules for the request query parameters.
	 * This schema is used for query validation when query parameters are included in the request.
	 */
	expectedQuery?: Joi.ObjectSchema;

	/**
	 * A JSON Schema Object representing the expected structure and validation rules for the request URL parameters.
	 * This schema is used for URL parameter validation when parameters are included in the route.
	 */
	expectedUrlParams?: Joi.ObjectSchema;

	/**
	 * The HTTP method (e.g., GET, POST, PUT, PATCH, DELETE) associated with this endpoint.
	 */
	method: ExpressMethods;

	/**
	 * The API path for this endpoint (e.g., /api/user).
	 */
	path: string;

	/**
	 * An array of middleware functions to be executed sequentially before the endpoint's main function (handler).
	 * Each middleware function takes the Express 'req', 'res', and 'next' objects as parameters.
	 */
	middlewares?: Array<(req: Request, res: Response, next: NextFunction) => void>;

	/**
	 * The main handler function for this endpoint.
	 * This function is executed after all middleware functions and is responsible for processing the request and sending a response.
	 */
	function: (req: Request, res: Response) => void;
};

export type ValidationSchema = {
	schema?: ObjectSchema;
	source: 'body' | 'query' | 'params' | 'headers';
};
