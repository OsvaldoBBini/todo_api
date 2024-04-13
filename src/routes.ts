import { Router } from 'express';

import { AuthController } from './controller/AuthController';
import { UserController } from './controller/UserController';
import { FoldersController } from './controller/FoldersController';

import { ensureAuthenticated } from './middleware/ensureAuthenticated';
import { uploadPicture } from './middleware/uploadPicture';
import { ensureRecoverCode } from './middleware/ensureRecoverCode';
import { TasksController } from './controller/TasksController';

export const router = Router();

router.post('/signup', new AuthController().signup);
router.post('/signin', new AuthController().signin);

router.post('/recover_password', new AuthController().recoverPassword);
router.post('/authenticate_password_update', ensureRecoverCode, new AuthController().authenticatePasswordReset);
router.post('/reset_password', ensureAuthenticated, new AuthController().resetPassword);

router.get('/user/me', ensureAuthenticated, new UserController().getUser);
router.put('/user/me', ensureAuthenticated, uploadPicture, new UserController().updateUser);
router.delete('/user/me', ensureAuthenticated, new UserController().deleteUserAccount);

router.post('/folders', ensureAuthenticated, new FoldersController().createNewFolder);
router.get('/folders', ensureAuthenticated, new FoldersController().listAllFoldersByUserId);
router.get('/folders/:folderId', ensureAuthenticated, new FoldersController().showFolder);
router.put('/folders/:folderId', ensureAuthenticated, new FoldersController().updateFolder);
router.delete('/folders/:folderId', ensureAuthenticated, new FoldersController().deleteFolder);

router.post('/tasks', ensureAuthenticated, new TasksController().createNewTask);
router.get('/folders/:folderId/:taskId', ensureAuthenticated, new TasksController().showTask);
router.put('/folders/:folderId/:taskId', ensureAuthenticated, new TasksController().updateTask);
router.delete('/folders/:folderId/:taskId', ensureAuthenticated, new TasksController().deleteTask);

