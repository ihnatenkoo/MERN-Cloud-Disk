import { App } from './App';

const start = async () => {
	const app = new App();

	try {
		await app.init();
	} catch (error) {
		console.log(error);
	}
};

start();
