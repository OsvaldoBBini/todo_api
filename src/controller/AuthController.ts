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
      return response.status(201).json({recoverCode});
    }
    catch (err) {
      return response.json({error: (err as Error).message});
    }
  }

  async authenticatePasswordReset(request: Request, response: Response) {
    try {
      const { email } = request;
      const accessToken = await new AuthService().authenticatePasswordReset(email);
      return response.json(accessToken);
    }
    catch (err) {
      return response.json({error: (err as Error).message});
    }
  }

  async resetPassword(request: Request, response: Response) {
    try {
      const { userId } = request;
      const { password } = request.body;

      const user = await new AuthService().resetPassword(userId, password);
      return response.status(204).json(user);
    }
    catch (err) {
      return response.json({error: (err as Error).message});
    }
  }

}

export {AuthController};
