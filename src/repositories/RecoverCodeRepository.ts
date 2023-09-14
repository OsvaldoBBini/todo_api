import { IRecoverCode }  from '../types/types';
import prismaClient from '../prisma';

class RecoverCodeRepository {

  async create(newRecoverCode: IRecoverCode) {
    const recoverObject = await prismaClient.recoverCodes.create({data: newRecoverCode});
    return recoverObject;
  }

  async findCodeByEmail(email: string) {
    const recoverCode = await prismaClient.recoverCodes.findUnique({
      where:{
        email
      },
      select: {
        code: true,
        expirationTime: true
      }
    });
    return recoverCode;
  }

  async delete(email: string) {
    const deletedRecoverCode = await prismaClient.recoverCodes.delete({
      where: {
        email
      }
    });
    return deletedRecoverCode;
  }

}

export {RecoverCodeRepository};
