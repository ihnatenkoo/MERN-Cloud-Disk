import { Router, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import User from '../models/User';

export const authRouter: Router = Router();

authRouter.post(
	'/register',
	[
		check('email', 'Incorrect email').isEmail(),
		check(
			'password',
			'Password must be longer than 3 and shorter than 12 symbols'
		).isLength({ min: 3, max: 12 }),
	],
	async (req: Request, res: Response) => {
		const errors = validationResult(req);
		console.log(errors);

		if (!errors.isEmpty()) {
			return res.status(400).json({ message: `Incorrect request` });
		}

		try {
			const { email, password, avatar } = req.body;

			const isUserExist = await User.find({ email });

			if (isUserExist.length) {
				return res
					.status(400)
					.json({ message: `User with email ${email} already exist` });
			}

			const hashPassword = await bcrypt.hash(password, 15);
			const user = new User({ email, password: hashPassword, avatar });
			await user.save();

			return res.json({ message: 'User was created' });
		} catch (error) {
			console.log(error);
			res.send({ message: 'Server Error' });
		}
	}
);
