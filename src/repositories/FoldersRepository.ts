import prismaClient from '../prisma';
import { INewFolder } from '../types/types';

class FoldersRepository {

  async findAllFolders(userId: string) {
    const folders = await prismaClient.folders.findMany({
      where: {userId},
      select: {
        id: true,
        description: true,
        name: true
      }
    });
    return folders;
  }

  async findFolder(userId: string, folderId: string) {
    const folder = await prismaClient.folders.findUnique({
      where: {id: folderId, userId},
      select: {
        userId: false,
        tasks: true
      }
    });
    return folder;
  }

  async create(newFolder: INewFolder) {
    const folder = await prismaClient.folders.create({data: newFolder});
    return folder;
  }

  async validateFolderOwner(userId: string, folderId: string) {
    const isOwner = await prismaClient.folders.findFirst({
      where: { id: folderId, userId },
    });
    return isOwner;
  }

}

export {FoldersRepository};
