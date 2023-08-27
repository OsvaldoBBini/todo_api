import { Router } from 'express';

import { AuthController } from './controller/AuthController';
import { UserController } from './controller/UserController';

import { ensureAuthenticated } from './middleware/ensureAuthenticated';
import { uploadPicture } from './middleware/uploadPicture';

export const router = Router();

router.post('/signup', new AuthController().signup);
router.post('/signin', new AuthController().signin);

router.get('/user/me', ensureAuthenticated, new UserController().getUser);
router.put('/user/me', ensureAuthenticated, uploadPicture);

