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
      where: { id: userId },
      select: { name: true, email: true, profilePicture: true }
    });
    return user;
  }

  async findUserPassword(userId: string) {
    const password = await prismaClient.users.findUnique({
      where: {id: userId},
      select: { password: true }
    });
    return password;
  }

  async updateUserInfos(userId: string, updateUserData: IUpdateUserInfos) {

    const {name, email, profilePicture} = updateUserData;

    await prismaClient.users.update({
      where: {
        id: userId
      },
      data: {
        name,
        email,
        profilePicture
      }
    });
    return null;
  }

  async updateUserPassword(userId: string, password: string) {
    await prismaClient.users.update({
      where: {
        id: userId
      },
      data: {
        password
      }
    });
    return null;
  }

  async deleteUserAccount(userId: string) {
    await prismaClient.users.delete({
      where: {
        id: userId
      }
    });
    return null;
  }

}

export {UsersRepository};
