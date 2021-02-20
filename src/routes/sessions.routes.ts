import { Router } from 'express';

import AuthenticateUserServices from '../services/AuthenticateUserServices';

const sessstionsRouter = Router();

sessstionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticateUserServices = new AuthenticateUserServices();

    const { user } = await authenticateUserServices.execute({
      email,
      password,
    });

    //@ts-expect-error
    delete user.password;

    return response.json({ user });
  } catch (e) {
    return response.status(400).json({ message: e.message });
  }
});

export default sessstionsRouter;
