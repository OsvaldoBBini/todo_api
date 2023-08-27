import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'node:path';

export function uploadPicture(request: Request, response: Response, next: NextFunction) {
  const { userId } = request;

  const upload = multer({
    storage: multer.diskStorage({
      destination(req, file, callback){
        callback(null, path.resolve(__dirname, '..', '..', 'uploads'));
      },
      filename(req, file, callback){
        callback(null, `${userId}.png`);
      }
    }),
  });

  upload.single('profilePicture')(request, response, () => {
    try {
      if (request.file) {
        request.profilePicturePath = request.file.path;
        return next();
      }
      request.profilePicturePath = '';
      return next();
    }
    catch {
      throw new Error('Unable to load the profile picture');
    }
  });
}
