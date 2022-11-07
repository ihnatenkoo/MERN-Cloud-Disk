import { Router } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';

export const authRouter: Router = Router();

authRouter.post('/register', async (req, res) => {
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
});
