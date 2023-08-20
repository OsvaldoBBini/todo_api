import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

class AuthController {

  async signup (request: Request, response: Response) {
    try{
      const { body } = request;
      const token = await new AuthService().signup(body);
      return response.json(token);
    }
    catch (err) {
      return response.json((err as Error).message);
    }
  }

}

export {AuthController};
