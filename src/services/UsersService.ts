import { UsersRepository } from '../repositories/UsersRepository';
import { IUserInfos } from '../types/types';

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
  }

}

export {UsersService};
