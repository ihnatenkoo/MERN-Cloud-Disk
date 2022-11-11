import jwt from 'jsonwebtoken';
import config from 'config';
import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (req.method === 'OPTION') {
		return next();
	}

	try {
		const token = req.headers.authorization?.split(' ')[1];
		if (!token) {
			return res.status(401).json({ message: 'Auth error' });
		}

		const decoder = jwt.verify(token, config.get('secret-key'));

		req.user = decoder;
		next();
	} catch (error) {
		return res.status(401).json({ message: 'Auth error' });
	}
};
