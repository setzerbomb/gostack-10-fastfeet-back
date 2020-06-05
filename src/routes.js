import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import RecipientController from './app/controllers/RecipientController';
import DeliveryManController from './app/controllers/DeliveryManController';
import DeliveryController from './app/controllers/DeliveryController';

import UserSchemaValidation from './app/middlewares/validation/UserSchema';
import RecipientSchemaValidation from './app/middlewares/validation/RecipientSchema';
import DeliveryManSchemaValidation from './app/middlewares/validation/DeliveryManSchema';
import DeliverySchemaValidation from './app/middlewares/validation/DeliverySchema';

import authMiddleware from './app/middlewares/auth/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/users', UserSchemaValidation.store, UserController.store);
routes.put('/users', UserSchemaValidation.update, UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.post(
  '/recipients',
  RecipientSchemaValidation.store,
  RecipientController.store
);
routes.put(
  '/recipients/:id',
  RecipientSchemaValidation.update,
  RecipientController.update
);

routes.post(
  '/deliveryman',
  DeliveryManSchemaValidation.store,
  DeliveryManController.store
);
routes.put(
  '/deliveryman/:id',
  DeliveryManSchemaValidation.update,
  DeliveryManController.update
);
routes.delete(
  '/deliveryman/:id',
  DeliveryManSchemaValidation.delete,
  DeliveryManController.delete
);
routes.get('/deliveryman', DeliveryManController.list);

routes.post(
  '/deliveries',
  DeliverySchemaValidation.store,
  DeliveryController.store
);
routes.put(
  '/deliveries/:id',
  DeliverySchemaValidation.update,
  DeliveryController.update
);
routes.delete('/deliveries/:id', DeliveryController.delete);
routes.get('/deliveries', DeliveryController.list);

export default routes;
