import prismaClient from '../prisma';
import { INewUser, IUpdateUserInfos } from '../types/types';

class UsersRepository {

  async create(newUser: INewUser) {
    const user =  await prismaClient.users.create({data: newUser});
    return user;
  }

  async findByEmail(email: string) {
    const user = await prismaClient.users.findUnique({
      where: {email}
    });
    return user;
  }

  async findById(userId: string) {
    const user = await prismaClient.users.findUnique({
      where: { id: userId }
    });
    return user;
  }

  async updateUserInfos(userId: string, updateUserData: IUpdateUserInfos) {

    const {name, email, profilePicture} = updateUserData;

    const user = await prismaClient.users.update({
      where: {
        id: userId
      },
      data: {
        name,
        email,
        profilePicture
      }
    });
    return user;
  }

  async updateUserPassword(userId: string, password: string) {
    const user = await prismaClient.users.update({
      where: {
        id: userId
      },
      data: {
        password
      }
    });
    return user;
  }

}

export {UsersRepository};
