import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';
import User from '../models/User';
import authConfig from '../config/auth';
import { sign } from 'jsonwebtoken';

import AppError from '../errors/AppError';

interface IResponse {
  user: User;
  token: string;
}

interface IRequest {
  email: string;
  password: string;
}
class AuthenticateUserServices {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError('Incorrrect email/password combination.', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrrect email/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });
    return { user, token };
  }
}

export default AuthenticateUserServices;
