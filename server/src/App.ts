import express, { Express } from 'express';
import { Server } from 'http';
import config from 'config';
import mongoose from 'mongoose';
import cors from 'cors';

export class App {
	app: Express;
	server: Server;
	port: number;
	dbURL: string;

	constructor() {
		this.app = express();
		this.port = config.get('serverPort');
		this.dbURL = config.get('dbURL');
	}

	middleware() {
		this.app.use(cors());
		this.app.use(express.json());
	}

	async init() {
		this.middleware();
		await mongoose.connect(this.dbURL);
		this.server = this.app.listen(this.port, () =>
			console.log('Server started on port ', this.port)
		);
	}
}
