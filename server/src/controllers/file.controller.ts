import { Request, Response } from 'express';
import File from '../models/File';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { FileService } from '../services/file.service';
import { ExpressReturnType } from '../common/route.interface';
import { BaseController } from '../common/base.controller';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';

@injectable()
export class FileController extends BaseController {
	constructor(@inject(TYPES.FileService) private fileService: FileService) {
		super();
		this.bindRoutes([
			{
				path: '/',
				method: 'post',
				handler: this.createDir,
				middlewares: [new AuthMiddleware()],
			},
			{
				path: '/',
				method: 'get',
				handler: this.getFiles,
				middlewares: [new AuthMiddleware()],
			},
		]);
	}

	async createDir(
		req: Request,
		res: Response
	): Promise<ExpressReturnType | undefined> {
		try {
			const { name, type, parent } = req.body;
			const file = new File({ name, type, parent, user: req.user.id });
			const parentFile = await File.findOne({
				_id: parent,
			});

			if (!parentFile) {
				file.path = name;
				await this.fileService.createDir(file);
			} else {
				file.path = `${parentFile.path}\\${file.name}`;
				await this.fileService.createDir(file);
				parentFile.children.push(file.id);
				await parentFile.save();
			}
			await file.save();
			return res.json(file);
		} catch (e) {
			console.log(e);
			res.status(400).json(e);
		}
	}

	async getFiles(req: Request, res: Response): Promise<void> {
		try {
			const files = await File.find({
				user: req.user.id,
				parent: req.query.parent,
			});
			res.status(200).json(files);
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: 'Fetch files error' });
		}
	}
}
