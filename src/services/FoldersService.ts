import { INewFolder } from '../types/types';
import { FoldersRepository } from '../repositories/FoldersRepository';

class FoldersService {

  async getAllFolders(userId: string) {
    const folders = await new FoldersRepository().findAllFolders(userId);

    return folders;
  }

  async getFolder(userId: string, folderId: string) {
    await this.validateFolderOwenership(userId, folderId);
    const folder = await new FoldersRepository().findFolder(userId, folderId);
    if (!folder) {
      throw new Error('Folder not found');
    }

    return folder;
  }

  async create(newFolder: INewFolder) {
    const {userId, name, description} = newFolder;

    await new FoldersRepository().create({
      userId, name, description
    });

  }

  async validateFolderOwenership(userId: string, folderId: string) {
    const isOwner = await new FoldersRepository().validateFolderOwner(userId, folderId);
    if (!isOwner) {
      throw new Error('Bank account not found');
    }
  }

}

export {FoldersService};
