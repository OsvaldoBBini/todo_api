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

  async recoverPassword(request: Request, response: Response) {
    try {
      const { email } = request.body;
      const recoverCode = await new AuthService().recoverPassword(email);
      return response.status(204).json(recoverCode);
    }
    catch (err) {
      return response.json({error: (err as Error).message});
    }
  }
}

export {AuthController};
