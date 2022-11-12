import { Request, Response } from 'express';
import { FileService } from '../services/file.service';
import File from '../models/File';

const fileService = new FileService();
export class FileController {
	async createDir(req: Request, res: Response) {
		try {
			const { name, type, parent } = req.body;
			const file = new File({ name, type, parent, user: req.user.id });
			const parentFile = await File.findOne({
				_id: parent,
			});

			if (!parentFile) {
				file.path = name;
				await fileService.createDir(file);
			} else {
				file.path = `${parentFile.path}\\${file.name}`;
				await fileService.createDir(file);
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
}
