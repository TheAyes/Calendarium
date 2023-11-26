import { NextFunction, Request, Response } from 'express';
import { ValidationSchema } from '../types/types';

export const validateRequest =
	(...validationSchemas: ValidationSchema[]) =>
	(req: Request, res: Response, next: NextFunction) => {
		for (const { schema, source } of validationSchemas) {
			if (schema) {
				const { error } = schema.validate(req[source]);
				if (error) {
					res.status(400).send({ error: error.details[0].message });
					return;
				}
			}
		}
		next();
	};
