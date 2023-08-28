import { Request, Response, NextFunction } from 'express';
import { RecoverCodeRepository } from '../repositories/RecoverCodeRepository';
import { compare } from 'bcryptjs';

export async function ensureRecoverCode(request: Request, response: Response, next: NextFunction) {
  const {recoverCode, email} = request.body;

  const recoverObject = await new RecoverCodeRepository().findCodeByEmail(email);
  const currentDate = new Date();

  try {
    if (recoverObject){

      if (currentDate > recoverObject?.expirationTime){
        return response.status(401).json({error: 'Code has expired'});
      }

      const isRecoverCodeValid = await compare(recoverCode, recoverObject.code);

      if(!isRecoverCodeValid) {
        return response.status(401).json({error: 'Invalid recover code'});
      }
      return next();
    }
  }
  catch (err) {
    return response.json({error: (err as Error).message});
  }
}
