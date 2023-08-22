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
}

export {UserController};
