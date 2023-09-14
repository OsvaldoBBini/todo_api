import { INewFolder } from '../types/types';
import { FoldersRepository } from '../repositories/FoldersRepository';

class FoldersService {

  async getAllFolders(userId: string) {
    const folders = await new FoldersRepository().findAllFolders(userId);
    return folders;
  }

  async create(newFolder: INewFolder) {
    const {userId, name, description} = newFolder;
    await new FoldersRepository().create({
      userId, name, description
    });
    return null;
  }

}

export {FoldersService};
