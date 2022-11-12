import { Router } from 'express';
import { FileController } from '../controllers/file.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const fileRouter: Router = Router();

const fileController = new FileController();

fileRouter.post('/', authMiddleware, fileController.createDir);

export default fileRouter;
