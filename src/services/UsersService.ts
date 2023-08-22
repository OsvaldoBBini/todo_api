import { UsersRepository } from '../repositories/UsersRepository';

class UsersService {

  async getUserById(userId: string) {
    const user = await new UsersRepository().findById(userId);
    return user;
  }

}

export {UsersService};
