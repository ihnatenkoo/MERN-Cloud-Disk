import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './App';
import { FileController } from './controllers/file.controller';
import { AuthController } from './controllers/auth.controller';
import { TYPES } from './types';
import { FileService } from './services/file.service';

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<App>(TYPES.Application).to(App);
	bind<FileController>(TYPES.FileController).to(FileController);
	bind<AuthController>(TYPES.AuthController).to(AuthController);
	bind<FileService>(TYPES.FileService).to(FileService);
});

const start = async () => {
	const appContainer = new Container();
	appContainer.load(appBindings);

	const app = appContainer.get<App>(TYPES.Application);

	try {
		await app.init();
	} catch (error) {
		console.log(error);
	}
};

start();
