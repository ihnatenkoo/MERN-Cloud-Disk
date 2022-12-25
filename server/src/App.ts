import express, { Express } from 'express';
import { Server } from 'http';
import config from 'config';
import mongoose from 'mongoose';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from './types';
import { FileController } from './controllers/file.controller';
import { AuthController } from './controllers/auth.controller';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;
	dbURL: string;

	constructor(
		@inject(TYPES.FileController) private fileController: FileController,
		@inject(TYPES.AuthController) private authController: AuthController
	) {
		this.app = express();
		this.port = config.get('serverPort');
		this.dbURL = config.get('dbURL');
	}

	route() {
		this.app.use('/api/files', this.fileController.router);
		this.app.use('/api/auth', this.authController.router);
	}

	middleware(): void {
		this.app.use(cors());
		this.app.use(express.json());
		this.app.use(fileUpload({}));
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
