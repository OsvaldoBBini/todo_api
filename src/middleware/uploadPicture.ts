import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'node:path';
import fs from 'fs';

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

      if (!request.file) {
        fs.unlinkSync(path.resolve(__dirname, '..', '..', `uploads\\${userId}.png`));
        request.profilePicturePath = '';
        return next();
      }

      request.profilePicturePath = request.file.path;
      return next();
    }
    catch {
      return response.status(400).json({error: 'Unable to load the profile picture'});
    }
  });
}
