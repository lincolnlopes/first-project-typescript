import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';
import User from '../models/User';
import { sign } from 'jsonwebtoken';

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
      throw new Error('Incorrrect email/password combination.');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrrect email/password combination.');
    }

    const token = sign({}, 'lincoln-k3y', {
      subject: user.id,
      expiresIn: '1d',
    });
    return { user, token };
  }
}

export default AuthenticateUserServices;
