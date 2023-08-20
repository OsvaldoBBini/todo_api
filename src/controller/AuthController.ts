import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

class AuthController {

  async signup (request: Request, response: Response) {
    try{
      const { body } = request;
      const accessToken = await new AuthService().signup(body);
      return response.json(accessToken);
    }
    catch (err) {
      return response.json({error: (err as Error).message});
    }
  }

  async signin (request: Request, response: Response) {
    try{
      const { body } = request;
      const accessToken = await new AuthService().signin(body);
      return response.json(accessToken);
    }
    catch (err) {
      return response.json({error: (err as Error).message});
    }
  }

}

export {AuthController};
