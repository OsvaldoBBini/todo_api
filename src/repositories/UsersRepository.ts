import prismaClient from '../prisma';

interface NewUser {
  name: string,
  email: string,
  password: string,
  profilePicture: string | null
}

class UsersRepository {

  async create(newUser: NewUser) {
    const user =  await prismaClient.users.create({data: newUser});
    return user;
  }

  async findByEmail(email: string) {
    const user = await prismaClient.users.findUnique({
      where: {email},
      select: {
        id: true,
        name: true,
        email: true ,
        password: true,
        profilePicture: true}
    });
    return user;
  }

  async findById(userId: string) {
    const user = await prismaClient.users.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
        profilePicture: true,
        folders: true }
    });
    return user;
  }

}

export {UsersRepository};
