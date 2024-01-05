import { Request, Response, NextFunction } from 'express';
import { RecoverCodeRepository } from '../repositories/RecoverCodeRepository';
import { compare } from 'bcryptjs';
import { UsersRepository } from '../repositories/UsersRepository';

export async function ensureRecoverCode(request: Request, response: Response, next: NextFunction) {
  const {recoverCode, email} = request.body;

  try {

    const validateUser = await new UsersRepository().findByEmail(email);

    if (!validateUser) {
      throw new Error('User not found');
    }

    const currentDate = new Date();
    const recoverObject = await new RecoverCodeRepository().findCodeByEmail(email);

    if (recoverObject){

      if (currentDate > recoverObject?.expirationTime){
        throw new Error('Code has expired');
      }

      const isRecoverCodeValid = await compare(recoverCode, recoverObject.code);

      if(!isRecoverCodeValid) {
        throw new Error('Invalid recover code');
      }

      request.email = email;
      return next();
    }

  }
  catch (err) {
    return response.status(401).json({error: (err as Error).message});
  }
}
