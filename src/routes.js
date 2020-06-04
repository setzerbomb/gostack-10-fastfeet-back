import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import RecipientsController from './app/controllers/RecipientsController';
import DeliveryMenController from './app/controllers/DeliveryMenController';

import UserSchemaValidation from './app/middlewares/validation/UserSchema';
import RecipientsSchemaValidation from './app/middlewares/validation/RecipientsSchema';
import DeliveryMenSchemaValidation from './app/middlewares/validation/DeliverymenSchema';

import authMiddleware from './app/middlewares/auth/auth';
import DeliverymenSchema from './app/middlewares/validation/DeliverymenSchema';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/users', UserSchemaValidation.store, UserController.store);
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

routes.post(
  '/deliveryman',
  DeliveryMenSchemaValidation.store,
  DeliveryMenController.store
);
routes.put(
  '/deliveryman/:id',
  DeliveryMenSchemaValidation.update,
  DeliveryMenController.update
);
routes.delete(
  '/deliveryman/:id',
  DeliveryMenSchemaValidation.delete,
  DeliveryMenController.delete
);
routes.get('/deliveryman', DeliveryMenController.list);

export default routes;
