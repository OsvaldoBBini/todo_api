import prismaClient from '../prisma';
import { User } from '../types';

class UsersRepository {

  async create({name,email, password, profilePicture}: User) {
    const newUser = {name, email, password, profilePicture};
    const user =  await prismaClient.users.create({data: newUser});
    return user;
  }

  async findByEmail(email: string) {
    const user = await prismaClient.users.findUnique({
      where: {email},
      select: {id: true}
    });
    return user;
  }

}

export {UsersRepository};
