import fs from 'fs';
import { injectable } from 'inversify';

@injectable()
export class FileService {
	getPath(file: any) {
		return `${__dirname}\\../files\\${file.user}\\${file.path}`;
	}

	createDir(file: any) {
		const filePath = this.getPath(file);
		return new Promise((resolve, reject) => {
			try {
				if (!fs.existsSync(filePath)) {
					fs.mkdirSync(filePath);
					return resolve({ message: 'Folder was created' });
				} else {
					return reject({ message: 'Folder already exist' });
				}
			} catch (error) {
				console.log(error);
				return reject({ message: 'Folder created error' });
			}
		});
	}

	deleteFile(file: any) {
		const path = this.getPath(file);
		if (file.type == 'dir') {
			fs.rmdirSync(path);
		} else {
			fs.unlinkSync(path);
		}
	}
}
