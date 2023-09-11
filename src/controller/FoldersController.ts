import { Request, Response } from 'express';
import { FoldersService } from '../services/FoldersService';

class FoldersController {

  async createFolder(request: Request, response: Response) {
    try {
      const { userId, body } = request;
      await new FoldersService().create({userId, ...body});
      return response.sendStatus(204);
    } catch (err) {
      return response.json({error: (err as Error).message});
    }
  }

}

export {FoldersController};
