import { Router } from 'express';
import appointmentsRouter from './appointments.routes';

const routes = Router();

routes.get('/', (_: any, res: any) => res.json({ message: 'Hello World!' }));

routes.use('/appointments', appointmentsRouter);

export default routes;
