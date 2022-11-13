import express, { Express } from 'express';
import { Server } from 'http';
import config from 'config';
import mongoose from 'mongoose';
import cors from 'cors';
import { FileController } from './controllers/file.controller';
import { AuthController } from './controllers/auth.controller';

export class App {
	app: Express;
	server: Server;
	port: number;
	dbURL: string;
	fileController: FileController;
	authController: AuthController;

	constructor(fileController: FileController, authController: AuthController) {
		this.app = express();
		this.port = config.get('serverPort');
		this.dbURL = config.get('dbURL');
		this.fileController = fileController;
		this.authController = authController;
	}

	route() {
		this.app.use('/api/files', this.fileController.router);
		this.app.use('/api/auth', this.authController.router);
	}

	middleware(): void {
		this.app.use(cors());
		this.app.use(express.json());
	}

	async init(): Promise<void> {
		this.middleware();
		this.route();
		await mongoose.connect(this.dbURL);
		this.server = this.app.listen(this.port, () =>
			console.log('Server started on port ', this.port)
		);
	}
}
