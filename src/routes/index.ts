import { Router } from 'express';

const routes = Router();

routes.get('/', (_:any, res:any) => res.json({ message: 'Hello World!' }));

export default routes;
