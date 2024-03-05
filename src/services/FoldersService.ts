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

  async createFolder(newFolder: INewFolder) {
    const {userId, name, description} = newFolder;
    try {
      await new FoldersRepository().create({
        userId, name, description
      });
    } catch {
      throw new Error('The system was unable to create the folder');
    }
    return null;
  }

  async updateFolderInfos(userId: string, folderId: string, name: string, description: string) {
    await this.validateFolderOwenership(userId, folderId);
    const updateInfos = {name, description};
    try {
      await new FoldersRepository().update(userId, folderId, updateInfos);
    } catch {
      throw new Error('The system was unable to upload folder\'s data');
    }
    return null;
  }

  async deleteFolder(userId: string, folderId: string) {
    await this.validateFolderOwenership(userId, folderId);
    try {
      await new FoldersRepository().delete(userId, folderId);
    } catch {
      throw new Error('The system was unable to delete the folder');
    }
    return null;
  }

  async validateFolderOwenership(userId: string, folderId: string) {
    const isOwner = await new FoldersRepository().validateFolderOwner(userId, folderId);
    if (!isOwner) {
      throw new Error('Folder not found');
    }
  }

}

export {FoldersService};
