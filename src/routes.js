import { Router } from 'express';
import multer from 'multer';

import UserController from './app/controllers/UserController';
import ControleSessao from './app/controllers/ControleSessao';
import FileController from './app/controllers/FileController';
import MeetupControler from './app/controllers/MeetupController';
import SubscriptionController from './app/controllers/SubscriptionController';
import ScheduleController from './app/controllers/ScheduleController';

import multerConfig from './config/multer';

import okMiddleware from './app/middlewares/autenticacao';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', ControleSessao.store);

routes.get('/schedule', ScheduleController.index);

routes.use(okMiddleware);

routes.post('/subscriptions/:id', SubscriptionController.store);
routes.get('/subscriptions', SubscriptionController.index);

routes.post('/meetups', MeetupControler.store);
routes.put('/meetups/', MeetupControler.update);
routes.get('/meetups', MeetupControler.index);
routes.delete('/meetups/:id', MeetupControler.delete);

routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
