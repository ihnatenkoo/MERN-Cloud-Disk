import { Router, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import config from 'config';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { authMiddleware } from '../middlewares/auth.middleware';
import { FileService } from '../services/file.service';
import File from '../models/File';

export const authRouter: Router = Router();
const fileService = new FileService();

authRouter.post(
	'/register',
	[
		check('name', 'Too short name').isLength({ min: 3 }),
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

			const isUserExist = await User.findOne({ email });

			if (isUserExist) {
				return res
					.status(400)
					.json({ message: `User with email ${email} already exist` });
			}

			const hashPassword = await bcrypt.hash(password, 8);
			const user = new User({ name, email, password: hashPassword });
			await user.save();

			await fileService.createDir(new File({ user: user.id, name: '' }));
			return res.json({ message: 'User was created' });
		} catch (error) {
			console.log(error);
			res.send({ message: 'Server Error' });
		}
	}
);

authRouter.post(
	'/login',
	[
		check('email', 'Incorrect email').isEmail(),
		check(
			'password',
			'Password must be longer than 3 and shorter than 12 symbols'
		).isLength({ min: 3, max: 12 }),
	],
	async (req: Request, res: Response) => {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(401).json({ message: `Incorrect login data` });
			}

			const { email, password } = req.body;
			const user = await User.findOne({ email });

			if (!user) {
				return res
					.status(404)
					.json({ message: `User with email ${email} not found` });
			}

			const isPassValid = bcrypt.compareSync(password, user.password);

			if (!isPassValid) {
				return res.status(401).json({ message: 'Invalid password' });
			}

			const token = jwt.sign({ id: user.id }, config.get('secret-key'), {
				expiresIn: '1h',
			});

			res.json({
				token,
				user: {
					name: user.name,
					id: user.id,
					email: user.email,
					diskSpace: user.diskSpace,
					usedSpace: user.usedSpace,
					avatar: user.avatar,
				},
			});
		} catch (error) {
			console.log(error);
			res.send({ message: 'Server Error' });
		}
	}
);

authRouter.get('/', authMiddleware, async (req: Request, res: Response) => {
	try {
		const user = await User.findOne({ _id: req.user.id });

		if (!user) {
			return res.status(404);
		}

		const token = jwt.sign({ id: user.id }, config.get('secret-key'), {
			expiresIn: '1h',
		});

		return res.json({
			token,
			user: {
				name: user.name,
				id: user.id,
				email: user.email,
				diskSpace: user.diskSpace,
				usedSpace: user.usedSpace,
				avatar: user.avatar,
			},
		});
	} catch (error) {
		res.send({ message: 'Server Error' });
	}
});
