import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { FileService } from '../services/file.service';
import { ExpressReturnType } from '../common/route.interface';
import { BaseController } from '../common/base.controller';
import { inject, injectable } from 'inversify';
import fs from 'fs';
import { TYPES } from '../types';
import File from '../models/File';
import User from '../models/User';

enum SORT_TYPES {
	NAME = 'name',
	TYPE = 'type',
	DATE = 'date',
}

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
				path: '/upload',
				method: 'post',
				handler: this.uploadFile,
				middlewares: [new AuthMiddleware()],
			},
			{
				path: '/download',
				method: 'get',
				handler: this.downloadFile,
				middlewares: [new AuthMiddleware()],
			},
			{
				path: '/',
				method: 'delete',
				handler: this.deleteFile,
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
			const { sort } = req.query;
			let files;

			switch (sort) {
				case SORT_TYPES.NAME:
					files = await File.find({
						user: req.user.id,
						parent: req.query.parent,
					}).sort({ name: 1 });
					break;

				case SORT_TYPES.TYPE:
					files = await File.find({
						user: req.user.id,
						parent: req.query.parent,
					}).sort({ type: 1 });
					break;

				case SORT_TYPES.DATE:
					files = await File.find({
						user: req.user.id,
						parent: req.query.parent,
					}).sort({ date: 1 });
					break;

				default:
					files = await File.find({
						user: req.user.id,
						parent: req.query.parent,
					});
			}

			res.status(200).json(files);
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: 'Fetch files error' });
		}
	}

	async uploadFile(req: Request, res: Response) {
		try {
			const file = req.files?.file as UploadedFile;

			const parent = await File.findOne({
				user: req.user.id,
				_id: req.body.parent,
			});

			const user = await User.findOne({ _id: req.user.id });

			if (user) {
				if (user?.usedSpace + file?.size > user?.diskSpace) {
					return res
						.status(400)
						.json({ message: 'There ne space on the disk' });
				}
				user.usedSpace += file?.size;
			}

			let path;
			if (parent) {
				path = `${__dirname}\\../files\\${user?.id}\\${parent.path}\\${file?.name}`;
			} else {
				path = `${__dirname}\\../files\\${user?.id}\\${file?.name}`;
			}

			if (fs.existsSync(path)) {
				return res.status(400).json({ message: 'File already exists' });
			}

			file?.mv(path);

			const type = file?.name.split('.').pop();
			let filePath = file.name;
			if (parent) {
				filePath = parent.path + '\\' + file.name;
			}

			const dbFile = new File({
				name: file?.name,
				type,
				size: file.size,
				path: filePath,
				parent: parent?._id,
				user: user?._id,
			});

			await dbFile.save();
			await user?.save();

			res.json(dbFile);
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: 'Upload error' });
		}
	}

	async downloadFile(req: Request, res: Response) {
		try {
			const file = await File.findOne({ _id: req.query.id, user: req.user.id });
			const path = `${__dirname}\\../files\\${req.user.id}\\${file?.path}`;

			if (file && fs.existsSync(path)) {
				return res.download(path, file.name);
			}

			return res.status(400).json({ message: 'File not found' });
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: 'Download Error' });
		}
	}

	async deleteFile(req: Request, res: Response) {
		try {
			const file = await File.findOne({ _id: req.query.id, user: req.user.id });

			if (!file) {
				return res.status(400).json({ message: 'File not found' });
			}

			this.fileService.deleteFile(file);
			await file?.remove();
			return res.json({ message: 'File deleted' });
		} catch (error) {
			console.log(error);
			return res.status(400).json({ message: 'Dir is not empty' });
		}
	}
}
