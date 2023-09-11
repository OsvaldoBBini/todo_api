import prismaClient from '../prisma';
import { INewFolder } from '../types/types';

class FoldersRepository {

  async create(newFolder: INewFolder) {
    await prismaClient.folders.create({data: newFolder});
    return null;
  }

}

export {FoldersRepository};
