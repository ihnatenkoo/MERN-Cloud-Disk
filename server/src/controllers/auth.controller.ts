import { Request, Response } from 'express';
import config from 'config';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User';
import File from '../models/File';
import { authMiddleware } from '../middlewares/auth.middleware';
import { FileService } from '../services/file.service';
import { BaseController } from '../common/base.controller';

export class AuthController extends BaseController {
	fileService: FileService;
	constructor() {
		super();
		this.bindRoutes([
			{
				path: '/',
				method: 'get',
				handler: this.checkAuth,
				middlewares: [new authMiddleware()],
			},
			{
				path: '/register',
				method: 'post',
				handler: this.register,
			},
			{
				path: '/login',
				method: 'post',
				handler: this.login,
			},
		]);
		this.fileService = new FileService();
	}

	async register(req: Request, res: Response) {
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

			await this.fileService.createDir(new File({ user: user.id, name: '' }));
			return res.json({ message: 'User was created' });
		} catch (error) {
			console.log(error);
			res.send({ message: 'Server Error' });
		}
	}

	async login(req: Request, res: Response) {
		try {
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

	async checkAuth(req: Request, res: Response) {
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
	}
}
