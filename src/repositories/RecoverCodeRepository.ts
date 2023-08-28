import { IResetCode }  from '../types/types';
import prismaClient from '../prisma';

class RecoverCodeRepository {

  async create(newResetCode: IResetCode) {
    const resetCode =  await prismaClient.resetCodes.create({data: newResetCode});
    return resetCode;
  }

  async findCodeByEmail(email: string) {
    const resetCode = await prismaClient.resetCodes.findUnique({
      where:{
        email
      },
      select: {
        code: true,
        expirationTime: true
      }
    });
    return resetCode;
  }

}

export {RecoverCodeRepository};
