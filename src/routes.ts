import { Router } from 'express';

import { AuthController } from './controller/AuthController';
import { UserController } from './controller/UserController';

import { ensureAuthenticated } from './middleware/ensureAuthenticated';
import { uploadPicture } from './middleware/uploadPicture';
import { ensureRecoverCode } from './middleware/ensureRecoverCode';

export const router = Router();

router.post('/signup', new AuthController().signup);
router.post('/signin', new AuthController().signin);

router.post('/recover_password', new AuthController().recoverPassword);
router.post('/authenticate_password_update', ensureRecoverCode, new AuthController().authenticatePasswordReset);
router.post('/reset_password', ensureAuthenticated, new AuthController().resetPassword);


router.get('/user/me', ensureAuthenticated, new UserController().getUser);
router.patch('/user/me', ensureAuthenticated, uploadPicture, new UserController().updateUser);

