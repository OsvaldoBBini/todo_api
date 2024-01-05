import { UsersRepository } from '../repositories/UsersRepository';
import { IUserInfos } from '../types/types';
import { compare } from 'bcryptjs';

class UsersService {

  async getUserById(userId: string) {
    const user = await new UsersRepository().findById(userId);
    return user;
  }

  async update(userId: string, userUpdateInfos: IUserInfos) {
    const { name, email, profilePicture} = userUpdateInfos;
    const emailTaken = await new UsersRepository().findByEmail(email);

    if (emailTaken && emailTaken.id !== userId)
    {
      throw new Error('This email is already in use');
    }

    await new UsersRepository().updateUserInfos(userId, {name, email, profilePicture});
    return null;
  }

  async deleteAccount(userId: string, password: string) {
    const user = await new UsersRepository().findUserPassword(userId);

    if (user) {
      const passwordValidation = await compare(password, user.password);

      if (!passwordValidation) {
        throw new Error('Incorrect password, please try again!');
      }
    }

    await new UsersRepository().deleteUserAccount(userId);
    return null;
  }

}

export {UsersService};
