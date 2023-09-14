import prismaClient from '../prisma';
import { INewFolder } from '../types/types';

class FoldersRepository {

  async findAllFolders(userId: string) {
    const folders = await prismaClient.folders.findMany({
      where: {userId}
    });
    return folders;
  }

  async create(newFolder: INewFolder) {
    await prismaClient.folders.create({data: newFolder});
    return null;
  }

}

export {FoldersRepository};
