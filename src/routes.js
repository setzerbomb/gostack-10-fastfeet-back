import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';

import UserSchemaValidation from './app/middlewares/validation/UserSchema';

import authMiddleware from './app/middlewares/auth/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserSchemaValidation.store, UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserSchemaValidation.update, UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;