import { Request, Response } from 'express';
import { FoldersService } from '../services/FoldersService';

class FoldersController {

  async listAllFoldersByUserId(request: Request, response: Response) {
    try {
      const { userId } = request;
      const folders = await new FoldersService().getAllFolders(userId);
      return response.json(folders);
    } catch (err) {
      return response.json({error: (err as Error).message});
    }
  }

  async showFolder(request: Request, response: Response) {
    try {
      const { userId } = request;
      const { folderId } = request.params;
      const folder = await new FoldersService().getFolder(userId, folderId);
      return response.json(folder);
    } catch (err) {
      return response.json({error: (err as Error).message});
    }
  }

  async createNewFolder(request: Request, response: Response) {
    try {
      const { userId } = request;
      const {name, description} = request.body;
      const folder = await new FoldersService().createFolder({userId, name, description});
      return response.status(204).json(folder);
    } catch (err) {
      return response.json({error: (err as Error).message});
    }
  }

  async updateFolder(request: Request, response: Response) {
    try {
      const { userId } = request;
      const { folderId } = request.params;
      const { name, description } = request.body;
      const folder = await new FoldersService().updateFolderInfos(userId, folderId, name, description);
      return response.status(204).json(folder);
    } catch (err) {
      return response.json({error: (err as Error).message});
    }
  }

  async deleteFolder(request: Request, response: Response) {
    try {
      const { userId } = request;
      const { folderId } = request.params;
      const folder = await new FoldersService().deleteFolder(userId, folderId);
      return response.status(204).json(folder);
    } catch (err) {
      return response.json({error: (err as Error).message});
    }
  }

}

export {FoldersController};
