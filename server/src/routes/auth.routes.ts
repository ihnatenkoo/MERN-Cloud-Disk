import { Router, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import config from 'config';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
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

		if (!errors.isEmpty()) {
			return res.status(400).json({ message: `Incorrect request` });
		}

		try {
			const { name, email, password } = req.body;

			const isUserExist = await User.find({ email });

			if (isUserExist.length) {
				return res
					.status(400)
					.json({ message: `User with email ${email} already exist` });
			}

			const hashPassword = await bcrypt.hash(password, 8);
			const user = new User({ name, email, password: hashPassword });
			await user.save();

			return res.json({ message: 'User was created' });
		} catch (error) {
			console.log(error);
			res.send({ message: 'Server Error' });
		}
	}
);

authRouter.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.find({ email });

		if (!user.length) {
			return res.status(404).json({ message: 'User not found' });
		}

		const isPassValid = bcrypt.compareSync(password, user[0].password);

		if (!isPassValid) {
			return res.status(401).json({ message: 'Invalid password' });
		}

		const token = jwt.sign({ id: user[0].id }, config.get('secret-key'), {
			expiresIn: '1h',
		});

		res.json({
			token,
			user: {
				id: user[0].id,
				email: user[0].email,
				diskSpace: user[0].diskSpace,
				usedSpace: user[0].usedSpace,
				avatar: user[0].avatar,
			},
		});
	} catch (error) {
		console.log(error);
		res.send({ message: 'Server Error' });
	}
});
