import prismaClient from '../prisma';
import { INewFolder, IUpdateFolderInfos } from '../types/types';

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
        id: true,
        tasks: true
      }
    });
    return folder;
  }

  async create(newFolder: INewFolder) {
    const folder = await prismaClient.folders.create({data: newFolder});
    return folder;
  }

  async update(userId: string, folderId: string, updateFolderInfo: IUpdateFolderInfos) {
    const { name, description } = updateFolderInfo;
    await prismaClient.folders.update({where: {userId, id: folderId}, data: {name, description}});
    return null;
  }

  async delete(userId: string, folderId: string) {
    await prismaClient.folders.delete({where: {id: folderId, userId}});
    return null;
  }

  async validateFolderOwner(userId: string, folderId: string) {
    const isOwner = await prismaClient.folders.findUnique({
      where: { id: folderId, userId },
    });
    return isOwner;
  }

}

export {FoldersRepository};
