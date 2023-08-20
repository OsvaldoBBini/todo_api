import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface Payload {
  sub: string
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const accessToken = request.headers.authorization;
  const jwtSecret = process.env.JWT_SECRET;

  if(!accessToken) {
    return response.status(403).json({
      error: 'Invalid Token',
    });
  }

  const [, token] = accessToken.split(' ');
  try{
    if (jwtSecret) {
      const { sub } = verify(token, jwtSecret) as Payload;
      request.userId = sub;
      return next();
    }
  }
  catch{
    return response.status(401).json({errorCode: 'token expired'});
  }

}
