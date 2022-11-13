import { Router } from 'express';
import { IControllerRoute } from './route.interface';

export abstract class BaseController {
	private readonly _router: Router;

	constructor() {
		this._router = Router();
	}

	protected bindRoutes(routes: Array<IControllerRoute>): void {
		for (const route of routes) {
			console.log(`[${route.method}]: ${route.path}`);
			const handler = route.handler.bind(this);
			const middleware = route.middlewares?.map((m) => m.execute.bind(m));
			const pipeline = middleware ? [...middleware, handler] : handler;
			this._router[route.method](route.path, pipeline);
		}
	}
}
