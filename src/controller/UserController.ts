import { Request, Response } from 'express';
import { UsersService } from '../services/UsersService';

class UserController {
  async getUser(request: Request, response: Response){
    try {
      const { userId } = request;
      const user = await new UsersService().getUserById(userId);
      return response.json(user);
    }
    catch (err) {
      return response.json({error: (err as Error).message});
    }
  }

  async updateUser(request: Request, response: Response){
    try {
      const { userId, profilePicturePath } = request;
      const { id, name, email } = request.body;

      const updateUserData = {
        id,
        name,
        email,
        profilePicture: profilePicturePath
      };

      const user = await new UsersService().update(userId, updateUserData);
      return response.status(204).json(user);
    }
    catch (err) {
      return response.json({error: (err as Error).message});
    }
  }

}

export {UserController};
