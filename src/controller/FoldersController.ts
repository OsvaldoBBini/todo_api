import { Request, Response } from 'express';
import { FoldersService } from '../services/FoldersService';

class FoldersController {

  async findAllFoldersByUserId(request: Request, response: Response) {
    try {
      const { userId } = request;
      const folders = await new FoldersService().getAllFolders(userId);
      return response.json(folders);
    } catch (err) {
      return response.json({error: (err as Error).message});
    }
  }

  async findFolder(request: Request, response: Response) {
    try {
      const { userId } = request;
      const { folderId } = request.params;
      const folder = await new FoldersService().getFolder(userId, folderId);
      return response.json(folder);
    } catch (err) {
      return response.json({error: (err as Error).message});
    }
  }

  async createFolder(request: Request, response: Response) {
    try {
      const { userId } = request;
      const {name, description} = request.body;
      const folder = await new FoldersService().create({userId, name, description});
      return response.sendStatus(204).json(folder);
    } catch (err) {
      return response.json({error: (err as Error).message});
    }
  }

}

export {FoldersController};
