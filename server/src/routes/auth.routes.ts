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

		console.log(user);
		res.status(200).json('Authorized');
	} catch (error) {
		console.log(error);
		res.send({ message: 'Server Error' });
	}
});
