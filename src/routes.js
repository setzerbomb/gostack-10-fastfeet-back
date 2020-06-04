import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import RecipientsController from './app/controllers/RecipientsController';

import UserSchemaValidation from './app/middlewares/validation/UserSchema';
import RecipientsSchemaValidation from './app/middlewares/validation/RecipientsSchema';

import authMiddleware from './app/middlewares/auth/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserSchemaValidation.store, UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserSchemaValidation.update, UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.post(
  '/recipients',
  RecipientsSchemaValidation.store,
  RecipientsController.store
);
routes.put(
  '/recipients/:id',
  RecipientsSchemaValidation.update,
  RecipientsController.update
);

export default routes;
