import { create } from 'domain';
import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

const userRouter = Router();

userRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, password });

    //@ts-expect-error
    delete user.password;

    return response.json(user);
  } catch (e) {
    return response.status(400).json({ message: e.message });
  }
});

export default userRouter;
