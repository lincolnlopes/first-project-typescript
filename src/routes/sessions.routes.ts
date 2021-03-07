import { Router } from 'express';

import AuthenticateUserServices from '../services/AuthenticateUserService';

const sessstionsRouter = Router();

sessstionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticateUserServices = new AuthenticateUserServices();

    const { user, token } = await authenticateUserServices.execute({
      email,
      password,
    });

    //@ts-expect-error
    delete user.password;

    return response.json({ user, token });
  } catch (err) {
    return response.status(err.statusCode).json({ message: err.message });
  }
});

export default sessstionsRouter;
