import { App } from './App';
import { FileController } from './controllers/file.controller';
import { AuthController } from './controllers/auth.controller';

const start = async () => {
	const app = new App(new FileController(), new AuthController());

	try {
		await app.init();
	} catch (error) {
		console.log(error);
	}
};

start();
