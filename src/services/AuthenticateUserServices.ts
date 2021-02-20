import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';
import User from '../models/User';

interface IUser {
  email: string;
  password: string;
}
class AutenticateUserServices {
  public async execute({ email, password }: IUser): Promise<{ user: User }> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Incorrrect email/password combination.');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrrect email/password combination.');
    }
    return { user };
  }
}

export default AutenticateUserServices;
