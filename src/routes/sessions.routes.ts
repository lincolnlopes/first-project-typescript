import { Router } from 'express';

import AuthenticateUserServices from '../services/AuthenticateUserService';

const sessstionsRouter = Router();

sessstionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUserServices = new AuthenticateUserServices();

  const { user, token } = await authenticateUserServices.execute({
    email,
    password,
  });

  //@ts-expect-error
  delete user.password;

  return response.json({ user, token });
});

export default sessstionsRouter;
