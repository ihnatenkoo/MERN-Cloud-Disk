import express from 'express';
import mongoose from 'mongoose';
import config from 'config';
import cors from 'cors';
import { authRouter } from './routes/auth.routes';

const app = express();
const PORT = config.get('serverPort');

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);

const start = async () => {
	try {
		await mongoose.connect(config.get('dbURL'));

		app.listen(PORT, () => {
			console.log('Server started on port ', PORT);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
