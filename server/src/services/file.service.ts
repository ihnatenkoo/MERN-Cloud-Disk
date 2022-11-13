import fs from 'fs';
import { injectable } from 'inversify';

@injectable()
export class FileService {
	createDir(file: any) {
		const filePath = `${__dirname}\\../files\\${file.user}\\${file.path}`;
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
}
