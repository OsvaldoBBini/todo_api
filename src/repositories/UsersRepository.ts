import prismaClient from '../prisma';
import { INewUser } from '../types/types';

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
}

export {UsersRepository};
