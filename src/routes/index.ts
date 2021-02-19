import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.get('/', (_: any, res: any) => res.json({ message: 'Hello World!' }));

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);

export default routes;
